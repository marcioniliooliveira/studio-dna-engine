const { chromium } = require('playwright');

async function testPage() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const consoleLogs = [];
  const errors = [];
  const failedRequests = [];

  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', err => {
    errors.push(err.message + '\n' + (err.stack || ''));
  });

  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  page.on('response', res => {
    if (res.status() >= 400) {
      failedRequests.push({ url: res.url(), status: res.status() });
    }
  });

  console.log('Navigating to http://localhost:4000/op-xy-76-aura-build/site/index.html ...');
  try {
    await page.goto('http://localhost:4000/op-xy-76-aura-build/site/index.html', { waitUntil: 'networkidle', timeout: 15000 });
  } catch (e) {
    console.log('Navigation warning:', e.message);
  }

  await page.waitForTimeout(4000);

  // Take a screenshot to inspect
  await page.screenshot({ path: 'copias/op-xy-76-aura-build/site-render-test.png', fullPage: false });

  console.log('\n--- Console Logs (' + consoleLogs.length + ') ---');
  consoleLogs.forEach(c => console.log(`[${c.type}] ${c.text}`));

  console.log('\n--- Page Errors (' + errors.length + ') ---');
  errors.forEach(e => console.error(e));

  console.log('\n--- Failed/4xx/5xx Requests (' + failedRequests.length + ') ---');
  failedRequests.forEach(f => console.log(f));

  // Check canvas state
  const canvasInfo = await page.evaluate(() => {
    const cv = document.getElementById('cv');
    if (!cv) return { found: false };
    return {
      found: true,
      width: cv.width,
      height: cv.height,
      style: cv.getAttribute('style'),
      gl: !!cv.getContext('webgl2') || !!cv.getContext('webgl')
    };
  });
  console.log('\n--- Canvas Info ---', canvasInfo);

  // Check if OPXY global object exists
  const opxyInfo = await page.evaluate(() => {
    return {
      hasOPXY: typeof window.OPXY !== 'undefined',
      keys: window.OPXY ? Object.keys(window.OPXY) : []
    };
  });
  console.log('\n--- OPXY Info ---', opxyInfo);

  await browser.close();
}

testPage().catch(console.error);
