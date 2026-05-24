# Prompt Claude Code — Corrections pré-lancement MEDIOMA

## Contexte du projet

Site statique **MEDIOMA** (cabinetmedioma.com) — cabinet de thérapies énergétiques de Frédéric Magne à Malemort (19360, Corrèze). Hébergé sur **Netlify**. 19 pages HTML, 1 fichier style.css, 1 fichier animations.js, 9 images, netlify.toml, robots.txt, sitemap.xml.

Le site n'est pas encore en ligne. Tu dois effectuer **toutes les corrections listées ci-dessous** avant la mise en ligne. Travaille dans le répertoire courant où se trouvent tous ces fichiers.

---

## CORRECTIONS À EFFECTUER

### 1. STYLE.CSS — Supprimer aria-label invalide (ligne 135)

Dans `style.css`, la règle `.hamburger` contient `aria-label:"Menu";` — ce n'est pas du CSS valide, ça n'a aucun effet. Supprimer cette propriété.

**Avant :**
```css
.hamburger{display:none;flex-direction:column;gap:5px;padding:.5rem;z-index:600;aria-label:"Menu";}
```
**Après :**
```css
.hamburger{display:none;flex-direction:column;gap:5px;padding:.5rem;z-index:600;}
```

---

### 2. STYLE.CSS — Ajouter l'animation fov-spin

L'animation `@keyframes fov-spin` et la classe `.hero-fov` sont actuellement dupliquées en `<style>` inline dans 11 fichiers HTML. Les déplacer dans `style.css` (à la fin du fichier, avant la dernière accolade ou en bas) :

```css
/* ── FOV SPIN — Fleur de Vie hero ── */
@keyframes fov-spin{from{transform:translate(-50%,-50%) rotate(0deg);}to{transform:translate(-50%,-50%) rotate(360deg);}}
.hero-fov{animation:fov-spin 120s linear infinite;transform-origin:center;}
```

---

### 3. TOUS LES FICHIERS HTML — Supprimer les blocs `<style>` inline fov-spin

Dans les fichiers suivants, supprimer le bloc `<style>` en bas de page qui contient `fov-spin` (juste avant `</body>` ou juste avant `<script src="animations.js">`). Ce bloc ressemble à :

```html
<style>
@keyframes fov-spin{from{transform:translate(-50%,-50%) rotate(0deg);}to{transform:translate(-50%,-50%) rotate(360deg);}}
.hero-fov{animation:fov-spin 120s linear infinite;}
</style>
```

ou avec `transform-origin:center;` en plus. Le supprimer dans ces 11 fichiers :
- `index.html`
- `bilan.html`
- `blog.html`
- `contact.html`
- `harmonisation.html`
- `magnetisme.html`
- `meditation.html`
- `nettoyage.html`
- `plan-du-site.html`
- `tarifs.html`
- `voyance.html`

---

### 4. TOUS LES FICHIERS HTML — Supprimer `role="button"` redondant

Dans les 19 fichiers HTML, le bouton hamburger a `role="button"` sur un élément `<button>` — redondant. Supprimer cet attribut partout.

