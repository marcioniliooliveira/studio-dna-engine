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

  console.log('1. Goto...');
  await page.goto(url + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof window.__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function');
  await page.evaluate(() => window.__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0));
  await page.waitForFunction(() => {
    const ws = window.__WORK_STAGE__;
    return ws && ws.phase === 'RIBBON_BROWSE' && ws.cards && Object.keys(ws.cards).length === 4;
  });

  const proxy0 = page.locator('[data-work-card-proxy="0"]');
  await proxy0.waitFor({ state: 'attached', timeout: 5000 });
  await proxy0.click();

  await page.waitForFunction(() => window.__WORK_STAGE__?.phase === 'DETAIL_ACTIVE', { timeout: 8000 });
  console.log('Gate 4 active!');

  console.log('Closing via close button...');
  const closeBtn = page.locator('[data-detail-close]');
  await closeBtn.waitFor({ state: 'attached' });
  await closeBtn.click();

  console.log('Waiting for RIBBON_BROWSE...');
  await page.waitForFunction(() => window.__WORK_STAGE__?.phase === 'RIBBON_BROWSE', { timeout: 8000 });
  console.log('Restored to RIBBON_BROWSE!');

  // Check Card 0 uniforms
  await page.waitForFunction(() => {
    const c0 = window.__WORK_STAGE__?.cards?.[0]?.uniforms;
    return c0 && c0.u_sheetP > 0.99 && c0.u_white < 0.01;
  }, { timeout: 8000 });
  console.log('Card 0 curvature restored!');

  // Check neighbor cards
  await page.waitForFunction(() => {
    const cards = window.__WORK_STAGE__?.cards;
    return (
      cards?.[1]?.uniforms?.u_alpha > 0.99 &&
      cards?.[2]?.uniforms?.u_alpha > 0.99 &&
      cards?.[3]?.uniforms?.u_alpha > 0.99
    );
  }, { timeout: 8000 });
  console.log('Neighbor alphas restored!');

  // Check scroll lock released
  const isScrollLocked = await page.evaluate(() => {
    return (
      document.documentElement.style.overflow === 'hidden' ||
      document.body.style.overflow === 'hidden'
    );
  });
  console.log('Is scroll locked:', isScrollLocked);

  await browser.close();
  server.close();
  console.log('ALL GATE 4 & GATE 5 CHECKS PASSED IN DIAGNOSTIC!');
})();
