/* ═══════════════════════════════════════════════════
   MEDIOMA — Moteur d'Animation Premium v3.0
   Expert : Maxime (Netflix, Airbnb, Stripe)
   8 animations : particules, mandala, texte lettre
   par lettre, lumière cartes, chakras, aura, orbe,
   transition de page
═══════════════════════════════════════════════════ */

(function() {
'use strict';

const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/* Désactivation globale CSS quand l'utilisateur préfère moins de mouvement */
if (reduced) {
  const noMotionStyle = document.createElement('style');
  noMotionStyle.textContent =
    '*,*::before,*::after{' +
    'animation-duration:0.01ms!important;' +
    'animation-iteration-count:1!important;' +
    'transition-duration:0.01ms!important;' +
    'scroll-behavior:auto!important;}';
  document.head.appendChild(noMotionStyle);
}

const GOLD    = '212,168,75';   /* #d4a84b — source unique pour canvas */
const VIOLET  = '122,90,170';   /* #7a5aaa */

// ── 1. CURSEUR PREMIUM ──
function initCursor() {
  if (window.matchMedia('(pointer:coarse)').matches || window.innerWidth <= 900) return;

  // ── Point principal (suit la souris avec légère inertie) ──
  const dot = document.createElement('canvas');
  dot.id = 'cursor-star';
  dot.width = 20; dot.height = 20;
  Object.assign(dot.style, {
    position:'fixed', top:'0', left:'0', pointerEvents:'none',
    zIndex:'9999', transform:'translate(-50%,-50%)', willChange:'transform'
  });
  document.body.appendChild(dot);

  const ctx = dot.getContext('2d');
  function drawStar(alpha) {
    ctx.clearRect(0, 0, 20, 20);
    ctx.save();
    ctx.translate(10, 10);
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const r1 = 8, r2 = 2.4;
      ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
      ctx.lineTo(Math.cos(a + Math.PI / 4) * r2, Math.sin(a + Math.PI / 4) * r2);
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(${GOLD},${alpha})`;
    ctx.shadowColor = '#d4a84b';
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }
  drawStar(0.95);

  // ── Traînée : tableau de particules ──
  const TRAIL = 14;
  const trail = [];
  for (let i = 0; i < TRAIL; i++) {
    const p = document.createElement('div');
    Object.assign(p.style, {
      position:'fixed', borderRadius:'50%', pointerEvents:'none',
      zIndex:'9998', willChange:'transform,opacity', top:'0', left:'0'
    });
    document.body.appendChild(p);
    trail.push({ el: p, x: 0, y: 0 });
  }

  // ── CSS global ──
  const style = document.createElement('style');
  style.textContent = `
    body{cursor:none;}
    a,button,.scard,.cross-card,.mega-item,.hero-cta,.btn{cursor:none;}
    @keyframes starBurst{
      0%  {transform:translate(-50%,-50%) scale(1);opacity:.9;}
      60% {transform:translate(-50%,-50%) scale(2.2);opacity:.6;}
      100%{transform:translate(-50%,-50%) scale(.4);opacity:0;}
    }
  `;
  document.head.appendChild(style);

  let mx = 0, my = 0, cx = 0, cy = 0;
  let isHover = false;
  const history = Array(TRAIL).fill({ x: 0, y: 0 });
  let frame = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Éclat au clic
  document.addEventListener('click', e => {
    const burst = document.createElement('canvas');
    burst.width = 24; burst.height = 24;
    Object.assign(burst.style, {
      position:'fixed', top: e.clientY + 'px', left: e.clientX + 'px',
      pointerEvents:'none', zIndex:'10000',
      transform:'translate(-50%,-50%)',
      animation:'starBurst .55s ease-out forwards'
    });
    const bc = burst.getContext('2d');
    bc.translate(12, 12);
    bc.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      bc.lineTo(Math.cos(a) * 10, Math.sin(a) * 10);
      bc.lineTo(Math.cos(a + Math.PI / 4) * 3, Math.sin(a + Math.PI / 4) * 3);
    }
    bc.closePath();
    bc.fillStyle = isHover ? `rgba(${VIOLET},.95)` : `rgba(${GOLD},.95)`;
    bc.shadowColor = isHover ? '#7a5aaa' : '#d4a84b';
    bc.shadowBlur = 10;
    bc.fill();
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 600);
  });

  // Hover interactif
  document.querySelectorAll('a,button,.scard,.cross-card,.hero-cta,.btn').forEach(el => {
    el.addEventListener('mouseenter', () => { isHover = true; });
    el.addEventListener('mouseleave', () => { isHover = false; });
  });

  function animate() {
    // Inertie du point principal
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;

    // Étoile principale
    dot.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
    drawStar(isHover ? 0.5 : 0.95);
    // Changer couleur au hover
    if (isHover) {
      const hc = dot.getContext('2d');
      hc.clearRect(0, 0, 20, 20);
      hc.save(); hc.translate(10, 10);
      hc.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        hc.lineTo(Math.cos(a) * 8, Math.sin(a) * 8);
        hc.lineTo(Math.cos(a + Math.PI / 4) * 2.4, Math.sin(a + Math.PI / 4) * 2.4);
      }
      hc.closePath();
      hc.fillStyle = `rgba(${VIOLET},.9)`;
      hc.shadowColor = '#7a5aaa';
      hc.shadowBlur = 8;
      hc.fill(); hc.restore();
    }

    // Traînée
    history.push({ x: cx, y: cy });
    if (history.length > TRAIL) history.shift();

    trail.forEach((p, i) => {
      const pos = history[i] || { x: cx, y: cy };
      const ratio = i / TRAIL;
      const size = Math.max(1, 4 * ratio);
      const opacity = ratio * (isHover ? 0.55 : 0.4);
      const color = isHover
        ? `rgba(${VIOLET},${opacity})`
        : `rgba(${GOLD},${opacity})`;
      Object.assign(p.el.style, {
        width: size + 'px', height: size + 'px',
        background: color,
        transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%))`,
      });
    });

    frame++;
    requestAnimationFrame(animate);
  }
  animate();
}

