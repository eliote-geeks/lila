import React from 'react';
import { 
  Sparkles, 
  Search, 
  FileText, 
  Send, 
  MessageCircle, 
  Star,
  ChevronRight,
  Zap,
  Shield,
  Clock,
  Check
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { mockTestimonials, mockFAQ } from '../data/mock';

const LandingPage = ({ user, onLogout }) => {
  const handleWebStart = () => {
    if (user) {
      window.location.href = '/dashboard';
      return;
    }
    window.location.href = '/register';
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = window?.CamerHub?.whatsappNumber || '237672251531';
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[var(--blanc)]">
      <Header user={user} onLogout={onLogout} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--blanc)] via-[var(--gris-clair)] to-[#D4E0F7] opacity-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--bleu-roi)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--or)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slideUp">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--or)] bg-opacity-20 border border-[var(--or)] border-opacity-30">
                <Sparkles className="w-4 h-4 text-[var(--or)]" />
                <span className="text-sm font-medium text-[var(--bleu-nuit)]">Votre assistante emploi intelligente</span>
              </div>
              
              <h1 className="font-['Sora'] text-4xl lg:text-6xl font-bold text-[var(--bleu-nuit)] leading-tight">
                Lila trouve, analyse et
                <span className="text-[var(--bleu-roi)]"> postule pour vous</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Découvrez une nouvelle façon de chercher un emploi au Cameroun. 
                Lila, votre assistante IA, s'occupe de tout pendant que vous vous concentrez sur l'essentiel.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleWebStart}
                  className="btn-gold text-lg px-8 py-4 h-auto animate-glow"
                >
                  Commencer sur le web
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto border-2 border-[var(--bleu-roi)] text-[var(--bleu-roi)] hover:bg-[var(--bleu-roi)] hover:text-white transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Démarrer sur WhatsApp
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 italic">
                ⚠️ Il est possible que WhatsApp ne fonctionne pas pour certains numéros
              </p>
            </div>
            
            {/* Hero Image/Illustration */}
            <div className="relative animate-float hidden lg:block">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--bleu-roi)] to-[var(--bleu-nuit)] rounded-3xl transform rotate-3 opacity-20" />
                <div className="relative glass rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[var(--or)] flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[var(--bleu-nuit)]" />
                    </div>
                    <div>
                      <h3 className="font-['Sora'] font-semibold text-[var(--bleu-nuit)]">Lila</h3>
                      <p className="text-sm text-gray-500">Votre assistante emploi</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-[var(--bleu-roi)] bg-opacity-10 rounded-2xl rounded-tl-none p-4">
                      <p className="text-[var(--bleu-nuit)]">
                        Bonjour ! J'ai trouvé <strong>5 offres</strong> qui correspondent à votre profil aujourd'hui 🎉
                      </p>
                    </div>
                    <div className="bg-[var(--gris-clair)] rounded-2xl rounded-tr-none p-4 ml-auto max-w-[80%]">
                      <p className="text-[var(--bleu-nuit)]">
                        Super ! Montre-moi les meilleures
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Sora'] text-3xl lg:text-4xl font-bold text-[var(--bleu-nuit)] mb-4">
              Pourquoi choisir CamerHub ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simplifiez votre recherche d'emploi avec une assistante qui travaille pour vous 24h/24
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Search, title: 'Recherche intelligente', desc: 'Lila parcourt des centaines d\'offres pour trouver celles qui vous correspondent' },
              { icon: Zap, title: 'Gain de temps', desc: 'Plus besoin de passer des heures sur différents sites d\'emploi' },
              { icon: Shield, title: 'Candidature sécurisée', desc: 'Chaque candidature nécessite votre confirmation avant envoi' },
              { icon: Clock, title: 'Disponible 24h/24', desc: 'Discutez avec Lila quand vous voulez, sur le web ou WhatsApp' },
            ].map((item, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-[var(--blanc)] border border-[var(--gris-clair)] hover:border-[var(--bleu-roi)] hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--bleu-roi)] bg-opacity-10 flex items-center justify-center mb-6 group-hover:bg-[var(--bleu-roi)] transition-colors">
                  <item.icon className="w-7 h-7 text-[var(--bleu-roi)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-['Sora'] font-semibold text-xl text-[var(--bleu-nuit)] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-[var(--gris-clair)] bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Sora'] text-3xl lg:text-4xl font-bold text-[var(--bleu-nuit)] mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trois étapes simples pour trouver votre prochain emploi
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Créez votre profil', desc: 'Partagez vos compétences, expériences et préférences avec Lila' },
              { step: '2', title: 'Discutez avec Lila', desc: 'Dites-lui ce que vous recherchez, elle trouve les meilleures offres' },
              { step: '3', title: 'Postulez en un clic', desc: 'Lila prépare votre candidature, vous validez, elle envoie' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-[var(--bleu-roi)] flex items-center justify-center mb-6">
                    <span className="font-['Sora'] text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="font-['Sora'] font-semibold text-xl text-[var(--bleu-nuit)] mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-[var(--bleu-roi)]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Sora'] text-3xl lg:text-4xl font-bold text-[var(--bleu-nuit)] mb-4">
              Ils ont trouvé leur emploi grâce à Lila
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="p-8 rounded-2xl bg-[var(--blanc)] border border-[var(--gris-clair)] hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[var(--or)] text-[var(--or)]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-[var(--bleu-nuit)]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[var(--bleu-nuit)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Sora'] text-3xl lg:text-4xl font-bold text-white mb-4">
              Tarifs simples et transparents
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Commencez gratuitement, payez uniquement si vous avez besoin de plus
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-2xl bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20">
              <h3 className="font-['Sora'] text-2xl font-bold text-white mb-2">Essai gratuit</h3>
              <p className="text-gray-400 mb-6">Pour découvrir CamerHub</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-[var(--or)]">30</span>
                <span className="text-xl text-white ml-2">crédits offerts</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Discuter avec Lila', 'Recherche d\'offres', 'Analyse de postes', 'Accès WhatsApp'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-[var(--or)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={handleWebStart}
                variant="outline"
                className="w-full py-6 text-lg border-white text-white hover:bg-white hover:text-[var(--bleu-nuit)] transition-all"
              >
                Commencer gratuitement
              </Button>
            </div>
            
            {/* Monthly Plan */}
            <div className="relative p-8 rounded-2xl bg-white shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 rounded-full bg-[var(--or)] text-[var(--bleu-nuit)] text-sm font-semibold">
                  Populaire
                </span>
              </div>
              <h3 className="font-['Sora'] text-2xl font-bold text-[var(--bleu-nuit)] mb-2">Abonnement mensuel</h3>
              <p className="text-gray-500 mb-6">Pour une recherche active</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-[var(--bleu-roi)]">500</span>
                <span className="text-xl text-gray-600 ml-2">FCFA/mois</span>
              </div>
              <p className="text-[var(--or)] font-semibold mb-6">= 100 crédits chaque mois</p>
              <ul className="space-y-4 mb-8">
                {['Tout de l\'essai gratuit', 'Génération de CV', 'Lettres de motivation', 'Candidature automatique*', 'Support prioritaire'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[var(--bleu-roi)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={handleWebStart}
                className="btn-gold w-full py-6 text-lg"
              >
                S'abonner maintenant
              </Button>
              <p className="text-xs text-gray-500 mt-4 text-center">
                * La candidature automatique demande toujours votre confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Sora'] text-3xl lg:text-4xl font-bold text-[var(--bleu-nuit)] mb-4">
              Questions fréquentes
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {mockFAQ.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-[var(--gris-clair)] rounded-xl px-6 data-[state=open]:bg-[var(--gris-clair)] data-[state=open]:bg-opacity-30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-[var(--bleu-nuit)] hover:text-[var(--bleu-roi)] py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--bleu-roi)] to-[var(--bleu-nuit)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Sora'] text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à trouver votre prochain emploi ?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Rejoignez des milliers de Camerounais qui font confiance à Lila
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleWebStart}
              className="btn-gold text-lg px-10 py-5 h-auto animate-glow"
            >
              Créer mon compte gratuit
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
