const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

// Find section hero and strip in HTML
const heroIdx = html.indexOf('id="hero"');
const stripIdx = html.indexOf('id="strip"');
const macroIdx = html.indexOf('id="macro"');

console.log('Hero section HTML:');
console.log(html.substring(heroIdx - 30, stripIdx));

console.log('\nStrip section HTML:');
console.log(html.substring(stripIdx - 30, macroIdx));