// ── 1b. ÉTOILES FOND DE PAGE (toutes sections) ──
function initBgStars() {
  const cvs = document.createElement('canvas');
  cvs.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;mix-blend-mode:screen;';
  document.body.insertBefore(cvs, document.body.firstChild);
  const ctx = cvs.getContext('2d');
  let W, H, pts = [], t = 0;
  const N = reduced ? 80 : 220;

  const COLORS = [
    'rgba(242,234,216,',   // blanc ivoire
    'rgba(242,234,216,',
    `rgba(${GOLD},`,    // or (rare)
    'rgba(180,160,220,',   // lavande (rare)
  ];

  function resize() {
    W = cvs.width  = window.innerWidth;
    H = cvs.height = window.innerHeight;
  }

  function seed() {
    pts = Array.from({length: N}, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.4 + 0.2,
      spd:   Math.random() * 0.25 + 0.04,
      phase: Math.random() * Math.PI * 2,
      col:   COLORS[Math.random() < 0.08 ? (Math.random() < 0.5 ? 2 : 3) : (Math.random() < 0.5 ? 0 : 1)],
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.007;
    pts.forEach(s => {
      const a = 0.08 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.spd + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.col + a + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize(); seed(); draw();
  window.addEventListener('resize', () => { resize(); seed(); });
}

// ── 2. PARTICULES COSMIQUES INTERACTIVES ──
function initStars() {
  document.querySelectorAll('.stars-canvas').forEach(container => initStarsIn(container));
}

function initStarsIn(container) {
  if (!container) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  container.style.position = 'relative';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], mouse = {x:-999, y:-999};
  const COUNT = reduced ? 60 : 180;

  function resize() {
    W = canvas.width = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
  }

  function createStars() {
    stars = Array.from({length: COUNT}, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.2,
      ox: 0, oy: 0,
      depth: Math.random(),
      speed: Math.random() * 0.3 + 0.05,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.85
        ? `rgba(${GOLD},`
        : Math.random() > 0.5
          ? `rgba(${VIOLET},`
          : `rgba(242,234,216,`
    }));
  }

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, {passive:true});
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });


  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.008;
    stars.forEach(s => {
      // Scintillement
      const alpha = 0.2 + s.depth * 0.7 * (0.7 + 0.3 * Math.sin(t * s.speed + s.phase));
      // Parallaxe souris
      const dx = mouse.x - s.x;
      const dy = mouse.y - s.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const force = Math.max(0, 120 - dist) / 120;
      s.ox += (-dx / dist * force * 2 - s.ox) * 0.08;
      s.oy += (-dy / dist * force * 2 - s.oy) * 0.08;
      // Parallaxe scroll
      const py = scrollY * (1 - s.depth) * 0.15;
      const px = s.x + s.ox;
      const pyr = (s.y + s.oy - py) % H;
      // Dessin
      ctx.beginPath();
      ctx.arc(px, pyr < 0 ? pyr + H : pyr, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color + alpha + ')';
      ctx.fill();
      // Halo sur les grandes étoiles
      if (s.r > 1.2) {
        const grd = ctx.createRadialGradient(px, pyr < 0 ? pyr+H : pyr, 0, px, pyr < 0 ? pyr+H : pyr, s.r * 4);
        grd.addColorStop(0, s.color + alpha * 0.4 + ')');
        grd.addColorStop(1, s.color + '0)');
        ctx.beginPath();
        ctx.arc(px, pyr < 0 ? pyr+H : pyr, s.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }
    });
    requestAnimationFrame(draw);
  }

  try {
    resize();
    createStars();
    draw();
    window.addEventListener('resize', () => { resize(); createStars(); });
  } catch(e) {
    console.warn('MEDIOMA Stars: ', e);
  }
}

