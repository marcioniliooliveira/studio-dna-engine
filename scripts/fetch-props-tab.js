const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to fetch Props tab...');
  await page.goto('https://useplanes.com/components/chat-orb', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  // Click on Props tab
  const propsTab = await page.$('button[role="tab"]:has-text("Props")');
  if (propsTab) {
    await propsTab.click();
    await page.waitForTimeout(1000);
    const propsHtml = await page.evaluate(() => {
      const panel = document.querySelector('[role="tabpanel"]') || document.querySelector('#usage');
      return panel ? panel.outerHTML : 'Panel not found';
    });
    fs.writeFileSync('props-tab-dump.html', propsHtml);
    console.log('Saved props-tab-dump.html');
  } else {
    console.log('Props tab not found');
  }

  // Also capture the whole page DOM when fully hydrated and alive!
  const fullHydratedHtml = await page.evaluate(() => {
    return {
      title: document.title,
      html: document.documentElement.outerHTML
    };
  });
  fs.writeFileSync('live-full-page-hydrated.html', fullHydratedHtml.html);
  console.log('Saved live-full-page-hydrated.html (size: ' + fullHydratedHtml.html.length + ')');

  await browser.close();
})();
