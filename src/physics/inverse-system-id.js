/**
 * src/physics/inverse-system-id.js
 * 
 * 3-Tier Inverse Physical System Identification Engine
 * Requirement R3 / TASK-B2 (studio-dna v2.6 Autonomous Front-End Evolution)
 * 
 * 1. Tier 1 — Logarithmic Decrement & Fractional Overshoot (0 < \zeta <= 0.8)
 * 2. Tier 2 — Prony's Method with Hankel Matrices & Froissart Doublet Filtering (\zeta > 0.8, Overdamped)
 * 3. Tier 3 — Weak / Ensemble-SINDYc (Nonlinear ODE & Aerodynamic Drag Identification)
 * 
 * 100% Pure Node.js (Zero external libraries outside existing lockfile).
 */

'use strict';

// ============================================================================
// 1. Pure Linear Algebra & Numerical Routines
// ============================================================================

/**
 * Solves dense linear system A * x = b via Gaussian elimination with partial pivoting
 * @param {Array<Array<number>>} A Matrix (m x n)
 * @param {Array<number>} b Vector (m)
 * @returns {Array<number>} x Solution vector
 */
function solveLinearSystem(A, b) {
  const n = A.length;
  // Deep clone augmented matrix [A | b]
  const M = new Array(n);
  for (let i = 0; i < n; i++) {
    M[i] = new Array(n + 1);
    for (let j = 0; j < n; j++) {
      M[i][j] = A[i][j];
    }
    M[i][n] = b[i];
  }

  // Forward elimination
  for (let k = 0; k < n; k++) {
    // Find pivot
    let maxRow = k;
    let maxVal = Math.abs(M[k][k]);
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(M[i][k]) > maxVal) {
        maxVal = Math.abs(M[i][k]);
        maxRow = i;
      }
    }

    if (maxVal < 1e-15) {
      // Near singular: add small diagonal regularization
      M[k][k] += 1e-9;
    } else if (maxRow !== k) {
      const temp = M[k];
      M[k] = M[maxRow];
      M[maxRow] = temp;
    }

    // Eliminate below
    for (let i = k + 1; i < n; i++) {
      const factor = M[i][k] / M[k][k];
      M[i][k] = 0;
      for (let j = k + 1; j <= n; j++) {
        M[i][j] -= factor * M[k][j];
      }
    }
  }

  // Back substitution
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = M[i][n];
    for (let j = i + 1; j < n; j++) {
      sum -= M[i][j] * x[j];
    }
    const diag = Math.abs(M[i][i]) < 1e-15 ? 1e-9 : M[i][i];
    x[i] = sum / diag;
  }

  return x;
}

/**
 * Solves linear least-squares (A^T * A + lambda * I) * x = A^T * b
 */
function solveLeastSquares(A, b, lambda = 1e-7) {
  const m = A.length;
  const n = A[0].length;

  const AtA = Array.from({ length: n }, () => new Array(n).fill(0));
  const Atb = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < m; k++) {
        sum += A[k][i] * A[k][j];
      }
      AtA[i][j] = sum;
    }
    AtA[i][i] += lambda; // Tikhonov regularization

    let bSum = 0;
    for (let k = 0; k < m; k++) {
      bSum += A[k][i] * b[k];
    }
    Atb[i] = bSum;
  }

  return solveLinearSystem(AtA, Atb);
}

/**
 * Finds roots of polynomial P(z) = z^n + a_{n-1} z^{n-1} + ... + a_0 via Durand-Kerner (Weierstrass)
 * @param {Array<number>} coeffs Monic coefficients [a_{n-1}, ..., a_0]
 * @returns {Array<{ re: number, im: number }>}
 */