// ── 3. ORBE D'ÉNERGIE HERO ──
function initOrb() {
  const hero = document.getElementById('hero');
  if (!hero || reduced) return;
  const orb = document.createElement('div');
  orb.id = 'hero-orb';
  const style = document.createElement('style');
  style.textContent = `
    #hero-orb{
      position:absolute;top:50%;left:50%;
      width:420px;height:420px;
      transform:translate(-50%,-50%);
      pointer-events:none;z-index:0;
      border-radius:50%;
      background:radial-gradient(ellipse at center,
        rgba(${GOLD},.12) 0%,
        rgba(${VIOLET},.08) 40%,
        transparent 70%);
      animation:orbPulse 6s ease-in-out infinite;
      will-change:transform,opacity;
    }
    #hero-orb::before{
      content:"";position:absolute;inset:-30px;border-radius:50%;
      background:radial-gradient(ellipse at center,
        rgba(${VIOLET},.06) 0%,transparent 70%);
      animation:orbPulse 6s ease-in-out infinite reverse;
    }
    @keyframes orbPulse{
      0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.7;}
      50%{transform:translate(-50%,-50%) scale(1.15);opacity:1;}
    }
  `;
  document.head.appendChild(style);
  hero.style.position = 'relative';
  hero.insertBefore(orb, hero.firstChild);
}

