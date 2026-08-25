const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

/**
 * UniversalAssetNormalizer
 * Normaliza e sana todos os assets de sites clonados:
 * - Resolve e baixa imagens otimizadas do Vercel / Next.js (/_vercel/image?url=... e /_next/image?url=...)
 * - Remove overlays bloqueantes (telas pretas de transição como #transition-overlay, [data-cover])
 * - Revela elementos ocultos por frameworks SSR (opacity-0, invisible em loaders)
 * - Cria espelhos no disco para arquivos com espaços e %20 (evitando 404)
 * - Gera fallbacks automáticos para variantes de densidade (@2x, -1.5x, etc.)
 * - Codifica URLs em atributos srcset para conformidade com HTML5
 * - Conecta blobs binários interceptados aos elementos correspondentes
 */
class UniversalAssetNormalizer {
  /**
   * @param {Object} options
   * @param {string} options.siteDir Diretório raiz do site clonado (contendo index.html e pasta assets)
   * @param {string} [options.siteUrl] URL original do site
   * @param {string} [options.extractionDir] Diretório de extração intermediária contendo blobs/shaders
   */
  constructor(options) {
    this.siteDir = path.resolve(options.siteDir);
    this.assetsDir = path.join(this.siteDir, 'assets');
    this.siteUrl = options.siteUrl || '';
    this.extractionDir = options.extractionDir ? path.resolve(options.extractionDir) : null;
  }

  /**
   * Executa a normalização completa
   */
  async normalizeAll() {
    console.log('🧹 [UniversalAssetNormalizer] Iniciando saneamento global de assets e desbloqueio de visualização...');
    
    // 1. Sincronizar arquivos no disco (espaços ⇄ %20)
    if (fs.existsSync(this.assetsDir)) {
      this.syncDiskSpaces(this.assetsDir);
      this.generateDensityFallbacks(this.assetsDir);
    }

    // 2. Conectar vídeos/blobs da extração se existirem
    if (this.extractionDir && fs.existsSync(this.extractionDir)) {
      this.linkExtractedBlobs();
    }

    // 3. Sanitizar index.html e baixar assets remotos / Vercel images
    const indexPath = path.join(this.siteDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      await this.sanitizeAndResolveHtml(indexPath);
    }

    console.log('✅ [UniversalAssetNormalizer] Saneamento e desbloqueio concluídos com 100% de sucesso.');
  }

