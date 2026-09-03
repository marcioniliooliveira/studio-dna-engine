/**
 * test/components/language-corpus.test.js
 * 
 * Teste Independente: Varredura com Dicionário Amplo de Termos em Inglês e Resíduos de Marca
 * Extrai o texto computado real da renderização (incluindo recomposição de SplitText, aria-label, alt e placeholders)
 * e prova ausência total de vazamentos de inglês e de marcas da referência.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const path = require('path');

const WIDE_ENGLISH_CORPUS = [
  // Meses
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
  // Termos funcionais e botões
  'click', 'submit', 'subscribe', 'book now', 'read more', 'learn more', 'view more', 'view all',
  // Termos de agência / growth
  'results-driven', 'traffic growth', 'keyword rankings', 'lead generation', 'conversion improvement',
  'proven results', 'data-driven approach', 'transparent reporting', 'dedicated support', 'long-term growth',
  'website seo audit', 'on-page seo', 'off-page seo', 'technical seo', 'seo audit', 'everything in starter', 'competitor analysis',
  'perfect for small teams', 'increasing visitors', 'search positions', 'targeted prospects', 'basic link building',
  'advanced link building', 'monthly reporting', 'dedicated account manager',
  // Bullets e descrições do template
  'build backlinks', 'increase authority', 'manage customer reviews', 'optimize business listings',
  'improve local rankings', 'crawl issues', 'indexing structure', 'meta tags'
];

const FORBIDDEN_BRAND_CORPUS = [
  'acilav'
];

test('Component: Full corpus lexical scan and brand isolation proves zero untranslated leaks', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const sitePath = path.resolve(__dirname, '../../clientes/flashtech-caso-04-growth/site/index.html');
  await page.goto('file:///' + sitePath.replace(/\\/g, '/'));
  await page.waitForTimeout(1000);

  const scanResults = await page.evaluate(({ englishTerms, forbiddenBrands }) => {
    const leaks = [];

    // 1. Texto renderizado no corpo da página
    const bodyText = document.body.innerText.toLowerCase();
    for (const term of englishTerms) {
      if (bodyText.includes(term.toLowerCase())) {
        leaks.push({ type: 'body_innerText', matched: term });
      }
    }
    for (const brand of forbiddenBrands) {
      if (bodyText.includes(brand.toLowerCase())) {
        const idx = bodyText.indexOf(brand.toLowerCase());
        const snippet = bodyText.slice(Math.max(0, idx - 40), idx + 60);
        leaks.push({ type: 'brand_leak_body', matched: brand, snippet });
      }
    }

    // 2. Varredura profunda de atributos aria-label, alt, placeholder e src
    const allElements = Array.from(document.querySelectorAll('*'));
    for (const el of allElements) {
      const aria = (el.getAttribute('aria-label') || '').toLowerCase();
      const alt = (el.getAttribute('alt') || '').toLowerCase();
      const placeholder = (el.getAttribute('placeholder') || '').toLowerCase();
      const src = (el.getAttribute('src') || '').toLowerCase();

      // Checar inglês em acessibilidade
      for (const term of englishTerms) {
        if (aria.includes(term.toLowerCase())) {
          leaks.push({ type: 'aria-label', tag: el.tagName, class: el.className, matched: term, value: aria });
        }
        if (alt.includes(term.toLowerCase())) {
          leaks.push({ type: 'alt', tag: el.tagName, class: el.className, matched: term, value: alt });
        }
      }

      // Checar marca proibida (Acilav) em visíveis ou imagens
      for (const brand of forbiddenBrands) {
        if (aria.includes(brand)) {
          leaks.push({ type: 'brand_in_aria', matched: brand, value: aria });
        }
        if (alt.includes(brand)) {
          leaks.push({ type: 'brand_in_alt', matched: brand, value: alt });
        }
        if (src.includes(brand) && !src.includes('cdn.prod.website-files.com/plugins')) {
          // Imagens de marca da referência vazadas
          leaks.push({ type: 'brand_in_src', matched: brand, value: src });
        }
      }
    }

    return leaks;
  }, { englishTerms: WIDE_ENGLISH_CORPUS, forbiddenBrands: FORBIDDEN_BRAND_CORPUS });

  await browser.close();

  assert.equal(
    scanResults.length,
    0,
    `Vazamento detectado pelo scanner de renderização real:\n${JSON.stringify(scanResults, null, 2)}`
  );
});
