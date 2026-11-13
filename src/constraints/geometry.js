const { SpatialRTree } = require('../spatial/spatial-rtree');

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

/**
 * Audits sibling DOM layout boxes for unintended AABB overlaps and spacing gaps via SpatialRTree.
 * Excludes fixed/sticky overlays and DOM ancestor-descendant containment pairs to prevent false positives.
 *
 * @param {Array<object>} boxes Measured bounding boxes from DOM evaluation
 * @param {object} [options] Optional thresholds (`minIoU`)
 * @returns {object} Diagnostic collision and gap report
 */
function auditLayoutCollisions(boxes = [], options = {}) {
  const minIoU = typeof options.minIoU === 'number' ? options.minIoU : 0.01;
  if (!Array.isArray(boxes) || boxes.length === 0) {
    return {
      analyzedCount: 0,
      skippedFixedOrStickyCount: 0,
      collisionsCount: 0,
      collisions: [],
      gapsCount: 0,
      gapsSample: []
    };
  }

  const indexToId = new Map();
  const ancestorsById = new Map();
  const tree = new SpatialRTree();
  let analyzedCount = 0;
  let skippedFixedOrStickyCount = 0;

  const normalized = boxes.map((box, pos) => {
    const idx = box.index !== undefined ? box.index : pos;
    const tag = box.tag || 'node';
    const nodeId = String(box.id || `${tag}-${idx}`);
    indexToId.set(idx, nodeId);
    return { box, idx, nodeId, tag };
  });

  for (const entry of normalized) {
    const { box, nodeId, tag } = entry;
    const position = String(box.position || '').toLowerCase();
    if (position === 'fixed' || position === 'sticky') {
      skippedFixedOrStickyCount += 1;
      continue;
    }

    const left = Number(box.left ?? box.minX ?? 0);
    const top = Number(box.top ?? box.minY ?? 0);
    const width = Number(box.width ?? ((box.right ?? box.maxX ?? left) - left));
    const height = Number(box.height ?? ((box.bottom ?? box.maxY ?? top) - top));
    const right = Number(box.right ?? box.maxX ?? (left + width));
    const bottom = Number(box.bottom ?? box.maxY ?? (top + height));

    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      continue;
    }

    const ancestorSet = new Set();
    if (Array.isArray(box.ancestorIndices)) {
      for (const ancIdx of box.ancestorIndices) {
        const ancId = indexToId.get(ancIdx);
        if (ancId) ancestorSet.add(ancId);
      }
    }
    if (Array.isArray(box.ancestorIds)) {
      for (const ancId of box.ancestorIds) {
        ancestorSet.add(String(ancId));
      }
    }
    ancestorsById.set(nodeId, ancestorSet);

    tree.insert({
      id: nodeId,
      tag,
      minX: left,
      minY: top,
      maxX: right,
      maxY: bottom
    });
    analyzedCount += 1;
  }

  const rawCollisions = tree.findCollisions();
  const collisions = rawCollisions.filter((pair) => {
    if (pair.iou < minIoU) return false;
    const ancA = ancestorsById.get(pair.a);
    const ancB = ancestorsById.get(pair.b);
    if (ancA && ancA.has(pair.b)) return false;
    if (ancB && ancB.has(pair.a)) return false;
    return true;
  });

  const gaps = analyzedCount >= 2 ? tree.computeDimensionalGaps() : [];

  return {
    analyzedCount,
    skippedFixedOrStickyCount,
    collisionsCount: collisions.length,
    collisions,
    gapsCount: gaps.length,
    gapsSample: gaps.slice(0, 12)
  };
}

module.exports = {
  resolveViewportCameraRig,
  resolveCollectionGeometry,
  auditLayoutCollisions
};
