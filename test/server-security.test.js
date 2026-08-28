const test = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('node:stream');
const path = require('node:path');

const {
  resolveStaticPath,
  assertSafeExternalUrl,
  assertSafeSlug,
  parseByteRange,
  readJsonBody,
  isMutationAuthorized
} = require('../src/server/security');

test('resolveStaticPath keeps a client request inside that client', () => {
  const rootDir = path.resolve('C:/workspace');
  const result = resolveStaticPath({
    rootDir,
    copiasDir: path.join(rootDir, 'copias'),
    clientesDir: path.join(rootDir, 'clientes'),
    pathname: '/clientes/acme/site/index.html'
  });

  assert.equal(result, path.join(rootDir, 'clientes', 'acme', 'site', 'index.html'));
});

test('resolveStaticPath rejects encoded traversal outside a client', () => {
  const rootDir = path.resolve('C:/workspace');

  assert.throws(() => resolveStaticPath({
    rootDir,
    copiasDir: path.join(rootDir, 'copias'),
    clientesDir: path.join(rootDir, 'clientes'),
    pathname: '/clientes/%2e%2e/package.json'
  }), /unsafe path/i);
});

test('resolveStaticPath rejects traversal outside the copies root', () => {
  const rootDir = path.resolve('C:/workspace');

  assert.throws(() => resolveStaticPath({
    rootDir,
    copiasDir: path.join(rootDir, 'copias'),
    clientesDir: path.join(rootDir, 'clientes'),
    pathname: '/../package.json'
  }), /unsafe path/i);
});

test('assertSafeExternalUrl rejects localhost and private DNS results', async () => {
  await assert.rejects(
    assertSafeExternalUrl('http://localhost:3000'),
    /private or local/i
  );

  await assert.rejects(
    assertSafeExternalUrl('https://internal.example', {
      lookup: async () => [{ address: '127.0.0.1', family: 4 }]
    }),
    /private or local/i
  );
});

test('assertSafeExternalUrl accepts an http URL resolving only to public addresses', async () => {
  const result = await assertSafeExternalUrl('https://example.com/path', {
    lookup: async () => [{ address: '93.184.216.34', family: 4 }]
  });

  assert.equal(result.href, 'https://example.com/path');
});

test('assertSafeSlug accepts canonical slugs and rejects path-like values', () => {
  assert.equal(assertSafeSlug('cliente-alpha-01'), 'cliente-alpha-01');
  assert.throws(() => assertSafeSlug('../escape'), /unsafe slug/i);
  assert.throws(() => assertSafeSlug('alpha/site'), /unsafe slug/i);
  assert.throws(() => assertSafeSlug('Alpha Name'), /unsafe slug/i);
});

test('parseByteRange handles valid ranges and rejects malformed values', () => {
  assert.deepEqual(parseByteRange('bytes=0-4', 10), { start: 0, end: 4 });
  assert.deepEqual(parseByteRange('bytes=5-', 10), { start: 5, end: 9 });
  assert.deepEqual(parseByteRange('bytes=-4', 10), { start: 6, end: 9 });
  assert.equal(parseByteRange('bytes=abc', 10), null);
  assert.equal(parseByteRange('bytes=9-3', 10), null);
  assert.equal(parseByteRange('items=0-1', 10), null);
});

test('readJsonBody rejects payloads above its byte limit', async () => {
  const req = Readable.from([Buffer.from('{"value":"1234567890"}')]);

  await assert.rejects(
    readJsonBody(req, { limitBytes: 8 }),
    error => error.statusCode === 413
  );
});

test('isMutationAuthorized requires mutations to be enabled and a matching token', () => {
  assert.equal(isMutationAuthorized({ headers: {} }, { enabled: false, token: 'secret' }), false);
  assert.equal(isMutationAuthorized({ headers: {} }, { enabled: true, token: 'secret' }), false);
  assert.equal(isMutationAuthorized({ headers: { authorization: 'Bearer wrong' } }, { enabled: true, token: 'secret' }), false);
  assert.equal(isMutationAuthorized({ headers: { authorization: 'Bearer secret' } }, { enabled: true, token: 'secret' }), true);
});
