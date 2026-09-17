/**
 * test/sticky-scroll-integrity.test.js
 * 
 * Teste Permanente de Integridade de Scroll Sticky
 * Garante que os componentes com position: sticky travam no viewport
 * e que nenhum ancestral quebra o scroll container com overflow indevido.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('path');
const { chromium } = require('playwright');

const siteRoot = path.resolve(__dirname, '../clientes/flashtech-caso-04-growth/site');

function startSiteServer() {
  const server = http.createServer((request, response) => {
    const requestPath = new URL(request.url, 'http://127.0.0.1').pathname;
    const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
    const filePath = path.resolve(siteRoot, relativePath);

    if (!filePath.startsWith(siteRoot + path.sep) && filePath !== path.join(siteRoot, 'index.html')) {
      response.writeHead(403).end();
      return;
    }

    fs.readFile(filePath, (error, body) => {
      if (error) {
        response.writeHead(404).end();
        return;
      }
      response.writeHead(200, { 'content-type': filePath.endsWith('.css') ? 'text/css' : 'text/html' });
      response.end(body);
    });
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve(server);
    });
  });
}

test('Sticky Integrity: SCALEX service and insights sections use a local sticky layout stylesheet', async (t) => {
  const server = await startSiteServer();
  t.after(() => new Promise(resolve => server.close(resolve)));

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const blockedStylesheets = [];

  await page.route('https://cdn.prod.website-files.com/**', async route => {
    if (route.request().resourceType() === 'stylesheet') {
      blockedStylesheets.push(route.request().url());
      await route.abort();
      return;
    }
    await route.continue();
  });

  const address = server.address();
  const siteUrl = `http://127.0.0.1:${address.port}/`;
  await page.goto(siteUrl);

  assert.deepEqual(
    blockedStylesheets,
    [],
    `Remote SCALEX stylesheets were blocked: ${blockedStylesheets.join(', ')}`
  );

  await page.waitForFunction(() => {
    const stylesheet = document.querySelector('link[href="assets/vendor/acilav.webflow.shared.379082d56.css"]');
    return stylesheet && stylesheet.sheet;
  });

  const stickyAnalysis = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.service-card, .insight-scroll-area'));
    return cards.map(el => {
      const offending = [];
      let p = el.parentElement;
      while (p && p !== document.documentElement) {
        const ps = window.getComputedStyle(p);
        const ox = ps.overflowX;
        const oy = ps.overflowY;
        if ((ox !== 'visible' && ox !== 'clip') || (oy !== 'visible' && oy !== 'clip')) {
          offending.push({ tag: p.tagName, class: p.className, ox, oy });
        }
        p = p.parentElement;
      }
      return {
        tag: el.tagName,
        class: el.className,
        position: window.getComputedStyle(el).position,
        offendingCount: offending.length,
        offending
      };
    });
  });

  assert.ok(stickyAnalysis.length >= 2, 'Deve encontrar ao menos os cards de serviço e área de insights');
  stickyAnalysis.forEach(item => {
    assert.equal(item.position, 'sticky', `Elemento .${item.class} deve ter position: sticky`);
    assert.equal(item.offendingCount, 0, `Elemento .${item.class} não pode ter ancestrais com overflow!=visible/clip. Encontrados: ${JSON.stringify(item.offending)}`);
  });
});
