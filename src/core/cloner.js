const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { loadConfig } = require('../config');
const { getSiteSlug, normalizeUrl } = require('../utils/helpers');

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

/**
 * Clona estrutura bruta de HTML, CSS, fontes e mídias do site
 */
async function cloneSite(rawUrl, customOptions = {}) {
  const targetUrl = normalizeUrl(rawUrl);
  const config = loadConfig(customOptions);
  const siteName = getSiteSlug(targetUrl);
  let targetHost = '';
  try {
    targetHost = new URL(targetUrl).hostname;
  } catch (e) {}

  const isIncremental = customOptions.incremental || false;
  const isAuto = customOptions.auto || config.headless || false;

  const baseFolder = path.resolve(config.outputDir);
  const siteFolder = path.join(baseFolder, siteName, 'site');
  const sectionsDir = path.join(siteFolder, 'sections');
  const stylesDir = path.join(siteFolder, 'styles');
  const assetsDir = path.join(siteFolder, 'assets');

  fs.mkdirSync(siteFolder, { recursive: true });
  fs.mkdirSync(sectionsDir, { recursive: true });
  fs.mkdirSync(stylesDir, { recursive: true });
  fs.mkdirSync(assetsDir, { recursive: true });

  console.log(`🔬 [Site Cloner] Iniciando clonagem: ${targetUrl}`);

  const launchOptions = {
    headless: config.headless,
    args: config.headless ? ['--no-sandbox', '--disable-setuid-sandbox'] : ['--start-maximized']
  };
  if (config.proxy) launchOptions.proxy = config.proxy;

  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({
    viewport: config.headless ? config.viewport : null,
    userAgent: config.userAgent
  });
  const page = await context.newPage();

  // Auto-captura recursos em tempo de execução
  page.on('response', async (response) => {
    try {
      const resUrl = response.url();
      const urlObj = new URL(resUrl);
      if (urlObj.hostname !== targetHost) return;

      const ext = path.extname(urlObj.pathname).toLowerCase();
      const isAsset = [
        '.js', '.css', '.json', 
        '.woff', '.woff2', '.ttf', '.otf', 
        '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp',
        '.mp4', '.webm', '.ogg'
      ].includes(ext) || urlObj.pathname.includes('/_nuxt/') || urlObj.pathname.includes('/wp-content/') || urlObj.pathname.includes('/wp-includes/');
      
      if (!isAsset) return;

      const relPath = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname;
      if (!relPath) return;

      const localPath = path.join(assetsDir, relPath);
      const localSubdir = path.dirname(localPath);

      if (fs.existsSync(localPath)) return;
      if (!fs.existsSync(localSubdir)) fs.mkdirSync(localSubdir, { recursive: true });

      const buf = await response.body();
      let finalContent = buf;

      if (localPath.endsWith('.js') || localPath.endsWith('.css')) {
        let textStr = buf.toString('utf-8');
        const isJs = localPath.endsWith('.js');

        if (isJs) {
          const patterns = [
            /\"(\/wp-content\/|\/wp-includes\/|\/_nuxt\/)([^\"]+)\"/g,
            /\'(\/wp-content\/|\/wp-includes\/|\/_nuxt\/)([^\']+)\'/g,
            /\`(\/wp-content\/|\/wp-includes\/|\/_nuxt\/)([^\`]+)\`/g
          ];
          patterns.forEach(pat => {
            textStr = textStr.replace(pat, (match, prefix, suffix) => {
              const referencedRelPath = (prefix + suffix).slice(1);
              const referencedLocalPath = path.join(assetsDir, referencedRelPath);
              let relativePath = path.relative(path.dirname(localPath), referencedLocalPath);
              relativePath = relativePath.split(path.sep).join('/');
              if (!relativePath.startsWith('.')) {
                relativePath = './' + relativePath;
              }
              return ` new URL("${relativePath}", import.meta.url).pathname`;
            });
          });
        } else {
          const absolutePathRegex = /(\/wp-content\/|\/wp-includes\/|\/_nuxt\/)([^\s"'`()<>#]+)/g;
          textStr = textStr.replace(absolutePathRegex, (match, prefix, suffix) => {
            const referencedRelPath = (prefix + suffix).slice(1);
            const referencedLocalPath = path.join(assetsDir, referencedRelPath);
            let relativePath = path.relative(path.dirname(localPath), referencedLocalPath);
            relativePath = relativePath.split(path.sep).join('/');
            if (!relativePath.startsWith('.')) {
              relativePath = './' + relativePath;
            }
            return relativePath;
          });
        }
        finalContent = Buffer.from(textStr, 'utf-8');
      }

      fs.writeFileSync(localPath, finalContent);
    } catch (err) {}
  });

  try {
    let originalTemplatesHtml = '';
    let templates = [];
    try {
      const rawHtmlRes = await page.request.get(targetUrl);
      if (rawHtmlRes.ok()) {
        const rawHtml = await rawHtmlRes.text();
        const templateRegex = /<script\s+[^>]*type=["']text\/template["'][^>]*>([\s\S]*?)<\/script>/gi;
        let match;
        while ((match = templateRegex.exec(rawHtml)) !== null) {
          const html = match[0];
          let selector = 'body';
          if (html.includes('favourite-not-empty')) {
            selector = '.btn__icon, [data-plugin="favouriteCounter"]';
          } else if (html.includes('data-template-name=')) {
            selector = '.plan, [data-plugin="plan"]';
          } else if (html.includes('data-template-variable="values"')) {
            selector = '.col.col--md-8.offset--md-2, .js-form-success';
          } else if (html.includes('transchoice(item.count')) {
            selector = '.js-favourite-counter-wrapper, [data-plugin="favouriteCounter"]';
          } else if (html.includes('card-office')) {
            selector = '.js-favourite-list-list, .offices-list';
          }
          templates.push({ selector, html });
        }
        originalTemplatesHtml = templates.map(t => t.html).join('\n');
      }
    } catch (e) {}

    try {
      await page.goto(targetUrl, { waitUntil: 'load', timeout: config.timeout });
    } catch (e) {}

    await page.waitForTimeout(3000);

    if (!isAuto && !config.headless) {
      console.log('\n=============================================================');
      console.log('👉 MODO DE NAVEGAÇÃO INTERATIVA ATIVADO 👈');
      console.log('1. Navegador aberto na tela.');
      console.log('2. Faça o scroll suave da página até o final.');
      console.log('=============================================================\n');
      await askQuestion('Pressione [ENTER] no terminal quando terminar para realizar a captura...');
    }

    // Simula interação do usuário
    await page.mouse.move(100, 200);
    await page.mouse.move(300, 400);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);

    if (!isIncremental) {
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 300;
          const timer = setInterval(() => {
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= document.body.scrollHeight || totalHeight >= 15000) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              resolve();
            }
          }, 100);
        });
      });
      await page.waitForTimeout(2000);
    }

    // Detecta iframe de conteúdo
    let target = page;
    const allIframes = await page.$$('iframe');
    for (const iframeEl of allIframes) {
      const box = await iframeEl.boundingBox();
      const src = await iframeEl.getAttribute('src') || '';
      const isVideo = src.includes('vimeo.com') || src.includes('youtube') || src.includes('wistia') || src.includes('doubleclick');
      const hasNoSrc = !src || src === 'about:blank' || src.startsWith('javascript:');
      if (box && box.width > 500 && box.height > 300 && !isVideo && !hasNoSrc) {
        const frame = await iframeEl.contentFrame();
        if (frame) {
          target = frame;
          await frame.waitForLoadState('networkidle');
          break;
        }
      }
    }

    // Re-injetar templates se existirem
    if (templates.length > 0) {
      await target.evaluate((tpls) => {
        tpls.forEach(t => {
          const parents = document.querySelectorAll(t.selector);
          parents.forEach(parent => {
            const exists = Array.from(parent.querySelectorAll('script[type="text/template"]'))
              .some(s => s.innerHTML.slice(0, 50) === t.html.slice(t.html.indexOf('>') + 1, t.html.indexOf('>') + 51));
            if (!exists) {
              const temp = document.createElement('div');
              temp.innerHTML = t.html;
              const scriptNode = temp.firstElementChild;
              if (scriptNode) parent.appendChild(scriptNode);
            }
          });
        });
      }, templates);
    }

    const result = await target.evaluate((isInc) => {
      function cleanGsap(node) {
        const pinSpacers = node.querySelectorAll('.pin-spacer');
        pinSpacers.forEach(spacer => {
          const child = spacer.firstElementChild;
          if (child) spacer.parentNode.insertBefore(child, spacer);
          spacer.remove();
        });

        const styledElements = node.querySelectorAll('[style]');
        const allStyled = node.hasAttribute('style') ? [node, ...styledElements] : styledElements;
        allStyled.forEach(el => {
          const styleAttr = el.getAttribute('style');
          if (!styleAttr) return;
          const declarations = styleAttr.split(';').map(d => d.trim()).filter(Boolean);
          const cleanDeclarations = declarations.filter(d => {
            const [prop] = d.split(':').map(p => p.trim());
            const pLower = prop.toLowerCase();
            return ![
              'transform', 'translate', 'rotate', 'scale',
              'position', 'inset', 'top', 'left', 'right', 'bottom',
              'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
              'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
              'opacity'
            ].includes(pLower);
          });
          if (cleanDeclarations.length > 0) {
            el.setAttribute('style', cleanDeclarations.join('; ') + ';');
          } else {
            el.removeAttribute('style');
          }
        });

        const allElements = node.querySelectorAll('*');
        const allWithNode = [node, ...allElements];
        allWithNode.forEach(el => {
          el.removeAttribute('data-scrolltrigger-id');
        });
      }

      const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
      const inlineStyles = Array.from(document.querySelectorAll('style')).map(s => s.textContent).join('\n');
      const scriptSrcs = Array.from(document.querySelectorAll('script[src]'))
        .filter(s => {
          const src = s.src || '';
          return !src.includes('google') && !src.includes('doubleclick') && !src.includes('umami') && !src.includes('promotekit');
        })
        .map(s => ({
          src: s.src,
          type: s.getAttribute('type') || '',
          defer: s.hasAttribute('defer'),
          async: s.hasAttribute('async')
        }));

      const inlineScripts = Array.from(document.querySelectorAll('script:not([src])'))
        .filter(s => {
          const t = s.textContent || '';
          return t.length > 50 && !t.includes('gtag') && !t.includes('dataLayer') && !t.includes('__AURA_SUPABASE_FIREWALL__');
        })
        .map(s => ({
          content: s.textContent,
          type: s.getAttribute('type') || ''
        }));

      const sectionData = [];
      function getTopLevelSections(rootNode = document) {
        let finalSections = [];
        const allSemantic = Array.from(rootNode.querySelectorAll('header, nav, section, footer, main, article'));
        if (allSemantic.length > 0) {
          finalSections = allSemantic.filter(el => !allSemantic.some(other => other !== el && other.contains(el)));
        }
        if (finalSections.length === 0) {
          const builderSections = Array.from(rootNode.querySelectorAll(
            '[data-elementor-type], .elementor-section-wrap > .elementor-section, .elementor.e-parent, .e-con.e-parent, [data-cid]'
          ));
          if (builderSections.length > 0) {
            finalSections = builderSections.filter(el => el.getBoundingClientRect().height > 50);
          }
        }
        if (finalSections.length === 0) {
          let root = rootNode.getElementById?.('root') || rootNode.querySelector?.('#root') || 
                     rootNode.getElementById?.('__next') || rootNode.querySelector?.('#__next') || 
                     rootNode.getElementById?.('app') || rootNode.querySelector?.('#app') ||
                     rootNode.querySelector?.('#__nuxt') || rootNode.body || rootNode;
          const getVisible = (c) => Array.from(c.children).filter(el => {
            const r = el.getBoundingClientRect();
            const t = el.tagName.toLowerCase();
            return t !== 'script' && t !== 'style' && t !== 'link' && t !== 'noscript' && r.height > 50;
          });
          let kids = getVisible(root);
          while (kids.length === 1 && kids[0].tagName.toLowerCase() === 'div') {
            root = kids[0];
            kids = getVisible(root);
          }
          finalSections = kids;
        }
        return finalSections;
      }

      const finalSections = getTopLevelSections(document);
      const seen = new Set();
      finalSections.forEach((el, i) => {
        if (seen.has(el)) return;
        seen.add(el);
        const tag = el.tagName.toLowerCase();
        const id = el.id || el.className.split(' ').find(c => c.includes('section') || c.includes('hero') || c.includes('footer') || c.includes('header') || c.includes('nav')) || `${tag}-${i}`;
        const cleanId = id.replace(/[^a-zA-Z0-9-_]/g, '-').slice(0, 40);
        const rect = el.getBoundingClientRect();
        if (rect.height < 50) return;

        const elClone = el.cloneNode(true);
        elClone.querySelectorAll('script').forEach(s => {
          const t = (s.getAttribute('type') || '').toLowerCase();
          if (!t || t.includes('javascript') || t.includes('ecmascript') || t === 'module') s.remove();
        });
        cleanGsap(elClone);

        sectionData.push({
          id: cleanId,
          tag,
          html: elClone.outerHTML,
          height: Math.round(rect.height),
          summary: (el.innerText || '').trim().slice(0, 80).replace(/\n/g, ' ')
        });
      });

      const bodyClone = document.body.cloneNode(true);
      bodyClone.querySelectorAll('script').forEach(s => {
        const t = (s.getAttribute('type') || '').toLowerCase();
        if (!t || t.includes('javascript') || t.includes('ecmascript') || t === 'module') s.remove();
      });
      cleanGsap(bodyClone);

      return {
        cssLinks,
        inlineStyles,
        scriptSrcs,
        inlineScripts,
        sectionData,
        bodyClasses: document.body.className,
        htmlLang: document.documentElement.lang || 'en',
        bodyHtml: bodyClone.innerHTML
      };
    }, isIncremental);

    const downloadedAssets = new Map();

    async function downloadAsset(url, defaultFilename) {
      try {
        const urlObj = new URL(url, targetUrl);
        if (urlObj.hostname !== targetHost && urlObj.hostname !== '' && urlObj.hostname) return null;
        if (downloadedAssets.has(urlObj.href)) return downloadedAssets.get(urlObj.href);

        const relPath = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname;
        const normalizedRelPath = relPath || defaultFilename;
        const localPath = path.join(assetsDir, normalizedRelPath);
        const localSubdir = path.dirname(localPath);

        if (!fs.existsSync(localSubdir)) fs.mkdirSync(localSubdir, { recursive: true });
        const relativeHtmlPath = `./assets/${normalizedRelPath}`;

        const res = await page.request.get(urlObj.href);
        if (res.ok()) {
          const buf = await res.body();
          let finalContent = buf;
          let isTextFile = localPath.endsWith('.js') || localPath.endsWith('.css');
          let textStr = '';

          if (isTextFile) {
            textStr = buf.toString('utf-8');
            const isJs = localPath.endsWith('.js');
            if (isJs) {
              const patterns = [
                /\"(\/wp-content\/|\/wp-includes\/|\/_nuxt\/)([^\"]+)\"/g,
                /\'(\/wp-content\/|\/wp-includes\/|\/_nuxt\/)([^\']+)\'/g,
                /\`(\/wp-content\/|\/wp-includes\/|\/_nuxt\/)([^\`]+)\`/g
              ];
              patterns.forEach(pat => {
                textStr = textStr.replace(pat, (match, prefix, suffix) => {
                  const referencedRelPath = (prefix + suffix).slice(1);
                  const referencedLocalPath = path.join(assetsDir, referencedRelPath);
                  let relativePath = path.relative(path.dirname(localPath), referencedLocalPath);
                  relativePath = relativePath.split(path.sep).join('/');
                  if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
                  return ` new URL("${relativePath}", import.meta.url).pathname`;
                });
              });
            } else {
              const absolutePathRegex = /(\/wp-content\/|\/wp-includes\/|\/_nuxt\/)([^\s"'`()<>#]+)/g;
              textStr = textStr.replace(absolutePathRegex, (match, prefix, suffix) => {
                const referencedRelPath = (prefix + suffix).slice(1);
                const referencedLocalPath = path.join(assetsDir, referencedRelPath);
                let relativePath = path.relative(path.dirname(localPath), referencedLocalPath);
                relativePath = relativePath.split(path.sep).join('/');
                if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
                return relativePath;
              });
            }
            finalContent = Buffer.from(textStr, 'utf-8');
          }

          fs.writeFileSync(localPath, finalContent);
          downloadedAssets.set(urlObj.href, relativeHtmlPath);
          return relativeHtmlPath;
        }
        return null;
      } catch (e) {
        return null;
      }
    }

    const localCssLinks = [];
    for (let i = 0; i < result.cssLinks.length; i++) {
      const href = result.cssLinks[i];
      const downloadedPath = await downloadAsset(href, `style-${i}.css`);
      localCssLinks.push(downloadedPath || href);
    }

    const localScriptSrcs = [];
    for (let i = 0; i < result.scriptSrcs.length; i++) {
      const s = result.scriptSrcs[i];
      const downloadedPath = await downloadAsset(s.src, `script-${i}.js`);
      if (downloadedPath) {
        localScriptSrcs.push({ ...s, src: downloadedPath });
      } else {
        localScriptSrcs.push(s);
      }
    }

    const cssLinksHtml = localCssLinks.map(href => `  <link rel="stylesheet" href="${href}">`).join('\n');
    const scriptTagsHtml = localScriptSrcs.map(s => {
      const typeAttr = s.type ? ` type="${s.type}"` : '';
      const deferAttr = s.defer ? ' defer' : '';
      const asyncAttr = s.async ? ' async' : '';
      return `  <script src="${s.src}"${typeAttr}${deferAttr}${asyncAttr}><\/script>`;
    }).join('\n');

    const inlineScriptsHtml = result.inlineScripts.map(s => {
      const typeAttr = s.type ? ` type="${s.type}"` : '';
      return `  <script${typeAttr}>${s.content}<\/script>`;
    }).join('\n');

    const { UniversalAssetNormalizer } = require('../pro/universal-asset-normalizer');
    const universalUnlockCss = UniversalAssetNormalizer.getUniversalUnlockCss();
    const universalPolyfills = UniversalAssetNormalizer.getUniversalResiliencePolyfills();

    // Salva cada seção
    result.sectionData.forEach((sec, i) => {
      const filename = `${String(i).padStart(2, '0')}_${sec.id}.html`;
      const sectionHtmlDoc = `<!DOCTYPE html>
<html lang="${result.htmlLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Section - ${sec.id}</title>
${cssLinksHtml}
  <style>${result.inlineStyles}</style>
${universalUnlockCss}
${universalPolyfills}
</head>
<body class="${result.bodyClasses}">
${sec.html}
${originalTemplatesHtml}
${scriptTagsHtml}
${inlineScriptsHtml}
</body>
</html>`;
      fs.writeFileSync(path.join(sectionsDir, filename), sectionHtmlDoc);
    });

    if (result.inlineStyles.length > 0) {
      fs.writeFileSync(path.join(stylesDir, 'inline.css'), result.inlineStyles);
    }

    const cloneHtml = `<!DOCTYPE html>
<html lang="${result.htmlLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clone - ${siteName}</title>
${cssLinksHtml}
  <style>${result.inlineStyles}</style>
${universalUnlockCss}
${universalPolyfills}
</head>
<body class="${result.bodyClasses}">
${result.bodyHtml}
${originalTemplatesHtml}
${scriptTagsHtml}
${inlineScriptsHtml}
</body>
</html>`;

    const outputPath = path.join(siteFolder, 'index.html');
    fs.writeFileSync(outputPath, cloneHtml);

    // Auto-executa a normalização profunda e o saneamento de assets/HTML
    try {
      const normalizer = new UniversalAssetNormalizer({
        siteDir: siteFolder,
        siteUrl: targetUrl
      });
      await normalizer.normalizeAll();
    } catch (normErr) {
      console.warn('⚠️ [Site Cloner] Alerta na pós-normalização automática:', normErr.message);
    }

    console.log(`✅ [Site Cloner] Clone salvo e desbloqueado em: ${outputPath}`);
    return {
      siteFolder,
      sectionsCount: result.sectionData.length,
      htmlPath: outputPath
    };

  } finally {
    await browser.close();
  }
}

module.exports = {
  cloneSite
};
