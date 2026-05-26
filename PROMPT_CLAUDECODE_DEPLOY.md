# Prompt — Déploiement Netlify MEDIOMA

---

Tu es en charge du déploiement du site MEDIOMA sur Netlify.

## Ce que tu dois faire

1. **Remplace** les fichiers suivants dans le répertoire racine du projet par les versions corrigées fournies (dans le dossier `outputs/` ou transmises) :
   - `index.html`
   - `home.html`
   - `bilan.html`, `blog.html`, `blog-chakras.html`, `blog-magnetisme.html`, `blog-meditation.html`, `blog-nettoyage.html`
   - `chakras.html`, `contact.html`, `harmonisation.html`, `livre-or.html`
   - `magnetisme.html`, `meditation.html`, `mentions-legales.html`, `merci.html`
   - `nettoyage.html`, `newsletter.html`, `plan-du-site.html`, `tarifs.html`, `voyance.html`

2. **Vérifie** que ces fichiers sont bien présents à la racine du projet avant de déployer :
   - `audioplayer-shell.js`
   - `assets/js/audioplayer.js`
   - `assets/css/audioplayer.css`
   Si l'un d'eux est absent, signale-le avant de continuer.

3. **Déploie** en production sur Netlify avec la commande :
   ```bash
   netlify deploy --prod --dir=.
   ```

4. **Confirme** l'URL de déploiement et vérifie que le site répond bien sur `https://cabinetmedioma.com/`.

## Ce que tu ne dois PAS faire
- Ne modifie aucun fichier autre que ceux listés ci-dessus
- Ne touche pas à `netlify.toml`, `robots.txt`, `sitemap.xml`, `subscribe.js`
- Ne crée pas de nouveau commit Git si ce n'est pas demandé

## Contexte
Site : `https://cabinetmedioma.com/`
Hébergeur : Netlify
Dossier de publication : racine du projet (`.`)
