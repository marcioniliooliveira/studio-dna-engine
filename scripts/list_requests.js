const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('request', request => {
    console.log(`[Request] ${request.method()} ${request.url()}`);
  });

  page.on('response', response => {
    console.log(`[Response] ${response.status()} ${response.url()}`);
  });

  try {
    console.log('Navigating to site...');
    await page.goto('https://axisform.aura.build/', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Page loaded.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
