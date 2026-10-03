/**
 * src/kinetic/trajectory-solver.js
 * 
 * Requirement R2: Continuous Orbital Camera Trajectory Solver \vec{C}(s)
 * - Continuous normalized scroll parameter s = clamp((y - yStart) / (yEnd - yStart), 0, 1)
 * - Camera orbital trajectory C(s) = (P(s), T(s), U(s), fov(s), Q(s))
 * - Centripetal Catmull-Rom splines (C^2 continuous, alpha = 0.5) for position and target
 * - Squad (Spherical Quadrangle) unit quaternion interpolation (C^1 continuous) for rotation
 */

'use strict';

// ============================================================================
// Vector3 Math Helpers
// ============================================================================

function vec3(x = 0, y = 0, z = 0) {
  return [Number(x) || 0, Number(y) || 0, Number(z) || 0];
}

function vAdd(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function vSub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function vScale(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s];
}

function vDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function vCross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function vLength(a) {
  return Math.hypot(a[0], a[1], a[2]);
}

function vDist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function vNormalize(a) {
  const len = vLength(a);
  if (len < 1e-9) return [0, 0, 1];
  return [a[0] / len, a[1] / len, a[2] / len];
}

function vLerp(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t
  ];
}

// ============================================================================
// Quaternion Math Helpers (Format: [x, y, z, w])
// ============================================================================

function quat(x = 0, y = 0, z = 0, w = 1) {
  return [Number(x) || 0, Number(y) || 0, Number(z) || 0, Number(w) || 1];
}

function quatNorm(q) {
  return Math.hypot(q[0], q[1], q[2], q[3]);
}

function quatNormalize(q) {
  const n = quatNorm(q);
  if (n < 1e-9) return [0, 0, 0, 1];
  return [q[0] / n, q[1] / n, q[2] / n, q[3] / n];
}

function quatDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

function quatConjugate(q) {
  return [-q[0], -q[1], -q[2], q[3]];
}

function quatMultiply(a, b) {
  const ax = a[0], ay = a[1], az = a[2], aw = a[3];
  const bx = b[0], by = b[1], bz = b[2], bw = b[3];
  return [
    aw * bx + ax * bw + ay * bz - az * by,
    aw * by - ax * bz + ay * bw + az * bx,
    aw * bz + ax * by - ay * bx + az * bw,
    aw * bw - ax * bx - ay * by - az * bz
  ];
}

function quatLog(q) {
  // Logarithm of unit quaternion q = [v * sin(theta), cos(theta)] -> [v * theta, 0]
  const vLen = Math.hypot(q[0], q[1], q[2]);
  if (vLen < 1e-9) {
    return [0, 0, 0, 0];
  }
  const theta = Math.atan2(vLen, q[3]);
  const scale = theta / vLen;
  return [q[0] * scale, q[1] * scale, q[2] * scale, 0];
}

function quatExp(p) {
  // Exponential of pure quaternion p = [v * theta, 0] -> [v * sin(theta), cos(theta)]
  const theta = Math.hypot(p[0], p[1], p[2]);
  if (theta < 1e-9) {
    return [0, 0, 0, 1];
  }
  const scale = Math.sin(theta) / theta;
  return [p[0] * scale, p[1] * scale, p[2] * scale, Math.cos(theta)];
}

function quatScale(q, s) {
  return [q[0] * s, q[1] * s, q[2] * s, q[3] * s];
}

function slerp(q0, q1, t) {
  let dot = quatDot(q0, q1);
  let target = q1;
  // Shortest path on S^3
  if (dot < 0) {
    target = [-q1[0], -q1[1], -q1[2], -q1[3]];
    dot = -dot;
  }

  if (dot > 0.9995) {
    // Linear interpolation fallback for near-parallel quaternions
    const res = [
      q0[0] + (target[0] - q0[0]) * t,
      q0[1] + (target[1] - q0[1]) * t,
      q0[2] + (target[2] - q0[2]) * t,
      q0[3] + (target[3] - q0[3]) * t
    ];
    return quatNormalize(res);
  }

  const theta = Math.acos(Math.max(-1, Math.min(1, dot)));
  const sinTheta = Math.sin(theta);
  const w0 = Math.sin((1 - t) * theta) / sinTheta;
  const w1 = Math.sin(t * theta) / sinTheta;

  return [
    q0[0] * w0 + target[0] * w1,
    q0[1] * w0 + target[1] * w1,
    q0[2] * w0 + target[2] * w1,
    q0[3] * w0 + target[3] * w1
  ];
}

