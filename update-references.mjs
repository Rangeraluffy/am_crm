import { createRequire } from 'module';
import { promises as fs } from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const glob = require('glob');

const updateReferences = async () => {
  // Trouver tous les fichiers .astro dans le dossier src
  const files = glob.sync('src/**/*.astro', { nodir: true });

  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf8');
      
      // Remplacer toutes les occurrences des extensions PNG et JPG par WebP
      content = content.replace(/(\/assets\/images\/[\w-]+)\.(png|jpg|jpeg)/g, '$1.webp');
      
      await fs.writeFile(file, content, 'utf8');
      console.log(`Updated references in ${file}`);
    } catch (err) {
      console.error(`Error updating ${file}:`, err);
    }
  }
};

updateReferences().then(() => {
  console.log('Reference update complete.');
}).catch(err => {
  console.error('Error during reference update:', err);
});

// npm run update-references