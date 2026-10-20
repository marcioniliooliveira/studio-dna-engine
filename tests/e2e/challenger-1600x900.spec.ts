import { test, expect } from '@playwright/test';
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

test('1600x900 Desktop: Detail Flight, Panel Coverage, Header Theme & Restoration', async ({ page }) => {
  test.setTimeout(60000);

  const res = { width: 1600, height: 900 };
  await page.setViewportSize(res);
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
  }, { timeout: 15000 });

  const panelBox = await page.evaluate(() => {
    const p = document.querySelector('[data-work-detail-panel]') as HTMLElement;
    if (!p) return null;
    const r = p.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });

  expect(panelBox).not.toBeNull();
  expect(panelBox!.width).toBeGreaterThanOrEqual(1600);
  expect(panelBox!.height).toBeGreaterThanOrEqual(900);
  expect(panelBox!.x).toBeLessThanOrEqual(0);
  expect(panelBox!.y).toBeLessThanOrEqual(0);

  // Check Astro Header theme adaptation
  await page.waitForFunction(() => {
    const h = document.querySelector('header[data-intro-header]') as HTMLElement;
    if (!h) return false;
    const bg = h.style.getPropertyValue('--header-bg').toLowerCase().trim();
    const text = h.style.getPropertyValue('--header-text').toLowerCase().trim();
    return (bg === '#faf9f6' || bg === 'rgb(250, 249, 246)') && (text === '#2e2b28' || text === 'rgb(46, 43, 40)');
  }, { timeout: 10000 });

  // Close and restore
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => {
    const ws = (window as any).__WORK_STAGE__;
    return ws && ws.phase === 'RIBBON_BROWSE';
  }, { timeout: 10000 });

  const restored = await page.evaluate(() => {
    const ws = (window as any).__WORK_STAGE__;
    const d = document.querySelector('[data-work-detail-panel]') as HTMLElement;
    return {
      phase: ws?.phase,
      ariaHidden: d?.getAttribute('aria-hidden'),
    };
  });

  expect(restored.phase).toBe('RIBBON_BROWSE');
  expect(restored.ariaHidden).toBe('true');
});
