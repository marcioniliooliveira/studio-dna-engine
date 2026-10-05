/**
 * src/physics/spring-dynamics.js
 * 
 * 2nd-Order Analytical Spring Dynamics & Damped Harmonic Motion Engine
 * Requirement R3 (studio-dna v2.5 / Feature Inventory #9, #10, #11)
 * 
 * Homogeneous second-order linear ordinary differential equation:
 *   \ddot{x}(t) + 2\zeta\omega_n\dot{x}(t) + \omega_n^2 x(t) = 0
 * 
 * Exact closed-form analytical solutions across all three regimes:
 *   1. Underdamped       (\zeta < 1.0)
 *   2. Critically Damped (\zeta = 1.0)
 *   3. Overdamped        (\zeta > 1.0)
 * 
 * Key Features:
 *   - Continuous C¹ velocity hand-off (\dot{x}(0) \equiv v_0 = v_drag)
 *   - Strict zero-overshoot clamp when prefers-reduced-motion is active (\zeta >= 1.0, 0px overshoot)
 *   - Settling threshold detection (rest displacement & velocity)
 *   - Analytical settling time estimation
 *   - Velocity tracker for gesture pointer tracking (100ms sliding window)
 */

'use strict';

/** Numerical precision epsilon for critical damping regime boundary */
const REGIME_EPSILON = 1e-5;

/** Default rest threshold in units/pixels */
const DEFAULT_REST_THRESHOLD = 0.01;

/** Default rest velocity threshold in units/pixels per second */
const DEFAULT_REST_VELOCITY_THRESHOLD = 0.01;

/**
 * Solve homogeneous 2nd-order ODE damped harmonic motion at time t (seconds).
 * 
 * \ddot{x}(t) + 2\zeta\omega_n\dot{x}(t) + \omega_n^2 x(t) = 0
 * 
 * @param {Object} params
 * @param {number} params.x0 - Initial displacement from equilibrium x(0) = p(0) - p_target
 * @param {number} [params.v0=0] - Initial velocity \dot{x}(0) (units/sec)
 * @param {number} params.zeta - Damping ratio \zeta >= 0
 * @param {number} params.omegaN - Natural frequency \omega_n > 0 (rad/sec)
 * @param {number} params.t - Time in seconds t >= 0
 * @param {boolean} [params.clampZeroOvershoot=false] - Enforce strict 0px overshoot
 * @returns {{
 *   displacement: number,
 *   velocity: number,
 *   acceleration: number,
 *   regime: 'underdamped' | 'critically-damped' | 'overdamped'
 * }}
 */
