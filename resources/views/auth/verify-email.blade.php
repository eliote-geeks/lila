<x-guest-layout>
    <div class="text-sm text-muted-foreground mb-4">
        {{ __('Merci pour votre inscription ! Vérifiez votre adresse email en cliquant sur le lien que nous venons d’envoyer. Si vous ne l’avez pas reçu, nous pouvons renvoyer un email.') }}
    </div>

    @if (session('status') == 'verification-link-sent')
        <div class="mb-4 font-medium text-sm text-success">
            {{ __('Un nouveau lien de vérification a été envoyé à votre adresse email.') }}
        </div>
    @endif

    <div class="flex items-center justify-between gap-4">
        <form method="POST" action="{{ route('verification.send') }}">
            @csrf
            <x-primary-button>
                {{ __('Renvoyer l’email de vérification') }}
            </x-primary-button>
        </form>

        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="text-sm text-muted-foreground hover:text-foreground hover:underline">
                {{ __('Se déconnecter') }}
            </button>
        </form>
    </div>
</x-guest-layout>
