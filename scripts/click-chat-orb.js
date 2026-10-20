const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  await page.goto('https://useplanes.com/components/chat-orb', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  
  // Find open chat button
  const chatBtn = await page.$('button[aria-label="Open chat"]');
  console.log('Found open chat button:', !!chatBtn);
  
  if (chatBtn) {
    console.log('Clicking Open chat...');
    await chatBtn.click();
    await page.waitForTimeout(1500); // wait for morph transition
    
    // Dump state after opening
    const openedState = await page.evaluate(() => {
      const el = document.querySelector('div.h-\\[600px\\]') || document.querySelector('main');
      return el ? el.outerHTML : 'Not found';
    });
    
    fs.writeFileSync('opened-chat-dump.html', openedState);
    console.log('Saved opened-chat-dump.html');
    
    await page.screenshot({ path: 'opened-chat-screenshot.png' });
    console.log('Saved opened-chat-screenshot.png');
  }
  
  await browser.close();
})();
