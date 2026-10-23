const fs = require('fs');

function find(file) {
  console.log('=== ' + file + ' ===');
  const c = fs.readFileSync(file, 'utf8');
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('id="heroTitle"') || l.includes('id="storyTitle"') || l.includes('id="journalTitle"') || l.includes('id="collectionTitle"') || l.includes('The new form') || l.includes('The red room') || l.includes('Private study')) {
      console.log(`${i+1}: ${l.trim().slice(0, 90)}`);
    }
  });
}

find('site/index.html');
find('site/sections/01_main-1.html');
