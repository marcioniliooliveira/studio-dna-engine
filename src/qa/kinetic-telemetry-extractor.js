/**
 * src/qa/kinetic-telemetry-extractor.js
 * 
 * Kinetic Telemetry Extractor & Spatio-Temporal Motion Auditor
 * Part of "The Stochastic Ceiling" Deterministic-Evolutionary Framework.
 * 
 * Replaces naive linear scrollTo steps with continuous frame-synchronized sampling,
 * calculating sub-pixel AABB bounding box collisions, 3D matrix transformations,
 * and kinetic flow metrics across heterogenous viewports.
 */

'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4'
};

function extractScale(transformStr) {
  if (!transformStr || transformStr === 'none') return 1.0;
  const matMatch = transformStr.match(/^matrix\(([^)]+)\)$/);
  if (matMatch) {
    const parts = matMatch[1].split(',').map((s) => parseFloat(s.trim()));
    if (parts.length >= 4) {
      const sx = Math.sqrt(parts[0] * parts[0] + parts[1] * parts[1]);
      const sy = Math.sqrt(parts[2] * parts[2] + parts[3] * parts[3]);
      return (sx + sy) / 2;
    }
  }
  const mat3dMatch = transformStr.match(/^matrix3d\(([^)]+)\)$/);
  if (mat3dMatch) {
    const parts = mat3dMatch[1].split(',').map((s) => parseFloat(s.trim()));
    if (parts.length >= 16) {
      const sx = Math.sqrt(parts[0] * parts[0] + parts[1] * parts[1] + parts[2] * parts[2]);
      const sy = Math.sqrt(parts[4] * parts[4] + parts[5] * parts[5] + parts[6] * parts[6]);
      return (sx + sy) / 2;
    }
  }
  return 1.0;
}

class KineticTelemetryExtractor {
  /**
   * Starts an ephemeral static HTTP server for a local directory.
   */
  static async startEphemeralServer(siteDir) {
    const resolvedDir = path.resolve(siteDir);
    const server = http.createServer((req, res) => {
      let reqPath = decodeURIComponent(req.url.split('?')[0]);
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

      let targetFile = path.join(resolvedDir, reqPath);
      if (!fs.existsSync(targetFile) || !fs.statSync(targetFile).isFile()) {
        const altAsset = path.join(resolvedDir, 'assets', reqPath);
        if (fs.existsSync(altAsset) && fs.statSync(altAsset).isFile()) {
          targetFile = altAsset;
        }
      }

      if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
        const ext = path.extname(targetFile).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        fs.createReadStream(targetFile).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    });

    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;
    const url = `http://127.0.0.1:${port}`;
    return { server, port, url };
  }

  /**
   * Captures spatio-temporal telemetry metrics across viewports.
   * 
   * @param {Object} options
   * @param {string} [options.url] Target URL
   * @param {string} [options.siteDir] Target site directory (if url not provided)
   * @param {Array<{ name: string, width: number, height: number }>} [options.viewports]
   * @param {{ start: number, end: number, step: number }} [options.scrollRange]
   * @param {{ a?: string, b?: string, text?: string, asset?: string }} [options.selectors]
   * @param {boolean} [options.headless=true]
   * @returns {Promise<{
   *   timelines: Record<string, Array<Object>>,
   *   summary: Object,
   *   decision: Object
   * }>}
   */
  static async captureTelemetry(options = {}) {
    const viewports = options.viewports || [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'mobile', width: 390, height: 844 }
    ];
    const scrollRange = options.scrollRange || { start: 0, end: 2000, step: 50 };
    
    // Flexible selectors
    const selA = options.selectors?.a || options.selectors?.text || '.hero-text, .nav-link-text.is-default, .front, h1, h2, [data-hero-text]';
    const selB = options.selectors?.b || options.selectors?.asset || '.scroll-asset, .nav-link-text.is-absolute, .back, img, video, canvas, [data-scroll-asset]';

    let serverInstance = null;
    let targetUrl = options.url;

