import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/pages/landing.jsx',
                'resources/js/pages/login.jsx',
                'resources/js/pages/register.jsx',
                'resources/js/pages/dashboard.jsx',
                'resources/js/pages/chat.jsx',
                'resources/js/pages/profile.jsx',
                'resources/js/pages/credits.jsx',
            ],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
});
