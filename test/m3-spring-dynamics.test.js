/**
 * test/m3-spring-dynamics.test.js
 * 
 * Milestone M3 Unit Test Battery
 * Analytical Spring Dynamics & Multi-Tier Vibration API Haptic Engine
 * 
 * Tests:
 *   1. 2nd-Order ODE Closed-Form Solutions (Underdamped, Critically Damped, Overdamped)
 *   2. Initial Condition Fidelity & ODE Equation Satisfaction
 *   3. Continuous C¹ Velocity Hand-off (v_0 = v_drag)
 *   4. Pointer Velocity Tracking (VelocityTracker)
 *   5. Strict Zero-Overshoot Clamping under prefers-reduced-motion (\zeta >= 1.0, 0px overshoot)
 *   6. Settling Detection & Frame-Rate Invariance (Continuous Analytical Sampling)
 *   7. Multi-Tier Vibration API Patterns ([12], [8], [22], [30, 40, 40])
 *   8. Graceful Fallback & Hardware Absence Handling
 *   9. Edge Cases & Parameter Validation
 */

'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const {
  SpringDynamicsEvaluator,
  VelocityTracker,
  solveDampedHarmonicMotion,
  createSpring,
  createGestureSpring
} = require('../src/physics/spring-dynamics');

const {
  HapticEngine,
  HAPTIC_PATTERNS,
  hapticEngine
} = require('../src/physics/haptic-engine');

