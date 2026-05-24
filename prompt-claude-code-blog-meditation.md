# Prompt Claude Code — Créer blog-meditation.html

## Contexte
Site statique MEDIOMA — Frédéric Magne, thérapeute à Malemort (19360).
Initiateur à la méditation · 11 ans d'expérience · tous niveaux.
Créer un nouvel article de blog : blog-meditation.html
Prendre blog-chakras.html comme modèle de référence exact pour la structure HTML.

---

## Informations de l'article

| Champ | Valeur |
|---|---|
| Fichier | blog-meditation.html |
| Titre | 5 minutes par jour suffisent-elles pour méditer efficacement ? |
| URL canonique | https://www.cabinetmedioma.com/blog-meditation.html |
| Date de publication | 2024-09-03 (afficher : 3 septembre 2024) |
| Catégorie | Méditation |
| Temps de lecture | 5 min de lecture |
| Prestation liée | meditation.html |
| Tarif prestation | 20€ · Cabinet à Malemort · Tous niveaux |
| Meta description | On croit souvent qu'il faut des heures pour méditer vraiment. La réalité est plus simple. Frédéric Magne, thérapeute à Malemort (19360), explique comment 5 minutes bien utilisées peuvent tout changer. |
| OG article:section | Méditation |

---

## Structure de la page

Reprendre EXACTEMENT la même structure que blog-chakras.html :
1. `<head>` complet (charset, viewport, title, meta, canonical, OG, schema BlogPosting, GA, style.css)
2. Skip-link + Nav identique (mega-drop complet, Blog marqué active)
3. Mobile-nav identique (Blog marqué active)
4. Page-hero avec h1 et catégorie en eyebrow
5. Breadcrumb : Accueil → Blog → [titre court]
6. Section article (section-void) avec .article-body
7. Article-meta (date, auteur, catégorie)
8. Photo placeholder (même style — format 1200×525px)
9. Corps de l'article (voir plan ci-dessous)
10. Disclaimer bien-être
11. CTA prestation meditation.html
12. Section "Autres articles" (3 cartes : blog-chakras, blog-magnetisme, blog-nettoyage)
13. Cross-links (Blog, meditation.html, newsletter, contact)
14. Footer propre (bilan et harmonisation dans 2 `<li>` séparés, plan-du-site.html)
15. mob-nav standard
16. `<script src="animations.js" defer></script>`

---

