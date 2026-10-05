const fs = require('fs');
const html = fs.readFileSync('copias/more-nutrition-webflow-io/site/index.html', 'utf8');
const idx = html.indexOf('id="nutrition"');
if (idx !== -1) {
  console.log(html.slice(idx - 100, idx + 1800));
} else {
  console.log('not found');
}
