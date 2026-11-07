/**
 * Strict Design Token Linter & AST Compiler (Level 0 Pareto Funil)
 * 
 * Rules:
 * 1. Blocks arbitrary Tailwind classes (e.g. p-[19px], bg-[#8b5cf6], w-[347px], z-[9999]).
 * 2. Enforces 4px scale on padding, margin, and gap properties.
 * 3. Perceptual color distance Delta E (CIE76 / CIELAB):
 *    - Delta E < 2.0: Value drift / token bypass -> suggests direct replacement with brand token.
 *    - Delta E >= 2.0: Unauthorized chromatic deviation -> hard block, points to closest palette token.
 * 4. Sub-80ms execution target in native Node.js.
 */

'use strict';

// ============================================================================
// 1. Color Conversion & Delta E (CIELAB CIE76)
// ============================================================================

/**
 * Parses color inputs (hex strings, rgb/rgba strings, or {r, g, b}) into { r, g, b } in [0, 255].
 * Returns null if format is not recognized.
 */
function parseColorToRgb(color) {
  if (!color) return null;
  if (typeof color === 'object' && color.r !== undefined && color.g !== undefined && color.b !== undefined) {
    return { r: Number(color.r), g: Number(color.g), b: Number(color.b) };
  }
  if (typeof color !== 'string') return null;

  const trimmed = color.trim().toLowerCase();

  // Hex: #fff, #ffffff, #ffffffff
  if (trimmed.startsWith('#')) {
    let hex = trimmed.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex.split('').map(c => c + c).join('');
    }
    if (hex.length >= 6) {
      const num = parseInt(hex.slice(0, 6), 16);
      if (isNaN(num)) return null;
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
      };
    }
    return null;
  }

  // rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = trimmed.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
  if (rgbMatch) {
    return {
      r: Math.round(Number(rgbMatch[1])),
      g: Math.round(Number(rgbMatch[2])),
      b: Math.round(Number(rgbMatch[3]))
    };
  }

  return null;
}

/**
 * Converts sRGB to CIELAB coordinates.
 */
