/**
 * test/v2.6/spatial-rtree.test.js
 * 
 * Studio DNA PRO v2.6 — 4-Tier Comprehensive Test Suite
 * Feature: Pure JS 2D R-Tree & Typographic Energy Slot Tagger (R6.1, Pillar 6)
 * 
 * Architecture:
 * - Tier 1: Feature Coverage (Insertion, Search, Collision, Bulk Load, All, Typographic Energy)
 * - Tier 2: Boundary & Corner Cases (Empty index, Single-point box, Border touch, Large coords, Quadratic Split)
 * - Tier 3: Cross-Feature Combinations (R-Tree + Typographic Energy, Subtree Isomorphism CV)
 * - Tier 4: Real-World Scenarios (Full Section Capsule Slot Extraction & Spatial Indexing)
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { resolveEngine } = require('./fixtures/harness');

const { SpatialRTree, computeTypographicEnergy, computeAreaCV } = resolveEngine('spatial-rtree');

describe('v2.6 Spatial R-Tree & Typographic Energy Tagger', () => {

  // ==========================================================================
  // TIER 1: Feature Coverage (>= 5 Happy Path Cases)
  // ==========================================================================
  describe('Tier 1: Feature Coverage', () => {

    test('T1.1: SpatialRTree inserts single item and verifies leaf bounding box', () => {
      const tree = new SpatialRTree(9);
      const item = { minX: 10, minY: 20, maxX: 50, maxY: 60, id: 'box-1' };
      tree.insert(item);

      const all = tree.all();
      assert.equal(all.length, 1);
      assert.equal(all[0].id, 'box-1');
      assert.equal(tree.root.bbox.minX, 10);
      assert.equal(tree.root.bbox.maxX, 50);
      assert.equal(tree.root.bbox.minY, 20);
      assert.equal(tree.root.bbox.maxY, 60);
    });

    test('T1.2: search(bbox) returns exact intersecting items and ignores disjoint items', () => {
      const tree = new SpatialRTree(9);
      tree.insert({ minX: 0, minY: 0, maxX: 10, maxY: 10, id: 'a' });
      tree.insert({ minX: 20, minY: 20, maxX: 30, maxY: 30, id: 'b' });
      tree.insert({ minX: 40, minY: 40, maxX: 50, maxY: 50, id: 'c' });

      const hits = tree.search({ minX: 5, minY: 5, maxX: 25, maxY: 25 });
      const ids = hits.map(h => h.id).sort();

      assert.deepEqual(ids, ['a', 'b'], 'Search should return intersecting boxes a and b');
      assert.ok(!ids.includes('c'), 'Box c should not be returned');
    });

    test('T1.3: collides(bbox) returns true for intersecting queries and false otherwise', () => {
      const tree = new SpatialRTree(9);
      tree.insert({ minX: 100, minY: 100, maxX: 200, maxY: 200, id: 'hero' });

      assert.equal(tree.collides({ minX: 150, minY: 150, maxX: 250, maxY: 250 }), true);
      assert.equal(tree.collides({ minX: 300, minY: 300, maxX: 400, maxY: 400 }), false);
    });

    test('T1.4: load(items) bulk loads multiple items and preserves completeness', () => {
      const tree = new SpatialRTree(9);
      const items = [
        { minX: 0, minY: 0, maxX: 50, maxY: 50, id: 'card-0' },
        { minX: 60, minY: 0, maxX: 110, maxY: 50, id: 'card-1' },
        { minX: 120, minY: 0, maxX: 170, maxY: 50, id: 'card-2' },
        { minX: 180, minY: 0, maxX: 230, maxY: 50, id: 'card-3' }
      ];
      tree.load(items);

      const all = tree.all();
      assert.equal(all.length, 4);
      assert.equal(tree.root.bbox.minX, 0);
      assert.equal(tree.root.bbox.maxX, 230);
      assert.equal(tree.root.bbox.minY, 0);
      assert.equal(tree.root.bbox.maxY, 50);
    });

    test('T1.5: computeTypographicEnergy evaluates editorial headlines per Equation 24', () => {
      // Headline: 48px, 700 weight, area = 4800, width = 600, height = 80
      const eHeadline = computeTypographicEnergy(48, 700, 4800, 600, 80);
      // ws * (48/16)^2 + ww * (700/400) + wa * ln(1+4800) + wr * (600/80)
      // 0.45 * 9 + 0.25 * 1.75 + 0.20 * 8.4766 + 0.10 * 7.5
      // 4.05 + 0.4375 + 1.6953 + 0.75 = 6.9328 >= 3.8
      assert.ok(eHeadline >= 3.8, `Headline energy should be >= 3.8 (got ${eHeadline})`);

      // Body text: 14px, 400 weight, area = 1800, width = 300, height = 60
      const eBody = computeTypographicEnergy(14, 400, 1800, 300, 60);
      assert.ok(eBody < 3.8, `Body copy energy should be below threshold 3.8 (got ${eBody})`);
    });

    test('T1.6: computeAreaCV evaluates subtree area coefficient of variation per Equation 25', () => {
      const regularCards = [1000, 1020, 990, 1010];
      const cvRegular = computeAreaCV(regularCards);
      assert.ok(cvRegular <= 0.15, `Area CV for repeating cards should be <= 0.15 (got ${cvRegular})`);

      const irregularElements = [1000, 300, 5000, 120];
      const cvIrregular = computeAreaCV(irregularElements);
      assert.ok(cvIrregular > 0.15, `Area CV for non-repeating elements should exceed 0.15 (got ${cvIrregular})`);
    });
  });

  // ==========================================================================
  // TIER 2: Boundary & Corner Cases
  // ==========================================================================
  describe('Tier 2: Boundary & Corner Cases', () => {

    test('T2.1: Empty R-Tree returns empty search result and collides() === false', () => {
      const tree = new SpatialRTree(9);
      assert.deepEqual(tree.search({ minX: 0, minY: 0, maxX: 100, maxY: 100 }), []);
      assert.equal(tree.collides({ minX: 0, minY: 0, maxX: 100, maxY: 100 }), false);
      assert.deepEqual(tree.all(), []);
    });

    test('T2.2: Single-point bounding box (minX===maxX, minY===maxY) search and collision', () => {
      const tree = new SpatialRTree(9);
      tree.insert({ minX: 50, minY: 50, maxX: 50, maxY: 50, id: 'point-anchor' });

      // Search enclosing the point
      const hits = tree.search({ minX: 40, minY: 40, maxX: 60, maxY: 60 });
      assert.equal(hits.length, 1);
      assert.equal(hits[0].id, 'point-anchor');

      // Search disjoint from the point
      const misses = tree.search({ minX: 51, minY: 51, maxX: 60, maxY: 60 });
      assert.equal(misses.length, 0);
    });

    test('T2.3: Boundary touch (edge-to-edge touch) evaluates collision as true per Eq. 22', () => {
      const tree = new SpatialRTree(9);
      tree.insert({ minX: 0, minY: 0, maxX: 10, maxY: 10, id: 'box-left' });

      // Touching exactly at x = 10
      const touchingQuery = { minX: 10, minY: 0, maxX: 20, maxY: 10 };
      assert.equal(tree.collides(touchingQuery), true, 'Touching boundary edges must collide');
    });

    test('T2.4: Extreme negative and massive coordinate values handle without precision overflow', () => {
      const tree = new SpatialRTree(9);
      tree.insert({ minX: -100000, minY: -50000, maxX: -99000, maxY: -49000, id: 'neg-box' });
      tree.insert({ minX: 1000000, minY: 2000000, maxX: 1001000, maxY: 2001000, id: 'pos-box' });

      const hitsNeg = tree.search({ minX: -100500, minY: -50500, maxX: -98000, maxY: -48000 });
      assert.equal(hitsNeg.length, 1);
      assert.equal(hitsNeg[0].id, 'neg-box');

      const hitsPos = tree.search({ minX: 999999, minY: 1999999, maxX: 1002000, maxY: 2002000 });
      assert.equal(hitsPos.length, 1);
      assert.equal(hitsPos[0].id, 'pos-box');
    });

    test('T2.5: Guttman quadratic split triggers when entries exceed maxEntries (M=9)', () => {
      const tree = new SpatialRTree(9);
      // Insert 20 boxes to trigger multiple quadratic splits
      for (let i = 0; i < 20; i++) {
        tree.insert({
          minX: i * 15,
          minY: (i % 2) * 20,
          maxX: i * 15 + 10,
          maxY: (i % 2) * 20 + 10,
          id: `item-${i}`
        });
      }

      assert.equal(tree.all().length, 20);
      assert.equal(tree.root.leaf, false, 'Tree root should become non-leaf after splits');
      assert.ok(tree.root.entries.length >= 2, 'Root must have partitioned into multiple subnodes');

      // Verify that every single item remains searchable with zero false negatives
      for (let i = 0; i < 20; i++) {
        const found = tree.search({ minX: i * 15 + 2, minY: (i % 2) * 20 + 2, maxX: i * 15 + 3, maxY: (i % 2) * 20 + 3 });
        assert.equal(found.length, 1, `Item ${i} must be found via spatial search`);
        assert.equal(found[0].id, `item-${i}`);
      }
    });

    test('T2.6: Inverted coordinates (minX > maxX) are automatically normalized', () => {
      const tree = new SpatialRTree(9);
      tree.insert({ minX: 100, minY: 100, maxX: 50, maxY: 50, id: 'inverted' });

      const all = tree.all();
      assert.equal(all[0].minX, 50);
      assert.equal(all[0].maxX, 100);
      assert.equal(all[0].minY, 50);
      assert.equal(all[0].maxY, 100);
    });
  });

  // ==========================================================================
  // TIER 3: Cross-Feature Combinations
  // ==========================================================================
  describe('Tier 3: Cross-Feature Combinations', () => {

    test('T3.1: Spatial collision detection ensures zero slot overlap (0px² collision invariant)', () => {
      const tree = new SpatialRTree(9);
      const allocatedSlots = [];

      const candidateElements = [
        { id: 'hero-title', minX: 100, minY: 100, maxX: 700, maxY: 180, fontSize: 48, fontWeight: 700 },
        { id: 'hero-subtitle', minX: 100, minY: 190, maxX: 500, maxY: 230, fontSize: 18, fontWeight: 400 },
        { id: 'bad-overlapping-badge', minX: 650, minY: 160, maxX: 750, maxY: 200, fontSize: 14, fontWeight: 600 } // overlaps hero-title
      ];

      for (const el of candidateElements) {
        const bbox = { minX: el.minX, minY: el.minY, maxX: el.maxX, maxY: el.maxY, id: el.id };
        if (!tree.collides(bbox)) {
          tree.insert(bbox);
          allocatedSlots.push(el.id);
        }
      }

      assert.deepEqual(allocatedSlots, ['hero-title', 'hero-subtitle']);
      assert.ok(!allocatedSlots.includes('bad-overlapping-badge'), 'Overlapping badge must be rejected by spatial index');
    });

    test('T3.2: R-Tree indexing of repeating carousel cards verified via Subtree Isomorphism', () => {
      const tree = new SpatialRTree(9);
      const cardWidth = 350;
      const cardHeight = 450;
      const cardAreas = [];

      for (let i = 0; i < 4; i++) {
        const minX = i * (cardWidth + 20);
        const cardBox = {
          minX,
          minY: 100,
          maxX: minX + cardWidth,
          maxY: 100 + cardHeight,
          id: `card-${i}`
        };
        cardAreas.push(cardWidth * cardHeight);
        tree.insert(cardBox);
      }

      // 1. Verify Subtree Isomorphism CV <= 0.15
      const cv = computeAreaCV(cardAreas);
      assert.equal(cv, 0.0, 'Identical card geometry must have 0 CV area variance');

      // 2. Spatial queries on ribbon segments
      const leftHalf = tree.search({ minX: 0, minY: 0, maxX: 700, maxY: 600 });
      assert.equal(leftHalf.length, 2, 'Should find exactly first 2 cards in left half');
      assert.deepEqual(leftHalf.map(c => c.id).sort(), ['card-0', 'card-1']);
    });
  });

  // ==========================================================================
  // TIER 4: Real-World Application Scenarios
  // ==========================================================================
  describe('Tier 4: Real-World Application Scenarios', () => {

    test('T4.1: Full Section Capsule Slot Extraction with Editorial Headline Prioritization', () => {
      const tree = new SpatialRTree(9);
      const rawDomElements = [
        { tag: 'h1', text: 'Sculpted Acoustics', minX: 80, minY: 120, maxX: 850, maxY: 220, fontSize: 56, fontWeight: 800 },
        { tag: 'p', text: 'Zero resonance enclosure', minX: 80, minY: 240, maxX: 450, maxY: 300, fontSize: 14, fontWeight: 400 },
        { tag: 'button', text: 'Pre-order Now', minX: 80, minY: 320, maxX: 260, maxY: 380, fontSize: 16, fontWeight: 600 },
        { tag: 'div', text: 'Card 1', minX: 900, minY: 120, maxX: 1300, maxY: 650, fontSize: 14, fontWeight: 400 },
        { tag: 'div', text: 'Card 2', minX: 1350, minY: 120, maxX: 1750, maxY: 650, fontSize: 14, fontWeight: 400 },
        { tag: 'span', text: 'Footnote', minX: 80, minY: 800, maxX: 400, maxY: 825, fontSize: 12, fontWeight: 300 }
      ];

      const taggedSlots = [];

      for (const el of rawDomElements) {
        const width = el.maxX - el.minX;
        const height = el.maxY - el.minY;
        const area = width * height;
        const energy = computeTypographicEnergy(el.fontSize, el.fontWeight, area, width, height);

        const slot = {
          ...el,
          energy,
          isSlot: energy >= 3.8 || el.tag === 'button'
        };

        if (slot.isSlot) {
          tree.insert({
            minX: el.minX,
            minY: el.minY,
            maxX: el.maxX,
            maxY: el.maxY,
            id: `${el.tag}-${taggedSlots.length}`,
            data: slot
          });
          taggedSlots.push(slot);
        }
      }

      // H1 (energy >= 3.8) and button (explicit CTA) are tagged slots
      assert.equal(taggedSlots.length, 2);
      assert.equal(taggedSlots[0].tag, 'h1');
      assert.equal(taggedSlots[1].tag, 'button');

      // Spatial hit test for CTA button click
      const clickPoint = { minX: 150, minY: 350, maxX: 150, maxY: 350 };
      const hits = tree.search(clickPoint);
      assert.equal(hits.length, 1);
      assert.equal(hits[0].tag, 'button');
    });
  });
});
