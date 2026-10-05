const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to More Nutrition Tuning Lab on local dev server (port 4002)...');
  await page.goto('http://127.0.0.1:4002/clientes/more-nutrition-tuning-lab/site/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // 1. Verifica presença do Web Component <studio-dna-hud>
  const hudExists = await page.evaluate(() => {
    const el = document.querySelector('studio-dna-hud');
    return el && !!el.shadowRoot;
  });
  console.log('Studio DNA HUD attached with Shadow DOM:', hudExists);

  // 2. Inspeciona a nova lente Presets & Stage Studio
  const lensInfo = await page.evaluate(() => {
    const hud = document.querySelector('studio-dna-hud');
    const sr = hud.shadowRoot;
    const presetSelect = sr.getElementById('dna-select-preset');
    const stageModes = Array.from(sr.querySelectorAll('#dna-stage-mode-seg .dna-seg-btn')).map(b => b.dataset.mode);
    const clayBox = sr.getElementById('dna-clay-controls');
    const safeHeight = sr.getElementById('dna-range-safe-height')?.value;
    const scrub = sr.getElementById('dna-range-scrub')?.value;

    return {
      presetsAvailable: Array.from(presetSelect?.options || []).map(o => o.value),
      stageModes,
      clayControlsVisible: !!clayBox,
      safeHeight,
      scrub
    };
  });
  console.log('Stage & Presets Lens Info:', lensInfo);

  // 3. Testa alternância para o Preset "Modern Clinical Apothecary"
  console.log('Switching preset to "modern-apothecary"...');
  await page.evaluate(() => {
    const hud = document.querySelector('studio-dna-hud');
    const sr = hud.shadowRoot;
    const select = sr.getElementById('dna-select-preset');
    select.value = 'modern-apothecary';
    select.dispatchEvent(new Event('change'));
  });
  await page.waitForTimeout(1000);

  const bodyBgApothecary = await page.evaluate(() => document.body.style.backgroundColor);
  console.log('Body background after Modern Apothecary preset:', bodyBgApothecary);

  // 4. Testa modo Clay 3D Mock com customização de rótulo e cor
  console.log('Switching stage mode to Clay 3D with customized label...');
  await page.evaluate(() => {
    const hud = document.querySelector('studio-dna-hud');
    const sr = hud.shadowRoot;
    const clayBtn = sr.querySelector('#dna-stage-mode-seg [data-mode="clay"]');
    clayBtn.click();

    const labelInput = sr.getElementById('dna-clay-label-text');
    labelInput.value = 'HABIT LAB';
    labelInput.dispatchEvent(new Event('input'));

    const colorInput = sr.getElementById('dna-clay-color-body');
    colorInput.value = '#0D131A';
    colorInput.dispatchEvent(new Event('input'));
  });

  // Rola até a seção de sequência
  await page.evaluate(() => {
    const sec = document.querySelector('#nutrition') || document.querySelector('[data-sequence]');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);

  // Captura Screenshot do Palco e do HUD aberto
  const screenshotPath = path.resolve('scratch/screenshot-stage-presets-live.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log('Live screenshot saved to:', screenshotPath);

  // Copia para os artefatos
  const artifactPath = path.resolve('C:/Users/USER/.gemini/antigravity-ide/brain/c2f44784-b29e-4cdc-8cd3-b7d0f892500c/screenshot-stage-presets-live.png');
  fs.copyFileSync(screenshotPath, artifactPath);
  console.log('Copied to artifact:', artifactPath);

  await browser.close();
  console.log('E2E Verification completed successfully!');
})();
