const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const htmlPath = path.resolve(__dirname, '..', 'clientes', 'negocia-bem', 'site', 'index.html');

function readHtml() {
  return fs.readFileSync(htmlPath, 'utf8');
}

test('Negocia Bem limpa comparações ao trocar o catálogo e identifica itens por rota', () => {
  const html = readHtml();
  assert.match(html, /selected\.clear\(\)/, 'trocar o catálogo deve limpar seleções anteriores');
  assert.match(html, /data-key|data-id|selectedKeys/, 'comparações devem usar identidade estável, não apenas índice');
});

test('Negocia Bem diferencia fechamento programático de navegação pelo histórico', () => {
  const html = readHtml();
  assert.match(html, /function closeModal\(\{\s*syncHistory\s*=\s*true/, 'closeModal deve aceitar controle de histórico');
  assert.match(html, /closeModal\(\{\s*syncHistory:\s*false\s*\}\)/, 'popstate não deve empilhar outra entrada');
  assert.doesNotMatch(html, /function closeModal\(\)\s*\{[\s\S]{0,1200}history\.pushState\(\{\},\s*['"]['"],\s*['"]#inicio['"]\)/, 'fechar não deve criar entradas extras');
});

test('Negocia Bem implementa ordenação e filtros com estado acessível', () => {
  const html = readHtml();
  assert.match(html, /data-filter=/, 'filtros devem carregar uma chave de filtro');
  assert.match(html, /addEventListener\(['"]change['"],\s*\(\)\s*=>\s*\{[\s\S]{0,120}sortMode/, 'ordenação deve atualizar a lista');
  assert.match(html, /aria-live=['"]polite['"]/, 'contagem do catálogo deve ser anunciada');
});

test('Negocia Bem permite que o título da hero se adapte ao mobile', () => {
  const html = readHtml();
  assert.match(html, /@media\s*\(max-width:\s*880px\)[\s\S]{0,1200}\.hero-title[\s\S]{0,240}white-space:\s*normal/, 'o título não pode ficar preso em uma única linha no mobile');
  assert.match(html, /\.hero-title\s+span\s*\{\s*display:\s*block/, 'as palavras da marca devem empilhar sem corte no mobile');
});
