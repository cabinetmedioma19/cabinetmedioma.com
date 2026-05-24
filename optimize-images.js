/* ═══════════════════════════════════════════════════
   MEDIOMA — Script d'optimisation des images
   Usage : node optimize-images.js
   Prérequis : npm install sharp
═══════════════════════════════════════════════════ */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const images = [
  { input: 'blog-chakras-hero.jpg',    output: 'blog-chakras-hero.jpg' },
  { input: 'blog-magnetisme-hero.jpg', output: 'blog-magnetisme-hero.jpg' },
  { input: 'blog-meditation-hero.jpg', output: 'blog-meditation-hero.jpg' },
  { input: 'blog-nettoyage-hero.jpg',  output: 'blog-nettoyage-hero.jpg' },
];

async function optimize() {
  for (const img of images) {
    const inputPath  = path.join(__dirname, img.input);
    const outputPath = path.join(__dirname, img.output + '.tmp.jpg');

    if (!fs.existsSync(inputPath)) {
      console.log(`⏭  Introuvable : ${img.input}`);
      continue;
    }

    const before = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .resize(1920, 1080, { fit: 'cover', withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true, mozjpeg: true })
      .toFile(outputPath);

    const after = fs.statSync(outputPath).size;

    // Remplacer l'original seulement si le fichier compressé est plus petit
    if (after < before) {
      fs.renameSync(outputPath, inputPath);
      console.log(`✓ ${img.input} : ${Math.round(before/1024)} KB → ${Math.round(after/1024)} KB (-${Math.round((1-after/before)*100)}%)`);
    } else {
      fs.unlinkSync(outputPath);
      console.log(`= ${img.input} : déjà optimisé (${Math.round(before/1024)} KB)`);
    }
  }
  console.log('\n✓ Optimisation terminée.');
}

optimize().catch(console.error);