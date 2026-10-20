const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

http.get('http://localhost:4000/clientes/opxy-tuning-lab/site/index.html', res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', async () => {
    console.log('Fetched body length from server:', body.length);
    fs.writeFileSync('scripts/server-served.html', body);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
    page.on('pageerror', err => console.error('BROWSER ERROR:', err.message, err.stack));

    await page.setContent(body);
    await page.waitForTimeout(1000);
    await browser.close();
  });
});
