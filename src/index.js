// index.js
import { scrapeArticles } from './scraper.js';
import { saveJSON, saveCSV, saveXLSX } from './exportFiles.js';

async function main() {
  try {
    console.log('Iniciando scraping...');
    const articles = await scrapeArticles();

    console.log(articles);

    if (articles.length === 0) {
      console.log('No se encontraron artículos.');
      return;
    }

    console.log(`Se encontraron ${articles.length} artículos. Generando archivos...`);

    await saveJSON(articles);
    await saveCSV(articles);
    await saveXLSX(articles);

    console.log('Archivos generados correctamente.');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
