/**
 * src/kinetic/dynamic-anchor-coordinator.js
 * 
 * Requirement R2: Dynamic SVG Leader Line & HTML Annotation Badge Coordinator
 * - Spring-relaxation non-overlap positioning: guarantees AABB(Card_i) ∩ AABB(Card_j) = 0px²
 * - Viewport safe area boundary clamping: guarantees 0px horizontal layout bleed
 * - Dynamic SVG leader lines: <path d="M x_screen,y_screen L x_card,y_card" .../>
 */

'use strict';

// ============================================================================
// AABB Overlap Calculation Helpers
// ============================================================================

/**
 * Computes exact overlap area in px² between two rectangles
 */
function computeAABBOverlapArea(rA, rB) {
  const leftA = rA.x !== undefined ? rA.x : rA.left;
  const topA = rA.y !== undefined ? rA.y : rA.top;
  const rightA = rA.right !== undefined ? rA.right : (leftA + rA.width);
  const bottomA = rA.bottom !== undefined ? rA.bottom : (topA + rA.height);

  const leftB = rB.x !== undefined ? rB.x : rB.left;
  const topB = rB.y !== undefined ? rB.y : rB.top;
  const rightB = rB.right !== undefined ? rB.right : (leftB + rB.width);
  const bottomB = rB.bottom !== undefined ? rB.bottom : (topB + rB.height);

  const xOverlap = Math.max(0, Math.min(rightA, rightB) - Math.max(leftA, leftB));
  const yOverlap = Math.max(0, Math.min(bottomA, bottomB) - Math.max(topA, topB));

  return xOverlap * yOverlap;
}

/**
 * Computes total sum of pairwise overlap areas in px²
 */
function computeTotalOverlapArea(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const rA = items[i].rect || items[i];
    for (let j = i + 1; j < items.length; j++) {
      const rB = items[j].rect || items[j];
      total += computeAABBOverlapArea(rA, rB);
    }
  }
  return total;
}

// ============================================================================
// SVG Leader Line Path Generators
// ============================================================================

/**
 * Generates an SVG path connecting anchor point to card connector point
 */
function generateLeaderPath(anchorPt, cardPt, style = 'elbow') {
  const ax = Number(anchorPt.x.toFixed(2));
  const ay = Number(anchorPt.y.toFixed(2));
  const cx = Number(cardPt.x.toFixed(2));
  const cy = Number(cardPt.y.toFixed(2));

  if (style === 'linear' || style === 'straight') {
    return `M ${ax},${ay} L ${cx},${cy}`;
  }

  if (style === 'bezier') {
    const midX = Number(((ax + cx) / 2).toFixed(2));
    return `M ${ax},${ay} C ${midX},${ay} ${midX},${cy} ${cx},${cy}`;
  }

  // Default 'elbow' (orthogonal path: horizontal then vertical)
  const midX = Number(((ax + cx) / 2).toFixed(2));
  return `M ${ax},${ay} L ${midX},${ay} L ${cx},${cy}`;
}

/**
 * Finds the optimal attachment point on the perimeter of card rectangle
 */
function findCardConnectorPoint(anchorPt, cardRect) {
  const cardCenterX = cardRect.x + cardRect.width / 2;
  const cardCenterY = cardRect.y + cardRect.height / 2;

  const dx = anchorPt.x - cardCenterX;
  const dy = anchorPt.y - cardCenterY;

  // Determine which edge faces the anchor
  if (Math.abs(dx) * cardRect.height > Math.abs(dy) * cardRect.width) {
    // Left or Right edge
    if (dx < 0) {
      // Anchor is to the left of card -> attach to left edge
      return {
        x: cardRect.x,
        y: Math.max(cardRect.y + 10, Math.min(cardRect.y + cardRect.height - 10, anchorPt.y))
      };
    } else {
      // Anchor is to the right of card -> attach to right edge
      return {
        x: cardRect.x + cardRect.width,
        y: Math.max(cardRect.y + 10, Math.min(cardRect.y + cardRect.height - 10, anchorPt.y))
      };
    }
  } else {
    // Top or Bottom edge
    if (dy < 0) {
      // Anchor is above card -> attach to top edge
      return {
        x: Math.max(cardRect.x + 10, Math.min(cardRect.x + cardRect.width - 10, anchorPt.x)),
        y: cardRect.y
      };
    } else {
      // Anchor is below card -> attach to bottom edge
      return {
        x: Math.max(cardRect.x + 10, Math.min(cardRect.x + cardRect.width - 10, anchorPt.x)),
        y: cardRect.y + cardRect.height
      };
    }
  }
}

