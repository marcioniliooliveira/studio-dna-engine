'use strict';

/**
 * test/stress/stress-harness.js
 * 
 * Hardware Stress Suite Harness & Integration Orchestrator
 * Specifically designed for studio-dna v2.5 adverse hardware simulations:
 * - Scenario A: Playwright CDP 6x CPU Throttling (Emulation.setCPUThrottlingRate)
 * - Scenario B: 30fps rAF Clamping simulating Safari Low Power Mode
 * - Scenario C: WebGL Context Loss & Restoration (WEBGL_lose_context)
 * - Scenario D: Full End-to-End integration across M1, M2, M3, M4 modules
 */

const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require('playwright');

// Import core modules for Node-side assertions
const { SpringDynamicsEvaluator, solveDampedHarmonicMotion } = require('../../src/physics/spring-dynamics');
const { HapticEngine, HAPTIC_PATTERNS } = require('../../src/physics/haptic-engine');
const { createB2BQuoteMachine } = require('../../src/forms/b2b-quote-machine');
const {
  validateCPF,
  validateCNPJ,
  validateDocument,
  maskDocument,
  applyMaskWithCaret
} = require('../../src/forms/masks');
const { createDraftStorage, MemoryStorage } = require('../../src/forms/draft-storage');
const { TextureCompressor, calculateSceneTextureVram, auditMultiModelScene } = require('../../src/assets3d/texture-compressor');
const { runImpeccableGate, ZERO_TOLERANCE_RULES } = require('../../src/qa/impeccable-gate');
const { VisualSaliencyOracle } = require('../../src/qa/visual-saliency-oracle');

// MIME types dictionary for ephemeral server
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

/**
 * Ephemeral Stress Preview Server with zero-hang socket tracking
 */
class StressPreviewServer {
  constructor(options = {}) {
    this.port = options.port || 0;
    this.host = options.host || '127.0.0.1';
    this.routes = new Map();
    this.server = null;
    this.boundPort = null;
    this.activeSockets = new Set();

    if (options.routes) {
      for (const [routePath, handler] of Object.entries(options.routes)) {
        this.addRoute(routePath, handler);
      }
    }
  }

  addRoute(routePath, handler) {
    const normalized = routePath.startsWith('/') ? routePath : `/${routePath}`;
    this.routes.set(normalized, handler);
  }

  async start() {
    return new Promise((resolve, reject) => {
      this.server = http.createServer(async (req, res) => {
        try {
          const rawUrl = req.url || '/';
          const pathname = rawUrl.split('?')[0];

          if (this.routes.has(pathname)) {
            const handler = this.routes.get(pathname);
            if (typeof handler === 'function') {
              return await handler(req, res);
            } else if (typeof handler === 'string') {
              const ext = path.extname(pathname).toLowerCase() || '.html';
              res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/html; charset=utf-8' });
              return res.end(handler);
            }
          }

          // Default fallback route: serve root if defined
          if (this.routes.has('/')) {
            const rootHandler = this.routes.get('/');
            const html = typeof rootHandler === 'function' ? await rootHandler(req, res) : rootHandler;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(html);
          }

          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found in StressPreviewServer');
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(`500 Internal Error: ${err.message}`);
        }
      });

      this.server.on('connection', (sock) => {
        this.activeSockets.add(sock);
        sock.once('close', () => this.activeSockets.delete(sock));
      });

      this.server.on('error', reject);

      this.server.listen(this.port, this.host, () => {
        this.boundPort = this.server.address().port;
        resolve(this);
      });
    });
  }

  getUrl(pathname = '/') {
    if (!this.boundPort) {
      throw new Error('Server not running. Call start() first.');
    }
    const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return `http://${this.host}:${this.boundPort}${clean}`;
  }

  async close() {
    if (!this.server) return;
    for (const sock of this.activeSockets) {
      try { sock.destroy(); } catch (e) {}
    }
    this.activeSockets.clear();
    return new Promise((resolve) => {
      this.server.close(() => {
        this.server = null;
        this.boundPort = null;
        resolve();
      });
    });
  }
}

