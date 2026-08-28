const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const vaultIndexPath = path.join(rootDir, 'design-vault/INDEX.json');

test('Design Vault INDEX.json exists and contains required tiers', () => {
  assert.ok(fs.existsSync(vaultIndexPath), 'design-vault/INDEX.json deve existir');
  const indexData = JSON.parse(fs.readFileSync(vaultIndexPath, 'utf8'));

  assert.ok(indexData.vaultTiers, 'Deve declarar vaultTiers');
  assert.ok(Array.isArray(indexData.patterns), 'patterns deve ser um array');
  assert.ok(Array.isArray(indexData.templates), 'templates deve ser um array');
});

test('Design Vault all declared patterns exist on disk', () => {
  const indexData = JSON.parse(fs.readFileSync(vaultIndexPath, 'utf8'));

  for (const pattern of indexData.patterns) {
    const fullPath = path.join(rootDir, pattern.path);
    assert.ok(fs.existsSync(fullPath), `Arquivo de pattern deve existir: ${pattern.path}`);
  }
});

test('Design Vault templates contain their declared artifacts', () => {
  const indexData = JSON.parse(fs.readFileSync(vaultIndexPath, 'utf8'));

  for (const tpl of indexData.templates) {
    const tplDir = path.join(rootDir, tpl.path);
    assert.ok(fs.existsSync(tplDir), `Diretório do template deve existir: ${tpl.path}`);

    for (const [key, relativeFile] of Object.entries(tpl.artifacts)) {
      const artifactPath = path.join(tplDir, relativeFile);
      assert.ok(fs.existsSync(artifactPath), `Artefato ${key} (${relativeFile}) deve existir em ${tpl.path}`);
    }
  }
});
