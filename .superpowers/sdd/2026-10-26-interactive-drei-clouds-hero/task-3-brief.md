# Task 3 Brief: Interactive Clouds System with Drei-Style Volumetric Clusters

**Files:**
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/three/cloudGenerator.js`
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/three/InteractiveClouds.jsx`
- Test: `studio-dna-engine/test/cloudsLayout.test.js`

**Interfaces:**
- Consumes:
  - `computeProjectileWake`, `applySpringRelaxation` from `../physics/wakeEngine.js`
  - `projectilesRef` carrying `[{ position, velocity, color, intensity }]`
- Produces:
  - `generateCloudClusterSegments(config)`: generates an array of particle segments distributed within 3D bounding box using Gaussian concentration.
  - Component `<InteractiveClouds clusters={clusters} projectilesRef={projectilesRef} />`

**Requirements:**
1. `cloudGenerator.js`:
   - `generateCloudClusterSegments({ seed = 1, segments = 20, bounds = [3, 1, 1], center = [0, 0, 0] })`:
     - Deterministic pseudo-random generator seeded by `seed`.
     - Uses Box-Muller transform to concentrate puffs towards the center (`rad = Math.sqrt(-2.0 * Math.log(u1 || 0.0001))`, `theta = 2.0 * Math.PI * u2`).
     - Scale puffs between 1.2 and 2.0, with random initial rotation.
     - Each puff object must have: `basePos: [x, y, z]`, `pos: [x, y, z]`, `disp: [0, 0, 0]`, `vel: [0, 0, 0]`, `scale: number`, `rotation: number`.
2. `InteractiveClouds.jsx`:
   - React Three Fiber component using `<instancedMesh>`.
   - Aggregates all puffs across all clusters into one efficient instanced draw call.
   - In `useFrame`, loops over all puffs:
     - For each active projectile in `projectilesRef.current`, computes wake displacement via `computeProjectileWake`.
     - Integrates wake impulse into puff velocity.
     - Relaxes displacement back to zero via `applySpringRelaxation`.
     - Updates dummy object position `basePos + disp`, scale, rotation, and updates `instancedMesh.setMatrixAt(idx, dummy.matrix)`.
     - Sets `instancedMesh.instanceMatrix.needsUpdate = true`.
   - Material: `meshLambertMaterial` with transparent, depthWrite: false, opacity 0.65, warm cloud color `#e08e2d` or custom cloud puff alpha map.
3. Unit tests in `studio-dna-engine/test/cloudsLayout.test.js`:
   - Tests `generateCloudClusterSegments`:
     - Correct number of segments.
     - Bounded within bounds around center.
     - Deterministic reproducibility given the same seed.
     - Different clusters produce different distributions.
   - Test command: `node --test studio-dna-engine/test/cloudsLayout.test.js`.
