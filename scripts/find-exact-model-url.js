const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

const idx = html.indexOf('const MODEL_URL');
console.log('Index:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(html.substring(idx, idx + 250)));
}
