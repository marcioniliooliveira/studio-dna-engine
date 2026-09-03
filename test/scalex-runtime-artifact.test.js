const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { chromium } = require('playwright');

const siteDir = path.resolve(__dirname, '../clientes/flashtech-caso-04-growth/site');
const htmlPath = path.join(siteDir, 'index.html');
const reviewAssets = [
  '69d88c4d8f905c724ee05c1e_review_20card_20image_203.avif',
  '69d88c4d9ea5b9163355470b_review_20card_20image_205.avif',
  '69d88c4d1e28dbd62b778bc2_review_20card_20image_204.avif'
];
const runtimeBuilder = path.resolve(__dirname, '../scripts/build-scalex-runtime.js');
const remoteReviewAssets = [
  'https://cdn.prod.website-files.com/69a94d5051ada59087892bea/69d88c4d8f905c724ee05c1e_review%20card%20image%203.avif',
  'https://cdn.prod.website-files.com/69a94d5051ada59087892bea/69d88c4d9ea5b9163355470b_review%20card%20image%205.avif',
  'https://cdn.prod.website-files.com/69a94d5051ada59087892bea/69d88c4d1e28dbd62b778bc2_review%20card%20image%204.avif'
];

function startStaticServer(rootDir) {
  const contentTypes = {
    '.avif': 'image/avif',
    '.css': 'text/css',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.png': 'image/png'
  };
  const server = http.createServer((request, response) => {
    const requestPath = new URL(request.url, 'http://127.0.0.1').pathname;
    const relativePath = requestPath === '/' ? 'index.html' : requestPath.slice(1);
    const filePath = path.resolve(rootDir, relativePath);
    if (!filePath.startsWith(`${rootDir}${path.sep}`) && filePath !== path.join(rootDir, 'index.html')) {
      response.writeHead(403).end();
      return;
    }
    if (!fs.existsSync(filePath)) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { 'content-type': contentTypes[path.extname(filePath)] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(response);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

test('SCALEX artifact loads without a WebFont runtime error and uses local review-card assets', async (t) => {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  t.after(() => browser.close());

  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(50);

  assert.equal(
    pageErrors.some((message) => /WebFont is not defined/i.test(message)),
    false,
    `o artefato não pode lançar WebFont sem carregá-lo: ${pageErrors.join('; ')}`
  );

  for (const assetName of reviewAssets) {
    assert.equal(
      fs.existsSync(path.join(siteDir, 'assets', assetName)),
      true,
      `o asset local ${assetName} deve existir`
    );
    assert.match(
      html,
      new RegExp(`src=["']\\./assets/${assetName.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}["']`, 'i'),
      `${assetName} deve ser referenciado localmente pelo artefato`
    );
  }
});

test('SCALEX review-card assets decode when the served artifact brings them into view', async (t) => {
  const server = await startStaticServer(siteDir);
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const targetPaths = new Set(reviewAssets.map((assetName) => `/assets/${assetName}`));
  const requestFailures = [];
  page.on('requestfailed', (request) => {
    if (targetPaths.has(new URL(request.url()).pathname)) requestFailures.push(request.url());
  });
  page.on('response', (response) => {
    if (targetPaths.has(new URL(response.url()).pathname) && response.status() >= 400) {
      requestFailures.push(`${response.status()} ${response.url()}`);
    }
  });
  t.after(async () => {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  });

  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'domcontentloaded' });
  const decoded = await page.evaluate(async (assetNames) => {
    const images = assetNames.map((assetName) => document.querySelector(`img[src="./assets/${assetName}"]`));
    for (const image of images) {
      image.loading = 'eager';
      image.scrollIntoView({ block: 'center' });
    }
    await Promise.all(images.map(async (image) => {
      await image.decode();
      return { complete: image.complete, naturalWidth: image.naturalWidth };
    }));
    return images.map((image) => ({ complete: image.complete, naturalWidth: image.naturalWidth }));
  }, reviewAssets);

  assert.equal(
    decoded.every(({ complete, naturalWidth }) => complete && naturalWidth > 0),
    true,
    `as imagens devem estar completas e decodificadas: ${JSON.stringify(decoded)}`
  );
  assert.deepEqual(requestFailures, []);
});

test('SCALEX 3D heading pairs expose an explicit overlap contract at tablet runtime', async (t) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  t.after(() => browser.close());
  await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(350);

  const headings = await page.evaluate(() => Array.from(document.querySelectorAll('.single-heading-wrap')).map((wrap) => {
    const front = wrap.querySelector('.heading-3d-front .section-heading');
    const back = wrap.querySelector('.heading-3d-back .section-heading');
    return {
      front: front && {
        group: front.getAttribute('data-deep-scrutiny-overlap-group'),
        role: front.getAttribute('data-deep-scrutiny-overlap-role'),
        transform: getComputedStyle(front).transform
      },
      back: back && {
        group: back.getAttribute('data-deep-scrutiny-overlap-group'),
        role: back.getAttribute('data-deep-scrutiny-overlap-role'),
        transform: getComputedStyle(back).transform
      }
    };
  }));

  assert.ok(headings.length > 0, 'SCALEX deve conter headings 3D');
  for (const { front, back } of headings) {
    assert.ok(front && back, 'cada heading 3D deve possuir camadas front/back');
    assert.equal(front.group, back.group);
    assert.equal(front.role, 'front');
    assert.equal(back.role, 'back');
    assert.match(front.transform, /^matrix3d\(/);
    assert.match(back.transform, /^matrix3d\(/);
  }
});

test('SCALEX visible copy has no banned English enterprise tier terms', async (t) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  t.after(() => browser.close());
  await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'domcontentloaded' });
  const visibleText = await page.locator('body').innerText();
  assert.doesNotMatch(visibleText, /\benterprise\b/i);
});

