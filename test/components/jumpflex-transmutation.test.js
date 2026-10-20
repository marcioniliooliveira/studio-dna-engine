/**
 * test/components/jumpflex-transmutation.test.js
 * 
 * Teste Independente de Transmutação Determinística: Esqueleto Jumpflex D2C E-commerce
 * Valida que o esqueleto de referência em copias/jumpflex-com é transmutado com precisão mecânica,
 * substituindo marca, links, promo bar, hero e trio de produtos sem regressão de layout.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const cheerio = require('cheerio');
const { chromium } = require('playwright');

const {
  createCompositionSpec,
  runDeterministicTransmutation
} = require('../../src/pipeline/transmuter');

test('Jumpflex Transmutation: executes deterministic slot and brand transmutation', async (t) => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jumpflex-test-'));
  const skeletonPath = path.resolve(__dirname, '../../design-vault/jumpflex-com/skeleton.html');
  assert.ok(fs.existsSync(skeletonPath), 'Esqueleto design-vault/jumpflex-com/skeleton.html deve existir');

  const outputPath = path.join(tmpDir, 'site', 'index.html');

  const brandSpec = {
    brandName: 'AeroBounce Pro',
    clientSlug: 'aerobounce-pro',
    theme: {
      bgBase: '#000000',
      accent: '#FF4500'
    },
    meta: {
      title: 'AeroBounce Pro — Camas Elásticas de Alta Performance',
      description: 'Engenharia de precisão e segurança máxima para recreação e atletas.'
    }
  };

  const contentSlots = {
    PROMO_BAR_TEXT: 'SUPER PROMOÇÃO DE VERÃO: Até 35% OFF em toda a linha!',
    PROMO_BAR_BG: '#e11d48',
    NAV_BRAND: 'AeroBounce Pro',
    NAV_PHONE: '+55 (11) 99999-8888',
    NAV_LINK_1: 'MODELOS',
    NAV_LINK_2: 'UPGRADES',
    NAV_LINK_3: 'SUPORTE',
    NAV_CTA: 'VER CATÁLOGO',
    HERO_TITLE: 'A cama elástica feita para durar gerações',
    HERO_CTA: 'CONHECER PRODUTOS',
    COLLECTION_1_TITLE: 'Linha AeroStart',
    COLLECTION_1_DESC: 'Ideal para crianças pequenas com amortecimento ultra macio.',
    COLLECTION_1_PRICE: 'R$ 1.990',
    COLLECTION_1_CTA: 'Explorar Linha',
    COLLECTION_2_TITLE: 'Linha AeroForce',
    COLLECTION_2_DESC: 'Estrutura reforçada de aço galvanizado para atletas.',
    COLLECTION_2_PRICE: 'R$ 3.490',
    COLLECTION_2_CTA: 'Explorar Linha',
    COLLECTION_3_TITLE: 'Linha AeroTitan',
    COLLECTION_3_DESC: 'A maior cama elástica do mercado com molas de alta impulsão.',
    COLLECTION_3_PRICE: 'R$ 6.990',
    COLLECTION_3_CTA: 'Explorar Linha',
    AUTHORITY_QUOTE: 'A mais segura e durável testada por especialistas independentes',
    REVIEWS_HEADLINE: 'Histórias Reais de Clientes Verificados',
    FOOTER_DESCRIPTION: 'AeroBounce Pro: diversão saudável com segurança intransigente.',
    FOOTER_COPYRIGHT: '© 2026 AeroBounce Pro. Todos os direitos reservados.'
  };

  const compositionSpec = createCompositionSpec({
    refSlug: 'jumpflex-com',
    brandSpec,
    contentSlots
  });

  const res = runDeterministicTransmutation({
    skeletonPath,
    compositionSpec,
    outputPath,
    clientDir: tmpDir
  });

  assert.ok(fs.existsSync(outputPath), 'Arquivo transmutado deve existir');
  assert.ok(res.replacedSlotsCount > 0, 'Deve ter substituído slots na página');

  const outputHtml = fs.readFileSync(outputPath, 'utf8');
  const $ = cheerio.load(outputHtml);

  // 1. Validar Marca e Promo Bar
  assert.equal($('title').text(), 'AeroBounce Pro — Camas Elásticas de Alta Performance');
  assert.ok(outputHtml.includes('SUPER PROMOÇÃO DE VERÃO'));
  assert.ok(outputHtml.includes('AeroBounce Pro'));

  // 2. Validar Hero
  assert.equal($('main h1.brand__heading').text().trim(), 'A cama elástica feita para durar gerações');
  assert.equal($('main > section:first-of-type a.brand__button--primary').text().trim(), 'CONHECER PRODUTOS');

  // 3. Validar Coleções
  assert.ok(outputHtml.includes('Linha AeroStart'));
  assert.ok(outputHtml.includes('Linha AeroForce'));
  assert.ok(outputHtml.includes('Linha AeroTitan'));
  assert.ok(outputHtml.includes('R$ 1.990'));
  assert.ok(outputHtml.includes('R$ 3.490'));
  assert.ok(outputHtml.includes('R$ 6.990'));

  // 4. Validar Renderização no Chromium
  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  t.after(() => fs.rmSync(tmpDir, { recursive: true, force: true }));

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('file:///' + outputPath.replace(/\\/g, '/'));
  await page.waitForTimeout(500);

  const heroVisible = await page.locator('main h1.brand__heading').isVisible();
  assert.ok(heroVisible, 'H1 da Hero transmutada deve estar visível');

  const navBrandVisible = await page.locator('header .brand__logo').first().isVisible();
  assert.ok(navBrandVisible, 'Logo/Marca transmutada na Navbar deve estar visível');
});