// ── 4. TEXTE LETTRE PAR LETTRE — Slogan hero ──
function initTypewriter() {
  const el = document.querySelector('.hero-promise');
  if (!el || reduced) return;
  const text = el.textContent.trim();
  el.textContent = '';
  el.style.opacity = '1';
  el.style.animation = 'none';
  let i = 0;
  function type() {
    if (i < text.length) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.cssText = `opacity:0;animation:letterIn .4s ease forwards;animation-delay:${i*28}ms;display:inline;`;
      el.appendChild(span);
      i++;
      setTimeout(type, 28);
    }
  }
  const style = document.createElement('style');
  style.textContent = `@keyframes letterIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`;
  document.head.appendChild(style);
  // Déclencher avec délai pour ne pas bloquer le rendu initial
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(type, 800);
        io.disconnect();
      }
    }, {threshold: 0.3});
    io.observe(el);
  } else {
    setTimeout(type, 800);
  }
}

// ── 5. EFFET LUMIÈRE SUR LES CARTES ──
function initCardLight() {
  if (reduced || window.innerWidth <= 700) return;
  const style = document.createElement('style');
  style.textContent = `
    .scard,.cross-card,.tcard{position:relative;overflow:hidden;}
    /* .scard et .cross-card : lumière sur ::before (::after libre) */
    .scard::before,.cross-card::before{
      content:'';position:absolute;inset:0;
      background:radial-gradient(circle 200px at var(--mx,50%) var(--my,50%),
        rgba(${GOLD},.12),transparent 70%);
      opacity:0;transition:opacity .4s;pointer-events:none;z-index:1;
    }
    .scard:hover::before,.cross-card:hover::before{opacity:1;}
    /* .tcard : lumière sur ::after — ::before réservé à la guillemette CSS */
    .tcard::after{
      content:'';position:absolute;inset:0;
      background:radial-gradient(circle 200px at var(--mx,50%) var(--my,50%),
        rgba(${GOLD},.10),transparent 70%);
      opacity:0;transition:opacity .4s;pointer-events:none;z-index:1;
    }
    .tcard:hover::after{opacity:1;}
  `;
  document.head.appendChild(style);
  document.querySelectorAll('.scard,.cross-card,.tcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%';
      const y = ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%';
      card.style.setProperty('--mx', x);
      card.style.setProperty('--my', y);
    });
  });
}

// ── 6. CHAKRAS QUI S'ALLUMENT AU SCROLL ──
function initChakraGlow() {
  const rows = document.querySelectorAll('.chakra-row');
  if (!rows.length) return;
  const COLORS = ['#e53030','#e07020','#d4b020','#20a060','#2070c8','#5030a0','#8050c0'];
  const style = document.createElement('style');
  style.textContent = `
    .chakra-row{transition:background .6s ease,border-color .6s ease;}
    .chakra-row.lit{border-left:2px solid var(--chakra-color);}
    .chakra-row.lit img{filter:drop-shadow(0 0 18px var(--chakra-color)) drop-shadow(0 0 8px var(--chakra-color));transition:filter .6s ease;}
  `;
  document.head.appendChild(style);
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(rows).indexOf(entry.target);
        const color = COLORS[idx] || '#d4a84b';
        entry.target.style.setProperty('--chakra-color', color);
        entry.target.classList.add('lit');
        entry.target.style.background = `linear-gradient(to right, ${color}18, transparent)`;
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.3});
  rows.forEach(r => io.observe(r));
}

// ── 7. AURA AUTOUR DE LA PHOTO ──
function initAuraPhoto() {
  const wrap = document.querySelector('.about-img-wrap,.about-visual-wrap');
  if (!wrap || reduced) return;
  const style = document.createElement('style');
  style.textContent = `
    .about-img-wrap,.about-visual-wrap{
      position:relative;
    }
    .about-img-wrap::after,.about-visual-wrap::after{
      content:'';position:absolute;inset:-12px;border-radius:inherit;
      background:radial-gradient(ellipse at center,
        rgba(${GOLD},.15) 0%,
        rgba(${VIOLET},.1) 50%,
        transparent 70%);
      animation:auraPulse 4s ease-in-out infinite;
      pointer-events:none;z-index:-1;
    }
    @keyframes auraPulse{
      0%,100%{opacity:.6;transform:scale(1);}
      50%{opacity:1;transform:scale(1.04);}
    }
  `;
  document.head.appendChild(style);
}