function solveDampedHarmonicMotion({
  x0,
  v0 = 0,
  zeta,
  omegaN,
  t,
  clampZeroOvershoot = false
}) {
  if (typeof x0 !== 'number' || !Number.isFinite(x0)) {
    throw new TypeError(`x0 must be a finite number, received: ${x0}`);
  }
  if (typeof v0 !== 'number' || !Number.isFinite(v0)) {
    throw new TypeError(`v0 must be a finite number, received: ${v0}`);
  }
  if (typeof zeta !== 'number' || !Number.isFinite(zeta) || zeta < 0) {
    throw new RangeError(`zeta (damping ratio) must be a non-negative number, received: ${zeta}`);
  }
  if (typeof omegaN !== 'number' || !Number.isFinite(omegaN) || omegaN <= 0) {
    throw new RangeError(`omegaN (natural frequency) must be a positive number, received: ${omegaN}`);
  }

  // Handle t <= 0 boundary (t = 0 initial conditions)
  if (t <= 0) {
    const acc0 = -2 * zeta * omegaN * v0 - omegaN * omegaN * x0;
    let initialRegime = 'critically-damped';
    if (Math.abs(zeta - 1.0) >= REGIME_EPSILON) {
      initialRegime = zeta < 1.0 ? 'underdamped' : 'overdamped';
    }
    return {
      displacement: x0,
      velocity: v0,
      acceleration: acc0,
      regime: initialRegime
    };
  }

  // If already at rest at origin with zero velocity
  if (Math.abs(x0) === 0 && Math.abs(v0) === 0) {
    return {
      displacement: 0,
      velocity: 0,
      acceleration: 0,
      regime: Math.abs(zeta - 1.0) < REGIME_EPSILON ? 'critically-damped' : (zeta < 1.0 ? 'underdamped' : 'overdamped')
    };
  }

  let displacement = 0;
  let velocity = 0;
  let acceleration = 0;
  let regime = 'critically-damped';

  if (Math.abs(zeta - 1.0) < REGIME_EPSILON) {
    // -------------------------------------------------------------------------
    // 2. CRITICALLY DAMPED REGIME (\zeta = 1.0)
    // Double real root: r = -\omega_n
    // x(t) = (C_1 + C_2 t) e^{-\omega_n t}
    // With x(0) = x_0 and \dot{x}(0) = v_0:
    //   C_1 = x_0
    //   C_2 = v_0 + \omega_n x_0
    //   \dot{x}(t) = [v_0 - \omega_n(v_0 + \omega_n x_0)t] e^{-\omega_n t}
    // -------------------------------------------------------------------------
    regime = 'critically-damped';
    const decay = Math.exp(-omegaN * t);
    const c1 = x0;
    const c2 = v0 + omegaN * x0;

    displacement = (c1 + c2 * t) * decay;
    velocity = (v0 - omegaN * c2 * t) * decay;
    acceleration = -2 * omegaN * velocity - omegaN * omegaN * displacement;

  } else if (zeta < 1.0) {
    // -------------------------------------------------------------------------
    // 1. UNDERDAMPED REGIME (\zeta < 1.0)
    // Complex conjugate roots: r = -\zeta\omega_n \pm i\omega_d
    // Damped frequency: \omega_d = \omega_n \sqrt{1 - \zeta^2}
    // Decay factor: \alpha = \zeta\omega_n
    // x(t) = e^{-\alpha t} [ x_0 \cos(\omega_d t) + ((v_0 + \alpha x_0)/\omega_d) \sin(\omega_d t) ]
    // \dot{x}(t) = e^{-\alpha t} [ v_0 \cos(\omega_d t) - ((\omega_n^2 x_0 + \alpha v_0)/\omega_d) \sin(\omega_d t) ]
    // -------------------------------------------------------------------------
    regime = 'underdamped';
    const omegaD = omegaN * Math.sqrt(1 - zeta * zeta);
    const alpha = zeta * omegaN;
    const decay = Math.exp(-alpha * t);
    const cosTerm = Math.cos(omegaD * t);
    const sinTerm = Math.sin(omegaD * t);

    const cSin = (v0 + alpha * x0) / omegaD;
    displacement = decay * (x0 * cosTerm + cSin * sinTerm);

    const vSin = (omegaN * omegaN * x0 + alpha * v0) / omegaD;
    velocity = decay * (v0 * cosTerm - vSin * sinTerm);
    acceleration = -2 * alpha * velocity - omegaN * omegaN * displacement;

  } else {
    // -------------------------------------------------------------------------
    // 3. OVERDAMPED REGIME (\zeta > 1.0)
    // Two distinct negative real roots: r_{1,2} = -\zeta\omega_n \pm \omega_h
    // Hyperbolic frequency: \omega_h = \omega_n \sqrt{\zeta^2 - 1}
    // r_1 = -\zeta\omega_n + \omega_h
    // r_2 = -\zeta\omega_n - \omega_h
    // With x(0) = x_0 and \dot{x}(0) = v_0:
    //   C_1 = (v_0 - r_2 x_0) / (2\omega_h)
    //   C_2 = (-v_0 + r_1 x_0) / (2\omega_h)
    // x(t) = C_1 e^{r_1 t} + C_2 e^{r_2 t}
    // \dot{x}(t) = C_1 r_1 e^{r_1 t} + C_2 r_2 e^{r_2 t}
    // -------------------------------------------------------------------------
    regime = 'overdamped';
    const omegaH = omegaN * Math.sqrt(zeta * zeta - 1);
    const r1 = -zeta * omegaN + omegaH;
    const r2 = -zeta * omegaN - omegaH;

    const c1 = (v0 - r2 * x0) / (2 * omegaH);
    const c2 = (-v0 + r1 * x0) / (2 * omegaH);

    const exp1 = Math.exp(r1 * t);
    const exp2 = Math.exp(r2 * t);

    displacement = c1 * exp1 + c2 * exp2;
    velocity = c1 * r1 * exp1 + c2 * r2 * exp2;
    acceleration = -2 * zeta * omegaN * velocity - omegaN * omegaN * displacement;
  }

  // ---------------------------------------------------------------------------
  // ZERO-OVERSHOOT CLAMP (Requirement R3 / prefers-reduced-motion)
  // When active:
  // If x_0 > 0: displacement must remain strictly in [0, x_0], 0px overshoot past 0.
  // If x_0 < 0: displacement must remain strictly in [x_0, 0], 0px overshoot past 0.
  // If displacement crosses or reaches 0, clamp to 0 and halt velocity.
  // ---------------------------------------------------------------------------
  if (clampZeroOvershoot) {
    if (x0 > 0) {
      if (displacement <= 0) {
        displacement = 0;
        velocity = 0;
        acceleration = 0;
      } else if (displacement > x0) {
        displacement = x0;
        if (velocity > 0) velocity = 0;
      }
    } else if (x0 < 0) {
      if (displacement >= 0) {
        displacement = 0;
        velocity = 0;
        acceleration = 0;
      } else if (displacement < x0) {
        displacement = x0;
        if (velocity < 0) velocity = 0;
      }
    } else {
      displacement = 0;
      velocity = 0;
      acceleration = 0;
    }
  }

  return {
    displacement,
    velocity,
    acceleration,
    regime
  };
}

