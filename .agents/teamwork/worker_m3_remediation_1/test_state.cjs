const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', m => console.log(m.text()));
  await page.setContent('<!DOCTYPE html><html><body><script type="module">console.log("STATE:" + document.readyState);</script></body></html>');
  await browser.close();
})();