/**
 * Higher-order test runner with complete browser, CDP, and server lifecycle
 */
async function withStressContext(options = {}, testFn) {
  let server = null;
  let browser = null;
  let context = null;
  let page = null;
  let cdpSession = null;

  try {
    // 1. Build routes and server
    const integratedHtml = buildIntegratedHtml(options.htmlOptions);
    const routes = options.routes || { '/': integratedHtml };
    server = new StressPreviewServer({ routes });
    await server.start();

    // 2. Launch browser with WebGL support
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--enable-webgl',
        '--ignore-gpu-blocklist',
        '--use-gl=angle',
        '--use-angle=swiftshader'
      ]
    });

    const viewport = options.viewport || { width: 1440, height: 900 };
    context = await browser.newContext({
      viewport,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) StudioDna/2.5 HardwareStressRunner'
    });

    // 3. Inject rAF clamping if requested
    if (options.clampRafFps) {
      await injectRafClamp(context, options.clampRafFps);
    }

    page = await context.newPage();
    page.setDefaultTimeout(options.timeout || 30000);

    // 4. Create CDP session if requested
    if (options.cdp) {
      cdpSession = await context.newCDPSession(page);
    }

    return await testFn({
      server,
      browser,
      context,
      page,
      cdpSession,
      url: (p = '/') => server.getUrl(p)
    });
  } finally {
    if (page) try { await page.close(); } catch (e) {}
    if (context) try { await context.close(); } catch (e) {}
    if (browser) try { await browser.close(); } catch (e) {}
    if (server) try { await server.close(); } catch (e) {}
  }
}

/**
 * Helper to apply CDP CPU Throttling
 */
async function setCPUThrottling(cdpSession, rate = 6) {
  if (!cdpSession) {
    throw new Error('CDP session required for setCPUThrottling');
  }
  await cdpSession.send('Emulation.setCPUThrottlingRate', { rate });
  return {
    rate,
    clear: async () => {
      await cdpSession.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    }
  };
}

/**
 * Injects 30fps rAF clamping simulating Safari Low Power Mode
 */
async function injectRafClamp(pageOrContext, targetFps = 30) {
  const minDelta = 1000 / targetFps - 1.5; // ~31.8ms threshold for 30Hz
  const script = `
    (function() {
      const origRaf = window.requestAnimationFrame;
      let lastTime = 0;
      window.__rafDeltas = [];
      window.__isRafClamped = true;
      window.__clampedTargetFps = ${targetFps};

      window.requestAnimationFrame = function(cb) {
        return origRaf(function(now) {
          if (now - lastTime < ${minDelta}) {
            return origRaf(cb);
          }
          if (lastTime > 0) {
            window.__rafDeltas.push(now - lastTime);
            if (window.__rafDeltas.length > 300) window.__rafDeltas.shift();
          }
          lastTime = now;
          cb(now);
        });
      };
    })();
  `;
  if (typeof pageOrContext.addInitScript === 'function') {
    await pageOrContext.addInitScript(script);
  }
}

/**
 * Mathematical simulator comparing analytical closed-form ODE vs forward Euler integration
 */
