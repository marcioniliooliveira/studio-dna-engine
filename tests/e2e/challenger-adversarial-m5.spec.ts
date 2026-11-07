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

test.describe('Challenger M5 Adversarial Suite: Voluntary Departure & Flight Interruption', () => {
  test('Voluntary departure HUD button activates after cumulative scroll >= 1200 and advances to Chapter III', async ({
    page,
  }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && ws && ws.webglReady === true;
    }, null, { timeout: 20000 });

    // Expand portal to 1.0 (enter RIBBON_BROWSE)
    await page.evaluate(() => {
      (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
    });

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE';
    });

    // Check fixed microcopy
    const microcopy = page.locator('[data-testid="hud-microcopy-left"]');
    await expect(microcopy).toBeVisible();
    await expect(microcopy).toContainText('CAPÍTULO II — FIQUE O TEMPO QUE QUISER');

    // Sold button should initially NOT be visible (opacity 0 or pointerEvents none)
    const soldBtn = page.locator('[data-testid="hud-sold-btn"]');
    const initialVisibility = await page.evaluate(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws?.isAlreadySoldVisible;
    });
    expect(initialVisibility).toBe(false);

    // Trigger cumulative scroll >= 1200 via wheel events
    await page.mouse.move(720, 450);
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, 300);
      await page.waitForTimeout(50);
    }

    // Verify cumulativeScroll >= 1200 and button becomes visible
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.isAlreadySoldVisible === true && ws.cumulativeScroll >= 1200;
    }, null, { timeout: 10000 });

    await expect(soldBtn).toBeVisible();
    await expect(soldBtn).toContainText('EU JÁ ESTOU CONVENCIDO');

    // Click departure button
    await soldBtn.click();

    // Verify departure: Lenis or GSAP scrolls to Chapter III
    await page.waitForFunction(() => {
      const servicesEl = document.querySelector('[data-services-section]');
      if (!servicesEl) return false;
      const rect = servicesEl.getBoundingClientRect();
      return rect.left < window.innerWidth && rect.right > 0;
    }, null, { timeout: 15000 });

    const servicesBox = await page.evaluate(() => {
      const el = document.querySelector('[data-services-section]');
      return el ? el.getBoundingClientRect().left : null;
    });
    expect(servicesBox).not.toBeNull();
    expect(servicesBox!).toBeLessThan(1440);
  });

  test('Detail flight interruption: pressing Escape mid-flight cleanly cancels and restores RIBBON_BROWSE', async ({
    page,
  }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && ws && ws.webglReady === true;
    }, null, { timeout: 20000 });

    // Open portal to 1.0
    await page.evaluate(() => {
      (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
    });

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE';
    });

    // Click proxy 0 to start flight
    const proxy0 = page.locator('[data-work-card-proxy="0"]');
    await proxy0.waitFor({ state: 'attached' });
    await proxy0.dispatchEvent('click');

    // Verify phase is DETAIL_FLIGHT immediately
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'DETAIL_FLIGHT';
    }, null, { timeout: 2000 });

    // Interrupt mid-flight with Escape key within 100ms
    await page.waitForTimeout(80);
    await page.keyboard.press('Escape');

    // Phase should transition to DETAIL_CLOSING and then back to RIBBON_BROWSE
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE';
    }, null, { timeout: 10000 });

    const finalPhase = await page.evaluate(() => (window as any).__WORK_STAGE__?.phase);
    expect(finalPhase).toBe('RIBBON_BROWSE');

    // Overflow must not be trapped in 'hidden'
    const overflowStatus = await page.evaluate(() => ({
      html: document.documentElement.style.overflow,
      body: document.body.style.overflow,
    }));
    expect(overflowStatus.html).toBe('');
    expect(overflowStatus.body).toBe('');

    // Uniforms restored
    const uniformsRestored = await page.evaluate(() => {
      const ws = (window as any).__WORK_STAGE__;
      return {
        c0SheetP: ws?.cards?.[0]?.uniforms?.u_sheetP,
        c1Alpha: ws?.cards?.[1]?.uniforms?.u_alpha,
      };
    });
    expect(uniformsRestored.c0SheetP).toBeGreaterThan(0.99);
    expect(uniformsRestored.c1Alpha).toBeGreaterThan(0.99);
  });
});
