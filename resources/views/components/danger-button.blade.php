<button {{ $attributes->merge(['type' => 'submit', 'class' => 'inline-flex items-center justify-center gap-2 rounded-lg bg-destructive px-6 py-2 text-sm font-medium text-destructive-foreground shadow-sm transition-all duration-200 hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-target']) }}>
    {{ $slot }}
</button>
