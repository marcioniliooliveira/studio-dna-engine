/**
 * Drei-Style Volumetric Cloud Cluster Generator
 *
 * Generates clustered volumetric cloud puff segments distributed within
 * 3D bounding volumes using Box-Muller Gaussian concentration,
 * providing the organic density falloff characteristic of natural clouds.
 */

/**
 * Creates a deterministic pseudo-random number generator (Lehmer LCG)
 * producing uniformly distributed floats in [0, 1).
 *
 * @param {number} seed - Integer seed
 * @returns {() => number}
 */
function pseudoRandom(seed = 1) {
  let s = (Math.floor(Math.abs(seed)) || 1) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Generates an array of cloud puff segments distributed within a 3D bounding box
 * centered around `center`, concentrated towards the core via Box-Muller transform.
 *
 * @param {object} [config={}]
 * @param {number} [config.seed=1] - Deterministic random seed
 * @param {number} [config.segments=20] - Number of puff particles to generate
 * @param {[number, number, number]} [config.bounds=[3, 1, 1]] - 3D bounding dimensions [x, y, z]
 * @param {[number, number, number]} [config.center=[0, 0, 0]] - 3D cluster center [cx, cy, cz]
 * @returns {Array<{
 *   basePos: [number, number, number],
 *   pos: [number, number, number],
 *   disp: [number, number, number],
 *   vel: [number, number, number],
 *   scale: number,
 *   rotation: number
 * }>}
 */
function generateCloudClusterSegments(config = {}) {
  const {
    seed = 1,
    segments = 20,
    bounds = [3, 1, 1],
    center = [0, 0, 0]
  } = config;

  const bx = bounds[0] ?? 3;
  const by = bounds[1] ?? 1;
  const bz = bounds[2] ?? 1;

  const cx = center[0] ?? 0;
  const cy = center[1] ?? 0;
  const cz = center[2] ?? 0;

  const rng = pseudoRandom(seed);
  const list = [];

  for (let i = 0; i < segments; i++) {
    // Concentrate puffs towards the center using Box-Muller Gaussian transform
    const u1 = rng();
    const u2 = rng();
    const rad = Math.sqrt(-2.0 * Math.log(u1 || 0.0001));
    const theta = 2.0 * Math.PI * u2;

    // Scale polar Gaussian coordinates by bounding dimensions
    const rawRx = rad * Math.cos(theta) * 0.4 * bx;
    const rawRy = rad * Math.sin(theta) * 0.3 * by;
    const rawRz = (rng() - 0.5) * bz;

    // Clamp strictly within bounding box envelope
    const rx = Math.max(-bx, Math.min(bx, rawRx));
    const ry = Math.max(-by, Math.min(by, rawRy));
    const rz = Math.max(-bz, Math.min(bz, rawRz));

    const posX = cx + rx;
    const posY = cy + ry;
    const posZ = cz + rz;

    const scale = 1.2 + rng() * 0.8; // Scale between 1.2 and 2.0
    const rotation = rng() * Math.PI * 2; // Random initial rotation

    list.push({
      basePos: [posX, posY, posZ],
      pos: [posX, posY, posZ],
      disp: [0, 0, 0],
      vel: [0, 0, 0],
      scale,
      rotation
    });
  }

  return list;
}

module.exports = {
  generateCloudClusterSegments,
  default: {
    generateCloudClusterSegments
  }
};
