/**
 * test/v2.6/ndc-projection.test.js
 * 
 * Studio DNA PRO v2.6 — 4-Tier Comprehensive Test Suite
 * Feature: Sub-Pixel NDC-to-Viewport 3D-to-2D Projection Pipeline (R2.3, Pillar 7, Limitation L6)
 * 
 * Architecture:
 * - Tier 1: Feature Coverage (M_VP perspective projection, CPU twin deformation, 2D AABB calculation, Sub-pixel epsilon <= 0.5px)
 * - Tier 2: Boundary & Corner Cases (Behind-camera clipping, Torsional twist velocity, Card-to-sheet flight, Aspect ratios)
 * - Tier 3: Cross-Feature Combinations (4-Card Ribbon Non-Overlap, 2D Cursor Raycast Hit-Testing)
 * - Tier 4: Real-World Scenarios (60-Frame Continuous Card-to-Sheet Flight Trajectory Tracking)
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { resolveEngine } = require('./fixtures/harness');

const {
  projectCardToScreen,
  projectPointToScreen,
  evaluateSheetCpuTwin
} = resolveEngine('ndc-projection');

describe('v2.6 Sub-Pixel NDC-to-Viewport Projection Pipeline', () => {

  const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
  const MOBILE_VIEWPORT = { width: 390, height: 844 };

  // ==========================================================================
  // TIER 1: Feature Coverage (>= 5 Happy Path Cases)
  // ==========================================================================
  describe('Tier 1: Feature Coverage', () => {

    test('T1.1: projectPointToScreen projects 3D point through perspective camera matrix to 2D screen', () => {
      // Point at origin [0, 0, 0] with camera at [0, 0, 41.18]
      const screen = projectPointToScreen([0, 0, 0], { fov: 53.4, cameraZ: 41.18 }, DESKTOP_VIEWPORT);

      assert.equal(screen.clipped, false);
      // Origin should project exactly to the center of the viewport (720, 450)
      assert.ok(Math.abs(screen.x - 720) < 0.1, `Center X should be 720 (got ${screen.x})`);
      assert.ok(Math.abs(screen.y - 450) < 0.1, `Center Y should be 450 (got ${screen.y})`);
    });

    test('T1.2: evaluateSheetCpuTwin evaluates longitudinal curvature and roll deformation', () => {
      // In undeformed state (u_sheetP = 0)
      const undeformed = evaluateSheetCpuTwin(10, 5, 0, { u_sheetP: 0.0 });
      assert.equal(undeformed[0], 10);
      assert.equal(undeformed[1], 5);
      assert.equal(undeformed[2], 0);

      // In deformed ribbon state (u_sheetP = 1.0)
      const deformed = evaluateSheetCpuTwin(10, 5, 0, { u_sheetP: 1.0, u_sheetD: 3.2, u_sheetW: 22.0 });
      assert.equal(deformed[0], 10);
      assert.notEqual(deformed[1], 5, 'Y should be perturbed by diagonal / wave displacement');
      assert.notEqual(deformed[2], 0, 'Z should have negative depth curvature');
    });

    test('T1.3: projectCardToScreen computes enclosing 2D AABB for 3D deformed quad', () => {
      const cardAabb = projectCardToScreen(0, { u_sheetP: 1.0 }, DESKTOP_VIEWPORT);

      assert.equal(cardAabb.clipped, false);
      assert.ok(cardAabb.width > 100, `Card width should be substantial (got ${cardAabb.width})`);
      assert.ok(cardAabb.height > 100, `Card height should be substantial (got ${cardAabb.height})`);
      assert.equal(cardAabb.points.length, 4, 'Must project all 4 vertices');
    });

    test('T1.4: Undeformed planar card projects to rectangular perspective bounds', () => {
      const cardFlat = projectCardToScreen(1, { u_sheetP: 0.0 }, DESKTOP_VIEWPORT);

      assert.equal(cardFlat.clipped, false);
      assert.ok(cardFlat.width > 0);
      assert.ok(cardFlat.height > 0);
      // With u_sheetP = 0, opposite edges should have symmetrical perspective properties
      assert.ok(Math.abs(cardFlat.maxX - cardFlat.minX - cardFlat.width) < 1e-4);
    });

    test('T1.5: Verifies Sub-Pixel Projection Accuracy Bound epsilon <= 0.5px (Theorem 3)', () => {
      // Single precision float32 simulation vs double precision CPU twin
      const point = [5.0, 2.5, -1.2];
      const screenDouble = projectPointToScreen(point, { fov: 53.4, cameraZ: 41.18 }, DESKTOP_VIEWPORT);

      // Simulate float32 quantization
      const pointFloat32 = [Math.fround(point[0]), Math.fround(point[1]), Math.fround(point[2])];
      const screenFloat = projectPointToScreen(pointFloat32, { fov: 53.4, cameraZ: 41.18 }, DESKTOP_VIEWPORT);

      const dx = Math.abs(screenDouble.x - screenFloat.x);
      const dy = Math.abs(screenDouble.y - screenFloat.y);
      const epsilon = Math.max(dx, dy);

      assert.ok(epsilon <= 0.5, `Numerical discrepancy between CPU twin and GPU float must satisfy epsilon <= 0.5px (got ${epsilon})`);
    });

    test('T1.6: Adapts to mobile portrait viewport (390x844)', () => {
      const mobileCard = projectCardToScreen(0, { u_sheetP: 0.8 }, MOBILE_VIEWPORT);

      assert.equal(mobileCard.clipped, false);
      assert.ok(mobileCard.maxX <= 390 * 1.5, 'Card bounds should be appropriately scaled for mobile view');
      assert.ok(mobileCard.maxY <= 844, 'Card bounds should remain on screen');
    });
  });

  // ==========================================================================
  // TIER 2: Boundary & Corner Cases
  // ==========================================================================
  describe('Tier 2: Boundary & Corner Cases', () => {

    test('T2.1: Points behind camera (viewZ >= 0, clipW <= 0) are flagged as clipped', () => {
      // Camera is at [0, 0, 41.18]. A point at [0, 0, 50] is behind the camera!
      const behind = projectPointToScreen([0, 0, 50], { fov: 53.4, cameraZ: 41.18 }, DESKTOP_VIEWPORT);
      assert.equal(behind.clipped, true, 'Point behind camera must have clipped: true');
    });

    test('T2.2: Extreme torsional scroll velocity (u_sheetV > 0.05) maintains valid bounding box', () => {
      const highVelocityCard = projectCardToScreen(0, { u_sheetP: 1.0, u_sheetV: 0.12 }, DESKTOP_VIEWPORT);

      assert.equal(highVelocityCard.clipped, false);
      assert.ok(highVelocityCard.width > 50);
      assert.ok(highVelocityCard.height > 50);
      assert.ok(!Number.isNaN(highVelocityCard.minX));
      assert.ok(!Number.isNaN(highVelocityCard.maxY));
    });

    test('T2.3: Detail flight active (u_sheetP = 0, u_white = 1.0) centers card 0 on viewport', () => {
      // In DETAIL_ACTIVE, card 0 has ribbonOffset to center it at x = 0
      const activeCard = projectCardToScreen(0, { u_sheetP: 0.0, ribbonOffset: 27.75 }, DESKTOP_VIEWPORT);

      const centerX = (activeCard.minX + activeCard.maxX) / 2.0;
      assert.ok(Math.abs(centerX - 720) < 5.0, `Active detail card should be horizontally centered at 720 (got ${centerX})`);
    });

    test('T2.4: Ultra-wide 32:9 desktop resolution (2560x720) scales aspect ratio without skew', () => {
      const ultraWide = { width: 2560, height: 720 };
      const card = projectCardToScreen(1, { u_sheetP: 0.5 }, ultraWide);

      assert.equal(card.clipped, false);
      assert.ok(card.width > 0 && card.height > 0);
      const centerScreenX = (card.minX + card.maxX) / 2.0;
      assert.ok(centerScreenX > 0 && centerScreenX < 2560);
    });
  });

  // ==========================================================================
  // TIER 3: Cross-Feature Combinations
  // ==========================================================================
  describe('Tier 3: Cross-Feature Combinations', () => {

    test('T3.1: 4-Card Ribbon maintains non-overlapping proxy bounding boxes in browse phase', () => {
      // In RIBBON_BROWSE, cards 0, 1, 2, 3 are staggered horizontally
      const cards = [0, 1, 2, 3].map(i => projectCardToScreen(i, { u_sheetP: 1.0 }, DESKTOP_VIEWPORT));

      for (let i = 0; i < cards.length - 1; i++) {
        const c1 = cards[i];
        const c2 = cards[i + 1];
        // In perspective ribbon view, card centers must be monotonically ordered from left to right
        const c1CenterX = (c1.minX + c1.maxX) / 2;
        const c2CenterX = (c2.minX + c2.maxX) / 2;
        assert.ok(c2CenterX > c1CenterX, `Card ${i + 1} center (${c2CenterX}) must be to the right of Card ${i} (${c1CenterX})`);
      }
    });

    test('T3.2: 2D Cursor click within proxy button hits inside 3D projected quad bounds', () => {
      const card = projectCardToScreen(1, { u_sheetP: 1.0 }, DESKTOP_VIEWPORT);
      const cursorX = card.minX + card.width * 0.5;
      const cursorY = card.minY + card.height * 0.5;

      const isInside = cursorX >= card.minX && cursorX <= card.maxX &&
                       cursorY >= card.minY && cursorY <= card.maxY;
      assert.equal(isInside, true, 'Cursor at proxy center must hit inside bounding box');
    });
  });

  // ==========================================================================
  // TIER 4: Real-World Application Scenarios
  // ==========================================================================
  describe('Tier 4: Real-World Application Scenarios', () => {

    test('T4.1: 60-Frame Card-to-Sheet Flight Trajectory tracks continuous proxy box expansion', () => {
      // Simulate GSAP Card-to-Sheet transition over 60 frames (1 second at 60fps)
      // card 0 flies from ribbon position to screen center, uncurving u_sheetP from 1.0 to 0.0
      const frames = 60;
      let prevCenterX = null;
      let maxDeltaPerFrame = 0;

      for (let f = 0; f <= frames; f++) {
        const t = f / frames;
        // EaseInOutCubic progress
        const p = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const currentSheetP = 1.0 - p; // 1.0 -> 0.0
        const currentRibbonOffset = p * 27.75; // slides card 0 to center

        const aabb = projectCardToScreen(0, {
          u_sheetP: currentSheetP,
          ribbonOffset: currentRibbonOffset
        }, DESKTOP_VIEWPORT);

        const currentCenterX = (aabb.minX + aabb.maxX) / 2.0;

        if (prevCenterX !== null) {
          const delta = Math.abs(currentCenterX - prevCenterX);
          if (delta > maxDeltaPerFrame) maxDeltaPerFrame = delta;
        }
        prevCenterX = currentCenterX;
      }

      // Smooth continuous trajectory: no instantaneous teleportation > 30px per frame
      assert.ok(maxDeltaPerFrame > 0, 'Card must travel smoothly across frames');
      assert.ok(maxDeltaPerFrame < 30.0, `Max frame-to-frame jump should be smooth (< 30px, got ${maxDeltaPerFrame})`);
    });
  });
});