describe('M3: Analytical Spring Dynamics — 2nd-Order ODE Solutions', () => {

  describe('1. Regime Identification and Initial Conditions', () => {
    it('underdamped regime (\zeta < 1.0): exact initial conditions x(0) = x0 and v(0) = v0', () => {
      const spring = new SpringDynamicsEvaluator({
        from: 200,
        target: 50,
        initialVelocity: 150,
        stiffness: 100,
        damping: 10, // zeta = 10 / (2 * sqrt(100*1)) = 0.5 < 1.0
        mass: 1.0
      });

      assert.equal(spring.getRegime(), 'underdamped');
      assert.ok(spring.getDampingRatio() < 1.0);
      assert.ok(Math.abs(spring.getDampingRatio() - 0.5) < 1e-6);
      assert.ok(Math.abs(spring.getNaturalFrequency() - 10) < 1e-6);

      const state0 = spring.evaluate(0);
      assert.equal(state0.position, 200);
      assert.equal(state0.velocity, 150);
      assert.equal(state0.isSettled, false);
    });

    it('critically damped regime (\zeta = 1.0): exact initial conditions', () => {
      const spring = new SpringDynamicsEvaluator({
        from: 0,
        target: 100,
        initialVelocity: -50,
        stiffness: 100,
        damping: 20, // zeta = 20 / (2 * sqrt(100*1)) = 1.0
        mass: 1.0
      });

      assert.equal(spring.getRegime(), 'critically-damped');
      assert.ok(Math.abs(spring.getDampingRatio() - 1.0) < 1e-6);

      const state0 = spring.evaluate(0);
      assert.equal(state0.position, 0);
      assert.equal(state0.velocity, -50);
    });

    it('overdamped regime (\zeta > 1.0): exact initial conditions', () => {
      const spring = new SpringDynamicsEvaluator({
        from: 500,
        target: 100,
        initialVelocity: 200,
        stiffness: 100,
        damping: 30, // zeta = 30 / (2 * sqrt(100*1)) = 1.5 > 1.0
        mass: 1.0
      });

      assert.equal(spring.getRegime(), 'overdamped');
      assert.ok(spring.getDampingRatio() > 1.0);
      assert.ok(Math.abs(spring.getDampingRatio() - 1.5) < 1e-6);

      const state0 = spring.evaluate(0);
      assert.equal(state0.position, 500);
      assert.equal(state0.velocity, 200);
    });
  });

  describe('2. Mathematical Fidelity & ODE Equation Verification', () => {
    it('underdamped: velocity matches numerical derivative (d/dt x(t)) with < 0.05% error', () => {
      const spring = new SpringDynamicsEvaluator({
        from: 100,
        target: 0,
        initialVelocity: 80,
        dampingRatio: 0.3,
        naturalFrequency: 15
      });

      const dt = 1e-5;
      const testTimes = [0.05, 0.1, 0.2, 0.35, 0.5];

      for (const t of testTimes) {
        const xMinus = spring.evaluate(t - dt).position;
        const xPlus = spring.evaluate(t + dt).position;
        const numericalVel = (xPlus - xMinus) / (2 * dt);
        const analyticalVel = spring.evaluate(t).velocity;

        assert.ok(
          Math.abs(numericalVel - analyticalVel) < 0.05,
          `At t=${t}, numerical vel ${numericalVel} vs analytical ${analyticalVel}`
        );
      }
    });

    it('critically damped: satisfies \\ddot{x} + 2\\zeta\\omega_n\\dot{x} + \\omega_n^2 x = 0', () => {
      const omegaN = 12;
      const zeta = 1.0;
      const x0 = 75;
      const v0 = -40;

      const testTimes = [0.02, 0.08, 0.15, 0.25, 0.4];
      for (const t of testTimes) {
        const sol = solveDampedHarmonicMotion({ x0, v0, zeta, omegaN, t });
        // Calculate ODE residual: acc + 2*zeta*omegaN*vel + omegaN^2*disp
        const odeResidual = sol.acceleration + 2 * zeta * omegaN * sol.velocity + omegaN * omegaN * sol.displacement;
        assert.ok(
          Math.abs(odeResidual) < 1e-6,
          `At t=${t}, ODE residual was ${odeResidual}, expected ~ 0`
        );
      }
    });

    it('overdamped: satisfies \\ddot{x} + 2\\zeta\\omega_n\\dot{x} + \\omega_n^2 x = 0 and matches two-root formulation', () => {
      const omegaN = 10;
      const zeta = 2.0;
      const x0 = 120;
      const v0 = 50;

      const testTimes = [0.05, 0.1, 0.2, 0.5, 1.0];
      for (const t of testTimes) {
        const sol = solveDampedHarmonicMotion({ x0, v0, zeta, omegaN, t });
        const odeResidual = sol.acceleration + 2 * zeta * omegaN * sol.velocity + omegaN * omegaN * sol.displacement;
        assert.ok(
          Math.abs(odeResidual) < 1e-6,
          `At t=${t}, ODE residual was ${odeResidual}, expected ~ 0`
        );

        // Check against independent root calculation
        const omegaH = omegaN * Math.sqrt(zeta * zeta - 1);
        const r1 = -zeta * omegaN + omegaH;
        const r2 = -zeta * omegaN - omegaH;
        const c1 = (v0 - r2 * x0) / (2 * omegaH);
        const c2 = (-v0 + r1 * x0) / (2 * omegaH);
        const expectedDisp = c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t);

        assert.ok(
          Math.abs(sol.displacement - expectedDisp) < 1e-6,
          `At t=${t}, displacement ${sol.displacement} vs expected ${expectedDisp}`
        );
      }
    });
  });

  describe('3. Continuous Velocity Hand-off (C¹ Continuity)', () => {
    it('transfers drag velocity v_drag directly to initial velocity v_0 upon release (\\dot{x}(0) \\equiv v_0)', () => {
      const releaseVelocities = [0, 450.5, -820.25, 1500, -3200];

      for (const vDrag of releaseVelocities) {
        const spring = createGestureSpring({
          currentPosition: 350,
          targetPosition: 100,
          dragVelocity: vDrag,
          springConfig: { stiffness: 180, damping: 24 }
        });

        const atRelease = spring.evaluate(0);
        assert.equal(atRelease.position, 350);
        assert.equal(atRelease.velocity, vDrag, `v(0) must equal v_drag: ${vDrag}`);

        // Limit as dt -> 0 matches v_drag
        const dt = 1e-6;
        const stateEps = spring.evaluate(dt);
        const finiteDiffVel = (stateEps.position - atRelease.position) / dt;
        assert.ok(
          Math.abs(finiteDiffVel - vDrag) < 0.5,
          `Finite difference (${finiteDiffVel}) near t=0 must match release velocity (${vDrag})`
        );
      }
    });

    it('VelocityTracker calculates accurate drag velocity from sliding pointer coordinates', () => {
      const tracker = new VelocityTracker({ windowMs: 100 });

      // Simulate a constant 500 px/s gesture moving from 0 to 50px over 100ms
      const startTime = 1000;
      for (let i = 0; i <= 10; i++) {
        const timeMs = startTime + i * 10; // 10ms intervals
        const pos = i * 5; // 5px per 10ms = 500 px/s
        tracker.addPoint(pos, timeMs);
      }

      const calculatedVelocity = tracker.getVelocity();
      assert.ok(
        Math.abs(calculatedVelocity - 500) < 5,
        `Tracker velocity should be ~500 px/s, got ${calculatedVelocity}`
      );

      // Verify handoff integration
      const spring = createGestureSpring({
        currentPosition: 50,
        targetPosition: 200,
        dragVelocity: calculatedVelocity
      });

      assert.equal(spring.evaluate(0).position, 50);
      assert.equal(spring.evaluate(0).velocity, calculatedVelocity);
    });

    it('VelocityTracker handles noisy or stationary gestures safely', () => {
      const tracker = new VelocityTracker();
      assert.equal(tracker.getVelocity(), 0);

      // Single point
      tracker.addPoint(100, 1000);
      assert.equal(tracker.getVelocity(), 0);

      // Two identical points (zero velocity)
      tracker.addPoint(100, 1050);
      assert.equal(tracker.getVelocity(), 0);

      // Reset works
      tracker.reset();
      assert.equal(tracker.getVelocity(), 0);
    });
  });

  describe('4. Strict Zero-Overshoot Clamping under prefers-reduced-motion', () => {
    it('dynamically clamps damping ratio \\zeta >= 1.0 when prefers-reduced-motion is active', () => {
      // Underdamped config (\zeta = 0.25)
      const spring = new SpringDynamicsEvaluator({
        from: 200,
        target: 0,
        stiffness: 100,
        damping: 5, // zeta = 0.25
        prefersReducedMotion: true
      });

      assert.ok(
        spring.getDampingRatio() >= 1.0,
        `Damping ratio must be clamped to >= 1.0, got ${spring.getDampingRatio()}`
      );
      assert.equal(spring.getRegime(), 'critically-damped');
    });

    it('enforces strict 0.0px overshoot across 2,000 continuous time samples (from > target)', () => {
      const spring = new SpringDynamicsEvaluator({
        from: 150,
        target: 50, // displacement x0 = +100
        initialVelocity: -200, // adverse initial velocity aimed toward target
        stiffness: 120,
        damping: 10,
        prefersReducedMotion: true
      });

      // Sample 2,000 steps from t=0 to t=4.0 seconds
      let minObservedPosition = Infinity;
      for (let i = 0; i <= 2000; i++) {
        const t = (i / 2000) * 4.0;
        const { position } = spring.evaluate(t);
        if (position < minObservedPosition) {
          minObservedPosition = position;
        }

        // Must NEVER drop below target (50)
        assert.ok(
          position >= 50,
          `Overshoot detected! At t=${t}, position was ${position} < target 50`
        );
        // Must never exceed start (150)
        assert.ok(
          position <= 150,
          `Position ${position} exceeded initial boundary 150`
        );
      }

      // Max overshoot past target is exactly 0.0px
      const overshoot = Math.max(0, 50 - minObservedPosition);
      assert.equal(overshoot, 0, 'Overshoot must be strictly 0px');
    });

    it('enforces strict 0.0px overshoot across 2,000 continuous time samples (from < target)', () => {
      const spring = new SpringDynamicsEvaluator({
        from: -200,
        target: 0, // displacement x0 = -200
        initialVelocity: 500, // strong velocity toward target
        stiffness: 100,
        dampingRatio: 0.1, // originally very bouncy
        prefersReducedMotion: true
      });

      let maxObservedPosition = -Infinity;
      for (let i = 0; i <= 2000; i++) {
        const t = (i / 2000) * 4.0;
        const { position } = spring.evaluate(t);
        if (position > maxObservedPosition) {
          maxObservedPosition = position;
        }

        // Must NEVER exceed target (0)
        assert.ok(
          position <= 0,
          `Overshoot detected! At t=${t}, position was ${position} > target 0`
        );
        assert.ok(
          position >= -200,
          `Position ${position} dropped below initial -200`
        );
      }

      const overshoot = Math.max(0, maxObservedPosition - 0);
      assert.equal(overshoot, 0, 'Overshoot must be strictly 0px');
    });

    it('snaps smoothly to target when settled under reduced motion', () => {
      const spring = new SpringDynamicsEvaluator({
        from: 80,
        target: 0,
        prefersReducedMotion: true,
        naturalFrequency: 20
      });

      const settledState = spring.evaluate(1.5);
      assert.equal(settledState.isSettled, true);
      assert.equal(settledState.position, 0);
      assert.equal(settledState.velocity, 0);
    });
  });

  describe('5. Settling Detection, Step Simulation, & Frame-Rate Invariance', () => {
    it('detects settling when displacement and velocity cross threshold', () => {
      const spring = new SpringDynamicsEvaluator({
        from: 50,
        target: 0,
        dampingRatio: 1.0,
        naturalFrequency: 15,
        restThreshold: 0.05,
        restVelocityThreshold: 0.05
      });

      assert.equal(spring.evaluate(0).isSettled, false);

      const settlingTime = spring.getSettlingTime(0.05);
      assert.ok(settlingTime > 0 && settlingTime < 2.0);

      const settledState = spring.evaluate(settlingTime + 0.1);
      assert.equal(settledState.isSettled, true);
      assert.equal(settledState.position, 0);
      assert.equal(settledState.velocity, 0);
    });

    it('frame-rate invariance: sampling at 30fps vs 60fps produces identical results at any timestamp t', () => {
      const spring60fps = new SpringDynamicsEvaluator({
        from: 250,
        target: 20,
        initialVelocity: -100,
        stiffness: 150,
        damping: 18
      });

      const spring30fps = new SpringDynamicsEvaluator({
        from: 250,
        target: 20,
        initialVelocity: -100,
        stiffness: 150,
        damping: 18
      });

      // Advance one at 60fps (dt = 1/60s), advance one at 30fps (dt = 1/30s)
      for (let frame = 1; frame <= 60; frame++) {
        spring60fps.step(1 / 60);
      }
      for (let frame = 1; frame <= 30; frame++) {
        spring30fps.step(1 / 30);
      }

      // Both are now at t = 1.0 second. Because evaluation is exact closed-form, positions match identically!
      const eval60 = spring60fps.evaluate(1.0);
      const eval30 = spring30fps.evaluate(1.0);

      assert.equal(eval60.position, eval30.position);
      assert.equal(eval60.velocity, eval30.velocity);
      assert.equal(eval60.isSettled, eval30.isSettled);
    });

    it('reset() resets simulation time and optionally updates velocity', () => {
      const spring = new SpringDynamicsEvaluator({
        from: 100,
        target: 0,
        initialVelocity: 50
      });

      spring.step(0.5);
      assert.notEqual(spring.evaluate(0.5).position, 100);

      spring.reset(200);
      const resetState = spring.evaluate(0);
      assert.equal(resetState.position, 100);
      assert.equal(resetState.velocity, 200);
    });
  });

  describe('6. Edge Cases & Validation', () => {
    it('handles already-at-rest state (x0 = 0, v0 = 0) immediately', () => {
      const spring = new SpringDynamicsEvaluator({ from: 10, target: 10, initialVelocity: 0 });
      const state = spring.evaluate(0);
      assert.equal(state.isSettled, true);
      assert.equal(state.position, 10);
      assert.equal(state.velocity, 0);
    });

    it('handles negative time t < 0 by evaluating at boundary t = 0', () => {
      const spring = new SpringDynamicsEvaluator({ from: 100, target: 0, initialVelocity: 40 });
      const state = spring.evaluate(-1.5);
      assert.equal(state.position, 100);
      assert.equal(state.velocity, 40);
    });

    it('throws descriptive RangeError for non-positive mass or stiffness', () => {
      assert.throws(
        () => new SpringDynamicsEvaluator({ mass: 0 }),
        /Mass must be a positive number/
      );
      assert.throws(
        () => new SpringDynamicsEvaluator({ stiffness: -10 }),
        /Stiffness must be a positive number/
      );
      assert.throws(
        () => new SpringDynamicsEvaluator({ damping: -5 }),
        /Damping coefficient must be a non-negative number/
      );
    });
  });
});

