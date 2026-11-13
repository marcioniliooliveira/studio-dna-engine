/**
 * src/persistence/hybrid-repository.js
 *
 * Hybrid Persistence Coordinator for Studio DNA v3.0.
 * Coordinates native SQLite (relational engine) and Embedded DocumentStore (NoSQL).
 *
 * Conforms to Requirement R3 (Feature F07).
 */

'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const SqliteEngine = require('./sqlite-engine');
const DocumentStore = require('./document-store');

const PROJECT_ROOT = path.resolve(__dirname, '../..');

/**
 * Synchronously and atomically writes JSON data to filePath via a temporary file and atomic rename.
 * Creates intermediate directories if needed and retries on transient file locks (Windows EPERM/EBUSY).
 * @param {string} filePath - Target file path
 * @param {Object|string} data - JSON serializable object or string
 */
function writeJsonAtomicSync(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const serialized = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const tempPath = `${filePath}.${crypto.randomBytes(6).toString('hex')}.tmp`;
  fs.writeFileSync(tempPath, serialized, 'utf8');

  const maxRetries = 5;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      fs.renameSync(tempPath, filePath);
      return;
    } catch (err) {
      if ((err.code === 'EPERM' || err.code === 'EBUSY') && attempt < maxRetries) {
        const start = Date.now();
        while (Date.now() - start < attempt * 10) {}
        continue;
      }
      try {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      } catch (_) {}
      throw err;
    }
  }
}

class HybridRepository {
  /**
   * @param {Object} [options]
   * @param {string} [options.dbPath] - SQLite database path
   * @param {string} [options.docBasePath] - DocumentStore base directory
   * @param {SqliteEngine} [options.sqliteEngine] - Injected SQLite engine instance
   * @param {DocumentStore} [options.docStore] - Injected DocumentStore instance
   * @param {number} [options.busyTimeout] - SQLite busy timeout in ms
   */
  constructor(options = {}) {
    this.dbPath = options.dbPath || process.env.STUDIO_DNA_DB || ':memory:';
    this.docBasePath = options.docBasePath || process.env.STUDIO_DNA_DOCS || path.join(os.tmpdir(), `studio_dna_docs_${crypto.randomBytes(4).toString('hex')}`);

    this.sqliteEngine = options.sqliteEngine || new SqliteEngine({
      dbPath: this.dbPath,
      busyTimeout: options.busyTimeout || 5000
    });
    this.docStore = options.docStore || new DocumentStore({
      basePath: this.docBasePath
    });
    this.isInitialized = false;
  }

  /**
   * Initializes both persistence engines.
   * @returns {Promise<HybridRepository>}
   */
  async init() {
    if (this.isInitialized) return this;
    this.sqliteEngine.init();
    await this.docStore.init();
    this.isInitialized = true;
    return this;
  }

  /**
   * Starts a new analysis run, creating a site record if absent.
   * @param {Object} params
   * @param {string} params.siteSlug
   * @param {string} params.targetUrl
   * @param {string} [params.mode='standard']
   * @param {string} [params.model='pareto-v3']
   * @param {string} [params.inputHash='']
   * @returns {Promise<{ runId: string, status: string, createdAt: string }>}
   */
  async startAnalysisRun({ siteSlug, targetUrl, mode = 'standard', model = 'pareto-v3', inputHash = '' }) {
    this._assertInit();
    const runId = crypto.randomUUID();
    const now = new Date().toISOString();

    let site = this.sqliteEngine.get('SELECT id FROM sites WHERE name = ? OR domain = ?', siteSlug, `${siteSlug}.local`);
    let siteId;
    if (!site) {
      siteId = crypto.randomUUID();
      this.sqliteEngine.run(
        'INSERT OR IGNORE INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
        siteId,
        `${siteSlug}.local`,
        siteSlug,
        'active',
        now
      );
    } else {
      siteId = site.id;
    }

    this.sqliteEngine.run(
      `INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, model, status, artifactHash, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, 'running', ?, ?)`,
      runId,
      siteId,
      siteSlug,
      targetUrl,
      mode,
      model,
      inputHash,
      now
    );

    return { runId, status: 'running', createdAt: now };
  }

