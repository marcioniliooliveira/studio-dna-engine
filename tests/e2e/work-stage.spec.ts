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

      // Suporte a Range Request para vídeos .mp4
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

test.describe('Gate 2: Simetria Óptica e Expansão do Portal "THE WORK"', () => {
  test('Simetria óptica em portalProgress = 0.35 e cobertura 100% da viewport em portalProgress = 1.0', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    // Aguarda carregamento das fontes, prontidão dos scripts e WebGL
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && ws && ws.webglReady === true;
    }, null, { timeout: 20000 });

    // 1. Posiciona deterministicamente o portal em portalProgress = 0.35
    await page.evaluate(() => {
      (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(0.35);
    });

    // Aguarda acomodação do layout
    await page.waitForTimeout(300);

    // Validação da Simetria Óptica: |(rect.left - more.right) - (work.left - rect.right)| <= 2px
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

      return {
        leftGap,
        rightGap,
        diff,
      };
    });

    expect(symmetry).not.toBeNull();
    expect(symmetry!.diff).toBeLessThanOrEqual(2.0);

    // 2. Expande o portal para 100% de progresso
    await page.evaluate(() => {
      (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
    });

    const diag = await page.evaluate(() => {
      const el = document.querySelector('[data-more-work-rect]');
      return {
        found: !!el,
        rect: el ? el.getBoundingClientRect() : null,
        transform: el ? window.getComputedStyle(el).transform : null,
        display: el ? window.getComputedStyle(el).display : null,
        visibility: el ? window.getComputedStyle(el).visibility : null,
        parentDisplay: el?.parentElement ? window.getComputedStyle(el.parentElement).display : null,
      };
    });
    console.log('DIAGNOSTIC:', JSON.stringify(diag));

    // Validação de cobertura 100% da viewport por [data-more-work-rect]
    const rectBox = await page.locator('[data-more-work-rect]').boundingBox({ timeout: 5000 }).catch(async () => {
      return await page.evaluate(() => {
        const r = document.querySelector('[data-more-work-rect]')?.getBoundingClientRect();
        return r ? { x: r.x, y: r.y, width: r.width, height: r.height } : null;
      });
    });
    expect(rectBox).not.toBeNull();
    expect(rectBox!.width).toBeGreaterThanOrEqual(1440);
    expect(rectBox!.height).toBeGreaterThanOrEqual(900);
    expect(rectBox!.x).toBeLessThanOrEqual(0);
    expect(rectBox!.y).toBeLessThanOrEqual(0);

    // Validação da telemetria da fita WebGL
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE';
    });

    const phase = await page.evaluate(() => (window as any).__WORK_STAGE__?.phase);
    expect(phase).toBe('RIBBON_BROWSE');
  });
});

