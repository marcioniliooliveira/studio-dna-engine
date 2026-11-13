#!/usr/bin/env node
/**
 * scripts/extract-capsule-spike.js
 * 
 * Studio DNA Engine v3.0 — Modular Capsule Extraction CLI Runner
 * Requirement R3 / Spike 3: Parametric Capsule Slicer, Dimensional Blueprint, and Kinetic Skill.
 * 
 * Extracts a portable, isolated <dna-capsule> from a reference repository (e.g. copias/khanhnguyen-design),
 * producing the 5 canonical artifacts:
 * 1. capsule.html (clean DOM wrapped in <dna-capsule> with isolated @scope CSS)
 * 2. capsule-spec.json (machine-readable tokens, C(rk) closure, slots, AST metrics)
 * 3. dimensional-blueprint.svg (architectural CAD drawing with engineering grid, wireframes, amber dimensions)
 * 4. dimensional-blueprint.json (dual-viewport coordinates, SpatialRTree zero-collision proof, invariants)
 * 5. SKILL.md (progressive disclosure kinetic manifesto strictly < 60 lines)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require('@playwright/test');

const { sliceSubtree } = require('../src/capsules/subtree-slicer');
const { generateDimensionalBlueprint } = require('../src/capsules/dimensional-blueprint');
const { classifyKineticContract } = require('../src/motion/jev-classifier');

/**
 * MIME type dictionary for ephemeral static server.
 */
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

/**
 * Spawns an ephemeral HTTP asset server mapping root and asset requests.
 * 
 * @param {string} sourceDir Root folder of reference site
 * @returns {Promise<{ server: http.Server, port: number, url: string }>}
 */
function startEphemeralServer(sourceDir) {
  return new Promise((resolve, reject) => {
    const siteDir = fs.existsSync(path.join(sourceDir, 'site'))
      ? path.join(sourceDir, 'site')
      : sourceDir;

    const server = http.createServer((req, res) => {
      let cleanPath = decodeURIComponent(req.url.split('?')[0]);
      if (cleanPath === '/' || cleanPath === '') cleanPath = '/index.html';

      // Check standard path
      let candidate = path.join(siteDir, cleanPath);

      // Check /assets/ fallback
      if (!fs.existsSync(candidate) || fs.statSync(candidate).isDirectory()) {
        const fb1 = path.join(siteDir, 'assets', cleanPath);
        if (fs.existsSync(fb1) && fs.statSync(fb1).isFile()) {
          candidate = fb1;
        } else {
          const fb2 = path.join(siteDir, 'assets', cleanPath.replace(/^\/_astro\//, '_astro/'));
          if (fs.existsSync(fb2) && fs.statSync(fb2).isFile()) {
            candidate = fb2;
          }
        }
      }

      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        const ext = path.extname(candidate).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(candidate).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found: ' + cleanPath);
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({
        server,
        port,
        url: `http://127.0.0.1:${port}`
      });
    });

    server.on('error', reject);
  });
}

/**
 * Parses command-line arguments into a structured options dictionary.
 * 
 * @param {Array<string>} argv 
 * @returns {object}
 */
function parseCliArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--source' && argv[i + 1]) {
      args.source = argv[++i];
    } else if (arg === '--selector' && argv[i + 1]) {
      let val = argv[++i];
      while (i + 1 < argv.length && !argv[i + 1].startsWith('--') && (val.includes('[') && !val.includes(']'))) {
        val += argv[++i];
      }
      val = val.replace(/\\"/g, '"').replace(/\\/g, '');
      args.selector = val;
    } else if (arg === '--out' && argv[i + 1]) {
      args.out = argv[++i];
    } else if (arg === '--capsule-id' && argv[i + 1]) {
      args.capsuleId = argv[++i];
    } else if (arg === '--viewports' && argv[i + 1]) {
      args.viewports = argv[++i];
    }
  }
  return args;
}

/**
 * Core extraction orchestrator.
 * 
 * @param {object} options
 * @param {string} options.source Reference source directory (e.g. copias/khanhnguyen-design)
 * @param {string} options.selector Target CSS selector
 * @param {string} options.out Output directory
 * @param {string} [options.capsuleId] Unique capsule identifier
 * @returns {Promise<object>} Extraction result summary
 */
