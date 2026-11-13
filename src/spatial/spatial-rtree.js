/**
 * src/spatial/spatial-rtree.js
 * 
 * Studio DNA Engine v3.0 — Analytical Spatial R-Tree Micro-Engine
 * Feature: 2D R-Tree with STR Bulk Packing, Collision Detection, and Dimensional Gaps
 * 
 * Mathematical Foundations:
 * - Guttman (1984) R-Tree Quadratic Split for dynamic insertion
 * - Leutenegger et al. (1997) Sort-Tile-Recursive (STR) optimal bulk packing
 * - Intersection-over-Union (IoU) physical collision detection (IoU > 0)
 * - Relational spacing invariants (S_n gaps) and ratio-to-container extraction
 * - Typographic Energy function E_typo(v) per Equation 24
 * - Subtree Isomorphism area Coefficient of Variation (CV) per Equation 25
 * - Zero external dependencies outside Node.js built-ins
 */

'use strict';

class SpatialRTree {
  /**
   * Constructs a 2D spatial R-Tree.
   * @param {number} [maxEntries=9] Maximum children per internal/leaf node (M >= 4).
   */
  constructor(maxEntries = 9) {
    this.maxEntries = Math.max(4, maxEntries);
    this.minEntries = Math.max(2, Math.ceil(this.maxEntries * 0.4));
    this.root = { leaf: true, entries: [], bbox: null };
  }

  static bbox(minX, minY, maxX, maxY) {
    return {
      minX: Math.min(minX, maxX),
      minY: Math.min(minY, maxY),
      maxX: Math.max(minX, maxX),
      maxY: Math.max(minY, maxY)
    };
  }

  static intersects(a, b) {
    return (
      a.minX <= b.maxX &&
      a.maxX >= b.minX &&
      a.minY <= b.maxY &&
      a.maxY >= b.minY
    );
  }

  static union(a, b) {
    return {
      minX: Math.min(a.minX, b.minX),
      minY: Math.min(a.minY, b.minY),
      maxX: Math.max(a.maxX, b.maxX),
      maxY: Math.max(a.maxY, b.maxY)
    };
  }

  static area(b) {
    return Math.max(0, b.maxX - b.minX) * Math.max(0, b.maxY - b.minY);
  }

  static calcBBox(node) {
    if (!node.entries || node.entries.length === 0) return null;
    const getBox = (e) => e.bbox || e;
    let b = { ...getBox(node.entries[0]) };
    for (let i = 1; i < node.entries.length; i++) {
      b = SpatialRTree.union(b, getBox(node.entries[i]));
    }
    return b;
  }

  /**
   * Inserts a bounding box entry into the R-Tree using Guttman quadratic split.
   * @param {{ minX: number, minY: number, maxX: number, maxY: number, id?: any, data?: any }} item
   */
  insert(item) {
    if (item == null ||
        item.minX === undefined || item.minY === undefined ||
        item.maxX === undefined || item.maxY === undefined) {
      throw new Error('SpatialRTree.insert requires { minX, minY, maxX, maxY }');
    }

    const minX = Math.min(item.minX, item.maxX);
    const minY = Math.min(item.minY, item.maxY);
    const maxX = Math.max(item.minX, item.maxX);
    const maxY = Math.max(item.minY, item.maxY);

    const normalized = {
      minX,
      minY,
      maxX,
      maxY,
      id: item.id,
      data: item.data !== undefined ? item.data : { ...item, minX, minY, maxX, maxY }
    };

    const path = [];
    let node = this.root;

    // 1. ChooseSubtree: traverse down to find best leaf
    while (!node.leaf) {
      path.push(node);
      let bestChild = node.entries[0];
      let bestEnlargement = Infinity;
      let bestArea = Infinity;

      for (let i = 0; i < node.entries.length; i++) {
        const child = node.entries[i];
        const unionBox = SpatialRTree.union(child.bbox, normalized);
        const childArea = SpatialRTree.area(child.bbox);
        const enlargement = SpatialRTree.area(unionBox) - childArea;

        if (enlargement < bestEnlargement || (enlargement === bestEnlargement && childArea < bestArea)) {
          bestEnlargement = enlargement;
          bestArea = childArea;
          bestChild = child;
        }
      }
      node = bestChild;
    }

    // 2. Insert into leaf node
    node.entries.push(normalized);
    node.bbox = SpatialRTree.calcBBox(node);

    // 3. Handle split if capacity exceeded
    if (node.entries.length > this.maxEntries) {
      this._split(path, node);
    } else {
      // Adjust bounding boxes upwards to root
      for (let i = path.length - 1; i >= 0; i--) {
        path[i].bbox = SpatialRTree.calcBBox(path[i]);
      }
    }
  }

