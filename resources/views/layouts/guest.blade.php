<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        @viteReactRefresh

        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="antialiased bg-background text-foreground">
        <div class="min-h-screen flex flex-col">
            <header class="px-4 py-6">
                <a href="/" class="flex items-center gap-2 font-heading text-xl font-bold text-foreground w-fit">
                    <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <span class="text-sm font-semibold">CH</span>
                    </div>
                    <span>CamerHub</span>
                </a>
            </header>

            <main class="flex-1 flex items-center justify-center px-4 py-8">
                <div class="w-full max-w-md">
                    <div class="rounded-2xl border border-border bg-card shadow-lg p-6">
                        {{ $slot }}
                    </div>
                    <p class="text-xs text-muted-foreground mt-4 text-center">
                        Besoin d’aide ?
                        <a href="https://wa.me/237672251531" class="text-primary hover:underline">WhatsApp</a>
                        ou
                        <a href="/" class="text-primary hover:underline">Retour à l’accueil</a>
                    </p>
                </div>
            </main>

            <footer class="py-4 text-center text-xs text-muted-foreground">
                © {{ now()->year }} CamerHub. Tous droits réservés.
            </footer>
        </div>
    </body>
</html>
