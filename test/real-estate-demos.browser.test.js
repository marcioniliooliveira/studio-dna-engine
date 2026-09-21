const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');

const repoRoot = path.resolve(__dirname, '..');
const siteRoots = {
  integri: path.join(repoRoot, 'clientes', 'integrii-imoveis', 'site'),
  silvio: path.join(repoRoot, 'clientes', 'silvio-iwata-imobiliaria', 'site'),
};
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };

let server;
let baseUrl;

function createStaticServer() {
  return http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const match = pathname.match(/^\/(integri|silvio)(?:\/(.*))?$/);
    if (!match) { response.writeHead(404); response.end('Not found'); return; }
    const root = siteRoots[match[1]];
    const relative = match[2] || 'index.html';
    const file = path.resolve(root, relative);
    if (!file.startsWith(`${root}${path.sep}`) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { response.writeHead(404); response.end('Not found'); return; }
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(response);
  });
}

test.before(async () => {
  server = createStaticServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

async function withPage(options, callback) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(options);
  const requests = [];
  context.on('request', (request) => requests.push(request.url()));
  const page = await context.newPage();
  try {
    await callback(page, requests);
  } finally {
    await browser.close();
  }
}

function assertLocalRequests(requests) {
  for (const request of requests) assert.match(request, /^http:\/\/127\.0\.0\.1:/, `unexpected non-local request: ${request}`);
}

test('Integri keeps intent, hero CTA, progress, and intermediary panel synchronized', async () => {
  await withPage({ viewport: { width: 1440, height: 977 } }, async (page, requests) => {
    await page.goto(`${baseUrl}/integri/`);
    await assertPageBasics(page, 'integrii-imoveis');
    assert.equal(await page.locator('[data-hero-thumbnail]').count(), 3);
    await page.locator('.intent-tab[data-intent-button="2"]').click();
    await page.waitForTimeout(80);
    assert.equal(await page.locator('[data-progress-current]').innerText(), '03');
    assert.equal(await page.locator('[data-hero-cta]').getAttribute('href'), '#intermediary-investir');
    assert.match(await page.locator('[data-hero-title]').innerText(), /Leia a região/);
    assert.equal(await page.locator('[data-progress-fill]').evaluate((node) => node.style.width), '100%');
    await page.locator('[data-autoplay-toggle]').click();
    assert.equal((await page.locator('[data-autoplay-toggle]').innerText()).toLowerCase(), 'retomar');
    assert.equal(await page.locator('[data-autoplay-toggle]').getAttribute('aria-pressed'), 'true');
    await page.locator('[data-hero-cta]').click();
    assert.equal(await page.locator('[data-intermediary-panel="investir"]').isVisible(), true);
    for (const intent of ['comprar', 'alugar', 'investir']) {
      await page.locator(`[data-intent-link="${intent}"]`).first().click();
      assert.equal(await page.locator(`[data-intermediary-panel="${intent}"]`).isVisible(), true);
    }
    assertLocalRequests(requests);
  });
});

test('Integri uses the light mobile reveal and reduced motion stops autoplay', async () => {
  await withPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' }, async (page, requests) => {
    await page.goto(`${baseUrl}/integri/`);
    const clipPath = await page.locator('[data-hero-next]').evaluate((node) => getComputedStyle(node).clipPath);
    assert.equal(clipPath, 'none');
    await page.waitForTimeout(700);
    assert.equal(await page.locator('[data-progress-current]').innerText(), '01');
    assert.equal(await page.locator('[data-intermediary-panel="comprar"]').isVisible(), true);
    assertLocalRequests(requests);
  });
});

test('Silvio preserves scroll sections, local map, intent routing, and property slider', async () => {
  await withPage({ viewport: { width: 1024, height: 900 } }, async (page, requests) => {
    await page.goto(`${baseUrl}/silvio/`);
    await assertPageBasics(page, 'silvio-iwata-imobiliaria');
    assert.equal(await page.locator('[data-scroll-rail]').count(), 1);
    await page.locator('[data-intent-button="2"]').first().click();
    assert.equal(await page.locator('[data-hero-cta]').getAttribute('href'), '#intermediary-investir');
    assert.match(await page.locator('[data-hero-title]').innerText(), /consistência/);
    await page.locator('[data-slide-button="1"]').click();
    assert.equal(await page.locator('[data-property-slide="1"]').isVisible(), true);
    await page.locator('[data-property-slide="1"] .text-link').click();
    assert.equal(await page.locator('[data-intermediary-panel="alugar"]').isVisible(), true);
    for (const [index, intent] of [['0', 'comprar'], ['1', 'alugar'], ['2', 'investir']]) {
      await page.locator(`[data-slide-button="${index}"]`).click();
      await page.locator(`[data-property-slide="${index}"] .text-link`).click();
      assert.equal(await page.locator(`[data-intermediary-panel="${intent}"]`).isVisible(), true);
    }
    await page.locator('#region').scrollIntoViewIfNeeded();
    assert.equal(await page.locator('[data-scroll-section="map"] img').isVisible(), true);
    assert.notEqual(await page.locator('[data-scroll-active]').innerText(), '01');
    await page.locator('[data-scroll-section="reveal"]').scrollIntoViewIfNeeded();
    const revealTransform = await page.locator('[data-scroll-section="reveal"] img').evaluate((node) => getComputedStyle(node).transform);
    assert.notEqual(revealTransform, 'none');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    assert.equal(overflow, true);
    assertLocalRequests(requests);
  });
});

async function assertPageBasics(page, client) {
  assert.equal(await page.locator(`body[data-client="${client}"]`).count(), 1);
  assert.equal(await page.locator('.wordmark').count() > 0, true);
  assert.equal(await page.locator('.skip-link[href="#main-content"]').count(), 1);
  assert.equal(await page.locator('#main-content').count(), 1);
  assert.equal(await page.locator('img').count() > 0, true);
  assert.equal(await page.locator('a[data-intent-link]').count() > 0, true);
  assert.equal(await page.locator('text=imagem demonstrativa').count() > 0, true);
}
