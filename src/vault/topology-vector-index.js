/**
 * src/vault/topology-vector-index.js
 *
 * Deterministic Topology Feature Vector (DTFV) Index.
 * Extracts a 12-dimensional vector [0, 1] representing structural and geometric layout features:
 * 1. cardDensity
 * 2. gridProportion
 * 3. domDepth
 * 4. canvasPresence
 * 5. listCardinality
 * 6. headingDensity
 * 7. interactiveDensity
 * 8. mediaRatio
 * 9. textBlockProportion
 * 10. formalityFactor
 * 11. slotDensity
 * 12. visualWeight
 */

'use strict';

const cheerio = require('cheerio');

const TOPOLOGY_DIMENSIONS = Object.freeze([
  'cardDensity',
  'gridProportion',
  'domDepth',
  'canvasPresence',
  'listCardinality',
  'headingDensity',
  'interactiveDensity',
  'mediaRatio',
  'textBlockProportion',
  'formalityFactor',
  'slotDensity',
  'visualWeight'
]);

/**
 * Calculates max DOM depth of Cheerio tree
 */
function calculateDomDepth($, el, currentDepth = 1) {
  let max = currentDepth;
  $(el).children().each((_, child) => {
    if (child.type === 'tag') {
      const childDepth = calculateDomDepth($, child, currentDepth + 1);
      if (childDepth > max) max = childDepth;
    }
  });
  return max;
}

/**
 * Extracts the 12-dimensional DTFV [0, 1] from an HTML string or Cheerio instance.
 *
 * @param {string|object} htmlOrCheerio
 * @returns {Float32Array} 12-dimensional normalized vector
 */
function extractTopologyVector(htmlOrCheerio) {
  const vec = new Float32Array(12);

  if (!htmlOrCheerio || (typeof htmlOrCheerio === 'string' && !htmlOrCheerio.trim())) {
    return vec;
  }

  const $ = typeof htmlOrCheerio === 'function' && htmlOrCheerio.load
    ? htmlOrCheerio
    : cheerio.load(htmlOrCheerio);

  const root = $('body').length ? $('body') : $.root();
  const allElements = root.find('*');
  const totalNodes = allElements.length;

  if (totalNodes === 0) {
    return vec;
  }

  // 1. cardDensity: cards, articles, and card-like containers
  const cardCount = root.find('.card, [class*="card"], article, [data-slot*="card"]').length;
  vec[0] = Math.min(cardCount / 10.0, 1.0);

  // 2. gridProportion: grids, flex rows, multi-column layouts
  const gridCount = root.find('.grid, [class*="grid"], [style*="grid"], .row, [class*="cols-"]').length;
  vec[1] = Math.min(gridCount / 6.0, 1.0);

  // 3. domDepth: maximum nesting level
  let maxDepth = 1;
  root.children().each((_, el) => {
    if (el.type === 'tag') {
      const d = calculateDomDepth($, el, 1);
      if (d > maxDepth) maxDepth = d;
    }
  });
  vec[2] = Math.min(maxDepth / 20.0, 1.0);

  // 4. canvasPresence: WebGL or 2D canvas elements
  const canvasCount = root.find('canvas, .webgl, [data-canvas]').length;
  vec[3] = canvasCount > 0 ? 1.0 : 0.0;

  // 5. listCardinality: list elements
  const listItems = root.find('li').length;
  vec[4] = Math.min(listItems / 12.0, 1.0);

  // 6. headingDensity: h1-h6 tags
  const headingCount = root.find('h1, h2, h3, h4, h5, h6').length;
  vec[5] = Math.min(headingCount / 8.0, 1.0);

  // 7. interactiveDensity: buttons, links, inputs
  const interactiveCount = root.find('button, a, input, select, textarea').length;
  vec[6] = Math.min(interactiveCount / 15.0, 1.0);

  // 8. mediaRatio: images, svgs, videos
  const mediaCount = root.find('img, svg, video, picture').length;
  vec[7] = Math.min(mediaCount / 10.0, 1.0);

  // 9. textBlockProportion: paragraphs, blockquotes
  const textBlocks = root.find('p, blockquote').length;
  vec[8] = Math.min(textBlocks / 10.0, 1.0);

  // 10. formalityFactor: semantic structural containers
  const formalCount = root.find('header, footer, nav, section, main, table, form').length;
  vec[9] = Math.min(formalCount / 10.0, 1.0);

  // 11. slotDensity: [data-kinetic-slot], [data-slot]
  const slotCount = root.find('[data-kinetic-slot], [data-slot], [data-slot-bind]').length;
  vec[10] = Math.min(slotCount / 10.0, 1.0);

  // 12. visualWeight: structural complexity
  vec[11] = Math.min(totalNodes / 100.0, 1.0);

  return vec;
}

/**
 * Calculates cosine similarity between two numeric vectors.
 * Returns value in [0, 1].
 *
 * @param {ArrayLike<number>} vecA
 * @param {ArrayLike<number>} vecB
 * @returns {number}
 */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length || vecA.length === 0) {
    return 0.0;
  }

  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < vecA.length; i++) {
    const a = vecA[i];
    const b = vecB[i];
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  }

  if (normA <= 0.0 || normB <= 0.0) {
    return 0.0;
  }

  const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  return Math.max(0.0, Math.min(1.0, similarity));
}

module.exports = {
  TOPOLOGY_DIMENSIONS,
  extractTopologyVector,
  cosineSimilarity
};
