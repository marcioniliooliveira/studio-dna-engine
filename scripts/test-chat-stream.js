const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  await page.goto('https://useplanes.com/components/chat-orb', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  
  // Click open
  await page.click('button[aria-label="Open chat"]');
  await page.waitForTimeout(1000);
  
  // Click send button
  console.log('Clicking Send message...');
  await page.click('button[aria-label="Send message"]');
  await page.waitForTimeout(3000); // wait for AI response to stream or show
  
  const streamedState = await page.evaluate(() => {
    const el = document.querySelector('div.h-\\[600px\\]');
    return el ? el.outerHTML : 'Not found';
  });
  
  fs.writeFileSync('streamed-chat-dump.html', streamedState);
  console.log('Saved streamed-chat-dump.html');
  await page.screenshot({ path: 'streamed-chat-screenshot.png' });
  
  await browser.close();
})();