/**
 * SpringDynamicsEvaluator
 * Implements the SpringDynamicsEvaluator contract specified in PROJECT.md:
 * interface SpringDynamicsEvaluator {
 *   evaluate(tSeconds: number): {
 *     position: number;
 *     velocity: number;
 *     isSettled: boolean;
 *   };
 * }
 */
class SpringDynamicsEvaluator {
  /**
   * @param {Object} [config={}]
   * @param {number} [config.from=0] - Initial position p(0)
   * @param {number} [config.target=0] - Target equilibrium position p_target
   * @param {number} [config.initialVelocity=0] - Initial velocity v_0 = \dot{p}(0)
   * @param {number} [config.velocity=0] - Alias for initialVelocity
   * @param {number} [config.v0=0] - Alias for initialVelocity
   * @param {number} [config.mass=1.0] - Mass m (kg) > 0
   * @param {number} [config.stiffness=100] - Spring stiffness k (N/m) > 0
   * @param {number} [config.damping] - Damping coefficient c (N*s/m) >= 0
   * @param {number} [config.dampingRatio] - Direct damping ratio \zeta >= 0 (overrides damping)
   * @param {number} [config.zeta] - Alias for dampingRatio
   * @param {number} [config.naturalFrequency] - Direct \omega_n > 0 (overrides stiffness & mass)
   * @param {number} [config.omegaN] - Alias for naturalFrequency
   * @param {boolean} [config.prefersReducedMotion=false] - Reduced motion mode (\zeta >= 1.0, 0px overshoot)
   * @param {boolean} [config.clampZeroOvershoot] - Explicit zero-overshoot clamp (auto-enabled if prefersReducedMotion)
   * @param {number} [config.restThreshold=0.01] - Settling position threshold
   * @param {number} [config.restVelocityThreshold=0.01] - Settling velocity threshold
   */
  constructor(config = {}) {
    this.from = typeof config.from === 'number' && Number.isFinite(config.from) ? config.from : 0;
    this.target = typeof config.target === 'number' && Number.isFinite(config.target) ? config.target : 0;
    
    // Initial velocity hand-off (C¹ continuity v_0 = v_drag)
    const rawV0 = config.initialVelocity ?? config.velocity ?? config.v0 ?? 0;
    if (typeof rawV0 !== 'number' || !Number.isFinite(rawV0)) {
      throw new TypeError(`Initial velocity must be a finite number, received: ${rawV0}`);
    }
    this.initialVelocity = rawV0;

    // Mass
    const rawMass = config.mass ?? 1.0;
    if (typeof rawMass !== 'number' || !Number.isFinite(rawMass) || rawMass <= 0) {
      throw new RangeError(`Mass must be a positive number, received: ${rawMass}`);
    }
    this.mass = rawMass;

    // Stiffness
    const rawStiffness = config.stiffness ?? 100;
    if (typeof rawStiffness !== 'number' || !Number.isFinite(rawStiffness) || rawStiffness <= 0) {
      throw new RangeError(`Stiffness must be a positive number, received: ${rawStiffness}`);
    }
    this.stiffness = rawStiffness;

    // Natural Frequency \omega_n = \sqrt{k/m}
    const directOmegaN = config.naturalFrequency ?? config.omegaN;
    if (directOmegaN !== undefined) {
      if (typeof directOmegaN !== 'number' || !Number.isFinite(directOmegaN) || directOmegaN <= 0) {
        throw new RangeError(`Natural frequency must be a positive number, received: ${directOmegaN}`);
      }
      this.omegaN = directOmegaN;
    } else {
      this.omegaN = Math.sqrt(this.stiffness / this.mass);
    }

    // Damping Ratio \zeta = c / (2 \sqrt{k m})
    const directZeta = config.dampingRatio ?? config.zeta;
    if (directZeta !== undefined) {
      if (typeof directZeta !== 'number' || !Number.isFinite(directZeta) || directZeta < 0) {
        throw new RangeError(`Damping ratio must be a non-negative number, received: ${directZeta}`);
      }
      this.zeta = directZeta;
      this.damping = 2 * this.zeta * Math.sqrt(this.stiffness * this.mass);
    } else {
      const rawDamping = config.damping ?? 10;
      if (typeof rawDamping !== 'number' || !Number.isFinite(rawDamping) || rawDamping < 0) {
        throw new RangeError(`Damping coefficient must be a non-negative number, received: ${rawDamping}`);
      }
      this.damping = rawDamping;
      this.zeta = this.damping / (2 * Math.sqrt(this.stiffness * this.mass));
    }

    // Reduced Motion & Zero Overshoot
    this.prefersReducedMotion = Boolean(config.prefersReducedMotion);
    if (this.prefersReducedMotion) {
      // Clamp \zeta >= 1.0 under reduced motion
      if (this.zeta < 1.0) {
        this.zeta = 1.0;
        this.damping = 2 * this.zeta * Math.sqrt(this.stiffness * this.mass);
      }
    }

    this.clampZeroOvershoot = config.clampZeroOvershoot ?? this.prefersReducedMotion;

    // Settling Thresholds
    this.restThreshold = Math.max(1e-6, Number(config.restThreshold) || DEFAULT_REST_THRESHOLD);
    this.restVelocityThreshold = Math.max(1e-6, Number(config.restVelocityThreshold) || DEFAULT_REST_VELOCITY_THRESHOLD);

    // Initial displacement from equilibrium
    this.x0 = this.from - this.target;

    // Internal simulation time for step()
    this._currentTime = 0;
    this._isSettled = Math.abs(this.x0) <= this.restThreshold && Math.abs(this.initialVelocity) <= this.restVelocityThreshold;
  }

