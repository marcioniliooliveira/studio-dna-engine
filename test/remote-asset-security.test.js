const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');

const { fetchAndSaveRemoteAsset } = require('../src/server/preview-server');

test('self-healing downloader rejects local network URLs before creating a file', async () => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-dna-download-'));
  const destination = path.join(fixtureRoot, 'asset.txt');

  const result = await fetchAndSaveRemoteAsset('http://127.0.0.1:4000/private', destination);
  const fileExists = fs.existsSync(destination);
  fs.rmSync(fixtureRoot, { recursive: true, force: true });

  assert.equal(result, false);
  assert.equal(fileExists, false);
});

test('self-healing downloader stops when a response exceeds the byte limit', async () => {
  let requests = 0;
  const origin = http.createServer((req, res) => {
    requests += 1;
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('payload-too-large');
  });
  origin.listen(0, '127.0.0.1');
  await once(origin, 'listening');

  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-dna-download-'));
  const destination = path.join(fixtureRoot, 'asset.txt');
  const result = await fetchAndSaveRemoteAsset(
    `http://127.0.0.1:${origin.address().port}/asset`,
    destination,
    {
      maxBytes: 4,
      validateUrl: async rawUrl => new URL(rawUrl)
    }
  );
  await new Promise(resolve => origin.close(resolve));
  const fileExists = fs.existsSync(destination);
  fs.rmSync(fixtureRoot, { recursive: true, force: true });

  assert.equal(requests, 1);
  assert.equal(result, false);
  assert.equal(fileExists, false);
});

test('self-healing downloader stops after its redirect limit', async () => {
  let requests = 0;
  const origin = http.createServer((req, res) => {
    requests += 1;
    res.writeHead(302, { location: '/loop' });
    res.end();
  });
  origin.listen(0, '127.0.0.1');
  await once(origin, 'listening');

  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-dna-download-'));
  const destination = path.join(fixtureRoot, 'asset.txt');
  const result = await fetchAndSaveRemoteAsset(
    `http://127.0.0.1:${origin.address().port}/loop`,
    destination,
    {
      maxRedirects: 1,
      validateUrl: async rawUrl => new URL(rawUrl)
    }
  );
  await new Promise(resolve => origin.close(resolve));
  fs.rmSync(fixtureRoot, { recursive: true, force: true });

  assert.equal(requests, 2);
  assert.equal(result, false);
});
