/**
 * src/persistence/sync-ingestor.js
 *
 * Historical Filesystem Sync Ingestor for Studio DNA v3.0.
 * Safely indexes copias/ (read-only reference clones) and clientes/ into SQLite & DocumentStore.
 *
 * Strictly preserves the immutable evidence invariant of copias/ (read-only operations only).
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

    // 1. Sync copias/ (reference clones) - read-only
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

    // 2. Sync clientes/ (active projects) - read-only
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

    let mtimeIso = new Date().toISOString();
    try {
      const stat = fs.statSync(siteDir);
      mtimeIso = stat.mtime.toISOString();
    } catch (_) {}

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

module.exports = SyncIngestor;
module.exports.SyncIngestor = SyncIngestor;
