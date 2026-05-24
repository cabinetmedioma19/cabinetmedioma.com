# Prompt Claude Code — Mettre à jour blog.html · liens articles

## Contexte
Site statique MEDIOMA — Frédéric Magne, thérapeute à Malemort (19360).
Les 4 vrais articles de blog ont été créés. Il faut mettre à jour blog.html pour que
les boutons "Lire l'article" pointent vers ces articles et non plus vers les pages prestation.
Modifier blog.html uniquement. Ne pas toucher aux autres fichiers.

---

## Les 4 corrections de liens à effectuer

### Article 1 — Chakras
Avant :
```html
<a href="chakras.html" class="btn" style="margin-top:1rem;font-size:.7rem;padding:.9em 2em;"><span>Lire l'article &rarr;</span></a>
```
Après :
```html
<a href="blog-chakras.html" class="btn" style="margin-top:1rem;font-size:.7rem;padding:.9em 2em;"><span>Lire l'article &rarr;</span></a>
```

### Article 2 — Magnétisme
Avant :
```html
<a href="magnetisme.html" class="btn" style="margin-top:1rem;font-size:.7rem;padding:.9em 2em;"><span>Lire l'article &rarr;</span></a>
```
Après :
```html
<a href="blog-magnetisme.html" class="btn" style="margin-top:1rem;font-size:.7rem;padding:.9em 2em;"><span>Lire l'article &rarr;</span></a>
```

### Article 3 — Méditation
Avant :
```html
<a href="meditation.html" class="btn" style="margin-top:1rem;font-size:.7rem;padding:.9em 2em;"><span>Lire l'article &rarr;</span></a>
```
Après :
```html
<a href="blog-meditation.html" class="btn" style="margin-top:1rem;font-size:.7rem;padding:.9em 2em;"><span>Lire l'article &rarr;</span></a>
```

### Article 4 — Nettoyage
Avant :
```html
<a href="nettoyage.html" class="btn" style="margin-top:1rem;font-size:.7rem;padding:.9em 2em;"><span>Lire l'article &rarr;</span></a>
```
Après :
```html
<a href="blog-nettoyage.html" class="btn" style="margin-top:1rem;font-size:.7rem;padding:.9em 2em;"><span>Lire l'article &rarr;</span></a>
```

---

## Corrections supplémentaires à faire dans le même fichier

Ces corrections avaient été identifiées précédemment mais n'ont pas encore été
appliquées sur cette version de blog.html.

### Correction A — Google Analytics manquant
Ajouter dans le `<head>` juste avant `</head>` :
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-535812353"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-535812353');</script>
```

### Correction B — Hiérarchie H2 → H3 sur les titres d'articles
Remplacer les 4 occurrences suivantes :

```html
<h2 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Comment savoir si vos chakras sont déséquilibrés ?</h2>
```
→
```html
<h3 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Comment savoir si vos chakras sont déséquilibrés ?</h3>
```

```html
<h2 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Le magnétisme peut-il vraiment soulager les douleurs chroniques ?</h2>
```
→
```html
<h3 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Le magnétisme peut-il vraiment soulager les douleurs chroniques ?</h3>
```

```html
<h2 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">5 minutes par jour suffisent-elles pour méditer efficacement ?</h2>
```
→
```html
<h3 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">5 minutes par jour suffisent-elles pour méditer efficacement ?</h3>
```

```html
<h2 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Votre maison garde-t-elle la mémoire de ce qui s'y est passé ?</h2>
```
→
```html
<h3 class="heading" style="font-size:1.6rem;margin-bottom:1rem;">Votre maison garde-t-elle la mémoire de ce qui s'y est passé ?</h3>
```

### Correction C — Footer · bug `<li>` fusionné
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

### Correction D — Footer · Plan du site
Avant :
```html
<li><a href="sitemap.xml">Plan du site</a></li>
```
Après :
```html
<li><a href="plan-du-site.html">Plan du site</a></li>
```

---

## Vérifications finales

- [ ] Les 4 boutons "Lire l'article" pointent vers blog-chakras.html, blog-magnetisme.html, blog-meditation.html, blog-nettoyage.html
- [ ] GA tag G-535812353 présent dans le `<head>`
- [ ] Les 4 titres d'articles sont en `<h3>` (plus en `<h2>`)
- [ ] Le `<h2>` "Ressources pour votre bien-être" est le seul H2 de la section
- [ ] bilan.html et harmonisation.html sont dans 2 `<li>` séparés
- [ ] Le lien Plan du site pointe vers plan-du-site.html
- [ ] Aucune autre modification apportée à la page
