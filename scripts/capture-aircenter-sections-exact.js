const { chromium } = require('playwright');
const path = require('path');

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const artifactDir = path.resolve('C:/Users/USER/.gemini/antigravity-ide/brain/11c1a93b-5f40-418a-8fd2-eba1437fae43');

  await page.goto('http://localhost:4000/copias/aircenter-space/site/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // 1. About section (offsetTop 2800)
  await page.evaluate(() => window.scrollTo(0, 2800));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, 'proof_aircenter_about.png') });

  // 2. Location & Mobility Matrix (offsetTop 5500)
  await page.evaluate(() => window.scrollTo(0, 5500));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, 'proof_aircenter_location.png') });

  // 3. Architecture section (offsetTop 8200)
  await page.evaluate(() => window.scrollTo(0, 8200));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, 'proof_aircenter_architecture.png') });

  console.log('✅ Screenshots de todas as seções do AIR Center capturadas com sucesso!');
  await browser.close();
}

capture();
