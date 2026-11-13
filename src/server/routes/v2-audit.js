/**
 * src/server/routes/v2-audit.js
 * 
 * Endpoints V2 para Auditoria Multifatorial Triangulada e Diff Visual Multi-Viewport
 */

const fs = require('fs');
const path = require('path');
const { assertSafeSlug } = require('../security');
const { TriangulatedAuditEngine } = require('../../qa/triangulated-audit-engine');

const DEFAULT_VIEWPORTS = [
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 812 }
];

function safeReadJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    return null;
  }
}

/**
 * Builds the multi-viewport preview diff payload from real qa-reports artifacts on disk.
 * Never fabricates 'matched' or synthetic pixel differences when measurement artifacts are absent.
 */
function buildPreviewDiffMatrix(slug, clientDir) {
  const previewUrl = `/clientes/${slug}/site/index.html`;
  const qaDir = path.join(clientDir, 'qa-reports');
  const previewDiffData = safeReadJson(path.join(qaDir, 'preview-diff.json'));
  const linterReport = safeReadJson(path.join(clientDir, 'linter-report.json'));
  const hasGoldenScreenshot = fs.existsSync(path.join(qaDir, 'verified-golden-preview.png'));

  if (previewDiffData && Array.isArray(previewDiffData.viewports) && previewDiffData.viewports.length > 0) {
    const measuredViewports = previewDiffData.viewports.map((vp) => {
      const hasPct = typeof vp.pixelDifferencePct === 'number' && Number.isFinite(vp.pixelDifferencePct);
      return {
        name: vp.name || 'Viewport',
        width: Number(vp.width) || 1440,
        height: Number(vp.height) || 900,
        status: hasPct && vp.status ? String(vp.status) : 'unverified',
        pixelDifferencePct: hasPct ? vp.pixelDifferencePct : null,
        previewUrl
      };
    });
    const allMeasured = measuredViewports.every((vp) => vp.status !== 'unverified' && vp.pixelDifferencePct !== null);
    return {
      clientSlug: slug,
      truthStatus: allMeasured ? 'observed' : 'unverified',
      evidence: {
        hasPreviewDiffReport: true,
        hasLinterReport: Boolean(linterReport),
        hasGoldenScreenshot,
        linterPassed: linterReport ? Boolean(linterReport.passed) : null
      },
      viewports: measuredViewports
    };
  }

  return {
    clientSlug: slug,
    truthStatus: 'unverified',
    evidence: {
      hasPreviewDiffReport: false,
      hasLinterReport: Boolean(linterReport),
      hasGoldenScreenshot,
      linterPassed: linterReport ? Boolean(linterReport.passed) : null
    },
    viewports: DEFAULT_VIEWPORTS.map((vp) => ({
      name: vp.name,
      width: vp.width,
      height: vp.height,
      status: 'unverified',
      pixelDifferencePct: null,
      previewUrl
    }))
  };
}

async function handleV2Audit(req, res, pathname, opts = {}) {
  const rootDir = opts.rootDir || process.cwd();
  const clientesDir = opts.clientesDir || path.join(rootDir, 'clientes');

  // 1. POST /api/v2/audit/:clientSlug
  if (pathname.startsWith('/api/v2/audit/') && req.method === 'POST') {
    try {
      const slug = assertSafeSlug(pathname.replace('/api/v2/audit/', '').trim());
      const siteDir = path.join(clientesDir, slug, 'site');

      if (!fs.existsSync(siteDir)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Diretório do site não encontrado para o cliente: ${slug}` }));
        return true;
      }

      // Executa a auditoria multifatorial triangulada
      const auditResult = await TriangulatedAuditEngine.auditSite({
        siteDir,
        clientSlug: slug,
        headless: true
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, audit: auditResult }));
      return true;
    } catch (err) {
      res.writeHead(err.statusCode || 500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return true;
    }
  }

  // 2. GET /api/v2/preview/diff/:clientSlug
  if (pathname.startsWith('/api/v2/preview/diff/') && req.method === 'GET') {
    try {
      const slug = assertSafeSlug(pathname.replace('/api/v2/preview/diff/', '').trim());
      const clientDir = path.join(clientesDir, slug);
      const siteDir = path.join(clientDir, 'site');

      if (!fs.existsSync(siteDir)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Cliente não encontrado: ${slug}` }));
        return true;
      }

      const diffMatrix = buildPreviewDiffMatrix(slug, clientDir);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, diff: diffMatrix }));
      return true;
    } catch (err) {
      res.writeHead(err.statusCode || 400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return true;
    }
  }

  return false;
}

module.exports = { handleV2Audit };
