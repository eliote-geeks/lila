<?php

namespace App\Http\Controllers;

use App\Exceptions\InsufficientCreditsException;
use App\Models\CreditPurchase;
use App\Services\CreditService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CreditController extends Controller
{
    public function show(Request $request, CreditService $credits)
    {
        $user = $request->user();
        $wallet = $credits->ensureWallet($user);

        return response()->json([
            'wallet' => [
                'balance' => $wallet->balance,
                'lifetime_credited' => $wallet->lifetime_credited,
                'lifetime_spent' => $wallet->lifetime_spent,
            ],
            'subscription' => $user->subscription,
            'pricing' => $credits->pricing(),
        ]);
    }

    public function transactions(Request $request)
    {
        $transactions = $request->user()
            ->creditTransactions()
            ->latest()
            ->limit(50)
            ->get();

        return response()->json([
            'transactions' => $transactions,
        ]);
    }

    public function consume(Request $request, CreditService $credits)
    {
        $actionKeys = array_keys(config('credits.actions', []));

        $validated = $request->validate([
            'action' => ['required', 'string', Rule::in($actionKeys)],
        ]);

        try {
            $transaction = $credits->consumeAction($request->user(), $validated['action']);
        } catch (InsufficientCreditsException $exception) {
            return response()->json([
                'message' => 'Crédits insuffisants.',
                'required' => $exception->required,
                'balance' => $exception->balance,
            ], 422);
        }

        return response()->json([
            'transaction' => $transaction,
            'balance' => $transaction->balance_after,
        ]);
    }

    public function purchase(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required', Rule::in(['subscription', 'topup'])],
            'payment_method' => ['nullable', 'string', 'max:24'],
            'reference' => ['nullable', 'string', 'max:120'],
            'note' => ['nullable', 'string'],
            'amount_fcfa' => ['nullable', 'integer', 'min:1'],
            'credits' => ['nullable', 'integer', 'min:1'],
            'proof' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:5120'],
        ]);

        $type = $validated['type'];
        $amount = (int) ($validated['amount_fcfa'] ?? 0);
        $credits = (int) ($validated['credits'] ?? 0);

        if ($type === 'subscription') {
            $amount = (int) config('credits.monthly_price_fcfa', 0);
            $credits = (int) config('credits.monthly_credits', 0);
        }

        if ($amount <= 0 || $credits <= 0) {
            return response()->json([
                'message' => 'Montant ou crédits invalides.',
            ], 422);
        }

        $proofPath = null;
        if ($request->hasFile('proof')) {
            $proofPath = $request->file('proof')->store('credit-proofs', 'public');
        }

        $purchase = CreditPurchase::create([
            'user_id' => $request->user()->id,
            'type' => $type,
            'amount_fcfa' => $amount,
            'credits' => $credits,
            'status' => 'pending',
            'payment_method' => $validated['payment_method'] ?? null,
            'reference' => $validated['reference'] ?? null,
            'note' => $validated['note'] ?? null,
            'proof_path' => $proofPath,
        ]);

        return response()->json([
            'purchase' => $purchase,
        ], 201);
    }
}
