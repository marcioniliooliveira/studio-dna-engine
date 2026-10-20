const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const masterFolder = path.resolve(__dirname, '..', 'copias', 'jesperlandberg-com');

test('jesperlandberg-com pipeline status reports completed with all stages passed', () => {
  const statusPath = path.join(masterFolder, 'PIPELINE_STATUS.json');
  assert.ok(fs.existsSync(statusPath), 'PIPELINE_STATUS.json deve existir');

  const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
  assert.equal(status.status, 'completed');
  assert.equal(status.siteName, 'jesperlandberg-com');

  const stageNames = status.stages.map(s => s.name);
  assert.ok(stageNames.includes('detect'));
  assert.ok(stageNames.includes('clone'));
  assert.ok(stageNames.includes('normalize-assets'));
  assert.ok(stageNames.includes('extract-design-dna'));
  assert.ok(stageNames.includes('extract-ui-ux'));
  assert.ok(stageNames.includes('generate-master-spec'));

  for (const stage of status.stages) {
    assert.equal(stage.status, 'passed', `Estágio ${stage.name} deve ter status passed`);
  }
});

test('jesperlandberg-com site artifacts and HTML clone are materialized', () => {
  const indexPath = path.join(masterFolder, 'site', 'index.html');
  assert.ok(fs.existsSync(indexPath), 'site/index.html deve existir');

  const html = fs.readFileSync(indexPath, 'utf8');
  assert.ok(html.length > 5000, 'HTML clonado não deve ser vazio');
  assert.ok(html.includes('Jesper Landberg'), 'HTML deve conter título/conteúdo do site');
});

test('jesperlandberg-com design system and UI/UX assets are extracted', () => {
  const dnaJson = path.join(masterFolder, 'design-system', 'design_dna.json');
  assert.ok(fs.existsSync(dnaJson), 'design_dna.json deve existir');

  const uiUxJson = path.join(masterFolder, 'ui-ux', 'ui_ux_features.json');
  assert.ok(fs.existsSync(uiUxJson), 'ui_ux_features.json deve existir');

  const masterSpec = path.join(masterFolder, 'MASTER_SPEC.md');
  assert.ok(fs.existsSync(masterSpec), 'MASTER_SPEC.md deve existir');
});
