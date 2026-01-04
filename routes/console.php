<?php

use App\Models\CreditPurchase;
use App\Models\Subscription;
use App\Services\CreditService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('credits:approve {purchaseId}', function (CreditService $credits) {
    $purchaseId = (int) $this->argument('purchaseId');
    $purchase = CreditPurchase::with('user')->find($purchaseId);

    if (!$purchase) {
        $this->error('Purchase not found.');
        return 1;
    }

    if ($purchase->status === 'approved') {
        $this->info('Purchase already approved.');
        return 0;
    }

    if ($purchase->status === 'rejected') {
        $this->error('Purchase already rejected.');
        return 1;
    }

    $purchase->status = 'approved';
    $purchase->approved_at = now();
    $purchase->save();

    if ($purchase->type === 'subscription') {
        $credits->resetBalance($purchase->user, $purchase->credits, 'subscription_start', [
            'purchase_id' => $purchase->id,
            'type' => $purchase->type,
        ]);

        $subscription = Subscription::firstOrNew(['user_id' => $purchase->user_id]);
        $subscription->status = 'active';
        $subscription->price_fcfa = $purchase->amount_fcfa;
        $subscription->monthly_credits = $purchase->credits;
        $subscription->started_at = $subscription->started_at ?? now();
        $subscription->last_renewed_at = now();
        $subscription->next_renewal_at = now()->addMonth();
        $subscription->save();
    } else {
        $credits->credit($purchase->user, $purchase->credits, 'purchase', [
            'purchase_id' => $purchase->id,
            'type' => $purchase->type,
        ], 'purchase:' . $purchase->id);
    }

    $this->info('Purchase approved and credits granted.');
    return 0;
})->purpose('Approve a pending credit purchase and grant credits');

Artisan::command('credits:renew', function (CreditService $credits) {
    $now = now();
    $subscriptions = Subscription::with('user')
        ->where('status', 'active')
        ->whereNotNull('next_renewal_at')
        ->where('next_renewal_at', '<=', $now)
        ->get();

    if ($subscriptions->isEmpty()) {
        $this->info('No subscriptions to renew.');
        return 0;
    }

    foreach ($subscriptions as $subscription) {
        if ($subscription->monthly_credits <= 0) {
            continue;
        }

        $credits->resetBalance($subscription->user, $subscription->monthly_credits, 'subscription_renewal', [
            'subscription_id' => $subscription->id,
            'renewed_at' => $now->toDateTimeString(),
        ]);

        $subscription->last_renewed_at = $now;
        $subscription->next_renewal_at = $now->copy()->addMonth();
        $subscription->save();
    }

    $this->info('Subscriptions renewed: ' . $subscriptions->count());
    return 0;
})->purpose('Reset monthly credits for active subscriptions');
