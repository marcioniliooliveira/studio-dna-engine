const { chromium } = require('playwright');
const readline = require('readline');

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('Navigating to site...');
    await page.goto('https://aircenter.space/', { waitUntil: 'networkidle', timeout: 30000 });


    const iframes = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('iframe')).map(iframe => {
        const rect = iframe.getBoundingClientRect();
        return {
          id: iframe.id,
          className: iframe.className,
          src: iframe.src,
          width: rect.width,
          height: rect.height,
          outerHTML: iframe.outerHTML.slice(0, 300)
        };
      });
    });

    console.log('Detected Iframes:', iframes);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
