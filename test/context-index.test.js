const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createContextIndex } = require('../src/execution/context-index');

const fixturePath = path.join(__dirname, 'fixtures', 'context-index', 'sample.js');

function createProject() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'context-index-'));
  fs.copyFileSync(fixturePath, path.join(projectRoot, 'sample.js'));
  fs.copyFileSync(path.join(__dirname, 'fixtures', 'context-index', 'commonjs.js'), path.join(projectRoot, 'commonjs.js'));
  fs.copyFileSync(path.join(__dirname, 'fixtures', 'context-index', 'anonymous-default.js'), path.join(projectRoot, 'anonymous-default.js'));
  fs.copyFileSync(path.join(__dirname, 'fixtures', 'context-index', 'mixed-exports.js'), path.join(projectRoot, 'mixed-exports.js'));
  fs.copyFileSync(path.join(__dirname, 'fixtures', 'context-index', 'restored-exports-alias.js'), path.join(projectRoot, 'restored-exports-alias.js'));
  return projectRoot;
}

test('summarizes imports and exported symbols without disclosing function bodies', (t) => {
  const projectRoot = createProject();
  t.after(() => fs.rmSync(projectRoot, { recursive: true, force: true }));
  const index = createContextIndex({ projectRoot, allowedPaths: ['sample.js'] });

  index.indexFile('sample.js');
  const summary = index.getSummary('sample.js');

  assert.deepEqual(summary.imports, [
    { source: './format.js', specifiers: ['format'] },
    { source: './default.js', specifiers: ['defaultThing'] }
  ]);
  assert.deepEqual(summary.exports.map((entry) => entry.name), ['Renderer', 'buildMessage', 'asiSensitive']);
  assert.deepEqual(summary.symbols.map(({ name, kind, async, startLine, endLine }) => ({ name, kind, async, startLine, endLine })), [
    { name: 'Renderer', kind: 'class', async: false, startLine: 4, endLine: 8 },
    { name: 'buildMessage', kind: 'function', async: true, startLine: 11, endLine: 15 },
    { name: 'asiSensitive', kind: 'function', async: false, startLine: 17, endLine: 20 }
  ]);
  assert.equal(summary.symbols.find((entry) => entry.name === 'buildMessage').signature, 'async function buildMessage(name)');
  assert.equal(JSON.stringify(summary).includes('const message'), false);
  assert.equal(JSON.stringify(summary).includes('Hello,'), false);
});

test('returns an exact symbol slice including adjacent comments and whitespace', (t) => {
  const projectRoot = createProject();
  t.after(() => fs.rmSync(projectRoot, { recursive: true, force: true }));
  const index = createContextIndex({ projectRoot, allowedPaths: ['sample.js'] });

  const actual = index.readSymbol('sample.js', 'buildMessage');

  assert.equal(actual, [
    '// This constraint must stay with the exported function.',
    'export async function buildMessage(name) {',
    '  // Preserve this whitespace and comment in an exact slice.',
    '  const message = `Hello, ${name}!`;',
    '  return message;',
    '}'
  ].join('\n'));
});

test('fails closed for paths, bounds, and parse errors', (t) => {
  const projectRoot = createProject();
  t.after(() => fs.rmSync(projectRoot, { recursive: true, force: true }));
  fs.writeFileSync(path.join(projectRoot, 'broken.js'), 'export const = ;');
  const index = createContextIndex({ projectRoot, allowedPaths: ['sample.js', 'broken.js'] });

  assert.throws(() => index.readLines('../sample.js', 1, 1), { code: 'CONTEXT_PATH_UNAUTHORIZED' });
  assert.throws(() => index.readLines('sample.js', 0, 1), { code: 'CONTEXT_LINE_RANGE_INVALID' });
  assert.throws(() => index.readLines('sample.js', 1, 21), { code: 'CONTEXT_LINE_RANGE_INVALID' });
  assert.throws(() => index.indexFile('broken.js'), { code: 'CONTEXT_PARSE_FAILED' });
  assert.throws(() => index.getSummary('broken.js'), { code: 'CONTEXT_PARSE_FAILED' });
});

