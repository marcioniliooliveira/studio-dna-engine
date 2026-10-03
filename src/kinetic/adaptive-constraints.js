/**
 * src/kinetic/adaptive-constraints.js
 * 
 * Requirement R2: Viewport & Motion Adaptive Rig Constraints
 * - C3 Viewport Adaptation: in portrait viewports (W/H < 1.0), compensates FOV (24° -> 38°),
 *   pulls camera distance back 1.35x, and applies downward safe-area translation (+0.15m).
 * - C4 Reduced Motion Adaptation: snaps camera when prefers-reduced-motion is active
 *   (damp: 1.0, duration: 0.01s), freezing noise/FBM shaders.
 */

'use strict';

/**
 * C3 Constraint: Viewport Aspect Ratio ↔ Camera Rig Adaptation
 * 
 * @param {number} aspectRatio Viewport width / height
 * @param {number} [baseFov=24] Base landscape FOV in degrees
 * @param {number} [baseDistance=2.4] Base camera distance in meters
 * @returns {{
 *   portrait: boolean,
 *   aspectRatio: number,
 *   fov: number,
 *   distance: number,
 *   safeAreaOffset: number
 * }}
 */
function resolveViewportCameraRig(aspectRatio, baseFov = 24, baseDistance = 2.4) {
  const ratio = Math.max(0.1, Number(aspectRatio) || 1.0);
  const isPortrait = ratio < 1.0;

  if (!isPortrait) {
    return {
      portrait: false,
      aspectRatio: ratio,
      fov: baseFov,
      distance: baseDistance,
      safeAreaOffset: 0
    };
  }

  // In portrait mobile (e.g., 390 / 844 ~ 0.46), narrow horizontal width clips
  // the wide 68-key aspect ratio. Widen FOV and pull camera back.
  const invRatio = Math.min(2.4, 1.0 / Math.max(0.4, ratio));
  const compensatedFov = Math.min(38, Math.round(baseFov * (1.0 + (invRatio - 1.0) * 0.42)));
  const compensatedDistance = Number((baseDistance * 1.35).toFixed(2));
  const safeAreaOffset = 0.15; // 150mm vertical translation shift downward

  return {
    portrait: true,
    aspectRatio: ratio,
    fov: compensatedFov,
    distance: compensatedDistance,
    safeAreaOffset
  };
}

/**
 * C4 Constraint: Motion Accessibility ↔ Reduced Motion Scaling
 * 
 * @param {boolean} prefersReducedMotion True if user requests reduced motion
 * @param {number} [baseDamp=0.12] Normal damping factor
 * @param {number} [baseDuration=0.8] Normal transition duration in seconds
 * @returns {{
 *   prefersReducedMotion: boolean,
 *   damp: number,
 *   duration: number,
 *   enableFbmDrift: boolean,
 *   allowTranslations: boolean,
 *   staggerDelay: number
 * }}
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

/**
 * Adapts camera orbital state (P, T, U, FOV) for a given viewport
 * 
 * @param {Object} cameraState Camera state { position, target, up, fov, quaternion }
 * @param {Object} viewport Viewport { width, height }
 * @returns {Object} Adapted camera state
 */
function adaptCameraState(cameraState, viewport) {
  const width = Math.max(1, Number(viewport?.width) || 1440);
  const height = Math.max(1, Number(viewport?.height) || 900);
  const aspectRatio = width / height;

  const rig = resolveViewportCameraRig(aspectRatio, cameraState.fov || 24);

  if (!rig.portrait) {
    return {
      ...cameraState,
      fov: rig.fov,
      isPortrait: false,
      aspectRatio
    };
  }

  // Portrait compensation: pull position back by 1.35x relative to target
  const pos = [...cameraState.position];
  const tgt = [...cameraState.target];

  const dx = pos[0] - tgt[0];
  const dy = pos[1] - tgt[1];
  const dz = pos[2] - tgt[2];

  // Downward safe area offset shift
  tgt[1] -= rig.safeAreaOffset;

  const adaptedPos = [
    tgt[0] + dx * 1.35,
    tgt[1] + dy * 1.35,
    tgt[2] + dz * 1.35
  ];

  return {
    ...cameraState,
    position: adaptedPos,
    target: tgt,
    fov: rig.fov,
    isPortrait: true,
    aspectRatio,
    safeAreaOffset: rig.safeAreaOffset
  };
}

/**
 * Applies both C3 (viewport) and C4 (motion) constraints
 */
function applyAdaptiveConstraints(cameraState, viewport, motionOptions = {}) {
  const adaptedCamera = adaptCameraState(cameraState, viewport);
  const motion = resolveMotionReducedScaling(
    motionOptions.prefersReducedMotion,
    motionOptions.baseDamp,
    motionOptions.baseDuration
  );

  return {
    camera: adaptedCamera,
    motion,
    viewport: {
      width: viewport?.width || 1440,
      height: viewport?.height || 900,
      aspectRatio: (viewport?.width || 1440) / (viewport?.height || 900)
    }
  };
}

module.exports = {
  resolveViewportCameraRig,
  resolveMotionReducedScaling,
  adaptCameraState,
  applyAdaptiveConstraints
};
