const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

const idx = html.indexOf('function setWord');
console.log('Context before setWord:');
console.log(html.substring(idx - 100, idx + 100));
