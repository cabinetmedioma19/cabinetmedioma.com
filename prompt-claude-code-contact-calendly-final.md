# PROMPT CLAUDE CODE — contact.html (widget Calendly inline — version finale)

Dans `contact.html`, effectuer 3 modifications :

---

**1.** Remplacer l'intégralité du bloc des 5 cartes Calendly (de la div `class="calendly-cards"` ou `style="display:grid..."` jusqu'aux balises `<link widget.css>` et `<script widget.js>` incluses) par :

```html
<!-- Calendly inline widget -->
<div class="rv" style="border:.5px solid rgba(212,168,75,.25);overflow:hidden;border-radius:2px;box-shadow:0 20px 60px rgba(0,0,0,.4);">
  <div style="height:3px;background:linear-gradient(90deg,#181628,#7a5aaa,#d4a84b,#7a5aaa,#181628);"></div>
  <div
    class="calendly-inline-widget"
    data-url="https://calendly.com/contact-cabinetmedioma?hide_gdpr_banner=1&background_color=1e1a35&text_color=f2ead8&primary_color=d4a84b&locale=fr"
    style="min-width:320px;height:700px;">
  </div>
  <div style="height:3px;background:linear-gradient(90deg,#181628,#d4a84b,#7a5aaa,#d4a84b,#181628);"></div>
</div>
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"/>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
<!-- Fin Calendly -->
```

---

**2.** Dans le hero, s'assurer que le premier bouton est :

```html
<a href="#calendly" class="btn" style="font-size:.78rem;padding:1em 2.5em;white-space:nowrap;"><span>✦ &nbsp; Choisir mon créneau</span></a>
```

---

**3.** Dans les infos pratiques sous le widget, vérifier que le texte est :

```
20 min à 1h selon
```
