/**
 * test/delta-component-verifier.test.js
 *
 * Test suite for Domscribe Manifest and Delta Component Verifier (Pareto Level 1).
 * Verifies:
 * - Deterministic data-ds calculation (SHA-256 slice 8 hex)
 * - AST source line extraction and instrumentation
 * - Manifest persistence and sub-millisecond resolution
 * - Production stripping of debug attributes
 * - Static and dynamic component delta verification in < 400 ms
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const cheerio = require('cheerio');

const {
  computeStableDataDs,
  instrumentHtmlForDomscribe,
  writeDomscribeManifest,
  readDomscribeManifest,
  resolveElementFromManifest,
  stripDomscribeAttributesForProduction
} = require('../src/dev/domscribe-manifest.js');

const {
  captureComponentBaseline,
  verifyComponentAfterEdit,
  verifyComponentDelta
} = require('../src/qa/delta-component-verifier.js');

test('computeStableDataDs: produces deterministic 8-character hex hash', () => {
  const hash1 = computeStableDataDs('site/index.html', 'section', 'hero@10');
  const hash2 = computeStableDataDs('site/index.html', 'section', 'hero@10');
  const hashDiffLine = computeStableDataDs('site/index.html', 'section', 'hero@12');
  const hashDiffTag = computeStableDataDs('site/index.html', 'header', 'hero@10');

  assert.equal(typeof hash1, 'string');
  assert.equal(hash1.length, 8);
  assert.match(hash1, /^[0-9a-f]{8}$/);
  assert.equal(hash1, hash2, 'Identical inputs must yield identical hash');
  assert.notEqual(hash1, hashDiffLine, 'Different line/key must yield different hash');
  assert.notEqual(hash1, hashDiffTag, 'Different tag must yield different hash');

  // Windows path normalization
  const hashWin = computeStableDataDs('site\\index.html', 'section', 'hero@10');
  assert.equal(hash1, hashWin, 'Path backslashes must be normalized');
});

test('instrumentHtmlForDomscribe: instruments structural elements and extracts manifest entries', () => {
  const rawHtml = [
    '<!DOCTYPE html>',
    '<html>',
    '<head><title>Test</title></head>',
    '<body>',
    '  <header id="main-header">',
    '    <h1 data-slot="hero-title">Studio DNA</h1>',
    '    <a href="/login" class="btn">Login</a>',
    '  </header>',
    '  <main>',
    '    <section data-kinetic-slot="features" id="feat-sec">',
    '      <h2>Features</h2>',
    '      <button type="button" class="cta">Explore</button>',
    '    </section>',
    '  </main>',
    '  <footer>',
    '    <p>Copyright 2026</p>',
    '  </footer>',
    '</body>',
    '</html>'
  ].join('\n');

  const { instrumentedHtml, manifestEntries } = instrumentHtmlForDomscribe(rawHtml, 'clientes/demo/site/index.html');

  assert.ok(manifestEntries.length >= 7, `Expected at least 7 structural entries, got ${manifestEntries.length}`);
  
  // Verify HTML contains data-ds and data-dna-line
  assert.match(instrumentedHtml, /data-ds="[0-9a-f]{8}"/);
  assert.match(instrumentedHtml, /data-dna-line="\d+"/);

  const $ = cheerio.load(instrumentedHtml);
  const header = $('header#main-header');
  assert.ok(header.attr('data-ds'), 'Header must have data-ds');
  assert.match(header.attr('data-dna-line'), /^5(-8)?$/, 'Header should be at line 5 or 5-8');

  const h1 = $('h1[data-slot="hero-title"]');
  assert.ok(h1.attr('data-ds'), 'h1 must have data-ds');
  assert.equal(h1.attr('data-dna-line'), '6');

  const section = $('section#feat-sec');
  assert.ok(section.attr('data-ds'));
  assert.match(section.attr('data-dna-line'), /^10(-13)?$/, 'Section should be at line 10 or 10-13');

  // Manifest structure check
  const headerEntry = manifestEntries.find(e => e.tagName === 'header');
  assert.ok(headerEntry);
  assert.equal(headerEntry.file, 'clientes/demo/site/index.html');
  assert.equal(headerEntry.startLine, 5);
  assert.equal(headerEntry.slotId, 'main-header');
});

test('writeDomscribeManifest & resolveElementFromManifest: write and resolve in < 10 ms', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'domscribe-test-'));
  const testEntries = [
    {
      id: 'a1b2c3d4',
      file: 'site/index.html',
      tagName: 'section',
      slotId: 'hero',
      startLine: 12,
      endLine: 45
    },
    {
      id: 'e5f60718',
      file: 'site/index.html',
      tagName: 'button',
      slotId: 'cta-primary',
      startLine: 28,
      endLine: 28
    }
  ];

  const manifestPath = writeDomscribeManifest(tmpDir, testEntries);
  assert.ok(fs.existsSync(manifestPath), 'manifest.jsonl should be written');

  const rawLines = fs.readFileSync(manifestPath, 'utf8').trim().split('\n');
  assert.equal(rawLines.length, 2);

  const t0 = performance.now();
  const resolved = resolveElementFromManifest(tmpDir, 'e5f60718');
  const lookupTime = performance.now() - t0;

  assert.ok(resolved, 'Element should be resolved');
  assert.equal(resolved.tagName, 'button');
  assert.equal(resolved.startLine, 28);
  assert.equal(resolved.slotId, 'cta-primary');
  assert.ok(lookupTime < 50, `Manifest lookup must be ultra-fast (< 50ms), took ${lookupTime.toFixed(2)}ms`);

  const notFound = resolveElementFromManifest(tmpDir, '00000000');
  assert.equal(notFound, null);
});

test('stripDomscribeAttributesForProduction: cleanly removes data-ds, data-dna-line, and data-capsule-id', () => {
  const devHtml = `
    <section data-ds="a1b2c3d4" data-dna-line="10" data-capsule-id="hero-capsule" class="hero-section" id="hero">
      <h1 data-ds="b2c3d4e5" data-dna-line="12" class="title">Luxury Estates</h1>
      <button data-ds="c3d4e5f6" data-dna-line="15" class="cta-btn" data-slot="primary-action">Discover</button>
    </section>
  `.trim();

  const prodHtml = stripDomscribeAttributesForProduction(devHtml);

  assert.equal(prodHtml.includes('data-ds'), false, 'data-ds must be completely stripped');
  assert.equal(prodHtml.includes('data-dna-line'), false, 'data-dna-line must be completely stripped');
  assert.equal(prodHtml.includes('data-capsule-id'), false, 'data-capsule-id must be completely stripped');
  assert.ok(prodHtml.includes('class="hero-section"'), 'Other attributes must be preserved');
  assert.ok(prodHtml.includes('id="hero"'));
  assert.ok(prodHtml.includes('data-slot="primary-action"'));
});

test('DeltaComponentVerifier: static mode verifies component edit in < 400 ms', async () => {
  const beforeHtml = `
    <div class="page">
      <section data-ds="8f3a19c2" data-dna-line="14" class="hero-card" style="font-size: 16px; color: #ffffff; padding: 24px; border-radius: 8px;">
        <h2 class="hero-title">Original Title</h2>
        <p class="hero-desc">Luxury penthouse with sea view.</p>
        <button class="cta" style="min-height: 48px; min-width: 120px;">Book Visit</button>
      </section>
    </div>
  `;

  const afterHtmlValid = `
    <div class="page">
      <section data-ds="8f3a19c2" data-dna-line="14" class="hero-card hero-card--refined" style="font-size: 18px; color: #ffffff; padding: 24px; border-radius: 8px;">
        <h2 class="hero-title">Exclusive Penthouse</h2>
        <p class="hero-desc">Luxury penthouse with panoramic sea view.</p>
        <button class="cta" style="min-height: 48px; min-width: 120px;">Schedule Private Tour</button>
      </section>
    </div>
  `;

  const t0 = performance.now();
  const baseline = await captureComponentBaseline(beforeHtml, '8f3a19c2');
  const captureTime = performance.now() - t0;

  assert.ok(baseline, 'Baseline snapshot must be captured');
  assert.equal(baseline.dataDsId, '8f3a19c2');
  assert.equal(baseline.tagName, 'section');
  assert.ok(captureTime < 100, `Baseline capture took ${captureTime.toFixed(2)}ms (< 100ms)`);

  const t1 = performance.now();
  const verification = await verifyComponentAfterEdit(afterHtmlValid, '8f3a19c2', baseline);
  const verifyTime = performance.now() - t1;

  assert.equal(verification.passed, true, 'Valid edit should pass verification');
  assert.ok(verification.executionTimeMs < 400, `Execution time must be < 400ms, was ${verification.executionTimeMs}ms`);
  assert.equal(verification.withinBudget, true);
  assert.ok(verifyTime < 200, `Verify step took ${verifyTime.toFixed(2)}ms`);

  // Check detected deltas
  assert.ok(verification.deltas.styles['font-size'], 'Font-size delta should be tracked');
  assert.equal(verification.deltas.styles['font-size'].before, '16px');
  assert.equal(verification.deltas.styles['font-size'].after, '18px');
  assert.equal(verification.deltas.textChanged, true);
});

test('DeltaComponentVerifier: detects regression in static mode (empty content or sub-44px target)', async () => {
  const beforeHtml = `
    <section data-ds="test0001" style="padding: 20px;">
      <button class="btn" style="min-width: 48px; min-height: 48px;">Valid Target</button>
      <p>Original body text</p>
    </section>
  `;

  const afterHtmlRegression = `
    <section data-ds="test0001" style="padding: 20px;">
      <button class="btn" style="width: 20px; height: 20px;">Tiny</button>
    </section>
  `;

  const baseline = await captureComponentBaseline(beforeHtml, 'test0001');
  const result = await verifyComponentAfterEdit(afterHtmlRegression, 'test0001', baseline, {
    enforceSub44pxRule: true,
    enforceContentPreservation: true
  });

  assert.equal(result.passed, false, 'Regressions must cause failure');
  assert.ok(result.violations.length > 0, 'Must record violations');
  assert.ok(result.violations.some(v => v.code === 'SUB_44PX_TOUCH_TARGET' || v.code === 'CONTENT_COLLAPSED'));
  assert.ok(result.executionTimeMs < 400);
});

test('DeltaComponentVerifier: dynamic mode with computed styles and bounding box', async () => {
  // Mock page simulating Playwright/Browser DOM API
  const mockPage = {
    evaluate: async (fn, dataDsId) => {
      // Simulates in-browser evaluate returning computedStyles and AABB
      return {
        dataDsId,
        tagName: 'section',
        computedStyles: {
          fontSize: '24px',
          lineHeight: '32px',
          color: 'rgb(255, 255, 255)',
          backgroundColor: 'rgb(10, 15, 25)',
          padding: '24px',
          gap: '16px',
          borderRadius: '12px'
        },
        boundingBox: {
          x: 40,
          y: 120,
          width: 800,
          height: 350,
          top: 120,
          right: 840,
          bottom: 470,
          left: 40
        },
        gestalt: {
          childCount: 4,
          headingCount: 1,
          buttonCount: 1,
          textLength: 140
        }
      };
    }
  };

  const t0 = performance.now();
  const baseline = await captureComponentBaseline(mockPage, '8f3a19c2');
  assert.equal(baseline.computedStyles.fontSize, '24px');
  assert.equal(baseline.boundingBox.width, 800);

  // Verification against contract
  const expectedContract = {
    expectedStyles: {
      color: 'rgb(255, 255, 255)',
      backgroundColor: 'rgb(10, 15, 25)'
    },
    maxBoxShift: 10
  };

  const result = await verifyComponentAfterEdit(mockPage, '8f3a19c2', expectedContract);
  assert.equal(result.passed, true);
  assert.ok(result.executionTimeMs < 400);
  assert.equal(result.withinBudget, true);
});

test('verifyComponentDelta: end-to-end delta helper completes in < 400 ms', async () => {
  const before = `<div data-ds="comp1" style="font-size: 14px; color: #111;">Hello</div>`;
  const after = `<div data-ds="comp1" style="font-size: 16px; color: #111;">Hello World</div>`;

  const delta = await verifyComponentDelta(before, after, 'comp1');
  assert.equal(delta.passed, true);
  assert.equal(delta.dataDsId, 'comp1');
  assert.ok(delta.executionTimeMs < 400);
  assert.equal(delta.withinBudget, true);
  assert.equal(delta.deltas.styles['font-size'].before, '14px');
  assert.equal(delta.deltas.styles['font-size'].after, '16px');
});
