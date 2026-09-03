<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhatsAppSetting extends Model
{
    use HasFactory;

    protected $table = 'whatsapp_settings';

    protected $fillable = [
        'admin_phone_number',
        'session_name',
        'api_base_url',
        'api_key',
        'is_enabled',
        'auto_reply_enabled',
        'notify_customer_on_order',
        'notify_admin_on_order',
    ];

    protected $casts = [
        'is_enabled'                => 'boolean',
        'auto_reply_enabled'        => 'boolean',
        'notify_customer_on_order'  => 'boolean',
        'notify_admin_on_order'     => 'boolean',
    ];

    /**
     * Singleton helper to get active settings or create default.
     */
    public static function getSettings(): self
    {
        return self::firstOrCreate(
            ['id' => 1],
            [
                'admin_phone_number'       => env('OPENWA_ADMIN_PHONE', '9025192863'),
                'session_name'             => env('OPENWA_SESSION', 'mangalam-admin'),
                'api_base_url'             => env('OPENWA_URL', 'http://localhost:2785'),
                'api_key'                  => env('OPENWA_KEY', 'owa_k1_747bb008102884877e6105f90f3ed73ff2d002874da80296343e730386364341'),
                'is_enabled'               => true,
                'auto_reply_enabled'       => true,
                'notify_customer_on_order' => true,
                'notify_admin_on_order'    => true,
            ]
        );
    }
}