  /**
   * Evaluates the spring state at exact elapsed time t (seconds).
   * Conforms to SpringDynamicsEvaluator interface.
   * 
   * @param {number} tSeconds - Time in seconds from motion onset (t >= 0)
   * @returns {{
   *   position: number,
   *   velocity: number,
   *   isSettled: boolean
   * }}
   */
  evaluate(tSeconds) {
    const t = Math.max(0, Number(tSeconds) || 0);

    // If already settled at origin
    if (Math.abs(this.x0) <= this.restThreshold && Math.abs(this.initialVelocity) <= this.restVelocityThreshold) {
      return {
        position: this.target,
        velocity: 0,
        isSettled: true
      };
    }

    const sol = solveDampedHarmonicMotion({
      x0: this.x0,
      v0: this.initialVelocity,
      zeta: this.zeta,
      omegaN: this.omegaN,
      t,
      clampZeroOvershoot: this.clampZeroOvershoot
    });

    const currentPosition = this.target + sol.displacement;
    const currentVelocity = sol.velocity;

    // Settle criteria: both displacement and velocity below thresholds
    const isSettled = Math.abs(sol.displacement) <= this.restThreshold &&
                      Math.abs(currentVelocity) <= this.restVelocityThreshold;

    if (isSettled) {
      return {
        position: this.target,
        velocity: 0,
        isSettled: true
      };
    }

    return {
      position: currentPosition,
      velocity: currentVelocity,
      isSettled: false
    };
  }

  /**
   * Detailed solver returning displacement, acceleration, and regime.
   * 
   * @param {number} tSeconds
   * @returns {{
   *   displacement: number,
   *   position: number,
   *   velocity: number,
   *   acceleration: number,
   *   regime: 'underdamped' | 'critically-damped' | 'overdamped',
   *   isSettled: boolean
   * }}
   */
  solve(tSeconds) {
    const t = Math.max(0, Number(tSeconds) || 0);
    const sol = solveDampedHarmonicMotion({
      x0: this.x0,
      v0: this.initialVelocity,
      zeta: this.zeta,
      omegaN: this.omegaN,
      t,
      clampZeroOvershoot: this.clampZeroOvershoot
    });

    const isSettled = Math.abs(sol.displacement) <= this.restThreshold &&
                      Math.abs(sol.velocity) <= this.restVelocityThreshold;

    return {
      displacement: isSettled ? 0 : sol.displacement,
      position: isSettled ? this.target : this.target + sol.displacement,
      velocity: isSettled ? 0 : sol.velocity,
      acceleration: isSettled ? 0 : sol.acceleration,
      regime: sol.regime,
      isSettled
    };
  }

