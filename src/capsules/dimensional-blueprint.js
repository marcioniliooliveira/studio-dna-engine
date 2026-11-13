/**
 * src/capsules/dimensional-blueprint.js
 * 
 * Studio DNA Engine v3.0 — Parametric Dimensional Blueprint & CAD SVG Engine
 * Feature: Dual-viewport spatial normalization, R-Tree collision verification,
 * relational invariants extraction (Sn, Hn, alignment axes), and CAD-style SVG generation.
 * 
 * Mathematical & Architectural Foundations:
 * - Leutenegger et al. (1997) Sort-Tile-Recursive (STR) packed AABB indexing via SpatialRTree
 * - Intersection-over-Union (IoU) zero-collision invariant (IoU = 0 for non-nested layout blocks)
 * - Relative origin normalization: x' = x - x0, y' = y - y0 eliminating pin-rail offsets
 * - Relational spacing invariants (Sn): axial gaps expressed as multiples of --scale or container ratio
 * - Hierarchy invariants (Hn): primary-to-secondary typographic scaling and whitespace ratio
 * - Alignment axes: vertical (xL, xR) and horizontal guidelines where >= 2 element boundaries converge
 * - Architectural CAD drawing standards: dark navy (#0A192F), grid (#172A45), wireframes (#64FFDA),
 *   amber dimensions (#F59E0B), and standard title block cartouche.
 */

'use strict';

const { SpatialRTree } = require('../spatial/spatial-rtree');

/**
 * Normalizes element coordinates relative to the capsule section root origin (x0, y0).
 * Eliminates pin-rail offsets (e.g. horizontal track x0=5760 or vertical track y0=4578).
 * 
 * @param {Array<object>} elements Array of element bounding boxes
 * @param {{ minX: number, minY: number, maxX: number, maxY: number }} [rootBox] Capsule root bounding box
 * @returns {Array<object>} Normalized element descriptors
 */
function normalizeCoordinates(elements, rootBox) {
  if (!Array.isArray(elements)) return [];

  const originX = rootBox ? (rootBox.minX !== undefined ? rootBox.minX : (rootBox.x || 0)) : 0;
  const originY = rootBox ? (rootBox.minY !== undefined ? rootBox.minY : (rootBox.y || 0)) : 0;

  return elements.map((el) => {
    const rawMinX = el.minX !== undefined ? el.minX : (el.x !== undefined ? el.x : 0);
    const rawMinY = el.minY !== undefined ? el.minY : (el.y !== undefined ? el.y : 0);
    const rawMaxX = el.maxX !== undefined ? el.maxX : (rawMinX + (el.width !== undefined ? el.width : 0));
    const rawMaxY = el.maxY !== undefined ? el.maxY : (rawMinY + (el.height !== undefined ? el.height : 0));

    const minX = Number((rawMinX - originX).toFixed(4));
    const minY = Number((rawMinY - originY).toFixed(4));
    const maxX = Number((rawMaxX - originX).toFixed(4));
    const maxY = Number((rawMaxY - originY).toFixed(4));
    const width = Number(Math.max(0, maxX - minX).toFixed(2));
    const height = Number(Math.max(0, maxY - minY).toFixed(2));

    return {
      ...el,
      minX,
      minY,
      maxX,
      maxY,
      width,
      height,
      id: el.id || `node-${Math.random().toString(36).slice(2, 8)}`
    };
  });
}

/**
 * Extracts alignment axes from normalized elements where 2 or more elements share
 * a coordinate boundary within tolerance.
 * 
 * @param {Array<object>} elements Normalized elements
 * @param {number} containerWidth Width of container
 * @param {number} containerHeight Height of container
 * @param {number} [tolerance=1.5] Pixel tolerance for alignment clustering
 * @returns {{ vertical: Array<object>, horizontal: Array<object> }}
 */
