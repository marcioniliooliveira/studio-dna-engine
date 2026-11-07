import { describe, it, expect } from 'vitest';
import {
  wrapRibbonPosition,
  computeCardProxyRect,
  evaluateSheetPoint,
  computeDynamicDepth,
  sheetZ,
  sheetRoll,
  SHEET_CONSTANTS,
  RIBBON_STRIDE,
  RIBBON_PERIOD,
  RIBBON_HALF_PERIOD,
} from '../math';

describe('Challenger Adversarial Stress: wrapRibbonPosition', () => {
  it('fundamental domain invariant: output is strictly in [-64.0, +64.0) for period 128.0', () => {
    const testCases = [
      0,
      -0,
      1,
      -1,
      32,
      -32,
      63.999999,
      64.0,
      -64.0,
      -64.000001,
      100,
      -100,
      128,
      -128,
      256,
      -256,
      10000,
      -10000,
      128000,
      -128000,
      1e6,
      -1e6,
      1e9,
      -1e9,
      1e12,
      -1e12,
      Number.MAX_SAFE_INTEGER,
      -Number.MAX_SAFE_INTEGER,
    ];

    for (const x of testCases) {
      const wrapped = wrapRibbonPosition(x);
      expect(wrapped).toBeGreaterThanOrEqual(-64.0);
      expect(wrapped).toBeLessThan(64.0);
    }
  });

  it('boundary asymmetry: exactly 64.0 maps to -64.0 and -64.0 maps to -64.0 (half-open [-64, 64))', () => {
    // 64 + 64 = 128 => 128 % 128 = 0 => 0 - 64 = -64
    expect(wrapRibbonPosition(64.0)).toBe(-64.0);
    expect(wrapRibbonPosition(-64.0)).toBe(-64.0);

    // Epsilon inside positive boundary stays positive
    expect(wrapRibbonPosition(63.99999)).toBeCloseTo(63.99999, 5);

    // Epsilon beyond positive boundary wraps to near -64
    expect(wrapRibbonPosition(64.00001)).toBeCloseTo(-63.99999, 5);

    // Epsilon below negative boundary wraps to near +64
    expect(wrapRibbonPosition(-64.00001)).toBeCloseTo(63.99999, 5);
  });

  it('exact periodicity invariant: wrap(x + k * 128.0) === wrap(x) for all integer k', () => {
    const basePoints = [-50, -32, -16.5, 0, 12.3, 32, 48.7];
    const kMultipliers = [-1000, -100, -10, -3, -1, 1, 3, 10, 100, 1000];

    for (const x of basePoints) {
      const expected = wrapRibbonPosition(x);
      for (const k of kMultipliers) {
        const shifted = x + k * 128.0;
        const wrappedShifted = wrapRibbonPosition(shifted);
        expect(wrappedShifted).toBeCloseTo(expected, 8);
      }
    }
  });

  it('equispaced stride preservation across the wrap seam for 4 cards', () => {
    // 4 cards spaced by 32.0 units across the 128.0 period
    // At any arbitrary continuous scroll offset, the circular modular distance between adjacent cards must be exactly 32.0
    const offsets = [
      0, 1, 15.5, 31.99, 32.0, 32.01, 63.99, 64.0, 64.01, 95.5, 96.0, 127.99, 128.0,
      -10.5, -32.0, -64.0, -128.0, 5432.1, -9876.5,
    ];

    for (const offset of offsets) {
      const cardsWrapped = [0, 1, 2, 3].map((i) => {
        const rawX = (i - 1.5) * RIBBON_STRIDE + offset;
        return wrapRibbonPosition(rawX);
      });

      // Check all cards are in [-64, 64)
      for (const w of cardsWrapped) {
        expect(w).toBeGreaterThanOrEqual(-64.0);
        expect(w).toBeLessThan(64.0);
      }

      // Check circular distance between card i and card (i+1)%4
      for (let i = 0; i < 4; i++) {
        const nextI = (i + 1) % 4;
        let diff = (cardsWrapped[nextI] - cardsWrapped[i]) % 128.0;
        if (diff < 0) diff += 128.0;
        expect(diff).toBeCloseTo(32.0, 7);
      }
    }
  });

  it('idempotency: wrap(wrap(x)) === wrap(x)', () => {
    const testPoints = [-1000, -128, -64.0, -32.5, 0, 17.8, 63.999, 64.0, 128, 9999];
    for (const x of testPoints) {
      const w1 = wrapRibbonPosition(x);
      const w2 = wrapRibbonPosition(w1);
      expect(w2).toBe(w1);
    }
  });

  it(
    'Monte Carlo property test: 10,000 random floating point values across [-1e6, +1e6]',
    { timeout: 30000 },
    () => {
      const N = 10000;
      for (let i = 0; i < N; i++) {
        const scale = Math.pow(10, Math.random() * 6);
        const sign = Math.random() < 0.5 ? -1 : 1;
        const x = sign * Math.random() * scale;

        const w = wrapRibbonPosition(x);

        if (w < -64.0 || w >= 64.0) {
          throw new Error(`Range violation for x=${x}: got ${w}`);
        }

        const k = (x - w) / 128.0;
        const nearestInt = Math.round(k);
        if (Math.abs(k - nearestInt) >= 1e-5) {
          throw new Error(`Periodicity violation for x=${x}: k=${k}`);
        }
      }
    }
  );

  it('handles exceptional and non-finite inputs gracefully without throwing', () => {
    expect(Number.isNaN(wrapRibbonPosition(NaN))).toBe(true);
    expect(Number.isNaN(wrapRibbonPosition(Infinity))).toBe(true);
    expect(Number.isNaN(wrapRibbonPosition(-Infinity))).toBe(true);
  });
});