  /**
   * Completes an analysis run and links raw scrape AST payload in NoSQL DocumentStore.
   * @param {string} runId
   * @param {Object} params
   * @param {string} [params.status='passed']
   * @param {number} [params.outputTokens=0]
   * @param {number} [params.costUsd=0.0]
   * @param {string} [params.artifactHash='']
   * @param {Object} [params.rawScrapePayload=null]
   * @returns {Promise<{ runId: string, status: string, documentRef: string|null, completedAt: string }>}
   */
  async completeAnalysisRun(runId, { status = 'passed', outputTokens = 0, costUsd = 0.0, artifactHash = '', rawScrapePayload = null } = {}) {
    this._assertInit();
    let docRef = null;
    if (rawScrapePayload) {
      const col = this.docStore.getCollection('scrape_payloads');
      const ins = await col.insertOne({ runId, payload: rawScrapePayload });
      docRef = ins.insertedId;
    }

    const now = new Date().toISOString();
    this.sqliteEngine.run(
      `UPDATE analysis_runs
       SET status = ?, outputTokens = ?, costUsd = ?, artifactHash = ?, documentRef = ?, completedAt = ?
       WHERE id = ?`,
      status,
      Number(outputTokens) || 0,
      Number(costUsd) || 0.0,
      artifactHash || '',
      docRef,
      now,
      runId
    );

    return { runId, status, documentRef: docRef, completedAt: now };
  }

