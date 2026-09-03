<?php

namespace App\Console\Commands;

use App\Services\WhatsAppGatewayService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class WhatsAppKeepAliveCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'whatsapp:keepalive {--wake : Allow extended timeout to wake sleeping Render instance}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send keep-alive ping to OpenWA gateway (Render/Cloud) to prevent sleep, verify API key, and record latency';

    /**
     * Execute the console command.
     */
    public function handle(WhatsAppGatewayService $gateway): int
    {
        $forceWake = $this->option('wake');
        $this->info("🌾 [Mangalam] Pinging OpenWA Gateway (Keep-Alive)...");

        $res = $gateway->pingGateway($forceWake);

        $status = $res['status'] ?? 'UNKNOWN';
        $latency = $res['latency_ms'] ?? 'N/A';
        $msg = $res['message'] ?? '';

        if ($res['success']) {
            $this->info("✅ Gateway ONLINE | Latency: {$latency}ms | Key Valid: Yes");
            $this->line("   Details: {$msg}");
            Log::info("WhatsApp Keep-Alive OK: {$latency}ms", ['gateway' => $res['base_url']]);
            return Command::SUCCESS;
        } else {
            $this->warn("⚠️ Gateway Status: {$status} | Latency: {$latency}ms");
            $this->line("   Error: {$msg}");
            Log::warning("WhatsApp Keep-Alive Warning [{$status}]: {$msg}");
            return Command::FAILURE;
        }
    }
}
