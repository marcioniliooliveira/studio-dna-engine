/**
 * test/sticky-scroll-integrity.test.js
 * 
 * Teste Permanente de Integridade de Scroll Sticky
 * Garante que os componentes com position: sticky travam no viewport
 * e que nenhum ancestral quebra o scroll container com overflow indevido.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { chromium } = require('playwright');

test('Sticky Integrity: SCALEX service and insights sections maintain functional sticky scroll', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const fileUrl = 'file:///' + path.resolve(__dirname, '../clientes/flashtech-caso-04-growth/site/index.html').replace(/\\/g, '/');
  await page.goto(fileUrl);
  await page.waitForTimeout(500);

  const stickyAnalysis = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.service-card, .insight-scroll-area'));
    return cards.map(el => {
      const offending = [];
      let p = el.parentElement;
      while (p && p !== document.documentElement) {
        const ps = window.getComputedStyle(p);
        const ox = ps.overflowX;
        const oy = ps.overflowY;
        if ((ox !== 'visible' && ox !== 'clip') || (oy !== 'visible' && oy !== 'clip')) {
          offending.push({ tag: p.tagName, class: p.className, ox, oy });
        }
        p = p.parentElement;
      }
      return {
        tag: el.tagName,
        class: el.className,
        position: window.getComputedStyle(el).position,
        offendingCount: offending.length,
        offending
      };
    });
  });

  await browser.close();

  assert.ok(stickyAnalysis.length >= 2, 'Deve encontrar ao menos os cards de serviço e área de insights');
  stickyAnalysis.forEach(item => {
    assert.equal(item.position, 'sticky', `Elemento .${item.class} deve ter position: sticky`);
    assert.equal(item.offendingCount, 0, `Elemento .${item.class} não pode ter ancestrais com overflow!=visible/clip. Encontrados: ${JSON.stringify(item.offending)}`);
  });
});
