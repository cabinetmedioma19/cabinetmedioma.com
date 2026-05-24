# Prompt Claude Code — blog.html · 3 corrections rapides

## Contexte
Site statique MEDIOMA — Frédéric Magne, thérapeute à Malemort (19360).
Fichier concerné : blog.html uniquement. Ne pas toucher aux autres fichiers.

---

## CORRECTION 1 — Ajouter Google Analytics

### Problème
Le tag Google Analytics est absent du <head> de blog.html.
Toutes les autres pages ont ce tag, blog.html est la seule page non trackée.
GA ID du site : G-535812353

### Correction
Ajouter ces 2 lignes dans le <head>, juste AVANT la balise </head>, après le lien style.css :

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-535812353"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-535812353');</script>
```

---

## CORRECTION 2 — Corriger le footer

### Problème A — Bug HTML : 2 liens dans 1 seul <li>
Dans la colonne "Prestations" du footer, bilan.html et harmonisation.html
sont imbriqués dans le même <li>. Harmonisation n'apparaît pas correctement.

Avant :
```html
<li><a href="bilan.html">Bilan Énergétique</a>
  <a href="harmonisation.html">Harmonisation Énergétique</a></li>
```
Après :
```html
<li><a href="bilan.html">Bilan Énergétique</a></li>
<li><a href="harmonisation.html">Harmonisation Énergétique</a></li>
```

### Problème B — Lien Plan du site incorrect
Dans la colonne "Réseaux" du footer, le lien pointe vers sitemap.xml
(page XML brute) au lieu de la page HTML dédiée.

Avant :
```html
<li><a href="sitemap.xml">Plan du site</a></li>
```
Après :
```html
<li><a href="plan-du-site.html">Plan du site</a></li>
```

---

## CORRECTION 3 — Corriger la hiérarchie H2 → H3 sur les articles

### Problème
La section contient déjà un <h2> principal :
  <h2 class="heading">Ressources pour votre <em>bien-être</em></h2>

Les 4 titres d'articles utilisent aussi <h2>, ce qui crée 5 balises H2
au même niveau hiérarchique. C'est incorrect sémantiquement et nuit au SEO.
Les titres d'articles doivent être en <h3>.

### Corrections — remplacer les 4 occurrences suivantes :

**Article 1 :**
Avant :
```html
<h2 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Comment savoir si vos chakras sont déséquilibrés ?</h2>
```
Après :
```html
<h3 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Comment savoir si vos chakras sont déséquilibrés ?</h3>
```

**Article 2 :**
Avant :
```html
<h2 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Le magnétisme peut-il vraiment soulager les douleurs chroniques ?</h2>
```
Après :
```html
<h3 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Le magnétisme peut-il vraiment soulager les douleurs chroniques ?</h3>
```

**Article 3 :**
Avant :
```html
<h2 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">5 minutes par jour suffisent-elles pour méditer efficacement ?</h2>
```
Après :
```html
<h3 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">5 minutes par jour suffisent-elles pour méditer efficacement ?</h3>
```

**Article 4 :**
Avant :
```html
<h2 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Votre maison garde-t-elle la mémoire de ce qui s'y est passé ?</h2>
```
Après :
```html
<h3 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Votre maison garde-t-elle la mémoire de ce qui s'y est passé ?</h3>
```

---

## Vérifications finales

- [ ] GA tag présent dans le <head> avec l'ID G-535812353
- [ ] bilan.html et harmonisation.html sont dans 2 <li> séparés dans le footer
- [ ] Le lien Plan du site pointe vers plan-du-site.html
- [ ] Les 4 titres d'articles sont en <h3> et non plus en <h2>
- [ ] Le <h2> "Ressources pour votre bien-être" est le SEUL <h2> de la section
- [ ] Aucune autre modification apportée à la page
