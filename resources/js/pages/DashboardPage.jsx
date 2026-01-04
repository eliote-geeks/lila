import React from 'react';
import { 
  Sparkles, 
  CreditCard, 
  Briefcase, 
  FileText, 
  TrendingUp,
  ChevronRight,
  Search,
  Send,
  Clock,
  Star,
  ArrowUpRight,
  MessageCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { mockUser, mockJobs, mockRecentActions } from '../data/mock';

const DashboardPage = ({ user = mockUser, onLogout }) => {
  const goTo = (path) => {
    window.location.href = path;
  };

  const stats = [
    { label: 'Crédits restants', value: user.credits, icon: CreditCard, color: 'var(--or)' },
    { label: 'Offres reçues', value: 12, icon: Briefcase, color: 'var(--bleu-roi)' },
    { label: 'Candidatures', value: 5, icon: Send, color: '#22C55E' },
    { label: 'CV générés', value: 2, icon: FileText, color: '#8B5CF6' },
  ];

  const getMatchColor = (match) => {
    if (match >= 90) return 'text-green-600 bg-green-100';
    if (match >= 75) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  return (
    <div className="min-h-screen bg-[var(--gris-clair)]/30">
      <Header user={user} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-['Sora'] text-3xl font-bold text-[var(--bleu-nuit)] mb-2">
            Bonjour, {user.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-600">
            Voici un résumé de votre activité et les dernières opportunités
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                {index === 0 && (
                  <a 
                    href="/credits"
                    className="text-sm text-[var(--bleu-roi)] hover:underline"
                  >
                    Recharger
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="font-['Sora'] text-2xl font-bold text-[var(--bleu-nuit)]">{stat.value}</p>
            </div>
          ))}
        </div>
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Jobs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--bleu-roi)] to-[var(--bleu-nuit)] text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--or)] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-['Sora'] font-semibold">Actions rapides avec Lila</h3>
                  <p className="text-sm text-white">Que souhaitez-vous faire ?</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <Button 
                  onClick={() => goTo('/chat')}
                  variant="secondary"
                  className="h-auto py-4 flex-col gap-2 bg-white/10 hover:bg-white/20 text-white border-0"
                >
                  <Search className="w-5 h-5" />
                  <span className="text-sm">Rechercher</span>
                </Button>
                <Button 
                  onClick={() => goTo('/chat')}
                  variant="secondary"
                  className="h-auto py-4 flex-col gap-2 bg-white/10 hover:bg-white/20 text-white border-0"
                >
                  <FileText className="w-5 h-5" />
                  <span className="text-sm">Générer CV</span>
                </Button>
                <Button 
                  onClick={() => goTo('/chat')}
                  variant="secondary"
                  className="h-auto py-4 flex-col gap-2 bg-white/10 hover:bg-white/20 text-white border-0"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">Discuter</span>
                </Button>
              </div>
            </div>
            
            {/* Recommended Jobs */}
            <div className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)]">
                  Offres recommandées
                </h2>
                <a 
                  href="/chat"
                  className="text-sm text-[var(--bleu-roi)] hover:underline flex items-center gap-1"
                >
                  Voir toutes
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="space-y-4">
                {mockJobs.slice(0, 3).map((job) => (
                  <div 
                    key={job.id}
                    className="p-4 rounded-xl border border-[var(--gris-clair)] hover:border-[var(--bleu-roi)] hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-[var(--bleu-nuit)] group-hover:text-[var(--bleu-roi)] transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.match)}`}>
                        {job.match}% match
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <CreditCard className="w-4 h-4" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.posted}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.slice(0, 3).map((req, i) => (
                        <span key={i} className="px-2 py-1 rounded-md bg-[var(--gris-clair)] text-xs text-gray-600">
                          {req}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => navigate('/chat')}
                        className="flex-1"
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Analyser
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => navigate('/chat')}
                        className="flex-1 bg-[var(--bleu-roi)] hover:bg-[var(--bleu-nuit)]"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Postuler
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <div className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
              <h3 className="font-['Sora'] font-semibold text-[var(--bleu-nuit)] mb-4">
                Complétion du profil
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Progression</span>
                  <span className="font-medium text-[var(--bleu-roi)]">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Un profil complet aide Lila à trouver de meilleures opportunités
              </p>
              <Button 
                onClick={() => navigate('/profile')}
                variant="outline"
                className="w-full"
              >
                Compléter mon profil
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            {/* Subscription Status */}
            <div className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
              <h3 className="font-['Sora'] font-semibold text-[var(--bleu-nuit)] mb-4">
                Abonnement
              </h3>
              {user.subscription?.active ? (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700">Abonnement actif</span>
                  </div>
                  <p className="text-sm text-green-600">
                    Prochain renouvellement : {user.subscription.nextBilling}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    Passez à l'abonnement pour 100 crédits/mois
                  </p>
                  <Button 
                    onClick={() => navigate('/credits')}
                    className="w-full btn-gold"
                  >
                    S'abonner - 500 FCFA/mois
                  </Button>
                </div>
              )}
            </div>
            
            {/* Recent Activity */}
            <div className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)] shadow-sm">
              <h3 className="font-['Sora'] font-semibold text-[var(--bleu-nuit)] mb-4">
                Activité récente
              </h3>
              <div className="space-y-3">
                {mockRecentActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between py-2 border-b border-[var(--gris-clair)] last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[var(--bleu-nuit)]">{action.action}</p>
                      <p className="text-xs text-gray-500">{action.date}</p>
                    </div>
                    <span className="text-sm font-medium text-red-500">{action.credits}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
