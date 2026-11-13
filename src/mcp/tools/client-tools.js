const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cheerio = require('cheerio');
const { createClientProject } = require('../../generators/client-factory');
const { transmuteClient } = require('../../pipeline/transmuter');
const { injectContentSlots } = require('../../generators/slot-injector');
const { EdgeStaticCompiler } = require('../../compiler/edge-static-compiler');
const { NextJsRscCompiler } = require('../../compiler/nextjs-rsc-compiler');
const {
  CreateClientSchema,
  TransmuteClientSchema,
  CompileDualstackSchema,
  InjectSlotsSchema,
  PatchBrandSpecSchema,
  UpdateSelectedElementSchema,
  getSafeClientDir,
  getSafeRefDir,
  validateSlugSecurity,
  ROOT_DIR
} = require('../schemas');
const { validateStrictDonutScope } = require('../../css/css-selector-ast');
const { calcAPCA } = require('../../constraints/contrast');
const { writeJsonAtomicSync } = require('../../persistence/hybrid-repository');

function extractColorFromText(text) {
  if (!text || typeof text !== 'string') return null;
  const colorMatch = text.match(/(?:^|[;{\s])color\s*:\s*([^;!}]+)/i);
  if (colorMatch) {
    return colorMatch[1].trim();
  }
  return null;
}

function extractBgColorFromText(text) {
  if (!text || typeof text !== 'string') return null;
  const bgMatch = text.match(/background(?:-color)?\s*:\s*([^;!}]+)/i);
  if (bgMatch) {
    return bgMatch[1].trim();
  }
  return null;
}

function parseCssColorToRgbOrHex(val) {
  if (!val || typeof val !== 'string') return null;
  const s = val.trim();
  const hexMatch = s.match(/#([0-9a-fA-F]{3,8})\b/);
  if (hexMatch) return hexMatch[0];
  const rgbMatch = s.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10)
    };
  }
  return null;
}

