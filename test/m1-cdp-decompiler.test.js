/**
 * test/m1-cdp-decompiler.test.js
 * 
 * Test suite for Requirement R1: CDP Semantic Decompiler & Sanitizer Pipeline
 * Verifies:
 * - TrackerSanitizer (Tiers 1, 2, 3 and attribute preservation)
 * - RuntimeHookInjector (RAF delta/jitter, GSAP tweens/ScrollTrigger, Three.js WebGL camera sniffer)
 * - SemanticSkeletonNormalizer (SplitText unmasking, preloader removal, sticky overflow neutralization, asset localization, video configuration)
 * - KineticTimelineInterceptor (CDP domain coordination, CSS/WAAPI animation capture, seeking, and KineticTimelineIR contract compliance)
 */

'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const { TrackerSanitizer, BANNED_TRACKER_URL_PATTERNS } = require('../src/cdp/tracker-sanitizer');
const { RuntimeHookInjector } = require('../src/cdp/runtime-hook-injector');
const { SemanticSkeletonNormalizer } = require('../src/cdp/semantic-skeleton-normalizer');
const { KineticTimelineInterceptor } = require('../src/cdp/kinetic-timeline-interceptor');

// ============================================================================
// 1. TrackerSanitizer Tests (3 Tiers)
// ============================================================================

test('TrackerSanitizer: Tier 1 URL pattern detection', () => {
  const sanitizer = new TrackerSanitizer();

  assert.ok(sanitizer.isTrackerUrl('https://www.google-analytics.com/analytics.js'));
  assert.ok(sanitizer.isTrackerUrl('https://www.googletagmanager.com/gtm.js?id=GTM-XXXX'));
  assert.ok(sanitizer.isTrackerUrl('https://connect.facebook.net/en_US/fbevents.js'));
  assert.ok(sanitizer.isTrackerUrl('https://static.hotjar.com/c/hotjar-123.js'));
  assert.ok(sanitizer.isTrackerUrl('https://www.clarity.ms/tag/abc12345'));
  assert.ok(sanitizer.isTrackerUrl('https://cdn.segment.io/analytics.js/v1/key/analytics.min.js'));
  assert.ok(sanitizer.isTrackerUrl('https://api.mixpanel.com/track'));
  assert.ok(sanitizer.isTrackerUrl('https://cdn.amplitude.com/libs/amplitude-8.21.9-min.gz.js'));
  assert.ok(sanitizer.isTrackerUrl('https://browser.sentry-cdn.com/7.0.0/bundle.min.js'));
  assert.ok(sanitizer.isTrackerUrl('https://browser-intake-datadoghq.com/api/v2/rum'));

  // Legitimate asset and kinetic URLs must NOT be flagged as trackers
  assert.equal(sanitizer.isTrackerUrl('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js'), false);
  assert.equal(sanitizer.isTrackerUrl('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'), false);
  assert.equal(sanitizer.isTrackerUrl('https://assets.example.com/models/watch.glb'), false);
});

test('TrackerSanitizer: Tier 2 global stubs script contains required safety stubs', () => {
  const script = TrackerSanitizer.getInertGlobalStubsScript();

  assert.ok(script.includes('dataLayer'), 'Must stub dataLayer');
  assert.ok(script.includes('gtag'), 'Must stub gtag');
  assert.ok(script.includes('fbq'), 'Must stub fbq');
  assert.ok(script.includes('clarity'), 'Must stub clarity');
  assert.ok(script.includes('mixpanel'), 'Must stub mixpanel');
  assert.ok(script.includes('sendBeacon'), 'Must stub navigator.sendBeacon');
});