  /**
   * Advances internal simulation time by dt seconds and evaluates state.
   * 
   * @param {number} [dtSeconds=1/60]
   * @returns {{ position: number, velocity: number, isSettled: boolean }}
   */
  step(dtSeconds = 1 / 60) {
    this._currentTime += Math.max(0, Number(dtSeconds) || 0);
    const state = this.evaluate(this._currentTime);
    this._isSettled = state.isSettled;
    return state;
  }

  /**
   * Resets simulation time to 0 with optional new initial velocity.
   * 
   * @param {number} [newInitialVelocity]
   */
  reset(newInitialVelocity) {
    this._currentTime = 0;
    if (typeof newInitialVelocity === 'number' && Number.isFinite(newInitialVelocity)) {
      this.initialVelocity = newInitialVelocity;
    }
    this._isSettled = Math.abs(this.x0) <= this.restThreshold && Math.abs(this.initialVelocity) <= this.restVelocityThreshold;
  }

  /**
   * Get the current physical regime based on \zeta.
   * @returns {'underdamped' | 'critically-damped' | 'overdamped'}
   */
  getRegime() {
    if (Math.abs(this.zeta - 1.0) < REGIME_EPSILON) {
      return 'critically-damped';
    }
    return this.zeta < 1.0 ? 'underdamped' : 'overdamped';
  }

  /**
   * Natural frequency \omega_n (rad/s).
   * @returns {number}
   */
  getNaturalFrequency() {
    return this.omegaN;
  }

  /**
   * Damping ratio \zeta.
   * @returns {number}
   */
  getDampingRatio() {
    return this.zeta;
  }

  /**
   * Damped angular frequency \omega_d (rad/s) for underdamped regime, or 0.
   * @returns {number}
   */
  getDampedFrequency() {
    if (this.zeta >= 1.0) return 0;
    return this.omegaN * Math.sqrt(1 - this.zeta * this.zeta);
  }

  /**
   * Estimates settling time in seconds until |displacement| <= tolerance.
   * 
   * @param {number} [tolerance] - Position threshold (defaults to restThreshold)
   * @returns {number} Settling time in seconds
   */
  getSettlingTime(tolerance = this.restThreshold, velocityTolerance = this.restVelocityThreshold) {
    const tol = Math.max(1e-6, tolerance);
    const velTol = Math.max(1e-6, velocityTolerance);
    const initialDisp = Math.abs(this.x0);
    if (initialDisp <= tol && Math.abs(this.initialVelocity) <= velTol) {
      return 0;
    }

    // Analytical estimate bounds
    const alpha = this.zeta * this.omegaN;
    if (alpha <= 0) return Infinity;

    // Max amplitude factor A
    let amplitude = Math.sqrt(this.x0 * this.x0 + Math.pow((this.initialVelocity + alpha * this.x0) / this.omegaN, 2));
    if (amplitude < tol) amplitude = tol * 2;

    const tEst = Math.log(amplitude / Math.min(tol, velTol / Math.max(1, this.omegaN))) / alpha;

    // Sweep from 0 to maxT with fine step
    let t = 0;
    const maxT = Math.max(10, tEst * 4);
    const step = 0.005; // 5ms precision

    while (t < maxT) {
      const state = this.evaluate(t);
      if (state.isSettled) {
        return Math.round(t * 1000) / 1000;
      }
      t += step;
    }

    return Math.round(tEst * 1000) / 1000;
  }
}

/**
 * VelocityTracker
 * Sliding-window pointer velocity tracker for drag gesture release hand-off.
 * Maintains chronological samples over a 100ms window to compute C¹ continuous v_drag.
 */
class VelocityTracker {
  /**
   * @param {Object} [options={}]
   * @param {number} [options.windowMs=100] - Sample window in milliseconds
   * @param {number} [options.maxVelocity=10000] - Velocity clamp ceiling (px/s)
   */
  constructor(options = {}) {
    this.windowMs = Math.max(10, options.windowMs || 100);
    this.maxVelocity = Math.max(0, options.maxVelocity || 10000);
    this.samples = []; // Array of { position: number, timeMs: number }
  }

