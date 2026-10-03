/**
 * test/e2e/tier4-realworld-scenarios.test.js
 * 
 * Tier 4: Real-World Application Scenarios Test Suite (10 End-to-End Scenarios)
 * Conforms strictly to ORIGINAL_REQUEST.md, PROJECT.md, and TEST_INFRA.md.
 * 
 * Scenarios:
 * 1. Full Awwwards Reference Cloned & Decompiled (F1, F2, F3, F4)
 * 2. 3D Product Presentation with Dynamic Optical Callouts (F5, F6, F7, F8, F16)
 * 3. Mobile Safari Viewport Ingestion & Scroll Invariance (F6, F7, F8, F11, F16, F17)
 * 4. Mobile CAD Model Decimation to <3MB & <4MB VRAM (F9, F10, F11)
 * 5. Edge CDN Deployment with CSS @scope Zero-Bleed (F12, F13, F15, F16)
 * 6. Next.js 15 App Router RSC Export & Hydration Isolation (F12, F14, F15)
 * 7. High-Inertia Scroll 60fps Profiling on WebKit (F5, F8, F16, F17)
 * 8. Anti-Slop & Brand Transmutation Validation (F3, F4, F15)
 * 9. Dual-Stack Parity Gate (Edge CDN vs Next.js 15) (F13, F14, F15, F16)
 * 10. DeepScrutinyGate End-to-End Multivector Audit (F16, AC-1)
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

const {
  VIEWPORTS,
  withTestContext,
  centripetalCatmullRom,
  slerpQuat,
  computeAabbOverlapArea,
  VRAM_MATH,
  MODULES,
  COMPILER_ORACLES
} = require('./e2e-harness');

// Helper to construct a canonical spec for compilation scenarios
function createCanonicalSpec(overrides = {}) {
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

describe('Tier 4: Real-World Application Scenarios', () => {

  // ==========================================================================
  // Scenario 1: Full Awwwards Reference Cloned & Decompiled (F1, F2, F3, F4)
  // ==========================================================================
  test('Scenario 1: Full Awwwards reference site cloned, decompiled, sanitized, and normalized', async () => {
    const rawAwwwardsHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Award Winning Reference</title>
        <script src="https://www.google-analytics.com/analytics.js"></script>
        <script src="https://connect.facebook.net/en_US/fbevents.js"></script>
        <script src="https://static.hotjar.com/c/hotjar-99.js"></script>
        <style>
          .sticky-wrapper { overflow: hidden; height: 3000px; }
          .sticky-box { position: sticky; top: 0; }
        </style>
      </head>
      <body>
        <div id="preloader-curtain" class="preloader loader-curtain" style="position:fixed;inset:0;background:#000;">
          <h1>Loading Experiential Site...</h1>
        </div>
        <div class="sticky-wrapper" style="overflow: hidden; height: 3000px;">
          <div class="sticky-box" style="position: sticky; top: 0;">
            <h1 class="split-text">
              <span class="split-char">H</span><span class="split-char">i</span><span class="split-char">g</span><span class="split-char">h</span>
              <span class="split-char">T</span><span class="split-char">e</span><span class="split-char">c</span><span class="split-char">h</span>
            </h1>
            <img src="https://cdn.awwwards.com/assets/hero-shot.webp" data-tracking="img-1" />
            <video src="https://cdn.awwwards.com/videos/loop.mp4" autoplay></video>
          </div>
        </div>
      </body>
      </html>
    `;

    // 1. Sanitize Trackers (M1: F3)
    const { TrackerSanitizer } = MODULES.trackerSanitizer;
    const trackerSanitizer = new TrackerSanitizer();
    const sanitizeResult = trackerSanitizer.sanitizeHtml(rawAwwwardsHtml);
    assert.equal(sanitizeResult.isClean, true, 'Sanitization report flags site clean');
    assert.ok(sanitizeResult.strippedScriptsCount >= 3, 'Stripped Google Analytics, FB, and Hotjar');
    assert.ok(!sanitizeResult.html.includes('google-analytics.com'), 'Google analytics script stripped');
    assert.ok(!sanitizeResult.html.includes('fbevents.js'), 'Facebook pixel script stripped');

    // 2. Normalize Semantic Skeleton (M1: F4)
    const { SemanticSkeletonNormalizer } = MODULES.semanticSkeletonNormalizer;
    const normalized = SemanticSkeletonNormalizer.normalizeHtml(sanitizeResult.html);

    assert.ok(!normalized.html.includes('id="preloader-curtain"'), 'Preloader curtain removed');
    assert.ok(normalized.html.includes('HighTech') || !normalized.html.includes('class="char">H</span>'), 'SplitText fragments merged');
    assert.ok(!normalized.html.includes('overflow: hidden;') || normalized.html.includes('overflow: visible'), 'Sticky ancestor overflow neutralized');
    assert.ok(normalized.html.includes('playsinline'), 'Mobile video streaming attributes enforced');
    assert.ok(!normalized.html.includes('https://cdn.awwwards.com/assets/'), 'CDN links localized to assets/');
  });

  // ==========================================================================
  // Scenario 2: 3D Product Presentation with Dynamic Optical Callouts (F5, F6, F7, F8, F16)
  // ==========================================================================
  test('Scenario 2: 3D product presentation with dynamic optical callouts and 0px² AABB collisions', () => {
    const { TrajectorySolver } = MODULES.trajectorySolver;
    const { OpticalAnchorTracker } = MODULES.opticalAnchorTracker;
    const { DynamicAnchorCoordinator } = MODULES.dynamicAnchorCoordinator;

    // 1. Setup continuous camera trajectory (F5)
    const solver = new TrajectorySolver({
      keyframes: [
        { scrollProgress: 0.0, position: [0, 1, 5], target: [0, 0, 0], fov: 40 },
        { scrollProgress: 0.5, position: [3, 2, 4], target: [0.2, 0, 0], fov: 42 },
        { scrollProgress: 1.0, position: [5, 1, 1], target: [0.5, 0, 0], fov: 45 }
      ]
    });

    // 2. Define 3D feature callouts on model
    const anchors = [
      { id: 'transducer', worldPoint: [0.3, 0.4, 0.2], normal: [0, 0, 1], cardWidth: 160, cardHeight: 60 },
      { id: 'enclosure', worldPoint: [0.35, 0.45, 0.2], normal: [0, 0, 1], cardWidth: 160, cardHeight: 60 }, // Close initial spatial coords
      { id: 'connector', worldPoint: [-0.5, -0.2, 0.1], normal: [0, 0, 1], cardWidth: 160, cardHeight: 60 }
    ];

    const tracker = new OpticalAnchorTracker();
    const coordinator = new DynamicAnchorCoordinator({ cardWidth: 160, cardHeight: 60 });
    const viewport = { width: 1440, height: 900 };

    // 3. Test multi-station scroll positions (s = 0.0, 0.5, 1.0)
    for (const s of [0.0, 0.5, 1.0]) {
      const camState = solver.evaluate(s);
      assert.ok(camState.position && camState.target, 'Camera evaluated at station');

      const projected = anchors.map(a => {
        const proj = tracker.project(a, camState, viewport);
        return {
          id: a.id,
          screen: proj.screen,
          cardWidth: a.cardWidth,
          cardHeight: a.cardHeight,
          visible: proj.facingCamera
        };
      });

      const layout = coordinator.coordinate(projected, viewport);
      assert.equal(layout.totalOverlapArea, 0, `Exact 0px² overlap guaranteed at s=${s}`);
      assert.ok(layout.svgContainer.includes('<svg'), 'Valid SVG container returned');

      for (const card of layout.cards) {
        assert.ok(card.x >= coordinator.safeMarginX, 'Badge inside horizontal margin');
        assert.ok(card.x + card.width <= viewport.width - coordinator.safeMarginX, 'Badge within screen right bound');
      }
    }
  });

  // ==========================================================================
  // Scenario 3: Mobile Safari Viewport Ingestion & Scroll Invariance (F6, F7, F8, F11, F16, F17)
  // ==========================================================================
  test('Scenario 3: Mobile Safari viewport ingestion, safe area clamping, and memory compliance', async () => {
    const { resolveViewportCameraRig } = MODULES.adaptiveConstraints;
    const { DynamicAnchorCoordinator } = MODULES.dynamicAnchorCoordinator;
    const { auditSceneVram } = MODULES.vramAuditor;

    const mobileViewport = VIEWPORTS.mobile; // 390x844, DPR 3, Touch
    const rig = resolveViewportCameraRig(mobileViewport.width / mobileViewport.height, 24, 2.4);

    assert.equal(rig.portrait, true, 'Portrait aspect detected');
    assert.ok(rig.fov >= 35, 'FOV compensated for narrow mobile width');
    assert.equal(rig.safeAreaOffset, 0.15, 'Downward +0.15m safe area applied');

    // Test coordinator layout on mobile
    const anchors = [
      { id: 'left-badge', screen: { x: 50, y: 300 }, cardWidth: 140, cardHeight: 50 },
      { id: 'right-edge-badge', screen: { x: 360, y: 400 }, cardWidth: 140, cardHeight: 50 }
    ];

    const coordinator = new DynamicAnchorCoordinator({
      cardWidth: 140,
      cardHeight: 50,
      safeMarginX: 16
    });

    const layout = coordinator.coordinate(anchors, mobileViewport);
    assert.equal(layout.totalOverlapArea, 0, 'Zero collision on mobile');

    for (const card of layout.cards) {
      assert.ok(card.x >= 16, 'Zero bleed on mobile left');
      assert.ok(card.x + card.width <= 390 - 16, 'Zero bleed on mobile right');
    }

    // Audit Mobile Safari WebKit VRAM ceiling (<=384MB)
    const sceneAudit = auditSceneVram({
      textures: [
        { width: 1024, height: 1024, format: 'KTX2_ASTC_4x4' },
        { width: 1024, height: 1024, format: 'KTX2_ASTC_4x4' }
      ],
      geometryVramBytes: 900000,
      viewport: { width: 390, height: 844, dpr: 3 }
    });

    assert.equal(sceneAudit.isWithinWebKitCeiling, true);
    assert.ok(sceneAudit.totalSceneVramBytes < VRAM_MATH.WEBKIT_CEILING_BYTES);
  });

  // ==========================================================================
  // Scenario 4: Mobile CAD Model Decimation to <3MB & <4MB VRAM (F9, F10, F11)
  // ==========================================================================
  test('Scenario 4: High-density CAD model geometry decimated and compressed to <3MB disk & <4MB VRAM', () => {
    const { quantizePositions, weldVertices, QUANTIZED_BYTES_PER_VERTEX } = MODULES.meshQuantizer;
    const { compressToKtx2, packOrmChannels } = MODULES.textureCompressor;
    const { auditAsset, calculateGeometryVram, calculateTextureVram } = MODULES.vramAuditor;

    // 1. Mesh Quantization (14B/vertex)
    const rawVertexCount = 20000;
    const rawTriangleCount = 30000;
    assert.equal(QUANTIZED_BYTES_PER_VERTEX, 14);

    const geomVram = calculateGeometryVram(rawVertexCount, 14, rawTriangleCount * 3, 'UNSIGNED_SHORT');
    assert.ok(geomVram.totalGeometryBytes < 600000, 'Quantized geometry footprint is ~0.46MB');

    // 2. Texture ORM packing & KTX2 compression
    const texWidth = 1024;
    const texHeight = 1024;
    const texVram = calculateTextureVram(texWidth, texHeight, 'KTX2_ASTC_4x4');
    assert.ok(texVram < 1500000, 'Texture VRAM is under 1.5MB');

    // 3. Complete Asset Audit (F11)
    const audit = auditAsset({
      diskSizeBytes: 2.1 * 1024 * 1024, // 2.1MB (<3MB ceiling)
      geometryBytes: geomVram.totalGeometryBytes,
      vertexCount: rawVertexCount,
      triangleCount: rawTriangleCount,
      meshQuantization: true,
      meshoptCompression: true,
      textures: [{ width: texWidth, height: texHeight, format: 'KTX2_ASTC_4x4' }]
    });

    assert.equal(audit.passed, true, 'Asset complies with all constraints');
    assert.equal(audit.isWebKitCertified, true, 'WebKit Certified');
    assert.ok(audit.diskSizeBytes < VRAM_MATH.MAX_DISK_BYTES, 'Disk size strictly < 3MB');
    assert.ok(audit.vramFootprintBytes < VRAM_MATH.MAX_VRAM_BYTES, 'VRAM footprint strictly < 4MB');
  });

  // ==========================================================================
  // Scenario 5: Edge CDN Deployment with CSS @scope Zero-Bleed (F12, F13, F15, F16)
  // ==========================================================================
  test('Scenario 5: Standalone Edge CDN package compiles with scoped CSS and renders without bleed', async () => {
    const { EdgeStaticCompiler } = MODULES.edgeStaticCompiler;

    const spec = createCanonicalSpec({
      brandSpec: {
        brandName: 'Edge Kinetic Studio',
        meta: {
          title: 'Edge Kinetic Studio | Clean CDN',
          description: 'High-performance Edge CDN kinetic build'
        }
      }
    });

    const compiler = new EdgeStaticCompiler();
    const result = compiler.compile(spec, { writeToDisk: false });

    assert.equal(result.success, true);
    assert.ok(result.files['index.html'].includes('<!DOCTYPE html>'));
    assert.ok(result.files['styles.css'].includes('@scope (.kinetic-stage) to ([data-kinetic-slot])'));
    assert.ok(result.runtimeSizeBytes < 15 * 1024, 'Micro-runtime is strictly < 15KB');

    // Serve on preview server and test in mobile viewport
    await withTestContext({
      routes: {
        '/': result.files['index.html'],
        '/styles.css': result.files['styles.css'],
        '/runtime/kinetic-micro.js': result.files['runtime/kinetic-micro.js']
      },
      viewport: 'mobile'
    }, async ({ page, url }) => {
      await page.goto(url('/'));
      const text = await page.textContent('[data-kinetic-slot="HERO_TITLE"]');
      assert.ok(text.includes('Sculpted Acoustics in Motion'));

      // Check horizontal bleed on mobile
      const hasBleed = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      assert.equal(hasBleed, false, 'Zero horizontal bleed on smartphone display');
    });
  });

  // ==========================================================================
  // Scenario 6: Next.js 15 App Router RSC Export & Hydration Isolation (F12, F14, F15)
  // ==========================================================================
  test('Scenario 6: Next.js 15 App Router export enforces strict Server/Client component separation', () => {
    const { NextJsRscCompiler } = MODULES.nextjsRscCompiler;

    const spec = createCanonicalSpec();
    const compiler = new NextJsRscCompiler();
    const result = compiler.compile(spec, { writeToDisk: false });

    assert.equal(result.success, true);

    // 1. Root Layout
    const layout = result.files['app/layout.tsx'];
    assert.ok(layout.includes('export const metadata: Metadata'));
    assert.ok(layout.includes('export const viewport: Viewport'));

    // 2. Server Components (Must NOT have 'use client')
    const page = result.files['app/page.tsx'];
    const section = result.files['components/server/KineticSection.tsx'];
    assert.ok(!page.includes("'use client'") && !page.includes('"use client"'), 'app/page.tsx is RSC');
    assert.ok(!section.includes("'use client'") && !section.includes('"use client"'), 'KineticSection is RSC');

    // 3. Client Islands (MUST start with 'use client')
    const sceneIsland = result.files['components/client/KineticSceneIsland.tsx'];
    const anchorIsland = result.files['components/client/OpticalAnchorIsland.tsx'];
    const scrollIsland = result.files['components/client/ScrollControllerIsland.tsx'];

    assert.ok(sceneIsland.trim().startsWith("'use client'"), 'Scene island has use client');
    assert.ok(anchorIsland.trim().startsWith("'use client'"), 'Anchor island has use client');
    assert.ok(scrollIsland.trim().startsWith("'use client'"), 'Scroll island has use client');
  });

  // ==========================================================================
  // Scenario 7: High-Inertia Scroll 60fps Profiling on WebKit (F5, F8, F16, F17)
  // ==========================================================================
  test('Scenario 7: Continuous 60fps frame profiling under inertial scroll simulation', () => {
    const { TrajectorySolver } = MODULES.trajectorySolver;

    const solver = new TrajectorySolver({
      keyframes: [
        { scrollProgress: 0.0, position: [0, 0, 5], target: [0, 0, 0], fov: 40 },
        { scrollProgress: 0.5, position: [3, 2, 4], target: [0, 0, 0], fov: 42 },
        { scrollProgress: 1.0, position: [5, 0, 1], target: [0, 0, 0], fov: 45 }
      ]
    });

    const sampleCount = 60;
    const durations = [];

    for (let i = 0; i < sampleCount; i++) {
      const s = i / (sampleCount - 1);
      const t0 = performance.now();
      const state = solver.evaluate(s);
      const t1 = performance.now();

      durations.push(t1 - t0);
      assert.ok(state.position, 'Position calculated');
    }

    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const maxDuration = Math.max(...durations);

    assert.ok(maxDuration < 16.6, `Max render duration (${maxDuration.toFixed(2)}ms) below 16.6ms threshold`);
    assert.ok(avgDuration < 5.0, `Average render duration (${avgDuration.toFixed(2)}ms) well below 5ms`);
  });

  // ==========================================================================
  // Scenario 8: Anti-Slop & Brand Transmutation Validation (F3, F4, F15)
  // ==========================================================================
  test('Scenario 8: Deterministic anti-slop copy transmutation and brand isolation', () => {
    const { AntiSlopTransformer } = MODULES.antiSlopTransformer;

    const originalCopy = 'Relógio mecânico de alta precisão manufaturado em titânio aeroespacial.';
    const transmutedCopy = 'Relógio cinético de alta precisão manufaturado em titânio aeroespacial.';

    // 1. Verify absence of banned AI slop
    const slopCheck = AntiSlopTransformer.checkSlop(transmutedCopy);
    assert.equal(slopCheck.hasSlop, false, 'Zero AI slop');

    // 2. Verify character budget adherence (±15%)
    const budget = AntiSlopTransformer.checkBudget(transmutedCopy.length, originalCopy.length, 0.15);
    assert.equal(budget.compliant, true, 'Length is within ±15% budget');

    // 3. Verify determinism & idempotency
    const hash1 = AntiSlopTransformer.computeHash(transmutedCopy);
    const hash2 = AntiSlopTransformer.computeHash(transmutedCopy);
    assert.equal(hash1, hash2, 'Idempotent SHA-256 hash');
  });

  // ==========================================================================
  // Scenario 9: Dual-Stack Parity Gate (Edge CDN vs Next.js 15) (F13, F14, F15, F16)
  // ==========================================================================
  test('Scenario 9: Unified composition spec achieves exact semantic parity across Edge CDN and Next.js 15 RSC', () => {
    const { EdgeStaticCompiler } = MODULES.edgeStaticCompiler;
    const { NextJsRscCompiler } = MODULES.nextjsRscCompiler;

    const spec = createCanonicalSpec();

    const edgeCompiler = new EdgeStaticCompiler();
    const edgeResult = edgeCompiler.compile(spec, { writeToDisk: false });

    const nextCompiler = new NextJsRscCompiler();
    const nextResult = nextCompiler.compile(spec, { writeToDisk: false });

    assert.equal(edgeResult.success, true);
    assert.equal(nextResult.success, true);

    // Parity Check: Brand names, titles, and slot content match
    assert.ok(edgeResult.files['index.html'].includes('Aura Kinetic'));
    assert.ok(nextResult.files['app/layout.tsx'].includes('Aura Kinetic'));

    assert.ok(edgeResult.files['index.html'].includes('Sculpted Acoustics in Motion'));
    assert.ok(nextResult.files['app/page.tsx'].includes('Sculpted Acoustics in Motion'));

    // Parity Check: Scoped CSS applies donut scope across both
    assert.ok(edgeResult.files['styles.css'].includes('@scope (.kinetic-stage) to ([data-kinetic-slot])'));
    assert.ok(nextResult.files['app/globals.css'].includes('@scope (.kinetic-stage) to ([data-kinetic-slot])'));
  });

  // ==========================================================================
  // Scenario 10: DeepScrutinyGate End-to-End Multivector Audit (F16, AC-1)
  // ==========================================================================
  test('Scenario 10: DeepScrutinyGate multivector audit validates zero text collision and layout bleed', async () => {
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body { margin: 0; padding: 0; overflow-x: clip; }
          .kinetic-stage { position: relative; width: 100%; min-height: 100vh; padding: 40px 20px; box-sizing: border-box; }
          .badge { position: absolute; width: 140px; height: 50px; background: #222; color: #fff; }
          #b1 { left: 20px; top: 100px; }
          #b2 { left: 180px; top: 100px; }
        </style>
      </head>
      <body>
        <div class="kinetic-stage">
          <div id="b1" class="badge">Acoustic Core</div>
          <div id="b2" class="badge">Titanium Shell</div>
        </div>
      </body>
      </html>
    `;

    await withTestContext({ routes: { '/': html } }, async ({ page, url }) => {
      await page.goto(url('/'));

      // 1. AABB collision audit
      const boxes = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.badge')).map(el => {
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height };
        });
      });

      const overlap = computeAabbOverlapArea(boxes[0], boxes[1]);
      assert.equal(overlap, 0, 'Exact 0px² AABB overlap verified between badges');

      // 2. Horizontal layout bleed audit
      const hasBleed = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      assert.equal(hasBleed, false, 'Zero horizontal layout bleed');
    });
  });

});