function registerClientTools(server) {
  // Tool 1: Criar Projeto de Cliente One-Shot (Fábrica ICM)
  server.tool(
    'create_client_project',
    'Cria uma pasta de cliente isolada e desacoplada baseada em um esqueleto de referência do Vault.',
    CreateClientSchema,
    async ({ brandName, refSlug = 'storeyarchitecture-co-uk', niche, toneOfVoice, whatsapp }) => {
      try {
        validateSlugSecurity(refSlug);
        getSafeRefDir(refSlug);

        const res = createClientProject({
          brandName,
          refSlug,
          brandSpec: { niche, toneOfVoice, whatsapp }
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              clientSlug: res.clientSlug,
              clientDir: res.clientDir,
              previewUrl: `http://127.0.0.1:4000/clientes/${res.clientSlug}/site/index.html`,
              message: `🎉 Projeto de cliente "${brandName}" criado com sucesso em ambiente isolado ICM.`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: err.message }]
        };
      }
    }
  );

  // Tool 2: Transmutar Site do Cliente Deterministicamente (Motor Canônico)
  server.tool(
    'transmute_client_site',
    'Executa o motor canônico determinístico de transmutação (transmuter.js) aplicando brand-spec.json, injeção de slots, SplitText W3C e regras anti-slop.',
    TransmuteClientSchema,
    async ({ clientSlug }) => {
      try {
        const clientDir = getSafeClientDir(clientSlug);
        if (!fs.existsSync(clientDir)) {
          return {
            isError: true,
            content: [{ type: 'text', text: `❌ Cliente não encontrado em clientes/${clientSlug}` }]
          };
        }

        const result = await transmuteClient(clientSlug);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              clientSlug,
              outputPath: result.outputPath,
              outputHash: result.outputHash,
              replacedSlotsCount: result.replacedSlotsCount,
              antiSlopVerified: true,
              message: `✅ Transmutação determinística concluída com sucesso para o cliente "${clientSlug}".`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `❌ Falha na transmutação do cliente: ${err.message}` }]
        };
      }
    }
  );

  // Tool 3: Compilação Dual-Stack (Edge Static ou Next.js 15 App Router RSC)
  server.tool(
    'compile_dualstack',
    'Compila o projeto do cliente para o formato de produção especificado: Edge Static HTML5 ou Next.js 15 App Router RSC.',
    CompileDualstackSchema,
    async ({ clientSlug, target }) => {
      try {
        const clientDir = getSafeClientDir(clientSlug);
        const brandSpecPath = path.join(clientDir, 'brand-spec.json');
        const brandSpec = fs.existsSync(brandSpecPath)
          ? JSON.parse(fs.readFileSync(brandSpecPath, 'utf8'))
          : { brandName: clientSlug };

        const compSpecPath = path.join(clientDir, 'composition-spec.json');
        let compSpec = null;
        if (fs.existsSync(compSpecPath)) {
          try {
            const rawSpec = JSON.parse(fs.readFileSync(compSpecPath, 'utf8'));
            if (rawSpec && Array.isArray(rawSpec.stages) && rawSpec.stages.length > 0 && rawSpec.brandSpec) {
              compSpec = rawSpec;
            }
          } catch (_) {}
        }

        if (!compSpec) {
          compSpec = {
            schemaVersion: '2.0.0',
            brandSpec: {
              brandName: brandSpec.brandName || clientSlug,
              theme: {
                accent: (brandSpec.theme && brandSpec.theme.accent) || brandSpec.primaryColor || '#00f0ff',
                bgBase: (brandSpec.theme && brandSpec.theme.bgBase) || brandSpec.secondaryColor || '#0a0a0c'
              },
              meta: {
                title: `${brandSpec.brandName || clientSlug} | Experiência de Alta Performance`,
                description: `Site de alta conversão desenvolvido para ${brandSpec.brandName || clientSlug}`
              }
            },
            stages: [
              {
                id: 'stage-hero',
                type: 'HeroCinematicStage',
                title: brandSpec.brandName || clientSlug,
                slots: [
                  {
                    slotId: 'slot-headline',
                    slotType: 'heading',
                    targetSelector: '.hero-headline',
                    content: brandSpec.headline || `Bem-vindo a ${brandSpec.brandName || clientSlug}`
                  }
                ]
              }
            ]
          };
        }

        const outDir = path.join(clientDir, target === 'nextjs-rsc' ? 'nextjs-dist' : 'dist-static');

        let compileResult;
        if (target === 'nextjs-rsc') {
          const compiler = new NextJsRscCompiler();
          compileResult = compiler.compile(compSpec, { writeToDisk: true, outDir });
        } else {
          const compiler = new EdgeStaticCompiler();
          compileResult = compiler.compile(compSpec, { writeToDisk: true, outDir });
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              target,
              clientSlug,
              outDir,
              filesGenerated: Object.keys(compileResult.files || {}),
              message: `🚀 Compilação ${target} concluída em: ${outDir}`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `❌ Falha na compilação dualstack: ${err.message}` }]
        };
      }
    }
  );

  // Tool 4: Injetar Slots Mecanicamente
  server.tool(
    'inject_content_slots',
    'Mescla o esqueleto estrutural com o JSON de copy do cliente deterministicamente, sem quebrar o código.',
    InjectSlotsSchema,
    async ({ skeletonPath, contentSlotsPath, outputPath }) => {
      try {
        const absOutput = path.resolve(outputPath);
        const copiasDir = path.resolve(ROOT_DIR, 'copias');
        if (absOutput === copiasDir || absOutput.startsWith(copiasDir + path.sep)) {
          throw new Error('Security violation: Cannot write to read-only copias/ directory');
        }
        if (!absOutput.startsWith(ROOT_DIR + path.sep)) {
          throw new Error('Security violation: Output path escapes workspace');
        }

        const absSkeleton = path.resolve(skeletonPath);
        if (!absSkeleton.startsWith(ROOT_DIR + path.sep)) {
          throw new Error('Security violation: Skeleton path escapes workspace');
        }

        const absSlots = path.resolve(contentSlotsPath);
        if (!absSlots.startsWith(ROOT_DIR + path.sep)) {
          throw new Error('Security violation: Content slots path escapes workspace');
        }

        const res = injectContentSlots({ skeletonPath, contentSlotsPath, outputPath });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              replacedCount: res.replacedCount,
              outputPath: res.outputPath,
              message: `✅ Injeção de slots concluída com sucesso! ${res.replacedCount} slots substituídos em: ${res.outputPath}`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: err.message }]
        };
      }
    }
  );

  // Tool 5: Atualizar Brand Spec do Cliente (Iteração Segura)
  server.tool(
    'patch_brand_spec',
    'Aplica modificações incrementais e validadas ao brand-spec.json do cliente ativo sem sobrescrever configurações críticas.',
    PatchBrandSpecSchema,
    async ({ clientSlug, updates }) => {
      try {
        const clientDir = getSafeClientDir(clientSlug);
        const specFile = path.join(clientDir, 'brand-spec.json');
        if (!fs.existsSync(specFile)) {
          return {
            isError: true,
            content: [{ type: 'text', text: `❌ brand-spec.json não encontrado para o cliente: ${clientSlug}` }]
          };
        }

        const currentSpec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
        const updatedSpec = {
          ...currentSpec,
          ...updates,
          updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(specFile, JSON.stringify(updatedSpec, null, 2), 'utf8');

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              clientSlug,
              updatedKeys: Object.keys(updates),
              specFile,
              message: `✅ brand-spec.json atualizado com sucesso para o cliente "${clientSlug}".`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `❌ Falha ao atualizar brand-spec: ${err.message}` }]
        };
      }
    }
  );

  // Tool 6: Atualizar Elemento Selecionado Cirurgicamente (Click-to-MCP)
  server.tool(
    'update_selected_element',
    'Aplica atualização cirúrgica em site/index.html no elemento [data-ds] validando blindagem de escopo (@scope strict donut) e contraste perceptual APCA.',
    UpdateSelectedElementSchema,
    async ({ slug, dsId, updatedHtml, updatedScopedCss }) => {
      try {
        // Gate 1: Security & Traversal Validation
        validateSlugSecurity(slug);
        const clientDir = getSafeClientDir(slug);
        if (!fs.existsSync(clientDir)) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Cliente não encontrado em clientes/${slug}` }]
          };
        }

        if (!updatedHtml && !updatedScopedCss) {
          return {
            isError: true,
            content: [{ type: 'text', text: 'At least one of updatedHtml or updatedScopedCss must be provided' }]
          };
        }

        // Gate 2: Strict Donut Scope Validation
        if (updatedScopedCss && typeof updatedScopedCss === 'string' && updatedScopedCss.trim()) {
          const scopeResult = validateStrictDonutScope(updatedScopedCss, 'data-capsule-slot');
          if (!scopeResult.valid) {
            const reasons = (scopeResult.violations || []).map(v => `${v.selector}: ${v.reason}`).join('; ');
            return {
              isError: true,
              content: [{ type: 'text', text: `❌ Strict Donut Scope Violation: ${reasons}` }]
            };
          }
        }

        // Gate 3: APCA Perceptual Contrast Evaluation
        let textColorStr = extractColorFromText(updatedScopedCss) || extractColorFromText(updatedHtml);
        let bgColorStr = extractBgColorFromText(updatedScopedCss) || extractBgColorFromText(updatedHtml);

        if (!textColorStr || !bgColorStr) {
          // Check live selection context for fallback colors
          let liveData = null;
          const primaryDnaPath = path.join(clientDir, '.dna', 'live-selection.json');
          if (fs.existsSync(primaryDnaPath)) {
            try { liveData = JSON.parse(fs.readFileSync(primaryDnaPath, 'utf8')); } catch (_) {}
          }
          if (!liveData) {
            try {
              const { getLiveSelection } = require('../../server/preview-server');
              liveData = getLiveSelection(slug);
            } catch (_) {}
          }
          if (liveData && liveData.computedStyles) {
            if (!textColorStr && liveData.computedStyles.color) {
              textColorStr = liveData.computedStyles.color;
            }
            if (!bgColorStr && liveData.computedStyles.backgroundColor) {
              bgColorStr = liveData.computedStyles.backgroundColor;
            }
          }
        }

        if (textColorStr && bgColorStr) {
          const parsedText = parseCssColorToRgbOrHex(textColorStr);
          const parsedBg = parseCssColorToRgbOrHex(bgColorStr);
          if (parsedText && parsedBg) {
            const lc = calcAPCA(parsedText, parsedBg);
            if (Math.abs(lc) < 15) {
              return {
                isError: true,
                content: [{
                  type: 'text',
                  text: `❌ APCA Contrast Violation: Perceptual contrast Lc ${lc.toFixed(1)} is below minimum threshold (< 15: inadmissible text)`
                }]
              };
            }
          }
        }

        // Gate 4: Cheerio Surgical DOM Update on site/index.html
        const siteHtmlPath = path.join(clientDir, 'site', 'index.html');
        const fallbackHtmlPath = path.join(clientDir, 'index.html');
        const htmlPath = fs.existsSync(siteHtmlPath) ? siteHtmlPath : (fs.existsSync(fallbackHtmlPath) ? fallbackHtmlPath : null);

        if (!htmlPath) {
          return {
            isError: true,
            content: [{ type: 'text', text: `❌ HTML entry file not found for client in ${clientDir}` }]
          };
        }

        const rawHtml = fs.readFileSync(htmlPath, 'utf8');
        const $ = cheerio.load(rawHtml, { decodeEntities: false });
        const target = $(`[data-ds="${dsId}"]`);

        if (target.length === 0) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Element with data-ds="${dsId}" not found in ${path.relative(ROOT_DIR, htmlPath).replace(/\\/g, '/')}` }]
          };
        }

        if (updatedHtml && typeof updatedHtml === 'string' && updatedHtml.trim()) {
          const frag = cheerio.load(updatedHtml, { decodeEntities: false });
          const children = frag('body').children();
          if (children.length === 1) {
            const el = children.first();
            if (!el.attr('data-ds')) {
              el.attr('data-ds', dsId);
            }
            target.replaceWith(el);
          } else if (children.length > 1) {
            children.first().attr('data-ds', dsId);
            target.replaceWith(children);
          } else {
            target.html(updatedHtml);
          }
        }

        if (updatedScopedCss && typeof updatedScopedCss === 'string' && updatedScopedCss.trim()) {
          let styleTag = $('style#dna-live-scoped-css');
          if (styleTag.length > 0) {
            styleTag.text(updatedScopedCss);
          } else if ($('head').length > 0) {
            $('head').append(`\n  <style id="dna-live-scoped-css">\n${updatedScopedCss}\n  </style>`);
          } else {
            $.root().prepend(`<style id="dna-live-scoped-css">\n${updatedScopedCss}\n</style>\n`);
          }
        }

        // Write mutated HTML atomically
        const tempHtmlPath = `${htmlPath}.${crypto.randomBytes(4).toString('hex')}.tmp`;
        fs.writeFileSync(tempHtmlPath, $.html(), 'utf8');
        fs.renameSync(tempHtmlPath, htmlPath);

        // Gate 5: Atomic Persistence of Live Selection & Server Memory Sync
        const clientDnaDir = path.join(clientDir, '.dna');
        const primaryDnaPath = path.join(clientDnaDir, 'live-selection.json');
        let selectionObj = null;

        if (fs.existsSync(primaryDnaPath)) {
          try { selectionObj = JSON.parse(fs.readFileSync(primaryDnaPath, 'utf8')); } catch (_) {}
        }

        if (!selectionObj) {
          selectionObj = {
            clientSlug: slug,
            dsId,
            dataDs: dsId,
            tagName: target[0] ? target[0].tagName.toLowerCase() : 'div'
          };
        }

        if (updatedHtml) {
          selectionObj.outerHTML = updatedHtml;
        }
        selectionObj.timestamp = Date.now();

        writeJsonAtomicSync(primaryDnaPath, selectionObj);

        // Also mirror to legacy fallbacks if their directories exist
        const clientDomscribePath = path.join(clientDir, '.domscribe', 'live-selection.json');
        if (fs.existsSync(path.dirname(clientDomscribePath))) {
          try { writeJsonAtomicSync(clientDomscribePath, selectionObj); } catch (_) {}
        }
        const rootDomscribePath = path.join(ROOT_DIR, '.domscribe', `live-selection-${slug}.json`);
        if (fs.existsSync(path.dirname(rootDomscribePath))) {
          try { writeJsonAtomicSync(rootDomscribePath, selectionObj); } catch (_) {}
        }

        // Sync in-memory preview-server & notify SSE
        try {
          const { setLiveSelection, notifyHotSwap } = require('../../server/preview-server');
          setLiveSelection(slug, selectionObj);
          notifyHotSwap(slug, {
            type: 'element_updated',
            clientSlug: slug,
            dsId,
            updatedHtml: updatedHtml || null,
            updatedScopedCss: updatedScopedCss || null,
            timestamp: selectionObj.timestamp
          });
        } catch (_) {}

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              clientSlug: slug,
              dsId,
              mutatedHtml: Boolean(updatedHtml),
              mutatedCss: Boolean(updatedScopedCss),
              htmlPath: path.relative(ROOT_DIR, htmlPath).replace(/\\/g, '/'),
              message: `✅ Elemento [data-ds="${dsId}"] atualizado cirurgicamente com sucesso para o cliente "${slug}".`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `❌ Falha ao atualizar elemento: ${err.message}` }]
        };
      }
    }
  );
}

module.exports = { registerClientTools };
