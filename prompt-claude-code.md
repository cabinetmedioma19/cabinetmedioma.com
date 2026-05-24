# Prompt Claude Code — Analyse complète MEDIOMA

## Contexte du projet

Tu analyses le site statique **MEDIOMA** de Frédéric Magne, thérapeute en bien-être (Magnétiseur · Médium), basé à Malemort (19360, Corrèze).

- **URL** : https://www.cabinetmedioma.com
- **Hébergement** : Netlify (non configuré pour l'instant — ignorer tout ce qui concerne Netlify Forms et les Functions)
- **Stack** : HTML statique · style.css · animations.js
- **14 fichiers HTML** + sitemap.xml + robots.txt + netlify.toml

---

## Charte graphique (variables CSS clés)

```css
--void:     #181628   /* fond principal */
--deep:     #1e1a35   /* sections alternées */
--gold:     #d4a84b   /* or 22 carats */
--gold-lt:  #f0cc72   /* or clair */
--ivory:    #f2ead8   /* texte principal */
--serif:    'Cormorant'
--sans:     'Jost'
```

---

## Liste complète des fichiers

```
index.html          — Accueil
voyance.html        — Voyance & Médiumité
magnetisme.html     — Magnétisme Thérapeutique
chakras.html        — Alignement des Chakras
nettoyage.html      — Nettoyage des Lieux
meditation.html     — Initiation Méditation
bilan.html          — Bilan de Vie Énergétique
harmonisation.html  — Harmonisation Énergétique
blog.html           — Blog (4 articles)
tarifs.html         — Tarifs
contact.html        — Contact & RDV (Calendly intégré)
newsletter.html     — La Lettre de Lumière
livre-or.html       — Livre d'Or
mentions-legales.html
plan-du-site.html   — Plan du site HTML (nouveau)
style.css           — Charte graphique v7.0 (711 lignes)
animations.js       — Moteur d'animation v3.2 (21 fonctions, 990 lignes)
sitemap.xml         — 14 URLs pour Google
robots.txt
netlify.toml
```

---

## Corrections déjà effectuées (ne pas re-signaler)

1. **index.html** — Cellule compteur "certif" : suppression du `counter-num` NaN+, remplacée par un badge SVG hexagone + checkmark doré + label "Certifié"
2. **animations.js** — Ajout de `if (isNaN(target)) return;` dans `initCounters()` pour éviter NaN+ sur les cellules sans `data-target`
3. **index.html** — Ajout du lien `Plan du site` dans le footer (manquant)
4. **mentions-legales.html** — Bug HTML `<li>` fusionné (bilan + harmonisation) corrigé
5. **mentions-legales.html** — Coordonnées hébergeur Netlify ajoutées (obligation légale)
6. **magnetisme.html** — Schema.org `"MagnétismeThérapeutique"` → `"Magnétisme Thérapeutique"` (espace manquant)
7. **tarifs.html** — Prix ajoutés dans tous les offers Schema.org (Voyance 70€, Magnétisme 50€, Chakras 30€, Bilan 50€)
8. **meditation.html** — `class="act"` corrigé sur la barre de navigation mobile
9. **nettoyage.html** — `class="act"` corrigé sur la barre de navigation mobile
10. **plan-du-site.html** — Nouvelle page créée (remplace le lien vers sitemap.xml dans tous les footers)
11. **Tous les footers** — Lien `sitemap.xml` remplacé par `plan-du-site.html` sur les 15 fichiers HTML

---

## Mission d'analyse

Analyse l'ensemble du projet en lisant tous les fichiers. Pour chaque point identifié, indique le fichier, la ligne et la correction proposée.

### 1. Cohérence globale
- Vérifie que nav, footer, mobile-nav et mob-nav sont identiques sur toutes les pages
- Vérifie les balises `<title>` et `<meta description>` : unicité, présence des mots-clés SEO locaux (Malemort, Corrèze, 19360)
- Vérifie les balises `<link rel="canonical">` : cohérence avec l'URL réelle de chaque page
- Vérifie les breadcrumbs : présents et corrects sur toutes les pages prestation

### 2. Schema.org
- Vérifie que chaque page prestation a son propre schema `Service` avec `name`, `description`, `provider`, `offers` (avec `price` et `priceCurrency`)
- Vérifie le schema `LocalBusiness` sur index.html
- Vérifie le schema `AggregateRating` sur livre-or.html
- Vérifie le schema `FAQPage` sur les pages qui l'ont
- Valide la syntaxe JSON de chaque bloc `ld+json`

### 3. Accessibilité (A11Y)
- Vérifie la présence des `alt` sur toutes les images
- Vérifie les `aria-label` sur les boutons et éléments interactifs
- Vérifie la présence du `skip-link` sur toutes les pages
- Vérifie la hiérarchie des titres (h1 → h2 → h3) sur chaque page

### 4. Performance & bonnes pratiques
- Vérifie que toutes les images ont `loading="lazy"` (sauf above-the-fold)
- Vérifie la présence de `rel="noopener"` sur tous les liens `target="_blank"`
- Vérifie les doubles imports de polices (CSS @import + link HTML)
- Vérifie que `animations.js` est bien en `defer` sur toutes les pages

### 5. Liens internes
- Vérifie qu'aucun lien ne pointe vers une page inexistante
- Vérifie la cohérence des cross-links entre pages prestation
- Vérifie que `plan-du-site.html` est bien lié depuis tous les footers

### 6. style.css
- Vérifie les media queries : couverture mobile complète
- Identifie les classes CSS définies mais jamais utilisées dans les HTML
- Identifie les styles inline dans les HTML qui pourraient être factorisés en classes

### 7. animations.js
- Vérifie que les 21 fonctions listées dans le console.log sont toutes définies et appelées
- Vérifie qu'il n'y a pas d'erreurs de syntaxe ou de références à des éléments inexistants
- Vérifie la gestion `prefers-reduced-motion`

### 8. Contact & formulaires
- Vérifie le formulaire de découverte dans contact.html : la fonction `submitDecouverte()` envoie-t-elle vraiment les données ? (Note : Netlify non configuré pour l'instant)
- Vérifie le formulaire newsletter : structure et validation côté client

### 9. Contenu éditorial
- Vérifie la cohérence des tarifs affichés dans les pages prestation vs tarifs.html
- Vérifie les disclaimers "pratique de bien-être complémentaire" : présents sur toutes les pages prestation ?
- Signale les textes tronqués ou placeholders restants

### 10. sitemap.xml
- Vérifie que `plan-du-site.html` est ajouté dans sitemap.xml (il a été créé mais pas encore ajouté)
- Vérifie que toutes les URLs du sitemap correspondent à des fichiers existants
- Vérifie les priorités et changefreq

---

## Format de sortie attendu

Pour chaque problème trouvé :
```
[FICHIER] ligne X — [CATÉGORIE] — Description du problème
→ Correction : ...
```

Regroupe par catégorie. Indique clairement la sévérité : 🔴 critique · 🟠 important · 🟡 mineur.

À la fin, génère un **score de qualité global** sur 100 avec détail par catégorie.
