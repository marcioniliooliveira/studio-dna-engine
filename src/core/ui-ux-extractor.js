const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { loadConfig } = require('../config');
const { autoScroll } = require('../utils/auto-scroll');
const { WEBGL_INTERCEPTOR_SCRIPT } = require('../pro/shaders-interceptor');
const { mapEventListenersWithCDP } = require('../pro/cdp-listener-mapper');

/**
 * Extrai particularidades avançadas de UI/UX, animações GSAP, Shaders WebGL e interações
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
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };
  if (config.proxy) launchOptions.proxy = config.proxy;

  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({
    viewport: config.viewport,
    userAgent: config.userAgent
  });

  // Injeta script interceptador de WebGL/Shaders antes da carga da página
  await context.addInitScript(WEBGL_INTERCEPTOR_SCRIPT);

  const page = await context.newPage();

  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: config.timeout }).catch(() => {});
    await page.waitForTimeout(1500);

    // Simula movimentos de mouse
    for (let x = 100; x <= 800; x += 200) {
      await page.mouse.move(x, x * 0.75);
      await page.waitForTimeout(50);
    }

    // Auto-scroll progressivo
    await autoScroll(page);
    await page.waitForTimeout(1000);

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
      if (window.__EXTRACTED_SHADERS__ && window.__EXTRACTED_SHADERS__.length > 0) {
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

    // Salva shaders extraídos individualmente
    if (uiFeatures.webglCanvas.shaders && uiFeatures.webglCanvas.shaders.length > 0) {
      uiFeatures.webglCanvas.shaders.forEach((sh, idx) => {
        const ext = sh.type === 'vertex' ? 'vert' : 'frag';
        fs.writeFileSync(path.join(shadersDir, `shader_${idx + 1}.${ext}`), sh.source);
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
  // Fade in up com aceleração premium
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

    console.log(`✅ [UI/UX Extractor PRO] Particularidades, Shaders e Snippets salvos em: ${outputDir}`);
    return uiFeatures;

  } finally {
    await browser.close();
  }
}

module.exports = {
  extractUiUx
};
