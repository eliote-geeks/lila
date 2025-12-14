<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-white leading-tight">
            Tableau de bord
        </h2>
        <p class="text-slate-300 text-sm">Suivi rapide : conversations, candidatures, alertes.</p>
    </x-slot>

    <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="glass rounded-2xl border border-slate-800 p-4 shadow-glow">
            <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Conversations</p>
            <p class="text-2xl font-semibold text-white">5 actives</p>
            <p class="text-slate-300 text-sm">Web + WhatsApp synchronisées</p>
        </div>
        <div class="glass rounded-2xl border border-slate-800 p-4 shadow-glow">
            <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Candidatures</p>
            <p class="text-2xl font-semibold text-white">12 envoyées</p>
            <p class="text-slate-300 text-sm">Dernière : hier</p>
        </div>
        <div class="glass rounded-2xl border border-slate-800 p-4 shadow-glow">
            <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Match moyen</p>
            <p class="text-2xl font-semibold text-white">78%</p>
            <p class="text-slate-300 text-sm">Basé sur tes dernières offres</p>
        </div>
    </div>

    <div class="glass rounded-3xl border border-slate-800 shadow-glow p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
            <div>
                <p class="text-sm text-slate-400 uppercase tracking-[0.18em]">Conversations</p>
                <h3 class="text-lg font-semibold text-white">Messagerie CamerHub</h3>
            </div>
            <a href="{{ url('/chat') }}" class="btn-primary text-sm">Ouvrir la messagerie</a>
        </div>
        <div class="space-y-3 text-sm text-slate-200">
            <div class="glass rounded-2xl border border-slate-800 p-3">
                <div class="flex items-center justify-between">
                    <span class="text-slate-100">Session Web · Lila</span>
                    <span class="text-xs text-slate-400">il y a 2 min</span>
                </div>
                <p class="text-slate-300 text-sm mt-1">“Je peux te proposer 3 offres product manager à Douala. Tu veux que je prépare le CV ?”</p>
            </div>
            <div class="glass rounded-2xl border border-slate-800 p-3">
                <div class="flex items-center justify-between">
                    <span class="text-slate-100">WhatsApp · +237672251531</span>
                    <span class="text-xs text-slate-400">il y a 10 min</span>
                </div>
                <p class="text-slate-300 text-sm mt-1">“Oui, je suis preneur pour les offres data à Yaoundé.”</p>
            </div>
        </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-4">
        <div class="glass rounded-3xl border border-slate-800 shadow-glow p-6">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <p class="text-sm text-slate-400 uppercase tracking-[0.18em]">Candidatures</p>
                    <h3 class="text-lg font-semibold text-white">Tes envois récents</h3>
                </div>
                <a href="#" class="btn-secondary text-sm">Voir tout</a>
            </div>
            <div class="space-y-3 text-sm text-slate-200">
                <div class="glass rounded-2xl border border-slate-800 p-3">
                    <div class="flex items-center justify-between">
                        <span class="text-slate-100">Product Manager · Douala</span>
                        <span class="text-xs text-slate-400">Envoyée</span>
                    </div>
                    <p class="text-slate-300 text-sm mt-1">CV + lettre envoyés hier · Match 82%</p>
                </div>
                <div class="glass rounded-2xl border border-slate-800 p-3">
                    <div class="flex items-center justify-between">
                        <span class="text-slate-100">Data Analyst · Yaoundé</span>
                        <span class="text-xs text-slate-400">En attente</span>
                    </div>
                    <p class="text-slate-300 text-sm mt-1">CV généré · lettre à valider · Match 74%</p>
                </div>
            </div>
        </div>

        <div class="glass rounded-3xl border border-slate-800 shadow-glow p-6">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <p class="text-sm text-slate-400 uppercase tracking-[0.18em]">Alertes</p>
                    <h3 class="text-lg font-semibold text-white">Offres qui matchent</h3>
                </div>
                <span class="text-xs text-slate-400">Mises à jour en continu</span>
            </div>
            <div class="space-y-3 text-sm text-slate-200">
                <div class="glass rounded-2xl border border-slate-800 p-3">
                    <div class="flex items-center justify-between">
                        <span class="text-slate-100">Dev Backend · Remote</span>
                        <span class="text-xs text-slate-400">Match 80%</span>
                    </div>
                    <p class="text-slate-300 text-sm mt-1">Proposée il y a 30 min · Salaire : à négocier</p>
                </div>
                <div class="glass rounded-2xl border border-slate-800 p-3">
                    <div class="flex items-center justify-between">
                        <span class="text-slate-100">Chef de projet · Douala</span>
                        <span class="text-xs text-slate-400">Match 75%</span>
                    </div>
                    <p class="text-slate-300 text-sm mt-1">Deadline dans 5 jours · CDI</p>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
