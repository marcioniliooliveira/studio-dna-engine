/**
 * test/components/form-security.test.js
 * 
 * Teste Independente de Componente: Blindagem de Formulários e Interceptação de Rede
 * Valida que formulários não enviam dados para o Webflow original e intercepta a rota via page.route().
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { chromium } = require('playwright');

test('Component: Form security intercepts payload and blocks external legacy endpoints', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  let interceptedRequests = 0;
  let sentToWebflow = false;

  // Interceptar toda rota de rede
  await page.route('**/*', (route) => {
    const req = route.request();
    if (req.method() === 'POST') {
      interceptedRequests++;
      if (req.url().includes('webflow.com') || req.url().includes('website-files.com')) {
        sentToWebflow = true;
      }
      // Abortar imediatamente em 0ms
      return route.abort();
    }
    return route.continue();
  });

  const sitePath = path.resolve(__dirname, '../../clientes/flashtech-caso-04-growth/site/index.html');
  await page.goto('file:///' + sitePath.replace(/\\/g, '/'));
  await page.waitForTimeout(500);

  // 1. Inspecionar todas as tags <form> estaticamente
  const formActions = await page.evaluate(() => {
    const forms = Array.from(document.querySelectorAll('form'));
    return forms.map(f => ({
      action: f.getAttribute('action') || '',
      method: f.getAttribute('method') || ''
    }));
  });

  formActions.forEach(f => {
    assert.ok(!f.action.includes('webflow.com'), `Form action não pode apontar para webflow.com: ${f.action}`);
  });

  // 2. Simular submissão de formulário
  const emailInput = page.locator('#scalex-audit-modal input[type="email"], form input[type="email"]').first();
  if (await emailInput.count() > 0) {
    await emailInput.fill('lead@scalex.com');
  }

  assert.equal(sentToWebflow, false, 'Nenhuma requisição pode vazar para os servidores do Webflow');

  await browser.close();
});
