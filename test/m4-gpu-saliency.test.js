/**
 * Requirement R4: GPU Texture Pipeline (KTX2 / Basis Universal) & Visual Saliency Attention Oracle
 * Unit Test Suite — Milestone M4
 * 
 * Verifies:
 * 1. TextureCompressor KTX2 Transcoding Pipeline:
 *    - UASTC block compression (1 byte/pixel, 16-byte blocks) for Normal and ORM textures
 *    - ETC1S block compression (0.5 bytes/pixel, 8-byte blocks) for BaseColor/Albedo textures
 *    - ORM channel packing (AO in R, Roughness in G, Metalness in B) at 512x512 (0.33MB VRAM)
 *    - transcodeTexture usage-aware enforcement (UASTC for normals/ORM, ETC1S for color)
 *    - Mathematical VRAM formula: VRAM = sum(W * H * bpp * 1.3333)
 *    - Multi-model scene mathematical proof: 3 interactive models (<=16.0MB total VRAM)
 *    - Fail-closed rejection of uncompressed PNG 22.4MB decompression trap
 * 2. VisualSaliencyOracle 500ms Pre-Attentive Vision Model:
 *    - Multi-scale luminance conspicuity (I = 0.299R + 0.587G + 0.114B)
 *    - Photopic color opponency (RG and BY) with dark background scotopic suppression
 *    - Multi-angle orientation energy across 0°, 45°, 90°, and 135° spatial gradients
 *    - Center-surround Difference-of-Gaussians with 500ms foveal Gaussian center prior
 *    - Clean high-contrast CTA fixture passes with Score_CTA >= 0.18, DistractionRatio <= 0.35, rank <= 2
 *    - Cluttered radioactive halo fixture fails quality gate with high distraction ratio and low prominence
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  TextureCompressor,
  MAX_SCENE_VRAM_BYTES,
  KTX2_IDENTIFIER,
  SUPERCOMPRESSION_NONE,
  SUPERCOMPRESSION_BASISLZ,
  SUPERCOMPRESSION_ZSTD,
  resampleRgbaBuffer,
  packOrmChannels,
  transcodeOrmToKtx2,
  encodeUastcBlocks,
  encodeEtc1sBlocks,
  compressToKtx2,
  transcodeTexture,
  calculateSceneTextureVram,
  auditMultiModelScene,
  compareFormatFootprint
} = require('../src/assets3d/texture-compressor');

const {
  CTA_MIN_PROMINENCE,
  MAX_DISTRACTION_RATIO,
  CTA_MAX_ATTENTION_RANK,
  parseColor,
  gaussianBlur2D,
  computeDifferenceOfGaussians,
  VisualSaliencyOracle
} = require('../src/qa/visual-saliency-oracle');

// ============================================================================
// Suite 1: KTX2 Transcoding, Block Encoding & Channel Packing
// ============================================================================

test('Suite 1: KTX2 - UASTC block encoding maintains exactly 1.0 byte per pixel density', () => {
  const width = 64;
  const height = 64;
  const rgbaBuffer = Buffer.alloc(width * height * 4);

  // Fill with procedural gradient to test real encoding logic
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      rgbaBuffer[idx + 0] = (x * 4) % 256;
      rgbaBuffer[idx + 1] = (y * 4) % 256;
      rgbaBuffer[idx + 2] = ((x + y) * 2) % 256;
      rgbaBuffer[idx + 3] = 255;
    }
  }

  const uastcBlocks = encodeUastcBlocks(rgbaBuffer, width, height);
  const totalBlocks = (width / 4) * (height / 4); // 16 * 16 = 256 blocks
  const expectedBytes = totalBlocks * 16; // 16 bytes per block = 4096 bytes

  assert.equal(uastcBlocks.length, expectedBytes);
  assert.equal(uastcBlocks.length, width * height * 1.0, 'UASTC memory density must be strictly 1.0 byte/pixel');
});

test('Suite 1: KTX2 - ETC1S block encoding achieves 0.5 byte per pixel density for baseColor', () => {
  const width = 64;
  const height = 64;
  const rgbaBuffer = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    rgbaBuffer[i * 4 + 0] = 180;
    rgbaBuffer[i * 4 + 1] = 120;
    rgbaBuffer[i * 4 + 2] = 60;
    rgbaBuffer[i * 4 + 3] = 255;
  }

  const etc1sBlocks = encodeEtc1sBlocks(rgbaBuffer, width, height);
  const totalBlocks = (width / 4) * (height / 4); // 256 blocks
  const expectedBytes = totalBlocks * 8; // 8 bytes per block = 2048 bytes

  assert.equal(etc1sBlocks.length, expectedBytes);
  assert.equal(etc1sBlocks.length, width * height * 0.5, 'ETC1S memory density must be strictly 0.5 byte/pixel');
});

test('Suite 1: KTX2 - Container binary generates valid KTX 2.0 header and DFD descriptor', () => {
  const width = 128;
  const height = 128;
  const rgba = Buffer.alloc(width * height * 4);
  rgba.fill(200);

  // 1. Test UASTC KTX2
  const ktx2Uastc = compressToKtx2(rgba, { width, height, format: 'KTX2_UASTC' });
  assert.ok(ktx2Uastc.buffer.slice(0, 12).equals(KTX2_IDENTIFIER), 'Must start with KTX2 magic identifier');
  assert.equal(ktx2Uastc.format, 'KTX2_UASTC');
  assert.equal(ktx2Uastc.bytesPerPixel, 1.0);
  assert.equal(ktx2Uastc.width, width);
  assert.equal(ktx2Uastc.height, height);

  // 2. Test ETC1S KTX2
  const ktx2Etc1s = compressToKtx2(rgba, { width, height, format: 'KTX2_ETC1S' });
  assert.ok(ktx2Etc1s.buffer.slice(0, 12).equals(KTX2_IDENTIFIER));
  assert.equal(ktx2Etc1s.format, 'KTX2_ETC1S');
  assert.equal(ktx2Etc1s.bytesPerPixel, 0.5);
  assert.ok(ktx2Etc1s.vramBytes < ktx2Uastc.vramBytes, 'ETC1S VRAM footprint must be half of UASTC');
});

test('Suite 1: KTX2 - ORM channel packing packs AO, Roughness, Metalness into 512x512 texture', () => {
  const ao = Buffer.alloc(512 * 512).fill(240); // R: AO = 0.94
  const roughness = Buffer.alloc(512 * 512).fill(110); // G: Roughness = 0.43
  const metalness = Buffer.alloc(512 * 512).fill(25); // B: Metalness = 0.10

  const packed = packOrmChannels({ ao, roughness, metalness, width: 512, height: 512 });

  assert.equal(packed.width, 512);
  assert.equal(packed.height, 512);
  assert.equal(packed.buffer.length, 512 * 512 * 4);

  // Check channel sample
  assert.equal(packed.buffer[0], 240, 'R channel must hold Ambient Occlusion');
  assert.equal(packed.buffer[1], 110, 'G channel must hold Roughness');
  assert.equal(packed.buffer[2], 25, 'B channel must hold Metalness');
  assert.equal(packed.buffer[3], 255, 'A channel reserved to 255');

  // Verify VRAM footprint is ~0.33MB
  assert.ok(packed.vramBytes < 360000 && packed.vramBytes > 340000, '512x512 ORM texture must be ~0.33MB VRAM');

  // Test full transcode to KTX2
  const ormKtx2 = transcodeOrmToKtx2({ ao, roughness, metalness, width: 512, height: 512 });
  assert.ok(ormKtx2.ktx2Buffer.slice(0, 12).equals(KTX2_IDENTIFIER));
  assert.equal(ormKtx2.ktx2Report.format, 'KTX2_UASTC');
  assert.equal(ormKtx2.ktx2Report.bytesPerPixel, 1.0);
});

test('Suite 1: KTX2 - transcodeTexture enforces UASTC for normal and ORM maps', () => {
  const testBuffer = Buffer.alloc(256 * 256 * 4).fill(128);

  // Normal map requested with ETC1S preference -> must be forced to UASTC
  const normalResult = transcodeTexture(testBuffer, {
    width: 256,
    height: 256,
    usage: 'normal',
    format: 'KTX2_ETC1S'
  });
  assert.equal(normalResult.format, 'KTX2_UASTC', 'Normal maps must strictly use UASTC to preserve vector angles');
  assert.equal(normalResult.bytesPerPixel, 1.0);

  // ORM map requested with ETC1S preference -> must be forced to UASTC
  const ormResult = transcodeTexture(testBuffer, {
    width: 256,
    height: 256,
    usage: 'orm',
    format: 'KTX2_ETC1S'
  });
  assert.equal(ormResult.format, 'KTX2_UASTC', 'ORM maps must strictly use UASTC to prevent cross-channel bleeding');

  // BaseColor map requested with ETC1S -> permitted to use ETC1S
  const colorResult = transcodeTexture(testBuffer, {
    width: 256,
    height: 256,
    usage: 'baseColor',
    preferEtc1s: true
  });
  assert.equal(colorResult.format, 'KTX2_ETC1S', 'BaseColor textures can use ETC1S for ultra-compressed footprint');
  assert.equal(colorResult.bytesPerPixel, 0.5);
});

// ============================================================================
// Suite 2: Mathematical Scene VRAM Audit (Total VRAM <= 16MB)
// ============================================================================

test('Suite 2: Scene VRAM - proves mathematically that 3 interactive models stay <= 16MB', () => {
  // Model specification:
  // - 1024x1024 UASTC BaseColor: ~1.33MB
  // - 1024x1024 UASTC Normal: ~1.33MB
  // - 512x512 UASTC ORM: ~0.33MB
  // - Geometry (25,000 verts @ 14B + 120,000 uint16 indices): ~0.59MB
  // Total per model: ~3.74MB VRAM
  const heroModel = {
    name: 'jumpflex_kinetic_trampoline_hero',
    textures: [
      { name: 'baseColor', width: 1024, height: 1024, format: 'KTX2_UASTC', usage: 'color' },
      { name: 'normal', width: 1024, height: 1024, format: 'KTX2_UASTC', usage: 'normal' },
      { name: 'orm', width: 512, height: 512, format: 'KTX2_UASTC', usage: 'orm' }
    ],
    geometry: { vertexCount: 25000, bytesPerVertex: 14, triangleCount: 40000, indexCount: 120000 },
    meshQuantization: true
  };

  const sceneModels = [
    heroModel,
    { ...heroModel, name: 'jumpflex_accessory_anchor' },
    { ...heroModel, name: 'jumpflex_safety_net' }
  ];

  const audit = auditMultiModelScene(sceneModels);

  assert.equal(audit.passed, true, 'Scene with 3 models must pass 16MB VRAM audit');
  assert.ok(audit.totalSceneVramBytes <= MAX_SCENE_VRAM_BYTES, 'Total scene VRAM must not exceed 16MB limit');
  assert.ok(audit.totalSceneVramMb < 12.0, `Total VRAM (${audit.totalSceneVramMb}MB) should be ~10.7MB - 11.2MB`);
  assert.equal(audit.violations.length, 0);
  assert.equal(audit.uncompressedCount, 0);
});

test('Suite 2: Scene VRAM - rejects uncompressed 2048x2048 PNG (22.4MB decompression trap)', () => {
  const modelWithUncompressedPng = {
    name: 'trap_model',
    textures: [
      { name: 'uncompressed_diffuse', width: 2048, height: 2048, format: 'PNG' }
    ]
  };

  const audit = auditMultiModelScene([modelWithUncompressedPng]);

  assert.equal(audit.passed, false, 'Uncompressed PNG model must fail scene audit');
  assert.ok(audit.violations.length >= 1);

  const trapViolation = audit.violations.find(v => v.rule === 'UNCOMPRESSED_TEXTURE_TRAP');
  assert.ok(trapViolation, 'Must flag uncompressed texture trap');

  const budgetViolation = audit.violations.find(v => v.rule === 'SCENE_VRAM_BUDGET_EXCEEDED');
  assert.ok(budgetViolation, '2048x2048 uncompressed PNG alone consumes >21MB VRAM and breaches 16MB budget');
});

test('Suite 2: Scene VRAM - compareFormatFootprint verifies 4x to 8x memory advantage of KTX2', () => {
  const comp = compareFormatFootprint(2048, 2048);

  assert.equal(comp.uncompressedPng.bytesPerPixel, 4.0);
  assert.equal(comp.ktx2Astc.bytesPerPixel, 1.0);
  assert.equal(comp.ktx2Etc1s.bytesPerPixel, 0.5);

  assert.ok(comp.uncompressedPng.exceeds4MbLimit, '2048x2048 PNG exceeds single asset limit');
  assert.ok(Number(comp.ktx2Astc.vramSavingsRatio) >= 4.0, 'UASTC/ASTC must be 4x more memory efficient than PNG');
  assert.ok(Number(comp.ktx2Etc1s.vramSavingsRatio) >= 8.0, 'ETC1S must be 8x more memory efficient than PNG');
});

// ============================================================================
// Suite 3: Visual Saliency Attention Prediction Oracle (500ms Glance)
// ============================================================================

test('Suite 3: Visual Saliency - perceptual luminance conforms to Rec.601 coefficients', () => {
  const oracle = new VisualSaliencyOracle();

  // Pure Red: 0.299 * 255 = 76.245
  const lumRed = oracle.computeLuminance(255, 0, 0);
  assert.ok(Math.abs(lumRed - 76.245) < 0.01);

  // Pure Green: 0.587 * 255 = 149.685
  const lumGreen = oracle.computeLuminance(0, 255, 0);
  assert.ok(Math.abs(lumGreen - 149.685) < 0.01);

  // Pure Blue: 0.114 * 255 = 29.07
  const lumBlue = oracle.computeLuminance(0, 0, 255);
  assert.ok(Math.abs(lumBlue - 29.07) < 0.01);
});

test('Suite 3: Visual Saliency - photopic color opponency activates on saturated chromatic accents', () => {
  const oracle = new VisualSaliencyOracle();

  // Volt lime accent: High RG and BY opponency
  const voltLum = oracle.computeLuminance(163, 230, 53);
  const oppVolt = oracle.computeColorOpponency(163, 230, 53, voltLum);
  assert.ok(oppVolt.rg > 0.25, 'Volt lime must exhibit strong Red-Green opponency');
  assert.ok(oppVolt.by > 0.60, 'Volt lime must exhibit strong Blue-Yellow opponency');

  // Dark background (#0B0F19): Low scotopic luminance suppresses color opponency
  const bgLum = oracle.computeLuminance(11, 15, 25);
  const oppBg = oracle.computeColorOpponency(11, 15, 25, bgLum);
  assert.equal(oppBg.rg, 0, 'Dark background must have zero cone opponency in scotopic regime');
  assert.equal(oppBg.by, 0);
});

test('Suite 3: Visual Saliency - clean high-contrast CTA layout passes optical gate', () => {
  const oracle = new VisualSaliencyOracle();
  const cleanFixture = VisualSaliencyOracle.createCleanFixture({
    viewport: { width: 1440, height: 900 }
  });

  const result = oracle.analyzeLayout(cleanFixture);

  assert.equal(result.passed, true, 'Clean layout must pass Visual Saliency Quality Gate');
  assert.ok(
    result.scoreCta >= CTA_MIN_PROMINENCE,
    `Primary CTA Score (${result.scoreCta}) must be >= ${CTA_MIN_PROMINENCE}`
  );
  assert.ok(
    result.distractionRatio <= MAX_DISTRACTION_RATIO,
    `Distraction ratio (${result.distractionRatio}) must be <= ${MAX_DISTRACTION_RATIO}`
  );
  assert.ok(
    result.ctaAttentionRank <= CTA_MAX_ATTENTION_RANK,
    `CTA Attention rank (${result.ctaAttentionRank}) must rank within top ${CTA_MAX_ATTENTION_RANK}`
  );
  assert.equal(result.violations.length, 0);
});

test('Suite 3: Visual Saliency - cluttered / radioactive halo fixture fails optical gate', () => {
  const oracle = new VisualSaliencyOracle();
  const clutteredFixture = VisualSaliencyOracle.createClutteredHaloFixture({
    viewport: { width: 1440, height: 900 }
  });

  const result = oracle.analyzeLayout(clutteredFixture);

  assert.equal(result.passed, false, 'Cluttered layout with radioactive halos must fail gate');
  assert.ok(result.violations.length >= 1, 'Must register explicit gate violations');

  // Distraction ratio should heavily breach the 0.35 limit
  assert.ok(
    result.distractionRatio > MAX_DISTRACTION_RATIO,
    `Distraction ratio (${result.distractionRatio}) should exceed ${MAX_DISTRACTION_RATIO}`
  );

  // Primary CTA prominence should drop below 0.18 due to attention theft
  assert.ok(
    result.scoreCta < CTA_MIN_PROMINENCE,
    `CTA prominence (${result.scoreCta}) should be suppressed below ${CTA_MIN_PROMINENCE}`
  );
});

test('Suite 3: Visual Saliency - analyzeImage direct buffer analysis matches analyzeLayout', () => {
  const oracle = new VisualSaliencyOracle();
  const fixture = VisualSaliencyOracle.createCleanFixture();

  const { buffer, width, height } = oracle.rasterizeLayout(fixture);
  const ctaElem = fixture.elements.find(e => e.id === 'cta');
  const headlineElem = fixture.elements.find(e => e.id === 'headline');

  const resultBuffer = oracle.analyzeImage(buffer, width, height, {
    cta: ctaElem,
    functionalElements: [headlineElem],
    nonFunctionalElements: []
  });

  const resultLayout = oracle.analyzeLayout(fixture);

  assert.equal(resultBuffer.passed, resultLayout.passed);
  assert.equal(resultBuffer.scoreCta, resultLayout.scoreCta);
  assert.equal(resultBuffer.distractionRatio, resultLayout.distractionRatio);
  assert.equal(resultBuffer.ctaAttentionRank, resultLayout.ctaAttentionRank);
});
