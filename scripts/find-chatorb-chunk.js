const fs = require('fs');
const path = require('path');

const chunksDir = path.resolve('copias/useplanes-com/site/assets/_next/static/immutable/chunks');
const files = fs.readdirSync(chunksDir).filter(f => f.endsWith('.js'));

for (const file of files) {
  const content = fs.readFileSync(path.join(chunksDir, file), 'utf8');
  if (content.includes('radial-gradient') || content.includes('ChatOrb') || content.includes('Typically replies instantly') || content.includes('Hi there! Need a hand?')) {
    console.log('Found match in chunk:', file);
    // Find snippets
    const idx = content.indexOf('Hi there! Need a hand?');
    if (idx !== -1) {
      console.log('--- Context around "Hi there!" ---');
      console.log(content.substring(Math.max(0, idx - 400), Math.min(content.length, idx + 800)));
    }
  }
}
