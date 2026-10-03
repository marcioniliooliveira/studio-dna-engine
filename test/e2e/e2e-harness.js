/**
 * test/e2e/e2e-harness.js
 * 
 * E2E Test Harness & Ephemeral Preview Server Manager
 * Conforms strictly to TEST_INFRA.md and PROJECT.md specifications:
 * - Multi-viewport orchestration: Desktop (1440x900) & Mobile iOS Retina (390x844)
 * - Ephemeral server lifecycle management (dynamic ports / port 4000)
 * - Playwright Chromium context management with zero-leak teardown
 * - CDP session orchestration (Animation, DOM, CSS, Performance domains)
 * - Mathematical & contract reference utilities (C² Catmull-Rom, Squad, NDC projection, 0px² AABB, VRAM)
 * - Safe modular resolver for all 17 features
 */

'use strict';

const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require('playwright');

// ============================================================================
// 1. Viewport Standards (TEST_INFRA.md §35-37)
// ============================================================================

const VIEWPORTS = {
  desktop: {
    name: 'desktop',
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
  },
  mobile: {
    name: 'mobile',
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  }
};

// ============================================================================
// 2. Ephemeral Preview Server Manager
// ============================================================================

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.wasm': 'application/wasm',
  '.glb': 'model/gltf-binary',
  '.ktx2': 'image/ktx2',
  '.txt': 'text/plain; charset=utf-8'
};

class EphemeralPreviewServer {
  constructor(options = {}) {
    this.options = options;
    this.port = options.port !== undefined ? options.port : 0; // 0 for dynamic ephemeral port
    this.host = options.host || '127.0.0.1';
    this.staticDir = options.staticDir ? path.resolve(options.staticDir) : null;
    this.routes = new Map();
    this.server = null;
    this.activeSockets = new Set();
    this.boundPort = null;

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

          // 1. Check in-memory route handlers
          if (this.routes.has(pathname)) {
            const handler = this.routes.get(pathname);
            if (typeof handler === 'function') {
              return await handler(req, res);
            } else if (typeof handler === 'string') {
              const ext = path.extname(pathname).toLowerCase();
              const ct = MIME_TYPES[ext] || 'text/html; charset=utf-8';
              res.writeHead(200, { 'Content-Type': ct });
              return res.end(handler);
            } else if (Buffer.isBuffer(handler)) {
              res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
              return res.end(handler);
            } else if (typeof handler === 'object') {
              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
              return res.end(JSON.stringify(handler));
            }
          }

          // 2. Check static directory
          if (this.staticDir) {
            let rel = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
            let filePath = path.join(this.staticDir, rel);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const ct = MIME_TYPES[ext] || 'application/octet-stream';
              res.writeHead(200, { 'Content-Type': ct });
              return fs.createReadStream(filePath).pipe(res);
            }
          }

          // 3. Fallback 404
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found');
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(`500 Internal Error: ${err.message}`);
        }
      });

      // Track active sockets for immediate zero-hang termination
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
    const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return `http://${this.host}:${this.boundPort}${cleanPath}`;
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

async function startEphemeralPreviewServer(options = {}) {
  const server = new EphemeralPreviewServer(options);
  await server.start();
  return server;
}

// ============================================================================
// 3. Playwright Multi-Viewport Harness
// ============================================================================

/**
 * Higher-order runner executing a test block with automatic isolated page & server cleanup
 */
async function withTestContext(options = {}, testFn) {
  let server = null;
  let browser = null;
  let context = null;
  let page = null;
  try {
    if (options.routes || options.staticDir || options.server !== false) {
      server = await startEphemeralPreviewServer(options.serverOptions || { routes: options.routes, staticDir: options.staticDir });
    }
    const vp = VIEWPORTS[options.viewport || 'desktop'] || VIEWPORTS.desktop;
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox']
    });
    context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.deviceScaleFactor,
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      userAgent: vp.userAgent,
      ...options.contextOptions
    });
    page = await context.newPage();
    const defaultTimeout = options.timeout || 30000;
    page.setDefaultTimeout(defaultTimeout);
    page.setDefaultNavigationTimeout(defaultTimeout);

    let cdpSession = null;
    if (options.cdp) {
      cdpSession = await context.newCDPSession(page);
      await Promise.all([
        cdpSession.send('Animation.enable').catch(() => {}),
        cdpSession.send('DOM.enable').catch(() => {}),
        cdpSession.send('CSS.enable').catch(() => {}),
        cdpSession.send('Performance.enable').catch(() => {})
      ]);
    }

    return await testFn({
      page,
      context,
      browser,
      viewport: vp,
      server,
      cdpSession,
      url: (p) => server ? server.getUrl(p) : p
    });
  } finally {
    if (page) try { await page.close(); } catch(e) {}
    if (context) try { await context.close(); } catch(e) {}
    if (browser) try { await browser.close(); } catch(e) {}
    if (server) try { await server.close(); } catch(e) {}
  }
}

