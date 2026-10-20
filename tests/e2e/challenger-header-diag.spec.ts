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

test('Diagnose header style properties during DETAIL_ACTIVE', async ({ page }) => {
  test.setTimeout(60000);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

  await page.waitForFunction(() => typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function');
  await page.evaluate(() => (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0));

  await page.waitForFunction(() => {
    const ws = (window as any).__WORK_STAGE__;
    return ws && ws.phase === 'RIBBON_BROWSE' && ws.cards && Object.keys(ws.cards).length === 4;
  });

  const proxy0 = page.locator('[data-work-card-proxy="0"]');
  await proxy0.waitFor({ state: 'attached' });
  await proxy0.dispatchEvent('click');

  await page.waitForFunction(() => {
    const ws = (window as any).__WORK_STAGE__;
    return ws && ws.phase === 'DETAIL_ACTIVE';
  });

  // Now inspect header immediately and every 500ms
  for (let i = 0; i < 6; i++) {
    const info = await page.evaluate(() => {
      const header = document.querySelector('header[data-intro-header]') as HTMLElement;
      const detail = document.querySelector('[data-work-detail-panel]') as HTMLElement;
      return {
        headerFound: !!header,
        headerInlineBg: header?.style.getPropertyValue('--header-bg'),
        headerInlineText: header?.style.getPropertyValue('--header-text'),
        headerInlineBorder: header?.style.getPropertyValue('--header-border'),
        headerComputedBg: header ? window.getComputedStyle(header).getPropertyValue('--header-bg') : null,
        detailFound: !!detail,
        detailAriaHidden: detail?.getAttribute('aria-hidden'),
        detailBg: detail?.dataset.headerBg,
        detailText: detail?.dataset.headerText,
      };
    });
    console.log(`[Check ${i}] info:`, info);
    await page.waitForTimeout(500);
  }
});
