@props(['active'])

@php
$classes = ($active ?? false)
            ? 'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary transition'
            : 'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>
