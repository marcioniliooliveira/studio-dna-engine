const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

const matches = [...html.matchAll(/[^\n]*beats\s*=[^\n]*/g)].map(m => m[0]);
console.log('Beats assignments:', matches);
