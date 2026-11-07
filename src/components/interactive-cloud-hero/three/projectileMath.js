/**
 * Projectile Trajectory & Harmonic Kinematics Math
 *
 * Computes 3D harmonic trajectories and instantaneous velocity vectors
 * for energetic glowing projectiles weaving dynamically through cloud volumes.
 */

const PROJECTILE_COLORS = ["#ff9d00", "#ffc400", "#ff6200", "#ffa64d"];

/**
 * Calculates the 3D position, velocity, color, and intensity for a projectile at a given time.
 *
 * @param {number} index - Index of the projectile (0-based)
 * @param {number} time - Elapsed time in seconds
 * @returns {{
 *   position: [number, number, number],
 *   velocity: [number, number, number],
 *   color: string,
 *   intensity: number
 * }}
 */
function calculateProjectileTrajectory(index, time) {
  const i = index + 1;
  const speed = 0.8 + i * 0.15;
  const t = time * speed;

  const x = Math.sin(t * 0.7 + i) * (6.0 + i * 0.8);
  const y = Math.cos(t * 0.9 + i * 1.5) * (2.5 + i * 0.4);
  const z = Math.sin(t * 0.5 + i * 2.0) * (4.0 + i * 0.5);

  const dt = 0.01;
  const tNext = t + dt;
  const nextX = Math.sin(tNext * 0.7 + i) * (6.0 + i * 0.8);
  const nextY = Math.cos(tNext * 0.9 + i * 1.5) * (2.5 + i * 0.4);
  const nextZ = Math.sin(tNext * 0.5 + i * 2.0) * (4.0 + i * 0.5);

  const vx = (nextX - x) / dt;
  const vy = (nextY - y) / dt;
  const vz = (nextZ - z) / dt;

  const colorIndex = ((index % PROJECTILE_COLORS.length) + PROJECTILE_COLORS.length) % PROJECTILE_COLORS.length;
  const color = PROJECTILE_COLORS[colorIndex];

  return {
    position: [x, y, z],
    velocity: [vx, vy, vz],
    color,
    intensity: 2.5
  };
}

/**
 * Generates an array of projectile states at a specific timestamp.
 *
 * @param {number} time - Elapsed time in seconds
 * @param {number} [count=4] - Total number of projectiles
 * @returns {Array<{
 *   position: [number, number, number],
 *   velocity: [number, number, number],
 *   color: string,
 *   intensity: number
 * }>}
 */
function getProjectileStates(time, count = 4) {
  const states = [];
  for (let idx = 0; idx < count; idx++) {
    states.push(calculateProjectileTrajectory(idx, time));
  }
  return states;
}

module.exports = {
  calculateProjectileTrajectory,
  getProjectileStates,
  PROJECTILE_COLORS,
  default: {
    calculateProjectileTrajectory,
    getProjectileStates,
    PROJECTILE_COLORS
  }
};
