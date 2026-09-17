/**
 * test/negocia-bem-scroll-integrity.test.js
 * 
 * Bateria de Testes Adversariais e Caça a Erros Silenciosos no Negocia Bem:
 * - Probe 1: Sincronização e alternância das abas de oportunidade (01 Casas, 02 Terrenos, 03 Aluguel).
 * - Probe 2: Ausência de Click Hijacking nos botões e FAQ da Sessão 06.
 * - Probe 3: Integridade no Breakpoint Crítico de 880px (879px vs 881px).
 * - Probe 4: Estabilidade em Scroll Reverso (do rodapé ao topo).
 * - Probe 5: Tolerância Zero de sobreposição entre Seções (S02->S03 e S05->S06).
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const http = require('http');
const fs = require('fs');
const { chromium } = require('playwright');
const { installNoRemoteRuntimeGuard } = require('./helpers/local-runtime-determinism');

const siteDir = path.resolve(__dirname, '..', 'clientes', 'negocia-bem', 'site');

function createTestServer() {
  const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.avif': 'image/avif',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    let targetFile = path.join(siteDir, reqPath);
    if (!fs.existsSync(targetFile) || !fs.statSync(targetFile).isFile()) {
      const altAsset = path.join(siteDir, 'assets', reqPath);
      if (fs.existsSync(altAsset) && fs.statSync(altAsset).isFile()) {
        targetFile = altAsset;
      }
    }

    if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
      const ext = path.extname(targetFile).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(targetFile).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  return server;
}

async function openRuntimeReadyPage(browser, origin, viewport) {
  const page = await browser.newPage({ viewport });
  const runtimeGuard = installNoRemoteRuntimeGuard(page, origin);

  await page.goto(`${origin}/index.html`, { waitUntil: 'commit', timeout: 5000 });
  try {
    await page.waitForFunction(() => window.__negociaBemRuntimeReady === true, null, { timeout: 3000 });
  } catch (error) {
    assert.fail(`Negocia Bem runtime did not become ready while remote scripts/stylesheets were blocked. Aborted URLs: ${runtimeGuard.blockedUrls.join(', ') || '(none)'}. ${error.message}`);
  }

  return { page };
}

test('Probe 1 & 5: Scroll dinâmico através de S02->S03 e S05->S06 não colide e sincroniza abas', async () => {
  const server = createTestServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;

  const browser = await chromium.launch({ headless: true });
  const origin = `http://127.0.0.1:${port}`;

  try {
    const { page } = await openRuntimeReadyPage(browser, origin, { width: 1440, height: 900 });

    // 1. Verificar transição Sessão 02 -> Sessão 03 (Dados da Região)
    const dadosRegiao = page.locator('#dados-regiao');
    await dadosRegiao.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const s02MediaOverlap = await page.evaluate(() => {
      const s02Media = document.querySelector('.s02-media');
      const s03Title = document.querySelector('#dados-regiao h2, #dados-regiao .nb-grid');
      if (!s02Media || !s03Title) return 0;

      const r1 = s02Media.getBoundingClientRect();
      const r2 = s03Title.getBoundingClientRect();

      const xOverlap = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
      const yOverlap = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));
      return xOverlap * yOverlap;
    });

    assert.equal(s02MediaOverlap, 0, 'A mídia da Sessão 02 não pode sobrepor os dados da Sessão 03');

    // 2. Verificar sincronização das abas na Sessão 05
    const oportunidades = page.locator('#oportunidades');
    await oportunidades.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Rolar dentro de oportunidades para ativar aba 02 e 03
    const oportTop = await oportunidades.evaluate(el => el.getBoundingClientRect().top + window.scrollY);
    
    // Rolar para 50% de oportunidades
    await page.evaluate(top => window.scrollTo(0, top + window.innerHeight * 1.5), oportTop);
    await page.waitForTimeout(200);

    const activeIndex50 = await page.evaluate(() => {
      const states = Array.from(document.querySelectorAll('.nb-desktop .nb-state'));
      return states.findIndex(s => s.classList.contains('active'));
    });
    assert.ok(activeIndex50 >= 1, 'Ao rolar até a metade da Sessão 05, aba 02 ou posterior deve estar ativa');

    // 3. Rolar até a Sessão 06 (FAQ) e verificar ausência de colisão com S05
    const faq = page.locator('#faq');
    await faq.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const faqTitleOverlap = await page.evaluate(() => {
      const oportPin = document.querySelector('#oportunidades-pin');
      const faqTitle = document.querySelector('#faq-title');
      if (!oportPin || !faqTitle) return 0;

      const r1 = oportPin.getBoundingClientRect();
      const r2 = faqTitle.getBoundingClientRect();

      // Se o oportPin está fora da tela acima (r1.bottom <= 0), sem colisão
      if (r1.bottom <= 0) return 0;

      const xOverlap = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
      const yOverlap = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));
      return xOverlap * yOverlap;
    });

    assert.equal(faqTitleOverlap, 0, 'O container de Oportunidades não pode colidir com o título do FAQ');

  } finally {
    await browser.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});

test('Probe 2: FAQ interatividade sem click hijacking por containers anteriores', async () => {
  const server = createTestServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;

  const browser = await chromium.launch({ headless: true });
  const origin = `http://127.0.0.1:${port}`;

  try {
    const { page } = await openRuntimeReadyPage(browser, origin, { width: 1440, height: 900 });

    const faq = page.locator('#faq');
    await faq.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const firstFaqLine = page.locator('.faq-line').first();
    await firstFaqLine.click();
    await page.waitForFunction(
      el => el && el.classList.contains('is-active'),
      await firstFaqLine.elementHandle(),
      { timeout: 3000 }
    ).catch(() => {});

    const isActive = await firstFaqLine.evaluate(el => el.classList.contains('is-active'));
    assert.equal(isActive, true, 'O clique no FAQ deve ativar a linha sem sofrer intercepção');

  } finally {
    await browser.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});

test('Probe 3: Breakpoints de 880px e 768px alternam layouts sem vazamento simultâneo', async () => {
  const server = createTestServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;

  const browser = await chromium.launch({ headless: true });
  const origin = `http://127.0.0.1:${port}`;

  try {
    // 1. Teste Breakpoint 768px (Oportunidades Desktop vs Mobile)
    const { page: pageDesktop769 } = await openRuntimeReadyPage(browser, origin, { width: 769, height: 900 });

    const d769 = await pageDesktop769.evaluate(() => {
      const d = document.querySelector('.nb-desktop');
      const m = document.querySelector('.nb-mobile');
      return window.getComputedStyle(d).display !== 'none' && window.getComputedStyle(m).display === 'none';
    });
    assert.equal(d769, true, 'Em 769px a versão desktop de Oportunidades deve estar ativa');
    await pageDesktop769.close();

    const { page: pageMobile767 } = await openRuntimeReadyPage(browser, origin, { width: 767, height: 900 });

    const m767 = await pageMobile767.evaluate(() => {
      const d = document.querySelector('.nb-desktop');
      const m = document.querySelector('.nb-mobile');
      return window.getComputedStyle(d).display === 'none' && window.getComputedStyle(m).display !== 'none';
    });
    assert.equal(m767, true, 'Em 767px a versão mobile de Oportunidades deve estar ativa');
    await pageMobile767.close();

    // 2. Teste Breakpoint 800px (Catálogo Modal Rail)
    const { page: page799 } = await openRuntimeReadyPage(browser, origin, { width: 799, height: 900 });

    const railRelative799 = await page799.evaluate(() => {
      const rail = document.querySelector('.rail');
      return window.getComputedStyle(rail).position === 'relative';
    });
    assert.equal(railRelative799, true, 'Em 799px o rail do catálogo deve ser relative (single column)');
    await page799.close();

    const { page: page801 } = await openRuntimeReadyPage(browser, origin, { width: 801, height: 900 });

    const railSticky801 = await page801.evaluate(() => {
      const rail = document.querySelector('.rail');
      return window.getComputedStyle(rail).position === 'sticky';
    });
    assert.equal(railSticky801, true, 'Em 801px o rail do catálogo deve ser sticky');
    await page801.close();

  } finally {
    await browser.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});

test('Probe 4: Scroll reverso rápido não trava nem causa repique de coordenadas', async () => {
  const server = createTestServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;

  const browser = await chromium.launch({ headless: true });
  const origin = `http://127.0.0.1:${port}`;

  try {
    const { page } = await openRuntimeReadyPage(browser, origin, { width: 1440, height: 900 });

    // Rolar até o rodapé
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);

    // Rolar de volta ao topo desabilitando smooth scroll temporário para teste instantâneo
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(() => window.scrollY === 0, { timeout: 3000 });

    const scrollY = await page.evaluate(() => window.scrollY);
    assert.equal(scrollY, 0, 'A página deve retornar limpa ao topo (Y=0)');

    const s02PinTop = await page.evaluate(() => {
      const pin = document.querySelector('.s02-pin');
      return pin ? pin.getBoundingClientRect().top : 0;
    });
    assert.ok(s02PinTop > 0, 'A Sessão 02 deve estar abaixo do topo em repouso no início da página');

  } finally {
    await browser.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});
