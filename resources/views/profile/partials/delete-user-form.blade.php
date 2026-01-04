<section class="space-y-4">
    <header>
        <h2 class="text-lg font-medium text-foreground">
            {{ __('Supprimer le compte') }}
        </h2>

        <p class="mt-1 text-sm text-muted-foreground">
            {{ __('Cette action est définitive. Téléchargez vos données avant de continuer.') }}
        </p>
    </header>

    <x-danger-button
        x-data=""
        x-on:click.prevent="$dispatch('open-modal', 'confirm-user-deletion')"
    >{{ __('Supprimer le compte') }}</x-danger-button>

    <x-modal name="confirm-user-deletion" :show="$errors->userDeletion->isNotEmpty()" focusable>
        <form method="post" action="{{ route('profile.destroy') }}" class="p-6 space-y-4">
            @csrf
            @method('delete')

            <h2 class="text-lg font-medium text-foreground">
                {{ __('Confirmer la suppression ?') }}
            </h2>

            <p class="text-sm text-muted-foreground">
                {{ __('Cette action supprimera définitivement votre compte et toutes vos données.') }}
            </p>

            <div>
                <x-input-label for="password" value="{{ __('Mot de passe') }}" class="sr-only" />

                <x-text-input
                    id="password"
                    name="password"
                    type="password"
                    class="mt-1 block w-full"
                    placeholder="{{ __('Mot de passe') }}"
                />

                <x-input-error :messages="$errors->userDeletion->get('password')" class="mt-2" />
            </div>

            <div class="flex justify-end gap-3">
                <x-secondary-button x-on:click="$dispatch('close')">
                    {{ __('Annuler') }}
                </x-secondary-button>

                <x-danger-button>
                    {{ __('Supprimer') }}
                </x-danger-button>
            </div>
        </form>
    </x-modal>
</section>