  _split(path, node) {
    const [group1, group2] = this._quadraticSplit(node.entries);
    node.entries = group1;
    node.bbox = SpatialRTree.calcBBox(node);

    const newNode = {
      leaf: node.leaf,
      entries: group2,
      bbox: null
    };
    newNode.bbox = SpatialRTree.calcBBox(newNode);

    if (node === this.root) {
      // Split root: create new root with 2 children
      this.root = {
        leaf: false,
        entries: [node, newNode],
        bbox: SpatialRTree.union(node.bbox, newNode.bbox)
      };
      return;
    }

    const parent = path[path.length - 1];
    parent.entries.push(newNode);
    parent.bbox = SpatialRTree.calcBBox(parent);

    if (parent.entries.length > this.maxEntries) {
      this._split(path.slice(0, -1), parent);
    } else {
      for (let i = path.length - 2; i >= 0; i--) {
        path[i].bbox = SpatialRTree.calcBBox(path[i]);
      }
    }
  }

  _quadraticSplit(entries) {
    let maxDeadSpace = -Infinity;
    let seed1 = 0;
    let seed2 = 1;

    for (let i = 0; i < entries.length - 1; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const u = SpatialRTree.union(entries[i].bbox || entries[i], entries[j].bbox || entries[j]);
        const deadSpace = SpatialRTree.area(u) - SpatialRTree.area(entries[i].bbox || entries[i]) - SpatialRTree.area(entries[j].bbox || entries[j]);
        if (deadSpace > maxDeadSpace) {
          maxDeadSpace = deadSpace;
          seed1 = i;
          seed2 = j;
        }
      }
    }

    const group1 = [entries[seed1]];
    const group2 = [entries[seed2]];
    let bbox1 = { ...(entries[seed1].bbox || entries[seed1]) };
    let bbox2 = { ...(entries[seed2].bbox || entries[seed2]) };

    const remaining = entries.filter((_, idx) => idx !== seed1 && idx !== seed2);

    while (remaining.length > 0) {
      if (group1.length + remaining.length === this.minEntries) {
        group1.push(...remaining);
        break;
      }
      if (group2.length + remaining.length === this.minEntries) {
        group2.push(...remaining);
        break;
      }

      const item = remaining.pop();
      const itemBox = item.bbox || item;
      const u1 = SpatialRTree.union(bbox1, itemBox);
      const u2 = SpatialRTree.union(bbox2, itemBox);
      const d1 = SpatialRTree.area(u1) - SpatialRTree.area(bbox1);
      const d2 = SpatialRTree.area(u2) - SpatialRTree.area(bbox2);

      if (d1 < d2) {
        group1.push(item);
        bbox1 = u1;
      } else if (d2 < d1) {
        group2.push(item);
        bbox2 = u2;
      } else {
        if (group1.length <= group2.length) {
          group1.push(item);
          bbox1 = u1;
        } else {
          group2.push(item);
          bbox2 = u2;
        }
      }
    }

