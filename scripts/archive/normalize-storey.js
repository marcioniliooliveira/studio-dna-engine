const fs = require('fs');
const path = require('path');
const { UniversalScrollDirector } = require('../src/pro/universal-scroll-director');

const file = path.resolve(__dirname, '../copias/storeyarchitecture-co-uk/site/index.html');
let html = fs.readFileSync(file, 'utf8');

// 1. Substituir caminhos de gifs e imagens relativas à raiz
html = html.replace(/src="\/gifs\//g, 'src="./assets/gifs/');
html = html.replace(/src="\/images\//g, 'src="./assets/images/');

// 2. Injetar o UniversalScrollDirector completo
const script = UniversalScrollDirector.generateScript();
if (html.includes('id="universal-scroll-director"')) {
  html = html.replace(/<script id="universal-scroll-director">[\s\S]*?<\/script>/, script);
} else {
  html = html.replace('</body>', script + '\n</body>');
}

fs.writeFileSync(file, html, 'utf8');
console.log('✅ Storey index.html normalizado e scroll director injetado com sucesso.');
