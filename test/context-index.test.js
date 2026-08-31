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
