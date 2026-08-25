const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Script injetado via page.addInitScript antes de qualquer execução de JavaScript da página.
 * Força preserveDrawingBuffer, hooka Shaders, OffscreenCanvas, Blobs em memória e evita Tainted Canvas.
 */
const ADVANCED_PRELOAD_SNIFFER_SCRIPT = `
(function() {
  const g = window;
  g.__ICM_REGISTRY__ = {
    shaders: [],
    canvases: [],
    createdBlobUrls: new Map()
  };

  // --- 1. PREVENÇÃO DE TAINTED CANVAS (CORS para imagens dinâmicas) ---
  try {
    const origImage = window.Image;
    window.Image = function() {
      const img = new origImage(...arguments);
      img.crossOrigin = 'anonymous';
      return img;
    };
  } catch (e) {}

  // --- 2. FORÇAR preserveDrawingBuffer = true EM CONTEXTOS CANVAS & OFFSCREEN CANVAS ---
  function patchCanvasContext(proto) {
    if (!proto || !proto.getContext) return;
    const origGetContext = proto.getContext;
    proto.getContext = function(contextType, contextAttributes) {
      let attrs = contextAttributes || {};
      if (contextType === 'webgl' || contextType === 'webgl2' || contextType === 'experimental-webgl') {
        attrs = Object.assign({}, attrs, {
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance'
        });
      }
      const ctx = origGetContext.call(this, contextType, attrs);
      if (ctx && g.__ICM_REGISTRY__ && !g.__ICM_REGISTRY__.canvases.includes(this)) {
        g.__ICM_REGISTRY__.canvases.push(this);
        if (this.setAttribute) {
          this.setAttribute('data-icm-canvas', 'true');
        }
      }
      return ctx;
    };
  }

  if (typeof HTMLCanvasElement !== 'undefined') patchCanvasContext(HTMLCanvasElement.prototype);
  if (typeof OffscreenCanvas !== 'undefined') patchCanvasContext(OffscreenCanvas.prototype);

  // --- 3. SNIFFER DE SHADERS (GLSL VERTEX & FRAGMENT) ---
  function hookShaderSource(targetProto) {
    if (!targetProto || !targetProto.shaderSource) return;
    const origShaderSource = targetProto.shaderSource;
    targetProto.shaderSource = function(shader, source) {
      try {
        const gl = this;
        const shaderType = gl.getShaderParameter(shader, gl.SHADER_TYPE);
        const typeStr = shaderType === gl.VERTEX_SHADER ? 'vertex' : shaderType === gl.FRAGMENT_SHADER ? 'fragment' : 'unknown';

        if (source && typeof source === 'string' && source.trim().length > 20) {
          const cleanSource = source.trim();
          const exists = g.__ICM_REGISTRY__.shaders.some(s => s.source === cleanSource);
          if (!exists) {
            g.__ICM_REGISTRY__.shaders.push({
              type: typeStr,
              source: cleanSource,
              timestamp: Date.now()
            });
          }
        }
      } catch (e) {}
      return origShaderSource.apply(this, arguments);
    };
  }

  if (typeof WebGLRenderingContext !== 'undefined') hookShaderSource(WebGLRenderingContext.prototype);
  if (typeof WebGL2RenderingContext !== 'undefined') hookShaderSource(WebGL2RenderingContext.prototype);

  // --- 4. TRAP DE MODELOS EFÊMEROS (Blobs e createObjectURL) ---
  try {
    const origCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = function(obj) {
      const url = origCreateObjectURL.call(URL, obj);
      if (obj instanceof Blob && typeof g.__icm_save_blob__ === 'function') {
        const reader = new FileReader();
        reader.onloadend = function() {
          if (reader.result && typeof reader.result === 'string') {
            const base64Data = reader.result.split(',')[1];
            g.__icm_save_blob__({
              id: url,
              mimeType: obj.type || 'application/octet-stream',
              base64: base64Data
            });
          }
        };
        reader.readAsDataURL(obj);
      }
      return url;
    };
  } catch (e) {}
})();
`;

