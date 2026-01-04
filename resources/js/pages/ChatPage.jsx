import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  User,
  Paperclip,
  MoreVertical,
  Search,
  FileText,
  Briefcase,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import Header from '../components/layout/Header';
import { mockUser, mockMessages } from '../data/mock';

const ChatPage = ({ user = mockUser, onLogout }) => {
  const goTo = (path) => {
    window.location.href = path;
  };
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Lila's response (will be replaced by n8n webhook)
    setTimeout(() => {
      const lilaResponse = {
        id: messages.length + 2,
        sender: 'lila',
        text: 'Merci pour votre message ! Je recherche les meilleures opportunités pour vous... 🔍',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, lilaResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { icon: Search, label: 'Rechercher des offres', action: () => setInputValue('Recherche des offres pour moi') },
    { icon: FileText, label: 'Générer mon CV', action: () => setInputValue('Aide-moi à créer mon CV') },
    { icon: Briefcase, label: 'Voir mes candidatures', action: () => setInputValue('Montre-moi mes candidatures') },
  ];

  const formatMessage = (text) => {
    // Simple markdown-like formatting for bold text
    return text.split('**').map((part, index) => 
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--blanc)]">
      <Header user={user} onLogout={onLogout} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-80 flex-col border-r border-[var(--gris-clair)] bg-white">
          {/* Profile Card */}
          <div className="p-6 border-b border-[var(--gris-clair)]">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={user.picture} 
                alt={user.name}
                className="w-14 h-14 rounded-full border-2 border-[var(--bleu-roi)]"
              />
              <div>
                <h3 className="font-['Sora'] font-semibold text-[var(--bleu-nuit)]">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            
            {/* Credits */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--gris-clair)] bg-opacity-50">
              <div>
                <p className="text-sm text-gray-500">Crédits restants</p>
                <p className="font-['Sora'] text-2xl font-bold text-[var(--bleu-roi)]">{user.credits}</p>
              </div>
              <Button 
                onClick={() => goTo('/credits')}
                size="sm" 
                className="bg-[var(--or)] text-[var(--bleu-nuit)] hover:bg-[var(--or)] hover:opacity-90"
              >
                Recharger
              </Button>
            </div>
          </div>
          
          {/* Profile Completion */}
          {!user.profile?.completed && (
            <div className="p-6 border-b border-[var(--gris-clair)]">
              <div className="p-4 rounded-xl bg-[var(--bleu-roi)] bg-opacity-5 border border-[var(--bleu-roi)] border-opacity-20">
                <h4 className="font-semibold text-[var(--bleu-nuit)] mb-2">Complétez votre profil</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Votre profil aide Lila à mieux vous proposer des offres
                </p>
                <Button 
                  onClick={() => goTo('/profile')}
                  size="sm" 
                  className="w-full btn-primary"
                >
                  Compléter mon profil
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="p-6">
            <h4 className="font-semibold text-[var(--bleu-nuit)] mb-4">Actions rapides</h4>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-[var(--gris-clair)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--bleu-roi)] bg-opacity-10 flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-[var(--bleu-roi)]" />
                  </div>
                  <span className="text-[var(--bleu-nuit)]">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
        
        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--gris-clair)] bg-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[var(--or)] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[var(--bleu-nuit)]" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
              </div>
              <div>
                <h2 className="font-['Sora'] font-semibold text-[var(--bleu-nuit)]">Lila</h2>
                <p className="text-sm text-green-600">En ligne</p>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-[var(--gris-clair)] transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div className={`flex items-end gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    {message.sender === 'lila' && (
                      <div className="w-8 h-8 rounded-full bg-[var(--or)] flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-[var(--bleu-nuit)]" />
                      </div>
                    )}
                    <div 
                      className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-[var(--bleu-roi)] text-white rounded-br-none'
                          : 'bg-[var(--gris-clair)] text-[var(--bleu-nuit)] rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{formatMessage(message.text)}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-end gap-2 animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-[var(--or)] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[var(--bleu-nuit)]" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-[var(--gris-clair)] rounded-bl-none">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="p-4 border-t border-[var(--gris-clair)] bg-white">
            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  className="p-3 rounded-xl hover:bg-[var(--gris-clair)] transition-colors"
                >
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Écrivez votre message à Lila..."
                  className="flex-1 h-12 rounded-xl border-[var(--gris-clair)] focus:border-[var(--bleu-roi)] focus:ring-[var(--bleu-roi)]"
                />
                <Button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="h-12 w-12 rounded-xl btn-primary p-0"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </form>
            
            {/* Mobile Quick Actions */}
            <div className="flex gap-2 mt-3 lg:hidden overflow-x-auto pb-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--gris-clair)] whitespace-nowrap hover:bg-[var(--bleu-roi)] hover:bg-opacity-10 transition-colors"
                >
                  <action.icon className="w-4 h-4 text-[var(--bleu-roi)]" />
                  <span className="text-sm text-[var(--bleu-nuit)]">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
