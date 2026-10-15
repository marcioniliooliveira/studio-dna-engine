const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const path = require('node:path');
const fs = require('node:fs');

const HTML_PATH = path.resolve('clientes/silvio-iwata-imobiliaria/site/index.html').replace(/\\/g, '/');

test.describe('Silvio Iwata Imobiliária · Suite de Conformidade Visual & Arquitetura (TDD)', () => {
  let browser;
  let page;

  test.before(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('file:///' + HTML_PATH, { waitUntil: 'networkidle' });
  });

  test.after(async () => {
    if (browser) await browser.close();
  });

  test('🔴 RED TEST 1: Palco Flagship (Seção 3) deve usar foto arquitetônica limpa (palco-lithos-clean.jpg), sem UI dupla', async () => {
    const mainImgSrc = await page.$eval('#main-building-img', el => el.getAttribute('src'));
    assert.match(mainImgSrc, /palco-lithos-clean\.jpg/, 
      `Erro: #main-building-img ainda aponta para "${mainImgSrc}". Deve apontar para assets/palco-lithos-clean.jpg para evitar duplicidade de painel verde.`);
  });

  test('🔴 RED TEST 2: Catálogo (Seção 4) deve conter fotos individuais por imóvel, não mockup composto', async () => {
    const cardImgSrcs = await page.$$eval('.catalog-grid .card-photo', els => els.map(el => el.getAttribute('src')));
    assert.strictEqual(cardImgSrcs.length, 6, 'Devem existir 6 cards no catálogo');
    
    // Nenhuma imagem de card pode ser catalogo-vitrine.jpg (que é o comp de 6 cards)
    for (const src of cardImgSrcs) {
      assert.doesNotMatch(src, /catalogo-vitrine\.jpg/, 
        `Erro: card com src="${src}" está usando comp com 6 mini-cards embutidos! Deve usar foto individual.`);
    }

    // Cada card deve ter sua foto individual
    const uniqueSrcs = new Set(cardImgSrcs);
    assert.ok(uniqueSrcs.size >= 4, `Devem existir pelo menos 4 fotos únicas entre os 6 cards, encontrados: ${uniqueSrcs.size}`);
  });

  test('🔴 RED TEST 3: Hero (Seção 2) deve usar fundo fotográfico puro (hero-maringa-clean.jpg)', async () => {
    const heroBg = await page.$eval('.hero-section', el => getComputedStyle(el).backgroundImage);
    assert.match(heroBg, /hero-maringa-clean\.jpg/, 
      `Erro: hero background é "${heroBg}". Deve usar hero-maringa-clean.jpg para evitar tipografia e cápsulas fantasmas sobrepostas.`);
  });

  test('🟢 TEST 4: Seção 3 Palco Flagship deve ter layout split 50/50 rigoroso com CTA e dados alinhados', async () => {
    const stageContainer = await page.$('.flagship-stage');
    assert.ok(stageContainer, 'Container .flagship-stage deve existir');

    const displayGrid = await page.$eval('.flagship-stage', el => {
      const style = getComputedStyle(el);
      return style.display === 'grid' || style.display === 'flex';
    });
    assert.ok(displayGrid, 'Stage container deve ser grid ou flex');

    // Título monumental L I T H O S presente
    const titleText = await page.$eval('.stage-building-name', el => el.textContent.trim());
    assert.match(titleText, /L\s*I\s*T\s*H\s*O\s*S/i, 'Título Lithos deve estar presente');

    // Pills 01 e 02 presentes no topo direito
    const pills = await page.$$eval('.stage-nav-pill', els => els.map(e => e.textContent.trim()));
    assert.ok(pills.length >= 2, 'Pills 01 LITHOS e 02 LA VIE CONCEPT devem existir no topo');

    // Linha inferior: dados e CTA devem estar no mesmo container horizontal
    const footerLayout = await page.$eval('.stage-specs-cta-row', el => {
      const style = getComputedStyle(el);
      return {
        display: style.display,
        justifyContent: style.justifyContent,
        alignItems: style.alignItems
      };
    });
    assert.match(footerLayout.display, /flex|grid/, 'Barra inferior de dados e CTA deve ser flex ou grid');
  });

  test('🔴 RED TEST 5: Cápsula de Filtro Azimute (Seção 4) deve ter toggles e dropdown funcionais', async () => {
    const btnTipologia = await page.$('#btn-tipologia');
    const menuTipologia = await page.$('#menu-tipologia');
    assert.ok(btnTipologia, 'Botão #btn-tipologia deve existir');
    assert.ok(menuTipologia, 'Menu #menu-tipologia deve existir');

    // Testar toggle de dropdown
    const isInitiallyActive = await menuTipologia.evaluate(el => el.classList.contains('is-active'));
    assert.strictEqual(isInitiallyActive, false, 'Menu tipologia deve iniciar fechado');

    await btnTipologia.click();
    const isOpenedAfterClick = await menuTipologia.evaluate(el => el.classList.contains('is-active'));
    assert.strictEqual(isOpenedAfterClick, true, 'Menu tipologia deve abrir no clique');
  });

  test('🔴 RED TEST 6: Header Flutuante + Mega Drawer funcional (Seção 1)', async () => {
    const header = await page.$('.site-header');
    assert.ok(header, 'Header fixo deve existir');

    const btnDrawer = await page.$('#btn-toggle-drawer');
    const drawer = await page.$('#mega-drawer');
    assert.ok(btnDrawer, 'Botão #btn-toggle-drawer deve existir');
    assert.ok(drawer, 'Drawer #mega-drawer deve existir');

    const isDrawerOpenInit = await drawer.evaluate(el => el.classList.contains('is-open'));
    assert.strictEqual(isDrawerOpenInit, false, 'Drawer deve iniciar fechado');

    await btnDrawer.click();
    const isDrawerOpenAfterClick = await drawer.evaluate(el => el.classList.contains('is-open'));
    assert.strictEqual(isDrawerOpenAfterClick, true, 'Drawer deve abrir ao clicar');

    // Fechar com ESC
    await page.keyboard.press('Escape');
    const isDrawerClosedAfterEsc = await drawer.evaluate(el => el.classList.contains('is-open'));
    assert.strictEqual(isDrawerClosedAfterEsc, false, 'Drawer deve fechar ao pressionar ESC');
  });
});
