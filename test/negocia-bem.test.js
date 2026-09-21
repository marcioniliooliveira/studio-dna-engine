const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const sitePath = path.resolve(__dirname, '../clientes/negocia-bem/site/index.html');

test('Negocia Bem Suite: Step 1 - Sessao 02 Sticky Media has distinct local images and dynamic storytelling', () => {
  const html = fs.readFileSync(sitePath, 'utf8');
  const $ = cheerio.load(html);

  // Deve haver estrutura para alternar imagens dos 3 cards (01, 02, 03)
  const mediaImages = $('#sessao-02 .s02-media img');
  assert.ok(mediaImages.length >= 3, `Expected at least 3 distinct images in s02-media, found ${mediaImages.length}`);

  // Nenhuma imagem deve ser URL externa repetida idêntica
  const srcs = [];
  mediaImages.each((_, img) => {
    const src = $(img).attr('src');
    assert.ok(src, 'Image must have src');
    assert.ok(!srcs.includes(src), `Duplicate image src found in s02-media: ${src}`);
    srcs.push(src);
  });
});

test('Negocia Bem Suite: Step 2 - Sessao 02 Header eliminates negative space with technical layout', () => {
  const html = fs.readFileSync(sitePath, 'utf8');
  const $ = cheerio.load(html);

  const leftCol = $('#sessao-02 .grid').first().find('> div, > p').first();
  const leftText = leftCol.text();

  assert.ok(leftText.includes('02'), 'Left column must include chapter indicator 02');
  assert.ok(leftText.includes('9314-J') || leftText.includes('CRECI'), 'Left column must include CRECI authority metadata');
  assert.ok(leftText.includes('PAIÇANDU') || leftText.includes('Paiçandu'), 'Left column must include territorial grounding');
});

test('Negocia Bem Suite: Step 3 - Sessao 02 Story Cards have Contextualized CTAs (Option 2)', () => {
  const html = fs.readFileSync(sitePath, 'utf8');
  const $ = cheerio.load(html);

  const stories = $('#sessao-02 .s02-story');
  assert.equal(stories.length, 3, 'Must have exactly 3 story cards');

  // Cada story deve ter botão de CTA contextualizado com data-route
  const routes = ['comprar-casas', 'comprar-terrenos', 'alugar-imoveis'];
  stories.each((i, el) => {
    const btn = $(el).find('button[data-route]');
    assert.ok(btn.length > 0, `Story ${i+1} must contain a CTA button with data-route`);
    assert.equal(btn.attr('data-route'), routes[i], `Story ${i+1} CTA must route to ${routes[i]}`);
  });
});

test('Negocia Bem Suite: Step 4 - Oportunidades Section has working photos and fluid scrollbar', () => {
  const html = fs.readFileSync(sitePath, 'utf8');
  const $ = cheerio.load(html);

  // Container principal e container flutuante devem ter 3 fotos cada
  const rightContainer = $('#oportunidades .nb-desktop .h-full.w-\\[70\\%\\] .nb-photo');
  const leftContainer = $('#oportunidades .nb-desktop .w-\\[44\\%\\] .nb-photo');

  assert.equal(rightContainer.length, 3, 'Main photo container must have 3 photos');
  assert.equal(leftContainer.length, 3, 'Accent floating photo container must have 3 photos');

  // Script não deve ter o bug que só ativa índices 0..2 flat
  assert.ok(!html.includes('photos.forEach((el, n) => el.classList.toggle(\'active\', n === i))'), 'Buggy photo loop must be fixed');
});

test('Negocia Bem Suite: Step 5 - Broken pre-footer interpretation removed', () => {
  const html = fs.readFileSync(sitePath, 'utf8');

  // A imagem quebrada e o bloco duplicado não devem existir
  assert.ok(!html.includes('693881d5049ac7d72bb5f18f_cta-img--d.avif'), 'Broken asset reference must be removed');
  assert.ok(!html.includes('Casa contemporânea iluminada ao entardecer'), 'Alt of broken pre-footer must be removed');
});

test('Negocia Bem Suite: Step 6 - Modal Catalog with real geography, benchmark estimates and no alerts', () => {
  const html = fs.readFileSync(sitePath, 'utf8');

  // Zero window.alert()
  assert.ok(!html.includes('alert('), 'No window.alert calls should exist in codebase');

  // Real local neighborhoods in DATA
  assert.ok(html.includes('Jardim Bela Vista') || html.includes('Pioneiro') || html.includes('Jardim Canadá'), 'DATA must include real Paiçandu/Maringá locations');

  // Realistic financing benchmarks (decision 3b)
  assert.ok(html.includes('a partir de') || html.includes('MCMV') || html.includes('FGTS'), 'DATA must include benchmark financing estimates');
});

test('Negocia Bem Suite: Step 7 - Comparison bar only appears after selection and disappears on section switch', () => {
  const html = fs.readFileSync(sitePath, 'utf8');
  const $ = cheerio.load(html);

  // Barra de comparação deve existir com botão de ação e botão de fechar/limpar
  const bar = $('#bar');
  assert.equal(bar.length, 1, 'Comparison bar #bar must exist');
  assert.ok(bar.find('#compare').length > 0, '#bar must contain #compare button');
  assert.ok(bar.find('#bar-close').length > 0, '#bar must contain #bar-close dismiss button');

  // closeModal e render devem invocar resetComparison para sumir ao trocar de sessão
  assert.ok(html.includes('function resetComparison()'), 'Must define resetComparison function');
  assert.ok(/function closeModal[\s\S]*?\{[\s\S]*?resetComparison\(\)/.test(html), 'closeModal must call resetComparison');
  assert.ok(/function render\(key\)[\s\S]*?\{[\s\S]*?resetComparison\(\)/.test(html), 'render must call resetComparison on section switch');
  assert.ok(/querySelectorAll\('a\[href\^="#"\]'\)[\s\S]*?resetComparison/.test(html), 'Navigation links must call resetComparison when switching sessions');
});

test('Negocia Bem Suite: Step 8 - Curated Regional WebP Assets integrity and zero external media', () => {
  const html = fs.readFileSync(sitePath, 'utf8');
  const assetsDir = path.resolve(__dirname, '../clientes/negocia-bem/site/assets');

  // Nenhuma mídia de imagem externa deve existir
  const externalMatches = html.match(/(?:src=|poster=|url\()['"]?(https?:\/\/[^'"\)\s>]+\.(?:jpg|jpeg|png|webp|avif))/gi) || [];
  assert.equal(externalMatches.length, 0, `Expected 0 external image URLs, found: ${externalMatches.join(', ')}`);

  // Todas as imagens locais referenciadas devem existir em disco com tamanho > 10KB
  const localMatches = [...html.matchAll(/(?:\.\/assets\/|assets\/)([\w-]+\.webp)/g)].map(m => m[1]);
  const uniqueAssets = [...new Set(localMatches)];
  assert.ok(uniqueAssets.length >= 8, `Expected at least 8 unique local assets, found ${uniqueAssets.length}`);

  uniqueAssets.forEach(assetName => {
    const assetPath = path.join(assetsDir, assetName);
    assert.ok(fs.existsSync(assetPath), `Asset must exist on disk: ${assetName}`);
    const size = fs.statSync(assetPath).size;
    assert.ok(size > 10240, `Asset ${assetName} must be valid and > 10KB (was ${size} bytes)`);
  });
});

