/**
 * VRAM & Disk Compliance Auditor for Ultralight 3D Mobile Assets
 * 
 * Enforces strict mathematical limits:
 * - Asset Disk Size < 3.0MB (3,145,728 bytes)
 * - Asset VRAM Footprint < 4.0MB (4,194,304 bytes)
 * - Total WebKit / Mobile Safari Scene VRAM <= 384MB (402,653,184 bytes)
 * 
 * Exact VRAM Formula:
 * VRAM = sum(TexWidth * TexHeight * BytesPerPixel * 1.3333) + VertexBufferBytes + IndexBufferBytes
 */

'use strict';

const MAX_ASSET_DISK_BYTES = 3 * 1024 * 1024; // 3,145,728 bytes (< 3.0MB)
const MAX_ASSET_VRAM_BYTES = 4 * 1024 * 1024; // 4,194,304 bytes (< 4.0MB)
const WEBKIT_GPU_CEILING_BYTES = 384 * 1024 * 1024; // 402,653,184 bytes (<= 384MB)
const MIPMAP_FACTOR = 1.3333; // Standard mipchain factor (1 + 1/4 + 1/16 + ...)

const BYTES_PER_PIXEL_TABLE = {
  // GPU-Native Block Compressed (KTX2 / Basis Universal)
  'KTX2_ASTC': 1.0,
  'KTX2_ASTC_4x4': 1.0,
  'KTX2_UASTC': 1.0,
  'KTX2_BC7': 1.0,
  'KTX2_ETC2': 1.0,
  'KTX2_ETC1S': 0.5,
  'KTX2_BC1': 0.5,
  'KTX2_ASTC_6x6': 16 / 36, // ~0.444 bytes/px
  'KTX2_ASTC_8x8': 0.25,

  // Uncompressed formats (GPU expands on upload via gl.texImage2D)
  'RGBA_UNCOMPRESSED': 4.0,
  'RGBA8': 4.0,
  'PNG': 4.0,
  'JPEG': 4.0,
  'JPG': 4.0,
  'WEBP': 4.0,
  'RGB_UNCOMPRESSED': 4.0, // Mobile GPUs align RGB to 32-bit RGBA texels
  'RGB8': 4.0,
  'R8': 1.0,
  'RG8': 2.0
};

/**
 * Calculates VRAM footprint of a single texture.
 * 
 * @param {number} width - Texture width in pixels
 * @param {number} height - Texture height in pixels
 * @param {string} format - Texture format identifier
 * @param {object} [options] - Configuration options
 * @param {boolean} [options.hasMipmaps=true] - Whether mipmaps are generated
 * @returns {number} VRAM footprint in bytes
 */
function calculateTextureVram(width, height, format = 'KTX2_ASTC', options = {}) {
  const hasMipmaps = options.hasMipmaps !== false;
  const normalizedFormat = String(format || 'KTX2_ASTC').toUpperCase();
  const bpp = BYTES_PER_PIXEL_TABLE[normalizedFormat] !== undefined
    ? BYTES_PER_PIXEL_TABLE[normalizedFormat]
    : (normalizedFormat.includes('KTX2') ? 1.0 : 4.0);

  const baseBytes = width * height * bpp;
  const factor = hasMipmaps ? MIPMAP_FACTOR : 1.0;
  return Math.round(baseBytes * factor);
}

/**
 * Calculates VRAM footprint of 3D geometry (Vertex and Index buffers).
 * 
 * @param {number} vertexCount - Total vertex count
 * @param {number} bytesPerVertex - Bytes allocated per vertex (14B for quantized)
 * @param {number} indexCount - Total triangle indices (3 * triangleCount)
 * @param {string|number} [indexComponentType='UNSIGNED_SHORT'] - Index data type
 * @returns {{ vertexBufferBytes: number, indexBufferBytes: number, totalGeometryBytes: number }}
 */
