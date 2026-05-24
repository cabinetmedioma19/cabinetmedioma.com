(function () {
  const PAGES_PRESENCE = [
    'magnetisme', 'chakras', 'nettoyage',
    'mediation', 'prestations', 'contact', 'rendez-vous'
  ];
  const BAR_HEIGHTS = [5,14,20,8,18,6,22,11,19,7,16,9,21,12,17];

  const page    = window.location.pathname.toLowerCase();
  const isPres  = PAGES_PRESENCE.some(p => page.includes(p));
  const src     = isPres
    ? 'assets/audio/medioma-presence.mp3'
    : 'assets/audio/medioma-seuil.mp3';
  const label   = isPres ? 'PRÉSENCE' : 'SEUIL';

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
      <source src="${src}" type="audio/mpeg">
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
})();
