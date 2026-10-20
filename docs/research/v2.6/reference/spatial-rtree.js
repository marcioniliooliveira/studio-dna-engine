/**
 * docs/research/v2.6/reference/spatial-rtree.js
 * 
 * Studio DNA PRO v2.6 — Zero-Dependency Core Reference Micro-Engine
 * Feature: Pure JS 2D R-Tree & Typographic Energy Slot Tagger (R6.1, Pillar 6)
 * 
 * Standards & Mathematics:
 * - Guttman (1984) R-Tree Quadratic Split with configurable node capacity (M=9, m=4)
 * - Typographic Energy function E_typo(v) per Equation 24
 * - Subtree Isomorphism area CV per Equation 25
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
   * Inserts a bounding box entry into the R-Tree.
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

    // Pick Seeds: find pair with maximum wasted area
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
   * Bulk loads items into the tree.
   * @param {Array<object>} items
   */
  load(items) {
    if (!Array.isArray(items)) return;
    for (const item of items) {
      this.insert(item);
    }
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
