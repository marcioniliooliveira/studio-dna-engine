const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const cheerio = require('cheerio');

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

test('Transmuter: does not leak SCALEX defaults into an unrelated client artifact', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'transmuter-generic-client-'));
  const skeletonPath = path.join(tmpDir, 'skeleton.html');
  const outputPath = path.join(tmpDir, 'site', 'index.html');

  fs.writeFileSync(skeletonPath, `<!DOCTYPE html>
<html><head><title>Reference</title></head><body>
  <div class="about-card-text"></div>
  <section class="result"><p class="section-sub-heading"></p></section>
  <section class="pricing"><p class="section-sub-heading"></p></section>
  <p class="pricing-card-short-description"></p>
  <p class="faq-answer"></p>
  <p class="pricing-period"></p>
  <p class="insight-card-btn-text"></p>
  <h3 class="insight-card-heading"></h3>
  <p class="review-text"></p>
  <div class="section-heading footer"></div>
  <div class="footer-marquee-image-wrapper"></div>
</body></html>`, 'utf8');

  const compositionSpec = createCompositionSpec({
    refSlug: 'neutral-reference',
    brandSpec: {
      brandName: 'Northstar Studio',
      theme: { bgBase: '#101010', accent: '#12ABCD' }
    },
    contentSlots: { NAV_BRAND: 'Northstar Studio' }
  });

  runDeterministicTransmutation({ skeletonPath, compositionSpec, outputPath });
  const artifact = fs.readFileSync(outputPath, 'utf8');

  assert.doesNotMatch(artifact, /scalex/i, 'a generic build must not emit SCALEX copy or IDs from core defaults');
  assert.doesNotMatch(artifact, /#FFC552/i, 'a generic build must not emit SCALEX accent from core defaults');

  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('Transmuter: mutates only declared slots and preserves sparse slot positions', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'transmuter-slot-boundaries-'));
  const skeletonPath = path.join(tmpDir, 'skeleton.html');
  const outputPath = path.join(tmpDir, 'site', 'index.html');

  fs.writeFileSync(skeletonPath, `<!DOCTYPE html>
<html><head><title>Reference</title></head><body>
  <a class="nav-link" href="#reference-home"><span class="nav-link-text is-default">Reference home</span><span class="nav-link-text is-absolute">Reference home</span></a>
  <a class="nav-link" href="#reference-about"><span class="nav-link-text is-default">Reference about</span><span class="nav-link-text is-absolute">Reference about</span></a>
  <section class="hero"><a class="primary-btn" href="#reference-contact"><span class="primary-btn-text is-default">Reference CTA</span><span class="primary-btn-text is-absolute">Reference CTA</span></a></section>
  <h3 class="result-card-heading">Result one</h3><h3 class="result-card-heading">Result two</h3>
  <h3 class="value-item-title">Value one</h3><h3 class="value-item-title">Value two</h3>
  <h3 class="pricing-card-heading">Plan one</h3><h3 class="pricing-card-heading">Plan two</h3>
  <p class="newsletter-marquee-text">Reference newsletter</p><input type="submit" value="Reference submit">
  <form id="acilav-form" aria-label="acilav form"></form>
  <a class="footer-link" href="/style-guide"><span class="footer-link-text">Style Guide</span></a>
</body></html>`, 'utf8');

  const compositionSpec = createCompositionSpec({
    refSlug: 'neutral-reference',
    brandSpec: { brandName: 'Northstar Studio' },
    contentSlots: {
      NAV_LINK_HOME: 'Northstar home',
      HERO_CTA: 'Start project',
      RESULTS_CARD_2_TITLE: 'Second result',
      VALUE_2_TITLE: 'Second value',
      PLAN_2_NAME: 'Second plan',
      POPUP_TITLE: 'Incomplete popup'
    },
    options: { injectSeo: true }
  });

  runDeterministicTransmutation({ skeletonPath, compositionSpec, outputPath });
  const artifact = fs.readFileSync(outputPath, 'utf8');

  assert.match(artifact, /Northstar home/, 'declared nav slot should be applied');
  assert.match(artifact, /href="#reference-home"/, 'core must not invent a nav anchor');
  assert.match(artifact, /Reference about/, 'unspecified nav entries must remain unchanged');
  assert.match(artifact, /href="#reference-about"/, 'unspecified nav anchors must remain unchanged');
  assert.match(artifact, /Start project/, 'HERO_CTA should be used when NAV_CTA is absent');
  assert.match(artifact, /Result one[\s\S]*Second result/, 'second result slot must not shift into the first card');
  assert.match(artifact, /Value one[\s\S]*Second value/, 'second value slot must not shift into the first item');
  assert.match(artifact, /Plan one[\s\S]*Second plan/, 'second plan slot must not shift into the first plan');
  assert.match(artifact, /Reference newsletter/, 'newsletter copy without a slot must remain unchanged');
  assert.match(artifact, /Reference submit/, 'form submit copy without a slot must remain unchanged');
  assert.match(artifact, /acilav-form/, 'reference identifiers must not be rewritten by client-specific cleanup');
  assert.match(artifact, /Style Guide/, 'footer copy without a slot must remain unchanged');
  assert.match(artifact, /href="\/style-guide"/, 'footer href without a slot must remain unchanged');
  assert.doesNotMatch(artifact, /studio-dna-popup-modal/, 'incomplete popup configuration must not emit a popup');
  assert.doesNotMatch(artifact, /Empresa — Excelência e Alta Performance/, 'SEO defaults must not be injected without client SEO configuration');

  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('Transmuter: escapes slot content before emitting markup or attributes', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'transmuter-slot-escaping-'));
  const skeletonPath = path.join(tmpDir, 'skeleton.html');
  const outputPath = path.join(tmpDir, 'site', 'index.html');
  const malicious = '<img src=x onerror=alert(1)>';

  fs.writeFileSync(skeletonPath, '<!DOCTYPE html><html><head><title>Reference</title></head><body><div class="brand-logo-wrapper"></div><h1 class="hero-display-text-1"></h1><p>{SLOT_HERO_SUBTITLE}</p></body></html>', 'utf8');

  const compositionSpec = createCompositionSpec({
    refSlug: 'neutral-reference',
    brandSpec: { brandName: 'Northstar Studio' },
    contentSlots: { NAV_BRAND: malicious, HERO_DISPLAY_1: malicious, HERO_SUBTITLE: malicious }
  });

  runDeterministicTransmutation({ skeletonPath, compositionSpec, outputPath });
  const artifact = fs.readFileSync(outputPath, 'utf8');
  const $ = cheerio.load(artifact);

  assert.equal($('img').length, 0, 'slot content must not become executable markup');
  assert.match(artifact, /&lt;img src=x onerror=alert\(1\)&gt;/, 'slot content should be emitted as text');

  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('Transmuter: scopes hero CTA, sparse services, metadata, and brand styling to declared configuration', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'transmuter-scope-boundaries-'));
  const skeletonPath = path.join(tmpDir, 'skeleton.html');
  const outputPath = path.join(tmpDir, 'site', 'index.html');

  fs.writeFileSync(skeletonPath, `<!DOCTYPE html><html><head><title>Reference</title><meta name="description" content="Reference description"></head><body>
    <nav><a class="primary-btn"><span class="primary-btn-text is-default">Nav CTA</span><span class="primary-btn-text is-absolute">Nav CTA</span></a></nav>
    <section class="hero"><a class="primary-btn"><span class="primary-btn-text is-default">Hero CTA</span><span class="primary-btn-text is-absolute">Hero CTA</span></a></section>
    <div class="brand-logo-wrapper"></div>
    <article class="service-card"><h3 class="service-title">One</h3></article><article class="service-card"><h3 class="service-title">Two</h3></article><article class="service-card"><h3 class="service-title">Three</h3></article><article class="service-card"><h3 class="service-title">Four</h3></article><article class="service-card"><h3 class="service-title">Five</h3></article>
  </body></html>`, 'utf8');

  const compositionSpec = createCompositionSpec({
    refSlug: 'neutral-reference',
    brandSpec: {
      brandName: 'Northstar',
      meta: { description: 'Quoted \"description\" <must remain text>' }
    },
    contentSlots: {
      NAV_BRAND: 'Northstar',
      NAV_CTA: 'Nav only',
      HERO_CTA: 'Hero only',
      SERVICE_1_TITLE: 'Configured one',
      POPUP_TITLE: 'Configured popup',
      POPUP_SUBTITLE: 'Configured popup subtitle',
      POPUP_CTA: 'Configured popup CTA'
    }
  });

  runDeterministicTransmutation({ skeletonPath, compositionSpec, outputPath });
  const artifact = fs.readFileSync(outputPath, 'utf8');
  const $ = cheerio.load(artifact);

  assert.equal($('nav .primary-btn-text.is-default').text(), 'Nav only', 'NAV_CTA must update only nav CTA');
  assert.equal($('.hero .primary-btn-text.is-default').text(), 'Hero only', 'HERO_CTA must update the hero CTA');
  assert.equal($('.service-card').eq(4).find('.service-title').text(), 'Five', 'an undeclared fifth service must not reuse service one');
  assert.equal($('meta[name="description"]').attr('content'), 'Quoted "description" <must remain text>', 'metadata must preserve text without creating attributes');
  assert.doesNotMatch(artifact, /font-family: Anton|color: #0B0D11/, 'generic brand output must not impose reference typography or palette');
  assert.doesNotMatch(artifact, /#121620/, 'activated popup must not impose a reference surface color');

  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('Transmuter: keeps nav CTA distinct when navigation is nested inside hero', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'transmuter-cta-scope-'));
  const skeletonPath = path.join(tmpDir, 'skeleton.html');
  const outputPath = path.join(tmpDir, 'site', 'index.html');

  fs.writeFileSync(skeletonPath, '<!DOCTYPE html><html><head><title>Reference</title></head><body><section id="hero"><nav><a class="primary-btn"><span class="primary-btn-text is-default">Nav</span><span class="primary-btn-text is-absolute">Nav</span></a></nav><div class="hero-action"><a class="primary-btn"><span class="primary-btn-text is-default">Hero</span><span class="primary-btn-text is-absolute">Hero</span></a></div></section></body></html>', 'utf8');

  const compositionSpec = createCompositionSpec({
    refSlug: 'neutral-reference',
    brandSpec: { brandName: 'Northstar' },
    contentSlots: { NAV_CTA: 'Navigation CTA', HERO_CTA: 'Hero CTA' }
  });

  runDeterministicTransmutation({ skeletonPath, compositionSpec, outputPath });
  const $ = cheerio.load(fs.readFileSync(outputPath, 'utf8'));

  assert.equal($('nav .primary-btn-text.is-default').text(), 'Navigation CTA');
  assert.equal($('.hero-action .primary-btn-text.is-default').text(), 'Hero CTA');

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
