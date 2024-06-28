const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const convertImages = async () => {
  // Trouver toutes les images PNG
  const files = glob.sync('**/*.png', { nodir: true });

  for (const file of files) {
    const webpFile = file.replace(/\.png$/, '.webp');

    try {
      // Lire l'image PNG
      const data = await fs.readFile(file);

      // Convertir en WebP
      const webpData = await sharp(data).webp().toBuffer();

      // Écrire l'image WebP
      await fs.writeFile(webpFile, webpData);

      // Optionnel : Supprimer le fichier PNG d'origine
      // await fs.remove(file);

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