describe('M3: Multi-Tier Vibration API Haptic Engine', () => {

  describe('1. Pattern Constants & Tier Verification', () => {
    it('defines exact pulse tiers: detent/snap [12], release [8], limit [22], error [30, 40, 40]', () => {
      assert.deepEqual(HAPTIC_PATTERNS.detent, [12]);
      assert.deepEqual(HAPTIC_PATTERNS.snap, [12]);
      assert.deepEqual(HAPTIC_PATTERNS.release, [8]);
      assert.deepEqual(HAPTIC_PATTERNS.limit, [22]);
      assert.deepEqual(HAPTIC_PATTERNS.boundary_limit, [22]);
      assert.deepEqual(HAPTIC_PATTERNS.error, [30, 40, 40]);
    });
  });

  describe('2. Vibration API Dispatch with Mock Navigator', () => {
    it('dispatches exact patterns through navigator.vibrate', () => {
      const calls = [];
      const mockNavigator = {
        vibrate(pattern) {
          calls.push(pattern);
          return true;
        }
      };

      const engine = new HapticEngine({ navigatorRef: mockNavigator });
      assert.equal(engine.isSupported(), true);

      // Trigger all primary tiers
      assert.equal(engine.triggerDetent(), true);
      assert.equal(engine.triggerSnap(), true);
      assert.equal(engine.triggerRelease(), true);
      assert.equal(engine.triggerLimit(), true);
      assert.equal(engine.triggerError(), true);

      assert.equal(calls.length, 5);
      assert.deepEqual(calls[0], [12]);
      assert.deepEqual(calls[1], [12]);
      assert.deepEqual(calls[2], [8]);
      assert.deepEqual(calls[3], [22]);
      assert.deepEqual(calls[4], [30, 40, 40]);

      // History was recorded
      const history = engine.getHistory();
      assert.equal(history.length, 5);
      assert.equal(history[0].tier, 'detent');
      assert.equal(history[0].dispatched, true);
    });

    it('cancel() dispatches zero to navigator.vibrate', () => {
      let canceled = false;
      const mockNavigator = {
        vibrate(val) {
          if (val === 0) canceled = true;
          return true;
        }
      };

      const engine = new HapticEngine({ navigatorRef: mockNavigator });
      assert.equal(engine.cancel(), true);
      assert.equal(canceled, true);
    });

    it('supports custom pattern registration and execution', () => {
      const calls = [];
      const mockNavigator = {
        vibrate(p) { calls.push(p); return true; }
      };

      const engine = new HapticEngine({ navigatorRef: mockNavigator });
      engine.registerPattern('double_tap', [15, 30, 15]);
      assert.deepEqual(engine.getPattern('double_tap'), [15, 30, 15]);

      assert.equal(engine.trigger('double_tap'), true);
      assert.deepEqual(calls[0], [15, 30, 15]);
    });
  });

  describe('3. Graceful Fallback & Absence of Hardware', () => {
    it('gracefully handles undefined navigator without crashing', () => {
      const engine = new HapticEngine({ navigatorRef: null });
      // In Node.js or environments where navigator.vibrate is absent:
      assert.equal(engine.trigger('snap'), false);
      assert.equal(engine.trigger('error'), false);

      const history = engine.getHistory();
      assert.ok(history.length >= 2);
      assert.equal(history[0].dispatched, false);
      assert.equal(history[0].reason, 'unsupported-api');
    });

    it('gracefully catches unexpected navigator.vibrate exceptions', () => {
      const mockNavigator = {
        vibrate() {
          throw new Error('Hardware vibrator failure: SecurityError or user gesture missing');
        }
      };

      const engine = new HapticEngine({ navigatorRef: mockNavigator });
      // Must not throw, must return false
      assert.doesNotThrow(() => {
        const result = engine.trigger('limit');
        assert.equal(result, false);
      });

      const history = engine.getHistory();
      assert.equal(history[0].dispatched, false);
      assert.equal(history[0].reason, 'exception');
    });

    it('respects setEnabled(false) and suppresses vibrations', () => {
      const calls = [];
      const mockNavigator = {
        vibrate(p) { calls.push(p); return true; }
      };

      const engine = new HapticEngine({ navigatorRef: mockNavigator });
      engine.setEnabled(false);
      assert.equal(engine.isEnabled(), false);

      const result = engine.trigger('snap');
      assert.equal(result, false);
      assert.equal(calls.length, 0);

      const history = engine.getHistory();
      assert.equal(history[0].reason, 'disabled');
    });

    it('suppresses vibration when prefersReducedMotion and suppressOnReducedMotion are active', () => {
      const calls = [];
      const mockNavigator = {
        vibrate(p) { calls.push(p); return true; }
      };

      const engine = new HapticEngine({
        navigatorRef: mockNavigator,
        prefersReducedMotion: true,
        suppressOnReducedMotion: true
      });

      const result = engine.trigger('snap');
      assert.equal(result, false);
      assert.equal(calls.length, 0);

      const history = engine.getHistory();
      assert.equal(history[0].reason, 'reduced-motion');
    });

    it('clearHistory() flushes all recorded events', () => {
      const mockNavigator = { vibrate: () => true };
      const engine = new HapticEngine({ navigatorRef: mockNavigator });
      engine.trigger('snap');
      engine.trigger('release');
      assert.equal(engine.getHistory().length, 2);

      engine.clearHistory();
      assert.equal(engine.getHistory().length, 0);
    });

    it('handles numeric pulse and array of pulses directly', () => {
      const calls = [];
      const mockNavigator = { vibrate: (p) => { calls.push(p); return true; } };
      const engine = new HapticEngine({ navigatorRef: mockNavigator });

      assert.equal(engine.trigger(50), true);
      assert.deepEqual(calls[0], [50]);

      assert.equal(engine.trigger([10, 20, 30]), true);
      assert.deepEqual(calls[1], [10, 20, 30]);
    });

    it('returns false for invalid tier names or non-numeric patterns', () => {
      const mockNavigator = { vibrate: () => true };
      const engine = new HapticEngine({ navigatorRef: mockNavigator });

      assert.equal(engine.trigger('unknown_tier_xyz'), false);
      assert.equal(engine.trigger(null), false);
      assert.equal(engine.trigger(undefined), false);
      assert.equal(engine.trigger(-10), false);
    });

    it('default singleton hapticEngine instance is exported and operational', () => {
      assert.ok(hapticEngine instanceof HapticEngine);
      assert.equal(typeof hapticEngine.trigger, 'function');
      assert.equal(typeof hapticEngine.isSupported, 'function');
    });
  });
});

