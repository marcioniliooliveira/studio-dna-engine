const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { loadConfig } = require('../config');
const { resolveWorkspacePaths } = require('../config/workspace');
const { generateTailwindConfig } = require('../generators/tailwind-generator');
const { createClientProject } = require('../generators/client-factory');
const { runBoxDiffLinter } = require('../../scripts/box-diff-linter');
const { handleV2Orchestrate } = require('./routes/v2-orchestrate');
const { handleV2Vault } = require('./routes/v2-vault');
const { handleV2Review } = require('./routes/v2-review');
const { handleV2Audit } = require('./routes/v2-audit');
const { handleV3Persistence } = require('./routes/v3-persistence');
const { HybridRepository, writeJsonAtomicSync } = require('../persistence/hybrid-repository');
const { buildDashboardHtml } = require('./views/dnastudio-dashboard');
const {
  resolveStaticPath,
  assertSafeExternalUrl,
  assertSafeSlug,
  parseByteRange,
  readJsonBody,
  isMutationAuthorized
} = require('./security');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'video/ogg',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.wasm': 'application/wasm',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const liveSelectionsStore = new Map();
const liveSseClients = new Map(); // slug -> Set(res)

function notifyHotSwap(slug, eventData) {
  const message = `event: hotswap\ndata: ${JSON.stringify(eventData)}\n\n`;
  const targets = [slug, 'all'];
  for (const t of targets) {
    const set = liveSseClients.get(t);
    if (set && set.size > 0) {
      for (const clientRes of Array.from(set)) {
        try {
          clientRes.write(message);
        } catch (_) {
          set.delete(clientRes);
        }
      }
    }
  }
}

function getLiveSelection(slug, options = {}) {
  if (!slug) return null;
  const inMemory = liveSelectionsStore.get(slug);
  if (inMemory) return inMemory;

  if (options.fallbackToDisk === true) {
    const rootDir = options.rootDir || process.cwd();
    const clientesDir = options.clientesDir || path.join(rootDir, 'clientes');
    const primaryPath = path.join(clientesDir, slug, '.dna', 'live-selection.json');
    const rootLegacy = path.join(rootDir, '.domscribe', `live-selection-${slug}.json`);
    const clientLegacy = path.join(clientesDir, slug, '.domscribe', 'live-selection.json');

    for (const p of [primaryPath, rootLegacy, clientLegacy]) {
      if (fs.existsSync(p)) {
        try {
          const parsed = JSON.parse(fs.readFileSync(p, 'utf8'));
          liveSelectionsStore.set(slug, parsed);
          return parsed;
        } catch (_) {}
      }
    }
  }
  return null;
}

function setLiveSelection(slug, data) {
  if (!slug) return;
  liveSelectionsStore.set(slug, data);
}

/**
 * Faz download assíncrono de asset remoto e salva em disco (Self-Healing)
 */
