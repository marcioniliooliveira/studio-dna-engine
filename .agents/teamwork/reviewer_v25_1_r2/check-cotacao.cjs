const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const files = [
  'JumpPlay — Family Reveal & Kinetic Range.html',
  'clientes/jumpflex-home-evolution/JumpPlay — Family Reveal & Kinetic Range.html'
];

for (const rel of files) {
  const fullPath = path.resolve(__dirname, '../../../', rel);
  const html = fs.readFileSync(fullPath, 'utf8');
  const $ = cheerio.load(html);
  const section = $('#cotacao-b2b');

  const cardSelector = '[class*="rounded-"][class*="bg-"], [class*="border"][class*="rounded-"]';
  let nestedCount = 0;
  const nestedDetails = [];

  section.find(cardSelector).each((_, el) => {
    const $el = $(el);
    const tag = el.tagName.toLowerCase();
    if (['input', 'select', 'textarea', 'button', 'a', 'span', 'p'].includes(tag)) return;
    const parentCard = $el.parents(cardSelector).first();
    if (parentCard.length > 0) {
      const parentTag = parentCard.get(0).tagName.toLowerCase();
      if (!['input', 'select', 'textarea', 'button', 'body', 'html'].includes(parentTag)) {
        nestedCount++;
        nestedDetails.push({
          childTag: tag,
          childId: $el.attr('id') || null,
          childClass: $el.attr('class') || '',
          parentTag,
          parentId: parentCard.attr('id') || null,
          parentClass: parentCard.attr('class') || ''
        });
      }
    }
  });

  console.log(`File: ${rel}`);
  console.log(`  #cotacao-b2b exists: ${section.length > 0}`);
  console.log(`  Nested cards count in #cotacao-b2b: ${nestedCount}`);
  if (nestedCount > 0) {
    console.log('  Details:', JSON.stringify(nestedDetails, null, 2));
  }
}
