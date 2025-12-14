<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-white leading-tight">
            Profil professionnel
        </h2>
        <p class="text-slate-300 text-sm">Tes informations pour mieux cibler les offres.</p>
    </x-slot>

    <div class="grid lg:grid-cols-[1.2fr,0.8fr] gap-6">
        <div class="glass rounded-3xl border border-slate-800 p-6 shadow-glow">
            <h3 class="text-lg font-semibold text-white mb-4">Informations principales</h3>

            @if (session('status') === 'profile-updated')
                <p class="text-sm text-sky-300 mb-3">Profil mis à jour.</p>
            @endif

            <form method="post" action="{{ route('profile.update') }}" class="space-y-4">
                @csrf
                @method('patch')

                <div>
                    <x-input-label for="name" :value="__('Nom complet')" />
                    <x-text-input id="name" name="name" type="text" class="block mt-1 w-full"
                        :value="old('name', $user->name)" required autofocus autocomplete="name" />
                    <x-input-error :messages="$errors->get('name')" class="mt-2" />
                </div>

                <div>
                    <x-input-label for="email" :value="__('Email')" />
                    <x-text-input id="email" name="email" type="email" class="block mt-1 w-full"
                        :value="old('email', $user->email)" required autocomplete="username" />
                    <x-input-error :messages="$errors->get('email')" class="mt-2" />
                </div>

                <div class="grid sm:grid-cols-2 gap-3">
                    <div>
                        <x-input-label for="city" :value="__('Ville')" />
                        <x-text-input id="city" name="city" type="text" class="block mt-1 w-full"
                            :value="old('city')" placeholder="Douala, Yaoundé..." />
                    </div>
                    <div>
                        <x-input-label for="role" :value="__('Métier / Poste visé')" />
                        <x-text-input id="role" name="role" type="text" class="block mt-1 w-full"
                            :value="old('role')" placeholder="Product Manager, Dev Backend..." />
                    </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-3">
                    <div>
                        <x-input-label for="experience" :value="__('Années d’expérience')" />
                        <x-text-input id="experience" name="experience" type="number" min="0" class="block mt-1 w-full"
                            :value="old('experience')" placeholder="5" />
                    </div>
                    <div>
                        <x-input-label for="salary" :value="__('Salaire souhaité (FCFA)')" />
                        <x-text-input id="salary" name="salary" type="number" min="0" class="block mt-1 w-full"
                            :value="old('salary')" placeholder="400000" />
                    </div>
                </div>

                <div>
                    <x-input-label for="skills" :value="__('Compétences clés')" />
                    <textarea id="skills" name="skills" rows="3" class="block mt-1 w-full"
                        placeholder="Laravel, React, Gestion de produit, Data...">{{ old('skills') }}</textarea>
                </div>

                <div>
                    <x-input-label for="bio" :value="__('Résumé rapide')" />
                    <textarea id="bio" name="bio" rows="3" class="block mt-1 w-full"
                        placeholder="Parle de ton parcours et de ce que tu recherches.">{{ old('bio') }}</textarea>
                </div>

                <div class="flex justify-end">
                    <x-primary-button>{{ __('Enregistrer') }}</x-primary-button>
                </div>
            </form>
        </div>

        <div class="space-y-4">
            <div class="glass rounded-3xl border border-slate-800 p-5 shadow-glow">
                <h3 class="text-lg font-semibold text-white mb-2">Mot de passe</h3>
                <p class="text-slate-300 text-sm mb-3">Change ton mot de passe si besoin.</p>
                @include('profile.partials.update-password-form')
            </div>

            <div class="glass rounded-3xl border border-slate-800 p-5 shadow-glow">
                <h3 class="text-lg font-semibold text-white mb-2">Suppression du compte</h3>
                <p class="text-slate-300 text-sm mb-3">Action définitive.</p>
                @include('profile.partials.delete-user-form')
            </div>
        </div>
    </div>
</x-app-layout>
