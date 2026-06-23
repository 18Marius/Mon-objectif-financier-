# Skill: Graphify

Génère un graphe de connaissance interactif du codebase EducXP — vues, fonctions, tables Supabase, dépendances CSS, et relations entre composants. Output : `graphify-out/graph.html` (navigable dans le browser), `graph.json`, `GRAPH_REPORT.md`.

## Objectif

Rendre le codebase EducXP (single HTML file ~4000 lignes) navigable visuellement. Identifier les clusters, les dépendances cachées, les fonctions orphelines, les tables Supabase sous-utilisées. Utile avant un refactor, un audit, ou quand on est perdu dans le code.

## Process

### Étape 1 — Extraction

Lire `index.html` et extraire :

**Nœuds (nodes) :**
- `view` — chaque `id="v-*"` (ex: `v-home`, `v-cours`, `v-campus`)
- `function` — chaque `function nom(` ou `async function nom(`
- `table` — chaque appel `.from('nom_table')` Supabase
- `component` — chaque bloc CSS majeur (`.card`, `.btn`, sections header/nav)
- `event` — chaque `onclick="nom("` ou `addEventListener`

**Edges (relations) :**
- `view → function` : quand un onclick dans une vue appelle une fonction
- `function → table` : quand une fonction fait un `.from('table')`
- `function → function` : quand une fonction appelle une autre fonction
- `function → view` : quand une fonction appelle `nav('vue')`
- `event → function` : listeners

### Étape 2 — graph.json

Format :
```json
{
  "nodes": [
    {"id": "v-home", "type": "view", "label": "Home", "size": 10},
    {"id": "loadCours", "type": "function", "label": "loadCours()", "size": 8},
    {"id": "cours", "type": "table", "label": "DB: cours", "size": 12}
  ],
  "edges": [
    {"source": "v-home", "target": "loadCours", "relation": "calls"},
    {"source": "loadCours", "target": "cours", "relation": "queries"}
  ],
  "meta": {
    "generated": "ISO date",
    "totalNodes": 0,
    "totalEdges": 0,
    "clusters": []
  }
}
```

### Étape 3 — graph.html

Page HTML autonome (pas de serveur requis) avec D3.js v7 CDN :
- Force-directed graph, nœuds colorés par type
- Couleurs : view=#9B6DFF, function=#6366f1, table=#F59E0B, component=#10b981, event=#ef4444
- Click sur nœud → panneau latéral avec détails + liste des connexions
- Filtre par type (checkboxes)
- Recherche live par nom
- Zoom + pan natif D3
- Dark theme cohérent avec EducXP (`--bg:#06061A`)

### Étape 4 — GRAPH_REPORT.md

```markdown
# Graphify Report — EducXP
Date: [date]

## Chiffres clés
- X vues | Y fonctions | Z tables Supabase | ...

## Clusters détectés
- **Campus** : campusBuild*, campusAnimate, campusAI*
- **Auth** : signIn, signUp, handleAuth...
- ...

## Connexions surprenantes
- [fonction] connectée à [X] tables différentes — potentiel God Function
- [vue] sans fonction associée — vue morte ?
- ...

## Questions suggérées
- Pourquoi [X] appelle [Y] directement au lieu de passer par [Z] ?
- [Table] est interrogée depuis 4 fonctions différentes — pas de couche data ?
- ...

## Fonctions orphelines (aucune connexion entrante)
- ...

## Tables non référencées dans le code
- ...
```

### Étape 5 — Output

Créer `graphify-out/` à la racine du projet avec les 3 fichiers. Afficher un résumé dans le chat : nœuds, edges, clusters principaux, top 3 insights.

## Garde-fous

- Ne JAMAIS modifier index.html pendant l'analyse — lecture seule.
- Si index.html > 5000 lignes, lire par blocs de 500 lignes.
- Les nœuds orphelins (0 connexions) sont inclus et signalés.
- graph.html doit fonctionner en `file://` (pas de fetch, tout inline).
