/**
 * Kinetic Grammar Schema (Requirement R4)
 * 
 * Declarative Zod schema for kinetic composition grammar:
 * 1. Stage boundaries & kinetic primitives (HeroCinematicStage, HorizontalPinRail, InteractiveBento, ThreeJsCanvasStage, StickyStoryChapters)
 * 2. Slot primitives ([data-kinetic-slot]) with character budgeting
 * 3. Enforces donut scoping invariants via CSS @scope (.kinetic-stage) to ([data-kinetic-slot])
 * 4. Integrates upstream contracts (M1 KineticTimelineIR, M2 Trajectory & Anchors, M3 OptimizedAssetManifest)
 */

'use strict';

const { z } = require('zod');

// ============================================================================
// 1. Primitive & Slot Type Enumerations
// ============================================================================

const KINETIC_PRIMITIVES = [
  'HeroCinematicStage',
  'HorizontalPinRail',
  'InteractiveBento',
  'ThreeJsCanvasStage',
  'StickyStoryChapters'
];

const SLOT_TYPES = [
  'text',
  'heading',
  'rich-text',
  'image',
  'video',
  'badge',
  'button',
  'canvas'
];

const TEXTURE_COMPRESSION_TYPES = [
  'KTX2_ASTC',
  'KTX2_UASTC'
];

// ============================================================================
// 2. Donut Scope & Budget Schemas
// ============================================================================

const DonutScopeConfigSchema = z.object({
  rootSelector: z.string().min(1).default('.kinetic-stage'),
  boundarySelector: z.string().min(1).default('[data-kinetic-slot]'),
  allowPiercing: z.boolean().default(false)
});

const CharacterBudgetSchema = z.object({
  target: z.number().int().positive(),
  min: z.number().int().nonnegative().optional(),
  max: z.number().int().positive().optional(),
  tolerance: z.number().min(0).max(1).default(0.15)
}).refine(data => {
  if (data.min !== undefined && data.max !== undefined) {
    return data.min <= data.max;
  }
  return true;
}, { message: 'CharacterBudget: min must be <= max' });

// ============================================================================
// 3. Slot Schema
// ============================================================================

const KineticSlotSchema = z.object({
  slotId: z.string().min(1, 'slotId must not be empty').regex(/^[a-zA-Z0-9_\-]+$/, 'slotId must be alphanumeric with dashes or underscores'),
  slotType: z.enum(SLOT_TYPES),
  targetSelector: z.string().min(1, 'targetSelector must not be empty'),
  characterBudget: CharacterBudgetSchema.optional(),
  content: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  attributes: z.record(z.string(), z.string()).optional(),
  transmuted: z.boolean().optional()
});

// ============================================================================
// 4. Optical Anchor Schema (M2 Contract)
// ============================================================================

const OpticalAnchorSchema = z.object({
  id: z.string().min(1, 'Anchor ID must not be empty'),
  worldPoint: z.tuple([z.number(), z.number(), z.number()]),
  normal: z.tuple([z.number(), z.number(), z.number()]),
  title: z.string().min(1, 'Anchor title must not be empty'),
  description: z.string().min(1, 'Anchor description must not be empty'),
  safeArea: z.object({
    xMin: z.number(),
    xMax: z.number(),
    yMin: z.number(),
    yMax: z.number()
  }),
  badgeConfig: z.object({
    variant: z.string().optional(),
    position: z.enum(['top-left', 'top-right', 'bottom-left', 'bottom-right', 'auto']).optional().default('auto'),
    visible: z.boolean().optional().default(true)
  }).optional()
});

// ============================================================================
// 5. Optimized Asset Manifest Schema (M3 Contract)
// ============================================================================

const MAX_ASSET_DISK_BYTES = 3 * 1024 * 1024; // 3,145,728 bytes (<3MB)
const MAX_ASSET_VRAM_BYTES = 4 * 1024 * 1024; // 4,194,304 bytes (<4MB)

const OptimizedAssetManifestSchema = z.object({
  modelPath: z.string().min(1, 'modelPath must not be empty'),
  diskSizeBytes: z.number().int().positive().max(MAX_ASSET_DISK_BYTES, `diskSizeBytes must be strictly < 3MB (${MAX_ASSET_DISK_BYTES} bytes)`),
  vramFootprintBytes: z.number().int().positive().max(MAX_ASSET_VRAM_BYTES, `vramFootprintBytes must be strictly < 4MB (${MAX_ASSET_VRAM_BYTES} bytes)`),
  geometryBytes: z.number().int().nonnegative(),
  textureBytes: z.number().int().nonnegative(),
  textureCompression: z.enum(TEXTURE_COMPRESSION_TYPES),
  meshQuantization: z.boolean(),
  meshoptCompression: z.boolean(),
  isWebKitCertified: z.boolean()
});

