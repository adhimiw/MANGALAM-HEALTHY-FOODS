<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use App\Models\WhatsAppConversation;
use App\Models\WhatsAppMessage;
use App\Models\WhatsAppSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class WhatsAppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Settings with User's Admin Number
        WhatsAppSetting::updateOrCreate(
            ['id' => 1],
            [
                'admin_phone_number'       => '9025192863',
                'session_name'             => 'mangalam-admin',
                'api_base_url'             => 'http://localhost:2785',
                'api_key'                  => env('OPENWA_KEY', 'owa_k1_747bb008102884877e6105f90f3ed73ff2d002874da80296343e730386364341'),
                'is_enabled'               => true,
                'auto_reply_enabled'       => true,
                'notify_customer_on_order' => true,
                'notify_admin_on_order'    => true,
            ]
        );

        // Update Super Admin user with WhatsApp number
        $admin = User::where('role', User::ROLE_SUPER_ADMIN)->first();
        if ($admin) {
            $admin->update(['whatsapp_number' => '9025192863', 'contact_number' => '9025192863']);
        }

        // 2. Ensure Test Customer Exists with Phone 9944508736
        $customer = User::updateOrCreate(
            ['email' => 'customer@mangalam.com'],
            [
                'full_name'       => 'Valued Customer',
                'contact_number'  => '9944508736',
                'whatsapp_number' => '9944508736',
                'password'        => Hash::make('password123'),
                'role'            => User::ROLE_CUSTOMER,
                'is_blocked'      => false,
            ]
        );

        // 3. Create Sample Seed Conversation for Customer 9944508736
        $conv1 = WhatsAppConversation::updateOrCreate(
            ['customer_phone' => '919944508736'],
            [
                'user_id'         => $customer->id,
                'customer_name'   => 'Valued Customer (Rajesh)',
                'last_message'    => 'Thank you! Can you tell me how many spoons of health mix to mix per cup?',
                'last_message_at' => now()->subMinutes(12),
                'unread_count'    => 1,
                'status'          => 'active',
            ]
        );

        // Seed messages in thread
        $latestOrder = Order::where('user_id', $customer->id)->latest()->first();

        WhatsAppMessage::firstOrCreate(
            ['conversation_id' => $conv1->id, 'message' => "🌾 *Mangalam Healthy Foods - Order Confirmed!* 🌾\n\nDear *Valued Customer*,\nThank you for your order! Your order *#MHF-20260829-AMU1* has been confirmed.\n\n📦 *Items:*\n• *Amutham Sprouted Health Mix (500g)* × 2 — ₹440.00\n💰 *Total:* ₹440.00 (COD)\n📍 *Delivery:* No-14 Main Road, Sethiyathope - 608702"],
            [
                'sender_type' => 'system',
                'status'      => 'read',
                'order_id'    => $latestOrder ? $latestOrder->id : null,
                'created_at'  => now()->subHours(2),
            ]
        );

        WhatsAppMessage::firstOrCreate(
            ['conversation_id' => $conv1->id, 'message' => 'Hello team, is this made with 100% sprouted millets?'],
            [
                'sender_type' => 'customer',
                'status'      => 'read',
                'created_at'  => now()->subMinutes(45),
            ]
        );

        WhatsAppMessage::firstOrCreate(
            ['conversation_id' => $conv1->id, 'message' => 'Hello Rajesh! Yes, our Amutham Health Mix is 100% soak-sprouted using ancient millets, Mappillai Samba rice, and grains with zero chemicals or preservatives.'],
            [
                'sender_type' => 'admin',
                'status'      => 'delivered',
                'created_at'  => now()->subMinutes(30),
            ]
        );

        WhatsAppMessage::firstOrCreate(
            ['conversation_id' => $conv1->id, 'message' => 'Thank you! Can you tell me how many spoons of health mix to mix per cup?'],
            [
                'sender_type' => 'customer',
                'status'      => 'delivered',
                'created_at'  => now()->subMinutes(12),
            ]
        );

        // 4. Create another seed conversation with an inquiring customer
        $conv2 = WhatsAppConversation::updateOrCreate(
            ['customer_phone' => '919876543210'],
            [
                'customer_name'   => 'Priya Sundaram (Chennai)',
                'last_message'    => 'Do you deliver sprouted ragi malt to Chennai within 2 days?',
                'last_message_at' => now()->subHours(3),
                'unread_count'    => 0,
                'status'          => 'active',
            ]
        );

        WhatsAppMessage::firstOrCreate(
            ['conversation_id' => $conv2->id, 'message' => 'Do you deliver sprouted ragi malt to Chennai within 2 days?'],
            [
                'sender_type' => 'customer',
                'status'      => 'read',
                'created_at'  => now()->subHours(3),
            ]
        );

        WhatsAppMessage::firstOrCreate(
            ['conversation_id' => $conv2->id, 'message' => 'Hello Priya! Yes, standard courier delivery to Chennai takes 24 to 48 hours. Orders dispatched today will arrive tomorrow! 🚚'],
            [
                'sender_type' => 'admin',
                'status'      => 'delivered',
                'created_at'  => now()->subHours(2),
            ]
        );
    }
}