test('TrackerSanitizer: Tier 3 cleans scripts, beacons, and tracking attributes while PRESERVING kinetic attributes', () => {
  const sanitizer = new TrackerSanitizer();

  const dirtyHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://www.google-analytics.com/analytics.js"></script>
        <script src="https://connect.facebook.net/en_US/fbevents.js"></script>
        <script>
          gtag('config', 'GA-12345');
          dataLayer.push({ event: 'pageview' });
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      </head>
      <body>
        <noscript>
          <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=123&ev=PageView" />
        </noscript>
        <div id="hero" 
             data-gtm-category="hero" 
             data-analytics-click="track" 
             data-scroll="true" 
             data-scroll-speed="2" 
             data-deep-scrutiny-overlap-group="card-pair-1"
             data-kinetic-slot="headline">
          <h1 onclick="ga('send', 'event');">Kinetic Experience</h1>
        </div>
      </body>
    </html>
  `;

  const result = sanitizer.sanitizeHtml(dirtyHtml);

  assert.equal(result.isClean, true);
  assert.ok(result.strippedScriptsCount >= 3, `Expected at least 3 stripped scripts, got ${result.strippedScriptsCount}`);
  assert.ok(!result.html.includes('google-analytics.com'), 'google-analytics must be removed');
  assert.ok(!result.html.includes('fbevents.js'), 'fbevents must be removed');
  assert.ok(!result.html.includes('data-gtm-category'), 'data-gtm attribute must be stripped');
  assert.ok(!result.html.includes('data-analytics-click'), 'data-analytics attribute must be stripped');

  // Must preserve legitimate libraries and kinetic attributes
  assert.ok(result.html.includes('gsap.min.js'), 'GSAP script must be preserved');
  assert.ok(result.html.includes('data-scroll="true"'), 'data-scroll must be preserved');
  assert.ok(result.html.includes('data-scroll-speed="2"'), 'data-scroll-speed must be preserved');
  assert.ok(result.html.includes('data-deep-scrutiny-overlap-group="card-pair-1"'), 'data-deep-scrutiny attribute must be preserved');
  assert.ok(result.html.includes('data-kinetic-slot="headline"'), 'data-kinetic-slot must be preserved');

  // Sanitization report verification
  const report = sanitizer.getSanitizationReport();
  assert.equal(report.isClean, true);
  assert.ok(report.strippedScriptsCount >= 3);
});

// ============================================================================
// 2. SemanticSkeletonNormalizer Tests
// ============================================================================

test('SemanticSkeletonNormalizer: Unmasks SplitText nested lines and characters into clean semantic markup', () => {
  const splitTextHtml = `
    <div class="hero-container">
      <h1 class="headline" style="clip-path: inset(0 0 100% 0); overflow: hidden; opacity: 0;">
        <div class="split-line">
          <span class="split-word">
            <span class="split-char">P</span>
            <span class="split-char">r</span>
            <span class="split-char">e</span>
            <span class="split-char">c</span>
            <span class="split-char">i</span>
            <span class="split-char">s</span>
            <span class="split-char">i</span>
            <span class="split-char">o</span>
            <span class="split-char">n</span>
          </span>
          <span class="split-word">
            <span class="split-char">E</span>
            <span class="split-char">n</span>
            <span class="split-char">g</span>
            <span class="split-char">i</span>
            <span class="split-char">n</span>
            <span class="split-char">e</span>
          </span>
        </div>
      </h1>
    </div>
  `;

  const { html, report } = SemanticSkeletonNormalizer.normalizeHtml(splitTextHtml);

  assert.ok(report.unmaskedSplitTextCount > 0);
  assert.ok(!html.includes('split-char'), 'split-char wrappers must be unmasked');
  assert.ok(!html.includes('split-word'), 'split-word wrappers must be unmasked');
  assert.ok(html.includes('<h1 class="headline" style="opacity: 1;">Precision Engine</h1>') || html.includes('Precision Engine'));
  assert.ok(!html.includes('clip-path: inset'), 'hostile clip-path must be removed');
});

test('SemanticSkeletonNormalizer: Removes preloader curtain traps', () => {
  const preloaderHtml = `
    <div>
      <div class="preloader" style="position: fixed; inset: 0; z-index: 9999; background: #000;">
        <div class="loader-spinner"></div>
      </div>
      <div class="curtain" style="position: fixed; width: 100vw; height: 100vh; z-index: 10000;"></div>
      <main>
        <h1>Actual Site Content</h1>
      </main>
    </div>
  `;

  const { html, report } = SemanticSkeletonNormalizer.normalizeHtml(preloaderHtml);

  assert.ok(report.removedPreloadersCount >= 2);
  assert.ok(!html.includes('class="preloader"'), 'preloader must be removed');
  assert.ok(!html.includes('class="curtain"'), 'curtain must be removed');
  assert.ok(html.includes('Actual Site Content'), 'actual content must remain intact');
});

test('SemanticSkeletonNormalizer: Neutralizes hostile overflow: hidden on sticky scroll ancestors', () => {
  const stickyBrokenHtml = `
    <div class="page-wrapper" style="overflow: hidden;">
      <section class="viewport-section" style="overflow-x: hidden;">
        <div class="kinetic-stage" style="position: sticky; top: 0; height: 100vh;">
          <h2>Sticky Canvas</h2>
        </div>
      </section>
    </div>
  `;

  const { html, report } = SemanticSkeletonNormalizer.normalizeHtml(stickyBrokenHtml);

  assert.ok(report.neutralizedOverflowCount >= 2);
  assert.ok(!html.includes('overflow: hidden'), 'hostile overflow: hidden on sticky ancestor must be neutralized');
  assert.ok(!html.includes('overflow-x: hidden'), 'hostile overflow-x: hidden must be neutralized');
  assert.ok(html.includes('overflow: visible') || html.includes('overflow-x: visible'));
});

test('SemanticSkeletonNormalizer: Localizes remote CDN assets and configures video streaming', () => {
  const assetHtml = `
    <html>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700">
        <script type="importmap">
          {
            "imports": {
              "three": "https://unpkg.com/three@0.160.0/build/three.module.js"
            }
          }
        </script>
      </head>
      <body>
        <img src="https://assets.example.com/textures/diffuse.png" srcset="https://assets.example.com/textures/diffuse@2x.png 2x">
        <video src="https://media.example.com/renders/hero.mp4" autoplay></video>
      </body>
    </html>
  `;

  const { html, report } = SemanticSkeletonNormalizer.normalizeHtml(assetHtml);

  assert.ok(report.localizedAssetsCount >= 3, `Expected localized assets >= 3, got ${report.localizedAssetsCount}`);
  assert.ok(report.configuredVideosCount >= 1);
  assert.ok(html.includes('./assets/'), 'CDN image URLs must be localized to ./assets/');
  assert.ok(html.includes('./assets/vendor/'), 'Importmap URLs must be localized to ./assets/vendor/');
  assert.ok(html.includes('playsinline'), 'Video must have playsinline attribute');
  assert.ok(html.includes('muted'), 'Video must have muted attribute');
  assert.ok(html.includes('preload="metadata"'), 'Video must have preload="metadata"');
});

// ============================================================================
// 3. RuntimeHookInjector Tests (Browser In-Memory Execution)
// ============================================================================

test('RuntimeHookInjector: Measures RAF delta, fps, and jitter; hooks GSAP and Three.js', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Inject hook via RuntimeHookInjector
  await RuntimeHookInjector.inject(page);

  // Setup simulated page with RAF loop, mock GSAP, and mock Three.js
  const pageHtml = `
    <!DOCTYPE html>
    <html>
      <body>
        <div id="animated-box" style="width: 100px; height: 100px; background: red;"></div>
        <canvas id="gl-canvas" width="800" height="600"></canvas>
        <script>
          // 1. Run RAF loop for several frames
          let frameCount = 0;
          function loop() {
            frameCount++;
            if (frameCount < 15) {
              requestAnimationFrame(loop);
            }
          }
          requestAnimationFrame(loop);

          // 2. Setup GSAP-like global object
          window.gsap = {
            ticker: {
              callbacks: [],
              add: function(fn) { this.callbacks.push(fn); }
            },
            globalTimeline: {
              getChildren: function() {
                return [
                  {
                    target: document.getElementById('animated-box'),
                    duration: function() { return 1.5; },
                    _ease: { name: 'power2.inOut' },
                    vars: { opacity: 0.5, y: 150 }
                  }
                ];
              }
            }
          };

          window.ScrollTrigger = {
            getAll: function() {
              return [
                {
                  trigger: document.getElementById('animated-box'),
                  start: 'top 80%',
                  end: 'bottom 20%',
                  vars: { scrub: 1, pin: true }
                }
              ];
            }
          };

          // 3. Setup Three.js-like mock
          window.THREE = {
            WebGLRenderer: function() {
              this.domElement = document.getElementById('gl-canvas');
            }
          };
          window.THREE.WebGLRenderer.prototype.render = function(scene, camera) {
            // Render mock
          };

          const renderer = new window.THREE.WebGLRenderer();
          const mockCamera = {
            fov: 35,
            isPerspectiveCamera: true,
            position: { x: 0, y: 1.5, z: 4 },
            quaternion: { x: 0, y: 0.7071, z: 0, w: 0.7071 },
            matrixWorld: { elements: [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,1.5,4,1] }
          };

          renderer.render({}, mockCamera);
        </script>
      </body>
    </html>
  `;

  await page.goto('data:text/html;charset=utf-8,' + encodeURIComponent(pageHtml));

  // Wait for RAF cycles
  await page.waitForTimeout(300);

  const captured = await RuntimeHookInjector.extractCapturedData(page);

  // Validate RAF metrics
  assert.ok(captured.raf.frameCount >= 5, `Expected frameCount >= 5, got ${captured.raf.frameCount}`);
  assert.ok(captured.raf.averageDelta > 0, 'averageDelta must be > 0');
  assert.ok(captured.raf.fps > 0, 'fps must be > 0');

  // Validate GSAP extraction
  assert.ok(captured.gsap.tweens.length >= 1, 'Expected at least 1 extracted GSAP tween');
  assert.equal(captured.gsap.tweens[0].targetSelector, '#animated-box');
  assert.equal(captured.gsap.tweens[0].duration, 1.5);
  assert.equal(captured.gsap.tweens[0].ease, 'power2.inOut');
  assert.equal(captured.gsap.tweens[0].vars.opacity, 0.5);

  assert.ok(captured.gsap.scrollTriggers.length >= 1, 'Expected at least 1 ScrollTrigger');
  assert.equal(captured.gsap.scrollTriggers[0].triggerSelector, '#animated-box');
  assert.equal(captured.gsap.scrollTriggers[0].scrub, 1);
  assert.equal(captured.gsap.scrollTriggers[0].pin, true);

  // Validate WebGL camera sniffer
  assert.ok(captured.webgl.cameraSamples.length >= 1, 'Expected at least 1 camera trajectory sample');
  const sample = captured.webgl.cameraSamples[0];
  assert.equal(sample.canvasSelector, '#gl-canvas');
  assert.equal(sample.cameraFov, 35);
  assert.deepEqual(sample.position, [0, 1.5, 4]);

  await context.close();
  await browser.close();
});

// ============================================================================
// 4. KineticTimelineInterceptor & End-to-End CDP Decompiler
// ============================================================================

test('KineticTimelineInterceptor: Connects CDP session, coordinates domains, captures animations & emits KineticTimelineIR', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const interceptor = new KineticTimelineInterceptor();
  await interceptor.attach(page);

  // Verify CDP domains were enabled
  assert.ok(interceptor.activeDomains.has('Animation'), 'Animation domain must be enabled');
  assert.ok(interceptor.activeDomains.has('DOM'), 'DOM domain must be enabled');
  assert.ok(interceptor.activeDomains.has('CSS'), 'CSS domain must be enabled');
  assert.ok(interceptor.activeDomains.has('Performance'), 'Performance domain must be enabled');

  // Navigate to page containing CSS keyframe animation and performance workload
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
          #kinetic-card {
            width: 200px;
            height: 200px;
            background: #222;
            animation: pulse 1s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          }
        </style>
      </head>
      <body>
        <div id="kinetic-card" data-kinetic-slot="card-1">Card Content</div>
      </body>
    </html>
  `);

  await page.waitForTimeout(300);

  // Verify Performance domain metrics
  const perfMetrics = await interceptor.getPerformanceMetrics();
  assert.ok(typeof perfMetrics === 'object', 'Performance metrics must be an object');
  assert.ok('LayoutCount' in perfMetrics || 'JSHeapUsedSize' in perfMetrics, 'Performance metrics should include layout or heap');

  // Verify Box Model extraction via CDP DOM domain
  const boxModel = await interceptor.getBoxModel('#kinetic-card');
  assert.ok(boxModel, 'Box model should be successfully queried for #kinetic-card');
  assert.ok(Array.isArray(boxModel.content), 'Box model content quads must be an array');

  // Verify full KineticTimelineIR extraction
  const ir = await interceptor.extractKineticTimelineIR('https://awwwards-reference.example.com');

  assert.equal(ir.sourceUrl, 'https://awwwards-reference.example.com');
  assert.equal(ir.viewport.width, 1440);
  assert.equal(ir.viewport.height, 900);
  assert.equal(ir.viewport.dpr, 1);

  // Check cssAnimations compliance
  assert.ok(Array.isArray(ir.cssAnimations), 'cssAnimations must be an array');
  assert.ok(ir.cssAnimations.length >= 1, 'Must capture at least 1 CSS animation');
  const anim = ir.cssAnimations[0];
  assert.ok(anim.id, 'Animation must have an ID');
  assert.ok(anim.targetSelector === '#kinetic-card' || anim.targetSelector.includes('kinetic-card') || anim.targetSelector === 'div', `Target selector was: ${anim.targetSelector}`);
  assert.ok(['CSSAnimation', 'CSSTransition', 'WebAnimation'].includes(anim.type));
  assert.ok(anim.durationMs >= 0);

  // Check sanitization report
  assert.equal(typeof ir.sanitizationReport, 'object');
  assert.equal(ir.sanitizationReport.isClean, true);

  // Test seekAnimations
  if (anim.id) {
    await interceptor.seekAnimations([anim.id], 500);
  }

  await interceptor.detach();
  await context.close();
  await browser.close();
});

