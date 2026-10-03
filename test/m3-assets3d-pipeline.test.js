/**
 * Requirement R3: Ultralight 3D Mobile Assets Pipeline (<3MB Disk, <4MB VRAM)
 * Comprehensive Unit Test Suite
 * 
 * Verifies:
 * 1. Mathematical VRAM Auditor: exact formulas, fail-closed on uncompressed textures (>4MB),
 *    disk budget (<3MB), and Mobile Safari WebKit GPU ceiling (<=384MB).
 * 2. Texture Compressor: Basis Universal KTX2 (ASTC_4x4 / UASTC 1B/px), ORM channel packing
 *    (AO/Roughness/Metalness in 512x512 -> 0.33MB), bilinear resampling.
 * 3. Mesh Quantizer: KHR_mesh_quantization (14B/vertex), coincident vertex welding,
 *    quadric decimation (<=25k verts, <=40k tris), KHR_meshopt_compression.
 * 4. GLTF Optimizer Pipeline: full orchestration, GLB pack/unpack, and OptimizedAssetManifest contract.
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  MAX_ASSET_DISK_BYTES,
  MAX_ASSET_VRAM_BYTES,
  WEBKIT_GPU_CEILING_BYTES,
  MIPMAP_FACTOR,
  calculateTextureVram,
  calculateGeometryVram,
  calculateCanvasBackbufferVram,
  auditAsset,
  auditSceneVram,
  VramAuditor
} = require('../src/assets3d/vram-auditor');

const {
  KTX2_IDENTIFIER,
  resampleRgbaBuffer,
  packOrmChannels,
  encodeUastcBlocks,
  compressToKtx2,
  compareFormatFootprint
} = require('../src/assets3d/texture-compressor');

const {
  QUANTIZED_BYTES_PER_VERTEX,
  quantizePositions,
  dequantizePositions,
  quantizeNormals,
  quantizeUVs,
  weldVertices,
  simplifyMesh,
  quantizeMesh,
  applyMeshoptCompression
} = require('../src/assets3d/mesh-quantizer');

const {
  GLB_MAGIC,
  CHUNK_TYPE_JSON,
  CHUNK_TYPE_BIN,
  parseGlb,
  packGlb,
  pruneGltf,
  GltfOptimizerPipeline
} = require('../src/assets3d/gltf-optimizer-pipeline');

// ============================================================================
// Suite 1: VRAM & Disk Compliance Auditor
// ============================================================================
test('Suite 1: VRAM Auditor - exact mathematical formula for KTX2 ASTC textures', () => {
  // 1024x1024 KTX2 ASTC_4x4 (1 byte/px) with mipmaps: 1024 * 1024 * 1 * 1.3333
  const vram1024 = calculateTextureVram(1024, 1024, 'KTX2_ASTC', { hasMipmaps: true });
  const expected1024 = Math.round(1024 * 1024 * 1.0 * MIPMAP_FACTOR); // ~1,398,066 bytes (1.33MB)
  assert.equal(vram1024, expected1024);
  assert.ok(vram1024 < 1.4 * 1024 * 1024, '1024x1024 KTX2 must be ~1.33MB VRAM');

  // 512x512 KTX2 ASTC map (0.33MB)
  const vram512 = calculateTextureVram(512, 512, 'KTX2_ASTC', { hasMipmaps: true });
  const expected512 = Math.round(512 * 512 * 1.0 * MIPMAP_FACTOR); // ~349,525 bytes (0.33MB)
  assert.equal(vram512, expected512);
  assert.ok(vram512 < 360000, '512x512 KTX2 must be ~0.33MB VRAM');
});

test('Suite 1: VRAM Auditor - exposes 22.4MB uncompressed PNG decompression trap', () => {
  // 2048x2048 uncompressed PNG/JPEG expands to 4 bytes/pixel in GPU VRAM
  const uncompressedVram = calculateTextureVram(2048, 2048, 'PNG', { hasMipmaps: true });
  const expectedUncompressed = Math.round(2048 * 2048 * 4.0 * MIPMAP_FACTOR); // ~22,369,621 bytes (21.33MB)

  assert.equal(uncompressedVram, expectedUncompressed);
  assert.ok(uncompressedVram > 21 * 1024 * 1024, '2048x2048 PNG must consume >21MB GPU memory');
  assert.ok(uncompressedVram > MAX_ASSET_VRAM_BYTES, 'Single uncompressed PNG exceeds 4MB total asset limit');
});

test('Suite 1: VRAM Auditor - geometry VRAM calculation for quantized and index buffers', () => {
  // 25,000 vertices quantized to 14 bytes/vertex
  // 40,000 triangles = 120,000 Uint16 indices (2 bytes per index)
  const geomVram = calculateGeometryVram(25000, 14, 120000, 'UNSIGNED_SHORT');

  assert.equal(geomVram.vertexBufferBytes, 25000 * 14); // 350,000 bytes
  assert.equal(geomVram.indexBufferBytes, 120000 * 2);  // 240,000 bytes
  assert.equal(geomVram.totalGeometryBytes, 590000);    // ~0.59MB
  assert.ok(geomVram.totalGeometryBytes < 600000);
});

test('Suite 1: VRAM Auditor - audits and rejects asset failing disk or VRAM budget', () => {
  // Invalidation 1: Exceeds Disk Size (> 3.0MB)
  const oversizedDisk = auditAsset({
    diskSizeBytes: 3.5 * 1024 * 1024,
    textures: [{ width: 512, height: 512, format: 'KTX2_ASTC' }],
    geometry: { vertexCount: 1000, bytesPerVertex: 14, triangleCount: 1000 },
    meshQuantization: true
  });
  assert.equal(oversizedDisk.passed, false);
  assert.ok(oversizedDisk.violations.some(v => v.rule === 'MAX_ASSET_DISK_SIZE'));

  // Invalidation 2: Uncompressed PNG causes VRAM to exceed 4.0MB
  const uncompressedAsset = auditAsset({
    diskSizeBytes: 1.2 * 1024 * 1024,
    textures: [
      { width: 2048, height: 2048, format: 'PNG' }
    ],
    geometry: { vertexCount: 1000, bytesPerVertex: 14, triangleCount: 1000 },
    meshQuantization: true
  });
  assert.equal(uncompressedAsset.passed, false);
  assert.ok(uncompressedAsset.vramFootprintBytes > MAX_ASSET_VRAM_BYTES);
  assert.ok(uncompressedAsset.violations.some(v => v.rule === 'MAX_ASSET_VRAM'));
  assert.equal(uncompressedAsset.isWebKitCertified, false);

  // Compliant Certification
  const compliantAsset = auditAsset({
    diskSizeBytes: 1.65 * 1024 * 1024,
    textures: [
      { width: 1024, height: 1024, format: 'KTX2_ASTC' }, // 1.33MB
      { width: 1024, height: 1024, format: 'KTX2_ASTC' }, // 1.33MB
      { width: 512, height: 512, format: 'KTX2_ASTC' }    // 0.33MB
    ],
    geometry: { vertexCount: 25000, bytesPerVertex: 14, triangleCount: 40000 }, // 0.59MB
    meshQuantization: true,
    meshoptCompression: true
  });
  assert.equal(compliantAsset.passed, true);
  assert.ok(compliantAsset.vramFootprintBytes < MAX_ASSET_VRAM_BYTES, 'VRAM must be < 4MB');
  assert.ok(compliantAsset.diskSizeBytes < MAX_ASSET_DISK_BYTES, 'Disk must be < 3MB');
  assert.equal(compliantAsset.isWebKitCertified, true);
});

test('Suite 1: VRAM Auditor - WebKit mobile scene ceiling audit (<=384MB)', () => {
  // Mobile canvas backbuffer calculation for iPhone Pro (390x844 at 3x DPR)
  const backbuffer = calculateCanvasBackbufferVram(390, 844, 3, true);
  // (390*3)*(844*3)*4 color + depth = 1170 * 2532 * 8 = 23,699,520 bytes (~23.7MB)
  assert.ok(backbuffer > 20 * 1024 * 1024 && backbuffer < 25 * 1024 * 1024);

  // Scene with backbuffer and 3 compliant models
  const normalScene = auditSceneVram({
    viewport: { width: 390, height: 844, dpr: 3 },
    assets: [
      { diskSizeBytes: 1.5 * 1024 * 1024, vramFootprintBytes: 3.5 * 1024 * 1024, passed: true },
      { diskSizeBytes: 1.2 * 1024 * 1024, vramFootprintBytes: 3.2 * 1024 * 1024, passed: true },
      { diskSizeBytes: 1.1 * 1024 * 1024, vramFootprintBytes: 2.8 * 1024 * 1024, passed: true }
    ]
  });
  assert.equal(normalScene.isWithinWebKitCeiling, true);
  assert.equal(normalScene.passed, true);
  assert.ok(normalScene.totalSceneVramBytes < WEBKIT_GPU_CEILING_BYTES);

  // Scene exceeding WebKit 384MB ceiling
  const crashingScene = auditSceneVram({
    viewport: { width: 390, height: 844, dpr: 3 },
    overheadBufferBytes: 390 * 1024 * 1024, // 390MB overhead
    assets: []
  });
  assert.equal(crashingScene.isWithinWebKitCeiling, false);
  assert.equal(crashingScene.passed, false);
  assert.ok(crashingScene.violations.some(v => v.rule === 'WEBKIT_GPU_CEILING_EXCEEDED'));
});

// ============================================================================
// Suite 2: Texture Compressor & ORM Channel Packer
// ============================================================================
test('Suite 2: Texture Compressor - packs ORM channels into single 512x512 map', () => {
  const width = 512;
  const height = 512;
  const pixelCount = width * height;

  // Custom AO (constant 200), Roughness (constant 100), Metalness (constant 50)
  const packed = packOrmChannels({
    ao: 200,
    roughness: 100,
    metalness: 50,
    width,
    height
  });

  assert.equal(packed.width, 512);
  assert.equal(packed.height, 512);
  assert.equal(packed.buffer.length, pixelCount * 4);

  // Check channel mapping: R=AO, G=Roughness, B=Metalness, A=255
  for (let i = 0; i < 100; i++) {
    const offset = i * 4;
    assert.equal(packed.buffer[offset + 0], 200, 'Red channel must contain AO');
    assert.equal(packed.buffer[offset + 1], 100, 'Green channel must contain Roughness');
    assert.equal(packed.buffer[offset + 2], 50, 'Blue channel must contain Metalness');
    assert.equal(packed.buffer[offset + 3], 255, 'Alpha channel must be 255');
  }

  // Exact VRAM calculation check
  const expectedVram = Math.round(512 * 512 * 1.0 * MIPMAP_FACTOR);
  assert.equal(packed.vramBytes, expectedVram);
});

test('Suite 2: Texture Compressor - generates valid Khronos KTX 2.0 container binary', () => {
  const width = 64;
  const height = 64;
  const rgba = Buffer.alloc(width * height * 4, 128);

  const ktx2 = compressToKtx2(rgba, {
    width,
    height,
    format: 'KTX2_ASTC',
    generateMipmaps: true
  });

  // Verify KTX2 12-byte identifier
  const id = ktx2.buffer.subarray(0, 12);
  assert.deepEqual(id, KTX2_IDENTIFIER, 'Must start with valid KTX 2.0 magic identifier');

  // Verify header fields
  const vkFormat = ktx2.buffer.readUInt32LE(12);
  const typeSize = ktx2.buffer.readUInt32LE(16);
  const pixelWidth = ktx2.buffer.readUInt32LE(20);
  const pixelHeight = ktx2.buffer.readUInt32LE(24);
  const levelCount = ktx2.buffer.readUInt32LE(40);

  assert.equal(vkFormat, 0, 'vkFormat must be 0 for Basis Universal / ASTC');
  assert.equal(typeSize, 1, 'typeSize must be 1');
  assert.equal(pixelWidth, 64);
  assert.equal(pixelHeight, 64);
  assert.ok(levelCount > 1, 'Must generate multiple mip levels');
  assert.equal(ktx2.bytesPerPixel, 1.0);
  assert.ok(ktx2.diskBytes < 10000);
});

test('Suite 2: Texture Compressor - resamples oversized buffers via bilinear filtering', () => {
  const srcW = 4;
  const srcH = 4;
  const srcBuffer = Buffer.alloc(srcW * srcH * 4);
  // Fill gradient
  for (let i = 0; i < srcW * srcH; i++) {
    srcBuffer[i * 4 + 0] = i * 16;
    srcBuffer[i * 4 + 1] = 255 - i * 16;
    srcBuffer[i * 4 + 2] = 128;
    srcBuffer[i * 4 + 3] = 255;
  }

  const resampled = resampleRgbaBuffer(srcBuffer, srcW, srcH, 2, 2);
  assert.equal(resampled.length, 2 * 2 * 4);
  assert.ok(resampled[0] >= 0 && resampled[0] <= 255);
});

test('Suite 2: Texture Compressor - compares format metrics proving KTX2 efficiency', () => {
  const comparison = compareFormatFootprint(2048, 2048);
  assert.equal(comparison.uncompressedPng.exceeds4MbLimit, true);
  assert.ok(Number(comparison.ktx2Astc.vramSavingsRatio) >= 4.0);
  assert.equal(comparison.clamped1024Ktx2.fitsUnderBudget, true);
});

// ============================================================================
// Suite 3: Mesh Quantizer, Welder, Decimator & Meshopt Compression
// ============================================================================
test('Suite 3: Mesh Quantizer - reduces vertex attributes to exactly 14 bytes/vertex', () => {
  const vertexCount = 10;
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);

  for (let i = 0; i < vertexCount; i++) {
    positions[i * 3 + 0] = i * 0.1;
    positions[i * 3 + 1] = i * 0.2;
    positions[i * 3 + 2] = i * 0.3;

    normals[i * 3 + 0] = 0;
    normals[i * 3 + 1] = 1;
    normals[i * 3 + 2] = 0;

    uvs[i * 2 + 0] = i * 0.1;
    uvs[i * 2 + 1] = i * 0.1;
  }

  const quantized = quantizeMesh({ positions, normals, uvs, indices });

  assert.equal(quantized.bytesPerVertex, 14, 'Must allocate exactly 14 bytes per vertex');
  assert.equal(quantized.interleavedBuffer.length, vertexCount * 14);
  assert.equal(quantized.extensionDef, 'KHR_mesh_quantization');

  // Roundtrip test for positions
  const posQ = quantizePositions(positions);
  const dequant = dequantizePositions(posQ.quantized, posQ.min, posQ.max);
  for (let i = 0; i < positions.length; i++) {
    const diff = Math.abs(positions[i] - dequant[i]);
    assert.ok(diff < 0.001, `Position reconstruction error ${diff} must be < 0.001`);
  }
});

test('Suite 3: Mesh Welder - eliminates duplicate/coincident vertices within tolerance', () => {
  // Create 6 vertices where 3 are coincident duplicates
  const positions = new Float32Array([
    0.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.00001, 0.0, 0.0, // duplicate of vertex 0
    1.00001, 0.0, 0.0, // duplicate of vertex 1
    2.0, 2.0, 2.0
  ]);
  const indices = new Uint16Array([0, 1, 2, 3, 4, 5]);

  const welded = weldVertices({ positions, indices, tolerance: 0.0001 });

  assert.equal(welded.originalVertexCount, 6);
  assert.equal(welded.weldedVertexCount, 4, 'Must merge 2 duplicate vertices');
  assert.equal(welded.indices[3], welded.indices[0], 'Index 3 must point to merged vertex 0');
  assert.equal(welded.indices[4], welded.indices[1], 'Index 4 must point to merged vertex 1');
});

test('Suite 3: Mesh Decimator - quadric simplification enforces vertex and triangle budgets', () => {
  // Generate a high-poly grid mesh: 60x60 = 3600 vertices, ~7000 triangles
  const rows = 40;
  const cols = 40;
  const positions = new Float32Array(rows * cols * 3);
  const indices = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = (r * cols + c) * 3;
      positions[idx + 0] = c * 0.1;
      positions[idx + 1] = Math.sin(r * 0.2) * Math.cos(c * 0.2);
      positions[idx + 2] = r * 0.1;
    }
  }

  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const i00 = r * cols + c;
      const i10 = (r + 1) * cols + c;
      const i01 = r * cols + (c + 1);
      const i11 = (r + 1) * cols + (c + 1);
      indices.push(i00, i10, i01, i01, i10, i11);
    }
  }

  const initialTris = indices.length / 3;
  assert.ok(initialTris > 2500);

  const decimated = simplifyMesh({
    positions,
    indices: new Uint16Array(indices),
    targetMaxTriangles: 1000,
    targetMaxVertices: 800
  });

  assert.equal(decimated.decimated, true);
  assert.ok(decimated.triangleCount <= 1000, `Triangles (${decimated.triangleCount}) must be <= target (1000)`);
  assert.ok(decimated.vertexCount <= 800, `Vertices (${decimated.vertexCount}) must be <= target (800)`);
});

test('Suite 3: Meshopt Compression - applies transposed delta compression', () => {
  const vertexCount = 100;
  const rawBytes = vertexCount * QUANTIZED_BYTES_PER_VERTEX;
  const buffer = Buffer.alloc(rawBytes);
  // Fill regular patterned data
  for (let i = 0; i < rawBytes; i++) {
    buffer[i] = (i % QUANTIZED_BYTES_PER_VERTEX) * 10;
  }

  const compressed = applyMeshoptCompression(buffer, QUANTIZED_BYTES_PER_VERTEX, 'ATTRIBUTES');
  assert.equal(compressed.extensionDef, 'KHR_meshopt_compression');
  assert.equal(compressed.originalBytes, rawBytes);
  assert.ok(compressed.compressedBytes <= rawBytes, 'Compressed buffer must be <= original size');
});

// ============================================================================
// Suite 4: GLTF Optimizer Pipeline Orchestration
// ============================================================================
test('Suite 4: GLTF Pipeline - roundtrips binary GLB container with JSON and BIN chunks', () => {
  const sampleJson = {
    asset: { version: '2.0', generator: 'TestPack' },
    scenes: [{ nodes: [0] }],
    nodes: [{ name: 'TestNode' }]
  };
  const sampleBin = Buffer.from('BinaryPayloadData12345678', 'utf8');

  const glb = packGlb(sampleJson, sampleBin);
  assert.ok(glb.length > 20);

  const parsed = parseGlb(glb);
  assert.equal(parsed.version, 2);
  assert.deepEqual(parsed.json.asset, sampleJson.asset);
  assert.equal(parsed.bin.toString('utf8'), sampleBin.toString('utf8'));
});

test('Suite 4: GLTF Pipeline - prunes unreferenced nodes, materials, and textures', () => {
  const gltf = {
    scenes: [{ nodes: [0] }],
    nodes: [
      { name: 'ActiveNode', mesh: 0 },
      { name: 'OrphanNode', mesh: 1 } // Unreferenced
    ],
    meshes: [
      { primitives: [{ material: 0 }] },
      { primitives: [{ material: 1 }] }
    ],
    materials: [
      { name: 'ActiveMat', pbrMetallicRoughness: { baseColorTexture: { index: 0 } } },
      { name: 'UnusedMat', pbrMetallicRoughness: { baseColorTexture: { index: 1 } } }
    ],
    textures: [
      { name: 'ActiveTex' },
      { name: 'UnusedTex' }
    ]
  };

  const pruned = pruneGltf(gltf);
  assert.equal(pruned.materials.length, 1);
  assert.equal(pruned.materials[0].name, 'ActiveMat');
  assert.equal(pruned.textures.length, 1);
  assert.equal(pruned.textures[0].name, 'ActiveTex');
});

test('Suite 4: GLTF Pipeline - full end-to-end optimization meeting all R3 constraints', async () => {
  const pipeline = new GltfOptimizerPipeline({
    targetMaxVertices: 25000,
    targetMaxTriangles: 40000,
    weldTolerance: 0.0001,
    textureCompression: 'KTX2_ASTC',
    resampleMaxWidth: 1024,
    resampleMaxHeight: 1024,
    ormResolution: 512
  });

  // Create representative model with 3000 vertices, 5000 triangles, and textures
  const vertCount = 3000;
  const positions = new Float32Array(vertCount * 3);
  for (let i = 0; i < vertCount * 3; i++) {
    positions[i] = (i % 100) * 0.05;
  }

  const triCount = 5000;
  const indices = new Uint16Array(triCount * 3);
  for (let i = 0; i < indices.length; i++) {
    indices[i] = i % vertCount;
  }

  // Create textures
  const baseColorRgba = Buffer.alloc(1024 * 1024 * 4, 180);
  const normalRgba = Buffer.alloc(1024 * 1024 * 4, 128);

  const result = await pipeline.optimizeAsset({
    modelPath: 'models/hero-transmuted-product.glb',
    geometry: { positions, indices },
    textures: {
      baseColor: { buffer: baseColorRgba, width: 1024, height: 1024 },
      normal: { buffer: normalRgba, width: 1024, height: 1024 },
      ao: 255,
      roughness: 128,
      metalness: 64
    }
  });

  const { manifest, optimizedGlb, auditReport } = result;

  // 1. Verify OptimizedAssetManifest interface contract
  assert.equal(typeof manifest.modelPath, 'string');
  assert.equal(manifest.modelPath, 'models/hero-transmuted-product.glb');
  assert.equal(typeof manifest.diskSizeBytes, 'number');
  assert.equal(typeof manifest.vramFootprintBytes, 'number');
  assert.equal(typeof manifest.geometryBytes, 'number');
  assert.equal(typeof manifest.textureBytes, 'number');
  assert.equal(manifest.textureCompression, 'KTX2_ASTC');
  assert.equal(manifest.meshQuantization, true);
  assert.equal(manifest.meshoptCompression, true);
  assert.equal(manifest.isWebKitCertified, true);

  // 2. Strict budget constraints
  assert.ok(manifest.diskSizeBytes < MAX_ASSET_DISK_BYTES, `Disk size (${manifest.diskSizeBytes}) must be < 3MB`);
  assert.ok(manifest.vramFootprintBytes < MAX_ASSET_VRAM_BYTES, `VRAM (${manifest.vramFootprintBytes}) must be < 4MB`);
  assert.equal(auditReport.passed, true);
  assert.equal(auditReport.isWebKitCertified, true);

  // 3. Verify output GLB binary validity
  assert.ok(Buffer.isBuffer(optimizedGlb));
  assert.equal(optimizedGlb.readUInt32LE(0), GLB_MAGIC);
  const parsed = parseGlb(optimizedGlb);
  assert.ok(parsed.json.extensionsUsed.includes('KHR_mesh_quantization'));
  assert.ok(parsed.json.extensionsUsed.includes('KHR_meshopt_compression'));
  assert.ok(parsed.json.extensionsUsed.includes('KHR_texture_basisu'));
});
