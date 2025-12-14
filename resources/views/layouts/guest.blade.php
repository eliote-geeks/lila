<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="antialiased">
        <div class="min-h-screen flex flex-col items-center justify-center px-4 py-10">
            <a href="/" class="mb-6 inline-flex items-center gap-3 text-slate-100">
                <div class="w-12 h-12 rounded-2xl glass shadow-glow flex items-center justify-center">
                    <span class="text-sky-200 font-semibold text-lg">CH</span>
                </div>
                <div>
                    <p class="text-white font-semibold leading-tight">CamerHub</p>
                    <p class="text-slate-400 text-xs">Assistant emploi · Web & WhatsApp</p>
                </div>
            </a>

            <div class="w-full sm:max-w-md glass border border-slate-800 shadow-glow rounded-3xl px-6 py-6 text-slate-100">
                {{ $slot }}
            </div>
            <p class="text-slate-400 text-xs mt-4">Besoin d’aide ? <a href="https://wa.me/237672251531" class="text-sky-300 underline">WhatsApp</a> ou <a href="/" class="text-sky-300 underline">Retour à l’accueil</a></p>
        </div>
    </body>
</html>
