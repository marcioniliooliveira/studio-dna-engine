const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  const htmlPath = path.resolve('clientes/silvio-iwata-imobiliaria/site/index.html').replace(/\\/g, '/');
  await page.goto('file:///' + htmlPath, { waitUntil: 'networkidle' });

  const evidenceDir = 'C:/Users/wd/.gemini/antigravity/brain/f07ae635-850a-468e-a0e9-f8287ffa5082';

  // 1. Capture Hero Section
  const heroEl = await page.$('.hero-section');
  await heroEl.screenshot({ path: path.join(evidenceDir, 'evidence_hero_clean.png') });
  console.log('📸 Captured evidence_hero_clean.png');

  // 2. Open Drawer and capture
  await page.click('#btn-toggle-drawer');
  await page.waitForTimeout(500);
  const drawerEl = await page.$('#mega-drawer');
  await drawerEl.screenshot({ path: path.join(evidenceDir, 'evidence_drawer_clean.png') });
  console.log('📸 Captured evidence_drawer_clean.png');

  // Close drawer
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // 3. Capture Section 3 (Palco Flagship)
  const stageEl = await page.$('#flagships');
  await stageEl.screenshot({ path: path.join(evidenceDir, 'evidence_stage_clean.png') });
  console.log('📸 Captured evidence_stage_clean.png');

  // 4. Capture Section 4 (Catálogo)
  const catalogEl = await page.$('#catalogo');
  await catalogEl.screenshot({ path: path.join(evidenceDir, 'evidence_catalog_clean.png') });
  console.log('📸 Captured evidence_catalog_clean.png');

  await browser.close();
  console.log('✅ All visual evidence screenshots captured successfully!');
}

main().catch(console.error);
