import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { ProjectSlot } from './referenceData';
import './RibbonCardMaterial';

export interface RibbonCardProps {
  project: ProjectSlot;
  worldX: number;
  worldY: number;
  planeSize: [number, number];
  scrollVelocity: number;
  uSheetP?: number;
  uHover?: number;
  uWhite?: number;
  uShade?: number;
  isDetailOpen?: boolean;
  isHidden?: boolean;
  onSelect?: (index: number) => void;
}

export const RibbonCard: React.FC<RibbonCardProps> = ({
  project,
  worldX,
  worldY,
  planeSize,
  scrollVelocity,
  isDetailOpen = false,
  isHidden = false,
  onSelect,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<any>(null!);
  const texture = useTexture(project.thumbnail);

  // Animação de entrada/saída do modo detalhe (Card-to-Sheet)
  useEffect(() => {
    if (!matRef.current || !meshRef.current) return;

    if (isDetailOpen) {
      gsap.to(meshRef.current.position, {
        x: 0,
        y: 0,
        z: 14,
        duration: 0.85,
        ease: 'power3.out',
      });
      gsap.to(matRef.current, {
        u_sheetP: 0.0,
        u_white: 1.0,
        u_shade: 0.0,
        u_scrim: 0.0,
        duration: 0.85,
        ease: 'power3.out',
      });
    } else {
      gsap.to(meshRef.current.position, {
        x: worldX,
        y: worldY,
        z: 0,
        duration: 0.75,
        ease: 'power3.inOut',
      });
      gsap.to(matRef.current, {
        u_sheetP: 1.0,
        u_white: 0.0,
        u_shade: 1.0,
        u_scrim: 0.85,
        duration: 0.75,
        ease: 'power3.inOut',
      });
    }
  }, [isDetailOpen]);

  // Animação de ocultação de cards vizinhos quando um está em detalhe
  useEffect(() => {
    if (!matRef.current) return;
    gsap.to(matRef.current, {
      u_alpha: isHidden ? 0.0 : 1.0,
      duration: 0.45,
      ease: 'power2.out',
    });
  }, [isHidden]);

  // Escuta de eventos de hover disparados pelos proxies DOM
  useEffect(() => {
    const handleHoverEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number; hover: number }>;
      if (customEvent.detail && customEvent.detail.index === project.index) {
        if (matRef.current) {
          gsap.to(matRef.current, {
            u_hover: customEvent.detail.hover,
            duration: 0.35,
            ease: 'power2.out',
          });
        }
      }
    };

    window.addEventListener('work-card-hover', handleHoverEvent);
    return () => window.removeEventListener('work-card-hover', handleHoverEvent);
  }, [project.index]);

  // Atualização em cada frame e telemetria para Playwright/Storybook
  useFrame(() => {
    if (!meshRef.current || !matRef.current) return;

    if (!isDetailOpen) {
      meshRef.current.position.x = worldX;
      meshRef.current.position.y = worldY;
      matRef.current.u_sheetV = scrollVelocity;
    }

    if (texture) {
      matRef.current.u_texture = texture;
    }
    matRef.current.u_res.set(planeSize[0], planeSize[1]);
    matRef.current.u_size.set(project.aspectRatio[0], project.aspectRatio[1]);

    const w = window as any;
    if (w.__WORK_STAGE__) {
      if (!w.__WORK_STAGE__.cards) w.__WORK_STAGE__.cards = {};
      w.__WORK_STAGE__.cards[project.index] = {
        index: project.index,
        slug: project.slug,
        title: project.title,
        worldX: meshRef.current.position.x,
        uniforms: {
          u_sheetP: matRef.current.u_sheetP,
          u_hover: matRef.current.u_hover,
          u_white: matRef.current.u_white,
          u_shade: matRef.current.u_shade,
          u_scrim: matRef.current.u_scrim,
          u_sheetV: matRef.current.u_sheetV,
          u_alpha: matRef.current.u_alpha,
        },
      };
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[worldX, worldY, 0]}
      onClick={() => onSelect?.(project.index)}
    >
      <planeGeometry args={[planeSize[0], planeSize[1], 24, 24]} />
      <ribbonCardMaterial
        ref={matRef}
        transparent
        depthTest
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
