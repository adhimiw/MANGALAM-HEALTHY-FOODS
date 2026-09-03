<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WhatsAppConversation extends Model
{
    use HasFactory;

    protected $table = 'whatsapp_conversations';

    protected $fillable = [
        'user_id',
        'customer_name',
        'customer_phone',
        'last_message',
        'last_message_at',
        'unread_count',
        'status',
    ];

    protected $casts = [
        'last_message_at' => 'datetime',
        'unread_count'    => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(WhatsAppMessage::class, 'conversation_id')->orderBy('created_at', 'asc');
    }

    /**
     * Scope for active chats.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Standardize phone number into 91XXXXXXXXXX format.
     */
    public static function normalizePhone(?string $phone): string
    {
        if (!$phone) return '';
        $digits = preg_replace('/\D/', '', $phone);
        if (strlen($digits) === 11 && str_starts_with($digits, '0')) {
            $digits = substr($digits, 1);
        }
        if (strlen($digits) === 10) {
            $digits = '91' . $digits;
        }
        return $digits;
    }
}