function calculateGeometryVram(vertexCount, bytesPerVertex = 14, indexCount = 0, indexComponentType = 'UNSIGNED_SHORT') {
  const vertexBufferBytes = Math.round(vertexCount * bytesPerVertex);

  let indexBytesPerElem = 2; // UNSIGNED_SHORT (5123)
  if (indexComponentType === 'UNSIGNED_INT' || indexComponentType === 5125 || indexComponentType === 4) {
    indexBytesPerElem = 4;
  } else if (indexComponentType === 'UNSIGNED_BYTE' || indexComponentType === 5121 || indexComponentType === 1) {
    indexBytesPerElem = 1;
  }

  const indexBufferBytes = Math.round(indexCount * indexBytesPerElem);
  const totalGeometryBytes = vertexBufferBytes + indexBufferBytes;

  return {
    vertexBufferBytes,
    indexBufferBytes,
    totalGeometryBytes
  };
}

/**
 * Calculates Retina mobile canvas backbuffer memory footprint.
 * 
 * @param {number} width - CSS viewport width
 * @param {number} height - CSS viewport height
 * @param {number} dpr - Device pixel ratio (e.g. 3 for iPhone Pro)
 * @param {boolean} [includeDepthStencil=true] - Include 24/8-bit depth/stencil buffer
 * @returns {number} Backbuffer VRAM footprint in bytes
 */
function calculateCanvasBackbufferVram(width = 390, height = 844, dpr = 3, includeDepthStencil = true) {
  const physWidth = Math.round(width * dpr);
  const physHeight = Math.round(height * dpr);
  const colorBufferBytes = physWidth * physHeight * 4; // 32bpp RGBA8
  const depthStencilBytes = includeDepthStencil ? (physWidth * physHeight * 4) : 0; // 24bpp depth + 8bpp stencil
  return colorBufferBytes + depthStencilBytes;
}

/**
 * Audits a single 3D asset descriptor against the strict mobile budgets.
 * 
 * @param {object} asset - Asset description
 * @param {number} asset.diskSizeBytes - Physical asset file size on disk
 * @param {Array<{ width: number, height: number, format: string, name?: string, hasMipmaps?: boolean }>} [asset.textures]
 * @param {object} [asset.geometry] - Geometry parameters
 * @param {number} [asset.geometry.vertexCount] - Vertex count
 * @param {number} [asset.geometry.bytesPerVertex] - Bytes per vertex (14 for KHR_mesh_quantization)
 * @param {number} [asset.geometry.triangleCount] - Triangle count
 * @param {number} [asset.geometry.indexCount] - Index count
 * @param {boolean} [asset.meshQuantization] - Whether KHR_mesh_quantization is enabled
 * @param {boolean} [asset.meshoptCompression] - Whether KHR_meshopt_compression is enabled
 * @returns {object} Audit report
 */
