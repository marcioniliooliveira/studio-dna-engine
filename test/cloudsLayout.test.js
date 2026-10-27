const test = require('node:test');
const assert = require('node:assert/strict');
const { generateCloudClusterSegments } = require('../src/components/interactive-cloud-hero/three/cloudGenerator.js');

test('generateCloudClusterSegments: generates correct number of segments matching requested count', () => {
  const segments25 = generateCloudClusterSegments({
    seed: 42,
    segments: 25,
    bounds: [4, 1.5, 1.5],
    center: [-3, 1, -2]
  });

  assert.equal(segments25.length, 25, 'Should return exactly 25 segments');

  const segmentsDefault = generateCloudClusterSegments();
  assert.equal(segmentsDefault.length, 20, 'Default segment count should be 20');
});

test('generateCloudClusterSegments: all puff positions are strictly bounded within bounds around center', () => {
  const center = [-3, 1, -2];
  const bounds = [4, 1.5, 1.5];
  const segments = generateCloudClusterSegments({
    seed: 42,
    segments: 50,
    bounds,
    center
  });

  segments.forEach((puff, idx) => {
    const [x, y, z] = puff.pos;
    assert.ok(
      Math.abs(x - center[0]) <= bounds[0] + 1e-6,
      `Puff #${idx} X (${x}) must be within [${center[0] - bounds[0]}, ${center[0] + bounds[0]}]`
    );
    assert.ok(
      Math.abs(y - center[1]) <= bounds[1] + 1e-6,
      `Puff #${idx} Y (${y}) must be within [${center[1] - bounds[1]}, ${center[1] + bounds[1]}]`
    );
    assert.ok(
      Math.abs(z - center[2]) <= bounds[2] + 1e-6,
      `Puff #${idx} Z (${z}) must be within [${center[2] - bounds[2]}, ${center[2] + bounds[2]}]`
    );
  });
});

test('generateCloudClusterSegments: deterministic reproducibility given the same seed', () => {
  const clusterA = generateCloudClusterSegments({
    seed: 1234,
    segments: 30,
    bounds: [5, 2, 2],
    center: [0, 0, 0]
  });

  const clusterB = generateCloudClusterSegments({
    seed: 1234,
    segments: 30,
    bounds: [5, 2, 2],
    center: [0, 0, 0]
  });

  assert.deepEqual(clusterA, clusterB, 'Identical seed and config must produce strictly identical puff arrays');
});

test('generateCloudClusterSegments: produces distinct distributions for different seeds', () => {
  const cluster1 = generateCloudClusterSegments({
    seed: 101,
    segments: 20,
    bounds: [3, 1, 1],
    center: [0, 0, 0]
  });

  const cluster2 = generateCloudClusterSegments({
    seed: 202,
    segments: 20,
    bounds: [3, 1, 1],
    center: [0, 0, 0]
  });

  assert.notDeepEqual(cluster1, cluster2, 'Different seeds must produce different puff distributions');
});

test('generateCloudClusterSegments: puff structure conforms to required interface', () => {
  const segments = generateCloudClusterSegments({ seed: 77, segments: 10 });

  segments.forEach((puff, idx) => {
    assert.ok(Array.isArray(puff.basePos), `Puff #${idx} must have basePos array`);
    assert.equal(puff.basePos.length, 3, `Puff #${idx} basePos must have 3 coordinates`);
    assert.ok(puff.basePos.every(Number.isFinite), `Puff #${idx} basePos must be finite numbers`);

    assert.ok(Array.isArray(puff.pos), `Puff #${idx} must have pos array`);
    assert.equal(puff.pos.length, 3, `Puff #${idx} pos must have 3 coordinates`);
    assert.ok(puff.pos.every(Number.isFinite), `Puff #${idx} pos must be finite numbers`);
    assert.deepEqual(puff.pos, puff.basePos, `Puff #${idx} pos must initially equal basePos`);

    assert.ok(Array.isArray(puff.disp), `Puff #${idx} must have disp array`);
    assert.deepEqual(puff.disp, [0, 0, 0], `Puff #${idx} disp must be initialized to [0, 0, 0]`);

    assert.ok(Array.isArray(puff.vel), `Puff #${idx} must have vel array`);
    assert.deepEqual(puff.vel, [0, 0, 0], `Puff #${idx} vel must be initialized to [0, 0, 0]`);

    assert.equal(typeof puff.scale, 'number', `Puff #${idx} scale must be a number`);
    assert.ok(puff.scale >= 1.2 && puff.scale <= 2.0, `Puff #${idx} scale (${puff.scale}) must be between 1.2 and 2.0`);

    assert.equal(typeof puff.rotation, 'number', `Puff #${idx} rotation must be a number`);
    assert.ok(puff.rotation >= 0 && puff.rotation <= Math.PI * 2, `Puff #${idx} rotation (${puff.rotation}) must be in [0, 2*PI]`);
  });
});

test('generateCloudClusterSegments: Box-Muller Gaussian concentration creates higher density near center', () => {
  const center = [0, 0, 0];
  const bounds = [10, 10, 10];
  const segments = generateCloudClusterSegments({
    seed: 999,
    segments: 200,
    bounds,
    center
  });

  // Count puffs within half-bounds vs outer half
  let innerCount = 0;
  segments.forEach(p => {
    const dx = p.pos[0] - center[0];
    const dy = p.pos[1] - center[1];
    const dist2D = Math.sqrt(dx * dx + dy * dy);
    // Half radial radius is 5.0
    if (dist2D < 5.0) {
      innerCount++;
    }
  });

  // In a uniform distribution on a 2D circle/box, only ~25% falls within the inner half radius.
  // Gaussian concentration concentrates puffs towards the center (>60%).
  assert.ok(
    innerCount > segments.length * 0.6,
    `Expected >60% puffs near center due to Gaussian falloff (vs ~25% uniform), got ${innerCount}/${segments.length}`
  );
});