  /**
   * Records a multi-factor quality audit and persists raw audit report in DocumentStore.
   * @param {Object} params
   * @param {string} params.runId
   * @param {string} params.siteSlug
   * @param {string} params.auditType
   * @param {boolean} params.passed
   * @param {number} params.score
   * @param {Object} [params.metrics={}]
   * @param {Object} [params.rawReport=null]
   * @returns {Promise<{ auditId: string, runId: string, passed: boolean, score: number, rawReportRef: string|null }>}
   */
  async recordQualityAudit({ runId, siteSlug, auditType, passed, score, metrics = {}, rawReport = null }) {
    this._assertInit();
    const auditId = crypto.randomUUID();
    let rawReportRef = null;
    if (rawReport) {
      const col = this.docStore.getCollection('audit_reports');
      const ins = await col.insertOne({ auditId, runId, siteSlug, rawReport });
      rawReportRef = ins.insertedId;
    }

    const now = new Date().toISOString();
    this.sqliteEngine.run(
      `INSERT INTO quality_audits (id, runId, siteSlug, auditType, passed, score, metricsJson, rawReportRef, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      auditId,
      runId,
      siteSlug,
      auditType,
      passed ? 1 : 0,
      Number(score) || 0.0,
      JSON.stringify(metrics || {}),
      rawReportRef,
      now
    );

    return { auditId, runId, passed: Boolean(passed), score: Number(score) || 0.0, rawReportRef };
  }

  /**
   * Lists analysis runs with filtering and pagination.
   * @param {Object} [options]
   * @param {string} [options.siteSlug]
   * @param {string} [options.status]
   * @param {number} [options.limit=50]
   * @param {number} [options.offset=0]
   * @param {string} [options.sortBy='createdAt']
   * @param {'ASC'|'DESC'} [options.sortOrder='DESC']
   * @returns {Promise<Array<Object>>}
   */
  async listAnalysisRuns({ siteSlug = null, status = null, limit = 50, offset = 0, sortBy = 'createdAt', sortOrder = 'DESC' } = {}) {
    this._assertInit();
    const allowedSort = ['createdAt', 'status', 'siteSlug', 'costUsd', 'outputTokens'];
    const safeSort = allowedSort.includes(sortBy) ? sortBy : 'createdAt';
    const safeOrder = String(sortOrder).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const safeLimit = Math.max(1, Math.min(100, Number(limit) || 50));
    const safeOffset = Math.max(0, Number(offset) || 0);

    let query = 'SELECT * FROM analysis_runs WHERE 1=1';
    const params = [];
    if (siteSlug) {
      query += ' AND siteSlug = ?';
      params.push(siteSlug);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    query += ` ORDER BY ${safeSort} ${safeOrder} LIMIT ? OFFSET ?`;
    params.push(safeLimit, safeOffset);

    return this.sqliteEngine.all(query, ...params);
  }

  /**
   * Counts total analysis runs matching filter criteria.
   * @param {Object} [options]
   * @param {string} [options.siteSlug]
   * @param {string} [options.status]
   * @returns {Promise<number>}
   */
  async countAnalysisRuns({ siteSlug = null, status = null } = {}) {
    this._assertInit();
    let query = 'SELECT COUNT(*) as count FROM analysis_runs WHERE 1=1';
    const params = [];
    if (siteSlug) {
      query += ' AND siteSlug = ?';
      params.push(siteSlug);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    const row = this.sqliteEngine.get(query, ...params);
    return row ? row.count : 0;
  }

  /**
   * Retrieves complete run details, joining audits and raw document payload.
   * @param {string} runId
   * @returns {Promise<Object|null>}
   */
  async getRunDetails(runId) {
    this._assertInit();
    const run = this.sqliteEngine.get('SELECT * FROM analysis_runs WHERE id = ?', runId);
    if (!run) return null;

    const auditRows = this.sqliteEngine.all('SELECT * FROM quality_audits WHERE runId = ? ORDER BY createdAt DESC', runId);
    const audits = auditRows.map(a => {
      let metrics = {};
      try { metrics = JSON.parse(a.metricsJson); } catch (_) {}
      return { ...a, metrics, passed: Number(a.passed) };
    });

    let rawDocument = null;
    if (run.documentRef) {
      const col = this.docStore.getCollection('scrape_payloads');
      rawDocument = await col.findById(run.documentRef);
    }

    return {
      ...run,
      audits,
      rawDocument
    };
  }

  /**
   * Aggregates real-time KPI metrics for the control panel dashboard.
   * @returns {Promise<Object>}
   */
  async getDashboardAnalytics() {
    this._assertInit();
    const totalRuns = (this.sqliteEngine.get('SELECT COUNT(*) as c FROM analysis_runs') || {}).c || 0;
    const passedRuns = (this.sqliteEngine.get("SELECT COUNT(*) as c FROM analysis_runs WHERE status = 'passed'") || {}).c || 0;
    const failedRuns = (this.sqliteEngine.get("SELECT COUNT(*) as c FROM analysis_runs WHERE status = 'failed'") || {}).c || 0;
    const runningRuns = (this.sqliteEngine.get("SELECT COUNT(*) as c FROM analysis_runs WHERE status = 'running'") || {}).c || 0;
    const avgScoreRow = this.sqliteEngine.get('SELECT AVG(score) as avgScore FROM quality_audits') || {};
    const avgScore = Number(Number(avgScoreRow.avgScore || 0).toFixed(2));
    const totalsRow = this.sqliteEngine.get('SELECT SUM(outputTokens) as tokens, SUM(costUsd) as cost FROM analysis_runs') || {};

    return {
      totalRuns,
      passedRuns,
      failedRuns,
      runningRuns,
      passRate: totalRuns > 0 ? Number(((passedRuns / totalRuns) * 100).toFixed(2)) : 0,
      averageAuditScore: avgScore,
      totalTokens: Number(totalsRow.tokens || 0),
      totalCostUsd: Number(Number(totalsRow.cost || 0).toFixed(4))
    };
  }

  /**
   * Dispatches historical filesystem synchronization.
   * @param {Object} [options]
   * @returns {Promise<Object>}
   */
  async syncExistingFilesystem(options = {}) {
    this._assertInit();
    const { SyncIngestor } = require('./sync-ingestor');
    const ingestor = new SyncIngestor({ hybridRepo: this, ...options });
    return ingestor.syncAll(options);
  }

  _assertInit() {
    if (!this.isInitialized) {
      throw new Error('HybridRepository is not initialized. Await repo.init() before operations.');
    }
  }

  /**
   * Caches active element live selection for a client in memory.
   * @param {string} slug
   * @param {Object} data
   */
  setLiveSelection(slug, data) {
    if (!slug) return;
    if (!this._liveSelections) {
      this._liveSelections = new Map();
    }
    this._liveSelections.set(slug, data);
  }

  /**
   * Retrieves active element live selection for a client from memory.
   * @param {string} slug
   * @returns {Object|null}
   */
  getLiveSelection(slug) {
    if (!slug) return null;
    if (this._liveSelections && this._liveSelections.has(slug)) {
      return this._liveSelections.get(slug);
    }
    return null;
  }

  /**
   * Closes database handles and cleans up ephemeral storage if applicable.
   */
  close() {
    this.sqliteEngine.close();
    if (this.docBasePath.includes('studio_dna_docs_') && fs.existsSync(this.docBasePath)) {
      try {
        fs.rmSync(this.docBasePath, { recursive: true, force: true });
      } catch (_) {}
    }
    this.isInitialized = false;
  }
}

module.exports = HybridRepository;
module.exports.HybridRepository = HybridRepository;
module.exports.writeJsonAtomicSync = writeJsonAtomicSync;
