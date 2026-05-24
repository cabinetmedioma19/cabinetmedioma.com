# Prompt Claude Code — Créer blog-magnetisme.html

## Contexte
Site statique MEDIOMA — Frédéric Magne, thérapeute à Malemort (19360).
Magnétiseur certifié École Française du Magnétisme · 11 ans d'expérience.
Créer un nouvel article de blog : blog-magnetisme.html
Prendre blog-chakras.html comme modèle de référence exact pour la structure HTML.

---

## Informations de l'article

| Champ | Valeur |
|---|---|
| Fichier | blog-magnetisme.html |
| Titre | Le magnétisme peut-il vraiment soulager les douleurs chroniques ? |
| URL canonique | https://www.cabinetmedioma.com/blog-magnetisme.html |
| Date de publication | 2024-06-10 (afficher : 10 juin 2024) |
| Catégorie | Magnétisme |
| Temps de lecture | 6 min de lecture |
| Prestation liée | magnetisme.html |
| Tarif prestation | 50€ · 60 à 90 min · Cabinet à Malemort |
| Meta description | Douleurs chroniques, verrues, cicatrisation lente… Le magnétisme peut-il vraiment aider ? Frédéric Magne, magnétiseur certifié à Malemort (19360), partage 11 ans d'expérience terrain. |
| OG article:section | Magnétisme |

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
11. CTA prestation magnetisme.html
12. Section "Autres articles" (3 cartes : blog-chakras, blog-meditation, blog-nettoyage)
13. Cross-links (Blog, magnetisme.html, newsletter, contact)
14. Footer propre (bilan et harmonisation dans 2 `<li>` séparés, plan-du-site.html)
15. mob-nav standard
16. `<script src="animations.js" defer></script>`

---

## Schema BlogPosting à intégrer dans le `<head>`

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Le magnétisme peut-il vraiment soulager les douleurs chroniques ?",
  "description": "Douleurs chroniques, verrues, cicatrisation lente… Le magnétisme peut-il vraiment aider ? Frédéric Magne partage 11 ans d'expérience terrain.",
  "datePublished": "2024-06-10",
  "dateModified": "2024-06-10",
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
    "@id": "https://www.cabinetmedioma.com/blog-magnetisme.html"
  },
  "keywords": "magnétisme, douleurs chroniques, magnétiseur, verrues, bien-être, Malemort, Corrèze",
  "articleSection": "Magnétisme",
  "inLanguage": "fr-FR"
}
```

---

## Plan détaillé du contenu (700 mots environ)

### Intro (2 paragraphes)
Ouvrir sur le scepticisme légitime : beaucoup de personnes arrivent avec des doutes, et c'est
normal. Frédéric ne cherche pas à convaincre — il partage ce qu'il a observé en 11 ans.
Ton : honnête, rassurant, ni mystique ni médical.

### H2 — Qu'est-ce que le magnétisme, exactement ?
Expliquer simplement : le magnétiseur capte et redirige une énergie naturelle présente dans
tout être vivant. Pas de magie, pas de religion. Une pratique transmise et reconnue, encadrée
par l'École Française du Magnétisme dont Frédéric est certifié.
Mentionner : imposition des mains, passes magnétiques, travail à distance possible.

### H2 — Ce que le magnétisme peut aider (cas concrets)
Présenter sous forme de blocs numérotés (même style .sign-block que blog-chakras.html) :

1. **Les douleurs chroniques** — lombalgies, arthrose, migraines, douleurs articulaires.
   Expliquer que l'énergie stagnante autour d'une zone douloureuse peut être relancée.
   Préciser : pas une guérison garantie, mais un soulagement fréquent et parfois durable.

2. **Les verrues et problèmes cutanés** — c'est l'une des applications les plus connues
   et les plus documentées empiriquement du magnétisme. Résultats souvent visibles en
   quelques semaines. Frédéric a traité de nombreux cas, y compris à distance.

3. **La cicatrisation et la récupération** — après une opération, un traumatisme, une
   fracture. Le magnétisme peut soutenir le processus naturel de régénération du corps.

4. **Le stress et les tensions nerveuses** — l'apaisement profond induit par une séance
   agit sur le système nerveux. Beaucoup de personnes repartent avec une sensation de
   légèreté durable.

5. **Les troubles fonctionnels sans cause identifiée** — quand tous les examens sont
   normaux mais que les douleurs persistent, le magnétisme explore une piste complémentaire.

### H2 — Ce que le magnétisme ne peut pas faire
Paragraphe court et honnête (1 seul paragraphe, pas de blocs) :
Le magnétisme ne diagnostique pas, ne prescrit pas, ne guérit pas au sens médical.
Il ne remplace pas un traitement médical en cours. Son rôle est complémentaire.
Frédéric recommande toujours de consulter un médecin en parallèle.

### H2 — Pourquoi certaines personnes ne ressentent rien ?
1 paragraphe : la réceptivité varie selon les personnes et les moments. Parfois les effets
sont immédiats, parfois ils s'installent dans les jours suivants. L'état d'esprit, la fatigue,
le niveau de blocage jouent un rôle. Ce n'est pas un échec — c'est une exploration.

### Conclusion (1 paragraphe)
Inviter le lecteur à vivre l'expérience par lui-même. Le meilleur moyen de comprendre
le magnétisme, c'est de le ressentir. Un appel découverte de 10 minutes est gratuit.

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

Magnétisme · Douleurs · Bien-être · Verrues · Énergie · Thérapie complémentaire

---

## Points de vigilance

- Le `<h1>` est dans le page-hero (titre de l'article)
- Les sections de l'article utilisent `<h2>` (pas de h2 principal concurrent sur cette page)
- Les 5 cas concrets utilisent des `<h3>` dans les `.sign-block`
- La balise `<time datetime="2024-06-10">10 juin 2024</time>` dans `.article-meta`
- GA tag `G-535812353` présent dans le `<head>`
- `og:type` = `article` (pas `website`)
- `article:published_time` = `2024-06-10`
- Photo placeholder texte : "Photo à intégrer · Format recommandé 1200 × 525 px"
- Les 3 cartes "Autres articles" pointent vers : blog-chakras.html, blog-meditation.html, blog-nettoyage.html
- Footer : bilan et harmonisation dans 2 `<li>` séparés · `plan-du-site.html` (pas sitemap.xml)
- NE PAS créer d'autres fichiers que blog-magnetisme.html
