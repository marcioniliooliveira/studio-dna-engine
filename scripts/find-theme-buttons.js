const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('copias/useplanes-com/site/index.html', 'utf8');
const $ = cheerio.load(html);

console.log('Title:', $('title').text());

$('*').each((i, el) => {
  const aria = $(el).attr('aria-label') || '';
  const text = $(el).text() || '';
  if (aria.toLowerCase().includes('theme') || text.includes('Toggle theme')) {
    console.log(`[Item ${i}] <${el.tagName}> class="${$(el).attr('class')}" aria="${aria}" parent=<${$(el).parent().prop('tagName')} class="${$(el).parent().attr('class')}">`);
  }
});
