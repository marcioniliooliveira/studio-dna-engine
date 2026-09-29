const { chromium } = require('playwright');
const path = require('path');

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const artifactDir = path.resolve('C:/Users/USER/.gemini/antigravity-ide/brain/11c1a93b-5f40-418a-8fd2-eba1437fae43');

  // 1. 21Oaks
  await page.goto('http://localhost:4000/copias/21oaks-org/site/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Section 5100 (Made for everyday living)
  await page.evaluate(() => window.scrollTo(0, 5100));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, 'proof_21oaks_everyday.png') });

  // Section 7400 (Apartments)
  await page.evaluate(() => window.scrollTo(0, 7400));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, 'proof_21oaks_apartments.png') });

  // Section 9350 (Everything you need)
  await page.evaluate(() => window.scrollTo(0, 9350));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, 'proof_21oaks_reach.png') });

  // 2. AIR Center
  await page.goto('http://localhost:4000/copias/aircenter-space/site/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // AIR Center Section 2 - Architecture / Location
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, 'proof_aircenter_section2.png') });

  // AIR Center Mobility Time Matrix
  await page.evaluate(() => window.scrollTo(0, 2200));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, 'proof_aircenter_matrix.png') });

  console.log('✅ Novas screenshots detalhadas capturadas!');
  await browser.close();
}

capture();