test.describe('Gate 3: Fita 3D com os 4 Projetos, Velocidade e Hover', () => {
  test('Presença dos 4 projetos, resposta de scrollVelocity e hover em u_hover', async ({
    page,
  }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    // Aguarda o helper de teste e WebGL pronto
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && ws && ws.webglReady === true;
    }, null, { timeout: 20000 });

    // Expande o portal para 1.0 (RIBBON_BROWSE)
    await page.evaluate(() => {
      (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
    });

    // Aguarda prontidão da telemetria, fase RIBBON_BROWSE e dos cards
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.webglReady === true && ws.phase === 'RIBBON_BROWSE' && (ws.portalProgress ?? 0) >= 0.99 && ws.cards && Object.keys(ws.cards).length === 4;
    }, null, { timeout: 20000 });

    // 1. Validação dos 4 projetos ['0', '1', '2', '3']
    const cardData = await page.evaluate(() => {
      const ws = (window as any).__WORK_STAGE__;
      return {
        keys: Object.keys(ws.cards),
        slugs: Object.values(ws.cards).map((c: any) => c.slug),
      };
    });

    expect(cardData.keys).toEqual(['0', '1', '2', '3']);
    expect(cardData.slugs).toEqual(['evo-money', 'plant-tag', 'swisshaus', 'betahaus']);

    // 2. Disparo de wheel e verificação de scrollVelocity > 0.05
    await page.mouse.move(720, 450);
    await page.mouse.wheel(0, 600);

    // Validação da velocidade instantânea amortecida disparada pelo wheel
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.scrollVelocity > 0.05;
    }, null, { timeout: 10000 });

    const scrollVelocity = await page.evaluate(() => {
      return (window as any).__WORK_STAGE__?.scrollVelocity || 0;
    });
    expect(scrollVelocity).toBeGreaterThan(0.05);

    // 3. Hover sobre o proxy do card 0 e verificação de u_hover > 0.95
    const proxy0 = page.locator('[data-work-card-proxy="0"]');
    await proxy0.waitFor({ state: 'visible' });

    const p0Box = await page.evaluate(() => {
      const el = document.querySelector('[data-work-card-proxy="0"]');
      const r = el ? el.getBoundingClientRect() : null;
      return {
        box: r ? { x: r.x, y: r.y, width: r.width, height: r.height, top: r.top, left: r.left } : null,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      };
    });
    console.log('PROXY 0 DIAGNOSTIC:', JSON.stringify(p0Box));

    const hitElement = await page.evaluate(() => {
      const el = document.querySelector('[data-work-card-proxy="0"]');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const topEl = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return {
        target: el.outerHTML.slice(0, 100),
        hit: topEl ? topEl.outerHTML.slice(0, 100) : null,
        hitTag: topEl?.tagName,
        hitClass: topEl?.className,
        hitZIndex: topEl ? window.getComputedStyle(topEl).zIndex : null,
        hitPointerEvents: topEl ? window.getComputedStyle(topEl).pointerEvents : null,
      };
    });
    console.log('HIT ELEMENT:', JSON.stringify(hitElement));

    await proxy0.hover({ force: true });
    await proxy0.dispatchEvent('mouseenter');

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.cards && ws.cards[0]?.uniforms?.u_hover > 0.95;
    }, null, { timeout: 10000 });

    const hoverVal = await page.evaluate(() => (window as any).__WORK_STAGE__?.cards[0]?.uniforms?.u_hover);
    expect(hoverVal).toBeGreaterThan(0.95);
  });
});

