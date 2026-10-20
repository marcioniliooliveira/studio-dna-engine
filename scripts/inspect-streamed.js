const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('streamed-chat-dump.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Messages found in role=log ---');
$('[role=log]').children().each((i, el) => {
  console.log(`[Item ${i}]`, $(el).text().trim());
});

console.log('\n--- Full role=log HTML ---');
console.log($('[role=log]').html());
