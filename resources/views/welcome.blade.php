<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CamerHub · Assistant Emploi IA</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="antialiased">
    <div class="relative overflow-hidden">
        <div class="absolute inset-0 dot-grid opacity-60 pointer-events-none"></div>
        <nav class="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl glass shadow-glow flex items-center justify-center">
                    <span class="text-sky-200 font-semibold text-lg">CH</span>
                </div>
                <div>
                    <p class="text-white font-semibold text-lg leading-none">CamerHub</p>
                    <p class="text-slate-400 text-xs">Assistant Emploi IA</p>
                </div>
            </div>
            <div class="hidden md:flex items-center gap-6 text-sm text-slate-200">
                <a href="#features" class="hover:text-white transition">Fonctionnalités</a>
                <a href="#faq" class="hover:text-white transition">FAQ</a>
                <a href="{{ url('/chat') }}" class="px-4 py-2 rounded-full pill text-white border border-slate-700 hover:border-slate-500 transition shadow-glow">
                    Lancer CamerHub Web
                </a>
            </div>
        </nav>

        <header class="max-w-7xl mx-auto px-6 pb-10 pt-4">
            <div class="grid lg:grid-cols-[1.05fr,0.95fr] gap-12 items-center">
                <div>
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full pill text-xs text-sky-100 border border-slate-700">
                        <span class="w-2 h-2 rounded-full bg-sky-300 pulse"></span>
                        Temps réel · IA générative · 2025-ready
                    </div>
                    <h1 class="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-[var(--font-display)]">
                        L’agent IA CamerHub qui répond, matche et postule pour vous.
                    </h1>
                    <p class="mt-4 text-lg text-slate-200 leading-relaxed max-w-2xl">
                        Discutez en direct avec Lila, l’IA qui trouve les offres qui vous correspondent, génère vos CV
                        optimisés et suit vos candidatures. Web, WhatsApp, notifications — tout en un.
                    </p>
                    <div class="mt-6 flex flex-wrap items-center gap-3">
                        <a href="{{ url('/chat') }}" class="px-5 py-3 rounded-full gradient-border relative overflow-hidden text-white font-semibold shadow-glow">
                            <span class="relative z-10">Lancer CamerHub Web</span>
                        </a>
                        <a href="https://wa.me/" target="_blank" class="px-5 py-3 rounded-full pill text-slate-200 border border-slate-700 hover:border-slate-500 transition">
                            Continuer sur WhatsApp
                        </a>
                        <div class="flex items-center gap-3 text-slate-300 text-sm">
                            <div class="w-8 h-8 rounded-full glass flex items-center justify-center text-xs">24/7</div>
                            <span>Réponses instantanées · en français et anglais</span>
                        </div>
                    </div>
                    <div class="mt-8 grid sm:grid-cols-3 gap-4">
                        <div class="glass rounded-2xl p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Match IA</p>
                            <p class="text-2xl font-semibold text-white">+72%</p>
                            <p class="text-sm text-slate-300">taux moyen de correspondance</p>
                        </div>
                        <div class="glass rounded-2xl p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Candidatures</p>
                            <p class="text-2xl font-semibold text-white">10k+</p>
                            <p class="text-sm text-slate-300">envoyées automatiquement</p>
                        </div>
                        <div class="glass rounded-2xl p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Temps réel</p>
                            <p class="text-2xl font-semibold text-white">1.2s</p>
                            <p class="text-sm text-slate-300">latence moyenne des réponses</p>
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-sky-300/10 blur-3xl"></div>
                    <div class="glass rounded-3xl p-6 shadow-glow border border-slate-800">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <p class="text-slate-300 text-sm">Lila · IA CamerHub</p>
                                <p class="text-slate-500 text-xs">Mode temps réel</p>
                            </div>
                            <span class="px-3 py-1 text-xs rounded-full pill text-sky-100 border border-slate-700">En ligne</span>
                        </div>
                        <div class="space-y-3 text-sm text-slate-200">
                            <div class="chat-bubble-ai rounded-2xl px-4 py-3">
                                Salut ! Partage ton profil ou l’offre qui t’intéresse, je calcule le match et je prépare ton CV.
                            </div>
                            <div class="chat-bubble-user rounded-2xl px-4 py-3 ml-auto max-w-[80%]">
                                Je cherche un poste de Product Manager à Douala, 5 ans d’expérience.
                            </div>
                            <div class="chat-bubble-ai rounded-2xl px-4 py-3">
                                Parfait. Match estimé: 78%. Je génère un CV optimisé et une lettre personnalisée, tu valides ?
                            </div>
                        </div>
                        <div class="mt-4 rounded-2xl pill border border-slate-700 px-4 py-3 text-xs text-slate-300">
                            Conseils: partage ton secteur, ville, et le salaire cible. Lila filtre et te répond en moins de 2 secondes.
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <section id="features" class="max-w-7xl mx-auto px-6 pb-14">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Plateforme</p>
                    <h2 class="text-3xl font-semibold text-white mt-2 font-[var(--font-display)]">Pensé pour 2025 : rapide, clair, multicanal.</h2>
                    <p class="text-slate-300 mt-2">IA + WhatsApp + Web en un flux unifié, avec scoring en direct.</p>
                </div>
                <div class="hidden md:flex gap-2">
                    <span class="px-3 py-1 text-xs rounded-full pill text-slate-200 border border-slate-700">Gemini 2.0</span>
                    <span class="px-3 py-1 text-xs rounded-full pill text-slate-200 border border-slate-700">Webhook n8n</span>
                    <span class="px-3 py-1 text-xs rounded-full pill text-slate-200 border border-slate-700">Temps réel</span>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div class="glass rounded-3xl p-5 shadow-glow">
                    <p class="text-sm uppercase tracking-[0.2em] text-slate-400 mb-2">Matching IA</p>
                    <h3 class="text-xl text-white font-semibold mb-2">Scores live & recommandations</h3>
                    <p class="text-slate-300 text-sm leading-relaxed">Analyse IA des offres (match, qualité, urgence) et priorisation automatique.</p>
                </div>
                <div class="glass rounded-3xl p-5 shadow-glow">
                    <p class="text-sm uppercase tracking-[0.2em] text-slate-400 mb-2">Candidatures auto</p>
                    <h3 class="text-xl text-white font-semibold mb-2">CV + lettres générés</h3>
                    <p class="text-slate-300 text-sm leading-relaxed">CV HTML/PDF et lettres personnalisées, prêts à être envoyés.</p>
                </div>
                <div class="glass rounded-3xl p-5 shadow-glow">
                    <p class="text-sm uppercase tracking-[0.2em] text-slate-400 mb-2">Multicanal</p>
                    <h3 class="text-xl text-white font-semibold mb-2">Web & WhatsApp synchronisés</h3>
                    <p class="text-slate-300 text-sm leading-relaxed">Conversations centralisées, messages journalisés en base pour suivi.</p>
                </div>
            </div>
        </section>

        <section id="faq" class="max-w-7xl mx-auto px-6 pb-16">
            <div class="glass rounded-3xl border border-slate-800 p-6 lg:p-8 shadow-glow">
                <div class="grid md:grid-cols-3 gap-6">
                    <div>
                        <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Sécurité</p>
                        <h3 class="text-xl text-white font-semibold mt-2">Données chiffrées, webhooks signés</h3>
                        <p class="text-slate-300 text-sm mt-2">Signature HMAC côté Laravel pour chaque callback n8n, journaux en base pour audit.</p>
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Temps réel</p>
                        <h3 class="text-xl text-white font-semibold mt-2">SSE/WebSocket prêt</h3>
                        <p class="text-slate-300 text-sm mt-2">Brancher Echo/Pusher ou un endpoint SSE `/api/chat/stream` pour recevoir les réponses.</p>
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Intégration</p>
                        <h3 class="text-xl text-white font-semibold mt-2">n8n + Laravel</h3>
                        <p class="text-slate-300 text-sm mt-2">Workflow Lila IA déjà prêt côté n8n; cette UI consomme `/api/chat` et journalise les messages.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</body>
</html>
