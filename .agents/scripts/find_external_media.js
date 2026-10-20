const fs = require('fs');
const content = fs.readFileSync('clientes/negocia-bem/site/index.html', 'utf8');

const regex = /(?:src=|poster=|url\(['"]?)(https?:\/\/[^'"\)\s>]+)/g;
const externalMedia = [];
let match;
while ((match = regex.exec(content)) !== null) {
  const u = match[1];
  if (!u.includes('fonts.googleapis.com') && !u.includes('fonts.gstatic.com') && !u.includes('jsdelivr.net') && !u.includes('unpkg.com')) {
    externalMedia.push(u);
  }
}

console.log('Total external media found:', externalMedia.length);
externalMedia.forEach((u, i) => console.log(`${i+1}: ${u}`));
