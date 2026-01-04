<x-guest-layout>
    <div class="text-sm text-muted-foreground mb-4">
        {{ __('Zone sécurisée. Merci de confirmer votre mot de passe pour continuer.') }}
    </div>

    <form method="POST" action="{{ route('password.confirm') }}" class="space-y-4">
        @csrf

        <div>
            <x-input-label for="password" :value="__('Mot de passe')" />
            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="current-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <x-primary-button class="w-full justify-center">
            {{ __('Confirmer') }}
        </x-primary-button>
    </form>
</x-guest-layout>
