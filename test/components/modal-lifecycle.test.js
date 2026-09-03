/**
 * test/components/modal-lifecycle.test.js
 * 
 * Teste Independente de Componente: Ciclo de Vida de Modais e Popups
 * Valida que o modal de auditoria abre no viewport e que o botão fechar fecha o modal.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { chromium } = require('playwright');

test('Component: Modal opens in viewport and close button dismisses it cleanly', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const sitePath = path.resolve(__dirname, '../../clientes/flashtech-caso-04-growth/site/index.html');
  await page.goto('file:///' + sitePath.replace(/\\/g, '/'));
  await page.waitForTimeout(500);

  // 1. Abrir o modal programaticamente
  await page.evaluate(() => {
    const modal = document.getElementById('scalex-audit-modal');
    if (modal) modal.style.display = 'flex';
  });

  // 2. Asserção de visibilidade real no viewport
  const modalVisibility = await page.evaluate(() => {
    const modal = document.getElementById('scalex-audit-modal');
    if (!modal) return { exists: false };
    const rect = modal.getBoundingClientRect();
    const style = window.getComputedStyle(modal);

    const isInViewport = rect.top >= 0 && rect.left >= 0 &&
                         rect.bottom <= window.innerHeight &&
                         rect.right <= window.innerWidth;

    return {
      exists: true,
      display: style.display,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      isInViewport
    };
  });

  assert.ok(modalVisibility.exists, 'Elemento #scalex-audit-modal deve existir no DOM');
  assert.equal(modalVisibility.display, 'flex', 'Modal deve estar visível com display flex');
  assert.ok(modalVisibility.width > 0 && modalVisibility.height > 0, 'Modal deve ter dimensões reais');
  assert.ok(modalVisibility.isInViewport, 'Modal deve estar centralizado dentro do viewport do navegador');

  // 3. Clicar no botão de fechar e aferir que o modal sumiu
  const closeBtn = page.locator('#scalex-modal-close');
  if (await closeBtn.count() > 0) {
    await closeBtn.click();
    await page.waitForTimeout(100);

    const isClosed = await page.evaluate(() => {
      const modal = document.getElementById('scalex-audit-modal');
      return modal ? window.getComputedStyle(modal).display === 'none' : true;
    });

    assert.equal(isClosed, true, 'Ao clicar em fechar, o modal DEVE transicionar para display: none');
  }

  await browser.close();
});
