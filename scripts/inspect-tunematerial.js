const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');
const match = html.match(/<script type="module">([\s\S]*?)<\/script>/i);
const lines = match[1].split('\n');
console.log(lines.slice(110, 160).map((l, i) => `${i + 111}: ${l}`).join('\n'));
