const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;
const CSS_TAG = '<link rel="stylesheet" href="assets/css/audioplayer.css">';
const JS_TAG  = '<script src="assets/js/audioplayer.js" defer></script>';

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
let ok = 0, skip = 0;

files.forEach(file => {
  const fp  = path.join(ROOT, file);
  let html  = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // CSS — avant </head>
  if (!html.includes('audioplayer.css')) {
    html = html.replace('</head>', CSS_TAG + '\n</head>');
    changed = true;
  }

  // JS — avant </body>
  if (!html.includes('audioplayer.js')) {
    html = html.replace('</body>', JS_TAG + '\n</body>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, html, 'utf8');
    console.log('✅ ' + file);
    ok++;
  } else {
    console.log('⏭  ' + file + ' (déjà présent)');
    skip++;
  }
});

console.log(`\nTerminé — ${ok} page(s) modifiée(s), ${skip} ignorée(s).`);