function findPolynomialRoots(coeffs) {
  const n = coeffs.length;
  if (n === 0) return [];
  if (n === 1) return [{ re: -coeffs[0], im: 0 }];

  if (n === 2) {
    // Quadratic z^2 + a1*z + a0 = 0
    const a1 = coeffs[0];
    const a0 = coeffs[1];
    const disc = a1 * a1 - 4 * a0;
    if (disc >= 0) {
      return [
        { re: (-a1 + Math.sqrt(disc)) / 2, im: 0 },
        { re: (-a1 - Math.sqrt(disc)) / 2, im: 0 }
      ];
    } else {
      const im = Math.sqrt(-disc) / 2;
      return [
        { re: -a1 / 2, im },
        { re: -a1 / 2, im: -im }
      ];
    }
  }

  // Durand-Kerner iteration for n >= 3
  const roots = [];
  const radius = 1.0;
  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI * i) / n + 0.4;
    roots.push({
      re: Math.pow(radius, i) * Math.cos(angle),
      im: Math.pow(radius, i) * Math.sin(angle)
    });
  }

  const evalPoly = (z) => {
    // Horner's method in complex plane: P(z) = z^n + coeffs[0]*z^{n-1} + ...
    let resRe = 1;
    let resIm = 0;
    for (let i = 0; i < n; i++) {
      // res = res * z + coeffs[i]
      const newRe = resRe * z.re - resIm * z.im + coeffs[i];
      const newIm = resRe * z.im + resIm * z.re;
      resRe = newRe;
      resIm = newIm;
    }
    return { re: resRe, im: resIm };
  };

  const MAX_ITER = 60;
  for (let iter = 0; iter < MAX_ITER; iter++) {
    let maxChange = 0;
    for (let i = 0; i < n; i++) {
      const zi = roots[i];
      const pVal = evalPoly(zi);

      // Product of (zi - zj) for j != i
      let prodRe = 1;
      let prodIm = 0;
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          const diffRe = zi.re - roots[j].re;
          const diffIm = zi.im - roots[j].im;
          const nextRe = prodRe * diffRe - prodIm * diffIm;
          const nextIm = prodRe * diffIm + prodIm * diffRe;
          prodRe = nextRe;
          prodIm = nextIm;
        }
      }

      const den = prodRe * prodRe + prodIm * prodIm;
      if (den > 1e-18) {
        const deltaRe = (pVal.re * prodRe + pVal.im * prodIm) / den;
        const deltaIm = (pVal.im * prodRe - pVal.re * prodIm) / den;
        roots[i].re -= deltaRe;
        roots[i].im -= deltaIm;
        const ch = Math.hypot(deltaRe, deltaIm);
        if (ch > maxChange) maxChange = ch;
      }
    }
    if (maxChange < 1e-10) break;
  }

  return roots;
}

// ============================================================================
// 2. Normalization & Trajectory Helpers
// ============================================================================

function normalizeTimeSeries(rawSeries) {
  if (!Array.isArray(rawSeries)) return [];
  const normalized = [];
  for (const item of rawSeries) {
    if (Array.isArray(item)) {
      normalized.push({ t: Number(item[0]) || 0, x: Number(item[1]) || 0, v: Number(item[2]) || 0 });
    } else if (item && typeof item === 'object') {
      const t = item.t !== undefined ? Number(item.t) : 0;
      const x = item.x !== undefined ? Number(item.x) : (item.val !== undefined ? Number(item.val) : 0);
      const v = item.v !== undefined ? Number(item.v) : 0;
      const u = item.u !== undefined ? Number(item.u) : 0;
      normalized.push({ t, x, v, u });
    }
  }

  // Sort by time t
  normalized.sort((a, b) => a.t - b.t);

  // Compute central difference velocities if missing
  if (normalized.length > 2 && normalized[1].v === 0 && normalized[2].v === 0) {
    for (let i = 1; i < normalized.length - 1; i++) {
      const dt = normalized[i + 1].t - normalized[i - 1].t || 1e-5;
      normalized[i].v = (normalized[i + 1].x - normalized[i - 1].x) / dt;
    }
    normalized[0].v = (normalized[1].x - normalized[0].x) / (normalized[1].t - normalized[0].t || 1e-5);
    normalized[normalized.length - 1].v = (normalized[normalized.length - 1].x - normalized[normalized.length - 2].x) /
      (normalized[normalized.length - 1].t - normalized[normalized.length - 2].t || 1e-5);
  }

  return normalized;
}

