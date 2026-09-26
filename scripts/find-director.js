const fs = require('fs');
const html = fs.readFileSync('scripts/server-served.html', 'utf8');

const idx = html.indexOf('[Universal Scroll Director]');
console.log('Found Universal Scroll Director at:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 150, idx + 800));
}
