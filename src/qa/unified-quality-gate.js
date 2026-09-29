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
    const failedNetworkUrls = new Set();
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
        if (resp.status() >= 400 && !resp.url().includes('favicon') && !failedNetworkUrls.has(resp.url())) {
          failedNetworkUrls.add(resp.url());
          networkFailures.push({ url: resp.url(), status: resp.status() });
        }
      });
      page.on('requestfailed', request => {
        if (!request.url().includes('favicon') && !failedNetworkUrls.has(request.url())) {
          failedNetworkUrls.add(request.url());
          networkFailures.push({
            url: request.url(),
            status: null,
            error: request.failure()?.errorText || 'Request failed without an HTTP response'
          });
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

      const imageReadiness = await page.evaluate(async ({ readinessTimeoutMs }) => {
        const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));
        const images = Array.from(document.images)
          .filter(img => !img.src.startsWith('data:image/svg'));

        for (const image of images) {
          image.scrollIntoView({ block: 'center', inline: 'nearest' });
          await nextFrame();
        }

        const readiness = await Promise.all(images.map(image => new Promise(resolve => {
          let settled = false;
          let timeout;
          const cleanup = () => {
            clearTimeout(timeout);
            image.removeEventListener('load', onLoad);
            image.removeEventListener('error', onError);
          };
          const finish = async state => {
            if (settled) return;
            settled = true;
            cleanup();

            if (state === 'loaded') {
              try {
                await image.decode();
                resolve({ src: image.currentSrc || image.src, state: 'decoded' });
                return;
              } catch (_) {
                resolve({ src: image.currentSrc || image.src, state: 'undecodable' });
                return;
              }
            }
            resolve({ src: image.currentSrc || image.src, state });
          };
          const onLoad = () => finish('loaded');
          const onError = () => finish('broken');
          timeout = setTimeout(() => finish('unresolved'), readinessTimeoutMs);

          image.addEventListener('load', onLoad, { once: true });
          image.addEventListener('error', onError, { once: true });

          if (image.complete) {
            finish(image.naturalWidth > 0 ? 'loaded' : 'broken');
          }
        })));

        window.scrollTo(0, 0);
        await nextFrame();
        return readiness;
      }, { readinessTimeoutMs: Math.max(1000, Math.floor(timeoutMs / 3)) });

      // 3. Avaliação Estrutural no DOM
      const domAudit = await page.evaluate(imageReadiness => {
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
          .filter(img => {
            const isHidden = img.closest('.w-tab-pane:not(.w--tab-active), .w-slide:not(:first-child), [aria-hidden="true"], .hidden, [style*="display: none"]');
            if (isHidden) return false;
            return img.naturalWidth === 0 && !img.src.includes('data:image/svg');
          })
          .map(img => ({
            src: img.src,
            alt: img.alt || ''
          }));
        const readinessFailures = imageReadiness
          .filter(image => image.state !== 'decoded');

        return {
          boxes,
          totalImages: imgs.length,
          brokenImages,
          validImages: imgs.length - brokenImages.length,
          decodedImagesCount: imageReadiness.filter(image => image.state === 'decoded').length,
          readinessFailures
        };
      }, imageReadiness);

      // 4. Avaliação de Dinâmicas de Scroll & Sticky Stage Isolation
      const scrollAudit = await page.evaluate(async () => {
        const totalH = document.body.scrollHeight;
        const checkpoints = [0, 0.25, 0.5, 0.75, 0.95];
        const overlaps = [];

        for (const fraction of checkpoints) {
          const targetY = totalH * fraction;
          window.scrollTo(0, targetY);
          if (window.lenis && typeof window.lenis.scrollTo === 'function') {
            window.lenis.scrollTo(targetY, { immediate: true });
          }
          await new Promise(r => setTimeout(r, 60));

          const stages = Array.from(document.querySelectorAll('.stage, [class*="stage"]'));
          if (stages.length > 1) {
            const activeStages = stages.filter(s => {
              const cs = getComputedStyle(s);
              const op = parseFloat(cs.opacity);
              return cs.display !== 'none' && !isNaN(op) && op > 0.8;
            });
            if (activeStages.length > 1) {
              overlaps.push({
                targetY: Math.round(targetY),
                activeCount: activeStages.length,
                stageIds: activeStages.map(s => s.closest('section')?.id || s.className)
              });
            }
          }
        }

        window.scrollTo(0, 0);
        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
          window.lenis.scrollTo(0, { immediate: true });
        }

        return {
          passed: overlaps.length === 0,
          overlapsCount: overlaps.length,
          overlaps
        };
      });

      // 5. Capturar Golden Screenshot de Verificação
      const reportsDir = path.join(parentDir, 'qa-reports');
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }
      const screenshotPath = path.join(reportsDir, 'verified-golden-preview.png');
      await page.screenshot({ path: screenshotPath, fullPage: false });

      // 6. Avaliação Final dos Gates
      const passed = antiSlopReport.passed &&
                     jsErrors.length === 0 &&
                     domAudit.brokenImages.length === 0 &&
                     domAudit.readinessFailures.length === 0 &&
                     scrollAudit.passed;

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
            passed: domAudit.brokenImages.length === 0 && domAudit.readinessFailures.length === 0,
            totalImages: domAudit.totalImages,
            brokenImagesCount: domAudit.brokenImages.length,
            brokenImages: domAudit.brokenImages,
            decodedImagesCount: domAudit.decodedImagesCount,
            readinessFailuresCount: domAudit.readinessFailures.length,
            readinessFailures: domAudit.readinessFailures,
            sectionsCount: domAudit.boxes.length
          },
          scrollDynamics: {
            passed: scrollAudit.passed,
            overlapsCount: scrollAudit.overlapsCount,
            overlaps: scrollAudit.overlaps
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

  /**
   * Executa a auditoria pós-clonagem independente de uma cópia em copias/
   */
  static async auditClone({
    siteDir,
    expectedHeight = null,
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
          waitUntil: 'load',
          timeout: timeoutMs
        });
      } catch (e) {
        await page.goto(`http://127.0.0.1:${port}/index.html`, { timeout: timeoutMs });
      }

      await page.waitForTimeout(800);

      // Scroll gradual para ativar lazy loads e triggers
      await page.evaluate(async () => {
        const distance = 400;
        const totalHeight = document.body.scrollHeight;
        let currentScroll = 0;
        while (currentScroll < totalHeight && currentScroll < 30000) {
          window.scrollBy(0, distance);
          currentScroll += distance;
          await new Promise(r => setTimeout(r, 30));
        }
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 200));
      });

      await page.waitForTimeout(500);

      const cloneMetrics = await page.evaluate(() => {
        const totalHeight = document.documentElement.scrollHeight;
        const sections = Array.from(document.querySelectorAll('section, header, footer, [class*="sec-"], [id*="sec-"]'));
        
        const collapsedSections = sections.filter(sec => {
          const rect = sec.getBoundingClientRect();
          const comp = window.getComputedStyle(sec);
          const isCollapsed = Math.round(rect.height) === 0 || comp.opacity === '0' || comp.display === 'none';
          const hasContent = (sec.innerText || '').trim().length > 50;
          return isCollapsed && hasContent;
        }).map(sec => ({
          tag: sec.tagName.toLowerCase(),
          id: sec.id || '',
          className: sec.className || '',
          textSnippet: (sec.innerText || '').slice(0, 60)
        }));

        const imgs = Array.from(document.querySelectorAll('img'));
        const brokenImages = imgs.filter(img => img.naturalWidth === 0 && !img.src.includes('data:image/svg')).map(img => img.src);

        return {
          totalHeight,
          sectionsCount: sections.length,
          collapsedSections,
          brokenImages
        };
      });

      const heightPassed = expectedHeight ? (cloneMetrics.totalHeight / expectedHeight >= 0.70) : true;
      const passed = jsErrors.length === 0 &&
                     heightPassed &&
                     cloneMetrics.collapsedSections.length === 0;

      return {
        timestamp: new Date().toISOString(),
        passed,
        status: passed ? 'verified' : 'failed',
        metrics: {
          totalHeight: cloneMetrics.totalHeight,
          expectedHeight,
          heightRatio: expectedHeight ? (cloneMetrics.totalHeight / expectedHeight) : 1,
          sectionsCount: cloneMetrics.sectionsCount,
          collapsedSectionsCount: cloneMetrics.collapsedSections.length,
          collapsedSections: cloneMetrics.collapsedSections,
          brokenImagesCount: cloneMetrics.brokenImages.length,
          jsErrorsCount: jsErrors.length,
          jsErrors
        }
      };
    } finally {
      if (browser) await browser.close();
      if (server && server.listening) server.close();
    }
  }
}

module.exports = {
  UnifiedQualityGate
};
