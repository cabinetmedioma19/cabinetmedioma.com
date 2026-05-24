# Prompt Claude Code — contact.html · 2 corrections

## Contexte
Site statique MEDIOMA — Frédéric Magne, thérapeute à Malemort (19360).
Charte : --void #181628 · --deep #1e1a35 · --gold #d4a84b · --gold-lt #f0cc72 · font Cormorant/Jost

---

## BUG 1 — Menu déroulant fond blanc

### Problème
Le `.mega-drop` (menu "Prestations") s'affiche avec un fond blanc sur contact.html uniquement.
Cause : le script Calendly (`widget.js` chargé en async dans le body) injecte des styles CSS
globaux sur la page qui écrasent le `background: var(--deep)` défini dans style.css.
Ce bug n'existe que sur contact.html car c'est la seule page qui charge Calendly.

### Correction
Dans le bloc `<style>` en bas de contact.html (juste avant `</style>`), ajouter :

```css
/* Fix interférence Calendly — forcer background mega-drop */
nav .mega-drop {
  background-color: #1e1a35 !important;
}
nav .mega-item {
  background-color: #1e1a35 !important;
}
nav .mega-item:hover {
  background-color: #251f3e !important;
}
nav .mega-name {
  color: #f2ead8 !important;
}
nav .mega-desc {
  color: rgba(242,234,216,.5) !important;
}
```

---

## BUG 2 — Formulaire découverte sans animation

### Problème
L'ancien formulaire utilisait `type="button"` + `onclick="submitDecouverte()"` avec une div
de confirmation affichée en JS. La nouvelle version utilise `type="submit"` +
`action="https://formspree.io/f/mdabroaq" method="POST"`, ce qui provoque une soumission
HTTP classique qui redirige l'utilisateur vers la page de confirmation Formspree externe.
Résultat : aucune animation, l'utilisateur quitte le site MEDIOMA.

### Corrections à apporter

**Étape 1 — Modifier le `<form>`**
Retirer les attributs `action=` et `method=` du tag `<form>`.
Ajouter l'attribut `id="dec-form"` sur le `<form>`.

Avant :
```html
<form class="form-wrap rv" action="https://formspree.io/f/mdabroaq" method="POST" style="max-width:520px;margin:0 auto;">
```
Après :
```html
<form id="dec-form" class="form-wrap rv" style="max-width:520px;margin:0 auto;">
```

---

**Étape 2 — Modifier le bouton submit**
Changer `type="submit"` en `type="button"`, ajouter `id="dec-btn"` et `onclick="submitDecouverte()"`.

Avant :
```html
<button type="submit" class="form-submit" style="margin-top:1rem;">
  <span>✦ &nbsp; Demander mon appel découverte</span>
</button>
```
Après :
```html
<button type="button" id="dec-btn" class="form-submit" onclick="submitDecouverte()" style="margin-top:1rem;">
  <span>✦ &nbsp; Demander mon appel découverte</span>
</button>
```

---

**Étape 3 — Ajouter la div de confirmation**
Juste après le bouton (toujours dans le `<form>`), ajouter :

```html
<div id="dec-confirm" style="display:none;margin-top:1.5rem;padding:2rem 1.5rem;border:.5px solid rgba(212,168,75,.35);background:rgba(212,168,75,.05);text-align:center;">
  <p style="font-family:'Cormorant',serif;font-size:2rem;color:#d4a84b;margin-bottom:.6rem;">✦</p>
  <p style="font-family:'Cormorant',serif;font-size:1.4rem;font-weight:600;color:#f0cc72;margin-bottom:.7rem;">Demande bien reçue</p>
  <p style="font-size:.88rem;font-weight:300;color:rgba(242,234,216,.7);line-height:1.75;">Frédéric vous rappellera sous 24h pour votre appel découverte de 10 minutes, sans engagement.</p>
</div>
```

---

**Étape 4 — Ajouter la fonction JS**
Ajouter ce bloc `<script>` juste AVANT la ligne `<script src="animations.js" defer></script>` :

```html
<script>
async function submitDecouverte() {
  const form = document.getElementById('dec-form');
  const btn  = document.getElementById('dec-btn');
  const conf = document.getElementById('dec-confirm');
  const span = btn.querySelector('span');

  // Validation HTML5 native
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // État loading
  btn.disabled = true;
  span.textContent = '⟳  Envoi en cours…';
  btn.style.opacity = '.55';
  btn.style.cursor = 'wait';

  try {
    const res = await fetch('https://formspree.io/f/mdabroaq', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });

    if (res.ok) {
      // Succès — masquer le form, afficher la confirmation
      form.querySelectorAll('.form-group, .form-row').forEach(el => el.style.display = 'none');
      btn.style.display = 'none';
      conf.style.display = 'block';
      conf.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // Erreur serveur
      span.textContent = '✦  Réessayer';
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.disabled = false;
      alert('Une erreur est survenue. Merci de réessayer ou d\'écrire à contact@cabinetmedioma.com');
    }
  } catch (e) {
    // Erreur réseau
    span.textContent = '✦  Réessayer';
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
    btn.disabled = false;
    alert('Connexion impossible. Merci de réessayer ou d\'écrire directement à contact@cabinetmedioma.com');
  }
}
</script>
```

---

## Vérifications finales après corrections

- [ ] Le `.mega-drop` s'affiche bien en fond sombre (#1e1a35) même avec Calendly chargé
- [ ] Le formulaire découverte a bien `id="dec-form"` et plus d'attributs `action` / `method`
- [ ] Le bouton est bien `type="button"` avec `id="dec-btn"` et `onclick="submitDecouverte()"`
- [ ] La div `id="dec-confirm"` est bien présente et masquée par défaut (`display:none`)
- [ ] La fonction `submitDecouverte()` est bien déclarée avant `animations.js`
- [ ] Le `<input type="hidden" name="_subject">` peut rester (Formspree l'accepte en FormData)
- [ ] NE PAS toucher au widget Calendly, au footer, ni aux autres sections de la page
