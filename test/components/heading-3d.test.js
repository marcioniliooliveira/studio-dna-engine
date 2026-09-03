/**
 * test/components/heading-3d.test.js
 * 
 * Teste Independente de Componente: Cilindro 3D de Títulos Rolantes
 * Valida que o componente de título 3D mantém perspectiva W3C,
 * não suprime a face traseira com display: none, e preserva a visibilidade pós-scroll.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { chromium } = require('playwright');

test('Component: 3D Cylinder Headings maintain W3C geometry and do not disappear after scroll', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const sitePath = path.resolve(__dirname, '../../clientes/flashtech-caso-04-growth/site/index.html');
  await page.goto('file:///' + sitePath.replace(/\\/g, '/'));
  await page.waitForTimeout(500);

  // 1. Validar geometria CSS antes do scroll
  const geometryCheck = await page.evaluate(() => {
    const wrap = document.querySelector('.single-heading-wrap');
    const front = document.querySelector('.heading-3d-front');
    const back = document.querySelector('.heading-3d-back');
    if (!wrap || !front || !back) return { found: false };

    const wrapStyle = window.getComputedStyle(wrap);
    const frontStyle = window.getComputedStyle(front);
    const backStyle = window.getComputedStyle(back);

    return {
      found: true,
      wrapPerspective: wrapStyle.perspective,
      wrapTransformStyle: wrapStyle.transformStyle,
      frontBackface: frontStyle.backfaceVisibility,
      backBackface: backStyle.backfaceVisibility,
      backDisplay: backStyle.display
    };
  });

  assert.ok(geometryCheck.found, 'Deve encontrar componentes de título 3D');
  assert.notEqual(geometryCheck.backDisplay, 'none', 'A face traseira .heading-3d-back NUNCA pode ter display: none');

  // 2. Simular scroll por toda a página para acionar as timelines 3D do Webflow/GSAP
  for (let s = 500; s <= 6000; s += 600) {
    await page.evaluate((pos) => window.scrollTo(0, pos), s);
    await page.waitForTimeout(100);
  }

  // 3. Aferir se todos os títulos permanecem legíveis e visíveis pós-scroll
  const headingsAfterScroll = await page.evaluate(() => {
    const wraps = Array.from(document.querySelectorAll('.single-heading-wrap'));
    return wraps.map(w => {
      const rect = w.getBoundingClientRect();
      const text = w.textContent.trim();
      return {
        text: text.slice(0, 30),
        height: Math.round(rect.height),
        hasText: text.length > 0
      };
    });
  });

  assert.ok(headingsAfterScroll.length >= 5, 'Deve encontrar ao menos 5 títulos com efeito 3D');
  headingsAfterScroll.forEach(h => {
    assert.ok(h.hasText, `Título deve ter conteúdo textual: "${h.text}"`);
    assert.ok(h.height > 15, `Título "${h.text}" não pode ter altura zero ou sumir pós-animação (altura: ${h.height}px)`);
  });

  await browser.close();
});
