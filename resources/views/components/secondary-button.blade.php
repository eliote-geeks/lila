<button {{ $attributes->merge(['type' => 'button', 'class' => 'inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-transparent px-6 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-target']) }}>
    {{ $slot }}
</button>
