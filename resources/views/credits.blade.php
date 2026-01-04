@php
    $user = auth()->user();
    $wallet = $user ? app(App\Services\CreditService::class)->ensureWallet($user) : null;
    $subscription = $user?->subscription;
@endphp
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Credits - CamerHub</title>
    @vite(['resources/css/app.css', 'resources/js/pages/credits.jsx'])
</head>
<body>
<div id="app"></div>
<form id="logout-form" method="POST" action="{{ route('logout') }}" class="hidden">
    @csrf
</form>
<script>
    window.CamerHub = {
        user: @json($user ? [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'credits' => $wallet?->balance ?? 0,
            'subscription' => $subscription ? [
                'active' => $subscription->status === 'active',
                'plan' => 'monthly',
                'nextBilling' => optional($subscription->next_renewal_at)->format('Y-m-d'),
            ] : [
                'active' => false,
            ],
        ] : null),
        whatsappNumber: '237672251531',
    };
</script>
</body>
</html>
