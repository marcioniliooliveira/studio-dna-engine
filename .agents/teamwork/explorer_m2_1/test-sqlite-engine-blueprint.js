'use strict';

const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');

class SqliteEngine {
  constructor(options = {}) {
    this.dbPath = options.dbPath || ':memory:';
    this.busyTimeout = Number(options.busyTimeout) || 5000;
    this.db = null;
    this.isInitialized = false;
    this._statements = new Map();
    this._txDepth = 0;
  }

  init() {
    if (this.isInitialized && this.db) return this;

    if (this.dbPath !== ':memory:' && !this.dbPath.startsWith('file::memory:')) {
      const dir = path.dirname(path.resolve(this.dbPath));
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    this.db = new DatabaseSync(this.dbPath);

    if (this.dbPath !== ':memory:' && !this.dbPath.startsWith('file::memory:')) {
      this.db.exec('PRAGMA journal_mode = WAL;');
    }
    this.db.exec(`PRAGMA busy_timeout = ${this.busyTimeout};`);
    this.db.exec('PRAGMA foreign_keys = ON;');
    this.db.exec('PRAGMA synchronous = NORMAL;');
    this.db.exec('PRAGMA temp_store = MEMORY;');
    this.db.exec('PRAGMA cache_size = -64000;');

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sites (
        id TEXT PRIMARY KEY,
        domain TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS analysis_runs (
        id TEXT PRIMARY KEY,
        siteId TEXT,
        siteSlug TEXT NOT NULL,
        targetUrl TEXT NOT NULL,
        mode TEXT NOT NULL,
        model TEXT,
        status TEXT NOT NULL,
        outputTokens INTEGER DEFAULT 0,
        costUsd REAL DEFAULT 0.0,
        artifactHash TEXT,
        documentRef TEXT,
        createdAt TEXT NOT NULL,
        completedAt TEXT,
        FOREIGN KEY(siteId) REFERENCES sites(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS quality_audits (
        id TEXT PRIMARY KEY,
        runId TEXT NOT NULL,
        siteSlug TEXT NOT NULL,
        auditType TEXT NOT NULL,
        passed INTEGER NOT NULL,
        score REAL NOT NULL,
        metricsJson TEXT NOT NULL,
        rawReportRef TEXT,
        createdAt TEXT NOT NULL,
        FOREIGN KEY(runId) REFERENCES analysis_runs(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS file_catalog (
        id TEXT PRIMARY KEY,
        siteSlug TEXT NOT NULL,
        relativePath TEXT NOT NULL,
        fileType TEXT NOT NULL,
        sizeBytes INTEGER NOT NULL,
        sha256 TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_runs_slug ON analysis_runs(siteSlug);
      CREATE INDEX IF NOT EXISTS idx_runs_status ON analysis_runs(status);
      CREATE INDEX IF NOT EXISTS idx_audits_runId ON quality_audits(runId);
      CREATE INDEX IF NOT EXISTS idx_files_slug ON file_catalog(siteSlug);
      CREATE INDEX IF NOT EXISTS idx_runs_created ON analysis_runs(createdAt DESC);
      CREATE INDEX IF NOT EXISTS idx_audits_slug ON quality_audits(siteSlug);
      CREATE INDEX IF NOT EXISTS idx_files_path ON file_catalog(relativePath);
    `);

    this.isInitialized = true;
    return this;
  }

  _assertOpen() {
    if (!this.db) {
      throw new Error('Database is not initialized or has been closed. Call init() first.');
    }
  }

  prepare(sql) {
    this._assertOpen();
    let stmt = this._statements.get(sql);
    if (!stmt) {
      stmt = this.db.prepare(sql);
      this._statements.set(sql, stmt);
    }
    return stmt;
  }

  exec(sql) {
    this._assertOpen();
    return this.db.exec(sql);
  }

  run(sql, ...params) {
    return this.prepare(sql).run(...params);
  }

  get(sql, ...params) {
    return this.prepare(sql).get(...params);
  }

  all(sql, ...params) {
    return this.prepare(sql).all(...params);
  }

  transaction(fn) {
    this._assertOpen();
    const currentDepth = this._txDepth;
    this._txDepth++;
    const spName = `sp_${currentDepth}`;

    if (currentDepth === 0) {
      this.db.exec('BEGIN IMMEDIATE');
    } else {
      this.db.exec(`SAVEPOINT ${spName}`);
    }

    try {
      const res = fn();
      if (res && typeof res.then === 'function') {
        return res.then(
          val => {
            if (currentDepth === 0) this.db.exec('COMMIT');
            else this.db.exec(`RELEASE ${spName}`);
            return val;
          },
          err => {
            if (currentDepth === 0) this.db.exec('ROLLBACK');
            else this.db.exec(`ROLLBACK TO ${spName}`);
            throw err;
          }
        ).finally(() => {
          this._txDepth--;
        });
      }

      if (currentDepth === 0) {
        this.db.exec('COMMIT');
      } else {
        this.db.exec(`RELEASE ${spName}`);
      }
      this._txDepth--;
      return res;
    } catch (err) {
      if (currentDepth === 0) {
        this.db.exec('ROLLBACK');
      } else {
        this.db.exec(`ROLLBACK TO ${spName}`);
      }
      this._txDepth--;
      throw err;
    }
  }

  close() {
    this._statements.clear();
    if (this.db) {
      this.db.close();
      this.db = null;
    }
    this.isInitialized = false;
  }
}

async function runVerification() {
  console.log('1. Testing In-Memory initialization and DDL...');
  const engine = new SqliteEngine();
  engine.init();

  const tables = engine.all("SELECT name FROM sqlite_master WHERE type='table'").map(t => t.name);
  assert.ok(tables.includes('sites'), 'Missing sites table');
  assert.ok(tables.includes('analysis_runs'), 'Missing analysis_runs table');
  assert.ok(tables.includes('quality_audits'), 'Missing quality_audits table');
  assert.ok(tables.includes('file_catalog'), 'Missing file_catalog table');

  console.log('2. Testing CRUD & prepared statement helpers...');
  engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's1', 'alpha.com', 'Alpha', 'active', '2026-01-01');
  const site = engine.get('SELECT * FROM sites WHERE id = ?', 's1');
  assert.equal(site.domain, 'alpha.com');
  assert.equal(site.name, 'Alpha');

  const allSites = engine.all('SELECT * FROM sites');
  assert.equal(allSites.length, 1);

  console.log('3. Testing synchronous transactions & savepoint nesting...');
  engine.transaction(() => {
    engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's2', 'beta.com', 'Beta', 'active', '2026-01-01');
    engine.transaction(() => {
      engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's3', 'gamma.com', 'Gamma', 'active', '2026-01-01');
    });
  });
  assert.equal(engine.all('SELECT * FROM sites').length, 3);

  // Nested failure with partial rollback
  engine.transaction(() => {
    engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's4', 'delta.com', 'Delta', 'active', '2026-01-01');
    try {
      engine.transaction(() => {
        engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's5', 'epsilon.com', 'Epsilon', 'active', '2026-01-01');
        throw new Error('Inner rollback trigger');
      });
    } catch (_) {}
  });
  // s4 should be committed, s5 should be rolled back
  assert.equal(engine.get('SELECT domain FROM sites WHERE id = ?', 's4').domain, 'delta.com');
  assert.equal(engine.get('SELECT domain FROM sites WHERE id = ?', 's5'), undefined);

  console.log('4. Testing async transactions...');
  await engine.transaction(async () => {
    engine.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's-async', 'async.com', 'Async', 'active', '2026-01-01');
    await new Promise(r => setTimeout(r, 10));
  });
  assert.equal(engine.get('SELECT domain FROM sites WHERE id = ?', 's-async').domain, 'async.com');

  console.log('5. Testing Foreign Key Constraints (CASCADE and SET NULL)...');
  engine.run(
    'INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
    'r1', 's1', 'alpha', 'https://alpha.com', 'standard', 'running', '2026-01-01'
  );
  engine.run(
    'INSERT INTO quality_audits (id, runId, siteSlug, auditType, passed, score, metricsJson, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    'q1', 'r1', 'alpha', 'anti-slop', 1, 95.5, '{}', '2026-01-01'
  );

  // Delete s1 -> r1.siteId should become null
  engine.run('DELETE FROM sites WHERE id = ?', 's1');
  assert.equal(engine.get('SELECT siteId FROM analysis_runs WHERE id = ?', 'r1').siteId, null);

  // Delete r1 -> q1 should cascade delete
  engine.run('DELETE FROM analysis_runs WHERE id = ?', 'r1');
  assert.equal(engine.get('SELECT id FROM quality_audits WHERE id = ?', 'q1'), undefined);

  console.log('6. Testing direct engine.db property compatibility with r1-r5-harness...');
  assert.equal(typeof engine.db.prepare, 'function');
  assert.equal(typeof engine.db.exec, 'function');
  const directStmt = engine.db.prepare('SELECT COUNT(*) as cnt FROM sites');
  assert.ok(directStmt.get().cnt > 0);

  engine.close();
  assert.equal(engine.db, null);
  assert.equal(engine.isInitialized, false);

  console.log('7. Testing Disk-based File WAL initialization and persistence across re-opens...');
  const tmpDir = path.join(os.tmpdir(), `studio_dna_test_${Date.now()}`);
  const dbFilePath = path.join(tmpDir, 'data', 'studio_dna.db');

  const diskEngine1 = new SqliteEngine({ dbPath: dbFilePath, busyTimeout: 3000 });
  diskEngine1.init();

  // Verify WAL mode was set on disk
  const jm = diskEngine1.get('PRAGMA journal_mode;');
  assert.equal(jm.journal_mode, 'wal');

  diskEngine1.run('INSERT INTO sites VALUES (?, ?, ?, ?, ?)', 's-disk', 'disk.com', 'Disk Site', 'active', '2026-01-01');
  diskEngine1.close();

  // Re-open
  const diskEngine2 = new SqliteEngine({ dbPath: dbFilePath });
  diskEngine2.init();
  const reloaded = diskEngine2.get('SELECT * FROM sites WHERE id = ?', 's-disk');
  assert.ok(reloaded);
  assert.equal(reloaded.domain, 'disk.com');
  diskEngine2.close();

  // Cleanup disk test
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (_) {}

  console.log('\n>>> ALL 7 TEST CHECKS PASSED WITH 100% SUCCESS! <<<');
}

runVerification().catch(err => {
  console.error('VERIFICATION FAILED:', err);
  process.exit(1);
});
