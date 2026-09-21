const { chromium } = require('playwright');
const path = require('path');

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const artifactDir = path.resolve('C:/Users/USER/.gemini/antigravity-ide/brain/11c1a93b-5f40-418a-8fd2-eba1437fae43');

  // 1. 21Oaks Hero & Scribble
  await page.goto('http://localhost:4000/copias/21oaks-org/site/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'proof_21oaks_hero.png') });

  // Scroll to scribble section
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'proof_21oaks_scribble.png') });

  // Scroll to dynamic photos
  await page.evaluate(() => window.scrollTo(0, 3200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'proof_21oaks_photos.png') });

  // 2. AIR Center
  await page.goto('http://localhost:4000/copias/aircenter-space/site/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'proof_aircenter_hero.png') });

  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'proof_aircenter_matrix.png') });

  console.log('✅ Screenshots capturadas com sucesso!');
  await browser.close();
}

capture();
