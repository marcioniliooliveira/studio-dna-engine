/**
 * src/qa/deep-scrutiny-gate.js
 * 
 * Suíte Independente de Escrutínio e Auditoria Visual/Funcional (Inspirada no Kombai)
 * Implementa 7 Vetores de Averiguação Implacável no Chromium Headless via CDP:
 * 1. Matriz Geométrica AABB Multi-Viewport (Detecção de colisão/sobreposição de texto).
 * 2. Detecção de Leaks de Estado Interativo (Hover travado em repouso).
 * 3. Escrutínio Léxico / Language Leak Gate (Varredura de resíduos em inglês).
 * 4. Detecção de Vazamento de Layout / Overflow Horizontal no Mobile/Tablet.
 * 5. Integridade Funcional de Links e Alvos de Âncora (#id existente no DOM).
 * 6. Integridade Ativa de Scroll Sticky (Garantia de 0 ancestrais quebrando o container de scroll).
 * 7. Hit-Testing Real de Alvos de Clique (Detecção de Click Hijacking / Camadas Invisíveis Intrusas).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

const BANNED_ENGLISH_TERMS = [
  'results-driven',
  'traffic growth',
  'keyword rankings',
  'lead generation',
  'conversion improvement',
  'proven results',
  'data-driven approach',
  'transparent reporting',
  'dedicated support',
  'long-term growth',
  'website seo audit',
  'on-page seo',
  'technical seo',
  'everything in starter',
  'book strategy call',
  'ask a question',
  'subscribe now',
  'submit now',
  'seo insights',
  'link building strategies',
  'local seo for small businesses',
  'the importance of keyword research',
  'starter',
  'enterprise',
  'our result',
  'choose us',
  'seo querie'
];

class DeepScrutinyGate {
  /**
   * Executa a auditoria completa de escrutínio no site indicado.
   */
  static async audit({
    siteDir,
    clientSlug,
    targetLanguage = 'pt-BR',
    viewports = [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 812 }
    ],
    headless = true
  }) {
    const resolvedSiteDir = path.resolve(siteDir);
    if (!fs.existsSync(resolvedSiteDir)) {
      throw new Error(`Diretório do site não encontrado: ${resolvedSiteDir}`);
    }

    // 1. Iniciar servidor local estrito
    const server = http.createServer((req, res) => {
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
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        fs.createReadStream(targetFile).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });

    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;

    const browser = await chromium.launch({ headless });
    const results = {
      timestamp: new Date().toISOString(),
      clientSlug: clientSlug || path.basename(resolvedSiteDir),
      passed: true,
      vetores: {
        aabbOverlap: { passed: true, collisionsCount: 0, collisions: [] },
        stuckHoverState: { passed: true, leaksCount: 0, leaks: [] },
        languageLeak: { passed: true, untranslatedCount: 0, findings: [] },
        layoutBleed: { passed: true, bleedingElementsCount: 0, bleeding: [] },
        anchorIntegrity: { passed: true, brokenAnchorsCount: 0, brokenAnchors: [] },
        stickyIntegrity: { passed: true, brokenStickyCount: 0, brokenStickies: [] },
        clickHijack: { passed: true, hijackedCount: 0, hijackedTargets: [] },
        scrollScrubber: { passed: true, collisionsCount: 0, collisions: [] }
      }
    };

    try {
      const page = await browser.newPage({ viewport: viewports[0] });

      // Navegar para o site
      await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600);

      // Detecção adaptativa de Renderizador (Hardware GPU vs SwiftShader/Mesa em CI Linux)
      const rendererProfile = await page.evaluate(() => {
        try {
          const canvas = document.createElement('canvas');
          const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
          if (!gl) return { isSoftware: true, renderer: 'no-webgl' };
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
          const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : '';
          const isSoftware = /swiftshader|llvmpipe|softpipe|software rasterizer|mesa/i.test(renderer) ||
                             /google swiftshader/i.test(vendor);
          return { isSoftware, renderer, vendor };
        } catch (e) {
          return { isSoftware: true, renderer: 'error' };
        }
      });

      // =========================================================================
      // VETOR 1: Matriz AABB de Colisão de Texto (Multi-Viewport)
      // =========================================================================
      for (const vp of viewports) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(300);

        const aabbCollisions = await page.evaluate(({ vpName, isSoftware }) => {
          const collisions = [];
          const textContainers = Array.from(document.querySelectorAll(
            '.nav-link, .primary-btn, .single-heading-wrap, .value-card, .result-card, .pricing-card, h1, h2, h3, h4, .nb-state, .s02-story, .faq-line'
          ));

          textContainers.forEach(container => {
            const children = Array.from(container.querySelectorAll('*')).filter(el => {
              const style = window.getComputedStyle(el);
              const rect = el.getBoundingClientRect();
              const hasText = el.textContent.trim().length > 0 && el.children.length === 0;
              const isInert = el.closest('[inert]') || el.hasAttribute('inert');
              return hasText &&
                     !isInert &&
                     style.visibility !== 'hidden' &&
                     parseFloat(style.opacity || '1') > 0.1 &&
                     rect.width > 0 && rect.height > 0;
            });

            for (let i = 0; i < children.length; i++) {
              for (let j = i + 1; j < children.length; j++) {
              const a = children[i];
              const b = children[j];
              const rA = a.getBoundingClientRect();
              const rB = b.getBoundingClientRect();
                const getOverlapContract = (element) => {
                  let current = element;
                  while (current && current !== document.documentElement) {
                    const group = current.getAttribute('data-deep-scrutiny-overlap-group');
                    const role = current.getAttribute('data-deep-scrutiny-overlap-role');
                    if (group && role) return { node: current, group, role };
                    current = current.parentElement;
                  }
                  return null;
                };
                const contractA = getOverlapContract(a);
                const contractB = getOverlapContract(b);
                const overlapGroupA = contractA && contractA.group;
                const overlapGroupB = contractB && contractB.group;
                const overlapRoleA = contractA && contractA.role;
                const overlapRoleB = contractB && contractB.role;
                const complementaryRoles = (overlapRoleA === 'front' && overlapRoleB === 'back') ||
                  (overlapRoleA === 'back' && overlapRoleB === 'front');
                const has3dTransform = [a, b, contractA && contractA.node, contractB && contractB.node]
                  .filter(Boolean)
                  .some((element) => window.getComputedStyle(element).transform.startsWith('matrix3d('));
                const intentionalOverlap = overlapGroupA !== null && overlapGroupA !== '' && overlapGroupA === overlapGroupB &&
                  complementaryRoles && has3dTransform;

                // Calibração óptica adaptativa para SwiftShader / Software em CI Linux
                const epsilonX = isSoftware ? 2.0 : 0.0;
                const epsilonY = isSoftware ? 1.0 : 0.0;
                const thresholdArea = isSoftware ? 60 : 20;

                const xOverlap = Math.max(0, Math.min(rA.right, rB.right) - Math.max(rA.left, rB.left) - epsilonX);
                const yOverlap = Math.max(0, Math.min(rA.bottom, rB.bottom) - Math.max(rA.top, rB.top) - epsilonY);
                const overlapArea = xOverlap * yOverlap;

                if (overlapArea > thresholdArea && !intentionalOverlap) {
                  collisions.push({
                    viewport: vpName,
                    containerClass: container.className,
                    elementA: { tag: a.tagName, class: a.className, text: a.textContent.trim().slice(0, 30) },
                    elementB: { tag: b.tagName, class: b.className, text: b.textContent.trim().slice(0, 30) },
                    overlapArea: Math.round(overlapArea)
                  });
                }
              }
            }
          });

          return collisions;
        }, { vpName: vp.name, isSoftware: rendererProfile.isSoftware });

        if (aabbCollisions.length > 0) {
          results.vetores.aabbOverlap.passed = false;
          results.vetores.aabbOverlap.collisionsCount += aabbCollisions.length;
          results.vetores.aabbOverlap.collisions.push(...aabbCollisions);
        }
      }

      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(300);

      // =========================================================================
      // VETOR 2: Detecção de Leaks de Estado Interativo (Stuck Hover)
      // =========================================================================
      const stuckHoverLeaks = await page.evaluate(() => {
        const leaks = [];
        const hoverLayers = Array.from(document.querySelectorAll(
          '.is-absolute, .primary-btn-text.is-absolute, .nav-link-text.is-absolute'
        ));

        hoverLayers.forEach(el => {
          const style = window.getComputedStyle(el);
          const opacity = parseFloat(style.opacity || '1');
          const visibility = style.visibility;
          const rect = el.getBoundingClientRect();

          if (visibility !== 'hidden' && opacity > 0.1 && rect.width > 0 && rect.height > 0) {
            leaks.push({
              tag: el.tagName,
              class: el.className,
              parentClass: el.parentElement ? el.parentElement.className : '',
              text: el.textContent.trim().slice(0, 40),
              opacity,
              visibility
            });
          }
        });

        return leaks;
      });

      if (stuckHoverLeaks.length > 0) {
        results.vetores.stuckHoverState.passed = false;
        results.vetores.stuckHoverState.leaksCount = stuckHoverLeaks.length;
        results.vetores.stuckHoverState.leaks = stuckHoverLeaks;
      }

      // =========================================================================
      // VETOR 3: Escrutínio Léxico & Language Leak Gate
      // =========================================================================
      const languageFindings = await page.evaluate((bannedList) => {
        const findings = [];
        const allElements = Array.from(document.querySelectorAll('*'));

        allElements.forEach(el => {
          if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'LINK'].includes(el.tagName)) return;
          const directText = Array.from(el.childNodes)
            .filter(n => n.nodeType === 3)
            .map(n => n.textContent.trim())
            .join(' ');

          if (!directText || directText.length < 3) return;

          const lower = directText.toLowerCase();
          for (const term of bannedList) {
            if (lower.includes(term.toLowerCase())) {
              findings.push({
                tag: el.tagName,
                class: el.className,
                matchedTerm: term,
                snippet: directText.slice(0, 80)
              });
              break;
            }
          }
        });

        return findings;
      }, BANNED_ENGLISH_TERMS);

      if (languageFindings.length > 0) {
        results.vetores.languageLeak.passed = false;
        results.vetores.languageLeak.untranslatedCount = languageFindings.length;
        results.vetores.languageLeak.findings = languageFindings;
      }

      // =========================================================================
      // VETOR 4: Vazamento de Layout & Overflow Horizontal (Mobile 375px)
      // =========================================================================
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(300);

      const bleedReport = await page.evaluate(() => {
        const viewportWidth = window.innerWidth;
        const scrollWidth = document.documentElement.scrollWidth;

        // Simulação sintética de rolagem horizontal forçada
        window.scrollTo(500, 0);
        const actualHorizontalScroll = window.scrollX;
        window.scrollTo(0, 0);

        const hasHorizontalLeak = scrollWidth > viewportWidth + 1 || actualHorizontalScroll > 0;

        const culprits = [];
        if (hasHorizontalLeak) {
          document.querySelectorAll('section, header, footer, .container, .padding-global, main, div').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > viewportWidth + 1) {
              culprits.push({ tag: el.tagName, class: el.className, right: Math.round(r.right), overflow: Math.round(r.right - viewportWidth) });
            }
          });
        }

        return {
          hasHorizontalLeak,
          scrollWidth,
          viewportWidth,
          actualHorizontalScroll,
          overflowPixels: Math.max(0, scrollWidth - viewportWidth),
          culprits: culprits.slice(0, 5)
        };
      });

      if (bleedReport.hasHorizontalLeak) {
        results.vetores.layoutBleed.passed = false;
        results.vetores.layoutBleed.bleedingElementsCount = bleedReport.culprits.length || 1;
        results.vetores.layoutBleed.bleeding = [bleedReport];
      }

      // Voltar a 1440px
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(300);

      // =========================================================================
      // VETOR 5: Integridade Funcional de Links e Alvos
      // =========================================================================
      const brokenAnchors = await page.evaluate(() => {
        const broken = [];
        const links = Array.from(document.querySelectorAll('a[href]'));

        links.forEach(a => {
          const href = a.getAttribute('href');
          if (href && href.startsWith('#') && href.length > 1) {
            const targetId = href.substring(1);
            const targetEl = document.getElementById(targetId);
            if (!targetEl) {
              broken.push({
                linkText: a.textContent.trim().slice(0, 30),
                href,
                missingId: targetId
              });
            }
          }
        });

        return broken;
      });

      if (brokenAnchors.length > 0) {
        results.vetores.anchorIntegrity.passed = false;
        results.vetores.anchorIntegrity.brokenAnchorsCount = brokenAnchors.length;
        results.vetores.anchorIntegrity.brokenAnchors = brokenAnchors;
      }

      // =========================================================================
      // VETOR 6: Integridade Ativa de Scroll Sticky
      // =========================================================================
      const stickyResults = await page.evaluate(() => {
        const broken = [];
        const allElements = Array.from(document.querySelectorAll('*'));
        const stickyElements = allElements.filter(el => {
          const style = window.getComputedStyle(el);
          return style.position === 'sticky' || style.position === '-webkit-sticky';
        });

        stickyElements.forEach(el => {
          const offendingAncestors = [];
          let p = el.parentElement;
          while (p && p !== document.documentElement) {
            const ps = window.getComputedStyle(p);
            const isIntentionalScrollSurface = p.hasAttribute('data-scroll-container') ||
                                              p.getAttribute('role') === 'dialog' ||
                                              p.getAttribute('aria-modal') === 'true' ||
                                              (ps.position === 'fixed' && (ps.overflowY === 'auto' || ps.overflowY === 'scroll'));

            if (isIntentionalScrollSurface) {
              // Superfície de scroll intencional (ex: modal/dialog isolado). Elemento sticky ancora nela.
              break;
            }

            // Qualquer overflow diferente de visible (exceto clip no html/body) anula o container de scroll
            const ox = ps.overflowX;
            const oy = ps.overflowY;
            if ((ox !== 'visible' && ox !== 'clip') || (oy !== 'visible' && oy !== 'clip')) {
              offendingAncestors.push({
                tag: p.tagName,
                class: p.className,
                overflowX: ox,
                overflowY: oy
              });
            }
            p = p.parentElement;
          }

          if (offendingAncestors.length > 0) {
            broken.push({
              tag: el.tagName,
              class: el.className,
              offendingAncestorsCount: offendingAncestors.length,
              offendingAncestors
            });
          }
        });

        return broken;
      });

      if (stickyResults.length > 0) {
        results.vetores.stickyIntegrity.passed = false;
        results.vetores.stickyIntegrity.brokenStickyCount = stickyResults.length;
        results.vetores.stickyIntegrity.brokenStickies = stickyResults;
      }

      // =========================================================================
      // VETOR 7: Hit-Testing Real de Alvos de Clique (Click Hijack Detection)
      // =========================================================================
      const hijackedTargets = await page.evaluate(() => {
        const hijacked = [];
        const interactiveButtons = Array.from(document.querySelectorAll(
          'a.primary-btn, button[type="submit"], .nav-link, [data-deep-scrutiny-click-target]'
        )).filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden';
        });

        interactiveButtons.forEach(btn => {
          const rect = btn.getBoundingClientRect();
          const centerX = Math.round(rect.left + rect.width / 2);
          const centerY = Math.round(rect.top + rect.height / 2);

          const hitElement = document.elementFromPoint(centerX, centerY);
          if (!hitElement) return;

          const isSelfOrChild = btn.contains(hitElement);
          if (!isSelfOrChild) {
            hijacked.push({
              buttonText: btn.textContent.trim().slice(0, 30),
              buttonClass: btn.className,
              obscuredBy: {
                tag: hitElement.tagName,
                class: hitElement.className,
                id: hitElement.id || null
              }
            });
          }
        });

        return hijacked;
      });

      if (hijackedTargets.length > 0) {
        results.vetores.clickHijack.passed = false;
        results.vetores.clickHijack.hijackedCount = hijackedTargets.length;
        results.vetores.clickHijack.hijackedTargets = hijackedTargets;
      }

      // =========================================================================
      // VETOR 8: Varredura Dinâmica de Scroll & Invariante de Seções (ScrollScrubber)
      // =========================================================================
      const scrollScrubberResults = await page.evaluate(async () => {
        const collisions = [];
        const sections = Array.from(document.querySelectorAll('section[id], header, footer, main > section'));
        if (sections.length < 2) return { passed: true, collisionsCount: 0, collisions: [] };

        const stickyElements = Array.from(document.querySelectorAll('*')).filter(el => {
          const pos = window.getComputedStyle(el).position;
          return pos === 'sticky' || pos === '-webkit-sticky' || el.classList.contains('pin-spacer');
        });

        const totalHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        const viewportHeight = window.innerHeight;
        const step = 250;

        for (let y = 0; y <= totalHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise(r => requestAnimationFrame(r));

          // Aferir se elementos sticky de uma seção invadem o conteúdo visível de seções posteriores
          for (const stickyEl of stickyElements) {
            const parentSection = stickyEl.closest('section, header, footer');
            if (!parentSection) continue;

            const stickyRect = stickyEl.getBoundingClientRect();
            if (stickyRect.width === 0 || stickyRect.height === 0) continue;
            if (stickyRect.bottom <= 0 || stickyRect.top >= viewportHeight) continue;

            // Comparar com todas as seções que vêm DEPOIS da parentSection no DOM
            let subsequent = parentSection.nextElementSibling;
            while (subsequent) {
              if (subsequent.matches('section, footer') && subsequent.id !== 'modal' && !subsequent.getAttribute('aria-modal')) {
                const subRect = subsequent.getBoundingClientRect();
                if (subRect.top < viewportHeight && subRect.bottom > 0) {
                  // Verificar se o stickyEl sobrepõe elementos tipográficos ou interativos da seção posterior
                  const subTexts = Array.from(subsequent.querySelectorAll('h1, h2, h3, h4, p, strong, button')).filter(t => {
                    const r = t.getBoundingClientRect();
                    return r.width > 0 && r.height > 0 && r.top < viewportHeight && r.bottom > 0;
                  });

                  for (const textEl of subTexts) {
                    const tr = textEl.getBoundingClientRect();
                    const xOverlap = Math.max(0, Math.min(stickyRect.right, tr.right) - Math.max(stickyRect.left, tr.left));
                    const yOverlap = Math.max(0, Math.min(stickyRect.bottom, tr.bottom) - Math.max(stickyRect.top, tr.top));
                    const overlapArea = xOverlap * yOverlap;

                    if (overlapArea > 100) {
                      collisions.push({
                        scrollY: y,
                        stickyElement: { tag: stickyEl.tagName, class: stickyEl.className },
                        invadedSection: subsequent.id || subsequent.tagName,
                        collidedWith: { tag: textEl.tagName, text: textEl.textContent.trim().slice(0, 35) },
                        overlapArea: Math.round(overlapArea)
                      });
                      break;
                    }
                  }
                }
              }
              subsequent = subsequent.nextElementSibling;
            }
          }
        }

        window.scrollTo(0, 0);
        return {
          passed: collisions.length === 0,
          collisionsCount: collisions.length,
          collisions
        };
      });

      if (scrollScrubberResults.collisionsCount > 0) {
        results.vetores.scrollScrubber.passed = false;
        results.vetores.scrollScrubber.collisionsCount = scrollScrubberResults.collisionsCount;
        results.vetores.scrollScrubber.collisions = scrollScrubberResults.collisions;
      }

      // Avaliação Geral de Todos os Vetores
      results.passed = results.vetores.aabbOverlap.passed &&
                       results.vetores.stuckHoverState.passed &&
                       results.vetores.languageLeak.passed &&
                       results.vetores.layoutBleed.passed &&
                       results.vetores.anchorIntegrity.passed &&
                       results.vetores.stickyIntegrity.passed &&
                       results.vetores.clickHijack.passed &&
                       results.vetores.scrollScrubber.passed;

    } finally {
      await browser.close();
      server.close();
    }

    return results;
  }
}

module.exports = { DeepScrutinyGate };
