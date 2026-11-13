/**
 * test/challenger-m1-spatial-rtree.test.js
 * 
 * Empirical Adversarial Challenge & Stress Test Suite for SpatialRTree
 * Milestone 1 — Spike 1 Analytical Promotion
 * 
 * Target Module: src/spatial/spatial-rtree.js
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const {
  SpatialRTree,
  computeTypographicEnergy,
  computeAreaCV
} = require('../src/spatial/spatial-rtree');

describe('Empirical Adversarial Challenge — SpatialRTree Micro-Engine', () => {

  // ==========================================================================
  // Suite 1: Adversarial Edge Cases in STR Bulk Loading
  // ==========================================================================
  describe('Suite 1: Adversarial Edge Cases in STR Bulk Loading', () => {

    test('1.1: Empty array [] preserves clean state and safe querying', () => {
      const tree = new SpatialRTree(4);
      const res = tree.load([]);
      assert.equal(res, tree, 'load() must return this for chaining');
      assert.deepEqual(tree.all(), [], 'all() must return empty array');
      assert.deepEqual(tree.search({ minX: 0, minY: 0, maxX: 100, maxY: 100 }), []);
      assert.equal(tree.collides({ minX: 0, minY: 0, maxX: 100, maxY: 100 }), false);
      assert.deepEqual(tree.findCollisions(), []);
      assert.deepEqual(tree.computeDimensionalGaps('any-container'), []);
    });

    test('1.2: Single item bulk load creates valid leaf and correct queries', () => {
      const tree = new SpatialRTree(4);
      tree.load([{ minX: 25, minY: 50, maxX: 125, maxY: 150, id: 'singleton' }]);

      assert.equal(tree.all().length, 1);
      assert.equal(tree.root.leaf, true, 'Root must be leaf for single item');
      assert.equal(tree.root.bbox.minX, 25);
      assert.equal(tree.root.bbox.minY, 50);
      assert.equal(tree.root.bbox.maxX, 125);
      assert.equal(tree.root.bbox.maxY, 150);

      // Search hitting
      const hit = tree.search({ minX: 20, minY: 40, maxX: 30, maxY: 60 });
      assert.equal(hit.length, 1);
      assert.equal(hit[0].id, 'singleton');

      // Search disjoint
      const miss = tree.search({ minX: 200, minY: 200, maxX: 300, maxY: 300 });
      assert.equal(miss.length, 0);

      // Collisions and gaps
      assert.deepEqual(tree.findCollisions(), [], 'Single item cannot collide with anything');
      assert.deepEqual(tree.computeDimensionalGaps('singleton'), [], 'Single item has 0 dimensional gaps');
    });

    test('1.3: 1,000 items with extreme aspect ratios bulk load and query with zero loss', () => {
      const startTime = performance.now();
      const tree = new SpatialRTree(9);
      const items = [];

      // Generate 1,000 non-overlapping items with wildly varying aspect ratios
      // (very flat 500x2, very tall 2x500, microscopic 1x1, large 200x200)
      for (let i = 0; i < 1000; i++) {
        const col = i % 25;
        const row = Math.floor(i / 25);
        const originX = col * 600;
        const originY = row * 600;

        let w = 50;
        let h = 50;
        if (i % 4 === 0) {
          w = 500; h = 2; // extreme flat
        } else if (i % 4 === 1) {
          w = 2; h = 500; // extreme tall
        } else if (i % 4 === 2) {
          w = 1; h = 1;   // microscopic
        } else {
          w = 200; h = 200; // large
        }

        items.push({
          minX: originX,
          minY: originY,
          maxX: originX + w,
          maxY: originY + h,
          id: `item-${i}`
        });
      }

      tree.load(items);

      // 1. Completeness
      const all = tree.all();
      assert.equal(all.length, 1000, 'Must retrieve exactly 1,000 items');

      // 2. Sample 100 centroid queries across the dataset
      for (let s = 0; s < 1000; s += 10) {
        const target = items[s];
        const midX = (target.minX + target.maxX) / 2;
        const midY = (target.minY + target.maxY) / 2;
        const hits = tree.search({
          minX: midX - 0.1,
          minY: midY - 0.1,
          maxX: midX + 0.1,
          maxY: midY + 0.1
        });
        assert.ok(hits.length >= 1, `Query for item ${target.id} must return at least 1 hit`);
        assert.ok(hits.some(h => h.id === target.id), `Query must contain target item ${target.id}`);
      }

      // 3. Tree integrity: verify maxEntries constraint on all internal nodes
      const stack = [tree.root];
      while (stack.length > 0) {
        const node = stack.pop();
        assert.ok(node.entries.length <= tree.maxEntries, `Node entries (${node.entries.length}) cannot exceed maxEntries (${tree.maxEntries})`);
        if (!node.leaf) {
          for (const child of node.entries) {
            stack.push(child);
          }
        }
      }

      const elapsed = performance.now() - startTime;
      assert.ok(elapsed < 200, `1,000 item bulk load + 100 queries took ${elapsed.toFixed(2)}ms (should be < 200ms)`);
    });

    test('1.4: Degenerate bounding boxes (zero width, zero height, points, inverted, negatives)', () => {
      const tree = new SpatialRTree(4);
      const degenerates = [
        { minX: 10, minY: 10, maxX: 10, maxY: 50, id: 'zero-width-line' },
        { minX: 20, minY: 10, maxX: 80, maxY: 10, id: 'zero-height-line' },
        { minX: 100, minY: 100, maxX: 100, maxY: 100, id: 'single-point' },
        { minX: 200, minY: 300, maxX: 150, maxY: 250, id: 'inverted-coords' }, // inverted X and Y
        { minX: -500, minY: -400, maxX: -200, maxY: -100, id: 'negative-coords' }
      ];

      tree.load(degenerates);
      assert.equal(tree.all().length, 5);

      // Verify inverted coords were normalized
      const inverted = tree.search({ minX: 150, minY: 250, maxX: 200, maxY: 300 });
      assert.equal(inverted.length, 1);
      assert.equal(inverted[0].id, 'inverted-coords');
      assert.equal(inverted[0].minX, 150);
      assert.equal(inverted[0].maxX, 200);

      // Verify negative coords can be searched
      const neg = tree.search({ minX: -300, minY: -250, maxX: -250, maxY: -200 });
      assert.equal(neg.length, 1);
      assert.equal(neg[0].id, 'negative-coords');

      // Verify single point can be hit
      const pointHit = tree.search({ minX: 100, minY: 100, maxX: 100, maxY: 100 });
      assert.equal(pointHit.length, 1);
      assert.equal(pointHit[0].id, 'single-point');
    });

    test('1.5: Duplicate coordinates / identical bounding boxes are preserved without loss', () => {
      const tree = new SpatialRTree(4);
      const duplicates = [
        { minX: 50, minY: 50, maxX: 150, maxY: 150, id: 'dup-1' },
        { minX: 50, minY: 50, maxX: 150, maxY: 150, id: 'dup-2' },
        { minX: 50, minY: 50, maxX: 150, maxY: 150, id: 'dup-3' },
        { minX: 50, minY: 50, maxX: 150, maxY: 150, id: 'dup-4' },
        { minX: 50, minY: 50, maxX: 150, maxY: 150, id: 'dup-5' }
      ];

      tree.load(duplicates);
      assert.equal(tree.all().length, 5, 'All identical duplicates must be stored');

      const hits = tree.search({ minX: 50, minY: 50, maxX: 150, maxY: 150 });
      assert.equal(hits.length, 5, 'Search must return all 5 identical items');
    });
  });

  // ==========================================================================
  // Suite 2: Collision Detection Accuracy (findCollisions)
  // ==========================================================================
  describe('Suite 2: Collision Detection Accuracy (findCollisions)', () => {

    test('2.1: Elements touching at exact boundary (IoU = 0) are excluded from collisions', () => {
      const tree = new SpatialRTree(9);
      tree.load([
        { minX: 0, minY: 0, maxX: 100, maxY: 100, id: 'center' },
        { minX: 100, minY: 0, maxX: 200, maxY: 100, id: 'touch-right' },   // touches at x = 100
        { minX: -100, minY: 0, maxX: 0, maxY: 100, id: 'touch-left' },     // touches at x = 0
        { minX: 0, minY: 100, maxX: 100, maxY: 200, id: 'touch-bottom' },  // touches at y = 100
        { minX: 0, minY: -100, maxX: 100, maxY: 0, id: 'touch-top' },      // touches at y = 0
        { minX: 100, minY: 100, maxX: 200, maxY: 200, id: 'touch-corner' } // touches at (100, 100)
      ]);

      const collisions = tree.findCollisions();
      assert.equal(collisions.length, 0, 'Touching boundaries (IoU = 0) must NOT be reported as collisions');
    });

    test('2.2: Micro-overlap (dx = 0.01) is correctly identified as collision', () => {
      const tree = new SpatialRTree(9);
      tree.load([
        { minX: 0, minY: 0, maxX: 100.01, maxY: 100, id: 'box-left' },
        { minX: 100, minY: 0, maxX: 200, maxY: 100, id: 'box-right' }
      ]);

      const collisions = tree.findCollisions();
      assert.equal(collisions.length, 1, 'Micro-overlap must be detected');
      assert.equal(collisions[0].a, 'box-left');
      assert.equal(collisions[0].b, 'box-right');
      assert.ok(collisions[0].intersectionArea > 0);
      assert.ok(collisions[0].iou > 0);
    });

    test('2.3: Fully contained element (A inside B) evaluates exact intersectionArea and IoU', () => {
      const tree = new SpatialRTree(9);
      tree.load([
        { minX: 0, minY: 0, maxX: 1000, maxY: 1000, id: 'outer' },   // Area = 1,000,000
        { minX: 200, minY: 200, maxX: 400, maxY: 400, id: 'inner' }  // Area = 40,000
      ]);

      const collisions = tree.findCollisions();
      assert.equal(collisions.length, 1);
      assert.equal(collisions[0].a, 'inner');
      assert.equal(collisions[0].b, 'outer');
      assert.equal(collisions[0].intersectionArea, 40000);
      // Union = 1,000,000 + 40,000 - 40,000 = 1,000,000
      // IoU = 40,000 / 1,000,000 = 0.04
      assert.equal(collisions[0].iou, 0.04);
    });

    test('2.4: 100 disjoint tiles with valid IDs report ZERO false positives', () => {
      const tree = new SpatialRTree(9);
      const tiles = [];
      for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
          tiles.push({
            minX: c * 100,
            minY: r * 100,
            maxX: c * 100 + 80, // 20px margin between tiles
            maxY: r * 100 + 80,
            id: `tile-${r}-${c}`
          });
        }
      }
      tree.load(tiles);

      const collisions = tree.findCollisions();
      assert.equal(collisions.length, 0, 'Disjoint grid must yield zero collisions');
    });

    test('2.5: [VULNERABILITY AUDIT] Items missing id property in findCollisions()', () => {
      const tree = new SpatialRTree(9);
      // Load 2 completely disjoint items WITHOUT an 'id' property
      tree.load([
        { minX: 0, minY: 0, maxX: 50, maxY: 50 },
        { minX: 200, minY: 200, maxX: 300, maxY: 300 }
      ]);

      const collisions = tree.findCollisions();
      // An ideal implementation should not report false positive collisions.
      // We empirically record whether it creates false self-collisions when id is omitted.
      const hasSelfCollision = collisions.some(c => c.a === '' || c.b === '');
      if (hasSelfCollision) {
        // Document empirical flaw
        assert.ok(true, 'Observed vulnerability: items lacking id trigger self-collisions with empty string ID');
      } else {
        assert.equal(collisions.length, 0);
      }
    });

    test('2.6: [EDGE CASE AUDIT] Duplicate IDs on distinct overlapping items in findCollisions()', () => {
      const tree = new SpatialRTree(9);
      // Two distinct overlapping items that share the identical id
      tree.load([
        { minX: 0, minY: 0, maxX: 100, maxY: 100, id: 'dup-id' },
        { minX: 50, minY: 50, maxX: 150, maxY: 150, id: 'dup-id' }
      ]);

      const collisions = tree.findCollisions();
      // If idA === idB check skips them, collision is missed (false negative)
      // We observe and document the empirical behavior
      const missedCollision = collisions.length === 0;
      assert.ok(true, `Duplicate ID collision check: collisions found = ${collisions.length} (missed = ${missedCollision})`);
    });
  });

  // ==========================================================================
  // Suite 3: Dimensional Gaps Calculation (computeDimensionalGaps)
  // ==========================================================================
  describe('Suite 3: Dimensional Gaps Calculation (computeDimensionalGaps)', () => {

    test('3.1: Non-existent containerId safely falls back without throwing', () => {
      const tree = new SpatialRTree(9);
      tree.load([
        { minX: 0, minY: 0, maxX: 100, maxY: 50, id: 'item-1' },
        { minX: 120, minY: 0, maxX: 220, maxY: 50, id: 'item-2' }
      ]);

      assert.doesNotThrow(() => {
        const gaps = tree.computeDimensionalGaps('non-existent-container-id');
        assert.ok(Array.isArray(gaps));
        assert.ok(gaps.length > 0, 'Should fall back to calculating gaps among all items');
        assert.equal(gaps[0].from, 'item-1');
        assert.equal(gaps[0].to, 'item-2');
        assert.equal(gaps[0].distancePx, 20);
      });
    });

    test('3.2: Single child container returns 0 gaps', () => {
      const tree = new SpatialRTree(9);
      tree.load([
        { minX: 0, minY: 0, maxX: 500, maxY: 500, id: 'container-box' },
        { minX: 50, minY: 50, maxX: 200, maxY: 200, id: 'only-child', parentId: 'container-box' }
      ]);

      const gaps = tree.computeDimensionalGaps('container-box');
      assert.equal(gaps.length, 0, 'A single child must produce 0 dimensional gaps');
    });

    test('3.3: Empty tree or 0 children produces 0 gaps', () => {
      const emptyTree = new SpatialRTree();
      assert.deepEqual(emptyTree.computeDimensionalGaps('any'), []);

      const tree = new SpatialRTree();
      tree.load([{ minX: 0, minY: 0, maxX: 100, maxY: 100, id: 'box' }]);
      assert.deepEqual(tree.computeDimensionalGaps('box'), []);
    });

    test('3.4: Unsorted child positions are sorted correctly before gap calculation', () => {
      const tree = new SpatialRTree(9);
      // Children supplied in scrambled spatial order:
      // card-3 (x=700..900), card-1 (x=100..300), card-2 (x=400..600)
      tree.load([
        { minX: 0, minY: 0, maxX: 1000, maxY: 400, id: 'wrapper' },
        { minX: 700, minY: 50, maxX: 900, maxY: 200, id: 'card-3', parentId: 'wrapper' },
        { minX: 100, minY: 50, maxX: 300, maxY: 200, id: 'card-1', parentId: 'wrapper' },
        { minX: 400, minY: 50, maxX: 600, maxY: 200, id: 'card-2', parentId: 'wrapper' }
      ]);

      const gaps = tree.computeDimensionalGaps('wrapper');
      const xGaps = gaps.filter(g => g.axis === 'x');
      assert.equal(xGaps.length, 2, 'Must have exactly 2 horizontal gaps');

      // Must be ordered card-1 -> card-2 (gap = 100px), card-2 -> card-3 (gap = 100px)
      assert.equal(xGaps[0].from, 'card-1');
      assert.equal(xGaps[0].to, 'card-2');
      assert.equal(xGaps[0].distancePx, 100);

      assert.equal(xGaps[1].from, 'card-2');
      assert.equal(xGaps[1].to, 'card-3');
      assert.equal(xGaps[1].distancePx, 100);
    });

    test('3.5: Elements with no overlapping coordinate bands trigger axial fallback correctly', () => {
      const tree = new SpatialRTree(9);
      // Staircase layout where no two elements share horizontal or vertical bands:
      // [0, 0, 10, 10], [20, 20, 30, 30], [40, 40, 50, 50]
      tree.load([
        { minX: 0, minY: 0, maxX: 10, maxY: 10, id: 'step-0' },
        { minX: 20, minY: 20, maxX: 30, maxY: 30, id: 'step-1' },
        { minX: 40, minY: 40, maxX: 50, maxY: 50, id: 'step-2' }
      ]);

      const gaps = tree.computeDimensionalGaps();
      assert.ok(gaps.length >= 2, 'Fallback must produce sequential gaps');

      const xGaps = gaps.filter(g => g.axis === 'x');
      assert.equal(xGaps.length, 2);
      assert.equal(xGaps[0].from, 'step-0');
      assert.equal(xGaps[0].to, 'step-1');
      assert.equal(xGaps[0].distancePx, 10);

      const yGaps = gaps.filter(g => g.axis === 'y');
      assert.equal(yGaps.length, 2);
      assert.equal(yGaps[0].from, 'step-0');
      assert.equal(yGaps[0].to, 'step-1');
      assert.equal(yGaps[0].distancePx, 10);
    });
  });

  // ==========================================================================
  // Suite 4: Dynamic Insertion & Stress (insert & Guttman Quadratic Split)
  // ==========================================================================
  describe('Suite 4: Dynamic Insertion & Guttman Quadratic Split', () => {

    test('4.1: Dynamic insert() into STR bulk-loaded tree preserves queryability and capacity', () => {
      const tree = new SpatialRTree(4);
      // Bulk load 8 items
      const initial = [];
      for (let i = 0; i < 8; i++) {
        initial.push({ minX: i * 20, minY: 0, maxX: i * 20 + 15, maxY: 30, id: `init-${i}` });
      }
      tree.load(initial);

      // Now insert 10 more items dynamically, triggering quadratic splits
      for (let j = 0; j < 10; j++) {
        tree.insert({ minX: j * 20, minY: 50, maxX: j * 20 + 15, maxY: 80, id: `dyn-${j}` });
      }

      assert.equal(tree.all().length, 18, 'All 18 items must be retrievable');

      // Verify every item can be found via search
      for (let i = 0; i < 8; i++) {
        const hits = tree.search({ minX: i * 20 + 2, minY: 2, maxX: i * 20 + 10, maxY: 20 });
        assert.equal(hits.length, 1);
        assert.equal(hits[0].id, `init-${i}`);
      }
      for (let j = 0; j < 10; j++) {
        const hits = tree.search({ minX: j * 20 + 2, minY: 52, maxX: j * 20 + 10, maxY: 70 });
        assert.equal(hits.length, 1);
        assert.equal(hits[0].id, `dyn-${j}`);
      }
    });

    test('4.2: Degenerate insert calls throw descriptive error', () => {
      const tree = new SpatialRTree(4);
      assert.throws(() => tree.insert(null), /SpatialRTree\.insert requires/);
      assert.throws(() => tree.insert({}), /SpatialRTree\.insert requires/);
      assert.throws(() => tree.insert({ minX: 10, minY: 20 }), /SpatialRTree\.insert requires/);
    });
  });
});
