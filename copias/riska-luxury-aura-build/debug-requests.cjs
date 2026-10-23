const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SITE_DIR = path.join(__dirname, 'site');
const PORT = 8093;

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
  
  const reqs = [];
  page.on('request', req => {
    reqs.push({ url: req.url(), t: Date.now() });
  });
  page.on('requestfinished', req => {
    console.log('Finished:', req.url().slice(0, 80), 'in', Date.now() - reqs.find(r => r.url === req.url()).t, 'ms');
  });

  const t0 = Date.now();
  await page.goto(`http://localhost:${PORT}/index.html`);
  console.log('Goto total:', Date.now() - t0, 'ms');
  
  await browser.close();
  server.close();
}
debug();
