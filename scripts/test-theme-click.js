const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const filePath = 'file:///' + path.resolve('copias/useplanes-com/site/index.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'load' });
  
  console.log('Class before:', await page.evaluate(() => document.documentElement.className));
  
  const btn = await page.$('#theme-toggle-btn');
  console.log('Button exists:', !!btn);
  if (btn) {
    await btn.click({ force: true });
    await page.waitForTimeout(200);
    console.log('Class after click 1:', await page.evaluate(() => document.documentElement.className));
    await btn.click({ force: true });
    await page.waitForTimeout(200);
    console.log('Class after click 2:', await page.evaluate(() => document.documentElement.className));
  }
  await browser.close();
})();
