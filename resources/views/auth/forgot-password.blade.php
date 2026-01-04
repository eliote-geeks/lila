<x-guest-layout>
    <div class="text-sm text-muted-foreground mb-4">
        {{ __('Mot de passe oublié ? Indiquez votre adresse email et nous vous enverrons un lien de réinitialisation.') }}
    </div>

    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('password.email') }}" class="space-y-4">
        @csrf

        <div>
            <x-input-label for="email" :value="__('Adresse email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus placeholder="vous@exemple.com" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <x-primary-button class="w-full justify-center">
            {{ __('Envoyer le lien de réinitialisation') }}
        </x-primary-button>
    </form>
</x-guest-layout>
