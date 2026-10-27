# Interactive Drei Clouds Hero with Dynamic Projectiles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive 3D Hero component combining Drei-style independent fluffy volumetric clouds with high-speed glowing projectiles that displace cloud puffs (wake/vortex) and cast dynamic volumetric light into the clouds, wrapped in the 21st.dev hero layout.

**Architecture:** A modular React Three Fiber (`@react-three/fiber`) and Three.js architecture comprising three isolated units:
1. `wakeEngine`: A pure mathematical vector physics engine computing 3D aerodynamic wake repulsion, vortex swirl, and elastic relaxation for cloud particles.
2. `Projectiles` + `InteractiveClouds`: 3D scene elements rendering independent fluffy cloud volumes (instanced billboards with Gaussian alpha puffs) reacting in real time to 3-5 high-speed glowing projectile orbits and point lights.
3. `InteractiveCloudHero`: The top-level responsive React Hero component integrating the WebGL Canvas with the exact 21st.dev design language (dark obsidian theme, golden/orange gradient headlines, trust badge pill, and glassmorphic CTAs).

**Tech Stack:** React, Three.js, `@react-three/fiber`, `@react-three/drei`, Tailwind CSS.

**Spec / References:**
- Drei Cloud: `https://drei.docs.pmnd.rs/staging/cloud#cloud`
- Drei Cloud Sandbox: `https://codesandbox.io/p/sandbox/mbfzf`
- Animated Shader Hero: `https://21st.dev/@ravikatiyar162/components/animated-shader-hero`

## Global Constraints

- Retain 100% of the visual identity of the 21st.dev hero: `#000000` background, warm amber/orange gradient titles (`from-orange-300 via-yellow-400 to-amber-300`), frosted glass badge (`bg-orange-500/10 border-orange-300/30`), and rounded-full action buttons.
- Clouds must be **independent 3D volumes** (separated clusters with distinct centers and bounds), eliminating the flat "continuous mesh" look.
- Cloud segments must use soft Gaussian/puff alpha maps rather than hard geometry.
- Physics must be elastic (spring-damper): cloud particles displaced by passing projectiles must smoothly relax back to their baseline positions.
- Performance floor: 60 FPS target via instanced mesh batching ($< 200$ total cloud segments across the scene).

---

### Task 1: Mathematical Wake & Elastic Relaxation Physics Engine

**Files:**
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/physics/wakeEngine.js`
- Test: `studio-dna-engine/test/wakeEngine.test.js`

**Interfaces:**
- Produces:
  - `computeProjectileWake(particlePos, projectilePos, projectileVelocity, config): { displacement: [number, number, number], illumination: number }`
  - `applySpringRelaxation(currentDisplacement, velocity, delta, stiffness, damping): { newDisplacement: [number, number, number], newVelocity: [number, number, number] }`

- [ ] **Step 1: Write the failing unit test**

```javascript
// studio-dna-engine/test/wakeEngine.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const { computeProjectileWake, applySpringRelaxation } = require('../src/components/interactive-cloud-hero/physics/wakeEngine.js');

test('computeProjectileWake calculates repulsion, vortex swirl and light falloff', () => {
  const particlePos = [0, 0, 0];
  const projectilePos = [0.1, 0, 0]; // very close
  const projectileVelocity = [1, 0, 0]; // moving along X

  const result = computeProjectileWake(particlePos, projectilePos, projectileVelocity, {
    wakeRadius: 2.0,
    pushStrength: 0.5,
    swirlStrength: 0.3
  });

  // Must displace away from projectile and compute positive illumination
  assert.ok(result.displacement[0] !== 0 || result.displacement[1] !== 0 || result.displacement[2] !== 0);
  assert.ok(result.illumination > 0);
});

