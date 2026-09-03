<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WhatsAppConversation;
use App\Models\WhatsAppMessage;
use App\Models\WhatsAppSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WhatsAppWebhookController extends Controller
{
    /**
     * Handle incoming OpenWA webhooks.
     */
    public function handle(Request $request): JsonResponse
    {
        $payload = $request->all();
        $event = $payload['event'] ?? 'unknown';
        $data = $payload['data'] ?? $payload;

        Log::info('OpenWA Webhook Event:', ['event' => $event, 'from' => $data['from'] ?? $payload['from'] ?? null]);

        $settings = WhatsAppSetting::getSettings();
        $adminClean = preg_replace('/\D/', '', (string)$settings->admin_phone_number);

        if ($event === 'message.create' || isset($data['body']) || isset($data['message']) || isset($data['text'])) {
            $from = $data['from'] ?? $data['sender'] ?? null;
            $to = $data['to'] ?? null;
            $text = $data['body'] ?? $data['message'] ?? $data['text'] ?? '';
            $senderName = $data['notifyName'] ?? $data['pushName'] ?? $data['pushname'] ?? 'Customer';
            $isFromMe = !empty($data['fromMe']) || !empty($data['isFromMe']);

            if (!empty($text)) {
                // Determine relevant customer phone
                $rawTarget = $isFromMe ? ($to ?: $from) : $from;
                $cleanPhone = preg_replace('/\D/', '', (string)$rawTarget);
                $cleanPhone = preg_replace('/@c\.us$/', '', $cleanPhone);

                if (!empty($cleanPhone) && ($cleanPhone !== $adminClean || $isFromMe)) {
                    // Check for duplicate message delivery within 3 seconds
                    $recentDuplicate = WhatsAppMessage::where('message', $text)
                        ->where('created_at', '>=', now()->subSeconds(3))
                        ->first();

                    if (!$recentDuplicate) {
                        // Find or create conversation
                        $conversation = WhatsAppConversation::firstOrCreate(
                            ['customer_phone' => $cleanPhone],
                            [
                                'customer_name'   => $senderName !== 'Customer' ? $senderName : 'Valued Customer',
                                'last_message'    => $text,
                                'last_message_at' => now(),
                                'unread_count'    => $isFromMe ? 0 : 1,
                                'status'          => 'active',
                            ]
                        );

                        if (!$conversation->wasRecentlyCreated && !$isFromMe) {
                            $conversation->increment('unread_count');
                        }

                        $conversation->update([
                            'last_message'    => $text,
                            'last_message_at' => now(),
                            'customer_name'   => ($conversation->customer_name === 'Valued Customer' && $senderName !== 'Customer') 
                                ? $senderName 
                                : $conversation->customer_name,
                        ]);

                        // Create message record
                        WhatsAppMessage::create([
                            'conversation_id' => $conversation->id,
                            'sender_type'     => $isFromMe ? 'admin' : 'customer',
                            'message'         => $text,
                            'status'          => 'delivered',
                        ]);
                    }
                }
            }
        }

        return response()->json(['status' => 'success']);
    }
}
