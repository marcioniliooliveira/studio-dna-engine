const fs = require('fs');
const path = require('path');
const { UnifiedQualityGate } = require('../../qa/unified-quality-gate');
const { runImpeccableGate } = require('../../qa/impeccable-gate');
const { runBoxDiffLinter } = require('../../../scripts/box-diff-linter');
const { VisualSaliencyOracle } = require('../../qa/visual-saliency-oracle');
const schemas = require('../schemas');

const {
  validateSlugSecurity,
  getSafeClientDir
} = schemas;

const UnifiedQualityGateSchema = schemas.UnifiedQualityGateSchema || schemas.runUnifiedQualityGateSchema;
const ImpeccableGateSchema = schemas.ImpeccableGateSchema || schemas.runImpeccableGateSchema;
const BoxDiffLinterSchema = schemas.BoxDiffLinterSchema || schemas.runBoxDiffLinterSchema;
const VisualSaliencySchema = schemas.VisualSaliencySchema || schemas.auditVisualSaliencySchema;

function registerQaTools(server) {
  // Tool 1: Unified Quality Gate (Playwright headless console, network, images, anti-slop)
  server.tool(
    'run_unified_quality_gate',
    'Executa a auditoria completa e independente no artefato de produção estático (Playwright console, rede, imagens, anti-slop e dinâmica de scroll).',
    UnifiedQualityGateSchema,
    async ({ clientSlug, timeoutMs }) => {
      try {
        const clientDir = getSafeClientDir(clientSlug);
        if (!fs.existsSync(clientDir)) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Cliente não encontrado em clientes/${clientSlug}` }]
          };
        }

        let siteDir = path.join(clientDir, 'site');
        if (!fs.existsSync(siteDir)) {
          siteDir = clientDir;
        }

        const htmlPath = path.join(siteDir, 'index.html');
        if (!fs.existsSync(htmlPath)) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Arquivo index.html não encontrado para o cliente "${clientSlug}" em ${siteDir}` }]
          };
        }

        const result = await UnifiedQualityGate.auditSite({
          siteDir,
          clientSlug,
          headless: true,
          timeoutMs: timeoutMs || 15000
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: 'text', text: error.message }]
        };
      }
    }
  );

  // Tool 2: Impeccable Gate (Tier 4 anti-patterns: dark-glow, nested-cards, overused-font, bounce-easing)
  server.tool(
    'run_impeccable_gate',
    'Executa o linter visual anti-patterns do Impeccable (Tier 4) garantindo tolerância zero para dark-glow, nested-cards, overused-font e bounce-easing.',
    ImpeccableGateSchema,
    async ({ clientSlug }) => {
      try {
        const clientDir = getSafeClientDir(clientSlug);
        if (!fs.existsSync(clientDir)) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Cliente não encontrado em clientes/${clientSlug}` }]
          };
        }

        let htmlPath = path.join(clientDir, 'site', 'index.html');
        if (!fs.existsSync(htmlPath)) {
          htmlPath = path.join(clientDir, 'index.html');
        }

        if (!fs.existsSync(htmlPath)) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Arquivo index.html não encontrado para o cliente "${clientSlug}" em ${clientDir}` }]
          };
        }

        const result = await runImpeccableGate(htmlPath);

        const output = {
          status: 'success',
          passed: result.passed,
          clientSlug,
          violations: result.violations,
          summary: result.summary
        };

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(output, null, 2)
          }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: 'text', text: error.message }]
        };
      }
    }
  );

  // Tool 3: Box Diff Linter (AABB collision, layout health, image validity)
  server.tool(
    'run_box_diff_linter',
    'Executa o linter Playwright headless para auditar se o site possui 0 erros JS, integridade geométrica de caixas e 100% de imagens válidas.',
    BoxDiffLinterSchema,
    async ({ siteSlug, port }) => {
      try {
        validateSlugSecurity(siteSlug);
        const result = await runBoxDiffLinter(siteSlug, port);

        if (result && result.isError) {
          return {
            isError: true,
            content: [{ type: 'text', text: result.error || `Erro na execução do box diff linter para: ${siteSlug}` }]
          };
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: 'text', text: error.message }]
        };
      }
    }
  );

  // Tool 4: Visual Saliency Oracle (Pre-attentive 500ms ocular fixation & CTA prominence)
  server.tool(
    'audit_visual_saliency',
    'Executa o oráculo de saliência visual pré-atentiva de 500ms auditando contraste, dominância do CTA e razão de distração.',
    VisualSaliencySchema,
    async ({ clientSlug }) => {
      try {
        const clientDir = getSafeClientDir(clientSlug);
        if (!fs.existsSync(clientDir)) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Cliente não encontrado em clientes/${clientSlug}` }]
          };
        }

        let layoutConfig = null;
        const saliencyLayoutFile = path.join(clientDir, 'saliency-layout.json');
        const layoutFile = path.join(clientDir, 'layout.json');

        if (fs.existsSync(saliencyLayoutFile)) {
          layoutConfig = JSON.parse(fs.readFileSync(saliencyLayoutFile, 'utf8'));
        } else if (fs.existsSync(layoutFile)) {
          layoutConfig = JSON.parse(fs.readFileSync(layoutFile, 'utf8'));
        } else {
          // Constrói layout semântico a partir do brand-spec.json ou composition-spec.json do cliente
          const brandSpecPath = path.join(clientDir, 'brand-spec.json');
          let brandSpec = {};
          if (fs.existsSync(brandSpecPath)) {
            try {
              brandSpec = JSON.parse(fs.readFileSync(brandSpecPath, 'utf8'));
            } catch (e) {}
          }

          const theme = brandSpec.theme || {};
          const bgColor = theme.bgBase || theme.background || '#0B0F19';
          const ctaColor = theme.accentLight || theme.accent || theme.whatsapp || '#A3E635';
          const textColor = theme.textMain || '#FFFFFF';
          const vp = { width: 1440, height: 900 };

          layoutConfig = {
            viewport: vp,
            ctaId: 'cta',
            elements: [
              { type: 'background', color: bgColor },
              {
                id: 'headline',
                role: 'functional',
                type: 'text',
                x: vp.width * 0.35,
                y: vp.height * 0.32,
                width: vp.width * 0.30,
                height: 28,
                color: textColor
              },
              {
                id: 'cta',
                role: 'primary-cta',
                type: 'button',
                x: vp.width * 0.36,
                y: vp.height * 0.44,
                width: vp.width * 0.28,
                height: 72,
                background: ctaColor,
                color: bgColor
              }
            ]
          };
        }

        const oracle = new VisualSaliencyOracle();
        const analysis = oracle.analyzeLayout(layoutConfig);

        const output = {
          status: 'success',
          clientSlug,
          passed: analysis.passed,
          scoreCta: analysis.scoreCta,
          distractionRatio: analysis.distractionRatio,
          ctaAttentionRank: analysis.ctaAttentionRank,
          violations: analysis.violations,
          summary: {
            viewport: layoutConfig.viewport || { width: 1440, height: 900 },
            ctaId: layoutConfig.ctaId || 'cta',
            details: analysis.details
          }
        };

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(output, null, 2)
          }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: 'text', text: error.message }]
        };
      }
    }
  );
}

module.exports = { registerQaTools };