/**
 * Squad (Spherical Quadrangle Interpolation)
 * Squad(t; q_i, a_i, b_{i+1}, q_{i+1}) = Slerp(2t(1-t); Slerp(t; q_i, q_{i+1}), Slerp(t; a_i, b_{i+1}))
 */
function squad(q0, a0, b1, q1, t) {
  const p = slerp(q0, q1, t);
  const q = slerp(a0, b1, t);
  const blend = 2 * t * (1 - t);
  return slerp(p, q, blend);
}

/**
 * Derives Squad intermediate control quaternions a_i and b_{i+1}
 * a_i = q_i * exp( - (ln(q_i^-1 * q_{i+1}) + ln(q_i^-1 * q_{i-1})) / 4 )
 */
function computeSquadInnerPoints(qPrev, qCurr, qNext) {
  const qCurrInv = quatConjugate(qCurr);
  const qNextAlign = quatDot(qCurr, qNext) < 0 ? quatScale(qNext, -1) : qNext;
  const qPrevAlign = quatDot(qCurr, qPrev) < 0 ? quatScale(qPrev, -1) : qPrev;

  const diffNext = quatMultiply(qCurrInv, qNextAlign);
  const diffPrev = quatMultiply(qCurrInv, qPrevAlign);

  const logNext = quatLog(diffNext);
  const logPrev = quatLog(diffPrev);

  const sumLog = [
    -(logNext[0] + logPrev[0]) * 0.25,
    -(logNext[1] + logPrev[1]) * 0.25,
    -(logNext[2] + logPrev[2]) * 0.25,
    0
  ];

  return quatNormalize(quatMultiply(qCurr, quatExp(sumLog)));
}

/**
 * Computes unit quaternion from LookAt basis (eye, target, up)
 */
function quaternionFromLookAt(eye, target, up) {
  const forward = vNormalize(vSub(target, eye));
  let right = vCross(forward, up);
  if (vLength(right) < 1e-6) {
    right = vCross(forward, [0, 0, 1]);
    if (vLength(right) < 1e-6) {
      right = [1, 0, 0];
    }
  }
  right = vNormalize(right);
  const trueUp = vNormalize(vCross(right, forward));

  // Construct rotation matrix (camera view space: x=right, y=up, z=-forward)
  const m00 = right[0], m01 = trueUp[0], m02 = -forward[0];
  const m10 = right[1], m11 = trueUp[1], m12 = -forward[1];
  const m20 = right[2], m21 = trueUp[2], m22 = -forward[2];

  const trace = m00 + m11 + m22;
  let q;

  if (trace > 0) {
    const s = 0.5 / Math.sqrt(trace + 1.0);
    q = [
      (m21 - m12) * s,
      (m02 - m20) * s,
      (m10 - m01) * s,
      0.25 / s
    ];
  } else if (m00 > m11 && m00 > m22) {
    const s = 2.0 * Math.sqrt(1.0 + m00 - m11 - m22);
    q = [
      0.25 * s,
      (m01 + m10) / s,
      (m02 + m20) / s,
      (m21 - m12) / s
    ];
  } else if (m11 > m22) {
    const s = 2.0 * Math.sqrt(1.0 + m11 - m00 - m22);
    q = [
      (m01 + m10) / s,
      0.25 * s,
      (m12 + m21) / s,
      (m02 - m20) / s
    ];
  } else {
    const s = 2.0 * Math.sqrt(1.0 + m22 - m00 - m11);
    q = [
      (m02 + m20) / s,
      (m12 + m21) / s,
      0.25 * s,
      (m10 - m01) / s
    ];
  }

  return quatNormalize(q);
}