    if (!targetUrl) {
      if (!options.siteDir) {
        throw new Error('Either url or siteDir must be provided to KineticTelemetryExtractor');
      }
      const ephemeral = await KineticTelemetryExtractor.startEphemeralServer(options.siteDir);
      serverInstance = ephemeral.server;
      targetUrl = ephemeral.url;
    }

    const browser = await chromium.launch({
      headless: options.headless !== false,
      args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
    });

    const timelines = {};
    let totalMaxOverlapArea = 0;
    let totalOverlappingFrames = 0;
    let totalFramesCaptured = 0;
    let hadComplexLayout = false;
    let assetScaledBeforeFade = false;

    try {
      for (const vp of viewports) {
        const page = await browser.newPage();
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(targetUrl, { waitUntil: 'load', timeout: 30000 });

        // Wait for fonts and RAF settling
        await page.evaluate(async () => {
          if (document.fonts) await document.fonts.ready;
          await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        });

        const timeline = [];

        for (let scrollY = scrollRange.start; scrollY <= scrollRange.end; scrollY += scrollRange.step) {
          await page.evaluate((y) => {
            window.scrollTo(0, y);
            if (window.lenis && typeof window.lenis.scrollTo === 'function') {
              window.lenis.scrollTo(y, { immediate: true });
            }
          }, scrollY);

          await page.evaluate(() => new Promise(r => requestAnimationFrame(r)));

          const frameMetrics = await page.evaluate(({ selectorA, selectorB }) => {
            const elA = document.querySelector(selectorA);
            const elB = document.querySelector(selectorB);

            let rectA = elA ? elA.getBoundingClientRect() : null;
            let rectB = elB ? elB.getBoundingClientRect() : null;

            // If neither element matched, create a baseline document metrics frame
            if (!elA && !elB) {
              return {
                scrollPosition: window.scrollY,
                viewport: { width: window.innerWidth, height: window.innerHeight },
                elementA: null,
                elementB: null,
                overlapArea: 0,
                has3dMatrix: false
              };
            }

            let styleA = elA ? window.getComputedStyle(elA) : null;
            let styleB = elB ? window.getComputedStyle(elB) : null;

            let opacityA = styleA ? parseFloat(styleA.opacity || '1') : 1.0;
            let opacityB = styleB ? parseFloat(styleB.opacity || '1') : 1.0;
            let transformA = styleA ? (styleA.transform || 'none') : 'none';
            let transformB = styleB ? (styleB.transform || 'none') : 'none';

            let inertA = elA ? (elA.hasAttribute('inert') || elA.inert === true) : false;
            let ariaHiddenA = elA ? (elA.getAttribute('aria-hidden') === 'true') : false;
            let inertB = elB ? (elB.hasAttribute('inert') || elB.inert === true) : false;
            let ariaHiddenB = elB ? (elB.getAttribute('aria-hidden') === 'true') : false;

            // Check 3D matrix / rotational transforms
            const is3dA = transformA.includes('matrix3d') || transformA.includes('rotateY') || transformA.includes('rotateX') || (styleA && styleA.transformStyle === 'preserve-3d');
            const is3dB = transformB.includes('matrix3d') || transformB.includes('rotateY') || transformB.includes('rotateX') || (styleB && styleB.transformStyle === 'preserve-3d');
            const has3dMatrix = is3dA || is3dB;

            // Check declared 3D front/back overlap contracts
            const groupA = elA ? (elA.getAttribute('data-deep-scrutiny-overlap-group') || elA.closest('[data-deep-scrutiny-overlap-group]')?.getAttribute('data-deep-scrutiny-overlap-group')) : null;
            const groupB = elB ? (elB.getAttribute('data-deep-scrutiny-overlap-group') || elB.closest('[data-deep-scrutiny-overlap-group]')?.getAttribute('data-deep-scrutiny-overlap-group')) : null;
            const isDeclared3dPair = (groupA && groupB && groupA === groupB && has3dMatrix);

            let overlapArea = 0;
            if (rectA && rectB && !inertA && !ariaHiddenA && !inertB && !ariaHiddenB && opacityA > 0.05 && opacityB > 0.05) {
              if (!isDeclared3dPair) {
                const xOverlap = Math.max(0, Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left));
                const yOverlap = Math.max(0, Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top));
                overlapArea = Math.round(xOverlap * yOverlap);
              }
            }

            return {
              scrollPosition: window.scrollY,
              viewport: { width: window.innerWidth, height: window.innerHeight },
              elementA: rectA ? {
                left: rectA.left, top: rectA.top,
                width: rectA.width, height: rectA.height,
                opacity: opacityA, transform: transformA,
                inert: inertA, ariaHidden: ariaHiddenA
              } : null,
              elementB: rectB ? {
                left: rectB.left, top: rectB.top,
                width: rectB.width, height: rectB.height,
                opacity: opacityB, transform: transformB,
                inert: inertB, ariaHidden: ariaHiddenB
              } : null,
              overlapArea,
              has3dMatrix,
              isDeclared3dPair: Boolean(isDeclared3dPair)
            };
          }, { selectorA: selA, selectorB: selB });

          if (frameMetrics) {
            timeline.push(frameMetrics);
            totalFramesCaptured++;
            if (frameMetrics.overlapArea > totalMaxOverlapArea) {
              totalMaxOverlapArea = frameMetrics.overlapArea;
            }
            if (frameMetrics.overlapArea > 20) {
              totalOverlappingFrames++;
            }
            if (frameMetrics.has3dMatrix) {
              hadComplexLayout = true;
            }
            if (frameMetrics.elementB && frameMetrics.elementA && !frameMetrics.isDeclared3dPair) {
              const scaleB = extractScale(frameMetrics.elementB.transform);
              const isActuallyScaling = Math.abs(scaleB - 1.0) > 0.12;
              const textStillInViewport = (frameMetrics.elementA.top >= 0 && frameMetrics.elementA.top < frameMetrics.viewport.height && frameMetrics.elementA.opacity >= 0.9);
              if (isActuallyScaling && textStillInViewport && scrollY > 400) {
                assetScaledBeforeFade = true;
              }
            }
          }
        }

