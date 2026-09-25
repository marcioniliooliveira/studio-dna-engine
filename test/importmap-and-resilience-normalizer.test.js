const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { localizeImportMap } = require('../src/core/cloner');
const { UniversalAssetNormalizer } = require('../src/pro/universal-asset-normalizer');

test('ImportMap Normalization: prefix mapping preserves exact base folder without subfolder drift', () => {
  const html = `
  <script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
    }
  }
  </script>
  `;

  const assetMap = new Map();
  assetMap.set(
    'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
    './assets/vendor/cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js'
  );
  assetMap.set(
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js',
    './assets/vendor/cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js'
  );

  const localized = localizeImportMap(html, assetMap);
  const jsonMatch = localized.match(/<script type="importmap">([\s\S]*?)<\/script>/);
  assert.ok(jsonMatch, 'Importmap should be present');

  const parsed = JSON.parse(jsonMatch[1].trim());
  assert.equal(
    parsed.imports['three'],
    './assets/vendor/cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js'
  );

  // CRITICAL TEST: three/addons/ MUST resolve to .../examples/jsm/, NEVER .../examples/jsm/postprocessing/
  assert.equal(
    parsed.imports['three/addons/'],
    './assets/vendor/cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/',
    'three/addons/ should map to the base directory of the remote URL, not the subfolder of a downloaded file'
  );
});

test('Universal Resilience Polyfills: includes canvas offscreen and safe element fallbacks', () => {
  const polyfills = UniversalAssetNormalizer.getUniversalResiliencePolyfills();
  assert.ok(polyfills.includes('transferControlToOffscreen'), 'Polyfills must handle transferControlToOffscreen');
  assert.ok(polyfills.includes('universal-resilience-polyfills'), 'Polyfill ID must be present');
  assert.ok(polyfills.includes('ldCanvas'), 'Polyfill must guard missing ldCanvas');
});

test('Universal Normalization: ensures background videos have autoplay, muted, loop and playsinline', () => {
  const normalizer = new UniversalAssetNormalizer({ siteDir: '.' });
  const rawHtml = `<video class="bg-vid" src="https://example.com/ambient.mp4"></video>`;
  const normalized = normalizer.ensureVideoAutoplayAttributes(rawHtml);
  assert.ok(normalized.includes('autoplay'), 'Video must have autoplay');
  assert.ok(normalized.includes('muted'), 'Video must have muted');
  assert.ok(normalized.includes('loop'), 'Video must have loop');
  assert.ok(normalized.includes('playsinline'), 'Video must have playsinline');
});

test('Universal Normalization: auto-hydrates iframe data-src into src when src is empty', () => {
  const normalizer = new UniversalAssetNormalizer({ siteDir: '.' });
  const rawHtml = `<iframe id="galBook" data-src="https://example.com/gallery.html" loading="lazy"></iframe>`;
  const normalized = normalizer.hydrateLazyIframes(rawHtml);
  assert.ok(normalized.includes('src="https://example.com/gallery.html"'), 'Iframe src must be hydrated from data-src');
});
