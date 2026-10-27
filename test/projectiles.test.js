const test = require('node:test');
const assert = require('node:assert/strict');
const {
  calculateProjectileTrajectory,
  getProjectileStates,
  PROJECTILE_COLORS
} = require('../src/components/interactive-cloud-hero/three/projectileMath.js');

test('calculateProjectileTrajectory: returns valid 3D position, velocity, color, and intensity', () => {
  const p = calculateProjectileTrajectory(0, 0);

  assert.ok(p, 'Trajectory result should exist');
  assert.ok(Array.isArray(p.position), 'Position must be an array');
  assert.equal(p.position.length, 3, 'Position must have 3 components');
  assert.ok(p.position.every(Number.isFinite), 'Position components must be finite numbers');

  assert.ok(Array.isArray(p.velocity), 'Velocity must be an array');
  assert.equal(p.velocity.length, 3, 'Velocity must have 3 components');
  assert.ok(p.velocity.every(Number.isFinite), 'Velocity components must be finite numbers');

  assert.equal(typeof p.color, 'string', 'Color must be a string');
  assert.ok(/^#[0-9a-fA-F]{6}$/.test(p.color), 'Color must be a hex color');

  assert.equal(typeof p.intensity, 'number', 'Intensity must be a number');
  assert.equal(p.intensity, 2.5, 'Default intensity should be 2.5');
});

test('calculateProjectileTrajectory: calculates exact mathematical harmonic positions', () => {
  // Test index = 0, time = 0
  // i = 1, speed = 0.8 + 0.15 = 0.95, t = 0
  // X = sin(1) * (6.0 + 0.8) = sin(1) * 6.8
  // Y = cos(1.5) * (2.5 + 0.4) = cos(1.5) * 2.9
  // Z = sin(2.0) * (4.0 + 0.5) = sin(2.0) * 4.5
  const expectedX0 = Math.sin(1.0) * 6.8;
  const expectedY0 = Math.cos(1.5) * 2.9;
  const expectedZ0 = Math.sin(2.0) * 4.5;

  const p0 = calculateProjectileTrajectory(0, 0);

  assert.ok(Math.abs(p0.position[0] - expectedX0) < 1e-9, 'X position matches formula');
  assert.ok(Math.abs(p0.position[1] - expectedY0) < 1e-9, 'Y position matches formula');
  assert.ok(Math.abs(p0.position[2] - expectedZ0) < 1e-9, 'Z position matches formula');

  // Test index = 1, time = 2.0
  // i = 2, speed = 0.8 + 2 * 0.15 = 1.1, t = 2.0 * 1.1 = 2.2
  // X = sin(2.2 * 0.7 + 2) * (6.0 + 1.6) = sin(3.54) * 7.6
  // Y = cos(2.2 * 0.9 + 3.0) * (2.5 + 0.8) = cos(4.98) * 3.3
  // Z = sin(2.2 * 0.5 + 4.0) * (4.0 + 1.0) = sin(5.1) * 5.0
  const expectedX1 = Math.sin(2.2 * 0.7 + 2) * 7.6;
  const expectedY1 = Math.cos(2.2 * 0.9 + 3.0) * 3.3;
  const expectedZ1 = Math.sin(2.2 * 0.5 + 4.0) * 5.0;

  const p1 = calculateProjectileTrajectory(1, 2.0);

  assert.ok(Math.abs(p1.position[0] - expectedX1) < 1e-9, 'X position matches formula for index 1');
  assert.ok(Math.abs(p1.position[1] - expectedY1) < 1e-9, 'Y position matches formula for index 1');
  assert.ok(Math.abs(p1.position[2] - expectedZ1) < 1e-9, 'Z position matches formula for index 1');
});

test('calculateProjectileTrajectory: computes non-zero finite velocity via finite differences (dt = 0.01)', () => {
  const p = calculateProjectileTrajectory(0, 1.0);
  const i = 1;
  const speed = 0.95;
  const t = 1.0 * speed;
  const dt = 0.01;
  const tNext = t + dt;

  const expectedVx = (Math.sin(tNext * 0.7 + i) * 6.8 - Math.sin(t * 0.7 + i) * 6.8) / dt;
  const expectedVy = (Math.cos(tNext * 0.9 + i * 1.5) * 2.9 - Math.cos(t * 0.9 + i * 1.5) * 2.9) / dt;
  const expectedVz = (Math.sin(tNext * 0.5 + i * 2.0) * 4.5 - Math.sin(t * 0.5 + i * 2.0) * 4.5) / dt;

  assert.ok(Math.abs(p.velocity[0] - expectedVx) < 1e-7, 'Vx matches finite difference');
  assert.ok(Math.abs(p.velocity[1] - expectedVy) < 1e-7, 'Vy matches finite difference');
  assert.ok(Math.abs(p.velocity[2] - expectedVz) < 1e-7, 'Vz matches finite difference');

  const speedMag = Math.sqrt(p.velocity[0] ** 2 + p.velocity[1] ** 2 + p.velocity[2] ** 2);
  assert.ok(speedMag > 0.1, 'Speed magnitude must be non-zero and significant');
});

test('calculateProjectileTrajectory: cycles through amber/gold/orange color palette', () => {
  const expectedColors = ["#ff9d00", "#ffc400", "#ff6200", "#ffa64d"];

  assert.deepEqual(PROJECTILE_COLORS, expectedColors);

  for (let idx = 0; idx < 8; idx++) {
    const trajectory = calculateProjectileTrajectory(idx, 0);
    assert.equal(trajectory.color, expectedColors[idx % expectedColors.length]);
  }
});

test('calculateProjectileTrajectory: evolves deterministically and smoothly over time', () => {
  const stateA1 = calculateProjectileTrajectory(2, 3.5);
  const stateA2 = calculateProjectileTrajectory(2, 3.5);

  assert.deepEqual(stateA1, stateA2, 'Same input parameters produce identical state (deterministic)');

  const stateB = calculateProjectileTrajectory(2, 3.6);
  assert.notDeepEqual(stateA1.position, stateB.position, 'Position changes over time');

  // Verify smooth evolution (small delta t yields small delta position)
  const dx = stateB.position[0] - stateA1.position[0];
  const dy = stateB.position[1] - stateA1.position[1];
  const dz = stateB.position[2] - stateA1.position[2];
  const deltaDist = Math.sqrt(dx * dx + dy * dy + dz * dz);

  assert.ok(deltaDist > 0 && deltaDist < 2.0, 'Displacement is smooth and bounded');
});

test('calculateProjectileTrajectory: produces distinct trajectories for distinct indices', () => {
  const p0 = calculateProjectileTrajectory(0, 1.0);
  const p1 = calculateProjectileTrajectory(1, 1.0);
  const p2 = calculateProjectileTrajectory(2, 1.0);

  assert.notDeepEqual(p0.position, p1.position);
  assert.notDeepEqual(p1.position, p2.position);
  assert.notDeepEqual(p0.position, p2.position);
});

test('getProjectileStates: returns an array of projectile states with correct length and indexing', () => {
  const states = getProjectileStates(1.5, 4);

  assert.equal(states.length, 4);
  states.forEach((s, i) => {
    const expected = calculateProjectileTrajectory(i, 1.5);
    assert.deepEqual(s, expected);
  });
});

test('getProjectileStates: defaults to count = 4 when count argument is omitted', () => {
  const states = getProjectileStates(2.0);
  assert.equal(states.length, 4);
});
