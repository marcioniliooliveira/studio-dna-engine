const { chromium } = require('playwright');
const path = require('path');

async function runTest() {
  console.log('Launching Chromium...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleLogs = [];
  const errors = [];
  const failedRequests = [];

  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', err => {
    errors.push(err.message + '\n' + (err.stack || ''));
    console.error('*** PAGE ERROR DETECTED ***:', err.message, err.stack);
  });

  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  page.on('response', res => {
    if (res.status() >= 400) {
      failedRequests.push({ url: res.url(), status: res.status() });
    }
  });

  const testUrl = 'http://localhost:4000/clientes/opxy-tuning-lab/site/index.html';
  console.log('Navigating to', testUrl);

  try {
    await page.goto(testUrl, { waitUntil: 'networkidle', timeout: 20000 });
  } catch (e) {
    console.log('Navigation message:', e.message);
  }

  // Wait for 3D model assembly film to finish
  console.log('Waiting for model assembly and render...');
  await page.waitForTimeout(5000);

  // Check state of OPXY
  await page.evaluate(() => {
    if (window.OPXY && window.OPXY.skipFilm) {
      window.OPXY.skipFilm();
    }
  });
  await page.waitForTimeout(1000);

  const opxyState = await page.evaluate(() => {
    return {
      hasOPXY: !!window.OPXY,
      ready: window.OPXY?.ready,
      filmDone: window.OPXY?.film?.done,
      keysCount: window.OPXY?.keys?.length,
      currentBeat: window.OPXY_PAGE?.beat,
      lenisReady: !!window.lenis
    };
  });
  console.log('OPXY State in Page:', opxyState);

  // Take screenshot 1: Hero
  const heroShot = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'screenshot-01-hero.png');
  await page.screenshot({ path: heroShot });
  console.log('Saved Hero screenshot to:', heroShot);

  // Scroll to #strip
  console.log('Scrolling to #strip...');
  await page.evaluate(() => {
    const strip = document.getElementById('strip');
    if (strip) {
      const targetY = strip.offsetTop + (strip.offsetHeight - window.innerHeight) * 0.85;
      if (window.lenis) {
        window.lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }
    }
  });

  await page.waitForTimeout(2000);

  // Take screenshot 2: Strip (Perform)
  const stripShot = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'screenshot-02-strip.png');
  await page.screenshot({ path: stripShot });
  console.log('Saved Strip screenshot to:', stripShot);

  // Open HUD and switch to Preset: Berlin Dark Steel
  console.log('Testing HUD and Presets...');
  await page.evaluate(() => {
    const toggle = document.getElementById('dna-hud-toggle');
    if (toggle) toggle.click();
  });
  await page.waitForTimeout(600);

  // Click Berlin Preset
  await page.evaluate(() => {
    const berlinCard = document.querySelector('[data-preset="berlin"]');
    if (berlinCard) berlinCard.click();
  });
  await page.waitForTimeout(1000);

  // Take screenshot 3: Berlin Preset Applied
  const berlinShot = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'screenshot-03-berlin-hud.png');
  await page.screenshot({ path: berlinShot });
  console.log('Saved Berlin HUD screenshot to:', berlinShot);

  console.log('\n--- Console Logs (' + consoleLogs.length + ') ---');
  consoleLogs.filter(c => c.type === 'error' || c.type === 'warning').forEach(c => console.log(`[${c.type}] ${c.text}`));

  console.log('\n--- Page Errors (' + errors.length + ') ---');
  errors.forEach(e => console.error(e));

  console.log('\n--- Failed Requests (' + failedRequests.length + ') ---');
  failedRequests.forEach(f => console.log(f));

  await browser.close();
  console.log('Verification run complete!');
}

runTest().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
