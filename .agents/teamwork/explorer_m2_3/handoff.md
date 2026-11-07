# Milestone 2 Exploration Report: Hybrid Persistence Layer (HybridRepository, Sync Ingestor & Preview Server API)

**Agent**: `explorer_m2_3`  
**Milestone**: Milestone 2 (Hybrid Persistence Layer: HybridRepository, Sync Ingestor & Preview Server API)  
**Target Files**:
- `src/persistence/hybrid-repository.js`
- `src/persistence/sync-ingestor.js`
- `src/server/routes/v3-persistence.js`
- `src/server/preview-server.js` (integration)  
**Date**: 2026-11-06T15:22:00Z  

---

## 1. Observation

Direct examination of the workspace, contracts, runtime behavior, and test suites yielded the following empirical evidence:

### 1.1 Test Harness & Contract Expectations
1. **Dynamic Resolver Contract (`test/e2e/r1-r5-harness.js`)**:
   - Lines 422–434 define `resolveHybridRepository`:
     ```javascript
     function resolveHybridRepository(options = {}) {
       const candidatePath = path.join(PROJECT_ROOT, 'src/persistence/hybrid-repository.js');
       if (fs.existsSync(candidatePath)) {
         try {
           const CandidateRepo = require(candidatePath);
           const RepoClass = CandidateRepo.HybridRepository || CandidateRepo;
           if (typeof RepoClass === 'function') {
             return new RepoClass(options);
           }
         } catch (_) {}
       }
       return new ReferenceHybridRepository(options);
     }
     ```
   - Observed: `src/persistence/hybrid-repository.js` must export either a class or an object with `.HybridRepository`.
2. **Reference Implementation Contract (`test/e2e/r1-r5-harness.js`)**:
   - Lines 247–416 define `ReferenceHybridRepository`:
     - Constructor receives `options`: `dbPath` (default `:memory:` in tests, `data/studio_dna.db` in production), `docBasePath` (default temporary in tests, `data/documents` in production).
     - Instantiates `sqliteEngine` and `docStore`.
     - `init()`: executes `sqliteEngine.init()` and `await docStore.init()`.
     - `startAnalysisRun({ siteSlug, targetUrl, mode, model, inputHash })`: inserts run record with status `'running'`.
     - `completeAnalysisRun(runId, { status, outputTokens, costUsd, artifactHash, rawScrapePayload })`: stores `rawScrapePayload` in `docStore.getCollection('scrape_payloads')`, saves `documentRef`, updates run status to `'passed'`, records `outputTokens`, `costUsd`, `completedAt`.
     - `recordQualityAudit({ runId, siteSlug, auditType, passed, score, metrics, rawReport })`: stores `rawReport` in `docStore.getCollection('audit_reports')`, saves `rawReportRef`, inserts record into `quality_audits` with `score`, `passed` (1/0), `metricsJson`.
     - `listAnalysisRuns({ siteSlug, status, limit, offset, sortBy, sortOrder })`: queries `analysis_runs` ordered by `createdAt DESC LIMIT ? OFFSET ?`.
     - `getRunDetails(runId)`: joins `analysis_runs`, `quality_audits`, and loads document from `docStore.getCollection('scrape_payloads').findById(run.documentRef)` as `rawDocument`.
     - `getDashboardAnalytics()`: returns `{ totalRuns, passedRuns, passRate, averageAuditScore }`.
     - `syncExistingFilesystem({ copiasDir, clientesDir })`: inspects directories and inserts records into `sites` with `status: 'indexed'`.
3. **Coverage & Boundary Test Expectations**:
   - `test/e2e/r1-r5-tier1-feature-coverage.test.js`:
     - Lines 297–348 (`TC-R3-T1-05`): verifies start run -> complete run with deep raw scrape payload -> record quality audit -> getRunDetails returning joined relational fields + audits + `rawDocument.payload`.
     - Lines 350–387 (`TC-R3-T1-06`): verifies REST API serving `GET /api/v3/analytics/kpi` and `GET /api/v3/runs`.
     - Lines 157–165 (`TC-R2-T1-03`): verifies `GET /api/v3/files/tree` returns `{ files: [ { path, size, type } ] }`.
   - `test/e2e/r1-r5-tier3-pairwise-combinations.test.js`:
     - Lines 43–109 (`TC-R3-T3-01`): verifies `GET /api/v3/runs/:runId` returns `{ id, siteSlug, status, outputTokens, rawDocument }`.
     - Lines 116–140 (`TC-R3-T3-02`): verifies quality re-audit updates relational status.
   - `test/e2e/r1-r5-tier4-realworld-scenarios.test.js`:
     - Lines 151–215 (`TC-R3-T4-01`): verifies sequential ingestion of 5 sites (`planes-ai`, `silvio-iwata`, `negocia-bem`, `marcionilio-oliveira`, `jesper-landberg`), calculating `passRate: 100`, `averageAuditScore >= 90.0`, and site filtering.

