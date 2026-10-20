const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');
const match = html.match(/<script type="module">([\s\S]*?)<\/script>/i);
const lines = match[1].split('\n');
console.log(lines.slice(885, 960).map((l, i) => `${i + 886}: ${l}`).join('\n'));
