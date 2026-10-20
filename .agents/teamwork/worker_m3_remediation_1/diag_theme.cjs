const { chromium } = require('@playwright/test');
const http = require('http');
const fs = require('fs');
const path = require('path');

const siteDir = path.resolve('clientes/marcionilio-oliveira/site');
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
};

(async () => {
  const server = http.createServer((req, res) => {
    let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
    if (cleanPath === '/' || cleanPath === '') cleanPath = '/index.html';
    let filePath = path.join(siteDir, cleanPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const fallbackAsset = path.join(siteDir, 'assets', cleanPath);
      if (fs.existsSync(fallbackAsset) && fs.statSync(fallbackAsset).isFile()) filePath = fallbackAsset;
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const url = 'http://127.0.0.1:' + server.address().port;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(url + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof window.__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function');
  await page.evaluate(() => window.__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0));
  await page.waitForFunction(() => window.__WORK_STAGE__?.phase === 'RIBBON_BROWSE');

  const proxy0 = page.locator('[data-work-card-proxy="0"]');
  await proxy0.waitFor({ state: 'attached' });
  await proxy0.dispatchEvent('click');

  await page.waitForFunction(() => window.__WORK_STAGE__?.phase === 'DETAIL_ACTIVE');

  const panelCheck = await page.evaluate(() => {
    const el = document.querySelector('[data-work-detail-panel]');
    return el ? {
      tag: el.tagName,
      bg: el.getAttribute('data-header-bg'),
      text: el.getAttribute('data-header-text'),
      border: el.getAttribute('data-header-border'),
      ariaHidden: el.getAttribute('aria-hidden'),
      parent: el.parentElement?.id || el.parentElement?.tagName,
      compOpacity: window.getComputedStyle(el).opacity,
      compPointerEvents: window.getComputedStyle(el).pointerEvents,
      compZIndex: window.getComputedStyle(el).zIndex,
    } : null;
  });

  console.log('PANEL CHECK:', panelCheck);

  await browser.close();
  server.close();
})();
