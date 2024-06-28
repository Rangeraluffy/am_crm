import sharp from 'sharp';
import { createRequire } from 'module';
import { promises as fs } from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const glob = require('glob');

const convertImages = async () => {
  // Trouver toutes les images PNG et JPG
  const files = glob.sync('**/*.{png,jpg,jpeg}', { nodir: true });

  for (const file of files) {
    const webpFile = file.replace(/\.(png|jpg|jpeg)$/, '.webp');

    try {
      // Lire l'image PNG ou JPG
      const data = await fs.readFile(file);

      // Convertir en WebP
      const webpData = await sharp(data).webp().toBuffer();

      // Écrire l'image WebP
      await fs.writeFile(webpFile, webpData);

      // Optionnel : Supprimer le fichier PNG ou JPG d'origine
      // await fs.unlink(file);

      console.log(`Converted ${file} to ${webpFile}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
};

convertImages().then(() => {
  console.log('Conversion complete.');
}).catch(err => {
  console.error('Error during conversion:', err);
});

// npm run convert-images