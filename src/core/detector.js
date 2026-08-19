const { chromium } = require('playwright');
const { loadConfig } = require('../config');

/**
 * Analisa o HTML/HTTP e contexto do navegador para classificar o framework e renderização
 */
async function detectSiteType(url, customConfig = {}) {
  const config = loadConfig(customConfig);
  console.log('\n🔬 [DETECTOR] Analisando tipo de renderização e framework do site...');

  const launchOptions = {
    headless: config.headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };

  if (config.proxy) {
    launchOptions.proxy = config.proxy;
  }

  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({
    viewport: config.viewport,
    userAgent: config.userAgent
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: config.timeout }).catch(() => {});
    await page.waitForTimeout(1500);

    const detection = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
      const inlineScripts = Array.from(document.querySelectorAll('script:not([src])')).map(s => s.innerText.slice(0, 500));
      const allText = scripts.join(' ') + inlineScripts.join(' ');
      const meta = document.querySelector('meta[name="generator"]');
      const generatorContent = meta ? meta.content : '';

      // Frameworks SPA
      const isNext    = !!(window.__NEXT_DATA__ || allText.includes('/_next/') || document.getElementById('__NEXT_DATA__'));
      const isNuxt    = !!(window.__NUXT__ || allText.includes('/_nuxt/') || document.getElementById('__nuxt') || document.getElementById('__NUXT'));
      const isReact   = !!(window.__reactFiber || document.querySelector('[data-reactroot]') || allText.includes('react-dom'));
      const isVue     = !!(window.Vue || window.__vue_app__ || document.querySelector('[data-v-app]') || allText.includes('vue.runtime'));
      const isAngular = !!(window.ng || document.querySelector('[ng-version]') || allText.includes('angular'));

      // Site Builders & SSG
      const isWebflow  = !!(document.querySelector('meta[content*="Webflow"]') || allText.includes('webflow.js') || generatorContent.includes('Webflow'));
      const isFramer   = !!(allText.includes('framer.com') || allText.includes('framer-motion'));
      const isWordPress = !!(allText.includes('/wp-content/') || allText.includes('/wp-includes/') || generatorContent.includes('WordPress'));
      const isGatsby   = !!(window.___gatsby || allText.includes('gatsby'));
      const isSvelte   = !!(allText.includes('svelte'));
      const isAstro    = !!(document.querySelector('meta[name="generator"][content*="Astro"]') || allText.includes('astro'));

      // Detecção de página vazia (CSR puro)
      const bodyText = document.body.innerText.trim();
      const rootEl = document.getElementById('root') || document.getElementById('app') || document.getElementById('__next');
      const isEmpty = rootEl && rootEl.children.length === 0;
      const isCSROnly = isEmpty || bodyText.length < 50;

      return {
        isNext, isNuxt, isReact, isVue, isAngular,
        isWebflow, isFramer, isWordPress, isGatsby, isSvelte, isAstro,
        isCSROnly,
        generator: generatorContent,
        scriptsSample: scripts.slice(0, 5)
      };
    });

    await browser.close();

    let siteType = 'STATIC';
    let cloneMode = 'FULL_CLONE';
    let framework = 'HTML/CSS Puro';
    let cloneCapacity = 95;
    let warning = null;

    if (detection.isCSROnly) {
      siteType = 'SPA_CSR';
      cloneMode = 'DNA_ONLY';
      framework = detection.isReact ? 'React (CSR Puro)' : detection.isVue ? 'Vue (CSR Puro)' : 'SPA (CSR Puro)';
      cloneCapacity = 20;
      warning = 'AVISO: SPA renderizado 100% no cliente. O HTML capturado estará vazio. Modo DNA Extractor ativado.';
    } else if (detection.isNext) {
      siteType = 'SPA_SSR';
      cloneMode = 'STRUCTURED_CLONE';
      framework = 'Next.js (SSR/SSG)';
      cloneCapacity = 65;
      warning = 'AVISO: Site Next.js. Clone estrutural disponível, mas componentes React não são reproduzíveis.';
    } else if (detection.isNuxt) {
      siteType = 'SPA_SSR';
      cloneMode = 'STRUCTURED_CLONE';
      framework = 'Nuxt.js (SSR/SSG)';
      cloneCapacity = 65;
      warning = 'AVISO: Site Nuxt.js. Clone estrutural disponível, mas componentes Vue não são reproduzíveis.';
    } else if (detection.isVue) {
      siteType = 'SPA_SSR';
      cloneMode = 'STRUCTURED_CLONE';
      framework = 'Vue.js';
      cloneCapacity = 60;
      warning = 'AVISO: Aplicação Vue.js detectada. Clone estrutural com perda de reatividade.';
    } else if (detection.isGatsby || detection.isAstro) {
      siteType = 'STATIC_GENERATED';
      cloneMode = 'FULL_CLONE';
      framework = detection.isGatsby ? 'Gatsby (SSG)' : 'Astro (SSG)';
      cloneCapacity = 80;
    } else if (detection.isWebflow) {
      siteType = 'WEBFLOW';
      cloneMode = 'FULL_CLONE';
      framework = 'Webflow';
      cloneCapacity = 90;
    } else if (detection.isFramer) {
      siteType = 'FRAMER';
      cloneMode = 'STRUCTURED_CLONE';
      framework = 'Framer';
      cloneCapacity = 75;
      warning = 'AVISO: Site Framer. Animações Framer Motion não serão clonadas fielmente.';
    } else if (detection.isWordPress) {
      siteType = 'WORDPRESS';
      cloneMode = 'FULL_CLONE';
      framework = 'WordPress';
      cloneCapacity = 85;
    }

    return { siteType, cloneMode, framework, cloneCapacity, warning, detection };

  } catch (err) {
    await browser.close();
    console.warn('⚠️ [DETECTOR] Falha na detecção, assumindo site estático:', err.message);
    return { siteType: 'STATIC', cloneMode: 'FULL_CLONE', framework: 'HTML/CSS Puro', cloneCapacity: 95, warning: null };
  }
}

module.exports = {
  detectSiteType
};