**Rechercher :** `role="button"` dans les balises `<button class="hamburger"...>`
**Remplacer par :** rien (supprimer l'attribut)

La ligne ressemble à :
```html
<button class="hamburger" id="hamburger" aria-label="Ouvrir le menu" aria-expanded="false" role="button">
```
Doit devenir :
```html
<button class="hamburger" id="hamburger" aria-label="Ouvrir le menu" aria-expanded="false">
```

---

### 5. TOUS LES FICHIERS HTML — Mettre à jour le copyright 2025 → 2025–2026

Dans le footer de chaque page HTML, remplacer :
```
© 2025 MEDIOMA
```
par :
```
© 2025–2026 MEDIOMA
```

---

### 6. TOUS LES FICHIERS HTML — Placeholder ID Google Analytics

L'ID GA4 actuel `G-535812353` semble incomplet (9 chiffres, un GA4 en a 10). En attendant que Frédéric confirme son vrai ID, ajouter un commentaire HTML visible juste avant le script gtag pour ne pas oublier :

Remplacer dans les 19 fichiers :
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-535812353"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-535812353');</script>
```
par :
```html
<!-- TODO: Vérifier l'ID GA4 avec Frédéric — remplacer G-535812353 si incomplet -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-535812353"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-535812353');</script>
```

---

### 7. CONTACT.HTML — Retirer hide_gdpr_banner Calendly

Dans `contact.html`, l'URL du widget Calendly contient `hide_gdpr_banner=1` ce qui masque la bannière RGPD — problème légal potentiel CNIL.

**Rechercher :**
```
data-url="https://calendly.com/contact-cabinetmedioma?hide_gdpr_banner=1&background_color=1e1a35&text_color=f2ead8&primary_color=d4a84b&locale=fr"
```
**Remplacer par :**
```
data-url="https://calendly.com/contact-cabinetmedioma?background_color=1e1a35&text_color=f2ead8&primary_color=d4a84b&locale=fr"
```

---

### 8. TOUS LES FICHIERS HTML — Remplacer le SVG nav-logo-icon par le favicon

Dans la navigation de chaque page, le logo SVG géométrique hexagonal est incohérent avec le favicon officiel (le "M" doré). Remplacer le SVG dans le logo de navigation par l'image favicon.png.

**Rechercher dans toutes les pages (bloc identique dans les 19 nav) :**
```html
<svg class="nav-logo-icon" viewBox="0 0 80 80" fill="none"><polygon points="40,4 76,22 76,58 40,76 4,58 4,22" stroke="#c9a84c" stroke-width="1.2" fill="none"/><circle cx="40" cy="40" r="18" stroke="#c9a84c" stroke-width=".8" fill="none"/><polygon points="40,16 58,50 22,50" stroke="#c9a84c" stroke-width=".8" fill="none"/><polygon points="40,64 22,30 58,30" stroke="#c9a84c" stroke-width=".8" fill="none"/><circle cx="40" cy="40" r="3" fill="#c9a84c" opacity=".8"/></svg>
```
**Remplacer par :**
```html
<img src="favicon.png" alt="MEDIOMA" class="nav-logo-icon" width="34" height="34" style="border-radius:8px;"/>
```

Faire de même dans le footer de chaque page pour le petit SVG logo (le même motif hexagonal mais plus petit, style `width:34px;height:34px;opacity:.55`) :

**Rechercher (footer) :**
```html
<svg viewBox="0 0 80 80" fill="none" style="width:34px;height:34px;margin-bottom:.9rem;opacity:.55;display:block;" aria-hidden="true"><polygon points="40,4 76,22 76,58 40,76 4,58 4,22" stroke="#c9a84c" stroke-width="1.2" fill="none"/><circle cx="40" cy="40" r="18" stroke="#c9a84c" stroke-width=".8" fill="none"/><polygon points="40,16 58,50 22,50" stroke="#c9a84c" stroke-width=".8" fill="none"/><polygon points="40,64 22,30 58,30" stroke="#c9a84c" stroke-width=".8" fill="none"/><circle cx="40" cy="40" r="3" fill="#c9a84c" opacity=".8"/></svg>
```
**Remplacer par :**
```html
<img src="favicon.png" alt="MEDIOMA" width="34" height="34" style="width:34px;height:34px;margin-bottom:.9rem;opacity:.55;display:block;border-radius:6px;"/>
```

---

### 9. TOUS LES FICHIERS HTML — Ajouter width/height sur les images

Ajouter les attributs `width` et `height` sur toutes les balises `<img>` qui n'en ont pas, pour éviter le CLS (Cumulative Layout Shift). Voici les dimensions exactes :

| Fichier image | width | height |
|---|---|---|
| `favicon.png` | 34 | 34 |
| `about-visual.png` | 800 | 800 |
| `icone-voyance.png` | 500 | 500 |
| `icone-magnetisme.png` | 500 | 500 |
| `icone-chakras.png` | 500 | 500 |
| `icone-nettoyage.png` | 500 | 500 |
| `icone-meditation.png` | 500 | 500 |
| `icone-bilan.png` | 500 | 500 |
| `icone-harmonisation.png` | 500 | 500 |
| `blog-chakras-hero.jpg` | 1920 | 1080 |
| `blog-magnetisme-hero.jpg` | 1920 | 1080 |
| `blog-meditation-hero.jpg` | 1920 | 1080 |
| `blog-nettoyage-hero.jpg` | 1920 | 1080 |

Pour les icônes dans la navigation méga-drop (class `mega-icon-wrap`), les icônes sont affichées à 44×44. Pour les `scard-icon`, elles sont à 50×50. Pour les `scard-bg`, à 180×180. Pour les `cross-icon`, à 46×46. Ajouter width et height cohérents avec leur usage CSS.

---

### 10. SITEMAP.XML — Augmenter la priorité de tarifs.html

Dans `sitemap.xml`, changer la priorité de `tarifs.html` de `0.5` à `0.7` :

**Rechercher :**
```xml
<url>
    <loc>https://cabinetmedioma.com/tarifs.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
```
**Remplacer par :**
```xml
<url>
    <loc>https://cabinetmedioma.com/tarifs.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