### 1.2 Existing Server Architecture (`src/server/preview-server.js`)
1. **Modular Route Delegation (`observed`)**:
   - Lines 750–755 of `src/server/preview-server.js`:
     ```javascript
     const routeOpts = { rootDir, copiasDir, clientesDir, vaultDir, maxBodyBytes: opts.maxBodyBytes };
     if (await handleV2Orchestrate(req, res, pathname, routeOpts)) return;
     if (await handleV2Vault(req, res, pathname, routeOpts)) return;
     if (await handleV2Review(req, res, pathname, routeOpts)) return;
     if (await handleV2Audit(req, res, pathname, routeOpts)) return;
     ```
   - Each route handler (`src/server/routes/v2-*.js`) inspects `pathname` and `req.method`. If it matches, it writes the response, finishes the stream, and returns `true`. If not, it returns `false`.
2. **Mutation Security & Authorization (`observed`)**:
   - Lines 554–558 of `src/server/preview-server.js`:
     ```javascript
     if (pathname.startsWith('/api/') && req.method !== 'GET' && !isMutationAuthorized(req, mutationOptions)) {
       res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
       res.end(JSON.stringify({ error: 'Mutation APIs are disabled or unauthorized' }));
       return;
     }
     ```
   - In production or test with mutations enabled, `POST /api/v3/admin/sync` requires mutation authorization if `mutationOptions.enabled` is active, or is permitted when authorized via `Bearer <token>`.
3. **Filesystem Organization**:
   - `copias/`: 35 clone directories (e.g. `storeyarchitecture-co-uk`, `useplanes-com`, `cuberto-com`) containing `SITE_TYPE.json`, `audit-report.json`, `design-system/design_dna.json`, `site/index.html`.
   - `clientes/`: 15 client directories (e.g. `marcionilio-oliveira`, `negocia-bem`, `silvio-iwata-imobiliaria`) containing `brand-spec.json`, `DNA.md`, `linter-report.json`, `site/index.html`.
   - `data/`: contains `data/documents/` (for NoSQL collections) and will house `data/studio_dna.db` (for SQLite WAL database).

---

## 2. Logic Chain

1. **Coordinator Responsibilities (`inferred`)**:
   - `HybridRepository` must not duplicate low-level SQLite DDL or document disk writing. Instead, it delegates relational persistence to `SqliteEngine` (`src/persistence/sqlite-engine.js`) and raw unstructured payload storage to `DocumentStore` (`src/persistence/document-store.js`).
   - Transactional linkage: When completing a run or saving an audit report, the document is written to `docStore` first to obtain the immutable `_id` (`documentRef` / `rawReportRef`), which is subsequently updated in SQLite.
2. **Idempotent Filesystem Ingestor & Invariant Preservation (`inferred`)**:
   - Contract Invariant: `copias/` is immutable reference evidence (per `AGENTS.md`). `SyncIngestor` MUST NEVER perform any write, update, or deletion operation within `copias/` or `clientes/`. All filesystem scans must use read-only primitives (`fs.readdirSync`, `fs.readFileSync`, `fs.statSync`).
   - Idempotence: Historical imports from `copias/` and `clientes/` must use `INSERT OR IGNORE` on `sites (domain)` and check existing `analysis_runs` to avoid duplicating entries when sync is run repeatedly.
