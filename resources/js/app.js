import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const jobsCatalog = [
    {
        id: 1,
        title: 'Responsable Marketing Digital',
        company: 'TechCorp Cameroun',
        location: 'Douala',
        type: 'CDI',
        salary: '500K-700K FCFA',
        description: "Nous recherchons un responsable marketing digital pour piloter les campagnes et l'acquisition.",
        saved: false,
        applied: false,
    },
    {
        id: 2,
        title: 'Chef de Projet Marketing',
        company: 'MediaPlus SA',
        location: 'Douala',
        type: 'CDI',
        salary: '450K-600K FCFA',
        description: 'Coordonnez les actions marketing et les partenaires sur des campagnes multi-canaux.',
        saved: false,
        applied: false,
    },
    {
        id: 3,
        title: 'Community Manager',
        company: 'StartupCM',
        location: 'Douala',
        type: 'CDD',
        salary: '300K-400K FCFA',
        description: 'Animez la communaute, gerez les reseaux sociaux et boostez la presence de marque.',
        saved: false,
        applied: false,
    },
];

const state = {
    messages: [
        {
            id: crypto.randomUUID(),
            sender: 'system',
            text: 'Conversation demarree',
            timestamp: new Date(),
        },
        {
            id: crypto.randomUUID(),
            sender: 'ai',
            text:
                "Bonjour ! Je suis Lila, votre assistante emploi. Dites-moi le poste, la ville et votre niveau d'experience pour que je vous propose les meilleures offres.",
            timestamp: new Date(),
        },
    ],
    isTyping: false,
    showJobs: false,
    jobs: [...jobsCatalog],
};

const chatFeed = $('[data-chat-feed]');
const input = $('[data-chat-input]');
const form = $('[data-chat-form]');
const typingBadge = $('[data-typing]');
const jobCardsContainer = $('[data-job-cards]');
const scrollContainer = $('[data-chat-scroll]') || chatFeed?.parentElement;

function formatTime(date) {
    return new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(date);
}

function renderMessages() {
    if (!chatFeed) return;

    chatFeed.innerHTML = state.messages
        .map((message) => {
            if (message.sender === 'system') {
                return `
                    <div class="flex justify-center my-4 animate-fade-in">
                        <div class="bg-accent-light text-accent-foreground text-xs px-4 py-2 rounded-full">
                            ${message.text}
                        </div>
                    </div>
                `;
            }

            const isUser = message.sender === 'user';
            const time = formatTime(message.timestamp);

            return `
                <div class="flex gap-3 mb-4 chat-bubble-enter ${isUser ? 'flex-row-reverse' : 'flex-row'}">
                    <div class="h-8 w-8 shrink-0 rounded-full ${
                        isUser ? 'bg-primary text-primary-foreground ring-2 ring-primary/20' : 'bg-primary/10 text-primary ring-2 ring-muted'
                    } flex items-center justify-center text-xs font-semibold">
                        ${isUser ? 'V' : 'L'}
                    </div>
                    <div class="flex flex-col max-w-[80%] sm:max-w-[70%] ${isUser ? 'items-end' : 'items-start'}">
                        <span class="text-xs text-muted-foreground mb-1 px-1">
                            ${isUser ? 'Vous' : 'Lila'}
                        </span>
                        <div class="rounded-2xl px-4 py-3 shadow-sm ${
                            isUser
                                ? 'bg-primary text-primary-foreground rounded-br-md'
                                : 'bg-card border border-border text-card-foreground rounded-bl-md'
                        }">
                            <p class="text-sm leading-relaxed whitespace-pre-wrap">${message.text}</p>
                        </div>
                        <span class="text-[10px] text-muted-foreground mt-1 px-1">${time}</span>
                    </div>
                </div>
            `;
        })
        .join('');

    if (scrollContainer) {
        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
    }
}