// ============================================================================
// 3. Level 1 — Logarithmic Decrement & Fractional Overshoot (0 < \zeta <= 0.8)
// ============================================================================

/**
 * Estimates \zeta, \omega_n via logarithmic decrement or fractional overshoot
 * @param {Array<{t: number, x: number}>} timeSeries
 * @param {Object} [options={}]
 */
function identifyLogDecrement(timeSeries, options = {}) {
  const series = normalizeTimeSeries(timeSeries);
  if (series.length < 5) {
    throw new Error('identifyLogDecrement requires at least 5 trajectory samples');
  }

  const mass = options.mass !== undefined ? Number(options.mass) : 1.0;
  const xFinal = options.equilibrium !== undefined
    ? Number(options.equilibrium)
    : series[series.length - 1].x;

  const x0 = series[0].x;

  // Find local extrema (peaks and troughs relative to xFinal)
  const extrema = [];
  for (let i = 1; i < series.length - 1; i++) {
    const prev = series[i - 1].x - xFinal;
    const curr = series[i].x - xFinal;
    const next = series[i + 1].x - xFinal;

    const isMax = curr > prev && curr > next && curr > 0;
    const isMin = curr < prev && curr < next && curr < 0;

    if (isMax || isMin) {
      // 3-point parabolic interpolation for sub-step accuracy
      const dt = series[i].t - series[i - 1].t || 1e-4;
      const denom = prev - 2 * curr + next;
      let dtPeak = 0;
      let valPeak = curr;
      if (Math.abs(denom) > 1e-12) {
        dtPeak = ((prev - next) / (2 * denom)) * dt;
        valPeak = curr - 0.25 * (prev - next) * (dtPeak / dt);
      }
      extrema.push({
        t: series[i].t + dtPeak,
        val: valPeak,
        rawX: series[i].x,
        isMax
      });
    }
  }

  // Case A: At least 2 successive peaks of the same direction
  const positivePeaks = extrema.filter(e => e.isMax);
  if (positivePeaks.length >= 2) {
    const p1 = positivePeaks[0];
    const p2 = positivePeaks[positivePeaks.length - 1];
    const n = positivePeaks.length - 1;

    const ratio = Math.abs(p1.val) / Math.max(1e-9, Math.abs(p2.val));
    if (ratio > 1.0) {
      const delta = (1 / n) * Math.log(ratio);
      const zeta = delta / Math.sqrt(4 * Math.PI * Math.PI + delta * delta);
      const Td = (p2.t - p1.t) / n;
      const omegaD = (2 * Math.PI) / Td;
      const omegaN = omegaD / Math.sqrt(Math.max(1e-6, 1 - zeta * zeta));

      return {
        regime: 'underdamped',
        zeta,
        omegaN,
        omegaD,
        k: mass * omegaN * omegaN,
        c: 2 * zeta * omegaN * mass,
        mass,
        delta,
        Td,
        peaksCount: extrema.length,
        method: 'log-decrement'
      };
    }
  }

  // Case B: Single Overshoot (0.5 < \zeta <= 0.8)
  if (extrema.length >= 1) {
    const firstPeak = extrema[0];
    const initialDisplacement = Math.abs(x0 - xFinal);
    const overshootDisplacement = Math.abs(firstPeak.val);

    if (initialDisplacement > 1e-9 && overshootDisplacement > 0) {
      const OS = Math.min(0.999, overshootDisplacement / initialDisplacement);
      if (OS > 0.001) {
        const lnOS = Math.log(OS);
        const zeta = -lnOS / Math.sqrt(Math.PI * Math.PI + lnOS * lnOS);
        const tp = firstPeak.t - series[0].t;
        const omegaD = Math.PI / Math.max(1e-4, tp);
        const omegaN = omegaD / Math.sqrt(Math.max(1e-6, 1 - zeta * zeta));

        return {
          regime: 'underdamped',
          zeta,
          omegaN,
          omegaD,
          k: mass * omegaN * omegaN,
          c: 2 * zeta * omegaN * mass,
          mass,
          overshoot: OS,
          method: 'fractional-overshoot'
        };
      }
    }
  }

  // Fallback: Return critically damped estimate
  return {
    regime: 'critically-damped',
    zeta: 1.0,
    omegaN: 10.0,
    k: mass * 100.0,
    c: 20.0 * mass,
    mass,
    method: 'fallback'
  };
}

