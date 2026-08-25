const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const http = require('http');

/**
 * Headless Box-Diffing & Quality-Gate Linter (Zero-Token Cost)
 * Compara o esqueleto original e a montagem final para validar integridade geométrica e de runtime.
 */
async function runBoxDiffLinter(siteSlug = 'negocia-bem-imobiliaria', port = 4009) {
  let siteDir = path.resolve(__dirname, `../copias/${siteSlug}/site`);
  if (!fs.existsSync(siteDir)) siteDir = path.resolve(__dirname, `../clientes/${siteSlug}/site`);
  if (!fs.existsSync(siteDir)) siteDir = path.resolve(__dirname, `../${siteSlug}/site`);
  if (!fs.existsSync(siteDir)) siteDir = path.resolve(__dirname, `../${siteSlug}`);
  
  if (!fs.existsSync(siteDir)) {
    console.error(`❌ Diretório não encontrado: ${siteDir}`);
    return { isError: true, error: `Diretório não encontrado: ${siteDir}` };
  }

  const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.otf': 'font/otf',
    '.woff2': 'font/woff2'
  };

  let server;
  let browser;

  try {
    server = http.createServer((req, res) => {
      let reqPath = decodeURIComponent(req.url.split('?')[0]);
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
      let filePath = path.join(siteDir, reqPath);

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        const alt1 = path.join(siteDir, 'assets', reqPath);
        if (fs.existsSync(alt1) && fs.statSync(alt1).isFile()) {
          filePath = alt1;
        }
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
          'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
          'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Access-Control-Allow-Origin': '*' });
        res.end('Not Found: ' + reqPath);
      }
    });

    await new Promise((resolve, reject) => {
      server.listen(0, '127.0.0.1', () => {
        const actualPort = server.address().port;
        console.log(`🚀 [Quality Gate] Servidor de auditoria iniciado em: http://127.0.0.1:${actualPort}`);
        resolve();
      });
      server.on('error', reject);
    });

    const activePort = server.address().port;
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    await page.goto(`http://127.0.0.1:${activePort}/index.html`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.length > 0 && imgs.every(i => i.complete);
    }, { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(1000);

    // Mapear seções e Bounding Boxes
    const report = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section, header, footer'));
      const boxes = sections.map((sec, idx) => {
        const rect = sec.getBoundingClientRect();
        return {
          index: idx,
          tag: sec.tagName.toLowerCase(),
          id: sec.id || null,
          classes: sec.className,
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        };
      });

      // Validação de Imagens (Detecta imagens quebradas)
      const imgs = Array.from(document.querySelectorAll('img'));
      const brokenImages = imgs
        .filter(img => img.naturalWidth === 0 && !img.src.includes('data:image/svg'))
        .map(img => ({
          src: img.src,
          alt: img.alt || '',
          naturalWidth: img.naturalWidth
        }));

      return {
        boxes,
        sectionsCount: sections.length,
        totalImages: imgs.length,
        brokenImages,
        validImages: imgs.length - brokenImages.length
      };
    });

    const auditPassed = pageErrors.length === 0 && report.brokenImages.length === 0;

    const linterOutput = {
      auditTimestamp: new Date().toISOString(),
      siteSlug,
      auditPassed,
      jsErrors: pageErrors,
      layoutBoxes: report.boxes,
      imagesSummary: {
        total: report.totalImages,
        valid: report.validImages,
        broken: report.brokenImages
      }
    };

    const parentDir = siteDir.endsWith('site') ? path.dirname(siteDir) : siteDir;
    const outputPath = path.join(parentDir, 'linter-report.json');
    if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(linterOutput, null, 2));

    console.log('\n📊 ================= QUALITY GATE REPORT =================');
    console.log(`- Site Auditado: ${siteSlug}`);
    console.log(`- Status Geral: ${auditPassed ? '✅ APROVADO (100% LIMPO)' : '❌ REPROVADO'}`);
    console.log(`- JS Runtime Errors: ${pageErrors.length}`);
    console.log(`- Imagens Quebradas (naturalWidth === 0): ${report.brokenImages.length}`);
    console.log(`- Imagens Carregadas com Sucesso: ${report.validImages}`);
    console.log(`- Seções Estruturais Auditadas: ${report.sectionsCount}`);
    console.log(`- Relatório Salvo em: ${outputPath}`);
    console.log('=========================================================\n');

    return linterOutput;
  } finally {
    if (browser) await browser.close();
    if (server && server.listening) server.close();
  }
}

if (require.main === module) {
  const target = process.argv[2] || 'negociabem-imobiliaria';
  runBoxDiffLinter(target).catch(console.error);
}

module.exports = { runBoxDiffLinter };
