const fs = require('fs');
const content = fs.readFileSync('clientes/negocia-bem/site/index.html', 'utf8');

function findLine(str) {
  const idx = content.indexOf(str);
  if (idx === -1) return -1;
  return content.slice(0, idx).split('\n').length;
}

console.log('Hero video poster line:', findLine('background: #121820 url'));
console.log('Perto de tudo line:', findLine('id="perto-de-tudo"'));
console.log('Mobile oportunidades line:', findLine('(NOSSAS OPORTUNIDADES - MOBILE)'));
console.log('Modal media line:', findLine('<figure class="media">'));
console.log('Bar line:', findLine('id="bar"'));
console.log('DATA line:', findLine('const DATA ='));
console.log('Render line:', findLine('function render(key)'));
console.log('BindModal line:', findLine('function bindModalInteractions()'));
