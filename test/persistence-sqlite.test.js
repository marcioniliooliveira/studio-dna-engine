/**
 * test/persistence-sqlite.test.js
 *
 * Dedicated unit and integration tests for native SQLite persistence engine.
 */

'use strict';

const { describe, test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');

const SqliteEngine = require('../src/persistence/sqlite-engine');
const { SqliteEngine: NamedSqliteEngine } = require('../src/persistence/sqlite-engine');

describe('SqliteEngine Unit & Integration Suite', () => {
  let tempDir;
  let dbFilePath;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'studio_dna_sqlite_test_'));
    dbFilePath = path.join(tempDir, 'test.db');
  });

  afterEach(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (_) {}
    }
  });

  test('dual export exports the same SqliteEngine class', () => {
    assert.equal(typeof SqliteEngine, 'function');
    assert.equal(SqliteEngine, NamedSqliteEngine);
  });

  test('initializes in-memory database with schema tables and indexes', () => {
    const engine = new SqliteEngine({ dbPath: ':memory:' });
    engine.init();

    assert.equal(engine.isOpen, true);

    const tables = engine.all("SELECT name FROM sqlite_master WHERE type = 'table'").map(r => r.name);
    assert.ok(tables.includes('sites'), 'sites table must exist');
    assert.ok(tables.includes('analysis_runs'), 'analysis_runs table must exist');
    assert.ok(tables.includes('quality_audits'), 'quality_audits table must exist');
    assert.ok(tables.includes('file_catalog'), 'file_catalog table must exist');

    const indexes = engine.all("SELECT name FROM sqlite_master WHERE type = 'index'").map(r => r.name);
    assert.ok(indexes.includes('idx_runs_slug'), 'idx_runs_slug must exist');
    assert.ok(indexes.includes('idx_runs_status'), 'idx_runs_status must exist');
    assert.ok(indexes.includes('idx_audits_runId'), 'idx_audits_runId must exist');
    assert.ok(indexes.includes('idx_files_slug'), 'idx_files_slug must exist');
    assert.ok(indexes.includes('idx_runs_created'), 'idx_runs_created must exist');

    engine.close();
    assert.equal(engine.isOpen, false);
  });

  test('executes CRUD operations using prepare, run, get, and all', () => {
    const engine = new SqliteEngine({ dbPath: ':memory:' }).init();

    const now = new Date().toISOString();
    const runRes = engine.run(
      'INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
      'site-1',
      'example.com',
      'Example',
      'active',
      now
    );
    assert.equal(runRes.changes, 1);

    const site = engine.get('SELECT * FROM sites WHERE id = ?', 'site-1');
    assert.ok(site);
    assert.equal(site.domain, 'example.com');
    assert.equal(site.name, 'Example');

    engine.run('UPDATE sites SET name = ? WHERE id = ?', 'Updated Example', 'site-1');
    const updated = engine.get('SELECT name FROM sites WHERE id = ?', 'site-1');
    assert.equal(updated.name, 'Updated Example');

    const allSites = engine.all('SELECT * FROM sites');
    assert.equal(allSites.length, 1);

    engine.run('DELETE FROM sites WHERE id = ?', 'site-1');
    const remaining = engine.all('SELECT * FROM sites');
    assert.equal(remaining.length, 0);

    engine.close();
  });

  test('handles synchronous transactions with commit and rollback', () => {
    const engine = new SqliteEngine({ dbPath: ':memory:' }).init();
    const now = new Date().toISOString();

    // Successful transaction
    engine.transaction(() => {
      engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's1', 's1.com', 'Site 1', 'active', now);
      engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's2', 's2.com', 'Site 2', 'active', now);
    });

    assert.equal(engine.all('SELECT * FROM sites').length, 2);

    // Failing transaction rollbacks all statements
    assert.throws(() => {
      engine.transaction(() => {
        engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's3', 's3.com', 'Site 3', 'active', now);
        throw new Error('Simulated failure');
      });
    }, /Simulated failure/);

    const count = engine.get('SELECT COUNT(*) as c FROM sites').c;
    assert.equal(count, 2, 'Failing transaction must not persist uncommitted rows');

    engine.close();
  });

  test('handles asynchronous promise-returning transactions', async () => {
    const engine = new SqliteEngine({ dbPath: ':memory:' }).init();
    const now = new Date().toISOString();

    await engine.transaction(async () => {
      await new Promise(r => setTimeout(r, 10));
      engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's-async', 'async.com', 'Async', 'active', now);
    });

    assert.equal(engine.all('SELECT * FROM sites').length, 1);

    await assert.rejects(async () => {
      await engine.transaction(async () => {
        await new Promise(r => setTimeout(r, 10));
        engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's-fail', 'fail.com', 'Fail', 'active', now);
        throw new Error('Async boom');
      });
    }, /Async boom/);

    assert.equal(engine.all('SELECT * FROM sites').length, 1);
    engine.close();
  });

  test('serializes concurrent async transactions on the same instance without interleaving', async () => {
    const engine = new SqliteEngine({ dbPath: ':memory:' }).init();
    const now = new Date().toISOString();
    const executionOrder = [];

    const tx1 = engine.transaction(async () => {
      executionOrder.push('tx1-start');
      await new Promise(r => setTimeout(r, 25));
      engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's-tx1', 'tx1.com', 'Tx 1', 'active', now);
      executionOrder.push('tx1-end');
      return 'val1';
    });

    const tx2 = engine.transaction(async () => {
      executionOrder.push('tx2-start');
      await new Promise(r => setTimeout(r, 10));
      engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's-tx2', 'tx2.com', 'Tx 2', 'active', now);
      executionOrder.push('tx2-end');
      return 'val2';
    });

    const [res1, res2] = await Promise.all([tx1, tx2]);
    assert.equal(res1, 'val1');
    assert.equal(res2, 'val2');

    // Verify sequential execution without interleaving
    assert.deepEqual(executionOrder, ['tx1-start', 'tx1-end', 'tx2-start', 'tx2-end']);

    const sites = engine.all('SELECT id FROM sites').map(s => s.id);
    assert.deepEqual(sites.sort(), ['s-tx1', 's-tx2']);
    engine.close();
  });

  test('handles nested transactions via savepoints', () => {
    const engine = new SqliteEngine({ dbPath: ':memory:' }).init();
    const now = new Date().toISOString();

    engine.transaction(() => {
      engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's-outer', 'outer.com', 'Outer', 'active', now);

      try {
        engine.transaction(() => {
          engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's-inner-fail', 'inner.com', 'Inner', 'active', now);
          throw new Error('Inner error');
        });
      } catch (_) {}

      engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's-outer-2', 'outer2.com', 'Outer 2', 'active', now);
    });

    const sites = engine.all('SELECT id FROM sites').map(s => s.id);
    assert.deepEqual(sites.sort(), ['s-outer', 's-outer-2']);
    engine.close();
  });

  test('enforces foreign key cascading and nullification', () => {
    const engine = new SqliteEngine({ dbPath: ':memory:' }).init();
    const now = new Date().toISOString();

    engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 'site-fk', 'fk.com', 'FK Site', 'active', now);
    engine.run(
      'INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      'run-fk',
      'site-fk',
      'fk-slug',
      'https://fk.com',
      'standard',
      'passed',
      now
    );
    engine.run(
      'INSERT INTO quality_audits (id, runId, siteSlug, auditType, passed, score, metricsJson, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      'audit-fk',
      'run-fk',
      'fk-slug',
      'anti-slop',
      1,
      95.5,
      '{}',
      now
    );

    // 1. Deleting site should SET NULL on analysis_runs.siteId
    engine.run('DELETE FROM sites WHERE id = ?', 'site-fk');
    const run = engine.get('SELECT * FROM analysis_runs WHERE id = ?', 'run-fk');
    assert.ok(run);
    assert.equal(run.siteId, null, 'siteId must be nullified on site deletion');

    // 2. Deleting analysis_run should CASCADE delete quality_audits
    engine.run('DELETE FROM analysis_runs WHERE id = ?', 'run-fk');
    const audit = engine.get('SELECT * FROM quality_audits WHERE id = ?', 'audit-fk');
    assert.equal(audit, undefined, 'audit must be cascade-deleted on run deletion');

    engine.close();
  });

  test('file-based database supports WAL mode and re-opening', () => {
    const engine1 = new SqliteEngine({ dbPath: dbFilePath }).init();
    const now = new Date().toISOString();
    engine1.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 'p1', 'persist.com', 'Persist', 'active', now);
    engine1.close();

    // Reopen from disk
    const engine2 = new SqliteEngine({ dbPath: dbFilePath }).init();
    const site = engine2.get('SELECT * FROM sites WHERE id = ?', 'p1');
    assert.ok(site);
    assert.equal(site.name, 'Persist');
    engine2.close();
  });
});
