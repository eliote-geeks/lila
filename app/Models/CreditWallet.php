<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CreditWallet extends Model
{
    protected $fillable = [
        'user_id',
        'balance',
        'lifetime_credited',
        'lifetime_spent',
    ];

    protected $casts = [
        'balance' => 'integer',
        'lifetime_credited' => 'integer',
        'lifetime_spent' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(CreditTransaction::class);
    }
}