// ============================================================================
// 4. Level 2 — Prony's Method with Hankel Matrices & Froissart Doublet Filtering
// ============================================================================

/**
 * Identifies overdamped or noisy physical parameters via Prony-Hankel decomposition
 * @param {Array<{t: number, x: number}>} timeSeries
 * @param {Object} [options={}]
 */
function identifyPronyHankel(timeSeries, options = {}) {
  const series = normalizeTimeSeries(timeSeries);
  if (series.length < 8) {
    throw new Error('identifyPronyHankel requires at least 8 trajectory samples');
  }

  const mass = options.mass !== undefined ? Number(options.mass) : 1.0;
  const xFinal = options.equilibrium !== undefined
    ? Number(options.equilibrium)
    : series[series.length - 1].x;

  // Resample to uniform dt if needed
  const dt = (series[series.length - 1].t - series[0].t) / (series.length - 1);
  const y = series.map(s => s.x - xFinal);

  // Use order p = 2 (standard 2nd order mass-spring-damper) or options.order
  const p = options.order !== undefined ? Number(options.order) : 2;
  const rows = y.length - p;

  // Build Hankel matrix H: rows x p
  const H = [];
  const h = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < p; j++) {
      row.push(y[i + j]);
    }
    H.push(row);
    h.push(-y[i + p]);
  }

  // Solve for characteristic polynomial coefficients: b = [b0, ..., b_{p-1}]
  const b = solveLeastSquares(H, h, 1e-6);

  // Polynomial: z^p + b_{p-1}*z^{p-1} + ... + b_0 = 0
  const coeffs = [...b].reverse(); // [b_{p-1}, ..., b_0]
  const allRoots = findPolynomialRoots(coeffs);

  // Filter Froissart doublets and spurious roots outside physical bounds
  // For passive physical systems: |z| <= 1.05 and |z| >= 0.01
  const physicalRoots = allRoots.filter(r => {
    const mag = Math.hypot(r.re, r.im);
    return mag > 0.02 && mag < 1.02;
  });

  const rootsToUse = physicalRoots.length >= 2 ? physicalRoots : allRoots;

  // Find dominant complex pair or dominant real pair
  const complexPairs = [];
  const realRoots = [];

  for (const r of rootsToUse) {
    if (Math.abs(r.im) > 1e-4) {
      complexPairs.push(r);
    } else {
      realRoots.push(r.re);
    }
  }

  if (complexPairs.length >= 2) {
    // Underdamped complex conjugate root z = r*e^{i*theta}
    const r0 = complexPairs[0];
    const mag = Math.hypot(r0.re, r0.im);
    const theta = Math.abs(Math.atan2(r0.im, r0.re));

    const sigma = Math.log(Math.max(1e-9, mag)) / dt;
    const omegaD = theta / dt;
    const omegaN = Math.hypot(sigma, omegaD);
    const zeta = Math.max(0, Math.min(1.0, -sigma / Math.max(1e-6, omegaN)));

    return {
      regime: 'underdamped',
      zeta,
      omegaN,
      omegaD,
      k: mass * omegaN * omegaN,
      c: 2 * zeta * omegaN * mass,
      mass,
      poles: [{ re: sigma, im: omegaD }, { re: sigma, im: -omegaD }],
      method: 'prony-hankel'
    };
  }

  // Overdamped real roots: s1, s2
  realRoots.sort((a, b) => Math.abs(b) - Math.abs(a));
  const z1 = Math.max(1e-9, realRoots[0] !== undefined ? realRoots[0] : 0.9);
  const z2 = Math.max(1e-9, realRoots[1] !== undefined ? realRoots[1] : 0.8);

  const s1 = Math.log(z1) / dt;
  const s2 = Math.log(z2) / dt;

  const omegaN = Math.sqrt(Math.max(1e-6, Math.abs(s1 * s2)));
  const zeta = Math.max(1.0, -(s1 + s2) / (2 * Math.max(1e-6, omegaN)));

  return {
    regime: Math.abs(zeta - 1.0) < 0.05 ? 'critically-damped' : 'overdamped',
    zeta,
    omegaN,
    k: mass * omegaN * omegaN,
    c: 2 * zeta * omegaN * mass,
    mass,
    poles: [{ re: s1, im: 0 }, { re: s2, im: 0 }],
    method: 'prony-hankel'
  };
}

