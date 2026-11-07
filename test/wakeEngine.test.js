const test = require('node:test');
const assert = require('node:assert/strict');
const { computeProjectileWake, applySpringRelaxation } = require('../src/components/interactive-cloud-hero/physics/wakeEngine.js');

test('computeProjectileWake: returns zero displacement and illumination outside wake radius', () => {
  const particlePos = [10, 0, 0];
  const projectilePos = [0, 0, 0];
  const projectileVelocity = [1, 0, 0];

  const result = computeProjectileWake(particlePos, projectilePos, projectileVelocity, {
    wakeRadius: 2.5
  });

  assert.deepEqual(result.displacement, [0, 0, 0]);
  assert.equal(result.illumination, 0);
});

test('computeProjectileWake: returns zero displacement and illumination when distance < 0.0001 (singularity protection)', () => {
  const particlePos = [1, 2, 3];
  const projectilePos = [1, 2, 3]; // dist = 0
  const projectileVelocity = [1, 0, 0];

  const result = computeProjectileWake(particlePos, projectilePos, projectileVelocity);

  assert.deepEqual(result.displacement, [0, 0, 0]);
  assert.equal(result.illumination, 0);
});

test('computeProjectileWake: calculates repulsion away from projectile', () => {
  // Particle at [1, 0, 0], projectile at [0, 0, 0] with zero velocity (no swirl)
  const particlePos = [1, 0, 0];
  const projectilePos = [0, 0, 0];
  const projectileVelocity = [0, 0, 0];

  const result = computeProjectileWake(particlePos, projectilePos, projectileVelocity, {
    wakeRadius: 2.5,
    pushStrength: 0.5,
    swirlStrength: 0.0,
    lightIntensity: 1.0
  });

  const dist = 1.0;
  const falloff = Math.exp(-dist * (3.0 / 2.5));
  const expectedPush = 0.5 * falloff;

  assert.ok(result.displacement[0] > 0, 'Should push particle in +X direction');
  assert.ok(Math.abs(result.displacement[0] - expectedPush) < 1e-6);
  assert.equal(result.displacement[1], 0);
  assert.equal(result.displacement[2], 0);
  assert.ok(result.illumination > 0);
});

test('computeProjectileWake: calculates vortex swirl cross product correctly', () => {
  // Projectile moving in +X direction: vx = 2, vy = 0, vz = 0
  // Particle positioned in +Y direction: dx = 0, dy = 1, dz = 0 -> norm = [0, 1, 0]
  // Cross product: v x norm = [vx, vy, vz] x [0, 1, 0] = [0, 0, vx * 1] = [0, 0, 2]
  const particlePos = [0, 1, 0];
  const projectilePos = [0, 0, 0];
  const projectileVelocity = [2, 0, 0];

  const result = computeProjectileWake(particlePos, projectilePos, projectileVelocity, {
    wakeRadius: 2.5,
    pushStrength: 0.0, // isolate swirl
    swirlStrength: 0.4
  });

  const dist = 1.0;
  const falloff = Math.exp(-dist * (3.0 / 2.5));
  const swirlFactor = (0.4 / (dist + 0.1)) * falloff;
  const expectedSwirlZ = (2 * 1 - 0 * 0) * swirlFactor; // vx * normY - vy * normX

  assert.equal(result.displacement[0], 0);
  assert.equal(result.displacement[1], 0);
  assert.ok(Math.abs(result.displacement[2] - expectedSwirlZ) < 1e-6);
  assert.ok(result.displacement[2] > 0);
});

test('computeProjectileWake: computes accurate volumetric illumination contribution', () => {
  const particlePos = [0.5, 0, 0];
  const projectilePos = [0, 0, 0];
  const projectileVelocity = [0, 1, 0];

  const result = computeProjectileWake(particlePos, projectilePos, projectileVelocity, {
    wakeRadius: 2.0,
    lightIntensity: 2.5
  });

  const distSq = 0.25;
  const dist = 0.5;
  const falloff = Math.exp(-dist * (3.0 / 2.0));
  const expectedIllumination = (2.5 / (distSq + 0.15)) * falloff;

  assert.ok(Math.abs(result.illumination - expectedIllumination) < 1e-6);
});

test('computeProjectileWake: uses default config parameters when none provided', () => {
  const particlePos = [1, 0, 0];
  const projectilePos = [0, 0, 0];
  const projectileVelocity = [1, 0, 0];

  const result = computeProjectileWake(particlePos, projectilePos, projectileVelocity);

  // Defaults: wakeRadius = 2.5, pushStrength = 0.4, swirlStrength = 0.25, lightIntensity = 1.0
  const dist = 1.0;
  const falloff = Math.exp(-dist * (3.0 / 2.5));
  const push = 0.4 * falloff;
  // norm = [1, 0, 0], v = [1, 0, 0] -> v x norm = [0, 0, 0]
  assert.ok(Math.abs(result.displacement[0] - push) < 1e-6);
  assert.equal(result.displacement[1], 0);
  assert.equal(result.displacement[2], 0);

  const expectedIllum = (1.0 / (1.0 + 0.15)) * falloff;
  assert.ok(Math.abs(result.illumination - expectedIllum) < 1e-6);
});

test('applySpringRelaxation: relaxes displaced particle back toward zero with single step physics', () => {
  const displacement = [1.0, 0.5, -0.2];
  const velocity = [0.0, 0.0, 0.0];
  const delta = 0.016;
  const stiffness = 12.0;
  const damping = 3.5;

  const { newDisplacement, newVelocity } = applySpringRelaxation(
    displacement,
    velocity,
    delta,
    stiffness,
    damping
  );

  for (let i = 0; i < 3; i++) {
    const springForce = -stiffness * displacement[i];
    const dampingForce = -damping * velocity[i];
    const accel = springForce + dampingForce;
    const expectedVelocity = velocity[i] + accel * delta;
    const expectedDisplacement = displacement[i] + expectedVelocity * delta;

    assert.ok(Math.abs(newVelocity[i] - expectedVelocity) < 1e-7);
    assert.ok(Math.abs(newDisplacement[i] - expectedDisplacement) < 1e-7);
  }

  // Displacement magnitude must decrease
  assert.ok(Math.abs(newDisplacement[0]) < Math.abs(displacement[0]));
});

test('applySpringRelaxation: decays over multiple simulation steps toward equilibrium', () => {
  let displacement = [2.0, -1.5, 0.8];
  let velocity = [0, 0, 0];
  const delta = 0.016;

  // Run 120 steps (~2 seconds at 60fps)
  for (let step = 0; step < 120; step++) {
    const res = applySpringRelaxation(displacement, velocity, delta);
    displacement = res.newDisplacement;
    velocity = res.newVelocity;
  }

  // After 2 seconds with stiffness=12, damping=3.5, amplitude should have decayed significantly (< 0.05)
  assert.ok(Math.abs(displacement[0]) < 0.05, `Displacement[0] should be near 0, got ${displacement[0]}`);
  assert.ok(Math.abs(displacement[1]) < 0.05, `Displacement[1] should be near 0, got ${displacement[1]}`);
  assert.ok(Math.abs(displacement[2]) < 0.05, `Displacement[2] should be near 0, got ${displacement[2]}`);
});