function rgbToLab(rgb) {
  const toLinear = (c) => {
    const v = c / 255.0;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  const rLin = toLinear(rgb.r);
  const gLin = toLinear(rgb.g);
  const bLin = toLinear(rgb.b);

  // sRGB to CIEXYZ (D65 standard illuminant, 2-degree observer)
  const x = (rLin * 0.4124564 + gLin * 0.3575761 + bLin * 0.1804375) / 0.95047;
  const y = (rLin * 0.2126729 + gLin * 0.7151522 + bLin * 0.0721750) / 1.00000;
  const z = (rLin * 0.0193339 + gLin * 0.1191920 + bLin * 0.9503041) / 1.08883;

  const f = (t) => (t > 0.00885645 ? Math.cbrt(t) : 7.787037 * t + 16 / 116);

  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return { L, a, b };
}

/**
 * Calculates perceptual color distance Delta E (CIE76).
 */
function calculateDeltaE(colorA, colorB) {
  const rgbA = parseColorToRgb(colorA);
  const rgbB = parseColorToRgb(colorB);

  if (!rgbA || !rgbB) {
    throw new Error(`Invalid color inputs for Delta E: "${colorA}", "${colorB}"`);
  }

  if (rgbA.r === rgbB.r && rgbA.g === rgbB.g && rgbA.b === rgbB.b) {
    return 0;
  }

  const labA = rgbToLab(rgbA);
  const labB = rgbToLab(rgbB);

  return Math.hypot(labA.L - labB.L, labA.a - labB.a, labA.b - labB.b);
}

// ============================================================================
// 2. Brand Spec Palette Extractor
// ============================================================================

function extractBrandPalette(brandSpec) {
  const palette = [];
  if (!brandSpec || typeof brandSpec !== 'object') return palette;

  function addColor(name, val, role) {
    if (!val) return;
    let hex = null;
    let description = role || '';

    if (typeof val === 'string') {
      hex = val;
    } else if (typeof val === 'object') {
      hex = val.hex || val.$value || val.value;
      description = val.role || val.$description || val.description || description;
    }

    if (hex && typeof hex === 'string') {
      const rgb = parseColorToRgb(hex);
      if (rgb) {
        palette.push({
          name,
          hex: hex.toUpperCase(),
          rgb,
          lab: rgbToLab(rgb),
          description
        });
      }
    }
  }

  // 1. theme object
  if (brandSpec.theme && typeof brandSpec.theme === 'object') {
    for (const [key, val] of Object.entries(brandSpec.theme)) {
      if (typeof val === 'string' && val.startsWith('#')) {
        addColor(key, val, `Theme ${key}`);
      }
    }
  }

  // 2. tokensP0, tokensP1, tokens, colors
  for (const groupKey of ['tokensP0', 'tokensP1', 'tokens', 'colors']) {
    if (brandSpec[groupKey] && typeof brandSpec[groupKey] === 'object') {
      for (const [key, val] of Object.entries(brandSpec[groupKey])) {
        addColor(`${groupKey}.${key}`, val);
      }
    }
  }

  return palette;
}

function findClosestPaletteToken(color, palette) {
  if (!palette || palette.length === 0) return null;

  let closest = null;
  let minDeltaE = Infinity;

  for (const token of palette) {
    try {
      const dE = calculateDeltaE(color, token.hex);
      if (dE < minDeltaE) {
        minDeltaE = dE;
        closest = { ...token, deltaE: dE };
      }
    } catch {
      // Ignore unparseable comparison
    }
  }

  return closest;
}

// ============================================================================
// 3. 4px Scale Validation
// ============================================================================

function isDivisibleBy4(val) {
  if (val === undefined || val === null) return true;
  const num = typeof val === 'number' ? val : parseFloat(val);
  if (isNaN(num)) return true;
  if (num === 0) return true;
  return Math.abs(num % 4) < 1e-4;
}

// ============================================================================
// 4. Strict Token Linter
// ============================================================================

// Matches Tailwind bracketed arbitrary classes: p-[19px], bg-[#8b5cf6], w-[347px], z-[9999]
const ARBITRARY_CLASS_REGEX = /\b([a-zA-Z0-9_-]+-\[[^\]\s"'{}`]+\])/g;

// Matches CSS & JSX spacing styles (kebab-case and camelCase)
const SPACING_STYLE_REGEX = /\b(margin(?:-(?:top|bottom|left|right)|Top|Bottom|Left|Right)?|padding(?:-(?:top|bottom|left|right)|Top|Bottom|Left|Right)?|gap|(?:row|column)-?gap|rowGap|columnGap)\s*[:=]\s*['"]?([^;!}'",]+)/gi;

// Matches CSS & JSX color styles (kebab-case and camelCase)
const COLOR_DECLARATION_REGEX = /\b(color|background(?:-color|Color)?|border(?:-(?:top|bottom|left|right)-color|(?:Top|Bottom|Left|Right)?Color)?|fill|stroke)\s*[:=]\s*['"]?([^;!}'",]+)/gi;

const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

/**
 * Scans content (HTML, JSX, TSX, CSS) and verifies compliance with design tokens:
 * - Blocks arbitrary Tailwind classes
 * - Validates 4px scale on spacing
 * - Enforces chromatic Delta E invariants against brandSpec
 *
 * @param {string} content Source code string
 * @param {object} [options]
 * @param {object} [options.brandSpec] Active brand spec
 * @param {string} [options.filePath] Path of the file being linted
 * @returns {{ valid: boolean, violations: Array<object> }}
 */
function lintStrictDesignTokens(content, options = {}) {
  const violations = [];
  if (!content || typeof content !== 'string') {
    return { valid: true, violations };
  }

  const brandSpec = options.brandSpec || {};
  const palette = extractBrandPalette(brandSpec);
  const lines = content.split('\n');

  lines.forEach((lineText, lineIdx) => {
    const lineNum = lineIdx + 1;

    // ------------------------------------------------------------------------
    // A. Detect Arbitrary Tailwind Classes: e.g. p-[19px], bg-[#8b5cf6], w-[347px], z-[9999]
    // ------------------------------------------------------------------------
    let match;
    const classRegex = new RegExp(ARBITRARY_CLASS_REGEX);
    while ((match = classRegex.exec(lineText)) !== null) {
      const fullClass = match[1];
      const innerMatch = fullClass.match(/-\[(.+)\]$/);
      const innerVal = innerMatch ? innerMatch[1] : '';

      violations.push({
        type: 'arbitrary-class',
        line: lineNum,
        raw: fullClass,
        value: innerVal,
        message: `Arbitrary Tailwind class "${fullClass}" is prohibited. Use standard design tokens or semantic scale.`,
        suggestion: `Replace arbitrary bracket syntax with standard theme token (e.g. p-4, w-full, z-10).`
      });

      // If the arbitrary class is a color, also evaluate chromatic deviation
      const hexMatch = innerVal.match(HEX_COLOR_REGEX);
      if (hexMatch && palette.length > 0) {
        const hex = hexMatch[0];
        const closest = findClosestPaletteToken(hex, palette);
        if (closest) {
          if (closest.deltaE === 0) {
            // Exact color match, but arbitrary syntax
          } else if (closest.deltaE < 2.0) {
            violations.push({
              type: 'color-drift',
              line: lineNum,
              raw: hex,
              deltaE: closest.deltaE,
              nearestToken: closest.name,
              suggestion: `Replace value drift "${hex}" with existing brand token "${closest.name}" (${closest.hex}).`,
              message: `Value drift detected for "${hex}" (ΔE = ${closest.deltaE.toFixed(2)} < 2.0).`
            });
          } else {
            violations.push({
              type: 'unauthorized-color',
              line: lineNum,
              raw: hex,
              deltaE: closest.deltaE,
              nearestToken: closest.name,
              suggestion: `Replace unauthorized color "${hex}" with closest brand palette token "${closest.name}" (${closest.hex}).`,
              message: `Unauthorized chromatic deviation for "${hex}" (ΔE = ${closest.deltaE.toFixed(2)} >= 2.0).`
            });
          }
        }
      }
    }

    // ------------------------------------------------------------------------
    // B. Detect CSS / Inline Style Spacing Off-Scale (4px grid)
    // ------------------------------------------------------------------------
    const spacingRegex = new RegExp(SPACING_STYLE_REGEX);
    while ((match = spacingRegex.exec(lineText)) !== null) {
      const prop = match[1];
      const rawVal = match[2].trim();

      // Find pixel values
      const pxMatches = rawVal.match(/(-?[\d.]+)px/g);
      if (pxMatches) {
        for (const pxStr of pxMatches) {
          const num = parseFloat(pxStr);
          if (!isDivisibleBy4(num)) {
            const nearest4 = Math.round(num / 4) * 4;
            violations.push({
              type: 'off-scale',
              line: lineNum,
              prop,
              raw: `${prop}: ${rawVal}`,
              value: num,
              message: `Spacing value "${pxStr}" in property "${prop}" violates the 4px scale grid.`,
              suggestion: `Snap to 4px grid multiple (e.g. ${nearest4}px).`
            });
          }
        }
      }
    }

    // ------------------------------------------------------------------------
    // C. Detect CSS / Inline Style Color Deviations vs Brand Palette
    // ------------------------------------------------------------------------
    if (palette.length > 0) {
      const colorRegex = new RegExp(COLOR_DECLARATION_REGEX);
      while ((match = colorRegex.exec(lineText)) !== null) {
        const prop = match[1];
        const rawVal = match[2].trim();

        // Extract hex colors
        const hexes = rawVal.match(HEX_COLOR_REGEX);
        if (hexes) {
          for (const hex of hexes) {
            const closest = findClosestPaletteToken(hex, palette);
            if (closest) {
              if (closest.deltaE > 0 && closest.deltaE < 2.0) {
                violations.push({
                  type: 'color-drift',
                  line: lineNum,
                  prop,
                  raw: hex,
                  deltaE: closest.deltaE,
                  nearestToken: closest.name,
                  suggestion: `Replace value drift "${hex}" with brand token "${closest.name}" (${closest.hex}).`,
                  message: `Value drift detected for "${hex}" in "${prop}" (ΔE = ${closest.deltaE.toFixed(2)} < 2.0).`
                });
              } else if (closest.deltaE >= 2.0) {
                violations.push({
                  type: 'unauthorized-color',
                  line: lineNum,
                  prop,
                  raw: hex,
                  deltaE: closest.deltaE,
                  nearestToken: closest.name,
                  suggestion: `Replace unauthorized color "${hex}" with closest brand palette token "${closest.name}" (${closest.hex}).`,
                  message: `Unauthorized chromatic deviation for "${hex}" in "${prop}" (ΔE = ${closest.deltaE.toFixed(2)} >= 2.0).`
                });
              }
            }
          }
        }
      }
    }
  });

  return {
    valid: violations.length === 0,
    violations
  };
}

module.exports = {
  parseColorToRgb,
  rgbToLab,
  calculateDeltaE,
  extractBrandPalette,
  findClosestPaletteToken,
  isDivisibleBy4,
  lintStrictDesignTokens
};
