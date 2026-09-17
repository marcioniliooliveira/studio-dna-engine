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

test('Sticky Integrity: SCALEX sticky layout survives with off-origin stylesheets and scripts blocked', async (t) => {
  const server = await startSiteServer();
  t.after(() => new Promise(resolve => server.close(resolve)));

  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const address = server.address();
  const siteUrl = `http://127.0.0.1:${address.port}/`;
  const siteOrigin = new URL(siteUrl).origin;
  const blockedRemoteRequests = [];

  await page.route('**/*', async route => {
    const request = route.request();
    const resourceType = request.resourceType();
    const isRemoteRuntimeResource =
      (resourceType === 'stylesheet' || resourceType === 'script') &&
      new URL(request.url()).origin !== siteOrigin;

    if (isRemoteRuntimeResource) {
      blockedRemoteRequests.push(request.url());
      await route.abort();
      return;
    }
    await route.continue();
  });

  await page.goto(siteUrl);

  const blockedRemoteDiagnostic = blockedRemoteRequests.length
    ? blockedRemoteRequests.join(', ')
    : 'none';

  try {
    await page.waitForFunction(() => {
      const stylesheet = document.querySelector('link[href="assets/vendor/acilav.webflow.shared.379082d56.css"]');
      return stylesheet && stylesheet.sheet;
    });
  } catch (error) {
    assert.fail(`Local SCALEX stylesheet did not load; blocked off-origin requests: ${blockedRemoteDiagnostic}`);
  }

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

  assert.ok(
    stickyAnalysis.length >= 2,
    `Deve encontrar ao menos os cards de serviço e área de insights. Requests bloqueados: ${blockedRemoteDiagnostic}`
  );
  stickyAnalysis.forEach(item => {
    assert.equal(item.position, 'sticky', `Elemento .${item.class} deve ter position: sticky. Requests bloqueados: ${blockedRemoteDiagnostic}`);
    assert.equal(item.offendingCount, 0, `Elemento .${item.class} não pode ter ancestrais com overflow!=visible/clip. Encontrados: ${JSON.stringify(item.offending)}. Requests bloqueados: ${blockedRemoteDiagnostic}`);
  });
});
