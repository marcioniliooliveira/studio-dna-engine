/**
 * src/persistence/sqlite-engine.js
 *
 * Native SQLite Relational Persistence Engine.
 * Built with Node 24 native `node:sqlite` (DatabaseSync).
 * Supports WAL mode, foreign keys, busy timeout, prepared statement caching,
 * and nested transaction management via savepoints.
 *
 * Conforms strictly to ORIGINAL_REQUEST.md and PROJECT.md (Requirement R3, Feature F05).
 */

'use strict';

const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const DEFAULT_DB_PATH = process.env.STUDIO_DNA_DB || path.join(PROJECT_ROOT, 'data/studio_dna.db');

class SqliteEngine {
  /**
   * @param {Object} [options]
   * @param {string} [options.dbPath] - Database path (':memory:' or filesystem path)
   * @param {number} [options.busyTimeout] - Busy timeout in ms (default: 5000)
   */
  constructor(options = {}) {
    this.dbPath = options.dbPath !== undefined ? options.dbPath : DEFAULT_DB_PATH;
    this.busyTimeout = Number(options.busyTimeout) || 5000;
    this.db = null;
    this.isInitialized = false;
    this._statements = new Map();
    this._txDepth = 0;
  }

  /**
   * Initializes database connection, pragmas, schema DDL, and indexes.
   * Idempotent: safe to call multiple times.
   * @returns {SqliteEngine} this instance
   */
  init() {
    if (this.isInitialized && this.db) {
      return this;
    }

    // Ensure parent directory exists for file-based databases
    const isMemory = this.dbPath === ':memory:' || this.dbPath.startsWith('file::memory:');
    if (!isMemory) {
      const targetDir = path.dirname(path.resolve(this.dbPath));
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
    }

    this.db = new DatabaseSync(this.dbPath);

    // Apply PRAGMAs
    if (!isMemory) {
      this.db.exec('PRAGMA journal_mode = WAL;');
    }
    this.db.exec(`PRAGMA busy_timeout = ${this.busyTimeout};`);
    this.db.exec('PRAGMA foreign_keys = ON;');
    this.db.exec('PRAGMA synchronous = NORMAL;');
    this.db.exec('PRAGMA temp_store = MEMORY;');
    this.db.exec('PRAGMA cache_size = -64000;');

    // Apply Schema DDL
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

  /**
   * Prepares and caches an SQL statement.
   * @param {string} sql
   * @returns {import('node:sqlite').StatementSync}
   */
  prepare(sql) {
    this._assertOpen();
    let stmt = this._statements.get(sql);
    if (!stmt) {
      stmt = this.db.prepare(sql);
      this._statements.set(sql, stmt);
    }
    return stmt;
  }

  /**
   * Executes arbitrary SQL string without parameters.
   * @param {string} sql
   */
  exec(sql) {
    this._assertOpen();
    return this.db.exec(sql);
  }

  /**
   * Executes a prepared statement with parameters (INSERT/UPDATE/DELETE).
   * @param {string} sql
   * @param  {...any} params
   * @returns {{ changes: number, lastInsertRowid: number | bigint }}
   */
  run(sql, ...params) {
    return this.prepare(sql).run(...params);
  }

  /**
   * Fetches the first matching row.
   * @param {string} sql
   * @param  {...any} params
   * @returns {Object|undefined}
   */
  get(sql, ...params) {
    return this.prepare(sql).get(...params);
  }

  /**
   * Fetches all matching rows.
   * @param {string} sql
   * @param  {...any} params
   * @returns {Array<Object>}
   */
  all(sql, ...params) {
    return this.prepare(sql).all(...params);
  }

  /**
   * Executes fn inside an immediate transaction or nested savepoint.
   * Supports both synchronous functions and async Promise-returning functions.
   * @param {Function} fn
   * @returns {any} Result of fn
   */
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

  /**
   * Closes the database and finalizes cached statements.
   */
  close() {
    this._statements.clear();
    if (this.db) {
      this.db.close();
      this.db = null;
    }
    this.isInitialized = false;
  }

  get isOpen() {
    return Boolean(this.db);
  }
}

module.exports = SqliteEngine;
module.exports.SqliteEngine = SqliteEngine;