// ============================================================================
// 4. Mathematical & Physics Verification Oracles
// ============================================================================

/**
 * Centripetal Catmull-Rom Spline (alpha = 0.5) Reference Oracle
 */
function centripetalCatmullRom(p0, p1, p2, p3, t, alpha = 0.5) {
  function getT(tPrev, pA, pB) {
    const d = Math.hypot(pB[0] - pA[0], pB[1] - pA[1], pB[2] - pA[2]);
    return tPrev + Math.pow(Math.max(d, 1e-6), alpha);
  }

  const t0 = 0;
  const t1 = getT(t0, p0, p1);
  const t2 = getT(t1, p1, p2);
  const t3 = getT(t2, p2, p3);

  const tTarget = t1 + t * (t2 - t1);

  function evalInterp(tCurr, tA, tB, ptA, ptB) {
    const factor = (tCurr - tA) / (tB - tA);
    return [
      ptA[0] + factor * (ptB[0] - ptA[0]),
      ptA[1] + factor * (ptB[1] - ptA[1]),
      ptA[2] + factor * (ptB[2] - ptA[2])
    ];
  }

  const a1 = evalInterp(tTarget, t0, t1, p0, p1);
  const a2 = evalInterp(tTarget, t1, t2, p1, p2);
  const a3 = evalInterp(tTarget, t2, t3, p2, p3);

  const b1 = evalInterp(tTarget, t0, t2, a1, a2);
  const b2 = evalInterp(tTarget, t1, t3, a2, a3);

  return evalInterp(tTarget, t1, t2, b1, b2);
}

/**
 * Quaternion Slerp Reference Oracle
 */
function slerpQuat(qA, qB, t) {
  let dot = qA[0] * qB[0] + qA[1] * qB[1] + qA[2] * qB[2] + qA[3] * qB[3];
  let target = [...qB];
  if (dot < 0) {
    dot = -dot;
    target = [-qB[0], -qB[1], -qB[2], -qB[3]];
  }
  if (dot > 0.9995) {
    const res = [
      qA[0] + t * (target[0] - qA[0]),
      qA[1] + t * (target[1] - qA[1]),
      qA[2] + t * (target[2] - qA[2]),
      qA[3] + t * (target[3] - qA[3])
    ];
    const len = Math.hypot(...res);
    return res.map(v => v / len);
  }
  const theta = Math.acos(Math.min(1, Math.max(-1, dot)));
  const sinTheta = Math.sin(theta);
  const w1 = Math.sin((1 - t) * theta) / sinTheta;
  const w2 = Math.sin(t * theta) / sinTheta;
  return [
    w1 * qA[0] + w2 * target[0],
    w1 * qA[1] + w2 * target[1],
    w1 * qA[2] + w2 * target[2],
    w1 * qA[3] + w2 * target[3]
  ];
}

/**
 * Computes exact 2D AABB Overlap Area (0px² verification)
 */
function computeAabbOverlapArea(boxA, boxB) {
  const leftA = boxA.x !== undefined ? boxA.x : boxA.left;
  const topA = boxA.y !== undefined ? boxA.y : boxA.top;
  const rightA = boxA.right !== undefined ? boxA.right : (leftA + boxA.width);
  const bottomA = boxA.bottom !== undefined ? boxA.bottom : (topA + boxA.height);

  const leftB = boxB.x !== undefined ? boxB.x : boxB.left;
  const topB = boxB.y !== undefined ? boxB.y : boxB.top;
  const rightB = boxB.right !== undefined ? boxB.right : (leftB + boxB.width);
  const bottomB = boxB.bottom !== undefined ? boxB.bottom : (topB + boxB.height);

  const xOverlap = Math.max(0, Math.min(rightA, rightB) - Math.max(leftA, leftB));
  const yOverlap = Math.max(0, Math.min(bottomA, bottomB) - Math.max(topA, topB));
  return xOverlap * yOverlap;
}

/**
 * Mathematical VRAM Calculations
 */
const VRAM_MATH = {
  MIPMAP_FACTOR: 1.3333,
  calcTextureVramBytes(width, height, bytesPerPixel = 1.0, withMipmaps = true) {
    const factor = withMipmaps ? 1.3333 : 1.0;
    return Math.round(width * height * bytesPerPixel * factor);
  },
  calcGeometryVramBytes(vertexCount, bytesPerVertex = 14, triangleCount = 0, indexBytes = 2) {
    const vbo = vertexCount * bytesPerVertex;
    const ibo = triangleCount * 3 * indexBytes;
    return vbo + ibo;
  },
  MAX_DISK_BYTES: 3 * 1024 * 1024, // 3,145,728 B (<3MB)
  MAX_VRAM_BYTES: 4 * 1024 * 1024, // 4,194,304 B (<4MB)
  WEBKIT_CEILING_BYTES: 384 * 1024 * 1024 // 402,653,184 B (<=384MB)
};

// ============================================================================
// 5. Universal Modular Resolver for all 17 Features
// ============================================================================