```

---

### 11. LIVRE-OR.HTML — Intégrer Netlify Forms (solution sans backend)

Remplacer le formulaire client-only actuel par un formulaire **Netlify Forms** (natif Netlify, zéro code serveur). 

Dans `livre-or.html`, trouver la balise `<form` du formulaire du livre d'or et :

1. Ajouter les attributs Netlify : `name="livre-or" netlify netlify-honeypot="bot-field"` et `method="POST"`
2. Ajouter juste après l'ouverture du form un champ caché honeypot :
```html
<input type="hidden" name="form-name" value="livre-or"/>
<p style="display:none;"><label>Ne pas remplir : <input name="bot-field"/></label></p>
```
3. L'action du formulaire doit pointer vers une page de confirmation : `action="/merci.html"`

**Créer également le fichier `merci.html`** — page de confirmation post-soumission, dans le même style que les autres pages du site (nav + footer identiques à une autre page, par exemple mentions-legales.html). Contenu de la section principale :

```html
<section class="page-hero">
  <div class="page-hero-bg"></div>
  <div id="stars"></div>
  <p class="ph-eyebrow">✦ &nbsp; Merci pour votre témoignage &nbsp; ✦</p>
  <h1 class="ph-title">Message <em>reçu</em></h1>
  <p class="ph-promise">« Votre expérience illumine le chemin des autres »</p>
  <div class="ph-line"></div>
</section>
<p class="breadcrumb rv"><a href="index.html">Accueil</a> &nbsp;·&nbsp; Merci</p>
<section class="section section-void">
  <div class="inner rv" style="max-width:680px;margin:0 auto;text-align:center;">
    <span class="label">Témoignage reçu</span>
    <h2 class="heading">Merci pour votre <em>confiance</em></h2>
    <div class="rule rule-c"></div>
    <p class="prose">Votre témoignage a bien été transmis. Je le lirai avec attention et il pourra aider d'autres personnes dans leur démarche de bien-être.</p>
    <a href="index.html" class="btn" style="margin-top:2rem;display:inline-flex;"><span>Retour à l'accueil</span></a>
  </div>
</section>
```

Ajouter `merci.html` dans `sitemap.xml` avec priorité `0.3`.

---

### 12. NETLIFY/FUNCTIONS/SUBSCRIBE.JS — Créer la fonction newsletter

Créer le fichier `netlify/functions/subscribe.js` pour l'intégration Brevo (ex Sendinblue). Ce fichier doit être fonctionnel et documenté :

```javascript
/* ═══════════════════════════════════════════════════
   MEDIOMA — Netlify Function : Newsletter Subscribe
   Intégration : Brevo (ex Sendinblue)
   Expert : Baptiste (Email Marketing)

   CONFIGURATION REQUISE dans Netlify :
   → Environment Variables → Ajouter :
     BREVO_API_KEY = votre_clé_api_brevo
     BREVO_LIST_ID = id_de_votre_liste (ex: 2)
═══════════════════════════════════════════════════ */

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://cabinetmedioma.com',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const CORS = {
    'Access-Control-Allow-Origin': 'https://cabinetmedioma.com',
    'Content-Type': 'application/json'
  };

  try {
    const { email, prenom, interests } = JSON.parse(event.body || '{}');

    if (!email || !email.includes('@')) {
      return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Email invalide' }) };
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || '2');

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY manquante dans les variables Netlify');
      return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: 'Configuration manquante' }) };
    }

    const payload = {
      email: email.toLowerCase().trim(),
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
      attributes: {}
    };

    if (prenom) payload.attributes.PRENOM = prenom.trim();
    if (interests && Array.isArray(interests)) payload.attributes.INTERETS = interests.join(', ');

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 204) {
      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({ success: true, message: 'Inscription réussie' })
      };
    }

    const errData = await response.json().catch(() => ({}));

    // Contact déjà inscrit — pas une vraie erreur
    if (response.status === 400 && errData.code === 'duplicate_parameter') {
      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({ success: true, message: 'Déjà inscrit' })
      };
    }

    console.error('Erreur Brevo:', errData);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: 'Erreur lors de l\'inscription' })
    };

  } catch (err) {
    console.error('Erreur fonction subscribe:', err);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: 'Erreur serveur' })
    };
  }
};
```

---

### 13. OPTIMISATION DES IMAGES BLOG — Script Node.js

Les 3 images de blog hero sont trop lourdes (1,3 à 1,8 MB). Créer un script `optimize-images.js` à la racine du projet pour les compresser avec Sharp :

```javascript
/* ═══════════════════════════════════════════════════
   MEDIOMA — Script d'optimisation des images
   Usage : node optimize-images.js
   Prérequis : npm install sharp
═══════════════════════════════════════════════════ */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const images = [
  { input: 'blog-chakras-hero.jpg',    output: 'blog-chakras-hero.jpg' },
  { input: 'blog-magnetisme-hero.jpg', output: 'blog-magnetisme-hero.jpg' },
  { input: 'blog-meditation-hero.jpg', output: 'blog-meditation-hero.jpg' },
];

