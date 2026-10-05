const fs = require('fs');
const js = fs.readFileSync('copias/more-nutrition-webflow-io/site/assets/vendor/morematcha.vercel.app/scripts/app.js', 'utf8');

const matches = [];
let idx = 0;
while ((idx = js.indexOf('sequence-canvas', idx)) !== -1) {
  matches.push(idx);
  idx += 15;
}

console.log('Found occurrences at offsets:', matches);
for (const pos of matches) {
  console.log('--- BLOCK AT OFFSET ' + pos + ' ---');
  console.log(js.slice(Math.max(0, pos - 200), Math.min(js.length, pos + 800)));
}