    return [group1, group2];
  }

  /**
   * Bulk loads items into the tree using Sort-Tile-Recursive (STR) packing.
   * If items is empty, returns this.
   * 
   * @param {Array<object>} items
   * @returns {this}
   */
  load(items) {
    if (!Array.isArray(items) || items.length === 0) {
      return this;
    }

    const normalized = items.map((item) => {
      const minX = Math.min(item.minX, item.maxX);
      const minY = Math.min(item.minY, item.maxY);
      const maxX = Math.max(item.minX, item.maxX);
      const maxY = Math.max(item.minY, item.maxY);
      return {
        minX,
        minY,
        maxX,
        maxY,
        id: item.id,
        data: item.data !== undefined ? item.data : { ...item, minX, minY, maxX, maxY }
      };
    });

    const N = normalized.length;
    const M = this.maxEntries;

    if (N <= M) {
      this.root = {
        leaf: true,
        entries: normalized,
        bbox: SpatialRTree.calcBBox({ entries: normalized })
      };
      return this;
    }

    // STR Phase 1: Leaf packing
    const P = Math.ceil(N / M);
    const S = Math.ceil(Math.sqrt(P));
    const sliceCapacity = Math.ceil(N / S);

    // Sort by centroid X
    normalized.sort((a, b) => ((a.minX + a.maxX) / 2) - ((b.minX + b.maxX) / 2));

    const leafNodes = [];
    for (let s = 0; s < S; s++) {
      const slice = normalized.slice(s * sliceCapacity, (s + 1) * sliceCapacity);
      if (slice.length === 0) continue;

      // Sort by centroid Y within slice
      slice.sort((a, b) => ((a.minY + a.maxY) / 2) - ((b.minY + b.maxY) / 2));

      for (let k = 0; k < slice.length; k += M) {
        const chunk = slice.slice(k, k + M);
        leafNodes.push({
          leaf: true,
          entries: chunk,
          bbox: SpatialRTree.calcBBox({ entries: chunk })
        });
      }
    }

    // STR Phase 2: Recursively build parent index nodes up to root
    let currentLevel = leafNodes;
    while (currentLevel.length > 1) {
      if (currentLevel.length <= M) {
        this.root = {
          leaf: false,
          entries: currentLevel,
          bbox: SpatialRTree.calcBBox({ entries: currentLevel })
        };
        return this;
      }

      const pCount = Math.ceil(currentLevel.length / M);
      const sCount = Math.ceil(Math.sqrt(pCount));
      const pSliceCapacity = Math.ceil(currentLevel.length / sCount);

      currentLevel.sort((a, b) => ((a.bbox.minX + a.bbox.maxX) / 2) - ((b.bbox.minX + b.bbox.maxX) / 2));

      const parentNodes = [];
      for (let s = 0; s < sCount; s++) {
        const slice = currentLevel.slice(s * pSliceCapacity, (s + 1) * pSliceCapacity);
        if (slice.length === 0) continue;

        slice.sort((a, b) => ((a.bbox.minY + a.bbox.maxY) / 2) - ((b.bbox.minY + b.bbox.maxY) / 2));

        for (let k = 0; k < slice.length; k += M) {
          const chunk = slice.slice(k, k + M);
          parentNodes.push({
            leaf: false,
            entries: chunk,
            bbox: SpatialRTree.calcBBox({ entries: chunk })
          });
        }
      }
      currentLevel = parentNodes;
    }

    this.root = currentLevel[0];
    return this;
  }

  /**
   * Searches for all items intersecting the query bounding box.
   * @param {{ minX: number, minY: number, maxX: number, maxY: number }} bbox
   * @returns {Array<object>}
   */
  search(bbox) {
    if (!bbox) return [];
    const normalized = {
      minX: Math.min(bbox.minX, bbox.maxX),
      minY: Math.min(bbox.minY, bbox.maxY),
      maxX: Math.max(bbox.minX, bbox.maxX),
      maxY: Math.max(bbox.minY, bbox.maxY)
    };

    const results = [];
    const stack = [this.root];

    while (stack.length > 0) {
      const node = stack.pop();
      if (!node.bbox || !SpatialRTree.intersects(node.bbox, normalized)) {
        continue;
      }
      for (let i = 0; i < node.entries.length; i++) {
        const entry = node.entries[i];
        const entryBox = entry.bbox || entry;
        if (SpatialRTree.intersects(entryBox, normalized)) {
          if (node.leaf) {
            results.push(entry.data !== undefined ? entry.data : entry);
          } else {
            stack.push(entry);
          }
        }
      }
    }

    return results;
  }

  /**
   * Returns true if any item in the tree intersects the query bounding box.
   * @param {{ minX: number, minY: number, maxX: number, maxY: number }} bbox
   * @returns {boolean}
   */
  collides(bbox) {
    return this.search(bbox).length > 0;
  }

  /**
   * Returns all items indexed in the tree.
   * @returns {Array<object>}
   */
  all() {
    const results = [];
    const stack = [this.root];
    while (stack.length > 0) {
      const node = stack.pop();
      if (node.leaf) {
        for (const entry of node.entries) {
          results.push(entry.data !== undefined ? entry.data : entry);
        }
      } else {
        for (const entry of node.entries) {
          stack.push(entry);
        }
      }
    }
    return results;
  }

  /**
   * Detects all pairs with real physical overlap (IoU > 0).
   * Edge-to-edge touch with 0px intersection area is excluded.
   * 
   * @returns {Array<{ a: string, b: string, intersectionArea: number, iou: number }>}
   */
  findCollisions() {
    const items = this.all();
    const collisions = [];
    const itemIndexMap = new Map();
    for (let i = 0; i < items.length; i++) {
      if (!itemIndexMap.has(items[i])) {
        itemIndexMap.set(items[i], i);
      }
    }

    const seenPairs = new Set();

    for (let i = 0; i < items.length; i++) {
      const itemA = items[i];
      const idA = itemA.id !== undefined ? String(itemA.id) : `item-${i}`;
      const boxA = {
        minX: itemA.minX,
        minY: itemA.minY,
        maxX: itemA.maxX,
        maxY: itemA.maxY
      };

      const candidates = this.search(boxA);
      for (const itemB of candidates) {
        if (itemA === itemB) continue;

        let j = itemIndexMap.get(itemB);
        if (j === undefined) {
          j = items.indexOf(itemB);
        }
        if (j === i) continue;

        // Symmetric evaluation: evaluate each pair (i, j) only once
        const minIdx = Math.min(i, j);
        const maxIdx = Math.max(i, j);
        const pairKey = `${minIdx}:::${maxIdx}`;
        if (seenPairs.has(pairKey)) continue;
        seenPairs.add(pairKey);

        const idB = itemB.id !== undefined ? String(itemB.id) : `item-${j}`;

        const firstId = idA < idB ? idA : idB;
        const secondId = idA < idB ? idB : idA;

        const boxB = {
          minX: itemB.minX,
          minY: itemB.minY,
          maxX: itemB.maxX,
          maxY: itemB.maxY
        };

        const interMinX = Math.max(boxA.minX, boxB.minX);
        const interMaxX = Math.min(boxA.maxX, boxB.maxX);
        const interMinY = Math.max(boxA.minY, boxB.minY);
        const interMaxY = Math.min(boxA.maxY, boxB.maxY);

        if (interMinX < interMaxX && interMinY < interMaxY) {
          const intersectionArea = (interMaxX - interMinX) * (interMaxY - interMinY);
          const areaA = (boxA.maxX - boxA.minX) * (boxA.maxY - boxA.minY);
          const areaB = (boxB.maxX - boxB.minX) * (boxB.maxY - boxB.minY);
          const unionArea = areaA + areaB - intersectionArea;
          const iou = unionArea > 0 ? intersectionArea / unionArea : 0;

          if (intersectionArea > 0 && iou > 0) {
            collisions.push({
              a: firstId,
              b: secondId,
              intersectionArea: Number(intersectionArea.toFixed(4)),
              iou: Number(iou.toFixed(4))
            });
          }
        }
      }
    }

    return collisions;
  }

  /**
   * Computes relational gaps (S_n spacing invariants) between adjacent sibling nodes along 'x' and 'y'.
   * 
   * @param {string} [containerId] Optional container element ID
   * @returns {Array<{ from: string, to: string, axis: 'x'|'y', distancePx: number, ratioToContainer: number }>}
   */
  computeDimensionalGaps(containerId) {
    const allItems = this.all();
    if (allItems.length < 2) return [];

    let containerBox = null;
    let children = [];

    if (containerId) {
      const containerItem = allItems.find((it) => String(it.id) === String(containerId));
      if (containerItem) {
        containerBox = {
          minX: containerItem.minX,
          minY: containerItem.minY,
          maxX: containerItem.maxX,
          maxY: containerItem.maxY
        };
      }

      children = allItems.filter((it) => {
        if (String(it.id) === String(containerId)) return false;
        if (it.containerId !== undefined && String(it.containerId) === String(containerId)) return true;
        if (it.parentId !== undefined && String(it.parentId) === String(containerId)) return true;
        if (it.data?.containerId !== undefined && String(it.data.containerId) === String(containerId)) return true;
        if (it.data?.parentId !== undefined && String(it.data.parentId) === String(containerId)) return true;
        return false;
      });

      if (children.length === 0 && containerBox) {
        children = allItems.filter((it) => {
          if (String(it.id) === String(containerId)) return false;
          return it.minX >= containerBox.minX && it.maxX <= containerBox.maxX &&
                 it.minY >= containerBox.minY && it.maxY <= containerBox.maxY;
        });
      }
    }

    if (children.length === 0) {
      children = containerId ? allItems.filter((it) => String(it.id) !== String(containerId)) : allItems.slice();
    }

    if (children.length < 2) return [];

    if (!containerBox) {
      containerBox = this.root.bbox || SpatialRTree.calcBBox({ entries: children });
    }

    const containerWidth = containerBox ? Math.max(1, containerBox.maxX - containerBox.minX) : 1;
    const containerHeight = containerBox ? Math.max(1, containerBox.maxY - containerBox.minY) : 1;

    const gaps = [];

    // Axis 'x' (horizontal spacing between siblings in overlapping horizontal rows)
    const sortedX = children.slice().sort((a, b) => a.minX - b.minX || a.minY - b.minY);
    let xGapsCount = 0;
    for (let i = 0; i < sortedX.length - 1; i++) {
      const fromItem = sortedX[i];
      for (let j = i + 1; j < sortedX.length; j++) {
        const toItem = sortedX[j];
        const yOverlap = Math.max(fromItem.minY, toItem.minY) < Math.min(fromItem.maxY, toItem.maxY);
        if (yOverlap) {
          const distancePx = Math.max(0, toItem.minX - fromItem.maxX);
          const ratioToContainer = Number((distancePx / containerWidth).toFixed(4));
          gaps.push({
            from: String(fromItem.id || `node-${i}`),
            to: String(toItem.id || `node-${j}`),
            axis: 'x',
            distancePx: Number(distancePx.toFixed(2)),
            ratioToContainer
          });
          xGapsCount++;
          break;
        }
      }
    }
    // Fallback if no siblings shared horizontal bands
    if (xGapsCount === 0) {
      for (let i = 0; i < sortedX.length - 1; i++) {
        const fromItem = sortedX[i];
        const toItem = sortedX[i + 1];
        const distancePx = Math.max(0, toItem.minX - fromItem.maxX);
        const ratioToContainer = Number((distancePx / containerWidth).toFixed(4));
        gaps.push({
          from: String(fromItem.id || `node-${i}`),
          to: String(toItem.id || `node-${i + 1}`),
          axis: 'x',
          distancePx: Number(distancePx.toFixed(2)),
          ratioToContainer
        });
      }
    }

    // Axis 'y' (vertical spacing between siblings in overlapping vertical columns)
    const sortedY = children.slice().sort((a, b) => a.minY - b.minY || a.minX - b.minX);
    let yGapsCount = 0;
    for (let i = 0; i < sortedY.length - 1; i++) {
      const fromItem = sortedY[i];
      for (let j = i + 1; j < sortedY.length; j++) {
        const toItem = sortedY[j];
        const xOverlap = Math.max(fromItem.minX, toItem.minX) < Math.min(fromItem.maxX, toItem.maxX);
        if (xOverlap) {
          const distancePx = Math.max(0, toItem.minY - fromItem.maxY);
          const ratioToContainer = Number((distancePx / containerHeight).toFixed(4));
          gaps.push({
            from: String(fromItem.id || `node-${i}`),
            to: String(toItem.id || `node-${j}`),
            axis: 'y',
            distancePx: Number(distancePx.toFixed(2)),
            ratioToContainer
          });
          yGapsCount++;
          break;
        }
      }
    }
    // Fallback if no siblings shared vertical columns
    if (yGapsCount === 0) {
      for (let i = 0; i < sortedY.length - 1; i++) {
        const fromItem = sortedY[i];
        const toItem = sortedY[i + 1];
        const distancePx = Math.max(0, toItem.minY - fromItem.maxY);
        const ratioToContainer = Number((distancePx / containerHeight).toFixed(4));
        gaps.push({
          from: String(fromItem.id || `node-${i}`),
          to: String(toItem.id || `node-${i + 1}`),
          axis: 'y',
          distancePx: Number(distancePx.toFixed(2)),
          ratioToContainer
        });
      }
    }

    return gaps;
  }
}

