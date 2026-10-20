const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('copias/useplanes-com/site/index.html', 'utf8');
const $ = cheerio.load(html);

const canvasContainer = $('div.h-\\[600px\\]');
console.log('Canvas container found:', canvasContainer.length);
console.log('Canvas container HTML:');
console.log(canvasContainer.html());