// ============================================================================
// Centripetal Catmull-Rom Spline (alpha = 0.5)
// ============================================================================

/**
 * Evaluates a single 4-point Centripetal Catmull-Rom segment using Barry-Goldman pyramid.
 * Guaranteed C^2 continuous and free of cusps/self-intersections.
 * 
 * @param {number[]} p0 Point 0
 * @param {number[]} p1 Point 1 (segment start)
 * @param {number[]} p2 Point 2 (segment end)
 * @param {number[]} p3 Point 3
 * @param {number} u Local parameter in [0, 1]
 * @param {number} alpha Centripetal parameter (0.5)
 * @returns {number[]} Interpolated point
 */
function evaluateCentripetalCatmullRom(p0, p1, p2, p3, u, alpha = 0.5) {
  function getKnot(pa, pb, tPrev) {
    const d = vDist(pa, pb);
    return tPrev + Math.max(1e-6, Math.pow(d, alpha));
  }

  const t0 = 0;
  const t1 = getKnot(p0, p1, t0);
  const t2 = getKnot(p1, p2, t1);
  const t3 = getKnot(p2, p3, t2);

  const t = t1 + u * (t2 - t1);

  function blend(tA, pA, tB, pB, currT) {
    const dt = tB - tA;
    if (Math.abs(dt) < 1e-9) return pA;
    const factorA = (tB - currT) / dt;
    const factorB = (currT - tA) / dt;
    return vAdd(vScale(pA, factorA), vScale(pB, factorB));
  }

  const a1 = blend(t0, p0, t1, p1, t);
  const a2 = blend(t1, p1, t2, p2, t);
  const a3 = blend(t2, p2, t3, p3, t);

  const b1 = blend(t0, a1, t2, a2, t);
  const b2 = blend(t1, a2, t3, a3, t);

  return blend(t1, b1, t2, b2, t);
}

// ============================================================================
// Scroll Progress Normalizer
// ============================================================================

/**
 * Computes normalized scroll progress s in [0, 1]
 * s = clamp((y - yStart) / (yEnd - yStart), 0, 1)
 */
function computeNormalizedScroll(y, yStart = 0, yEnd = 1000) {
  const yNum = Number(y) || 0;
  const start = Number(yStart) || 0;
  const end = Number(yEnd) || 0;

  if (end <= start) {
    return yNum >= start ? 1 : 0;
  }

  const raw = (yNum - start) / (end - start);
  return Math.max(0, Math.min(1, raw));
}

// ============================================================================
// TrajectorySolver Class
// ============================================================================

class TrajectorySolver {
  /**
   * @param {Object} options
   * @param {Array<Object>} [options.keyframes] Keyframe stations
   * @param {number} [options.yStart=0]
   * @param {number} [options.yEnd=1000]
   * @param {number} [options.alpha=0.5] Centripetal parameter
   */
  constructor(options = {}) {
    this.yStart = Number(options.yStart) || 0;
    this.yEnd = Number(options.yEnd) || 1000;
    this.alpha = options.alpha !== undefined ? Number(options.alpha) : 0.5;

    this.keyframes = [];
    if (Array.isArray(options.keyframes) && options.keyframes.length > 0) {
      this.setKeyframes(options.keyframes);
    } else {
      // Default fallback orbital stations
      this.setKeyframes([
        {
          scrollProgress: 0.0,
          position: [0, 0, 5],
          target: [0, 0, 0],
          up: [0, 1, 0],
          fov: 45
        },
        {
          scrollProgress: 1.0,
          position: [0, 3, 4],
          target: [0, 0, 0],
          up: [0, 1, 0],
          fov: 45
        }
      ]);
    }
  }

