<button {{ $attributes->merge(['type' => 'submit', 'class' => 'inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-target']) }}>
    {{ $slot }}
</button>
