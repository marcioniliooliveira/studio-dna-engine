# Task 2 Brief: Projectile System with Ribbons & Dynamic Point Lights

**Files:**
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/three/projectileMath.js`
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/three/Projectiles.jsx`
- Test: `studio-dna-engine/test/projectiles.test.js`

**Interfaces:**
- Produces:
  - `calculateProjectileTrajectory(index: number, time: number): { position: [number, number, number], velocity: [number, number, number], color: string, intensity: number }`
  - Component `<Projectiles count={4} onUpdate={(states) => ...} />`

**Requirements:**
1. `projectileMath.js`:
   - Calculates 3D harmonic trajectories for $N$ projectiles weaving through 3D space.
   - For projectile `index` at `time`:
     - `i = index + 1`, `speed = 0.8 + i * 0.15`, `t = time * speed`
     - $X(t) = \sin(t \cdot 0.7 + i) \cdot (6.0 + i \cdot 0.8)$
     - $Y(t) = \cos(t \cdot 0.9 + i \cdot 1.5) \cdot (2.5 + i \cdot 0.4)$
     - $Z(t) = \sin(t \cdot 0.5 + i \cdot 2.0) \cdot (4.0 + i \cdot 0.5)$
   - Velocity $\vec{v} = (\vec{P}(t + \Delta t) - \vec{P}(t)) / \Delta t$ with $\Delta t = 0.01$.
   - Amber/gold/orange colors: `["#ff9d00", "#ffc400", "#ff6200", "#ffa64d"]`.
   - Intensity default: `2.5`.
2. `Projectiles.jsx`:
   - React Three Fiber component rendering glowing orb meshes and dynamic `pointLight` elements for each projectile.
   - In `useFrame`, calculates current states for each projectile, updates mesh/light positions, and invokes `onUpdate(states)`.
3. Unit Tests in `studio-dna-engine/test/projectiles.test.js`:
   - Tests `calculateProjectileTrajectory` for valid 3D position vectors, non-zero velocity vectors, color assignment, and deterministic evolution over time.
   - Test command: `node --test studio-dna-engine/test/projectiles.test.js`.
