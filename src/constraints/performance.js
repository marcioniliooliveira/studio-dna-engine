/**
 * C5 Constraint: Performance ↔ Rendering Tier Fallback
 * Monitors runtime FPS and gracefully degrades shader complexity and post-processing without dropping essential design invariants.
 */

function resolvePerformanceFpsTier(observedFps, currentTier = 'HIGH') {
  if (typeof observedFps !== 'number') observedFps = 60;

  if (observedFps >= 50) {
    return {
      tier: 'HIGH',
      observedFps,
      fbmNoiseActive: true,
      bloomActive: true,
      bokehActive: true,
      barsActive: true,
      antialias: true
    };
  }

  if (observedFps >= 30) {
    return {
      tier: 'MEDIUM',
      observedFps,
      fbmNoiseActive: true,
      bloomActive: false, // Turn off heavy bloom pass first
      bokehActive: false,
      barsActive: true,
      antialias: true
    };
  }

  // Low performance tier (< 30 fps)
  return {
    tier: 'LOW',
    observedFps,
    fbmNoiseActive: false, // Turn off expensive full-screen FBM procedural noise
    bloomActive: false,
    bokehActive: false,
    barsActive: true, // Keep 16 physical tone bars - essential design invariant
    antialias: false,
    degradedGracefully: true,
    reason: `Observed FPS (${observedFps}) below 30 threshold; disabled volumetric FBM and post-processing passes`
  };
}

module.exports = { resolvePerformanceFpsTier };