class AdvancedAssetInterceptor {
  /**
   * @param {Object} options
   * @param {string} options.outputDir Diretório base do estágio 01 de extração
   * @param {boolean} [options.captureShaders=true]
   * @param {boolean} [options.captureBinaries=true]
   * @param {number} [options.maxFileSizeMB=100]
   */
  constructor(options) {
    this.outputDir = options.outputDir;
    this.captureShaders = options.captureShaders !== false;
    this.captureBinaries = options.captureBinaries !== false;
    this.maxFileSizeMB = options.maxFileSizeMB || 100;

    this.manifest = {
      generatedAt: new Date().toISOString(),
      binaries: [],
      shaders: [],
      blobs: [],
      sequences: []
    };

    this.ensureDirectories();
  }

  ensureDirectories() {
    const dirs = ['models', 'shaders', 'blobs', 'textures', 'sequences'];
    for (const d of dirs) {
      const fullPath = path.join(this.outputDir, d);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    }
  }

  /**
   * Instala os sniffers de GPU, Canvas e Blobs antes de qualquer navegação
   * @param {import('playwright').Page} page
   */
  async attachPreloadSniffers(page) {
    // Expõe a função de persistência de blobs para o contexto do navegador
    try {
      await page.exposeFunction('__icm_save_blob__', (payload) => {
        try {
          const buffer = Buffer.from(payload.base64, 'base64');
          const hash = crypto.createHash('sha256').update(buffer).digest('hex').substring(0, 12);
          const ext = this.getExtensionFromMime(payload.mimeType) || 'bin';
          const fileName = `blob_${hash}.${ext}`;
          const filePath = path.join(this.outputDir, 'blobs', fileName);

          if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, buffer);
          }

          this.manifest.blobs.push({
            id: payload.id,
            mimeType: payload.mimeType,
            size: buffer.length,
            filePath: path.relative(this.outputDir, filePath).replace(/\\/g, '/')
          });
        } catch (err) {
          console.error('[ICM] Erro ao persistir blob interceptado:', err.message);
        }
      });
    } catch (e) {
      // Função já exposta anteriormente
    }

    await page.addInitScript(ADVANCED_PRELOAD_SNIFFER_SCRIPT);
  }

  /**
   * Intercepta respostas de rede em busca de arquivos binários 3D, WASM, HDR e streams
   * @param {import('playwright').Page} page
   */
  attachNetworkListener(page) {
    if (!this.captureBinaries) return;

    page.on('response', async (response) => {
      try {
        const url = response.url();
        const status = response.status();
        if (status < 200 || status >= 300) return;

        const contentType = (response.headers()['content-type'] || '').toLowerCase();
        const is3DModel = url.match(/\.(glb|gltf|bin|wasm|draco|hdr|exr|usdz|splat)(\?.*)?$/i);
        const isBinaryStream = contentType.includes('application/octet-stream') ||
                               contentType.includes('model/gltf-binary') ||
                               contentType.includes('model/gltf+json');

        if (is3DModel || isBinaryStream) {
          const buffer = await response.body();
          if (!buffer || buffer.length === 0) return;

          const maxBytes = this.maxFileSizeMB * 1024 * 1024;
          if (buffer.length > maxBytes) return;

          const hash = crypto.createHash('sha256').update(buffer).digest('hex').substring(0, 12);
          const ext = this.resolveExtension(url, contentType);
          const rawBasename = path.basename(new URL(url).pathname).replace(/[^a-zA-Z0-9_.-]/g, '_') || `model_${hash}`;
          const cleanName = rawBasename.endsWith(`.${ext}`) ? rawBasename : `${rawBasename}.${ext}`;
          const filePath = path.join(this.outputDir, 'models', `${hash}_${cleanName}`);

          if (!fs.existsSync(filePath)) {
            await fs.promises.writeFile(filePath, buffer);
          }

          this.manifest.binaries.push({
            url,
            filePath: path.relative(this.outputDir, filePath).replace(/\\/g, '/'),
            mimeType: contentType,
            size: buffer.length,
            hash
          });
        }
      } catch (err) {
        // Responses que fecham antes do buffer ser lido são ignoradas
      }
    });
  }

  /**
   * Amostra a sequência de frames de um canvas impulsionado por scroll (estilo Apple)
   * @param {import('playwright').Page} page
   * @param {string} [canvasSelector='canvas']
   * @param {number} [totalSteps=40]
   */
  async captureCanvasScrollSequence(page, canvasSelector = 'canvas', totalSteps = 40) {
    const savedFrames = [];
    const canvasExists = await page.$(canvasSelector);
    if (!canvasExists) return savedFrames;

    console.log(`🎬 [ICM] Amostrando sequência de frames do canvas (${totalSteps} steps)...`);

    const scrollHeight = await page.evaluate(() => Math.max(1, document.body.scrollHeight - window.innerHeight));
    const stepSize = scrollHeight / totalSteps;

    for (let step = 0; step <= totalSteps; step++) {
      const scrollPos = step * stepSize;

      await page.evaluate((pos) => {
        window.scrollTo(0, pos);
      }, scrollPos);

      // Aguarda 60ms para a engine de animação (GSAP / Lenis / Canvas) recalcular o frame
      await page.waitForTimeout(60);

      const frameData = await page.evaluate((selector) => {
        const cvs = document.querySelector(selector);
        if (!cvs) return null;
        try {
          return cvs.toDataURL('image/webp', 0.95);
        } catch (e) {
          return null;
        }
      }, canvasSelector);

      if (frameData && frameData.startsWith('data:image/')) {
        const base64Only = frameData.split(',')[1];
        const buffer = Buffer.from(base64Only, 'base64');
        const frameIndex = String(step).padStart(4, '0');
        const fileName = `frame_${frameIndex}.webp`;
        const framePath = path.join(this.outputDir, 'sequences', fileName);

        await fs.promises.writeFile(framePath, buffer);
        const relPath = path.relative(this.outputDir, framePath).replace(/\\/g, '/');
        savedFrames.push(relPath);
      }
    }

    this.manifest.sequences = savedFrames;
    console.log(`✅ [ICM] Sequência de frames capturada: ${savedFrames.length} frames salvos.`);
    return savedFrames;
  }

  /**
   * Coleta os Shaders interceptados em memória e gera o extraction_manifest.json
   * @param {import('playwright').Page} page
   */
  async finalize(page) {
    try {
      if (this.captureShaders) {
        const browserShaders = await page.evaluate(() => {
          const g = window;
          return (g.__ICM_REGISTRY__ && g.__ICM_REGISTRY__.shaders) || [];
        });

        for (const shader of browserShaders) {
          const hash = crypto.createHash('sha256').update(shader.source).digest('hex').substring(0, 10);
          const shaderFileName = `shader_${shader.type}_${hash}.glsl`;
          const filePath = path.join(this.outputDir, 'shaders', shaderFileName);

          if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, shader.source, 'utf-8');
          }

          this.manifest.shaders.push({
            type: shader.type,
            filePath: path.relative(this.outputDir, filePath).replace(/\\/g, '/'),
            hash
          });
        }
      }

      // Salva o manifesto de extração consolidado
      const manifestPath = path.join(this.outputDir, 'extraction_manifest.json');
      fs.writeFileSync(manifestPath, JSON.stringify(this.manifest, null, 2), 'utf-8');
    } catch (e) {
      console.error('[ICM] Falha ao finalizar manifesto de extração:', e.message);
    }

    return this.manifest;
  }

  resolveExtension(url, mime) {
    const match = url.match(/\.([a-zA-Z0-9]+)(\?.*)?$/);
    if (match && match[1]) return match[1].toLowerCase();
    return this.getExtensionFromMime(mime) || 'bin';
  }

  getExtensionFromMime(mime) {
    const map = {
      'model/gltf-binary': 'glb',
      'model/gltf+json': 'gltf',
      'application/octet-stream': 'bin',
      'application/wasm': 'wasm',
      'image/webp': 'webp',
      'image/png': 'png',
      'image/jpeg': 'jpg'
    };
    return map[mime] || 'bin';
  }
}

module.exports = {
  AdvancedAssetInterceptor,
  ADVANCED_PRELOAD_SNIFFER_SCRIPT
};