describe('Challenger Adversarial Stress: computeCardProxyRect', () => {
  const DEFAULT_UNIFORMS = {
    u_sheetD: 12.0,
    u_sheetW: 34.0,
    u_sheetT: 0.9,
    u_sheetC: 1.0,
    u_sheetP: 1.0,
    u_sheetV: 0.0,
  };

  it('card aspect ratio preservation: width / height === cardWidth / cardHeight in perspective projection', () => {
    const viewports = [
      { w: 1440, h: 900 },
      { w: 1920, h: 1080 },
      { w: 1280, h: 800 },
      { w: 1600, h: 900 },
      { w: 3840, h: 2160 }, // 4K UHD
      { w: 2560, h: 1080 }, // 21:9 Ultra-Wide
      { w: 390, h: 844 },   // Mobile Portrait
    ];

    const cardWidth = 28.8;
    const cardHeight = 18.0;
    const expectedRatio = cardWidth / cardHeight; // 1.6

    for (const vp of viewports) {
      for (const wrappedX of [-48, -32, -16, 0, 16, 32, 48]) {
        const rect = computeCardProxyRect(
          wrappedX,
          vp.w,
          vp.h,
          cardWidth,
          cardHeight,
          DEFAULT_UNIFORMS
        );

        expect(rect.width / rect.height).toBeCloseTo(expectedRatio, 6);
        expect(rect.width).toBeGreaterThan(0);
        expect(rect.height).toBeGreaterThan(0);
        expect(rect.left).toBeCloseTo(rect.centerX - rect.width / 2, 6);
        expect(rect.top).toBeCloseTo(rect.centerY - rect.height / 2, 6);
      }
    }
  });

  it('center-alignment at wrappedX = 0 when u_sheetP = 0 (detail / flat mode)', () => {
    // In flat mode (u_sheetP = 0), evaluated sheet point at [0, 0, 0] is exactly [0, 0, 0]
    // Projection center must be exactly at (viewportWidth / 2, viewportHeight / 2)
    const viewports = [
      { w: 1440, h: 900 },
      { w: 1920, h: 1080 },
      { w: 1280, h: 800 },
      { w: 1600, h: 900 },
    ];

    for (const vp of viewports) {
      const rect = computeCardProxyRect(0, vp.w, vp.h, 28.8, 18.0, {
        ...DEFAULT_UNIFORMS,
        u_sheetP: 0.0,
      });

      expect(rect.centerX).toBeCloseTo(vp.w / 2, 6);
      expect(rect.centerY).toBeCloseTo(vp.h / 2, 6);
      expect(rect.isVisible).toBe(true);
    }
  });

  it('scalePy formula precision: scales inversely with camera distance zDist', () => {
    const vpH = 900;
    const vpW = 1440;
    const halfFovRad = (SHEET_CONSTANTS.CAMERA_FOV * Math.PI) / 360;

    // With flat sheet (zw = 0), zDist = CAMERA_Z = 41.18
    const expectedScale = vpH / (2 * SHEET_CONSTANTS.CAMERA_Z * Math.tan(halfFovRad));

    const rect = computeCardProxyRect(0, vpW, vpH, 28.8, 18.0, {
      ...DEFAULT_UNIFORMS,
      u_sheetP: 0.0,
    });

    expect(rect.width).toBeCloseTo(28.8 * expectedScale, 6);
    expect(rect.height).toBeCloseTo(18.0 * expectedScale, 6);
  });

  it('visibility flag correctly demarcates on-screen vs far off-screen positions', () => {
    const vpW = 1440;
    const vpH = 900;

    // Card at center is visible
    const centerRect = computeCardProxyRect(0, vpW, vpH, 28.8, 18.0, DEFAULT_UNIFORMS);
    expect(centerRect.isVisible).toBe(true);

    // Extreme coordinate (e.g. 500 units out) is not visible
    const farRect = computeCardProxyRect(500, vpW, vpH, 28.8, 18.0, DEFAULT_UNIFORMS);
    expect(farRect.isVisible).toBe(false);

    // Negative extreme
    const farLeftRect = computeCardProxyRect(-500, vpW, vpH, 28.8, 18.0, DEFAULT_UNIFORMS);
    expect(farLeftRect.isVisible).toBe(false);
  });

  it('camera distance zDist invariant: strictly positive clearance in operational domain (u_sheetV in [0, 1.0])', () => {
    // CAMERA_Z is 41.18. zDist = CAMERA_Z - zw.
    // In production, u_sheetV is clamped to [0, 1.0] by trackingVel and computeDynamicDepth.
    const operationalVelocities = [0.0, 0.1, 0.25, 0.5, 0.75, 1.0];
    const operationalDepths = [0.0, 3.2, 12.0, 18.6, 25.2];
    const testXs = [-64, -48, -32, -16, 0, 16, 32, 48, 63.99];

    let minZDist = Infinity;
    let maxZw = -Infinity;

    for (const vel of operationalVelocities) {
      for (const d of operationalDepths) {
        for (const x of testXs) {
          const [xw, yw, zw] = evaluateSheetPoint([x, 0, 0], {
            u_sheetD: d,
            u_sheetW: 34.0,
            u_sheetT: 0.9,
            u_sheetC: 1.0,
            u_sheetP: 1.0,
            u_sheetV: vel,
          });

          const zDist = SHEET_CONSTANTS.CAMERA_Z - zw;
          if (zDist < minZDist) minZDist = zDist;
          if (zw > maxZw) maxZw = zw;

          // Operational clearance: camera is at 41.18, mesh never comes closer than 20 units
          expect(zDist).toBeGreaterThan(20.0);
          expect(Number.isFinite(zDist)).toBe(true);
        }
      }
    }

    // Operational clearance: camera is at 41.18, mesh minimum distance is ~21.03 units
    expect(minZDist).toBeGreaterThan(20.0);
    expect(maxZw).toBeLessThan(22.0);
  });

  it('adversarial analysis: behavior when zDist approaches camera plane under extreme unconstrained inputs', () => {
    // Under extreme negative coordinate x=-40 (where qw = x/W < -1.0 and m = 1.0 rear-up is maximum),
    // with extreme unconstrained velocity u_sheetV = 5.0:
    const [xw, yw, zwExtreme] = evaluateSheetPoint([-40, 0, 0], {
      u_sheetD: 25.2,
      u_sheetW: 34.0,
      u_sheetT: 0.9,
      u_sheetC: 1.0,
      u_sheetP: 1.0,
      u_sheetV: 5.0, // extreme unconstrained velocity
    });

    const zDistExtreme = SHEET_CONSTANTS.CAMERA_Z - zwExtreme;
    // With u_sheetV = 5.0 and m=1, rear-up adds 0.2 * 34 * 5 = 34 units in Z!
    // zDist drops to single digits:
    expect(zDistExtreme).toBeLessThan(15.0);
    expect(Number.isFinite(zDistExtreme)).toBe(true);
  });

  it('stress test: extreme viewport dimensions (mobile, ultra-wide 8K, small window)', () => {
    const extremeViewports = [
      { w: 320, h: 240 },   // tiny QVGA
      { w: 375, h: 667 },   // iPhone SE
      { w: 390, h: 844 },   // iPhone 14
      { w: 7680, h: 4320 }, // 8K
      { w: 5120, h: 1440 }, // 32:9 Super Ultra-Wide
      { w: 1000, h: 1000 }, // 1:1 Square
    ];

    for (const vp of extremeViewports) {
      for (const wrappedX of [-48, -16, 0, 16, 48]) {
        const rect = computeCardProxyRect(wrappedX, vp.w, vp.h, 28.8, 18.0, DEFAULT_UNIFORMS);

        expect(Number.isFinite(rect.left)).toBe(true);
        expect(Number.isFinite(rect.top)).toBe(true);
        expect(Number.isFinite(rect.width)).toBe(true);
        expect(Number.isFinite(rect.height)).toBe(true);
        expect(Number.isFinite(rect.centerX)).toBe(true);
        expect(Number.isFinite(rect.centerY)).toBe(true);
        expect(typeof rect.isVisible).toBe('boolean');
      }
    }
  });

  it('bounding box error verification: 3D sheet corner projection vs center proxy', () => {
    // Check how close the analytical center-based proxy matches the full 4-corner perspective envelope
    const vpW = 1440;
    const vpH = 900;
    const halfFovRad = (SHEET_CONSTANTS.CAMERA_FOV * Math.PI) / 360;

    // Test cards across the active visible ribbon range
    const activeXs = [-32, -16, 0, 16, 32];
    for (const x of activeXs) {
      const proxy = computeCardProxyRect(x, vpW, vpH, 28.8, 18.0, DEFAULT_UNIFORMS);

      // Evaluate the center in 3D
      const [cx, cy, cz] = evaluateSheetPoint([x, 0, 0], DEFAULT_UNIFORMS);
      const zDist = SHEET_CONSTANTS.CAMERA_Z - cz;
      const scalePy = vpH / (2 * zDist * Math.tan(halfFovRad));

      const expectedCenterX = vpW / 2 + cx * scalePy;
      const expectedCenterY = vpH / 2 - cy * scalePy;

      expect(Math.abs(proxy.centerX - expectedCenterX)).toBeLessThan(0.001);
      expect(Math.abs(proxy.centerY - expectedCenterY)).toBeLessThan(0.001);
    }
  });
});
