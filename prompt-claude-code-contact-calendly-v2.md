# PROMPT CLAUDE CODE — contact.html (5 cartes Calendly)

Dans le fichier `contact.html`, remplacer l'intégralité du bloc compris entre les commentaires `<!-- Calendly inline widget -->` et `<!-- Fin Calendly -->` (inclus) par le code suivant :

```html
<!-- 5 cartes Calendly -->
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:rgba(212,168,75,.15);border:.5px solid rgba(212,168,75,.25);border-radius:2px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.4);" class="rv">

  <!-- Consultation découverte -->
  <div style="background:var(--void);padding:2.5rem 2rem;display:flex;flex-direction:column;gap:1rem;">
    <p style="font-size:.72rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-lt);">Gratuit</p>
    <p style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--ivory);line-height:1.3;">Consultation découverte</p>
    <p style="font-size:.85rem;font-weight:300;color:var(--iv50);">20 min · Premier contact sans engagement</p>
    <a href="https://calendly.com/contact-cabinetmedioma/consultation-decouverte"
       onclick="Calendly.initPopupWidget({url:'https://calendly.com/contact-cabinetmedioma/consultation-decouverte?hide_gdpr_banner=1&background_color=1e1a35&text_color=f2ead8&primary_color=d4a84b&locale=fr'});return false;"
       class="btn" style="font-size:.76rem;padding:.9em 1.8em;margin-top:auto;align-self:flex-start;">
      <span>✦ &nbsp; Réserver</span>
    </a>
  </div>

  <!-- Médiation intérieure -->
  <div style="background:var(--void);padding:2.5rem 2rem;display:flex;flex-direction:column;gap:1rem;">
    <p style="font-size:.72rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-lt);">20 €</p>
    <p style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--ivory);line-height:1.3;">Médiation intérieure</p>
    <p style="font-size:.85rem;font-weight:300;color:var(--iv50);">60 min · Accompagnement émotionnel</p>
    <a href="https://calendly.com/contact-cabinetmedioma/mediation-interieure"
       onclick="Calendly.initPopupWidget({url:'https://calendly.com/contact-cabinetmedioma/mediation-interieure?hide_gdpr_banner=1&background_color=1e1a35&text_color=f2ead8&primary_color=d4a84b&locale=fr'});return false;"
       class="btn" style="font-size:.76rem;padding:.9em 1.8em;margin-top:auto;align-self:flex-start;">
      <span>✦ &nbsp; Réserver</span>
    </a>
  </div>

  <!-- Alignement des chakras -->
  <div style="background:var(--void);padding:2.5rem 2rem;display:flex;flex-direction:column;gap:1rem;">
    <p style="font-size:.72rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-lt);">30 €</p>
    <p style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--ivory);line-height:1.3;">Alignement des chakras</p>
    <p style="font-size:.85rem;font-weight:300;color:var(--iv50);">45 min · Rééquilibrage des centres d'énergie</p>
    <a href="https://calendly.com/contact-cabinetmedioma/alignement-des-chakras"
       onclick="Calendly.initPopupWidget({url:'https://calendly.com/contact-cabinetmedioma/alignement-des-chakras?hide_gdpr_banner=1&background_color=1e1a35&text_color=f2ead8&primary_color=d4a84b&locale=fr'});return false;"
       class="btn" style="font-size:.76rem;padding:.9em 1.8em;margin-top:auto;align-self:flex-start;">
      <span>✦ &nbsp; Réserver</span>
    </a>
  </div>

  <!-- Magnétisme -->
  <div style="background:var(--void);padding:2.5rem 2rem;display:flex;flex-direction:column;gap:1rem;">
    <p style="font-size:.72rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-lt);">50 €</p>
    <p style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--ivory);line-height:1.3;">Séance individuelle Magnétisme</p>
    <p style="font-size:.85rem;font-weight:300;color:var(--iv50);">60 min · Soins énergétiques & soulagement</p>
    <a href="https://calendly.com/contact-cabinetmedioma/seance-individuelle-magnetisme-soins-energetiques"
       onclick="Calendly.initPopupWidget({url:'https://calendly.com/contact-cabinetmedioma/seance-individuelle-magnetisme-soins-energetiques?hide_gdpr_banner=1&background_color=1e1a35&text_color=f2ead8&primary_color=d4a84b&locale=fr'});return false;"
       class="btn" style="font-size:.76rem;padding:.9em 1.8em;margin-top:auto;align-self:flex-start;">
      <span>✦ &nbsp; Réserver</span>
    </a>
  </div>

  <!-- Voyance — pleine largeur -->
  <div style="background:var(--void);padding:2.5rem 2rem;display:flex;flex-direction:column;gap:1rem;grid-column:1/-1;">
    <p style="font-size:.72rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-lt);">70 €</p>
    <p style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--ivory);line-height:1.3;">Séance de voyance</p>
    <p style="font-size:.85rem;font-weight:300;color:var(--iv50);">60 min · Guidance spirituelle & médiumnité</p>
    <a href="https://calendly.com/contact-cabinetmedioma/seance-de-voyance"
       onclick="Calendly.initPopupWidget({url:'https://calendly.com/contact-cabinetmedioma/seance-de-voyance?hide_gdpr_banner=1&background_color=1e1a35&text_color=f2ead8&primary_color=d4a84b&locale=fr'});return false;"
       class="btn" style="font-size:.76rem;padding:.9em 1.8em;margin-top:.5rem;align-self:flex-start;">
      <span>✦ &nbsp; Réserver</span>
    </a>
  </div>

</div>
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"/>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
<!-- Fin Calendly -->
```

Ajouter également dans le `<style>` en bas de page (avant `</style>`) :

```css
@media(max-width:640px){
  .calendly-cards{grid-template-columns:1fr !important;}
}
```

Et ajouter `class="calendly-cards"` à la div grille principale (celle avec `display:grid`).