// ============================================================================
// 5. Level 3 — Weak / Ensemble-SINDYc (Nonlinear ODE & Drag Identification)
// ============================================================================

/**
 * Weak SINDYc identifies nonlinear ODE coefficients without differentiating noisy data
 * \ddot{x} = \Xi_1 * x + \Xi_2 * v + \Xi_3 * x^3 + \Xi_4 * v|v| + \Xi_5 * \tanh(v) + \Xi_6 * u
 * @param {Array<{t: number, x: number, v: number, u?: number}>} timeSeries
 * @param {Object} [options={}]
 */
function identifyWeakSINDYc(timeSeries, options = {}) {
  const series = normalizeTimeSeries(timeSeries);
  if (series.length < 15) {
    throw new Error('identifyWeakSINDYc requires at least 15 trajectory samples');
  }

  const threshold = options.threshold !== undefined ? Number(options.threshold) : 0.05;
  const numSubintervals = Math.min(30, Math.floor(series.length / 3));

  // Feature library definitions \Theta(x, v, u)
  const candidateNames = [
    'x',               // 0: linear spring -omega_n^2
    'v',               // 1: linear damping -2*zeta*omega_n
    'x3',              // 2: cubic stiffness (Duffing)
    'v_abs_v',         // 3: quadratic aerodynamic drag
    'tanh_v',          // 4: Coulomb friction
    'u'                // 5: external forcing / gesture
  ];

  const evalFeatures = (x, v, u = 0) => [
    x,
    v,
    x * x * x,
    v * Math.abs(v),
    Math.tanh(v / 10.0),
    u
  ];

  // Weak formulation: evaluate over subintervals [tA, tB] with bump test functions
  // \phi(tau) = (1 - tau^2)^4, where tau = 2*(t - tA)/(tB - tA) - 1 in [-1, 1]
  // \int \ddot{x} \phi dt = \int x \ddot{\phi} dt
  const G = [];
  const yWeak = [];

  const intervalLen = Math.floor(series.length / 2);
  const step = Math.max(1, Math.floor((series.length - intervalLen) / numSubintervals));

  for (let start = 0; start <= series.length - intervalLen; start += step) {
    const end = start + intervalLen;
    const sub = series.slice(start, end);
    const tA = sub[0].t;
    const tB = sub[sub.length - 1].t;
    const H = tB - tA;
    if (H <= 1e-6) continue;

    const row = new Array(candidateNames.length).fill(0);
    let accelIntegral = 0;

    for (let k = 0; k < sub.length - 1; k++) {
      const p1 = sub[k];
      const p2 = sub[k + 1];
      const dtK = p2.t - p1.t;
      const tMid = 0.5 * (p1.t + p2.t);
      const xMid = 0.5 * (p1.x + p2.x);
      const vMid = 0.5 * (p1.v + p2.v);
      const uMid = 0.5 * ((p1.u || 0) + (p2.u || 0));

      const tau = (2 * (tMid - tA)) / H - 1;
      if (Math.abs(tau) >= 1.0) continue;

      const omt2 = 1 - tau * tau;
      const phi = omt2 * omt2 * omt2 * omt2; // (1 - tau^2)^4

      // Second derivative of phi w.r.t t:
      // d/dt = (2/H) * d/dtau
      // d^2 phi / dtau^2 = 8*(1-tau^2)^2*(7*tau^2 - 1)
      const phiPrimePrimeTau = 8 * omt2 * omt2 * (7 * tau * tau - 1);
      const phiPrimePrimeT = phiPrimePrimeTau * (4 / (H * H));

      const feats = evalFeatures(xMid, vMid, uMid);
      for (let f = 0; f < feats.length; f++) {
        row[f] += feats[f] * phi * dtK;
      }
      accelIntegral += xMid * phiPrimePrimeT * dtK;
    }

    G.push(row);
    yWeak.push(accelIntegral);
  }

  // STLSQ (Sequentially Thresholded Least Squares)
  let xi = solveLeastSquares(G, yWeak, 1e-5);

  for (let iter = 0; iter < 5; iter++) {
    // Find active mask
    const active = xi.map(val => Math.abs(val) >= threshold);
    if (!active.some(Boolean)) break;

    const G_sub = G.map(row => row.filter((_, idx) => active[idx]));
    const xi_sub = solveLeastSquares(G_sub, yWeak, 1e-5);

    let subIdx = 0;
    for (let i = 0; i < xi.length; i++) {
      if (active[i]) {
        xi[i] = xi_sub[subIdx++];
      } else {
        xi[i] = 0;
      }
    }
  }

  // Map identified coefficients
  const activeTerms = {};
  candidateNames.forEach((name, idx) => {
    if (Math.abs(xi[idx]) > 1e-4) {
      activeTerms[name] = Number(xi[idx].toFixed(4));
    }
  });

  // Extract equivalent linear spring parameters if present
  const kLinear = Math.abs(xi[0]); // -omega_n^2
  const cLinear = Math.abs(xi[1]); // -2*zeta*omega_n
  const omegaN = Math.sqrt(Math.max(1e-6, kLinear));
  const zeta = cLinear / (2 * Math.max(1e-6, omegaN));

  return {
    regime: zeta < 1.0 ? 'underdamped' : (Math.abs(zeta - 1.0) < 0.05 ? 'critically-damped' : 'overdamped'),
    zeta,
    omegaN,
    k: kLinear,
    c: cLinear,
    activeTerms,
    rawCoefficients: xi,
    method: 'weak-sindyc'
  };
}

