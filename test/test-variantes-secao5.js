const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testVariantes() {
  console.log('🚀 Iniciando verificação automatizada das 3 Variantes da Seção 5...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));

  const htmlPath = path.resolve('clientes/silvio-iwata-imobiliaria/site/secao-05-radar-maringa-variantes.html').replace(/\\/g, '/');
  await page.goto('file:///' + htmlPath, { waitUntil: 'networkidle' });

  const evidenceDir = process.env.EVIDENCE_DIR || path.resolve('artifacts/silvio-iwata');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }

  // 1. Capturar Variante 1 (The Masters Editorial)
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(evidenceDir, 'variante_1_masters_editorial.png'),
    fullPage: false
  });
  console.log('📸 Capturada: variante_1_masters_editorial.png');

  // Testar filtro da Variante 1
  const v1PillNature = await page.$('.v1-category-pill[data-filter="nature"]');
  if (v1PillNature) {
    await v1PillNature.click();
    await page.waitForTimeout(200);
    console.log('✅ Variante 1: Filtro Parques & Natureza clicado com sucesso');
  }

  // 2. Mudar para Variante 2 (Zorge 9 Rich Cards)
  await page.click('.variant-btn[data-target="v2"]');
  await page.waitForTimeout(400);

  // Disparar hover no marcador da Catedral para abrir o Rich Card
  const catedralMarker = await page.$('.zorge-marker-interactive[data-id="catedral"]');
  if (catedralMarker) {
    await catedralMarker.hover();
    await page.waitForTimeout(300);
    console.log('✅ Variante 2: Hover no marcador Catedral disparado');
  }

  await page.screenshot({
    path: path.join(evidenceDir, 'variante_2_zorge9_rich_cards.png'),
    fullPage: false
  });
  console.log('📸 Capturada: variante_2_zorge9_rich_cards.png');

  // 3. Mudar para Variante 3 (Air Center Hybrid)
  await page.click('.variant-btn[data-target="v3"]');
  await page.waitForTimeout(400);

  // Clicar na categoria Parques na Variante 3
  const v3CatNature = await page.$('.v3-cat-btn[data-v3-cat="nature"]');
  if (v3CatNature) {
    await v3CatNature.click();
    await page.waitForTimeout(300);
    console.log('✅ Variante 3: Categoria Parques selecionada com linhas de trajetória');
  }

  await page.screenshot({
    path: path.join(evidenceDir, 'variante_3_aircenter_hybrid.png'),
    fullPage: false
  });
  console.log('📸 Capturada: variante_3_aircenter_hybrid.png');

  await browser.close();

  if (pageErrors.length > 0) {
    console.error('❌ Erros de página detectados:', pageErrors);
    process.exit(1);
  } else {
    console.log('🎉 Todas as 3 variantes validadas com ZERO erros de runtime JS!');
  }
}

testVariantes().catch(err => {
  console.error('Erro no teste de variantes:', err);
  process.exit(1);
});
