<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditTransaction extends Model
{
    protected $fillable = [
        'credit_wallet_id',
        'user_id',
        'type',
        'amount',
        'balance_after',
        'reason',
        'reference',
        'meta',
    ];

    protected $casts = [
        'amount' => 'integer',
        'balance_after' => 'integer',
        'meta' => 'array',
    ];

    public function wallet(): BelongsTo
    {
        return $this->belongsTo(CreditWallet::class, 'credit_wallet_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
