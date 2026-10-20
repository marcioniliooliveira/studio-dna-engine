/**
 * src/constraints/contrast.js
 * 
 * Studio DNA PRO v2.6 — Zero-Dependency APCA 0.0.98G-4g & OKLCH Engine (Pillars 9 & 10)
 * 
 * Standards & Implementations:
 * - Somers (2022) Advanced Perceptual Contrast Algorithm (APCA 0.0.98G-4g)
 * - Ottosson (2020) Oklab / OKLCH Perceptually Uniform Color Space
 * - Monotonic Contrast Binary Search in OKLCH space
 * - APCA Spatial Frequency Font Lookup Matrix
 * - Analytical Minimum Scrim Layer Opacity Solver
 * - C2 Constraint: Background ↔ Product Lighting / Rim Light Contrast
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
    if (isNaN(num)) {
      throw new Error(`Invalid color format: ${color}`);
    }
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
    return { r: Number(color.r), g: Number(color.g), b: Number(color.b) };
  }
  return { r: 0, g: 0, b: 0 };
}

function hexToRgb(hex) {
  return parseColorToRgb(hex);
}

function rgbToHex(r, g, b) {
  const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Computes standard relative luminance per WCAG 2.1 (sRGB Linearization)
 */
function getRelativeLuminance(rgb) {
  const toLinear = (c) => {
    const v = c > 1 ? c / 255 : c;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Forward Transformation: sRGB to OKLCH
 * 
 * @param {number} r Red channel [0, 255]
 * @param {number} g Green channel [0, 255]
 * @param {number} b Blue channel [0, 255]
 * @returns {{ L: number, C: number, h: number }}
 */
function sRGBToOklch(r, g, b) {
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const rLin = lin(r / 255.0);
  const gLin = lin(g / 255.0);
  const bLin = lin(b / 255.0);

  const l = 0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin;
  const m = 0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin;
  const s = 0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const bOklab = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  let C = Math.hypot(a, bOklab);
  let h = (Math.atan2(bOklab, a) * 180.0) / Math.PI;
  if (h < 0) h += 360.0;
  if (C < 1e-6) {
    C = 0.0;
    h = 0.0;
  }

  return { L, C, h };
}

/**
 * Inverse Transformation: OKLCH to sRGB
 * 
 * @param {number} L Perceptual lightness in [0, 1]
 * @param {number} C Chroma >= 0
 * @param {number} h Hue angle in [0, 360)
 * @returns {{ r: number, g: number, b: number, hex: string }}
 */
function oklchToSRGB(L, C, h) {
  const hRad = (h * Math.PI) / 180.0;
  const a = C * Math.cos(hRad);
  const bOklab = C * Math.sin(hRad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * bOklab;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bOklab;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * bOklab;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  const encode = (c) =>
    c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(0, c), 1.0 / 2.4) - 0.055;

  const rClamped = Math.max(0, Math.min(1, encode(rLin)));
  const gClamped = Math.max(0, Math.min(1, encode(gLin)));
  const bClamped = Math.max(0, Math.min(1, encode(bLin)));

  const rByte = Math.round(rClamped * 255.0);
  const gByte = Math.round(gClamped * 255.0);
  const bByte = Math.round(bClamped * 255.0);

  const hex = rgbToHex(rByte, gByte, bByte);
  return { r: rByte, g: gByte, b: bByte, hex };
}

/**
 * Authoritative APCA 0.0.98G-4g Lightness Contrast Engine (Equations 32a–32f).
 * 
 * @param {string|Array<number>|object} textColor Text foreground color
 * @param {string|Array<number>|object} backgroundColor Background surface color
 * @returns {number} APCA perceived lightness contrast score Lc in [-108, 106]
 */
function calcAPCA(textColor, backgroundColor) {
  const txt = parseColorToRgb(textColor);
  const bg = parseColorToRgb(backgroundColor);

  // Linearize sRGB channels via power 2.4
  const lin = (c) => Math.pow(c / 255.0, 2.4);
  const rTxt = lin(txt.r), gTxt = lin(txt.g), bTxt = lin(txt.b);
  const rBg = lin(bg.r), gBg = lin(bg.g), bBg = lin(bg.b);

  // Photopic luminance Y (CIE 1931 2° spectral luminous efficiency)
  const yTxt = 0.2126729 * rTxt + 0.7151522 * gTxt + 0.0721750 * bTxt;
  const yBg = 0.2126729 * rBg + 0.7151522 * gBg + 0.0721750 * bBg;

  // Black-level soft clamping modeling human ocular flare
  const clampY = (y) => (y > 0.022 ? y : y + Math.pow(0.022 - y, 1.414));
  const yTxtClamped = clampY(yTxt);
  const yBgClamped = clampY(yBg);

  // Soft clip for tiny luminance delta
  if (Math.abs(yBgClamped - yTxtClamped) < 0.0005) {
    return 0.0;
  }

  let sApca = 0.0;
  let Lc = 0.0;

  if (yBgClamped >= yTxtClamped) {
    // Normal polarity: Dark text on Light background (BoW)
    sApca = (Math.pow(yBgClamped, 0.56) - Math.pow(yTxtClamped, 0.57)) * 1.14;
    Lc = sApca < 0.1 ? 0.0 : (sApca - 0.027) * 100.0;
  } else {
    // Reverse polarity: Light text on Dark background (WoB)
    sApca = (Math.pow(yBgClamped, 0.65) - Math.pow(yTxtClamped, 0.62)) * 1.14;
    Lc = Math.abs(sApca) < 0.1 ? 0.0 : (sApca + 0.027) * 100.0;
  }

  return Lc;
}

/**
 * Monotonic Binary Search for APCA Target Contrast (Theorem 5).
 * Solves for text lightness L in OKLCH space converging with error < 1.0.
 * 
 * @param {string|object} bgColor Background surface color
 * @param {number} targetLc Target absolute APCA contrast score
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
      low = midL;
    } else {
      high = midL;
    }
  }

  return bestColor;
}

/**
 * Font Lookup Matrix for APCA Compliance
 * Maps contrast score Lc and font weight to minimum compliant font size in px.
 * 
 * @param {number} lc Signed or unsigned APCA score
 * @param {number} [weight=400] Font weight (e.g. 400 regular, 700 bold)
 * @returns {{ compliant: boolean, absLc: number, weight: number, minFontSizePx: number, rating: string, reason?: string }}
 */
function fontLookupAPCA(lc, weight = 400) {
  const absLc = Math.abs(lc);
  if (absLc < 15) {
    return {
      compliant: false,
      absLc,
      weight,
      minFontSizePx: Infinity,
      rating: 'inadmissible',
      reason: 'Contrast score Lc < 15 is below the absolute human visibility threshold'
    };
  }

  let minFontSizePx;
  let rating;

  if (absLc >= 90) {
    rating = 'preferred';
    minFontSizePx = weight >= 700 ? 12 : 14;
  } else if (absLc >= 75) {
    rating = 'fluent-body';
    minFontSizePx = weight >= 700 ? 14 : 16;
  } else if (absLc >= 60) {
    rating = 'sub-heading';
    minFontSizePx = weight >= 700 ? 18 : 24;
  } else if (absLc >= 45) {
    rating = 'display-headline';
    minFontSizePx = weight >= 700 ? 24 : 36;
  } else if (absLc >= 30) {
    rating = 'secondary-ui';
    minFontSizePx = weight >= 700 ? 32 : 48;
  } else {
    rating = 'non-content-only';
    minFontSizePx = 60;
  }

  return {
    compliant: true,
    absLc,
    weight,
    minFontSizePx,
    rating
  };
}

/**
 * Analytical Minimum Scrim Layer Opacity Solver
 * Computes the optimal opacity alpha in [0, 1] of a scrim overlay over a background
 * to guarantee target APCA contrast without over-darkening or over-lightening the composition.
 * 
 * @param {string|object} textColor Foreground text color
 * @param {string|object} bgColor Background / image underlying tone
 * @param {object} [options={}]
 * @param {number} [options.targetLc=60] Desired minimum absolute APCA contrast
 * @param {string} [options.scrimColor] Explicit scrim color ('#000000' or '#ffffff')
 * @returns {{ solved: boolean, opacity: number, scrimColor: string, compositeColor: string, achievedLc: number, cssScrim: string }}
 */
function solveOptimalScrimOpacity(textColor, bgColor, options = {}) {
  const targetLc = options.targetLc !== undefined ? options.targetLc : 60;
  const txtRgb = parseColorToRgb(textColor);
  const bgRgb = parseColorToRgb(bgColor);

  const initialLc = Math.abs(calcAPCA(txtRgb, bgRgb));
  if (initialLc >= targetLc) {
    return {
      solved: true,
      opacity: 0.0,
      scrimColor: options.scrimColor || '#000000',
      compositeColor: typeof bgColor === 'string' ? bgColor : rgbToHex(bgRgb.r, bgRgb.g, bgRgb.b),
      achievedLc: Number(initialLc.toFixed(1)),
      cssScrim: 'transparent'
    };
  }

  let scrimColor = options.scrimColor;
  if (!scrimColor) {
    // If text is light, dark scrim creates contrast; if text is dark, light scrim creates contrast.
    const txtLum = (0.2126 * txtRgb.r + 0.7152 * txtRgb.g + 0.0722 * txtRgb.b) / 255;
    scrimColor = txtLum > 0.4 ? '#000000' : '#ffffff';
  }
  const scrimRgb = parseColorToRgb(scrimColor);

  let low = 0.0;
  let high = 1.0;
  let bestAlpha = 1.0;
  let bestLc = 0;

  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2.0;
    const compR = Math.round((1 - mid) * bgRgb.r + mid * scrimRgb.r);
    const compG = Math.round((1 - mid) * bgRgb.g + mid * scrimRgb.g);
    const compB = Math.round((1 - mid) * bgRgb.b + mid * scrimRgb.b);
    const compRgb = { r: compR, g: compG, b: compB };

    const score = Math.abs(calcAPCA(txtRgb, compRgb));
    if (score >= targetLc) {
      bestAlpha = mid;
      bestLc = score;
      high = mid; // Try lower opacity for tighter scrim
    } else {
      low = mid; // Needs higher opacity
    }
  }

  const finalCompR = Math.round((1 - bestAlpha) * bgRgb.r + bestAlpha * scrimRgb.r);
  const finalCompG = Math.round((1 - bestAlpha) * bgRgb.g + bestAlpha * scrimRgb.g);
  const finalCompB = Math.round((1 - bestAlpha) * bgRgb.b + bestAlpha * scrimRgb.b);
  const finalHex = rgbToHex(finalCompR, finalCompG, finalCompB);
  const achievedScore = Math.abs(calcAPCA(txtRgb, { r: finalCompR, g: finalCompG, b: finalCompB }));

  const solved = achievedScore >= targetLc - 0.5;
  const roundedOpacity = Number(bestAlpha.toFixed(3));

  return {
    solved,
    opacity: roundedOpacity,
    scrimColor,
    compositeColor: finalHex,
    achievedLc: Number(achievedScore.toFixed(1)),
    cssScrim: `rgba(${scrimRgb.r}, ${scrimRgb.g}, ${scrimRgb.b}, ${roundedOpacity})`
  };
}

/**
 * C2 Constraint: Background ↔ Product Lighting / Rim Light Contrast
 * Uses relative luminance and APCA to ensure physical 3D product edges do not lose definition against changing background tones.
 */
function resolveBackgroundProductContrast(bgHex, baseToneMultiplier = 1.0, minContrastRatio = 4.5) {
  let rgb;
  try {
    rgb = hexToRgb(bgHex);
  } catch {
    return { valid: false, reason: `Invalid color format: ${bgHex}` };
  }

  const bgL = getRelativeLuminance(rgb);
  // Product body is black anodized aluminum (sRGB ~20-25 / 255 => linear L ~ 0.012)
  const productL = 0.012;

  // Relative contrast ratio (WCAG formula: (L1 + 0.05) / (L2 + 0.05))
  const l1 = Math.max(bgL, productL);
  const l2 = Math.min(bgL, productL);
  const rawRatio = (l1 + 0.05) / (l2 + 0.05);

  // If background approaches pure glare white (L > 0.82), a black matte hardware device
  // turns into a flat cutout silhouette without studio edge definition.
  if (bgL > 0.82) {
    return {
      valid: false,
      reason: `Contrast violation: background luminance (${bgL.toFixed(2)}) creates severe glare clipping against matte dark hardware`,
      bgLuminance: bgL,
      contrastRatio: rawRatio
    };
  }

  // If background is very dark (original Alpine Obsidian #0c0d0e, L ~ 0.01)
  if (bgL < 0.05) {
    return {
      valid: true,
      compensatedRimLight: 1.0,
      compensatedBackdropTone: baseToneMultiplier,
      contrastRatio: rawRatio,
      bgLuminance: bgL
    };
  }

  // For mid/steel tones (e.g. #555d64, L ~ 0.15 - 0.45), elevate rim light to carve product silhouette
  const rimBoost = 1.0 + (bgL * 2.8);
  const toneDamp = Math.max(0.4, 1.0 - bgL * 0.7);

  // Physical studio specular highlight on chamfered anodized edge:
  // L_edge = productL + (rimBoost * 0.62)
  const edgeL = productL + (rimBoost * 0.62);
  const e1 = Math.max(bgL, edgeL);
  const e2 = Math.min(bgL, edgeL);
  const edgeRatio = (e1 + 0.05) / (e2 + 0.05);

  const effectiveRatio = Math.max(rawRatio, edgeRatio);

  return {
    valid: true,
    compensatedRimLight: Number(rimBoost.toFixed(2)),
    compensatedBackdropTone: Number((baseToneMultiplier * toneDamp).toFixed(2)),
    contrastRatio: Number(effectiveRatio.toFixed(2)),
    bgLuminance: bgL
  };
}

module.exports = {
  parseColorToRgb,
  hexToRgb,
  rgbToHex,
  getRelativeLuminance,
  sRGBToOklch,
  oklchToSRGB,
  calcAPCA,
  searchMonotonicContrast,
  fontLookupAPCA,
  solveOptimalScrimOpacity,
  resolveBackgroundProductContrast
};
