const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { loadConfig } = require('../config');
const { autoScroll } = require('../utils/auto-scroll');
const { waitForHydrationSettled } = require('../utils/hydration-barrier');

// Módulos PRO carregados de forma segura
let AdvancedAssetInterceptor = null;
let WEBGL_INTERCEPTOR_SCRIPT = '/* Community Edition: Shaders Interceptor is a Pro feature */';

try {
  const proAdv = require('../pro/advanced-asset-interceptor');
  AdvancedAssetInterceptor = proAdv.AdvancedAssetInterceptor;
  WEBGL_INTERCEPTOR_SCRIPT = proAdv.ADVANCED_PRELOAD_SNIFFER_SCRIPT || WEBGL_INTERCEPTOR_SCRIPT;
} catch (e) {
  try {
    const proShaders = require('../pro/shaders-interceptor');
    WEBGL_INTERCEPTOR_SCRIPT = proShaders.WEBGL_INTERCEPTOR_SCRIPT || WEBGL_INTERCEPTOR_SCRIPT;
  } catch (err) {}
}

let mapEventListenersWithCDP = async () => null;
try {
  const proCdp = require('../pro/cdp-listener-mapper');
  mapEventListenersWithCDP = proCdp.mapEventListenersWithCDP || mapEventListenersWithCDP;
} catch (e) {}

/**
 * Extrai particularidades de UI/UX, animações GSAP, Shaders, Canvas Sequences e micro-interações
 */
