import React from 'react';
import { Sparkles, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[var(--bleu-nuit)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--bleu-roi)] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[var(--or)]" />
              </div>
              <span className="font-['Sora'] font-bold text-xl text-white">
                Camer<span className="text-[var(--or)]">Hub</span>
              </span>
            </a>
            <p className="text-white text-sm leading-relaxed">
              Votre assistante intelligente pour trouver l'emploi de vos rêves au Cameroun.
            </p>
            <div className="flex items-center gap-2 text-[var(--or)]">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">Discutez avec Lila sur WhatsApp</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-['Sora'] font-semibold text-lg mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-white hover:text-[var(--or)] transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-white hover:text-[var(--or)] transition-colors">
                  Tableau de bord
                </a>
              </li>
              <li>
                <a href="/chat" className="text-white hover:text-[var(--or)] transition-colors">
                  Discuter avec Lila
                </a>
              </li>
              <li>
                <a href="/credits" className="text-white hover:text-[var(--or)] transition-colors">
                  Acheter des crédits
                </a>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="font-['Sora'] font-semibold text-lg mb-4">Informations</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#pricing" className="text-white hover:text-[var(--or)] transition-colors">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-white hover:text-[var(--or)] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-[var(--or)] transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-[var(--or)] transition-colors">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Sora'] font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white">
                <Mail className="w-5 h-5 text-[var(--or)]" />
                <span>contact@camerhub.cm</span>
              </li>
              <li className="flex items-center gap-3 text-white">
                <Phone className="w-5 h-5 text-[var(--or)]" />
                <span>+237 672 251 531</span>
              </li>
              <li className="flex items-center gap-3 text-white">
                <MapPin className="w-5 h-5 text-[var(--or)]" />
                <span>Douala, Cameroun</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white text-sm">
              © 2025 CamerHub. Tous droits réservés.
            </p>
            <p className="text-white text-xs">
              Fait avec ❤️ au Cameroun
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
