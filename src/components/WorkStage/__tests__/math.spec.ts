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
  computeDynamicDepth,
  wrapRibbonPosition,
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

  it('computeDynamicDepth escala a amplitude da onda S de profundidade proporcionalmente a (1 + 1.1 * V)', () => {
    const baseDepth = 12.0;
    // Em repouso (V = 0), a profundidade é exatamente a base (12.0)
    expect(computeDynamicDepth(baseDepth, 0.0)).toBeCloseTo(12.0, 6);

    // No pico de velocidade (V = 1.0), a profundidade aumenta em +110% (12.0 * 2.1 = 25.2)
    expect(computeDynamicDepth(baseDepth, 1.0)).toBeCloseTo(25.2, 6);

    // Em velocidade intermediária (V = 0.5)
    expect(computeDynamicDepth(baseDepth, 0.5)).toBeCloseTo(18.6, 6);

    // Velocidades negativas utilizam valor absoluto
    expect(computeDynamicDepth(baseDepth, -0.8)).toBeCloseTo(baseDepth * (1.0 + 1.1 * 0.8), 6);

    // Saturação além de 1.0 não explode além de 25.2
    expect(computeDynamicDepth(baseDepth, 2.5)).toBeCloseTo(25.2, 6);
  });

  it('wrapRibbonPosition mapeia coordenadas para o intervalo simétrico [-64, +64) com continuidade periódica', () => {
    // Identidade no intervalo central
    expect(wrapRibbonPosition(0.0)).toBeCloseTo(0.0, 6);
    expect(wrapRibbonPosition(32.0)).toBeCloseTo(32.0, 6);
    expect(wrapRibbonPosition(-32.0)).toBeCloseTo(-32.0, 6);

    // Limites de transição periódica
    expect(wrapRibbonPosition(64.0)).toBeCloseTo(-64.0, 6);
    expect(wrapRibbonPosition(-64.0)).toBeCloseTo(-64.0, 6);
    expect(wrapRibbonPosition(63.999)).toBeCloseTo(63.999, 3);
    expect(wrapRibbonPosition(-63.999)).toBeCloseTo(-63.999, 3);

    // Deslocamentos positivos (wrapping para a esquerda)
    expect(wrapRibbonPosition(96.0)).toBeCloseTo(-32.0, 6);
    expect(wrapRibbonPosition(128.0)).toBeCloseTo(0.0, 6);
    expect(wrapRibbonPosition(160.0)).toBeCloseTo(32.0, 6);

    // Deslocamentos negativos (wrapping para a direita)
    expect(wrapRibbonPosition(-96.0)).toBeCloseTo(32.0, 6);
    expect(wrapRibbonPosition(-128.0)).toBeCloseTo(0.0, 6);
    expect(wrapRibbonPosition(-160.0)).toBeCloseTo(-32.0, 6);

    // Preservação exata do stride de 32.0 entre cards adjacentes
    const p3 = wrapRibbonPosition(48.0);
    const p0 = wrapRibbonPosition(-48.0);
    expect(wrapRibbonPosition(p3 + 32.0)).toBeCloseTo(p0, 6);
  });
});
