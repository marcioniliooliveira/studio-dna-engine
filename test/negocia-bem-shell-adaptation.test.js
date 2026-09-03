const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');

const projectRoot = path.resolve(__dirname, '..');
const clientDir = path.join(projectRoot, 'clientes', 'negocia-bem-imobiliaria');

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(clientDir, name), 'utf8'));
}

test('Negocia Bem shell adaptation has complete ICM contracts and no reference residue', () => {
  const requiredFiles = [
    'DNA.md',
    'brand-spec.json',
    'content-slots.json',
    'reference-selection.json',
    'site/index.html'
  ];

  for (const file of requiredFiles) {
    assert.equal(fs.existsSync(path.join(clientDir, file)), true, `missing ${file}`);
  }

  const html = fs.readFileSync(path.join(clientDir, 'site/index.html'), 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  $('script, style, noscript').remove();
  const renderedText = $.root().text();

  assert.doesNotMatch(renderedText, /elyse|aura private|lumière|crown jewel|aurelia|wellness-centered/i);
  assert.match(html, /data-asset-status=["']temporary-reference-placeholder["']/);
  assert.match(html, /data-anim=["']img-paralax["']/);
  assert.match(html, /data-amenities-anim=["']sticky["']/);

  const brandSpec = readJson('brand-spec.json');
  const slots = readJson('content-slots.json');
  assert.equal(brandSpec.brandName, 'Negocia Bem Consultoria Imobiliária');
  assert.equal(brandSpec.creci, 'CRECI 9314-J');
  assert.equal(slots.funnels.comprar.title, 'Comprar');
  assert.equal(slots.funnels.alugar.title, 'Alugar');
  assert.equal(slots.funnels.investir.title, 'Investir');
});