## Schema BlogPosting à intégrer dans le `<head>`

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "5 minutes par jour suffisent-elles pour méditer efficacement ?",
  "description": "On croit souvent qu'il faut des heures pour méditer vraiment. La réalité est plus simple et plus encourageante.",
  "datePublished": "2024-09-03",
  "dateModified": "2024-09-03",
  "author": {
    "@type": "Person",
    "name": "Frédéric Magne",
    "url": "https://www.cabinetmedioma.com"
  },
  "publisher": {
    "@type": "LocalBusiness",
    "name": "MEDIOMA",
    "url": "https://www.cabinetmedioma.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Malemort",
      "addressRegion": "Corrèze",
      "postalCode": "19360",
      "addressCountry": "FR"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.cabinetmedioma.com/blog-meditation.html"
  },
  "keywords": "méditation, 5 minutes, débutant, bien-être, pleine conscience, Malemort, Corrèze",
  "articleSection": "Méditation",
  "inLanguage": "fr-FR"
}
```

---

## Plan détaillé du contenu (700 mots environ)

### Intro (2 paragraphes)
Ouvrir sur l'idée reçue : « je n'ai pas le temps », « il faut être zen de nature »,
« je n'arrive pas à vider ma tête ». Ces croyances empêchent des millions de personnes
de commencer. Frédéric les démonte une par une avec bienveillance.
Ton : encourageant, accessible, ancré dans le quotidien.

### H2 — Non, méditer ce n'est pas vider sa tête
1 paragraphe fondateur : corriger la définition. Méditer, c'est observer ses pensées sans
s'y accrocher — pas les faire disparaître. Le mental qui vagabonde n'est pas un échec,
c'est la pratique elle-même. Chaque retour à l'instant présent est un moment de méditation.

### H2 — Ce qui se passe dans votre cerveau en 5 minutes
Présenter sous forme de blocs numérotés (même style .sign-block que blog-chakras.html) :

1. **0 à 60 secondes — Le système nerveux commence à décélérer**
   La respiration ralentit, le rythme cardiaque suit. Le corps reçoit le signal qu'il
   peut sortir du mode « alerte ». C'est physiologique, pas mystique.

2. **1 à 2 minutes — Le cortisol baisse**
   L'hormone du stress commence à diminuer. Ce n'est pas une métaphore —
   des études en neurosciences le confirment. Même une courte pause consciente
   a un impact mesurable sur le système hormonal.

3. **2 à 3 minutes — L'attention se recentre**
   Le flux de pensées automatiques ralentit. Vous commencez à percevoir
   l'instant présent — les sons, les sensations corporelles, votre propre respiration.
   C'est là que la pratique prend racine.

4. **3 à 5 minutes — Un espace s'ouvre**
   Quelque chose se pose en vous. Ce n'est pas toujours spectaculaire, mais c'est réel.
   Une légère clarté, un sentiment de recul. C'est cet espace que la pratique régulière
   élargit progressivement, jour après jour.

### H2 — 5 minutes bien utilisées : le protocole simple
Pas de blocs numérotés ici — rédiger en prose fluide (3 paragraphes) :
- Choisir un moment fixe (matin au réveil ou soir avant de dormir) — la régularité
  prime sur la durée.
- S'asseoir confortablement, poser les mains sur les genoux, fermer les yeux.
  Pas besoin de posture de lotus ni de coussin spécial.
- Observer la respiration sans la contrôler. Quand une pensée arrive, la noter
  mentalement ("voilà une pensée") et revenir doucement à la respiration.
  C'est tout. C'est suffisant pour commencer.

### H2 — Quand 5 minutes ne suffisent plus
1 paragraphe positif : la bonne nouvelle, c'est qu'une fois que la pratique s'installe,
5 minutes deviennent naturellement 10, puis 15. Le corps appelle la méditation comme
il appelle le mouvement ou le sommeil. C'est à ce stade qu'une initiation accompagnée
permet d'aller plus loin — apprendre les techniques adaptées à sa propre nature,
explorer des pratiques plus profondes.

### Conclusion (1 paragraphe)
Conclure avec chaleur : le seul pré-requis pour méditer, c'est de commencer.
Pas demain. Pas quand vous serez moins occupé. Maintenant, avec ce que vous êtes.
Inviter à découvrir la séance d'initiation à la méditation proposée par Frédéric.

---

## Styles CSS spécifiques à inclure dans `<style>`

Reprendre EXACTEMENT les mêmes styles que blog-chakras.html :
- `.article-meta` et ses sous-éléments
- `.article-photo-placeholder`
- `.placeholder-icon` et `.placeholder-txt`
- `.article-body h2`, `.article-body p`, `.article-body strong`, `.article-body em`
- `.sign-block`, `.sign-number`, `.sign-content h3`, `.sign-content p`
- `.article-disclaimer`
- `.article-cta` (avec ::before et ::after cornières dorées)
- `.article-tags` et `.article-tag`

---

## Tags de l'article (section bas de page)

Méditation · Pleine conscience · Débutant · Bien-être · Stress · Pratique quotidienne

---

## Points de vigilance

- Le `<h1>` est dans le page-hero (titre de l'article)
- Les sections de l'article utilisent `<h2>` (pas de h2 principal concurrent sur cette page)
- Les 4 étapes "cerveau" utilisent des `<h3>` dans les `.sign-block`
- La balise `<time datetime="2024-09-03">3 septembre 2024</time>` dans `.article-meta`
- GA tag `G-535812353` présent dans le `<head>`
- `og:type` = `article` (pas `website`)
- `article:published_time` = `2024-09-03`
- Photo placeholder texte : "Photo à intégrer · Format recommandé 1200 × 525 px"
- Les 3 cartes "Autres articles" pointent vers : blog-chakras.html, blog-magnetisme.html, blog-nettoyage.html
- Footer : bilan et harmonisation dans 2 `<li>` séparés · `plan-du-site.html` (pas sitemap.xml)
- NE PAS créer d'autres fichiers que blog-meditation.html