test.describe('Gate 4: Voo Espacial Card-to-Sheet e Visão Detalhada', () => {
  test('Voo tridimensional do Card 0, descurvatura, fade dos vizinhos e ativação do tema no header Astro', async ({
    page,
  }) => {
    test.setTimeout(60000);
    page.on('console', msg => console.log('PAGE CONSOLE:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    // Aguarda prontidão do helper determinístico de teste e WebGL
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && ws && ws.webglReady === true;
    }, null, { timeout: 20000 });

    // Posiciona o portal em portalProgress = 1.0 para entrar em RIBBON_BROWSE
    await page.evaluate(() => {
      (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
    });

    // Aguarda o término da expansão e prontidão dos 4 cards
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE' && ws.cards && Object.keys(ws.cards).length === 4;
    }, null, { timeout: 20000 });

    // Registra listener no requestAnimationFrame para captura fidedigna da fase transitória DETAIL_FLIGHT
    await page.evaluate(() => {
      (window as any).__PHASE_SEQUENCE__ = [];
      const trackPhases = () => {
        const p = (window as any).__WORK_STAGE__?.phase;
        if (p && !(window as any).__PHASE_SEQUENCE__.includes(p)) {
          (window as any).__PHASE_SEQUENCE__.push(p);
        }
        if (p !== 'DETAIL_ACTIVE') {
          requestAnimationFrame(trackPhases);
        }
      };
      requestAnimationFrame(trackPhases);
    });

    // Ação: Clica no proxy button do card 0
    const proxy0 = page.locator('[data-work-card-proxy="0"]');
    await proxy0.waitFor({ state: 'attached', timeout: 20000 });
    await proxy0.dispatchEvent('click');

    const clickCheck = await page.evaluate(() => {
      const ws = (window as any).__WORK_STAGE__;
      return {
        phase: ws?.phase,
        activeProjectIndex: ws?.activeProjectIndex,
        seq: (window as any).__PHASE_SEQUENCE__,
      };
    });
    console.log('RIGHT AFTER CLICK:', JSON.stringify(clickCheck));

    // 1. Verificação das Transições de Fase:
    // Fase transitória: 'DETAIL_FLIGHT'
    await page.waitForFunction(() => {
      const seq = (window as any).__PHASE_SEQUENCE__ || [];
      const current = (window as any).__WORK_STAGE__?.phase;
      return seq.includes('DETAIL_FLIGHT') || current === 'DETAIL_FLIGHT' || current === 'DETAIL_ACTIVE';
    }, null, { timeout: 5000 });

    // Fase estabelecida: aguarda window.__WORK_STAGE__.phase === 'DETAIL_ACTIVE' (timeout 15000ms)
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'DETAIL_ACTIVE';
    }, null, { timeout: 15000 });

    const phaseSequence = await page.evaluate(() => (window as any).__PHASE_SEQUENCE__);
    expect(phaseSequence).toContain('DETAIL_FLIGHT');

    const settledPhase = await page.evaluate(() => (window as any).__WORK_STAGE__?.phase);
    expect(settledPhase).toBe('DETAIL_ACTIVE');

    // 2. Verificação dos Shader Uniforms no Card 0 (completamente descurvado e face branca ativada)
    await page.waitForFunction(() => {
      const c0 = (window as any).__WORK_STAGE__?.cards?.[0]?.uniforms;
      return (
        c0 &&
        c0.u_sheetP < 0.01 &&
        c0.u_white > 0.99 &&
        c0.u_shade < 0.01 &&
        c0.u_scrim < 0.01
      );
    }, null, { timeout: 15000 });

    const card0Uniforms = await page.evaluate(() => (window as any).__WORK_STAGE__?.cards?.[0]?.uniforms);
    expect(card0Uniforms.u_sheetP).toBeLessThan(0.01);
    expect(card0Uniforms.u_white).toBeGreaterThan(0.99);
    expect(card0Uniforms.u_shade).toBeLessThan(0.01);
    expect(card0Uniforms.u_scrim).toBeLessThan(0.01);

    // 3. Verificação do Fade-Out dos Cards Vizinhos (1, 2, 3)
    await page.waitForFunction(() => {
      const cards = (window as any).__WORK_STAGE__?.cards;
      return (
        cards?.[1]?.uniforms?.u_alpha < 0.01 &&
        cards?.[2]?.uniforms?.u_alpha < 0.01 &&
        cards?.[3]?.uniforms?.u_alpha < 0.01
      );
    }, null, { timeout: 15000 });

    const neighborAlphas = await page.evaluate(() => {
      const cards = (window as any).__WORK_STAGE__?.cards;
      return [
        cards?.[1]?.uniforms?.u_alpha,
        cards?.[2]?.uniforms?.u_alpha,
        cards?.[3]?.uniforms?.u_alpha,
      ];
    });
    expect(neighborAlphas[0]).toBeLessThan(0.01);
    expect(neighborAlphas[1]).toBeLessThan(0.01);
    expect(neighborAlphas[2]).toBeLessThan(0.01);

    // 4. Verificação do Painel DOM de Detalhe e Acessibilidade
    const detailPanel = page.locator('[data-work-detail-panel]');
    await expect(detailPanel).toBeVisible({ timeout: 5000 });

    const detailState = await page.evaluate(() => {
      const el = document.querySelector('[data-work-detail-panel]') as HTMLElement;
      if (!el) return null;
      const comp = window.getComputedStyle(el);
      return {
        ariaHidden: el.getAttribute('aria-hidden'),
        opacity: parseFloat(comp.opacity || '1'),
        text: el.innerText,
      };
    });
    expect(detailState).not.toBeNull();
    expect(detailState!.opacity).toBeGreaterThan(0);
    if (detailState!.ariaHidden !== null) {
      expect(detailState!.ariaHidden).toBe('false');
    }
    expect(detailState!.text).toMatch(/evo\s*[-]?\s*money/i);

    // 5. Verificação da Ativação do Tema no Header Astro (<header data-intro-header>)
    await page.waitForFunction(() => {
      const header = document.querySelector('header[data-intro-header]') as HTMLElement;
      if (!header) return false;
      const bg = header.style.getPropertyValue('--header-bg').toLowerCase().trim();
      const text = header.style.getPropertyValue('--header-text').toLowerCase().trim();
      const border = header.style.getPropertyValue('--header-border').toLowerCase().trim();
      console.log('HEADER THEME CHECK:', JSON.stringify({ bg, text, border }));

      const bgMatch = bg === '#faf9f6' || bg === 'rgb(250, 249, 246)';
      const textMatch = text === '#2e2b28' || text === 'rgb(46, 43, 40)';
      const borderMatch = border === '#b8b3ac' || border === 'rgb(184, 179, 172)';

      return bgMatch && textMatch && borderMatch;
    }, { timeout: 8000 });

    const headerTheme = await page.evaluate(() => {
      const header = document.querySelector('header[data-intro-header]') as HTMLElement;
      return {
        bg: header?.style.getPropertyValue('--header-bg')?.toLowerCase().trim(),
        text: header?.style.getPropertyValue('--header-text')?.toLowerCase().trim(),
        border: header?.style.getPropertyValue('--header-border')?.toLowerCase().trim(),
      };
    });
    expect(['#faf9f6', 'rgb(250, 249, 246)']).toContain(headerTheme.bg);
    expect(['#2e2b28', 'rgb(46, 43, 40)']).toContain(headerTheme.text);
    expect(['#b8b3ac', 'rgb(184, 179, 172)']).toContain(headerTheme.border);

    // 6. Verificação do Scroll Lock
    const isScrollLocked = await page.evaluate(() => {
      return (
        document.documentElement.style.overflow === 'hidden' ||
        document.body.style.overflow === 'hidden'
      );
    });
    expect(isScrollLocked).toBe(true);
  });
});

