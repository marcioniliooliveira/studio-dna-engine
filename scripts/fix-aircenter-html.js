const fs = require('fs');
const path = require('path');

const filePath = path.resolve('copias/aircenter-space/site/index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Localiza assets
html = html.replace(/src="\/assets\//g, 'src="./assets/assets/');
html = html.replace(/href="\/assets\//g, 'href="./assets/assets/');
html = html.replace(/url\(\/assets\//g, 'url(./assets/assets/');

// Garante que stylesheets estão no head
if (!html.includes('href="./assets/assets/stylesheets/global.css"')) {
  html = html.replace('</head>', `  <link rel="stylesheet" href="./assets/assets/stylesheets/global.css">\n  <link rel="stylesheet" href="./assets/assets/stylesheets/landing.css">\n</head>`);
}

// Remove scripts Cloudflare challenge
html = html.replace(/<script[^>]*cdn-cgi\/challenge-platform[^>]*>[\s\S]*?<\/script>/gi, '');
html = html.replace(/<script[^>]*window\.__CF\$cv\$params[\s\S]*?<\/script>/gi, '');

fs.writeFileSync(filePath, html);
console.log('✅ aircenter index.html localized and cleaned! Length:', html.length);
