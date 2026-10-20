/**
 * docs/research/v2.6/reference/apca-contrast.js
 * 
 * Studio DNA PRO v2.6 — Zero-Dependency Core Reference Micro-Engine
 * Feature: APCA 0.0.98G-4g & OKLCH Color Synthesis Engine (Pillars 9 & 10)
 * 
 * Standards & Mathematics:
 * - Ottosson (2020) Oklab / OKLCH Perceptually Uniform Color Space
 * - Bidirectional transformation matrices M1, M2 and their exact analytical inverses (Eq. 1 - 10)
 * - Somers (2022) Advanced Perceptual Contrast Algorithm (APCA 0.0.98G-4g per Eq. 11 - 14b)
 * - Monotonic Contrast Binary Search in OKLCH space (Theorem 2)
 * - Ordinary Least Squares (OLS) multi-breakpoint fluid typography regression (Eq. 17 - 20)
 * - Lexical expansion damping with 12px accessibility floor (Eq. 21)
 * - Zero external dependencies outside Node.js built-ins
 */

'use strict';

/**
 * Parses color inputs (hex strings, RGB arrays, or RGB objects) into numeric { r, g, b } in [0, 255].
 * 
 * @param {string|Array<number>|{ r: number, g: number, b: number }} color
 * @returns {{ r: number, g: number, b: number }}
 */
function parseColorToRgb(color) {
  if (typeof color === 'string') {
    let hex = color.trim().replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }
  if (Array.isArray(color)) {
    return { r: color[0], g: color[1], b: color[2] };
  }
  if (color && typeof color === 'object') {
    return { r: color.r, g: color.g, b: color.b };
  }
  return { r: 0, g: 0, b: 0 };
}

/**
 * Forward Transformation: sRGB to OKLCH per Equations 1–5.
 * 
 * @param {number} r Red channel [0, 255]
 * @param {number} g Green channel [0, 255]
 * @param {number} b Blue channel [0, 255]
 * @returns {{ L: number, C: number, h: number }}
 */
function sRGBToOklch(r, g, b) {
  // Step 1: sRGB Linearization (Inverse EOTF per Eq. 1)
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const rLin = lin(r / 255.0);
  const gLin = lin(g / 255.0);
  const bLin = lin(b / 255.0);

  // Step 2: Linear sRGB to Cone LMS response via M1 (Eq. 2)
  const l = 0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin;
  const m = 0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin;
  const s = 0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin;

  // Step 3: Non-linear cube root compression (Eq. 3)
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  // Step 4: Compressed LMS to Cartesian Oklab via M2 (Eq. 4)
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const bOklab = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // Step 5: Cartesian Oklab to Cylindrical OKLCH (Eq. 5)
  let C = Math.hypot(a, bOklab);
  let h = (Math.atan2(bOklab, a) * 180.0) / Math.PI;
  if (h < 0) h += 360.0;
  if (C < 1e-6) {
    C = 0.0;
    h = 0.0; // achromatic center
  }

  return { L, C, h };
}

/**
 * Inverse Transformation: OKLCH to sRGB per Equations 6–10.
 * 
 * @param {number} L Perceptual lightness in [0, 1]
 * @param {number} C Chroma >= 0
 * @param {number} h Hue angle in [0, 360)
 * @returns {{ r: number, g: number, b: number, hex: string }}
 */
function oklchToSRGB(L, C, h) {
  // Step 1: Cylindrical OKLCH to Cartesian Oklab (Eq. 6)
  const hRad = (h * Math.PI) / 180.0;
  const a = C * Math.cos(hRad);
  const bOklab = C * Math.sin(hRad);

  // Step 2: Oklab to compressed LMS via M2^-1 (Eq. 7)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * bOklab;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bOklab;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * bOklab;

  // Step 3: LMS cubic decompression (Eq. 8)
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  // Step 4: Linear LMS to linear sRGB via M1^-1 (Eq. 9)
  const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  // Step 5: Gamma encoding & gamut clamping (Eq. 10)
  const encode = (c) =>
    c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(0, c), 1.0 / 2.4) - 0.055;

  const rClamped = Math.max(0, Math.min(1, encode(rLin)));
  const gClamped = Math.max(0, Math.min(1, encode(gLin)));
  const bClamped = Math.max(0, Math.min(1, encode(bLin)));

  const rByte = Math.round(rClamped * 255.0);
  const gByte = Math.round(gClamped * 255.0);
  const bByte = Math.round(bClamped * 255.0);

  const toHex = (n) => n.toString(16).padStart(2, '0');
  const hex = `#${toHex(rByte)}${toHex(gByte)}${toHex(bByte)}`;

  return { r: rByte, g: gByte, b: bByte, hex };
}

/**
 * Authoritative APCA 0.0.98G-4g Lightness Contrast Engine per Equations 11–14b.
 * 
 * @param {string|Array<number>|object} textColor Text foreground color
 * @param {string|Array<number>|object} backgroundColor Background surface color
 * @returns {number} APCA perceived lightness contrast score Lc in [-108, 106]
 */
