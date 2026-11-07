/**
 * Mathematical Wake & Elastic Relaxation Physics Engine
 * 
 * Computes aerodynamic projectile wake repulsion, vortex swirl,
 * volumetric point light contribution, and elastic spring-damper relaxation
 * for interactive cloud particles.
 */

/**
 * Calculates instantaneous wake displacement and illumination contribution from a projectile onto a cloud particle.
 *
 * @param {[number, number, number]} particlePos - Current position of the cloud puff [x, y, z]
 * @param {[number, number, number]} projectilePos - Current position of the projectile [x, y, z]
 * @param {[number, number, number]} projectileVelocity - Velocity vector of the projectile [vx, vy, vz]
 * @param {object} [config={}] - Configuration parameters
 * @param {number} [config.wakeRadius=2.5] - Maximum radius of influence for the wake
 * @param {number} [config.pushStrength=0.4] - Radial pressure wave strength
 * @param {number} [config.swirlStrength=0.25] - Vortex swirl cross-product strength
 * @param {number} [config.lightIntensity=1.0] - Volumetric lighting intensity multiplier
 * @returns {{ displacement: [number, number, number], illumination: number }}
 */
function computeProjectileWake(particlePos, projectilePos, projectileVelocity = [0, 0, 0], config = {}) {
  const {
    wakeRadius = 2.5,
    pushStrength = 0.4,
    swirlStrength = 0.25,
    lightIntensity = 1.0
  } = config;

  const dx = particlePos[0] - projectilePos[0];
  const dy = particlePos[1] - projectilePos[1];
  const dz = particlePos[2] - projectilePos[2];

  const distSq = dx * dx + dy * dy + dz * dz;
  const dist = Math.sqrt(distSq);

  // Beyond boundary or inside singularity threshold
  if (dist > wakeRadius || dist < 0.0001) {
    return { displacement: [0, 0, 0], illumination: 0 };
  }

  // Exponential falloff over distance
  const falloff = Math.exp(-dist * (3.0 / wakeRadius));
  const normX = dx / dist;
  const normY = dy / dist;
  const normZ = dz / dist;

  // Radial repulsion / pressure wave
  const push = pushStrength * falloff;
  const pushX = normX * push;
  const pushY = normY * push;
  const pushZ = normZ * push;

  // Vortex swirl (Cross product of velocity and relative position direction: v x n)
  const vx = projectileVelocity[0] || 0;
  const vy = projectileVelocity[1] || 0;
  const vz = projectileVelocity[2] || 0;
  const swirlFactor = (swirlStrength / (dist + 0.1)) * falloff;
  const swirlX = (vy * normZ - vz * normY) * swirlFactor;
  const swirlY = (vz * normX - vx * normZ) * swirlFactor;
  const swirlZ = (vx * normY - vy * normX) * swirlFactor;

  // Total displacement
  const totalDisplacement = [pushX + swirlX, pushY + swirlY, pushZ + swirlZ];

  // Volumetric illumination contribution
  const illumination = (lightIntensity / (distSq + 0.15)) * falloff;

  return {
    displacement: totalDisplacement,
    illumination
  };
}

/**
 * Applies damped harmonic spring relaxation back toward baseline position [0, 0, 0].
 *
 * @param {[number, number, number]} currentDisplacement - Current displacement offset [x, y, z]
 * @param {[number, number, number]} velocity - Current oscillation velocity [vx, vy, vz]
 * @param {number} delta - Frame delta time in seconds
 * @param {number} [stiffness=12.0] - Spring stiffness constant (Hooke's law k)
 * @param {number} [damping=3.5] - Damping coefficient (c)
 * @returns {{ newDisplacement: [number, number, number], newVelocity: [number, number, number] }}
 */
function applySpringRelaxation(
  currentDisplacement = [0, 0, 0],
  velocity = [0, 0, 0],
  delta,
  stiffness = 12.0,
  damping = 3.5
) {
  const newDisplacement = [0, 0, 0];
  const newVelocity = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    const disp = currentDisplacement[i] || 0;
    const vel = velocity[i] || 0;

    const springForce = -stiffness * disp;
    const dampingForce = -damping * vel;
    const accel = springForce + dampingForce;

    const nextVel = vel + accel * delta;
    const nextDisp = disp + nextVel * delta;

    newVelocity[i] = nextVel;
    newDisplacement[i] = nextDisp;
  }

  return {
    newDisplacement,
    newVelocity
  };
}

module.exports = {
  computeProjectileWake,
  applySpringRelaxation
};
