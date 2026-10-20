const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

const idx = html.indexOf('wireStack();');
console.log(html.substring(idx - 60, idx + 40));
