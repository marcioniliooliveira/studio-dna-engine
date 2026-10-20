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
    const w = typeof window !== 'undefined' ? (window as any) : null;
    const currentAlpha = (w && w.__WORK_STAGE__ && typeof w.__WORK_STAGE__.floorAlpha === 'number')
      ? w.__WORK_STAGE__.floorAlpha
      : alpha;
    matRef.current.u_alpha = currentAlpha;
    matRef.current.u_leanK = uSheetP;
  });

  return (
    <mesh position={[0, -10.5, -20]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[180, 100, 1, 1]} />
      <floorGridMaterial
        ref={matRef}
        transparent
        depthTest={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