test('applySpringRelaxation relaxes displaced particle back toward zero', () => {
  const displacement = [1.0, 0, 0];
  const velocity = [0, 0, 0];
  const delta = 0.016; // 60fps frame

  const { newDisplacement, newVelocity } = applySpringRelaxation(displacement, velocity, delta, 15.0, 4.0);

  // Displacement must decrease towards 0
  assert.ok(newDisplacement[0] < 1.0);
  assert.ok(newVelocity[0] < 0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test studio-dna-engine/test/wakeEngine.test.js`
Expected: FAIL with "Cannot find module '../src/components/interactive-cloud-hero/physics/wakeEngine.js'"

- [ ] **Step 3: Write minimal implementation**

```javascript
// studio-dna-engine/src/components/interactive-cloud-hero/physics/wakeEngine.js

/**
 * Calculates instantaneous wake displacement and light intensity from a projectile onto a cloud particle.
 */
function computeProjectileWake(particlePos, projectilePos, projectileVelocity, config = {}) {
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

  if (dist > wakeRadius || dist < 0.0001) {
    return { displacement: [0, 0, 0], illumination: 0 };
  }

  const falloff = Math.exp(-dist * (3.0 / wakeRadius));
  const normX = dx / dist;
  const normY = dy / dist;
  const normZ = dz / dist;

  // Repulsion / Pressure wave
  const push = pushStrength * falloff;
  const pushX = normX * push;
  const pushY = normY * push;
  const pushZ = normZ * push;

  // Vortex swirl (Cross product of velocity and relative position)
  const vx = projectileVelocity[0] || 0;
  const vy = projectileVelocity[1] || 0;
  const vz = projectileVelocity[2] || 0;
  const swirlFactor = (swirlStrength / (dist + 0.1)) * falloff;
  const swirlX = (vy * normZ - vz * normY) * swirlFactor;
  const swirlY = (vz * normX - vx * normZ) * swirlFactor;
  const swirlZ = (vx * normY - vy * normX) * swirlFactor;

  // Volumetric light contribution
  const illumination = (lightIntensity / (distSq + 0.15)) * falloff;

  return {
    displacement: [pushX + swirlX, pushY + swirlY, pushZ + swirlZ],
    illumination
  };
}

/**
 * Elastic spring-damper relaxation back to baseline position.
 */
function applySpringRelaxation(displacement, velocity, delta, stiffness = 12.0, damping = 3.5) {
  const newDisplacement = [0, 0, 0];
  const newVelocity = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    const springForce = -stiffness * displacement[i];
    const dampingForce = -damping * velocity[i];
    const accel = springForce + dampingForce;
    newVelocity[i] = velocity[i] + accel * delta;
    newDisplacement[i] = displacement[i] + newVelocity[i] * delta;
  }

  return { newDisplacement, newVelocity };
}

module.exports = {
  computeProjectileWake,
  applySpringRelaxation
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test studio-dna-engine/test/wakeEngine.test.js`
Expected: PASS with 2 passing tests.

---

### Task 2: Projectile System with Ribbons & Dynamic Point Lights

**Files:**
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/three/Projectiles.jsx`
- Test: `studio-dna-engine/test/projectiles.test.js`

**Interfaces:**
- Consumes: Three.js math and time ticks.
- Produces:
  - `getProjectileStates(time: number): Array<{ position: [number, number, number], velocity: [number, number, number], color: string, intensity: number }>`
  - React Component: `<Projectiles count={4} />`

- [ ] **Step 1: Write test for projectile trajectory calculation**

```javascript
// studio-dna-engine/test/projectiles.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateProjectileTrajectory } = require('../src/components/interactive-cloud-hero/three/projectileMath.js');

test('calculateProjectileTrajectory outputs periodic 3D positions and velocities', () => {
  const t0 = 0;
  const t1 = 0.1;
  const p0 = calculateProjectileTrajectory(0, t0);
  const p1 = calculateProjectileTrajectory(0, t1);

  assert.equal(p0.position.length, 3);
  assert.equal(p0.velocity.length, 3);
  assert.notDeepEqual(p0.position, p1.position);
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `node --test studio-dna-engine/test/projectiles.test.js`
Expected: FAIL with "Cannot find module"

- [ ] **Step 3: Implement trajectory math and Projectiles component**

Create `studio-dna-engine/src/components/interactive-cloud-hero/three/projectileMath.js`:
```javascript
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

  const colors = ["#ff9d00", "#ffc400", "#ff6200", "#ffa64d"];

  return {
    position: [x, y, z],
    velocity: [vx, vy, vz],
    color: colors[index % colors.length],
    intensity: 2.5
  };
}

module.exports = { calculateProjectileTrajectory };
```

Create `studio-dna-engine/src/components/interactive-cloud-hero/three/Projectiles.jsx`:
```jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { calculateProjectileTrajectory } from './projectileMath.js';

export function Projectiles({ count = 4, onUpdate }) {
  const groupRef = useRef();
  const lightsRef = useRef([]);
  const meshesRef = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const states = [];

    for (let i = 0; i < count; i++) {
      const state = calculateProjectileTrajectory(i, t);
      states.push(state);

      if (meshesRef.current[i]) {
        meshesRef.current[i].position.set(...state.position);
      }
      if (lightsRef.current[i]) {
        lightsRef.current[i].position.set(...state.position);
      }
    }

    if (onUpdate) onUpdate(states);
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => (
        <group key={i}>
          <mesh ref={(el) => (meshesRef.current[i] = el)}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <pointLight
            ref={(el) => (lightsRef.current[i] = el)}
            color="#ff9d00"
            intensity={3}
            distance={5}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
}
```

- [ ] **Step 4: Run test to verify pass**

Run: `node --test studio-dna-engine/test/projectiles.test.js`
Expected: PASS.

---

### Task 3: Interactive Clouds System with Drei-Style Volumetric Clusters

**Files:**
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/three/InteractiveClouds.jsx`
- Test: `studio-dna-engine/test/cloudsLayout.test.js`

**Interfaces:**
- Consumes: `wakeEngine.js`
- Produces: React component `<InteractiveClouds cloudsConfig={...} activeProjectiles={...} />`

- [ ] **Step 1: Write test for cloud clusters layout generator**

```javascript
// studio-dna-engine/test/cloudsLayout.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const { generateCloudClusterSegments } = require('../src/components/interactive-cloud-hero/three/cloudGenerator.js');

test('generateCloudClusterSegments distributes bounded puffs with density falloff', () => {
  const segments = generateCloudClusterSegments({
    seed: 42,
    segments: 25,
    bounds: [4, 1.5, 1.5],
    center: [-3, 1, -2]
  });

  assert.equal(segments.length, 25);
  // All points must lie within the bounding box
  segments.forEach(p => {
    assert.ok(Math.abs(p.pos[0] - (-3)) <= 4.0);
    assert.ok(Math.abs(p.pos[1] - 1) <= 2.0);
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `node --test studio-dna-engine/test/cloudsLayout.test.js`
Expected: FAIL.

- [ ] **Step 3: Implement cloud puff generator and interactive instanced mesh**

Create `studio-dna-engine/src/components/interactive-cloud-hero/three/cloudGenerator.js`:
```javascript
function pseudoRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateCloudClusterSegments({ seed = 1, segments = 20, bounds = [3, 1, 1], center = [0, 0, 0] }) {
  const rng = pseudoRandom(seed);
  const list = [];

  for (let i = 0; i < segments; i++) {
    // Concentrate puffs towards the center (Gaussian distribution)
    const u1 = rng();
    const u2 = rng();
    const rad = Math.sqrt(-2.0 * Math.log(u1 || 0.0001));
    const theta = 2.0 * Math.PI * u2;

    const rx = (rad * Math.cos(theta) * 0.4) * bounds[0];
    const ry = (rad * Math.sin(theta) * 0.3) * bounds[1];
    const rz = (rng() - 0.5) * bounds[2];

    list.push({
      basePos: [center[0] + rx, center[1] + ry, center[2] + rz],
      pos: [center[0] + rx, center[1] + ry, center[2] + rz],
      disp: [0, 0, 0],
      vel: [0, 0, 0],
      scale: 1.2 + rng() * 0.8,
      rotation: rng() * Math.PI * 2
    });
  }
  return list;
}

module.exports = { generateCloudClusterSegments };
```

Create `studio-dna-engine/src/components/interactive-cloud-hero/three/InteractiveClouds.jsx`:
```jsx
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateCloudClusterSegments } from './cloudGenerator.js';
import { computeProjectileWake, applySpringRelaxation } from '../physics/wakeEngine.js';

export function InteractiveClouds({ clusters, projectilesRef }) {
  const instancedMeshRef = useRef();

  // Aggregate all puffs across all independent cloud clusters
  const allPuffs = useMemo(() => {
    let puffs = [];
    clusters.forEach((cfg) => {
      const clusterPuffs = generateCloudClusterSegments(cfg);
      puffs = puffs.concat(clusterPuffs);
    });
    return puffs;
  }, [clusters]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Update cloud puff positions and response in real-time
  useFrame((_, delta) => {
    if (!instancedMeshRef.current) return;
    const projectiles = projectilesRef?.current || [];

    allPuffs.forEach((puff, idx) => {
      let totalWakeX = 0, totalWakeY = 0, totalWakeZ = 0;

      // React to each active projectile
      projectiles.forEach((proj) => {
        const currentWorldPos = [
          puff.basePos[0] + puff.disp[0],
          puff.basePos[1] + puff.disp[1],
          puff.basePos[2] + puff.disp[2]
        ];
        const wake = computeProjectileWake(currentWorldPos, proj.position, proj.velocity, {
          wakeRadius: 2.2,
          pushStrength: 0.35,
          swirlStrength: 0.2
        });
        totalWakeX += wake.displacement[0];
        totalWakeY += wake.displacement[1];
        totalWakeZ += wake.displacement[2];
      });

      // Integrate wake impulse into velocity
      puff.vel[0] += totalWakeX * 0.8;
      puff.vel[1] += totalWakeY * 0.8;
      puff.vel[2] += totalWakeZ * 0.8;

      // Elastic spring relaxation back to initial baseline
      const { newDisplacement, newVelocity } = applySpringRelaxation(
        puff.disp,
        puff.vel,
        Math.min(delta, 0.05),
        10.0,
        3.2
      );
      puff.disp = newDisplacement;
      puff.vel = newVelocity;

      // Update instance matrix
      dummy.position.set(
        puff.basePos[0] + puff.disp[0],
        puff.basePos[1] + puff.disp[1],
        puff.basePos[2] + puff.disp[2]
      );
      dummy.scale.setScalar(puff.scale);
      dummy.rotation.z = puff.rotation;
      dummy.updateMatrix();

      instancedMeshRef.current.setMatrixAt(idx, dummy.matrix);
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[null, null, allPuffs.length]}
    >
      <planeGeometry args={[2, 2]} />
      <meshLambertMaterial
        color="#e08e2d"
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </instancedMesh>
  );
}
```

- [ ] **Step 4: Run test to verify pass**

Run: `node --test studio-dna-engine/test/cloudsLayout.test.js`
Expected: PASS.

---

### Task 4: Complete Interactive Cloud Hero Assembly (Canvas + UI Overlay)

**Files:**
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/InteractiveCloudHero.jsx`
- Create: `studio-dna-engine/src/components/interactive-cloud-hero/index.js`
- Create: `studio-dna-engine/copias/21st-dev/interactive-cloud-hero/dna.json`

**Interfaces:**
- Produces: Exportable React Hero component matching the exact API of `AnimatedShaderHero`.

- [ ] **Step 1: Write Hero component combining R3F Canvas and 21st.dev Tailwind UI**

```jsx
// studio-dna-engine/src/components/interactive-cloud-hero/InteractiveCloudHero.jsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { InteractiveClouds } from './three/InteractiveClouds.jsx';
import { Projectiles } from './three/Projectiles.jsx';

// 5 Independent 3D Cloud Clusters (replacing the continuous 2D mesh)
const DEFAULT_CLUSTERS = [
  { seed: 101, segments: 24, bounds: [5, 2, 2], center: [-4.5, 1.2, -3] },
  { seed: 202, segments: 20, bounds: [4, 1.5, 1.5], center: [4.0, 1.8, -4] },
  { seed: 303, segments: 28, bounds: [6, 2.5, 2], center: [0, -1.5, -2] },
  { seed: 404, segments: 18, bounds: [3.5, 1.5, 1.5], center: [-3.5, -2.0, -1] },
  { seed: 505, segments: 22, bounds: [4.5, 2, 2], center: [4.5, -1.0, -2.5] }
];

export function InteractiveCloudHero({
  trustBadge = { text: "Trusted by forward-thinking teams.", icons: ["✨"] },
  headline = { line1: "Launch Your", line2: "Workflow Into Orbit" },
  subtitle = "Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless.",
  buttons = {
    primary: { text: "Get Started for Free" },
    secondary: { text: "Explore Features" }
  },
  className = ""
}) {
  const [mounted, setMounted] = useState(false);
  const projectilesRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      {/* 3D WebGL Canvas Layer */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} color="#ffd199" />
            
            {/* Independent Volumetric Clouds */}
            <InteractiveClouds
              clusters={DEFAULT_CLUSTERS}
              projectilesRef={projectilesRef}
            />

            {/* Glowing Projectiles with Wake Output */}
            <Projectiles
              count={4}
              onUpdate={(states) => {
                projectilesRef.current = states;
              }}
            />
          </Canvas>
        </div>
      )}

      {/* UI Content Layer (100% Preserved from Reference) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4 pointer-events-auto">
        {trustBadge && (
          <div className="mb-8">
            <div className="flex items-center gap-2 px-6 py-3 bg-orange-500/10 backdrop-blur-md border border-orange-300/30 rounded-full text-sm">
              {trustBadge.icons && (
                <div className="flex">
                  {trustBadge.icons.map((icon, i) => (
                    <span key={i} className="text-amber-300">{icon}</span>
                  ))}
                </div>
              )}
              <span className="text-orange-100">{trustBadge.text}</span>
            </div>
          </div>
        )}

        <div className="text-center space-y-6 max-w-5xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
              {headline.line1}
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
              {headline.line2}
            </h1>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl text-orange-100/90 font-light leading-relaxed">
              {subtitle}
            </p>
          </div>

          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              {buttons.primary && (
                <button
                  onClick={buttons.primary.onClick}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
                >
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button
                  onClick={buttons.secondary.onClick}
                  className="px-8 py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create dna.json metadata entry**

Create `studio-dna-engine/copias/21st-dev/interactive-cloud-hero/dna.json`:
```json
{
  "name": "interactive-cloud-hero",
  "category": "hero",
  "author": "ravikatiyar162-enhanced",
  "framework": "react-three-fiber",
  "tags": ["hero", "threejs", "clouds", "projectiles", "interactive", "webgl"],
  "description": "Interactive Drei Clouds Hero with Dynamic Projectile Wake & Volumetric Lighting."
}
```

---

### Task 5: End-to-End Browser Verification & Performance Audit

**Files:**
- Create: `studio-dna-engine/test/interactive-cloud-hero.html`

- [ ] **Step 1: Create standalone Three.js test preview runner**
Write an HTML runner including Three.js, OrbitControls, the wake engine, and the 5 cloud clusters to verify visual fidelity, 60 FPS performance, and physical wake deflection without errors.

- [ ] **Step 2: Run verification in browser via Chrome DevTools / Playwright**
Check console logs for WebGL shader compilation issues or memory leaks.

- [ ] **Step 3: Verification gate**
Confirm cloud puffs disperse smoothly on projectile passage, return to baseline, and maintain high visual clarity.
