<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Connexion - CamerHub</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/pages/login.jsx'])
</head>
<body>
<div id="app"></div>
<script>
    window.CamerHub = {
        csrfToken: '{{ csrf_token() }}',
        errors: @json($errors->toArray()),
        old: @json(['email' => old('email')]),
        status: @json(session('status')),
    };
</script>
</body>
</html>
