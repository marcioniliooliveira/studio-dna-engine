const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

const idx = html.indexOf('function wireStack');
console.log('wireStack:');
console.log(html.substring(idx, idx + 400));
