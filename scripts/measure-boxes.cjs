const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

(async () => {
  const server = http.createServer((req, res) => {
    let cleanPath = decodeURIComponent(req.url.split('?')[0]);
    if (cleanPath === '/' || cleanPath === '') cleanPath = '/index.html';
    let filePath = path.join('clientes/marcionilio-oliveira/site', cleanPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const fb = path.join('clientes/marcionilio-oliveira/site/assets', cleanPath);
      if (fs.existsSync(fb) && fs.statSync(fb).isFile()) filePath = fb;
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.writeHead(200);
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  server.listen(0, '127.0.0.1', async () => {
    const port = server.address().port;
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://127.0.0.1:' + port + '/');
    await page.waitForFunction(() => typeof window.__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function');
    await page.evaluate(() => window.__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0));
    await page.waitForTimeout(500);

    const info = await page.evaluate(() => {
      const rectEl = document.querySelector('[data-more-work-rect]');
      const rectBox = rectEl ? rectEl.getBoundingClientRect() : null;
      const mount = document.getElementById('jesper-work-stage-mount')?.getBoundingClientRect();
      const pContainer = document.querySelector('[data-work-ribbon-proxies]')?.getBoundingClientRect();
      const p0 = document.querySelector('[data-work-card-proxy="0"]')?.getBoundingClientRect();
      const p1 = document.querySelector('[data-work-card-proxy="1"]')?.getBoundingClientRect();
      const p2 = document.querySelector('[data-work-card-proxy="2"]')?.getBoundingClientRect();
      const p3 = document.querySelector('[data-work-card-proxy="3"]')?.getBoundingClientRect();
      return { rectBox, mount, pContainer, p0, p1, p2, p3 };
    });
    console.log('BOX INFO:', JSON.stringify(info, null, 2));
    await browser.close();
    server.close();
    process.exit(0);
  });
})();
