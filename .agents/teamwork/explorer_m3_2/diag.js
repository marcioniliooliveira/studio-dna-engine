const { chromium } = require('@playwright/test');
const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

(async () => {
  const siteDir = path.resolve('clientes/marcionilio-oliveira/site');
  const server = http.createServer((req, res) => {
    let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
    if (cleanPath === '/' || cleanPath === '') cleanPath = '/index.html';
    let filePath = path.join(siteDir, cleanPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const fallbackAsset = path.join(siteDir, 'assets', cleanPath);
      if (fs.existsSync(fallbackAsset) && fs.statSync(fallbackAsset).isFile()) {
        filePath = fallbackAsset;
      }
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

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(`${url}/`, { waitUntil: 'domcontentloaded' });

  // Move #work-detail-panel-root directly to document.body before scroll / test to simulate proper portaling
  await page.evaluate(() => {
    const el = document.getElementById('work-detail-panel-root');
    if (el) {
      document.body.appendChild(el);
    }
  });

  await page.waitForFunction(() => typeof window.__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function');
  await page.evaluate(() => window.__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0));
  await page.waitForFunction(() => window.__WORK_STAGE__?.phase === 'RIBBON_BROWSE');

  console.log('Clicking proxy 0...');
  await page.locator('[data-work-card-proxy="0"]').click();

  console.log('Waiting for DETAIL_ACTIVE and header theme...');
  await page.waitForFunction(() => window.__WORK_STAGE__?.phase === 'DETAIL_ACTIVE');

  // Wait for header theme
  const passed = await page.waitForFunction(() => {
    const header = document.querySelector('header[data-intro-header]');
    if (!header) return false;
    const bg = header.style.getPropertyValue('--header-bg').toLowerCase().trim();
    const text = header.style.getPropertyValue('--header-text').toLowerCase().trim();
    const border = header.style.getPropertyValue('--header-border').toLowerCase().trim();

    const bgMatch = bg === '#faf9f6' || bg === 'rgb(250, 249, 246)';
    const textMatch = text === '#2e2b28' || text === 'rgb(46, 43, 40)';
    const borderMatch = border === '#b8b3ac' || border === 'rgb(184, 179, 172)';

    return bgMatch && textMatch && borderMatch;
  }, { timeout: 8000 }).then(() => true).catch(e => e.message);

  const headerTheme = await page.evaluate(() => {
    const header = document.querySelector('header[data-intro-header]');
    const panel = document.querySelector('[data-work-detail-panel]');
    return {
      bg: header?.style.getPropertyValue('--header-bg'),
      text: header?.style.getPropertyValue('--header-text'),
      border: header?.style.getPropertyValue('--header-border'),
      panelRect: panel?.getBoundingClientRect(),
    };
  });

  console.log('Passed:', passed);
  console.log('Header theme:', JSON.stringify(headerTheme, null, 2));

  await browser.close();
  server.close();
})();
