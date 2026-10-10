<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Meta WhatsApp Cloud API (direct integration)
    |--------------------------------------------------------------------------
    | Dual-send runs alongside the OpenWA gateway until cutover. Keep
    | META_WA_ENABLED=false until the business number is registered,
    | templates are APPROVED, and webhook verification passes.
    | Secrets live in server env only — never commit real values.
    */

    'enabled' => env('META_WA_ENABLED', false),

    'api_version' => env('META_WA_API_VERSION', 'v23.0'),

    'phone_number_id' => env('META_WA_PHONE_NUMBER_ID'),

    'waba_id' => env('META_WA_WABA_ID'),

    'token' => env('META_WA_TOKEN'),

    'verify_token' => env('META_WA_VERIFY_TOKEN'),

    'timeout' => env('META_WA_TIMEOUT', 15),

    'track_url' => 'https://mahealthyfoods.in/profile',

    /*
    | Approved template names (WhatsApp Manager). Tamil clones share
    | the same names with language code "ta".
    */
    'templates' => [
        'order_placed' => env('META_WA_TPL_ORDER_PLACED', 'order_placed_cod'),
        'order_status' => env('META_WA_TPL_ORDER_STATUS', 'order_status_update'),
        'order_delivered' => env('META_WA_TPL_ORDER_DELIVERED', 'order_delivered_feedback'),
        'order_cancelled' => env('META_WA_TPL_ORDER_CANCELLED', 'order_cancelled_feedback'),
        'admin_new_order' => env('META_WA_TPL_ADMIN_ORDER', 'admin_new_order_alert'),
    ],
];
