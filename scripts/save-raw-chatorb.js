const fs = require('fs');
const path = require('path');

const chunksDir = path.resolve('copias/useplanes-com/site/assets/_next/static/immutable/chunks');
for (const f of fs.readdirSync(chunksDir).filter(x => x.endsWith('.js'))) {
  const c = fs.readFileSync(path.join(chunksDir, f), 'utf8');
  const idx = c.indexOf('Hi there! Need a hand?');
  if (idx !== -1) {
    console.log(`Found in ${f} at index ${idx}`);
    const start = Math.max(0, idx - 1500);
    const end = Math.min(c.length, idx + 4500);
    fs.writeFileSync('chatorb-raw-decompiled.js', c.substring(start, end));
    console.log('Saved to chatorb-raw-decompiled.js');
    break;
  }
}