// ── 8. MANDALA ROTATIF — Page chakras ──
function initMandala() {
  const section = document.querySelector('.chakra-row')?.closest('section') ||
                  document.querySelector('.section-void');
  if (!section || !document.querySelector('.chakra-row') || reduced) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 400 400');
  svg.style.cssText = `
    position:absolute;top:50%;left:50%;
    width:min(80vw,600px);height:min(80vw,600px);
    transform:translate(-50%,-50%) rotate(0deg);
    pointer-events:none;opacity:.04;z-index:0;
    will-change:transform;
  `;
  // Dessiner le mandala géométrique
  const cx=200,cy=200;
  let paths = '';
  for(let ring=1;ring<=6;ring++){
    const r = ring*28;
    const petals = ring*6;
    paths += `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="#d4a84b" stroke-width=".8" fill="none"/>`;
    for(let p=0;p<petals;p++){
      const a = (p/petals)*Math.PI*2;
      const x1=cx+r*Math.cos(a), y1=cy+r*Math.sin(a);
      const a2=a+Math.PI*2/petals;
      const x2=cx+r*Math.cos(a2),y2=cy+r*Math.sin(a2);
      paths += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#d4a84b" stroke-width=".5"/>`;
    }
  }
  paths += `<circle cx="${cx}" cy="${cy}" r="8" fill="rgba(${GOLD},.8)"/>`;
  svg.innerHTML = paths;
  section.style.position = 'relative';
  section.style.overflow = 'hidden';
  section.insertBefore(svg, section.firstChild);

  let angle = 0;
  function rotate() {
    angle += 0.12;
    svg.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;
    requestAnimationFrame(rotate);
  }
  rotate();
}