  /**
   * Record a pointer coordinate at a given timestamp.
   * 
   * @param {number} position - Position coordinate (e.g. clientX or scroll offset)
   * @param {number} [timestampMs] - Timestamp in milliseconds (defaults to now)
   */
  addPoint(position, timestampMs) {
    if (typeof position !== 'number' || !Number.isFinite(position)) return;
    const now = typeof timestampMs === 'number' && Number.isFinite(timestampMs)
      ? timestampMs
      : (typeof performance !== 'undefined' ? performance.now() : Date.now());

    this.samples.push({ position, timeMs: now });

    // Prune samples older than windowMs
    const cutoff = now - this.windowMs;
    while (this.samples.length > 2 && this.samples[0].timeMs < cutoff) {
      this.samples.shift();
    }
  }

  /**
   * Computes release velocity in units per second (e.g. px/s).
   * Uses linear regression over the window samples for noise-resistant C¹ estimation.
   * 
   * @returns {number} Velocity in units/sec
   */
  getVelocity() {
    if (this.samples.length < 2) return 0;

    const n = this.samples.length;
    const first = this.samples[0];
    const last = this.samples[n - 1];
    const totalDtMs = last.timeMs - first.timeMs;

    if (totalDtMs <= 0) return 0;

    // Use two-point delta if only 2 samples
    if (n === 2) {
      const v = ((last.position - first.position) / totalDtMs) * 1000;
      return Math.max(-this.maxVelocity, Math.min(this.maxVelocity, v));
    }

    // Least-squares regression slope for >= 3 samples:
    // v = \frac{N \sum(t_i p_i) - \sum t_i \sum p_i}{N \sum(t_i^2) - (\sum t_i)^2}
    let sumT = 0;
    let sumP = 0;
    let sumTP = 0;
    let sumT2 = 0;
    const t0 = first.timeMs;

    for (let i = 0; i < n; i++) {
      const t = (this.samples[i].timeMs - t0) / 1000; // seconds
      const p = this.samples[i].position;
      sumT += t;
      sumP += p;
      sumTP += t * p;
      sumT2 += t * t;
    }

    const denominator = n * sumT2 - sumT * sumT;
    if (Math.abs(denominator) < 1e-9) {
      const v = ((last.position - first.position) / totalDtMs) * 1000;
      return Math.max(-this.maxVelocity, Math.min(this.maxVelocity, v));
    }

    const slope = (n * sumTP - sumT * sumP) / denominator;
    return Math.max(-this.maxVelocity, Math.min(this.maxVelocity, slope));
  }

  /**
   * Clears all recorded samples.
   */
  reset() {
    this.samples = [];
  }
}

/**
 * Factory helper: creates a SpringDynamicsEvaluator instance.
 * 
 * @param {Object} config
 * @returns {SpringDynamicsEvaluator}
 */
function createSpring(config) {
  return new SpringDynamicsEvaluator(config);
}

/**
 * Gesture Hand-off Helper:
 * Creates a spring evaluator immediately taking the drag release velocity
 * as initial condition v_0 = v_drag, ensuring C¹ continuity.
 * 
 * @param {Object} options
 * @param {number} options.currentPosition - Position at release p(0)
 * @param {number} options.targetPosition - Target resting position p_target
 * @param {number} [options.dragVelocity=0] - Gesture release velocity v_drag (px/s)
 * @param {Object} [options.springConfig={}] - Physical stiffness/damping/mass options
 * @param {boolean} [options.prefersReducedMotion=false] - Accessibility reduced motion clamp
 * @returns {SpringDynamicsEvaluator}
 */
function createGestureSpring({
  currentPosition,
  targetPosition,
  dragVelocity = 0,
  springConfig = {},
  prefersReducedMotion = false
}) {
  return new SpringDynamicsEvaluator({
    ...springConfig,
    from: currentPosition,
    target: targetPosition,
    initialVelocity: dragVelocity,
    prefersReducedMotion
  });
}

module.exports = {
  SpringDynamicsEvaluator,
  VelocityTracker,
  solveDampedHarmonicMotion,
  createSpring,
  createGestureSpring,
  REGIME_EPSILON,
  DEFAULT_REST_THRESHOLD,
  DEFAULT_REST_VELOCITY_THRESHOLD
};
