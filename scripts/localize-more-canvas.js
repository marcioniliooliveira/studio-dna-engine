const fs = require('fs');

const file = 'copias/more-nutrition-webflow-io/site/index.html';
let html = fs.readFileSync(file, 'utf8');

const regex1 = /data-load-stage-canvas-img-path="[^"]*"/g;
const regex2 = /data-sequence-canvas-img-path="[^"]*"/g;

console.log('Matches stage:', html.match(regex1));
console.log('Matches seq:', html.match(regex2));

html = html.replace(regex1, 'data-load-stage-canvas-img-path="./assets/vendor/morematcha.vercel.app/img/"');
html = html.replace(regex2, 'data-sequence-canvas-img-path="./assets/vendor/morematcha.vercel.app/img/"');

fs.writeFileSync(file, html, 'utf8');
console.log('Updated index.html to use local asset sequence path!');
