import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

const LoginPage = () => {
  const csrfToken = window?.CamerHub?.csrfToken || '';
  const errors = window?.CamerHub?.errors || {};
  const old = window?.CamerHub?.old || {};
  const status = window?.CamerHub?.status || null;
  const errorList = Object.values(errors).flat().filter(Boolean);
  const fieldError = (name) => (errors?.[name] ? errors[name][0] : null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--blanc)] via-[var(--gris-clair)] to-[#D4E0F7] flex items-center justify-center p-4">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--bleu-roi)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--or)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative w-full max-w-md">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[var(--bleu-roi)] flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-[var(--or)]" />
            </div>
            <h1 className="font-['Sora'] text-2xl font-bold text-[var(--bleu-nuit)]">
              Camer<span className="text-[var(--bleu-roi)]">Hub</span>
            </h1>
            <p className="text-gray-500 mt-2 text-center">
              Connectez-vous pour accéder à Lila
            </p>
          </div>
          
          {status && (
            <div className="mb-4 rounded-xl border border-[var(--gris-clair)] bg-white px-4 py-3 text-sm text-[var(--bleu-nuit)]">
              {status}
            </div>
          )}

          {errorList.length > 0 && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorList[0]}
            </div>
          )}

          {/* Login Form */}
          <form method="POST" action="/login" className="space-y-4">
            <input type="hidden" name="_token" value={csrfToken} />
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--bleu-nuit)]" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                defaultValue={old.email || ''}
                className="w-full h-12 px-4 rounded-xl border border-[var(--gris-clair)] bg-white text-[var(--bleu-nuit)] focus:outline-none focus:ring-2 focus:ring-[var(--bleu-roi)]"
                placeholder="email@example.com"
              />
              {fieldError('email') && <p className="text-sm text-red-600">{fieldError('email')}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--bleu-nuit)]" htmlFor="password">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full h-12 px-4 rounded-xl border border-[var(--gris-clair)] bg-white text-[var(--bleu-nuit)] focus:outline-none focus:ring-2 focus:ring-[var(--bleu-roi)]"
                placeholder="••••••••"
              />
              {fieldError('password') && <p className="text-sm text-red-600">{fieldError('password')}</p>}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" name="remember" className="rounded border-[var(--gris-clair)]" />
                Se souvenir de moi
              </label>
              <a href="/forgot-password" className="text-[var(--bleu-roi)] hover:underline">Mot de passe oublié ?</a>
            </div>
            <Button type="submit" className="w-full h-12 text-lg btn-primary">
              Se connecter
            </Button>
          </form>
          
          {/* Benefits */}
          <div className="mt-8 p-4 rounded-xl bg-[var(--bleu-roi)]/5">
            <h3 className="font-semibold text-[var(--bleu-nuit)] mb-3 text-center">
              30 crédits gratuits à l'inscription !
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--or)]" />
                Recherchez des offres d'emploi
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--or)]" />
                Générez des CV personnalisés
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--or)]" />
                Postulez en un clic
              </li>
            </ul>
          </div>
          
          {/* Back to Home */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <a href="/" className="hover:text-[var(--bleu-roi)] transition-colors">← Retour à l'accueil</a>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            Pas encore de compte ?{' '}
            <a href="/register" className="text-[var(--bleu-roi)] hover:underline">Créer un compte</a>
          </div>
        </div>
        
        {/* Terms */}
        <p className="text-center text-xs text-gray-400 mt-6">
          En continuant, vous acceptez nos{' '}
          <a href="#" className="text-[var(--bleu-roi)] hover:underline">Conditions d'utilisation</a>
          {' '}et notre{' '}
          <a href="#" className="text-[var(--bleu-roi)] hover:underline">Politique de confidentialité</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
