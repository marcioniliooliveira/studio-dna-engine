const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const net = require('net');
const { execFile } = require('child_process');
const { promisify } = require('util');

const { UnifiedQualityGate } = require('../src/qa/unified-quality-gate');
const execFileAsync = promisify(execFile);

test('UnifiedQualityGate: audits a clean site and returns verified status', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uqg-test-clean-'));
  const siteDir = path.join(tmpDir, 'site');
  fs.mkdirSync(siteDir, { recursive: true });

  const html = `<!DOCTYPE html>
<html>
<head><title>Clean Site</title></head>
<body>
  <header><h1>Empreendimento Exclusivo</h1></header>
  <main><section><p>Descritivo arquitetônico elegante e inovador.</p></section></main>
  <footer><p>Todos os direitos reservados.</p></footer>
</body>
</html>`;

  fs.writeFileSync(path.join(siteDir, 'index.html'), html, 'utf8');

  const report = await UnifiedQualityGate.auditSite({
    siteDir,
    clientSlug: 'test-clean-client',
    originalBrandKeywords: ['Elyse'],
    headless: true
  });

  assert.equal(report.passed, true);
  assert.equal(report.status, 'verified');
  assert.equal(report.gates.console.passed, true);
  assert.equal(report.gates.structural.passed, true);
  assert.equal(report.gates.antiSlop.passed, true);

  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('UnifiedQualityGate: detects broken slop and fails the gate', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uqg-test-fail-'));
  const siteDir = path.join(tmpDir, 'site');
  fs.mkdirSync(siteDir, { recursive: true });

  const html = `<!DOCTYPE html>
<html>
<head><title>Bad Site</title></head>
<body>
  <header><h1>Lorem Ipsum Dolor</h1></header>
  <main><section><p>{SLOT_HERO_DESC}</p></section></main>
</body>
</html>`;

  fs.writeFileSync(path.join(siteDir, 'index.html'), html, 'utf8');

  const report = await UnifiedQualityGate.auditSite({
    siteDir,
    clientSlug: 'test-bad-client',
    headless: true
  });

  assert.equal(report.passed, false);
  assert.equal(report.status, 'failed');
  assert.equal(report.gates.antiSlop.passed, false);
  assert.ok(report.gates.antiSlop.violations.length >= 2);

  fs.rmSync(tmpDir, { recursive: true, force: true });
});