/**
 * Typographic Energy function per Equation 24:
 * E_typo(v) = ws * (F_size/16)^2 + ww * (F_weight/400) + wa * ln(1 + Av) + wr * (Wv/Hv)
 * where ws = 0.45, ww = 0.25, wa = 0.20, wr = 0.10.
 * Elements with E_typo >= 3.8 are prioritized as editorial headlines.
 * 
 * @param {number} fontSize Font size in pixels
 * @param {number} fontWeight Font weight (e.g. 400, 700)
 * @param {number} area Bounding box area (width * height)
 * @param {number} width Element bounding box width
 * @param {number} height Element bounding box height
 * @returns {number} Typographic energy score
 */
function computeTypographicEnergy(fontSize, fontWeight, area, width, height) {
  const ws = 0.45;
  const ww = 0.25;
  const wa = 0.20;
  const wr = 0.10;
  const sizeRatio = fontSize / 16.0;
  const weightRatio = fontWeight / 400.0;
  const areaTerm = Math.log(1.0 + Math.max(0, area));
  const aspectTerm = height > 0 ? (width / height) : 1.0;

  return ws * (sizeRatio * sizeRatio) +
         ww * weightRatio +
         wa * areaTerm +
         wr * aspectTerm;
}

/**
 * Subtree Isomorphism area Coefficient of Variation (CV) per Equation 25:
 * CV_area = sigma_area / mu_area <= 0.15
 * Used to detect repeating card collections, grids, and carousels.
 * 
 * @param {Array<number>} areas Array of element areas
 * @returns {number} Coefficient of variation
 */
function computeAreaCV(areas) {
  if (!areas || areas.length === 0) return 0;
  const mean = areas.reduce((s, a) => s + a, 0) / areas.length;
  if (mean === 0) return 0;
  const variance = areas.reduce((s, a) => s + Math.pow(a - mean, 2), 0) / areas.length;
  const std = Math.sqrt(variance);
  return std / mean;
}

module.exports = {
  SpatialRTree,
  computeTypographicEnergy,
  computeAreaCV
};