  /**
   * Configures keyframe stations and pre-computes Squad control points
   */
  setKeyframes(keyframes) {
    if (!Array.isArray(keyframes) || keyframes.length === 0) {
      throw new Error('TrajectorySolver: keyframes must be a non-empty array');
    }

    // Sort by scrollProgress ascending
    const sorted = [...keyframes].map((k, idx) => {
      const sp = k.scrollProgress !== undefined
        ? Math.max(0, Math.min(1, Number(k.scrollProgress)))
        : idx / Math.max(1, keyframes.length - 1);
      
      const pos = vec3(k.position?.[0], k.position?.[1], k.position?.[2]);
      const tgt = vec3(k.target?.[0], k.target?.[1], k.target?.[2]);
      const up = vNormalize(vec3(k.up?.[0] ?? 0, k.up?.[1] ?? 1, k.up?.[2] ?? 0));
      const fov = Number(k.fov) || 45;

      let q = k.quaternion
        ? quatNormalize(quat(k.quaternion[0], k.quaternion[1], k.quaternion[2], k.quaternion[3]))
        : quaternionFromLookAt(pos, tgt, up);

      return {
        scrollProgress: sp,
        position: pos,
        target: tgt,
        up,
        fov,
        quaternion: q
      };
    }).sort((a, b) => a.scrollProgress - b.scrollProgress);

    // Enforce 0.0 and 1.0 boundary coverage
    if (sorted[0].scrollProgress > 0) {
      sorted.unshift({ ...sorted[0], scrollProgress: 0.0 });
    }
    if (sorted[sorted.length - 1].scrollProgress < 1.0) {
      sorted.push({ ...sorted[sorted.length - 1], scrollProgress: 1.0 });
    }

    // Shortest path quaternion alignment along sequence
    for (let i = 1; i < sorted.length; i++) {
      if (quatDot(sorted[i - 1].quaternion, sorted[i].quaternion) < 0) {
        sorted[i].quaternion = quatScale(sorted[i].quaternion, -1);
      }
    }

    // Precompute Squad intermediate control points for each station
    const n = sorted.length;
    this.squadControls = [];

    for (let i = 0; i < n; i++) {
      const qPrev = i === 0 ? sorted[0].quaternion : sorted[i - 1].quaternion;
      const qCurr = sorted[i].quaternion;
      const qNext = i === n - 1 ? sorted[n - 1].quaternion : sorted[i + 1].quaternion;

      const inner = computeSquadInnerPoints(qPrev, qCurr, qNext);
      this.squadControls.push(inner);
    }

    this.keyframes = sorted;
  }

  /**
   * Computes normalized scroll progress s for vertical scroll position y
   */
  computeScroll(y) {
    return computeNormalizedScroll(y, this.yStart, this.yEnd);
  }

  /**
   * Evaluates camera orbital state at scroll progress s in [0, 1]
   * 
   * @param {number} s Normalized scroll progress in [0, 1]
   * @returns {{
   *   position: [number, number, number],
   *   target: [number, number, number],
   *   up: [number, number, number],
   *   fov: number,
   *   quaternion: [number, number, number, number]
   * }}
   */
  evaluate(s) {
    const clampedS = Math.max(0, Math.min(1, Number(s) || 0));
    const kfs = this.keyframes;
    const n = kfs.length;

    if (n === 1) {
      return {
        position: [...kfs[0].position],
        target: [...kfs[0].target],
        up: [...kfs[0].up],
        fov: kfs[0].fov,
        quaternion: [...kfs[0].quaternion]
      };
    }

    // Locate segment i where s in [s_i, s_{i+1}]
    let i = 0;
    while (i < n - 2 && kfs[i + 1].scrollProgress < clampedS) {
      i++;
    }

    const k0 = i > 0 ? kfs[i - 1] : {
      position: vSub(vScale(kfs[0].position, 2), kfs[1].position),
      target: vSub(vScale(kfs[0].target, 2), kfs[1].target)
    };
    const k1 = kfs[i];
    const k2 = kfs[i + 1];
    const k3 = i + 2 < n ? kfs[i + 2] : {
      position: vSub(vScale(kfs[n - 1].position, 2), kfs[n - 2].position),
      target: vSub(vScale(kfs[n - 1].target, 2), kfs[n - 2].target)
    };

    const ds = Math.max(1e-6, k2.scrollProgress - k1.scrollProgress);
    const u = Math.max(0, Math.min(1, (clampedS - k1.scrollProgress) / ds));

    // 1. Centripetal Catmull-Rom Position and Target Interpolation (C^2)
    const pos = evaluateCentripetalCatmullRom(
      k0.position,
      k1.position,
      k2.position,
      k3.position,
      u,
      this.alpha
    );

    const tgt = evaluateCentripetalCatmullRom(
      k0.target,
      k1.target,
      k2.target,
      k3.target,
      u,
      this.alpha
    );

    // 2. Squad Unit Quaternion Interpolation (C^1)
    const a_i = this.squadControls[i];
    const b_next = this.squadControls[i + 1];
    const quatInterp = squad(k1.quaternion, a_i, b_next, k2.quaternion, u);
    const normalizedQuat = quatNormalize(quatInterp);

    // 3. Up Vector and FOV
    const upInterp = vNormalize(vLerp(k1.up, k2.up, u));
    const fovInterp = k1.fov + (k2.fov - k1.fov) * u;

    return {
      position: pos,
      target: tgt,
      up: upInterp,
      fov: fovInterp,
      quaternion: normalizedQuat
    };
  }