async function fetchAndSaveRemoteAsset(remoteUrl, localDestPath, options = {}) {
  const validateUrl = options.validateUrl || assertSafeExternalUrl;
  const maxBytes = options.maxBytes || 25 * 1024 * 1024;
  const maxRedirects = options.maxRedirects ?? 3;
  const redirectCount = options.redirectCount || 0;
  let validatedUrl;
  try {
    validatedUrl = await validateUrl(remoteUrl);
  } catch (error) {
    return false;
  }

  return new Promise((resolve) => {
    try {
      const u = validatedUrl instanceof URL ? validatedUrl : new URL(remoteUrl);
      const client = u.protocol === 'https:' ? https : http;
      let file = null;
      let settled = false;
      const req = client.get(u, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept': '*/*'
        }
      }, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const declaredSize = Number(res.headers['content-length'] || 0);
          if (declaredSize > maxBytes) {
            settled = true;
            res.resume();
            fs.unlink(localDestPath, () => resolve(false));
            return;
          }
          fs.mkdirSync(path.dirname(localDestPath), { recursive: true });
          file = fs.createWriteStream(localDestPath);
          let received = 0;
          res.on('data', (chunk) => {
            received += chunk.length;
            if (received <= maxBytes || settled) return;
            settled = true;
            res.unpipe(file);
            res.destroy();
            file.once('close', () => fs.unlink(localDestPath, () => resolve(false)));
            file.destroy();
          });
          res.pipe(file);
          file.on('finish', () => {
            if (settled) return;
            settled = true;
            file.close(() => {
              console.log(`✨ [Self-Healing Proxy] Asset baixado e curado: ${path.basename(localDestPath)} <- ${remoteUrl}`);
              resolve(true);
            });
          });
        } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          if (redirectCount >= maxRedirects) {
            settled = true;
            res.resume();
            fs.unlink(localDestPath, () => resolve(false));
            return;
          }
          settled = true;
          res.resume();
          const redirectUrl = new URL(res.headers.location, remoteUrl).href;
          fs.unlink(localDestPath, () => {
            fetchAndSaveRemoteAsset(redirectUrl, localDestPath, {
              ...options,
              redirectCount: redirectCount + 1
            }).then(resolve);
          });
        } else {
          settled = true;
          fs.unlink(localDestPath, () => {});
          resolve(false);
        }
      });
      req.on('error', () => {
        if (settled) return;
        settled = true;
        if (file) file.destroy();
        fs.unlink(localDestPath, () => {});
        resolve(false);
      });
      req.setTimeout(10000, () => {
        if (settled) return;
        settled = true;
        req.destroy();
        if (file) file.destroy();
        fs.unlink(localDestPath, () => {});
        resolve(false);
      });
    } catch (e) {
      resolve(false);
    }
  });
}

/**
 * Transmite arquivos estáticos com suporte completo a Range Requests (HTTP 206) e CORS
 */
function streamFileWithRange(req, res, filePath, contentType) {
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  const baseHeaders = {
    'Content-Type': contentType,
    'Cross-Origin-Resource-Policy': 'same-origin',
    'Accept-Ranges': 'bytes'
  };

  if (range) {
    const parsedRange = parseByteRange(range, fileSize);
    if (!parsedRange) {
      res.writeHead(416, {
        'Content-Range': `bytes */${fileSize}`
      });
      return res.end();
    }

    const { start, end } = parsedRange;

    const chunksize = (end - start) + 1;
    const stream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      ...baseHeaders,
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Content-Length': chunksize
    });
    stream.pipe(res);
  } else {
    res.writeHead(200, {
      ...baseHeaders,
      'Content-Length': fileSize
    });
    fs.createReadStream(filePath).pipe(res);
  }
}

// NOTE: Dashboard HTML generation extracted to ./views/dnastudio-dashboard.js (Milestone 3 / Features F10–F16)

function startPreviewServer(options = {}) {
  const opts = typeof options === 'number' ? { port: options } : (options || {});
  const workspace = resolveWorkspacePaths({
    rootDir: opts.rootDir,
    workspaceDir: opts.workspaceDir,
    outputDir: opts.outputDir,
    clientesDir: opts.clientesDir,
    vaultDir: opts.vaultDir
  });
  const config = loadConfig({ ...opts, workspaceDir: workspace.workspaceRoot });
  const rootDir = workspace.workspaceRoot;
  const copiasDir = path.resolve(opts.outputDir || (opts.workspaceDir || opts.rootDir ? workspace.copiasDir : config.outputDir) || workspace.copiasDir);
  const clientesDir = workspace.clientesDir;
  const vaultDir = workspace.designVaultDir;
  const port = opts.port ?? config.previewPort ?? 4000;
  const mutationOptions = {
    enabled: opts.enableMutations === true,
    token: opts.mutationToken
  };

  if (!fs.existsSync(copiasDir)) fs.mkdirSync(copiasDir, { recursive: true });
  if (!fs.existsSync(clientesDir)) fs.mkdirSync(clientesDir, { recursive: true });

  const hybridRepo = opts.hybridRepo || new HybridRepository({
    dbPath: opts.dbPath || path.join(workspace.dataDir, 'studio_dna.db'),
    docBasePath: opts.docBasePath || path.join(workspace.dataDir, 'documents')
  });
  hybridRepo.init().catch(err => {
    if (!opts.silent) console.error('Failed to initialize HybridRepository:', err);
  });

  const server = http.createServer(async (req, res) => {
    // CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Allow': 'GET, POST, OPTIONS',
        'Cross-Origin-Resource-Policy': 'same-origin'
      });
      res.end();
      return;
    }

    let pathname;
    let urlObj;
    try {
      urlObj = new URL(req.url || '/', 'http://127.0.0.1:4000');
      const rawPathname = String(req.url || '/').split('?')[0];
      pathname = decodeURIComponent(rawPathname);
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('400 Bad Request');
      return;
    }

    if (pathname.startsWith('/api/') && req.method !== 'GET' && !isMutationAuthorized(req, mutationOptions)) {
      res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Mutation APIs are disabled or unauthorized' }));
      return;
    }

    // ── Component Workbench Route ───────────────────────────────────────────
    if (pathname === '/workbench') {
      const client = (urlObj && urlObj.searchParams.get('client')) || 'marcionilio-oliveira';
      const target = (urlObj && urlObj.searchParams.get('target')) || 'WorkStage';
      res.writeHead(302, {
        'Location': `/clientes/${encodeURIComponent(client)}/site/index.html?workbench=${encodeURIComponent(target)}&skipIntro=1`
      });
      res.end();
      return;
    }

    // ── DNA Live Workbench & Click-to-MCP Bridge ────────────────────────────
    if (pathname === '/__dna_live_select' && req.method === 'POST') {
      try {
        const data = await readJsonBody(req, { limitBytes: opts.maxBodyBytes });
        if (!data || typeof data !== 'object' || !data.clientSlug) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'clientSlug is required' }));
          return;
        }
        const clientSlug = assertSafeSlug(data.clientSlug);
        const dsId = data.dsId || data.dataDs || '';
        const dataDs = data.dataDs || data.dsId || '';
        const lineRaw = data.sourceLineRange || (data.line !== undefined ? String(data.line) : '1');
        const line = typeof lineRaw === 'string' ? parseInt(lineRaw.split('-')[0], 10) || 1 : Number(lineRaw || 1);
        const sourceLineRange = data.sourceLineRange || (data.line !== undefined ? String(data.line) : '1');
        const capsuleId = data.capsuleId || null;
        const outerHTML = data.outerHTML || '';
        const kineticTelemetry = data.kineticTelemetry || data.telemetry || {};
        const telemetry = data.telemetry || data.kineticTelemetry || {};

        const selectionData = {
          clientSlug,
          dsId,
          dataDs,
          line,
          sourceLineRange,
          capsuleId,
          tagName: data.tagName || '',
          selector: data.selector || (dsId ? `[data-ds="${dsId}"]` : (data.tagName || '')),
          outerHTML,
          computedStyles: data.computedStyles || {},
          boundingBox: data.boundingBox || {},
          activeScopeVars: data.activeScopeVars || {},
          telemetry,
          kineticTelemetry,
          timestamp: data.timestamp || Date.now()
        };

        liveSelectionsStore.set(clientSlug, selectionData);
        if (hybridRepo && typeof hybridRepo.setLiveSelection === 'function') {
          hybridRepo.setLiveSelection(clientSlug, selectionData);
        }

        // 1. Primary v3.0 destination: clientes/<slug>/.dna/live-selection.json
        const clientTargetDir = path.join(clientesDir, clientSlug);
        const clientDnaDir = path.join(clientTargetDir, '.dna');
        const primaryPath = path.join(clientDnaDir, 'live-selection.json');
        writeJsonAtomicSync(primaryPath, selectionData);

        // 2. Mirrored client compatibility: clientes/<slug>/.domscribe/live-selection.json
        const clientDomscribeDir = path.join(clientTargetDir, '.domscribe');
        const clientDomscribePath = path.join(clientDomscribeDir, 'live-selection.json');
        writeJsonAtomicSync(clientDomscribePath, selectionData);

        // 3. Mirrored workspace fallback: .domscribe/live-selection-<slug>.json
        const rootDomscribeDir = path.join(rootDir, '.domscribe');
        const rootCachePath = path.join(rootDomscribeDir, `live-selection-${clientSlug}.json`);
        writeJsonAtomicSync(rootCachePath, selectionData);

        // Notify active SSE listeners if any
        notifyHotSwap(clientSlug, {
          type: 'selection_updated',
          clientSlug,
          dsId,
          dataDs,
          timestamp: selectionData.timestamp
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: true,
          clientSlug,
          dsId: selectionData.dsId,
          dataDs: selectionData.dataDs,
          timestamp: selectionData.timestamp
        }));
      } catch (err) {
        res.writeHead(err.statusCode || 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
      return;
    }

    if (pathname.startsWith('/__dna_live_select') && req.method === 'GET') {
      try {
        const rawSlug = pathname.replace(/^\/__dna_live_select\/?/, '').split('/')[0].trim();
        if (!rawSlug) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'clientSlug is required' }));
          return;
        }
        const clientSlug = assertSafeSlug(rawSlug);

        let selection = liveSelectionsStore.get(clientSlug);
        if (!selection && hybridRepo && typeof hybridRepo.getLiveSelection === 'function') {
          selection = hybridRepo.getLiveSelection(clientSlug);
        }
        if (!selection) {
          const primaryPath = path.join(clientesDir, clientSlug, '.dna', 'live-selection.json');
          const clientLegacy = path.join(clientesDir, clientSlug, '.domscribe', 'live-selection.json');
          const rootLegacy = path.join(rootDir, '.domscribe', `live-selection-${clientSlug}.json`);
          if (fs.existsSync(primaryPath)) {
            try { selection = JSON.parse(fs.readFileSync(primaryPath, 'utf8')); } catch (_) {}
          } else if (fs.existsSync(rootLegacy)) {
            try { selection = JSON.parse(fs.readFileSync(rootLegacy, 'utf8')); } catch (_) {}
          } else if (fs.existsSync(clientLegacy)) {
            try { selection = JSON.parse(fs.readFileSync(clientLegacy, 'utf8')); } catch (_) {}
          }
        }

        if (!selection) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'No live selection found for client' }));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, ...selection }));
      } catch (err) {
        res.writeHead(err.statusCode || 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
      return;
    }

    if (pathname === '/__dna_live_events' && req.method === 'GET') {
      const clientSlug = (urlObj && urlObj.searchParams.get('client')) || 'all';
      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
      res.write(': connected\n\n');

      if (!liveSseClients.has(clientSlug)) {
        liveSseClients.set(clientSlug, new Set());
      }
      const clientSet = liveSseClients.get(clientSlug);
      clientSet.add(res);

      req.on('close', () => {
        clientSet.delete(res);
      });
      return;
    }

    if (pathname === '/__dna_live_notify' && req.method === 'POST') {
      try {
        const data = await readJsonBody(req, { limitBytes: opts.maxBodyBytes });
        if (!data || typeof data !== 'object' || !data.clientSlug) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'clientSlug is required' }));
          return;
        }
        const clientSlug = assertSafeSlug(data.clientSlug);
        notifyHotSwap(clientSlug, data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, clientSlug, notified: true }));
      } catch (err) {
        res.writeHead(err.statusCode || 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
      return;
    }

    if (pathname === '/__dna_live_approve' && req.method === 'POST') {
      try {
        const data = await readJsonBody(req, { limitBytes: opts.maxBodyBytes });
        if (!data || typeof data !== 'object' || !data.clientSlug) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'clientSlug is required' }));
          return;
        }
        const clientSlug = assertSafeSlug(data.clientSlug);
        const directionId = data.directionId || 'T03A';
        const approvedByRole = data.approvedByRole || 'art_director';
        const sha256 = data.sha256 || 'sha256:0000000000000000000000000000000000000000000000000000000000000000';

        const clientTargetDir = path.join(clientesDir, clientSlug);
        if (!fs.existsSync(clientTargetDir)) fs.mkdirSync(clientTargetDir, { recursive: true });

        // Record H02 approval in ExecutionLedger
        const ledgerFile = path.join(clientTargetDir, 'EXECUTION_LEDGER.json');
        try {
          const { ExecutionLedger } = require('../orchestration/execution-ledger');
          let ledger;
          if (fs.existsSync(ledgerFile)) {
            try { ledger = ExecutionLedger.load(ledgerFile); } catch (_) { ledger = new ExecutionLedger(); }
          } else {
            ledger = new ExecutionLedger();
          }

          const runId = `run-${clientSlug}`;
          if (!ledger.getRun(runId)) {
            ledger.createRun({
              runId,
              taskId: 'TASK-V3-08:LIVE_WORKBENCH',
              model: 'human-director',
              inputTokens: 0,
              outputTokens: 0,
              retries: 0,
              status: 'direction_approved',
              gates: { H02: { approved: true, directionId, sha256 } },
              artifactHash: sha256
            });
          } else {
            const existing = ledger.getRun(runId);
            ledger.updateRun(runId, {
              gates: { ...existing.gates, H02: { approved: true, directionId, sha256 } }
            });
          }

          ledger.appendEvent(runId, {
            gate: 'H02',
            action: 'direction_approved',
            directionId,
            approvedByRole,
            sha256,
            timestamp: Date.now()
          });
          ledger.save(ledgerFile);
        } catch (_) {}

        // Record human-decision.json
        const decisionPath = path.join(clientTargetDir, 'human-decision.json');
        const decision = {
          schemaVersion: 2,
          contractKind: 'human-decision',
          decisionId: `dec-h02-${Date.now()}`,
          clientSlug,
          selectedDirection: directionId,
          approver: approvedByRole,
          gate: 'H02',
          sha256,
          timestamp: new Date().toISOString(),
          status: 'approved-frozen'
        };
        fs.writeFileSync(decisionPath, JSON.stringify(decision, null, 2), 'utf8');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: true,
          clientSlug,
          directionId,
          gate: 'H02',
          approved: true,
          sha256,
          timestamp: Date.now()
        }));
      } catch (err) {
        res.writeHead(err.statusCode || 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
      return;
    }

    // ── Rotas V2 & V3 da Arquitetura de Orquestração, Persistência & Auditoria ─
    const routeOpts = { rootDir, copiasDir, clientesDir, vaultDir, hybridRepo, urlObj, maxBodyBytes: opts.maxBodyBytes };
    if (await handleV2Orchestrate(req, res, pathname, routeOpts)) return;
    if (await handleV2Vault(req, res, pathname, routeOpts)) return;
    if (await handleV2Review(req, res, pathname, routeOpts)) return;
    if (await handleV2Audit(req, res, pathname, routeOpts)) return;
    if (await handleV3Persistence(req, res, pathname, routeOpts)) return;

    // ── API: Iniciar Extração ──────────────────────────────────────────────
    if (pathname === '/api/extract' && req.method === 'POST') {
      try {
        const data = await readJsonBody(req, { limitBytes: opts.maxBodyBytes });
        if (!data.url) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'URL e obrigatoria' }));
          return;
        }
        const safeUrl = await assertSafeExternalUrl(data.url);
        const { runPipeline } = require('../../index');
        res.writeHead(202, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Extracao iniciada em segundo plano' }));
        runPipeline({ url: safeUrl.href, mode: data.mode || 'all', headless: true }).catch(console.error);
      } catch (error) {
        res.writeHead(error.statusCode || 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
      return;
    }

    // ── API: Criar Projeto de Cliente ─────────────────────────────────────
    if (pathname === '/api/client/create' && req.method === 'POST') {
      try {
        const data = await readJsonBody(req, { limitBytes: opts.maxBodyBytes });
        if (!data.brandName) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Nome da marca e obrigatorio' }));
          return;
        }
        const refSlug = assertSafeSlug(data.refSlug || 'storeyarchitecture-co-uk');
        const result = createClientProject({
          brandName: data.brandName,
          refSlug,
          brandSpec: { niche: data.niche, toneOfVoice: data.toneOfVoice, whatsapp: data.whatsapp }
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, result }));
      } catch (error) {
        res.writeHead(error.statusCode || 500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
      return;
    }

    // ── API: Quality Gate ─────────────────────────────────────────────────
    if (pathname.startsWith('/api/audit/') && req.method === 'POST') {
      try {
        const targetSlug = assertSafeSlug(pathname.replace('/api/audit/', ''));
        const audit = await runBoxDiffLinter(targetSlug, port + 10);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, audit }));
      } catch (e) {
        res.writeHead(e.statusCode || 500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
      return;
    }

    // ── API: Design Vault Data ────────────────────────────────────────────
    if (pathname === '/api/vault') {
      let easings = null;
      let typography = null;
      try {
        const easingsPath = path.join(vaultDir, '01-motion-physics/easings.json');
        const typographyPath = path.join(vaultDir, '04-typography/curated-pairings.json');
        if (fs.existsSync(easingsPath)) easings = JSON.parse(fs.readFileSync(easingsPath, 'utf8'));
        if (fs.existsSync(typographyPath)) typography = JSON.parse(fs.readFileSync(typographyPath, 'utf8'));
      } catch (e) {}
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ easings, typography }));
      return;
    }

    // ── API: Dados de um Site ─────────────────────────────────────────────
    if (pathname.startsWith('/api/site/')) {
      let siteSlug;
      try {
        siteSlug = assertSafeSlug(pathname.replace('/api/site/', ''));
      } catch (error) {
        res.writeHead(error.statusCode || 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
        return;
      }
      let sitePath = path.join(copiasDir, siteSlug);
      if (!fs.existsSync(sitePath)) sitePath = path.join(clientesDir, siteSlug);
      if (!fs.existsSync(sitePath)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Site nao encontrado' }));
        return;
      }
      let siteType = null, dna = null, uiUx = null, masterSpec = null, linterReport = null;
      try {
        if (fs.existsSync(path.join(sitePath, 'SITE_TYPE.json'))) siteType = JSON.parse(fs.readFileSync(path.join(sitePath, 'SITE_TYPE.json'), 'utf8'));
        if (fs.existsSync(path.join(sitePath, 'design-system', 'design_dna.json'))) dna = JSON.parse(fs.readFileSync(path.join(sitePath, 'design-system', 'design_dna.json'), 'utf8'));
        if (fs.existsSync(path.join(sitePath, 'ui-ux', 'ui_ux_features.json'))) uiUx = JSON.parse(fs.readFileSync(path.join(sitePath, 'ui-ux', 'ui_ux_features.json'), 'utf8'));
        if (fs.existsSync(path.join(sitePath, 'MASTER_SPEC.md'))) masterSpec = fs.readFileSync(path.join(sitePath, 'MASTER_SPEC.md'), 'utf8');
        if (fs.existsSync(path.join(sitePath, 'linter-report.json'))) linterReport = JSON.parse(fs.readFileSync(path.join(sitePath, 'linter-report.json'), 'utf8'));
      } catch (e) {}
      const tailwindConfig = dna ? generateTailwindConfig(dna) : '';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ siteSlug, siteType, dna, uiUx, masterSpec, linterReport, tailwindConfig }));
      return;
    }

    // ── Dashboard Principal ───────────────────────────────────────────────
    if (pathname === '/' || pathname === '/index.html') {
      const copias = fs.existsSync(copiasDir)
        ? fs.readdirSync(copiasDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
        : [];
      const clientes = fs.existsSync(clientesDir)
        ? fs.readdirSync(clientesDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
        : [];
      const html = buildDashboardHtml(copias, clientes, { copiasDir, clientesDir, rootDir, enableMutations: mutationOptions.enabled });
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }

    // ── API: Salvar Brand Spec do Dev HUD (Tweakpane) ─────────────────────
    if (pathname === '/api/save-brand-spec' && req.method === 'POST') {
      try {
        const data = await readJsonBody(req, { limitBytes: opts.maxBodyBytes });
        const slug = assertSafeSlug(data.slug);
        const targetDir = path.join(clientesDir, slug);
        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
        const specPath = path.join(targetDir, 'brand-spec.json');
        let spec = {};
        if (fs.existsSync(specPath)) {
          try { spec = JSON.parse(fs.readFileSync(specPath, 'utf8')); } catch(e) {}
        }
        spec.colors = Object.assign(spec.colors || {}, data.colors || {});
        fs.writeFileSync(specPath, JSON.stringify(spec, null, 2), 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, specPath }));
      } catch (error) {
        res.writeHead(error.statusCode || 500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
      return;
    }

    // ── Alias e Atalhos Amigáveis (ex: /site/:slug, /styleguide/:slug) ──
    if (pathname.startsWith('/site/')) {
      const slugCandidate = pathname.replace('/site/', '').split('/')[0].trim();
      if (slugCandidate) {
        try {
          const safeSlug = assertSafeSlug(slugCandidate);
          let targetUrl = `/${safeSlug}/site/index.html`;
          if (fs.existsSync(path.join(clientesDir, safeSlug))) {
            targetUrl = `/clientes/${safeSlug}/site/index.html`;
          }
          res.writeHead(302, { Location: targetUrl });
          res.end();
          return;
        } catch (e) {}
      }
    }

    if (pathname.startsWith('/styleguide/')) {
      const slugCandidate = pathname.replace('/styleguide/', '').split('/')[0].trim();
      if (slugCandidate) {
        try {
          const safeSlug = assertSafeSlug(slugCandidate);
          let targetUrl = `/${safeSlug}/design-system/design-system.html`;
          if (fs.existsSync(path.join(clientesDir, safeSlug))) {
            targetUrl = `/clientes/${safeSlug}/design-system/design-system.html`;
          }
          res.writeHead(302, { Location: targetUrl });
          res.end();
          return;
        } catch (e) {}
      }
    }

    // ── Servir Arquivos Estáticos & Self-Healing Proxy ───────────────────
    let filePath;
    try {
      filePath = resolveStaticPath({ rootDir, copiasDir, clientesDir, pathname });
    } catch (error) {
      res.writeHead(error.statusCode || 400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('400 Bad Request');
      return;
    }

    // Se o caminho apontar para um diretório, tenta site/index.html ou index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      const candidates = [
        path.join(filePath, 'site', 'index.html'),
        path.join(filePath, 'index.html')
      ];
      for (const cand of candidates) {
        if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
          filePath = cand;
          break;
        }
      }
    }

    const referer = req.headers.referer || '';
    let refererSiteSlug = '';
    if (referer) {
      try {
        const refUrl = new URL(referer);
        const refParts = refUrl.pathname.split('/').filter(Boolean);
        if ((refParts[0] === 'clientes' || refParts[0] === 'projetos') && refParts[1]) {
          refererSiteSlug = path.join(refParts[0], refParts[1]);
        } else if (refParts[0]) {
          refererSiteSlug = refParts[0];
        }
      } catch (e) {}
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      const cleanPath = pathname.replace(/^\/+/, '');
      const candidates = [];

      if (refererSiteSlug) {
        candidates.push(
          path.join(rootDir, refererSiteSlug, 'site', cleanPath),
          path.join(rootDir, refererSiteSlug, 'site', 'assets', cleanPath),
          path.join(rootDir, refererSiteSlug, 'site', 'assets', path.basename(cleanPath)),
          path.join(copiasDir, refererSiteSlug, 'site', cleanPath),
          path.join(copiasDir, refererSiteSlug, 'site', 'assets', cleanPath),
          path.join(copiasDir, refererSiteSlug, 'site', 'assets', path.basename(cleanPath))
        );
      }

      for (const cand of candidates) {
        if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
          filePath = cand;
          break;
        }
      }
    }

    // ── Self-Healing 404 Interceptor: Se não existir no disco, busca na origem ──
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      let targetSiteDir = null;
      if (refererSiteSlug) {
        targetSiteDir = path.join(rootDir, refererSiteSlug);
      } else {
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length > 0) {
          if (parts[0] === 'clientes' && parts[1]) {
            targetSiteDir = path.join(clientesDir, parts[1]);
          } else if (fs.existsSync(path.join(copiasDir, parts[0]))) {
            targetSiteDir = path.join(copiasDir, parts[0]);
          }
        }
      }

      if (targetSiteDir && fs.existsSync(targetSiteDir)) {
        let originUrl = '';
        try {
          const specPath = path.join(targetSiteDir, 'MASTER_SPEC.md');
          if (fs.existsSync(specPath)) {
            const specText = fs.readFileSync(specPath, 'utf8');
            const match = specText.match(/URL de Origem:\s*(https?:\/\/[^\s\n\r]+)/i);
            if (match) originUrl = match[1].trim();
          }
          if (!originUrl) {
            const stPath = path.join(targetSiteDir, 'SITE_TYPE.json');
            if (fs.existsSync(stPath)) {
              const st = JSON.parse(fs.readFileSync(stPath, 'utf8'));
              originUrl = st.url || '';
            }
          }
        } catch (e) {}

        const cleanReqPath = pathname.replace(/^\/+/, '');
        const baseFile = path.basename(cleanReqPath);
        const assetCandidates = [];

        // 1. Trata caminhos com CDN do Webflow direto
        if (cleanReqPath.includes('cdn.prod.website-files.com')) {
          const cdnSub = cleanReqPath.slice(cleanReqPath.indexOf('cdn.prod.website-files.com') + 'cdn.prod.website-files.com'.length);
          assetCandidates.push(`https://cdn.prod.website-files.com${cdnSub}`);
        } else if (/^[0-9a-f]{24}\//.test(cleanReqPath)) {
          assetCandidates.push(`https://cdn.prod.website-files.com/${cleanReqPath}`);
        }

        // 2. Extrai Webflow site ID de MASTER_SPEC.md ou index.html se existir
        let webflowSiteId = '';
        try {
          const specPath = path.join(targetSiteDir, 'MASTER_SPEC.md');
          if (fs.existsSync(specPath)) {
            const specText = fs.readFileSync(specPath, 'utf8');
            const m = specText.match(/cdn\.prod\.website-files\.com\/([0-9a-f]{24})/i);
            if (m) webflowSiteId = m[1];
          }
          if (!webflowSiteId) {
            const indexPath = path.join(targetSiteDir, 'site', 'index.html');
            if (fs.existsSync(indexPath)) {
              const htmlSample = fs.readFileSync(indexPath, 'utf8').slice(0, 20000);
              const m = htmlSample.match(/cdn\.prod\.website-files\.com\/([0-9a-f]{24})/i);
              if (m) webflowSiteId = m[1];
            }
          }
        } catch (e) {}

        if (webflowSiteId && baseFile) {
          assetCandidates.push(`https://cdn.prod.website-files.com/${webflowSiteId}/${encodeURIComponent(baseFile)}`);
        }

        // 3. URLs relativas à origem
        if (originUrl) {
          try {
            const originObj = new URL(originUrl);
            const subAssetPath = cleanReqPath.replace(/^[^/]+\/(site\/)?(assets\/)?/, '');
            assetCandidates.push(
              new URL(subAssetPath, originObj.origin).href,
              new URL(cleanReqPath, originObj.origin).href
            );
          } catch (e) {}
        }

        for (const remoteUrl of assetCandidates) {
          const fileName = path.basename(new URL(remoteUrl).pathname) || 'asset';
          const localSavePath = path.join(targetSiteDir, 'site', 'assets', decodeURIComponent(fileName));
          const downloaded = await fetchAndSaveRemoteAsset(remoteUrl, localSavePath);
          if (downloaded && fs.existsSync(localSavePath)) {
            filePath = localSavePath;
            break;
          }
        }
      }
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      if (ext === '.html') {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cross-Origin-Resource-Policy': 'same-origin'
        });
        let content = fs.readFileSync(filePath, 'utf8');
        try {
          delete require.cache[require.resolve('../pro/universal-asset-normalizer')];
          const { UniversalAssetNormalizer } = require('../pro/universal-asset-normalizer');
          content = UniversalAssetNormalizer.applyUniversalFixes(content);
        } catch(e) {}
        try {
          delete require.cache[require.resolve('../generators/hud-projector')];
          const { injectDnaHud } = require('../generators/hud-projector');
          const clientRoot = path.dirname(path.dirname(filePath));
          const dnaPath = path.join(clientRoot, 'dna-ir.json');
          if (fs.existsSync(dnaPath)) {
            const dnaIr = JSON.parse(fs.readFileSync(dnaPath, 'utf8'));
            content = injectDnaHud(content, dnaIr);
          } else {
            delete require.cache[require.resolve('../dev/dev-hud')];
            const { injectDevHud } = require('../dev/dev-hud');
            content = injectDevHud(content);
          }
        } catch(e) {}

        // Component Workbench & skipIntro handling
        const skipIntro = urlObj && urlObj.searchParams.get('skipIntro') === '1';
        const workbenchTarget = urlObj && urlObj.searchParams.get('workbench');
        if (skipIntro || workbenchTarget) {
          const skipScript = `
<script id="__DNA_WORKBENCH_SKIP_INTRO__">
  window.__SKIP_INTRO__ = true;
  window.__WORKBENCH_TARGET__ = ${JSON.stringify(workbenchTarget || '')};
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.remove('lenis-locked');
    document.documentElement.style.overflow = '';
    if (document.body) {
      document.body.classList.remove('loading', 'preloader-active');
      document.body.style.opacity = '1';
    }
    const preloader = document.querySelector('[data-preloader], .preloader, #preloader, [data-intro]');
    if (preloader) {
      preloader.style.display = 'none';
    }
  });
</script>
`;
          if (content.includes('</head>')) {
            content = content.replace('</head>', skipScript + '</head>');
          } else {
            content = skipScript + content;
          }
        }

        res.end(content);
        return;
      }

      // Serve com suporte a Streaming HTTP 206 (Range) para mídias e assets estáticos
      streamFileWithRange(req, res, filePath, contentType);
    } else {
      // Self-healing fallback para Service Worker ausente
      if (pathname.endsWith('/sw.js') || pathname === '/sw.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        res.end('self.addEventListener("install", () => self.skipWaiting()); self.addEventListener("activate", () => self.clients.claim());');
        return;
      }
      // Self-healing fallback para Webpack dynamic chunks que não puderam ser baixados
      if (pathname.endsWith('.js') && (pathname.includes('chunk') || pathname.includes('achunk'))) {
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        res.end('(self.webpackChunk=self.webpackChunk||[]).push([[],{}]);');
        return;
      }
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      res.end('404 Not Found');
    }
  });

  const host = opts.host || '127.0.0.1';
  server.listen(port, host, () => {
    if (opts.silent) return;
    const activePort = server.address().port;
    console.log('\n👁️  [STUDIO DNA PRO v2.0] Servidor rodando em: \x1b[36mhttp://127.0.0.1:' + activePort + '\x1b[0m e \x1b[36mhttp://localhost:' + activePort + '\x1b[0m');
    console.log('📁  Servindo: ' + copiasDir + ' e ' + clientesDir + '\n');
  });

  server.hybridRepo = hybridRepo;
  server.on('close', () => {
    try { hybridRepo.close(); } catch (_) {}
  });

  return server;
}

module.exports = {
  startPreviewServer,
  buildDashboardHtml,
  fetchAndSaveRemoteAsset,
  getLiveSelection,
  setLiveSelection,
  writeJsonAtomicSync,
  notifyHotSwap
};
