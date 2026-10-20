/**
 * Constraint Engine: Resolves parameter deltas through DAG dependency graphs and specialized constraint handlers.
 */

const { DependencyGraph } = require('./graph.js');
const { resolveTypographySafeArea } = require('./typography.js');
const {
  resolveBackgroundProductContrast,
  calcAPCA,
  searchMonotonicContrast,
  fontLookupAPCA,
  solveOptimalScrimOpacity
} = require('./contrast.js');
const { resolveViewportCameraRig, resolveCollectionGeometry } = require('./geometry.js');
const { resolveMotionReducedScaling } = require('./motion.js');
const { resolvePerformanceFpsTier } = require('./performance.js');

class ConstraintEngine {
  constructor(dnaIr) {
    this.dnaIr = dnaIr;
    this.graph = DependencyGraph.fromDnaIr(dnaIr);
    this.parameters = new Map((dnaIr?.parameters || []).map(p => [p.id, p]));
    this.constraints = dnaIr?.constraints || [];
  }

  resolveDelta(delta = {}) {
    const resolvedDelta = { ...delta };
    const derivedCompensations = {};
    const errors = [];

    // 1. Check Background Color ↔ Product Lighting Constraint
    if (resolvedDelta['hero.surface.ambientDarkness']) {
      const bgHex = resolvedDelta['hero.surface.ambientDarkness'];
      const contrastRes = resolveBackgroundProductContrast(bgHex);
      if (!contrastRes.valid) {
        errors.push(contrastRes.reason);
      } else {
        derivedCompensations['hero.product.rimLightCompensation'] = contrastRes.compensatedRimLight;
        derivedCompensations['hero.surface.backdropToneMultiplier'] = contrastRes.compensatedBackdropTone;
      }
    }

    // 2. Check Typography ↔ SafeArea Containment Constraint
    if (resolvedDelta['hero.copy.claim']) {
      const claimText = resolvedDelta['hero.copy.claim'];
      const typoRes = resolveTypographySafeArea(claimText, 36, 320, 22);
      if (typoRes.compensated) {
        derivedCompensations['hero.typography.claimFontSizePx'] = typoRes.compensatedFontSizePx;
        derivedCompensations['hero.typography.claimWrap'] = typoRes.recommendedWrap;
      }
    }

    // 3. Check Viewport Constraint if present
    if (resolvedDelta['viewport.aspectRatio']) {
      const ratio = Number(resolvedDelta['viewport.aspectRatio']);
      const geoRes = resolveViewportCameraRig(ratio);
      derivedCompensations['camera.fov'] = geoRes.fov;
      derivedCompensations['camera.distance'] = geoRes.distance;
      derivedCompensations['hero.layout.safeAreaOffset'] = geoRes.safeAreaOffset;
    }

    // 4. Check Motion Constraint if present
    if (resolvedDelta['prefers-reduced-motion'] !== undefined) {
      const motionRes = resolveMotionReducedScaling(Boolean(resolvedDelta['prefers-reduced-motion']));
      derivedCompensations['motion.damp'] = motionRes.damp;
      derivedCompensations['motion.enableFbmDrift'] = motionRes.enableFbmDrift;
    }

    // 5. Check Performance Constraint if present
    if (resolvedDelta['runtime.fps'] !== undefined) {
      const perfRes = resolvePerformanceFpsTier(Number(resolvedDelta['runtime.fps']));
      derivedCompensations['rendering.tier'] = perfRes.tier;
      derivedCompensations['shader.fbmNoise.active'] = perfRes.fbmNoiseActive;
      derivedCompensations['postprocessing.bloom.active'] = perfRes.bloomActive;
    }

    // 6. Check Collection Cardinality ↔ Layout Geometry Constraint if present
    for (const [key, val] of Object.entries(resolvedDelta)) {
      if (key === 'collection.cardinality' || key.endsWith('.cardinality') || key === 'collection.items.count') {
        const count = Number(val);
        const collRes = resolveCollectionGeometry(count);
        derivedCompensations['collection.layoutMode'] = collRes.layoutMode;
        derivedCompensations['collection.columns'] = collRes.columns;
        derivedCompensations['collection.scrollPinMultiplier'] = collRes.scrollPinMultiplier;
        derivedCompensations['collection.paginationRequired'] = collRes.paginationRequired;
        derivedCompensations['collection.pages'] = collRes.pages;
      }
    }

    // 7. Dynamic constraints traversal if defined in dnaIr.constraints
    if (Array.isArray(this.constraints)) {
      for (const c of this.constraints) {
        if (!c.inputs || !c.inputs.some(k => k in resolvedDelta)) continue;
        if (c.type === 'apca-contrast') {
          const bgVal = resolvedDelta[c.backgroundParam] || this.dnaIr?.tokens?.[c.backgroundParam];
          const fgVal = resolvedDelta[c.foregroundParam] || this.dnaIr?.tokens?.[c.foregroundParam];
          if (bgVal && fgVal) {
            const lc = calcAPCA(fgVal, bgVal);
            if (Math.abs(lc) < (c.targetThreshold || 60)) {
              if (c.autoCompensate) {
                const compliant = searchMonotonicContrast(bgVal, c.targetThreshold || 60, c.role || 'body');
                if (compliant?.hex) {
                  derivedCompensations[c.foregroundParam] = compliant.hex;
                  resolvedDelta[c.foregroundParam] = compliant.hex;
                }
              } else {
                errors.push(c.errorMessage || `APCA contrast violation: Lc ${lc.toFixed(1)} < ${c.targetThreshold}`);
              }
            }
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      resolvedDelta,
      derivedCompensations,
      errors: errors.length > 0 ? errors : undefined
    };
  }
}

module.exports = {
  ConstraintEngine,
  resolveTypographySafeArea,
  resolveBackgroundProductContrast,
  resolveViewportCameraRig,
  resolveCollectionGeometry,
  resolveMotionReducedScaling,
  resolvePerformanceFpsTier,
  calcAPCA,
  searchMonotonicContrast,
  fontLookupAPCA,
  solveOptimalScrimOpacity
};
