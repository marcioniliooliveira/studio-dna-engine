/**
 * Visual Saliency Attention Prediction Oracle (Requirement R4)
 * 
 * Simulates human ocular fixation in the initial 500ms of page viewing
 * using Itti-Koch / Bruce-Tsotsos inspired pre-attentive vision architecture:
 * 
 * 1. Multi-scale Luminance Conspicuity:
 *    I(x,y) = 0.299R + 0.587G + 0.114B
 * 2. Color Opponency:
 *    RG = |R - G| / max(25, I)
 *    BY = |B - (R+G)/2| / max(25, I)
 *    (Cones operate in photopic regime I >= 20; scotopic dark background suppressed)
 * 3. Orientation Energy:
 *    Multi-angle Sobel spatial gradients (0°, 45°, 90°, 135°)
 * 4. Center-Surround Contrast:
 *    Difference-of-Gaussians (DoG) across scales with 500ms foveal Gaussian center prior
 * 5. Primary CTA Optical Prominence:
 *    Score_CTA = (iint_CTA S(x,y) dx dy) / (iint_Viewport S(x,y) dx dy) >= 0.18
 *    CTA must rank within top 2 global attention peaks.
 * 6. Visual Clutter / Distraction Ratio:
 *    DistractionRatio = (iint_NonFunctional S(x,y) dx dy) / (iint_Functional S(x,y) dx dy) <= 0.35
 *    Detects and rejects AI-generated distractions, radioactive halos, and noisy background clutter.
 */

'use strict';

// 500ms Glance Acceptance Thresholds (Requirement R4)
const CTA_MIN_PROMINENCE = 0.18; // Score_CTA must capture >= 18% of early visual attention
const MAX_DISTRACTION_RATIO = 0.35; // DistractionRatio must be <= 0.35
const CTA_MAX_ATTENTION_RANK = 2; // CTA must rank in top 2 attention peaks

/**
 * Parses color string (hex, rgb, rgba) to [r, g, b, a] in 0-255 range.
 */
function parseColor(colorStr) {
  if (!colorStr) return [0, 0, 0, 255];
  if (Array.isArray(colorStr)) {
    return [
      colorStr[0] || 0,
      colorStr[1] || 0,
      colorStr[2] || 0,
      colorStr[3] !== undefined ? (colorStr[3] <= 1 ? Math.round(colorStr[3] * 255) : colorStr[3]) : 255
    ];
  }

  const str = String(colorStr).trim();
  if (str.startsWith('#')) {
    const hex = str.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16),
        255
      ];
    }
    if (hex.length >= 6) {
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
        hex.length >= 8 ? parseInt(hex.slice(6, 8), 16) : 255
      ];
    }
  }

  const rgbaMatch = str.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (rgbaMatch) {
    const aVal = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1.0;
    return [
      parseInt(rgbaMatch[1], 10),
      parseInt(rgbaMatch[2], 10),
      parseInt(rgbaMatch[3], 10),
      Math.round(aVal * 255)
    ];
  }

  return [0, 0, 0, 255];
}

/**
 * 1D Separable Gaussian Convolution Kernel
 */
function createGaussianKernel(sigma) {
  const radius = Math.max(1, Math.ceil(sigma * 2.5));
  const size = radius * 2 + 1;
  const kernel = new Float64Array(size);
  let sum = 0;
  const twoSigmaSq = 2 * sigma * sigma;

  for (let i = -radius; i <= radius; i++) {
    const val = Math.exp(-(i * i) / twoSigmaSq);
    kernel[i + radius] = val;
    sum += val;
  }

  for (let i = 0; i < size; i++) {
    kernel[i] /= sum;
  }

  return { kernel, radius };
}

/**
 * Applies 2D Separable Gaussian Blur to a grid.
 */
function gaussianBlur2D(grid, width, height, sigma) {
  if (sigma <= 0.1) return new Float64Array(grid);

  const { kernel, radius } = createGaussianKernel(sigma);
  const temp = new Float64Array(width * height);
  const result = new Float64Array(width * height);

  // Horizontal Pass
  for (let y = 0; y < height; y++) {
    const rowOffset = y * width;
    for (let x = 0; x < width; x++) {
      let acc = 0;
      for (let k = -radius; k <= radius; k++) {
        const nx = Math.min(Math.max(x + k, 0), width - 1);
        acc += grid[rowOffset + nx] * kernel[k + radius];
      }
      temp[rowOffset + x] = acc;
    }
  }

  // Vertical Pass
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let acc = 0;
      for (let k = -radius; k <= radius; k++) {
        const ny = Math.min(Math.max(y + k, 0), height - 1);
        acc += temp[ny * width + x] * kernel[k + radius];
      }
      result[y * width + x] = acc;
    }
  }

  return result;
}

