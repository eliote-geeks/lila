<nav x-data="{ open: false }" class="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
            <div class="flex items-center gap-2">
                <a href="{{ url('/') }}" class="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
                    <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <span class="text-sm font-semibold">CH</span>
                    </div>
                    <span>CamerHub</span>
                </a>
            </div>

            <div class="hidden md:flex items-center gap-1">
                <x-nav-link :href="url('/chat')" :active="request()->is('chat')">
                    Messagerie
                </x-nav-link>
                <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
                    Tableau de bord
                </x-nav-link>
                <x-nav-link :href="route('profile.edit')" :active="request()->routeIs('profile.edit')">
                    Profil
                </x-nav-link>
            </div>

            <div class="hidden md:flex items-center gap-3">
                <x-dropdown align="right" width="48">
                    <x-slot name="trigger">
                        <button class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition">
                            <div>{{ Auth::user()->name }}</div>
                            <svg class="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </x-slot>

                    <x-slot name="content">
                        <x-dropdown-link :href="route('profile.edit')">
                            {{ __('Mon profil') }}
                        </x-dropdown-link>

                        <form method="POST" action="{{ route('logout') }}">
                            @csrf

                            <x-dropdown-link :href="route('logout')"
                                    onclick="event.preventDefault(); this.closest('form').submit();">
                                {{ __('Se déconnecter') }}
                            </x-dropdown-link>
                        </form>
                    </x-slot>
                </x-dropdown>
            </div>

            <div class="md:hidden">
                <button @click="open = ! open" class="p-2 rounded-lg hover:bg-muted transition touch-target" aria-label="Ouvrir le menu">
                    <svg class="h-6 w-6 text-foreground" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path :class="{'hidden': open, 'inline-flex': ! open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path :class="{'hidden': ! open, 'inline-flex': open }" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <div :class="{'block': open, 'hidden': ! open}" class="hidden md:hidden border-t border-border bg-card">
        <div class="px-4 py-4 space-y-2">
            <x-responsive-nav-link :href="url('/chat')" :active="request()->is('chat')">
                Messagerie
            </x-responsive-nav-link>
            <x-responsive-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
                Tableau de bord
            </x-responsive-nav-link>
            <x-responsive-nav-link :href="route('profile.edit')" :active="request()->routeIs('profile.edit')">
                Profil
            </x-responsive-nav-link>

            <div class="border-t border-border pt-4 mt-4 text-sm">
                <div class="text-foreground font-medium">{{ Auth::user()->name }}</div>
                <div class="text-muted-foreground text-xs">{{ Auth::user()->email }}</div>
            </div>

            <form method="POST" action="{{ route('logout') }}" class="pt-2">
                @csrf
                <x-responsive-nav-link :href="route('logout')"
                        onclick="event.preventDefault(); this.closest('form').submit();">
                    {{ __('Se déconnecter') }}
                </x-responsive-nav-link>
            </form>
        </div>
    </div>
</nav>