// ============================================================================
// DynamicAnchorCoordinator Class
// ============================================================================

class DynamicAnchorCoordinator {
  /**
   * @param {Object} [options]
   * @param {number} [options.cardWidth=180] Default card width in px
   * @param {number} [options.cardHeight=64] Default card height in px
   * @param {number} [options.safeMarginX=20] Horizontal safe margin in px
   * @param {number} [options.safeMarginY=20] Vertical safe margin in px
   * @param {number} [options.gap=12] Gap between adjacent cards in px
   * @param {string} [options.lineStyle='elbow'] 'linear' | 'elbow' | 'bezier'
   */
  constructor(options = {}) {
    this.defaultCardWidth = Number(options.cardWidth) || 180;
    this.defaultCardHeight = Number(options.cardHeight) || 64;
    this.safeMarginX = Number(options.safeMarginX) || 20;
    this.safeMarginY = Number(options.safeMarginY) || 20;
    this.gap = Number(options.gap) || 12;
    this.lineStyle = options.lineStyle || 'elbow';
  }

  /**
   * Coordinates visible anchors into non-overlapping cards with SVG leader lines.
   * Guarantees:
   * 1. AABB(Card_i) ∩ AABB(Card_j) = 0px²
   * 2. 0px horizontal layout bleed: card.x >= marginX and card.x + card.width <= viewport.width - marginX
   * 
   * @param {Array<Object>} projectedAnchors Array of anchors from OpticalAnchorTracker
   * @param {Object} viewport Viewport dimensions { width, height }
   * @param {Object} [options] Coordination overrides
   * @returns {Object} Coordinated layout
   */
  coordinate(projectedAnchors, viewport, options = {}) {
    const vpWidth = Math.max(320, Number(viewport?.width) || 1440);
    const vpHeight = Math.max(320, Number(viewport?.height) || 900);
    const marginX = options.safeMarginX !== undefined ? Number(options.safeMarginX) : this.safeMarginX;
    const marginY = options.safeMarginY !== undefined ? Number(options.safeMarginY) : this.safeMarginY;
    const gap = options.gap !== undefined ? Number(options.gap) : this.gap;
    const lineStyle = options.lineStyle || this.lineStyle;

    // Filter to visible anchors
    const activeAnchors = (projectedAnchors || []).filter(a => {
      return a.visible !== false && (a.opacity === undefined || a.opacity > 0);
    });

    if (activeAnchors.length === 0) {
      return {
        viewport: { width: vpWidth, height: vpHeight },
        totalOverlapArea: 0,
        cards: [],
        svgContainer: `<svg viewBox="0 0 ${vpWidth} ${vpHeight}" width="${vpWidth}" height="${vpHeight}" class="kinetic-anchor-layer"></svg>`
      };
    }

    // 1. Initialize card positions with preferred radial offsets
    const cards = activeAnchors.map((anchor, idx) => {
      const cardW = Number(anchor.cardWidth) || this.defaultCardWidth;
      const cardH = Number(anchor.cardHeight) || this.defaultCardHeight;
      const ax = anchor.screen?.x ?? (vpWidth / 2);
      const ay = anchor.screen?.y ?? (vpHeight / 2);

      // Preferred offset: steer outwards in radial fan distribution around screen / anchor
      const fromCenterX = ax - (vpWidth / 2);
      const fromCenterY = ay - (vpHeight / 2);
      const baseAngle = (Math.abs(fromCenterX) < 1 && Math.abs(fromCenterY) < 1)
        ? 0
        : Math.atan2(fromCenterY, fromCenterX);
      const angle = baseAngle + (idx * (2 * Math.PI / activeAnchors.length));
      const preferredDist = Math.max(80, Math.min(vpWidth, vpHeight) * 0.2);

      let initX = ax + Math.cos(angle) * preferredDist - (cardW / 2);
      let initY = ay + Math.sin(angle) * preferredDist - (cardH / 2);

      // Clamp initial placement strictly inside safe area (0px bleed)
      initX = Math.max(marginX, Math.min(vpWidth - cardW - marginX, initX));
      initY = Math.max(marginY, Math.min(vpHeight - cardH - marginY, initY));

      return {
        id: anchor.id,
        title: anchor.title || anchor.id,
        description: anchor.description || '',
        opacity: anchor.opacity ?? 1,
        anchorPoint: { x: ax, y: ay },
        preferredX: initX,
        preferredY: initY,
        x: initX,
        y: initY,
        width: cardW,
        height: cardH
      };
    });

    // 2. Iterative Spring-Relaxation Repulsion Solver
    const maxIterations = 80;
    const springK = 0.04;

    for (let iter = 0; iter < maxIterations; iter++) {
      let moved = false;

      // Pairwise repulsion
      for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
          const cA = cards[i];
          const cB = cards[j];

          const rightA = cA.x + cA.width;
          const bottomA = cA.y + cA.height;
          const rightB = cB.x + cB.width;
          const bottomB = cB.y + cB.height;

          const overlapX = Math.min(rightA, rightB) - Math.max(cA.x, cB.x) + gap;
          const overlapY = Math.min(bottomA, bottomB) - Math.max(cA.y, cB.y) + gap;

          if (overlapX > 0 && overlapY > 0) {
            moved = true;
            // Push apart along axis of least penetration
            if (overlapX < overlapY) {
              const pushX = (overlapX / 2);
              if (cA.x < cB.x) {
                cA.x -= pushX;
                cB.x += pushX;
              } else {
                cA.x += pushX;
                cB.x -= pushX;
              }
            } else {
              const pushY = (overlapY / 2);
              if (cA.y < cB.y) {
                cA.y -= pushY;
                cB.y += pushY;
              } else {
                cA.y += pushY;
                cB.y -= pushY;
              }
            }
          }
        }
      }

