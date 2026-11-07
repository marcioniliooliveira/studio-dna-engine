/**
 * test/persistence-docstore.test.js
 *
 * Dedicated unit and integration tests for embedded NoSQL DocumentStore.
 */

'use strict';

const { describe, test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const DocumentStore = require('../src/persistence/document-store');
const { DocumentStore: NamedStore, Collection } = require('../src/persistence/document-store');

describe('DocumentStore Unit & Integration Suite', () => {
  let tempBaseDir;

  beforeEach(() => {
    tempBaseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'studio_dna_docstore_test_'));
  });

  afterEach(() => {
    if (tempBaseDir && fs.existsSync(tempBaseDir)) {
      try {
        fs.rmSync(tempBaseDir, { recursive: true, force: true });
      } catch (_) {}
    }
  });

  test('dual export exports DocumentStore and Collection properly', () => {
    assert.equal(typeof DocumentStore, 'function');
    assert.equal(DocumentStore, NamedStore);
    assert.equal(typeof Collection, 'function');
  });

  test('initializes base directory and manages collections', async () => {
    const store = new DocumentStore({ basePath: tempBaseDir });
    await store.init();

    const col = store.getCollection('test_collection');
    assert.equal(col.name, 'test_collection');
    assert.ok(fs.existsSync(path.join(tempBaseDir, 'test_collection')));

    const collections = await store.listCollections();
    assert.ok(collections.includes('test_collection'));

    const dropped = await store.dropCollection('test_collection');
    assert.equal(dropped, true);
    assert.equal(fs.existsSync(path.join(tempBaseDir, 'test_collection')), false);
  });

  test('atomic write persists JSON document and cleans up temporary files', async () => {
    const store = new DocumentStore({ basePath: tempBaseDir });
    const col = store.getCollection('atomic_test');

    const doc = { name: 'Test Document', counter: 42 };
    const res = await col.insertOne(doc);
    assert.ok(res.insertedId);
    assert.equal(res.document.name, 'Test Document');
    assert.ok(res.document.createdAt);
    assert.ok(res.document.updatedAt);

    // Verify file on disk
    const targetFile = path.join(tempBaseDir, 'atomic_test', `${res.insertedId}.json`);
    assert.ok(fs.existsSync(targetFile));

    // Verify no .tmp files remain
    const files = fs.readdirSync(path.join(tempBaseDir, 'atomic_test'));
    const tmpFiles = files.filter(f => f.endsWith('.tmp'));
    assert.equal(tmpFiles.length, 0, 'No temporary files should linger after insert');
  });

  test('supports CRUD operations: insertMany, findById, updateOne, deleteById', async () => {
    const store = new DocumentStore({ basePath: tempBaseDir });
    const col = store.getCollection('crud_test');

    const batch = [
      { _id: 'doc-1', title: 'First', score: 10 },
      { _id: 'doc-2', title: 'Second', score: 20 },
      { _id: 'doc-3', title: 'Third', score: 30 }
    ];

    const insertBatchRes = await col.insertMany(batch);
    assert.equal(insertBatchRes.insertedCount, 3);
    assert.deepEqual(insertBatchRes.insertedIds, ['doc-1', 'doc-2', 'doc-3']);

    // findById
    const doc1 = await col.findById('doc-1');
    assert.ok(doc1);
    assert.equal(doc1.title, 'First');

    const nonExistent = await col.findById('non-existent');
    assert.equal(nonExistent, null);

    // updateOne
    const updateRes = await col.updateOne('doc-2', { title: 'Updated Second', score: 25 });
    assert.equal(updateRes.matchedCount, 1);
    assert.equal(updateRes.modifiedCount, 1);
    assert.equal(updateRes.document.title, 'Updated Second');
    assert.equal(updateRes.document.score, 25);
    assert.equal(updateRes.document._id, 'doc-2');

    const doc2After = await col.findById('doc-2');
    assert.equal(doc2After.title, 'Updated Second');

    // deleteById
    const delRes = await col.deleteById('doc-3');
    assert.equal(delRes.deletedCount, 1);
    const doc3After = await col.findById('doc-3');
    assert.equal(doc3After, null);

    // clear
    const clearRes = await col.clear();
    assert.equal(clearRes.deletedCount, 2);
    assert.equal(await col.count(), 0);
  });

  test('find supports dot-notation, predicate functions, sorting, and pagination', async () => {
    const store = new DocumentStore({ basePath: tempBaseDir });
    const col = store.getCollection('query_test');

    await col.insertOne({
      _id: 'a1',
      site: 'site-a',
      tokens: { primary: '#111', meta: { level: 1 } },
      tags: ['web', 'kinetic']
    });
    await col.insertOne({
      _id: 'a2',
      site: 'site-b',
      tokens: { primary: '#222', meta: { level: 2 } },
      tags: ['static']
    });
    await col.insertOne({
      _id: 'a3',
      site: 'site-c',
      tokens: { primary: '#111', meta: { level: 3 } },
      tags: ['web', 'threejs']
    });

    // Dot-notation filter
    const dotMatches = await col.find({ 'tokens.primary': '#111' });
    assert.equal(dotMatches.length, 2);

    const deepDotMatches = await col.find({ 'tokens.meta.level': 2 });
    assert.equal(deepDotMatches.length, 1);
    assert.equal(deepDotMatches[0]._id, 'a2');

    // Array inclusion filter
    const tagMatches = await col.find({ tags: 'kinetic' });
    assert.equal(tagMatches.length, 1);
    assert.equal(tagMatches[0]._id, 'a1');

    // Predicate filter function
    const predicateMatches = await col.find(doc => doc.tokens && doc.tokens.meta.level >= 2);
    assert.equal(predicateMatches.length, 2);

    // Sorting and pagination
    const sorted = await col.find({}, { sortBy: 'site', sortOrder: 'asc', limit: 2, offset: 1 });
    assert.equal(sorted.length, 2);
    assert.equal(sorted[0].site, 'site-b');
    assert.equal(sorted[1].site, 'site-c');

    // Fast-path count
    assert.equal(await col.count(), 3);
    assert.equal(await col.count({ 'tokens.primary': '#111' }), 2);
  });

  test('guards against path traversal in collection names and document IDs', async () => {
    const store = new DocumentStore({ basePath: tempBaseDir });

    // Invalid collection names
    assert.throws(() => store.getCollection('../forbidden'), /Invalid collection name/);
    assert.throws(() => store.getCollection('bad/name'), /Invalid collection name/);
    assert.throws(() => store.getCollection(''), /Collection name must be a non-empty string/);

    const col = store.getCollection('safe_collection');

    // Invalid document IDs
    await assert.rejects(async () => {
      await col.insertOne({ _id: '../../etc/passwd', data: 1 });
    }, /path traversal characters not permitted/);

    assert.equal(await col.findById('../../etc/passwd'), null);
    assert.equal((await col.deleteById('../../etc/passwd')).deletedCount, 0);
  });

  test('rejects Windows NTFS reserved characters in document IDs', async () => {
    const store = new DocumentStore({ basePath: tempBaseDir });
    const col = store.getCollection('ntfs_test');

    const illegalIds = [
      'run:2026-11-06T15:00:00Z',
      'doc<bad>',
      'doc>bad',
      'doc"bad"',
      'doc|pipe',
      'doc?question',
      'doc*star'
    ];

    for (const illegalId of illegalIds) {
      await assert.rejects(async () => {
        await col.insertOne({ _id: illegalId, val: 1 });
      }, /Windows NTFS reserved characters/);

      assert.equal(await col.findById(illegalId), null);
      assert.equal((await col.deleteById(illegalId)).deletedCount, 0);
    }
  });

  test('handles oversized 15MB payload efficiently without data corruption', async () => {
    const store = new DocumentStore({ basePath: tempBaseDir });
    const col = store.getCollection('heavy_collection');

    const chunk = { tag: 'section', classes: ['kinetic', 'hero', 'fluid'], depth: 5 };
    const elements = new Array(25000).fill(chunk);
    const heavyPayload = { site: 'heavy-test', ast: elements };

    const ins = await col.insertOne(heavyPayload);
    assert.ok(ins.insertedId);

    const fetched = await col.findById(ins.insertedId);
    assert.ok(fetched);
    assert.equal(fetched.site, 'heavy-test');
    assert.equal(fetched.ast.length, 25000);

    const del = await col.deleteById(ins.insertedId);
    assert.equal(del.deletedCount, 1);
  });
});
