const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

/**
 * UniversalAssetNormalizer
 * Normaliza e sana todos os assets e HTMLs de sites clonados:
 * - Elimina telas pretas de transição e preloaders (Webflow, Barba, GSAP, Nuxt, Next.js, Framer)
 * - Desbloqueia hero, navbars e elementos com inicialização opaca/invisível
 * - Unmasking universal de SplitText e linhas de texto mascaradas
 * - Fornece polyfills de resiliência (CustomEase, SplitText, Howl, barba, analytics)
 * - Corrige URLs de CDN quebradas (GSAP 3.15, Howler jsdelivr, etc.)
 * - Resolve e baixa imagens otimizadas do Vercel / Next.js (/_vercel/image e /_next/image)
 * - Cria espelhos no disco para arquivos com espaços e %20
 * - Gera fallbacks automáticos para variantes de densidade (@2x, -1.5x)
 * - Conecta o motor de animações 60FPS UniversalScrollDirector
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
   * Retorna o CSS mestre de desbloqueio e revelação universal (não destrutivo para GSAP/ScrollTrigger)
   */
  static getUniversalUnlockCss() {
    return `<style id="universal-unlock-css">
      /* 1. Supressão Completa de Cortinas de Transição e Preloaders (Anti-Blackscreen) */
      #transition-overlay, 
      [data-cover], 
      .transition-curtain, 
      .page-transition-overlay, 
      .transition_screen, 
      .preloader_wrap, 
      .preloader, 
      .loader, 
      .site-loader, 
      .loading-screen, 
      .loading-overlay, 
      #preloader, 
      #loading-mask, 
      [data-preloader], 
      .splash-screen, 
      .curtain, 
      [data-curtain], 
      [data-page-transition], 
      .is-loading-overlay, 
      .page-transition, 
      .page_loader,
      .w-preloader {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
        visibility: hidden !important;
      }

      /* Desbloqueia position: sticky globalmente removendo overflow hostil dos ancestrais */
      html, body {
        overflow-x: clip !important;
        overflow-y: visible !important;
      }
      .page-wrapper, main, .main-wrapper, .container, .page-padding {
        overflow: visible !important;
      }

      /* Desbloqueia sliders de marcas / logos para rotação infinita */
      .brand-slider, .logo-slider, .partner-slider {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
      }

      /* Reparo de layout para seções empilhadas e eliminação de spacers fantasmas */
      .faq-spacer {
        display: none !important;
      }
      .faq-relative {
        height: auto !important;
      }
      section.cta, .cta {
        margin-top: 0 !important;
        position: relative !important;
        z-index: 10 !important;
      }
      section.faq, .faq {
        margin-top: 0 !important;
        position: relative !important;
        z-index: 5 !important;
      }

      /* Interatividade de hover fluida na FAQ */
      .faq [data-dropdown-list] {
        opacity: 0 !important;
        transform: translateX(24px) !important;
        transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none !important;
      }
      .faq [data-dropdown]:hover [data-dropdown-list],
      .faq [data-dropdown].is-active [data-dropdown-list] {
        opacity: 1 !important;
        transform: translateX(0px) !important;
        pointer-events: auto !important;
      }
      .faq [data-dropdown]:hover .faq-dropdown-toggle h3,
      .faq [data-dropdown].is-active .faq-dropdown-toggle h3 {
        color: #ffffff !important;
        transition: color 0.3s ease;
      }

      /* Reseta máscaras para evitar listras estáticas em repouso */
      [data-amenities-anim="big-image"].is-first {
        position: relative !important;
        mask-image: none !important;
        -webkit-mask-image: none !important;
        opacity: 1 !important;
      }
      [data-amenities-anim="big-image"]:not(.is-first) {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        mask-image: var(--mask-gradient, linear-gradient(0deg, transparent 0% 100%));
        -webkit-mask-image: var(--mask-gradient, linear-gradient(0deg, transparent 0% 100%));
      }

      /* 2. Overlays cosméticos não podem bloquear eventos de mouse */
      .g_overlay, .g_grain_overlay {
        pointer-events: none !important;
      }

      /* 3. Prevenção de Bloqueio de Scroll por Classes de Preloader/Lenis */
      html, body {
        overflow-x: hidden !important;
      }
      html.lenis-stopped, 
      body.lenis-stopped, 
      html.is-loading, 
      body.is-loading,
      body.no-scroll {
        overflow: auto !important;
        overflow-x: hidden !important;
        height: auto !important;
      }

      /* 4. Controles, Navbar, CTAs fixos */
      .fixed, header, [id*="cta"] {
        opacity: 1;
        visibility: visible;
      }

      /* 5. Garante renderização nítida de imagens e mídias */
      img, svg, canvas, video {
        content-visibility: visible;
      }

      /* 6. Suporte Universal a Dark Mode e Text Reveals do Next.js / Tailwind */
      html.dark, body.dark {
        background-color: #09090b !important;
        color: #ededed !important;
      }
      [id="preview"] {
        background-color: #121214 !important;
      }
      [id="preview"] span.inline-block {
        opacity: 1 !important;
        transform: none !important;
        color: #ffffff !important;
      }
    </style>`;
  }

  /**
   * Retorna os polyfills de resiliência para GSAP, áudio, Barba e analytics
   */
  static getUniversalResiliencePolyfills() {
    return `<script id="universal-resilience-polyfills">
(function() {
  'use strict';
  // 1. Mocks de Analytics, Rastreamento & WebFont
  window.fbq = window.fbq || function() { (window.fbq.q = window.fbq.q || []).push(arguments); };
  window.gtag = window.gtag || function() { (window.dataLayer = window.dataLayer || []).push(arguments); };
  window.dataLayer = window.dataLayer || [];
  window.umami = window.umami || { track: function() {} };
  window.WebFont = window.WebFont || { load: function(cfg) { if (cfg && cfg.active) try { cfg.active(); } catch(e){} } };

  // 1.1 ServiceWorker Safe Stub (evita 404 em ambiente de preview/offline)
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      navigator.serviceWorker.register = function() {
        return Promise.resolve({ scope: '/' });
      };
    } catch(e) {}
  }

  // 2. Functional Native SplitText Engine & Polyfills de GSAP
  function createSplitTextClass() {
    function SplitText(target, vars) {
      if (!(this instanceof SplitText)) return new SplitText(target, vars);
      vars = vars || {};
      this.elements = [];
      if (typeof target === 'string') {
        this.elements = Array.from(document.querySelectorAll(target));
      } else if (target instanceof Element) {
        this.elements = [target];
      } else if (target && target.length) {
        this.elements = Array.from(target);
      }

      this.lines = [];
      this.words = [];
      this.chars = [];
      this._originals = [];

      var type = vars.type || 'chars,words,lines';
      var wantLines = type.indexOf('lines') !== -1;
      var wantWords = type.indexOf('words') !== -1;
      var wantChars = type.indexOf('chars') !== -1;
      var linesClass = vars.linesClass || 'line';
      var wordsClass = vars.wordsClass || 'word';
      var charsClass = vars.charsClass || 'char';

      var self = this;
      this.elements.forEach(function(el) {
        self._originals.push({ el: el, html: el.innerHTML });
        var text = el.innerText || el.textContent || '';
        if (!text.trim()) return;

        el.innerHTML = '';
        var rawWords = text.trim().split(/\s+/);
        var createdWords = [];

        rawWords.forEach(function(wText, wIdx) {
          var wordSpan = document.createElement('span');
          wordSpan.className = wordsClass;
          wordSpan.style.display = 'inline-block';
          wordSpan.style.position = 'relative';

          if (wantChars) {
            for (var c = 0; c < wText.length; c++) {
              var charSpan = document.createElement('span');
              charSpan.className = charsClass;
              charSpan.style.display = 'inline-block';
              charSpan.style.position = 'relative';
              charSpan.textContent = wText[c];
              wordSpan.appendChild(charSpan);
              self.chars.push(charSpan);
            }
          } else {
            wordSpan.textContent = wText;
          }

          el.appendChild(wordSpan);
          createdWords.push(wordSpan);
          self.words.push(wordSpan);

          if (wIdx < rawWords.length - 1) {
            el.appendChild(document.createTextNode(' '));
          }
        });

        if (wantLines && createdWords.length > 0) {
          var lineGroups = [];
          var currentLine = [];
          var lastTop = -9999;

          createdWords.forEach(function(w) {
            var top = w.offsetTop;
            if (top > lastTop + 5 && currentLine.length > 0) {
              lineGroups.push(currentLine);
              currentLine = [];
            }
            currentLine.push(w);
            lastTop = top;
          });
          if (currentLine.length > 0) lineGroups.push(currentLine);

          el.innerHTML = '';
          lineGroups.forEach(function(group) {
            var lineDiv = document.createElement('div');
            lineDiv.className = linesClass;
            lineDiv.style.display = 'block';
            lineDiv.style.overflow = 'hidden';
            lineDiv.style.position = 'relative';

            var lineInner = document.createElement('span');
            lineInner.style.display = 'inline-block';
            lineInner.style.width = '100%';

            group.forEach(function(w, idx) {
              lineInner.appendChild(w);
              if (idx < group.length - 1) lineInner.appendChild(document.createTextNode(' '));
            });

            lineDiv.appendChild(lineInner);
            el.appendChild(lineDiv);
            self.lines.push(lineDiv);
          });
        }
      });

      this.revert = function() {
        this._originals.forEach(function(item) {
          item.el.innerHTML = item.html;
        });
      };
    }
    return SplitText;
  }

  window.SplitText = window.SplitText || createSplitTextClass();

  window.addEventListener('DOMContentLoaded', function() {
    if (typeof window.CustomEase === 'undefined') {
      window.CustomEase = { create: function() { return function(t) { return t; }; }, get: function() { return function(t) { return t; }; } };
    }
    if (typeof window.SplitText === 'undefined') {
      window.SplitText = createSplitTextClass();
    }
  });

  // 3. Stub de Audio (Howler.js)
  if (typeof window.Howl === 'undefined') {
    window.Howl = function() {
      return {
        play: function() { return 1; },
        pause: function() {},
        stop: function() {},
        volume: function() {},
        fade: function() {},
        on: function() { return this; },
        once: function() { return this; },
        off: function() { return this; },
        state: function() { return 'loaded'; }
      };
    };
  }

  // 4. Stub de Barba.js & Modais
  if (typeof window.barba === 'undefined') {
    window.barba = {
      init: function() {},
      use: function() {},
      hooks: { before: function() {}, after: function() {}, enter: function() {}, leave: function() {} },
      transitions: []
    };
  }
  if (typeof window.ProjectModal === 'undefined') {
    window.ProjectModal = function() {
      return { open: function(){}, close: function(){} };
    };
  }

  // 5. Imediato e Multinível Unhide Failsafe (Resiliente, Não-Destrutivo)
  function forceUnhide() {
    document.documentElement.classList.add('css-ready', 'has-loaded', 'loaded', 'wf-loaded');
    document.documentElement.classList.remove('is-loading', 'lenis-stopped');
    if (document.body) {
      document.body.classList.remove('is-loading', 'lenis-stopped', 'no-scroll');
    }

    // Apenas bloqueios reais de tela preta e cortinas estáticas de preload são destruídos
    var blocked = document.querySelectorAll('.transition_screen, .preloader_wrap, #transition-overlay, [data-cover], .loader, .preloader, .loading-screen, .loading-overlay, #preloader, #loading-mask');
    blocked.forEach(function(el) {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('opacity', '0', 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
    });

    // Se houver elementos presos com opacity 0 que NÃO pertencem a animações ativas, libera com suavidade
    var stuckNodes = document.querySelectorAll('.gsap-reveal:not([data-anim]):not([data-scribble])');
    stuckNodes.forEach(function(el) {
      if (el.classList.contains('child') || el.classList.contains('line')) {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      }
    });
  }

  // 6. Splide & Carousel Auto-Binder
  function initSplides() {
    if (typeof window.Splide !== 'undefined') {
      var splides = document.querySelectorAll('.splide:not(.is-initialized)');
      splides.forEach(function(s) {
        try {
          new window.Splide(s, {
            type: 'loop',
            perPage: 1,
            autoplay: false,
            pagination: true
          }).mount();
        } catch(e) {}
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      forceUnhide();
      initSplides();
    });
  } else {
    forceUnhide();
    initSplides();
  }
  setTimeout(function() { forceUnhide(); initSplides(); }, 50);
  setTimeout(function() { forceUnhide(); initSplides(); }, 300);
  setTimeout(function() { forceUnhide(); initSplides(); }, 1000);
})();
</script>`;
  }

  /**
   * Aplica correções completas em string HTML
   */
  static applyUniversalFixes(html, siteUrl = '') {
    let result = html;

    // A) Correção de URLs de CDN conhecidas como quebradas
    result = result.replace(/https:\/\/cdn\.prod\.website-files\.com\/gsap\/3\.15\.0\/CustomEase\.min\.js/g, 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js');
    result = result.replace(/https:\/\/cdn\.prod\.website-files\.com\/gsap\/3\.15\.0\/gsap\.min\.js/g, 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
    result = result.replace(/https:\/\/cdn\.prod\.website-files\.com\/gsap\/3\.15\.0\/ScrollTrigger\.min\.js/g, 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
    result = result.replace(/https:\/\/cdn\.prod\.website-files\.com\/gsap\/3\.15\.0\/Flip\.min\.js/g, 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js');
    result = result.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/howler@2\.2\.4(?!\/dist)/g, 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js');

    // B) Protege gsap.registerPlugin direto
    result = result.replace(/gsap\.registerPlugin\(([^)]+)\);/g, (match, plugins) => {
      return `if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        var _p = [${plugins}].filter(function(p) { return typeof p !== 'undefined'; });
        if (_p.length > 0) gsap.registerPlugin.apply(gsap, _p);
      }`;
    });

    // B.1) Remove regra destrutiva de Webflow w-mod-js
    result = result.replace(/html\.w-mod-js:not\(\.w-mod-ix3\)[\s\S]*?\{visibility:\s*hidden\s*!important;\}/gi, '/* [Webflow w-mod-js unblocked] */');

    // B.2) Desfragmenta DOM pré-dividido por SplitText
    result = UniversalAssetNormalizer.cleanFragmentedDom(result);

    // B.3) Remove estilos inline transientes gravados na extração
    result = UniversalAssetNormalizer.cleanTransientStyles(result);

    // C) Injeta universal-unlock-css no <head>
    const unlockCss = UniversalAssetNormalizer.getUniversalUnlockCss();
    if (!result.includes('id="universal-unlock-css"')) {
      if (result.includes('</head>')) {
        result = result.replace('</head>', `${unlockCss}\n</head>`);
      } else {
        result = `${unlockCss}\n${result}`;
      }
    } else {
      result = result.replace(/<style id="universal-unlock-css">[\s\S]*?<\/style>/, unlockCss);
    }

    // D) Injeta polyfills de resiliência no <head>
    const polyfills = UniversalAssetNormalizer.getUniversalResiliencePolyfills();
    if (!result.includes('id="universal-resilience-polyfills"')) {
      if (result.includes('</head>')) {
        result = result.replace('</head>', `${polyfills}\n</head>`);
      } else {
        result = `${polyfills}\n${result}`;
      }
    } else {
      result = result.replace(/<script id="universal-resilience-polyfills">[\s\S]*?<\/script>/, polyfills);
    }

    // E) Injeta UniversalScrollDirector antes do </body>
    try {
      const { UniversalScrollDirector } = require('./universal-scroll-director');
      const directorScript = UniversalScrollDirector.generateScript();
      if (!result.includes('id="universal-scroll-director"')) {
        if (result.includes('</body>')) {
          result = result.replace('</body>', `${directorScript}\n</body>`);
        } else {
          result = `${result}\n${directorScript}`;
        }
      } else {
        result = result.replace(/<script id="universal-scroll-director">[\s\S]*?<\/script>/, directorScript);
      }
    } catch (e) {}

    return result;
  }

  /**
   * Limpa nós de texto fragmentados por SplitText no DOM original
   */
  static cleanFragmentedDom(html) {
    if (!html || typeof html !== 'string') return html;
    try {
      const cheerio = require('cheerio');
      const $ = cheerio.load(html, { decodeEntities: false });

      // 1. Restaura textos originais e remove tags de fragmentação interna
      $('p, h1, h2, h3, h4, h5, h6').each((i, el) => {
        const ariaLabel = $(el).attr('aria-label');
        if (ariaLabel && ariaLabel.trim()) {
          $(el).text(ariaLabel.trim());
        }
        $(el).find('div[aria-hidden="true"]').remove();
      });

      // 2. Remove divs irmãs órfãs geradas por split de parágrafos
      $('[class*="slide-text"], [class*="project-text"], [class*="heading"]').each((i, parent) => {
        $(parent).find('> div[aria-hidden="true"]').remove();
        $(parent).find('p:empty').remove();
      });

      return $.html();
    } catch(e) {
      return html;
    }
  }

  /**
   * Remove inline styles dinâmicos capturados durante a execução do Playwright
   */
  static cleanTransientStyles(html) {
    if (!html || typeof html !== 'string') return html;
    try {
      const cheerio = require('cheerio');
      const $ = cheerio.load(html, { decodeEntities: false });

      // Remove mask-gradient transiente, clip-path e transforms de inicialização
      $('[style*="--mask-gradient"], [style*="clip-path"], [style*="translate"], [style*="opacity"]').each((i, el) => {
        const style = $(el).attr('style');
        if (style) {
          let cleanStyle = style
            .replace(/--mask-gradient:[^;]+;?/gi, '')
            .replace(/clip-path:[^;]+;?/gi, '')
            .replace(/translate:[^;]+;?/gi, '')
            .replace(/rotate:[^;]+;?/gi, '')
            .replace(/scale:[^;]+;?/gi, '')
            .trim();
          
          if (cleanStyle && cleanStyle !== ';') {
            $(el).attr('style', cleanStyle);
          } else {
            $(el).removeAttr('style');
          }
        }
      });

      return $.html();
    } catch(e) {
      return html;
    }
  }

  /**
   * Executa a normalização completa de uma pasta de site
   */
  async normalizeAll() {
    console.log(`🧹 [UniversalAssetNormalizer] Iniciando saneamento global de assets e desbloqueio para: ${path.basename(this.siteDir)}`);
    
    // 1. Sincronizar arquivos no disco (espaços ⇄ %20)
    if (fs.existsSync(this.assetsDir)) {
      this.syncDiskSpaces(this.assetsDir);
      this.generateDensityFallbacks(this.assetsDir);
    }

    // 2. Conectar vídeos/blobs da extração se existirem
    if (this.extractionDir && fs.existsSync(this.extractionDir)) {
      this.linkExtractedBlobs();
    }

    // 3. Sanitizar index.html e todos os arquivos .html em sections/
    const htmlFiles = [];
    const indexPath = path.join(this.siteDir, 'index.html');
    if (fs.existsSync(indexPath)) htmlFiles.push(indexPath);

    const sectionsDir = path.join(this.siteDir, 'sections');
    if (fs.existsSync(sectionsDir)) {
      const secEntries = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.html'));
      secEntries.forEach(f => htmlFiles.push(path.join(sectionsDir, f)));
    }

    for (const hFile of htmlFiles) {
      await this.sanitizeAndResolveHtml(hFile);
    }

    console.log(`✅ [UniversalAssetNormalizer] Saneamento e desbloqueio concluídos para ${htmlFiles.length} arquivo(s) HTML.`);
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
   * Gera fallbacks para variantes de resolução (@2x, -1.5x)
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
        if (['.webp', '.png', '.jpg', '.jpeg', '.gif', '.avif'].includes(ext.toLowerCase())) {
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
   * Mapeia blobs binários da extração
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
   * Baixa um arquivo via HTTP/HTTPS
   */
  downloadFileAsync(url, destPath) {
    return new Promise((resolve) => {
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 500) {
        return resolve(destPath);
      }
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      const client = url.startsWith('https') ? https : http;
      const file = fs.createWriteStream(destPath);
      const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0.0.0' } }, res => {
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
      req.setTimeout(12000, () => {
        req.destroy();
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        resolve(null);
      });
    });
  }

  /**
   * Sanitiza o HTML, baixa imagens do Vercel/Next e Webflow CDN, e aplica correções universais
   */
  async sanitizeAndResolveHtml(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Aplica correções estruturais universais (CSS, polyfills, scripts)
    html = UniversalAssetNormalizer.applyUniversalFixes(html, this.siteUrl);

    const imagesToDownload = new Map();

    // 2. Resolver e baixar imagens Vercel / Next.js (/_vercel/image?url=... e /_next/image?url=...)
    const vercelImgRegex = /\/(?:_vercel|_next)\/image\?url=([^&"'\s]+)(?:&amp;|&)w=(\d+)(?:&amp;|&)q=(\d+)/g;
    let match;

    while ((match = vercelImgRegex.exec(html)) !== null) {
      const fullMatched = match[0];
      const encodedInnerUrl = match[1];
      const decodedInnerUrl = decodeURIComponent(encodedInnerUrl);

      let targetDownloadUrl = '';
      let localRelativePath = '';

      if (decodedInnerUrl.startsWith('http://') || decodedInnerUrl.startsWith('https://')) {
        targetDownloadUrl = decodedInnerUrl;
        const u = new URL(decodedInnerUrl);
        localRelativePath = `./assets/${u.hostname}${u.pathname}`;
      } else {
        const cleanInner = decodedInnerUrl.startsWith('/') ? decodedInnerUrl : '/' + decodedInnerUrl;
        if (this.siteUrl) {
          try {
            const origin = new URL(this.siteUrl).origin;
            targetDownloadUrl = `${origin}${cleanInner}`;
          } catch (e) {}
        }
        localRelativePath = `./assets${cleanInner}`;
      }

      imagesToDownload.set(fullMatched, {
        remoteUrl: targetDownloadUrl,
        localRel: localRelativePath,
        localDisk: path.resolve(this.siteDir, localRelativePath)
      });
    }

    // 2.1 Resolver e baixar assets de CDN do Webflow (cdn.prod.website-files.com)
    const webflowCdnRegex = /https:\/\/cdn\.prod\.website-files\.com\/[^\s"'`()<>{}\\]+/g;
    const webflowMatches = Array.from(new Set(html.match(webflowCdnRegex) || []));

    for (const rawUrl of webflowMatches) {
      const cleanUrl = rawUrl.replace(/&amp;/g, '&');
      try {
        const u = new URL(cleanUrl);
        let rawFileName = path.basename(u.pathname);
        if (!rawFileName) rawFileName = 'asset';
        const decodedFileName = decodeURIComponent(rawFileName);
        const localRelPath = `./assets/${decodedFileName}`;
        const localDiskPath = path.resolve(this.siteDir, 'assets', decodedFileName);

        imagesToDownload.set(rawUrl, {
          remoteUrl: cleanUrl,
          localRel: localRelPath,
          localDisk: localDiskPath
        });
      } catch (e) {}
    }

    if (imagesToDownload.size > 0) {
      console.log(`📥 [UniversalAssetNormalizer] Baixando ${imagesToDownload.size} assets remotos em paralelo para ${path.basename(this.siteDir)}...`);
      const downloadPromises = [];
      for (const [matchedString, info] of imagesToDownload.entries()) {
        if (info.remoteUrl) {
          downloadPromises.push(
            this.downloadFileAsync(info.remoteUrl, info.localDisk)
          );
        }
      }
      await Promise.all(downloadPromises);

      for (const [matchedString, info] of imagesToDownload.entries()) {
        const safeRel = info.localRel.replace(/\\/g, '/');
        html = html.split(matchedString).join(safeRel);
      }
    }

    // 3. Converte placeholders data:image/png;base64 em src real se houver
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

    // 4. Normaliza caminhos em atributos srcset
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

    fs.writeFileSync(filePath, html, 'utf8');
  }
}

module.exports = {
  UniversalAssetNormalizer
};