/**
 * Computes Difference of Gaussians (DoG) for center-surround contrast.
 */
function computeDifferenceOfGaussians(grid, width, height, centerSigma, surroundSigma) {
  const center = gaussianBlur2D(grid, width, height, centerSigma);
  const surround = gaussianBlur2D(grid, width, height, surroundSigma);
  const len = width * height;
  const dog = new Float64Array(len);

  for (let i = 0; i < len; i++) {
    dog[i] = Math.abs(center[i] - surround[i]);
  }

  return dog;
}

/**
 * Visual Saliency Attention Prediction Oracle
 */
class VisualSaliencyOracle {
  /**
   * @param {object} [options]
   * @param {number} [options.gridWidth=160] - Internal analysis grid width
   * @param {number} [options.gridHeight=100] - Internal analysis grid height
   * @param {number} [options.ctaMinProminence=0.18] - Minimum CTA attention score
   * @param {number} [options.maxDistractionRatio=0.35] - Maximum non-functional distraction ratio
   * @param {number} [options.ctaMaxAttentionRank=2] - Maximum CTA peak rank
   */
  constructor(options = {}) {
    this.gridWidth = options.gridWidth || 160;
    this.gridHeight = options.gridHeight || 100;
    this.ctaMinProminence = options.ctaMinProminence !== undefined ? options.ctaMinProminence : CTA_MIN_PROMINENCE;
    this.maxDistractionRatio = options.maxDistractionRatio !== undefined ? options.maxDistractionRatio : MAX_DISTRACTION_RATIO;
    this.ctaMaxAttentionRank = options.ctaMaxAttentionRank !== undefined ? options.ctaMaxAttentionRank : CTA_MAX_ATTENTION_RANK;
  }

  /**
   * Computes perceptual luminance:
   * I(x, y) = 0.299R + 0.587G + 0.114B
   */
  computeLuminance(r, g, b) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  /**
   * Computes color opponency:
   * RG = |R - G| / max(25, I)
   * BY = |B - (R+G)/2| / max(25, I)
   * Enforces photopic vision (cones active at I >= 20; dark scotopic backgrounds suppressed).
   */
  computeColorOpponency(r, g, b, lum) {
    if (lum < 20) {
      return { rg: 0, by: 0 };
    }
    const safeLum = Math.max(25, lum);
    const rg = Math.abs(r - g) / safeLum;
    const yellow = (r + g) * 0.5;
    const by = Math.abs(b - yellow) / safeLum;
    return { rg, by };
  }

