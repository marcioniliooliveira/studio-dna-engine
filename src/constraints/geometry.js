/**
 * C3 Constraint: Viewport ↔ Camera Rig / Geometry Adaptation
 * Dynamically recalculates 3D camera FOV, orbital distance and safe area offsets across portrait and landscape viewports.
 */

function resolveViewportCameraRig(aspectRatio, baseFov = 24, baseDistance = 2.4) {
  const isPortrait = aspectRatio < 1.0;

  if (!isPortrait) {
    return {
      portrait: false,
      aspectRatio,
      fov: baseFov,
      distance: baseDistance,
      safeAreaOffset: 0
    };
  }

  // In portrait mobile (e.g., 390 / 844 ~ 0.46), narrow horizontal width clips
  // the wide 68-key aspect ratio. Widen FOV and pull camera back.
  const invRatio = Math.min(2.4, 1.0 / Math.max(0.4, aspectRatio));
  const compensatedFov = Math.min(38, Math.round(baseFov * (1.0 + (invRatio - 1.0) * 0.42)));
  const compensatedDistance = Number((baseDistance * 1.35).toFixed(2));
  const safeAreaOffset = 0.15; // 150mm vertical translation shift downward

  return {
    portrait: true,
    aspectRatio,
    fov: compensatedFov,
    distance: compensatedDistance,
    safeAreaOffset
  };
}

module.exports = { resolveViewportCameraRig };
