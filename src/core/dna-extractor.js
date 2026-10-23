const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { loadConfig } = require('../config');
const { autoScroll } = require('../utils/auto-scroll');

/**
 * Extrai DNA de Design (Cores, Tipografia, Estrutura, Scripts e CSS)
 */
async function extractDesignDna(targetUrl, outputFolder = null, customConfig = {}) {
  const config = loadConfig(customConfig);
  console.log(`🚀 [DNA Extractor] Iniciando extração de Design Tokens para: ${targetUrl}`);

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
  const page = await context.newPage();

  try {
    try {
      await page.goto(targetUrl, { waitUntil: 'load', timeout: config.timeout });
    } catch (e) {
      try {
        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      } catch (e2) {}
    }
    await page.waitForTimeout(2000);

    // Simula interação para destravar scripts deferidos
    await page.mouse.move(100, 200);
    await page.mouse.move(300, 400);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);

    // Auto-scroll para ativar lazy-load e content-visibility
    await autoScroll(page);
    await page.waitForTimeout(1000);

    // Detecta iframe de conteúdo full-page
    let evaluationTarget = page;
    let isIframe = false;
    const allIframes = await page.$$('iframe');
    for (const iframeEl of allIframes) {
      const box = await iframeEl.boundingBox();
      const src = (await iframeEl.getAttribute('src')) || ''; const isVid = src.includes('vimeo') || src.includes('youtube') || src.includes('mediadelivery') || src.includes('player'); if (!isVid && box && box.width > 800 && box.height > 500) {
        const contentFrame = await iframeEl.contentFrame();
        if (contentFrame) {
          evaluationTarget = contentFrame;
          isIframe = true;
          console.log(`ℹ️ Iframe de conteúdo detectado (${Math.round(box.width)}x${Math.round(box.height)}). Entrando no frame...`);
          await contentFrame.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
          await page.waitForTimeout(2000);
          break;
        }
      }
    }

    const designDna = await evaluationTarget.evaluate(() => {
      // 1. Scripts e CSS
      const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
      const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);

      // 2. Variáveis de Cores (:root & body)
      const colorVariables = {};
      const rootRules = Array.from(document.styleSheets)
        .flatMap(sheet => {
          try { return Array.from(sheet.cssRules); } catch { return []; }
        });

      rootRules.forEach(rule => {
        if (rule.selectorText === ':root' || rule.selectorText === 'body') {
          const style = rule.style;
          for (let i = 0; i < style.length; i++) {
            const propName = style[i];
            if (propName.startsWith('--')) {
              const val = style.getPropertyValue(propName).trim();
              if (val.includes('#') || val.includes('rgb') || val.includes('hsl') || propName.includes('color') || propName.includes('font')) {
                colorVariables[propName] = val;
              }
            }
          }
        }
      });

      const bodyStyle = window.getComputedStyle(document.body);
      const defaultColors = {
        backgroundColor: bodyStyle.backgroundColor,
        color: bodyStyle.color
      };

      // 3. Tipografia Computada
      const typography = {};
      const getSampleElement = (tag, classKeywords) => {
        let el = document.querySelector(tag);
        if (el) return el;
        for (const kw of classKeywords) {
          el = document.querySelector(`[class*="${kw}"]`);
          if (el && el.innerText && el.innerText.trim().length > 2) return el;
        }
        if (tag === 'p') {
          const divs = Array.from(document.querySelectorAll('div, span'));
          const textDiv = divs.find(d => d.childNodes.length === 1 && d.childNodes[0].nodeType === Node.TEXT_NODE && d.innerText.trim().length > 50);
          if (textDiv) return textDiv;
        }
        return null;
      };

      const sampleElements = {
        h1: getSampleElement('h1', ['title', 'hero', 'heading-1']),
        h2: getSampleElement('h2', ['subtitle', 'heading-2']),
        h3: getSampleElement('h3', ['heading-3']),
        paragraph: getSampleElement('p', ['body', 'desc', 'text']),
        button: document.querySelector('button') || document.querySelector('a[href*="contact"]') || document.querySelector('[class*="btn"]') || document.querySelector('[class*="button"]')
      };

      if (!sampleElements.h1) {
        const allTextElements = Array.from(document.body.querySelectorAll('*'))
          .filter(el => el.children.length === 0 && el.innerText && el.innerText.trim().length > 3);
        if (allTextElements.length > 0) {
          allTextElements.sort((a, b) => {
            const sizeA = parseFloat(window.getComputedStyle(a).fontSize);
            const sizeB = parseFloat(window.getComputedStyle(b).fontSize);
            return sizeB - sizeA;
          });
          sampleElements.h1 = allTextElements[0];
        }
      }

      for (const [key, element] of Object.entries(sampleElements)) {
        if (element) {
          const computed = window.getComputedStyle(element);
          typography[key] = {
            fontFamily: computed.fontFamily,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            lineHeight: computed.lineHeight,
            letterSpacing: computed.letterSpacing,
            color: computed.color
          };
        }
      }

      // 4. Mapeamento de Seções
      const sections = [];
      let semanticElements = Array.from(document.querySelectorAll('header, section, footer, main, nav'));

      if (semanticElements.length === 0) {
        let rootContainer = document.getElementById('root') || document.getElementById('__next') || document.getElementById('app') || document.body;
        const getLayoutChildren = (container) => {
          return Array.from(container.children).filter(el => {
            const rect = el.getBoundingClientRect();
            const tag = el.tagName.toLowerCase();
            return tag !== 'script' && tag !== 'style' && rect.height > 50;
          });
        };

        let layoutChildren = getLayoutChildren(rootContainer);
        while (layoutChildren.length === 1 && layoutChildren[0].tagName.toLowerCase() === 'div') {
          rootContainer = layoutChildren[0];
          layoutChildren = getLayoutChildren(rootContainer);
        }
        semanticElements = layoutChildren;
      }

      semanticElements = [...new Set(semanticElements)];

      semanticElements.forEach((el, index) => {
        const id = el.id || `${el.tagName.toLowerCase()}-${index + 1}`;
        const tagName = el.tagName.toLowerCase();
        const classes = Array.from(el.classList);
        const rect = el.getBoundingClientRect();
        if (rect.height > 50) {
          sections.push({
            id,
            tag: tagName,
            classes,
            approxHeight: Math.round(rect.height),
            summaryText: el.innerText ? el.innerText.trim().slice(0, 100).replace(/\n/g, ' ') : ''
          });
        }
      });

      return {
        colors: {
          variables: colorVariables,
          defaults: defaultColors
        },
        typography,
        sections,
        detectedScripts: scripts,
        detectedCSS: stylesheets
      };
    });

    if (outputFolder) {
      fs.mkdirSync(outputFolder, { recursive: true });
      fs.writeFileSync(path.join(outputFolder, 'design_dna.json'), JSON.stringify(designDna, null, 2));
      await page.screenshot({ path: path.join(outputFolder, 'screenshot.png'), fullPage: true });
    }

    return designDna;
  } finally {
    await browser.close();
  }
}

module.exports = {
  extractDesignDna
};