  /**
   * Computes multi-angle orientation energy across 0°, 45°, 90°, and 135° using spatial gradient convolution.
   */
  computeOrientationEnergy(lumGrid, width, height) {
    const len = width * height;
    const energy = new Float64Array(len);
    let maxVal = 1e-6;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;

        const p00 = lumGrid[(y - 1) * width + (x - 1)];
        const p01 = lumGrid[(y - 1) * width + x];
        const p02 = lumGrid[(y - 1) * width + (x + 1)];
        const p10 = lumGrid[y * width + (x - 1)];
        const p12 = lumGrid[y * width + (x + 1)];
        const p20 = lumGrid[(y + 1) * width + (x - 1)];
        const p21 = lumGrid[(y + 1) * width + x];
        const p22 = lumGrid[(y + 1) * width + (x + 1)];

        // Horizontal Sobel (0°)
        const gx = (p02 + 2 * p12 + p22) - (p00 + 2 * p10 + p20);
        // Vertical Sobel (90°)
        const gy = (p20 + 2 * p21 + p22) - (p00 + 2 * p01 + p02);
        // Diagonal 45°
        const g45 = (p01 + 2 * p02 + p12) - (p10 + 2 * p20 + p21);
        // Diagonal 135°
        const g135 = (p01 + 2 * p00 + p10) - (p21 + 2 * p22 + p12);

        const mag = Math.sqrt(gx * gx + gy * gy + 0.5 * (g45 * g45 + g135 * g135));
        energy[idx] = mag;
        if (mag > maxVal) maxVal = mag;
      }
    }

    for (let i = 0; i < len; i++) {
      energy[i] /= maxVal;
    }

    return energy;
  }

  /**
   * Computes 500ms Gaussian central foveal fixation prior:
   * G_fovea(x, y) = exp( - (x - xc)^2 / (2 * sigmaX^2) - (y - yc)^2 / (2 * sigmaY^2) )
   */
  computeFovealPrior(width, height) {
    const len = width * height;
    const fovea = new Float64Array(len);
    const xc = width * 0.5;
    const yc = height * 0.48; // Slight upper-center glance preference
    const sigmaX = width * 0.32;
    const sigmaY = height * 0.30;
    const twoSigXSq = 2 * sigmaX * sigmaX;
    const twoSigYSq = 2 * sigmaY * sigmaY;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - xc;
        const dy = y - yc;
        fovea[y * width + x] = Math.exp(-(dx * dx) / twoSigXSq - (dy * dy) / twoSigYSq);
      }
    }

    return fovea;
  }

  /**
   * Computes comprehensive visual saliency map S(x, y) from an RGBA buffer.
   * 
   * @param {Buffer|Uint8Array|Float64Array} rgbaBuffer - Image pixel buffer
   * @param {number} srcWidth - Source width
   * @param {number} srcHeight - Source height
   * @returns {{ saliencyMap: Float64Array, width: number, height: number, maxSaliency: number }}
   */
  computeSaliencyMap(rgbaBuffer, srcWidth, srcHeight) {
    const gw = this.gridWidth;
    const gh = this.gridHeight;
    const len = gw * gh;

    const lumGrid = new Float64Array(len);
    const rgGrid = new Float64Array(len);
    const byGrid = new Float64Array(len);

    const scaleX = srcWidth / gw;
    const scaleY = srcHeight / gh;

    // 1. Resample and extract Luminance & Photopic Color Opponency
    for (let gy = 0; gy < gh; gy++) {
      const sy = Math.min(Math.floor(gy * scaleY), srcHeight - 1);
      for (let gx = 0; gx < gw; gx++) {
        const sx = Math.min(Math.floor(gx * scaleX), srcWidth - 1);
        const pixelIdx = (sy * srcWidth + sx) * 4;

        const r = rgbaBuffer[pixelIdx + 0];
        const g = rgbaBuffer[pixelIdx + 1];
        const b = rgbaBuffer[pixelIdx + 2];

        const lum = this.computeLuminance(r, g, b);
        const opp = this.computeColorOpponency(r, g, b, lum);

        const gIdx = gy * gw + gx;
        lumGrid[gIdx] = lum;
        rgGrid[gIdx] = opp.rg;
        byGrid[gIdx] = opp.by;
      }
    }

    // 2. Compute Orientation Energy
    const orientGrid = this.computeOrientationEnergy(lumGrid, gw, gh);

    // 3. Multi-scale Center-Surround Contrast (DoG)
    const dogLum = computeDifferenceOfGaussians(lumGrid, gw, gh, 1.2, 3.6);
    const dogRg = computeDifferenceOfGaussians(rgGrid, gw, gh, 1.5, 4.5);
    const dogBy = computeDifferenceOfGaussians(byGrid, gw, gh, 1.5, 4.5);
    const dogOrient = computeDifferenceOfGaussians(orientGrid, gw, gh, 1.5, 4.5);

    // 4. Per-channel Normalization (Itti-Koch Conspicuity Channels)
    let maxL = 1e-6, maxC = 1e-6, maxO = 1e-6;
    const cColor = new Float64Array(len);

    for (let i = 0; i < len; i++) {
      if (dogLum[i] > maxL) maxL = dogLum[i];
      const cVal = dogRg[i] + dogBy[i];
      cColor[i] = cVal;
      if (cVal > maxC) maxC = cVal;
      if (dogOrient[i] > maxO) maxO = dogOrient[i];
    }

    // 5. Combine Channels and Apply 500ms Foveal Center Prior
    const fovealPrior = this.computeFovealPrior(gw, gh);
    const saliencyMap = new Float64Array(len);
    let maxS = 1e-6;

    for (let i = 0; i < len; i++) {
      const normL = dogLum[i] / maxL;
      const normC = cColor[i] / maxC;
      const normO = dogOrient[i] / maxO;

      // Saturated color pop-out (0.50), luminance edge contrast (0.25), orientation energy (0.25)
      const combinedConspic = 0.25 * normL + 0.50 * normC + 0.25 * normO;
      const sVal = combinedConspic * (0.25 + 0.75 * fovealPrior[i]);
      saliencyMap[i] = sVal;
      if (sVal > maxS) maxS = sVal;
    }

    // Normalize final saliency map to [0, 1]
    for (let i = 0; i < len; i++) {
      saliencyMap[i] /= maxS;
    }

    return {
      saliencyMap,
      width: gw,
      height: gh,
      maxSaliency: maxS
    };
  }

  /**
   * Finds local attention peaks in the saliency map.
   */
  findAttentionPeaks(saliencyMap, width, height, threshold = 0.15) {
    const peaks = [];
    const minSeparation = 4; // grid cells

    for (let y = 2; y < height - 2; y++) {
      for (let x = 2; x < width - 2; x++) {
        const val = saliencyMap[y * width + x];
        if (val < threshold) continue;

        let isPeak = true;
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            if (dx === 0 && dy === 0) continue;
            if (saliencyMap[(y + dy) * width + (x + dx)] > val) {
              isPeak = false;
              break;
            }
          }
          if (!isPeak) break;
        }

        if (isPeak) {
          let tooClose = false;
          for (const existing of peaks) {
            const dist = Math.hypot(existing.x - x, existing.y - y);
            if (dist < minSeparation) {
              tooClose = true;
              break;
            }
          }

          if (!tooClose) {
            peaks.push({ x, y, value: val });
          }
        }
      }
    }

    peaks.sort((a, b) => b.value - a.value);
    return peaks.map((p, idx) => ({ ...p, rank: idx + 1 }));
  }

  /**
   * Maps AABB rectangle from viewport coordinates to analysis grid coordinates.
   */
  mapBoundsToGrid(bounds, viewportWidth, viewportHeight, gridWidth, gridHeight) {
    if (!bounds) return null;
    const x = bounds.x !== undefined ? bounds.x : (bounds.left || 0);
    const y = bounds.y !== undefined ? bounds.y : (bounds.top || 0);
    const w = bounds.width || bounds.w || 0;
    const h = bounds.height || bounds.h || 0;

    const scaleX = gridWidth / viewportWidth;
    const scaleY = gridHeight / viewportHeight;

    const gx1 = Math.max(0, Math.floor(x * scaleX));
    const gy1 = Math.max(0, Math.floor(y * scaleY));
    const gx2 = Math.min(gridWidth - 1, Math.ceil((x + w) * scaleX));
    const gy2 = Math.min(gridHeight - 1, Math.ceil((y + h) * scaleY));

    return {
      x1: gx1,
      y1: gy1,
      x2: gx2,
      y2: gy2,
      width: Math.max(1, gx2 - gx1 + 1),
      height: Math.max(1, gy2 - gy1 + 1)
    };
  }

  /**
   * Evaluates early visual attention metrics against Requirement R4 criteria.
   * 
   * @param {object} params
   * @param {Float64Array} params.saliencyMap - 2D saliency grid
   * @param {number} params.gridWidth - Grid width
   * @param {number} params.gridHeight - Grid height
   * @param {number} params.viewportWidth - CSS Viewport width
   * @param {number} params.viewportHeight - CSS Viewport height
   * @param {object} params.ctaBounds - Primary CTA bounding box { x, y, width, height }
   * @param {Array<object>} [params.functionalBounds=[]] - Functional elements bounding boxes
   * @param {Array<object>} [params.nonFunctionalBounds=[]] - Non-functional / clutter bounding boxes
   * @returns {object} Analysis result meeting SaliencyAnalysisResult contract
   */
  evaluateAttention({
    saliencyMap,
    gridWidth,
    gridHeight,
    viewportWidth,
    viewportHeight,
    ctaBounds,
    functionalBounds = [],
    nonFunctionalBounds = []
  }) {
    const gw = gridWidth;
    const gh = gridHeight;
    const totalCells = gw * gh;

    // 1. Total Viewport Saliency Integral: iint_Viewport S(x,y) dx dy
    let viewportIntegral = 0;
    for (let i = 0; i < totalCells; i++) {
      viewportIntegral += saliencyMap[i];
    }
    viewportIntegral = Math.max(1e-6, viewportIntegral);

    // 2. Map CTA bounds to grid
    const ctaGrid = this.mapBoundsToGrid(ctaBounds, viewportWidth, viewportHeight, gw, gh);
    let ctaIntegral = 0;

    const isCtaCell = new Uint8Array(totalCells);
    const isFunctionalCell = new Uint8Array(totalCells);
    const isNonFunctionalCell = new Uint8Array(totalCells);

    if (ctaGrid) {
      for (let y = ctaGrid.y1; y <= ctaGrid.y2; y++) {
        for (let x = ctaGrid.x1; x <= ctaGrid.x2; x++) {
          const idx = y * gw + x;
          isCtaCell[idx] = 1;
          isFunctionalCell[idx] = 1;
          ctaIntegral += saliencyMap[idx];
        }
      }
    }

    // 3. Map additional functional elements
    for (const fb of functionalBounds) {
      const g = this.mapBoundsToGrid(fb, viewportWidth, viewportHeight, gw, gh);
      if (!g) continue;
      for (let y = g.y1; y <= g.y2; y++) {
        for (let x = g.x1; x <= g.x2; x++) {
          const idx = y * gw + x;
          isFunctionalCell[idx] = 1;
        }
      }
    }

    // 4. Map explicit non-functional elements
    const hasExplicitNonFunctional = nonFunctionalBounds && nonFunctionalBounds.length > 0;
    if (hasExplicitNonFunctional) {
      for (const nfb of nonFunctionalBounds) {
        const g = this.mapBoundsToGrid(nfb, viewportWidth, viewportHeight, gw, gh);
        if (!g) continue;
        for (let y = g.y1; y <= g.y2; y++) {
          for (let x = g.x1; x <= g.x2; x++) {
            const idx = y * gw + x;
            isNonFunctionalCell[idx] = 1;
          }
        }
      }
    }

    // 5. Integrate Functional & Non-Functional Saliency
    let functionalIntegral = 0;
    let nonFunctionalIntegral = 0;

    for (let i = 0; i < totalCells; i++) {
      const sVal = saliencyMap[i];
      if (isFunctionalCell[i]) {
        functionalIntegral += sVal;
      } else if (hasExplicitNonFunctional) {
        if (isNonFunctionalCell[i]) {
          nonFunctionalIntegral += sVal;
        }
      } else {
        // When no explicit non-functional regions are passed,
        // measure background visual clutter located outside the foveal contour of functional elements
        const gx = i % gw;
        const gy = Math.floor(i / gw);
        let nearFunctional = false;

        if (ctaGrid) {
          const dx = Math.max(0, ctaGrid.x1 - gx, gx - ctaGrid.x2);
          const dy = Math.max(0, ctaGrid.y1 - gy, gy - ctaGrid.y2);
          if (Math.hypot(dx, dy) <= 3) nearFunctional = true;
        }

        if (!nearFunctional) {
          for (const fb of functionalBounds) {
            const g = this.mapBoundsToGrid(fb, viewportWidth, viewportHeight, gw, gh);
            if (!g) continue;
            const dx = Math.max(0, g.x1 - gx, gx - g.x2);
            const dy = Math.max(0, g.y1 - gy, gy - g.y2);
            if (Math.hypot(dx, dy) <= 3) {
              nearFunctional = true;
              break;
            }
          }
        }

        if (!nearFunctional && sVal > 0.40) {
          nonFunctionalIntegral += sVal;
        }
      }
    }

    functionalIntegral = Math.max(1e-6, functionalIntegral);

    // 6. Primary CTA Optical Prominence: Score_CTA = iint_CTA S / iint_Viewport S
    const scoreCta = ctaIntegral / viewportIntegral;

    // 7. Visual Clutter / Distraction Ratio: iint_NonFunctional S / iint_Functional S
    const distractionRatio = nonFunctionalIntegral / functionalIntegral;

    // 8. Find Attention Peaks and Determine CTA Rank
    const peaks = this.findAttentionPeaks(saliencyMap, gw, gh);
    let ctaAttentionRank = peaks.length + 1;

    for (let i = 0; i < peaks.length; i++) {
      const peak = peaks[i];
      const peakIdx = peak.y * gw + peak.x;
      const insideCta = isCtaCell[peakIdx] === 1 || (
        ctaGrid &&
        peak.x >= ctaGrid.x1 - 2 && peak.x <= ctaGrid.x2 + 2 &&
        peak.y >= ctaGrid.y1 - 2 && peak.y <= ctaGrid.y2 + 2
      );

      peak.isCta = Boolean(insideCta);
      if (insideCta && ctaAttentionRank > (i + 1)) {
        ctaAttentionRank = i + 1;
      }
    }

    // 9. Evaluate Acceptance Criteria
    const violations = [];
    if (scoreCta < this.ctaMinProminence) {
      violations.push(
        `CTA_PROMINENCE_DEFICIT: Primary CTA captured only ${(scoreCta * 100).toFixed(1)}% optical attention (minimum required: ${(this.ctaMinProminence * 100).toFixed(1)}%)`
      );
    }

    if (distractionRatio > this.maxDistractionRatio) {
      violations.push(
        `VISUAL_CLUTTER_EXCEEDED: Non-functional distraction ratio (${distractionRatio.toFixed(3)}) exceeds maximum allowed of ${this.maxDistractionRatio.toFixed(3)}`
      );
    }

    if (ctaAttentionRank > this.ctaMaxAttentionRank) {
      violations.push(
        `CTA_ATTENTION_RANK_DEFICIT: Primary CTA ranks #${ctaAttentionRank} in early ocular attention (must rank within top ${this.ctaMaxAttentionRank})`
      );
    }

    const passed = violations.length === 0;

    return {
      passed,
      scoreCta: Number(scoreCta.toFixed(4)),
      distractionRatio: Number(distractionRatio.toFixed(4)),
      ctaAttentionRank,
      peaks: peaks.slice(0, 5),
      details: {
        ctaIntegral: Number(ctaIntegral.toFixed(2)),
        viewportIntegral: Number(viewportIntegral.toFixed(2)),
        functionalIntegral: Number(functionalIntegral.toFixed(2)),
        nonFunctionalIntegral: Number(nonFunctionalIntegral.toFixed(2)),
        peakCount: peaks.length
      },
      violations
    };
  }

  /**
   * Rasterizes semantic layout primitives into an RGBA pixel buffer.
   */
  rasterizeLayout({ viewport = { width: 1440, height: 900 }, elements = [] } = {}) {
    const width = viewport.width || 1440;
    const height = viewport.height || 900;
    const buffer = Buffer.alloc(width * height * 4);

    let bgR = 15, bgG = 23, bgB = 42, bgA = 255; // #0F172A

    const bgElem = elements.find(e => e.type === 'background');
    if (bgElem) {
      [bgR, bgG, bgB, bgA] = parseColor(bgElem.color || bgElem.background || '#0F172A');
    }

    for (let i = 0; i < width * height; i++) {
      const idx = i * 4;
      buffer[idx + 0] = bgR;
      buffer[idx + 1] = bgG;
      buffer[idx + 2] = bgB;
      buffer[idx + 3] = bgA;
    }

    for (const elem of elements) {
      if (elem.type === 'background') continue;

      if (elem.type === 'halo' || elem.type === 'glow' || elem.type === 'spotlight') {
        const cx = elem.x !== undefined ? elem.x : (elem.cx || 0);
        const cy = elem.y !== undefined ? elem.y : (elem.cy || 0);
        const radius = elem.radius || elem.r || 200;
        const [hr, hg, hb, ha] = parseColor(elem.color || elem.background || '#1677FF');
        const peakAlpha = ha / 255;

        const xMin = Math.max(0, Math.floor(cx - radius));
        const xMax = Math.min(width - 1, Math.ceil(cx + radius));
        const yMin = Math.max(0, Math.floor(cy - radius));
        const yMax = Math.min(height - 1, Math.ceil(cy + radius));

        for (let y = yMin; y <= yMax; y++) {
          for (let x = xMin; x <= xMax; x++) {
            const dist = Math.hypot(x - cx, y - cy);
            if (dist > radius) continue;

            const t = dist / radius;
            const factor = Math.cos(t * Math.PI * 0.5) * peakAlpha;
            const idx = (y * width + x) * 4;

            buffer[idx + 0] = Math.round(buffer[idx + 0] * (1 - factor) + hr * factor);
            buffer[idx + 1] = Math.round(buffer[idx + 1] * (1 - factor) + hg * factor);
            buffer[idx + 2] = Math.round(buffer[idx + 2] * (1 - factor) + hb * factor);
          }
        }
      } else if (elem.type === 'noise' || elem.type === 'mesh_clutter') {
        const xMin = Math.max(0, elem.x || 0);
        const yMin = Math.max(0, elem.y || 0);
        const xMax = Math.min(width - 1, (elem.x || 0) + (elem.width || width));
        const yMax = Math.min(height - 1, (elem.y || 0) + (elem.height || height));
        const intensity = elem.intensity !== undefined ? elem.intensity : 0.5;

        for (let y = yMin; y <= yMax; y++) {
          for (let x = xMin; x <= xMax; x++) {
            if (((x * 17 + y * 31) % 11) === 0) {
              const idx = (y * width + x) * 4;
              const nVal = ((x ^ y) & 0xFF) * intensity;
              buffer[idx + 0] = Math.min(255, buffer[idx + 0] + nVal);
              buffer[idx + 1] = Math.min(255, buffer[idx + 1] + nVal);
              buffer[idx + 2] = Math.min(255, buffer[idx + 2] + nVal);
            }
          }
        }
      } else {
        const ex = elem.x !== undefined ? elem.x : (elem.left || 0);
        const ey = elem.y !== undefined ? elem.y : (elem.top || 0);
        const ew = elem.width || 0;
        const eh = elem.height || 0;
        const [fr, fg, fb, fa] = parseColor(elem.background || elem.color || '#FFFFFF');
        const alpha = fa / 255;

        const xMin = Math.max(0, Math.floor(ex));
        const xMax = Math.min(width - 1, Math.ceil(ex + ew));
        const yMin = Math.max(0, Math.floor(ey));
        const yMax = Math.min(height - 1, Math.ceil(ey + eh));

        for (let y = yMin; y <= yMax; y++) {
          for (let x = xMin; x <= xMax; x++) {
            const idx = (y * width + x) * 4;
            buffer[idx + 0] = Math.round(buffer[idx + 0] * (1 - alpha) + fr * alpha);
            buffer[idx + 1] = Math.round(buffer[idx + 1] * (1 - alpha) + fg * alpha);
            buffer[idx + 2] = Math.round(buffer[idx + 2] * (1 - alpha) + fb * alpha);
          }
        }
      }
    }

    return { buffer, width, height };
  }

  /**
   * Analyzes early visual attention from an RGBA image buffer.
   * 
   * @param {Buffer|Uint8Array} imageBuffer - RGBA pixel buffer
   * @param {number} width - Viewport image width
   * @param {number} height - Viewport image height
   * @param {object} layout - Layout definitions { cta, functionalElements, nonFunctionalElements }
   * @returns {object} SaliencyAnalysisResult
   */
  analyzeImage(imageBuffer, width, height, layout = {}) {
    const { saliencyMap } = this.computeSaliencyMap(imageBuffer, width, height);

    return this.evaluateAttention({
      saliencyMap,
      gridWidth: this.gridWidth,
      gridHeight: this.gridHeight,
      viewportWidth: width,
      viewportHeight: height,
      ctaBounds: layout.cta || layout.ctaBounds,
      functionalBounds: layout.functionalElements || layout.functionalBounds || [],
      nonFunctionalBounds: layout.nonFunctionalElements || layout.nonFunctionalBounds || []
    });
  }

  /**
   * Full orchestration: rasterizes layout and evaluates early optical attention.
   * 
   * @param {object} layoutConfig
   * @param {object} [layoutConfig.viewport={ width: 1440, height: 900 }]
   * @param {Array<object>} layoutConfig.elements
   * @param {string} [layoutConfig.ctaId='cta']
   * @returns {object} SaliencyAnalysisResult
   */
  analyzeLayout(layoutConfig = {}) {
    const viewport = layoutConfig.viewport || { width: 1440, height: 900 };
    const elements = layoutConfig.elements || [];
    const ctaId = layoutConfig.ctaId || 'cta';

    const ctaElem = elements.find(e => e.id === ctaId || e.role === 'primary-cta' || e.isCta);
    if (!ctaElem) {
      throw new Error(`VisualSaliencyOracle: Primary CTA element not found in layout (id="${ctaId}")`);
    }

    const ctaBounds = {
      x: ctaElem.x !== undefined ? ctaElem.x : ctaElem.left,
      y: ctaElem.y !== undefined ? ctaElem.y : ctaElem.top,
      width: ctaElem.width,
      height: ctaElem.height
    };

    const functionalBounds = elements
      .filter(e => e !== ctaElem && (e.role === 'functional' || e.role === 'headline' || e.role === 'input' || e.type === 'text'))
      .map(e => ({
        x: e.x !== undefined ? e.x : e.left,
        y: e.y !== undefined ? e.y : e.top,
        width: e.width,
        height: e.height
      }));

    const nonFunctionalBounds = elements
      .filter(e => e.role === 'non-functional' || e.type === 'halo' || e.type === 'glow' || e.type === 'noise')
      .map(e => ({
        x: e.x !== undefined ? e.x : (e.cx ? e.cx - (e.radius || 200) : 0),
        y: e.y !== undefined ? e.y : (e.cy ? e.cy - (e.radius || 200) : 0),
        width: e.width || (e.radius ? e.radius * 2 : 200),
        height: e.height || (e.radius ? e.radius * 2 : 200)
      }));

    const { buffer, width, height } = this.rasterizeLayout({ viewport, elements });

    return this.analyzeImage(buffer, width, height, {
      cta: ctaBounds,
      functionalElements: functionalBounds,
      nonFunctionalElements: nonFunctionalBounds
    });
  }

  /**
   * Helper: creates a clean, well-structured high-contrast CTA layout fixture.
   */
  static createCleanFixture(options = {}) {
    const vp = options.viewport || { width: 1440, height: 900 };
    return {
      viewport: vp,
      ctaId: 'cta',
      elements: [
        { type: 'background', color: '#0B0F19' }, // Calm dark background
        {
          id: 'headline',
          role: 'functional',
          type: 'text',
          x: vp.width * 0.35,
          y: vp.height * 0.32,
          width: vp.width * 0.30,
          height: 28,
          color: '#94A3B8'
        },
        {
          id: 'cta',
          role: 'primary-cta',
          type: 'button',
          x: vp.width * 0.36,
          y: vp.height * 0.44,
          width: vp.width * 0.28,
          height: 72,
          background: '#A3E635', // High-contrast JumpPlay volt lime
          color: '#0B0F19'
        }
      ]
    };
  }

  /**
   * Helper: creates a cluttered layout fixture with radioactive halos and high-frequency non-functional noise.
   */
  static createClutteredHaloFixture(options = {}) {
    const vp = options.viewport || { width: 1440, height: 900 };
    return {
      viewport: vp,
      ctaId: 'cta',
      elements: [
        { type: 'background', color: '#0B0F19' },
        {
          id: 'headline',
          role: 'functional',
          type: 'text',
          x: vp.width * 0.35,
          y: vp.height * 0.32,
          width: vp.width * 0.30,
          height: 28,
          color: '#94A3B8'
        },
        {
          id: 'cta',
          role: 'primary-cta',
          type: 'button',
          x: vp.width * 0.36,
          y: vp.height * 0.44,
          width: vp.width * 0.28,
          height: 72,
          background: '#334155', // Muted low-contrast CTA
          color: '#94A3B8'
        },
        // Radioactive Chromatic Halo (dark-glow anti-pattern in background corner)
        {
          id: 'radioactive-halo-1',
          role: 'non-functional',
          type: 'halo',
          cx: vp.width * 0.85,
          cy: vp.height * 0.25,
          radius: 320,
          color: 'rgba(22, 119, 255, 0.95)' // Saturated neon blue halo
        },
        // Second distracting chromatic halo
        {
          id: 'radioactive-halo-2',
          role: 'non-functional',
          type: 'halo',
          cx: vp.width * 0.15,
          cy: vp.height * 0.75,
          radius: 280,
          color: 'rgba(163, 230, 53, 0.90)' // Saturated volt lime halo
        },
        // Non-functional background noise
        {
          id: 'bg-mesh-clutter',
          role: 'non-functional',
          type: 'noise',
          x: 0,
          y: 0,
          width: vp.width,
          height: vp.height,
          intensity: 0.85
        }
      ]
    };
  }
}

module.exports = {
  CTA_MIN_PROMINENCE,
  MAX_DISTRACTION_RATIO,
  CTA_MAX_ATTENTION_RANK,
  parseColor,
  gaussianBlur2D,
  computeDifferenceOfGaussians,
  VisualSaliencyOracle
};
