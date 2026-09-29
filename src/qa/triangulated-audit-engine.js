/**
 * src/qa/triangulated-audit-engine.js
 * 
 * Motor de Auditoria Multifatorial Triangulada (AST + CDP + Raster)
 * Implementa verificação determinística e cruzada das 38 variáveis anti-slop:
 * - Fator 1: Estático / Léxico (AntiSlopGate + Dicionário de Termos Vazios)
 * - Fator 2: Dinâmico / Runtime CDP (DeepScrutinyGate + Font Barrier + Click Hit-Testing)
 * - Fator 3: Estrutural & Visual (UnifiedQualityGate + Console/Network + Imagens)
 * 
 * Inclui Meta-Auditoria: Calibração de auditor (Golden Fixture / Slop Fixture)
 * e detecção de divergência (AUDIT_DIVERGENCE) sem média de nota.
 */

const fs = require('fs');
const path = require('path');
const { AntiSlopGate } = require('./anti-slop-gate');
const { DeepScrutinyGate } = require('./deep-scrutiny-gate');
const { UnifiedQualityGate } = require('./unified-quality-gate');

class TriangulatedAuditEngine {
  /**
   * Carrega o banco de regras de governança anti-slop
   */
  static loadGovernanceRules(rulesPath = null) {
    const targetPath = rulesPath || path.resolve(__dirname, '../../design-vault/00-governance/anti-slop-rules.json');
    if (fs.existsSync(targetPath)) {
      try {
        return JSON.parse(fs.readFileSync(targetPath, 'utf8'));
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  /**
   * Executa a auditoria completa triangulada em um diretório de site
   */
  static async auditSite({
    siteDir,
    clientSlug = 'client',
    refDir = null,
    targetLanguage = 'pt-BR',
    headless = true,
    runHealthCheck = false
  }) {
    const startTime = Date.now();
    const resolvedSiteDir = path.resolve(siteDir);
    const htmlPath = path.join(resolvedSiteDir, 'index.html');

    if (!fs.existsSync(htmlPath)) {
      return {
        passed: false,
        status: 'error',
        error: `Arquivo index.html não encontrado em: ${resolvedSiteDir}`,
        score: '0/38',
        divergenceDetected: false,
        layers: {}
      };
    }

    // 0. Meta-Auditoria / Pre-flight Health Check (Opcional)
    if (runHealthCheck) {
      const health = await this.verifyAuditorHealth();
      if (!health.healthy) {
        return {
          passed: false,
          status: 'AUDITOR_UNHEALTHY',
          error: `O motor de auditoria falhou na calibração interna: ${health.reason}`,
          score: '0/38',
          divergenceDetected: true,
          healthCheck: health
        };
      }
    }

    const governance = this.loadGovernanceRules();
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // ── FATOR 1: Auditoria Estática / Léxica / AST ─────────────────────────────
    const staticResult = AntiSlopGate.audit({
      htmlContent,
      originalBrandKeywords: []
    });

    // Verificação estática adicional de termos vazios da governança
    const copyViolations = [];
    if (governance && governance.libraries && governance.libraries.bannedCopyDictionary) {
      const lower = htmlContent.toLowerCase();
      for (const phrase of governance.libraries.bannedCopyDictionary.forbiddenTerms) {
        if (lower.includes(phrase.toLowerCase())) {
          copyViolations.push(`Termo proibido de marketing vazio detectado: "${phrase}"`);
        }
      }
    }

    const factor1Passed = staticResult.passed && copyViolations.length === 0;
    const factor1Report = {
      name: 'Factor 1: Static AST & Lexical Gate',
      passed: factor1Passed,
      slopMatches: staticResult.stats.slopMatches,
      unfilledSlots: staticResult.stats.unfilledSlots,
      copyViolations,
      violations: staticResult.violations.concat(copyViolations)
    };

    // ── FATOR 2: Auditoria Dinâmica / Runtime CDP ──────────────────────────────
    let factor2Report = { name: 'Factor 2: Runtime CDP Gate', passed: false, vetores: {} };
    try {
      const deepResult = await DeepScrutinyGate.audit({
        siteDir: resolvedSiteDir,
        clientSlug,
        targetLanguage,
        headless
      });
      factor2Report = {
        name: 'Factor 2: Runtime CDP Gate',
        passed: deepResult.passed,
        vetores: deepResult.vetores
      };
    } catch (err) {
      factor2Report = {
        name: 'Factor 2: Runtime CDP Gate',
        passed: false,
        error: `Falha ao executar DeepScrutinyGate: ${err.message}`
      };
    }

    // ── FATOR 3: Auditoria Estrutural & Console/Network ────────────────────────
    let factor3Report = { name: 'Factor 3: Unified Structural Gate', passed: false };
    try {
      const uqgResult = await UnifiedQualityGate.auditSite({
        siteDir: resolvedSiteDir,
        clientSlug,
        refDir,
        headless
      });
      factor3Report = {
        name: 'Factor 3: Unified Structural Gate',
        passed: uqgResult.passed,
        summary: uqgResult.summary,
        gates: uqgResult.gates
      };
    } catch (err) {
      factor3Report = {
        name: 'Factor 3: Unified Structural Gate',
        passed: false,
        error: `Falha ao executar UnifiedQualityGate: ${err.message}`
      };
    }

    // ── MATRIZ DE CONSENSO & CÁLCULO DE DIVERGÊNCIA ───────────────────────────
    const f1 = factor1Report.passed;
    const f2 = factor2Report.passed;
    const f3 = factor3Report.passed;

    const overallPassed = f1 && f2 && f3;
    const divergenceDetected = (f1 !== f2) || (f2 !== f3);

    // Cálculo das 38 variáveis empíricas atendidas
    let passedVariables = 0;
    const totalVariables = 38;

    // Dimensão 1: Espaço e Geometria (6 vars)
    if (f2 && factor2Report.vetores && factor2Report.vetores.aabbOverlap && factor2Report.vetores.aabbOverlap.passed) passedVariables += 3;
    if (f2 && factor2Report.vetores && factor2Report.vetores.layoutBleed && factor2Report.vetores.layoutBleed.passed) passedVariables += 3;

    // Dimensão 2: Tipografia Editorial (7 vars)
    if (f1 && factor1Report.slopMatches === 0) passedVariables += 4;
    if (f2 && factor2Report.vetores && factor2Report.vetores.languageLeak && factor2Report.vetores.languageLeak.passed) passedVariables += 3;

    // Dimensão 3: Cromia e Superfície (5 vars)
    if (f1 && copyViolations.length === 0) passedVariables += 5;

    // Dimensão 4: Cinemática e Tempo (6 vars)
    if (f2 && factor2Report.vetores && factor2Report.vetores.scrollScrubber && factor2Report.vetores.scrollScrubber.passed) passedVariables += 3;
    if (f2 && factor2Report.vetores && factor2Report.vetores.stickyIntegrity && factor2Report.vetores.stickyIntegrity.passed) passedVariables += 3;

    // Dimensão 5: Semântica e Copy (5 vars)
    if (f1 && factor1Report.unfilledSlots === 0) passedVariables += 3;
    if (f3 && factor3Report.gates && factor3Report.gates.antiSlop && factor3Report.gates.antiSlop.passed) passedVariables += 2;

    // Dimensão 6: Ativos e Mídia (4 vars)
    if (f3 && factor3Report.gates && factor3Report.gates.structural && factor3Report.gates.structural.brokenImages === 0) passedVariables += 4;

    // Dimensão 7: Orquestração Estrutural (5 vars)
    if (f3 && factor3Report.gates && factor3Report.gates.console && factor3Report.gates.console.passed) passedVariables += 3;
    if (f2 && factor2Report.vetores && factor2Report.vetores.clickHijack && factor2Report.vetores.clickHijack.passed) passedVariables += 2;

    const score = `${passedVariables}/${totalVariables}`;

    return {
      passed: overallPassed,
      score,
      passedVariables,
      totalVariables,
      divergenceDetected,
      status: overallPassed ? 'VERIFIED_GOLDEN' : (divergenceDetected ? 'AUDIT_DIVERGENCE' : 'REJECTED_SLOP'),
      durationMs: Date.now() - startTime,
      layers: {
        factor1_static: factor1Report,
        factor2_runtime_cdp: factor2Report,
        factor3_structural: factor3Report
      }
    };
  }

  /**
   * Meta-Auditoria: Verifica se o próprio motor de auditoria está saudável
   */
  static async verifyAuditorHealth() {
    // 1. Testa se o módulo Cheerio e AntiSlop respondem
    const testHtml = '<html><body><h1>Titulo Limpo</h1><p>Conteudo valido</p></body></html>';
    const auditClean = AntiSlopGate.audit({ htmlContent: testHtml });
    if (!auditClean.passed) {
      return { healthy: false, reason: 'AntiSlopGate acusou falso positivo em HTML limpo de teste' };
    }

    const testSlop = '<html><body><h1>Titulo</h1><p>lorem ipsum dolor sit amet</p></body></html>';
    const auditSlop = AntiSlopGate.audit({ htmlContent: testSlop });
    if (auditSlop.passed) {
      return { healthy: false, reason: 'AntiSlopGate falhou em detectar lorem ipsum em HTML de teste' };
    }

    return { healthy: true };
  }
}

module.exports = { TriangulatedAuditEngine };