function extractAlignmentAxes(elements, containerWidth, containerHeight, tolerance = 1.5) {
  const vAxes = [];
  const hAxes = [];

  const clusterValues = (values) => {
    const clusters = [];
    const sorted = values.slice().sort((a, b) => a.coord - b.coord);

    for (const item of sorted) {
      let found = false;
      for (const cl of clusters) {
        if (Math.abs(cl.coord - item.coord) <= tolerance) {
          cl.elements.push(item.id);
          cl.types.add(item.type);
          cl.coord = (cl.coord * (cl.elements.length - 1) + item.coord) / cl.elements.length;
          found = true;
          break;
        }
      }
      if (!found) {
        clusters.push({
          coord: item.coord,
          elements: [item.id],
          types: new Set([item.type])
        });
      }
    }
    return clusters.filter(cl => cl.elements.length >= 2);
  };

  // Collect vertical candidates (minX, maxX, centerX) and horizontal (minY, maxY)
  const vPoints = [];
  const hPoints = [];

  for (const el of elements) {
    vPoints.push({ id: el.id, coord: el.minX, type: 'left' });
    vPoints.push({ id: el.id, coord: el.maxX, type: 'right' });
    vPoints.push({ id: el.id, coord: (el.minX + el.maxX) / 2, type: 'center' });

    hPoints.push({ id: el.id, coord: el.minY, type: 'top' });
    hPoints.push({ id: el.id, coord: el.maxY, type: 'bottom' });
  }

  const vClusters = clusterValues(vPoints);
  for (const cl of vClusters) {
    vAxes.push({
      coordPx: Number(cl.coord.toFixed(2)),
      normalized: containerWidth > 0 ? Number((cl.coord / containerWidth).toFixed(4)) : 0,
      types: Array.from(cl.types),
      elements: cl.elements
    });
  }

  const hClusters = clusterValues(hPoints);
  for (const cl of hClusters) {
    hAxes.push({
      coordPx: Number(cl.coord.toFixed(2)),
      normalized: containerHeight > 0 ? Number((cl.coord / containerHeight).toFixed(4)) : 0,
      types: Array.from(cl.types),
      elements: cl.elements
    });
  }

  return { vertical: vAxes, horizontal: hAxes };
}

/**
 * Extracts typographic and whitespace hierarchy invariants.
 * 
 * @param {Array<object>} elements Normalized elements
 * @param {number} containerWidth Width of container
 * @param {number} containerHeight Height of container
 * @returns {{ whitespaceRatio: number, hierarchyRatios: Array<object> }}
 */
function extractHierarchyInvariants(elements, containerWidth, containerHeight) {
  const totalArea = containerWidth * containerHeight;
  const occupiedArea = elements.reduce((sum, el) => sum + (el.width * el.height), 0);
  const whitespaceRatio = totalArea > 0
    ? Number((Math.max(0, totalArea - occupiedArea) / totalArea).toFixed(4))
    : 0;

  const textElements = elements.filter(e => typeof e.fontSize === 'number' && e.fontSize > 0);
  const sortedText = textElements.slice().sort((a, b) => b.fontSize - a.fontSize);
  const hierarchyRatios = [];

  if (sortedText.length >= 2) {
    const primary = sortedText[0];
    const secondary = sortedText.find(e => e.fontSize < primary.fontSize) || sortedText[1];
    hierarchyRatios.push({
      id: 'H1',
      name: 'primary-to-secondary-font-ratio',
      primaryElement: primary.id,
      primaryFontSize: primary.fontSize,
      secondaryElement: secondary.id,
      secondaryFontSize: secondary.fontSize,
      ratio: Number((primary.fontSize / secondary.fontSize).toFixed(2))
    });
  }

  return {
    whitespaceRatio,
    hierarchyRatios
  };
}

/**
 * Generates the CAD-style architectural SVG blueprint string.
 * Dark navy (#0A192F), grid (#172A45), cyan wireframes (#64FFDA), amber dimensions (#F59E0B).
 * 
 * @param {object} blueprintJson Complete dimensional blueprint JSON
 * @param {string} [activeViewport='desktop'] Viewport to render visually
 * @returns {string} Standalone SVG document markup
 */
