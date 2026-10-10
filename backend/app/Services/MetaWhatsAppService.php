<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Meta WhatsApp Cloud API — direct integration (no BSP).
 *
 * Dual-send companion to WhatsAppGatewayService (OpenWA). Every send is
 * guarded by config flag + try/catch so order flows NEVER break on
 * Meta errors. Enable only after number registration + template APPROVAL.
 */
class MetaWhatsAppService
{
    public static function isEnabled(): bool
    {
        $cfg = config('meta-whatsapp');

        return (bool) ($cfg['enabled'] ?? false)
            && !empty($cfg['token'])
            && !empty($cfg['phone_number_id']);
    }

    public static function normalizePhone(?string $phone): ?string
    {
        if (!$phone) {
            return null;
        }
        $digits = preg_replace('/\D/', '', $phone);
        if (strlen($digits) === 10) {
            $digits = '91' . $digits;
        }

        return strlen($digits) >= 11 ? $digits : null;
    }

    /**
     * Send one approved utility template. Never throws.
     */
    public static function sendTemplate(
        ?string $to,
        string $template,
        string $lang = 'en',
        array $bodyParams = [],
        ?int $orderId = null
    ): bool {
        $to = self::normalizePhone($to);
        if (!self::isEnabled() || !$to) {
            return false;
        }

        $cfg = config('meta-whatsapp');
        $url = "https://graph.facebook.com/{$cfg['api_version']}/{$cfg['phone_number_id']}/messages";

        $parameters = array_map(
            fn ($v) => ['type' => 'text', 'text' => mb_substr((string) $v, 0, 200)],
            array_values($bodyParams)
        );

        $payload = [
            'messaging_product' => 'whatsapp',
            'recipient_type' => 'individual',
            'to' => $to,
            'type' => 'template',
            'template' => [
                'name' => $template,
                'language' => ['code' => $lang],
                'components' => [
                    ['type' => 'body', 'parameters' => $parameters],
                ],
            ],
        ];

        $logId = DB::table('meta_whatsapp_logs')->insertGetId([
            'order_id' => $orderId,
            'template' => $template,
            'lang' => $lang,
            'recipient' => $to,
            'status' => 'queued',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        try {
            $res = Http::withToken($cfg['token'])
                ->timeout((int) ($cfg['timeout'] ?? 15))
                ->post($url, $payload);

            if ($res->successful()) {
                DB::table('meta_whatsapp_logs')->where('id', $logId)->update([
                    'status' => 'sent',
                    'provider_message_id' => $res->json('messages.0.id'),
                    'updated_at' => now(),
                ]);

                return true;
            }

            DB::table('meta_whatsapp_logs')->where('id', $logId)->update([
                'status' => 'failed',
                'error' => mb_substr($res->body(), 0, 1000),
                'updated_at' => now(),
            ]);
            Log::warning('Meta WA send failed: ' . $res->body());
        } catch (\Throwable $e) {
            DB::table('meta_whatsapp_logs')->where('id', $logId)->update([
                'status' => 'failed',
                'error' => mb_substr($e->getMessage(), 0, 1000),
                'updated_at' => now(),
            ]);
            Log::warning('Meta WA exception: ' . $e->getMessage());
        }

        return false;
    }

    protected static function orderContext(Order $order): array
    {
        $user = $order->user;
        $snap = $order->address_snapshot ?? [];

        $name = $user->full_name ?? $user->name ?? ($snap['full_name'] ?? 'Valued Customer');
        $phone = $user->whatsapp_number ?? $user->contact_number ?? ($snap['phone_number'] ?? null);

        $items = [];
        foreach (($order->items ?? []) as $item) {
            $size = $item->package_size ? " ({$item->package_size})" : '';
            $items[] = "{$item->product_name}{$size} x{$item->quantity}";
        }

        $address = trim(implode(', ', array_filter([
            $snap['address_line1'] ?? null,
            $snap['city'] ?? null,
            $snap['state'] ?? null,
            isset($snap['pincode']) ? "- {$snap['pincode']}" : null,
        ])), ', ');

        return [$name, $phone, implode('; ', $items), $address];
    }

    public static function sendOrderPlaced(Order $order, string $lang = 'en'): bool
    {
        [$name, $phone, $items, $address] = self::orderContext($order);

        return self::sendTemplate($phone, config('meta-whatsapp.templates.order_placed'), $lang, [
            $name,
            $order->order_number,
            $items ?: 'Health mix order',
            number_format((float) $order->total_amount, 2),
            $order->payment_method ?? 'COD',
            $address ?: 'Sethiyathope',
        ], $order->id);
    }

    public static function sendStatusUpdate(Order $order, string $status, string $lang = 'en'): bool
    {
        [$name, $phone] = self::orderContext($order);
        $key = strtolower($status);
        $template = match ($key) {
            'delivered' => config('meta-whatsapp.templates.order_delivered'),
            'cancelled' => config('meta-whatsapp.templates.order_cancelled'),
            default => config('meta-whatsapp.templates.order_status'),
        };

        $params = $key === 'delivered' || $key === 'cancelled'
            ? [$name, $order->order_number]
            : [$name, $order->order_number, strtoupper($status), 'Track: ' . config('meta-whatsapp.track_url')];

        if ($key === 'cancelled') {
            $params[] = '+91 90251 92863';
        }

        return self::sendTemplate($phone, $template, $lang, $params, $order->id);
    }

    public static function sendAdminAlert(Order $order): bool
    {
        [$name, $custPhone, , $address] = self::orderContext($order);
        $adminPhone = \App\Models\WhatsAppSetting::getSettings()->admin_phone_number ?? null;

        return self::sendTemplate($adminPhone, config('meta-whatsapp.templates.admin_new_order'), 'en', [
            $order->order_number,
            $name,
            '+' . (self::normalizePhone($custPhone) ?? ''),
            number_format((float) $order->total_amount, 2),
            $address ?: 'Sethiyathope',
        ], $order->id);
    }
}
