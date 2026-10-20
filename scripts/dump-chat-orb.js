const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  console.log('Navigating...');
  await page.goto('https://useplanes.com/components/chat-orb', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  
  const previewHtml = await page.evaluate(() => {
    // Find all children inside main
    const main = document.querySelector('main');
    if (!main) return 'No main';
    // Let's also look for any fixed or absolute elements on the page (like a chat orb at bottom-right!)
    const allFixedOrAbs = Array.from(document.querySelectorAll('*')).filter(el => {
      const style = window.getComputedStyle(el);
      return style.position === 'fixed' || style.position === 'absolute';
    }).map(el => ({
      tag: el.tagName,
      class: el.className,
      rect: el.getBoundingClientRect(),
      text: el.innerText ? el.innerText.substring(0, 50) : ''
    }));

    return {
      mainHtml: main.innerHTML,
      fixedOrAbs: allFixedOrAbs
    };
  });
  
  fs.writeFileSync('preview-dump.json', JSON.stringify(previewHtml, null, 2));
  console.log('Saved preview-dump.json');
  
  await page.screenshot({ path: 'preview-screenshot.png', fullPage: true });
  console.log('Saved preview-screenshot.png');

  await browser.close();
})();