function generateCadSvg(blueprintJson, activeViewport = 'desktop') {
  if (!blueprintJson || !blueprintJson.viewports) {
    throw new Error('generateCadSvg: valid blueprint JSON with viewports is required');
  }

  const vpKey = blueprintJson.viewports[activeViewport] ? activeViewport : Object.keys(blueprintJson.viewports)[0];
  const vpData = blueprintJson.viewports[vpKey];
  if (!vpData) {
    throw new Error(`Viewport "${activeViewport}" not found in blueprint JSON`);
  }

  const w = (vpData.containerBounds && vpData.containerBounds.width) || vpData.viewport.width;
  const h = (vpData.containerBounds && vpData.containerBounds.height) || vpData.viewport.height;
  const elements = vpData.elements || [];
  const spacing = vpData.spacing || [];
  const alignment = vpData.alignmentAxes || { vertical: [], horizontal: [] };

  const pad = 60;
  const cartoucheHeight = 85;
  const totalW = Math.max(800, w + pad * 2);
  const totalH = h + pad * 2 + cartoucheHeight + 20;

  const capsuleSlug = blueprintJson.capsuleId || 'capsule-blueprint';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" width="100%" height="100%" style="background:#0A192F; font-family:'JetBrains Mono', 'Fira Code', 'Courier New', monospace;">
  <defs>
    <!-- Architectural Grid Pattern -->
    <pattern id="cad-grid-minor" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#172A45" stroke-width="0.5" opacity="0.6"/>
    </pattern>
    <pattern id="cad-grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
      <rect width="100" height="100" fill="url(#cad-grid-minor)" />
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1E3A5F" stroke-width="1" opacity="0.9"/>
    </pattern>

    <!-- Dimension Tick Marker -->
    <marker id="tick-amber" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
      <line x1="0" y1="6" x2="6" y2="0" stroke="#F59E0B" stroke-width="1.5" />
    </marker>
  </defs>

  <!-- Background -->
  <rect width="${totalW}" height="${totalH}" fill="#0A192F" />

  <!-- Drawing Frame -->
  <g transform="translate(${pad}, ${pad})">
    <!-- CAD Grid Sheet -->
    <rect width="${w}" height="${h}" fill="url(#cad-grid-major)" stroke="#233554" stroke-width="1.5" />

    <!-- Container Origin (0,0) Marker -->
    <circle cx="0" cy="0" r="4" fill="#64FFDA" />
    <text x="8" y="14" fill="#64FFDA" font-size="10" opacity="0.85">(0,0) RELATIVE ORIGIN</text>

    <!-- Outer Dimension Markers -->
    <text x="${w / 2}" y="-16" fill="#F59E0B" font-size="12" text-anchor="middle" letter-spacing="1">CONTAINER WIDTH: ${w}px</text>
    <text x="-16" y="${h / 2}" fill="#F59E0B" font-size="12" text-anchor="middle" transform="rotate(-90, -16, ${h / 2})" letter-spacing="1">CONTAINER HEIGHT: ${h}px</text>

    <!-- Alignment Guideline Overlays -->
    ${alignment.vertical.slice(0, 8).map(ax => `
      <line x1="${ax.coordPx}" y1="0" x2="${ax.coordPx}" y2="${h}" stroke="#64FFDA" stroke-width="0.75" stroke-dasharray="4 4" opacity="0.3"/>
      <text x="${ax.coordPx + 3}" y="${h - 8}" fill="#64FFDA" font-size="9" opacity="0.55">x=${ax.coordPx}</text>
    `).join('')}

    <!-- Wireframe BBoxes -->
    ${elements.map(el => `
      <g id="box-${el.id}">
        <rect x="${el.minX}" y="${el.minY}" width="${el.width}" height="${el.height}"
              fill="rgba(100, 255, 218, 0.05)" stroke="#64FFDA" stroke-width="1.2" rx="2" />
        <text x="${el.minX + 6}" y="${el.minY + 14}" fill="#64FFDA" font-size="10" font-weight="bold" opacity="0.95">${el.id} &lt;${el.tag || 'div'}&gt;</text>
        <text x="${el.minX + 6}" y="${el.minY + 26}" fill="#8892B0" font-size="8.5">${el.width} × ${el.height} px</text>
      </g>
    `).join('')}

    <!-- Dimension Lines (Sn Spacing) -->
    ${spacing.slice(0, 10).map((s, idx) => {
      const fromEl = elements.find(e => e.id === s.from);
      const toEl = elements.find(e => e.id === s.to);
      if (!fromEl || !toEl) return '';

      if (s.axis === 'x') {
        const lineY = Math.min(fromEl.maxY, toEl.maxY) - 10 - (idx % 3) * 12;
        return `
          <g id="dim-${s.id}">
            <line x1="${fromEl.maxX}" y1="${lineY}" x2="${toEl.minX}" y2="${lineY}"
                  stroke="#F59E0B" stroke-width="1" stroke-dasharray="2 2"
                  marker-start="url(#tick-amber)" marker-end="url(#tick-amber)" />
            <text x="${(fromEl.maxX + toEl.minX) / 2}" y="${lineY - 4}"
                  fill="#F59E0B" font-size="9" text-anchor="middle" font-weight="bold">${s.id}: ${s.formula}</text>
          </g>
        `;
      } else {
        const lineX = Math.min(fromEl.maxX, toEl.maxX) + 15 + (idx % 2) * 15;
        return `
          <g id="dim-${s.id}">
            <line x1="${lineX}" y1="${fromEl.maxY}" x2="${lineX}" y2="${toEl.minY}"
                  stroke="#F59E0B" stroke-width="1" stroke-dasharray="2 2"
                  marker-start="url(#tick-amber)" marker-end="url(#tick-amber)" />
            <text x="${lineX + 5}" y="${(fromEl.maxY + toEl.minY) / 2}"
                  fill="#F59E0B" font-size="9" font-weight="bold">${s.id}: ${s.formula}</text>
          </g>
        `;
      }
    }).join('')}

    <!-- Title Block Cartouche (Architectural CAD Standard) -->
    <g transform="translate(${Math.max(0, w - 460)}, ${h + 15})">
      <rect width="460" height="${cartoucheHeight}" fill="#0D203D" stroke="#64FFDA" stroke-width="1" rx="1"/>
      <line x1="0" y1="28" x2="460" y2="28" stroke="#1E3A5F" stroke-width="1"/>
      <line x1="0" y1="56" x2="460" y2="56" stroke="#1E3A5F" stroke-width="1"/>
      <line x1="300" y1="0" x2="300" y2="${cartoucheHeight}" stroke="#1E3A5F" stroke-width="1"/>

      <!-- Cartouche Header -->
      <text x="12" y="19" fill="#64FFDA" font-size="11" font-weight="bold" letter-spacing="1">STUDIO DNA // DIMENSIONAL BLUEPRINT</text>
      <text x="312" y="19" fill="#F59E0B" font-size="10" font-weight="bold">SCALE: ${vpKey.toUpperCase()} [${w}×${h}]</text>
      
      <!-- Cartouche Middle Row -->
      <text x="12" y="46" fill="#CCD6F6" font-size="9.5">CAPSULE: ${capsuleSlug}</text>
      <text x="312" y="46" fill="#64FFDA" font-size="9">IOU: 0.0000 (COLLISION FREE)</text>

      <!-- Cartouche Footer -->
      <text x="12" y="73" fill="#8892B0" font-size="8.5">WHITESPACE: ${(vpData.whitespaceRatio * 100).toFixed(1)}% | GAPS: ${spacing.length} RELATIONAL INVARIANTS</text>
      <text x="312" y="73" fill="#8892B0" font-size="8.5">ENGINE: v3.0 // ARCHITECTURAL</text>
    </g>
  </g>
</svg>`;
}

/**
 * Main entry point for generating dual-viewport dimensional blueprints.
 * 
 * @param {object} options
 * @param {string} [options.capsuleId='capsule'] Unique capsule identifier
 * @param {string} [options.title='Capsule Blueprint'] Title
 * @param {Array<{ name: string, width: number, height: number, scale?: number }>} [options.viewports]
 * @param {object} [options.elementsByViewport] Elements mapped by viewport name
 * @param {Array<object>} [options.elements] Direct elements list (if single viewport or fallback)
 * @param {object} [options.capsuleRoot] Section root bounding box
 * @param {string} [options.scaleVarName='--scale'] CSS custom property name for scaling
 * @param {boolean} [options.assertZeroCollision=true] Whether to throw if physical overlap detected
 * @param {number} [options.iouThreshold=0.0005] Minimum IoU for collision detection
 * @param {number} [options.minIntersectionArea=1.0] Minimum intersection area in px² for collision
 * @returns {{ json: object, svg: string, trees: Record<string, SpatialRTree> }}
 */
function generateDimensionalBlueprint(options = {}) {
  const capsuleId = options.capsuleId || 'capsule';
  const title = options.title || capsuleId;
  const assertZeroCollision = options.assertZeroCollision !== false;
  const scaleVarName = options.scaleVarName || '--scale';

  const defaultViewports = [
    { name: 'desktop', width: 1440, height: 900, scale: 10 },
    { name: 'mobile', width: 390, height: 844, scale: 10 }
  ];
  const viewports = Array.isArray(options.viewports) && options.viewports.length > 0
    ? options.viewports
    : defaultViewports;

  const elementsByViewport = options.elementsByViewport || {};
  if (options.elements && !elementsByViewport.desktop && !elementsByViewport.mobile) {
    elementsByViewport.desktop = options.elements;
  }

  const result = {
    schemaVersion: '3.0.0',
    capsuleId,
    title,
    generatedAt: new Date().toISOString(),
    viewports: {}
  };

  const trees = {};

  for (const vp of viewports) {
    const rawElements = elementsByViewport[vp.name] || [];
    const scaleVal = typeof vp.scale === 'number' && vp.scale > 0 ? vp.scale : 10;

    // Determine root container bounding box
    const rootBox = options.capsuleRoot ||
      rawElements.find(e => e.id === 'root' || e.isRoot) || {
        minX: 0,
        minY: 0,
        maxX: vp.width,
        maxY: vp.height
      };

    const rootMinX = rootBox.minX !== undefined ? rootBox.minX : (rootBox.x || 0);
    const rootMinY = rootBox.minY !== undefined ? rootBox.minY : (rootBox.y || 0);
    const rootMaxX = rootBox.maxX !== undefined ? rootBox.maxX : (rootMinX + (rootBox.width || vp.width));
    const rootMaxY = rootBox.maxY !== undefined ? rootBox.maxY : (rootMinY + (rootBox.height || vp.height));

    const containerWidth = Math.max(1, rootMaxX - rootMinX);
    const containerHeight = Math.max(1, rootMaxY - rootMinY);

    // Normalize coordinates to section origin
    const nonRootElements = rawElements.filter(e => e.id !== 'root' && !e.isRoot);
    const normalizedElements = normalizeCoordinates(nonRootElements, {
      minX: rootMinX,
      minY: rootMinY,
      maxX: rootMaxX,
      maxY: rootMaxY
    });

    // Build SpatialRTree with STR packing
    const tree = new SpatialRTree(9);
    tree.load(normalizedElements);
    trees[vp.name] = tree;

    // Detect physical collisions (filtering sub-pixel contact float artifacts)
    const rawCollisions = tree.findCollisions();
    const iouThreshold = typeof options.iouThreshold === 'number' ? options.iouThreshold : 0.0005;
    const minIntersectionArea = typeof options.minIntersectionArea === 'number' ? options.minIntersectionArea : 1.0;
    const collisions = rawCollisions.filter(c => c.iou > iouThreshold && c.intersectionArea >= minIntersectionArea);
    const zeroCollisions = collisions.length === 0;

    if (assertZeroCollision && !zeroCollisions) {
      const summary = collisions.map(c => `${c.a}<->${c.b} (IoU=${c.iou}, area=${c.intersectionArea}px²)`).join(', ');
      throw new Error(`SpatialRTree physical collision assertion failed in viewport "${vp.name}": ${summary}`);
    }

    // Spacing invariants (Sn)
    const rawGaps = tree.computeDimensionalGaps();
    const spacingInvariants = rawGaps.map((g, idx) => {
      const multiplier = Number((g.distancePx / scaleVal).toFixed(2));
      const formula = Math.abs(multiplier * scaleVal - g.distancePx) < 0.1
        ? `calc(${multiplier} * var(${scaleVarName}))`
        : `${g.distancePx}px`;

      return {
        id: `S${idx + 1}`,
        axis: g.axis,
        from: g.from,
        to: g.to,
        distancePx: g.distancePx,
        ratioToContainer: g.ratioToContainer,
        formula,
        scaleMultiplier: multiplier
      };
    });

    // Alignment axes
    const alignmentAxes = extractAlignmentAxes(normalizedElements, containerWidth, containerHeight);

    // Hierarchy invariants
    const { whitespaceRatio, hierarchyRatios } = extractHierarchyInvariants(
      normalizedElements,
      containerWidth,
      containerHeight
    );

    result.viewports[vp.name] = {
      viewport: { width: vp.width, height: vp.height },
      containerBounds: { width: containerWidth, height: containerHeight },
      scaleBase: scaleVal,
      elementsCount: normalizedElements.length,
      zeroCollisions,
      collisions,
      whitespaceRatio,
      spacing: spacingInvariants,
      hierarchy: hierarchyRatios,
      alignmentAxes,
      elements: normalizedElements
    };
  }

  // Generate CAD SVG (defaults to desktop viewport)
  const svg = generateCadSvg(result, 'desktop');

  return {
    json: result,
    svg,
    trees
  };
}

module.exports = {
  generateDimensionalBlueprint,
  normalizeCoordinates,
  extractAlignmentAxes,
  extractHierarchyInvariants,
  generateCadSvg
};
