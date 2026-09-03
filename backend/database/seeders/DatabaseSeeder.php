<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\WhatsAppSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // 1. Reset Admin user passwords to 12345678
        User::where('role', User::ROLE_SUPER_ADMIN)
            ->orWhere('email', 'superadmin@mangalam.com')
            ->orWhere('email', 'admin@mangalam.com')
            ->update(['password' => Hash::make('12345678')]);

        // 2. Ensure Super Admin exists
        $admin = User::where('email', 'superadmin@mangalam.com')->first();
        if (!$admin) {
            User::create([
                'email'           => 'superadmin@mangalam.com',
                'full_name'       => 'Super Admin',
                'contact_number'  => '9025192863',
                'whatsapp_number' => '9025192863',
                'password'        => Hash::make('12345678'),
                'role'            => User::ROLE_SUPER_ADMIN,
                'is_blocked'      => false,
            ]);
        }

        // 3. System WhatsApp Settings
        WhatsAppSetting::updateOrCreate(
            ['id' => 1],
            [
                'session_name'       => 'mangalam-admin',
                'api_base_url'       => 'https://mangalam-openwa-gateway.onrender.com',
                'api_key'            => 'owa_k1_747bb008102884877e6105f90f3ed73ff2d002874da80296343e730386364341',
                'admin_phone_number' => '919025192863',
                'is_enabled'         => true,
                'auto_reply_enabled' => true,
            ]
        );
    }
}
