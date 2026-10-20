const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('opened-chat-dump.html', 'utf8');
const $ = cheerio.load(html);

console.log('Dialog or popup elements:');
$('[role=dialog], [aria-label*="chat" i], [aria-label*="close" i], input, textarea, form').each((i, el) => {
  console.log($(el).prop('tagName'), '| role:', $(el).attr('role'), '| class:', $(el).attr('class'), '| label:', $(el).attr('aria-label'));
});

console.log('\n--- Full container HTML ---');
const container = $('div.h-\\[600px\\]');
console.log(container.html());