  /**
   * Evaluates camera orbital state at scroll offset y in pixels
   */
  evaluateScroll(y) {
    const s = this.computeScroll(y);
    return this.evaluate(s);
  }

  /**
   * Computes numerical velocity dP/ds and dT/ds for continuity analysis
   */
  getVelocity(s, delta = 0.001) {
    const sA = Math.max(0, s - delta);
    const sB = Math.min(1, s + delta);
    const dt = sB - sA;
    if (dt < 1e-9) return { positionVelocity: [0, 0, 0], targetVelocity: [0, 0, 0] };

    const stateA = this.evaluate(sA);
    const stateB = this.evaluate(sB);

    return {
      positionVelocity: vScale(vSub(stateB.position, stateA.position), 1 / dt),
      targetVelocity: vScale(vSub(stateB.target, stateA.target), 1 / dt)
    };
  }

  /**
   * Computes numerical acceleration d²P/ds² for C^2 continuity verification
   */
  getAcceleration(s, delta = 0.001) {
    const sA = Math.max(0, s - delta);
    const sB = Math.min(1, s + delta);
    const dt = sB - sA;
    if (dt < 1e-9) return { positionAcceleration: [0, 0, 0] };

    const vA = this.getVelocity(sA, delta);
    const vB = this.getVelocity(sB, delta);

    return {
      positionAcceleration: vScale(vSub(vB.positionVelocity, vA.positionVelocity), 1 / dt)
    };
  }

  /**
   * Samples trajectory across n discrete steps
   */
  sampleCurve(numSamples = 100) {
    const samples = [];
    const count = Math.max(2, Math.floor(numSamples));
    for (let i = 0; i < count; i++) {
      const s = i / (count - 1);
      samples.push({
        s,
        ...this.evaluate(s)
      });
    }
    return samples;
  }
}

// Spherical orbital coordinate builder helper
function orbitPosition(target, radius, azimuthTheta, polarPhi) {
  const t = vec3(target[0], target[1], target[2]);
  const r = Math.max(1e-6, Number(radius) || 1);
  const phi = Math.max(1e-4, Math.min(Math.PI - 1e-4, Number(polarPhi) || Math.PI / 2));
  const theta = Number(azimuthTheta) || 0;

  const x = t[0] + r * Math.sin(phi) * Math.cos(theta);
  const y = t[1] + r * Math.cos(phi);
  const z = t[2] + r * Math.sin(phi) * Math.sin(theta);

  return [x, y, z];
}

module.exports = {
  TrajectorySolver,
  computeNormalizedScroll,
  evaluateCentripetalCatmullRom,
  quaternionFromLookAt,
  slerp,
  squad,
  orbitPosition,
  vec3,
  quat,
  quatNormalize,
  quatNorm
};
