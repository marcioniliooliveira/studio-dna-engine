const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { chromium } = require('playwright');

const {
  installNoRemoteRuntimeGuard,
  validateLocalRuntimeManifest
} = require('./helpers/local-runtime-determinism');

const negociaBemVendorBlob = path.resolve(
  __dirname,
  '..',
  'clientes',
  'negocia-bem',
  'site',
  'assets',
  'vendor',
  'gsap-3.12.5.min.js'
);
const clientRuntimeManifests = [
  {
    clientRoot: path.resolve(__dirname, '..', 'clientes', 'negocia-bem', 'site'),
    manifestPath: path.resolve(__dirname, '..', 'clientes', 'negocia-bem', 'site', 'assets', 'vendor', 'runtime-manifest.json'),
    expectedFileCount: 4
  },
  {
    clientRoot: path.resolve(__dirname, '..', 'clientes', 'flashtech-caso-04-growth', 'site'),
    manifestPath: path.resolve(__dirname, '..', 'clientes', 'flashtech-caso-04-growth', 'site', 'assets', 'vendor', 'runtime-manifest.json'),
    expectedFileCount: 1
  }
];

async function withTempDirectory(run) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'local-runtime-determinism-'));
  try {
    return await run(directory);
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
}

function sha256(contents) {
  return crypto.createHash('sha256').update(contents).digest('hex');
}

async function writeValidCopiedBlobManifest(clientRoot, manifestRecord = {}) {
  const vendorDirectory = path.join(clientRoot, 'assets', 'vendor');
  const copiedBlob = path.join(vendorDirectory, 'gsap-3.12.5.min.js');
  await fs.mkdir(vendorDirectory, { recursive: true });
  await fs.copyFile(negociaBemVendorBlob, copiedBlob);
  const contents = await fs.readFile(copiedBlob);
  const manifestPath = path.join(vendorDirectory, 'runtime-manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify({
    path: 'assets/vendor/gsap-3.12.5.min.js',
    upstreamUrl: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
    version: '3.12.5',
    sha256: sha256(contents),
    ...manifestRecord
  }));
  return { copiedBlob, manifestPath };
}

async function startFixtureServer(root) {
  const server = http.createServer(async (request, response) => {
    const pathname = new URL(request.url, 'http://127.0.0.1').pathname;
    const filePath = path.resolve(root, `.${pathname}`);
    if (!filePath.startsWith(root + path.sep)) {
      response.writeHead(403).end();
      return;
    }

    try {
      response.writeHead(200, { 'content-type': filePath.endsWith('.js') ? 'application/javascript' : 'text/html' });
      response.end(await fs.readFile(filePath));
    } catch {
      response.writeHead(404).end();
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  return server;
}

test('rejects a copied vendor blob changed after its manifest was written', async () => {
  await withTempDirectory(async clientRoot => {
    const { copiedBlob, manifestPath } = await writeValidCopiedBlobManifest(clientRoot);
    await fs.appendFile(copiedBlob, '\n// mutation after manifest\n');

    await assert.rejects(
      validateLocalRuntimeManifest({ clientRoot, manifestPath }),
      /hash mismatch/i
    );
  });
});

test('hash-verifies both client-local runtime manifests', async () => {
  for (const runtimeManifest of clientRuntimeManifests) {
    const result = await validateLocalRuntimeManifest(runtimeManifest);
    assert.equal(result.files.length, runtimeManifest.expectedFileCount);
    assert.ok(result.files.every(file => /^[a-f0-9]{64}$/i.test(file.sha256)));
  }
});

test('rejects a malformed runtime record', async () => {
  await withTempDirectory(async clientRoot => {
    const { manifestPath } = await writeValidCopiedBlobManifest(clientRoot, { sha256: 'not-a-sha256' });
    await assert.rejects(
      validateLocalRuntimeManifest({ clientRoot, manifestPath }),
      /invalid sha256/i
    );
  });
});

test('rejects absolute, traversal, drive-relative, and ADS runtime paths', async t => {
  for (const unsafePath of [
    '/assets/vendor/gsap-3.12.5.min.js',
    '../assets/vendor/gsap-3.12.5.min.js',
    'C:assets/vendor/gsap-3.12.5.min.js',
    'assets/vendor/gsap-3.12.5.min.js:stream'
  ]) {
    await t.test(unsafePath, async () => {
      await withTempDirectory(async clientRoot => {
        const { manifestPath } = await writeValidCopiedBlobManifest(clientRoot, { path: unsafePath });
        await assert.rejects(
          validateLocalRuntimeManifest({ clientRoot, manifestPath }),
          /outside the active client root/i
        );
      });
    });
  }
});

test('rejects a manifest file declared inside the client root when it is missing', async () => {
  await withTempDirectory(async clientRoot => {
    const { manifestPath } = await writeValidCopiedBlobManifest(clientRoot, { path: 'assets/vendor/missing.js' });
    await assert.rejects(
      validateLocalRuntimeManifest({ clientRoot, manifestPath }),
      /file is missing/i
    );
  });
});

test('reports an injected external script URL when the page is guarded', async t => {
  await withTempDirectory(async fixtureRoot => {
    const sourceFixture = path.resolve(__dirname, 'fixtures', 'deep-scrutiny-negatives', 'negative-click-hijack', 'index.html');
    const fixturePath = path.join(fixtureRoot, 'index.html');
    const externalScriptUrl = 'https://runtime.example.invalid/future-runtime.js';
    const copiedHtml = await fs.readFile(sourceFixture, 'utf8');
    await fs.writeFile(fixturePath, copiedHtml.replace('</head>', `<script src="${externalScriptUrl}"></script></head>`));

    const server = await startFixtureServer(fixtureRoot);
    t.after(() => new Promise(resolve => server.close(resolve)));
    const browser = await chromium.launch({ headless: true });
    t.after(() => browser.close());
    const page = await browser.newPage();
    const origin = `http://127.0.0.1:${server.address().port}`;
    const guard = installNoRemoteRuntimeGuard(page, origin);

    await page.goto(`${origin}/index.html`);

    assert.throws(() => guard.assertClean(), new RegExp(externalScriptUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });
});
