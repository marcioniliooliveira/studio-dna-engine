import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateCloudClusterSegments } from './cloudGenerator.js';
import { computeProjectileWake, applySpringRelaxation } from '../physics/wakeEngine.js';

/**
 * InteractiveClouds Component
 *
 * Renders independent volumetric cloud clusters using an optimized single
 * instanced draw call (InstancedMesh). Cloud puffs dynamically displace and
 * swirl when energized projectiles fly past, smoothly relaxing back to
 * equilibrium via damped harmonic spring physics.
 *
 * @param {object} props
 * @param {Array<object>} [props.clusters] - Configuration array for independent cloud clusters
 * @param {Array<object>} [props.cloudsConfig] - Alias for clusters configuration
 * @param {React.MutableRefObject<Array<object>>} [props.projectilesRef] - Ref carrying active projectile states
 * @param {Array<object>|React.MutableRefObject<Array<object>>} [props.activeProjectiles] - Fallback projectile state source
 */
export function InteractiveClouds({
  clusters,
  cloudsConfig,
  projectilesRef,
  activeProjectiles
}) {
  const instancedMeshRef = useRef();

  // Aggregate all puff particles across all independent cloud clusters
  const allPuffs = useMemo(() => {
    const clusterList = clusters || cloudsConfig || [];
    let puffs = [];

    clusterList.forEach((cfg) => {
      const clusterPuffs = generateCloudClusterSegments(cfg);
      // Deep-clone coordinates to preserve independent per-instance state
      clusterPuffs.forEach((p) => {
        puffs.push({
          basePos: [...p.basePos],
          pos: [...p.pos],
          disp: [0, 0, 0],
          vel: [0, 0, 0],
          scale: p.scale,
          rotation: p.rotation
        });
      });
    });

    return puffs;
  }, [clusters, cloudsConfig]);

  // Object3D reusable transform scratchpad
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Procedural soft circular puff alpha texture
  const cloudTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.25)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Initialize instance matrices on mount or when puff count changes
  useEffect(() => {
    if (!instancedMeshRef.current || allPuffs.length === 0) return;

    for (let idx = 0; idx < allPuffs.length; idx++) {
      const puff = allPuffs[idx];
      dummy.position.set(puff.basePos[0], puff.basePos[1], puff.basePos[2]);
      dummy.scale.setScalar(puff.scale);
      dummy.rotation.z = puff.rotation;
      dummy.updateMatrix();

      instancedMeshRef.current.setMatrixAt(idx, dummy.matrix);
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [allPuffs, dummy]);

  // Real-time aerodynamic wake and spring-damper physics loop
  useFrame((_, delta) => {
    if (!instancedMeshRef.current || allPuffs.length === 0) return;

    const projectiles =
      projectilesRef?.current ||
      (Array.isArray(activeProjectiles) ? activeProjectiles : activeProjectiles?.current) ||
      [];

    const dt = Math.min(delta, 0.05);

    for (let idx = 0; idx < allPuffs.length; idx++) {
      const puff = allPuffs[idx];
      let totalWakeX = 0;
      let totalWakeY = 0;
      let totalWakeZ = 0;

      const currentWorldPos = [
        puff.basePos[0] + puff.disp[0],
        puff.basePos[1] + puff.disp[1],
        puff.basePos[2] + puff.disp[2]
      ];

      // Accumulate wake impulse from each active projectile
      if (projectiles.length > 0) {
        for (let pIdx = 0; pIdx < projectiles.length; pIdx++) {
          const proj = projectiles[pIdx];
          if (!proj || !proj.position) continue;

          const wake = computeProjectileWake(
            currentWorldPos,
            proj.position,
            proj.velocity || [0, 0, 0],
            {
              wakeRadius: 2.2,
              pushStrength: 0.35,
              swirlStrength: 0.2
            }
          );

          totalWakeX += wake.displacement[0];
          totalWakeY += wake.displacement[1];
          totalWakeZ += wake.displacement[2];
        }
      }

      // Integrate wake impulse into velocity
      puff.vel[0] += totalWakeX * 0.8;
      puff.vel[1] += totalWakeY * 0.8;
      puff.vel[2] += totalWakeZ * 0.8;

      // Relax back toward baseline via damped harmonic spring physics
      const { newDisplacement, newVelocity } = applySpringRelaxation(
        puff.disp,
        puff.vel,
        dt,
        10.0,
        3.2
      );
      puff.disp = newDisplacement;
      puff.vel = newVelocity;

      // Update instanced transform matrix
      dummy.position.set(
        puff.basePos[0] + puff.disp[0],
        puff.basePos[1] + puff.disp[1],
        puff.basePos[2] + puff.disp[2]
      );
      dummy.scale.setScalar(puff.scale);
      dummy.rotation.z = puff.rotation;
      dummy.updateMatrix();

      instancedMeshRef.current.setMatrixAt(idx, dummy.matrix);
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (allPuffs.length === 0) {
    return null;
  }

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[null, null, allPuffs.length]}
    >
      <planeGeometry args={[2, 2]} />
      <meshLambertMaterial
        color="#e08e2d"
        map={cloudTexture || undefined}
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </instancedMesh>
  );
}

export default InteractiveClouds;