describe('M3: Deep Physical Behaviors & Mathematical Invariants', () => {
  it('underdamped spring oscillates across equilibrium (changes sign)', () => {
    const spring = new SpringDynamicsEvaluator({
      from: 100,
      target: 0,
      initialVelocity: 0,
      dampingRatio: 0.1, // very low damping, high oscillation
      naturalFrequency: 10
    });

    // Omega_d = 10 * sqrt(1 - 0.01) = 9.95 rad/s.
    // Half period is pi / 9.95 = ~0.316s. At t = 0.316s, displacement should be negative!
    const tHalfPeriod = Math.PI / spring.getDampedFrequency();
    const stateHalf = spring.evaluate(tHalfPeriod);
    assert.ok(
      stateHalf.position < -50,
      `Underdamped motion must overshoot equilibrium in normal mode: got ${stateHalf.position}`
    );
  });

  it('reduced motion strictly suppresses overshoot even with extreme adverse velocity v0 = -5000', () => {
    const spring = new SpringDynamicsEvaluator({
      from: 50,
      target: 0,
      initialVelocity: -5000, // extreme velocity towards target
      dampingRatio: 0.05,
      naturalFrequency: 25,
      prefersReducedMotion: true
    });

    for (let t = 0; t <= 1.0; t += 0.001) {
      const state = spring.evaluate(t);
      assert.ok(
        state.position >= 0,
        `Reduced motion failed: position ${state.position} overshot 0 at t=${t}`
      );
      assert.ok(
        state.position <= 50,
        `Reduced motion failed: position ${state.position} exceeded start 50 at t=${t}`
      );
    }
  });

  it('direct solveDampedHarmonicMotion function works independently', () => {
    const sol = solveDampedHarmonicMotion({
      x0: 50,
      v0: 10,
      zeta: 1.0,
      omegaN: 10,
      t: 0.1
    });

    assert.equal(sol.regime, 'critically-damped');
    assert.ok(typeof sol.displacement === 'number');
    assert.ok(typeof sol.velocity === 'number');
    assert.ok(typeof sol.acceleration === 'number');
  });

  it('createSpring factory correctly creates functional evaluator', () => {
    const spring = createSpring({ from: 10, target: 50 });
    assert.ok(spring instanceof SpringDynamicsEvaluator);
    assert.equal(spring.from, 10);
    assert.equal(spring.target, 50);
  });
});

