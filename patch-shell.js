const fs   = require('fs');
const path = require('path');
const ROOT = __dirname;

const files = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html') && f !== 'shell.html');

let modified = 0;

files.forEach(file => {
  const fp  = path.join(ROOT, file);
  let html  = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // 1. Ajouter <base target="_self"> après <head> ou <meta charset> si absent
  if (!html.includes('<base')) {
    html = html.replace(/<head>/i,        '<head>\n  <base target="_self">');
    html = html.replace(/(<meta charset[^>]*>)/i, '$1\n  <base target="_self">');
    changed = true;
  } else if (!html.includes('target="_self"')) {
    html = html.replace(/<base([^>]*)>/i, '<base$1 target="_self">');
    changed = true;
  }

  // 2. Supprimer l'ancien player CSS
  html = html.replace(/\s*<link[^>]+audioplayer\.css[^>]*>/gi, '');

  // 3. Supprimer l'ancien player JS
  html = html.replace(/\s*<script[^>]+audioplayer\.js[^>]*><\/script>/gi, '');

  // 4. Supprimer MEDIOMA_NAV et MEDIOMA_REINIT residuels dans animations.js
  //    (ces refs sont dans les fichiers JS, pas HTML — rien à faire ici)

  fs.writeFileSync(fp, html, 'utf8');
  console.log('✅ ' + file);
  modified++;
});

console.log(`\nTerminé — ${modified} page(s) modifiée(s).`);
