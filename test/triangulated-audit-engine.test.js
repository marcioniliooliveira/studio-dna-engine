const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');
const { TriangulatedAuditEngine } = require('../src/qa/triangulated-audit-engine');

test('TriangulatedAuditEngine: loads 5 anti-slop governance libraries and 38 variables specification', () => {
  const rules = TriangulatedAuditEngine.loadGovernanceRules();
  assert.ok(rules, 'As regras de governança devem ser carregadas');
  assert.equal(rules.variablesCount, 38, 'O total de variáveis deve ser 38');
  assert.ok(rules.libraries.bannedVisualTropes, 'Biblioteca de tropos visuais deve existir');
  assert.ok(rules.libraries.typographyBounds, 'Biblioteca de bounds tipográficos deve existir');
  assert.ok(rules.libraries.motionPhysics, 'Biblioteca de física de movimento deve existir');
  assert.ok(rules.libraries.bannedCopyDictionary, 'Dicionário de copy vazia deve existir');
  assert.ok(rules.libraries.designRecipes, 'Biblioteca de receitas de design deve existir');
});

test('TriangulatedAuditEngine: meta-auditing health check validates positive and negative fixtures', async () => {
  const health = await TriangulatedAuditEngine.verifyAuditorHealth();
  assert.equal(health.healthy, true, 'O health check do auditor deve passar');
});

test('TriangulatedAuditEngine: returns error when target site directory has no index.html', async () => {
  const emptyDir = path.resolve(__dirname, 'non-existent-dir');
  const result = await TriangulatedAuditEngine.auditSite({
    siteDir: emptyDir
  });
  assert.equal(result.passed, false);
  assert.equal(result.status, 'error');
  assert.match(result.error, /index\.html/);
});

test('TriangulatedAuditEngine: detects copy dictionary slop phrases in factor 1', async () => {
  // Cria um diretório temporário com slop
  const tempDir = path.resolve(__dirname, '../temp-slop-test-site');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
  fs.writeFileSync(path.join(tempDir, 'index.html'), `
    <!DOCTYPE html>
    <html>
      <head><title>Teste Slop</title></head>
      <body>
        <h1>Potencialize seus resultados</h1>
        <p>A solução definitiva para o seu negócio.</p>
      </body>
    </html>
  `, 'utf8');

  try {
    const result = await TriangulatedAuditEngine.auditSite({
      siteDir: tempDir,
      headless: true
    });

    assert.equal(result.layers.factor1_static.passed, false, 'Fator 1 deve reprovar por marketing vazio');
    assert.ok(result.layers.factor1_static.copyViolations.length >= 2, 'Deve detectar as frases proibidas');
    assert.equal(result.passed, false, 'Auditoria geral deve reprovar');
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
