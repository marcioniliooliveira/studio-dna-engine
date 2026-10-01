const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const { isAllowedAssetUrl, isModernAssetExtension, findPreviewFrameTarget, localizeImportMap } = require('../src/core/cloner');
const { generateAssetManifest } = require('../src/generators/asset-manifest-generator');

test('Smart CDN Whitelisting allows trusted media CDNs and blocks trackers', () => {
  const targetHost = 'example.com';

  // Allowed target host assets
  assert.equal(isAllowedAssetUrl('https://example.com/assets/main.css', targetHost), true);
  assert.equal(isAllowedAssetUrl('https://example.com/models/car.glb', targetHost), true);

  // Allowed trusted CDNs for 3D, WASM, and media
  assert.equal(isAllowedAssetUrl('https://cdn.jsdelivr.net/gh/user/repo@v1/model.glb', targetHost), true);
  assert.equal(isAllowedAssetUrl('https://unpkg.com/three@0.186.0/build/three.module.js', targetHost), true);
  assert.equal(isAllowedAssetUrl('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/photo.jpg', targetHost), true);
  assert.equal(isAllowedAssetUrl('https://assets.webflow.com/img/hero.webp', targetHost), true);
  assert.equal(isAllowedAssetUrl('https://www.datocms-assets.com/223669/1786435410-share.webp', targetHost), true);

  // Blocked telemetry & trackers
  assert.equal(isAllowedAssetUrl('https://www.google-analytics.com/analytics.js', targetHost), false);
  assert.equal(isAllowedAssetUrl('https://www.googletagmanager.com/gtm.js', targetHost), false);
  assert.equal(isAllowedAssetUrl('https://static.hotjar.com/c/hotjar-123.js', targetHost), false);
  assert.equal(isAllowedAssetUrl('https://connect.facebook.net/en_US/fbevents.js', targetHost), false);
});

test('Modern Asset Extensions recognize 3D models, shaders, WASM and audio', () => {
  const modernExtensions = ['.glb', '.gltf', '.bin', '.wasm', '.hdr', '.exr', '.obj', '.fbx', '.usdz', '.wav', '.mp3'];
  for (const ext of modernExtensions) {
    assert.equal(isModernAssetExtension(ext), true, `Extensão ${ext} deve ser reconhecida como asset moderno`);
  }

  // Non-assets
  assert.equal(isModernAssetExtension('.html'), false);
  assert.equal(isModernAssetExtension('.php'), false);
});

test('Asset Manifest Generator catalogs GLB 3D models and assigns clean strategy', () => {
  const tmpDir = path.join(__dirname, 'tmp-manifest-test');
  fs.mkdirSync(path.join(tmpDir, 'assets', 'models'), { recursive: true });

  const dummyGlb = path.join(tmpDir, 'assets', 'models', 'product.glb');
  fs.writeFileSync(dummyGlb, 'glTF dummy content');

  try {
    const manifest = generateAssetManifest({ siteDir: tmpDir });
    const modelEntry = manifest.replacements.find(r => r.id.includes('product'));
    assert.ok(modelEntry, 'Deve catalogar o arquivo .glb no manifesto');
    assert.equal(modelEntry.category, 'THREE_3D_MODEL_GLB');
    assert.ok(modelEntry.recommendedStrategy.includes('3D'));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('localizeImportMap replaces external CDN URLs in importmaps with local asset paths', () => {
  const html = `<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.js"}}</script>`;
  const assetMap = new Map([
    ['https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.js', './assets/vendor/three.module.js']
  ]);
  const localized = localizeImportMap(html, assetMap);
  assert.ok(localized.includes('"three": "./assets/vendor/three.module.js"'));
});