function calcAPCA(textColor, backgroundColor) {
  const txt = parseColorToRgb(textColor);
  const bg = parseColorToRgb(backgroundColor);

  // Linearize sRGB channels via simple power 2.4 (Eq. 11)
  const lin = (c) => Math.pow(c / 255.0, 2.4);
  const rTxt = lin(txt.r), gTxt = lin(txt.g), bTxt = lin(txt.b);
  const rBg = lin(bg.r), gBg = lin(bg.g), bBg = lin(bg.b);

  // Photopic luminance Y with CIE 1931 2° spectral luminous efficiency (Eq. 11)
  const yTxt = 0.2126729 * rTxt + 0.7151522 * gTxt + 0.0721750 * bTxt;
  const yBg = 0.2126729 * rBg + 0.7151522 * gBg + 0.0721750 * bBg;

  // Black-level soft clamping modeling human ocular flare (Eq. 12)
  const clampY = (y) => (y > 0.022 ? y : y + Math.pow(0.022 - y, 1.414));
  const yTxtClamped = clampY(yTxt);
  const yBgClamped = clampY(yBg);

  // Soft clip for small luminance delta
  if (Math.abs(yBgClamped - yTxtClamped) < 0.0005) {
    return 0.0;
  }

  let sApca = 0.0;
  let Lc = 0.0;

  if (yBgClamped >= yTxtClamped) {
    // Normal polarity: Dark text on Light background (BoW, Eq. 13a, 13b)
    sApca = (Math.pow(yBgClamped, 0.56) - Math.pow(yTxtClamped, 0.57)) * 1.14;
    Lc = sApca < 0.1 ? 0.0 : (sApca - 0.027) * 100.0;
  } else {
    // Reverse polarity: Light text on Dark background (WoB, Eq. 14a, 14b)
    sApca = (Math.pow(yBgClamped, 0.65) - Math.pow(yTxtClamped, 0.62)) * 1.14;
    Lc = Math.abs(sApca) < 0.1 ? 0.0 : (sApca + 0.027) * 100.0;
  }

  return Lc;
}

/**
 * Monotonic Binary Search for APCA Target Contrast (Theorem 2).
 * Solves for text lightness L in OKLCH space converging with error < 1.0.
 * 
 * @param {string|object} bgColor Background surface color
 * @param {number} targetLc Target absolute APCA contrast score (e.g. 75 for body, 60 for headlines)
 * @param {'body'|'headline'|'ui'} [role='body'] Typographic role
 * @returns {{ r: number, g: number, b: number, hex: string }}
 */
function searchMonotonicContrast(bgColor, targetLc, role = 'body') {
  const bg = parseColorToRgb(bgColor);
  const bgOklch = sRGBToOklch(bg.r, bg.g, bg.b);

  let low = 0.0;
  let high = 1.0;
  let bestColor = null;
  let bestDiff = Infinity;

  // 24 iterations of bisection ensures precision epsilon < 2^-24
  for (let iter = 0; iter < 24; iter++) {
    const midL = (low + high) / 2.0;
    const candidate = oklchToSRGB(midL, 0.02, bgOklch.h);
    const score = Math.abs(calcAPCA(candidate.hex, bgColor));

    const diff = Math.abs(score - targetLc);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestColor = candidate;
    }

    if (score < targetLc) {
      low = midL; // Increase lightness
    } else {
      high = midL; // Decrease lightness
    }
  }

  return bestColor;
}

/**
 * Responsive Fluid Typography Scaling via Ordinary Least Squares (OLS) per Equations 17–20.
 * 
 * @param {Array<number>} viewports Breakpoint viewports in pixels (e.g. [390, 768, 1440])
 * @param {Array<number>} sizes Desired font sizes at breakpoints in pixels (e.g. [24, 32, 48])
 * @returns {string} CSS clamp string: clamp(S_min px, beta vw + gamma px, S_max px)
 */
function calculateFluidScale(viewports, sizes) {
  const n = viewports.length;
  if (n < 2) return `clamp(${sizes[0]}px, ${sizes[0]}px, ${sizes[0]}px)`;

  const xMean = viewports.reduce((s, v) => s + v, 0) / n;
  const yMean = sizes.reduce((s, v) => s + v, 0) / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (viewports[i] - xMean) * (sizes[i] - yMean);
    den += Math.pow(viewports[i] - xMean, 2);
  }

  const slope = den === 0 ? 0 : num / den;
  const intercept = yMean - slope * xMean;

  const vwVal = (slope * 100).toFixed(3);
  const pxVal = intercept.toFixed(2);
  const minSize = Math.min(...sizes);
  const maxSize = Math.max(...sizes);

  return `clamp(${minSize}px, ${vwVal}vw + ${pxVal}px, ${maxSize}px)`;
}

/**
 * Lexical Expansion Damping per Equation 21:
 * kappa_copy = (L_orig / L_new)^0.65
 * Dampens typographic scale when copy text expands (e.g. translation to German),
 * strictly maintaining a 12px minimum accessibility floor.
 * 
 * @param {number} baseSize Base font size in pixels
 * @param {number} originalLen Character length of reference copy
 * @param {number} newLen Character length of translated / client copy
 * @returns {number} Damped font size in pixels (floored at 12px)
 */
function applyLexicalDamping(baseSize, originalLen, newLen) {
  if (!originalLen || !newLen || newLen <= originalLen) return baseSize;
  const kappa = Math.pow(originalLen / newLen, 0.65);
  const damped = baseSize * kappa;
  return Math.max(12.0, damped); // 12px accessibility floor
}

module.exports = {
  sRGBToOklch,
  oklchToSRGB,
  parseColorToRgb,
  calcAPCA,
  searchMonotonicContrast,
  calculateFluidScale,
  applyLexicalDamping
};