test('SCALEX runtime builder repairs all target defects once and validates an idempotent artifact', (t) => {
  const tempSiteDir = fs.mkdtempSync(path.join(os.tmpdir(), 'scalex-runtime-'));
  const tempAssetsDir = path.join(tempSiteDir, 'assets');
  fs.mkdirSync(tempAssetsDir);
  for (const assetName of reviewAssets) {
    fs.copyFileSync(path.join(siteDir, 'assets', assetName), path.join(tempAssetsDir, assetName));
  }
  let staleHtml = fs.readFileSync(htmlPath, 'utf8');
  reviewAssets.forEach((assetName, index) => {
    staleHtml = staleHtml.replace(`./assets/${assetName}`, remoteReviewAssets[index]);
  });
  staleHtml = staleHtml.replace('</body>', '<script type="text/javascript">WebFont.load({});</script></body>');
  staleHtml = staleHtml.replace('Ahrefs para empresas', 'Ahrefs Enterprise').replace('CORPORATIVO', 'ENTERPRISE');
  fs.writeFileSync(path.join(tempSiteDir, 'index.html'), staleHtml, 'utf8');
  t.after(() => fs.rmSync(tempSiteDir, { recursive: true, force: true }));

  execFileSync(process.execPath, [runtimeBuilder], {
    env: { ...process.env, SCALEX_SITE_DIR: tempSiteDir },
    stdio: 'pipe'
  });
  const repairedHtml = fs.readFileSync(path.join(tempSiteDir, 'index.html'), 'utf8');
  assert.doesNotMatch(repairedHtml, /WebFont\.load/i);
  for (const assetName of reviewAssets) {
    assert.match(repairedHtml, new RegExp(`src=["']\\./assets/${assetName}["']`, 'i'));
  }

  const firstBuild = Buffer.from(repairedHtml);
  execFileSync(process.execPath, [runtimeBuilder, '--check'], {
    env: { ...process.env, SCALEX_SITE_DIR: tempSiteDir },
    stdio: 'pipe'
  });
  assert.deepEqual(fs.readFileSync(path.join(tempSiteDir, 'index.html')), firstBuild);
});
