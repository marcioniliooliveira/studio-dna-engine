export const SHEET_CONSTANTS = {
  PI: Math.PI,
  CAMERA_FOV: 75,
  CAMERA_Z: 27,
  SHEET_BANK: -0.16,
  SHEET_DIAG: 0.03,
  SHEET_WAVE: 0.0,
  SHEET_WAVE_F: 0.8,
  SHEET_WAVE_PH: 0.35,
  SHEET_REAR_Y: 0.1,
  SHEET_REAR_Z: 0.2,
  SHEET_VTWIST: 1.8,
  SHEET_TAIL: 1.0,
  SHEET_SHIFT: -0.2,
  LIGHT_DIR: [-0.4, 0.5, 1.0] as [number, number, number],
  LIGHT_GLOSS: 48.0,
  LIGHT_SPEC: 0.35,
  LIGHT_DIFF: 0.12,
} as const;

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

export function leanRamp(s: number): number {
  const c = clamp(s, -1.0, 1.0);
  return c * (1.5 - 0.5 * c * c);
}

export function leanSlope(s: number): number {
  const m = Math.min(Math.abs(s), 1.0);
  return 1.5 * (1.0 - m * m);
}

export function sheetDome(uv: [number, number]): number {
  const qx = uv[0] * 2.0 - 1.0;
  const qy = uv[1] * 2.0 - 1.0;
  return (1.0 - qx * qx) * (1.0 - qy * qy);
}

export function sheetQ(wx: number, u_sheetW: number, u_sheetT: number): number {
  return (wx / Math.max(u_sheetW, 0.0001)) * u_sheetT + SHEET_CONSTANTS.SHEET_SHIFT;
}

export function sheetShape(q: number, u_sheetC = 1.0): number {
  const bowl = 1.0 - q * q;
  const ess = Math.sin(SHEET_CONSTANTS.PI * q);
  const blended = bowl * (1.0 - u_sheetC) + ess * u_sheetC;
  return blended * Math.exp(-SHEET_CONSTANTS.SHEET_TAIL * q * q);
}

export function sheetShapeSlope(q: number, u_sheetC = 1.0): number {
  const g = Math.exp(-SHEET_CONSTANTS.SHEET_TAIL * q * q);
  const bowl = -2.0 * q * (1.0 + SHEET_CONSTANTS.SHEET_TAIL * (1.0 - q * q));
  const ess =
    SHEET_CONSTANTS.PI * Math.cos(SHEET_CONSTANTS.PI * q) -
    2.0 * SHEET_CONSTANTS.SHEET_TAIL * q * Math.sin(SHEET_CONSTANTS.PI * q);
  return (bowl * (1.0 - u_sheetC) + ess * u_sheetC) * g;
}

export function sheetZ(
  wx: number,
  u_sheetD: number,
  u_sheetW: number,
  u_sheetT: number,
  u_sheetC = 1.0
): number {
  return -u_sheetD * sheetShape(sheetQ(wx, u_sheetW, u_sheetT), u_sheetC);
}

export function sheetRoll(
  wx: number,
  u_sheetW: number,
  u_sheetT: number,
  u_sheetC: number,
  u_sheetP: number
): number {
  if (u_sheetW < 0.001) return 0.0;
  return (
    (SHEET_CONSTANTS.SHEET_BANK *
      sheetShapeSlope(sheetQ(wx, u_sheetW, u_sheetT), u_sheetC) /
      SHEET_CONSTANTS.PI) *
    u_sheetC *
    u_sheetP
  );
}

export function roundedBox(
  p: [number, number],
  mid: [number, number],
  r: number
): number {
  const qx = Math.abs(p[0] - mid[0]) - (mid[0] - r);
  const qy = Math.abs(p[1] - mid[1]) - (mid[1] - r);
  const maxQx = Math.max(qx, 0.0);
  const maxQy = Math.max(qy, 0.0);
  const len = Math.hypot(maxQx, maxQy);
  return len + Math.min(Math.max(qx, qy), 0.0) - r;
}

export function uvCover(
  planeSize: [number, number],
  imageSize: [number, number],
  uv: [number, number]
): [number, number] {
  const planeRatio = planeSize[0] / planeSize[1];
  const imageRatio = imageSize[0] / imageSize[1];

  let newSize: [number, number];
  let newOffset: [number, number];

  if (planeRatio < imageRatio) {
    newSize = [imageSize[0] * (planeSize[1] / imageSize[1]), planeSize[1]];
    newOffset = [(newSize[0] - planeSize[0]) / 2.0 / newSize[0], 0.0];
  } else {
    newSize = [planeSize[0], imageSize[1] * (planeSize[0] / imageSize[0])];
    newOffset = [0.0, (newSize[1] - planeSize[1]) / 2.0 / newSize[1]];
  }

  return [
    (uv[0] * planeSize[0]) / newSize[0] + newOffset[0],
    (uv[1] * planeSize[1]) / newSize[1] + newOffset[1],
  ];
}

