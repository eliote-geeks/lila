<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'price_fcfa',
        'monthly_credits',
        'started_at',
        'last_renewed_at',
        'next_renewal_at',
        'canceled_at',
    ];

    protected $casts = [
        'price_fcfa' => 'integer',
        'monthly_credits' => 'integer',
        'started_at' => 'datetime',
        'last_renewed_at' => 'datetime',
        'next_renewal_at' => 'datetime',
        'canceled_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
