/**
 * test/components/scalex-interactions.test.js
 * 
 * Teste Independente de Componente: Homologação Canônica SCALEX (Pareto 80/20)
 * 
 * Valida os 5 parâmetros e seus critérios com estado sempre puro:
 * P1: Badges de autoridade e manchetes de blog com isolamento de runtime
 * P2: Floating Dock compacto, omnidirecional (mouseleave) e não-bloqueante
 * P3: Hover reveal dos serviços com A11y (visibility: hidden em repouso) e sticky scroll
 * P4: Planos B2B e Toast fora do fluxo (position: fixed, zero layout shift)
 * P5: Limpeza rigorosa de cookies, sessionStorage e localStorage por teste
 */

const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { chromium } = require('playwright');

const sitePath = 'file:///' + path.resolve(__dirname, '../../clientes/flashtech-caso-04-growth/site/index.html').replace(/\\/g, '/');

async function createCleanPage(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.clearCookies();
  const page = await context.newPage();
  await page.goto(sitePath);
  await page.evaluate(() => {
    sessionStorage.clear();
    localStorage.clear();
  });
  await page.waitForTimeout(500);
  return { context, page };
}

test('P2: Floating Dock operates cleanly in bottom-right corner without blocking viewport', async () => {
  const browser = await chromium.launch({ headless: true });
  const { context, page } = await createCleanPage(browser);

  // 1. Disparar via mouseleave no document (Ponto Cego 2: Exit-Intent Omnidirecional)
  await page.evaluate(() => {
    document.dispatchEvent(new MouseEvent('mouseleave'));
  });
  await page.waitForTimeout(300);

  // 2. Avaliação geométrica do Floating Dock
  const dockMetrics = await page.evaluate(() => {
    const dock = document.getElementById('scalex-audit-modal');
    if (!dock) return { exists: false };
    const rect = dock.getBoundingClientRect();
    const style = window.getComputedStyle(dock);
    return {
      exists: true,
      display: style.display,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      right: Math.round(window.innerWidth - rect.right),
      bottom: Math.round(window.innerHeight - rect.bottom),
      isFullOverlay: (rect.width >= window.innerWidth * 0.9) && (rect.height >= window.innerHeight * 0.9)
    };
  });

  assert.ok(dockMetrics.exists, 'Floating Dock deve existir no DOM');
  assert.equal(dockMetrics.display, 'flex', 'Floating Dock deve abrir no mouseleave');
  assert.ok(dockMetrics.width <= 420, `Dock deve ser compacto (largura atual: ${dockMetrics.width}px)`);
  assert.equal(dockMetrics.isFullOverlay, false, 'Dock NÃO pode ser um modal invasivo de tela cheia');

  // 3. Testar seletor interativo de horários
  const slotBtns = page.locator('.time-slot-btn');
  if (await slotBtns.count() >= 2) {
    const secondSlot = slotBtns.nth(1);
    await secondSlot.click();
    const slotColor = await secondSlot.evaluate(el => el.style.color);
    assert.ok(slotColor.includes('255, 197, 82') || slotColor === '#FFC552', 'Slot selecionado deve receber acento dourado');
  }

  // 4. Fechar dock
  await page.click('#scalex-modal-close');
  await page.waitForTimeout(200);

  const isClosed = await page.evaluate(() => {
    const dock = document.getElementById('scalex-audit-modal');
    return dock ? window.getComputedStyle(dock).display === 'none' : true;
  });
  assert.equal(isClosed, true, 'Ao clicar em fechar, o dock deve transicionar para display: none');

  await context.close();
  await browser.close();
});

test('P3: Service Cards hover reveal has strict A11y (visibility: hidden in rest) and preserves sticky', async () => {
  const browser = await chromium.launch({ headless: true });
  const { context, page } = await createCleanPage(browser);

  // 1. Checar existência dos 4 blocos reveal
  const reveals = page.locator('.service-hover-reveal');
  assert.equal(await reveals.count(), 4, 'Os 4 cards de serviço devem conter .service-hover-reveal');

  // 2. Ponto Cego 4: A11y em repouso deve ter visibility: hidden
  const firstRevealVisibility = await reveals.first().evaluate(el => window.getComputedStyle(el).visibility);
  assert.equal(firstRevealVisibility, 'hidden', 'Reveal deve ter visibility: hidden em repouso para não quebrar navegação por Tab');

  // 3. Verificar que o conteúdo técnico existe no DOM compilado
  const serviceText = await page.locator('.service-section-inner').textContent();
  assert.ok(serviceText.includes('Stack:'), 'Cards de serviço devem conter especificação de Stack');
  assert.ok(serviceText.includes('Entregáveis:'), 'Cards de serviço devem conter Entregáveis');
  assert.ok(serviceText.includes('Impacto Médio:'), 'Cards de serviço devem conter Impacto Médio');

  // 4. Preservação de sticky scroll: verificar ausência de overflow: hidden no container
  const secOverflow = await page.evaluate(() => {
    const sec = document.querySelector('.section.service');
    return sec ? window.getComputedStyle(sec).overflow : '';
  });
  assert.ok(secOverflow !== 'hidden', 'Container de serviços não pode ter overflow: hidden');

  await context.close();
  await browser.close();
});

