<?php

namespace App\Services;

use App\Exceptions\InsufficientCreditsException;
use App\Models\CreditTransaction;
use App\Models\CreditWallet;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class CreditService
{
    public function ensureWallet(User $user): CreditWallet
    {
        return CreditWallet::firstOrCreate(
            ['user_id' => $user->id],
            ['balance' => 0, 'lifetime_credited' => 0, 'lifetime_spent' => 0]
        );
    }

    public function grantSignupCredits(User $user): ?CreditTransaction
    {
        $wallet = $this->ensureWallet($user);

        if ($wallet->transactions()->where('reason', 'signup')->exists()) {
            return null;
        }

        $amount = (int) config('credits.signup_credits', 0);
        if ($amount <= 0) {
            return null;
        }

        return $this->credit($user, $amount, 'signup', ['source' => 'registration']);
    }

    public function credit(User $user, int $amount, string $reason, array $meta = [], ?string $reference = null): CreditTransaction
    {
        if ($amount <= 0) {
            throw new InvalidArgumentException('Credit amount must be positive.');
        }

        return DB::transaction(function () use ($user, $amount, $reason, $meta, $reference) {
            $wallet = $this->ensureWallet($user);
            $wallet = CreditWallet::whereKey($wallet->id)->lockForUpdate()->first();

            $wallet->balance += $amount;
            $wallet->lifetime_credited += $amount;
            $wallet->save();

            return CreditTransaction::create([
                'credit_wallet_id' => $wallet->id,
                'user_id' => $user->id,
                'type' => 'credit',
                'amount' => $amount,
                'balance_after' => $wallet->balance,
                'reason' => $reason,
                'reference' => $reference,
                'meta' => $meta,
            ]);
        });
    }

    public function resetBalance(User $user, int $newBalance, string $reason = 'monthly_reset', array $meta = []): ?CreditTransaction
    {
        if ($newBalance < 0) {
            throw new InvalidArgumentException('New balance must be zero or positive.');
        }

        return DB::transaction(function () use ($user, $newBalance, $reason, $meta) {
            $wallet = $this->ensureWallet($user);
            $wallet = CreditWallet::whereKey($wallet->id)->lockForUpdate()->first();

            $previous = $wallet->balance;
            $delta = $newBalance - $previous;

            if ($delta === 0) {
                return null;
            }

            $wallet->balance = $newBalance;
            if ($delta > 0) {
                $wallet->lifetime_credited += $delta;
            }
            $wallet->save();

            return CreditTransaction::create([
                'credit_wallet_id' => $wallet->id,
                'user_id' => $user->id,
                'type' => 'reset',
                'amount' => abs($delta),
                'balance_after' => $wallet->balance,
                'reason' => $reason,
                'meta' => array_merge($meta, [
                    'previous_balance' => $previous,
                    'new_balance' => $newBalance,
                    'delta' => $delta,
                ]),
            ]);
        });
    }

    public function debit(User $user, int $amount, string $reason, array $meta = []): CreditTransaction
    {
        if ($amount <= 0) {
            throw new InvalidArgumentException('Debit amount must be positive.');
        }

        return DB::transaction(function () use ($user, $amount, $reason, $meta) {
            $wallet = $this->ensureWallet($user);
            $wallet = CreditWallet::whereKey($wallet->id)->lockForUpdate()->first();

            if ($wallet->balance < $amount) {
                throw new InsufficientCreditsException($amount, $wallet->balance);
            }

            $wallet->balance -= $amount;
            $wallet->lifetime_spent += $amount;
            $wallet->save();

            return CreditTransaction::create([
                'credit_wallet_id' => $wallet->id,
                'user_id' => $user->id,
                'type' => 'debit',
                'amount' => $amount,
                'balance_after' => $wallet->balance,
                'reason' => $reason,
                'meta' => $meta,
            ]);
        });
    }

    public function consumeAction(User $user, string $action): CreditTransaction
    {
        $cost = config("credits.actions.$action");

        if ($cost === null) {
            throw new InvalidArgumentException('Unknown action.');
        }

        return $this->debit($user, (int) $cost, "action:$action", [
            'action' => $action,
            'cost' => (int) $cost,
        ]);
    }

    public function pricing(): array
    {
        return [
            'signup_credits' => (int) config('credits.signup_credits', 0),
            'monthly_credits' => (int) config('credits.monthly_credits', 0),
            'monthly_price_fcfa' => (int) config('credits.monthly_price_fcfa', 0),
            'resets_monthly' => (bool) config('credits.resets_monthly', false),
            'actions' => config('credits.actions', []),
        ];
    }
}