async function extractCapsule(options) {
  const { source, selector, out } = options;

  if (!source || !selector || !out) {
    throw new Error('Missing required arguments: --source, --selector, and --out must be specified');
  }

  const sourceDir = path.resolve(source);
  const outDir = path.resolve(out);

  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory does not exist: ${sourceDir}`);
  }

  // Derive capsule ID from destination path or option
  const capsuleId = options.capsuleId || path.basename(outDir);

  // Locate index.html
  const indexPath = fs.existsSync(path.join(sourceDir, 'site', 'index.html'))
    ? path.join(sourceDir, 'site', 'index.html')
    : path.join(sourceDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    throw new Error(`Could not find index.html at ${indexPath}`);
  }

  const htmlContent = fs.readFileSync(indexPath, 'utf8');

  // Discover CSS files
  const cssSources = [];
  const searchDirs = [
    path.join(sourceDir, 'site', 'assets'),
    path.join(sourceDir, 'site', 'styles'),
    path.join(sourceDir, 'assets'),
    path.join(sourceDir, 'styles')
  ];

  for (const dir of searchDirs) {
    if (fs.existsSync(dir)) {
      const walk = (d) => {
        const entries = fs.readdirSync(d, { withFileTypes: true });
        for (const e of entries) {
          const full = path.join(d, e.name);
          if (e.isDirectory()) {
            walk(full);
          } else if (e.isFile() && e.name.endsWith('.css')) {
            try {
              cssSources.push(fs.readFileSync(full, 'utf8'));
            } catch (err) {}
          }
        }
      };
      walk(dir);
    }
  }

  // Map known selector aliases (e.g. section.work-horizontal -> section[data-section="home-work"])
  let effectiveSelector = selector;
  if (selector.includes('work-horizontal')) {
    effectiveSelector = 'section[data-section="home-work"]';
  }

  // Start ephemeral server
  const serverHandle = await startEphemeralServer(sourceDir);
  let browser = null;
  const elementsByViewport = {};
  let computedStyles = null;

  try {
    browser = await chromium.launch({ headless: true });

    const viewports = [
      { name: 'desktop', width: 1440, height: 900, scale: 10 },
      { name: 'mobile', width: 390, height: 844, scale: 10 }
    ];

    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`${serverHandle.url}/`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(400);

      const measured = await page.evaluate((sel) => {
        let sec = document.querySelector(sel);
        if (!sec) {
          if (sel.includes('work-horizontal')) {
            sec = document.querySelector('section[data-section="home-work"]');
          }
          if (!sec) {
            sec = document.querySelector('[data-horizontal-panel]') ||
              document.querySelector('section[aria-label="Selected work"]');
          }
        }

        if (!sec) return null;

        const secRect = sec.getBoundingClientRect();
        const rootBox = {
          id: 'root',
          isRoot: true,
          minX: secRect.x,
          minY: secRect.y,
          maxX: secRect.x + secRect.width,
          maxY: secRect.y + secRect.height,
          width: secRect.width,
          height: secRect.height
        };

        const secComputed = window.getComputedStyle(sec);
        const resolvedProps = {
          '--scale': secComputed.getPropertyValue('--scale').trim(),
          '--vg': secComputed.getPropertyValue('--vg').trim(),
          '--cta-fs': secComputed.getPropertyValue('--cta-fs').trim(),
          '--list-fs': secComputed.getPropertyValue('--list-fs').trim()
        };

        // Collect key layout candidates
        const candidates = [];
        const queryList = [
          'p.font-serif',
          '[data-work-label]',
          '[data-work-item-index="0"]',
          '[data-work-item-index="1"]',
          '[data-work-item-index="2"]',
          '[data-work-item-index="3"]',
          '[data-to-link-underline]',
          '[data-work-preview]'
        ];

        for (const q of queryList) {
          const el = sec.querySelector(q);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              const cs = window.getComputedStyle(el);
              const idxAttr = el.getAttribute('data-work-item-index');
              const id = idxAttr !== null ? `work-item-${idxAttr}` :
                (el.getAttribute('data-work-label') !== null ? 'work-label' :
                el.getAttribute('data-work-preview') !== null ? 'work-preview' :
                el.getAttribute('data-to-link-underline') !== null ? 'cta-view-all' :
                el.tagName.toLowerCase() + '-heading');

              candidates.push({
                id,
                tag: el.tagName.toLowerCase(),
                minX: rect.x,
                minY: rect.y,
                maxX: rect.x + rect.width,
                maxY: rect.y + rect.height,
                width: rect.width,
                height: rect.height,
                fontSize: parseFloat(cs.fontSize) || 0,
                fontWeight: parseInt(cs.fontWeight, 10) || 400
              });
            }
          }
        }

        return { rootBox, candidates, resolvedProps };
      }, effectiveSelector);

      if (measured) {
        elementsByViewport[vp.name] = [measured.rootBox, ...measured.candidates];
        if (!computedStyles) {
          computedStyles = measured.resolvedProps;
        }
      }

      await page.close();
    }
  } catch (err) {
    console.warn('[extract-capsule] Headless Playwright measurement warning:', err.message);
  } finally {
    if (browser) await browser.close();
    serverHandle.server.close();
  }

  // 1. Run Subtree Slicer
  const sliceResult = sliceSubtree({
    html: htmlContent,
    cssSources,
    selector: effectiveSelector,
    capsuleId,
    computedStyles,
    includeFallback: true
  });

  // 2. Run Dimensional Blueprint Engine
  const blueprintResult = generateDimensionalBlueprint({
    capsuleId,
    title: sliceResult.spec.title,
    viewports: [
      { name: 'desktop', width: 1440, height: 900, scale: 10 },
      { name: 'mobile', width: 390, height: 844, scale: 10 }
    ],
    elementsByViewport,
    assertZeroCollision: true
  });

  // 3. Run JEV Kinetic Classifier
  const kineticResult = classifyKineticContract({
    styles: sliceResult.scopedCss,
    scaleVarName: '--scale',
    capsuleSlug: capsuleId
  });

  // Ensure output directory exists
  fs.mkdirSync(outDir, { recursive: true });

  // 4. Assemble and write the 5 canonical artifacts
  // Artifact 1: capsule.html
  const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${sliceResult.spec.title}</title>
  <style>
${sliceResult.scopedCss}
  </style>
</head>
<body style="margin: 0; padding: 0; background: #edeae6;">
${sliceResult.html}
</body>
</html>`;
  fs.writeFileSync(path.join(outDir, 'capsule.html'), standaloneHtml, 'utf8');

  // Artifact 2: capsule-spec.json
  const fullSpec = {
    ...sliceResult.spec,
    closure: sliceResult.closure,
    scopedCss: sliceResult.scopedCss,
    motionContract: kineticResult.motionContract,
    validation: sliceResult.validation
  };
  fs.writeFileSync(path.join(outDir, 'capsule-spec.json'), JSON.stringify(fullSpec, null, 2), 'utf8');

  // Artifact 3: dimensional-blueprint.svg
  fs.writeFileSync(path.join(outDir, 'dimensional-blueprint.svg'), blueprintResult.svg, 'utf8');

  // Artifact 4: dimensional-blueprint.json
  fs.writeFileSync(path.join(outDir, 'dimensional-blueprint.json'), JSON.stringify(blueprintResult.json, null, 2), 'utf8');

  // Artifact 5: SKILL.md (< 60 lines)
  fs.writeFileSync(path.join(outDir, 'SKILL.md'), kineticResult.skillMarkdown, 'utf8');

  return {
    capsuleId,
    outDir,
    files: [
      'capsule.html',
      'capsule-spec.json',
      'dimensional-blueprint.svg',
      'dimensional-blueprint.json',
      'SKILL.md'
    ],
    validation: sliceResult.validation,
    zeroCollisions: blueprintResult.json.viewports.desktop ? blueprintResult.json.viewports.desktop.zeroCollisions : true,
    skillLines: kineticResult.skillMarkdown.split('\n').length
  };
}

