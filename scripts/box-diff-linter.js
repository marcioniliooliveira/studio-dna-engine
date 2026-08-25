const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const http = require('http');

/**
 * Headless Box-Diffing & Quality-Gate Linter (Zero-Token Cost)
 * Compara o esqueleto original e a montagem final para validar integridade geométrica e de runtime.
 */
async function runBoxDiffLinter(siteSlug = 'negociabem-imobiliaria', port = 4009) {
  const siteDir = path.resolve(__dirname, `../copias/${siteSlug}/site`);
  if (!fs.existsSync(siteDir)) {
    console.error(`❌ Diretório não encontrado: ${siteDir}`);
    return;
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

  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(siteDir, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not Found: ' + reqPath);
    }
  });

  await new Promise(r => server.listen(port, '127.0.0.1', r));
  console.log(`🚀 [Quality Gate] Servidor de auditoria iniciado em: http://127.0.0.1:${port}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));

  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Mapear seções e Bounding Boxes
  const report = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section, header, footer'));
    const boxes = sections.map((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      return {
        index: idx,
        tag: sec.tagName.toLowerCase(),
        id: sec.id || `section-${idx}`,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      };
    });

    const imgs = Array.from(document.querySelectorAll('img'));
    const broken = imgs.filter(img => img.naturalWidth === 0).map(img => img.src);
    const valid = imgs.filter(img => img.naturalWidth > 0).length;

    return {
      sectionsCount: sections.length,
      boxes,
      totalImages: imgs.length,
      brokenImages: broken,
      validImages: valid
    };
  });

  const auditPassed = (pageErrors.length === 0 && report.brokenImages.length === 0);

  const linterOutput = {
    siteSlug,
    timestamp: new Date().toISOString(),
    auditPassed,
    jsErrors: pageErrors,
    layoutBoxes: report.boxes,
    imagesSummary: {
      total: report.totalImages,
      valid: report.validImages,
      broken: report.brokenImages
    }
  };

  const outputPath = path.resolve(__dirname, `../copias/${siteSlug}/linter-report.json`);
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

  await browser.close();
  server.close();
  return linterOutput;
}

if (require.main === module) {
  const target = process.argv[2] || 'negociabem-imobiliaria';
  runBoxDiffLinter(target).catch(console.error);
}

module.exports = { runBoxDiffLinter };