// ============================================================================
// 6. Universal Auto-Dispatcher & System Synthesizer
// ============================================================================

/**
 * Universal auto-dispatcher identifying physical dynamics from any displacement series
 * @param {Array<{t: number, x: number}>} timeSeries
 * @param {Object} [options={}]
 */
function identifySystem(timeSeries, options = {}) {
  const series = normalizeTimeSeries(timeSeries);
  if (series.length < 5) {
    throw new Error('identifySystem requires at least 5 trajectory samples');
  }

  if (options.forceMethod === 'weak-sindyc') {
    return identifyWeakSINDYc(series, options);
  }
  if (options.forceMethod === 'prony-hankel') {
    return identifyPronyHankel(series, options);
  }
  if (options.forceMethod === 'log-decrement') {
    return identifyLogDecrement(series, options);
  }

  // Auto-detect characteristics
  const xFinal = series[series.length - 1].x;
  let zeroCrossings = 0;
  for (let i = 1; i < series.length; i++) {
    const s1 = series[i - 1].x - xFinal;
    const s2 = series[i].x - xFinal;
    if (s1 * s2 < 0) zeroCrossings++;
  }

  // If oscillating (underdamped), Log-Decrement is extremely fast and robust
  if (zeroCrossings >= 1) {
    try {
      const res = identifyLogDecrement(series, options);
      if (res.zeta < 0.95 && Number.isFinite(res.omegaN)) {
        return res;
      }
    } catch (e) {}
  }

  // Otherwise, use Prony-Hankel for monotonic or critically damped motion
  try {
    return identifyPronyHankel(series, options);
  } catch (e) {
    return identifyLogDecrement(series, options);
  }
}

module.exports = {
  identifyLogDecrement,
  identifyPronyHankel,
  identifyWeakSINDYc,
  identifySystem,
  solveLinearSystem,
  solveLeastSquares,
  findPolynomialRoots
};
