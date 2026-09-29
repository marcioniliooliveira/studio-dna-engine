const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');
const match = html.match(/<script type="module">([\s\S]*?)<\/script>/i);
const code = match[1];

function showFunction(name) {
  const idx = code.indexOf(name);
  if (idx !== -1) {
    console.log(`=== ${name} ===`);
    console.log(code.substring(idx - 20, idx + 400));
  }
}

showFunction('function buildSequencer');
showFunction('function wireStack');
showFunction('function setWord');
showFunction('function wirePorts');
