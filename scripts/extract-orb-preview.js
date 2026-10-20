const fs = require('fs');
const cheerio = require('cheerio');

const data = JSON.parse(fs.readFileSync('preview-dump.json', 'utf8'));
const $ = cheerio.load(data.mainHtml);

const teaserBtn = $("button:contains('Hi there!')");
console.log('Teaser button count:', teaserBtn.length);
if (teaserBtn.length) {
  // Let's find the container of this component
  const componentRoot = teaserBtn.parent().parent();
  console.log('Component Root HTML:');
  console.log(componentRoot.html());
  console.log('---------------------------');
  console.log('Outer HTML:');
  console.log($.html(componentRoot));
} else {
  console.log('Teaser button not found with selector');
}
