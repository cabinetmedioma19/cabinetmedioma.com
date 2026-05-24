const fs   = require('fs');
const path = require('path');
const ROOT = __dirname;

// Dans les pages de contenu, les liens vers index.html doivent pointer vers index-content.html
// Sauf dans le nouveau index.html (le shell) qui est déjà correct
const files = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

let modified = 0;

files.forEach(file => {
  const fp  = path.join(ROOT, file);
  let html  = fs.readFileSync(fp, 'utf8');

  // Remplacer href="index.html" par href="index-content.html"
  const updated = html
    .replace(/href="index\.html"/g, 'href="index-content.html"')
    .replace(/href='index\.html'/g, "href='index-content.html'")
    // Aussi les liens relatifs vers ./ ou sans nom de page
    ;

  if (updated !== html) {
    fs.writeFileSync(fp, updated, 'utf8');
    console.log('🔗 ' + file);
    modified++;
  } else {
    console.log('⏭  ' + file + ' (aucun lien index.html)');
  }
});

console.log(`\nTerminé — ${modified} fichier(s) mis à jour.`);
