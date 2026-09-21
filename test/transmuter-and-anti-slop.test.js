const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');

const {
  createCompositionSpec,
  runDeterministicTransmutation,
  computeHash
} = require('../src/pipeline/transmuter');
const { AntiSlopGate } = require('../src/qa/anti-slop-gate');

test('Transmuter: generates composition-spec and is idempotent', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'transmuter-test-'));
  const skeletonPath = path.join(tmpDir, 'skeleton.html');
  const outputPath1 = path.join(tmpDir, 'client1/site/index.html');
  const outputPath2 = path.join(tmpDir, 'client2/site/index.html');

  fs.writeFileSync(skeletonPath, '<!DOCTYPE html><html><head><title>Original</title></head><body><h1>{SLOT_HERO_TITLE}</h1></body></html>', 'utf8');

  const brandSpec = {
    brandName: 'Alpha Real Estate',
    theme: { bgBase: '#000000', accent: '#FFD700' },
    meta: { title: 'Alpha Real Estate | Exclusive Residences' }
  };

  const contentSlots = {
    HERO_TITLE: 'Residências Exclusivas em São Paulo'
  };

  const compositionSpec = createCompositionSpec({
    refSlug: 'elyse-residence-dev-webflow-io',
    brandSpec,
    contentSlots
  });

  const res1 = runDeterministicTransmutation({
    skeletonPath,
    compositionSpec,
    outputPath: outputPath1,
    clientDir: path.join(tmpDir, 'client1')
  });

  const res2 = runDeterministicTransmutation({
    skeletonPath,
    compositionSpec,
    outputPath: outputPath2,
    clientDir: path.join(tmpDir, 'client2')
  });

  // Idempotência: o hash do output gerado deve ser idêntico
  assert.equal(res1.outputHash, res2.outputHash);
  assert.equal(res1.replacedSlotsCount, 1);

  // Validação do build-manifest.json
  const manifestPath = path.join(tmpDir, 'client1/build-manifest.json');
  assert.ok(fs.existsSync(manifestPath));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.outputHash, res1.outputHash);
  assert.equal(manifest.brandName, 'Alpha Real Estate');

  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('AntiSlopGate: blocks banned meta-language and placeholders', () => {
  const badHtml = '<html><body><h1>Chunk Cognitivo e Lorem Ipsum</h1></body></html>';
  const report = AntiSlopGate.audit({ htmlContent: badHtml });

  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('Metalinguagem ou placeholder proibido')));
  assert.ok(report.stats.slopMatches >= 2);
});

test('AntiSlopGate: blocks original brand residuals', () => {
  const leakyHtml = '<html><body><h1>Bem-vindo à Elyse Residence</h1></body></html>';
  const report = AntiSlopGate.audit({
    htmlContent: leakyHtml,
    originalBrandKeywords: ['Elyse Residence', 'elyse-dev.com']
  });

  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('Resíduo da marca original')));
  assert.equal(report.stats.residualMatches, 1);
});

test('AntiSlopGate: blocks unfilled slot placeholders', () => {
  const incompleteHtml = '<html><body><h1>{SLOT_HERO_TITLE}</h1></body></html>';
  const report = AntiSlopGate.audit({ htmlContent: incompleteHtml });

  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('Variável de slot não preenchida')));
  assert.equal(report.stats.unfilledSlots, 1);
});

test('AntiSlopGate: blocks character budget violations (+/- 15%)', () => {
  const report = AntiSlopGate.audit({
    htmlContent: '<html><body><p>Conteúdo curto</p></body></html>',
    contentSlots: {
      DESCRIPTION: 'Texto muito curto' // 17 chars
    },
    referenceSlots: {
      DESCRIPTION: 'Este é um texto original bastante detalhado e extenso sobre o empreendimento que possui 100 caracteres.' // 106 chars
    },
    budgetTolerance: 0.15
  });

  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('Character Budget Violation')));
  assert.equal(report.stats.budgetWarnings, 1);
});

test('AntiSlopGate: passes clean, well-budgeted content', () => {
  const cleanHtml = '<!DOCTYPE html><html><head><title>Alpha</title></head><body><h1>Empreendimento Exclusivo</h1></body></html>';
  const report = AntiSlopGate.audit({
    htmlContent: cleanHtml,
    contentSlots: {
      TITLE: 'Empreendimento Exclusivo' // 24 chars
    },
    referenceSlots: {
      TITLE: 'Residencial Panorâmico' // 22 chars (dentro de +/- 15%)
    },
    originalBrandKeywords: ['Elyse'],
    budgetTolerance: 0.15
  });

  assert.equal(report.passed, true);
  assert.equal(report.violations.length, 0);
});
