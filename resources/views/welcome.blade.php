<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CamerHub · Assistant Emploi IA</title>
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%237dd3fc'/%3E%3Cstop offset='1' stop-color='%23c084fc'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='12' fill='%230b0e14'/%3E%3Cpath d='M16 44V20h8c7 0 12 4.5 12 12s-5 12-12 12Zm8-6c3.4 0 6-2.6 6-6s-2.6-6-6-6h-2v12Zm18.5 6-7-12.1 6.5-11.9h6.9l-6.5 11.9 7 12.1Z' fill='url(%23g)'/%3E%3C/svg%3E">
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
                <a href="#steps" class="hover:text-white transition">Comment ça marche</a>
                <a href="#faq" class="hover:text-white transition">FAQ</a>
                <a href="{{ url('/chat') }}" class="px-4 py-2 rounded-full pill text-white border border-slate-700 hover:border-slate-500 transition shadow-glow">
                    Démarrer sur le web
                </a>
            </div>
        </nav>

        <header class="max-w-7xl mx-auto px-6 pb-10 pt-4">
            <div class="grid lg:grid-cols-[1.05fr,0.95fr] gap-12 items-center relative">
                <div class="absolute -left-10 top-10 w-36 h-36 rounded-full bg-sky-400/15 glow-animate"></div>
                <div class="absolute -right-14 top-24 w-32 h-32 rounded-full bg-fuchsia-400/15 glow-animate" style="animation-delay:1.2s"></div>
                <div>
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full pill text-xs text-sky-100 border border-slate-700">
                        <span class="w-2 h-2 rounded-full bg-sky-300 pulse"></span>
                        Trouve un emploi au Cameroun
                    </div>
                    <h1 class="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-[var(--font-display)]">
                        Lila t’aide à décrocher le bon job, simplement.
                    </h1>
                    <p class="mt-4 text-lg text-slate-200 leading-relaxed max-w-2xl">
                        On te propose des offres adaptées à ton profil, on prépare ton CV et ta lettre, et on t’alerte dès qu’une opportunité correspond. Disponible sur le web et sur WhatsApp.
                    </p>
                    <div class="mt-6 flex flex-wrap items-center gap-3">
                        <a href="{{ url('/chat') }}" class="btn-primary">
                            Démarrer sur le web
                        </a>
                        <a href="https://wa.me/237672251531" target="_blank" class="btn-secondary">
                            Démarrer sur WhatsApp
                        </a>
                        <div class="flex items-center gap-3 text-slate-300 text-sm">
                            <div class="w-8 h-8 rounded-full glass flex items-center justify-center text-xs">24/7</div>
                            <span>Réponses rapides · en français et anglais</span>
                        </div>
                        <p class="text-xs text-slate-400 mt-1">Note : WhatsApp peut être restreint pour certains numéros.</p>
                        <div class="flex items-center gap-3 text-sm text-slate-300 mt-2">
                            <a href="{{ url('/login') }}" class="underline text-sky-300">Se connecter</a>
                            <span class="text-slate-500">|</span>
                            <a href="{{ url('/register') }}" class="underline text-sky-300">Créer un compte</a>
                        </div>
                    </div>
                    <div class="mt-8 grid sm:grid-cols-3 gap-4">
                        <div class="glass rounded-2xl p-4 float-soft">
                            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Offres ciblées</p>
                            <p class="text-2xl font-semibold text-white">+72%</p>
                            <p class="text-sm text-slate-300">taux moyen de correspondance</p>
                        </div>
                        <div class="glass rounded-2xl p-4 float-soft delay">
                            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Candidatures</p>
                            <p class="text-2xl font-semibold text-white">10k+</p>
                            <p class="text-sm text-slate-300">envoyées automatiquement</p>
                        </div>
                        <div class="glass rounded-2xl p-4 float-soft">
                            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Alertes</p>
                            <p class="text-2xl font-semibold text-white">1.2s</p>
                            <p class="text-sm text-slate-300">réponse moyenne</p>
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-sky-300/10 blur-3xl"></div>
                    <div class="glass rounded-3xl p-6 shadow-glow border border-slate-800 shimmer float-soft">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <p class="text-slate-300 text-sm">Lila · IA CamerHub</p>
                                <p class="text-slate-500 text-xs">Mode temps réel</p>
                            </div>
                            <span class="px-3 py-1 text-xs rounded-full pill text-sky-100 border border-slate-700">En ligne</span>
                        </div>
                        <div class="overflow-hidden rounded-2xl mb-4 border border-slate-800">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Candidats CamerHub" class="w-full h-44 object-cover">
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
                    <h2 class="text-3xl font-semibold text-white mt-2 font-[var(--font-display)]">Simple, rapide, pensée pour toi.</h2>
                    <p class="text-slate-300 mt-2">Web ou WhatsApp : la même expérience, sans jargon.</p>
                </div>
                <div class="hidden md:flex gap-2">
                    <span class="px-3 py-1 text-xs rounded-full pill text-slate-200 border border-slate-700">Alertes</span>
                    <span class="px-3 py-1 text-xs rounded-full pill text-slate-200 border border-slate-700">CV prêts</span>
                    <span class="px-3 py-1 text-xs rounded-full pill text-slate-200 border border-slate-700">WhatsApp + Web</span>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div class="glass rounded-3xl p-5 shadow-glow">
                    <p class="text-sm uppercase tracking-[0.2em] text-slate-400 mb-2">Offres pour toi</p>
                    <h3 class="text-xl text-white font-semibold mb-2">On filtre, tu choisis</h3>
                    <p class="text-slate-300 text-sm leading-relaxed">On met en avant les offres qui te correspondent, pas tout le marché.</p>
                </div>
                <div class="glass rounded-3xl p-5 shadow-glow">
                    <p class="text-sm uppercase tracking-[0.2em] text-slate-400 mb-2">CV + lettre</p>
                    <h3 class="text-xl text-white font-semibold mb-2">Prêt en quelques secondes</h3>
                    <p class="text-slate-300 text-sm leading-relaxed">On génère pour toi un CV et une lettre. Tu relis, tu envoies.</p>
                </div>
                <div class="glass rounded-3xl p-5 shadow-glow">
                    <p class="text-sm uppercase tracking-[0.2em] text-slate-400 mb-2">Multicanal</p>
                    <h3 class="text-xl text-white font-semibold mb-2">Web & WhatsApp</h3>
                    <p class="text-slate-300 text-sm leading-relaxed">Tu discutes où tu veux, les messages restent synchronisés.</p>
                </div>
            </div>
        </section>

        <section id="steps" class="max-w-7xl mx-auto px-6 pb-14">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Comment ça marche</p>
                    <h2 class="text-3xl font-semibold text-white mt-2 font-[var(--font-display)]">En 4 étapes simples</h2>
                </div>
            </div>
            <div class="grid md:grid-cols-4 gap-3">
                <div class="glass rounded-2xl p-4 border border-slate-800">
                    <p class="text-slate-300 text-sm">1. Tu démarres sur le web ou WhatsApp avec Lila</p>
                </div>
                <div class="glass rounded-2xl p-4 border border-slate-800">
                    <p class="text-slate-300 text-sm">2. Tu partages ton métier, ta ville, tes attentes (salaire, secteur)</p>
                </div>
                <div class="glass rounded-2xl p-4 border border-slate-800">
                    <p class="text-slate-300 text-sm">3. Lila trie les offres et te propose les meilleurs matchs</p>
                </div>
                <div class="glass rounded-2xl p-4 border border-slate-800">
                    <p class="text-slate-300 text-sm">4. On prépare CV + lettre, tu valides et on envoie. Tu reçois les alertes.</p>
                </div>
            </div>
        </section>

        <section class="max-w-7xl mx-auto px-6 pb-16">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Histoires vraies</p>
                    <h2 class="text-3xl font-semibold text-white mt-2 font-[var(--font-display)]">Ils ont trouvé via CamerHub</h2>
                    <p class="text-slate-300 mt-2">Des profils réels, des offres ciblées, des candidatures envoyées en 1 clic.</p>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div class="glass rounded-3xl p-4 border border-slate-800">
                    <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80" alt="Sara, Product Manager" class="w-full h-40 object-cover rounded-2xl mb-3 border border-slate-800">
                    <p class="text-white font-semibold">Sara · Product Manager</p>
                    <p class="text-slate-400 text-sm">Douala · Match 82%</p>
                    <p class="text-slate-300 text-sm mt-2">“Lila m’a envoyé 3 offres pertinentes en 24h. CV + lettre prêts, entretien obtenu en 4 jours.”</p>
                </div>
                <div class="glass rounded-3xl p-4 border border-slate-800">
                    <img src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80" alt="Emmanuel, Dev Backend" class="w-full h-40 object-cover rounded-2xl mb-3 border border-slate-800">
                    <p class="text-white font-semibold">Emmanuel · Dev Backend</p>
                    <p class="text-slate-400 text-sm">Yaoundé · Match 76%</p>
                    <p class="text-slate-300 text-sm mt-2">“On m’a proposé les bonnes offres, CV + lettre prêts. Candidature envoyée le jour même.”</p>
                </div>
                <div class="glass rounded-3xl p-4 border border-slate-800">
                    <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80" alt="Aïcha, Data Analyst" class="w-full h-40 object-cover rounded-2xl mb-3 border border-slate-800">
                    <p class="text-white font-semibold">Aïcha · Data Analyst</p>
                    <p class="text-slate-400 text-sm">Bafoussam · Match 74%</p>
                    <p class="text-slate-300 text-sm mt-2">“Alertes WhatsApp + messagerie web synchronisée. J’ai signé après 2 entretiens.”</p>
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
