// Mock data for CamerHub - fallback values when no server data is provided

const appData = typeof window !== 'undefined' ? (window.CamerHub || {}) : {};

const fallbackUser = {
  id: 'user_123',
  name: 'Jean-Pierre Kamga',
  email: 'jeanpierre.kamga@gmail.com',
  picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  credits: 45,
  subscription: {
    active: true,
    plan: 'monthly',
    nextBilling: '2025-09-15'
  },
  profile: {
    completed: false,
    phone: '+237 6 90 12 34 56',
    city: 'Douala',
    experience: '3 ans',
    sector: 'Informatique',
    skills: ['JavaScript', 'Python', 'Management'],
    education: 'Licence en Informatique',
    cv: null
  }
};

const serverUser = appData.user || null;

export const mockUser = serverUser ? {
  ...fallbackUser,
  ...serverUser,
  credits: serverUser.credits ?? fallbackUser.credits,
  subscription: serverUser.subscription ?? fallbackUser.subscription,
  profile: {
    ...fallbackUser.profile,
    ...(serverUser.profile || {})
  }
} : fallbackUser;

export const mockMessages = [
  {
    id: 1,
    sender: 'lila',
    text: 'Bonjour Jean-Pierre ! 👋 Je suis Lila, votre assistante emploi. Comment puis-je vous aider aujourd\'hui ?',
    timestamp: '10:30'
  },
  {
    id: 2,
    sender: 'user',
    text: 'Salut Lila ! Je cherche un emploi de développeur web à Douala.',
    timestamp: '10:31'
  },
  {
    id: 3,
    sender: 'lila',
    text: 'Parfait ! J\'ai trouvé 5 offres qui correspondent à votre profil. Voici les meilleures :',
    timestamp: '10:32'
  },
  {
    id: 4,
    sender: 'lila',
    text: '1. **Développeur Frontend** chez TechCam - 450 000 FCFA/mois\n2. **Full Stack Developer** chez DigiSoft - 500 000 FCFA/mois\n3. **Web Developer Junior** chez StartupCM - 300 000 FCFA/mois',
    timestamp: '10:32'
  }
];

export const mockJobs = [
  {
    id: 1,
    title: 'Développeur Frontend React',
    company: 'TechCam Solutions',
    location: 'Douala',
    salary: '450 000 - 550 000 FCFA',
    type: 'CDI',
    posted: 'Il y a 2 jours',
    match: 92,
    description: 'Nous recherchons un développeur frontend passionné pour rejoindre notre équipe dynamique.',
    requirements: ['React', 'JavaScript', 'CSS', '2 ans d\'expérience']
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'DigiSoft Cameroun',
    location: 'Yaoundé',
    salary: '500 000 - 650 000 FCFA',
    type: 'CDI',
    posted: 'Il y a 3 jours',
    match: 87,
    description: 'Opportunité unique de travailler sur des projets innovants.',
    requirements: ['Node.js', 'React', 'MongoDB', '3 ans d\'expérience']
  },
  {
    id: 3,
    title: 'Chef de Projet Digital',
    company: 'AfricaWeb',
    location: 'Douala',
    salary: '600 000 - 800 000 FCFA',
    type: 'CDI',
    posted: 'Il y a 5 jours',
    match: 75,
    description: 'Gérez des projets web d\'envergure pour des clients prestigieux.',
    requirements: ['Gestion de projet', 'Agile', 'Communication', '5 ans d\'expérience']
  },
  {
    id: 4,
    title: 'Assistant Marketing Digital',
    company: 'MediaCam',
    location: 'Douala',
    salary: '200 000 - 300 000 FCFA',
    type: 'Stage',
    posted: 'Il y a 1 jour',
    match: 68,
    description: 'Stage de 6 mois avec possibilité d\'embauche.',
    requirements: ['Marketing digital', 'Réseaux sociaux', 'Créativité']
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: 'Marie Ngo',
    role: 'Comptable',
    city: 'Yaoundé',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
    text: 'Grâce à Lila, j\'ai trouvé mon emploi actuel en seulement 2 semaines. Elle m\'a aidé à préparer mon CV et mes lettres de motivation.',
    rating: 5
  },
  {
    id: 2,
    name: 'Paul Mbarga',
    role: 'Ingénieur IT',
    city: 'Douala',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    text: 'L\'assistante IA comprend vraiment ce que je recherche. En plus, pouvoir postuler via WhatsApp, c\'est super pratique !',
    rating: 5
  },
  {
    id: 3,
    name: 'Aminata Diallo',
    role: 'Commerciale',
    city: 'Bafoussam',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    text: 'CamerHub a changé ma façon de chercher du travail. Plus besoin de passer des heures sur différents sites.',
    rating: 4
  }
];

export const mockFAQ = [
  {
    question: 'Qu\'est-ce que Lila peut faire pour moi ?',
    answer: 'Lila recherche des offres d\'emploi adaptées à votre profil, analyse les postes, vous aide à rédiger vos CV et lettres de motivation, et peut même postuler à votre place (avec votre confirmation).'
  },
  {
    question: 'Comment fonctionne le système de crédits ?',
    answer: 'Chaque action de Lila (recherche, analyse, génération de document) utilise des crédits. Vous recevez 30 crédits gratuits à l\'inscription, puis vous pouvez acheter des crédits ou souscrire à l\'abonnement mensuel.'
  },
  {
    question: 'Puis-je utiliser CamerHub sur WhatsApp ?',
    answer: 'Oui ! Vous pouvez discuter avec Lila directement sur WhatsApp. Notez cependant que WhatsApp peut ne pas fonctionner pour certains numéros.'
  },
  {
    question: 'Comment payer mon abonnement ?',
    answer: 'Nous acceptons les paiements via Mobile Money (MTN MoMo et Orange Money). Il suffit d\'effectuer le transfert et d\'envoyer la preuve de paiement.'
  },
  {
    question: 'Lila peut-elle postuler automatiquement à ma place ?',
    answer: 'Oui, mais uniquement avec votre confirmation. Avant chaque candidature, Lila vous demande de valider l\'envoi.'
  }
];

const fallbackTransactions = [
  {
    id: 1,
    date: '2025-08-10',
    type: 'achat',
    amount: 500,
    credits: 100,
    status: 'validé',
    method: 'MTN MoMo'
  },
  {
    id: 2,
    date: '2025-07-15',
    type: 'abonnement',
    amount: 500,
    credits: 100,
    status: 'validé',
    method: 'Orange Money'
  },
  {
    id: 3,
    date: '2025-06-20',
    type: 'achat',
    amount: 500,
    credits: 100,
    status: 'validé',
    method: 'MTN MoMo'
  }
];

export const mockTransactions = appData.transactions || fallbackTransactions;

export const mockRecentActions = [
  { id: 1, action: 'Recherche d\'offres', date: 'Aujourd\'hui, 10:30', credits: -2 },
  { id: 2, action: 'Analyse de poste', date: 'Aujourd\'hui, 09:15', credits: -3 },
  { id: 3, action: 'Génération de CV', date: 'Hier, 16:45', credits: -5 },
  { id: 4, action: 'Candidature envoyée', date: 'Hier, 14:20', credits: -4 }
];
