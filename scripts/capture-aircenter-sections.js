const { chromium } = require('playwright');
const path = require('path');

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const artifactDir = path.resolve('C:/Users/USER/.gemini/antigravity-ide/brain/11c1a93b-5f40-418a-8fd2-eba1437fae43');

  await page.goto('http://localhost:4000/copias/aircenter-space/site/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Força scroll no body e window
  await page.evaluate(() => {
    document.body.scrollTop = 1200;
    window.scrollTo(0, 1200);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'proof_aircenter_scroll1200.png') });

  // Scroll to mobility / floor plan section
  await page.evaluate(() => {
    document.body.scrollTop = 3200;
    window.scrollTo(0, 3200);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'proof_aircenter_scroll3200.png') });

  console.log('✅ Screenshots capturadas!');
  await browser.close();
}

capture();
