import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { calculateProjectileTrajectory, getProjectileStates } from './projectileMath.js';

/**
 * Projectiles Component for Interactive Cloud Hero
 *
 * Renders dynamic energetic glowing projectile orbs weaving through 3D space,
 * accompanied by dynamic point lights that cast volumetric illumination into
 * nearby cloud puffs.
 *
 * @param {object} props
 * @param {number} [props.count=4] - Number of concurrent projectiles
 * @param {(states: Array<{ position: [number, number, number], velocity: [number, number, number], color: string, intensity: number }>) => void} [props.onUpdate] - Callback invoked each frame with updated projectile states
 */
export function Projectiles({ count = 4, onUpdate }) {
  const groupRef = useRef();
  const meshesRef = useRef([]);
  const lightsRef = useRef([]);

  // Compute initial positions at t = 0 to avoid zero-origin glitch on first render
  const initialStates = getProjectileStates(0, count);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const states = [];

    for (let i = 0; i < count; i++) {
      const state = calculateProjectileTrajectory(i, t);
      states.push(state);

      const mesh = meshesRef.current[i];
      if (mesh) {
        mesh.position.set(state.position[0], state.position[1], state.position[2]);
      }

      const light = lightsRef.current[i];
      if (light) {
        light.position.set(state.position[0], state.position[1], state.position[2]);
      }
    }

    if (typeof onUpdate === 'function') {
      onUpdate(states);
    }
  });

  return (
    <group ref={groupRef}>
      {initialStates.map((state, i) => (
        <group key={i}>
          {/* Glowing projectile core */}
          <mesh
            ref={(el) => (meshesRef.current[i] = el)}
            position={state.position}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={state.color} />
          </mesh>

          {/* Dynamic volumetric point light */}
          <pointLight
            ref={(el) => (lightsRef.current[i] = el)}
            position={state.position}
            color={state.color}
            intensity={state.intensity || 2.5}
            distance={6}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
}

export default Projectiles;