3. **REST API v3 Architecture (`inferred`)**:
   - Creating `src/server/routes/v3-persistence.js` matching the established `handleV2*` pattern ensures 100% architectural consistency and modular separation.
   - The route handler inspects `/api/v3/*` endpoints:
     - `GET /api/v3/runs`: supports pagination (`page`, `limit`), filtering (`siteSlug`, `status`), sorting (`sortBy`, `sortOrder`). Top-level response includes `{ success: true, runs, total, pagination }` ensuring compatibility with both `TC-R3-T1-06` (`data.total`) and standard SPA table consumers.
     - `GET /api/v3/runs/:runId`: returns `{ success: true, ...details, run: details }` ensuring `TC-R3-T3-01` assertions (`data.id`, `data.rawDocument`) resolve without discrepancy.
     - `GET /api/v3/runs/:runId/raw`: serves direct raw AST/payload document.
     - `GET /api/v3/analytics/kpi`: returns top-level `{ success: true, totalRuns, passedRuns, failedRuns, passRate, averageAuditScore, totalTokens, totalCostUsd }` satisfying `TC-R3-T1-06`.
     - `GET /api/v3/clients`: provides client registry with brand spec & governance indicators.
     - `GET /api/v3/clients/:slug/audits`: delivers historical multi-factor quality audits.
     - `GET /api/v3/files/tree`: returns `{ success: true, base, files: [ { path, size, type } ] }` satisfying `TC-R2-T1-03`.
     - `GET /api/v3/files/content`: securely serves text/JSON/source content, preventing path traversal attacks.
     - `POST /api/v3/admin/sync`: triggers `hybridRepo.syncExistingFilesystem()`.
4. **Integration with `preview-server.js` (`inferred`)**:
   - `startPreviewServer(options)` initializes a shared `HybridRepository` instance (`opts.hybridRepo || new HybridRepository(...)`), passes it into `routeOpts`, and registers `handleV3Persistence(req, res, pathname, routeOpts)`.
   - On server shutdown, `hybridRepo.close()` cleanly releases SQLite locks and WAL checkpoints.

---

## 3. Caveats

1. **Active Test Suite Fallback (`documented`)**:
   - Currently, tests pass using `ReferenceHybridRepository` in `test/e2e/r1-r5-harness.js`. Once `src/persistence/hybrid-repository.js` is created, `resolveHybridRepository` will immediately load the production implementation.
2. **Mutation Security on POST Endpoints (`documented`)**:
   - In `preview-server.js`, POST requests under `/api/` are blocked with 403 if `enableMutations` is false. When running in development mode or testing `POST /api/v3/admin/sync`, caller must provide `authorization: Bearer <token>` or start the server with `enableMutations: true`.
3. **No External Dependencies (`observed`)**:
   - All components strictly rely on Node.js 24 standard library (`node:sqlite`, `node:fs`, `node:path`, `node:crypto`, `node:http`). No external npm packages are introduced.

---

## 4. Conclusion & Concrete Implementation Blueprint

Below are the exact code blueprints for the Milestone 2 persistence components.

### 4.1 `src/persistence/hybrid-repository.js`

```javascript
/**
 * src/persistence/hybrid-repository.js
 * 
 * Hybrid Persistence Coordinator for Studio DNA v3.0.
 * Coordinates native SQLite (relational engine) and Embedded DocumentStore (NoSQL).
 * 
 * Conforms to Requirement R3 (Feature F07).
 */

'use strict';

const path = require('node:path');
const crypto = require('node:crypto');
const { SqliteEngine } = require('./sqlite-engine');
const DocumentStore = require('./document-store');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const DEFAULT_DB_PATH = process.env.STUDIO_DNA_DB || path.join(PROJECT_ROOT, 'data/studio_dna.db');
const DEFAULT_DOC_PATH = process.env.STUDIO_DNA_DOCS || path.join(PROJECT_ROOT, 'data/documents');

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
    this.dbPath = options.dbPath || DEFAULT_DB_PATH;
    this.docBasePath = options.docBasePath || DEFAULT_DOC_PATH;
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
      return { ...a, metrics, passed: Boolean(a.passed) };
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
    return ingestor.syncAll();
  }

  _assertInit() {
    if (!this.isInitialized) {
      throw new Error('HybridRepository is not initialized. Await repo.init() before operations.');
    }
  }

  /**
   * Closes database handles.
   */
  close() {
    this.sqliteEngine.close();
    this.isInitialized = false;
  }
}

module.exports = { HybridRepository };
module.exports.HybridRepository = HybridRepository;
```

---

### 4.2 `src/persistence/sync-ingestor.js`

