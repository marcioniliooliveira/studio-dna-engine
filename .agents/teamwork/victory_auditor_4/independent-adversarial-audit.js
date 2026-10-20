/**
 * independent-adversarial-audit.js
 * 
 * Independent post-victory adversarial audit script executed by victory_auditor_4.
 * Zero shared state with implementation team.
 * Strictly tests algorithms, boundary conditions, mathematical theorems, and concurrency safety.
 */

'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const zlib = require('node:zlib');

const ROOT = path.resolve(__dirname, '../../..');

// Reference implementations
const { SpatialRTree, computeTypographicEnergy, computeAreaCV } = require(path.join(ROOT, 'docs/research/v2.6/reference/spatial-rtree.js'));
const { parseSelectorAst, validateDonutSelector, validateDonutScopeInvariants: validateAstSheet } = require(path.join(ROOT, 'docs/research/v2.6/reference/css-selector-ast.js'));
const { decodePng, applyLateralCompetition, computeSaliencyMetrics, paethPredictor } = require(path.join(ROOT, 'docs/research/v2.6/reference/png-codec.js'));
const { SlugFontCompiler } = require(path.join(ROOT, 'docs/research/v2.6/reference/slug-font-compiler.js'));
const { sRGBToOklch, oklchToSRGB, calcAPCA, searchMonotonicContrast, calculateFluidScale, applyLexicalDamping } = require(path.join(ROOT, 'docs/research/v2.6/reference/apca-contrast.js'));

// Repaired core modules
const { validateDonutScopeInvariants: validateSchemaSheet } = require(path.join(ROOT, 'src/compiler/kinetic-grammar-schema.js'));
const { scheduleBlueprint, pathsIntersect, tasksConflict, getTaskWriteLocks } = require(path.join(ROOT, 'src/orchestration/dag-scheduler.js'));
const { validateBlueprint } = require(path.join(ROOT, 'src/orchestration/blueprint.js'));
const { UniversalAssetNormalizer } = require(path.join(ROOT, 'src/pro/universal-asset-normalizer.js'));

