const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('copias/useplanes-com/site/index.html', 'utf8');
const $ = cheerio.load(html);

const mainWrapper = $('div.min-h-dvh');
console.log('Main wrapper found:', mainWrapper.length);
mainWrapper.children().each((i, el) => {
  console.log(`[Child ${i}] <${el.tagName} class="${$(el).attr('class')}">`);
});

const main = $('main');
console.log('Main found:', main.length);
if (main.length) {
  console.log('Main sections:');
  main.find('section').each((i, el) => {
    console.log(`- Section ${i} id="${$(el).attr('id')}": ${$(el).find('h1, h2').text()}`);
  });
}
