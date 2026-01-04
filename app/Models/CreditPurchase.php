<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditPurchase extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'amount_fcfa',
        'credits',
        'status',
        'payment_method',
        'reference',
        'proof_path',
        'note',
        'approved_at',
    ];

    protected $casts = [
        'amount_fcfa' => 'integer',
        'credits' => 'integer',
        'approved_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
