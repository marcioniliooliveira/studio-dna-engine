const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const canvasDir = path.resolve(__dirname, '../clientes/flashtech-caso-04-growth/kombai-canvas');
const files = [
  'Scalex — Sessao 01_ Hero e Navbar.html',
  'Scalex — Sessao 02_ Sobre e Metricas.html'
];

function readCanvas(name) {
  return fs.readFileSync(path.join(canvasDir, name), 'utf8');
}

test('SCALEX canvas refinement preserves typography, spacing, responsive stats, and CTA contracts', () => {
  files.forEach((name) => {
    const html = readCanvas(name);
    const refinement = html.match(/<style id=["']scalex-ui-refinement["']>([\s\S]*?)<\/style>/i)?.[1] || '';
    assert.ok(refinement, `${name} deve incluir o override SCALEX`);
    assert.match(refinement, /font-family:\s*Anton,\s*sans-serif[^;]*!important/i, `${name} deve aplicar Anton aos displays`);
    assert.match(refinement, /font-family:\s*Inter,\s*sans-serif[^;]*!important/i, `${name} deve aplicar Inter aos textos`);
    assert.match(refinement, /\.hero-display-text-2[\s\S]{0,700}white-space:\s*nowrap\s*!important/i, `${name} deve preservar a linha de alta conversão`);
    assert.doesNotMatch(refinement, /transform\s*:[^;}]*!important/i, `${name} não pode bloquear transforms inline do IX2`);
    assert.match(refinement, /--scalex-gold:\s*#FFC552/i, `${name} deve declarar o dourado SCALEX`);
    assert.match(refinement, /\.primary-btn[\s\S]{0,700}background:\s*var\(--scalex-gold\)/i, `${name} deve usar CTA de alto contraste`);
  });

  const about = readCanvas(files[1]);
  assert.match(about, /\.about-cards-wrapper[\s\S]{0,900}grid-template-columns/i, 'métricas devem usar grid explícito');
  assert.match(about, /@media\s*\(max-width:\s*767px\)[\s\S]{0,1800}\.about-cards-wrapper[\s\S]{0,700}grid-template-columns/i, 'métricas devem adaptar para mobile');
});
