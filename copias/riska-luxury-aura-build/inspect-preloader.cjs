const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'site', 'index.html'), 'utf8');
const lines = indexHtml.split('\n');

lines.forEach((l, i) => {
  if (l.includes('sitePreloader') || l.includes('is-preloading') || l.includes('preloader')) {
    console.log(`${i+1}: ${l.slice(0, 120)}`);
  }
});
