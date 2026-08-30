const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');

const { UnifiedQualityGate } = require('../src/qa/unified-quality-gate');

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
  assert.match(report.artifacts.runtimeBaselinePath, /qa-reports\/runtime-baseline\.png$/);
  assert.equal(
    fs.existsSync(path.resolve(process.cwd(), report.artifacts.runtimeBaselinePath)),
    true
  );
  assert.equal(Object.hasOwn(report.artifacts, 'screenshotPath'), false);

  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('UnifiedQualityGate: fails when a requested asset returns 404', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uqg-test-network-'));
  const siteDir = path.join(tmpDir, 'site');
  fs.mkdirSync(siteDir, { recursive: true });

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Missing Asset</title>
  <script src="/missing.js"></script>
</head>
<body>
  <header><h1>Empreendimento Exclusivo</h1></header>
  <main><section><p>Descritivo arquitetÃ´nico elegante e inovador.</p></section></main>
  <footer><p>Todos os direitos reservados.</p></footer>
</body>
</html>`;

  fs.writeFileSync(path.join(siteDir, 'index.html'), html, 'utf8');

  const report = await UnifiedQualityGate.auditSite({
    siteDir,
    clientSlug: 'test-network-client',
    headless: true
  });

  assert.equal(report.gates.network.passed, false);
  assert.equal(report.gates.network.failures.length, 1);
  assert.equal(report.gates.network.failures[0].status, 404);
  assert.equal(report.passed, false);
  assert.equal(report.status, 'failed');

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