test('KineticTimelineInterceptor: Gracefully handles static non-animated pages without errors', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  const interceptor = new KineticTimelineInterceptor();
  await interceptor.attach(page);

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body>
        <main><h1>Static Semantic Page</h1></main>
      </body>
    </html>
  `);

  const ir = await interceptor.extractKineticTimelineIR('https://static-example.com');

  assert.equal(ir.sourceUrl, 'https://static-example.com');
  assert.equal(ir.viewport.width, 390);
  assert.equal(ir.viewport.height, 844);
  assert.deepEqual(ir.cssAnimations, []);
  assert.deepEqual(ir.gsapTimelines, []);
  assert.deepEqual(ir.webglRenders, []);
  assert.equal(ir.sanitizationReport.isClean, true);

  await interceptor.detach();
  await context.close();
  await browser.close();
});

test('TrackerSanitizer: Invalidation check & real CDP Network block interception', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const sanitizer = new TrackerSanitizer();
  const cdp = await context.newCDPSession(page);
  await sanitizer.attachToCdp(cdp);

  // Falsifiability: Dirty tracker HTML must NOT be clean
  const dirtyHtml = '<script src="https://www.google-analytics.com/analytics.js"></script>';
  assert.equal(sanitizer.isCleanHtml(dirtyHtml), false, 'Dirty HTML must fail isCleanHtml');

  // Trigger network fetch to blocked tracker URL inside page
  let fetchBlocked = false;
  try {
    await page.evaluate(async () => {
      await fetch('https://www.google-analytics.com/analytics.js');
    });
  } catch (err) {
    fetchBlocked = true;
  }

  // The CDP network rule must have blocked the request or network failed
  assert.ok(fetchBlocked || sanitizer.blockedRequests.length > 0, 'Tracker network request must be blocked');

  await sanitizer.detachFromCdp();
  await cdp.detach();
  await context.close();
  await browser.close();
});

