const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://aircenter.space/', { waitUntil: 'domcontentloaded' });
    
    const locations = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('script[type="text/template"]')).map(s => {
        return {
          id: s.id,
          parentTag: s.parentElement ? s.parentElement.tagName : 'NONE',
          parentClass: s.parentElement ? s.parentElement.className : '',
          parentId: s.parentElement ? s.parentElement.id : ''
        };
      });
    });
    
    console.log('Template Locations:', locations);
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();
