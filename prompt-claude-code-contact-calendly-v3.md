# PROMPT CLAUDE CODE — contact.html (Calendly liens directs)

Dans `contact.html`, effectuer 3 modifications :

---

**1.** Sur chaque bouton "Réserver" des 5 cartes Calendly, supprimer l'attribut `onclick="..."` et ajouter `target="_blank" rel="noopener"`.

Exemple — remplacer :
```html
onclick="Calendly.initPopupWidget({url:'...'});return false;"
```
par :
```html
target="_blank" rel="noopener"
```
Faire cette substitution sur les 5 boutons.

---

**2.** Supprimer les deux lignes suivantes (devenues inutiles) :
```html
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"/>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

---

**3.** Dans le hero, sur le premier bouton "Choisir mon créneau", remplacer :
```html
href="https://calendly.com/contact-cabinetmedioma" onclick="Calendly.initPopupWidget({url:'https://calendly.com/contact-cabinetmedioma?hide_gdpr_banner=1&background_color=1e1a35&text_color=f2ead8&primary_color=d4a84b&locale=fr'});return false;"
```
par :
```html
href="https://calendly.com/contact-cabinetmedioma" target="_blank" rel="noopener"
```