test('invalidates stale symbol offsets when the indexed file content changes', (t) => {
  const projectRoot = createProject();
  t.after(() => fs.rmSync(projectRoot, { recursive: true, force: true }));
  const target = path.join(projectRoot, 'sample.js');
  const index = createContextIndex({ projectRoot, allowedPaths: ['sample.js'] });

  const first = index.indexFile('sample.js');
  fs.writeFileSync(target, 'export function replacement() { return `new`; }\n');
  const second = index.indexFile('sample.js');

  assert.notEqual(second.sha256, first.sha256);
  assert.throws(() => index.readSymbol('sample.js', 'buildMessage'), { code: 'CONTEXT_SYMBOL_NOT_FOUND' });
  assert.equal(index.readSymbol('sample.js', 'replacement'), 'export function replacement() { return `new`; }');
});

test('indexes CommonJS require imports and module export symbols', (t) => {
  const projectRoot = createProject();
  t.after(() => fs.rmSync(projectRoot, { recursive: true, force: true }));
  const index = createContextIndex({ projectRoot, allowedPaths: ['commonjs.js'] });

  const summary = index.getSummary('commonjs.js');

  assert.deepEqual(summary.imports, [
    { source: 'node:path', specifiers: ['joinPath'] },
    { source: './formatter.js', specifiers: ['formatter'] }
  ]);
  assert.deepEqual(summary.exports.map((entry) => entry.name), ['render']);
  assert.equal(index.readSymbol('commonjs.js', 'render'), [
    'function render(value) {',
    "  return formatter(joinPath('pages', value));",
    '}'
  ].join('\n'));
});

test('indexes anonymous default exports under the default symbol', (t) => {
  const projectRoot = createProject();
  t.after(() => fs.rmSync(projectRoot, { recursive: true, force: true }));
  const index = createContextIndex({ projectRoot, allowedPaths: ['anonymous-default.js'] });

  const summary = index.getSummary('anonymous-default.js');

  assert.deepEqual(summary.exports, [{ name: 'default' }]);
  assert.equal(summary.symbols[0].name, 'default');
  assert.equal(index.readSymbol('anonymous-default.js', 'default'), [
    'export default function () {',
    '  return `anonymous default`;',
    '}'
  ].join('\n'));
});

test('rejects an allow-listed symlink or junction instead of following it outside the project root', (t) => {
  const projectRoot = createProject();
  const externalRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'context-index-external-'));
  t.after(() => {
    fs.rmSync(projectRoot, { recursive: true, force: true });
    fs.rmSync(externalRoot, { recursive: true, force: true });
  });
  fs.writeFileSync(path.join(externalRoot, 'escape.js'), 'export const escaped = true;\n');
  fs.symlinkSync(externalRoot, path.join(projectRoot, 'linked'), 'junction');
  const index = createContextIndex({ projectRoot, allowedPaths: ['linked/escape.js'] });

  assert.throws(() => index.indexFile('linked/escape.js'), { code: 'CONTEXT_PATH_UNAUTHORIZED' });
});

test('deduplicates names shared by ESM and CommonJS exports', (t) => {
  const projectRoot = createProject();
  t.after(() => fs.rmSync(projectRoot, { recursive: true, force: true }));
  const index = createContextIndex({ projectRoot, allowedPaths: ['mixed-exports.js'] });

  assert.deepEqual(index.getSummary('mixed-exports.js').exports, [{ name: 'shared' }]);
});

test('restores the exports alias after an explicit exports equals module exports assignment', (t) => {
  const projectRoot = createProject();
  t.after(() => fs.rmSync(projectRoot, { recursive: true, force: true }));
  const index = createContextIndex({ projectRoot, allowedPaths: ['restored-exports-alias.js'] });

  assert.deepEqual(index.getSummary('restored-exports-alias.js').exports, [
    { name: 'primary' },
    { name: 'restored' }
  ]);
});