// ── 9. TRANSITION DE PAGE FLUIDE ──
function initPageTransition() {
  if (reduced) return;
  const overlay = document.createElement('div');
  overlay.id = 'page-transition';
  const style = document.createElement('style');
  style.textContent = `
    #page-transition{
      position:fixed;inset:0;z-index:99999;
      background:linear-gradient(135deg,#181628,rgba(${VIOLET},.95));
      pointer-events:none;
      opacity:0;transition:opacity .35s ease;
    }
    #page-transition.out{opacity:1;pointer-events:all;}
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);

  // Entrée sur la page — double RAF pour garantir rendu
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.remove('out');
    });
  });

  // Sortie sur clic de lien interne
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('tel') ||
        href.startsWith('//') || link.target === '_blank') return;
    // Ne pas intercepter si même page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (href === currentPage) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.add('out');
      setTimeout(() => { window.location = href; }, 350);
    });
  });
}

// ── 10. REVEAL STAGGER ──
function initReveal() {
  if (reduced) {
    document.querySelectorAll('.rv').forEach(el => el.classList.add('on'));
    return;
  }
  document.querySelectorAll('.services-grid,.counters-inner,.cross-grid,.footer-inner').forEach(grid => {
    Array.from(grid.children).forEach((child,i) => {
      child.style.transitionDelay = (i * 0.08) + 's';
    });
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('on');
    });
  }, {threshold:0.08, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
}

// ── 11. COMPTEURS AVEC EASING + PULSE ──
function initCounters() {
  function easeOutQuart(t){return 1-Math.pow(1-t,4);}
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    if (isNaN(target)) return;                  /* cellule sans data-target (ex: cert) — on n'anime pas */
    const suffix = target === 100 ? '%' : '+';
    const duration = 2200;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed/duration,1);
      const eased = easeOutQuart(progress);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Pulse final
        el.style.animation = 'counterPulse .4s ease';
        setTimeout(()=>el.style.animation='',400);
      }
    }
    requestAnimationFrame(update);
  }
  const style = document.createElement('style');
  style.textContent = `@keyframes counterPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}`;
  document.head.appendChild(style);
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.counter-num').forEach(animateCounter);
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.3});
  document.querySelectorAll('.counters').forEach(el => io.observe(el));
}

// ── 12. PARALLAXE HERO ──
function initParallax() {
  if (reduced) return;
  const hero = document.getElementById('hero');
  if (!hero) return;
  const cosmic = hero.querySelector('.hero-cosmic');
  const content = hero.querySelector('.hero-content');
  const scrollLine = hero.querySelector('.hero-scroll');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        if (sy > hero.offsetHeight) { ticking=false; return; }
        if (cosmic) cosmic.style.transform = `translateY(${sy*.25}px)`;
        if (content) content.style.transform = `translateY(${sy*.08}px)`;
        if (scrollLine) scrollLine.style.opacity = Math.max(0, 1-sy/200);
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
}

// ── 13. NAV INTELLIGENTE ──
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let lastScroll=0, hidden=false;
  nav.style.transition='background var(--dur) var(--ease),padding var(--dur) var(--ease),transform .4s cubic-bezier(.4,0,.2,1)';
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    nav.classList.toggle('scrolled', sy > 60);
    if (sy > 200) {
      if (sy > lastScroll+10 && !hidden) { nav.style.transform='translateY(-100%)'; hidden=true; }
      else if (sy < lastScroll-5 && hidden) { nav.style.transform='translateY(0)'; hidden=false; }
    } else { nav.style.transform='translateY(0)'; hidden=false; }
    lastScroll = sy;
  }, {passive:true});
}

// ── 14. HAMBURGER + MEGA-DROP ──
function initHamburger() {
  const hbg = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-nav');
  if (!hbg || !mob) return;
  const links = mob.querySelectorAll('a');
  links.forEach(a => { a.style.opacity='0'; a.style.transform='translateY(20px)'; a.style.transition='opacity .4s ease,transform .4s ease'; });
  function openMenu() {
    hbg.classList.add('open'); mob.classList.add('open');
    hbg.setAttribute('aria-expanded','true');
    document.body.style.overflow='hidden';
    links.forEach((a,i) => setTimeout(()=>{ a.style.opacity='1'; a.style.transform='translateY(0)'; },100+i*60));
  }
  function closeMenu() {
    hbg.classList.remove('open');
    links.forEach(a=>{ a.style.opacity='0'; a.style.transform='translateY(10px)'; });
    setTimeout(()=>{ mob.classList.remove('open'); document.body.style.overflow=''; },200);
    hbg.setAttribute('aria-expanded','false');
  }
  hbg.addEventListener('click',()=>hbg.classList.contains('open')?closeMenu():openMenu());
  mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&hbg.classList.contains('open')) closeMenu(); });
}

// ── 15. MEGA-DROP TOUCH, KEYBOARD & ARIA (fusionné v3.2) ──
function initMegaDrop() {
  const triggers = document.querySelectorAll('.has-drop');

  function closeAll(except) {
    triggers.forEach(t => {
      if (t === except) return;
      t.parentElement.classList.remove('open');
      t.setAttribute('aria-expanded', 'false');
    });
  }

  triggers.forEach(trigger => {
    const li = trigger.parentElement;
    const drop = trigger.nextElementSibling;

    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    // Touch / clic mobile
    trigger.addEventListener('click', e => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const open = li.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
        closeAll(trigger);
      }
    });

    // Clavier sur le trigger
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const open = li.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
        closeAll(trigger);
      }
      if (e.key === 'Escape') {
        li.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });

    // Navigation flèches dans le dropdown
    if (drop) {
      const items = drop.querySelectorAll('a');
      items.forEach((item, i) => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', e => {
          if (e.key === 'Escape') {
            li.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.focus();
          }
          if (e.key === 'ArrowDown') { e.preventDefault(); items[Math.min(i+1, items.length-1)].focus(); }
          if (e.key === 'ArrowUp')   { e.preventDefault(); i > 0 ? items[i-1].focus() : trigger.focus(); }
        });
      });
    }
  });

  // Clic extérieur — ferme tout
  document.addEventListener('click', e => {
    if (!e.target.closest('.has-drop')) closeAll();
  });
}

// ── 16. BOUTONS MAGNÉTIQUES ──
function initMagneticButtons() {
  if (reduced || window.innerWidth <= 900) return;
  document.querySelectorAll('.hero-cta,.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX-r.left-r.width/2;
      const y = e.clientY-r.top-r.height/2;
      btn.style.transform = `translate(${x*.25}px,${y*.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform='';
      btn.style.transition='transform .5s cubic-bezier(.4,0,.2,1)';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition='transform .1s ease';
    });
  });
}

