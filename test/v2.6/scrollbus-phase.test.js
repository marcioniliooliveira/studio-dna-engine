/**
 * test/v2.6/scrollbus-phase.test.js
 * 
 * Studio DNA PRO v2.6 — 4-Tier Comprehensive Test Suite
 * Feature: UniversalScrollBus Piecewise Affine Phase Mapping (R2.1, Pillar 7, Limitation L6)
 * 
 * Architecture:
 * - Tier 1: Feature Coverage (Piecewise mapping equations, p_portal, p_ribbon, phase states, EMA velocity)
 * - Tier 2: Boundary & Corner Cases (Negative scroll, Extreme overscroll, Velocity decay, Zero expand duration)
 * - Tier 3: Cross-Feature Combinations (ScrollBus + DOM Pointer Events & Clip-Path, ScrollBus + 3D Ribbon Stride)
 * - Tier 4: Real-World Scenarios (End-to-End Deadlock-Free Continuous Scroll Arc)
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { resolveEngine } = require('./fixtures/harness');

const { UniversalScrollBus } = resolveEngine('scrollbus-phase');

describe('v2.6 UniversalScrollBus & Kinetic Phase Engine', () => {

  const VIEWPORT_HEIGHT = 900;
  // muExpand = 1.0 (900px), muHold = 2.5 (2250px), muExit = 1.0 (900px)
  // t1 = 500, t2 = 1400, t3 = 3650, t4 = 4550
  const busConfig = {
    viewportHeight: VIEWPORT_HEIGHT,
    muExpand: 1.0,
    muHold: 2.5,
    muExit: 1.0,
    prePinDistance: 500
  };

  // ==========================================================================
  // TIER 1: Feature Coverage (>= 5 Happy Path Cases)
  // ==========================================================================
  describe('Tier 1: Feature Coverage', () => {

    test('T1.1: Parameterizes global scroll interval transition points (t1, t2, t3, t4)', () => {
      const bus = new UniversalScrollBus(busConfig);

      assert.equal(bus.t1, 500, 't1 = prePinDistance');
      assert.equal(bus.t2, 1400, 't2 = t1 + 1.0 * vHeight');
      assert.equal(bus.t3, 3650, 't3 = t2 + 2.5 * vHeight');
      assert.equal(bus.t4, 4550, 't4 = t3 + 1.0 * vHeight');
    });

    test('T1.2: Phase s < t1: IDLE with p_portal = 0 and p_ribbon = 0', () => {
      const bus = new UniversalScrollBus(busConfig);
      const state = bus.calculatePhases(250);

      assert.equal(state.phase, 'IDLE');
      assert.equal(state.pPortal, 0.0);
      assert.equal(state.pRibbon, 0.0);
    });

    test('T1.3: Phase t1 <= s < t2: PORTAL_EXPAND with linear p_portal ramping 0 -> 1', () => {
      const bus = new UniversalScrollBus(busConfig);
      // Midpoint of expansion: s = 500 + 450 = 950
      const state = bus.calculatePhases(950);

      assert.equal(state.phase, 'PORTAL_EXPAND');
      assert.ok(Math.abs(state.pPortal - 0.5) < 1e-4, `pPortal should be 0.5 at midpoint (got ${state.pPortal})`);
      assert.equal(state.pRibbon, 0.0, 'pRibbon must remain 0 during portal expansion');
    });

    test('T1.4: Phase t2 <= s <= t3: RIBBON_BROWSE with p_portal = 1.0 and p_ribbon ramping 0 -> 1', () => {
      const bus = new UniversalScrollBus(busConfig);
      // Midpoint of ribbon browse: s = 1400 + 1125 = 2525
      const state = bus.calculatePhases(2525);

      assert.equal(state.phase, 'RIBBON_BROWSE');
      assert.equal(state.pPortal, 1.0, 'Portal must remain fully expanded (pPortal = 1.0)');
      assert.ok(Math.abs(state.pRibbon - 0.5) < 1e-4, `pRibbon should be 0.5 at midpoint (got ${state.pRibbon})`);
    });

    test('T1.5: Phase t3 < s <= t4: PORTAL_EXIT with linear p_portal ramp-down 1 -> 0', () => {
      const bus = new UniversalScrollBus(busConfig);
      // Midpoint of exit: s = 3650 + 450 = 4100
      const state = bus.calculatePhases(4100);

      assert.equal(state.phase, 'PORTAL_EXIT');
      assert.ok(Math.abs(state.pPortal - 0.5) < 1e-4, `pPortal should ramp down to 0.5 at exit midpoint (got ${state.pPortal})`);
      assert.equal(state.pRibbon, 1.0, 'Ribbon progress must stay at 1.0 during exit');
    });

    test('T1.6: Phase s > t4: RESUME with p_portal = 0 and p_ribbon = 1.0', () => {
      const bus = new UniversalScrollBus(busConfig);
      const state = bus.calculatePhases(5000);

      assert.equal(state.phase, 'RESUME');
      assert.equal(state.pPortal, 0.0);
      assert.equal(state.pRibbon, 1.0);
    });

    test('T1.7: Velocity calculated with Exponential Moving Average (EMA) damping', () => {
      const bus = new UniversalScrollBus({ ...busConfig, alphaVelocity: 0.5 });
      // Tick 1: scroll 0 -> 100 in 16.67ms => raw velocity = 100 / 16.67 = 6.0
      // EMA = 0.5 * 6.0 + 0.5 * 0 = 3.0
      const tick1 = bus.calculatePhases(100, 16.67);
      assert.ok(Math.abs(tick1.velocity - 3.0) < 0.1, `Velocity tick 1 should be ~3.0 (got ${tick1.velocity})`);

      // Tick 2: scroll 100 -> 200 in 16.67ms => raw velocity = 6.0
      // EMA = 0.5 * 6.0 + 0.5 * 3.0 = 4.5
      const tick2 = bus.calculatePhases(200, 16.67);
      assert.ok(Math.abs(tick2.velocity - 4.5) < 0.1, `Velocity tick 2 should be ~4.5 (got ${tick2.velocity})`);
    });
  });

  // ==========================================================================
  // TIER 2: Boundary & Corner Cases
  // ==========================================================================
  describe('Tier 2: Boundary & Corner Cases', () => {

    test('T2.1: Negative scroll (s < 0) clamps cleanly to pPortal = 0, phase = IDLE', () => {
      const bus = new UniversalScrollBus(busConfig);
      const state = bus.calculatePhases(-200);

      assert.equal(state.phase, 'IDLE');
      assert.equal(state.pPortal, 0.0);
      assert.equal(state.pRibbon, 0.0);
    });

    test('T2.2: Extreme overscroll (s = 100,000) produces clean RESUME phase without NaN', () => {
      const bus = new UniversalScrollBus(busConfig);
      const state = bus.calculatePhases(100000);

      assert.equal(state.phase, 'RESUME');
      assert.equal(state.pPortal, 0.0);
      assert.equal(state.pRibbon, 1.0);
      assert.equal(!Number.isNaN(state.velocity), true);
    });

    test('T2.3: Zero expand allocation (muExpand = 0) transitions immediately without divide-by-zero', () => {
      const busZeroExpand = new UniversalScrollBus({
        ...busConfig,
        muExpand: 0.0,
        prePinDistance: 0
      });
      // At s = 0: immediately ready for ribbon browse
      const state = busZeroExpand.calculatePhases(10);
      assert.equal(state.pPortal, 1.0);
      assert.equal(state.phase, 'RIBBON_BROWSE');
    });

    test('T2.4: Idle tick decays velocity towards zero', () => {
      const bus = new UniversalScrollBus({ ...busConfig, alphaVelocity: 0.4 });
      bus.calculatePhases(100, 16.67); // initialize velocity
      const highV = bus.calculatePhases(300, 16.67);

      // Now scroll stays idle at 300
      const idle1 = bus.calculatePhases(300, 16.67);
      assert.ok(idle1.velocity < highV.velocity, 'Velocity must decay when scrolling ceases');

      const idle2 = bus.calculatePhases(300, 16.67);
      assert.ok(idle2.velocity < idle1.velocity, 'Velocity must continue decaying');
    });
  });

  // ==========================================================================
  // TIER 3: Cross-Feature Combinations
  // ==========================================================================
  describe('Tier 3: Cross-Feature Combinations', () => {

    test('T3.1: ScrollBus phase arbitrates DOM pointer-events and modal scroll prevent (Law III)', () => {
      const bus = new UniversalScrollBus(busConfig);

      // 1. During portal expand (pPortal < 0.99): pointerEvents must be 'none' to avoid intercepting wheel
      const expandState = bus.calculatePhases(1000);
      const pointerEventsExpand = expandState.pPortal >= 0.99 ? 'auto' : 'none';
      assert.equal(pointerEventsExpand, 'none', 'Pointer events must be none during expansion');

      // 2. In full browse phase: pointerEvents become 'auto'
      const browseState = bus.calculatePhases(2000);
      const pointerEventsBrowse = browseState.pPortal >= 0.99 && browseState.phase === 'RIBBON_BROWSE' ? 'auto' : 'none';
      assert.equal(pointerEventsBrowse, 'auto', 'Pointer events must activate in ribbon browse phase');

      // 3. During exit phase: pointerEvents return to 'none'
      const exitState = bus.calculatePhases(4200);
      const pointerEventsExit = exitState.pPortal >= 0.99 ? 'auto' : 'none';
      assert.equal(pointerEventsExit, 'none', 'Pointer events must deactivate during portal exit');
    });

    test('T3.2: ScrollBus pRibbon translates 3D ribbon offset proportionally without lockup', () => {
      const bus = new UniversalScrollBus(busConfig);
      const totalRibbonSpan = 4 * 18.5; // 4 cards with stride 18.5

      // At ribbon start (s = t2): offset = 0
      const startState = bus.calculatePhases(bus.t2);
      const offsetStart = startState.pRibbon * totalRibbonSpan;
      assert.equal(offsetStart, 0.0);

      // At ribbon end (s = t3): offset = totalRibbonSpan
      const endState = bus.calculatePhases(bus.t3);
      const offsetEnd = endState.pRibbon * totalRibbonSpan;
      assert.equal(offsetEnd, totalRibbonSpan);
    });
  });

  // ==========================================================================
  // TIER 4: Real-World Application Scenarios
  // ==========================================================================
  describe('Tier 4: Real-World Application Scenarios', () => {

    test('T4.1: Continuous 4-Phase Cinematic Scroll Arc navigates from top to footer without deadlock', () => {
      const bus = new UniversalScrollBus(busConfig);
      const totalPageScroll = 6000;
      const step = 50;
      const visitedPhases = new Set();
      let lastPortalP = null;

      for (let s = 0; s <= totalPageScroll; s += step) {
        const state = bus.calculatePhases(s, 16.67);
        visitedPhases.add(state.phase);

        // Verify that pPortal is always bounded within [0, 1]
        assert.ok(state.pPortal >= 0.0 && state.pPortal <= 1.0);
        // Verify that pRibbon is always bounded within [0, 1]
        assert.ok(state.pRibbon >= 0.0 && state.pRibbon <= 1.0);

        lastPortalP = state.pPortal;
      }

      // Assert all 5 lifecycle phases were visited in smooth succession
      assert.ok(visitedPhases.has('IDLE'), 'Must visit IDLE');
      assert.ok(visitedPhases.has('PORTAL_EXPAND'), 'Must visit PORTAL_EXPAND');
      assert.ok(visitedPhases.has('RIBBON_BROWSE'), 'Must visit RIBBON_BROWSE');
      assert.ok(visitedPhases.has('PORTAL_EXIT'), 'Must visit PORTAL_EXIT');
      assert.ok(visitedPhases.has('RESUME'), 'Must visit RESUME');
      assert.equal(lastPortalP, 0.0, 'Portal must be fully closed on resume to Chapter III');
    });
  });
});
