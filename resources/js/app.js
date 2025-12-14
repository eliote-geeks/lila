import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();

// Chat demo logic (web & WhatsApp unified)
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const state = {
    messages: [
        {
            id: crypto.randomUUID(),
            sender: 'ai',
            text: 'Salut, je suis Lila, l’agent CamerHub. Dis-moi ce que tu cherches (métier, ville, niveau) et je te propose des offres.',
            timestamp: new Date(),
        },
    ],
    isTyping: false,
};

const chatFeed = $('[data-chat-feed]');
const input = $('[data-chat-input]');
const form = $('[data-chat-form]');
const typingBadge = $('[data-typing]');
const sessionId = crypto.randomUUID();

function renderMessages() {
    if (!chatFeed) return;
    chatFeed.innerHTML = state.messages
        .map((m) => {
            const time = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(m.timestamp);
            const isUser = m.sender === 'user';
            return `
                <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
                    <div class="max-w-[78%] rounded-2xl px-4 py-3 mb-3 text-sm leading-relaxed ${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-xs uppercase tracking-[0.12em] ${isUser ? 'text-sky-50' : 'text-slate-300'}">${isUser ? 'Toi' : 'Lila · IA'}</span>
                            <span class="text-[11px] text-slate-400">${time}</span>
                        </div>
                        <p class="${isUser ? 'text-sky-50' : 'text-slate-100'}">${m.text}</p>
                    </div>
                </div>
            `;
        })
        .join('');
    chatFeed.scrollTo({ top: chatFeed.scrollHeight, behavior: 'smooth' });
}

function setTyping(isTyping) {
    state.isTyping = isTyping;
    if (!typingBadge) return;
    typingBadge.classList.toggle('hidden', !isTyping);
}

function simulateAiReply(userText) {
    setTyping(true);
    const thoughts = [
        "Je te propose 3 offres qui collent à ton profil.",
        "Je peux aussi préparer un CV et une lettre pour cette offre.",
        "Veux-tu recevoir une alerte WhatsApp dès qu’une offre matche ?",
        "Donne-moi ta ville et ton niveau d’expérience pour cibler mieux.",
    ];
    const answer =
        thoughts[Math.floor(Math.random() * thoughts.length)] +
        `\n\nTu cherches: "${userText.slice(0, 80)}". Ajoute des détails (ville, secteur, salaire).`;

    const chunks = answer.split(' ');
    let current = '';
    const id = crypto.randomUUID();
    const message = { id, sender: 'ai', text: '', timestamp: new Date() };
    state.messages.push(message);
    renderMessages();

    let idx = 0;
    const interval = setInterval(() => {
        if (idx >= chunks.length) {
            clearInterval(interval);
            setTyping(false);
            renderMessages();
            return;
        }
        current += (current ? ' ' : '') + chunks[idx];
        message.text = current;
        renderMessages();
        idx++;
    }, 80);
}

function handleSubmit(e) {
    e.preventDefault();
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    input.value = '';

    state.messages.push({
        id: crypto.randomUUID(),
        sender: 'user',
        text,
        timestamp: new Date(),
    });
    renderMessages();

    // À remplacer par un appel API réel (SSE/WebSocket) vers Laravel/n8n
    simulateAiReply(text);
}

function init() {
    if (!form || !chatFeed) return;
    form.addEventListener('submit', handleSubmit);
    renderMessages();

    $$('[data-prompt]').forEach((btn) =>
        btn.addEventListener('click', () => {
            input.value = btn.dataset.prompt || '';
            input.focus();
        }),
    );
}

document.addEventListener('DOMContentLoaded', init);
