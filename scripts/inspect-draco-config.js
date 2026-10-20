const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');
const match = html.match(/<script type="module">([\s\S]*?)<\/script>/i);
const code = match[1];

const lines = code.split('\n');
lines.forEach((l, i) => {
  if (l.includes('DRACOLoader') || l.includes('setDecoderPath') || l.includes('draco')) {
    console.log(`L${i + 1}: ${l}`);
  }
});
