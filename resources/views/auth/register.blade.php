<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Inscription - CamerHub</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/pages/register.jsx'])
</head>
<body>
<div id="app"></div>
<script>
    window.CamerHub = {
        csrfToken: '{{ csrf_token() }}',
    };
</script>
</body>
</html>