export function sheetLit(
  col: [number, number, number],
  n: [number, number, number],
  v: [number, number, number],
  amt: number
): [number, number, number] {
  if (amt < 0.001) return [col[0], col[1], col[2]];
  const LIGHT_DIR = SHEET_CONSTANTS.LIGHT_DIR;
  const dotN = n[0] * LIGHT_DIR[0] + n[1] * LIGHT_DIR[1] + n[2] * LIGHT_DIR[2];
  const d = dotN * 0.5 + 0.5;

  const r = col[0] * (1.0 - SHEET_CONSTANTS.LIGHT_DIFF * amt * (1.0 - d));
  const g = col[1] * (1.0 - SHEET_CONSTANTS.LIGHT_DIFF * amt * (1.0 - d));
  const b = col[2] * (1.0 - SHEET_CONSTANTS.LIGHT_DIFF * amt * (1.0 - d));

  const hx = LIGHT_DIR[0] + v[0];
  const hy = LIGHT_DIR[1] + v[1];
  const hz = LIGHT_DIR[2] + v[2];
  const hLen = Math.hypot(hx, hy, hz) || 1.0;
  const h: [number, number, number] = [hx / hLen, hy / hLen, hz / hLen];

  const dotH = Math.max(n[0] * h[0] + n[1] * h[1] + n[2] * h[2], 0.0);
  const spec = Math.pow(dotH, SHEET_CONSTANTS.LIGHT_GLOSS) * SHEET_CONSTANTS.LIGHT_SPEC * amt;

  return [r + spec, g + spec, b + spec];
}

export interface SheetUniformParams {
  u_sheetW?: number;
  u_sheetD?: number;
  u_sheetT?: number;
  u_sheetC?: number;
  u_sheetP?: number;
  u_sheetV?: number;
  u_hover?: number;
  u_dent?: number;
  u_leanA?: number;
  u_leanW?: number;
}

export function evaluateSheetPoint(
  point: [number, number, number],
  params: SheetUniformParams = {}
): [number, number, number] {
  const {
    u_sheetW = 22.0,
    u_sheetD = 3.2,
    u_sheetT = 0.9,
    u_sheetC = 1.0,
    u_sheetP = 1.0,
    u_sheetV = 0.0,
  } = params;

  let x = point[0];
  let y = point[1];
  let z = point[2];

  // 1. sheetWind
  let a = sheetRoll(x, u_sheetW, u_sheetT, u_sheetC, u_sheetP);
  if (u_sheetV > 0.001 && u_sheetW > 0.001 && u_sheetP > 0.001) {
    const qe = x / u_sheetW;
    a +=
      SHEET_CONSTANTS.SHEET_VTWIST *
      u_sheetV *
      smoothstep(0.3, 0.9, Math.abs(qe)) *
      Math.sign(qe) *
      u_sheetP;
  }

  if (Math.abs(a) >= 0.0001) {
    const s = Math.sin(a);
    const c = Math.cos(a);
    const ny = y * c - z * s;
    const nz = y * s + z * c;
    y = ny;
    z = nz;
  }

  // 2. sheetZ
  z += sheetZ(x, u_sheetD, u_sheetW, u_sheetT, u_sheetC) * u_sheetP;

  // 3. Diagonal, wave, and rear-up
  if (u_sheetW > 0.001) {
    const qw = x / u_sheetW;
    y += SHEET_CONSTANTS.SHEET_DIAG * x * u_sheetP;
    y +=
      SHEET_CONSTANTS.SHEET_WAVE *
      u_sheetW *
      Math.sin(SHEET_CONSTANTS.PI * (qw * SHEET_CONSTANTS.SHEET_WAVE_F + SHEET_CONSTANTS.SHEET_WAVE_PH)) *
      u_sheetP;

    if (u_sheetV > 0.001) {
      const m = 1.0 - smoothstep(-1.0, 0.3, qw);
      y += SHEET_CONSTANTS.SHEET_REAR_Y * u_sheetW * u_sheetV * m * u_sheetP;
      z += SHEET_CONSTANTS.SHEET_REAR_Z * u_sheetW * u_sheetV * m * u_sheetP;
    }
  }

  return [x, y, z];
}
