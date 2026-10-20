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

/**
 * C6 Constraint: Collection Cardinality ↔ Layout Geometry & Scroll Budget
 * Adapts grid layout, scroll pin multiplier and pagination mode when item counts
 * deviate from static archetype benchmarks without compromising DOM immutability.
 *
 * @param {number} cardinality Quantidade de itens na coleção (ex: 1 a 50)
 * @param {number} [archetypeMax=3] Benchmark de itens máximos para grid estático de um viewport
 * @returns {{
 *   cardinality: number,
 *   layoutMode: 'static-grid' | 'horizontal-slider' | 'paginated-virtual-slider',
 *   columns: number,
 *   scrollPinMultiplier: number,
 *   paginationRequired: boolean,
 *   pages: number
 * }}
 */
function resolveCollectionGeometry(cardinality, archetypeMax = 3) {
  const count = Math.max(1, Math.floor(Number(cardinality) || 1));

  if (count <= archetypeMax) {
    return {
      cardinality: count,
      layoutMode: 'static-grid',
      columns: count,
      scrollPinMultiplier: 1.0,
      paginationRequired: false,
      pages: 1
    };
  }

  if (count <= 8) {
    // 4 a 8 itens: trilho horizontal animado por ScrollTrigger (horizontal pin)
    // Cada item adicional aloca scroll budget suave sem inflar reflow vertical
    const pinMultiplier = Number((1.0 + (count - archetypeMax) * 0.35).toFixed(2));
    return {
      cardinality: count,
      layoutMode: 'horizontal-slider',
      columns: count,
      scrollPinMultiplier: pinMultiplier,
      paginationRequired: false,
      pages: 1
    };
  }

  // > 8 itens: slider paginado/virtualizado para proteger stamina de scroll e VRAM
  const pageSize = 4;
  const pages = Math.ceil(count / pageSize);
  return {
    cardinality: count,
    layoutMode: 'paginated-virtual-slider',
    columns: pageSize,
    scrollPinMultiplier: 3.0,
    paginationRequired: true,
    pages
  };
}

module.exports = {
  resolveViewportCameraRig,
  resolveCollectionGeometry
};