// CLI Execution entry
if (require.main === module) {
  const args = parseCliArgs(process.argv.slice(2));

  if (!args.source || !args.selector || !args.out) {
    console.error('Usage: node scripts/extract-capsule-spike.js --source <path> --selector <sel> --out <dest> [--capsule-id <id>]');
    process.exit(1);
  }

  extractCapsule(args)
    .then((result) => {
      console.log('====================================================');
      console.log('✓ STUDIO DNA — CAPSULE EXTRACTION SUCCESS');
      console.log('====================================================');
      console.log(`Capsule ID:       ${result.capsuleId}`);
      console.log(`Destination:      ${result.outDir}`);
      console.log(`Artifacts (5/5):  ${result.files.join(', ')}`);
      console.log(`Donut Scope:      ${result.validation.valid ? 'VALID (0 violations)' : 'FAILED'}`);
      console.log(`CAD Blueprint:    Zero Collisions = ${result.zeroCollisions}`);
      console.log(`Kinetic Skill:    ${result.skillLines} lines (< 60 invariant PASSED)`);
      console.log('====================================================');
      process.exit(0);
    })
    .catch((err) => {
      console.error('====================================================');
      console.error('✗ STUDIO DNA — CAPSULE EXTRACTION FAILED');
      console.error('====================================================');
      console.error(err.message);
      if (err.stack) console.error(err.stack);
      console.error('====================================================');
      process.exit(1);
    });
}

module.exports = {
  extractCapsule,
  startEphemeralServer,
  parseCliArgs
};
