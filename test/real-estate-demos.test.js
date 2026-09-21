const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const clients = [
  'integrii-imoveis',
  'silvio-iwata-imobiliaria',
];

const requiredFiles = [
  'content-slots.json',
  'composition-spec.json',
  'site/index.html',
  'site/styles.css',
  'site/interaction.js',
];

const forbiddenRuntime = /flashtech|designerpro|local_threejs|cdn|googleapis|mapbox|analytics|fetch\(/i;

function clientRoot(client) {
  return path.join(repoRoot, 'clientes', client);
}

function readJson(client, filename) {
  const file = path.join(clientRoot(client), filename);
  assert.equal(fs.existsSync(file), true, `${client}/${filename} must exist`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function runtimeFiles(client) {
  const root = clientRoot(client);
  const files = [];
  for (const relative of ['site/index.html', 'site/styles.css', 'site/interaction.js']) {
    const file = path.join(root, relative);
    if (fs.existsSync(file)) files.push({ relative, file });
  }
  const assets = path.join(root, 'site', 'assets');
  if (fs.existsSync(assets)) {
    for (const entry of fs.readdirSync(assets)) {
      if (entry.endsWith('.svg')) files.push({ relative: `site/assets/${entry}`, file: path.join(assets, entry) });
    }
  }
  return files;
}

function referencedAssetPaths(client, source) {
  const matches = source.matchAll(/(?:src|href|data-image)=["']([^"']+)["']/g);
  return [...matches].map((match) => match[1]).filter((value) => value.startsWith('assets/'));
}

test('each lead demo exposes the isolated file contract', () => {
  for (const client of clients) {
    for (const relative of requiredFiles) {
      assert.equal(
        fs.existsSync(path.join(clientRoot(client), relative)),
        true,
        `${client}/${relative} is missing`,
      );
    }
    const svgFiles = runtimeFiles(client).filter(({ relative }) => relative.endsWith('.svg'));
    assert.ok(svgFiles.length >= 3, `${client} needs at least three local SVG demo plates`);
  }
});

test('each lead demo contract has the stable intent and property schema', () => {
  for (const client of clients) {
    const content = readJson(client, 'content-slots.json');
    const composition = readJson(client, 'composition-spec.json');
    for (const key of ['client', 'mode', 'brand', 'intents', 'properties', 'contactTemplate', 'offline', 'referenceTrace']) {
      assert.ok(content[key] !== undefined, `${client}/content-slots.json needs ${key}`);
    }
    assert.equal(typeof composition.client, 'string', `${client}/composition-spec.json needs client`);
    assert.ok(Array.isArray(content.intents) && content.intents.length === 3, `${client} needs three intent records`);
    assert.deepEqual(content.intents.map((intent) => intent.id), ['comprar', 'alugar', 'investir']);
    for (const intent of content.intents) {
      for (const key of ['id', 'label', 'actionLabel', 'image', 'target']) {
        assert.equal(typeof intent[key], 'string', `${client} intent ${intent.id} needs ${key}`);
      }
    }
    assert.ok(Array.isArray(content.properties) && content.properties.length >= 3, `${client} needs demo properties`);
    for (const property of content.properties) {
      for (const key of ['title', 'city', 'neighborhood', 'type', 'bedrooms', 'area', 'priceLabel', 'intent', 'image', 'isDemo']) {
        assert.ok(property[key] !== undefined, `${client} property needs ${key}`);
      }
      assert.equal(property.isDemo, true, `${client} properties must be marked demonstrative`);
    }
    assert.equal(content.offline.required, true, `${client} must require offline operation`);
    assert.deepEqual(content.offline.remoteAssets, []);
    assert.deepEqual(content.offline.remoteScripts, []);
    assert.equal(content.offline.backend, false);
    assert.equal(typeof content.contactTemplate.disclosure, 'string');
    assert.ok(Array.isArray(content.referenceTrace) && content.referenceTrace.length >= 2);
  }
});

test('client runtime is local and does not contain cross-client or network residue', () => {
  for (const client of clients) {
    for (const { relative, file } of runtimeFiles(client)) {
      const source = fs.readFileSync(file, 'utf8');
      assert.equal(forbiddenRuntime.test(source), false, `${client}/${relative} contains forbidden runtime residue`);
      assert.equal(/(?:^|["'(])https?:\/\//i.test(source), false, `${client}/${relative} contains an external URL`);
      assert.equal(/(?:src|href)=["']\/\//i.test(source), false, `${client}/${relative} contains a protocol-relative URL`);
    }
  }
});

test('all client-local image references resolve inside the owning site', () => {
  for (const client of clients) {
    for (const { relative, file } of runtimeFiles(client)) {
      const source = fs.readFileSync(file, 'utf8');
      for (const asset of referencedAssetPaths(client, source)) {
        const resolved = path.resolve(clientRoot(client), 'site', asset);
        const siteRoot = path.resolve(clientRoot(client), 'site');
        assert.equal(resolved.startsWith(`${siteRoot}${path.sep}`), true, `${client}/${relative} escapes site root`);
        assert.equal(fs.existsSync(resolved), true, `${client}/${relative} references missing ${asset}`);
      }
    }
  }
});

test('local SVG demo plates contain stable accessible metadata and no external hrefs', () => {
  for (const client of clients) {
    const svgFiles = runtimeFiles(client).filter(({ relative }) => relative.endsWith('.svg'));
    for (const { relative, file } of svgFiles) {
      const source = fs.readFileSync(file, 'utf8');
      assert.match(source, /<svg\b[^>]*viewBox=/i, `${client}/${relative} needs a stable viewBox`);
      assert.match(source, /<(?:title|desc)\b/i, `${client}/${relative} needs accessible metadata`);
      assert.equal(/(?:href|src)=["'](?:https?:|\/\/)/i.test(source), false, `${client}/${relative} has an external image`);
    }
  }
});
