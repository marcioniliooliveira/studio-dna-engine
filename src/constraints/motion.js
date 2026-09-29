/**
 * C4 Constraint: Motion ↔ Accessibility / Reduced Motion Scaling
 * Scales kinetic velocity, damping and drift when prefers-reduced-motion is requested.
 */

function resolveMotionReducedScaling(prefersReducedMotion, baseDamp = 0.12, baseDuration = 0.8) {
  if (prefersReducedMotion === true) {
    return {
      prefersReducedMotion: true,
      damp: 1.0, // Instant camera snapping, zero lag
      duration: 0.01, // Near-zero duration for instant transitions
      enableFbmDrift: false, // Freeze animated FBM smoke shader drift
      allowTranslations: false, // Disallow bouncy spring displacements
      staggerDelay: 0.0 // Eliminate key-by-key staggered falling animations
    };
  }

  return {
    prefersReducedMotion: false,
    damp: baseDamp,
    duration: baseDuration,
    enableFbmDrift: true,
    allowTranslations: true,
    staggerDelay: 0.0165
  };
}

module.exports = { resolveMotionReducedScaling };
