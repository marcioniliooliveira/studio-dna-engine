const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const siteDir = path.resolve('clientes/marcionilio-oliveira/site');
const MIME_TYPES = {
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

const server = http.createServer((req, res) => {
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
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

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
    res.end('Not found');
  }
});

async function run() {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log('Server running at', baseUrl);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', (msg) => {
    if (msg.type() !== 'warning') {
      console.log('[PAGE]', msg.type(), msg.text());
    }
  });
  page.on('pageerror', (err) => console.error('[PAGE ERROR]', err));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

  await page.waitForFunction(() => {
    const ws = window.__WORK_STAGE__;
    return ws && ws.webglReady === true;
  }, null, { timeout: 20000 });
  console.log('webglReady confirmed');

  await page.waitForFunction(() => {
    const de = document.documentElement;
    return !de.classList.contains('lenis-locked') && de.style.overflow !== 'hidden';
  }, null, { timeout: 30000 });
  console.log('Lenis unlocked');

  // Let's inspect ScrollTrigger and timeline markers
  const markers = await page.evaluate(() => {
    const el = document.querySelector('[data-horizontal-pin]');
    return {
      scrollY: window.scrollY,
      innerH: window.innerHeight,
      hasScrollTrigger: typeof window.ScrollTrigger !== 'undefined',
      workStage: window.__WORK_STAGE__ ? {
        phase: window.__WORK_STAGE__.phase,
        portalProgress: window.__WORK_STAGE__.portalProgress
      } : null
    };
  });
  console.log('Initial markers:', JSON.stringify(markers));

  for (let step = 0; step < 6; step++) {
    console.log(`--- Starting step ${step} ---`);
    await page.mouse.move(720, 450);
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(200);

    console.log(`Evaluating telemetry for step ${step}...`);
    const telem = await Promise.race([
      page.evaluate(() => {
        const ws = window.__WORK_STAGE__;
        return {
          scrollY: window.scrollY,
          pp: ws ? ws.portalProgress : null,
          phase: ws ? ws.phase : null,
          vel: ws ? ws.scrollVelocity : null,
          clip: document.getElementById('jesper-work-stage-viewport')?.style.clipPath
        };
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('evaluate TIMEOUT 5s')), 5000))
    ]).catch(err => ({ error: err.message }));

    console.log(`Step ${step} result:`, JSON.stringify(telem));
    if (telem.error) {
      console.log('Deadlock/freeze encountered! Step', step);
      break;
    }
  }

  await browser.close();
  server.close();
}

run().catch(console.error);
