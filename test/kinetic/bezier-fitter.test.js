/**
 * test/kinetic/bezier-fitter.test.js
 * 
 * Unit test suite for TASK-B1:
 * Schneider (1990) Cubic Bézier Curve Fitter & Deterministic CDP Kinetic Decompiler
 */

'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
  fitCurve,
  fitEasingToMultiSegmentBezier,
  evaluateBezier,
  evaluateBezierPrime,
  evaluateBezierPrimePrime,
  computeLeftTangent,
  computeRightTangent,
  computeCenterTangent,
  chordLengthParameterize,
  newtonRaphsonRootFind,
  computeMaxError
} = require('../../src/kinetic/bezier-fitter');

const { KineticTimelineInterceptor } = require('../../src/cdp/kinetic-timeline-interceptor');

// ---------------------------------------------------------------------------
// 1. Math Primitives & Tangents
// ---------------------------------------------------------------------------

test('Schneider Fitter: Tangent vectors compute unit direction correctly', () => {
  const points = [[0, 0], [1, 2], [3, 5], [6, 9]];
  
  const leftT = computeLeftTangent(points, 0);
  assert.ok(Math.abs(Math.hypot(leftT[0], leftT[1]) - 1) < 1e-6, 'Left tangent must be unit vector');
  assert.ok(leftT[0] > 0 && leftT[1] > 0, 'Left tangent must point towards second point');

  const rightT = computeRightTangent(points, points.length - 1);
  assert.ok(Math.abs(Math.hypot(rightT[0], rightT[1]) - 1) < 1e-6, 'Right tangent must be unit vector');
  assert.ok(rightT[0] < 0 && rightT[1] < 0, 'Right tangent must point towards penultimate point');

  const centerT = computeCenterTangent(points, 1);
  assert.ok(Math.abs(Math.hypot(centerT[0], centerT[1]) - 1) < 1e-6, 'Center tangent must be unit vector');
});

test('Schneider Fitter: Chord length parameterization maps monotonically to [0, 1]', () => {
  const points = [[0, 0], [3, 4], [3, 9], [7, 12]]; // dists: 5, 5, 5 -> total 15
  const u = chordLengthParameterize(points);

  assert.equal(u.length, 4);
  assert.equal(u[0], 0);
  assert.ok(Math.abs(u[1] - 5 / 15) < 1e-6);
  assert.ok(Math.abs(u[2] - 10 / 15) < 1e-6);
  assert.equal(u[3], 1);
});

// ---------------------------------------------------------------------------
// 2. Bézier Evaluation & Newton-Raphson
// ---------------------------------------------------------------------------

test('Schneider Fitter: evaluateBezier and derivatives match exact analytic values', () => {
  // Linear bezier from (0,0) to (1,1)
  const b = [[0, 0], [1/3, 1/3], [2/3, 2/3], [1, 1]];
  
  const p0 = evaluateBezier(b, 0);
  const pMid = evaluateBezier(b, 0.5);
  const p1 = evaluateBezier(b, 1);

  assert.deepEqual(p0, [0, 0]);
  assert.ok(Math.abs(pMid[0] - 0.5) < 1e-6 && Math.abs(pMid[1] - 0.5) < 1e-6);
  assert.deepEqual(p1, [1, 1]);

  const prime = evaluateBezierPrime(b, 0.5);
  assert.ok(Math.abs(prime[0] - 1) < 1e-6 && Math.abs(prime[1] - 1) < 1e-6);

  const primePrime = evaluateBezierPrimePrime(b, 0.5);
  assert.ok(Math.abs(primePrime[0]) < 1e-6 && Math.abs(primePrime[1]) < 1e-6);
});

test('Schneider Fitter: Newton-Raphson refines parameter closer to orthogonal projection', () => {
  const b = [[0, 0], [0, 1], [1, 1], [1, 0]];
  const targetPt = [0.5, 0.8]; // close to apex at u=0.5
  
  const initialU = 0.3;
  const refinedU = newtonRaphsonRootFind(b, targetPt, initialU);

  const initialDist = Math.hypot(evaluateBezier(b, initialU)[0] - targetPt[0], evaluateBezier(b, initialU)[1] - targetPt[1]);
  const refinedDist = Math.hypot(evaluateBezier(b, refinedU)[0] - targetPt[0], evaluateBezier(b, refinedU)[1] - targetPt[1]);

  assert.ok(refinedDist <= initialDist, 'Newton-Raphson refinement must decrease or preserve distance');
});

