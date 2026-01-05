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
  Loader2,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import Header from '../components/layout/Header';
import { mockUser } from '../data/mock';

const DEFAULT_GREETING = {
  id: 'greeting',
  sender: 'assistant',
  text: "Bonjour ! Je suis Lila, votre assistante emploi. Comment puis-je vous aider aujourd'hui ?",
  timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
};

const ChatPage = ({ user = mockUser, onLogout }) => {
  const goTo = (path) => {
    window.location.href = path;
  };

  const chatEndpoint = window?.CamerHub?.chatEndpoint || '/api/chat/send';
  const chatHistoryEndpoint = window?.CamerHub?.chatHistoryEndpoint || '/api/chat/history';
  const csrfToken = window?.CamerHub?.csrfToken || '';

  const [messages, setMessages] = useState([DEFAULT_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem('camerhub_chat_session') || '';
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!chatHistoryEndpoint) return;

      const url = sessionId
        ? `${chatHistoryEndpoint}?session_id=${encodeURIComponent(sessionId)}`
        : chatHistoryEndpoint;

      try {
        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) return;

        const data = await response.json();
        if (data.session_id && !sessionId) {
          setSessionId(data.session_id);
          window.localStorage.setItem('camerhub_chat_session', data.session_id);
        }

        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(data.messages);
        } else {
          setMessages([DEFAULT_GREETING]);
        }
      } catch (error) {
        setMessages([DEFAULT_GREETING]);
      }
    };

    fetchHistory();
  }, [chatHistoryEndpoint]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch(chatEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({
          message: userMessage.text,
          session_id: sessionId || undefined,
        }),
      });

      const data = await response.json();

      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
        window.localStorage.setItem('camerhub_chat_session', data.session_id);
      }

      const replyText = data.message || "Merci ! Je reviens vers vous rapidement.";

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: "Désolé, je n'arrive pas à répondre pour le moment. Réessayez dans un instant.",
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    { icon: Search, label: 'Rechercher des offres', action: () => setInputValue('Recherche des offres pour moi') },
    { icon: FileText, label: 'Générer mon CV', action: () => setInputValue('Aide-moi à créer mon CV') },
    { icon: Briefcase, label: 'Voir mes candidatures', action: () => setInputValue('Montre-moi mes candidatures') },
  ];

  const formatMessage = (text) => {
    return text.split('**').map((part, index) =>
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--blanc)]">
      <Header user={user} onLogout={onLogout} />

      <div className="flex-1 flex min-h-0 overflow-hidden">
        <aside className="hidden lg:flex w-80 flex-col border-r border-[var(--gris-clair)] bg-white min-h-0 overflow-y-auto">
          <div className="p-6 border-b border-[var(--gris-clair)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full border-2 border-[var(--bleu-roi)] bg-[var(--bleu-roi)] text-white font-semibold flex items-center justify-center">
                {user?.name ? user.name.split(' ').slice(0, 2).map((part) => part[0]).join('') : 'CH'}
              </div>
              <div>
                <h3 className="font-['Sora'] font-semibold text-[var(--bleu-nuit)]">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--gris-clair)]/50">
              <div>
                <p className="text-sm text-gray-500">Crédits restants</p>
                <p className="font-['Sora'] text-2xl font-bold text-[var(--bleu-roi)]">{user?.credits ?? 0}</p>
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

          <div className="p-6 border-b border-[var(--gris-clair)]">
            <div className="p-4 rounded-xl bg-[var(--bleu-roi)]/5 border border-[var(--bleu-roi)]/20">
              <h4 className="font-semibold text-[var(--bleu-nuit)] mb-2">Complétez votre profil</h4>
              <p className="text-sm text-gray-600 mb-3">
                Votre profil aide Lila à mieux vous proposer des offres
              </p>
              <Button onClick={() => goTo('/profile')} size="sm" className="w-full btn-primary">
                Compléter mon profil
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="p-6">
            <h4 className="font-semibold text-[var(--bleu-nuit)] mb-4">Actions rapides</h4>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-[var(--gris-clair)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--bleu-roi)]/10 flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-[var(--bleu-roi)]" />
                  </div>
                  <span className="text-[var(--bleu-nuit)]">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-h-0">
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

          <ScrollArea className="flex-1 min-h-0 p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div className={`flex items-end gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    {message.sender !== 'user' && (
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
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

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
                  {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </Button>
              </div>
            </form>

            <div className="flex gap-2 mt-3 lg:hidden overflow-x-auto pb-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--gris-clair)] whitespace-nowrap hover:bg-[var(--bleu-roi)]/10 transition-colors"
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
