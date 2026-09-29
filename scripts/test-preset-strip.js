const { chromium } = require('playwright');
const path = require('path');

async function testRecordColor() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:4000/clientes/opxy-tuning-lab/site/index.html');
  await page.waitForTimeout(3000);

  // Skip film and scroll to strip
  await page.evaluate(() => {
    if (window.OPXY && window.OPXY.skipFilm) window.OPXY.skipFilm();
    const strip = document.getElementById('strip');
    const targetY = strip.offsetTop + (strip.offsetHeight - window.innerHeight) * 0.85;
    window.lenis.scrollTo(targetY, { immediate: true });
  });

  await page.waitForTimeout(1000);

  // Click Berlin Preset
  await page.evaluate(() => {
    const toggle = document.getElementById('dna-hud-toggle');
    if (toggle) toggle.click();
  });
  await page.waitForTimeout(400);

  await page.evaluate(() => {
    const berlinCard = document.querySelector('[data-preset="berlin"]');
    if (berlinCard) berlinCard.click();
  });
  await page.waitForTimeout(1000);

  const berlinStripShot = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'screenshot-04-berlin-strip.png');
  await page.screenshot({ path: berlinStripShot });
  console.log('Saved Berlin Strip screenshot to:', berlinStripShot);

  // Click Tokyo Preset
  await page.evaluate(() => {
    const tokyoCard = document.querySelector('[data-preset="tokyo"]');
    if (tokyoCard) tokyoCard.click();
  });
  await page.waitForTimeout(1000);

  const tokyoStripShot = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'screenshot-05-tokyo-strip.png');
  await page.screenshot({ path: tokyoStripShot });
  console.log('Saved Tokyo Strip screenshot to:', tokyoStripShot);

  await browser.close();
}

testRecordColor();
