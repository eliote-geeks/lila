import React, { useState } from 'react';
import { 
  CreditCard, 
  Upload, 
  Phone, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  Copy,
  Star,
  History,
  Coins
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { mockUser, mockTransactions } from '../data/mock';

const CreditsPage = ({ user = mockUser, onLogout }) => {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = '/dashboard';
  };
  const [selectedPack, setSelectedPack] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [proofFile, setProofFile] = useState(null);
  const [transactionRef, setTransactionRef] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const creditPacks = [
    { id: 1, credits: 100, price: 500, popular: true },
  ];

  const paymentNumbers = {
    momo: '+237 6 70 XX XX XX',
    om: '+237 6 55 XX XX XX'
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofFile(file);
    }
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (!selectedPack || !paymentMethod || !proofFile || !transactionRef) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    setSubmitting(true);
    // Simulate API call (will be replaced with real backend)
    setTimeout(() => {
      setSubmitting(false);
      alert('Preuve de paiement envoyée ! Nous validons votre paiement sous 24h.');
      setSelectedPack(null);
      setPaymentMethod('');
      setProofFile(null);
      setTransactionRef('');
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const getStatusBadge = (status) => {
    const styles = {
      'validé': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
      'en_attente': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      'refusé': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
    };
    const style = styles[status] || styles['en_attente'];
    const Icon = style.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        <Icon className="w-3 h-3" />
        {status === 'validé' ? 'Validé' : status === 'en_attente' ? 'En attente' : 'Refusé'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--blanc)]">
      <Header user={user} onLogout={onLogout} />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            Acheter des crédits
          </h1>
          <p className="text-gray-600">
            Rechargez vos crédits pour continuer à utiliser Lila
          </p>
        </div>
        
        {/* Current Balance */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--bleu-roi)] to-[var(--bleu-nuit)] text-white mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-white mb-1">Solde actuel</p>
              <div className="flex items-center gap-3">
                <Coins className="w-8 h-8 text-[var(--or)]" />
                <span className="font-['Sora'] text-4xl font-bold">{user.credits}</span>
                <span className="text-xl text-white">crédits</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white bg-opacity-10">
              {user.subscription?.active ? (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[var(--or)]" />
                  <div>
                    <p className="font-semibold">Abonnement actif</p>
                    <p className="text-sm text-white">Renouvellement: {user.subscription.nextBilling}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-white" />
                  <div>
                    <p className="font-semibold">Pas d'abonnement</p>
                    <p className="text-sm text-white">Achat à l'unité</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="buy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="buy" className="text-base">Acheter des crédits</TabsTrigger>
            <TabsTrigger value="history" className="text-base">Historique</TabsTrigger>
          </TabsList>
          
          {/* Buy Credits Tab */}
          <TabsContent value="buy" className="space-y-8">
            {/* Credit Packs */}
            <section>
              <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)] mb-4">
                1. Choisissez un pack
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {creditPacks.map((pack) => (
                  <button
                    key={pack.id}
                    onClick={() => setSelectedPack(pack)}
                    className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                      selectedPack?.id === pack.id
                        ? 'border-[var(--bleu-roi)] bg-[var(--bleu-roi)] bg-opacity-5 shadow-lg'
                        : 'border-[var(--gris-clair)] hover:border-[var(--bleu-roi)] hover:shadow-md'
                    }`}
                  >
                    {pack.popular && (
                      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--or)] text-[var(--bleu-nuit)] text-xs font-semibold">
                        Populaire
                      </span>
                    )}
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--bleu-roi)] bg-opacity-10 mb-4">
                      <Coins className="w-6 h-6 text-[var(--bleu-roi)]" />
                    </div>
                    <p className="font-['Sora'] text-3xl font-bold text-[var(--bleu-nuit)] mb-1">
                      {pack.credits}
                    </p>
                    <p className="text-gray-500 mb-3">crédits</p>
                    <p className="text-lg font-semibold text-[var(--bleu-roi)]">
                      {pack.price} FCFA
                    </p>
                    {selectedPack?.id === pack.id && (
                      <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-[var(--bleu-roi)]" />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Monthly Subscription Option */}
              <div className="mt-6 p-6 rounded-2xl border-2 border-dashed border-[var(--or)] bg-[var(--or)] bg-opacity-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-['Sora'] font-semibold text-[var(--bleu-nuit)] flex items-center gap-2">
                      <Star className="w-5 h-5 text-[var(--or)]" />
                      Abonnement mensuel
                    </h3>
                    <p className="text-gray-600 mt-1">
                      100 crédits chaque mois pour seulement 500 FCFA
                    </p>
                  </div>
                  <Button className="btn-gold whitespace-nowrap">
                    S'abonner
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </section>
            
            {/* Payment Method */}
            {selectedPack && (
              <section className="animate-slideUp">
                <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)] mb-4">
                  2. Mode de paiement
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === 'momo'
                        ? 'border-[#FFCC00] bg-[#FFCC00] bg-opacity-10'
                        : 'border-[var(--gris-clair)] hover:border-[#FFCC00]'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-[#FFCC00] flex items-center justify-center">
                        <Phone className="w-6 h-6 text-[var(--bleu-nuit)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--bleu-nuit)]">MTN MoMo</p>
                        <p className="text-sm text-gray-500">Mobile Money</p>
                      </div>
                    </div>
                    {paymentMethod === 'momo' && (
                      <div className="mt-4 p-3 rounded-lg bg-[#FFCC00] bg-opacity-20">
                        <p className="text-sm text-gray-600 mb-2">Numéro à créditer:</p>
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-semibold text-[var(--bleu-nuit)]">
                            {paymentNumbers.momo}
                          </span>
                          <button
                            onClick={() => copyToClipboard(paymentNumbers.momo)}
                            className="p-2 rounded-lg hover:bg-[#FFCC00] hover:bg-opacity-30 transition-colors"
                          >
                            <Copy className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('om')}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === 'om'
                        ? 'border-[#FF6600] bg-[#FF6600] bg-opacity-10'
                        : 'border-[var(--gris-clair)] hover:border-[#FF6600]'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-[#FF6600] flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--bleu-nuit)]">Orange Money</p>
                        <p className="text-sm text-gray-500">Mobile Money</p>
                      </div>
                    </div>
                    {paymentMethod === 'om' && (
                      <div className="mt-4 p-3 rounded-lg bg-[#FF6600] bg-opacity-20">
                        <p className="text-sm text-gray-600 mb-2">Numéro à créditer:</p>
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-semibold text-[var(--bleu-nuit)]">
                            {paymentNumbers.om}
                          </span>
                          <button
                            onClick={() => copyToClipboard(paymentNumbers.om)}
                            className="p-2 rounded-lg hover:bg-[#FF6600] hover:bg-opacity-30 transition-colors"
                          >
                            <Copy className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </section>
            )}
            
            {/* Upload Proof */}
            {paymentMethod && (
              <section className="animate-slideUp">
                <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)] mb-4">
                  3. Envoyez la preuve de paiement
                </h2>
                <div className="p-6 rounded-2xl border border-[var(--gris-clair)] bg-white">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="transactionRef">Référence de transaction</Label>
                      <Input
                        id="transactionRef"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        placeholder="Ex: TXN123456789"
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="proof">Capture d'écran</Label>
                      <div className="relative">
                        <input
                          id="proof"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="proof"
                          className={`flex items-center justify-center h-12 px-4 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
                            proofFile
                              ? 'border-green-500 bg-green-50'
                              : 'border-[var(--gris-clair)] hover:border-[var(--bleu-roi)]'
                          }`}
                        >
                          {proofFile ? (
                            <span className="flex items-center gap-2 text-green-600">
                              <CheckCircle2 className="w-5 h-5" />
                              {proofFile.name}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2 text-gray-500">
                              <Upload className="w-5 h-5" />
                              Choisir un fichier
                            </span>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 rounded-xl bg-[var(--gris-clair)] bg-opacity-50">
                    <h4 className="font-semibold text-[var(--bleu-nuit)] mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                      <li>Effectuez le transfert de <strong>{selectedPack?.price} FCFA</strong> vers le numéro indiqué</li>
                      <li>Prenez une capture d'écran de la confirmation</li>
                      <li>Renseignez la référence de transaction</li>
                      <li>Envoyez le tout - validation sous 24h maximum</li>
                    </ol>
                  </div>
                  
                  <Button
                    onClick={handleSubmitPayment}
                    disabled={!proofFile || !transactionRef || submitting}
                    className="w-full mt-6 btn-gold h-12"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[var(--bleu-nuit)] border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Envoyer la preuve de paiement
                      </span>
                    )}
                  </Button>
                </div>
              </section>
            )}
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history">
            <div className="p-6 rounded-2xl bg-white border border-[var(--gris-clair)]">
              <div className="flex items-center gap-3 mb-6">
                <History className="w-6 h-6 text-[var(--bleu-roi)]" />
                <h2 className="font-['Sora'] text-xl font-semibold text-[var(--bleu-nuit)]">
                  Historique des transactions
                </h2>
              </div>
              
              {mockTransactions.length > 0 ? (
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-[var(--gris-clair)] hover:bg-[var(--gris-clair)] hover:bg-opacity-30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--bleu-roi)] bg-opacity-10 flex items-center justify-center">
                          {transaction.type === 'abonnement' ? (
                            <Star className="w-6 h-6 text-[var(--or)]" />
                          ) : (
                            <Coins className="w-6 h-6 text-[var(--bleu-roi)]" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--bleu-nuit)]">
                            {transaction.type === 'abonnement' ? 'Abonnement mensuel' : 'Achat de crédits'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })} • {transaction.method}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[var(--bleu-nuit)]">
                          +{transaction.credits} crédits
                        </p>
                        <p className="text-sm text-gray-500">{transaction.amount} FCFA</p>
                        <div className="mt-1">
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune transaction pour le moment</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreditsPage;