// ── 17. BACK TO TOP ──
function initBackTop() {
  const btt = document.getElementById('btt');
  if (!btt) return;
  window.addEventListener('scroll',()=>btt.classList.toggle('show',window.scrollY>400),{passive:true});
  btt.addEventListener('click',e=>{ e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });
}

// ── 18. SMOOTH SCROLL ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });
}

// ── 19. LIVRE D'OR ──
function initLivreOr() {
  const btn = document.getElementById('submit-review');
  if (!btn) return;
  btn.addEventListener('click', function() {
    const name = document.getElementById('review-name')?.value.trim();
    const text = document.getElementById('review-text')?.value.trim();
    if (!name || !text) { alert('Merci de remplir votre prénom et votre témoignage.'); return; }
    const confirm = document.getElementById('review-confirm');
    if (confirm) confirm.style.display='block';
    if (document.getElementById('review-name')) document.getElementById('review-name').value='';
    if (document.getElementById('review-text')) document.getElementById('review-text').value='';
  });
}

// ── 20. TWINKLE CSS DYNAMIQUE ──
function initTwinkle() {
  if (reduced) return;
  const style = document.createElement('style');
  style.textContent = `
    .star{animation:twinkle-v2 linear infinite;will-change:opacity,transform;}
    @keyframes twinkle-v2{0%{opacity:.05;transform:scale(1)}30%{opacity:.8;transform:scale(1.3)}60%{opacity:.2;transform:scale(.9)}100%{opacity:.05;transform:scale(1)}}
    .rv{transition:opacity 1s cubic-bezier(.4,0,.2,1),transform 1s cubic-bezier(.4,0,.2,1);}
    .scard,.cross-card,.chakra-row{will-change:transform,background;}
  `;
  document.head.appendChild(style);
}

// ══ INIT GLOBAL ══
function init() {
  initBgStars();
  // Protection globale contre les erreurs
  window.addEventListener('error', e => console.warn('MEDIOMA anim:', e.message));
  initTwinkle();
  initOrb();
  initStars();
  initReveal();
  initCounters();
  initParallax();
  initNav();
  initHamburger();
  initMegaDrop();
  initBackTop();
  initSmoothScroll();
  initChakraGlow();
  initMandala();
  initAuraPhoto();
  initCardLight();
  initPageTransition();
  if (!reduced) initTypewriter();
  if (window.innerWidth > 900) {
    initCursor();
    initMagneticButtons();
  }
  initLivreOr();
  initScrollProgress();
  console.log('🌟 MEDIOMA Animations v3.2 — 21 fonctions');
}

// ── 21. BARRE DE PROGRESSION SCROLL ──
function initScrollProgress() {
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position:'fixed', top:'0', left:'0', height:'2px', width:'0%',
    background:'linear-gradient(90deg,#7a5aaa,#d4a84b)',
    zIndex:'9999', transition:'width .1s linear', pointerEvents:'none'
  });
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}

if (document.readyState==='loading') {
  document.addEventListener('DOMContentLoaded', init);
} else { init(); }

})();
