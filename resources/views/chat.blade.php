<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CamerHub · Messagerie</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="antialiased">
    <div class="relative min-h-screen overflow-hidden">
        <div class="absolute inset-0 dot-grid opacity-50 pointer-events-none"></div>
        <div class="max-w-6xl mx-auto px-6 py-8">
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl glass shadow-glow flex items-center justify-center">
                        <span class="text-sky-200 font-semibold text-lg">CH</span>
                    </div>
                    <div>
                        <p class="text-white font-semibold text-lg leading-none">CamerHub · Messagerie</p>
                        <p class="text-slate-400 text-xs">Web & WhatsApp synchronisés</p>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-sm">
                    <a href="{{ url('/') }}" class="px-4 py-2 rounded-full pill text-slate-200 border border-slate-700 hover:border-slate-500 transition">Retour accueil</a>
                    <a href="https://wa.me/" target="_blank" class="px-4 py-2 rounded-full gradient-border relative overflow-hidden text-white font-semibold shadow-glow">
                        <span class="relative z-10">Continuer sur WhatsApp</span>
                    </a>
                </div>
            </div>

            <div class="glass rounded-3xl border border-slate-800 p-5 sm:p-6 shadow-glow">
                <div class="flex flex-col lg:flex-row gap-6">
                    <div class="lg:w-1/3 space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-400 flex items-center justify-center text-slate-900 font-semibold">AI</div>
                            <div>
                                <p class="text-white font-semibold">Lila · IA CamerHub</p>
                                <p class="text-slate-400 text-xs">Temps réel</p>
                            </div>
                        </div>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            Discuter via Web ou WhatsApp : c’est la même IA et les messages sont journalisés en base. Brancher `/api/chat` + SSE/WebSocket pour activer le temps réel.
                        </p>
                        <div class="grid grid-cols-2 gap-3">
                            <button data-prompt="Trouve-moi des offres product manager à Douala" class="text-left text-sm pill px-3 py-2 border border-slate-700 hover:border-slate-500 transition text-white">
                                Product Manager · Douala
                            </button>
                            <button data-prompt="Analyse mon profil développeur backend 5 ans en Laravel" class="text-left text-sm pill px-3 py-2 border border-slate-700 hover:border-slate-500 transition text-white">
                                Dev Backend · Laravel
                            </button>
                            <button data-prompt="Je veux des stages data pour débutant à Yaoundé" class="text-left text-sm pill px-3 py-2 border border-slate-700 hover:border-slate-500 transition text-white">
                                Stage Data · Yaoundé
                            </button>
                            <button data-prompt="Prépare un CV et une lettre pour cette offre marketing" class="text-left text-sm pill px-3 py-2 border border-slate-700 hover:border-slate-500 transition text-white">
                                CV + Lettre · Marketing
                            </button>
                        </div>
                        <div class="rounded-2xl pill border border-slate-700 px-4 py-3 text-xs text-slate-300">
                            Intégration à faire : POST `/api/chat` → n8n → réponse SSE/WebSocket → insert `chat_messages` (in/out) pour audit complet.
                        </div>
                    </div>

                    <div class="lg:w-2/3">
                        <div class="glass rounded-3xl border border-slate-800 p-4 sm:p-5 h-[560px] flex flex-col">
                            <div class="flex items-center justify-between mb-3">
                                <div>
                                    <p class="text-white font-semibold text-sm">Session live</p>
                                    <p class="text-slate-400 text-xs">ID généré localement</p>
                                </div>
                                <span data-typing class="hidden text-xs text-slate-300">Lila écrit…</span>
                            </div>
                            <div class="flex-1 overflow-y-auto scroll-thin space-y-2 pr-1" data-chat-feed></div>
                            <form data-chat-form class="mt-4 flex items-center gap-3">
                                <input data-chat-input type="text" placeholder="Écrire à Lila…" class="flex-1 rounded-2xl px-4 py-3 bg-slate-900/60 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none">
                                <button type="submit" class="px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-fuchsia-400 text-slate-900 font-semibold shadow-glow">
                                    Envoyer
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
