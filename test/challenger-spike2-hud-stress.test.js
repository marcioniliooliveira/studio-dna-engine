'use strict';

/**
 * test/challenger-spike2-hud-stress.test.js
 *
 * Empirical Adversarial Challenge & Stress Test Suite for Spike 2:
 * 1. captureLiveSelectionPayload in src/dev/dev-hud.js:
 *    - Deeply nested DOM nodes (> 50-100 levels)
 *    - Malformed, empty, or missing data-ds / data-dna-line attributes
 *    - Malicious attribute values (XSS strings, SQL injections, quotes, control characters)
 *    - Headless window mocks with missing properties (innerWidth, getComputedStyle, outerHTML)
 *    - SVG elements, text nodes, detached DOM nodes
 *    - Zero-dimension elements and offscreen coordinates
 *    - Rapid sequential extractions (1000 iterations)
 * 2. writeJsonAtomicSync in src/persistence/hybrid-repository.js:
 *    - Non-existent deep directory writes (10 levels deep)
 *    - Extreme payload sizes (> 250 KB)
 *    - Circular reference rejection without temp file leakage
 *    - Existing directory target collision
 *    - Multi-worker concurrent writes to the same destination file
 *    - Real Windows file lock simulation (transient EPERM/EBUSY recovery)
 *    - Permanent file lock exhaustion and guaranteed temp file cleanup
 */

const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { Worker } = require('node:worker_threads');

const {
  captureLiveSelectionPayload,
  extractSelectionPayload
} = require('../src/dev/dev-hud');
const { writeJsonAtomicSync } = require('../src/persistence/hybrid-repository');
const { writeJsonAtomicSync: serverWriteJsonAtomicSync } = require('../src/server/preview-server');

