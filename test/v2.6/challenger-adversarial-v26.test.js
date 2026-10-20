/**
 * test/v2.6/challenger-adversarial-v26.test.js
 * 
 * Studio DNA PRO v2.6 — Empirical Challenger Adversarial Test Suite
 * Archetype: EMPIRICAL CHALLENGER (critic, specialist)
 * Role: Adversarial Stress-Testing & Verification Oracle
 * 
 * Target Systems:
 * 1. Pure JS 2D R-Tree (docs/research/v2.6/reference/spatial-rtree.js):
 *    - 1,500+ random bounding boxes vs Ground-Truth Linear Scan Oracle
 *    - Degenerate points (x1=x2, y1=y2) and edge/corner touching boundaries
 *    - Extreme coordinates ([-10^8, +10^8]) and capacity/deep tree splits (M=4)
 * 2. Donut Scope Selector AST & Schema (css-selector-ast.js & kinetic-grammar-schema.js):
 *    - Complex descendant and combinator attacks: [data-kinetic-slot] > *, [data-kinetic-slot] h1.title, :is([data-kinetic-slot]) h1
 *    - Non-piercing sibling combinators: [data-kinetic-slot="x"] + div, [data-kinetic-slot] ~ p
 *    - Valid self-styling false-positive audit: [data-kinetic-slot], [data-kinetic-slot][data-slot-type="hero"], pseudo-classes/elements
 * 3. DAG Scheduler Write-Locks & Concurrency (dag-scheduler.js & blueprint.js):
 *    - Conflicting write paths: glob containment ('a/b/**' vs 'a/b/c.json', 'dir/**' vs 'dir/sub/**'), exact match, backslash normalization
 *    - Disjoint writers concurrency proof: ('a/**' vs 'b/**') execute in parallel
 *    - Read-only tasks concurrency alongside writer tasks
 *    - 12-task adversarial DAG concurrent execution invariant enforcement
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

// 1. Target imports
const { SpatialRTree } = require('../../docs/research/v2.6/reference/spatial-rtree');
const { parseSelectorAst, validateDonutSelector, validateDonutScopeInvariants: validateAstSheet } = require('../../docs/research/v2.6/reference/css-selector-ast');
const { validateDonutScopeInvariants: validateSchemaSheet } = require('../../src/compiler/kinetic-grammar-schema');
const { scheduleBlueprint, pathsIntersect, tasksConflict, getTaskWriteLocks } = require('../../src/orchestration/dag-scheduler');
const { validateBlueprint } = require('../../src/orchestration/blueprint');

// Deterministic PRNG for reproducible fuzzing (Mulberry32)
function createPrng(seed = 133742) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Ground truth intersection function
function boxIntersects(a, b) {
  return (
    a.minX <= b.maxX &&
    a.maxX >= b.minX &&
    a.minY <= b.maxY &&
    a.maxY >= b.minY
  );
}

describe('Challenger Adversarial Stress Suite: Studio DNA PRO v2.6', () => {

  // ==========================================================================
  // CHALLENGE 1: Pure JS 2D R-Tree Fuzzing & Oracle Verification
  // ==========================================================================
  describe('Challenge 1: Pure JS 2D R-Tree vs Linear Scan Oracle', () => {

    test('C1.1: 1,500 random bounding boxes across extreme coordinates match brute-force linear scan 100%', () => {
      const prng = createPrng(42);
      const tree = new SpatialRTree(9);
      const items = [];
      const COUNT = 1500;

      for (let i = 0; i < COUNT; i++) {
        // Range: [-1,000,000, +1,000,000]
        const x1 = Math.floor(prng() * 2000000 - 1000000);
        const y1 = Math.floor(prng() * 2000000 - 1000000);
        const w = Math.floor(prng() * 10000);
        const h = Math.floor(prng() * 10000);
        const item = {
          minX: x1,
          minY: y1,
          maxX: x1 + w,
          maxY: y1 + h,
          id: `box-${i}`
        };
        items.push(item);
        tree.insert(item);
      }

      assert.equal(tree.all().length, COUNT, 'All 1,500 items must be indexed in tree');

      // Execute 150 diverse adversarial search queries
      for (let q = 0; q < 150; q++) {
        let query;
        if (q < 50) {
          // Hits existing item with small expansion
          const target = items[Math.floor(prng() * items.length)];
          query = {
            minX: target.minX - 50,
            minY: target.minY - 50,
            maxX: target.maxX + 50,
            maxY: target.maxY + 50
          };
        } else if (q < 100) {
          // Random query anywhere in the space
          const qx = Math.floor(prng() * 2000000 - 1000000);
          const qy = Math.floor(prng() * 2000000 - 1000000);
          query = {
            minX: qx,
            minY: qy,
            maxX: qx + Math.floor(prng() * 50000),
            maxY: qy + Math.floor(prng() * 50000)
          };
        } else if (q < 125) {
          // Guaranteed disjoint query (far out-of-bounds)
          query = {
            minX: 5000000,
            minY: 5000000,
            maxX: 6000000,
            maxY: 6000000
          };
        } else {
          // Huge query covering massive area
          query = {
            minX: -500000,
            minY: -500000,
            maxX: 500000,
            maxY: 500000
          };
        }

        const treeHits = tree.search(query).map(x => x.id).sort();
        const oracleHits = items.filter(x => boxIntersects(x, query)).map(x => x.id).sort();

        assert.equal(
          treeHits.length,
          oracleHits.length,
          `Query ${q} hit count mismatch: tree=${treeHits.length}, oracle=${oracleHits.length}`
        );
        assert.deepEqual(
          treeHits,
          oracleHits,
          `Query ${q} returned different items than brute force oracle`
        );
        assert.equal(
          tree.collides(query),
          oracleHits.length > 0,
          `Query ${q} collides() mismatch`
        );
      }
    });

    test('C1.2: Degenerate point bounding boxes (x1=x2, y1=y2) index and query with zero spatial loss', () => {
      const tree = new SpatialRTree(9);
      const points = [
        { minX: 0, minY: 0, maxX: 0, maxY: 0, id: 'origin-1' },
        { minX: 0, minY: 0, maxX: 0, maxY: 0, id: 'origin-2' }, // Coincident point
        { minX: 100, minY: 100, maxX: 100, maxY: 100, id: 'pt-100' },
        { minX: -500, minY: 300, maxX: -500, maxY: 300, id: 'pt-neg' },
        { minX: 1000000, minY: -1000000, maxX: 1000000, maxY: -1000000, id: 'pt-far' }
      ];

      for (const pt of points) tree.insert(pt);

      // Point query exactly on origin
      const hitOrigin = tree.search({ minX: 0, minY: 0, maxX: 0, maxY: 0 }).map(x => x.id).sort();
      assert.deepEqual(hitOrigin, ['origin-1', 'origin-2'], 'Exact point query must return both coincident points');

      // Infinitesimal offset query should miss origin
      const missOrigin = tree.search({ minX: 0.0001, minY: 0.0001, maxX: 0.0001, maxY: 0.0001 });
      assert.equal(missOrigin.length, 0, 'Offset query must not match origin');

      // Envelope containing (100, 100) and origin
      const envelope = tree.search({ minX: -10, minY: -10, maxX: 150, maxY: 150 }).map(x => x.id).sort();
      assert.deepEqual(envelope, ['origin-1', 'origin-2', 'pt-100']);
    });

    test('C1.3: Edge-touching and corner-touching boundary intervals evaluate true per Equation 22', () => {
      const tree = new SpatialRTree(9);
      // 4 adjacent 10x10 squares sharing edges and center corner at (10, 10)
      const a = { minX: 0, minY: 0, maxX: 10, maxY: 10, id: 'quad-SW' };
      const b = { minX: 10, minY: 0, maxX: 20, maxY: 10, id: 'quad-SE' };
      const c = { minX: 0, minY: 10, maxX: 10, maxY: 20, id: 'quad-NW' };
      const d = { minX: 10, minY: 10, maxX: 20, maxY: 20, id: 'quad-NE' };

      tree.insert(a);
      tree.insert(b);
      tree.insert(c);
      tree.insert(d);

      // Edge touch on x=10 between SW and SE
      const edgeQuery = { minX: 10, minY: 2, maxX: 10, maxY: 8 };
      const edgeHits = tree.search(edgeQuery).map(x => x.id).sort();
      assert.deepEqual(edgeHits, ['quad-SE', 'quad-SW'], 'Edge touch must intersect both abutting quads');

      // Exact corner point touch at (10, 10) touches all 4 quads
      const cornerQuery = { minX: 10, minY: 10, maxX: 10, maxY: 10 };
      const cornerHits = tree.search(cornerQuery).map(x => x.id).sort();
      assert.deepEqual(cornerHits, ['quad-NE', 'quad-NW', 'quad-SE', 'quad-SW'], 'Corner touch must intersect all 4 quads');

      // Disjoint query just 0.001 units away
      const disjointQuery = { minX: 20.001, minY: 0, maxX: 30, maxY: 10 };
      assert.equal(tree.collides(disjointQuery), false, 'Disjoint query must not collide');
    });

    test('C1.4: High-depth split stress with minimum capacity (maxEntries = 4) preserves invariant completeness', () => {
      const tree = new SpatialRTree(4); // Forces maximum split frequency
      const COUNT = 300;
      const items = [];

      for (let i = 0; i < COUNT; i++) {
        const item = { minX: i * 10, minY: i * 5, maxX: i * 10 + 8, maxY: i * 5 + 4, id: `diag-${i}` };
        items.push(item);
        tree.insert(item);
      }

      assert.equal(tree.all().length, COUNT);

      // Query multiple random slices
      for (let k = 0; k < 50; k += 5) {
        const query = { minX: k * 10, minY: k * 5, maxX: (k + 15) * 10, maxY: (k + 15) * 5 };
        const treeHits = tree.search(query).map(x => x.id).sort();
        const oracleHits = items.filter(x => boxIntersects(x, query)).map(x => x.id).sort();
        assert.deepEqual(treeHits, oracleHits);
      }
    });

    test('C1.5: Extreme coordinate bounds ([-10^8, +10^8]) survive without floating-point overflow', () => {
      const tree = new SpatialRTree(9);
      const farNeg = { minX: -100000000, minY: -100000000, maxX: -99999990, maxY: -99999990, id: 'far-neg' };
      const farPos = { minX: 99999990, minY: 99999990, maxX: 100000000, maxY: 100000000, id: 'far-pos' };

      tree.insert(farNeg);
      tree.insert(farPos);

      assert.equal(tree.collides(farNeg), true);
      assert.equal(tree.collides(farPos), true);
      assert.equal(tree.collides({ minX: -10, minY: -10, maxX: 10, maxY: 10 }), false);
    });

    test('C1.6: 1-dimensional degenerate line segments (horizontal/vertical zero-thickness) match oracle', () => {
      const tree = new SpatialRTree(9);
      const items = [
        { minX: 0, minY: 10, maxX: 100, maxY: 10, id: 'h-line-1' }, // Horizontal line y=10
        { minX: 0, minY: 20, maxX: 100, maxY: 20, id: 'h-line-2' }, // Horizontal line y=20
        { minX: 50, minY: 0, maxX: 50, maxY: 100, id: 'v-line-1' }, // Vertical line x=50
        { minX: 0, minY: 0, maxX: 0, maxY: 100, id: 'v-line-origin' }
      ];
      for (const item of items) tree.insert(item);

      // Query cross-cutting vertical line 1
      const qCross = { minX: 45, minY: 15, maxX: 55, maxY: 25 };
      const hits = tree.search(qCross).map(x => x.id).sort();
      // Intersects h-line-2 (y=20, x in [45, 55]) and v-line-1 (x=50, y in [15, 25])
      assert.deepEqual(hits, ['h-line-2', 'v-line-1']);
    });

    test('C1.7: Bulk load(items) with 2,000 items preserves query parity against sequential insert', () => {
      const prng = createPrng(999);
      const bulkTree = new SpatialRTree(9);
      const seqTree = new SpatialRTree(9);
      const items = [];

      for (let i = 0; i < 2000; i++) {
        const x = Math.floor(prng() * 50000);
        const y = Math.floor(prng() * 50000);
        const item = { minX: x, minY: y, maxX: x + 20, maxY: y + 20, id: `bulk-${i}` };
        items.push(item);
        seqTree.insert(item);
      }

      bulkTree.load(items);
      assert.equal(bulkTree.all().length, 2000);
      assert.equal(seqTree.all().length, 2000);

      // Verify identical results on sample queries
      for (let k = 0; k < 20; k++) {
        const qx = Math.floor(prng() * 50000);
        const qy = Math.floor(prng() * 50000);
        const q = { minX: qx, minY: qy, maxX: qx + 500, maxY: qy + 500 };
        const bulkHits = bulkTree.search(q).map(x => x.id).sort();
        const seqHits = seqTree.search(q).map(x => x.id).sort();
        assert.deepEqual(bulkHits, seqHits);
      }
    });
  });

  // ==========================================================================
  // CHALLENGE 2: Donut Scope Selector AST & Schema Stress Test
  // ==========================================================================
  describe('Challenge 2: Donut Scope Selector AST & Schema Piercing Attacks', () => {

    test('C2.1: Piercing combinator attacks ([data-kinetic-slot] > *, descendant h1.title) are caught', () => {
      // 1. Direct child wildcard
      const r1 = validateDonutSelector('[data-kinetic-slot] > *');
      assert.equal(r1.compliant, false, 'Direct child wildcard must be flagged as violation');
      assert.ok(r1.violations.some(v => v.includes('>')), 'Violation must mention child combinator');

      // 2. Descendant tag + class
      const r2 = validateDonutSelector('[data-kinetic-slot] h1.title');
      assert.equal(r2.compliant, false, 'Descendant selector h1.title must be flagged as violation');
      assert.ok(r2.violations.some(v => v.includes('h1.title')));

      // 3. Child with specific attribute value
      const r3 = validateDonutSelector('[data-kinetic-slot="hero-title"] > h1');
      assert.equal(r3.compliant, false, 'Child combinator on slot with attribute value must be flagged');

      // 4. Descendant with specific attribute value
      const r4 = validateDonutSelector('[data-kinetic-slot="hero-title"] h1');
      assert.equal(r4.compliant, false, 'Descendant combinator on slot with attribute value must be flagged');

      // 5. Schema validation of stylesheet containing piercing selectors
      const css = `
        .kinetic-stage { background: #000; }
        [data-kinetic-slot] > * { margin: 0; }
        [data-kinetic-slot="header"] h1.title { font-size: 32px; }
      `;
      const schemaResult = validateSchemaSheet(css);
      assert.equal(schemaResult.compliant, false, 'Schema must flag piercing selectors in stylesheet');
      assert.ok(schemaResult.violations.length >= 2, 'Schema must capture both piercing violations');
    });

    test('C2.2: Functional pseudo-class wrapping (:is([data-kinetic-slot]) h1) is detected', () => {
      // In CSS, :is([data-kinetic-slot]) h1 penetrates slot interior
      const r = validateDonutSelector(':is([data-kinetic-slot]) h1');
      assert.equal(r.compliant, false, ':is([data-kinetic-slot]) h1 must be flagged as violation');
      assert.ok(r.violations.length > 0);
    });

    test('C2.3: Non-piercing sibling combinators ([data-kinetic-slot="x"] + div, ~ p) are compliant', () => {
      // In CSS, '+' and '~' target sibling elements in the outer container, NOT descendants inside the slot!
      const rAdjacent = validateDonutSelector('[data-kinetic-slot="x"] + div');
      assert.equal(rAdjacent.compliant, true, 'Adjacent sibling (+) does not pierce slot interior and must be compliant');
      assert.equal(rAdjacent.violations.length, 0);

      const rGeneral = validateDonutSelector('[data-kinetic-slot] ~ p');
      assert.equal(rGeneral.compliant, true, 'General sibling (~) does not pierce slot interior and must be compliant');
      assert.equal(rGeneral.violations.length, 0);

      // Verify schema engine also permits sibling combinators
      const cssSibling = `
        [data-kinetic-slot="x"] + div { margin-top: 10px; }
        [data-kinetic-slot] ~ p { opacity: 0.8; }
      `;
      const schemaSibling = validateSchemaSheet(cssSibling);
      assert.equal(schemaSibling.compliant, true, 'Schema engine must not flag sibling combinators');
    });

    test('C2.4: Zero false-positives guarantee on legitimate boundary self-styling', () => {
      const validSelfStylingCases = [
        '[data-kinetic-slot]',
        '[data-kinetic-slot][data-slot-type="hero"]',
        '[data-kinetic-slot="hero-title"]',
        '[data-kinetic-slot]:hover',
        '[data-kinetic-slot]:focus-visible',
        '[data-kinetic-slot]::before',
        '[data-kinetic-slot]::after',
        '[data-kinetic-slot].slot-active',
        'div[data-kinetic-slot]',
        'section.hero > [data-kinetic-slot]',
        '[data-kinetic-slot][data-slot-type="card"][aria-expanded="true"]'
      ];

      for (const sel of validSelfStylingCases) {
        const res = validateDonutSelector(sel);
        assert.equal(
          res.compliant,
          true,
          `False positive detected on valid self-styling selector: '${sel}'`
        );
        assert.equal(
          res.violations.length,
          0,
          `Expected 0 violations for '${sel}', got ${JSON.stringify(res.violations)}`
        );
      }

      // Test stylesheet self-styling with schema validator
      const validCss = `
        [data-kinetic-slot] { display: block; position: relative; }
        [data-kinetic-slot][data-slot-type="hero"] { min-height: 400px; }
        [data-kinetic-slot]:hover { transform: scale(1.02); }
        [data-kinetic-slot]::before { content: ''; position: absolute; }
      `;
      const schemaRes = validateSchemaSheet(validCss);
      assert.equal(schemaRes.compliant, true, 'Schema must have zero false positives on valid self-styling CSS');
      assert.equal(schemaRes.violations.length, 0);
    });

    test('C2.5: Negative isolation fallback guard (:not([data-kinetic-slot] *)) passes cleanly', () => {
      const guardSelector = ':scope :not([data-kinetic-slot] *)';
      const res = validateDonutSelector(guardSelector);
      assert.equal(res.compliant, true, 'Negative isolation guard must be compliant');
      assert.equal(res.violations.length, 0);
    });

    test('C2.6: Attribute operator variations (^=, $=, *=, |=) with piercing combinators are detected', () => {
      assert.equal(validateDonutSelector('[data-kinetic-slot^="hero-"] > div').compliant, false);
      assert.equal(validateDonutSelector('[data-kinetic-slot$="-title"] p').compliant, false);
      assert.equal(validateDonutSelector('[data-kinetic-slot*="content"] > span').compliant, false);
      assert.equal(validateDonutSelector('[data-kinetic-slot|="en"] h3').compliant, false);
    });

    test('C2.7: CSS comment injection and obfuscation across tokens is stripped safely', () => {
      const commentedPiercing = '/* pre */ [data-kinetic-slot] /* mid */ > /* post */ h1';
      const res = validateDonutSelector(commentedPiercing);
      assert.equal(res.compliant, false, 'Comment-obfuscated piercing selector must still be flagged');

      const commentedValid = '/* pre */ [data-kinetic-slot]:hover /* post */';
      const resValid = validateDonutSelector(commentedValid);
      assert.equal(resValid.compliant, true, 'Commented valid self-styling must be compliant');
    });

    test('C2.8: Comma-separated list with mixed compliant and piercing selectors isolates violations', () => {
      const mixedList = '.container, [data-kinetic-slot], [data-kinetic-slot] > .pierce, a.link';
      const res = validateDonutSelector(mixedList);
      assert.equal(res.compliant, false, 'Mixed list containing a piercing rule must be marked non-compliant');
      assert.equal(res.violations.length, 1, 'Exactly 1 violation must be isolated');
      assert.ok(res.violations[0].includes('.pierce'));
    });
  });

  // ==========================================================================
  // CHALLENGE 3: DAG Scheduler Write-Locks & Concurrency Stress Test
  // ==========================================================================
  describe('Challenge 3: DAG Scheduler Write-Locks & Concurrency Invariants', () => {

    test('C3.1: pathsIntersect correctly detects glob containment and prefix relationships', () => {
      // 1. Glob vs specific file inside glob
      assert.equal(pathsIntersect('a/b/**', 'a/b/c.json'), true, 'Glob a/b/** must intersect a/b/c.json');
      assert.equal(pathsIntersect('a/b/c.json', 'a/b/**'), true, 'Commutative: a/b/c.json intersects a/b/**');

      // 2. Directory glob vs Subdirectory glob
      assert.equal(pathsIntersect('dir/**', 'dir/sub/**'), true, 'dir/** must contain dir/sub/**');
      assert.equal(pathsIntersect('dir/sub/**', 'dir/**'), true, 'Commutative: dir/sub/** contained in dir/**');

      // 3. Exact path match
      assert.equal(pathsIntersect('src/config.json', 'src/config.json'), true, 'Exact paths must intersect');

      // 4. Windows backslash vs POSIX slash normalization
      assert.equal(pathsIntersect('src\\config.json', 'src/config.json'), true, 'Backslash normalization must intersect');
      assert.equal(pathsIntersect('.\\src\\config.json', 'src/config.json'), true, 'Leading dot-slash normalization must intersect');

      // 5. Disjoint directories must NOT intersect
      assert.equal(pathsIntersect('a/**', 'b/**'), false, 'Disjoint globs a/** and b/** must not intersect');
      assert.equal(pathsIntersect('a/b/**', 'a/c/**'), false, 'Disjoint subdirectories a/b/** and a/c/** must not intersect');

      // 6. Non-prefix false positives (e.g. 'a/bc' should not intersect 'a/b/**')
      assert.equal(pathsIntersect('a/b/**', 'a/bc/d.json'), false, 'a/b/** must not match a/bc/d.json');
    });

    test('C3.2: Conflicting tasks NEVER execute in the same concurrent batch', async () => {
      // Scenario A: Full pairwise conflict (every task conflicts with every other task)
      // workspace/** vs workspace/data/** vs workspace/data/index.json
      const allConflictBlueprint = {
        version: 1,
        runId: 'challenger-all-conflict-run',
        clientScope: 'client-test',
        tasks: [
          { id: 'root-glob', writeAllowlist: ['workspace/**'] },
          { id: 'sub-glob', writeAllowlist: ['workspace/data/**'] },
          { id: 'file-writer', writeAllowlist: ['workspace/data/index.json'] }
        ]
      };

      let activeAll = 0;
      let maxAll = 0;
      const allResult = await scheduleBlueprint(allConflictBlueprint, async (task) => {
        activeAll++;
        maxAll = Math.max(maxAll, activeAll);
        await new Promise(r => setTimeout(r, 20));
        activeAll--;
        return { completed: task.id };
      });

      assert.equal(allResult.completed.length, 3, 'All 3 all-conflicting tasks must complete');
      assert.equal(maxAll, 1, 'In full pairwise conflict, maxConcurrency must be strictly 1 (completely serialized)');

      // Scenario B: Partial conflict (glob conflicts with file and subdir, but file and subdir are disjoint)
      const partialConflictBlueprint = {
        version: 1,
        runId: 'challenger-partial-conflict-run',
        clientScope: 'client-test',
        tasks: [
          { id: 'task-glob-writer', writeAllowlist: ['workspace/data/**'] },
          { id: 'task-file-writer', writeAllowlist: ['workspace/data/index.json'] },
          { id: 'task-subdir-writer', writeAllowlist: ['workspace/data/cache/**'] }
        ]
      };

      const runningNow = new Set();
      const concurrentPairs = [];

      const partialResult = await scheduleBlueprint(partialConflictBlueprint, async (task) => {
        // Record all tasks executing concurrently with this task
        for (const runningId of runningNow) {
          concurrentPairs.push([task.id, runningId].sort().join(' <-> '));
        }
        runningNow.add(task.id);
        await new Promise(r => setTimeout(r, 25));
        runningNow.delete(task.id);
        return { completed: task.id };
      });

      assert.equal(partialResult.completed.length, 3);
      // Conflicting pairs must NEVER have executed concurrently:
      assert.ok(
        !concurrentPairs.includes('task-file-writer <-> task-glob-writer'),
        'task-file-writer and task-glob-writer must NEVER run concurrently'
      );
      assert.ok(
        !concurrentPairs.includes('task-glob-writer <-> task-subdir-writer'),
        'task-subdir-writer and task-glob-writer must NEVER run concurrently'
      );
      // Disjoint pair SHOULD run concurrently:
      assert.ok(
        concurrentPairs.includes('task-file-writer <-> task-subdir-writer'),
        'Disjoint writers task-file-writer and task-subdir-writer should run concurrently in the same batch'
      );
    });

    test('C3.3: Disjoint writers execute concurrently in the same parallel batch', async () => {
      const blueprintSource = {
        version: 1,
        runId: 'challenger-disjoint-run',
        clientScope: 'client-test',
        tasks: [
          {
            id: 'writer-alpha',
            writeAllowlist: ['clientes/alpha/**']
          },
          {
            id: 'writer-beta',
            writeAllowlist: ['clientes/beta/**']
          },
          {
            id: 'writer-gamma',
            writeAllowlist: ['clientes/gamma/**']
          }
        ]
      };

      let activeConcurrency = 0;
      let maxConcurrency = 0;

      const executeTask = async (task) => {
        activeConcurrency++;
        maxConcurrency = Math.max(maxConcurrency, activeConcurrency);
        await new Promise(r => setTimeout(r, 30));
        activeConcurrency--;
        return { ok: true };
      };

      const result = await scheduleBlueprint(blueprintSource, executeTask);

      assert.equal(result.completed.length, 3);
      // Because alpha, beta, and gamma are disjoint, they should run in parallel!
      assert.equal(maxConcurrency, 3, 'Disjoint writers must execute concurrently in batch size of 3');
    });

    test('C3.4: Read-only tasks execute concurrently with writer tasks without blocking', async () => {
      const blueprintSource = {
        version: 1,
        runId: 'challenger-readonly-run',
        clientScope: 'client-test',
        tasks: [
          {
            id: 'writer-main',
            writeAllowlist: ['output/**']
          },
          {
            id: 'reader-1',
            writeAllowlist: [] // Explicitly empty write locks = read-only
          },
          {
            id: 'reader-2',
            input: { mutatesWorkspace: false } // Reader flag in input
          }
        ]
      };

      let activeConcurrency = 0;
      let maxConcurrency = 0;

      const executeTask = async (task) => {
        activeConcurrency++;
        maxConcurrency = Math.max(maxConcurrency, activeConcurrency);
        await new Promise(r => setTimeout(r, 30));
        activeConcurrency--;
        return { ok: true };
      };

      const result = await scheduleBlueprint(blueprintSource, executeTask);

      assert.equal(result.completed.length, 3);
      // Writer and both readers have no conflicting write locks -> all 3 execute in single batch!
      assert.equal(maxConcurrency, 3, 'Read-only tasks must execute in parallel with writers');
    });

    test('C3.5: 12-task adversarial complex DAG strictly enforces zero lock conflict at every moment', async () => {
      // Construct a realistic 12-task DAG with a mixture of:
      // - 4 Partition writers (disjoint P1, P2, P3, P4)
      // - 2 Conflicting sub-writers on P1 (P1/subA, P1/subB)
      // - 2 Read-only audit tasks
      // - 4 Dependent aggregation tasks
      const blueprintSource = {
        version: 1,
        runId: 'adversarial-12-task-dag',
        clientScope: 'client-audit',
        tasks: [
          // Roots:
          { id: 'p1-master', writeAllowlist: ['partition/1/**'] },
          { id: 'p1-sub-conflict', writeAllowlist: ['partition/1/sub/**'] }, // Conflicts with p1-master
          { id: 'p2-master', writeAllowlist: ['partition/2/**'] },
          { id: 'p3-master', writeAllowlist: ['partition/3/**'] },
          { id: 'p4-master', writeAllowlist: ['partition/4/**'] },
          { id: 'audit-reader-a', writeAllowlist: [] },
          { id: 'audit-reader-b', writeAllowlist: [] },

          // Level 1 Dependents:
          { id: 'p1-summary', dependsOn: ['p1-master'], writeAllowlist: ['summary/1.json'] },
          { id: 'p2-summary', dependsOn: ['p2-master'], writeAllowlist: ['summary/2.json'] },
          { id: 'p3-summary', dependsOn: ['p3-master'], writeAllowlist: ['summary/3.json'] },
          { id: 'p4-summary', dependsOn: ['p4-master'], writeAllowlist: ['summary/4.json'] },

          // Level 2 Final aggregation:
          { id: 'final-manifest', dependsOn: ['p1-summary', 'p2-summary', 'p3-summary', 'p4-summary'], writeAllowlist: ['summary/**'] }
        ]
      };

      const currentlyRunning = new Set();
      const taskIntervals = new Map();

      const executeTask = async (task) => {
        const myLocks = getTaskWriteLocks(task);

        // Invariant check: Ensure NO currently running task conflicts with this task!
        for (const runningId of currentlyRunning) {
          const runningTask = blueprintSource.tasks.find(t => t.id === runningId);
          const conflicts = tasksConflict(task, runningTask);
          assert.equal(
            conflicts,
            false,
            `CONCURRENCY INVARIANT VIOLATION: Task '${task.id}' is executing concurrently with conflicting task '${runningId}'!`
          );
        }

        currentlyRunning.add(task.id);
        const startTime = Date.now();

        await new Promise(r => setTimeout(r, 15));

        const endTime = Date.now();
        taskIntervals.set(task.id, { startTime, endTime });
        currentlyRunning.delete(task.id);

        return { status: 'success', taskId: task.id };
      };

      const result = await scheduleBlueprint(blueprintSource, executeTask);

      assert.equal(result.completed.length, 12, 'All 12 tasks must complete');

      // Verify dependency ordering:
      for (const task of blueprintSource.tasks) {
        if (task.dependsOn) {
          const taskInterval = taskIntervals.get(task.id);
          for (const depId of task.dependsOn) {
            const depInterval = taskIntervals.get(depId);
            assert.ok(
              depInterval.endTime <= taskInterval.startTime,
              `Dependency ordering violation: '${task.id}' started before '${depId}' finished`
            );
          }
        }
      }
    });

    test('C3.6: Multi-lock task arrays (writeAllowlist with multiple globs) detect cross-conflicts', () => {
      const taskMultiA = { id: 'multi-a', writeAllowlist: ['logs/**', 'data/output.json'] };
      const taskMultiB = { id: 'multi-b', writeAllowlist: ['temp/**', 'data/**'] };
      const taskDisjoint = { id: 'disjoint', writeAllowlist: ['temp/**', 'metrics/**'] };

      // taskMultiA and taskMultiB intersect on data/** vs data/output.json
      assert.equal(tasksConflict(taskMultiA, taskMultiB), true, 'Multi-lock tasks intersecting on any lock must conflict');

      // taskMultiA and taskDisjoint share no locks
      assert.equal(tasksConflict(taskMultiA, taskDisjoint), false, 'Disjoint multi-lock tasks must not conflict');
    });

    test('C3.7: Root glob and directory wildcard containment behavior', () => {
      // 1. Root directory globs with leading slashes intersect subpaths correctly:
      assert.equal(pathsIntersect('/**', 'src/core.js'), true, 'Root /** must intersect any path');
      assert.equal(pathsIntersect('/*', 'src/core.js'), true, 'Root /* must intersect any path');
      
      // 2. Challenger edge-case finding:
      // Bare '**' and './**' (which normalizes to '**') do not end with '/**' or '/*',
      // so dag-scheduler.js treats them as literal paths unless prefixed with a directory or leading slash.
      assert.equal(pathsIntersect('**', 'src/core.js'), false, 'Observed limitation: bare ** without slash is not flagged as glob');
      assert.equal(pathsIntersect('./**', 'src/core.js'), false, 'Observed limitation: ./** normalizes to ** without slash');
    });

    test('C3.8: writeScope string parameter and input.writeLocks legacy support are respected', () => {
      const legacyScopeTask = { id: 'legacy-1', writeScope: 'dist/**' };
      const legacyLocksTask = { id: 'legacy-2', input: { writeLocks: ['dist/bundle.js'] } };

      assert.deepEqual(getTaskWriteLocks(legacyScopeTask), ['dist/**']);
      assert.deepEqual(getTaskWriteLocks(legacyLocksTask), ['dist/bundle.js']);
      assert.equal(tasksConflict(legacyScopeTask, legacyLocksTask), true, 'Legacy lock definitions must detect conflict');
    });

  });

});

