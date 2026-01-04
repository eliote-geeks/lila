import React, { useState } from 'react';
import { Menu, X, User, LogOut, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const Header = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isActive = (path) => currentPath === path;
  const goTo = (path) => {
    window.location.href = path;
  };

  const userInitials = user?.name
    ? user.name.split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase()
    : 'U';
  
  const navLinks = user ? [
    { path: '/dashboard', label: 'Tableau de bord' },
    { path: '/chat', label: 'Discuter avec Lila' },
    { path: '/profile', label: 'Mon profil' },
  ] : [];

  return (
    <header className="sticky top-0 z-50 glass border-b border-[var(--gris-clair)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[var(--bleu-roi)] flex items-center justify-center transition-transform group-hover:scale-105">
              <Sparkles className="w-6 h-6 text-[var(--or)]" />
            </div>
            <span className="font-['Sora'] font-bold text-xl text-[var(--bleu-nuit)]">
              Camer<span className="text-[var(--bleu-roi)]">Hub</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-[var(--bleu-roi)]'
                    : 'text-[var(--bleu-nuit)] hover:text-[var(--bleu-roi)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <a href="/credits">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--gris-clair)] hover:bg-[var(--or)]/20 transition-colors cursor-pointer">
                    <span className="text-[var(--or)] font-semibold">{user?.credits ?? 0}</span>
                    <span className="text-sm text-[var(--bleu-nuit)]">crédits</span>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-9 h-9 rounded-full border-2 border-[var(--bleu-roi)]"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full border-2 border-[var(--bleu-roi)] bg-[var(--bleu-roi)] text-white text-xs font-semibold flex items-center justify-center">
                      {userInitials}
                    </div>
                  )}
                  <button
                    onClick={onLogout}
                    className="p-2 rounded-lg hover:bg-[var(--gris-clair)] transition-colors"
                    title="Se déconnecter"
                  >
                    <LogOut className="w-5 h-5 text-[var(--bleu-nuit)]" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => goTo('/login')}
                  className="text-[var(--bleu-nuit)] hover:text-[var(--bleu-roi)]"
                >
                  Se connecter
                </Button>
                <Button
                  onClick={() => goTo('/register')}
                  className="btn-primary"
                >
                  Créer un compte
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--gris-clair)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[var(--bleu-nuit)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--bleu-nuit)]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--gris-clair)] animate-fadeIn">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-[var(--bleu-roi)]/10 text-[var(--bleu-roi)]'
                      : 'text-[var(--bleu-nuit)] hover:bg-[var(--gris-clair)]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {user ? (
                <>
                  <a
                    href="/credits"
                    className="px-4 py-3 rounded-lg font-medium text-[var(--bleu-nuit)] hover:bg-[var(--gris-clair)] flex items-center justify-between"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Acheter des crédits</span>
                    <span className="text-[var(--or)] font-semibold">{user?.credits ?? 0} crédits</span>
                  </a>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 text-left flex items-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Se déconnecter
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      goTo('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    Se connecter
                  </Button>
                  <Button
                    onClick={() => {
                      goTo('/register');
                      setMobileMenuOpen(false);
                    }}
                    className="btn-primary w-full justify-center"
                  >
                    Créer un compte
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
