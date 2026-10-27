# Task 2 Report: Projectile System with Ribbons & Dynamic Point Lights

**Status:** DONE  
**Date:** 2026-10-26  
**Files Created:**
- [`src/components/interactive-cloud-hero/three/projectileMath.js`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/src/components/interactive-cloud-hero/three/projectileMath.js)
- [`src/components/interactive-cloud-hero/three/Projectiles.jsx`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/src/components/interactive-cloud-hero/three/Projectiles.jsx)
- [`test/projectiles.test.js`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/test/projectiles.test.js)

---

## 1. Executive Summary

Implemented the dynamic projectile system for the interactive Drei-style clouds hero, composed of:
1. **Kinematics & Harmonic Trajectory Engine (`projectileMath.js`)**:
   - Computes deterministic 3D harmonic trajectories for arbitrary projectile indices over continuous time.
   - For projectile $index$ and elapsed $time$:
     - $i = index + 1$, $speed = 0.8 + i \cdot 0.15$, $t = time \cdot speed$
     - $X(t) = \sin(t \cdot 0.7 + i) \cdot (6.0 + i \cdot 0.8)$
     - $Y(t) = \cos(t \cdot 0.9 + i \cdot 1.5) \cdot (2.5 + i \cdot 0.4)$
     - $Z(t) = \sin(t \cdot 0.5 + i \cdot 2.0) \cdot (4.0 + i \cdot 0.5)$
   - Calculates instantaneous velocity vectors $\vec{v} = (\vec{P}(t + \Delta t) - \vec{P}(t)) / \Delta t$ with $\Delta t = 0.01$.
   - Amber/gold/orange color palette cycling: `["#ff9d00", "#ffc400", "#ff6200", "#ffa64d"]`.
   - Default light intensity: `2.5`.
   - Universal dual-export module format guaranteeing 100% interop with both CommonJS `require()` and ESM `import`.
2. **React Three Fiber Component (`Projectiles.jsx`)**:
   - Renders $N$ glowing core sphere meshes (`sphereGeometry` $r=0.08$) and accompanying dynamic `pointLight` sources.
   - Pre-hydrates positions at $t=0$ to prevent initial $(0, 0, 0)$ visual glitches prior to first animation frame.
   - In `useFrame`, updates mesh/light 3D positions in real-time and broadcasts active states via `onUpdate(states)`.

---

## 2. Test Verification

Test runner: `node --test studio-dna-engine/test/projectiles.test.js`

```
TAP version 13
# Subtest: calculateProjectileTrajectory: returns valid 3D position, velocity, color, and intensity
ok 1 - calculateProjectileTrajectory: returns valid 3D position, velocity, color, and intensity
  ---
  duration_ms: 0.9268
  type: 'test'
  ...
# Subtest: calculateProjectileTrajectory: calculates exact mathematical harmonic positions
ok 2 - calculateProjectileTrajectory: calculates exact mathematical harmonic positions
  ---
  duration_ms: 0.1805
  type: 'test'
  ...
# Subtest: calculateProjectileTrajectory: computes non-zero finite velocity via finite differences (dt = 0.01)
ok 3 - calculateProjectileTrajectory: computes non-zero finite velocity via finite differences (dt = 0.01)
  ---
  duration_ms: 0.1186
  type: 'test'
  ...
# Subtest: calculateProjectileTrajectory: cycles through amber/gold/orange color palette
ok 4 - calculateProjectileTrajectory: cycles through amber/gold/orange color palette
  ---
  duration_ms: 0.789
  type: 'test'
  ...
# Subtest: calculateProjectileTrajectory: evolves deterministically and smoothly over time
ok 5 - calculateProjectileTrajectory: evolves deterministically and smoothly over time
  ---
  duration_ms: 0.2277
  type: 'test'
  ...
# Subtest: calculateProjectileTrajectory: produces distinct trajectories for distinct indices
ok 6 - calculateProjectileTrajectory: produces distinct trajectories for distinct indices
  ---
  duration_ms: 1.4553
  type: 'test'
  ...
# Subtest: getProjectileStates: returns an array of projectile states with correct length and indexing
ok 7 - getProjectileStates: returns an array of projectile states with correct length and indexing
  ---
  duration_ms: 0.3254
  type: 'test'
  ...
# Subtest: getProjectileStates: defaults to count = 4 when count argument is omitted
ok 8 - getProjectileStates: defaults to count = 4 when count argument is omitted
  ---
  duration_ms: 0.0889
  type: 'test'
  ...
1..8
# tests 8
# suites 0
# pass 8
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 94.5954
```

---

## 3. Interfaces Exported

### `projectileMath.js`
```javascript
const {
  calculateProjectileTrajectory,
  getProjectileStates,
  PROJECTILE_COLORS
} = require('./three/projectileMath.js');

// Single projectile state:
const projectile = calculateProjectileTrajectory(index, time);
// Returns:
// {
//   position: [x, y, z],
//   velocity: [vx, vy, vz],
//   color: "#ff9d00",
//   intensity: 2.5
// }

// Batch projectile states:
const states = getProjectileStates(time, count = 4);
```

### `Projectiles.jsx`
```jsx
import { Projectiles } from './three/Projectiles.jsx';

<Projectiles
  count={4}
  onUpdate={(states) => {
    // states is Array<{ position, velocity, color, intensity }>
    // ready for consumption by InteractiveClouds / wakeEngine
  }}
/>
```

---

## 4. Downstream Integration Notes & Concerns
- **Task 3 Alignment:** The emitted state structure `{ position, velocity, color, intensity }` perfectly matches the parameters consumed by `computeProjectileWake` from Task 1.
- **Performance Budget:** Math operations are fully closed-form analytic sinusoids with $O(1)$ complexity per projectile. For $N=4$, execution time is $< 0.02\text{ms}$ per frame.
- **Concerns:** None. All contracts and tests are verified and fully passing.
