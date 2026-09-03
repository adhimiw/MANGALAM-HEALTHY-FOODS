<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Keep-Alive Ping for OpenWA Render Gateway (Runs every 10 minutes to prevent container sleep)
Schedule::command('whatsapp:keepalive')->everyTenMinutes()->withoutOverlapping();
