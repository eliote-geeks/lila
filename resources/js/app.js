import './bootstrap';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const state = {
    messages: [
        {
            id: crypto.randomUUID(),
            sender: 'ai',
            text: 'Salut, je suis Lila, l’agent IA CamerHub. Pose-moi une question ou décris ton profil, je te trouve les offres qui matchent.',
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
        "Je priorise les offres >70% de match et je te prépare un CV optimisé.",
        "Je peux aussi te proposer une lettre de motivation adaptée à l’entreprise.",
        "Veux-tu activer les alertes temps réel WhatsApp pour les nouvelles offres ?",
        "Je peux analyser ton CV en 30 secondes et améliorer ton match.",
    ];
    const answer =
        thoughts[Math.floor(Math.random() * thoughts.length)] +
        `\n\nRésumé: tu cherches "${userText.slice(0, 80)}" ? Donne-moi plus de détails (ville, secteur, niveau).`;

    // Simuler un flux de texte en quasi temps réel
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

    // À remplacer par un appel API temps réel (SSE/WebSocket) vers Laravel/n8n
    simulateAiReply(text);
}

function init() {
    if (!form || !chatFeed) return;
    form.addEventListener('submit', handleSubmit);
    renderMessages();

    // Boutons presets pour tester rapidement
    $$('[data-prompt]').forEach((btn) =>
        btn.addEventListener('click', () => {
            input.value = btn.dataset.prompt || '';
            input.focus();
        }),
    );
}

document.addEventListener('DOMContentLoaded', init);