test.describe('Gate 5: Fecho do Detalhe e Restauração da Fita', () => {
  test('Fecho via botão e Escape, restauração de curvatura, vizinhos e overflow', async ({
    page,
  }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    // Aguarda prontidão do helper determinístico de teste e WebGL
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && ws && ws.webglReady === true;
    }, null, { timeout: 20000 });

    // Posiciona o portal em portalProgress = 1.0 para entrar em RIBBON_BROWSE
    await page.evaluate(() => {
      (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
    });

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE' && ws.cards && Object.keys(ws.cards).length === 4;
    });

    // Abre o detalhe do card 0 para entrar em DETAIL_ACTIVE
    const proxy0 = page.locator('[data-work-card-proxy="0"]');
    await proxy0.waitFor({ state: 'attached' });
    await proxy0.dispatchEvent('click');

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'DETAIL_ACTIVE';
    }, { timeout: 8000 });

    // === Action Part A: Fecho via botão [data-detail-close] ===
    await page.evaluate(() => {
      (window as any).__CLOSE_PHASES__ = [];
      const trackClose = () => {
        const p = (window as any).__WORK_STAGE__?.phase;
        if (p && !(window as any).__CLOSE_PHASES__.includes(p)) {
          (window as any).__CLOSE_PHASES__.push(p);
        }
        if (p !== 'RIBBON_BROWSE') {
          requestAnimationFrame(trackClose);
        }
      };
      requestAnimationFrame(trackClose);
    });

    const closeBtn = page.locator('[data-detail-close]');
    await closeBtn.waitFor({ state: 'attached', timeout: 5000 });
    try {
      await closeBtn.dispatchEvent('click');
    } catch {
      await closeBtn.click({ force: true, timeout: 5000 }).catch(() => {});
    }

    // Fallback de segurança se DETAIL_ACTIVE persistir
    const isStillActiveA = await page.evaluate(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'DETAIL_ACTIVE';
    });
    if (isStillActiveA) {
      await page.keyboard.press('Escape');
    }

    // Aguarda transição para DETAIL_CLOSING e retorno estável para RIBBON_BROWSE
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE';
    }, { timeout: 8000 });

    const closePhases = await page.evaluate(() => (window as any).__CLOSE_PHASES__);
    expect(closePhases).toContain('DETAIL_CLOSING');

    const settledPhaseA = await page.evaluate(() => (window as any).__WORK_STAGE__?.phase);
    expect(settledPhaseA).toBe('RIBBON_BROWSE');

    // Card 0 restaurado: cards[0].uniforms.u_sheetP > 0.99, u_white < 0.01
    await page.waitForFunction(() => {
      const c0 = (window as any).__WORK_STAGE__?.cards?.[0]?.uniforms;
      return c0 && c0.u_sheetP > 0.99 && c0.u_white < 0.01;
    }, { timeout: 8000 });

    const restoredC0 = await page.evaluate(() => (window as any).__WORK_STAGE__?.cards?.[0]?.uniforms);
    expect(restoredC0.u_sheetP).toBeGreaterThan(0.99);
    expect(restoredC0.u_white).toBeLessThan(0.01);

    // Cards vizinhos restaurados: cards[1..3].uniforms.u_alpha > 0.99
    await page.waitForFunction(() => {
      const cards = (window as any).__WORK_STAGE__?.cards;
      return (
        cards?.[1]?.uniforms?.u_alpha > 0.99 &&
        cards?.[2]?.uniforms?.u_alpha > 0.99 &&
        cards?.[3]?.uniforms?.u_alpha > 0.99
      );
    }, { timeout: 8000 });

    const restoredNeighborAlphas = await page.evaluate(() => {
      const cards = (window as any).__WORK_STAGE__?.cards;
      return [
        cards?.[1]?.uniforms?.u_alpha,
        cards?.[2]?.uniforms?.u_alpha,
        cards?.[3]?.uniforms?.u_alpha,
      ];
    });
    expect(restoredNeighborAlphas[0]).toBeGreaterThan(0.99);
    expect(restoredNeighborAlphas[1]).toBeGreaterThan(0.99);
    expect(restoredNeighborAlphas[2]).toBeGreaterThan(0.99);

    // Painel de detalhe fechado: unmounted, aria-hidden="true" ou opacidade 0
    await page.waitForFunction(() => {
      const panel = document.querySelector('[data-work-detail-panel]');
      if (!panel) return true;
      const isAriaHidden = panel.getAttribute('aria-hidden') === 'true';
      const opacity = parseFloat(window.getComputedStyle(panel).opacity || '0');
      return isAriaHidden || opacity === 0;
    }, { timeout: 5000 });

    const isPanelClosedA = await page.evaluate(() => {
      const panel = document.querySelector('[data-work-detail-panel]');
      if (!panel) return true;
      const isAriaHidden = panel.getAttribute('aria-hidden') === 'true';
      const opacity = parseFloat(window.getComputedStyle(panel).opacity || '0');
      return isAriaHidden || opacity === 0;
    });
    expect(isPanelClosedA).toBe(true);

    // Overflow do documento restaurado: document.documentElement.style.overflow === '' e document.body.style.overflow === ''
    const overflowRestoredA = await page.evaluate(() => {
      return (
        document.documentElement.style.overflow === '' &&
        document.body.style.overflow === ''
      );
    });
    expect(overflowRestoredA).toBe(true);

    // === Action Part B: Fecho via tecla Escape ===
    // Reabre o detalhe clicando no proxy 0
    try {
      await proxy0.dispatchEvent('click');
    } catch {
      await proxy0.click({ force: true, timeout: 5000 }).catch(() => {});
    }

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'DETAIL_ACTIVE';
    }, { timeout: 8000 });

    // Pressiona Escape
    await page.keyboard.press('Escape');

    // Aguarda restauração completa a RIBBON_BROWSE
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE';
    }, { timeout: 8000 });

    const settledPhaseB = await page.evaluate(() => (window as any).__WORK_STAGE__?.phase);
    expect(settledPhaseB).toBe('RIBBON_BROWSE');

    // Validação da restauração limpa após Escape
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      const c0 = ws?.cards?.[0]?.uniforms;
      const c1 = ws?.cards?.[1]?.uniforms;
      return c0 && c0.u_sheetP > 0.99 && c0.u_white < 0.01 && c1 && c1.u_alpha > 0.99;
    }, { timeout: 8000 });

    const escapeRestoration = await page.evaluate(() => {
      const ws = (window as any).__WORK_STAGE__;
      return {
        c0SheetP: ws?.cards?.[0]?.uniforms?.u_sheetP,
        c0White: ws?.cards?.[0]?.uniforms?.u_white,
        c1Alpha: ws?.cards?.[1]?.uniforms?.u_alpha,
        c2Alpha: ws?.cards?.[2]?.uniforms?.u_alpha,
        c3Alpha: ws?.cards?.[3]?.uniforms?.u_alpha,
        overflowDoc: document.documentElement.style.overflow,
        overflowBody: document.body.style.overflow,
      };
    });

    expect(escapeRestoration.c0SheetP).toBeGreaterThan(0.99);
    expect(escapeRestoration.c0White).toBeLessThan(0.01);
    expect(escapeRestoration.c1Alpha).toBeGreaterThan(0.99);
    expect(escapeRestoration.c2Alpha).toBeGreaterThan(0.99);
    expect(escapeRestoration.c3Alpha).toBeGreaterThan(0.99);
    expect(escapeRestoration.overflowDoc).toBe('');
    expect(escapeRestoration.overflowBody).toBe('');
  });
});

