<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('meta_whatsapp_logs')) {
            Schema::create('meta_whatsapp_logs', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('order_id')->nullable()->index();
                $table->string('template', 120)->nullable();
                $table->string('lang', 10)->default('en');
                $table->string('recipient', 30)->index();
                $table->string('provider_message_id', 120)->nullable()->index();
                $table->string('status', 30)->default('queued');
                $table->text('error')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meta_whatsapp_logs');
    }
};