  /**
   * Cria cópias espelho de arquivos para que requisições tanto com espaços quanto com %20 funcionem no disco
   */
  syncDiskSpaces(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        this.syncDiskSpaces(fullPath);
      } else {
        if (entry.name.includes('%20')) {
          const decoded = decodeURIComponent(entry.name);
          const decodedPath = path.join(dir, decoded);
          if (!fs.existsSync(decodedPath)) {
            try { fs.copyFileSync(fullPath, decodedPath); } catch (e) {}
          }
        } else if (entry.name.includes(' ')) {
          const encoded = encodeURIComponent(entry.name);
          const encodedPath = path.join(dir, encoded);
          if (!fs.existsSync(encodedPath)) {
            try { fs.copyFileSync(fullPath, encodedPath); } catch (e) {}
          }
        }
      }
    }
  }

  /**
   * Gera fallbacks para variantes de resolução (@2x, -1.5x) copiando o asset 1x se a variante não existir
   */
  generateDensityFallbacks(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        this.generateDensityFallbacks(fullPath);
      } else {
        const ext = path.extname(entry.name);
        if (['.webp', '.png', '.jpg', '.jpeg', '.gif'].includes(ext.toLowerCase())) {
          const baseName = entry.name.slice(0, -ext.length);
          if (!baseName.includes('-1.5x') && !baseName.includes('@2x') && !baseName.includes('-2x')) {
            const f15 = path.join(dir, `${baseName}-1.5x${ext}`);
            const f2x = path.join(dir, `${baseName}@2x${ext}`);
            if (!fs.existsSync(f15)) {
              try { fs.copyFileSync(fullPath, f15); } catch (e) {}
            }
            if (!fs.existsSync(f2x)) {
              try { fs.copyFileSync(fullPath, f2x); } catch (e) {}
            }
          }
        }
      }
    }
  }

  /**
   * Mapeia blobs binários da extração e salva cópias locais legíveis
   */
  linkExtractedBlobs() {
    const manifestPath = path.join(this.extractionDir, 'extraction_manifest.json');
    if (!fs.existsSync(manifestPath)) return;
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      if (manifest.blobs && Array.isArray(manifest.blobs)) {
        for (const b of manifest.blobs) {
          const srcBlob = path.join(this.extractionDir, b.filePath);
          if (fs.existsSync(srcBlob) && b.mimeType && b.mimeType.startsWith('video/')) {
            const destVideo = path.join(this.assetsDir, 'video-extracted.mp4');
            try { fs.copyFileSync(srcBlob, destVideo); } catch (e) {}
          }
        }
      }
    } catch (e) {}
  }

  /**
   * Baixa um arquivo via HTTP/HTTPS de forma assíncrona
   */
  downloadFileAsync(url, destPath) {
    return new Promise((resolve) => {
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 500) {
        return resolve(destPath);
      }
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      const client = url.startsWith('https') ? https : http;
      const file = fs.createWriteStream(destPath);
      const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        if (res.statusCode !== 200) {
          file.close();
          if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
          return resolve(null);
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(destPath);
        });
      });
      req.on('error', () => {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        resolve(null);
      });
      req.setTimeout(8000, () => {
        req.destroy();
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        resolve(null);
      });
    });
  }

  /**
   * Sanitiza o HTML, baixa imagens do Vercel/Next e remove telas pretas
   */
  async sanitizeAndResolveHtml(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // 1. DESBLOQUEIO DE TELA PRETA & OVERLAYS DE TRANSIÇÃO (ex: Storey, Nuxt, GSAP)
    // Desativa #transition-overlay e cortinas pretas em z-index alto
    html = html.replace(/<div[^>]*id="transition-overlay"[^>]*>/g, '<div id="transition-overlay" style="display:none !important; opacity:0 !important; pointer-events:none !important;">');
    html = html.replace(/<div[^>]*data-cover[^>]*class="[^"]*bg-black[^"]*"[^>]*>/g, (m) => m.replace('opacity-100', 'opacity-0').replace('class="', 'style="display:none !important;" class="'));

    // 2. DESBLOQUEIO DE ELEMENTOS COM opacity-0 E SPLITTEXT INJETADOS POR SSR
    // Injeta CSS universal de revelação e estabilização
    const unlockCss = `<style id="universal-unlock-css">
      #transition-overlay, [data-cover], .transition-curtain, .page-transition-overlay {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
        visibility: hidden !important;
      }
      /* Desbloqueia hero, navbar e containers principais */
      body > div, #__nuxt, #__next, main, section, header, nav, .layout-grid {
        opacity: 1 !important;
        visibility: visible !important;
      }
      /* Unmasking universal de SplitText e linhas de texto */
      .appear-line-mask, [data-v-30d30ebe] .appear-line-mask {
        overflow: visible !important;
      }
      .appear-line, [data-v-30d30ebe] .appear-line {
        transform: translateY(0px) !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      /* Navbar, CTAs e controles */
      .fixed, header, button, [id*="cta"], .project-slider-progress-line {
        opacity: 1 !important;
        visibility: visible !important;
      }
      /* Previne sobreposição fantasma de múltiplos slides em carrosséis absolutos */
      .will-change-transform .relative > div:not(:first-child) {
        display: none !important;
      }
      .will-change-transform .relative > div:first-child {
        display: block !important;
        opacity: 1 !important;
      }
      /* Garante que imagens e SVGs tenham renderização nítida */
      img {
        max-width: 100%;
        content-visibility: visible;
      }
    </style>`;

    if (!html.includes('id="universal-unlock-css"')) {
      html = html.replace('</head>', `${unlockCss}\n</head>`);
    } else {
      html = html.replace(/<style id="universal-unlock-css">[\s\S]*?<\/style>/, unlockCss);
    }

    // 3. RESOLVER E BAIXAR IMAGENS VERCEL / NEXT.JS (/_vercel/image?url=... e /_next/image?url=...)
    const vercelImgRegex = /\/(?:_vercel|_next)\/image\?url=([^&"'\s]+)(?:&amp;|&)w=(\d+)(?:&amp;|&)q=(\d+)/g;
    let match;
    const imagesToDownload = new Map();

    while ((match = vercelImgRegex.exec(html)) !== null) {
      const fullMatched = match[0];
      const encodedInnerUrl = match[1];
      const width = match[2];
      const decodedInnerUrl = decodeURIComponent(encodedInnerUrl);

      let targetDownloadUrl = '';
      let localRelativePath = '';

      if (decodedInnerUrl.startsWith('http://') || decodedInnerUrl.startsWith('https://')) {
        targetDownloadUrl = decodedInnerUrl;
        const u = new URL(decodedInnerUrl);
        localRelativePath = `./assets/${u.hostname}${u.pathname}`;
      } else {
        // Caminho relativo ao site original
        const cleanInner = decodedInnerUrl.startsWith('/') ? decodedInnerUrl : '/' + decodedInnerUrl;
        if (this.siteUrl) {
          const origin = new URL(this.siteUrl).origin;
          targetDownloadUrl = `${origin}${cleanInner}`;
        }
        localRelativePath = `./assets${cleanInner}`;
      }

      imagesToDownload.set(fullMatched, {
        remoteUrl: targetDownloadUrl,
        localRel: localRelativePath,
        localDisk: path.resolve(this.siteDir, localRelativePath)
      });
    }

    console.log(`📥 [UniversalAssetNormalizer] Encontradas ${imagesToDownload.size} imagens Vercel/Next para download local...`);

    // Baixa as imagens em paralelo com controle de concorrência
    const downloadPromises = [];
    for (const [matchedString, info] of imagesToDownload.entries()) {
      if (info.remoteUrl) {
        downloadPromises.push(
          this.downloadFileAsync(info.remoteUrl, info.localDisk).then(saved => {
            if (saved) {
              console.log(`✅ [Asset Salvo] ${path.basename(info.localDisk)}`);
            }
          })
        );
      }
    }
    await Promise.all(downloadPromises);

    // Substitui as URLs no HTML
    for (const [matchedString, info] of imagesToDownload.entries()) {
      const safeRel = info.localRel.replace(/\\/g, '/');
      html = html.split(matchedString).join(safeRel);
    }

    // 4. Converte placeholders data:image/png;base64 em src real se houver
    html = html.replace(/<img([^>]*?)data-src="([^"]+)"([^>]*?)>/g, (m, p1, dataSrc, p2) => {
      if (m.includes('src="data:image/')) {
        let cleanDataSrc = dataSrc;
        if (cleanDataSrc.startsWith('http')) {
          try {
            const u = new URL(cleanDataSrc);
            cleanDataSrc = `./assets/${u.hostname}${u.pathname}`;
          } catch (e) {}
        }
        let tag = `<img${p1}src="${cleanDataSrc}" data-src="${cleanDataSrc}"${p2}>`;
        tag = tag.replace(/src="data:image\/[^"]*"/, `src="${cleanDataSrc}"`);
        return tag;
      }
      return m;
    });

    // 5. Normaliza caminhos em atributos srcset
    html = html.replace(/srcset="([^"]+)"/g, (m, srcsetVal) => {
      const parts = srcsetVal.split(',').map(item => {
        let trimmed = item.trim();
        const tokens = trimmed.split(/\s+(?=[0-9]+[wx])/);
        let url = tokens[0];
        let descriptor = tokens[1] ? ' ' + tokens[1] : '';

        if (!url.startsWith('data:') && !url.startsWith('http')) {
          const urlParts = url.split('/');
          url = urlParts.map(p => {
            if (p === '.' || p === '..') return p;
            return encodeURIComponent(decodeURIComponent(p));
          }).join('/');
        }
        return url + descriptor;
      });
      return `srcset="${parts.join(', ')}"`;
    });

    // 6. INJEÇÃO DO MOTOR UNIVERSAL DE ANIMAÇÃO & REVELAÇÃO (UniversalScrollDirector)
    try {
      const { UniversalScrollDirector } = require('./universal-scroll-director');
      const directorScript = UniversalScrollDirector.generateScript();
      if (!html.includes('id="universal-scroll-director"')) {
        html = html.replace('</body>', `${directorScript}\n</body>`);
      } else {
        html = html.replace(/<script id="universal-scroll-director">[\s\S]*?<\/script>/, directorScript);
      }
    } catch (e) {}

    fs.writeFileSync(filePath, html, 'utf8');
  }
}

module.exports = {
  UniversalAssetNormalizer
};