async function optimize() {
  for (const img of images) {
    const inputPath  = path.join(__dirname, img.input);
    const outputPath = path.join(__dirname, img.output + '.tmp.jpg');

    if (!fs.existsSync(inputPath)) {
      console.log(`⏭  Introuvable : ${img.input}`);
      continue;
    }

    const before = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .resize(1920, 1080, { fit: 'cover', withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true, mozjpeg: true })
      .toFile(outputPath);

    const after = fs.statSync(outputPath).size;

    // Remplacer l'original seulement si le fichier compressé est plus petit
    if (after < before) {
      fs.renameSync(outputPath, inputPath);
      console.log(`✓ ${img.input} : ${Math.round(before/1024)} KB → ${Math.round(after/1024)} KB (-${Math.round((1-after/before)*100)}%)`);
    } else {
      fs.unlinkSync(outputPath);
      console.log(`= ${img.input} : déjà optimisé (${Math.round(before/1024)} KB)`);
    }
  }
  console.log('\n✓ Optimisation terminée.');
}

optimize().catch(console.error);
```

Ensuite, exécuter :
```bash
npm install sharp
node optimize-images.js
```

---

### 14. VÉRIFICATIONS FINALES

Après toutes les corrections, vérifier :

1. **Aucun `<style>` avec `fov-spin`** ne subsiste dans les HTML :
   ```bash
   grep -rn "fov-spin" *.html
   ```
   → Doit retourner zéro résultat.

2. **Aucun `role="button"`** dans les HTML :
   ```bash
   grep -rn 'role="button"' *.html
   ```
   → Doit retourner zéro résultat.

3. **Aucun `© 2025 MEDIOMA`** (sans le tiret) :
   ```bash
   grep -rn "© 2025 MEDIOMA" *.html
   ```
   → Doit retourner zéro résultat.

4. **Aucun `hide_gdpr_banner`** :
   ```bash
   grep -rn "hide_gdpr_banner" *.html
   ```
   → Doit retourner zéro résultat.

5. **Fichiers créés** :
   - `netlify/functions/subscribe.js` ✓
   - `merci.html` ✓
   - `optimize-images.js` ✓

6. **style.css ne contient plus `aria-label:"Menu"`** :
   ```bash
   grep "aria-label" style.css
   ```
   → Doit retourner zéro résultat.

---

## RÉSUMÉ DES FICHIERS MODIFIÉS

| Fichier | Modifications |
|---|---|
| `style.css` | Supprimer aria-label CSS · Ajouter fov-spin |
| `index.html` | Supprimer fov-spin inline · role=button · copyright · GA4 commentaire · logo nav · width/height images |
| `bilan.html` | Idem sans logo (page-hero, pas de hero principal) |
| `blog.html` | Idem |
| `blog-chakras.html` | copyright · role=button · GA4 · width/height images hero |
| `blog-magnetisme.html` | Idem |
| `blog-meditation.html` | Idem |
| `blog-nettoyage.html` | Idem |
| `chakras.html` | fov-spin · role=button · copyright · GA4 · logo |
| `contact.html` | fov-spin · role=button · copyright · GA4 · logo · Calendly RGPD |
| `harmonisation.html` | fov-spin · role=button · copyright · GA4 · logo |
| `magnetisme.html` | fov-spin · role=button · copyright · GA4 · logo |
| `meditation.html` | fov-spin · role=button · copyright · GA4 · logo |
| `mentions-legales.html` | role=button · copyright · GA4 · logo |
| `nettoyage.html` | fov-spin · role=button · copyright · GA4 · logo |
| `newsletter.html` | role=button · copyright · GA4 · logo |
| `plan-du-site.html` | fov-spin · role=button · copyright · GA4 · logo |
| `tarifs.html` | fov-spin · role=button · copyright · GA4 · logo |
| `voyance.html` | fov-spin · role=button · copyright · GA4 · logo |
| `livre-or.html` | fov-spin · role=button · copyright · GA4 · logo · Netlify Forms |
| `sitemap.xml` | Priorité tarifs 0.5→0.7 · Ajouter merci.html |
| `netlify/functions/subscribe.js` | **CRÉER** |
| `merci.html` | **CRÉER** |
| `optimize-images.js` | **CRÉER** |

---

## NOTE IMPORTANTE

Ne pas modifier :
- Les tarifs (à valider avec Frédéric)
- Le compteur `data-target="11"` (à valider avec Frédéric)
- Le contenu éditorial des pages
- La structure CSS dans style.css (sauf les 2 corrections listées)
- Le netlify.toml (déjà optimal)
