// scraper.js
import puppeteer from 'puppeteer';

export async function scrapeArticles() {

  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  await page.goto("https://blog.angular.dev", { waitUntil: 'networkidle2' });

  // Extraemos los datos de los artículos en la página principal
  const articles = await page.evaluate(() => {
    const articleNodes = document.querySelectorAll('article');

    console.log(articleNodes)
    const data = [];

    articleNodes.forEach(article => {
      // Título
      const titleEl = article.querySelector('h2');
      const title = titleEl ? titleEl.innerText.trim() : null;

      // Descripción
      const descEl = article.querySelector('h3');
      const description = descEl ? descEl.innerText.trim() : null;

      // Autor
      const authorEl = article.querySelector('p');
      const author = authorEl ? authorEl.innerText.trim() : null;

      // Avatar
      const avatarEl = article.querySelector('img');
      const avatar = avatarEl ? avatarEl.src : null;

      // Fecha
      const dateEl = article.querySelector(".o.p.mn span");
      const date = dateEl ? dateEl.innerText.trim() : null;

      // Likes y comentarios (no aparecen en la página principal, dejamos null)
      const likesEl = article.querySelector(".o.p.mp span");
      const likes = likesEl ? likesEl.innerText.trim() : null;

      const spans = article.querySelectorAll("span");
      const comments = spans.length > 1 ? spans[3].innerText.trim() : null;

      data.push({ title, description, author, avatar, date, likes, comments });
    });

    return data;
  });

  await browser.close();
  return articles;
}
