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
      'Content-Type': 'application/json; charset=utf-8',
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
        return { ...a, metrics, passed: Number(a.passed) };
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
