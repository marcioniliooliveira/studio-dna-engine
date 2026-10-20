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

test.describe('Challenger Stress Suite: Multi-Viewport & WebGL Lifecycle', () => {
  const VIEWPORTS = [
    { name: 'Standard Desktop', width: 1440, height: 900 },
    { name: 'Full HD Wide Desktop', width: 1920, height: 1080 },
    { name: '16:10 Laptop Screen', width: 1280, height: 800 },
    { name: '16:9 Mid Desktop', width: 1600, height: 900 },
  ];

  for (const vp of VIEWPORTS) {
    test(`Viewport ${vp.name} (${vp.width}x${vp.height}): Optical Symmetry & Viewport Coverage`, async ({
      page,
    }) => {
      test.setTimeout(60000);

      const pageErrors: string[] = [];
      const consoleErrors: string[] = [];

      page.on('pageerror', (err) => pageErrors.push(err.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

      // Aguarda helper determinístico de teste e WebGL pronto
      await page.waitForFunction(
        () => typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && (window as any).__WORK_STAGE__?.webglReady === true,
        null,
        { timeout: 25000 }
      );

      // 1. Simetria óptica em portalProgress = 0.35
      await page.evaluate(() => {
        (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(0.35);
      });
      await page.waitForTimeout(400);

      const symmetry = await page.evaluate(() => {
        const rectEl = document.querySelector('[data-more-work-rect]') as HTMLElement;
        const moreEl = document.querySelector('[data-more-work-more]') as HTMLElement;
        const workEl = document.querySelector('[data-more-work-work]') as HTMLElement;
        if (!rectEl || !moreEl || !workEl) return null;

        const rect = rectEl.getBoundingClientRect();
        const more = moreEl.getBoundingClientRect();
        const work = workEl.getBoundingClientRect();

        const leftGap = rect.left - more.right;
        const rightGap = work.left - rect.right;
        const diff = Math.abs(leftGap - rightGap);

        return { leftGap, rightGap, diff };
      });

      expect(symmetry).not.toBeNull();
      console.log(`[${vp.name}] Symmetry @ 0.35:`, symmetry);
      expect(symmetry!.diff).toBeLessThanOrEqual(2.0);

      // 2. Expansão 100% da Viewport em portalProgress = 1.0
      await page.evaluate(() => {
        (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
      });
      await page.waitForTimeout(500);

      const rectBox = await page.evaluate(() => {
        const el = document.querySelector('[data-more-work-rect]');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      });

      expect(rectBox).not.toBeNull();
      console.log(`[${vp.name}] Coverage @ 1.0:`, rectBox);

      // Cobertura completa: o retângulo expandido cobre ou excede o viewport
      expect(rectBox!.width).toBeGreaterThanOrEqual(vp.width - 1);
      expect(rectBox!.height).toBeGreaterThanOrEqual(vp.height - 1);
      expect(rectBox!.x).toBeLessThanOrEqual(1);
      expect(rectBox!.y).toBeLessThanOrEqual(1);

      // 3. Telemetria WebGL estabilizada em RIBBON_BROWSE
      await page.waitForFunction(
        () => {
          const ws = (window as any).__WORK_STAGE__;
          return ws && ws.phase === 'RIBBON_BROWSE' && ws.webglReady === true;
        },
        null,
        { timeout: 20000 }
      );

      const wsState = await page.evaluate(() => {
        const ws = (window as any).__WORK_STAGE__;
        return {
          phase: ws?.phase,
          webglReady: ws?.webglReady,
          portalProgress: ws?.portalProgress,
        };
      });

      expect(wsState.phase).toBe('RIBBON_BROWSE');
      expect(wsState.webglReady).toBe(true);
      expect(wsState.portalProgress).toBeGreaterThanOrEqual(0.95);

      // 4. Assert zero uncaught JS exceptions
      expect(pageErrors).toEqual([]);
      expect(consoleErrors).toEqual([]);
    });
  }

  test('Multi-Viewport Detail Flight & Header Theming across Desktop Resolutions', async ({
    page,
  }) => {
    test.setTimeout(120000);

    const testResolutions = [
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 },
      { width: 1280, height: 800 },
    ];

    for (const res of testResolutions) {
      console.log(`Testing Detail Flight & Header Theming at ${res.width}x${res.height}`);
      await page.setViewportSize(res);
      await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

      await page.waitForFunction(
        () => typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && (window as any).__WORK_STAGE__?.webglReady === true,
        null,
        { timeout: 25000 }
      );

      // Expande para RIBBON_BROWSE
      await page.evaluate(() => {
        (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
      });

      await page.waitForFunction(() => {
        const ws = (window as any).__WORK_STAGE__;
        return ws && ws.phase === 'RIBBON_BROWSE' && ws.webglReady === true && ws.cards && Object.keys(ws.cards).length === 4;
      }, null, { timeout: 20000 });

      // Clica no proxy button do Card 0
      const proxy0 = page.locator('[data-work-card-proxy="0"]');
      await proxy0.waitFor({ state: 'attached' });
      await proxy0.dispatchEvent('click');

      // Aguarda DETAIL_ACTIVE
      await page.waitForFunction(
        () => {
          const ws = (window as any).__WORK_STAGE__;
          return ws && ws.phase === 'DETAIL_ACTIVE';
        },
        null,
        { timeout: 15000 }
      );

      // Verifica cobertura física do detail panel no viewport atual
      const detailPanelBox = await page.evaluate(() => {
        const p = document.querySelector('[data-work-detail-panel]') as HTMLElement;
        if (!p) return null;
        const r = p.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      });

      expect(detailPanelBox).not.toBeNull();
      expect(detailPanelBox!.width).toBeGreaterThanOrEqual(res.width);
      expect(detailPanelBox!.height).toBeGreaterThanOrEqual(res.height);
      expect(detailPanelBox!.x).toBeLessThanOrEqual(0);
      expect(detailPanelBox!.y).toBeLessThanOrEqual(0);

      // Verifica adoção determinística do tema no Header Astro
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
      }, null, { timeout: 12000 });

      // Fecha o detalhe via close button (com dispatchEvent / click force e fallback seguro para Escape)
      const closeBtn = page.locator('[data-detail-close]');
      await closeBtn.waitFor({ state: 'attached', timeout: 5000 });
      try {
        await closeBtn.dispatchEvent('click');
      } catch {
        await closeBtn.click({ force: true, timeout: 5000 }).catch(() => {});
      }

      // Fallback seguro via tecla Escape caso a fase ainda seja DETAIL_ACTIVE
      const isStillActive = await page.evaluate(() => {
        const ws = (window as any).__WORK_STAGE__;
        return ws && ws.phase === 'DETAIL_ACTIVE';
      });
      if (isStillActive) {
        await page.keyboard.press('Escape');
      }

      // Aguarda retorno a RIBBON_BROWSE
      await page.waitForFunction(() => {
        const ws = (window as any).__WORK_STAGE__;
        return ws && ws.phase === 'RIBBON_BROWSE';
      }, null, { timeout: 12000 });
    }
  });

  test('WebGL Lifecycle, Context Integrity & Memory Health', async ({ page }) => {
    test.setTimeout(60000);

    const uncaughtErrors: string[] = [];
    page.on('pageerror', (err) => uncaughtErrors.push(err.message));

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    await page.waitForFunction(
      () => typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && (window as any).__WORK_STAGE__?.webglReady === true,
      null,
      { timeout: 25000 }
    );

    await page.evaluate(() => {
      (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
    });

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE' && ws.webglReady === true;
    }, null, { timeout: 20000 });

    // Inspeciona canvas WebGL e integridade do driver
    const webglHealth = await page.evaluate(() => {
      const canvas = document.querySelector('#jesper-work-stage-mount canvas') as HTMLCanvasElement;
      if (!canvas) return { hasCanvas: false };

      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return { hasCanvas: true, hasGL: false };

      const isContextLost = gl.isContextLost();
      const glError = gl.getError();

      return {
        hasCanvas: true,
        hasGL: true,
        isContextLost,
        glError, // 0 = NO_ERROR
        width: canvas.width,
        height: canvas.height,
      };
    });

    console.log('WebGL Health Audit:', webglHealth);
    expect(webglHealth.hasCanvas).toBe(true);
    expect(webglHealth.hasGL).toBe(true);
    expect(webglHealth.isContextLost).toBe(false);
    expect(webglHealth.glError).toBe(0);

    // Inspeciona redimensionamento de janela dinâmico (stress resize)
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(300);

    const resizeHealth = await page.evaluate(() => {
      const canvas = document.querySelector('#jesper-work-stage-mount canvas') as HTMLCanvasElement;
      if (!canvas) return { hasCanvas: false };
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      return {
        isContextLost: gl?.isContextLost(),
        glError: gl?.getError(),
        width: canvas.width,
        height: canvas.height,
      };
    });

    expect(resizeHealth.isContextLost).toBe(false);
    expect(resizeHealth.glError).toBe(0);

    // Assert zero uncaught JS exceptions ao longo de todo o ciclo
    expect(uncaughtErrors).toEqual([]);
  });
});
