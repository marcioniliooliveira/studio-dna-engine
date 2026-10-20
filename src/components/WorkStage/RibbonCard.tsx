import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { ProjectSlot, RIBBON_STRIDE } from './referenceData';
import { computeDynamicDepth, wrapRibbonPosition } from './math';
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

  // Tipografia 3D Integrada no Mesh WebGL (Estilo Jesper Landberg Llama Engine)
  const compositeTexture = React.useMemo(() => {
    if (typeof document === 'undefined') return texture;
    const canvas = document.createElement('canvas');
    canvas.width = 1440;
    canvas.height = 810;
    const ctx = canvas.getContext('2d');
    if (!ctx) return texture;

    const compTex = new THREE.CanvasTexture(canvas);
    compTex.colorSpace = THREE.SRGBColorSpace;

    const renderComposite = (sourceImg: HTMLImageElement | ImageBitmap | HTMLCanvasElement) => {
      ctx.clearRect(0, 0, 1440, 810);
      ctx.drawImage(sourceImg, 0, 0, 1440, 810);

      // 1. Degradê de sombra (scrim) elegante no rodapé para legibilidade máxima
      // 1. Degradê de sombra (scrim) cinematográfico no terço inferior
      const scrim = ctx.createLinearGradient(0, 360, 0, 810);
      scrim.addColorStop(0, 'rgba(0, 0, 0, 0)');
      scrim.addColorStop(0.35, 'rgba(0, 0, 0, 0.45)');
      scrim.addColorStop(1, 'rgba(0, 0, 0, 0.92)');
      ctx.fillStyle = scrim;
      ctx.fillRect(0, 360, 1440, 450);

      const padX = 88;
      const padBottom = 80;

      // 2. Metadados do Projeto (Ano & Categoria)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
      ctx.font = '600 22px system-ui, -apple-system, sans-serif';
      ctx.fillText(`0${project.index + 1} / ${project.year}  •  ${project.category.toUpperCase()}`, padX, 810 - padBottom - 64);

      // 3. Título Principal em destaque monumental (PP Editorial Old / Serif)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 66px "PP Editorial Old", "Times New Roman", Georgia, serif';
      ctx.fillText(project.shortName.toUpperCase(), padX, 810 - padBottom);

      // 4. Badge minimalista superior
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.font = '500 18px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('SELECTED WORK', 1440 - padX, 76);
      ctx.textAlign = 'left';

      compTex.needsUpdate = true;
    };

    if (texture.image && (texture.image.complete || (texture.image as any).width > 0)) {
      renderComposite(texture.image as any);
    } else {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = project.thumbnail;
      img.onload = () => {
        renderComposite(img);
      };
    }

    return compTex;
  }, [texture, project]);

  // Animação de entrada/saída do modo detalhe (Card-to-Sheet)
  useEffect(() => {
    if (!matRef.current || !meshRef.current) return;

    if (isDetailOpen) {
      gsap.to(meshRef.current.position, {
        x: 0,
        y: 0,
        z: 22,
        duration: 0.85,
        ease: 'expo.out',
      });
      gsap.to(matRef.current, {
        u_sheetP: 0.0,
        u_shade: 0.0,
        u_scrim: 0.0,
        duration: 0.85,
        ease: 'expo.out',
      });
      // Snap da lavagem branca (1.08 * d) antecipando sutilmente a parada mecânica
      gsap.to(matRef.current, {
        u_white: 1.0,
        duration: 0.78,
        ease: 'expo.out',
      });
    } else {
      const w = typeof window !== 'undefined' ? (window as any) : null;
      const ws = w?.__WORK_STAGE__;
      const currentOffset = ws?.ribbonOffset ?? 0;
      const targetWrappedX = wrapRibbonPosition((project.index - 1.5) * RIBBON_STRIDE + currentOffset);
      gsap.to(meshRef.current.position, {
        x: targetWrappedX,
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
            duration: 0.45,
            ease: 'expo.out',
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
      const w = typeof window !== 'undefined' ? (window as any) : null;
      const ws = w?.__WORK_STAGE__;
      const currentOffset = ws?.ribbonOffset ?? 0;
      const currentVel = ws?.scrollVelocity ?? scrollVelocity;
      const xRaw = (project.index - 1.5) * RIBBON_STRIDE + currentOffset;
      meshRef.current.position.x = wrapRibbonPosition(xRaw);
      meshRef.current.position.y = worldY;
      matRef.current.u_sheetV = currentVel;
      matRef.current.u_sheetW = 34.0;
      matRef.current.u_sheetD = computeDynamicDepth(12.0, currentVel);
    }

    if (compositeTexture) {
      matRef.current.u_texture = compositeTexture;
    } else if (texture) {
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
          u_sheetD: matRef.current.u_sheetD,
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
