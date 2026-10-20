const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');

const {
  transmuteWithAST,
  transmuteCollectionSlots,
  validateAntiSlop
} = require('../src/generators/ast-injector.js');

test('Slot Array Repeater: dynamically expands archetype node for collections and binds fields', () => {
  const html = `
  <div class="properties-wrapper" data-slot-repeat="properties" data-slot-min="1" data-slot-max="10">
    <div class="property-card" data-slot-item>
      <img data-slot-attr-src="image" data-slot-attr-alt="title" src="placeholder.jpg" alt="Property">
      <h3 data-slot-bind="title">Archetype Title</h3>
      <span class="price" data-slot-bind="price">$0.00</span>
      <p data-slot-bind="description">Description goes here</p>
      <a data-slot-attr-href="link" href="#">Details</a>
    </div>
  </div>
  `;

  const $ = cheerio.load(html);
  const collectionsData = {
    properties: {
      items: [
        {
          title: 'Villa Paradiso',
          price: '€ 3.200.000',
          description: 'Panoramic sea views with private infinity pool',
          image: 'assets/villa-1.webp',
          link: '/villas/paradiso'
        },
        {
          title: 'Penthouse Luminar',
          price: '€ 1.850.000',
          description: 'Duplex penthouse overlooking historical center',
          image: 'assets/penthouse-2.webp',
          link: '/penthouses/luminar'
        },
        {
          title: 'Chalet Alpine',
          price: '€ 4.500.000',
          description: 'Ski-in ski-out luxury chalet in Swiss Alps',
          image: 'assets/chalet-3.webp',
          link: '/chalets/alpine'
        }
      ]
    }
  };

  transmuteCollectionSlots($, collectionsData);

  const container = $('[data-slot-repeat="properties"]');
  assert.equal(container.attr('data-rendered-count'), '3');

  const cards = container.find('.property-card');
  assert.equal(cards.length, 3, 'Must render exactly 3 property cards');

  // Verify first card
  const firstCard = $(cards[0]);
  assert.equal(firstCard.attr('data-slot-index'), '0');
  assert.equal(firstCard.find('[data-slot-bind="title"]').text(), 'Villa Paradiso');
  assert.equal(firstCard.find('[data-slot-bind="price"]').text(), '€ 3.200.000');
  assert.equal(firstCard.find('img').attr('src'), 'assets/villa-1.webp');
  assert.equal(firstCard.find('img').attr('alt'), 'Villa Paradiso');
  assert.equal(firstCard.find('a').attr('href'), '/villas/paradiso');

  // Verify third card
  const thirdCard = $(cards[2]);
  assert.equal(thirdCard.attr('data-slot-index'), '2');
  assert.equal(thirdCard.find('[data-slot-bind="title"]').text(), 'Chalet Alpine');
});

test('Slot Array Repeater: clamps items to data-slot-max boundary', () => {
  const html = `
  <div data-slot-repeat="highlights" data-slot-max="2">
    <div class="item" data-slot-item>
      <span data-slot-bind="label">Label</span>
    </div>
  </div>
  `;

  const $ = cheerio.load(html);
  const collectionsData = {
    highlights: {
      items: [
        { label: 'Item 1' },
        { label: 'Item 2' },
        { label: 'Item 3 (Should be clamped)' },
        { label: 'Item 4 (Should be clamped)' }
      ]
    }
  };

  transmuteCollectionSlots($, collectionsData);

  const renderedItems = $('[data-slot-repeat="highlights"] .item');
  assert.equal(renderedItems.length, 2, 'Should be clamped to max 2 items');
  assert.equal($('[data-slot-repeat="highlights"]').attr('data-rendered-count'), '2');
});

test('Slot Array Repeater: blocks AI slop in collection items', () => {
  const html = `
  <div data-slot-repeat="features">
    <div class="card" data-slot-item>
      <span data-slot-bind="name">Feature</span>
    </div>
  </div>
  `;

  const $ = cheerio.load(html);
  const collectionsData = {
    features: {
      items: [
        { name: 'Chunk cognitivo para navegação' } // Banned keyword!
      ]
    }
  };

  assert.throws(
    () => transmuteCollectionSlots($, collectionsData, { enforceAntiSlop: true }),
    /Anti-Slop Guard/
  );
});

test('AST Transmuter: dynamically expands lists when item count exceeds template elements', () => {
  const tmpDir = path.join(__dirname, '..', '.staging', 'test-ast-repeat');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const inputHtmlPath = path.join(tmpDir, 'template.html');
  const outputHtmlPath = path.join(tmpDir, 'transmuted.html');

  // Template has only 2 list items
  const sourceHtml = `<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body>
  <ul class="nav-menu">
    <li class="nav-item">Initial 1</li>
    <li class="nav-item">Initial 2</li>
  </ul>
</body>
</html>`;

  fs.writeFileSync(inputHtmlPath, sourceHtml, 'utf8');

  // Client requests 4 items (should clone and expand to 4 without dropping items)
  transmuteWithAST({
    sourceHtmlPath: inputHtmlPath,
    outputHtmlPath,
    brandSpec: {
      lists: {
        navigation: {
          parentSelector: '.nav-menu',
          itemSelector: '.nav-item',
          items: ['Home', 'Properties', 'Architecture', 'Contact']
        }
      }
    }
  });

  const outputHtml = fs.readFileSync(outputHtmlPath, 'utf8');
  const $ = cheerio.load(outputHtml);

  const items = $('.nav-menu .nav-item');
  assert.equal(items.length, 4, 'Must expand to 4 items without dropping elements');
  assert.equal($(items[0]).text(), 'Home');
  assert.equal($(items[1]).text(), 'Properties');
  assert.equal($(items[2]).text(), 'Architecture');
  assert.equal($(items[3]).text(), 'Contact');

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('AST Transmuter: prunes excess list items when client specifies fewer items than template', () => {
  const tmpDir = path.join(__dirname, '..', '.staging', 'test-ast-prune');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const inputHtmlPath = path.join(tmpDir, 'template.html');
  const outputHtmlPath = path.join(tmpDir, 'transmuted.html');

  // Template has 4 list items
  const sourceHtml = `<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body>
  <div class="metrics">
    <div class="metric-card">A</div>
    <div class="metric-card">B</div>
    <div class="metric-card">C</div>
    <div class="metric-card">D</div>
  </div>
</body>
</html>`;

  fs.writeFileSync(inputHtmlPath, sourceHtml, 'utf8');

  // Client specifies only 2 items
  transmuteWithAST({
    sourceHtmlPath: inputHtmlPath,
    outputHtmlPath,
    brandSpec: {
      lists: {
        metrics: {
          parentSelector: '.metrics',
          itemSelector: '.metric-card',
          items: ['99.9% Uptime', '<500ms Latency']
        }
      }
    }
  });

  const outputHtml = fs.readFileSync(outputHtmlPath, 'utf8');
  const $ = cheerio.load(outputHtml);

  const cards = $('.metrics .metric-card');
  assert.equal(cards.length, 2, 'Must prune excess elements down to 2 items');
  assert.equal($(cards[0]).text(), '99.9% Uptime');
  assert.equal($(cards[1]).text(), '<500ms Latency');

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true });
});
