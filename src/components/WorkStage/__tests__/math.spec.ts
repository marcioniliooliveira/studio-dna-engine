import { describe, it, expect } from 'vitest';
import {
  sheetDome,
  leanSlope,
  leanRamp,
  evaluateSheetPoint,
  sheetShape,
  sheetShapeSlope,
  clamp,
  smoothstep,
  uvCover,
  roundedBox,
  sheetLit,
  SHEET_CONSTANTS,
} from '../math';

describe('Gate 1: Matemática Pura na CPU (CPU Twin of GLSL Shaders)', () => {
  it('sheetDome([0.5, 0.5]) === 1.0 e sheetDome nas 4 extremidades (0 ou 1) === 0.0', () => {
    // Centro do card tem elevação máxima
    expect(sheetDome([0.5, 0.5])).toBeCloseTo(1.0, 6);

    // As 4 extremidades do UV (cantos)
    expect(sheetDome([0.0, 0.0])).toBeCloseTo(0.0, 6);
    expect(sheetDome([1.0, 0.0])).toBeCloseTo(0.0, 6);
    expect(sheetDome([0.0, 1.0])).toBeCloseTo(0.0, 6);
    expect(sheetDome([1.0, 1.0])).toBeCloseTo(0.0, 6);

    // Bordas laterais também devem ser 0.0
    expect(sheetDome([0.0, 0.5])).toBeCloseTo(0.0, 6);
    expect(sheetDome([1.0, 0.5])).toBeCloseTo(0.0, 6);
    expect(sheetDome([0.5, 0.0])).toBeCloseTo(0.0, 6);
    expect(sheetDome([0.5, 1.0])).toBeCloseTo(0.0, 6);
  });

  it('leanSlope(1.0) === 0.0 e leanSlope(-1.0) === 0.0 (continuidade C^1 sem costura especular)', () => {
    // Continuidade da derivada nas bordas do frustum
    expect(leanSlope(1.0)).toBeCloseTo(0.0, 6);
    expect(leanSlope(-1.0)).toBeCloseTo(0.0, 6);

    // No centro, a inclinação é máxima (1.5)
    expect(leanSlope(0.0)).toBeCloseTo(1.5, 6);

    // Além do frustum, a inclinação é 0
    expect(leanSlope(1.5)).toBeCloseTo(0.0, 6);
    expect(leanSlope(-1.5)).toBeCloseTo(0.0, 6);
  });

  it('leanRamp é contínua e atinge ±1 nas extremidades', () => {
    expect(leanRamp(0.0)).toBeCloseTo(0.0, 6);
    expect(leanRamp(1.0)).toBeCloseTo(1.0, 6);
    expect(leanRamp(-1.0)).toBeCloseTo(-1.0, 6);
  });

  it('evaluateSheetPoint(p, { ...params, u_sheetP: 0, u_sheetV: 0.9 }) retorna exatamente p (planificação total no estado de detalhe)', () => {
    const testPoints: [number, number, number][] = [
      [0, 0, 0],
      [10, -5, 2],
      [-15, 8, -4],
      [22, 12, 1],
    ];

    for (const p of testPoints) {
      const result = evaluateSheetPoint(p, {
        u_sheetW: 22.0,
        u_sheetD: 3.2,
        u_sheetT: 0.9,
        u_sheetC: 1.0,
        u_sheetP: 0.0, // Modo detalhe: sem deformação de fita
        u_sheetV: 0.9, // Velocidade alta de scroll no momento do clique
      });

      expect(result[0]).toBeCloseTo(p[0], 6);
      expect(result[1]).toBeCloseTo(p[1], 6);
      expect(result[2]).toBeCloseTo(p[2], 6);
    }
  });

  it('uvCover calcula proporções e offsets preservando proporção de imagem', () => {
    const uvCenter = uvCover([16, 10], [1440, 810], [0.5, 0.5]);
    expect(uvCenter[0]).toBeCloseTo(0.5, 4);
    expect(uvCenter[1]).toBeCloseTo(0.5, 4);
  });

  it('roundedBox calcula distância com cantos arredondados', () => {
    const dCenter = roundedBox([8, 5], [8, 5], 1.0);
    expect(dCenter).toBeLessThan(0); // Ponto interno
  });

  it('sheetLit calcula iluminação difusa e especular sem quebrar vetor de cor', () => {
    const lit = sheetLit([0.5, 0.5, 0.5], [0, 0, 1], [0, 0, 1], 1.0);
    expect(lit[0]).toBeGreaterThan(0);
    expect(lit[1]).toBeGreaterThan(0);
    expect(lit[2]).toBeGreaterThan(0);
  });
});
