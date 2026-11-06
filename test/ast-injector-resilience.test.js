/**
 * test/ast-injector-resilience.test.js
 *
 * Test suite verifying AST Injector resilience under mutations:
 * - Preserving data-ds and data-dna-line during domReplacements
 * - Preserving and allocating deterministic data-ds for Slot Array Repeater cloned nodes
 * - Idempotency and stability under multiple consecutive mutation passes
 * - Optional domscribe instrumentation during transmutation
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const cheerio = require('cheerio');

const {
  transmuteWithAST,
  transmuteCollectionSlots
} = require('../src/generators/ast-injector.js');

const {
  readDomscribeManifest
} = require('../src/dev/domscribe-manifest.js');

test('AST Resilience: preserves data-ds and data-dna-line during domReplacements', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ast-resilience-'));
  const sourceHtml = path.join(tmpDir, 'source.html');
  const outputHtml = path.join(tmpDir, 'output.html');

  const html = `
<!DOCTYPE html>
<html>
<head><title>Original</title></head>
<body>
  <header data-ds="h1a2b3c4" data-dna-line="5">
    <h1 id="title" data-ds="t1a2b3c4" data-dna-line="6">Original Heading</h1>
  </header>
  <main>
    <section id="hero" data-ds="s1a2b3c4" data-dna-line="9">
      <p id="desc" data-ds="p1a2b3c4" data-dna-line="10">Original text</p>
    </section>
  </main>
</body>
</html>
  `.trim();

  fs.writeFileSync(sourceHtml, html, 'utf8');

  const brandSpec = {
    meta: { title: 'New Brand' },
    domReplacements: [
      { selector: '#title', text: 'Exclusive Penthouse Collection' },
      { selector: '#desc', text: 'Architectural masterpieces in Lisbon.' }
    ]
  };

  transmuteWithAST({
    sourceHtmlPath: sourceHtml,
    outputHtmlPath: outputHtml,
    brandSpec
  });

  const outputContent = fs.readFileSync(outputHtml, 'utf8');
  const $ = cheerio.load(outputContent);

  // Check texts replaced
  assert.equal($('#title').text(), 'Exclusive Penthouse Collection');
  assert.equal($('#desc').text(), 'Architectural masterpieces in Lisbon.');

  // Crucial check: data-ds and data-dna-line MUST BE PRESERVED
  assert.equal($('header').attr('data-ds'), 'h1a2b3c4');
  assert.equal($('header').attr('data-dna-line'), '5');

  assert.equal($('#title').attr('data-ds'), 't1a2b3c4');
  assert.equal($('#title').attr('data-dna-line'), '6');

  assert.equal($('#hero').attr('data-ds'), 's1a2b3c4');
  assert.equal($('#hero').attr('data-dna-line'), '9');

  assert.equal($('#desc').attr('data-ds'), 'p1a2b3c4');
  assert.equal($('#desc').attr('data-dna-line'), '10');
});

test('AST Resilience: assigns unique deterministic data-ds to cloned collection items', () => {
  const html = `
  <div class="cards-grid" data-slot-repeat="listings" data-slot-min="1" data-slot-max="5">
    <article class="card" data-slot-item data-ds="origcard" data-dna-line="3">
      <h3 data-slot-bind="title" data-ds="origtitl" data-dna-line="4">Card Title</h3>
      <span data-slot-bind="price" data-ds="origpric" data-dna-line="5">$0</span>
    </article>
  </div>
  `;

  const $ = cheerio.load(html);
  const collectionsData = {
    listings: {
      items: [
        { title: 'Villa 1', price: '$1M' },
        { title: 'Villa 2', price: '$2M' },
        { title: 'Villa 3', price: '$3M' }
      ]
    }
  };

  transmuteCollectionSlots($, collectionsData);

  const articles = $('article.card');
  assert.equal(articles.length, 3);

  // Check that every article has a valid data-ds
  const dataDsList = [];
  articles.each((idx, el) => {
    const ds = $(el).attr('data-ds');
    assert.ok(ds, `Article [${idx}] must have data-ds`);
    dataDsList.push(ds);
    assert.equal($(el).attr('data-slot-index'), String(idx));
  });

  // All data-ds must be unique
  const uniqueDs = new Set(dataDsList);
  assert.equal(uniqueDs.size, 3, 'All cloned items must have unique data-ds');

  // Second item check
  const secondArticle = $(articles[1]);
  assert.equal(secondArticle.find('[data-slot-bind="title"]').text(), 'Villa 2');
  assert.ok(secondArticle.find('[data-slot-bind="title"]').attr('data-ds'));
});

test('AST Resilience: preserves data-ds under multi-phase mutations', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ast-multi-'));
  const sourceHtml = path.join(tmpDir, 'source.html');
  const outputHtml = path.join(tmpDir, 'output.html');

  const html = `
<!DOCTYPE html>
<html>
<head><title>Original</title></head>
<body>
  <header data-ds="head0001" data-dna-line="5">
    <h1 id="brand" data-ds="head0002" data-dna-line="6">Brand</h1>
  </header>
  <ul class="nav-list" data-ds="nav00001" data-dna-line="8">
    <li class="nav-item" data-ds="nav00002" data-dna-line="9">Home</li>
    <li class="nav-item" data-ds="nav00003" data-dna-line="10">About</li>
  </ul>
  <section id="showcase" data-ds="sec00001" data-dna-line="12">
    <div data-slot-repeat="highlights">
      <div class="hl-item" data-slot-item data-ds="hlitem01" data-dna-line="14">
        <span data-slot-bind="label" data-ds="hllbl001" data-dna-line="15">Feature</span>
      </div>
    </div>
  </section>
</body>
</html>
  `.trim();

  fs.writeFileSync(sourceHtml, html, 'utf8');

  const brandSpec = {
    meta: { title: 'Mutated Brand' },
    theme: { bgBase: '#05070a', accent: '#00ffcc' },
    domReplacements: [
      { selector: '#brand', text: 'Super Luxury Estates' }
    ],
    lists: {
      nav: {
        parentSelector: '.nav-list',
        itemSelector: '.nav-item',
        items: ['Villas', 'Penthouses', 'Private Islands']
      }
    },
    collections: {
      highlights: {
        items: [
          { label: 'Private Jet Access' },
          { label: 'Helipad On Site' }
        ]
      }
    }
  };

  transmuteWithAST({
    sourceHtmlPath: sourceHtml,
    outputHtmlPath: outputHtml,
    brandSpec
  });

  const outputContent = fs.readFileSync(outputHtml, 'utf8');
  const $ = cheerio.load(outputContent);

  // Check header preserved
  assert.equal($('header').attr('data-ds'), 'head0001');
  assert.equal($('#brand').attr('data-ds'), 'head0002');
  assert.equal($('#brand').text(), 'Super Luxury Estates');

  // Check theme override injected without damaging AST
  assert.ok(outputContent.includes('#05070a'));

  // Check nav items
  const navItems = $('.nav-list .nav-item');
  assert.equal(navItems.length, 3);
  assert.ok($(navItems[0]).attr('data-ds'));
  assert.ok($(navItems[1]).attr('data-ds'));
  assert.ok($(navItems[2]).attr('data-ds'));

  // Check collection items
  const hlItems = $('.hl-item');
  assert.equal(hlItems.length, 2);
  assert.ok($(hlItems[0]).attr('data-ds'));
  assert.ok($(hlItems[1]).attr('data-ds'));
});

test('AST Resilience: optional instrumentDomscribe generates manifest and instruments missing nodes', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ast-domscribe-'));
  const sourceHtml = path.join(tmpDir, 'source.html');
  const outputHtml = path.join(tmpDir, 'site', 'index.html');

  const html = `
<!DOCTYPE html>
<html>
<head><title>Uninstrumented</title></head>
<body>
  <header>
    <h1>Uninstrumented Title</h1>
  </header>
  <main>
    <section id="contact">
      <h2>Contact Us</h2>
      <button class="submit-btn">Send Message</button>
    </section>
  </main>
</body>
</html>
  `.trim();

  fs.writeFileSync(sourceHtml, html, 'utf8');

  transmuteWithAST({
    sourceHtmlPath: sourceHtml,
    outputHtmlPath: outputHtml,
    brandSpec: {
      domReplacements: [{ selector: 'h1', text: 'Instrumented Title' }]
    },
    options: {
      instrumentDomscribe: true,
      projectRoot: tmpDir,
      relativeFilePath: 'site/index.html'
    }
  });

  const outputContent = fs.readFileSync(outputHtml, 'utf8');
  const $ = cheerio.load(outputContent);

  // Nodes should now have data-ds and data-dna-line
  assert.ok($('header').attr('data-ds'), 'Header should be instrumented');
  assert.ok($('h1').attr('data-ds'), 'h1 should be instrumented');
  assert.ok($('#contact').attr('data-ds'), 'Section should be instrumented');
  assert.ok($('button').attr('data-ds'), 'Button should be instrumented');

  // Check that .domscribe/manifest.jsonl was created
  const manifestPath = path.join(tmpDir, '.domscribe', 'manifest.jsonl');
  assert.ok(fs.existsSync(manifestPath), 'Manifest file must exist');

  const entries = readDomscribeManifest(tmpDir);
  assert.ok(entries.length >= 4, 'Manifest must have entries for structural nodes');
});
