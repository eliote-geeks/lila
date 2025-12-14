# Intégration Laravel / n8n pour les jobs IA

## Rôle de chaque brique
- Laravel : authentification, gestion du profil, stockage des jobs, permissions et UI.
- n8n : orchestre les workflows IA (préparation des prompts, appels aux modèles, post-traitement, notifications).
- Communication : échanges HTTP signés (webhooks entrants/sortants) via la façade `Http` de Laravel et les nœuds HTTP de n8n.

## Flux recommandés
1) Création d’un job  
   - Endpoint Laravel `POST /api/jobs` (protégé par auth) → validation → enregistrement du job (`jobs` table) avec statut `pending`.  
   - Appel d’un webhook n8n `POST ${N8N_JOB_WEBHOOK}` avec le `job_id`, l’utilisateur, et les paramètres métier.

2) Avancement / résultat  
   - n8n appelle un webhook Laravel `POST /api/n8n/hooks/job-status` avec `job_id`, `status` (`running|failed|succeeded`), payload du résultat et éventuellement une `progress`.  
   - Laravel vérifie la signature HMAC (`X-Signature`) calculée avec `N8N_WEBHOOK_SECRET`, met à jour le job et enregistre les artefacts (fichiers, JSON, URLs).

3) Consultation côté front  
   - Endpoint `GET /api/jobs` (liste) et `GET /api/jobs/{id}` (détail + historique des événements).  
   - Optionnel : diffusion temps réel via Broadcast/Echo ou Server-Sent Events pour pousser le statut sans rechargement.

4) Reprise / retry  
   - Endpoint `POST /api/jobs/{id}/retry` qui ré-émet vers n8n si le job est en échec.

## Sécurité & gouvernance
- Auth côté Laravel (session SPA ou tokens API). n8n ne gère pas l’auth utilisateur, uniquement un secret technique (`N8N_WEBHOOK_SECRET`).
- Toutes les callbacks n8n vers Laravel doivent être signées (HMAC SHA256 du body) et horodatées (`X-Timestamp`) pour rejeter les replays.
- Journaliser les appels n8n (table `job_events` ou `job_logs`) pour tracer chaque étape et faciliter le debug.

## Variables d’environnement proposées
- `N8N_BASE_URL=https://n8n.example.com`
- `N8N_JOB_WEBHOOK=` URL du webhook d’entrée n8n pour lancer un workflow.
- `N8N_WEBHOOK_SECRET=` secret partagé pour signer/valider les callbacks.
- `N8N_API_TOKEN=` (optionnel) si vous appelez l’API REST n8n au lieu d’un webhook.

## Étapes d’implémentation Laravel (squelette)
- Créer modèles/migrations `Job` (statut, type, payload, user_id, result, error, progress) et `JobEvent` si besoin de journaux.
- Contrôleurs d’API : `JobController` (create/list/show/retry) et `N8nWebhookController` (callback status).  
- Service `N8nClient` pour centraliser les appels (webhook ou API) et la signature.
- Middleware de vérification de signature pour `/api/n8n/hooks/*`.
- Tests : unitaire pour la signature HMAC, feature pour le cycle création → callback → lecture.

## Vue sur le workflow n8n
- Trigger initial : nœud Webhook (POST) qui reçoit `job_id`, `user_id`, paramètres métier.  
- Chaîne IA : prompts, appels LLM, génération de médias, etc.  
- Callback vers Laravel : nœud HTTP Request qui POST sur `/api/n8n/hooks/job-status` avec statut et données (et la signature HMAC).
- Notifications : nœud email/Slack/Push en parallèle ou déclenchées par Laravel après mise à jour.

## Structure minimale de payload
```json
// App → n8n
{
  "job_id": "uuid",
  "user_id": 123,
  "job_type": "cover_letter",
  "params": { "cv_url": "...", "offer_url": "..." }
}

// n8n → App (callback)
{
  "job_id": "uuid",
  "status": "succeeded",
  "progress": 100,
  "result": { "url": "...", "text": "...", "meta": {} },
  "error": null
}
```
