'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

test('Phase 4 (Purge A1/A3): Kombai, root client HTMLs, client .gitignore rules, and legacy artifacts are removed', () => {
  const removedPaths = [
    '.kombai',
    'JumpPlay — Family Reveal & Kinetic Range.html',
    'OP-XY — Hero to Strip Live Tuning Lab.html',
    'VILA SMASH — Franchise Refinement.html',
    '.kilo',
    '.superpowers',
    '.claude',
    '.cursor',
    'artifacts/empirical-audit',
    'audit',
    'configs/clients'
  ];

  for (const rel of removedPaths) {
    assert.equal(fs.existsSync(path.join(ROOT, rel)), false, `${rel} must be purged from the tool repo`);
  }

  const gitignore = fs.readFileSync(path.join(ROOT, '.gitignore'), 'utf8');
  assert.doesNotMatch(gitignore, /kombai/i, '.gitignore must not carry Kombai rules');
  assert.doesNotMatch(gitignore, /clientes\/(flashtech-caso-04-growth|marcionilio-oliveira|silvio-iwata-imobiliaria|negocia-bem|jumpflex-home-evolution)/, '.gitignore must not carry client-specific exceptions');
  assert.doesNotMatch(gitignore, /copias\/(azimuteresidencial|masters-residence|jesperlandberg)/, '.gitignore must not carry site-specific exceptions');

  const handoff = fs.readFileSync(path.join(ROOT, 'HANDOFF.md'), 'utf8');
  assert.doesNotMatch(handoff, /kombai/i, 'HANDOFF.md must not reference Kombai');

  const scrutiny = fs.readFileSync(path.join(ROOT, 'src/qa/deep-scrutiny-gate.js'), 'utf8');
  assert.doesNotMatch(scrutiny, /kombai/i, 'deep-scrutiny-gate.js must not reference Kombai');
});

test('Phase 4 (Purge A2): artisanal client scripts are removed while core engine scripts remain', () => {
  const purgedScripts = [
    'scripts/archive',
    'scripts/adapt-negocia-bem-shell.js',
    'scripts/apply_index_modernization.js',
    'scripts/build-and-certify-growth-case.js',
    'scripts/build-shadcnuikit-package.js',
    'scripts/build-standalone-lab.js',
    'scripts/build_catalogo_imoveis.js',
    'scripts/capture-aircenter-sections.js',
    'scripts/clean-and-restore-useplanes.js',
    'scripts/fix-aircenter-html.js',
    'scripts/hydrate-likova-assets.js',
    'scripts/inspect-21oaks-scripts.js',
    'scripts/promote-template.js',
    'scripts/serve-marcionilio-site.cjs',
    'scripts/verify_catalogo_imoveis.js'
  ];

  for (const rel of purgedScripts) {
    assert.equal(fs.existsSync(path.join(ROOT, rel)), false, `Client script ${rel} must be purged`);
  }

  const retainedScripts = [
    'scripts/audit-syntax.js',
    'scripts/box-diff-linter.js',
    'scripts/detect-antipatterns-browser.js',
    'scripts/detect-antipatterns.mjs',
    'scripts/dna-extractor.js',
    'scripts/run-low-spec-gate.js',
    'scripts/scalex-ast-transformer.js'
  ];

  for (const rel of retainedScripts) {
    assert.equal(fs.existsSync(path.join(ROOT, rel)), true, `Engine script ${rel} must remain`);
  }
});

test('Phase 4 (Workspace Isolation A4): resolveWorkspacePaths and ensureWorkspaceStructure separate client data from TOOL_ROOT', () => {
  const workspace = require('../src/config/workspace');
  assert.equal(typeof workspace.resolveWorkspacePaths, 'function');
  assert.equal(typeof workspace.ensureWorkspaceStructure, 'function');
  assert.equal(path.resolve(workspace.TOOL_ROOT), ROOT);

  const externalWs = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-dna-ws-'));
  try {
    const resolved = workspace.resolveWorkspacePaths({ workspaceDir: externalWs });
    assert.equal(resolved.isExternalWorkspace, true);
    assert.equal(resolved.workspaceRoot, externalWs);
    assert.equal(resolved.clientesDir, path.join(externalWs, 'clientes'));
    assert.equal(resolved.copiasDir, path.join(externalWs, 'copias'));
    assert.equal(resolved.dataDir, path.join(externalWs, 'data'));
    assert.equal(resolved.qaReportsDir, path.join(externalWs, 'qa-reports'));
    assert.equal(resolved.designVaultDir, path.join(ROOT, 'design-vault'));

    workspace.ensureWorkspaceStructure(externalWs);
    assert.equal(fs.existsSync(path.join(externalWs, 'clientes')), true);
    assert.equal(fs.existsSync(path.join(externalWs, 'copias')), true);
    assert.equal(fs.existsSync(path.join(externalWs, 'data')), true);
    assert.equal(fs.existsSync(path.join(externalWs, 'qa-reports')), true);
  } finally {
    fs.rmSync(externalWs, { recursive: true, force: true });
  }
});

test('Phase 4 (Workspace Isolation A4): loadConfig, createClientProject, and CLI parseCliArgs honor external workspace without polluting TOOL_ROOT', () => {
  const cliSrc = fs.readFileSync(path.join(ROOT, 'bin/cli.js'), 'utf8');
  assert.match(cliSrc, /require\.main === module/, 'bin/cli.js must guard main() so parseCliArgs can be imported cleanly');
  const { loadConfig } = require('../src/config');
  const { createClientProject } = require('../src/generators/client-factory');
  const { parseCliArgs } = require('../bin/cli');

  const parsed = parseCliArgs(['https://example.com', '--workspace', '/tmp/my-projects', '--mode', 'ui', '--port', '4100', '--init-workspace']);
  assert.equal(parsed.rawUrl, 'https://example.com');
  assert.equal(parsed.workspaceDir, path.resolve('/tmp/my-projects'));
  assert.equal(parsed.mode, 'ui');
  assert.equal(parsed.port, 4100);
  assert.equal(parsed.initWorkspace, true);

  const externalWs = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-dna-client-ws-'));
  const brandName = `Phase4 Isolated ${Date.now()}`;
  const slug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

  try {
    const cfg = loadConfig({ workspaceDir: externalWs });
    assert.equal(cfg.outputDir, path.join(externalWs, 'copias'));

    const refDir = path.join(externalWs, 'copias', 'demo-ref', 'site');
    fs.mkdirSync(refDir, { recursive: true });
    fs.writeFileSync(path.join(refDir, 'index.html'), '<html><body>Ref</body></html>', 'utf8');

    const created = createClientProject({
      brandName,
      refSlug: 'demo-ref',
      workspaceDir: externalWs
    });

    assert.equal(created.clientDir, path.join(externalWs, 'clientes', slug));
    assert.equal(fs.existsSync(path.join(externalWs, 'clientes', slug, 'brand-spec.json')), true);
    assert.equal(fs.existsSync(path.join(ROOT, 'clientes', slug)), false, 'must NOT create client inside TOOL_ROOT/clientes');

    assert.equal(fs.existsSync(path.join(ROOT, 'docs', 'WORKSPACE_ISOLATION_GUIDE.md')), true);
  } finally {
    fs.rmSync(externalWs, { recursive: true, force: true });
  }
});