// ============================================================================
// 6. Stage Kinetic Config Schema
// ============================================================================

const StageKineticConfigSchema = z.object({
  // HeroCinematicStage
  cameraTrajectory: z.array(z.object({
    scrollProgress: z.number().min(0).max(1),
    position: z.tuple([z.number(), z.number(), z.number()]),
    target: z.tuple([z.number(), z.number(), z.number()]),
    quaternion: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional()
  })).optional(),
  orbitFov: z.number().positive().optional().default(45),
  pinDuration: z.number().nonnegative().optional(),
  leadAnchorId: z.string().optional(),

  // HorizontalPinRail
  railLength: z.number().positive().optional(),
  itemCount: z.number().int().positive().optional(),
  scrubSpeed: z.number().positive().optional().default(1),
  snapToItems: z.boolean().optional().default(false),

  // InteractiveBento
  columns: z.number().int().positive().optional().default(3),
  rows: z.number().int().positive().optional(),
  gap: z.number().nonnegative().optional().default(24),
  cardTilt3D: z.boolean().optional().default(true),
  hoverScale: z.number().positive().optional().default(1.02),

  // ThreeJsCanvasStage
  canvasSelector: z.string().optional().default('.kinetic-webgl-canvas'),
  antialias: z.boolean().optional().default(true),
  alpha: z.boolean().optional().default(true),
  dprLimit: z.number().positive().optional().default(2),
  modelRef: z.string().optional(),
  ambientLight: z.object({ color: z.string(), intensity: z.number() }).optional(),
  directionalLight: z.object({ color: z.string(), intensity: z.number(), position: z.tuple([z.number(), z.number(), z.number()]) }).optional(),

  // StickyStoryChapters
  chapterCount: z.number().int().positive().optional(),
  fadeProgressive: z.boolean().optional().default(true),
  stickyOffset: z.number().nonnegative().optional().default(0),

  // Common motion parameters
  scrub: z.union([z.boolean(), z.number()]).optional().default(true),
  pin: z.union([z.boolean(), z.string()]).optional().default(true),
  duration: z.number().positive().optional()
}).passthrough();

// ============================================================================
// 7. Kinetic Stage Schema
// ============================================================================

const KineticStageSchema = z.object({
  id: z.string().min(1, 'Stage id must not be empty').regex(/^[a-zA-Z0-9_\-]+$/, 'Stage id must be alphanumeric with dashes or underscores'),
  type: z.enum(KINETIC_PRIMITIVES),
  title: z.string().optional(),
  cssScope: DonutScopeConfigSchema.default({
    rootSelector: '.kinetic-stage',
    boundarySelector: '[data-kinetic-slot]',
    allowPiercing: false
  }),
  kineticConfig: StageKineticConfigSchema.optional().default({}),
  slots: z.array(KineticSlotSchema).default([]),
  opticalAnchors: z.array(OpticalAnchorSchema).optional().default([]),
  timeline: z.record(z.string(), z.any()).optional()
});

// ============================================================================
// 8. Brand Specification Schema
// ============================================================================

const BrandSpecSchema = z.object({
  brandName: z.string().min(1, 'Brand name must not be empty'),
  tagline: z.string().optional(),
  theme: z.object({
    bgBase: z.string().default('#0a0a0c'),
    accent: z.string().default('#00f0ff'),
    textPrimary: z.string().default('#ffffff'),
    textSecondary: z.string().default('#94a3b8'),
    surface: z.string().default('#13131a'),
    fontFamily: z.string().default('Inter, -apple-system, sans-serif')
  }).passthrough().default({
    bgBase: '#0a0a0c',
    accent: '#00f0ff',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    surface: '#13131a',
    fontFamily: 'Inter, -apple-system, sans-serif'
  }),
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    canonicalUrl: z.string().optional(),
    ogImage: z.string().optional(),
    keywords: z.array(z.string()).optional()
  }).passthrough()
});

// ============================================================================
// 9. Root Kinetic Composition Spec Schema
// ============================================================================

const KineticCompositionSpecSchema = z.object({
  schemaVersion: z.string().default('2.0.0'),
  brandSpec: BrandSpecSchema,
  viewport: z.object({
    width: z.number().int().positive().default(1440),
    height: z.number().int().positive().default(900),
    dpr: z.number().positive().default(1)
  }).default({ width: 1440, height: 900, dpr: 1 }),
  assets: z.array(OptimizedAssetManifestSchema).optional().default([]),
  stages: z.array(KineticStageSchema).min(1, 'Composition must contain at least one stage'),
  globalStyles: z.string().optional()
});

// ============================================================================
// 10. Validation & Donut Scope Utility Functions
// ============================================================================

/**
 * Validates a kinetic composition spec against the schema.
 * Returns { success, data, errors }.
 */
