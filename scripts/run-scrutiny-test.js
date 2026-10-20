const path = require('path');
const { DeepScrutinyGate } = require('../src/qa/deep-scrutiny-gate');

async function main() {
  const clientSlug = process.argv[2] || 'flashtech-caso-04-growth';
  console.log(`🛡️ Executando Cerco de Escrutínio (DeepScrutinyGate) no cliente: ${clientSlug}...`);
  const siteDir = path.resolve(__dirname, '..', 'clientes', clientSlug, 'site');

  const report = await DeepScrutinyGate.audit({
    siteDir,
    clientSlug,
    headless: true
  });

  console.log('\n================ RESULTADOS DO ESCRUTÍNIO ================');
  console.log(`Status Geral Aprovado: ${report.passed}`);
  console.log(`[Vetor 1] AABB Text Overlap: Passed=${report.vetores.aabbOverlap.passed}, Collisions=${report.vetores.aabbOverlap.collisionsCount}`);
  console.log(`[Vetor 2] Stuck Hover State: Passed=${report.vetores.stuckHoverState.passed}, Leaks=${report.vetores.stuckHoverState.leaksCount}`);
  console.log(`[Vetor 3] Language Leak: Passed=${report.vetores.languageLeak.passed}, Untranslated=${report.vetores.languageLeak.untranslatedCount}`);
  console.log(`[Vetor 4] Layout Bleed: Passed=${report.vetores.layoutBleed.passed}, Bleeding=${report.vetores.layoutBleed.bleedingElementsCount}`);
  console.log(`[Vetor 5] Anchor Integrity: Passed=${report.vetores.anchorIntegrity.passed}, Broken=${report.vetores.anchorIntegrity.brokenAnchorsCount}`);
  console.log(`[Vetor 6] Sticky Scroll Integrity: Passed=${report.vetores.stickyIntegrity.passed}, BrokenStickies=${report.vetores.stickyIntegrity.brokenStickyCount}`);
  console.log(`[Vetor 7] Click Hijack Hit-Test: Passed=${report.vetores.clickHijack.passed}, Hijacked=${report.vetores.clickHijack.hijackedCount}`);
  if (report.vetores.scrollScrubber) {
    console.log(`[Vetor 8] ScrollScrubber Inter-Section Collision: Passed=${report.vetores.scrollScrubber.passed}, Collisions=${report.vetores.scrollScrubber.collisionsCount}`);
  }
  console.log('==========================================================\n');

  if (!report.passed) {
    console.log('🔍 Evidência das Falhas Detectadas:');
    if (report.vetores.stickyIntegrity && report.vetores.stickyIntegrity.brokenStickies.length) {
      console.log(' - Exemplos de Sticky Quebrado:', JSON.stringify(report.vetores.stickyIntegrity.brokenStickies.slice(0, 3), null, 2));
    }
    if (report.vetores.clickHijack && report.vetores.clickHijack.hijackedTargets.length) {
      console.log(' - Exemplos de Click Hijacking:', JSON.stringify(report.vetores.clickHijack.hijackedTargets.slice(0, 3), null, 2));
    }
    if (report.vetores.aabbOverlap.collisions.length) {
      console.log(' - Exemplos de Colisão AABB:', report.vetores.aabbOverlap.collisions.slice(0, 3));
    }
    if (report.vetores.layoutBleed && report.vetores.layoutBleed.bleeding.length) {
      console.log(' - Exemplos de Layout Bleed:', JSON.stringify(report.vetores.layoutBleed.bleeding, null, 2));
    }
  }
}

main().catch(console.error);
