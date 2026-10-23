const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SITE_DIR = path.join(__dirname, 'site');
const PORT = 8094;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
  let cleanUrl = decodeURIComponent(req.url.split('?')[0]);
  if (cleanUrl === '/' || cleanUrl === '') cleanUrl = '/index.html';
  const filePath = path.join(SITE_DIR, cleanUrl.replace(/^\//, ''));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('404');
  }
});

async function testTiming() {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ headless: true });
  const preloaderTestPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Navigating...');
  const t0 = Date.now();
  await preloaderTestPage.goto(`http://localhost:${PORT}/index.html`);
  console.log('Goto finished in', Date.now() - t0, 'ms');

  // Attempt wheel scroll while preloader is active
  await preloaderTestPage.mouse.wheel(0, 1200);
  await preloaderTestPage.waitForTimeout(100);

  const scrollYDuringPreload = await preloaderTestPage.evaluate(() => window.scrollY);
  console.log('scrollYDuringPreload:', scrollYDuringPreload);

  // Attempt Tab key while preloader is active
  await preloaderTestPage.keyboard.press('Tab');
  const focusedDuringPreload = await preloaderTestPage.evaluate(() => {
    const active = document.activeElement;
    return active ? active.tagName : '';
  });
  console.log('focusedDuringPreload:', focusedDuringPreload);

  // Wait for preloader to dismiss
  console.log('Waiting for dismiss...');
  await preloaderTestPage.waitForFunction(() => {
    const p = document.getElementById('sitePreloader');
    return p && (p.classList.contains('is-dismissed') || window.getComputedStyle(p).display === 'none');
  }, { timeout: 6000 });
  console.log('Dismissed in', Date.now() - t0, 'ms');

  const scrollYAfterDismiss = await preloaderTestPage.evaluate(() => window.scrollY);
  console.log('scrollYAfterDismiss:', scrollYAfterDismiss);

  await preloaderTestPage.mouse.wheel(0, 500);
  await preloaderTestPage.waitForTimeout(300);
  const scrollYPostDismiss = await preloaderTestPage.evaluate(() => window.scrollY);
  console.log('scrollYPostDismiss:', scrollYPostDismiss);

  await browser.close();
  server.close();
}
testTiming();
