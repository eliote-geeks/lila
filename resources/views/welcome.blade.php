<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CamerHub</title>
    @vite(['resources/css/app.css', 'resources/js/pages/landing.jsx'])
</head>
<body>
@php
    $userData = auth()->user() ? [
        'id' => auth()->id(),
        'name' => auth()->user()->name,
        'email' => auth()->user()->email,
    ] : null;
@endphp
<div id="app"></div>
<form id="logout-form" method="POST" action="{{ route('logout') }}" class="hidden">
    @csrf
</form>
<script>
    window.CamerHub = {
        user: @json($userData),
        whatsappNumber: '237672251531',
    };
</script>
</body>
</html>
