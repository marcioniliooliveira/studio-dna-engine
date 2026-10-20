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
    if (cleanPath === '/' || cleanPath === '') {
      cleanPath = '/index.html';
    }

    let filePath = path.join(siteDir, cleanPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const fallbackAsset = path.join(siteDir, 'assets', cleanPath);
      if (fs.existsSync(fallbackAsset) && fs.statSync(fallbackAsset).isFile()) {
        filePath = fallbackAsset;
      }
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const range = req.headers.range;
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
        });
        file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
          'Access-Control-Allow-Origin': '*',
        });
        fs.createReadStream(filePath).pipe(res);
      }
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
  await new Promise<void>((resolve) => {
    server.close(() => resolve());
  });
});

test('Diagnostic full loop for test 5', async ({ page }) => {
  test.setTimeout(120000);

  page.on('console', (msg) => console.log('PAGE CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

  const testResolutions = [
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
    { width: 1280, height: 800 },
    { width: 1600, height: 900 },
  ];

  for (const res of testResolutions) {
    const tStart = Date.now();
    console.log(`\n--- STARTING ${res.width}x${res.height} ---`);
    await page.setViewportSize(res);
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
    console.log(`[${res.width}x${res.height}] goto completed in ${Date.now() - tStart}ms`);

    await page.waitForFunction(
      () => typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function',
      { timeout: 20000 }
    );
    console.log(`[${res.width}x${res.height}] helper ready in ${Date.now() - tStart}ms`);

    await page.evaluate(() => {
      (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
    });
    console.log(`[${res.width}x${res.height}] scrolled to 1.0 in ${Date.now() - tStart}ms`);

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE' && ws.cards && Object.keys(ws.cards).length === 4;
    }, { timeout: 20000 });
    console.log(`[${res.width}x${res.height}] RIBBON_BROWSE ready in ${Date.now() - tStart}ms`);

    const proxy0 = page.locator('[data-work-card-proxy="0"]');
    await proxy0.waitFor({ state: 'attached', timeout: 10000 });
    await proxy0.dispatchEvent('click');
    console.log(`[${res.width}x${res.height}] clicked proxy0 in ${Date.now() - tStart}ms`);

    await page.waitForFunction(
      () => {
        const ws = (window as any).__WORK_STAGE__;
        return ws && ws.phase === 'DETAIL_ACTIVE';
      },
      { timeout: 15000 }
    );
    console.log(`[${res.width}x${res.height}] reached DETAIL_ACTIVE in ${Date.now() - tStart}ms`);

    const detailPanelBox = await page.evaluate(() => {
      const p = document.querySelector('[data-work-detail-panel]') as HTMLElement;
      if (!p) return null;
      const r = p.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });
    console.log(`[${res.width}x${res.height}] detailPanelBox:`, detailPanelBox);
    expect(detailPanelBox).not.toBeNull();
    expect(detailPanelBox!.width).toBeGreaterThanOrEqual(res.width);
    expect(detailPanelBox!.height).toBeGreaterThanOrEqual(res.height);

    await page.waitForFunction(() => {
      const header = document.querySelector('header[data-intro-header]') as HTMLElement;
      if (!header) return false;
      const bg = header.style.getPropertyValue('--header-bg').toLowerCase().trim();
      const text = header.style.getPropertyValue('--header-text').toLowerCase().trim();
      const border = header.style.getPropertyValue('--header-border').toLowerCase().trim();
      return (
        (bg === '#faf9f6' || bg === 'rgb(250, 249, 246)') &&
        (text === '#2e2b28' || text === 'rgb(46, 43, 40)') &&
        (border === '#b8b3ac' || border === 'rgb(184, 179, 172)')
      );
    }, { timeout: 10000 });
    console.log(`[${res.width}x${res.height}] header theming verified in ${Date.now() - tStart}ms`);

    const closeBtn = page.locator('[data-detail-close]');
    await closeBtn.waitFor({ state: 'attached', timeout: 5000 });
    try {
      await closeBtn.dispatchEvent('click');
    } catch {
      await closeBtn.click({ force: true, timeout: 5000 }).catch(() => {});
    }

    const isStillActive = await page.evaluate(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'DETAIL_ACTIVE';
    });
    if (isStillActive) {
      await page.keyboard.press('Escape');
    }

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE';
    }, { timeout: 10000 });
    console.log(`[${res.width}x${res.height}] returned to RIBBON_BROWSE in ${Date.now() - tStart}ms\n`);
  }
});