function renderJobCards() {
    if (!jobCardsContainer) return;

    if (!state.showJobs) {
        jobCardsContainer.classList.add('hidden');
        jobCardsContainer.innerHTML = '';
        return;
    }

    jobCardsContainer.classList.remove('hidden');
    jobCardsContainer.innerHTML = state.jobs
        .map((job) => {
            return `
                <div class="rounded-xl border border-border bg-card shadow-card p-4 transition-smooth hover:shadow-lg hover:border-primary/30">
                    <div class="flex items-start justify-between gap-3 mb-3">
                        <div>
                            <h3 class="font-heading font-semibold text-foreground leading-tight">${job.title}</h3>
                            <p class="text-sm text-muted-foreground">${job.company}</p>
                        </div>
                        <button class="text-xs px-2 py-1 rounded-full border border-primary text-primary ${
                            job.saved ? 'bg-primary text-primary-foreground' : 'bg-card'
                        }" data-job-save="${job.id}">
                            ${job.saved ? 'Sauvegardee' : 'Sauvegarder'}
                        </button>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-3 text-xs text-muted-foreground">
                        <span class="px-2 py-1 rounded-full bg-muted">${job.location}</span>
                        <span class="px-2 py-1 rounded-full bg-muted">${job.type}</span>
                        <span class="px-2 py-1 rounded-full bg-muted">${job.salary}</span>
                    </div>
                    <p class="text-sm text-muted-foreground line-clamp-2 mb-4">${job.description}</p>
                    <div class="flex items-center gap-2">
                        <button class="flex-1 rounded-lg ${
                            job.applied ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
                        } px-3 py-2 text-sm font-medium" data-job-apply="${job.id}" ${job.applied ? 'disabled' : ''}>
                            ${job.applied ? 'Postule' : 'Postuler'}
                        </button>
                        <button class="rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-muted">
                            Voir
                        </button>
                    </div>
                </div>
            `;
        })
        .join('');
}

function setTyping(isTyping) {
    state.isTyping = isTyping;
    if (!typingBadge) return;
    typingBadge.classList.toggle('hidden', !isTyping);
}

function simulateAiReply(userText) {
    setTyping(true);

    const lowered = userText.toLowerCase();
    const isJobQuery =
        lowered.includes('offre') ||
        lowered.includes('emploi') ||
        lowered.includes('travail') ||
        lowered.includes('marketing') ||
        lowered.includes('douala');

    let response = '';

    if (isJobQuery) {
        response =
            "Super ! J'ai trouve plusieurs opportunites qui correspondent a votre recherche. Voici une selection :";
        state.showJobs = true;
    } else if (lowered.includes('cv')) {
        response =
            "Je peux vous aider a optimiser votre CV. Donnez-moi votre role cible, vos competences clees et vos experiences principales.";
        state.showJobs = false;
    } else if (lowered.includes('conseil') || lowered.includes('carriere')) {
        response =
            "Voici quelques conseils : reseautage, formation continue, et un profil LinkedIn a jour. Dites-moi votre domaine pour des conseils precis.";
        state.showJobs = false;
    } else {
        response =
            "Pour mieux vous aider, precisez le poste, la ville et votre niveau d'experience. Vous pouvez aussi demander des conseils CV.";
        state.showJobs = false;
    }

    setTimeout(() => {
        setTyping(false);
        state.messages.push({
            id: crypto.randomUUID(),
            sender: 'ai',
            text: response,
            timestamp: new Date(),
        });
        renderMessages();
        renderJobCards();
    }, 1200);
}

function handleSubmit(e) {
    e.preventDefault();
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    input.value = '';
    input.style.height = 'auto';

    state.messages.push({
        id: crypto.randomUUID(),
        sender: 'user',
        text,
        timestamp: new Date(),
    });

    state.showJobs = false;
    renderMessages();
    renderJobCards();

    simulateAiReply(text);
}

function autoResize() {
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 150)}px`;
}

function initJobCardActions() {
    if (!jobCardsContainer) return;

    jobCardsContainer.addEventListener('click', (event) => {
        const saveButton = event.target.closest('[data-job-save]');
        const applyButton = event.target.closest('[data-job-apply]');

        if (saveButton) {
            const id = Number(saveButton.dataset.jobSave);
            state.jobs = state.jobs.map((job) =>
                job.id === id ? { ...job, saved: !job.saved } : job,
            );
            renderJobCards();
            return;
        }

        if (applyButton) {
            const id = Number(applyButton.dataset.jobApply);
            state.jobs = state.jobs.map((job) => (job.id === id ? { ...job, applied: true } : job));
            renderJobCards();
        }
    });
}

function init() {
    if (!form || !chatFeed) return;

    const chatDisabled = document.body.dataset.chatDisabled === 'true' || form.dataset.chatDisabled === 'true';

    renderMessages();
    renderJobCards();
    initJobCardActions();

    if (chatDisabled) {
        return;
    }

    form.addEventListener('submit', handleSubmit);

    if (input) {
        input.addEventListener('input', autoResize);
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event);
            }
        });
        autoResize();
    }

    $$('[data-prompt]').forEach((btn) =>
        btn.addEventListener('click', () => {
            if (!input) return;
            input.value = btn.dataset.prompt || '';
            autoResize();
            input.focus();
        }),
    );

}

document.addEventListener('DOMContentLoaded', init);
