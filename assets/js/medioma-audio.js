(function(){
  const PAGES_PRESENCE=[
    'magnetisme','chakras','nettoyage',
    'mediation','prestations','contact','rendez-vous'
  ];
  const BAR_H=[5,13,18,7,17,5,20,10,18,6,15,8,19,11,16];
  const PLAY_PTS ='5,3 19,12 5,21';
  const PAUSE_PTS='4,3 10,3 10,21 4,21 M14,3 20,3 20,21 14,21';

  const page   = window.location.pathname.toLowerCase();
  const isPres = PAGES_PRESENCE.some(p=>page.includes(p));
  const track  = isPres?'presence':'seuil';
  const isMobile = window.innerWidth<=768;

  /* ════════════════════════════════════
     MODE DESKTOP — Popup
  ════════════════════════════════════ */
  if(!isMobile){
    const btn=document.createElement('div');
    btn.id='mp-trigger';
    btn.setAttribute('role','button');
    btn.setAttribute('tabindex','0');
    btn.setAttribute('aria-label',"Ouvrir l'ambiance musicale MEDIOMA");
    btn.innerHTML='<img src="assets/img/medioma-mandala.png" alt=""><span class="mp-label">♪ Ambiance</span>';
    document.body.appendChild(btn);

    const blocked=document.createElement('div');
    blocked.id='mp-blocked';
    blocked.textContent="Autorisez les popups pour activer l'ambiance sonore MEDIOMA";
    document.body.appendChild(blocked);

    let popup=null;
    const W=300, H=120;

    function openPopup(){
      const left=window.screen.width-W-20;
      const top=window.screen.height-H-80;
      popup=window.open(
        'medioma-player.html','medioma_audio',
        `width=${W},height=${H},left=${left},top=${top},`+
        `resizable=no,scrollbars=no,toolbar=no,`+
        `menubar=no,location=no,status=no`
      );
      if(!popup||popup.closed){
        blocked.style.display='block';
        setTimeout(()=>blocked.style.display='none',4000);
      }
    }

    function notifyTrack(){
      const ch=new BroadcastChannel('medioma_track');
      ch.postMessage({track});
      ch.close();
    }

    btn.addEventListener('click',()=>{
      if(!popup||popup.closed) openPopup();
      else popup.focus();
      notifyTrack();
    });
    btn.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();btn.click();}
    });
    window.addEventListener('load',()=>{
      if(popup&&!popup.closed) notifyTrack();
    });

    /* Auto-open : ouvre le popup au premier clic n'importe où sur la page
       (contourne le blocage navigateur des popups sans interaction) */
    let autoOpened=false;
    function tryAutoOpen(e){
      if(autoOpened) return;
      /* Ne pas déclencher si c'est un clic sur le bouton lui-même
         (son propre listener s'en charge déjà) */
      if(e&&e.target&&btn.contains(e.target)) return;
      autoOpened=true;
      document.removeEventListener('click',tryAutoOpen);
      if(!popup||popup.closed){ openPopup(); notifyTrack(); }
    }
    document.addEventListener('click',tryAutoOpen);
  }

  /* ════════════════════════════════════
     MODE MOBILE — Player fixe intégré
  ════════════════════════════════════ */
  if(isMobile){
    const label=isPres?'Soins & Énergies':'Bienvenue';
    const srcPath=isPres
      ?'assets/audio/medioma-presence.mp3'
      :'assets/audio/medioma-seuil.mp3';

    const player=document.createElement('div');
    player.id='mp-mobile';
    player.setAttribute('role','button');
    player.setAttribute('tabindex','0');
    player.setAttribute('aria-label',"Activer l'ambiance musicale MEDIOMA");
    player.setAttribute('aria-pressed','false');
    player.innerHTML=`
      <div class="mpm-tname">
        <span class="mpm-dot"></span>
        <span class="mpm-tname-txt">${label}</span>
      </div>
      <div class="mpm-viz" id="mpm-viz"></div>
      <div class="mpm-ctrl">
        <div class="mpm-pbtn" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#d4a84b">
            <polygon id="mpm-poly" points="${PLAY_PTS}"/>
          </svg>
        </div>
        <div class="mpm-prog">
          <div class="mpm-pfill" id="mpm-pfill"></div>
        </div>
      </div>
      <audio id="mpm-audio" loop preload="none">
        <source src="${srcPath}" type="audio/mpeg">
      </audio>
    `;
    document.body.appendChild(player);

    const viz=document.getElementById('mpm-viz');
    BAR_H.forEach((h,i)=>{
      const b=document.createElement('div');
      b.className='mpm-b'; b.style.height=h+'px';
      b.style.animationDelay=(i*0.088)+'s';
      viz.appendChild(b);
    });

    const audio=document.getElementById('mpm-audio');
    const poly=document.getElementById('mpm-poly');
    const pfill=document.getElementById('mpm-pfill');
    let playing=false, prog=0, tmr=null;

    function fade(from,to,ms,cb){
      const steps=25,dt=ms/steps,delta=(to-from)/steps;
      let cur=from;
      const t=setInterval(()=>{
        cur+=delta; audio.volume=Math.min(1,Math.max(0,cur));
        if((delta>0&&cur>=to)||(delta<0&&cur<=to)){clearInterval(t);if(cb)cb();}
      },dt);
    }

    function startPlay(restore){
      audio.volume=0;
      audio.play().then(()=>{
        fade(0,0.27,restore?400:2000);
        player.classList.add('playing');
        player.setAttribute('aria-pressed','true');
        poly.setAttribute('points',PAUSE_PTS);
        playing=true;
        localStorage.setItem('medioma_audio','on');
        tmr=setInterval(()=>{
          prog=(prog+0.22)%100;
          pfill.style.width=prog.toFixed(1)+'%';
        },100);
      }).catch(()=>{});
    }

    function stopPlay(){
      fade(audio.volume,0,900,()=>audio.pause());
      player.classList.remove('playing');
      player.setAttribute('aria-pressed','false');
      poly.setAttribute('points',PLAY_PTS);
      playing=false;
      localStorage.setItem('medioma_audio','off');
      clearInterval(tmr); prog=0;
      pfill.style.width='0%';
    }

    function toggle(){ playing?stopPlay():startPlay(false); }

    player.addEventListener('click',toggle);
    player.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}
    });

    if(localStorage.getItem('medioma_audio')==='on') startPlay(true);
  }

})();