function compareAnalyticalVsEulerSpring({
  from = 100,
  target = 0,
  initialVelocity = 0,
  stiffness = 180,
  damping = 12,
  mass = 1.0,
  durationSeconds = 2.0
} = {}) {
  const springEvaluator = new SpringDynamicsEvaluator({
    from,
    target,
    initialVelocity,
    stiffness,
    damping,
    mass
  });

  const settleThreshold = 0.5;

  // 1. Analytical Evaluation at 60fps (dt = 1/60s)
  const dt60 = 1 / 60;
  const steps60 = Math.floor(durationSeconds / dt60);
  const ode60 = [];
  let settleTimeOde60 = null;

  for (let i = 0; i <= steps60; i++) {
    const t = i * dt60;
    const state = springEvaluator.evaluate(t);
    ode60.push({ t, position: state.position, velocity: state.velocity, isSettled: state.isSettled });
    if (settleTimeOde60 === null && state.isSettled) {
      settleTimeOde60 = t;
    }
  }

  // 2. Analytical Evaluation at 30fps (Safari Low Power Mode, dt = 1/30s)
  const dt30 = 1 / 30;
  const steps30 = Math.floor(durationSeconds / dt30);
  const ode30 = [];
  let settleTimeOde30 = null;

  for (let i = 0; i <= steps30; i++) {
    const t = i * dt30;
    const state = springEvaluator.evaluate(t);
    ode30.push({ t, position: state.position, velocity: state.velocity, isSettled: state.isSettled });
    if (settleTimeOde30 === null && state.isSettled) {
      settleTimeOde30 = t;
    }
  }

  // 3. Forward Euler Numerical Integration at 60fps
  const euler60 = [];
  let xE60 = from;
  let vE60 = initialVelocity;
  let settleTimeEuler60 = null;

  for (let i = 0; i <= steps60; i++) {
    const t = i * dt60;
    euler60.push({ t, position: xE60, velocity: vE60 });
    if (settleTimeEuler60 === null && Math.abs(xE60 - target) <= settleThreshold && Math.abs(vE60) <= settleThreshold) {
      settleTimeEuler60 = t;
    }
    const force = -stiffness * (xE60 - target) - damping * vE60;
    const a = force / mass;
    xE60 += vE60 * dt60;
    vE60 += a * dt60;
  }

  // 4. Forward Euler Numerical Integration at 30fps (Safari Low Power Mode)
  const euler30 = [];
  let xE30 = from;
  let vE30 = initialVelocity;
  let settleTimeEuler30 = null;
  let euler30Exploded = false;

  for (let i = 0; i <= steps30; i++) {
    const t = i * dt30;
    euler30.push({ t, position: xE30, velocity: vE30 });
    if (!Number.isFinite(xE30) || Math.abs(xE30) > 1e6) {
      euler30Exploded = true;
      break;
    }
    if (settleTimeEuler30 === null && Math.abs(xE30 - target) <= settleThreshold && Math.abs(vE30) <= settleThreshold) {
      settleTimeEuler30 = t;
    }
    const force = -stiffness * (xE30 - target) - damping * vE30;
    const a = force / mass;
    xE30 += vE30 * dt30;
    vE30 += a * dt30;
  }

  // 5. Compute max divergence between ode60 and ode30 at common sample points
  let maxOdeDivergence = 0;
  for (let i = 0; i <= steps30; i++) {
    const p30 = ode30[i];
    const p60 = ode60[i * 2]; // 30fps sample i corresponds to 60fps sample 2*i
    if (p30 && p60) {
      const diff = Math.abs(p30.position - p60.position);
      if (diff > maxOdeDivergence) maxOdeDivergence = diff;
    }
  }

  // 6. Compute max divergence between euler30 and ground-truth ODE
  let maxEulerDivergence = 0;
  for (let i = 0; i < euler30.length; i++) {
    const e = euler30[i];
    const o = ode30[i];
    if (e && o) {
      const diff = Math.abs(e.position - o.position);
      if (diff > maxEulerDivergence) maxEulerDivergence = diff;
    }
  }

  const analyticalSettlingTime = springEvaluator.getSettlingTime();

  return {
    ode60,
    ode30,
    euler60,
    euler30,
    settleTimeOde60,
    settleTimeOde30,
    settleTimeEuler60,
    settleTimeEuler30,
    analyticalSettlingTime,
    odeSettlingDiffMs: Math.abs((settleTimeOde30 || 0) - (settleTimeOde60 || 0)) * 1000,
    maxOdeDivergence,
    maxEulerDivergence,
    euler30Exploded
  };
}

/**
 * Builds the standalone client-side JavaScript bundle from production modules
 */
