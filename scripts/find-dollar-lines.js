const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

const match = html.match(/[^\n]*\$\$[^\n]*/g);
console.log('Matches for $$ count:', match ? match.length : 0);
if (match) {
  console.log('First 5 matches:');
  console.log(match.slice(0, 5));
}
