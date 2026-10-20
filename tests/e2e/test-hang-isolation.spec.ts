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

test('Test wheel step 7, 8, 9 with timeout isolation', async ({ page }) => {
  test.setTimeout(120000);

  page.on('console', msg => console.log('BROWSER_LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE_ERR:', err.message));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

  await page.waitForFunction(() => {
    const ws = (window as any).__WORK_STAGE__;
    return ws && ws.webglReady === true;
  }, null, { timeout: 30000 });

  await page.waitForFunction(() => {
    const de = document.documentElement;
    return !de.classList.contains('lenis-locked') && de.style.overflow !== 'hidden';
  }, null, { timeout: 30000 });

  await page.mouse.move(720, 450);

  for (let s = 0; s < 15; s++) {
    console.log(`--- STEP ${s} ---`);
    await page.mouse.wheel(0, 350);
    await page.waitForTimeout(100);

    const t0 = Date.now();
    try {
      const snap = await page.evaluate(() => {
        const ws = (window as any).__WORK_STAGE__;
        return {
          scrollY: window.scrollY,
          pp: ws?.portalProgress,
          phase: ws?.phase,
          vel: ws?.scrollVelocity,
        };
      });
      console.log(`STEP ${s} OK in ${Date.now() - t0}ms:`, JSON.stringify(snap));
    } catch (e: any) {
      console.log(`STEP ${s} FAILED in ${Date.now() - t0}ms:`, e.message);
      break;
    }
  }
});
