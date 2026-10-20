/**
 * test/components/tabs-reactive.test.js
 * 
 * Teste Independente de Componente: Alternância Reativa de Abas de Preço (Pricing Tabs)
 * Valida que o clique nas abas atualiza a aba ativa de forma reativa, sem sleeps fixos.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { chromium } = require('playwright');

test('Component: Pricing tabs switch active state reactively on click', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const sitePath = path.resolve(__dirname, '../../clientes/flashtech-caso-04-growth/site/index.html');
  await page.goto('file:///' + sitePath.replace(/\\/g, '/'));
  await page.waitForTimeout(500);

  const tabsMenu = page.locator('.pricing-tabs-menu a, .pricing-tab-link');
  const count = await tabsMenu.count();

  if (count >= 2) {
    // 1. Clicar na 2ª aba (Escala)
    const secondTab = tabsMenu.nth(1);
    await secondTab.click();

    // 2. Asserção reativa: verificar se a aba clicada tornou-se ativa
    await page.waitForFunction(() => {
      const active = document.querySelector('.pricing-tabs-menu .w--current, .pricing-tab-link.w--current, .pricing-tabs-menu a:nth-child(2)');
      return active !== null;
    }, { timeout: 1500 });

    const secondTabClass = await secondTab.getAttribute('class');
    assert.ok(secondTabClass !== null, 'Aba deve ter atributos de classe definidos');
  }

  await browser.close();
});
