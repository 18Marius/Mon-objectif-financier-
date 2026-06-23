# Graphify Report — EducXP
Date: 2026-06-23 | Fichier: index.html (4 271 lignes)

## Chiffres clés
- **86 nœuds** : 11 vues · 1 table Supabase · 2 endpoints API · 72 fonctions
- **90 arêtes** : 78 calls · 7 queries · 5 writes
- **14 clusters** : routing, quiz, flashcards, summary, ai, campus, supabase, exercises, images, subject, chapter, modals, utils, xp
- **1 seule table Supabase** : `eduxp_data` (tout dans un seul JSON blob)

---

## Clusters détectés

| Cluster | Fonctions clés | Rôle |
|---------|---------------|------|
| **routing** | nav(), renderView(), navBack() | Hub central de navigation |
| **ai** | callAI(), sendChat(), exoRunAI() | Toutes les requêtes IA → /api/chat |
| **quiz** | generateAndStartQuiz(), answerQuiz(), renderQuizResult() | Génération + gameplay quiz |
| **flashcards** | generateAndStartFlashcards(), renderFC(), exportFlashcards() | Cartes mémo + export PNG |
| **summary** | generateSummary(), renderSummary(), exportSummary() | Fiches de révision Markdown |
| **campus** | campusInit3D(), campusBuildExterior/Hallway/Study(), campusAnimate() | 3D Three.js complet |
| **supabase** | initSupabase(), loadFromSupabase(), saveToSupabase() | Auth + sync cloud |
| **exercises** | initExoSection(), exoOpenTool(), exoRunAI() | Outils IA par matière (15 matières) |
| **images** | handleImgUpload(), compressImage(), exportFlashcards() | OCR photo + galerie |
| **modals** | saveSubject/Chapter/CCF/BAC(), delSubject/Chapter() | CRUD toutes entités |
| **utils** | save(), toast(), confetti() | Utilitaires globaux |

---

## Top nœuds par connexions (hubs critiques)

| Nœud | Entrants | Sortants | Rôle |
|------|----------|----------|------|
| **nav()** | 8 | 1 | Hub de navigation — tout passe par lui |
| **callAI()** | 3 | 1 | Concentre toutes les requêtes IA |
| **/api/chat** | 6 | 0 | Unique point d'entrée backend IA |
| **renderView()** | 2 | 11 | Routeur de vues |
| **save()** | 8 | 1 | Persistance locale + déclencheur sync |
| **toast()** | 7 | 0 | Feedback utilisateur global |
| **addXP()** | 3 | 4 | Gamification centrale |
| **db-eduxp_data** | 0 | 2 | Seule table Supabase |

---

## Connexions surprenantes

### 🔴 God Function : `v-chapter`
La vue chapitre est la plus connectée côté vues. Elle déclenche directement : `startAIQuiz`, `startAIFlashcards`, `startAISummary`, `triggerImgUpload`, `sendChat`, `toggleVoice` — soit 6 fonctions différentes. C'est le cœur fonctionnel de l'app.

### 🟡 `save()` est un hub caché
8 fonctions CRUD appellent `save()`, qui lui-même appelle `saveToSupabase()` (avec debounce 1500ms). Toute la persistence passe par ce seul point. Risque : si `save()` bug, tout s'arrête.

### 🟡 `/api/chat` est appelé par 6 fonctions différentes
`callAI`, `sendChat`, `exoRunAI`, `runCorrection`, `handleImgUpload`, `campusAIAnswer` → toutes font leur propre `fetch('/api/chat')` directement. Pas de couche d'abstraction partagée sauf `callAI()` (que seulement 3 fonctions utilisent).

### 🟢 Campus est complètement isolé
Le cluster campus (10 fonctions) n'interagit quasiment pas avec le reste de l'app — seulement `initCampus()` est appelé par `renderView()`. Aucun accès à la DB Supabase depuis le campus. C'est un "monde" indépendant.

### 🟢 Une seule table Supabase
Tout (matières, chapitres, quiz, flashcards, CCF, BAC, player) est stocké dans `eduxp_data.data` comme un JSON blob. Simple mais limitant pour les requêtes multi-users futures.

---

## Questions suggérées

1. **`sendChat`, `exoRunAI`, `runCorrection`, `campusAIAnswer` font chacun leur propre `fetch('/api/chat')`** sans passer par `callAI()`. Devrait-on centraliser en utilisant `callAI()` partout ?

2. **La table `eduxp_data` stocke tout en un seul JSON blob**. Si plusieurs utilisateurs ont des datasets massifs (1000+ chapitres, images base64), ça ne va pas scale. Quand passer à un schéma normalisé (tables `subjects`, `chapters`, `quizzes`) ?

3. **`v-chapter` est le hub fonctionnel** — c'est la vue la plus riche. Un bug ici casse quiz + flashcards + summary + OCR + chat. Mérite un test E2E dédié.

4. **Campus n'a pas accès à Supabase** — les sujets créés depuis le campus (`submitCampusCreate`) utilisent-ils bien `save()` pour persister ? À vérifier.

5. **`parseAIJSON()` est appelé uniquement par quiz et flashcards** — la génération de summary ne l'utilise pas (retourne du Markdown brut). Cohérence ?

---

## Fonctions orphelines (0 connexion entrante dans ce graphe)
- `checkStreak()` — appelé au démarrage mais pas représenté dans les arêtes
- `shuffleFC()` — bouton dans la vue flashcards (onclick direct, pas dans les arêtes graphées)
- `exportSummary()` / `exportFlashcards()` — boutons UI directs
- `submitAuth()` — appelé depuis le HTML (onclick)

Ces fonctions ne sont pas vraiment orphelines — elles sont appelées depuis le HTML via `onclick`, donc invisibles dans une analyse statique JS-only.

---

## Tables non référencées dans le code applicatif
Aucune autre table Supabase détectée. L'app utilise uniquement :
- **`eduxp_data`** (SELECT + UPSERT par user_id)
- **`auth.users`** (via Supabase Auth SDK — implicite)

Pas de tables `subjects`, `chapters`, `quizzes`, `flashcards` — tout est dénormalisé dans `eduxp_data.data`.

---

*Généré par Graphify — EducXP Knowledge Graph · 2026-06-23*
