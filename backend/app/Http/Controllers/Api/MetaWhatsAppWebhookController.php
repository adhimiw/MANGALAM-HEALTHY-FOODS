<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MetaWhatsAppWebhookController extends Controller
{
    /**
     * Meta webhook verification handshake (GET).
     */
    public function verify(Request $request)
    {
        $mode = $request->query('hub_mode');
        $token = $request->query('hub_verify_token');
        $challenge = $request->query('hub_challenge');

        if ($mode === 'subscribe' && $token && hash_equals((string) config('meta-whatsapp.verify_token'), (string) $token)) {
            return response($challenge, 200)->header('Content-Type', 'text/plain');
        }

        return response()->json(['error' => 'verification failed'], 403);
    }

    /**
     * Inbound events: delivery receipts, incoming messages, quality updates.
     * Always 200 — never break Meta's retry loop. Read-only except logs.
     */
    public function receiver(Request $request): JsonResponse
    {
        try {
            $payload = $request->all();

            foreach (($payload['entry'] ?? []) as $entry) {
                foreach (($entry['changes'] ?? []) as $change) {
                    $value = $change['value'] ?? [];

                    foreach (($value['statuses'] ?? []) as $st) {
                        if (!empty($st['id'])) {
                            DB::table('meta_whatsapp_logs')
                                ->where('provider_message_id', $st['id'])
                                ->update([
                                    'status' => $st['status'] ?? 'unknown',
                                    'updated_at' => now(),
                                ]);
                        }
                    }

                    foreach (($value['messages'] ?? []) as $msg) {
                        Log::info('Meta WA inbound', [
                            'from' => $msg['from'] ?? null,
                            'type' => $msg['type'] ?? null,
                        ]);
                    }
                }
            }
        } catch (\Throwable $e) {
            Log::warning('Meta WA webhook error: ' . $e->getMessage());
        }

        return response()->json(['status' => true]);
    }
}
