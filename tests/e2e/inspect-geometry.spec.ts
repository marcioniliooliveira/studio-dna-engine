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

test('Inspect Timeline Parameters and Trigger Info', async ({ page }) => {
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

  const info = await page.evaluate(() => {
    const section = document.querySelector('[data-more-work-section]') as HTMLElement;
    const pin = document.querySelector('[data-horizontal-pin]') as HTMLElement;
    const track = document.querySelector('[data-horizontal-track]') as HTMLElement;
    const viewport = document.getElementById('jesper-work-stage-viewport');

    return {
      sectionOffsetLeft: section?.offsetLeft,
      sectionOffsetWidth: section?.offsetWidth,
      pinOffsetTop: pin?.offsetTop,
      trackScrollWidth: track?.scrollWidth,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      viewportStyle: viewport?.getAttribute('style'),
    };
  });

  console.log('TIMELINE GEOMETRY INFO:', JSON.stringify(info, null, 2));
});
