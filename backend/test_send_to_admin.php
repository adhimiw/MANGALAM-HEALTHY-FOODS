<?php
require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$service = app(\App\Services\WhatsAppGatewayService::class);
$settings = \App\Models\WhatsAppSetting::getSettings();

echo "Active Settings in DB:" . PHP_EOL;
echo "Admin Phone: " . $settings->admin_phone_number . PHP_EOL;
echo "API Base URL: " . $settings->api_base_url . PHP_EOL;
echo "API Key: " . substr($settings->api_key, 0, 15) . "..." . PHP_EOL;
echo "Is Enabled: " . ($settings->is_enabled ? 'YES' : 'NO') . PHP_EOL;
echo "Notify Admin on Order: " . ($settings->notify_admin_on_order ? 'YES' : 'NO') . PHP_EOL;

// Update API Base URL if it is localhost to host.docker.internal
$settings->update([
    'api_base_url' => 'http://host.docker.internal:2785',
    'api_key'      => 'owa_k1_747bb008102884877e6105f90f3ed73ff2d002874da80296343e730386364341',
    'admin_phone_number' => '9025192863'
]);

echo PHP_EOL . "--- Testing Direct Dispatch to Admin Phone: 9025192863 ---" . PHP_EOL;
$res = $service->sendMessage('9025192863', "🌾 *Mangalam Healthy Foods* 🌾\n🚨 *LIVE ADMIN NOTIFICATION TEST*\n\nHello Admin (+91 90251 92863)! If you receive this, your automated order notifications are working 100%!", null, 'system');
echo "Dispatch Returned: " . ($res ? 'TRUE' : 'FALSE') . PHP_EOL;