const MODULES = {
  // R1: CDP
  trackerSanitizer: require('../../src/cdp/tracker-sanitizer'),
  runtimeHookInjector: require('../../src/cdp/runtime-hook-injector'),
  semanticSkeletonNormalizer: require('../../src/cdp/semantic-skeleton-normalizer'),
  kineticTimelineInterceptor: require('../../src/cdp/kinetic-timeline-interceptor'),

  // R2: Kinetic
  trajectorySolver: require('../../src/kinetic/trajectory-solver'),
  opticalAnchorTracker: require('../../src/kinetic/optical-anchor-tracker'),
  dynamicAnchorCoordinator: require('../../src/kinetic/dynamic-anchor-coordinator'),
  adaptiveConstraints: require('../../src/kinetic/adaptive-constraints'),

  // R3: 3D Assets
  textureCompressor: require('../../src/assets3d/texture-compressor'),
  meshQuantizer: require('../../src/assets3d/mesh-quantizer'),
  vramAuditor: require('../../src/assets3d/vram-auditor'),
  gltfOptimizerPipeline: require('../../src/assets3d/gltf-optimizer-pipeline'),

  // R4: Compiler
  kineticGrammarSchema: require('../../src/compiler/kinetic-grammar-schema'),
  edgeStaticCompiler: require('../../src/compiler/edge-static-compiler'),
  nextjsRscCompiler: require('../../src/compiler/nextjs-rsc-compiler'),
  antiSlopTransformer: require('../../src/compiler/anti-slop-transformer'),

  // Gates & QA
  deepScrutinyGate: require('../../src/qa/deep-scrutiny-gate'),
  kineticTelemetryExtractor: require('../../src/qa/kinetic-telemetry-extractor'),
  antiSlopGate: require('../../src/qa/anti-slop-gate')
};

function createValidCompositionSpec(overrides = {}) {
  return {
    schemaVersion: '2.0.0',
    brandSpec: {
      brandName: 'Aura Kinetic',
      tagline: 'Dimensional Precision',
      theme: {
        bgBase: '#0b0c10',
        accent: '#66fcf1',
        textPrimary: '#ffffff',
        textSecondary: '#c5c6c7',
        surface: '#1f2833',
        fontFamily: 'Inter, sans-serif'
      },
      meta: {
        title: 'Aura Kinetic | Dimensional Audio System',
        description: 'Next-generation acoustic engineering rendered in real-time kinetic 3D',
        canonicalUrl: 'https://aurakinetic.example.com'
      }
    },
    viewport: {
      width: 1440,
      height: 900,
      dpr: 1
    },
    assets: [
      {
        modelPath: 'assets/models/product-hero.glb',
        diskSizeBytes: 1850000,
        vramFootprintBytes: 3200000,
        geometryBytes: 850000,
        textureBytes: 1000000,
        textureCompression: 'KTX2_ASTC',
        meshQuantization: true,
        meshoptCompression: true,
        isWebKitCertified: true
      }
    ],
    stages: [
      {
        id: 'stage-hero',
        type: 'HeroCinematicStage',
        title: 'Hero Cinematic Experience',
        cssScope: {
          rootSelector: '.kinetic-stage',
          boundarySelector: '[data-kinetic-slot]',
          allowPiercing: false
        },
        kineticConfig: {
          cameraTrajectory: [
            { scrollProgress: 0, position: [0, 0, 5], target: [0, 0, 0] },
            { scrollProgress: 1, position: [2, 1, 3], target: [0, 0, 0] }
          ],
          orbitFov: 45,
          pinDuration: 1.5
        },
        slots: [
          {
            slotId: 'HERO_TITLE',
            slotType: 'heading',
            targetSelector: '[data-kinetic-slot="HERO_TITLE"]',
            characterBudget: { target: 35, tolerance: 0.15 },
            content: 'Sculpted Acoustics in Motion'
          },
          {
            slotId: 'HERO_SUBTITLE',
            slotType: 'text',
            targetSelector: '[data-kinetic-slot="HERO_SUBTITLE"]',
            characterBudget: { target: 60, tolerance: 0.15 },
            content: 'Zero resonance enclosure with aerospace grade titanium finish.'
          }
        ],
        opticalAnchors: [
          {
            id: 'anchor-diaphragm',
            worldPoint: [0.2, 0.4, 0.1],
            normal: [0, 0, 1],
            title: 'Titanium Diaphragm',
            description: 'Ultra-thin 40mm transducer with zero breakup distortion',
            safeArea: { xMin: 0.05, xMax: 0.95, yMin: 0.05, yMax: 0.95 }
          }
        ]
      }
    ],
    ...overrides
  };
}

module.exports = {
  VIEWPORTS,
  EphemeralPreviewServer,
  startEphemeralPreviewServer,
  withTestContext,
  centripetalCatmullRom,
  slerpQuat,
  computeAabbOverlapArea,
  VRAM_MATH,
  MODULES,
  createValidCompositionSpec
};
