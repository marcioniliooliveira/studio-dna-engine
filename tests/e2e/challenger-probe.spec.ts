import { test } from '@playwright/test';
import http from 'http';
import fs from 'fs';
import path from 'path';

const siteDir = path.resolve('clientes/marcionilio-oliveira/site');
const MIME_TYPES: Record<string, string> = {
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

let server: http.Server;
let baseUrl: string;

test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
    if (cleanPath === '/' || cleanPath === '') cleanPath = '/index.html';
    let filePath = path.join(siteDir, cleanPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const fallbackAsset = path.join(siteDir, 'assets', cleanPath);
      if (fs.existsSync(fallbackAsset) && fs.statSync(fallbackAsset).isFile()) filePath = fallbackAsset;
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const stat = fs.statSync(filePath);
      res.writeHead(200, { 'Content-Length': stat.size, 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address() as any;
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

test.afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

test('Continuous state probe every 500ms', async ({ page }) => {
  test.setTimeout(90000);

  page.on('console', (msg) => console.log('LOG:', msg.type(), msg.text()));
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

  console.log('--- GOTO START ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
  console.log('--- GOTO END ---');

  for (let i = 0; i < 20; i++) {
    const hasHelper = await page.evaluate(() => typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function');
    const ws = await page.evaluate(() => {
      const w = (window as any).__WORK_STAGE__;
      return w ? { phase: w.phase, pp: w.portalProgress, cardsCount: Object.keys(w.cards || {}).length, webglReady: w.webglReady } : null;
    });
    console.log(`[Before scroll ${i*500}ms] helper=${hasHelper}`, ws);
    if (hasHelper && ws?.cardsCount === 4) break;
    await page.waitForTimeout(500);
  }

  console.log('--- CALLING __TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0) ---');
  await page.evaluate(() => {
    (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
  });

  for (let i = 0; i < 30; i++) {
    const ws = await page.evaluate(() => {
      const w = (window as any).__WORK_STAGE__;
      return w ? { phase: w.phase, pp: w.portalProgress, cardsCount: Object.keys(w.cards || {}).length, webglReady: w.webglReady } : null;
    });
    console.log(`[After scroll ${i*500}ms]`, ws);
    if (ws?.phase === 'RIBBON_BROWSE') {
      console.log('SUCCESS: REACHED RIBBON_BROWSE');
      break;
    }
    await page.waitForTimeout(500);
  }

  console.log('--- CLICKING CARD 0 PROXY ---');
  const proxy0 = page.locator('[data-work-card-proxy="0"]');
  await proxy0.waitFor({ state: 'attached', timeout: 5000 });
  await proxy0.dispatchEvent('click');

  for (let i = 0; i < 30; i++) {
    const headerInfo = await page.evaluate(() => {
      const w = (window as any).__WORK_STAGE__;
      const h = document.querySelector('header[data-intro-header]') as HTMLElement;
      const d = document.querySelector('[data-work-detail-panel]') as HTMLElement;
      return {
        phase: w?.phase,
        headerBg: h?.style.getPropertyValue('--header-bg'),
        headerText: h?.style.getPropertyValue('--header-text'),
        headerBorder: h?.style.getPropertyValue('--header-border'),
        detailAriaHidden: d?.getAttribute('aria-hidden'),
      };
    });
    console.log(`[After click ${i*500}ms]`, headerInfo);
    if (headerInfo.phase === 'DETAIL_ACTIVE') {
      console.log('DETAIL_ACTIVE reached. Current header styles:', headerInfo);
      if (headerInfo.headerBg) break;
    }
    await page.waitForTimeout(500);
  }
});
