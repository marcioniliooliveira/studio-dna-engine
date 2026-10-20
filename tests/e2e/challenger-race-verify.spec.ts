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

test('Prove race condition between __TEST_SCROLL_TO_PORTAL_PROGRESS__ and WorkStage mount', async ({ page }) => {
  test.setTimeout(60000);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

  // Right when __TEST_SCROLL_TO_PORTAL_PROGRESS__ exists, check if __TEST_SET_PORTAL_PROGRESS__ exists
  await page.waitForFunction(() => typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function');
  
  const statusAtScrollReady = await page.evaluate(() => ({
    hasScrollHelper: typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function',
    hasSetProgressHelper: typeof (window as any).__TEST_SET_PORTAL_PROGRESS__ === 'function',
    hasWorkStage: !!(window as any).__WORK_STAGE__,
  }));
  console.log('Status immediately when scroll helper is ready:', statusAtScrollReady);

  // If we wait for __TEST_SET_PORTAL_PROGRESS__ as well:
  await page.waitForFunction(() => typeof (window as any).__TEST_SET_PORTAL_PROGRESS__ === 'function');
  const statusAfterWorkStageMount = await page.evaluate(() => ({
    hasScrollHelper: typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function',
    hasSetProgressHelper: typeof (window as any).__TEST_SET_PORTAL_PROGRESS__ === 'function',
    hasWorkStage: !!(window as any).__WORK_STAGE__,
    wsPhase: (window as any).__WORK_STAGE__?.phase,
  }));
  console.log('Status after WorkStage is mounted:', statusAfterWorkStageMount);
  expect(statusAfterWorkStageMount.hasSetProgressHelper).toBe(true);
});