async function extractUiUx(targetUrl, targetDir = null, customConfig = {}) {
  const config = loadConfig(customConfig);
  console.log(`\n✨ [UI/UX Extractor PRO] Inspecionando Shaders, GSAP e micro-interações para: ${targetUrl}`);

  const outputDir = targetDir || path.join(config.outputDir, 'temp-ui-ux');
  const snippetsDir = path.join(outputDir, 'snippets');
  const shadersDir = path.join(outputDir, 'shaders');
  fs.mkdirSync(snippetsDir, { recursive: true });
  fs.mkdirSync(shadersDir, { recursive: true });

  const launchOptions = {
    headless: config.headless,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--use-gl=angle',
      '--enable-webgl',
      '--ignore-gpu-blocklist'
    ]
  };
  if (config.proxy) launchOptions.proxy = config.proxy;

  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({
    viewport: config.viewport,
    userAgent: config.userAgent
  });

  const page = await context.newPage();

  let assetInterceptor = null;
  if (AdvancedAssetInterceptor) {
    assetInterceptor = new AdvancedAssetInterceptor({
      outputDir,
      captureShaders: true,
      captureBinaries: true
    });
    await assetInterceptor.attachPreloadSniffers(page);
    assetInterceptor.attachNetworkListener(page);
  } else {
    await context.addInitScript(WEBGL_INTERCEPTOR_SCRIPT);
  }

  try {
    await page.goto(targetUrl, { waitUntil: 'commit', timeout: config.timeout }).catch(() => {});

    // Barreira Determinística de Hidratação
    await waitForHydrationSettled(page, {
      domSilenceThresholdMs: 400,
      timeoutMs: config.timeout || 30000
    });

    // Simula movimentos de mouse
    for (let x = 100; x <= 800; x += 200) {
      await page.mouse.move(x, x * 0.75);
      await page.waitForTimeout(50);
    }

    // Auto-scroll progressivo
    await autoScroll(page);
    await page.waitForTimeout(600);

    // Amostragem de sequência de frames em Canvas (se houver canvas presente)
    if (assetInterceptor) {
      const hasCanvas = await page.$('canvas');
      if (hasCanvas) {
        await assetInterceptor.captureCanvasScrollSequence(page, 'canvas', 30);
      }
      await assetInterceptor.finalize(page);
    }

    const uiFeatures = await page.evaluate(() => {
      const results = {
        gsap: { detected: false, version: null, hasScrollTrigger: false, scrollTriggerInstances: 0, tweensCount: 0, plugins: [], timelines: [] },
        lenis: { detected: false, config: null },
        microInteractions: { magneticButtons: [], tiltCards: [], spotlightElements: [], textScramble: false },
        webglCanvas: { canvasCount: 0, hasThreeJs: false, shadersCount: 0, shaders: [] },
        typography: { splitTextDetected: false, variableFonts: [], marqueesCount: 0 },
        cssEffects: { keyframes: [], glassmorphism: false, clipPaths: [], svgFilters: [] }
      };

      // 1. GSAP e Timelines
      if (window.gsap) {
        results.gsap.detected = true;
        results.gsap.version = window.gsap.version || '3.x';
        if (window.ScrollTrigger) {
          results.gsap.hasScrollTrigger = true;
          try { results.gsap.scrollTriggerInstances = window.ScrollTrigger.getAll().length; } catch (e) {}
        }
        if (window.gsap.plugins) results.gsap.plugins = Object.keys(window.gsap.plugins);
        try {
          const children = window.gsap.globalTimeline.getChildren(true, true, true);
          results.gsap.tweensCount = children.length;
          results.gsap.timelines = children.slice(0, 15).map(t => {
            const v = t.vars || {};
            return {
              duration: t.duration() || v.duration || 1,
              ease: typeof v.ease === 'string' ? v.ease : 'power2.out',
              props: { opacity: v.opacity, y: v.y, x: v.x, scale: v.scale }
            };
          });
        } catch (e) {}
      }

      // 2. Lenis Smooth Scroll
      if (window.lenis || window.__lenis || document.querySelector('.lenis')) {
        results.lenis.detected = true;
      }

      // 3. Micro-interações
      document.querySelectorAll('button, a, .btn, [data-magnetic], [data-spotlight]').forEach((el) => {
        const style = window.getComputedStyle(el);
        if (el.getAttribute('data-magnetic') || style.transform.includes('matrix') || el.classList.value.includes('magnetic')) {
          results.microInteractions.magneticButtons.push({
            tag: el.tagName.toLowerCase(),
            text: el.innerText.slice(0, 30).trim(),
            selector: el.id ? `#${el.id}` : `.${Array.from(el.classList).join('.')}`
          });
        }
        if (el.getAttribute('data-spotlight') || el.classList.value.includes('spotlight')) {
          results.microInteractions.spotlightElements.push({
            tag: el.tagName.toLowerCase(),
            selector: el.id ? `#${el.id}` : `.${Array.from(el.classList).join('.')}`
          });
        }
      });

      // 4. WebGL, Canvas e Shaders Interceptados
      const canvases = document.querySelectorAll('canvas');
      results.webglCanvas.canvasCount = canvases.length;
      if (window.THREE || document.querySelector('[data-three]')) {
        results.webglCanvas.hasThreeJs = true;
      }
      if (window.__ICM_REGISTRY__ && window.__ICM_REGISTRY__.shaders && window.__ICM_REGISTRY__.shaders.length > 0) {
        results.webglCanvas.shadersCount = window.__ICM_REGISTRY__.shaders.length;
        results.webglCanvas.shaders = window.__ICM_REGISTRY__.shaders.slice(0, 10);
      } else if (window.__EXTRACTED_SHADERS__ && window.__EXTRACTED_SHADERS__.length > 0) {
        results.webglCanvas.shadersCount = window.__EXTRACTED_SHADERS__.length;
        results.webglCanvas.shaders = window.__EXTRACTED_SHADERS__.slice(0, 10);
      }

      // 5. Filtros SVG (Noise/Grain) e Glassmorphism
      document.querySelectorAll('svg filter, filter').forEach(f => {
        results.cssEffects.svgFilters.push({
          id: f.id,
          hasTurbulence: !!f.querySelector('feTurbulence'),
          hasDisplacement: !!f.querySelector('feDisplacementMap')
        });
      });

      const styleSheets = Array.from(document.styleSheets);
      styleSheets.forEach((sheet) => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach((rule) => {
            if (rule.type === CSSRule.KEYFRAMES_RULE && results.cssEffects.keyframes.length < 15) {
              results.cssEffects.keyframes.push({
                name: rule.name,
                cssText: rule.cssText
              });
            }
            if (rule.style && (rule.style.backdropFilter || rule.style.webkitBackdropFilter)) {
              results.cssEffects.glassmorphism = true;
            }
          });
        } catch (e) {}
      });

      return results;
    });

    // Mapeamento avançado com CDP
    try {
      const cdpData = await mapEventListenersWithCDP(page);
      if (cdpData && cdpData.mouseMoveElements.length > 0) {
        uiFeatures.cdpListeners = cdpData;
      }
    } catch (e) {}

    // Salva JSON com particularidades
    fs.writeFileSync(path.join(outputDir, 'ui_ux_features.json'), JSON.stringify(uiFeatures, null, 2));

    // Salva shaders extraídos individualmente (fallback legado)
    if (uiFeatures.webglCanvas.shaders && uiFeatures.webglCanvas.shaders.length > 0) {
      uiFeatures.webglCanvas.shaders.forEach((sh, idx) => {
        const ext = sh.type === 'vertex' ? 'vert' : 'frag';
        const shaderPath = path.join(shadersDir, `shader_${idx + 1}.${ext}`);
        if (!fs.existsSync(shaderPath)) {
          fs.writeFileSync(shaderPath, sh.source);
        }
      });
    }

    // Gera snippets limpos
    const gsapSnippet = `// -------------------------------------------------------------
// SNIPPET: GSAP & SCROLLTRIGGER REPRODUCER
// Origem: ${targetUrl}
// -------------------------------------------------------------
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}
`;
    fs.writeFileSync(path.join(snippetsDir, 'gsap-scrolltrigger.js'), gsapSnippet);

    const microInteractionsSnippet = `// -------------------------------------------------------------
// SNIPPET: MICRO-INTERACTIONS (Spotlight & Magnetic Button)
// Origem: ${targetUrl}
// -------------------------------------------------------------
export function initMagneticEffect(selector = '.magnetic-btn') {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
    });
  });
}
`;
    fs.writeFileSync(path.join(snippetsDir, 'micro-interactions.js'), microInteractionsSnippet);

    console.log(`✅ [UI/UX Extractor PRO] Particularidades, Shaders, Modelos e Snippets salvos em: ${outputDir}`);
    return uiFeatures;

  } finally {
    await browser.close();
  }
}

module.exports = {
  extractUiUx
};
