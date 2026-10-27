# Task 1 Brief: Mathematical Wake & Elastic Relaxation Physics Engine

**Files:**
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/physics/wakeEngine.js`
- Test: `studio-dna-engine/test/wakeEngine.test.js`

**Interfaces:**
- Produces:
  - `computeProjectileWake(particlePos, projectilePos, projectileVelocity, config): { displacement: [number, number, number], illumination: number }`
  - `applySpringRelaxation(currentDisplacement, velocity, delta, stiffness, damping): { newDisplacement: [number, number, number], newVelocity: [number, number, number] }`

**Requirements:**
1. `computeProjectileWake`:
   - Config options (with defaults): `wakeRadius = 2.5`, `pushStrength = 0.4`, `swirlStrength = 0.25`, `lightIntensity = 1.0`.
   - Calculate distance between `particlePos` and `projectilePos`. If `dist > wakeRadius` or `dist < 0.0001`, return `{ displacement: [0, 0, 0], illumination: 0 }`.
   - Compute exponential falloff: `Math.exp(-dist * (3.0 / wakeRadius))`.
   - Compute normalized direction vector `[normX, normY, normZ]`.
   - Compute radial push (pressure wave): `[normX, normY, normZ] * pushStrength * falloff`.
   - Compute vortex swirl using cross product of projectile velocity and normalized direction vector:
     - `swirlFactor = (swirlStrength / (dist + 0.1)) * falloff`
     - `swirlX = (vy * normZ - vz * normY) * swirlFactor`
     - `swirlY = (vz * normX - vx * normZ) * swirlFactor`
     - `swirlZ = (vx * normY - vy * normX) * swirlFactor`
   - Total displacement: `[pushX + swirlX, pushY + swirlY, pushZ + swirlZ]`.
   - Volumetric illumination contribution: `(lightIntensity / (distSq + 0.15)) * falloff`.
2. `applySpringRelaxation`:
   - Inputs: `displacement`, `velocity`, `delta`, `stiffness = 12.0`, `damping = 3.5`.
   - In 3 axes: `springForce = -stiffness * displacement[i]`, `dampingForce = -damping * velocity[i]`.
   - Update `velocity[i] += accel * delta`, `displacement[i] += velocity[i] * delta`.
   - Return `{ newDisplacement, newVelocity }`.
3. Test suite in `studio-dna-engine/test/wakeEngine.test.js` using `node:test` and `node:assert/strict`. Run with `node --test studio-dna-engine/test/wakeEngine.test.js` and verify it passes.