function buildClientBundle() {
  const root = path.resolve(__dirname, '../../src');
  const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

  const fsmCoreCode = read('fsm/core/machine.js');
  const masksCode = read('forms/masks.js');
  const draftStorageCode = read('forms/draft-storage.js');
  const b2bMachineCode = read('forms/b2b-quote-machine.js');
  const connectCode = read('fsm/core/connect.js');
  const springDynamicsCode = read('physics/spring-dynamics.js');
  const hapticEngineCode = read('physics/haptic-engine.js');

  return `
  (function() {
    const modules = {};
    function define(name, fn) {
      const mod = { exports: {} };
      fn(mod.exports, mod, function(dep) {
        if (dep.includes('machine')) return modules['machine'].exports;
        if (dep.includes('masks')) return modules['masks'].exports;
        if (dep.includes('draft-storage')) return modules['draft-storage'].exports;
        if (dep.includes('connect')) return modules['connect'].exports;
        if (dep.includes('b2b-quote-machine')) return modules['b2b-quote-machine'].exports;
        if (dep.includes('spring-dynamics')) return modules['spring-dynamics'].exports;
        if (dep.includes('haptic-engine')) return modules['haptic-engine'].exports;
        throw new Error('Unknown dependency: ' + dep);
      });
      modules[name] = mod;
    }

    define('machine', function(exports, module, require) {
      ${fsmCoreCode}
    });

    define('masks', function(exports, module, require) {
      ${masksCode}
    });

    define('draft-storage', function(exports, module, require) {
      ${draftStorageCode}
    });

    define('b2b-quote-machine', function(exports, module, require) {
      ${b2bMachineCode}
    });

    define('connect', function(exports, module, require) {
      ${connectCode}
    });

    define('spring-dynamics', function(exports, module, require) {
      ${springDynamicsCode}
    });

    define('haptic-engine', function(exports, module, require) {
      ${hapticEngineCode}
    });

    window.StudioDna = {
      machine: modules['machine'].exports,
      masks: modules['masks'].exports,
      draftStorage: modules['draft-storage'].exports,
      b2bQuoteMachine: modules['b2b-quote-machine'].exports,
      connect: modules['connect'].exports,
      springDynamics: modules['spring-dynamics'].exports,
      hapticEngine: modules['haptic-engine'].exports
    };
  })();
  `;
}

/**
 * Builds the complete integrated Studio DNA v2.5 HTML page for adverse hardware tests.
 * Conforms 100% to Impeccable Tier 4 standards:
 * - 0 dark-glow
 * - 0 nested-cards
 * - 0 overused-font
 * - 0 bounce-easing
 * - 0 pulsing-dot
 */