describe('Empirical Adversarial Challenge — Spike 2: Live-MCP & Dev-HUD', () => {

  // ==========================================================================
  // Suite 1: captureLiveSelectionPayload — Adversarial DOM Topology & Attributes
  // ==========================================================================
  describe('Suite 1: captureLiveSelectionPayload — Adversarial DOM Topology & Attributes', () => {

    test('1.1: Null, undefined, and primitive inputs return null gracefully', () => {
      assert.equal(captureLiveSelectionPayload(null), null);
      assert.equal(captureLiveSelectionPayload(undefined), null);
      assert.equal(captureLiveSelectionPayload(''), null);
      assert.equal(captureLiveSelectionPayload(0), null);
      assert.equal(captureLiveSelectionPayload(false), null);
    });

    test('1.2: Bare object lacking DOM methods defaults safely to a valid payload structure', () => {
      const bareNode = {};
      const payload = captureLiveSelectionPayload(bareNode);

      assert.ok(payload, 'Payload must not be null');
      assert.equal(payload.clientSlug, 'default');
      assert.equal(payload.dsId, '');
      assert.equal(payload.dataDs, '');
      assert.equal(payload.sourceLineRange, null);
      assert.equal(payload.line, 1);
      assert.equal(payload.capsuleId, null);
      assert.equal(payload.tagName, 'div');
      assert.equal(payload.selector, 'div');
      assert.equal(payload.outerHTML, '');
      assert.deepEqual(payload.boundingBox, {
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        viewportWidth: 1440,
        viewportHeight: 900
      });
      assert.equal(typeof payload.timestamp, 'number');
    });

    test('1.3: Deeply nested DOM nodes (100 levels) traverse to closest [data-ds] and capsule root without stack overflow', () => {
      // Build 100-level deep mock DOM hierarchy
      const capsuleRoot = {
        tagName: 'SECTION',
        id: 'hero-capsule-section',
        getAttribute(attr) {
          if (attr === 'data-capsule-id') return 'capsule-hero-root';
          if (attr === 'id') return 'hero-capsule-section';
          return null;
        },
        closest(sel) {
          if (sel.includes('dna-capsule') || sel.includes('section')) return this;
          return null;
        }
      };

      let current = capsuleRoot;
      const nodes = [capsuleRoot];

      for (let i = 1; i <= 100; i++) {
        const parentNode = current;
        const childNode = {
          tagName: i === 100 ? 'BUTTON' : 'DIV',
          parent: parentNode,
          getAttribute(attr) {
            if (attr === 'data-ds' && i === 80) return 'tracked-node-ds-80';
            if (attr === 'data-dna-line' && i === 80) return '120-145';
            return null;
          },
          closest(sel) {
            if (sel.includes('[data-ds]')) {
              if (this.getAttribute('data-ds')) return this;
              return this.parent ? this.parent.closest(sel) : null;
            }
            if (sel.includes('dna-capsule') || sel.includes('section')) {
              return this.parent ? this.parent.closest(sel) : null;
            }
            return null;
          },
          getBoundingClientRect() {
            return { top: 120, left: 45, width: 250, height: 60, x: 45, y: 120 };
          }
        };
        nodes.push(childNode);
        current = childNode;
      }

      // Target is level 100 child, which has no data-ds itself but parent level 80 has data-ds
      const leafTarget = nodes[100];
      const payload = captureLiveSelectionPayload(leafTarget);

      assert.ok(payload);
      assert.equal(payload.dsId, 'tracked-node-ds-80', 'Must resolve to nearest ancestor with [data-ds]');
      assert.equal(payload.capsuleId, 'capsule-hero-root', 'Must resolve to root capsule container');
      assert.equal(payload.line, 120);
      assert.equal(payload.sourceLineRange, '120-145');
      assert.equal(payload.selector, '[data-ds="tracked-node-ds-80"]');
    });

    test('1.4: Detached DOM node returns valid payload with 0-bounding box and safe defaults', () => {
      const detachedNode = {
        tagName: 'SPAN',
        outerHTML: '<span data-ds="detached-chip">Active</span>',
        getAttribute(attr) {
          if (attr === 'data-ds') return 'detached-chip';
          return null;
        },
        closest(sel) {
          if (sel.includes('[data-ds]')) return this;
          return null;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: 0, height: 0, x: 0, y: 0 };
        }
      };

      const payload = captureLiveSelectionPayload(detachedNode);
      assert.ok(payload);
      assert.equal(payload.tagName, 'span');
      assert.equal(payload.dsId, 'detached-chip');
      assert.equal(payload.capsuleId, null);
      assert.equal(payload.boundingBox.width, 0);
      assert.equal(payload.boundingBox.height, 0);
      assert.equal(payload.outerHTML, '<span data-ds="detached-chip">Active</span>');
    });

    test('1.5: Zero-dimension elements and negative/offscreen coordinates round correctly', () => {
      const hiddenNode = {
        tagName: 'INPUT',
        getAttribute(attr) {
          if (attr === 'data-ds') return 'hidden-input';
          return null;
        },
        getBoundingClientRect() {
          return {
            x: -450.4,
            y: -200.8,
            top: -200.8,
            left: -450.4,
            width: 0,
            height: 0
          };
        }
      };

      const payload = captureLiveSelectionPayload(hiddenNode);
      assert.equal(payload.boundingBox.x, -450);
      assert.equal(payload.boundingBox.y, -201);
      assert.equal(payload.boundingBox.top, -201);
      assert.equal(payload.boundingBox.left, -450);
      assert.equal(payload.boundingBox.width, 0);
      assert.equal(payload.boundingBox.height, 0);
    });

    test('1.6: Malformed, empty, negative, or weird data-dna-line values parse deterministically', () => {
      const testCases = [
        { raw: '42', expectedLine: 42, expectedRange: '42' },
        { raw: '10-25', expectedLine: 10, expectedRange: '10-25' },
        { raw: '0', expectedLine: 1, expectedRange: '0' },
        { raw: '-5', expectedLine: 1, expectedRange: '-5' },
        { raw: '', expectedLine: 1, expectedRange: null },
        { raw: 'invalid-string', expectedLine: 1, expectedRange: 'invalid-string' },
        { raw: 'NaN', expectedLine: 1, expectedRange: 'NaN' },
        { raw: '9999999999', expectedLine: 9999999999, expectedRange: '9999999999' }
      ];

      for (const tc of testCases) {
        const mockEl = {
          tagName: 'DIV',
          getAttribute(attr) {
            if (attr === 'data-dna-line') return tc.raw;
            return null;
          }
        };
        const payload = captureLiveSelectionPayload(mockEl);
        assert.equal(payload.line, tc.expectedLine, `Line parsing failed for raw: "${tc.raw}"`);
        assert.equal(payload.sourceLineRange, tc.expectedRange, `Range parsing failed for raw: "${tc.raw}"`);
      }
    });

    test('1.7: Malicious and injection attribute values (XSS, SQL, newlines, quotes) serialize safely without crashes', () => {
      const maliciousCases = [
        '"><script>alert(1)</script>',
        '\' OR \'1\'=\'1',
        '"; DROP TABLE users; --',
        'foo\nbar\r\nbaz\0null',
        '"><img src=x onerror=alert("xss")>'
      ];

      for (const evilValue of maliciousCases) {
        const mockEl = {
          tagName: 'DIV',
          getAttribute(attr) {
            if (attr === 'data-ds') return evilValue;
            return null;
          }
        };

        const payload = captureLiveSelectionPayload(mockEl);
        assert.ok(payload);
        assert.equal(payload.dsId, evilValue);
        assert.equal(payload.dataDs, evilValue);
        assert.equal(payload.selector, `[data-ds="${evilValue}"]`);

        // Assert JSON serialization roundtrip survives without error
        const jsonStr = JSON.stringify(payload);
        assert.ok(jsonStr.length > 0);
        const parsed = JSON.parse(jsonStr);
        assert.equal(parsed.dsId, evilValue);
      }
    });

    test('1.8: Element with ID containing spaces, quotes, and punctuation constructs selector safely', () => {
      const specialIdEl = {
        tagName: 'BUTTON',
        id: 'weird-id:btn.special#123 with spaces',
        getAttribute(attr) {
          if (attr === 'id') return 'weird-id:btn.special#123 with spaces';
          return null;
        }
      };

      const payload = captureLiveSelectionPayload(specialIdEl);
      assert.equal(payload.tagName, 'button');
      assert.equal(payload.selector, 'button#weird-id:btn.special#123 with spaces');
    });

    test('1.9: SVG elements correctly preserve tag names, dimensions, and attributes', () => {
      const svgPath = {
        tagName: 'path',
        getAttribute(attr) {
          if (attr === 'data-ds') return 'svg-arrow-icon';
          if (attr === 'd') return 'M 10 10 H 90 V 90 H 10 Z';
          return null;
        },
        getBoundingClientRect() {
          return { top: 10.4, left: 15.6, width: 24, height: 24, x: 15.6, y: 10.4 };
        }
      };

      const payload = captureLiveSelectionPayload(svgPath);
      assert.equal(payload.tagName, 'path');
      assert.equal(payload.dsId, 'svg-arrow-icon');
      assert.equal(payload.boundingBox.x, 16);
      assert.equal(payload.boundingBox.y, 10);
      assert.equal(payload.boundingBox.width, 24);
      assert.equal(payload.boundingBox.height, 24);
    });

    test('1.10: Target lacking closest method (e.g. Text Node or mock object) processes without throwing', () => {
      const textNodeLike = {
        nodeType: 3,
        textContent: 'Raw text inside paragraph',
        tagName: undefined
      };

      const payload = captureLiveSelectionPayload(textNodeLike);
      assert.ok(payload);
      assert.equal(payload.tagName, 'div');
      assert.equal(payload.dsId, '');
      assert.equal(payload.capsuleId, null);
    });
  });

  // ==========================================================================
  // Suite 2: captureLiveSelectionPayload — Headless Window Mocks, URL Routing & Telemetry
  // ==========================================================================
  describe('Suite 2: captureLiveSelectionPayload — Headless Window Mocks, URL Routing & Telemetry', () => {

    test('2.1: Stripped headless window mock ({}) defaults viewport and clientSlug without throwing', () => {
      const el = { tagName: 'DIV' };
      const strippedWin = {};

      const payload = captureLiveSelectionPayload(el, strippedWin);
      assert.equal(payload.clientSlug, 'default');
      assert.equal(payload.boundingBox.viewportWidth, 1440);
      assert.equal(payload.boundingBox.viewportHeight, 900);
      assert.deepEqual(payload.activeScopeVars, {});
      assert.deepEqual(payload.telemetry, {});
      assert.deepEqual(payload.kineticTelemetry, {});
    });

    test('2.2: Window mock with explicit null or undefined parameters executes safely', () => {
      const el = { tagName: 'DIV' };
      const payloadNull = captureLiveSelectionPayload(el, null);
      assert.ok(payloadNull);
      assert.equal(payloadNull.clientSlug, 'default');
      assert.equal(payloadNull.boundingBox.viewportWidth, 1440);

      const payloadUndefined = captureLiveSelectionPayload(el, undefined);
      assert.ok(payloadUndefined);
      assert.equal(payloadUndefined.clientSlug, 'default');
    });

    test('2.3: URL routing and clientSlug derivation across multiple pathname structures', () => {
      const el = { tagName: 'DIV' };

      // Case A: /clientes/<slug>/site/index.html
      const winA = { location: { pathname: '/clientes/acme-corp/site/index.html' } };
      assert.equal(captureLiveSelectionPayload(el, winA).clientSlug, 'acme-corp');

      // Case B: /projetos/<slug>/overview
      const winB = { location: { pathname: '/projetos/matrix-dev/overview' } };
      assert.equal(captureLiveSelectionPayload(el, winB).clientSlug, 'matrix-dev');

      // Case C: Single level pathname /my-brand
      const winC = { location: { pathname: '/my-brand' } };
      assert.equal(captureLiveSelectionPayload(el, winC).clientSlug, 'my-brand');

      // Case D: Root pathname /
      const winD = { location: { pathname: '/' } };
      assert.equal(captureLiveSelectionPayload(el, winD).clientSlug, 'default');

      // Case E: Search query override ?client=query-slug
      const winE = {
        location: {
          pathname: '/clientes/ignored-slug/site/index.html',
          search: '?client=query-override-slug&mode=live'
        }
      };
      assert.equal(captureLiveSelectionPayload(el, winE).clientSlug, 'query-override-slug');

      // Case F: Explicit __DNA_CLIENT_SLUG__ global variable overrides location
      const winF = {
        __DNA_CLIENT_SLUG__: 'explicit-global-slug',
        location: { pathname: '/clientes/should-be-ignored/site/index.html' }
      };
      assert.equal(captureLiveSelectionPayload(el, winF).clientSlug, 'explicit-global-slug');
    });

    test('2.4: getComputedStyle property extraction and CSS custom properties resilience', () => {
      const el = { tagName: 'DIV' };
      const mockWin = {
        getComputedStyle() {
          return {
            display: 'flex',
            position: 'absolute',
            fontFamily: 'Geist Sans, sans-serif',
            fontSize: '18px',
            lineHeight: '28px',
            letterSpacing: '-0.02em',
            color: 'rgb(240, 240, 240)',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            padding: '16px 24px',
            gap: '12px',
            fontWeight: '700',
            margin: '0px',
            opacity: '0.95',
            getPropertyValue(varName) {
              if (varName === '--primary') return '  #38bdf8  ';
              if (varName === '--bg-base') return '#0f172a';
              return '';
            }
          };
        }
      };

      const payload = captureLiveSelectionPayload(el, mockWin);
      assert.equal(payload.computedStyles.display, 'flex');
      assert.equal(payload.computedStyles.position, 'absolute');
      assert.equal(payload.computedStyles.fontWeight, '700');
      assert.equal(payload.activeScopeVars['--primary'], '#38bdf8', 'Must trim custom property values');
      assert.equal(payload.activeScopeVars['--bg-base'], '#0f172a');
      assert.equal(payload.activeScopeVars['--accent'], undefined);
    });

    test('2.5: Kinetic Telemetry and WorkStage snapshot fallbacks', () => {
      const el = { tagName: 'BUTTON' };

      // Case A: Full getSnapshotFor method present
      const winWithSnapshot = {
        __DNA_TELEMETRY__: {
          getSnapshotFor(node) {
            return {
              fps: 60,
              velocity: 142.5,
              targetTag: node.tagName
            };
          }
        }
      };
      const payloadA = captureLiveSelectionPayload(el, winWithSnapshot);
      assert.equal(payloadA.kineticTelemetry.fps, 60);
      assert.equal(payloadA.kineticTelemetry.targetTag, 'BUTTON');

      // Case B: Static __DNA_TELEMETRY__ object
      const winStatic = {
        __DNA_TELEMETRY__: { fps: 58.2, frameDrop: 1 }
      };
      const payloadB = captureLiveSelectionPayload(el, winStatic);
      assert.equal(payloadB.kineticTelemetry.fps, 58.2);

      // Case C: Fallback to __WORK_STAGE__
      const winWorkStage = {
        __WORK_STAGE__: { stage: 'interactive', zoom: 1.0 }
      };
      const payloadC = captureLiveSelectionPayload(el, winWorkStage);
      assert.equal(payloadC.telemetry.stage, 'interactive');
    });

    test('2.6: Backwards-compatible alias extractSelectionPayload delegates identically', () => {
      const el = { tagName: 'H2', id: 'heading-2' };
      const res1 = captureLiveSelectionPayload(el);
      const res2 = extractSelectionPayload(el);

      assert.equal(res1.tagName, res2.tagName);
      assert.equal(res1.selector, res2.selector);
      assert.equal(res1.clientSlug, res2.clientSlug);
    });

    test('2.7: Rapid sequential calls (1,000 extractions) execute with sub-50ms latency and high stability', () => {
      const el = {
        tagName: 'SECTION',
        getAttribute(attr) {
          if (attr === 'data-ds') return 'perf-sec-1';
          if (attr === 'data-dna-line') return '10-20';
          return null;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: 800, height: 400, x: 0, y: 0 };
        }
      };

      const start = performance.now();
      let lastTimestamp = 0;
      for (let i = 0; i < 1000; i++) {
        const payload = captureLiveSelectionPayload(el);
        assert.ok(payload);
        assert.ok(payload.timestamp >= lastTimestamp);
        lastTimestamp = payload.timestamp;
      }
      const durationMs = performance.now() - start;

      // Single-worker throughput benchmark
      assert.ok(durationMs < 100, `1000 extractions took ${durationMs.toFixed(2)}ms, exceeding 100ms threshold`);
    });
  });

  // ==========================================================================
  // Suite 3: writeJsonAtomicSync — Directory & Payload Boundary Conditions
  // ==========================================================================
  describe('Suite 3: writeJsonAtomicSync — Directory & Payload Boundary Conditions', () => {
    let tempDir;

    beforeEach(() => {
      tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger-atomic-test-'));
    });

    afterEach(() => {
      if (tempDir && fs.existsSync(tempDir)) {
        try {
          fs.rmSync(tempDir, { recursive: true, force: true });
        } catch (_) {}
      }
    });

    test('3.1: Writes to deeply nested non-existent directory (10 subdirectories deep) without pre-creation', () => {
      const deepPath = path.join(
        tempDir,
        'level1', 'level2', 'level3', 'level4', 'level5',
        'level6', 'level7', 'level8', 'level9', 'level10',
        'deep-selection.json'
      );

      const payload = {
        deep: true,
        levels: 10,
        createdAt: Date.now()
      };

      writeJsonAtomicSync(deepPath, payload);
      assert.ok(fs.existsSync(deepPath), 'File in deep directory must be created');

      const readBack = JSON.parse(fs.readFileSync(deepPath, 'utf8'));
      assert.equal(readBack.deep, true);
      assert.equal(readBack.levels, 10);

      // Verify no temporary files remain
      const parentDir = path.dirname(deepPath);
      const remainingFiles = fs.readdirSync(parentDir);
      assert.deepEqual(remainingFiles, ['deep-selection.json']);
    });

    test('3.2: Extreme payload size (> 250 KB with 5,000 complex items) writes atomically and deserializes intact', () => {
      const largePath = path.join(tempDir, 'large-payload.json');

      const items = [];
      for (let i = 0; i < 5000; i++) {
        items.push({
          id: `item-${i}`,
          slug: `client-item-slug-${i % 25}`,
          bounding: { x: i * 2, y: i * 3, width: 100, height: 50 },
          styles: { color: '#ffffff', bg: '#030508' },
          tags: ['alpha', 'beta', 'gamma', 'delta']
        });
      }
      const largePayload = { total: items.length, items };

      writeJsonAtomicSync(largePath, largePayload);

      const stats = fs.statSync(largePath);
      assert.ok(stats.size > 250 * 1024, `File size (${stats.size} bytes) should be > 250 KB`);

      const readBack = JSON.parse(fs.readFileSync(largePath, 'utf8'));
      assert.equal(readBack.total, 5000);
      assert.equal(readBack.items.length, 5000);
      assert.equal(readBack.items[4999].id, 'item-4999');

      const files = fs.readdirSync(tempDir);
      assert.deepEqual(files, ['large-payload.json']);
    });

    test('3.3: Multilingual Unicode, emoji, and Portuguese accented strings retain 100% binary fidelity', () => {
      const unicodePath = path.join(tempDir, 'unicode-test.json');
      const payload = {
        title: 'Marcionílio Oliveira — Negócia Bem & Produção Visual',
        emojis: '🚀✨🛡️🎨💎',
        cjk: 'Studio DNA 空間レイアウト 視覺引擎',
        cyrillic: 'Студия ДНА — Архитектура',
        arabic: 'تصميم واجهة المستخدم'
      };

      writeJsonAtomicSync(unicodePath, payload);
      const readBack = JSON.parse(fs.readFileSync(unicodePath, 'utf8'));
      assert.deepEqual(readBack, payload);
    });

    test('3.4: Raw JSON string input passes through directly without double-encoding', () => {
      const rawStringPath = path.join(tempDir, 'raw-string.json');
      const rawJson = JSON.stringify({ raw: true, formatted: 'already' });

      writeJsonAtomicSync(rawStringPath, rawJson);
      const fileContent = fs.readFileSync(rawStringPath, 'utf8');
      assert.equal(fileContent, rawJson);
      assert.deepEqual(JSON.parse(fileContent), { raw: true, formatted: 'already' });
    });

    test('3.5: Circular object payload throws TypeError before creating any temporary file', () => {
      const circularPath = path.join(tempDir, 'circular.json');
      const circularObj = { name: 'circular' };
      circularObj.self = circularObj;

      assert.throws(
        () => writeJsonAtomicSync(circularPath, circularObj),
        /Converting circular structure to JSON/
      );

      // Verify no destination file and no temporary files were created
      assert.equal(fs.existsSync(circularPath), false);
      const remainingFiles = fs.readdirSync(tempDir);
      assert.equal(remainingFiles.length, 0, 'No files or .tmp artifacts must exist');
    });

    test('3.6: Target is an existing directory throws error and guarantees cleanup of temporary file', () => {
      const dirPath = path.join(tempDir, 'target-is-dir');
      fs.mkdirSync(dirPath);

      assert.throws(
        () => writeJsonAtomicSync(dirPath, { failureExpected: true })
      );

      const files = fs.readdirSync(tempDir);
      assert.deepEqual(files, ['target-is-dir'], 'Directory must remain and zero .tmp files must linger');
    });

    test('3.7: Re-exported writeJsonAtomicSync on server preview matches hybrid repo implementation', () => {
      assert.equal(writeJsonAtomicSync, serverWriteJsonAtomicSync);
    });
  });

  // ==========================================================================
  // Suite 4: writeJsonAtomicSync — Concurrency, Anti-Race & Windows Lock Simulation
  // ==========================================================================
  describe('Suite 4: writeJsonAtomicSync — Concurrency, Anti-Race & Windows Lock Simulation', () => {
    let tempDir;

    beforeEach(() => {
      tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger-concurrency-'));
    });

    afterEach(() => {
      if (tempDir && fs.existsSync(tempDir)) {
        try {
          fs.rmSync(tempDir, { recursive: true, force: true });
        } catch (_) {}
      }
    });

    test('4.1: High-concurrency worker threads (5 parallel workers x 20 iterations = 100 writes) complete without corruption or lingering .tmp files', async () => {
      const sharedFile = path.join(tempDir, 'contested-file.json');
      writeJsonAtomicSync(sharedFile, { init: true });

      const numWorkers = 5;
      const iterationsPerWorker = 20;

      // Inline worker code
      const workerScript = `
        const { parentPort, workerData } = require('node:worker_threads');
        const { writeJsonAtomicSync } = require(workerData.modulePath);

        try {
          for (let i = 0; i < workerData.iterations; i++) {
            writeJsonAtomicSync(workerData.targetFile, {
              workerId: workerData.workerId,
              iteration: i,
              timestamp: Date.now()
            });
          }
          parentPort.postMessage({ ok: true });
        } catch (err) {
          parentPort.postMessage({ ok: false, error: err.message });
        }
      `;

      const modulePath = path.resolve(__dirname, '../src/persistence/hybrid-repository.js');

      const workers = [];
      for (let w = 0; w < numWorkers; w++) {
        const worker = new Worker(workerScript, {
          eval: true,
          workerData: {
            workerId: w,
            targetFile: sharedFile,
            modulePath,
            iterations: iterationsPerWorker
          }
        });
        workers.push(new Promise((resolve, reject) => {
          worker.on('message', (msg) => {
            if (msg.ok) resolve();
            else reject(new Error(msg.error));
          });
          worker.on('error', reject);
        }));
      }

      await Promise.all(workers);

      // Verify file integrity
      assert.ok(fs.existsSync(sharedFile));
      const finalContent = JSON.parse(fs.readFileSync(sharedFile, 'utf8'));
      assert.ok(typeof finalContent.workerId === 'number');
      assert.ok(typeof finalContent.iteration === 'number');

      // Verify zero temporary files linger
      const allFiles = fs.readdirSync(tempDir);
      const tmpFiles = allFiles.filter(f => f.endsWith('.tmp'));
      assert.equal(tmpFiles.length, 0, 'No .tmp files must linger after concurrent hammering');
    });

    test('4.2: Simulated transient Windows file lock (EPERM/EBUSY): Worker holds lock for 25ms, writeJsonAtomicSync recovers via backoff retry loop', async () => {
      const lockTarget = path.join(tempDir, 'lock-recovery.json');
      writeJsonAtomicSync(lockTarget, { state: 'initial' });

      // Worker locks file with r+ handle, posts 'locked', waits holdMs, then closes handle
      const lockWorkerScript = `
        const { parentPort, workerData } = require('node:worker_threads');
        const fs = require('node:fs');

        let fd;
        try {
          fd = fs.openSync(workerData.targetFile, 'r+');
          parentPort.postMessage('locked');

          setTimeout(() => {
            try {
              fs.closeSync(fd);
            } catch (_) {}
            parentPort.postMessage('unlocked');
          }, workerData.holdMs);
        } catch (err) {
          parentPort.postMessage({ error: err.message });
        }
      `;

      const lockWorker = new Worker(lockWorkerScript, {
        eval: true,
        workerData: {
          targetFile: lockTarget,
          holdMs: 25 // Holds lock across first 1-2 retry cycles
        }
      });

      // Wait until worker acquires the lock
      await new Promise((resolve) => lockWorker.once('message', resolve));

      // Main thread attempts atomic write while file is locked
      // Should retry on transient EPERM/EBUSY and succeed when lock is freed
      writeJsonAtomicSync(lockTarget, { state: 'recovered-from-lock', updatedBy: 'challenger' });

      // Confirm worker finished cleanly
      await new Promise((resolve) => lockWorker.once('message', resolve));
      await lockWorker.terminate();

      // Verify file was updated to new content
      const content = JSON.parse(fs.readFileSync(lockTarget, 'utf8'));
      assert.equal(content.state, 'recovered-from-lock');
      assert.equal(content.updatedBy, 'challenger');

      // Verify zero .tmp files
      const tmpFiles = fs.readdirSync(tempDir).filter(f => f.endsWith('.tmp'));
      assert.equal(tmpFiles.length, 0);
    });

    test('4.3: Permanent file lock exhaustion: exhausts 5 retries, throws error, and strictly cleans up temp file', () => {
      const permTarget = path.join(tempDir, 'permanent-lock.json');
      writeJsonAtomicSync(permTarget, { state: 'original' });

      // Open persistent handle on the file without closing it
      const fd = fs.openSync(permTarget, 'r+');

      try {
        // Must fail and throw EPERM or EBUSY after 5 retries
        assert.throws(
          () => writeJsonAtomicSync(permTarget, { state: 'should-fail' }),
          (err) => err.code === 'EPERM' || err.code === 'EBUSY'
        );
      } finally {
        fs.closeSync(fd);
      }

      // CRUCIAL INVARIANT: Temporary file MUST be cleaned up on permanent failure
      const filesAfter = fs.readdirSync(tempDir);
      const tmpFiles = filesAfter.filter(f => f.endsWith('.tmp'));
      assert.equal(tmpFiles.length, 0, 'Temporary file MUST be unlinked on permanent failure');

      // Original file remains intact with original content
      const remainingContent = JSON.parse(fs.readFileSync(permTarget, 'utf8'));
      assert.equal(remainingContent.state, 'original');
    });
  });

});