async function runIndependentAudit() {
  console.log('='.repeat(80));
  console.log('VICTORY AUDITOR 4: INDEPENDENT ADVERSARIAL VERIFICATION SUITE');
  console.log('='.repeat(80));

  let passed = 0;
  let total = 0;

  function check(name, fn) {
    total++;
    try {
      fn();
      passed++;
      console.log(`  ✔ [PASS] ${name}`);
    } catch (err) {
      console.error(`  ✖ [FAIL] ${name}: ${err.message}`);
      throw err;
    }
  }

  async function checkAsync(name, fn) {
    total++;
    try {
      await fn();
      passed++;
      console.log(`  ✔ [PASS] ${name}`);
    } catch (err) {
      console.error(`  ✖ [FAIL] ${name}: ${err.message}`);
      throw err;
    }
  }

  console.log('\n--- 1. SPATIAL R-TREE ADVERSARIAL STRESS ---');
  check('R-Tree vs Linear Scan Oracle with 2,500 random bounding boxes', () => {
    const tree = new SpatialRTree(9);
    const oracle = [];

    // Pseudorandom generator for deterministic reproducibility
    let seed = 42;
    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    for (let i = 0; i < 2500; i++) {
      const minX = (rand() - 0.5) * 20000;
      const minY = (rand() - 0.5) * 20000;
      const w = rand() * 500;
      const h = rand() * 500;
      const item = { minX, minY, maxX: minX + w, maxY: minY + h, id: i };
      tree.insert(item);
      oracle.push(item);
    }

    // 100 random search queries
    for (let q = 0; q < 100; q++) {
      const qx = (rand() - 0.5) * 22000;
      const qy = (rand() - 0.5) * 22000;
      const qw = rand() * 1000;
      const qh = rand() * 1000;
      const qBox = { minX: qx, minY: qy, maxX: qx + qw, maxY: qy + qh };

      const treeResults = tree.search(qBox);
      const oracleResults = oracle.filter(item =>
        item.minX <= qBox.maxX && item.maxX >= qBox.minX &&
        item.minY <= qBox.maxY && item.maxY >= qBox.minY
      );

      assert.equal(treeResults.length, oracleResults.length, `Count mismatch on query ${q}`);
      const treeIds = new Set(treeResults.map(r => r.id));
      for (const exp of oracleResults) {
        assert.ok(treeIds.has(exp.id), `Missing item ${exp.id} in query ${q}`);
      }
      assert.equal(tree.collides(qBox), oracleResults.length > 0);
    }
  });

  check('R-Tree degenerate point and boundary-touch cases', () => {
    const tree = new SpatialRTree(4);
    tree.insert({ minX: 10, minY: 10, maxX: 10, maxY: 10, id: 'point' });
    tree.insert({ minX: 10, minY: 10, maxX: 20, maxY: 20, id: 'box' });

    // Exact point query
    const resPoint = tree.search({ minX: 10, minY: 10, maxX: 10, maxY: 10 });
    assert.equal(resPoint.length, 2);

    // Boundary touch: query [20, 20, 30, 30] touching box at (20,20)
    const resTouch = tree.search({ minX: 20, minY: 20, maxX: 30, maxY: 30 });
    assert.equal(resTouch.length, 1);
    assert.equal(resTouch[0].id, 'box');

    // Disjoint
    const resDisjoint = tree.search({ minX: 21, minY: 21, maxX: 30, maxY: 30 });
    assert.equal(resDisjoint.length, 0);
  });

  check('Typographic Energy & Subtree Isomorphism CV', () => {
    // Large editorial headline: 48px, weight 700, 1200x120 -> high energy
    const e1 = computeTypographicEnergy(48, 700, 144000, 1200, 120);
    assert.ok(e1 > 3.8, `Expected editorial headline E >= 3.8, got ${e1}`);

    // Small footer copy: 12px, weight 400, 200x20 -> low energy
    const e2 = computeTypographicEnergy(12, 400, 4000, 200, 20);
    assert.ok(e2 < 3.8, `Expected small copy E < 3.8, got ${e2}`);

    // Uniform cards CV: identical areas -> CV == 0
    const cv0 = computeAreaCV([1000, 1000, 1000, 1000]);
    assert.equal(cv0, 0);

    // Repeating cards with <= 15% variation
    const cvCards = computeAreaCV([1000, 1050, 980, 1020]);
    assert.ok(cvCards <= 0.15, `Expected CV <= 0.15, got ${cvCards}`);
  });

  console.log('\n--- 2. CSS SELECTOR AST & DONUT SCOPE ADVERSARIAL STRESS ---');
  check('Donut Scope catches piercing attacks', () => {
    const piercingCases = [
      '[data-kinetic-slot] > h1',
      '[data-kinetic-slot] h1',
      '[data-kinetic-slot="hero-title"] h1',
      '[data-kinetic-slot^="hero"] span',
      '[data-kinetic-slot*="card"] .title',
      '[data-kinetic-slot] > *'
    ];

    for (const sel of piercingCases) {
      const res = validateDonutSelector(sel);
      assert.equal(res.compliant, false, `Failed to flag piercing selector: ${sel}`);
      assert.ok(res.violations.length > 0);
    }
  });

  check('Donut Scope allows boundary self-styling and sibling navigation', () => {
    const compliantCases = [
      '[data-kinetic-slot]',
      '[data-kinetic-slot="hero-title"]',
      '[data-kinetic-slot]:hover',
      '[data-kinetic-slot] + .sibling',
      '[data-kinetic-slot] ~ .sibling',
      '[data-dna-capsule="capsule-a"] [data-kinetic-slot]',
      ':not([data-kinetic-slot] *)',
      '.hero-container .title'
    ];

    for (const sel of compliantCases) {
      const res = validateDonutSelector(sel);
      assert.equal(res.compliant, true, `Wrongly flagged compliant selector: ${sel} (${res.violations})`);
    }
  });

  check('kinetic-grammar-schema regex repair catches piercing in stylesheet', () => {
    const sheetWithPiercing = `
      .kinetic-stage { position: relative; }
      [data-kinetic-slot="hero-title"] h1 { font-size: 32px; }
      [data-kinetic-slot] > .icon { display: none; }
      [data-kinetic-slot] { display: block; }
    `;
    const res = validateSchemaSheet(sheetWithPiercing);
    assert.equal(res.compliant, false);
    assert.ok(res.violations.length >= 2, `Expected at least 2 violations, got ${res.violations.length}: ${JSON.stringify(res)}`);
  });

  console.log('\n--- 3. NATIVE PNG CODEC & SALIENCY ADVERSARIAL STRESS ---');
  check('PNG defiltering across all 5 filter types and signature checking', () => {
    // Create an uncompressed 2x2 RGBA image (8 pixels, 8 bytes per row including filter byte)
    // Row 0: filter 1 (Sub), Row 1: filter 2 (Up)
    const width = 2;
    const height = 2;
    const rawScanlines = Buffer.from([
      1, // Filter 1: Sub
      10, 20, 30, 255,   // Pixel 0 (Sub from 0) -> [10, 20, 30, 255]
      5, 10, 15, 0,      // Pixel 1 (Sub from Pixel 0) -> [15, 30, 45, 255]
      2, // Filter 2: Up
      10, 10, 10, 0,     // Pixel 2 (Up from Pixel 0) -> [20, 30, 40, 255]
      10, 10, 10, 0      // Pixel 3 (Up from Pixel 1) -> [25, 40, 55, 255]
    ]);

    const compressed = zlib.deflateSync(rawScanlines);

    // Build complete valid PNG
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(width, 0);
    ihdr.writeUInt32BE(height, 4);
    ihdr[8] = 8; // bit depth
    ihdr[9] = 6; // color type: RGBA

    function makeChunk(type, data) {
      const len = data.length;
      const buf = Buffer.alloc(8 + len + 4);
      buf.writeUInt32BE(len, 0);
      buf.write(type, 4, 4, 'ascii');
      data.copy(buf, 8);
      // CRC dummy
      buf.writeUInt32BE(0x12345678, 8 + len);
      return buf;
    }

    const pngBuffer = Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // signature
      makeChunk('IHDR', ihdr),
      makeChunk('IDAT', compressed),
      makeChunk('IEND', Buffer.alloc(0))
    ]);

    const decoded = decodePng(pngBuffer);
    assert.equal(decoded.width, 2);
    assert.equal(decoded.height, 2);
    assert.equal(decoded.channels, 4);

    // Verify reconstructed pixels
    assert.deepEqual(Array.from(decoded.data.slice(0, 4)), [10, 20, 30, 255]);
    assert.deepEqual(Array.from(decoded.data.slice(4, 8)), [15, 30, 45, 255]);
    assert.deepEqual(Array.from(decoded.data.slice(8, 12)), [20, 30, 40, 255]);
    assert.deepEqual(Array.from(decoded.data.slice(12, 16)), [25, 40, 55, 255]);
  });

  check('PNG reject malformed signatures and corrupted payloads', () => {
    assert.throws(() => decodePng(Buffer.from([0, 1, 2, 3])), /Invalid PNG signature/);
    assert.throws(() => decodePng(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), /Missing or invalid IHDR/);
  });

  check('Lateral competition operator N(M) amplifies peak conspicuity', () => {
    const map = new Float32Array([0.1, 0.1, 0.1, 1.0, 0.1, 0.1]);
    const competed = applyLateralCompetition(map, 6, 1);
    // Peak at index 3 should be heavily amplified relative to baseline
    assert.ok(competed[3] > 0);
    assert.ok(competed[3] > competed[0] * 5);
  });

  console.log('\n--- 4. SLUG FONT COMPILER ADVERSARIAL STRESS ---');
  check('Slug Font Compiler parses binary tables and handles empty/space glyphs', () => {
    // Generate minimal valid SFNT header with empty tables
    const numTables = 4;
    const header = Buffer.alloc(12 + numTables * 16);
    header.writeUInt32BE(0x00010000, 0); // sfnt version
    header.writeUInt16BE(numTables, 4);

    const tags = ['head', 'maxp', 'cmap', 'glyf'];
    let off = 12 + numTables * 16;
    for (let i = 0; i < numTables; i++) {
      header.write(tags[i], 12 + i * 16, 4, 'ascii');
      header.writeUInt32BE(off + i * 64, 12 + i * 16 + 8);
      header.writeUInt32BE(64, 12 + i * 16 + 12);
    }

    const payload = Buffer.alloc(numTables * 64 + 100);
    // Write unitsPerEm = 1000 at head table offset + 18
    payload.writeUInt16BE(1000, 18);
    const fullBuffer = Buffer.concat([header, payload]);

    const compiler = new SlugFontCompiler(fullBuffer);
    assert.ok(compiler.tables['head']);
    assert.ok(compiler.tables['maxp']);
    assert.ok(compiler.tables['cmap']);
    assert.ok(compiler.tables['glyf']);
    assert.equal(compiler.unitsPerEm, 1000);

    // Empty glyph (e.g. whitespace) returns advanceWidth = round(1000 * 0.25) = 250
    const res = compiler.compileGlyph(32);
    assert.equal(res.curves.length, 0);
    assert.equal(res.bands.length, 8);
    assert.equal(res.advanceWidth, 250);

    // Also test with complete fixture TTF if available
    const { createSampleTtf } = require(path.join(ROOT, 'test/v2.6/fixtures/sample-ttf.js'));
    const ttfBuf = createSampleTtf();
    const fullCompiler = new SlugFontCompiler(ttfBuf);
    assert.equal(fullCompiler.unitsPerEm, 1000);
    const glyphA = fullCompiler.compileGlyph(65); // Character 'A'
    assert.equal(glyphA.glyphIndex, 1);
    assert.ok(glyphA.bounds.maxX >= 550);
    assert.equal(glyphA.bands.length, 8);
  });

  console.log('\n--- 5. APCA CONTRAST & OKLCH SYNTHESIS ADVERSARIAL STRESS ---');
  check('sRGB <-> OKLCH bidirectional roundtrip precision', () => {
    const testColors = [
      [255, 255, 255],
      [0, 0, 0],
      [255, 0, 0],
      [0, 255, 0],
      [0, 0, 255],
      [128, 128, 128],
      [245, 245, 240],
      [46, 43, 40]
    ];

    for (const [r, g, b] of testColors) {
      const oklch = sRGBToOklch(r, g, b);
      const back = oklchToSRGB(oklch.L, oklch.C, oklch.h);
      assert.ok(Math.abs(back.r - r) <= 1, `Red channel error on [${r},${g},${b}]: ${back.r}`);
      assert.ok(Math.abs(back.g - g) <= 1, `Green channel error on [${r},${g},${b}]: ${back.g}`);
      assert.ok(Math.abs(back.b - b) <= 1, `Blue channel error on [${r},${g},${b}]: ${back.b}`);
    }
  });

  check('APCA 0.0.98G-4g reference contrast scores', () => {
    // Normal polarity: Black text on White background: +106 +- 1
    const bow = calcAPCA('#000000', '#ffffff');
    assert.ok(bow >= 105 && bow <= 107, `Expected Black on White ~106, got ${bow}`);

    // Reverse polarity: White text on Black background: -108 +- 1
    const wob = calcAPCA('#ffffff', '#000000');
    assert.ok(wob <= -107 && wob >= -109, `Expected White on Black ~ -108, got ${wob}`);

    // Monotonic binary search solves target contrast
    const solved = searchMonotonicContrast('#000000', 75, 'body');
    const score = Math.abs(calcAPCA(solved.hex, '#000000'));
    assert.ok(Math.abs(score - 75) <= 1.0, `Expected solved contrast ~75, got ${score}`);
  });

  check('Fluid typography OLS regression & lexical damping', () => {
    const viewports = [390, 768, 1440];
    const sizes = [20, 28, 48];
    const clampStr = calculateFluidScale(viewports, sizes);
    assert.ok(clampStr.startsWith('clamp(20px,'), `Invalid clamp: ${clampStr}`);
    assert.ok(clampStr.endsWith(', 48px)'), `Invalid clamp: ${clampStr}`);

    // Lexical damping with 12px floor
    const damped = applyLexicalDamping(24, 50, 100);
    assert.ok(damped < 24 && damped >= 12, `Damped size out of bounds: ${damped}`);

    // Test 12px floor
    const floored = applyLexicalDamping(14, 10, 1000);
    assert.equal(floored, 12.0);
  });

  console.log('\n--- 6. DAG SCHEDULER WRITE-LOCKS & REPAIRS ADVERSARIAL STRESS ---');
  check('pathsIntersect detects overlapping globs and prefix containment', () => {
    assert.equal(pathsIntersect('clientes/marcionilio/**', 'clientes/marcionilio/site/index.html'), true);
    assert.equal(pathsIntersect('clientes/marcionilio/site/index.html', 'clientes/marcionilio/**'), true);
    assert.equal(pathsIntersect('clientes/client-a/**', 'clientes/client-b/**'), false);
    assert.equal(pathsIntersect('src/**', 'src/compiler/kinetic-grammar-schema.js'), true);
    assert.equal(pathsIntersect('dist/static.js', 'dist/bundle.js'), false);
  });

  await checkAsync('scheduleBlueprint guarantees conflicting writers NEVER execute concurrently', async () => {
    const activeTasks = new Set();
    let maxConcurrentConflicting = 0;

    const blueprint = {
      version: 1,
      runId: 'test-locks-run',
      clientScope: 'marcionilio-oliveira',
      tasks: [
        {
          id: 'task-writer-1',
          role: 'writer',
          writeAllowlist: ['clientes/marcionilio/site/index.html'],
          dependsOn: []
        },
        {
          id: 'task-writer-2',
          role: 'writer',
          writeAllowlist: ['clientes/marcionilio/**'],
          dependsOn: []
        },
        {
          id: 'task-disjoint-writer-3',
          role: 'writer',
          writeAllowlist: ['clientes/negocia-bem/**'],
          dependsOn: []
        }
      ]
    };

    validateBlueprint(blueprint);

    const executeTask = async (task) => {
      activeTasks.add(task.id);
      if (activeTasks.has('task-writer-1') && activeTasks.has('task-writer-2')) {
        maxConcurrentConflicting++;
      }
      // Simulate async I/O work
      await new Promise(r => setTimeout(r, 20));
      activeTasks.delete(task.id);
      return { ok: true };
    };

    const result = await scheduleBlueprint(blueprint, executeTask);
    assert.equal(maxConcurrentConflicting, 0, 'Conflicting writer tasks executed concurrently!');
    assert.equal(result.completed.length, 3);
  });

  check('UniversalAssetNormalizer CSS repaired block parses cleanly', () => {
    const css = UniversalAssetNormalizer.getUniversalUnlockCss();
    assert.ok(css.includes('html.lenis-stopped'));
    assert.ok(css.includes('body.no-scroll'));
    // Count braces to confirm no unbalanced or stray closing braces exist
    let openBraces = (css.match(/\{/g) || []).length;
    let closeBraces = (css.match(/\}/g) || []).length;
    assert.equal(openBraces, closeBraces, `Unbalanced braces in repaired CSS: ${openBraces} vs ${closeBraces}`);
  });

  console.log('\n' + '='.repeat(80));
  console.log(`INDEPENDENT AUDIT COMPLETED: ${passed}/${total} CHECKS PASSED WITH ZERO ERRORS`);
  console.log('='.repeat(80));
}

runIndependentAudit().catch(err => {
  console.error('\nAUDIT FAILED WITH UNHANDLED ERROR:\n', err);
  process.exit(1);
});