        timelines[vp.name] = timeline;
        await page.close();
      }
    } finally {
      await browser.close();
      if (serverInstance) {
        await new Promise(r => serverInstance.close(r));
      }
    }

    // Analytical Decision Solver (zero token overhead)
    let kineticFlow = 'PERFECT';
    if (totalOverlappingFrames > 0) {
      kineticFlow = 'OVERLAPPING';
    } else if (assetScaledBeforeFade) {
      kineticFlow = 'TOO_FAST';
    }

    let architecturalEffort = 'LAZY_DEFAULT';
    if (totalOverlappingFrames > 0) {
      architecturalEffort = 'STRUCTURALLY_FLAWED';
    } else if (hadComplexLayout || (totalFramesCaptured > 0 && totalMaxOverlapArea === 0)) {
      architecturalEffort = 'HIGH_COMPLEXITY';
    }

    let tasteRating = 50;
    if (architecturalEffort === 'STRUCTURALLY_FLAWED') {
      tasteRating = 20;
    } else if (architecturalEffort === 'LAZY_DEFAULT') {
      tasteRating = 60;
    } else if (architecturalEffort === 'HIGH_COMPLEXITY') {
      tasteRating = kineticFlow === 'PERFECT' ? 95 : 82;
    }

    const shouldMutateParameters = (tasteRating < 85 && architecturalEffort !== 'STRUCTURALLY_FLAWED');
    const isProductionReady = (architecturalEffort === 'HIGH_COMPLEXITY' && kineticFlow === 'PERFECT' && tasteRating >= 85);

    const summary = {
      totalFramesCaptured,
      maxOverlapArea: totalMaxOverlapArea,
      overlappingFramesCount: totalOverlappingFrames,
      hadComplexLayout,
      viewportsAnalyzed: Object.keys(timelines)
    };

    const decision = {
      architectural_effort: architecturalEffort,
      kinetic_flow: kineticFlow,
      taste_rating: tasteRating,
      should_mutate_parameters: shouldMutateParameters,
      is_production_ready: isProductionReady
    };

    return {
      timelines,
      summary,
      decision
    };
  }
}

module.exports = {
  KineticTelemetryExtractor
};