function buildIntegratedHtml(options = {}) {
  const clientBundle = buildClientBundle();

  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Studio DNA v2.5 — Adverse Hardware Resiliency & Integration Screen</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet"/>
  
  <style>
    :root {
      --bg-surface: #081421;
      --bg-surface-card: #0F1F2E;
      --bg-container: #15202E;
      --text-main: #F8FAFC;
      --text-muted: #94A3B8;
      --accent-volt: #A9E52C;
      --accent-volt-hover: #96CE24;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-focus: #A9E52C;
      --error-color: #EF4444;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--bg-surface);
      color: var(--text-main);
      font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    .divider {
      width: 100%;
      height: 1px;
      background-color: var(--border-subtle);
    }
    .header-bar {
      padding: 1.25rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .badge-status {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      padding: 0.25rem 0.6rem;
      border-radius: 4px;
      background: rgba(169, 229, 44, 0.12);
      color: var(--accent-volt);
      border: 1px solid rgba(169, 229, 44, 0.25);
    }
    .main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      padding: 2rem;
      max-width: 1360px;
      margin: 0 auto;
      width: 100%;
    }
    @media (max-width: 900px) {
      .main-grid {
        grid-template-columns: 1fr;
      }
    }
    /* Flat Container (Strictly 1 layer of cards, NO nested cards) */
    .flat-card {
      background: var(--bg-surface-card);
      border-radius: 12px;
      border: 1px solid var(--border-subtle);
      padding: 1.5rem;
    }
    .form-group {
      margin-bottom: 1.2rem;
      display: flex;
      flex-direction: column;
    }
    .form-label {
      font-size: 0.825rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 0.4rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    /* Native inputs directly styled without card shells */
    .form-input, .form-select, .form-textarea {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      color: var(--text-main);
      font-family: 'Manrope', sans-serif;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.15s ease;
    }
    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color: var(--border-focus);
    }
    .form-input[aria-invalid="true"] {
      border-color: var(--error-color);
    }
    .error-msg {
      color: var(--error-color);
      font-size: 0.775rem;
      margin-top: 0.35rem;
    }
    .btn-submit {
      background: var(--accent-volt);
      color: #040F1C;
      font-weight: 700;
      font-size: 1rem;
      padding: 0.85rem 1.5rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      width: 100%;
      text-align: center;
      transition: background-color 0.15s ease;
    }
    .btn-submit:hover:not(:disabled) {
      background: var(--accent-volt-hover);
    }
    .btn-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    /* WebGL Canvas */
    #glCanvas {
      width: 100%;
      height: 280px;
      background: #040F1C;
      border-radius: 8px;
      border: 1px solid var(--border-subtle);
      display: block;
    }
    /* Spring Interactive Drawer / Box */
    .spring-track {
      background: var(--bg-surface);
      height: 72px;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      border: 1px solid var(--border-subtle);
      margin-top: 1rem;
    }
    .spring-thumb {
      width: 60px;
      height: 60px;
      background: var(--accent-volt);
      border-radius: 6px;
      position: absolute;
      top: 5px;
      left: 6px;
      cursor: grab;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 800;
      color: #040F1C;
      user-select: none;
      touch-action: none;
    }
    .notice-bar {
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
    .notice-delayed {
      background: rgba(255, 209, 46, 0.1);
      color: #FFD12E;
      border: 1px solid rgba(255, 209, 46, 0.3);
    }
    .notice-success {
      background: rgba(169, 229, 44, 0.1);
      color: var(--accent-volt);
      border: 1px solid rgba(169, 229, 44, 0.3);
    }
    .notice-draft {
      background: rgba(148, 163, 184, 0.1);
      color: var(--text-main);
      border: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="header-bar">
    <div>
      <h1 style="font-size: 1.25rem; font-weight: 800;">Studio DNA v2.5</h1>
      <p style="font-size: 0.8rem; color: var(--text-muted);">Hardware Stress &amp; Multi-Module Integration Console</p>
    </div>
    <div id="runtime-status-badge" class="badge-status">INITIALIZING</div>
  </div>
  <div class="divider"></div>

  <main class="main-grid">
    <!-- Column 1: Zag/XState FSM Quotation Form -->
    <div class="flat-card">
      <h2 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Cotação JumpPlay B2B</h2>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.2rem;">
        Formulário com validação determinística Modulo 11 e máscaras adaptativas.
      </p>

      <!-- Draft Recovery Banner -->
      <div id="form-draft-notice" class="notice-bar notice-draft" hidden>
        <span>Rascunho anterior detectado. Deseja restaurar?</span>
        <div>
          <button id="draft-restore-btn" type="button" style="padding: 0.25rem 0.5rem; margin-right: 0.5rem; background: var(--accent-volt); color: #000; border: none; border-radius: 4px; cursor: pointer; font-weight: 700;">Restaurar</button>
          <button id="draft-discard-btn" type="button" style="padding: 0.25rem 0.5rem; background: transparent; color: var(--text-muted); border: 1px solid var(--border-subtle); border-radius: 4px; cursor: pointer;">Descartar</button>
        </div>
      </div>

      <form id="b2b-quote-form" role="form" novalidate data-state="idle" aria-busy="false">
        <!-- Latency Delayed Notice -->
        <div id="form-latency-notice" class="notice-bar notice-delayed" role="status" aria-live="polite" hidden>
          Aguarde, processando cotação nos servidores JumpPlay...
        </div>

        <!-- Success Notice -->
        <div id="form-success-notice" class="notice-bar notice-success" role="status" aria-live="polite" hidden>
          Cotação enviada com sucesso! Protocolo gerado.
        </div>
        <div class="form-group">
          <label id="label-businessType" for="field-businessType" class="form-label">Tipo de Negócio *</label>
          <select id="field-businessType" name="businessType" class="form-select">
            <option value="">Selecione o segmento...</option>
            <option value="Parque de Trampolins">Parque de Trampolins</option>
            <option value="Academia / Centro Esportivo">Academia / Centro Esportivo</option>
            <option value="Escola / Clube">Escola / Clube</option>
            <option value="Revendedor Autorizado">Revendedor Autorizado</option>
          </select>
          <span id="error-businessType" data-error-for="businessType" class="error-msg" role="alert" aria-live="polite" hidden></span>
        </div>

        <div class="form-group">
          <label id="label-quantity" for="field-quantity" class="form-label">Quantidade de Unidades (1-1000) *</label>
          <input id="field-quantity" name="quantity" type="number" min="1" max="1000" class="form-input" placeholder="Ex: 15"/>
          <span id="error-quantity" data-error-for="quantity" class="error-msg" role="alert" aria-live="polite" hidden></span>
        </div>

        <div class="form-group">
          <label id="label-region" for="field-region" class="form-label">Região / Estado *</label>
          <input id="field-region" name="region" type="text" class="form-input" placeholder="São Paulo / SP" value="São Paulo / SP"/>
          <span id="error-region" data-error-for="region" class="error-msg" role="alert" aria-live="polite" hidden></span>
        </div>

        <div class="form-group">
          <label id="label-document" for="field-document" class="form-label">CNPJ ou CPF do Solicitante *</label>
          <input id="field-document" name="document" type="text" class="form-input" placeholder="000.000.000-00 ou 00.000.000/0001-00" autocomplete="off"/>
          <span id="error-document" data-error-for="document" class="error-msg" role="alert" aria-live="polite" hidden></span>
        </div>

        <div class="form-group">
          <label id="label-contactName" for="field-contactName" class="form-label">Nome Completo *</label>
          <input id="field-contactName" name="contactName" type="text" class="form-input" placeholder="Ex: Carlos Oliveira"/>
          <span id="error-contactName" data-error-for="contactName" class="error-msg" role="alert" aria-live="polite" hidden></span>
        </div>

        <div class="form-group">
          <label id="label-contactEmail" for="field-contactEmail" class="form-label">E-mail Corporativo *</label>
          <input id="field-contactEmail" name="contactEmail" type="email" class="form-input" placeholder="carlos@empresa.com.br"/>
          <span id="error-contactEmail" data-error-for="contactEmail" class="error-msg" role="alert" aria-live="polite" hidden></span>
        </div>

        <div class="form-group">
          <label id="label-contactPhone" for="field-contactPhone" class="form-label">Telefone / WhatsApp *</label>
          <input id="field-contactPhone" name="contactPhone" type="tel" class="form-input" placeholder="(11) 98765-4321"/>
          <span id="error-contactPhone" data-error-for="contactPhone" class="error-msg" role="alert" aria-live="polite" hidden></span>
        </div>

        <button id="submit-btn" type="submit" class="btn-submit" aria-busy="false" data-state="idle">
          Solicitar Proposta Comercial JumpPlay
        </button>
      </form>
    </div>

    <!-- Column 2: WebGL 3D Canvas & Analytical Spring Dynamics -->
    <div class="flat-card" style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- WebGL Canvas Section -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <h2 style="font-size: 1.1rem;">Pipeline 3D &amp; Resiliência de Contexto</h2>
          <span id="gl-status-badge" class="badge-status">WEBGL ACTIVE</span>
        </div>
        <canvas id="glCanvas" width="560" height="280"></canvas>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
          <span id="gl-fps-metric" style="font-size: 0.75rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">Frames: 0</span>
          <div>
            <button id="btn-lose-gl" type="button" style="padding: 0.35rem 0.65rem; background: #374151; color: #fff; border: none; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Simular Perda WebGL</button>
            <button id="btn-restore-gl" type="button" style="padding: 0.35rem 0.65rem; background: var(--accent-volt); color: #000; border: none; border-radius: 4px; font-size: 0.75rem; cursor: pointer; margin-left: 0.5rem;">Restaurar WebGL</button>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Spring Dynamics Section -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <h2 style="font-size: 1.1rem;">Física Analítica (2ª Ordem ODE)</h2>
          <span id="spring-status-badge" class="badge-status">ODE SETTLED</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted);">
          Controle cinético contínuo x(t) invariante à taxa de atualização do rAF.
        </p>

        <div class="spring-track" id="springTrack">
          <div class="spring-thumb" id="springThumb">DRAG</div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 0.6rem; font-size: 0.75rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">
          <span id="spring-pos-metric">x: 0.0px</span>
          <span id="spring-vel-metric">v: 0.0px/s</span>
          <span id="spring-regime-metric">regime: underdamped</span>
        </div>
      </div>
    </div>
  </main>

  <!-- Embed Production Modules -->
  <script>
    ${clientBundle}
  </script>

  <!-- Wire Client-Side Interactive Engine -->
  <script>
    (function() {
      const { b2bQuoteMachine, masks, connect, springDynamics, hapticEngine } = window.StudioDna;

      // 1. Initialize B2B Quote Machine
      const machine = b2bQuoteMachine.createB2BQuoteMachine({
        formId: 'jumpflex_b2b_stress',
        autoSaveDraft: true,
        initialValues: {
          region: 'São Paulo / SP',
          timeframe: 'Imediato'
        }
      });
      window.__b2bMachine = machine;

      // Setup DOM Bindings
      const formEl = document.getElementById('b2b-quote-form');
      const unbindForm = connect.bindToDOM(formEl, machine);

      // Adaptive Input Masking on Document Field
      const docInput = document.getElementById('field-document');
      window.__keystrokeLog = [];
      let prevDocValue = '';

      docInput.addEventListener('keydown', function(e) {
        window.__lastKeydownTime = performance.now();
      });

      docInput.addEventListener('input', function(e) {
        const t0 = performance.now();
        const nextValue = e.target.value;
        const cursorPos = e.target.selectionStart;

        // Apply adaptive masking with caret tracking: (maskFn, prevVal, nextVal, cursorPos)
        const res = masks.applyMaskWithCaret(masks.maskDocument, prevDocValue, nextValue, cursorPos);
        prevDocValue = res.maskedValue;
        e.target.value = res.maskedValue;
        e.target.setSelectionRange(res.nextCursorPosition, res.nextCursorPosition);

        // Update FSM value
        machine.send({
          type: 'INPUT',
          field: 'document',
          value: res.rawValue,
          cursorPosition: res.nextCursorPosition
        });

        const elapsed = performance.now() - t0;
        window.__keystrokeLog.push({
          char: nextValue.slice(-1),
          rawLength: res.rawValue.length,
          maskedLength: res.maskedValue.length,
          elapsedMs: elapsed
        });
      });

      // 2. Initialize WebGL Context & Loss/Restore Harness
      const canvas = document.getElementById('glCanvas');
      const glBadge = document.getElementById('gl-status-badge');
      const fpsMetric = document.getElementById('gl-fps-metric');

      let gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      let loseExt = gl ? gl.getExtension('WEBGL_lose_context') : null;

      window.__glState = {
        isLost: false,
        lostEventsCount: 0,
        restoredEventsCount: 0,
        framesCount: 0,
        drawErrorsCount: 0
      };

      let rafId = null;
      let angle = 0;

      function renderFrame() {
        if (window.__glState.isLost || !gl || gl.isContextLost()) {
          return;
        }
        try {
          angle += 0.02;
          const r = Math.sin(angle) * 0.1 + 0.05;
          const g = Math.cos(angle) * 0.1 + 0.08;
          const b = 0.15;
          gl.clearColor(r, g, b, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          window.__glState.framesCount++;
          fpsMetric.textContent = 'Frames: ' + window.__glState.framesCount;
        } catch (err) {
          window.__glState.drawErrorsCount++;
        }
        rafId = requestAnimationFrame(renderFrame);
      }

      function initGLResources() {
        if (!gl || gl.isContextLost()) return;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0.04, 0.08, 0.12, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }

      initGLResources();
      rafId = requestAnimationFrame(renderFrame);

      canvas.addEventListener('webglcontextlost', function(e) {
        e.preventDefault(); // Crucial: allow restoration
        window.__glState.isLost = true;
        window.__glState.lostEventsCount++;
        glBadge.textContent = 'WEBGL CONTEXT LOST';
        glBadge.style.color = '#EF4444';
        glBadge.style.borderColor = '#EF4444';
        if (rafId) cancelAnimationFrame(rafId);
      });

      canvas.addEventListener('webglcontextrestored', function() {
        window.__glState.isLost = false;
        window.__glState.restoredEventsCount++;
        glBadge.textContent = 'WEBGL RESTORED';
        glBadge.style.color = '#A9E52C';
        glBadge.style.borderColor = '#A9E52C';
        initGLResources();
        rafId = requestAnimationFrame(renderFrame);
      });

      window.__loseWebGLContext = function() {
        if (loseExt) loseExt.loseContext();
      };
      window.__restoreWebGLContext = function() {
        if (loseExt) loseExt.restoreContext();
      };

      document.getElementById('btn-lose-gl').addEventListener('click', window.__loseWebGLContext);
      document.getElementById('btn-restore-gl').addEventListener('click', window.__restoreWebGLContext);

      // 3. Initialize Analytical Spring Dynamics
      const thumb = document.getElementById('springThumb');
      const track = document.getElementById('springTrack');
      const springBadge = document.getElementById('spring-status-badge');
      const posMetric = document.getElementById('spring-pos-metric');
      const velMetric = document.getElementById('spring-vel-metric');

      let currentSpring = null;
      let isDragging = false;
      let startX = 0;
      let currentX = 0;
      let dragVelocityTracker = new springDynamics.VelocityTracker();
      let springStartTime = 0;
      let springRafId = null;

      function stepSpring(now) {
        if (!currentSpring) return;
        const elapsedSec = (now - springStartTime) / 1000;
        const state = currentSpring.evaluate(elapsedSec);

        currentX = state.position;
        thumb.style.transform = 'translateX(' + currentX + 'px)';
        posMetric.textContent = 'x: ' + currentX.toFixed(1) + 'px';
        velMetric.textContent = 'v: ' + state.velocity.toFixed(1) + 'px/s';

        if (state.isSettled) {
          springBadge.textContent = 'ODE SETTLED';
          currentSpring = null;
        } else {
          springRafId = requestAnimationFrame(stepSpring);
        }
      }

      thumb.addEventListener('pointerdown', function(e) {
        isDragging = true;
        startX = e.clientX - currentX;
        dragVelocityTracker.reset();
        dragVelocityTracker.record(currentX, performance.now());
        if (springRafId) cancelAnimationFrame(springRafId);
        thumb.setPointerCapture(e.pointerId);
        springBadge.textContent = 'DRAGGING';
      });

      thumb.addEventListener('pointermove', function(e) {
        if (!isDragging) return;
        const rawX = e.clientX - startX;
        currentX = Math.max(0, Math.min(rawX, track.clientWidth - 72));
        thumb.style.transform = 'translateX(' + currentX + 'px)';
        dragVelocityTracker.record(currentX, performance.now());
        posMetric.textContent = 'x: ' + currentX.toFixed(1) + 'px';
      });

      thumb.addEventListener('pointerup', function(e) {
        if (!isDragging) return;
        isDragging = false;
        const vDrag = dragVelocityTracker.getVelocity();

        // Release: Initialize analytical ODE evaluator with C¹ velocity continuity
        currentSpring = new springDynamics.SpringDynamicsEvaluator({
          from: currentX,
          target: 0,
          initialVelocity: vDrag,
          stiffness: 180,
          damping: 14,
          mass: 1.0
        });

        springBadge.textContent = 'ODE RELEASING (' + currentSpring.getRegime() + ')';
        springStartTime = performance.now();
        springRafId = requestAnimationFrame(stepSpring);
      });

      document.getElementById('runtime-status-badge').textContent = 'ONLINE';
    })();
  </script>
</body>
</html>`;
}

module.exports = {
  StressPreviewServer,
  withStressContext,
  setCPUThrottling,
  injectRafClamp,
  compareAnalyticalVsEulerSpring,
  buildClientBundle,
  buildIntegratedHtml
};
