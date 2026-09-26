const fs = require('fs');
const html = fs.readFileSync('clientes/opxy-tuning-lab/site/index.html', 'utf8');

const matches = [...html.matchAll(/[^\n]*STACK\.els[^\n]*/g)].map(m => m[0]);
console.log('STACK.els occurrences:', matches);
