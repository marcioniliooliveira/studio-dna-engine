import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import './FloorGridMaterial';

export interface FloorGridProps {
  alpha?: number;
  uSheetP?: number;
}

export const FloorGrid: React.FC<FloorGridProps> = ({ alpha = 1.0, uSheetP = 1.0 }) => {
  const matRef = useRef<any>(null!);

  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.u_alpha = alpha;
    matRef.current.u_leanK = uSheetP;
  });

  return (
    <mesh position={[0, -5.2, -12]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[120, 60, 1, 1]} />
      <floorGridMaterial
        ref={matRef}
        transparent
        depthTest={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
