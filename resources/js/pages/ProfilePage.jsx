import React from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Save,
  ArrowLeft,
  Info,
  Link as LinkIcon,
  Wallet,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { mockUser } from '../data/mock';

const ProfilePage = ({ user = mockUser, onLogout }) => {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = '/dashboard';
  };

  const defaults = window?.CamerHub?.profileForm || {};
  const errors = window?.CamerHub?.errors || {};
  const status = window?.CamerHub?.status || null;
  const csrfToken = window?.CamerHub?.csrfToken || '';

  const errorList = Object.values(errors).flat().filter(Boolean);
  const fieldError = (name) => (errors?.[name] ? errors[name][0] : null);

  return (
    <div className="min-h-screen bg-[var(--blanc)]">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-[var(--bleu-nuit)] hover:text-[var(--bleu-roi)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        <div className="mb-8">
          <h1 className="font-['Sora'] text-3xl font-bold text-[var(--bleu-nuit)] mb-2">
            Mon profil
          </h1>
          <p className="text-gray-600">
            Complétez votre profil pour que Lila vous propose des offres parfaitement adaptées.
          </p>
        </div>

        {status === 'profile-updated' && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            Profil mis à jour avec succès.
          </div>
        )}

        {errorList.length > 0 && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <p className="font-semibold mb-1">Nous n'avons pas pu enregistrer votre profil.</p>
            <ul className="list-disc pl-5 space-y-1">
              {errorList.slice(0, 6).map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bleu-roi)]/5 border border-[var(--bleu-roi)]/20 mb-8">
          <Info className="w-5 h-5 text-[var(--bleu-roi)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--bleu-nuit)]">
            <strong>Conseil :</strong> indiquez clairement vos compétences et les postes souhaités pour recevoir des
            recommandations plus pertinentes.
          </p>
        </div>

        <form method="POST" action="/profile" className="space-y-8">
          <input type="hidden" name="_token" value={csrfToken} />
          <input type="hidden" name="_method" value="PATCH" />

          <section className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
            <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--bleu-roi)]" />
              Informations personnelles
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">Prénom</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  defaultValue={defaults.first_name || ''}
                  placeholder="Jean-Pierre"
                  className="h-12"
                  required
                />
                {fieldError('first_name') && <p className="text-sm text-red-600">{fieldError('first_name')}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Nom</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  defaultValue={defaults.last_name || ''}
                  placeholder="Kamga"
                  className="h-12"
                  required
                />
                {fieldError('last_name') && <p className="text-sm text-red-600">{fieldError('last_name')}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={defaults.email || ''}
                    placeholder="email@example.com"
                    className="h-12 pl-10"
                    required
                  />
                </div>
                {fieldError('email') && <p className="text-sm text-red-600">{fieldError('email')}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone WhatsApp</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={defaults.phone || ''}
                    placeholder="2376XXXXXXXX"
                    className="h-12 pl-10"
                    required
                  />
                </div>
                {fieldError('phone') && <p className="text-sm text-red-600">{fieldError('phone')}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Ville / Localisation</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="location"
                    name="location"
                    defaultValue={defaults.location || ''}
                    placeholder="Douala, Yaoundé..."
                    className="h-12 pl-10"
                    required
                  />
                </div>
                {fieldError('location') && <p className="text-sm text-red-600">{fieldError('location')}</p>}
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
            <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)] mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[var(--bleu-roi)]" />
              Expérience professionnelle
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="current_title">Poste actuel</Label>
                <Input
                  id="current_title"
                  name="current_title"
                  defaultValue={defaults.current_title || ''}
                  placeholder="Ex: Développeur web"
                  className="h-12"
                  required
                />
                {fieldError('current_title') && <p className="text-sm text-red-600">{fieldError('current_title')}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="years_experience">Années d'expérience</Label>
                <Input
                  id="years_experience"
                  name="years_experience"
                  type="number"
                  min="0"
                  defaultValue={defaults.years_experience ?? ''}
                  placeholder="Ex: 3"
                  className="h-12"
                  required
                />
                {fieldError('years_experience') && (
                  <p className="text-sm text-red-600">{fieldError('years_experience')}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="education_level">Niveau d'études</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="education_level"
                    name="education_level"
                    defaultValue={defaults.education_level || ''}
                    placeholder="Ex: Licence, Master..."
                    className="h-12 pl-10"
                  />
                </div>
                {fieldError('education_level') && (
                  <p className="text-sm text-red-600">{fieldError('education_level')}</p>
                )}
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
            <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)] mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[var(--bleu-roi)]" />
              Compétences & objectifs
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="skills">Compétences clés (séparées par des virgules)</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  defaultValue={defaults.skills || ''}
                  placeholder="Ex: JavaScript, React, Gestion de projet"
                  className="min-h-[120px]"
                  required
                />
                {fieldError('skills') && <p className="text-sm text-red-600">{fieldError('skills')}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="languages">Langues</Label>
                <Textarea
                  id="languages"
                  name="languages"
                  defaultValue={defaults.languages || ''}
                  placeholder="Ex: Français, Anglais"
                  className="min-h-[90px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desired_positions">Postes visés</Label>
                <Textarea
                  id="desired_positions"
                  name="desired_positions"
                  defaultValue={defaults.desired_positions || ''}
                  placeholder="Ex: Développeur front-end, Chef de projet"
                  className="min-h-[90px]"
                  required
                />
                {fieldError('desired_positions') && (
                  <p className="text-sm text-red-600">{fieldError('desired_positions')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="desired_sectors">Secteurs visés</Label>
                <Textarea
                  id="desired_sectors"
                  name="desired_sectors"
                  defaultValue={defaults.desired_sectors || ''}
                  placeholder="Ex: Tech, Banque, Santé"
                  className="min-h-[90px]"
                  required
                />
                {fieldError('desired_sectors') && (
                  <p className="text-sm text-red-600">{fieldError('desired_sectors')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="desired_locations">Villes recherchées</Label>
                <Textarea
                  id="desired_locations"
                  name="desired_locations"
                  defaultValue={defaults.desired_locations || ''}
                  placeholder="Ex: Douala, Yaoundé"
                  className="min-h-[90px]"
                  required
                />
                {fieldError('desired_locations') && (
                  <p className="text-sm text-red-600">{fieldError('desired_locations')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="min_salary">Salaire minimum souhaité (FCFA)</Label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="min_salary"
                    name="min_salary"
                    type="number"
                    min="0"
                    defaultValue={defaults.min_salary ?? ''}
                    placeholder="Ex: 150000"
                    className="h-12 pl-10"
                    required
                  />
                </div>
                {fieldError('min_salary') && <p className="text-sm text-red-600">{fieldError('min_salary')}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contract_types">Types de contrat</Label>
                <Textarea
                  id="contract_types"
                  name="contract_types"
                  defaultValue={defaults.contract_types || ''}
                  placeholder="Ex: CDI, CDD, Freelance"
                  className="min-h-[90px]"
                />
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
            <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)] mb-6 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-[var(--bleu-roi)]" />
              Liens professionnels
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="linkedin_url">LinkedIn</Label>
                <Input
                  id="linkedin_url"
                  name="linkedin_url"
                  type="url"
                  defaultValue={defaults.linkedin_url || ''}
                  placeholder="https://linkedin.com/in/..."
                  className="h-12"
                />
                {fieldError('linkedin_url') && <p className="text-sm text-red-600">{fieldError('linkedin_url')}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio_url">Portfolio</Label>
                <Input
                  id="portfolio_url"
                  name="portfolio_url"
                  type="url"
                  defaultValue={defaults.portfolio_url || ''}
                  placeholder="https://votre-portfolio.com"
                  className="h-12"
                />
                {fieldError('portfolio_url') && <p className="text-sm text-red-600">{fieldError('portfolio_url')}</p>}
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <Button type="submit" className="btn-gold px-8 h-12">
              <span className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                Enregistrer le profil
              </span>
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
