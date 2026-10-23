const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SITE_DIR = path.join(__dirname, 'site');
const PORT = 8091;

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

async function debug() {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto(`http://localhost:${PORT}/index.html`);
  const statusImmediate = await page.evaluate(() => {
    const p = document.getElementById('sitePreloader');
    return {
      exists: !!p,
      isDismissed: p ? p.classList.contains('is-dismissed') : false,
      display: p ? window.getComputedStyle(p).display : null,
      htmlClasses: document.documentElement.className,
      bodyClasses: document.body.className,
      bodyOverflow: window.getComputedStyle(document.body).overflowY
    };
  });
  console.log('Status immediately after goto:', statusImmediate);
  await browser.close();
  server.close();
}
debug();
