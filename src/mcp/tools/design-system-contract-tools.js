/**
 * src/mcp/tools/design-system-contract-tools.js
 *
 * Exposes primitive design system contracts to the MCP server.
 * Implements get_primitive_contract(primitiveName) inspired by
 * agentience/react-design-systems-mcp.
 */

'use strict';

const { z } = require('zod');
const {
  KINETIC_PRIMITIVES,
  generateDonutScopeRule
} = require('../../compiler/kinetic-grammar-schema');

const VALID_PRIMITIVES = Object.freeze([...KINETIC_PRIMITIVES]);

const PrimitiveContractSchema = {
  primitiveName: z.string().describe('Nome da primitiva cinética (HeroCinematicStage, HorizontalPinRail, InteractiveBento, ThreeJsCanvasStage, StickyStoryChapters)')
};

const PRIMITIVE_SPECS = {
  HeroCinematicStage: {
    primitiveName: 'HeroCinematicStage',
    stageSelector: '.kinetic-stage[data-kinetic-stage="HeroCinematicStage"]',
    requiredSlots: ['hero-title', 'hero-description', 'hero-cta'],
    slotDefinitions: [
      { slotId: 'hero-title', slotType: 'heading', characterBudget: { target: 45, tolerance: 0.15 } },
      { slotId: 'hero-description', slotType: 'text', characterBudget: { target: 120, tolerance: 0.15 } },
      { slotId: 'hero-cta', slotType: 'button', characterBudget: { target: 20, tolerance: 0.15 } }
    ],
    physicsConstraints: {
      cameraTrajectory: { minPoints: 2, maxPoints: 8, minFov: 30, maxFov: 60, defaultFov: 45 },
      pinDuration: 1.5,
      scrubSpeed: 1.0,
      maxDpr: 2,
      springStiffness: 120,
      springDamping: 14
    },
    cssScope: generateDonutScopeRule('.kinetic-stage[data-kinetic-stage="HeroCinematicStage"]', `
      position: relative;
      width: 100%;
      min-height: 100vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    `),
    htmlBoilerplate: `
<section class="kinetic-stage hero-stage" data-kinetic-stage="HeroCinematicStage">
  <div class="hero-canvas-container">
    <canvas class="kinetic-webgl-canvas"></canvas>
  </div>
  <div class="hero-content">
    <h1 data-kinetic-slot="hero-title">Experience Kinetic Architecture</h1>
    <p data-kinetic-slot="hero-description">Autonomous design system engineering with sub-second verified contracts.</p>
    <div class="hero-actions" data-kinetic-slot="hero-cta">
      <a href="#explore" class="btn-primary">Explore Work</a>
    </div>
  </div>
</section>
    `.trim()
  },

  HorizontalPinRail: {
    primitiveName: 'HorizontalPinRail',
    stageSelector: '.kinetic-stage[data-kinetic-stage="HorizontalPinRail"]',
    requiredSlots: ['rail-container', 'rail-item'],
    slotDefinitions: [
      { slotId: 'rail-container', slotType: 'rich-text' },
      { slotId: 'rail-item', slotType: 'card' }
    ],
    physicsConstraints: {
      scrubSpeed: 1.0,
      snapToItems: false,
      maxItems: 12,
      railLengthFactor: 2.5,
      inertiaFriction: 0.08
    },
    cssScope: generateDonutScopeRule('.kinetic-stage[data-kinetic-stage="HorizontalPinRail"]', `
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    `),
    htmlBoilerplate: `
<section class="kinetic-stage horizontal-rail" data-kinetic-stage="HorizontalPinRail">
  <div class="rail-track" data-kinetic-slot="rail-container">
    <div class="rail-card" data-kinetic-slot="rail-item">Card 1</div>
  </div>
</section>
    `.trim()
  },

  InteractiveBento: {
    primitiveName: 'InteractiveBento',
    stageSelector: '.kinetic-stage[data-kinetic-stage="InteractiveBento"]',
    requiredSlots: ['bento-grid', 'bento-card-main', 'bento-card-secondary'],
    slotDefinitions: [
      { slotId: 'bento-grid', slotType: 'rich-text' },
      { slotId: 'bento-card-main', slotType: 'card' },
      { slotId: 'bento-card-secondary', slotType: 'card' }
    ],
    physicsConstraints: {
      cardTilt3D: true,
      maxTiltAngleDeg: 12,
      hoverScale: 1.025,
      columns: 3,
      gapPx: 24,
      maxColumns: 4
    },
    cssScope: generateDonutScopeRule('.kinetic-stage[data-kinetic-stage="InteractiveBento"]', `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
      gap: 24px;
      perspective: 1000px;
    `),
    htmlBoilerplate: `
<section class="kinetic-stage bento-stage" data-kinetic-stage="InteractiveBento">
  <div class="bento-grid" data-kinetic-slot="bento-grid">
    <div class="bento-cell" data-kinetic-slot="bento-card-main">Main Feature</div>
    <div class="bento-cell" data-kinetic-slot="bento-card-secondary">Secondary Feature</div>
  </div>
</section>
    `.trim()
  },

  ThreeJsCanvasStage: {
    primitiveName: 'ThreeJsCanvasStage',
    stageSelector: '.kinetic-stage[data-kinetic-stage="ThreeJsCanvasStage"]',
    requiredSlots: ['webgl-canvas', 'canvas-overlay'],
    slotDefinitions: [
      { slotId: 'webgl-canvas', slotType: 'canvas' },
      { slotId: 'canvas-overlay', slotType: 'rich-text' }
    ],
    physicsConstraints: {
      maxDpr: 2,
      maxDiskBytes: 3 * 1024 * 1024, // 3MB disk budget
      maxVramBytes: 4 * 1024 * 1024, // 4MB VRAM footprint
      textureCompression: 'KTX2_ASTC',
      antialias: true,
      alpha: true
    },
    cssScope: generateDonutScopeRule('.kinetic-stage[data-kinetic-stage="ThreeJsCanvasStage"]', `
      position: relative;
      width: 100%;
      height: 100vh;
    `),
    htmlBoilerplate: `
<section class="kinetic-stage canvas-stage" data-kinetic-stage="ThreeJsCanvasStage">
  <canvas class="kinetic-webgl-canvas" data-kinetic-slot="webgl-canvas"></canvas>
  <div class="canvas-overlay" data-kinetic-slot="canvas-overlay"></div>
</section>
    `.trim()
  },

  StickyStoryChapters: {
    primitiveName: 'StickyStoryChapters',
    stageSelector: '.kinetic-stage[data-kinetic-stage="StickyStoryChapters"]',
    requiredSlots: ['chapter-nav', 'chapter-content'],
    slotDefinitions: [
      { slotId: 'chapter-nav', slotType: 'rich-text' },
      { slotId: 'chapter-content', slotType: 'text' }
    ],
    physicsConstraints: {
      chapterCountMin: 2,
      chapterCountMax: 8,
      fadeProgressive: true,
      stickyOffset: 0,
      scrubProgress: true
    },
    cssScope: generateDonutScopeRule('.kinetic-stage[data-kinetic-stage="StickyStoryChapters"]', `
      position: relative;
      width: 100%;
    `),
    htmlBoilerplate: `
<section class="kinetic-stage story-stage" data-kinetic-stage="StickyStoryChapters">
  <div class="story-sticky-pane" data-kinetic-slot="chapter-nav">Progress indicator</div>
  <div class="story-scrolling-chapters" data-kinetic-slot="chapter-content">Chapters</div>
</section>
    `.trim()
  }
};

/**
 * Retrieves the primitive contract specification.
 *
 * @param {string} primitiveName
 * @returns {object}
 */
function getPrimitiveContract(primitiveName) {
  if (!primitiveName || !PRIMITIVE_SPECS[primitiveName]) {
    throw new Error(`Invalid primitive "${primitiveName}". Must be one of: ${VALID_PRIMITIVES.join(', ')}`);
  }
  return PRIMITIVE_SPECS[primitiveName];
}

/**
 * Registers design system contract tools onto McpServer
 */
function registerDesignSystemContractTools(server) {
  server.tool(
    'get_primitive_contract',
    'Retorna a estrutura obrigatória de data-kinetic-*, @scope donut isolation e restrições de física para uma primitiva UI.',
    PrimitiveContractSchema,
    async ({ primitiveName }) => {
      try {
        const contract = getPrimitiveContract(primitiveName);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(contract, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: err.message }]
        };
      }
    }
  );
}

module.exports = {
  VALID_PRIMITIVES,
  PrimitiveContractSchema,
  getPrimitiveContract,
  registerDesignSystemContractTools
};