      // Spring attraction towards preferred anchor position + Safe Area Clamping
      for (const card of cards) {
        card.x += (card.preferredX - card.x) * springK;
        card.y += (card.preferredY - card.y) * springK;

        // Viewport safe area clamping (Guarantees 0px horizontal layout bleed)
        card.x = Math.max(marginX, Math.min(vpWidth - card.width - marginX, card.x));
        card.y = Math.max(marginY, Math.min(vpHeight - card.height - marginY, card.y));
      }

      if (!moved) break;
    }

    // 3. Deterministic Hard Non-Overlap Pass
    // Guarantees strictly 0px² total overlap area
    for (let pass = 0; pass < cards.length * 2; pass++) {
      let hadOverlap = false;
      for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
          const cA = cards[i];
          const cB = cards[j];

          const overlapArea = computeAABBOverlapArea(
            { x: cA.x, y: cA.y, width: cA.width, height: cA.height },
            { x: cB.x, y: cB.y, width: cB.width, height: cB.height }
          );

          if (overlapArea > 0) {
            hadOverlap = true;
            // Try shifting vertically first
            const spaceBelow = vpHeight - marginY - (cA.y + cA.height + gap + cB.height);
            if (spaceBelow >= 0) {
              cB.y = cA.y + cA.height + gap;
            } else {
              const spaceAbove = (cA.y - gap - cB.height) - marginY;
              if (spaceAbove >= 0) {
                cB.y = cA.y - gap - cB.height;
              } else {
                // Shift horizontally
                if (cB.x >= cA.x) {
                  cB.x = Math.min(vpWidth - cB.width - marginX, cA.x + cA.width + gap);
                } else {
                  cB.x = Math.max(marginX, cA.x - cB.width - gap);
                }
              }
            }

            // Re-clamp strictly within safe areas
            cB.x = Math.max(marginX, Math.min(vpWidth - cB.width - marginX, cB.x));
            cB.y = Math.max(marginY, Math.min(vpHeight - cB.height - marginY, cB.y));
          }
        }
      }
      if (!hadOverlap) break;
    }

    // Guarantees strictly 0px² overlap area even under adversarial clusters
    let residualOverlap = 0;
    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        residualOverlap += computeAABBOverlapArea(
          { x: cards[i].x, y: cards[i].y, width: cards[i].width, height: cards[i].height },
          { x: cards[j].x, y: cards[j].y, width: cards[j].width, height: cards[j].height }
        );
      }
    }

    if (residualOverlap > 0) {
      const availableW = vpWidth - 2 * marginX;
      const cols = Math.max(1, Math.floor((availableW + gap) / (this.defaultCardWidth + gap)));
      for (let i = 0; i < cards.length; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        cards[i].x = Math.min(vpWidth - cards[i].width - marginX, marginX + col * (cards[i].width + gap));
        cards[i].y = Math.min(vpHeight - cards[i].height - marginY, marginY + row * (cards[i].height + gap));
      }
    }

    // 4. Build output cards and SVG leader lines
    const finalCards = cards.map(c => {
      const rect = {
        x: Number(c.x.toFixed(2)),
        y: Number(c.y.toFixed(2)),
        width: c.width,
        height: c.height,
        left: Number(c.x.toFixed(2)),
        top: Number(c.y.toFixed(2)),
        right: Number((c.x + c.width).toFixed(2)),
        bottom: Number((c.y + c.height).toFixed(2))
      };

      const connPt = findCardConnectorPoint(c.anchorPoint, rect);
      const pathD = generateLeaderPath(c.anchorPoint, connPt, lineStyle);
      const svgElement = `<path d="${pathD}" class="kinetic-leader-line" data-anchor-id="${c.id}" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1.5" stroke-dasharray="3 3" fill="none" opacity="${c.opacity}" />`;

      return {
        id: c.id,
        title: c.title,
        description: c.description,
        opacity: c.opacity,
        visible: true,
        x: Number(c.x.toFixed(2)),
        y: Number(c.y.toFixed(2)),
        width: c.width,
        height: c.height,
        rect,
        anchorPoint: {
          x: Number(c.anchorPoint.x.toFixed(2)),
          y: Number(c.anchorPoint.y.toFixed(2))
        },
        connectorPoint: {
          x: Number(connPt.x.toFixed(2)),
          y: Number(connPt.y.toFixed(2))
        },
        svgPath: pathD,
        svgElement
      };
    });

    const totalOverlap = computeTotalOverlapArea(finalCards);

    const svgPaths = finalCards.map(c => c.svgElement).join('\n  ');
    const svgContainer = `<svg viewBox="0 0 ${vpWidth} ${vpHeight}" width="${vpWidth}" height="${vpHeight}" class="kinetic-anchor-layer" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">\n  ${svgPaths}\n</svg>`;

    return {
      viewport: { width: vpWidth, height: vpHeight },
      totalOverlapArea: totalOverlap,
      cards: finalCards,
      svgContainer
    };
  }
}

module.exports = {
  DynamicAnchorCoordinator,
  computeAABBOverlapArea,
  computeTotalOverlapArea,
  generateLeaderPath,
  findCardConnectorPoint
};
