const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('copias/useplanes-com/site/index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Title:', $('title').text());
console.log('Body classes:', $('body').attr('class'));
console.log('Top level elements in body:');
$('body').children().each((i, el) => {
  const tag = el.tagName;
  const cls = $(el).attr('class') || '';
  const id = $(el).attr('id') || '';
  console.log(`- <${tag} id="${id}" class="${cls.slice(0, 60)}">`);
});
