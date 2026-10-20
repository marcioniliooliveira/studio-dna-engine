/**
 * src/kinetic/bezier-fitter.js
 * 
 * Philip J. Schneider's Curve Fitting Algorithm (Graphics Gems, 1990)
 * Deterministic least-squares cubic Bézier fitting with Newton-Raphson parameter
 * refinement, chord-length parameterization, and recursive subdivision.
 * 
 * Operates in 100% pure Node.js (zero browser, zero external dependencies).
 */

'use strict';

// ---------------------------------------------------------------------------
// 2D Vector Helpers
// ---------------------------------------------------------------------------

function p(x, y) {
  return [Number(x) || 0, Number(y) || 0];
}

function vDist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function vDistSq(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return dx * dx + dy * dy;
}

function vSub(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

function vAdd(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

function vScale(a, s) {
  return [a[0] * s, a[1] * s];
}

function vDot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function vNormalize(a) {
  const len = Math.hypot(a[0], a[1]);
  if (len < 1e-12) return [0, 0];
  return [a[0] / len, a[1] / len];
}

function normalizePointInput(points) {
  if (!Array.isArray(points)) return [];
  const normalized = [];
  for (const item of points) {
    if (Array.isArray(item)) {
      normalized.push([Number(item[0]) || 0, Number(item[1]) || 0]);
    } else if (item && typeof item === 'object') {
      const x = item.x !== undefined ? item.x : (item.t !== undefined ? item.t : 0);
      const y = item.y !== undefined ? item.y : (item.val !== undefined ? item.val : 0);
      normalized.push([Number(x) || 0, Number(y) || 0]);
    }
  }

  // Filter consecutive duplicates
  if (normalized.length <= 1) return normalized;
  const filtered = [normalized[0]];
  for (let i = 1; i < normalized.length; i++) {
    if (vDistSq(normalized[i], filtered[filtered.length - 1]) > 1e-14) {
      filtered.push(normalized[i]);
    }
  }
  return filtered;
}

// ---------------------------------------------------------------------------
// Bézier Evaluation & Derivatives
// ---------------------------------------------------------------------------

/**
 * Evaluates cubic Bézier curve Q(u) = (1-u)^3*V0 + 3u(1-u)^2*V1 + 3u^2(1-u)*V2 + u^3*V3
 */
function evaluateBezier(bezier, u) {
  const [v0, v1, v2, v3] = bezier;
  const t = Math.max(0, Math.min(1, u));
  const omt = 1 - t;
  const omt2 = omt * omt;
  const omt3 = omt2 * omt;
  const t2 = t * t;
  const t3 = t2 * t;

  return [
    omt3 * v0[0] + 3 * t * omt2 * v1[0] + 3 * t2 * omt * v2[0] + t3 * v3[0],
    omt3 * v0[1] + 3 * t * omt2 * v1[1] + 3 * t2 * omt * v2[1] + t3 * v3[1]
  ];
}

/**
 * Evaluates first derivative Q'(u) = 3(1-u)^2*(V1-V0) + 6u(1-u)*(V2-V1) + 3u^2*(V3-V2)
 */
function evaluateBezierPrime(bezier, u) {
  const [v0, v1, v2, v3] = bezier;
  const t = Math.max(0, Math.min(1, u));
  const omt = 1 - t;
  const omt2 = omt * omt;
  const t2 = t * t;

  const d01 = vSub(v1, v0);
  const d12 = vSub(v2, v1);
  const d23 = vSub(v3, v2);

  return [
    3 * omt2 * d01[0] + 6 * t * omt * d12[0] + 3 * t2 * d23[0],
    3 * omt2 * d01[1] + 6 * t * omt * d12[1] + 3 * t2 * d23[1]
  ];
}

/**
 * Evaluates second derivative Q''(u) = 6(1-u)*(V2 - 2V1 + V0) + 6u*(V3 - 2V2 + V1)
 */
function evaluateBezierPrimePrime(bezier, u) {
  const [v0, v1, v2, v3] = bezier;
  const t = Math.max(0, Math.min(1, u));
  const omt = 1 - t;

  const dd0 = [v2[0] - 2 * v1[0] + v0[0], v2[1] - 2 * v1[1] + v0[1]];
  const dd1 = [v3[0] - 2 * v2[0] + v1[0], v3[1] - 2 * v2[1] + v1[1]];

  return [
    6 * omt * dd0[0] + 6 * t * dd1[0],
    6 * omt * dd0[1] + 6 * t * dd1[1]
  ];
}

// ---------------------------------------------------------------------------
// Tangent Computation
// ---------------------------------------------------------------------------

function computeLeftTangent(points, end = 0) {
  if (points.length < 2) return [1, 0];
  return vNormalize(vSub(points[end + 1], points[end]));
}

function computeRightTangent(points, end = points.length - 1) {
  if (points.length < 2) return [-1, 0];
  return vNormalize(vSub(points[end - 1], points[end]));
}

function computeCenterTangent(points, center) {
  if (center <= 0) return computeLeftTangent(points, 0);
  if (center >= points.length - 1) return computeRightTangent(points, points.length - 1);
  const v1 = vSub(points[center - 1], points[center]);
  const v2 = vSub(points[center], points[center + 1]);
  return vNormalize([(v1[0] + v2[0]) / 2, (v1[1] + v2[1]) / 2]);
}

// ---------------------------------------------------------------------------
// Chord-Length Parameterization
// ---------------------------------------------------------------------------

function chordLengthParameterize(points) {
  const u = [0];
  for (let i = 1; i < points.length; i++) {
    u[i] = u[i - 1] + vDist(points[i], points[i - 1]);
  }
  const total = u[u.length - 1];
  if (total <= 1e-12) {
    return points.map((_, i) => i / Math.max(1, points.length - 1));
  }
  for (let i = 1; i < points.length; i++) {
    u[i] /= total;
  }
  return u;
}

// ---------------------------------------------------------------------------
// Least-Squares Single Cubic Bézier Generator
// ---------------------------------------------------------------------------

function generateBezier(points, u, tHat1, tHat2) {
  const n = points.length - 1;
  const p0 = points[0];
  const p3 = points[n];

  let c11 = 0;
  let c12 = 0;
  let c22 = 0;
  let x1 = 0;
  let x2 = 0;

  for (let i = 0; i <= n; i++) {
    const ui = u[i];
    const omui = 1 - ui;
    const b0 = omui * omui * omui;
    const b1 = 3 * ui * omui * omui;
    const b2 = 3 * ui * ui * omui;
    const b3 = ui * ui * ui;

    const a1 = vScale(tHat1, b1);
    const a2 = vScale(tHat2, b2);

    c11 += vDot(a1, a1);
    c12 += vDot(a1, a2);
    c22 += vDot(a2, a2);

    // Q_fixed = (1-ui)^3*P0 + 3*ui*(1-ui)^2*P0 + 3*ui^2*(1-ui)*P3 + ui^3*P3
    const qFixed = [
      (b0 + b1) * p0[0] + (b2 + b3) * p3[0],
      (b0 + b1) * p0[1] + (b2 + b3) * p3[1]
    ];
    const diff = vSub(points[i], qFixed);

    x1 += vDot(a1, diff);
    x2 += vDot(a2, diff);
  }

  const det = c11 * c22 - c12 * c12;
  let alpha1 = 0;
  let alpha2 = 0;

  if (Math.abs(det) > 1e-12) {
    alpha1 = (x1 * c22 - x2 * c12) / det;
    alpha2 = (c11 * x2 - c12 * x1) / det;
  }

  // Fallback if determinant is near-zero or alphas are negative/spurious
  const chord = vDist(p0, p3);
  if (alpha1 <= 1e-6 || alpha2 <= 1e-6 || Math.abs(det) <= 1e-12) {
    alpha1 = chord / 3;
    alpha2 = chord / 3;
  }

  const p1 = vAdd(p0, vScale(tHat1, alpha1));
  const p2 = vAdd(p3, vScale(tHat2, alpha2));

  return [p0, p1, p2, p3];
}

// ---------------------------------------------------------------------------
// Error Evaluation
// ---------------------------------------------------------------------------

function computeMaxError(points, bezier, u) {
  let maxDistSq = 0;
  let splitPoint = Math.floor(points.length / 2);

  for (let i = 1; i < points.length - 1; i++) {
    const q = evaluateBezier(bezier, u[i]);
    const distSq = vDistSq(points[i], q);
    if (distSq > maxDistSq) {
      maxDistSq = distSq;
      splitPoint = i;
    }
  }

  return {
    maxError: Math.sqrt(maxDistSq),
    maxDistSq,
    splitPoint
  };
}

// ---------------------------------------------------------------------------
// Newton-Raphson Parameter Refinement
// ---------------------------------------------------------------------------

function newtonRaphsonRootFind(bezier, pt, u) {
  const q = evaluateBezier(bezier, u);
  const qPrime = evaluateBezierPrime(bezier, u);
  const qPrimePrime = evaluateBezierPrimePrime(bezier, u);

  const diff = vSub(q, pt);
  const num = vDot(diff, qPrime);
  const den = vDot(qPrime, qPrime) + vDot(diff, qPrimePrime);

  if (Math.abs(den) < 1e-12) return u;
  const uNew = u - num / den;
  return Math.max(0, Math.min(1, uNew));
}

function refineParameters(points, bezier, u) {
  const refined = new Array(points.length);
  refined[0] = 0;
  refined[points.length - 1] = 1;

  for (let i = 1; i < points.length - 1; i++) {
    refined[i] = newtonRaphsonRootFind(bezier, points[i], u[i]);
  }
  return refined;
}

// ---------------------------------------------------------------------------
// Recursive Fit Engine
// ---------------------------------------------------------------------------

function fitCubic(points, tHat1, tHat2, maxError, maxDepth = 10, currentDepth = 0) {
  // 1. Trivial base cases
  if (points.length <= 1) return [];
  if (points.length === 2) {
    const chord = vDist(points[0], points[1]) / 3;
    const p0 = points[0];
    const p3 = points[1];
    const p1 = vAdd(p0, vScale(tHat1, chord));
    const p2 = vAdd(p3, vScale(tHat2, chord));
    return [[p0, p1, p2, p3]];
  }

  // 2. Initial parameterization by chord length
  let u = chordLengthParameterize(points);

  // 3. Generate Bézier curve
  let bezier = generateBezier(points, u, tHat1, tHat2);

  // 4. Compute error
  let err = computeMaxError(points, bezier, u);
  if (err.maxError <= maxError) {
    return [bezier];
  }

  // 5. Newton-Raphson refinement (up to 4 iterations)
  for (let iter = 0; iter < 4; iter++) {
    u = refineParameters(points, bezier, u);
    bezier = generateBezier(points, u, tHat1, tHat2);
    err = computeMaxError(points, bezier, u);
    if (err.maxError <= maxError) {
      return [bezier];
    }
  }

  // 6. If recursion limit reached, accept current best
  if (currentDepth >= maxDepth || points.length <= 3) {
    return [bezier];
  }

  // 7. Subdivide at split point
  const splitPoint = Math.max(1, Math.min(points.length - 2, err.splitPoint));
  const tHatCenter = computeCenterTangent(points, splitPoint);

  const leftPoints = points.slice(0, splitPoint + 1);
  const rightPoints = points.slice(splitPoint);

  const leftBeziers = fitCubic(leftPoints, tHat1, tHatCenter, maxError, maxDepth, currentDepth + 1);
  const rightBeziers = fitCubic(rightPoints, vScale(tHatCenter, -1), tHat2, maxError, maxDepth, currentDepth + 1);

  return leftBeziers.concat(rightBeziers);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fits a sequence of 2D digitized points with cubic Bézier segments (Schneider 1990)
 * @param {Array<[number, number]>|Array<{x, y}>} rawPoints
 * @param {number} maxError Maximum permissible Euclidean error
 * @returns {Array<Array<[number, number]>>} Array of cubic Bézier control points [p0, p1, p2, p3]
 */
function fitCurve(rawPoints, maxError = 1.0) {
  const points = normalizePointInput(rawPoints);
  if (points.length < 2) return [];

  // Check collinearity
  const p0 = points[0];
  const pn = points[points.length - 1];
  const chordLen = vDist(p0, pn);

  if (chordLen > 1e-9) {
    let maxDistToChord = 0;
    const dir = vNormalize(vSub(pn, p0));
    for (let i = 1; i < points.length - 1; i++) {
      const v = vSub(points[i], p0);
      const proj = vDot(v, dir);
      const perp = Math.sqrt(Math.max(0, vDistSq(points[i], p0) - proj * proj));
      if (perp > maxDistToChord) maxDistToChord = perp;
    }
    if (maxDistToChord <= maxError) {
      const step = vScale(vSub(pn, p0), 1 / 3);
      return [[p0, vAdd(p0, step), vSub(pn, step), pn]];
    }
  }

  const tHat1 = computeLeftTangent(points, 0);
  const tHat2 = computeRightTangent(points, points.length - 1);

  return fitCubic(points, tHat1, tHat2, maxError);
}

/**
 * Fits 1D temporal animation samples [{t, val}, ...] into multi-segment Bézier curves
 * and returns CSS cubic-bezier or control points.
 * @param {Array<{t: number, val: number}>|Array<[number, number]>} samples
 * @param {number} maxError
 */
function fitEasingToMultiSegmentBezier(samples, maxError = 0.02) {
  const points = normalizePointInput(samples);
  if (points.length < 2) {
    return {
      beziers: [],
      cssCubicBezier: 'cubic-bezier(0, 0, 1, 1)'
    };
  }

  const tMin = points[0][0];
  const tMax = points[points.length - 1][0];
  const dt = tMax - tMin || 1;

  const yMin = points[0][1];
  const yMax = points[points.length - 1][1];
  const dy = yMax - yMin || 1;

  // Normalized 0..1 coordinates
  const normPoints = points.map(pt => [
    (pt[0] - tMin) / dt,
    (pt[1] - yMin) / dy
  ]);

  const beziers = fitCurve(normPoints, maxError);

  let cssCubicBezier = 'cubic-bezier(0, 0, 1, 1)';
  if (beziers.length > 0) {
    const b = beziers[0];
    const x1 = Math.max(0, Math.min(1, Number(b[1][0].toFixed(3))));
    const y1 = Number(b[1][1].toFixed(3));
    const x2 = Math.max(0, Math.min(1, Number(b[2][0].toFixed(3))));
    const y2 = Number(b[2][1].toFixed(3));
    cssCubicBezier = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  }

  return {
    beziers,
    cssCubicBezier,
    segmentsCount: beziers.length
  };
}

module.exports = {
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
};
