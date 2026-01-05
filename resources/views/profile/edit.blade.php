@php
    $user = auth()->user();
    $wallet = $user ? app(App\Services\CreditService::class)->ensureWallet($user) : null;
    $candidate = $candidate ?? [];
    $profileForm = [
        'first_name' => old('first_name', $candidate['first_name'] ?? ''),
        'last_name' => old('last_name', $candidate['last_name'] ?? ''),
        'email' => old('email', $candidate['email'] ?? $user?->email ?? ''),
        'phone' => old('phone', $candidate['phone'] ?? ''),
        'location' => old('location', $candidate['location'] ?? ''),
        'current_title' => old('current_title', $candidate['current_title'] ?? ''),
        'years_experience' => old('years_experience', $candidate['years_experience'] ?? ''),
        'education_level' => old('education_level', $candidate['education_level'] ?? ''),
        'skills' => old('skills', $candidate['skills'] ?? ''),
        'languages' => old('languages', $candidate['languages'] ?? ''),
        'desired_positions' => old('desired_positions', $candidate['desired_positions'] ?? ''),
        'desired_sectors' => old('desired_sectors', $candidate['desired_sectors'] ?? ''),
        'desired_locations' => old('desired_locations', $candidate['desired_locations'] ?? ''),
        'min_salary' => old('min_salary', $candidate['min_salary'] ?? ''),
        'contract_types' => old('contract_types', $candidate['contract_types'] ?? ''),
        'linkedin_url' => old('linkedin_url', $candidate['linkedin_url'] ?? ''),
        'portfolio_url' => old('portfolio_url', $candidate['portfolio_url'] ?? ''),
    ];
    $userData = $user ? [
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'credits' => $wallet?->balance ?? 0,
        'profile' => [
            'completed' => false,
        ],
    ] : null;
@endphp
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Profil - CamerHub</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/pages/profile.jsx'])
</head>
<body>
<div id="app"></div>
<form id="logout-form" method="POST" action="{{ route('logout') }}" class="hidden">
    @csrf
</form>
<script>
    window.CamerHub = {
        user: @json($userData),
        profileForm: @json($profileForm),
        errors: @json($errors->toArray()),
        status: @json(session('status')),
        csrfToken: '{{ csrf_token() }}',
        whatsappNumber: '237672251531',
    };
</script>
</body>
</html>
