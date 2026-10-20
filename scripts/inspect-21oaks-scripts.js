const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('copias/21oaks-org/site/index.html', 'utf8');
const $ = cheerio.load(html);

$('script').each((i, el) => {
  const src = $(el).attr('src');
  const txt = $(el).text().trim().substring(0, 120);
  console.log(`[Script ${i}] src=${src || 'inline'} :: ${txt.replace(/\n/g, ' ')}`);
});
