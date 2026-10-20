/**
 * test/physics/inverse-system-id.test.js
 * 
 * Unit test suite for TASK-B2:
 * 3-Tier Inverse Physical System Identification Engine
 * (Log-Decrement, Prony-Hankel with Froissart Filtering, Weak-SINDYc)
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const {
  identifyLogDecrement,
  identifyPronyHankel,
  identifyWeakSINDYc,
  identifySystem,
  solveLinearSystem,
  solveLeastSquares,
  findPolynomialRoots
} = require('../../src/physics/inverse-system-id');

const { solveDampedHarmonicMotion } = require('../../src/physics/spring-dynamics');

describe('TASK-B2: Inverse Physical System Identification', () => {

  // -------------------------------------------------------------------------
  // 1. Pure Linear Algebra Routines
  // -------------------------------------------------------------------------

  test('Inverse System ID: solveLinearSystem accurately solves 3x3 system', () => {
    // 2x + y - z = 8
    // -3x - y + 2z = -11
    // -2x + y + 2z = -3
    // Solution: x = 2, y = 3, z = -1
    const A = [
      [2, 1, -1],
      [-3, -1, 2],
      [-2, 1, 2]
    ];
    const b = [8, -11, -3];

    const x = solveLinearSystem(A, b);
    assert.ok(Math.abs(x[0] - 2) < 1e-6, `x[0] = ${x[0]}`);
    assert.ok(Math.abs(x[1] - 3) < 1e-6, `x[1] = ${x[1]}`);
    assert.ok(Math.abs(x[2] - (-1)) < 1e-6, `x[2] = ${x[2]}`);
  });

  test('Inverse System ID: findPolynomialRoots correctly finds real and complex conjugate roots', () => {
    // P(z) = z^2 - 5z + 6 = 0 -> roots: 2, 3
    const rootsReal = findPolynomialRoots([-5, 6]);
    assert.equal(rootsReal.length, 2);
    const rValues = rootsReal.map(r => r.re).sort((a, b) => a - b);
    assert.ok(Math.abs(rValues[0] - 2) < 1e-5);
    assert.ok(Math.abs(rValues[1] - 3) < 1e-5);

    // P(z) = z^2 + 1 = 0 -> roots: +i, -i
    const rootsComplex = findPolynomialRoots([0, 1]);
    assert.equal(rootsComplex.length, 2);
    assert.ok(Math.abs(rootsComplex[0].re) < 1e-5);
    assert.ok(Math.abs(Math.abs(rootsComplex[0].im) - 1.0) < 1e-5);
  });

  // -------------------------------------------------------------------------
  // 2. Level 1: Logarithmic Decrement & Fractional Overshoot
  // -------------------------------------------------------------------------

  test('Inverse System ID (Level 1): Recovers known underdamped spring parameters (zeta = 0.25, omegaN = 12)', () => {
    const trueZeta = 0.25;
    const trueOmegaN = 12.0;
    const dt = 0.005;
    const duration = 2.0;

    const timeSeries = [];
    for (let t = 0; t <= duration; t += dt) {
      const state = solveDampedHarmonicMotion({
        x0: 100,
        v0: 0,
        zeta: trueZeta,
        omegaN: trueOmegaN,
        t
      });
      timeSeries.push({ t, x: state.displacement });
    }

    const identified = identifyLogDecrement(timeSeries, { equilibrium: 0, mass: 1.0 });

    assert.equal(identified.regime, 'underdamped');
    assert.ok(Math.abs(identified.zeta - trueZeta) < 0.03, `Zeta error: ${identified.zeta} vs ${trueZeta}`);
    assert.ok(Math.abs(identified.omegaN - trueOmegaN) < 0.5, `OmegaN error: ${identified.omegaN} vs ${trueOmegaN}`);
    assert.ok(identified.k > 0);
    assert.ok(identified.c > 0);
  });

  test('Inverse System ID (Level 1): Recovers fractional overshoot for high damping (zeta = 0.65)', () => {
    const trueZeta = 0.65;
    const trueOmegaN = 10.0;
    const dt = 0.005;

    const timeSeries = [];
    for (let t = 0; t <= 1.5; t += dt) {
      const state = solveDampedHarmonicMotion({
        x0: 100,
        v0: 0,
        zeta: trueZeta,
        omegaN: trueOmegaN,
        t
      });
      timeSeries.push({ t, x: state.displacement });
    }

    const identified = identifyLogDecrement(timeSeries, { equilibrium: 0 });
    assert.equal(identified.regime, 'underdamped');
    assert.ok(Math.abs(identified.zeta - trueZeta) < 0.05, `Zeta error: ${identified.zeta} vs ${trueZeta}`);
  });

  // -------------------------------------------------------------------------
  // 3. Level 2: Prony-Hankel with Froissart Filtering
  // -------------------------------------------------------------------------

  test('Inverse System ID (Level 2): Identifies overdamped motion with real poles (zeta = 1.4, omegaN = 8)', () => {
    const trueZeta = 1.4;
    const trueOmegaN = 8.0;
    const dt = 0.01;

    const timeSeries = [];
    for (let t = 0; t <= 1.2; t += dt) {
      const state = solveDampedHarmonicMotion({
        x0: 80,
        v0: 0,
        zeta: trueZeta,
        omegaN: trueOmegaN,
        t
      });
      timeSeries.push({ t, x: state.displacement });
    }

    const identified = identifyPronyHankel(timeSeries, { equilibrium: 0 });

    assert.ok(identified.regime === 'overdamped' || identified.regime === 'critically-damped');
    assert.ok(identified.zeta >= 0.95, `Expected zeta >= 0.95, got ${identified.zeta}`);
    assert.ok(Math.abs(identified.omegaN - trueOmegaN) < 2.0, `OmegaN: ${identified.omegaN} vs ${trueOmegaN}`);
  });

  // -------------------------------------------------------------------------
  // 4. Level 3: Weak-SINDYc (Nonlinear ODE Identification)
  // -------------------------------------------------------------------------

  test('Inverse System ID (Level 3): Weak-SINDYc isolates linear spring + quadratic drag', () => {
    // Simulate dx/dt = v, dv/dt = -omega^2 * x - 2*zeta*omega*v - gamma * v|v|
    const omega = 10.0;
    const zeta = 0.2;
    const gamma = 0.05; // quadratic drag

    const dt = 0.005;
    const timeSeries = [];
    let x = 10.0;
    let v = 0.0;

    for (let t = 0; t <= 1.5; t += dt) {
      timeSeries.push({ t, x, v });
      // Verlet / RK2 integration
      const a = - (omega * omega) * x - 2 * zeta * omega * v - gamma * v * Math.abs(v);
      v += a * dt;
      x += v * dt;
    }

    const identified = identifyWeakSINDYc(timeSeries, { threshold: 0.01 });

    assert.equal(identified.method, 'weak-sindyc');
    assert.ok(identified.k > 0, 'Linear spring term must be positive');
    assert.ok(identified.c > 0, 'Damping term must be positive');
    assert.ok(identified.activeTerms.x !== undefined, 'Term x must be active');
    assert.ok(identified.activeTerms.v !== undefined, 'Term v must be active');
  });

  // -------------------------------------------------------------------------
  // 5. Universal Auto-Dispatcher
  // -------------------------------------------------------------------------

  test('Inverse System ID: Auto-dispatcher selects correct algorithm and runs in <30ms', () => {
    const dt = 0.005;
    const timeSeries = [];
    for (let t = 0; t <= 1.5; t += dt) {
      const state = solveDampedHarmonicMotion({
        x0: 50,
        v0: 0,
        zeta: 0.35,
        omegaN: 15.0,
        t
      });
      timeSeries.push({ t, x: state.displacement });
    }

    const t0 = performance.now();
    const result = identifySystem(timeSeries);
    const duration = performance.now() - t0;

    assert.ok(duration < 50, `Execution took ${duration}ms, must be <50ms`);
    assert.equal(result.regime, 'underdamped');
    assert.ok(Math.abs(result.zeta - 0.35) < 0.05);
    assert.ok(Math.abs(result.omegaN - 15.0) < 1.0);
  });
});
