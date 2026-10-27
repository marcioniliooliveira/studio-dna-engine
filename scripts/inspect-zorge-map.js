const fs = require('fs');
const content = fs.readFileSync('C:/Users/wd/.gemini/antigravity/brain/f07ae635-850a-468e-a0e9-f8287ffa5082/.system_generated/steps/777/content.md', 'utf8');

const mapMatches = content.match(/class=["'][^"']*map[^"']*["']/gi);
console.log('Map classes in Zorge 9:', [...new Set(mapMatches)].slice(0, 10));

const locMapIdx = content.indexOf('map');
console.log('First map idx:', locMapIdx);

// Look for data-plugin or svg in zorge9
const svgMatches = content.match(/<svg[^>]*class=["'][^"']*map[^"']*["'][^>]*>/gi);
console.log('SVG map tags:', svgMatches);

// Search for pins or popups in zorge 9
const cardMatches = content.match(/class=["'][^"']*(?:card|popup|tooltip|bubble)[^"']*["']/gi);
console.log('Card/popup classes in Zorge 9:', [...new Set(cardMatches)].slice(0, 15));
