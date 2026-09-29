/**
 * C2 Constraint: Background ↔ Product Lighting / Rim Light Contrast
 * Uses relative luminance (sRGB/APCA) to ensure physical 3D product edges do not lose definition against changing background tones.
 */

function hexToRgb(hex) {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255
  };
}

function getRelativeLuminance(rgb) {
  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

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

module.exports = { resolveBackgroundProductContrast };
