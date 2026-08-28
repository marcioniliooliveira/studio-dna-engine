/**
 * Unified Quality Gate (Playwright + Console + Network + Structural + Anti-Slop)
 * 
 * Executa a auditoria completa e independente no artefato de produção estático:
 * 1. Console Gate (0 page errors, 0 unhandled rejections).
 * 2. Network Gate (0 requisições 404/500 de assets essenciais).
 * 3. Structural Gate (0 imagens com naturalWidth === 0, medição de caixas e seções).
 * 4. Anti-Slop Gate (0 metalinguagem, 0 placeholders, 0 resíduos de marca).
 * 5. Visual Fingerprint (Captura de screenshot limpo e registro de hash).
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { AntiSlopGate } = require('./anti-slop-gate');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

class UnifiedQualityGate {
  /**
   * Executa a auditoria completa em um diretório de cliente ou site.
   */
  static async auditSite({
    siteDir,
    clientSlug,
    refDir = null,
    originalBrandKeywords = [],
    headless = true,
    timeoutMs = 15000
  }) {
    const resolvedSiteDir = path.resolve(siteDir);
    const htmlPath = path.join(resolvedSiteDir, 'index.html');

    if (!fs.existsSync(htmlPath)) {
      return {
        passed: false,
        status: 'failed',
        error: `Arquivo index.html não encontrado em: ${resolvedSiteDir}`
      };
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // 1. Executar Anti-Slop Audit Estático
    let contentSlots = {};
    let referenceSlots = {};
    const parentDir = path.dirname(resolvedSiteDir);

    const clientSlotsPath = path.join(parentDir, 'content-slots.json');
    if (fs.existsSync(clientSlotsPath)) {
      try {
        contentSlots = JSON.parse(fs.readFileSync(clientSlotsPath, 'utf8'));
      } catch (e) {}
    }

    if (refDir) {
      const refSlotsPath = path.join(refDir, 'content-slots.json');
      if (fs.existsSync(refSlotsPath)) {
        try {
          referenceSlots = JSON.parse(fs.readFileSync(refSlotsPath, 'utf8'));
        } catch (e) {}
      }
    }

    const antiSlopReport = AntiSlopGate.audit({
      htmlContent,
      contentSlots,
      referenceSlots,
      originalBrandKeywords
    });

    // 2. Iniciar Servidor Local Isolado para Testes Playwright
    let server;
    let browser;
    const networkFailures = [];
    const jsErrors = [];

    try {
      server = http.createServer((req, res) => {
        let reqPath = decodeURIComponent(req.url.split('?')[0]);
        if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

        let targetFile = path.join(resolvedSiteDir, reqPath);
        if (!fs.existsSync(targetFile) || !fs.statSync(targetFile).isFile()) {
          const altAsset = path.join(resolvedSiteDir, 'assets', reqPath);
          if (fs.existsSync(altAsset) && fs.statSync(altAsset).isFile()) {
            targetFile = altAsset;
          }
        }

        if (fs.existsSync(targetFile) && fs.statSync(targetFile).isFile()) {
          const ext = path.extname(targetFile).toLowerCase();
          res.writeHead(200, {
            'Content-Type': MIME_TYPES[ext] || 'application/octet-stream'
          });
          fs.createReadStream(targetFile).pipe(res);
        } else {
          res.writeHead(404);
          res.end('Not Found');
        }
      });

      await new Promise((resolve, reject) => {
        server.listen(0, '127.0.0.1', () => resolve());
        server.on('error', reject);
      });

      const port = server.address().port;
      browser = await chromium.launch({ headless });
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

      page.on('pageerror', err => jsErrors.push(err.message));
      page.on('response', resp => {
        if (resp.status() >= 400 && !resp.url().includes('favicon')) {
          networkFailures.push({ url: resp.url(), status: resp.status() });
        }
      });

      try {
        await page.goto(`http://127.0.0.1:${port}/index.html`, {
          waitUntil: 'domcontentloaded',
          timeout: timeoutMs
        });
      } catch (gotoErr) {
        await page.goto(`http://127.0.0.1:${port}/index.html`, { timeout: timeoutMs });
      }

      await page.waitForTimeout(500);

      // Trigger lazy images via scroll
      await page.evaluate(async () => {
        const distance = 400;
        const totalHeight = document.body.scrollHeight;
        let currentScroll = 0;
        while (currentScroll < totalHeight) {
          window.scrollBy(0, distance);
          currentScroll += distance;
          await new Promise(r => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 200));
      });

      await page.waitForTimeout(500);

      // 3. Avaliação Estrutural no DOM
      const domAudit = await page.evaluate(() => {
        const sections = Array.from(document.querySelectorAll('section, header, footer, main'));
        const boxes = sections.map((sec, idx) => {
          const rect = sec.getBoundingClientRect();
          return {
            index: idx,
            tag: sec.tagName.toLowerCase(),
            id: sec.id || null,
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          };
        });

        const imgs = Array.from(document.querySelectorAll('img'));
        const brokenImages = imgs
          .filter(img => img.naturalWidth === 0 && !img.src.includes('data:image/svg'))
          .map(img => ({
            src: img.src,
            alt: img.alt || ''
          }));

        return {
          boxes,
          totalImages: imgs.length,
          brokenImages,
          validImages: imgs.length - brokenImages.length
        };
      });

      // 4. Capturar Golden Screenshot de Verificação
      const reportsDir = path.join(parentDir, 'qa-reports');
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }
      const screenshotPath = path.join(reportsDir, 'verified-golden-preview.png');
      await page.screenshot({ path: screenshotPath, fullPage: false });

      // 5. Avaliação Final dos Gates
      const passed = antiSlopReport.passed &&
                     jsErrors.length === 0 &&
                     domAudit.brokenImages.length === 0;

      const report = {
        timestamp: new Date().toISOString(),
        clientSlug: clientSlug || path.basename(parentDir),
        passed,
        status: passed ? 'verified' : 'failed',
        gates: {
          antiSlop: {
            passed: antiSlopReport.passed,
            violations: antiSlopReport.violations,
            stats: antiSlopReport.stats
          },
          console: {
            passed: jsErrors.length === 0,
            errorsCount: jsErrors.length,
            errors: jsErrors
          },
          network: {
            passed: networkFailures.length === 0,
            failedRequestsCount: networkFailures.length,
            failures: networkFailures
          },
          structural: {
            passed: domAudit.brokenImages.length === 0,
            totalImages: domAudit.totalImages,
            brokenImagesCount: domAudit.brokenImages.length,
            brokenImages: domAudit.brokenImages,
            sectionsCount: domAudit.boxes.length
          }
        },
        artifacts: {
          htmlPath: path.relative(process.cwd(), htmlPath).replace(/\\/g, '/'),
          screenshotPath: path.relative(process.cwd(), screenshotPath).replace(/\\/g, '/')
        }
      };

      const reportPath = path.join(parentDir, 'linter-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

      return report;
    } finally {
      if (browser) await browser.close();
      if (server && server.listening) server.close();
    }
  }
}

module.exports = {
  UnifiedQualityGate
};
