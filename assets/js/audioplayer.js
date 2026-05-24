(function () {
  const PAGES_PRESENCE = [
    'magnetisme', 'chakras', 'nettoyage',
    'mediation', 'prestations', 'contact', 'rendez-vous'
  ];
  const BAR_HEIGHTS = [5,14,20,8,18,6,22,11,19,7,16,9,21,12,17];

  let page    = window.location.pathname.toLowerCase();
  let isPres  = PAGES_PRESENCE.some(p => page.includes(p));
  let src     = isPres
    ? 'assets/audio/medioma-presence.mp3'
    : 'assets/audio/medioma-seuil.mp3';
  let label   = isPres ? 'PRÉSENCE' : 'SEUIL';

  const player = document.createElement('div');
  player.id = 'medioma-player';
  player.setAttribute('role', 'button');
  player.setAttribute('tabindex', '0');
  player.setAttribute('aria-label', "Activer l'ambiance musicale MEDIOMA");
  player.setAttribute('aria-pressed', 'false');
  player.innerHTML = `
    <div class="mp-tname">
      <span class="mp-dot"></span>
      <span class="mp-tname-txt">${label}</span>
    </div>
    <div class="mp-viz" id="mp-viz-bars"></div>
    <div class="mp-ctrl">
      <div class="mp-pbtn" aria-hidden="true">
        <svg id="mp-svg" width="11" height="11" viewBox="0 0 24 24"
             fill="#d4a84b" xmlns="http://www.w3.org/2000/svg">
          <polygon id="mp-icon" points="5,3 19,12 5,21"/>
        </svg>
      </div>
      <div class="mp-prog">
        <div class="mp-pfill" id="mp-pfill"></div>
      </div>
    </div>
    <div class="mp-sublabel">Ambiance MEDIOMA ♪</div>
    <audio id="mp-audio" loop preload="none">
      <source id="mp-source" src="${src}" type="audio/mpeg">
    </audio>
  `;
  document.body.appendChild(player);

  const vizEl = document.getElementById('mp-viz-bars');
  BAR_HEIGHTS.forEach((h, i) => {
    const b = document.createElement('div');
    b.className = 'mp-b';
    b.style.height = h + 'px';
    b.style.animationDelay = (i * 0.088) + 's';
    vizEl.appendChild(b);
  });

  const audio  = document.getElementById('mp-audio');
  const pfill  = document.getElementById('mp-pfill');
  const icon   = document.getElementById('mp-icon');
  const PLAY   = '5,3 19,12 5,21';
  const PAUSE  = '4,3 9,3 9,21 4,21 M15,3 20,3 20,21 15,21';
  let playing  = false;
  let prog     = 0;
  let tmr      = null;

  function fadeVolume(from, to, ms, cb) {
    const steps = 25;
    const dt    = ms / steps;
    const delta = (to - from) / steps;
    let cur = from;
    const t = setInterval(() => {
      cur += delta;
      audio.volume = Math.min(1, Math.max(0, cur));
      if ((delta > 0 && cur >= to) || (delta < 0 && cur <= to)) {
        clearInterval(t);
        if (cb) cb();
      }
    }, dt);
  }

  function startPlay() {
    audio.volume = 0;
    audio.play().then(() => {
      fadeVolume(0, 0.27, 2000);
      player.classList.add('playing');
      player.setAttribute('aria-pressed', 'true');
      icon.setAttribute('points', PAUSE);
      playing = true;
      localStorage.setItem('medioma_audio', 'on');
      tmr = setInterval(() => {
        prog = (prog + 0.22) % 100;
        pfill.style.width = prog.toFixed(1) + '%';
      }, 100);
    }).catch(() => {});
  }

  function stopPlay() {
    fadeVolume(audio.volume, 0, 900, () => audio.pause());
    player.classList.remove('playing');
    player.setAttribute('aria-pressed', 'false');
    icon.setAttribute('points', PLAY);
    playing = false;
    localStorage.setItem('medioma_audio', 'off');
    clearInterval(tmr);
  }

  function toggle() { playing ? stopPlay() : startPlay(); }

  player.addEventListener('click', toggle);
  player.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });

  if (localStorage.getItem('medioma_audio') === 'on') startPlay();

  // ── PJAX — navigation sans rechargement ──────────────────────────────────
  window.MEDIOMA_NAV = function(href) {
    // 1. Déterminer la nouvelle piste
    const newIsPres = PAGES_PRESENCE.some(p => href.toLowerCase().includes(p));
    const newSrc    = newIsPres
      ? 'assets/audio/medioma-presence.mp3'
      : 'assets/audio/medioma-seuil.mp3';

    // 2. Fetch de la nouvelle page
    fetch(href)
      .then(r => r.text())
      .then(html => {
        const parser  = new DOMParser();
        const newDoc  = parser.parseFromString(html, 'text/html');

        // 3. Sauvegarder les éléments persistants (audio player, curseur, progress bar)
        const saved = [];
        const selectors = ['#medioma-player', '#cursor-star', '#medioma-scrollbar', '#page-transition'];
        selectors.forEach(sel => {
          const el = document.querySelector(sel);
          if (el) { el.remove(); saved.push(el); }
        });
        document.querySelectorAll('.medioma-trail').forEach(el => {
          el.remove(); saved.push(el);
        });

        // 4. Swapper le contenu body
        document.body.innerHTML = newDoc.body.innerHTML;

        // 5. Restaurer les éléments persistants
        saved.forEach(el => document.body.appendChild(el));

        // Fade-in de l'overlay de transition (sinon écran noir bloquant)
        const overlay = document.getElementById('page-transition');
        if (overlay) {
          overlay.classList.remove('out');
        }

        // 6. Mettre à jour titre + URL
        document.title = newDoc.title;
        history.pushState({}, document.title, href);

        // 7. Scroll haut de page
        window.scrollTo(0, 0);

        // 8. Changer de piste si nécessaire
        if (newSrc !== src) {
          src    = newSrc;
          isPres = newIsPres;
          const labelTxt = document.querySelector('.mp-tname-txt');
          if (labelTxt) labelTxt.textContent = newIsPres ? 'PRÉSENCE' : 'SEUIL';
          if (playing) {
            fadeVolume(audio.volume, 0, 600, () => {
              document.getElementById('mp-source').src = newSrc;
              audio.load();
              audio.play().then(() => fadeVolume(0, 0.27, 1200)).catch(() => {});
            });
          } else {
            document.getElementById('mp-source').src = newSrc;
            audio.load();
          }
        }

        // 9. Ré-initialiser les animations page-spécifiques
        if (typeof window.MEDIOMA_REINIT === 'function') window.MEDIOMA_REINIT();
      })
      .catch(() => { window.location = href; }); // fallback navigation classique
  };

  // Gestion bouton précédent/suivant du navigateur
  window.addEventListener('popstate', function() {
    window.MEDIOMA_NAV(window.location.pathname.split('/').pop() || 'index.html');
  });

})();