// ---------------------------------------------------------------------------
// 3. Curve Fitting Precision (Collinear, Known Bézier, S-Curve)
// ---------------------------------------------------------------------------

test('Schneider Fitter: Exact collinear points fit into a single linear Bézier with near-zero error', () => {
  const points = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    points.push([t, 2 * t + 5]);
  }

  const beziers = fitCurve(points, 0.01);
  assert.equal(beziers.length, 1, 'Collinear points must fit into exactly 1 segment');

  const maxErr = computeMaxError(points, beziers[0], chordLengthParameterize(points)).maxError;
  assert.ok(maxErr < 1e-4, `Max error must be negligible, got ${maxErr}`);
});

test('Schneider Fitter: Reconstructs known cubic Bézier curve within maxError tolerance', () => {
  const originalBezier = [[0, 0], [0.16, 1.0], [0.3, 1.0], [1.0, 1.0]]; // Snappy easing
  const samples = [];
  for (let i = 0; i <= 40; i++) {
    samples.push(evaluateBezier(originalBezier, i / 40));
  }

  const beziers = fitCurve(samples, 0.02);
  assert.ok(beziers.length >= 1, 'Should fit into at least 1 segment');

  // Verify all samples fall within tolerance of the fitted curve
  for (const pt of samples) {
    let minDist = Infinity;
    for (const b of beziers) {
      for (let u = 0; u <= 1; u += 0.002) {
        const q = evaluateBezier(b, u);
        const d = Math.hypot(q[0] - pt[0], q[1] - pt[1]);
        if (d < minDist) minDist = d;
      }
    }
    assert.ok(minDist <= 0.02, `Point [${pt}] deviated by ${minDist} > 0.02`);
  }
});

test('Schneider Fitter: Splits curve at sharp corners', () => {
  // L-shaped sharp corner: (0,0) -> (1,0) -> (1,1)
  const points = [];
  for (let x = 0; x <= 1; x += 0.1) points.push([x, 0]);
  for (let y = 0.1; y <= 1; y += 0.1) points.push([1, y]);

  const beziers = fitCurve(points, 0.05);
  assert.ok(beziers.length >= 2, `Sharp 90-degree corner must subdivide, got ${beziers.length} segments`);
});

// ---------------------------------------------------------------------------
// 4. Easing To Multi-Segment Bézier (CSS / GSAP compatibility)
// ---------------------------------------------------------------------------

test('Schneider Fitter: fitEasingToMultiSegmentBezier emits valid CSS cubic-bezier string', () => {
  // Smoothstep easing S-curve: y = 3t^2 - 2t^3
  const samples = [];
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const y = 3 * t * t - 2 * t * t * t;
    samples.push({ t: t * 1000, val: y });
  }

  const result = fitEasingToMultiSegmentBezier(samples, 0.02);
  assert.ok(result.beziers.length >= 1);
  assert.match(result.cssCubicBezier, /^cubic-bezier\(\s*[\d\.\-]+,\s*[\d\.\-]+,\s*[\d\.\-]+,\s*[\d\.\-]+\s*\)$/);
});

// ---------------------------------------------------------------------------
// 5. Deterministic Timeline Sampling via CDP & Interceptor
// ---------------------------------------------------------------------------

test('KineticTimelineInterceptor: sampleTimelineDeterministic captures and fits Bézier without real-time delay', async () => {
  const interceptor = new KineticTimelineInterceptor();

  // Mock CDP session simulating Animation domain
  const seekCalls = [];
  const mockSession = {
    send: async (method, params) => {
      if (method === 'Animation.seekAnimations') {
        seekCalls.push(params.currentTime);
      }
      return {};
    }
  };

  const result = await interceptor.sampleTimelineDeterministic(mockSession, {
    dtMs: 4,
    durationMs: 40,
    animationIds: ['anim-1'],
    maxBezierError: 0.02
  });

  assert.equal(result.dtMs, 4);
  assert.equal(result.durationMs, 40);
  assert.equal(result.samplesCount, 11); // 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40
  assert.equal(seekCalls.length, 11);
  assert.ok(Array.isArray(result.beziers));
  assert.ok(result.cssCubicBezier.startsWith('cubic-bezier('));
});
