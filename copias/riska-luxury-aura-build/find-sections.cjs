const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'site', 'index.html'), 'utf8');
const lines = indexHtml.split('\n');

console.log('Searching for section tags in index.html:');
lines.forEach((line, idx) => {
  if (line.includes('<section') || line.includes('id="collection"') || line.includes('id="story"') || line.includes('id="editorial"') || line.includes('id="journal"')) {
    console.log(`Line ${idx + 1}: ${line.trim().slice(0, 100)}`);
  }
});

const main1Html = fs.readFileSync(path.join(__dirname, 'site', 'sections', '01_main-1.html'), 'utf8');
const mLines = main1Html.split('\n');
console.log('\nSearching for section tags in 01_main-1.html:');
mLines.forEach((line, idx) => {
  if (line.includes('<section') || line.includes('id="collection"') || line.includes('id="story"') || line.includes('id="editorial"') || line.includes('id="journal"')) {
    console.log(`Line ${idx + 1}: ${line.trim().slice(0, 100)}`);
  }
});
