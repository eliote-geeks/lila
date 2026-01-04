@props(['active'])

@php
$classes = ($active ?? false)
            ? 'block w-full px-3 py-2 rounded-lg text-start text-sm font-medium bg-primary/10 text-primary transition'
            : 'block w-full px-3 py-2 rounded-lg text-start text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>
