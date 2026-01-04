import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  GraduationCap,
  FileText,
  Plus,
  X,
  Save,
  ArrowLeft,
  Info
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
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
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.profile?.phone || '',
    city: user.profile?.city || '',
    experience: user.profile?.experience || '',
    sector: user.profile?.sector || '',
    education: user.profile?.education || '',
    skills: user.profile?.skills || [],
    bio: '',
  });
  const [newSkill, setNewSkill] = useState('');
  const [saving, setSaving] = useState(false);

  const cities = [
    'Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua', 
    'Maroua', 'Ngaoundéré', 'Bertoua', 'Ebolowa', 'Kribi'
  ];

  const sectors = [
    'Informatique & Tech', 'Finance & Comptabilité', 'Marketing & Communication',
    'Vente & Commerce', 'Ressources Humaines', 'Santé', 'Enseignement',
    'BTP & Construction', 'Agriculture', 'Transport & Logistique', 'Autre'
  ];

  const experienceLevels = [
    'Débutant (0-1 an)', '2-3 ans', '4-5 ans', '6-10 ans', 'Plus de 10 ans'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call (will be replaced with real backend)
    setTimeout(() => {
      setSaving(false);
      // Show success message
      alert('Profil mis à jour avec succès !');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--blanc)]">
      <Header user={user} onLogout={onLogout} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-[var(--bleu-nuit)] hover:text-[var(--bleu-roi)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-['Sora'] text-3xl font-bold text-[var(--bleu-nuit)] mb-2">
            Mon profil
          </h1>
          <p className="text-gray-600">
            Completez votre profil pour que Lila puisse mieux vous aider
          </p>
        </div>
        
        {/* Info Banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bleu-roi)]/5 border border-[var(--bleu-roi)]/20 mb-8">
          <Info className="w-5 h-5 text-[var(--bleu-roi)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--bleu-nuit)]">
            <strong>Conseil :</strong> Votre profil aide Lila à mieux vous proposer des offres. 
            Plus il est complet, plus les recommandations seront pertinentes.
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <section className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
            <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--bleu-roi)]" />
              Informations personnelles
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jean-Pierre Kamga"
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className="h-12 pl-10"
                    disabled
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+237 6 XX XX XX XX"
                    className="h-12 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Select value={formData.city} onValueChange={(value) => handleSelectChange('city', value)}>
                  <SelectTrigger className="h-12">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                    <SelectValue placeholder="Sélectionnez votre ville" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
          
          {/* Professional Information */}
          <section className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
            <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)] mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[var(--bleu-roi)]" />
              Expérience professionnelle
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sector">Secteur d'activité</Label>
                <Select value={formData.sector} onValueChange={(value) => handleSelectChange('sector', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sélectionnez un secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Niveau d'expérience</Label>
                <Select value={formData.experience} onValueChange={(value) => handleSelectChange('experience', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sélectionnez votre expérience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="education">Formation</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder="Ex: Licence en Informatique, Université de Douala"
                    className="h-12 pl-10"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Skills */}
          <section className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
            <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)] mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[var(--bleu-roi)]" />
              Compétences
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Ajouter une compétence (ex: Excel, Communication)"
                  className="h-12"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button 
                  type="button"
                  onClick={addSkill}
                  className="h-12 px-6 bg-[var(--bleu-roi)] hover:bg-[var(--bleu-nuit)]"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bleu-roi)]/10 text-[var(--bleu-roi)]"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* Bio */}
          <section className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
            <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)] mb-6">
              À propos de vous
            </h2>
            
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Présentez-vous brièvement : vos motivations, ce que vous recherchez, vos points forts..."
              className="min-h-[150px] resize-none"
            />
          </section>
          
          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="px-8 h-12"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="btn-gold px-8 h-12"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[var(--bleu-nuit)] border-t-transparent rounded-full animate-spin" />
                  Enregistrement...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Enregistrer le profil
                </span>
              )}
            </Button>
          </div>
        </form>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
