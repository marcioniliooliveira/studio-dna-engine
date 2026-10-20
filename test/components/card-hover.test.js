/**
 * test/components/card-hover.test.js
 * 
 * Teste Independente de Componente: Cards com Efeito de Hover (Insights)
 * Valida que o card em repouso desktop não tem badge "Click" preso na tela (opacity === 0),
 * que o mouseenter revela o conteúdo, e que em viewport mobile o badge é suprimido.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { chromium } = require('playwright');

test('Component: Insight cards maintain clean rest state (opacity: 0) and reveal on hover', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const sitePath = path.resolve(__dirname, '../../clientes/flashtech-caso-04-growth/site/index.html');
  await page.goto('file:///' + sitePath.replace(/\\/g, '/'));
  await page.waitForTimeout(500);

  // 1. Validar estado de repouso no Desktop
  const restCheck = await page.evaluate(() => {
    const contents = document.querySelector('.insight-card-contents');
    if (!contents) return { found: false };
    const style = window.getComputedStyle(contents);
    return {
      found: true,
      opacity: style.opacity
    };
  });

  assert.ok(restCheck.found, 'Deve encontrar o card de insights');
  assert.equal(restCheck.opacity, '0', 'Em repouso no desktop, o conteúdo do card DEVE ter opacity 0 (sem badge Click preso)');

  // 2. Validar reveal no hover do mouse
  const cardLocator = page.locator('.insight-card').first();
  await cardLocator.hover();
  await page.waitForTimeout(400);

  const hoverCheck = await page.evaluate(() => {
    const contents = document.querySelector('.insight-card-contents');
    return { opacity: window.getComputedStyle(contents).opacity };
  });

  assert.equal(hoverCheck.opacity, '1', 'Ao passar o mouse, o conteúdo do card DEVE transicionar para opacity 1');

  // 3. Validar adaptação mobile (375px)
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(300);

  const mobileCheck = await page.evaluate(() => {
    const btn = document.querySelector('.insight-card-btn');
    return { btnDisplay: btn ? window.getComputedStyle(btn).display : null };
  });

  assert.equal(mobileCheck.btnDisplay, 'none', 'No mobile (touch screen), o badge "Click" deve ser suprimido (display: none)');

  await browser.close();
});