```javascript
/**
 * src/persistence/sync-ingestor.js
 * 
 * Historical Filesystem Sync Ingestor for Studio DNA v3.0.
 * Safely indexes copias/ (read-only reference clones) and clientes/ into SQLite & DocumentStore.
 * 
 * Strictly preserves the immutable evidence invariant of copias/.
 * Conforms to Requirement R3 (Feature F08).
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const PROJECT_ROOT = path.resolve(__dirname, '../..');

class SyncIngestor {
  /**
   * @param {Object} options
   * @param {import('./hybrid-repository').HybridRepository} options.hybridRepo
   * @param {string} [options.rootDir]
   * @param {string} [options.copiasDir]
   * @param {string} [options.clientesDir]
   */
  constructor({ hybridRepo, rootDir, copiasDir, clientesDir } = {}) {
    if (!hybridRepo) throw new Error('hybridRepo is required');
    this.hybridRepo = hybridRepo;
    this.rootDir = path.resolve(rootDir || PROJECT_ROOT);
    this.copiasDir = path.resolve(copiasDir || path.join(this.rootDir, 'copias'));
    this.clientesDir = path.resolve(clientesDir || path.join(this.rootDir, 'clientes'));
  }

  /**
   * Scans copias/ and clientes/ and idempotently indexes sites, runs, audits, and file catalogs.
   * NEVER opens or touches files with write permissions.
   * @param {Object} [options]
   * @param {boolean} [options.scanFiles=false] - When true, indexes individual site files in file_catalog
   * @returns {Promise<{ indexedCount: number, sitesCount: number, runsCount: number, auditsCount: number, filesCount: number, durationMs: number }>}
   */
  async syncAll({ scanFiles = false } = {}) {
    const startTime = Date.now();
    let sitesCount = 0;
    let runsCount = 0;
    let auditsCount = 0;
    let filesCount = 0;

    // 1. Sync copias/ (clones)
    if (fs.existsSync(this.copiasDir)) {
      const cloneDirs = fs.readdirSync(this.copiasDir, { withFileTypes: true });
      for (const ent of cloneDirs) {
        if (!ent.isDirectory() || ent.name.startsWith('.')) continue;
        const siteSlug = ent.name;
        const siteDir = path.join(this.copiasDir, siteSlug);

        const res = await this._syncSiteDirectory(siteSlug, siteDir, 'clone', scanFiles);
        if (res.siteCreated) sitesCount++;
        if (res.runCreated) runsCount++;
        if (res.auditCreated) auditsCount++;
        filesCount += res.filesCataloged;
      }
    }

    // 2. Sync clientes/ (active projects)
    if (fs.existsSync(this.clientesDir)) {
      const clientDirs = fs.readdirSync(this.clientesDir, { withFileTypes: true });
      for (const ent of clientDirs) {
        if (!ent.isDirectory() || ent.name.startsWith('.')) continue;
        const siteSlug = ent.name;
        const siteDir = path.join(this.clientesDir, siteSlug);

        const res = await this._syncSiteDirectory(siteSlug, siteDir, 'client', scanFiles);
        if (res.siteCreated) sitesCount++;
        if (res.runCreated) runsCount++;
        if (res.auditCreated) auditsCount++;
        filesCount += res.filesCataloged;
      }
    }

    const durationMs = Date.now() - startTime;
    const indexedCount = sitesCount + runsCount;

    return {
      indexedCount,
      sitesCount,
      runsCount,
      auditsCount,
      filesCount,
      durationMs
    };
  }

  /**
   * Safely inspects a directory and registers artifacts.
   * @private
   */
  async _syncSiteDirectory(siteSlug, siteDir, type, scanFiles) {
    let siteCreated = false;
    let runCreated = false;
    let auditCreated = false;
    let filesCataloged = 0;

    const stat = fs.statSync(siteDir);
    const mtimeIso = stat.mtime.toISOString();

    // 1. Resolve site domain and metadata
    let domain = `${siteSlug}.local`;
    const siteTypePath = path.join(siteDir, 'SITE_TYPE.json');
    if (fs.existsSync(siteTypePath)) {
      try {
        const siteType = JSON.parse(fs.readFileSync(siteTypePath, 'utf-8'));
        if (siteType && siteType.targetUrl) {
          domain = new URL(siteType.targetUrl).hostname;
        }
      } catch (_) {}
    }

    // 2. Register site record (idempotent)
    const existingSite = this.hybridRepo.sqliteEngine.get('SELECT id FROM sites WHERE domain = ? OR name = ?', domain, siteSlug);
    let siteId;
    if (!existingSite) {
      siteId = crypto.randomUUID();
      this.hybridRepo.sqliteEngine.run(
        'INSERT OR IGNORE INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
        siteId,
        domain,
        siteSlug,
        type === 'clone' ? 'indexed' : 'client',
        mtimeIso
      );
      siteCreated = true;
    } else {
      siteId = existingSite.id;
    }

    // 3. Register legacy analysis run if not yet recorded
    const existingRun = this.hybridRepo.sqliteEngine.get('SELECT id FROM analysis_runs WHERE siteSlug = ?', siteSlug);
    let runId;
    if (!existingRun) {
      runId = `run-sync-${siteSlug}`;

      let docRef = null;
      const dnaPath = path.join(siteDir, 'design-system', 'design_dna.json');
      if (fs.existsSync(dnaPath)) {
        try {
          const dnaContent = JSON.parse(fs.readFileSync(dnaPath, 'utf-8'));
          const col = this.hybridRepo.docStore.getCollection('dna_trees');
          const ins = await col.insertOne({ siteSlug, dna: dnaContent });
          docRef = ins.insertedId;
        } catch (_) {}
      }

      this.hybridRepo.sqliteEngine.run(
        `INSERT OR IGNORE INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, model, status, documentRef, createdAt, completedAt)
         VALUES (?, ?, ?, ?, ?, 'legacy-ingest', 'passed', ?, ?, ?)`,
        runId,
        siteId,
        siteSlug,
        `https://${domain}`,
        type,
        docRef,
        mtimeIso,
        mtimeIso
      );
      runCreated = true;
    } else {
      runId = existingRun.id;
    }

    // 4. Register quality audit if audit-report.json exists
    const auditReportPath = path.join(siteDir, 'audit-report.json');
    const linterReportPath = path.join(siteDir, 'linter-report.json');
    const targetAuditPath = fs.existsSync(auditReportPath) ? auditReportPath : (fs.existsSync(linterReportPath) ? linterReportPath : null);

    if (targetAuditPath) {
      const existingAudit = this.hybridRepo.sqliteEngine.get('SELECT id FROM quality_audits WHERE siteSlug = ?', siteSlug);
      if (!existingAudit) {
        try {
          const report = JSON.parse(fs.readFileSync(targetAuditPath, 'utf-8'));
          const score = Number(report.score || report.overallScore || 90.0);
          const passed = report.passed !== undefined ? (report.passed ? 1 : 0) : (score >= 80 ? 1 : 0);

          const col = this.hybridRepo.docStore.getCollection('audit_reports');
          const ins = await col.insertOne({ siteSlug, runId, report });

          const auditId = `audit-sync-${siteSlug}`;
          this.hybridRepo.sqliteEngine.run(
            `INSERT OR IGNORE INTO quality_audits (id, runId, siteSlug, auditType, passed, score, metricsJson, rawReportRef, createdAt)
             VALUES (?, ?, ?, 'filesystem-sync', ?, ?, ?, ?, ?)`,
            auditId,
            runId,
            siteSlug,
            passed,
            score,
            JSON.stringify(report.metrics || report.categories || {}),
            ins.insertedId,
            mtimeIso
          );
          auditCreated = true;
        } catch (_) {}
      }
    }

    // 5. Catalog critical files if requested
    if (scanFiles) {
      filesCataloged += this._catalogFiles(siteSlug, siteDir);
    }

    return { siteCreated, runCreated, auditCreated, filesCataloged };
  }

  /**
   * Catalogs key site artifacts in file_catalog.
   * @private
   */
  _catalogFiles(siteSlug, siteDir) {
    let count = 0;
    const candidates = [
      'site/index.html',
      'SITE_TYPE.json',
      'brand-spec.json',
      'DNA.md',
      'audit-report.json',
      'design-system/design_dna.json'
    ];

    for (const rel of candidates) {
      const full = path.join(siteDir, rel);
      if (fs.existsSync(full) && fs.statSync(full).isFile()) {
        try {
          const stat = fs.statSync(full);
          const content = fs.readFileSync(full);
          const hash = crypto.createHash('sha256').update(content).digest('hex');
          const relPath = path.relative(this.rootDir, full).replace(/\\/g, '/');

          this.hybridRepo.sqliteEngine.run(
            `INSERT OR IGNORE INTO file_catalog (id, siteSlug, relativePath, fileType, sizeBytes, sha256, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            crypto.randomUUID(),
            siteSlug,
            relPath,
            path.extname(full).replace('.', ''),
            stat.size,
            hash,
            stat.mtime.toISOString()
          );
          count++;
        } catch (_) {}
      }
    }
    return count;
  }
}

module.exports = { SyncIngestor };
module.exports.SyncIngestor = SyncIngestor;
```

---

### 4.3 `src/server/routes/v3-persistence.js`

```javascript
/**
 * src/server/routes/v3-persistence.js
 * 
 * REST API v3 Endpoints for Hybrid Persistence Layer.
 * Serves paginated analysis runs, dashboard analytics KPI, client registry,
 * file asset catalog tree, file content, and admin filesystem sync.
 * 
 * Conforms to Requirement R3 (Feature F09).
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { assertSafeSlug, resolveStaticPath } = require('../security');

/**
 * Handles incoming /api/v3/* requests.
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 * @param {string} pathname
 * @param {Object} opts
 * @returns {Promise<boolean>} True if route handled, false otherwise
 */
async function handleV3Persistence(req, res, pathname, opts = {}) {
  if (!pathname.startsWith('/api/v3/')) {
    return false;
  }

  const hybridRepo = opts.hybridRepo;
  if (!hybridRepo) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'Persistence layer unavailable' }));
    return true;
  }

  const rootDir = opts.rootDir || process.cwd();
  const copiasDir = opts.copiasDir || path.join(rootDir, 'copias');
  const clientesDir = opts.clientesDir || path.join(rootDir, 'clientes');
  const urlObj = opts.urlObj || new URL(req.url, 'http://127.0.0.1:4000');

  const sendJson = (statusCode, data) => {
    res.writeHead(statusCode, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(data));
    return true;
  };

  // 1. GET /api/v3/analytics/kpi
  if (pathname === '/api/v3/analytics/kpi' && req.method === 'GET') {
    try {
      const kpi = await hybridRepo.getDashboardAnalytics();
      return sendJson(200, { success: true, ...kpi });
    } catch (err) {
      return sendJson(500, { success: false, error: err.message });
    }
  }

  // 2. GET /api/v3/runs (Paginated list of runs)
  if (pathname === '/api/v3/runs' && req.method === 'GET') {
    try {
      const page = Math.max(1, parseInt(urlObj.searchParams.get('page') || '1', 10));
      const limit = Math.max(1, Math.min(100, parseInt(urlObj.searchParams.get('limit') || '20', 10)));
      const offset = (page - 1) * limit;
      const siteSlug = urlObj.searchParams.get('siteSlug') || null;
      const status = urlObj.searchParams.get('status') || null;
      const sortBy = urlObj.searchParams.get('sortBy') || 'createdAt';
      const sortOrder = urlObj.searchParams.get('sortOrder') || 'DESC';

      const runs = await hybridRepo.listAnalysisRuns({ siteSlug, status, limit, offset, sortBy, sortOrder });
      const total = await hybridRepo.countAnalysisRuns({ siteSlug, status });

      return sendJson(200, {
        success: true,
        runs,
        total,
        pagination: {
          page,
          limit,
          offset,
          total,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (err) {
      return sendJson(500, { success: false, error: err.message });
    }
  }

  // 3. GET /api/v3/runs/:runId/raw
  if (pathname.startsWith('/api/v3/runs/') && pathname.endsWith('/raw') && req.method === 'GET') {
    try {
      const runId = pathname.replace('/api/v3/runs/', '').replace('/raw', '').trim();
      const details = await hybridRepo.getRunDetails(runId);
      if (!details || !details.rawDocument) {
        return sendJson(404, { success: false, error: 'Raw document payload not found for run', runId });
      }
      return sendJson(200, {
        success: true,
        runId,
        documentRef: details.documentRef,
        rawDocument: details.rawDocument,
        payload: details.rawDocument.payload || details.rawDocument
      });
    } catch (err) {
      return sendJson(500, { success: false, error: err.message });
    }
  }

  // 4. GET /api/v3/runs/:runId
  if (pathname.startsWith('/api/v3/runs/') && req.method === 'GET') {
    try {
      const runId = pathname.replace('/api/v3/runs/', '').trim();
      const details = await hybridRepo.getRunDetails(runId);
      if (!details) {
        return sendJson(404, { success: false, error: 'Run not found', runId });
      }
      return sendJson(200, { success: true, ...details, run: details });
    } catch (err) {
      return sendJson(500, { success: false, error: err.message });
    }
  }

  // 5. GET /api/v3/clients
  if (pathname === '/api/v3/clients' && req.method === 'GET') {
    try {
      const clients = [];
      if (fs.existsSync(clientesDir)) {
        const dirs = fs.readdirSync(clientesDir, { withFileTypes: true });
        for (const d of dirs) {
          if (!d.isDirectory() || d.name.startsWith('.')) continue;
          const slug = d.name;
          const clientPath = path.join(clientesDir, slug);
          const hasBrandSpec = fs.existsSync(path.join(clientPath, 'brand-spec.json'));
          const hasDna = fs.existsSync(path.join(clientPath, 'DNA.md')) || fs.existsSync(path.join(clientPath, 'dna-ir.json'));
          const hasLinterReport = fs.existsSync(path.join(clientPath, 'linter-report.json'));

          clients.push({
            slug,
            name: slug.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            hasBrandSpec,
            hasDna,
            hasLinterReport
          });
        }
      }
      return sendJson(200, { success: true, count: clients.length, clients });
    } catch (err) {
      return sendJson(500, { success: false, error: err.message });
    }
  }

  // 6. GET /api/v3/clients/:slug/audits
  if (pathname.startsWith('/api/v3/clients/') && pathname.endsWith('/audits') && req.method === 'GET') {
    try {
      const slugCandidate = pathname.replace('/api/v3/clients/', '').replace('/audits', '').trim();
      const slug = assertSafeSlug(slugCandidate);
      const auditRows = hybridRepo.sqliteEngine.all('SELECT * FROM quality_audits WHERE siteSlug = ? ORDER BY createdAt DESC', slug);
      const audits = auditRows.map(a => {
        let metrics = {};
        try { metrics = JSON.parse(a.metricsJson); } catch (_) {}
        return { ...a, metrics, passed: Boolean(a.passed) };
      });
      return sendJson(200, { success: true, siteSlug: slug, count: audits.length, audits });
    } catch (err) {
      return sendJson(err.statusCode || 400, { success: false, error: err.message });
    }
  }

  // 7. GET /api/v3/files/tree
  if (pathname === '/api/v3/files/tree' && req.method === 'GET') {
    try {
      const base = urlObj.searchParams.get('base') || 'copias';
      const scanDir = base === 'clientes' ? clientesDir : copiasDir;
      const fileList = [];

      if (fs.existsSync(scanDir)) {
        const scan = (currentDir, relBase) => {
          const entries = fs.readdirSync(currentDir, { withFileTypes: true });
          for (const ent of entries) {
            if (ent.name.startsWith('.') || ent.name === 'node_modules') continue;
            const full = path.join(currentDir, ent.name);
            const rel = path.join(relBase, ent.name).replace(/\\/g, '/');
            if (ent.isDirectory()) {
              // Limit depth to 3 levels to maintain low latency
              if (rel.split('/').length <= 3) {
                scan(full, rel);
              }
            } else if (ent.isFile()) {
              const stat = fs.statSync(full);
              fileList.push({
                path: rel,
                size: stat.size,
                type: path.extname(ent.name).replace('.', '').toLowerCase() || 'unknown',
                mtime: stat.mtime.toISOString()
              });
            }
          }
        };
        scan(scanDir, '');
      }

      return sendJson(200, {
        success: true,
        base,
        count: fileList.length,
        files: fileList
      });
    } catch (err) {
      return sendJson(500, { success: false, error: err.message });
    }
  }

  // 8. GET /api/v3/files/content
  if (pathname === '/api/v3/files/content' && req.method === 'GET') {
    try {
      const targetRel = urlObj.searchParams.get('path');
      if (!targetRel) {
        return sendJson(400, { success: false, error: 'Path parameter is required' });
      }

      const filePath = resolveStaticPath({ rootDir, copiasDir, clientesDir, pathname: targetRel });
      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        return sendJson(404, { success: false, error: 'File not found', path: targetRel });
      }

      const stat = fs.statSync(filePath);
      if (stat.size > 10 * 1024 * 1024) {
        return sendJson(413, { success: false, error: 'File exceeds 10MB inspection limit' });
      }

      const ext = path.extname(filePath).toLowerCase();
      const textExts = ['.html', '.css', '.js', '.mjs', '.json', '.md', '.txt', '.svg'];

      if (textExts.includes(ext)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return sendJson(200, {
          success: true,
          path: targetRel,
          size: stat.size,
          type: ext.replace('.', ''),
          isBinary: false,
          content
        });
      } else {
        const buffer = fs.readFileSync(filePath);
        return sendJson(200, {
          success: true,
          path: targetRel,
          size: stat.size,
          type: ext.replace('.', ''),
          isBinary: true,
          base64: buffer.toString('base64')
        });
      }
    } catch (err) {
      return sendJson(err.statusCode || 500, { success: false, error: err.message });
    }
  }

  // 9. POST /api/v3/admin/sync
  if (pathname === '/api/v3/admin/sync' && req.method === 'POST') {
    try {
      const syncResult = await hybridRepo.syncExistingFilesystem({ copiasDir, clientesDir });
      return sendJson(200, {
        success: true,
        message: 'Filesystem synchronization completed successfully',
        ...syncResult
      });
    } catch (err) {
      return sendJson(500, { success: false, error: err.message });
    }
  }

  return false;
}

module.exports = { handleV3Persistence };
```

---

### 4.4 Preview Server Hook Integration (`src/server/preview-server.js`)

In `src/server/preview-server.js`:
```javascript
// At top imports:
const { handleV3Persistence } = require('./routes/v3-persistence');
const { HybridRepository } = require('../persistence/hybrid-repository');

// Inside startPreviewServer(options):
const hybridRepo = opts.hybridRepo || new HybridRepository({
  dbPath: path.join(rootDir, 'data/studio_dna.db'),
  docBasePath: path.join(rootDir, 'data/documents')
});
hybridRepo.init().catch(err => console.error('Failed to initialize HybridRepository:', err));

// Inside request handler, right after V2 routes:
const routeOpts = { rootDir, copiasDir, clientesDir, vaultDir, hybridRepo, maxBodyBytes: opts.maxBodyBytes };
if (await handleV2Orchestrate(req, res, pathname, routeOpts)) return;
if (await handleV2Vault(req, res, pathname, routeOpts)) return;
if (await handleV2Review(req, res, pathname, routeOpts)) return;
if (await handleV2Audit(req, res, pathname, routeOpts)) return;
if (await handleV3Persistence(req, res, pathname, routeOpts)) return;

// On server close:
server.on('close', () => {
  try { hybridRepo.close(); } catch (_) {}
});
```

---

## 5. Verification Method

To independently verify the Milestone 2 implementation:

1. **Run 4-Tier Native E2E Test Suite**:
   ```powershell
   node --test test/e2e/r1-r5-tier1-feature-coverage.test.js
   node --test test/e2e/r1-r5-tier2-boundary-corner.test.js
   node --test test/e2e/r1-r5-tier3-pairwise-combinations.test.js
   node --test test/e2e/r1-r5-tier4-realworld-scenarios.test.js
   ```
   *Expected Result*: All 54 tests pass with 0 failures.

2. **Verify Dynamic Resolution**:
   ```powershell
   node -e "const { resolveHybridRepository } = require('./test/e2e/r1-r5-harness'); const hr = resolveHybridRepository(); console.log(hr.constructor.name);"
   ```
   *Expected Result*: Outputs `HybridRepository` (from `src/persistence/hybrid-repository.js`), confirming the candidate engine supersedes the test harness reference.

3. **Verify REST API v3 Endpoints on Live Preview Server**:
   Start preview server on ephemeral port and test REST API endpoints:
   ```powershell
   node -e "
     const { startPreviewServer } = require('./src/server/preview-server');
     const s = startPreviewServer({ port: 0, silent: true });
     s.on('listening', async () => {
       const port = s.address().port;
       const resKpi = await fetch('http://127.0.0.1:' + port + '/api/v3/analytics/kpi');
       const kpi = await resKpi.json();
       console.log('KPI response:', kpi);
       const resRuns = await fetch('http://127.0.0.1:' + port + '/api/v3/runs');
       const runs = await resRuns.json();
       console.log('Runs response total:', runs.total);
       s.close();
     });
   "
   ```
   *Expected Result*: Returns status 200 with JSON structures containing `totalRuns`, `passRate`, `averageAuditScore`, and runs array.

4. **Invalidation Conditions**:
   - Any modification or write attempt into `copias/` during sync.
   - Any failure in `TC-R3-T1-05`, `TC-R3-T1-06`, `TC-R3-T3-01`, or `TC-R3-T4-01`.
   - SQL injection vulnerabilities on `sortBy` or filter query parameters in `listAnalysisRuns`.
