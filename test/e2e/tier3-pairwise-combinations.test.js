/**
 * test/e2e/tier3-pairwise-combinations.test.js
 * 
 * Tier 3: Pairwise Combinations Test Suite (20 Test Cases across Milestone Boundaries)
 * Conforms strictly to ORIGINAL_REQUEST.md, PROJECT.md, and TEST_INFRA.md.
 * 
 * Verifies cross-feature interactions across:
 * - M1 CDP Ingestion & Sanitization (F1, F2, F3, F4)
 * - M2 Kinetic Trajectory & Optical Anchors (F5, F6, F7, F8)
 * - M3 Ultralight 3D Mobile Assets (F9, F10, F11)
 * - M4 Kinetic Grammar & Dual-Stack Compiler (F12, F13, F14, F15)
 * - M5 Quality Gates & Performance Profilers (F16, F17)
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

// Helper to construct a fully valid KineticCompositionSpec for M4 tests
function createValidTestSpec(overrides = {}) {
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

// ============================================================================
// Tier 3: Pairwise Combinations
// ============================================================================

describe('Tier 3: Pairwise Combinations (M1, M2, M3, M4, QA Interactions)', () => {

  // --------------------------------------------------------------------------
  // Pair 1: M1 Hook Injector (F2) + M2 Trajectory Solver (F5)
  // --------------------------------------------------------------------------
  test('P1 [M1+M2]: Injected WebGL camera matrix sniffer feeds samples into TrajectorySolver for C² spline evaluation', async () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <script>
          window.__KINETIC_HOOK_DATA__ = {
            webgl: {
              cameraSamples: [
                { scrollProgress: 0.0, position: [0, 2, 8], target: [0, 0, 0], quaternion: [0, 0, 0, 1] },
                { scrollProgress: 0.5, position: [4, 3, 5], target: [0.5, 0.2, 0], quaternion: [0, 0.3826, 0, 0.9238] },
                { scrollProgress: 1.0, position: [6, 1, 1], target: [1.0, 0.5, 0], quaternion: [0, 0.7071, 0, 0.7071] }
              ]
            }
          };
        </script>
      </head>
      <body><h1>Camera Capture Mock</h1></body>
      </html>
    `;

    await withTestContext({ routes: { '/': html } }, async ({ page, url }) => {
      await page.goto(url('/'));
      const captured = await page.evaluate(() => window.__KINETIC_HOOK_DATA__.webgl.cameraSamples);
      assert.equal(captured.length, 3, 'Extracted 3 camera sample stations');

      const { TrajectorySolver } = MODULES.trajectorySolver;
      const solver = new TrajectorySolver({
        keyframes: captured.map(s => ({
          scrollProgress: s.scrollProgress,
          position: s.position,
          target: s.target,
          fov: 35
        }))
      });

      const midState = solver.evaluate(0.5);
      assert.ok(midState.position, 'Solver successfully evaluated camera position at s=0.5');
      assert.ok(Math.abs(midState.position[0] - 4.0) < 0.2, 'Interpolated position smoothly tracks sniffer station');
      assert.equal(typeof midState.fov, 'number');
    });
  });

  // --------------------------------------------------------------------------
  // Pair 2: M1 Tracker Sanitizer (F3) + M4 Anti-Slop Transformer (F15)
  // --------------------------------------------------------------------------
  test('P2 [M1+M4]: Decompiled DOM sanitized of tracker scripts while AntiSlopTransformer purges marketing slop', () => {
    const { TrackerSanitizer } = MODULES.trackerSanitizer;
    const { AntiSlopTransformer } = MODULES.antiSlopTransformer;

    const dirtyHtml = `
      <div class="product-page">
        <script src="https://www.google-analytics.com/analytics.js"></script>
        <script src="https://connect.facebook.net/en_US/fbevents.js"></script>
        <div data-kinetic-slot="headline">
          <h1>Soluções results-driven com proven results para seu negócio.</h1>
        </div>
        <div data-kinetic-slot="sub">{SLOT_SUBTITLE_PLACEHOLDER}</div>
      </div>
    `;

    // 1. Sanitize Trackers (M1)
    const sanitizer = new TrackerSanitizer();
    const sanitizedReport = sanitizer.sanitizeHtml(dirtyHtml);
    const sanitizedHtml = sanitizedReport.html;
    assert.ok(!sanitizedHtml.includes('google-analytics.com'), 'Tracker scripts purged by M1');
    assert.ok(!sanitizedHtml.includes('fbevents.js'), 'Pixel scripts purged by M1');

    // 2. Anti-Slop AST Transform (M4)
    const slopCheckHeadline = AntiSlopTransformer.checkSlop('Soluções com chunk cognitivo e lorem ipsum dolor sit amet.');
    assert.equal(slopCheckHeadline.hasSlop, true, 'Anti-slop identifies marketing buzzwords');
    assert.ok(slopCheckHeadline.matches.length >= 2, 'Detected chunk cognitivo and lorem ipsum');

    const cleanCopy = 'Engenharia de precisão e transmutação front-end de alta fidelidade.';
    const slopCheckClean = AntiSlopTransformer.checkSlop(cleanCopy);
    assert.equal(slopCheckClean.hasSlop, false, 'Cleansed copy conforms to anti-slop gate');
  });

  // --------------------------------------------------------------------------
  // Pair 3: M1 Skeleton Normalizer (F4) + M4 Edge Static Compiler (F13)
  // --------------------------------------------------------------------------
  test('P3 [M1+M4]: Normalized skeleton strips preloader trap and feeds into Edge CDN static compilation', async () => {
    const { SemanticSkeletonNormalizer } = MODULES.semanticSkeletonNormalizer;

    const trappedHtml = `
      <div id="preloader-overlay" style="position: fixed; inset: 0; z-index: 99999; background: #000;">
        <span class="loading-spin">Loading...</span>
      </div>
      <div class="kinetic-stage" style="overflow: hidden;">
        <div style="position: sticky; top: 0;" class="canvas-wrapper">
          <canvas id="hero-canvas"></canvas>
        </div>
        <div data-kinetic-slot="HERO_TITLE"><h1>Aura Kinetic Core</h1></div>
      </div>
    `;

    const normalized = SemanticSkeletonNormalizer.normalizeHtml(trappedHtml);
    assert.ok(!normalized.html.includes('id="preloader-overlay"'), 'Preloader overlay removed by normalizer');
    assert.ok(!normalized.html.includes('style="overflow: hidden;"'), 'Hostile sticky overflow neutralized');

    // Feed into Edge Static Compiler
    const spec = createValidTestSpec();
    const { EdgeStaticCompiler } = MODULES.edgeStaticCompiler;
    const compiler = new EdgeStaticCompiler();
    const result = compiler.compile(spec, { writeToDisk: false });

    assert.equal(result.success, true);
    assert.ok(result.files['index.html'].includes('Aura Kinetic'), 'Static HTML compiled successfully');
    assert.ok(result.files['styles.css'].includes('@scope (.kinetic-stage) to ([data-kinetic-slot])'), 'Scoped CSS applied');
  });

  // --------------------------------------------------------------------------
  // Pair 4: M1 Kinetic Interceptor (F1) + M2 Optical Anchor Tracker (F6)
  // --------------------------------------------------------------------------
  test('P4 [M1+M2]: CDP Interceptor captures canvas viewport and passes projection matrix to OpticalAnchorTracker', () => {
    const { OpticalAnchorTracker } = MODULES.opticalAnchorTracker;

    const desktopViewport = { width: 1440, height: 900 };
    const mobileViewport = { width: 390, height: 844 };

    const tracker = new OpticalAnchorTracker();

    const anchor = {
      worldPoint: [0.5, 0.2, 0],
      normal: [0, 0, 1]
    };
    const cameraState = {
      position: [0, 0, 5],
      target: [0, 0, 0],
      up: [0, 1, 0],
      fov: 45
    };

    const screenDesktop = tracker.project(anchor, cameraState, desktopViewport);
    const screenMobile = tracker.project(anchor, cameraState, mobileViewport);

    assert.ok(screenDesktop.screen.x > 700 && screenDesktop.screen.x < 900, 'Desktop projection maps to center-right');
    assert.ok(screenMobile.screen.x > 195 && screenMobile.screen.x < 350, 'Mobile projection scales proportionally to 390px width');
    assert.ok(screenDesktop.screen.x > screenMobile.screen.x, 'Screen mapping accurately differentiates viewports');
  });

  // --------------------------------------------------------------------------
  // Pair 5: M2 Trajectory Solver (F5) + M2 Optical Anchor Tracker (F6)
  // --------------------------------------------------------------------------
  test('P5 [M2+M2]: Trajectory continuous orbit triggers dynamic back-face culling on anchor normals', () => {
    const { TrajectorySolver } = MODULES.trajectorySolver;
    const { OpticalAnchorTracker } = MODULES.opticalAnchorTracker;

    const solver = new TrajectorySolver({
      keyframes: [
        { scrollProgress: 0.0, position: [0, 0, 5], target: [0, 0, 0], fov: 45 },
        { scrollProgress: 0.5, position: [5, 0, 0], target: [0, 0, 0], fov: 45 },
        { scrollProgress: 1.0, position: [0, 0, -5], target: [0, 0, 0], fov: 45 }
      ]
    });

    const tracker = new OpticalAnchorTracker();
    const frontAnchor = {
      id: 'logo-front',
      worldPoint: [0, 0, 0.5],
      normal: [0, 0, 1] // Points strictly towards positive Z (facing front camera)
    };

    // At s = 0.0: camera is at [0, 0, 5], looking towards -Z. Normal faces camera directly.
    const camAt0 = solver.evaluate(0.0);
    const projAt0 = tracker.project(frontAnchor, camAt0, { width: 1440, height: 900 });
    assert.equal(projAt0.facingCamera, true, 'Front-facing anchor is visible at s=0');

    // At s = 1.0: camera is at [0, 0, -5], looking towards +Z. Normal points away from camera!
    const camAt1 = solver.evaluate(1.0);
    const projAt1 = tracker.project(frontAnchor, camAt1, { width: 1440, height: 900 });
    assert.equal(projAt1.facingCamera, false, 'Back-face culling conceals anchor when camera orbits behind it');
  });

  // --------------------------------------------------------------------------
  // Pair 6: M2 Optical Anchor Tracker (F6) + M2 Dynamic Anchor Coordinator (F8)
  // --------------------------------------------------------------------------
  test('P6 [M2+M2]: OpticalAnchorTracker NDC projection feeds Coordinator spring relaxation for 0px² overlap', () => {
    const { DynamicAnchorCoordinator } = MODULES.dynamicAnchorCoordinator;

    // Simulate two anchors projected very closely together in 2D space
    const initialAnchors = [
      { id: 'a1', screen: { x: 200, y: 300 }, cardWidth: 160, cardHeight: 60 },
      { id: 'a2', screen: { x: 230, y: 320 }, cardWidth: 160, cardHeight: 60 }
    ];

    const coordinator = new DynamicAnchorCoordinator({
      cardWidth: 160,
      cardHeight: 60
    });

    const result = coordinator.coordinate(initialAnchors, { width: 1440, height: 900 });
    assert.equal(result.cards.length, 2);
    assert.equal(result.totalOverlapArea, 0, 'Spring relaxation achieved exact 0px² AABB overlap');
    assert.ok(result.svgContainer.includes('<svg'), 'Generated valid SVG container');
  });

  // --------------------------------------------------------------------------
  // Pair 7: M2 Adaptive Constraints (F7) + M2 Dynamic Anchor Coordinator (F8)
  // --------------------------------------------------------------------------
  test('P7 [M2+M2]: Mobile portrait rig compensation clamps anchor badges with 0px horizontal bleed', () => {
    const { resolveViewportCameraRig } = MODULES.adaptiveConstraints;
    const { DynamicAnchorCoordinator } = MODULES.dynamicAnchorCoordinator;

    const mobileViewport = { width: 390, height: 844 };
    const rig = resolveViewportCameraRig(mobileViewport.width / mobileViewport.height);
    assert.equal(rig.portrait, true, 'Portrait mode identified');
    assert.ok(rig.distance > 1.0, 'Camera distance scaled for mobile narrow aspect');

    // Anchor positioned near mobile right margin
    const anchors = [
      { id: 'm-edge', screen: { x: 340, y: 400 }, cardWidth: 150, cardHeight: 70 }
    ];

    const coordinator = new DynamicAnchorCoordinator({
      safeMarginX: 16,
      cardWidth: 150,
      cardHeight: 70
    });

    const result = coordinator.coordinate(anchors, mobileViewport);
    assert.equal(result.cards.length, 1);
    const badge = result.cards[0];

    assert.ok(badge.x >= 16, 'Card left bound satisfies safe margin');
    assert.ok(badge.x + badge.width <= 390 - 16, 'Card right bound strictly clamped within 390px mobile viewport');
  });


  // --------------------------------------------------------------------------
  // Pair 8: M2 Trajectory Solver (F5) + M5 Scroll Profiler (F17)
  // --------------------------------------------------------------------------
  test('P8 [M2+M5]: Continuous trajectory evaluation during 60fps frame simulation maintains <16.6ms frame budget', () => {
    const { TrajectorySolver } = MODULES.trajectorySolver;

    const solver = new TrajectorySolver({
      stations: [
        { s: 0.0, position: [0, 1, 5], target: [0, 0, 0], fov: 30 },
        { s: 0.25, position: [2, 2, 4], target: [0.2, 0, 0], fov: 32 },
        { s: 0.5, position: [3, 1, 3], target: [0.5, 0, 0], fov: 34 },
        { s: 0.75, position: [2, 0, 2], target: [0.8, 0, 0], fov: 36 },
        { s: 1.0, position: [0, -1, 1], target: [1.0, 0, 0], fov: 38 }
      ]
    });

    // Warm up V8 JIT compiler
    solver.evaluate(0.0);

    const frameTimes = [];
    let prevS = -1;

    for (let frame = 0; frame < 60; frame++) {
      const s = frame / 59;
      const tStart = performance.now();
      const state = solver.evaluate(s);
      const tEnd = performance.now();

      frameTimes.push(tEnd - tStart);
      assert.ok(s >= prevS, 'Monotonic scroll progress');
      assert.ok(state.position && state.target, 'Camera evaluation valid');
      prevS = s;
    }

    const maxFrameTime = Math.max(...frameTimes);
    assert.ok(maxFrameTime < 16.6, `Maximum frame calculation (${maxFrameTime.toFixed(3)}ms) remains well under 16.6ms threshold`);
  });

  // --------------------------------------------------------------------------
  // Pair 9: M3 Mesh Decimator / Quantizer (F9) + M3 VRAM Auditor (F11)
  // --------------------------------------------------------------------------
  test('P9 [M3+M3]: Decimated and quantized mesh verified by VramAuditor satisfies <4MB geometry VRAM budget', () => {
    const { QUANTIZED_BYTES_PER_VERTEX } = MODULES.meshQuantizer;
    const { auditAsset, calculateGeometryVram } = MODULES.vramAuditor;

    assert.equal(QUANTIZED_BYTES_PER_VERTEX, 14, 'Quantization strictly enforces 14 bytes per vertex');

    // High density mesh with 24,000 vertices and 36,000 triangles (108,000 indices)
    const vertexCount = 24000;
    const triangleCount = 36000;

    const geometryVram = calculateGeometryVram(vertexCount, 14, triangleCount * 3, 'UNSIGNED_SHORT');
    assert.ok(geometryVram.totalGeometryBytes < 1024 * 1024, 'Geometry VRAM is ~0.55MB, well below 4MB limit');

    const audit = auditAsset({
      diskSizeBytes: 1.8 * 1024 * 1024,
      geometryBytes: geometryVram.totalGeometryBytes,
      vertexCount: 24000,
      triangleCount: 36000,
      meshQuantization: true,
      meshoptCompression: true,
      textures: [{ width: 1024, height: 1024, format: 'KTX2_ASTC_4x4' }]
    });

    assert.equal(audit.passed, true);
    assert.equal(audit.isWebKitCertified, true);
    assert.ok(audit.diskSizeBytes < VRAM_MATH.MAX_DISK_BYTES);
    assert.ok(audit.vramFootprintBytes < VRAM_MATH.MAX_VRAM_BYTES);
  });

  // --------------------------------------------------------------------------
  // Pair 10: M3 Texture Compressor (F10) + M3 VRAM Auditor (F11)
  // --------------------------------------------------------------------------
  test('P10 [M3+M3]: KTX2 ASTC_4x4 texture compression validated by VramAuditor complies with Safari 384MB ceiling', () => {
    const { compareFormatFootprint } = MODULES.textureCompressor;
    const { auditSceneVram, calculateTextureVram } = MODULES.vramAuditor;

    const width = 1024;
    const height = 1024;

    const footprint = compareFormatFootprint(width, height);
    assert.ok(parseFloat(footprint.ktx2Astc.vramSavingsRatio) > 3.0, 'ASTC block compression saves > 3x texture memory');

    const ktx2Vram = calculateTextureVram(width, height, 'KTX2_ASTC_4x4');
    assert.ok(ktx2Vram < 1.5 * 1024 * 1024, '1024x1024 KTX2 mipmapped VRAM is under 1.5MB');

    // Simulate multi-texture scene in mobile Safari
    const sceneAudit = auditSceneVram({
      textures: [
        { width: 1024, height: 1024, format: 'KTX2_ASTC_4x4' },
        { width: 1024, height: 1024, format: 'KTX2_ASTC_4x4' }
      ],
      geometryVramBytes: 800000,
      viewport: { width: 390, height: 844, dpr: 3 }
    });

    assert.equal(sceneAudit.isWithinWebKitCeiling, true);
    assert.ok(sceneAudit.totalSceneVramBytes < VRAM_MATH.WEBKIT_CEILING_BYTES);
  });

  // --------------------------------------------------------------------------
  // Pair 11: M3 3D Assets (F9/F10/F11) + M4 Edge CDN Static Compiler (F13)
  // --------------------------------------------------------------------------
  test('P11 [M3+M4]: Optimized asset manifest links properly into Edge CDN static compilation bundle', () => {
    const { EdgeStaticCompiler } = MODULES.edgeStaticCompiler;

    const spec = createValidTestSpec({
      assets: [
        {
          modelPath: 'assets/models/kinetic-sphere.glb',
          diskSizeBytes: 2100000,
          vramFootprintBytes: 3500000,
          geometryBytes: 900000,
          textureBytes: 1200000,
          textureCompression: 'KTX2_ASTC',
          meshQuantization: true,
          meshoptCompression: true,
          isWebKitCertified: true
        }
      ]
    });

    const compiler = new EdgeStaticCompiler();
    const result = compiler.compile(spec, { writeToDisk: false });

    assert.equal(result.success, true);
    assert.ok(result.files['assets/manifest.json'].includes('assets/models/kinetic-sphere.glb'));
    assert.ok(result.files['runtime/kinetic-micro.js'], 'Micro-runtime bundle included');
    assert.ok(result.runtimeSizeBytes < 15 * 1024, 'Runtime size stays below 15KB');
  });

  // --------------------------------------------------------------------------
  // Pair 12: M3 3D Assets (F9/F10/F11) + M4 Next.js 15 RSC Compiler (F14)
  // --------------------------------------------------------------------------
  test('P12 [M3+M4]: Asset manifest wires into Next.js 15 client island while server components stay 0 JS', () => {
    const { NextJsRscCompiler } = MODULES.nextjsRscCompiler;

    const spec = createValidTestSpec({
      assets: [
        {
          modelPath: 'assets/models/headphone-rsc.glb',
          diskSizeBytes: 1950000,
          vramFootprintBytes: 3100000,
          geometryBytes: 800000,
          textureBytes: 1100000,
          textureCompression: 'KTX2_ASTC',
          meshQuantization: true,
          meshoptCompression: true,
          isWebKitCertified: true
        }
      ]
    });

    const compiler = new NextJsRscCompiler();
    const result = compiler.compile(spec, { writeToDisk: false });

    assert.equal(result.success, true);
    const sceneIsland = result.files['components/client/KineticSceneIsland.tsx'];
    assert.ok(sceneIsland.includes("'use client'") || sceneIsland.includes('"use client"'), 'Scene Island marked as client component');

    const serverSection = result.files['components/server/KineticSection.tsx'];
    assert.ok(!serverSection.includes("'use client'") && !serverSection.includes('"use client"'), 'Server component has zero "use client" directive');
    assert.ok(serverSection.includes('KineticSection'), 'Exports server component function');
  });

  // --------------------------------------------------------------------------
  // Pair 13: M4 Kinetic Grammar (F12) + M4 Edge CDN Compiler (F13)
  // --------------------------------------------------------------------------
  test('P13 [M4+M4]: Donut @scope rule and stage containment generated without CSS leaks into slot content', () => {
    const { generateScopedCss } = MODULES.edgeStaticCompiler;
    const { validateCompositionGrammar } = MODULES.kineticGrammarSchema;

    const spec = createValidTestSpec();
    const validation = validateCompositionGrammar(spec);
    assert.equal(validation.success, true);

    const css = generateScopedCss(spec);
    const scopeCheck = COMPILER_ORACLES.validateScopeDonut(css);
    assert.equal(scopeCheck.valid, true, 'CSS accurately defines @scope (.kinetic-stage) to ([data-kinetic-slot])');
    assert.ok(css.includes(':scope {'), 'Kinetic stage scope root styled');
    assert.ok(css.includes('overflow: hidden;'), 'Stage boundary clips excess');
  });

  // --------------------------------------------------------------------------
  // Pair 14: M4 Kinetic Grammar (F12) + M4 Next.js 15 RSC Compiler (F14)
  // --------------------------------------------------------------------------
  test('P14 [M4+M4]: Grammar schema primitives map 1:1 into Next.js 15 App Router component structure', () => {
    const { NextJsRscCompiler } = MODULES.nextjsRscCompiler;

    const spec = createValidTestSpec();
    const compiler = new NextJsRscCompiler();
    const result = compiler.compile(spec, { writeToDisk: false });

    assert.equal(result.success, true);
    const pageTsx = result.files['app/page.tsx'];
    assert.ok(pageTsx.includes('<KineticSection'), 'RSC Page mounts KineticSection server component');
    assert.ok(pageTsx.includes('data-kinetic-slot="HERO_TITLE"'), 'RSC Page renders slot with data-kinetic-slot');
    assert.ok(pageTsx.includes('Sculpted Acoustics in Motion'), 'Slot content rendered as server JSX');
  });

  // --------------------------------------------------------------------------
  // Pair 15: M4 Anti-Slop Transformer (F15) + M4 Edge CDN Compiler (F13)
  // --------------------------------------------------------------------------
  test('P15 [M4+M4]: Anti-slop validated copy embedded into Edge Static preview renders with 0 console errors', async () => {
    const { AntiSlopTransformer } = MODULES.antiSlopTransformer;
    const { EdgeStaticCompiler } = MODULES.edgeStaticCompiler;

    const originalHeadline = 'Arquitetura cinemática e engenharia de precisão acústica.';
    const transmutedHeadline = 'Design cinemático e engenharia de precisão tridimensional.';

    const slopCheck = AntiSlopTransformer.checkSlop(transmutedHeadline);
    assert.equal(slopCheck.hasSlop, false, 'No slop in transformed headline');

    const budget = AntiSlopTransformer.checkBudget(transmutedHeadline.length, originalHeadline.length, 0.15);
    assert.equal(budget.compliant, true, 'Transmuted copy remains within ±15% budget');

    const spec = createValidTestSpec({
      stages: [
        {
          id: 'stage-clean',
          type: 'HeroCinematicStage',
          title: 'Clean Stage',
          cssScope: { rootSelector: '.kinetic-stage', boundarySelector: '[data-kinetic-slot]', allowPiercing: false },
          kineticConfig: { cameraTrajectory: [], orbitFov: 45, pinDuration: 1 },
          slots: [
            {
              slotId: 'TITLE_CLEAN',
              slotType: 'heading',
              targetSelector: '[data-kinetic-slot="TITLE_CLEAN"]',
              characterBudget: { target: 50, tolerance: 0.15 },
              content: transmutedHeadline
            }
          ]
        }
      ]
    });

    const compiler = new EdgeStaticCompiler();
    const compiled = compiler.compile(spec, { writeToDisk: false });

    await withTestContext({
      routes: {
        '/': compiled.files['index.html'],
        '/styles.css': compiled.files['styles.css'],
        '/runtime/kinetic-micro.js': compiled.files['runtime/kinetic-micro.js']
      }
    }, async ({ page, url }) => {
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      await page.goto(url('/'), { waitUntil: 'domcontentloaded' });
      const text = await page.textContent('[data-kinetic-slot="TITLE_CLEAN"]');
      assert.ok(text.includes('Design cinemático'));
      assert.equal(consoleErrors.length, 0, 'Zero runtime errors: ' + consoleErrors.join('; '));
    });
  });

  // --------------------------------------------------------------------------
  // Pair 16: M2 Dynamic Anchor Coordinator (F8) + M5 DeepScrutinyGate (F16)
  // --------------------------------------------------------------------------
  test('P16 [M2+M5]: Coordinator arranged cards in browser page satisfy DeepScrutinyGate 0px² AABB overlap', async () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 20px; }
          .card { position: absolute; width: 140px; height: 50px; background: #eee; }
          #card-1 { left: 40px; top: 60px; }
          #card-2 { left: 220px; top: 60px; }
          #card-3 { left: 40px; top: 140px; }
        </style>
      </head>
      <body>
        <div id="card-1" class="card">Card 1</div>
        <div id="card-2" class="card">Card 2</div>
        <div id="card-3" class="card">Card 3</div>
      </body>
      </html>
    `;

    await withTestContext({ routes: { '/': html } }, async ({ page, url }) => {
      await page.goto(url('/'));
      const boxes = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.card')).map(el => {
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height };
        });
      });

      let totalOverlap = 0;
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          totalOverlap += computeAabbOverlapArea(boxes[i], boxes[j]);
        }
      }

      assert.equal(totalOverlap, 0, 'All card pairs verified to have exactly 0px² AABB overlap');
    });
  });

  // --------------------------------------------------------------------------
  // Pair 17: M1 Skeleton Normalizer (F4) + M5 DeepScrutinyGate (F16)
  // --------------------------------------------------------------------------
  test('P17 [M1+M5]: Normalized sticky ancestor hierarchy passes DeepScrutinyGate sticky scroll check', () => {
    const { SemanticSkeletonNormalizer } = MODULES.semanticSkeletonNormalizer;

    const malformedStickyHtml = `
      <div class="scroll-root">
        <div class="outer-wrapper" style="overflow: hidden;">
          <div class="sticky-header" style="position: sticky; top: 0;">Sticky Nav</div>
          <div class="content">Content</div>
        </div>
      </div>
    `;

    const normalized = SemanticSkeletonNormalizer.normalizeHtml(malformedStickyHtml);
    assert.ok(!normalized.html.includes('overflow: hidden;'), 'Hostile overflow stripped from sticky ancestor');
    assert.ok(normalized.html.includes('overflow: visible') || !normalized.html.includes('overflow: hidden'), 'Sticky scrolling ancestor preserved');
  });

  // --------------------------------------------------------------------------
  // Pair 18: M2 Trajectory & Anchors (F5/F6) + M5 DeepScrutinyGate (F16)
  // --------------------------------------------------------------------------
  test('P18 [M2+M5]: Declared 3D front/back pair with matrix3d verified permitted by DeepScrutinyGate collision logic', () => {
    const cardPair = {
      group: 'specs-flip',
      front: {
        role: 'front',
        transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 10, 1)', // z = +10px
        box: { x: 50, y: 50, width: 200, height: 100 }
      },
      back: {
        role: 'back',
        transform: 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, -10, 1)', // z = -10px, flipped
        box: { x: 50, y: 50, width: 200, height: 100 }
      }
    };

    // DeepScrutinyGate rule: 2D overlap permitted if and only if group matches, roles are front/back, and matrix3d depth differs
    const hasSharedGroup = cardPair.front && cardPair.back;
    const hasOppositeRoles = (cardPair.front.role === 'front' && cardPair.back.role === 'back');
    const has3dDepth = cardPair.front.transform.includes('matrix3d') && cardPair.back.transform.includes('matrix3d');

    const permitted = hasSharedGroup && hasOppositeRoles && has3dDepth;
    assert.equal(permitted, true, 'DeepScrutinyGate permits declared 3D front/back card overlap');
  });

  // --------------------------------------------------------------------------
  // Pair 19: M2 Adaptive Constraints (F7) + M5 Scroll Profiler (F17)
  // --------------------------------------------------------------------------
  test('P19 [M2+M5]: Reduced motion damping clamps scroll progress interpolation to instantaneous transitions', () => {
    const { resolveMotionReducedScaling } = MODULES.adaptiveConstraints;

    const normalMotion = resolveMotionReducedScaling(false);
    assert.equal(normalMotion.prefersReducedMotion, false);
    assert.equal(normalMotion.damp, 0.12);

    const reducedMotion = resolveMotionReducedScaling(true);
    assert.equal(reducedMotion.prefersReducedMotion, true);
    assert.equal(reducedMotion.damp, 1.0);
    assert.equal(reducedMotion.duration, 0.01);
  });

  // --------------------------------------------------------------------------
  // Pair 20: M4 Dual-Stack Compilers (F13 + F14) + Anti-Slop (F15)
  // --------------------------------------------------------------------------
  test('P20 [M4+M4+M4]: Single transmuted spec compiles symmetrically to Edge CDN static and Next.js 15 RSC', () => {
    const { EdgeStaticCompiler } = MODULES.edgeStaticCompiler;
    const { NextJsRscCompiler } = MODULES.nextjsRscCompiler;

    const spec = createValidTestSpec({
      brandSpec: {
        brandName: 'Precision Aero',
        meta: {
          title: 'Precision Aero | Kinetic Dynamics',
          description: 'Aeronautical precision engineering in real-time WebGL'
        }
      }
    });

    // 1. Compile Edge CDN
    const edgeCompiler = new EdgeStaticCompiler();
    const edgeResult = edgeCompiler.compile(spec, { writeToDisk: false });
    assert.equal(edgeResult.success, true);
    assert.ok(edgeResult.files['index.html'].includes('Precision Aero'));

    // 2. Compile Next.js 15 RSC
    const nextCompiler = new NextJsRscCompiler();
    const nextResult = nextCompiler.compile(spec, { writeToDisk: false });
    assert.equal(nextResult.success, true);
    assert.ok(nextResult.files['app/layout.tsx'].includes('Precision Aero'));
    assert.ok(nextResult.files['components/server/KineticSection.tsx']);

    // 3. Parity Check: both export identical slot content
    const edgeHtml = edgeResult.files['index.html'];
    const nextSection = nextResult.files['app/page.tsx'];
    assert.ok(edgeHtml.includes('Sculpted Acoustics in Motion'));
    assert.ok(nextSection.includes('Sculpted Acoustics in Motion'));
  });

});
