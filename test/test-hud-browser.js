const { chromium } = require('playwright');
const path = require('path');
const assert = require('assert');

(async () => {
  console.log('Launching browser to test Universal HUD on More Nutrition...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const url = 'http://127.0.0.1:4000/clientes/more-nutrition-tuning-lab/site/index.html';
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait for <studio-dna-hud> to be defined and mounted in DOM
  await page.waitForSelector('studio-dna-hud', { state: 'attached', timeout: 10000 });
  console.log('✓ Found <studio-dna-hud> tag in DOM');

  // Verify Shadow Root and interior elements
  const hudInfo = await page.evaluate(() => {
    const hud = document.querySelector('studio-dna-hud');
    if (!hud) return { error: 'No hud tag' };
    const shadow = hud.shadowRoot;
    if (!shadow) return { error: 'No shadow root' };

    const panel = shadow.querySelector('.dna-hud-panel') || shadow.getElementById('dna-tuning-hud');
    const title = shadow.querySelector('.dna-hud-title')?.textContent?.trim();
    const inspectorBtn = shadow.getElementById('dna-inspect-btn');
    const saveBtn = shadow.getElementById('dna-btn-save-disk');
    const colorRows = shadow.querySelectorAll('#dna-lens-colors-content .dna-control-row').length;
    const numberRows = shadow.querySelectorAll('#dna-lens-numbers-content .dna-control-row').length;

    return {
      hasPanel: !!panel,
      title,
      hasInspector: !!inspectorBtn,
      hasSaveBtn: !!saveBtn,
      colorRows,
      numberRows
    };
  });

  console.log('HUD Component State in Shadow DOM:', hudInfo);
  assert.ok(hudInfo.hasPanel, 'Panel must exist inside shadowRoot');
  assert.ok(hudInfo.hasInspector, 'Inspector button must exist in HUD');
  assert.ok(hudInfo.hasSaveBtn, 'Save to disk button must exist in HUD');

  // Capture screenshot of the live page with HUD
  const screenshotPath = path.resolve('clientes/more-nutrition-tuning-lab/screenshot-universal-hud.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`✓ Screenshot saved to ${screenshotPath}`);

  // Test Element Inspector toggle
  const inspectActivated = await page.evaluate(() => {
    const hud = document.querySelector('studio-dna-hud');
    const inspectorBtn = hud.shadowRoot.getElementById('dna-inspect-btn');
    inspectorBtn.click();
    return inspectorBtn.classList.contains('is-active');
  });
  console.log('Element Inspector activated:', inspectActivated);
  assert.equal(inspectActivated, true, 'Inspector should activate when clicked');

  await browser.close();
  console.log('🎉 Browser test passed with 100% success!');
  process.exit(0);
})().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