function auditAsset(asset = {}) {
  const diskSizeBytes = Number(asset.diskSizeBytes || 0);
  const textures = Array.isArray(asset.textures) ? asset.textures : [];
  const geometry = asset.geometry || {};

  const vertexCount = Number(geometry.vertexCount || 0);
  const bytesPerVertex = Number(geometry.bytesPerVertex || (asset.meshQuantization ? 14 : 48));
  const triangleCount = geometry.triangleCount !== undefined
    ? Number(geometry.triangleCount)
    : (geometry.indexCount !== undefined ? Math.floor(Number(geometry.indexCount) / 3) : 0);
  const indexCount = geometry.indexCount !== undefined
    ? Number(geometry.indexCount)
    : triangleCount * 3;

  const violations = [];
  const warnings = [];

  // 1. Audit Disk Size (< 3.0MB)
  if (diskSizeBytes >= MAX_ASSET_DISK_BYTES) {
    violations.push({
      rule: 'MAX_ASSET_DISK_SIZE',
      actual: diskSizeBytes,
      limit: MAX_ASSET_DISK_BYTES,
      message: `Asset disk size (${(diskSizeBytes / (1024 * 1024)).toFixed(2)}MB) exceeds limit of 3.0MB (${MAX_ASSET_DISK_BYTES} bytes)`
    });
  }

  // 2. Audit Textures & Detect Uncompressed PNG/JPEG VRAM Trap
  let totalTextureVram = 0;
  let uncompressedCount = 0;
  const auditedTextures = textures.map((tex, idx) => {
    const format = String(tex.format || 'KTX2_ASTC').toUpperCase();
    const isUncompressed = ['PNG', 'JPEG', 'JPG', 'WEBP', 'RGBA_UNCOMPRESSED', 'RGB_UNCOMPRESSED', 'RGBA8', 'RGB8'].includes(format);
    if (isUncompressed) {
      uncompressedCount++;
    }

    const texVram = calculateTextureVram(
      tex.width || 1024,
      tex.height || 1024,
      format,
      { hasMipmaps: tex.hasMipmaps !== false }
    );
    totalTextureVram += texVram;

    return {
      index: idx,
      name: tex.name || `texture_${idx}`,
      width: tex.width,
      height: tex.height,
      format,
      isUncompressed,
      vramBytes: texVram
    };
  });

  if (uncompressedCount > 0) {
    warnings.push({
      rule: 'UNCOMPRESSED_TEXTURE_DETECTED',
      count: uncompressedCount,
      message: `Detected ${uncompressedCount} uncompressed texture(s). Standard PNG/JPEG expands to 4 bytes/pixel in GPU VRAM.`
    });
  }

  // 3. Audit Geometry VRAM
  const geomVram = calculateGeometryVram(
    vertexCount,
    bytesPerVertex,
    indexCount,
    geometry.indexComponentType
  );
  const totalGeometryVram = geomVram.totalGeometryBytes;

  // 4. Exact Total Asset VRAM
  const totalVramFootprintBytes = totalTextureVram + totalGeometryVram;

  if (totalVramFootprintBytes >= MAX_ASSET_VRAM_BYTES) {
    violations.push({
      rule: 'MAX_ASSET_VRAM',
      actual: totalVramFootprintBytes,
      limit: MAX_ASSET_VRAM_BYTES,
      message: `Asset VRAM footprint (${(totalVramFootprintBytes / (1024 * 1024)).toFixed(2)}MB) exceeds limit of 4.0MB (${MAX_ASSET_VRAM_BYTES} bytes)`
    });
  }

  // 5. Mesh Quantization and Decimation Budget Auditing
  if (vertexCount > 25000) {
    warnings.push({
      rule: 'VERTEX_BUDGET_EXCEEDED',
      actual: vertexCount,
      limit: 25000,
      message: `Vertex count (${vertexCount}) exceeds target budget of 25,000`
    });
  }

  if (triangleCount > 40000) {
    warnings.push({
      rule: 'TRIANGLE_BUDGET_EXCEEDED',
      actual: triangleCount,
      limit: 40000,
      message: `Triangle count (${triangleCount}) exceeds target budget of 40,000`
    });
  }

  const isQuantized = asset.meshQuantization === true || bytesPerVertex <= 14;
  const isCompressedTextures = uncompressedCount === 0;
  const isPassed = violations.length === 0;
  const isWebKitCertified = isPassed && isCompressedTextures && isQuantized;

  return {
    passed: isPassed,
    isWebKitCertified,
    diskSizeBytes,
    vramFootprintBytes: totalVramFootprintBytes,
    geometryBytes: totalGeometryVram,
    textureBytes: totalTextureVram,
    details: {
      vertexBufferBytes: geomVram.vertexBufferBytes,
      indexBufferBytes: geomVram.indexBufferBytes,
      vertexCount,
      triangleCount,
      bytesPerVertex,
      meshQuantization: isQuantized,
      meshoptCompression: Boolean(asset.meshoptCompression),
      textures: auditedTextures
    },
    violations,
    warnings
  };
}

