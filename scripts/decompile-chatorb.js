const fs = require('fs');
const path = require('path');

const chunkFile = path.resolve('copias/useplanes-com/site/assets/_next/static/immutable/chunks/06c7iuwc3h89p.js');
let content = '';
if (fs.existsSync(chunkFile)) {
  content = fs.readFileSync(chunkFile, 'utf8');
} else {
  // search all chunks
  const chunksDir = path.resolve('copias/useplanes-com/site/assets/_next/static/immutable/chunks');
  for (const f of fs.readdirSync(chunksDir)) {
    const c = fs.readFileSync(path.join(chunksDir, f), 'utf8');
    if (c.includes('radial-gradient') && c.includes('Hi there! Need a hand?')) {
      content = c;
      console.log('Found in', f);
      break;
    }
  }
}

const idx = content.indexOf('Hi there! Need a hand?');
if (idx !== -1) {
  // get 4000 characters before and 6000 after
  const start = Math.max(0, idx - 2500);
  const end = Math.min(content.length, idx + 6000);
  console.log(content.substring(start, end));
}