test('P1: Authority Badges and Blog Marquee are stably injected with runtime isolation', async () => {
  const browser = await chromium.launch({ headless: true });
  const { context, page } = await createCleanPage(browser);

  // Aguardar execução de scripts para aferir se o Webflow runtime não removeu os nós
  await page.waitForTimeout(1000);

  // 1. Verificar os 3 badges com data-scalex-compiled
  const badges = page.locator('.scalex-badge');
  assert.equal(await badges.count(), 3, 'Devem existir exatamente 3 badges de autoridade');

  const compiledFlag = await page.locator('.scalex-authority-badges').getAttribute('data-scalex-compiled');
  assert.equal(compiledFlag, 'true', 'Badges devem ter a marcação data-scalex-compiled="true"');

  // 2. Verificar esteira de artigos de blog
  const marqueeText = await page.locator('.footer-marquee').first().innerText();
  assert.ok(marqueeText.toLowerCase().includes('clusters semânticos') || marqueeText.toLowerCase().includes('core web vitals'), 'Esteira deve exibir artigos de blog da SCALEX');

  await context.close();
  await browser.close();
});

test('P4: Pricing Plan selection syncs with contact form and removes legacy dollar pricing', async () => {
  const browser = await chromium.launch({ headless: true });
  const { context, page } = await createCleanPage(browser);

  // 1. Clicar no botão do plano Tração (visível na aba 1 ativa)
  const tracaoBtn = page.locator('.scalex-plan-cta[data-plan="Tração"]').first();
  await tracaoBtn.click();
  await page.waitForTimeout(200);

  const selectValue = await page.evaluate(() => {
    const sel = document.getElementById('scalex-plan-select');
    return sel ? sel.value : null;
  });
  assert.equal(selectValue, 'Tração', 'Clique no plano deve sincronizar o select do formulário');

  // 2. Checar ausência de $120
  const pricingText = await page.locator('.section.pricing').innerText();
  assert.ok(!pricingText.includes('$120'), 'Seção de preços não pode conter $120');
  assert.ok(pricingText.includes('SOB MEDIDA') || pricingText.includes('ENTERPRISE'), 'Planos devem exibir formato consultivo');

  await context.close();
  await browser.close();
});

test('P4 & P5: Contact Form Mockup validates and Toast has position: fixed (zero CLS)', async () => {
  const browser = await chromium.launch({ headless: true });
  const { context, page } = await createCleanPage(browser);

  // 1. Ponto Cego 5: Toast deve ter position: fixed fora do fluxo
  const toastPosition = await page.evaluate(() => {
    const toast = document.getElementById('scalex-toast');
    return toast ? window.getComputedStyle(toast).position : '';
  });
  assert.equal(toastPosition, 'fixed', '#scalex-toast DEVE ter position: fixed para evitar layout shift');

  // 2. Preencher formulário de contato
  await page.fill('#wf-form-SCALEX---Contact-Form #name', 'Diretoria Apex');
  await page.fill('#wf-form-SCALEX---Contact-Form #Email', 'diretoria@apex.com.br');
  await page.fill('#wf-form-SCALEX---Contact-Form #Subject', 'apex.com.br');
  await page.fill('#wf-form-SCALEX---Contact-Form #Message', 'Aceleração de tráfego orgânico nos próximos 90 dias.');

  // 3. Submeter formulário
  await page.click('#wf-form-SCALEX---Contact-Form button[type="submit"], #wf-form-SCALEX---Contact-Form .submit-btn');
  await page.waitForTimeout(800);

  // 4. Verificar visibilidade do toast
  const toastDisplay = await page.evaluate(() => {
    const toast = document.getElementById('scalex-toast');
    return toast ? window.getComputedStyle(toast).display : '';
  });
  assert.equal(toastDisplay, 'flex', 'Submissão deve disparar toast com display: flex');

  await context.close();
  await browser.close();
});
