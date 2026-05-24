# PROMPT CLAUDE CODE — contact.html (Calendly popup)

Dans le fichier `contact.html`, effectue les 3 modifications suivantes **sans toucher au reste du fichier** :

---

**Modification 1** — Ligne 85 : remplacer

```html
<a href="#calendly" class="btn" style="font-size:.78rem;padding:1em 2.5em;white-space:nowrap;"><span>✦ &nbsp; Choisir mon créneau</span></a>
```

par

```html
<a href="https://calendly.com/contact-cabinetmedioma" onclick="Calendly.initPopupWidget({url:'https://calendly.com/contact-cabinetmedioma?hide_gdpr_banner=1&background_color=1e1a35&text_color=f2ead8&primary_color=d4a84b&locale=fr'});return false;" class="btn" style="font-size:.78rem;padding:1em 2.5em;white-space:nowrap;"><span>✦ &nbsp; Choisir mon créneau</span></a>
```

---

**Modification 2** — Remplacer l'intégralité du bloc Calendly inline widget (de la div `style="border:.5px solid rgba(212,168,75,.25)..."` jusqu'à `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>` inclus) par :

```html
<div class="rv" style="border:.5px solid rgba(212,168,75,.25);border-radius:2px;box-shadow:0 20px 60px rgba(0,0,0,.4);text-align:center;overflow:hidden;">
  <div style="height:3px;background:linear-gradient(90deg,#181628,#7a5aaa,#d4a84b,#7a5aaa,#181628);"></div>
  <div style="padding:4rem 2rem;">
    <p style="font-size:.9rem;font-weight:300;color:var(--iv70);line-height:1.8;max-width:480px;margin:0 auto 2.5rem;">Cliquez ci-dessous pour choisir votre séance et votre créneau directement dans notre agenda en ligne.</p>
    <a href="https://calendly.com/contact-cabinetmedioma"
       onclick="Calendly.initPopupWidget({url:'https://calendly.com/contact-cabinetmedioma?hide_gdpr_banner=1&background_color=1e1a35&text_color=f2ead8&primary_color=d4a84b&locale=fr'});return false;"
       class="btn" style="font-size:.82rem;padding:1.1em 3em;">
      <span>✦ &nbsp; Choisir mon créneau</span>
    </a>
    <p style="margin-top:1.2rem;font-size:.78rem;color:var(--iv50);">Si le calendrier ne s'ouvre pas, <a href="https://calendly.com/contact-cabinetmedioma" target="_blank" rel="noopener" style="color:var(--gold-dim);">cliquez ici pour l'ouvrir dans un nouvel onglet</a>.</p>
  </div>
  <div style="height:3px;background:linear-gradient(90deg,#181628,#d4a84b,#7a5aaa,#d4a84b,#181628);"></div>
</div>
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"/>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

---

**Modification 3** — Remplacer :

```
30 min à 1h30 selon
```

par

```
20 min à 1h selon
```
