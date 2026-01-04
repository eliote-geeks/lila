import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

const RegisterPage = () => {
  const csrfToken = window?.CamerHub?.csrfToken || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--blanc)] via-[var(--gris-clair)] to-[#D4E0F7] flex items-center justify-center p-4">
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--bleu-roi)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--or)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative w-full max-w-md">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[var(--bleu-roi)] flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-[var(--or)]" />
            </div>
            <h1 className="font-['Sora'] text-2xl font-bold text-[var(--bleu-nuit)]">
              Camer<span className="text-[var(--bleu-roi)]">Hub</span>
            </h1>
            <p className="text-gray-500 mt-2 text-center">
              Creez votre compte et recevez 30 credits gratuits
            </p>
          </div>

          <form method="POST" action="/register" className="space-y-4">
            <input type="hidden" name="_token" value={csrfToken} />
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--bleu-nuit)]" htmlFor="name">Nom complet</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full h-12 px-4 rounded-xl border border-[var(--gris-clair)] bg-white text-[var(--bleu-nuit)] focus:outline-none focus:ring-2 focus:ring-[var(--bleu-roi)]"
                placeholder="Jean-Pierre Kamga"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--bleu-nuit)]" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full h-12 px-4 rounded-xl border border-[var(--gris-clair)] bg-white text-[var(--bleu-nuit)] focus:outline-none focus:ring-2 focus:ring-[var(--bleu-roi)]"
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--bleu-nuit)]" htmlFor="password">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                className="w-full h-12 px-4 rounded-xl border border-[var(--gris-clair)] bg-white text-[var(--bleu-nuit)] focus:outline-none focus:ring-2 focus:ring-[var(--bleu-roi)]"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--bleu-nuit)]" htmlFor="password_confirmation">Confirmer le mot de passe</label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                autoComplete="new-password"
                className="w-full h-12 px-4 rounded-xl border border-[var(--gris-clair)] bg-white text-[var(--bleu-nuit)] focus:outline-none focus:ring-2 focus:ring-[var(--bleu-roi)]"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg btn-primary">
              Creer mon compte
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Deja un compte ?{' '}
            <a href="/login" className="text-[var(--bleu-roi)] hover:underline">Se connecter</a>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          En continuant, vous acceptez nos{' '}
          <a href="#" className="text-[var(--bleu-roi)] hover:underline">Conditions d'utilisation</a>
          {' '}et notre{' '}
          <a href="#" className="text-[var(--bleu-roi)] hover:underline">Politique de confidentialite</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