// --- Image Readiness Tests (Head) ---
test('UnifiedQualityGate: loads and decodes a local lazy image below the initial viewport before auditing it', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uqg-test-lazy-image-'));
  const siteDir = path.join(tmpDir, 'site');
  const assetsDir = path.join(siteDir, 'assets');
  fs.mkdirSync(assetsDir, { recursive: true });

  fs.writeFileSync(path.join(assetsDir, 'lazy.svg'), `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
  <rect width="32" height="32" fill="#0b57d0"/>
</svg>`, 'utf8');
  fs.writeFileSync(path.join(siteDir, 'index.html'), `<!DOCTYPE html>
<html>
<head><title>Lazy Image</title></head>
<body>
  <main>
    <section style="height: 2400px"><p>Conteúdo aprovado para a auditoria.</p></section>
    <section><img loading="lazy" src="/assets/lazy.svg" alt="Imagem carregada sob demanda"></section>
  </main>
</body>
</html>`, 'utf8');

  try {
    const report = await UnifiedQualityGate.auditSite({
      siteDir,
      clientSlug: 'test-lazy-image-client',
      headless: true
    });

    assert.equal(report.gates.structural.brokenImagesCount, 0);
    assert.equal(report.gates.structural.decodedImagesCount, 1);
    assert.equal(report.passed, true);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('UnifiedQualityGate: reports a missing local raster image as a structural readiness failure', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uqg-test-missing-image-'));
  const siteDir = path.join(tmpDir, 'site');
  fs.mkdirSync(siteDir, { recursive: true });

  fs.writeFileSync(path.join(siteDir, 'index.html'), `<!DOCTYPE html>
<html>
<head><title>Missing Image</title></head>
<body>
  <main><section><img src="/assets/missing.png" alt="Imagem ausente"></section></main>
</body>
</html>`, 'utf8');

  try {
    const report = await UnifiedQualityGate.auditSite({
      siteDir,
      clientSlug: 'test-missing-image-client',
      headless: true
    });

    assert.equal(report.passed, false);
    assert.equal(report.gates.structural.passed, false);
    assert.equal(report.gates.structural.readinessFailuresCount, 1);
    assert.equal(report.gates.structural.readinessFailures[0].src, report.gates.network.failures[0].url);
    assert.equal(report.gates.structural.readinessFailures[0].state, 'broken');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('UnifiedQualityGate: fails the overall gate when a local stylesheet returns 404', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uqg-test-network-'));
  const siteDir = path.join(tmpDir, 'site');
  fs.mkdirSync(siteDir, { recursive: true });

  fs.writeFileSync(path.join(siteDir, 'index.html'), `<!DOCTYPE html>
<html>
<head>
  <title>Network Failure</title>
  <link rel="stylesheet" href="/missing.css">
</head>
<body><main><section><p>Conteúdo aprovado para a auditoria.</p></section></main></body>
</html>`, 'utf8');

  try {
    const report = await UnifiedQualityGate.auditSite({
      siteDir,
      clientSlug: 'test-network-client',
      headless: true
    });

    assert.equal(report.gates.network.passed, false);
    assert.equal(report.gates.network.failedRequestsCount, 1);
    assert.equal(report.passed, false);
    assert.equal(report.status, 'failed');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('UnifiedQualityGate: fails the overall gate when a local asset request has no HTTP response', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uqg-test-request-failure-'));
  const siteDir = path.join(tmpDir, 'site');
  fs.mkdirSync(siteDir, { recursive: true });

  const unavailablePort = await new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const { port } = probe.address();
      probe.close(error => error ? reject(error) : resolve(port));
    });
  });

  fs.writeFileSync(path.join(siteDir, 'index.html'), `<!DOCTYPE html>
<html>
<head><title>Request Failure</title></head>
<body>
  <main><section><p>Conteúdo aprovado para a auditoria.</p></section></main>
  <script src="http://127.0.0.1:${unavailablePort}/missing.js"></script>
</body>
</html>`, 'utf8');

  try {
    const report = await UnifiedQualityGate.auditSite({
      siteDir,
      clientSlug: 'test-request-failure-client',
      headless: true
    });

    assert.equal(report.gates.network.passed, false);
    assert.equal(report.gates.network.failedRequestsCount, 1);
    assert.equal(report.passed, false);
    assert.equal(report.status, 'failed');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('audit-scalex: exits non-zero when its quality audit fails', async () => {
  const gatePath = require.resolve('../src/qa/unified-quality-gate');
  const auditPath = path.resolve(__dirname, '..', 'scripts', 'audit-scalex.js');
  const bootstrap = `
const gatePath = ${JSON.stringify(gatePath)};
require.cache[gatePath] = {
  id: gatePath,
  filename: gatePath,
  loaded: true,
  exports: {
    UnifiedQualityGate: {
      auditSite: async () => ({
        passed: false,
        status: 'failed',
        gates: {
          console: { errorsCount: 2 },
          network: { failedRequestsCount: 3 },
          structural: { brokenImagesCount: 4 },
          antiSlop: { passed: false, violations: ['placeholder'] }
        }
      })
    }
  }
};
require(${JSON.stringify(auditPath)});
`;

  await assert.rejects(
    execFileAsync(process.execPath, ['-e', bootstrap], { cwd: path.resolve(__dirname, '..') }),
    error => {
      assert.equal(error.code, 1);
      assert.match(error.stdout, /JS Errors: 2/);
      assert.match(error.stdout, /Failed Requests: 3/);
      assert.match(error.stdout, /Broken Images: 4/);
      assert.match(error.stdout, /Anti-Slop Passed: false/);
      return true;
    }
  );
});


// --- Scroll Dynamics Tests (Incoming) ---
test('UnifiedQualityGate.auditClone: verifies scroll height, sections and console health', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uqg-test-clone-'));
  const siteDir = path.join(tmpDir, 'site');
  fs.mkdirSync(siteDir, { recursive: true });

  const html = `<!DOCTYPE html>
<html>
<head><title>Good Clone</title></head>
<body>
  <header style="height: 100px;"><h1>Brand Header</h1></header>
  <section style="height: 1200px;"><p>Detailed product showcase with rich typography and layout.</p></section>
  <footer style="height: 200px;"><p>Footer</p></footer>
</body>
</html>`;

  fs.writeFileSync(path.join(siteDir, 'index.html'), html, 'utf8');

  const report = await UnifiedQualityGate.auditClone({
    siteDir,
    expectedHeight: 1500,
    headless: true
  });

  assert.equal(report.passed, true);
  assert.equal(report.status, 'verified');
  assert.equal(report.metrics.jsErrorsCount, 0);
  assert.equal(report.metrics.collapsedSectionsCount, 0);

  fs.rmSync(tmpDir, { recursive: true, force: true });

});