function validateCompositionGrammar(spec) {
  const result = KineticCompositionSpecSchema.safeParse(spec);
  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: []
    };
  }

  const errors = (result.error.issues || []).map(issue => ({
    path: issue.path.join('.'),
    message: issue.message,
    code: issue.code
  }));

  return {
    success: false,
    data: null,
    errors
  };
}

/**
 * Parses and throws on error.
 */
function parseCompositionGrammar(spec) {
  return KineticCompositionSpecSchema.parse(spec);
}

/**
 * Generates modern CSS @scope donut isolation rule:
 * @scope (.kinetic-stage) to ([data-kinetic-slot]) { ... }
 * with fallback prefixing for browsers lacking @scope support.
 */
function generateDonutScopeRule(stageSelector, cssBody, options = {}) {
  const root = options.rootSelector || '.kinetic-stage';
  const boundary = options.boundarySelector || '[data-kinetic-slot]';
  const stageTarget = stageSelector ? `${root}${stageSelector.startsWith('#') || stageSelector.startsWith('.') ? stageSelector : '.' + stageSelector}` : root;

  const scopedCss = `/* Scoped Donut Isolation for ${stageTarget} */
@scope (${stageTarget}) to (${boundary}) {
${cssBody.split('\n').map(l => '  ' + l).join('\n')}
}

/* Fallback for browsers without native @scope support */
@supports not (scope: default) {
  ${stageTarget}:not(${boundary}) {
${cssBody.split('\n').map(l => '    ' + l).join('\n')}
  }
}`;

  return scopedCss;
}

/**
 * Validates that CSS rules comply with donut scoping invariants:
 * styles inside @scope block must not pierce through [data-kinetic-slot] children.
 */
function validateDonutScopeInvariants(cssContent) {
  const violations = [];
  const cleanCss = (cssContent || '').replace(/\/\*[\s\S]*?\*\//g, '');

  // Check for piercing selectors: e.g. [data-kinetic-slot] .child or [data-kinetic-slot] > *
  const piercingPattern = /\[data-kinetic-slot\]\s+[a-zA-Z0-9_.*#\-[\]]+/g;
  let match;
  while ((match = piercingPattern.exec(cleanCss)) !== null) {
    violations.push(`Donut piercing violation: selector '${match[0]}' penetrates slot boundary`);
  }

  // Check for global selector leakages attempting to style slots without scope
  const slotChildOverride = /\.kinetic-stage\s+\[data-kinetic-slot\]\s+[a-zA-Z0-9_.*#\-[\]]+/g;
  while ((match = slotChildOverride.exec(cssContent)) !== null) {
    violations.push(`Donut boundary override violation: '${match[0]}' breaches slot isolation`);
  }

  return {
    compliant: violations.length === 0,
    violations
  };
}

/**
 * Factory helper for creating a kinetic stage.
 */
function createStage(type, id, options = {}) {
  if (!KINETIC_PRIMITIVES.includes(type)) {
    throw new Error(`Invalid kinetic primitive type: '${type}'. Must be one of: ${KINETIC_PRIMITIVES.join(', ')}`);
  }

  return {
    id: id || `stage-${Date.now()}`,
    type,
    title: options.title || `${type} Stage`,
    cssScope: {
      rootSelector: '.kinetic-stage',
      boundarySelector: '[data-kinetic-slot]',
      allowPiercing: false,
      ...(options.cssScope || {})
    },
    kineticConfig: options.kineticConfig || {},
    slots: options.slots || [],
    opticalAnchors: options.opticalAnchors || [],
    timeline: options.timeline || {}
  };
}

/**
 * Factory helper for creating a kinetic slot.
 */
function createSlot(slotId, slotType, options = {}) {
  if (!SLOT_TYPES.includes(slotType)) {
    throw new Error(`Invalid slot type: '${slotType}'. Must be one of: ${SLOT_TYPES.join(', ')}`);
  }

  return {
    slotId,
    slotType,
    targetSelector: options.targetSelector || `[data-kinetic-slot="${slotId}"]`,
    characterBudget: options.characterBudget,
    content: options.content || '',
    attributes: options.attributes || {},
    transmuted: options.transmuted || false
  };
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  // Constants
  KINETIC_PRIMITIVES,
  SLOT_TYPES,
  TEXTURE_COMPRESSION_TYPES,
  MAX_ASSET_DISK_BYTES,
  MAX_ASSET_VRAM_BYTES,

  // Schemas
  DonutScopeConfigSchema,
  CharacterBudgetSchema,
  KineticSlotSchema,
  OpticalAnchorSchema,
  OptimizedAssetManifestSchema,
  StageKineticConfigSchema,
  KineticStageSchema,
  BrandSpecSchema,
  KineticCompositionSpecSchema,

  // Validation & Factory Helpers
  validateCompositionGrammar,
  parseCompositionGrammar,
  generateDonutScopeRule,
  validateDonutScopeInvariants,
  createStage,
  createSlot
};
