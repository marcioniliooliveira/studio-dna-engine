const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const htmlPath = path.resolve(__dirname, '..', 'clientes', 'negocia-bem', 'site', 'index.html');
const slotsPath = path.resolve(__dirname, '..', 'clientes', 'negocia-bem', 'content-slots.json');

test('Negocia Bem data region exposes sourced metrics and animated numeric fallbacks', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');
  assert.match(html, /id = 'dados-regiao'/);
  assert.match(html, /data-region-number="425983"/);
  assert.match(html, /data-region-number="14\.72"/);
  assert.match(html, /data-number-end="425983"/);
  assert.match(html, /data-number-format="percent"/);
  assert.match(html, /IBGE|Sebrae|FIEP|Sinduscon/i);
  assert.match(html, /recortes territoriais não são idênticos/i);

  const slots = JSON.parse(fs.readFileSync(slotsPath, 'utf8'));
  assert.equal(slots.DATA_REGION_TITLE, 'Maringá e o Noroeste do Paraná em movimento');
  assert.equal(slots.DATA_REGION_SOURCE_NOTE.length > 20, true);
});