/**
 * Audits total scene VRAM under peak conditions against WebKit / Mobile Safari ceiling (<= 384MB).
 * 
 * @param {object} scene - Scene configuration
 * @param {Array<object>} scene.assets - Array of asset descriptors or audit reports
 * @param {object} [scene.viewport] - Viewport dimensions
 * @param {number} [scene.viewport.width=390] - CSS width
 * @param {number} [scene.viewport.height=844] - CSS height
 * @param {number} [scene.viewport.dpr=3] - Device pixel ratio
 * @param {number} [scene.overheadBufferBytes=0] - Additional runtime buffers/render targets
 * @returns {object} Scene audit report
 */
function auditSceneVram(scene = {}) {
  const assets = Array.isArray(scene.assets) ? scene.assets : [];
  const vp = scene.viewport || { width: 390, height: 844, dpr: 3 };
  const backbufferBytes = calculateCanvasBackbufferVram(vp.width, vp.height, vp.dpr, true);
  const overheadBytes = Number(scene.overheadBufferBytes || 0);

  let totalAssetsVram = 0;
  let totalDiskBytes = 0;
  const assetReports = [];

  for (const asset of assets) {
    const report = (asset.vramFootprintBytes !== undefined && asset.passed !== undefined)
      ? asset
      : auditAsset(asset);

    assetReports.push(report);
    totalAssetsVram += report.vramFootprintBytes;
    totalDiskBytes += report.diskSizeBytes;
  }

  const totalSceneVram = backbufferBytes + totalAssetsVram + overheadBytes;
  const isWithinWebKitCeiling = totalSceneVram <= WEBKIT_GPU_CEILING_BYTES;

  const violations = [];
  if (!isWithinWebKitCeiling) {
    violations.push({
      rule: 'WEBKIT_GPU_CEILING_EXCEEDED',
      actual: totalSceneVram,
      limit: WEBKIT_GPU_CEILING_BYTES,
      message: `Total scene VRAM (${(totalSceneVram / (1024 * 1024)).toFixed(2)}MB) exceeds WebKit 384MB GPU ceiling (${WEBKIT_GPU_CEILING_BYTES} bytes)`
    });
  }

  return {
    passed: isWithinWebKitCeiling && assetReports.every(r => r.passed),
    isWithinWebKitCeiling,
    totalSceneVramBytes: totalSceneVram,
    ceilingBytes: WEBKIT_GPU_CEILING_BYTES,
    breakdown: {
      backbufferBytes,
      totalAssetsVramBytes: totalAssetsVram,
      overheadBufferBytes: overheadBytes,
      totalDiskBytes
    },
    assetReports,
    violations
  };
}

class VramAuditor {
  constructor(options = {}) {
    this.maxDiskBytes = options.maxDiskBytes || MAX_ASSET_DISK_BYTES;
    this.maxVramBytes = options.maxVramBytes || MAX_ASSET_VRAM_BYTES;
    this.webKitCeilingBytes = options.webKitCeilingBytes || WEBKIT_GPU_CEILING_BYTES;
  }

  calculateTextureVram(w, h, format, options) {
    return calculateTextureVram(w, h, format, options);
  }

  calculateGeometryVram(vertCount, bytesPerVert, idxCount, type) {
    return calculateGeometryVram(vertCount, bytesPerVert, idxCount, type);
  }

  auditAsset(asset) {
    return auditAsset(asset);
  }

  auditScene(scene) {
    return auditSceneVram(scene);
  }
}

module.exports = {
  MAX_ASSET_DISK_BYTES,
  MAX_ASSET_VRAM_BYTES,
  WEBKIT_GPU_CEILING_BYTES,
  MIPMAP_FACTOR,
  BYTES_PER_PIXEL_TABLE,
  calculateTextureVram,
  calculateGeometryVram,
  calculateCanvasBackbufferVram,
  auditAsset,
  auditSceneVram,
  VramAuditor
};
