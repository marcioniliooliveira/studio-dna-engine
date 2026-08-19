const { chromium } = require('playwright');
const path = require('path');

const targetFile = process.argv[2] || 'axisform-aura-build.html';
const targetUrl = targetFile.startsWith('http') ? targetFile : `http://localhost:8080/copias/${targetFile}`;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[Console ${msg.type()}] ${msg.text()}`);
  });

  page.on('requestfailed', request => {
    console.log(`[Request Failed] ${request.url()} - ${request.failure()?.errorText || 'Unknown error'}`);
  });

  page.on('pageerror', err => {
    console.log(`[Page Error] ${err.toString()}`);
  });

  try {
    console.log(`Opening local clone: ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 15000 });
    console.log('Page loaded.');
  } catch (err) {
    console.error('Error during navigation:', err.message);
  } finally {
    await browser.close();
  }
})();
