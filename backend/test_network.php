<?php
$key = 'owa_k1_747bb008102884877e6105f90f3ed73ff2d002874da80296343e730386364341';
$ctx = stream_context_create([
    'http' => [
        'header'  => "X-API-Key: {$key}\r\nAccept: application/json",
        'timeout' => 3
    ]
]);

echo "--- 1. Testing http://localhost:2785/api/sessions ---" . PHP_EOL;
$res1 = @file_get_contents('http://localhost:2785/api/sessions', false, $ctx);
echo "Result: " . ($res1 ? "OK -> " . substr($res1, 0, 60) : "FAILED (Cannot reach localhost from inside docker container)") . PHP_EOL;

echo PHP_EOL . "--- 2. Testing http://host.docker.internal:2785/api/sessions ---" . PHP_EOL;
$res2 = @file_get_contents('http://host.docker.internal:2785/api/sessions', false, $ctx);
echo "Result: " . ($res2 ? "OK -> " . substr($res2, 0, 60) : "FAILED") . PHP_EOL;