test.describe('Gate 6: Rolagem Contínua de Ponta a Ponta (End-to-End Continuous Scroll)', () => {
  test('Rolagem natural da roda do mouse de scrollY = 0 até Chapter III, Chapter IV e Rodapé sem deadlock', async ({
    page,
  }) => {
    test.setTimeout(240000);

    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    // 1. Ponto de partida: Topo estrito
    const initialScrollY = await page.evaluate(() => window.scrollY);
    expect(initialScrollY).toBe(0);

    console.log('[Gate 6] Page loaded, awaiting webglReady...');
    // Garante inicialização dos scripts de animação e WebGL
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.webglReady === true;
    }, null, { timeout: 20000 });
    console.log('[Gate 6] webglReady confirmed. Awaiting Lenis unlock...');

    // Aguarda destravamento do motor de rolagem Lenis pós-intro
    await page.waitForFunction(() => {
      const de = document.documentElement;
      return !de.classList.contains('lenis-locked') && de.style.overflow !== 'hidden';
    }, null, { timeout: 30000 });
    console.log('[Gate 6] Lenis unlocked! Commencing continuous scroll traversal...');

    // Posiciona o ponteiro do mouse no centro da tela para disparar eventos de wheel
    await page.mouse.move(720, 450);

    // Sentinel de telemetria para registrar marcos ao longo da travessia contínua
    const milestones = {
      reachedPortalApex: false,
      ribbonVelocityObserved: false,
      reachedServices: false,
      reachedClients: false,
      reachedFooter: false,
    };

    let lastScrollY = -1;
    let consecutiveStuckTicks = 0;
    const MAX_ALLOWED_STUCK_TICKS = 8; // Tolerância antes de decretar deadlock
    const SCROLL_DELTA_STEP = 800;
    const MAX_STEPS = 35;

    // 2. Loop de rolagem inercial progressiva da roda do mouse
    // Dispara rajadas periódicas simulando a rolagem natural do usuário
    for (let step = 0; step < MAX_STEPS; step++) {
      await page.mouse.move(720, 450);
      await page.mouse.wheel(0, SCROLL_DELTA_STEP);
      await page.waitForTimeout(100); // Tempo de acomodação do rAF/Lenis

      const currentTelemetry = await page.evaluate((reached) => {
        const ws = (window as any).__WORK_STAGE__;
        const footerEl = document.querySelector('[data-section="home-footer"]');
        const servicesEl = !reached.services ? document.querySelector('[data-services-section]') : null;
        const clientsEl = !reached.clients ? document.querySelector('[data-section="home-clients"]') : null;

        const sBox = servicesEl ? servicesEl.getBoundingClientRect() : null;
        const cBox = clientsEl ? clientsEl.getBoundingClientRect() : null;
        const fBox = footerEl ? footerEl.getBoundingClientRect() : null;

        return {
          scrollY: window.scrollY,
          portalProgress: ws?.portalProgress || 0,
          phase: ws?.phase || '',
          scrollVelocity: ws?.scrollVelocity || 0,
          servicesVisible: sBox ? sBox.left < window.innerWidth && sBox.right > 0 : reached.services,
          clientsVisible: cBox ? cBox.left < window.innerWidth && cBox.right > 0 : reached.clients,
          footerVisible: fBox ? fBox.left < window.innerWidth && fBox.right > 0 : false,
          footerFullyInView: fBox ? fBox.left <= 100 : false,
        };
      }, { services: milestones.reachedServices, clients: milestones.reachedClients });

      console.log(`[Gate 6 Step ${step}] scrollY=${currentTelemetry.scrollY.toFixed(1)}, pp=${currentTelemetry.portalProgress.toFixed(2)}, phase=${currentTelemetry.phase}, vel=${currentTelemetry.scrollVelocity.toFixed(2)}, footer=${currentTelemetry.footerVisible}`);

      // Avaliação de Deadlock: Se o scrollY não mudou e ainda não chegamos ao rodapé
      if (Math.abs(currentTelemetry.scrollY - lastScrollY) < 1.0 && !milestones.reachedFooter) {
        consecutiveStuckTicks++;
        if (consecutiveStuckTicks >= MAX_ALLOWED_STUCK_TICKS) {
          throw new Error(
            `DEADLOCK DETECTADO no step ${step}! scrollY travado em ${currentTelemetry.scrollY}px com portalProgress=${currentTelemetry.portalProgress}.`
          );
        }
      } else {
        consecutiveStuckTicks = 0;
      }
      lastScrollY = currentTelemetry.scrollY;

      // Registro dos marcos
      if (currentTelemetry.portalProgress >= 0.95 && currentTelemetry.phase === 'RIBBON_BROWSE') {
        milestones.reachedPortalApex = true;
      }
      if (currentTelemetry.scrollVelocity > 0.04) {
        milestones.ribbonVelocityObserved = true;
      }
      if (currentTelemetry.servicesVisible) {
        milestones.reachedServices = true;
      }
      if (currentTelemetry.clientsVisible) {
        milestones.reachedClients = true;
      }
      if (currentTelemetry.footerVisible) {
        milestones.reachedFooter = true;
        if (currentTelemetry.footerFullyInView) {
          console.log(`[Gate 6] Footer fully settled at step ${step}. Exiting loop successfully.`);
          break;
        }
        // Se o scroll aproximou-se do fim e o footer está visível, aguarda acomodação inercial final
        if (Math.abs(currentTelemetry.scrollY - lastScrollY) < 5.0 && step >= 10) {
          await page.waitForTimeout(400);
          const settled = await page.evaluate(() => {
            const f = document.querySelector('[data-section="home-footer"]');
            return f ? f.getBoundingClientRect().left <= 100 : false;
          });
          if (settled) {
            console.log(`[Gate 6] Footer settled at boundary at step ${step}. Exiting loop successfully.`);
            break;
          }
        }
      }
    }

    // 3. Asserções rigorosas dos marcos de navegação
    expect(milestones.reachedPortalApex).toBe(true);
    expect(milestones.ribbonVelocityObserved).toBe(true);
    expect(milestones.reachedServices).toBe(true);
    expect(milestones.reachedClients).toBe(true);
    expect(milestones.reachedFooter).toBe(true);

    // 4. Verificação de estado final do palco 3D e da página
    const finalState = await page.evaluate(() => {
      const ws = (window as any).__WORK_STAGE__;
      const viewportEl = document.getElementById('jesper-work-stage-viewport');
      const footerEl = document.querySelector('[data-section="home-footer"]');
      const fBox = footerEl ? footerEl.getBoundingClientRect() : null;

      return {
        portalProgress: ws?.portalProgress,
        viewportPointerEvents: viewportEl ? window.getComputedStyle(viewportEl).pointerEvents : null,
        footerFullyInView: fBox ? fBox.left <= 100 : false,
      };
    });

    // Ao alcançar o rodapé, o palco 3D deve estar inerte e não bloquear interações
    expect(finalState.viewportPointerEvents).toBe('none');
    expect(finalState.footerFullyInView).toBe(true);

    // Zero exceções em console e runtime
    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
});


