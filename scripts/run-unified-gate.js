const path = require('path');
const fs = require('fs');
const { UnifiedQualityGate } = require('../src/qa/unified-quality-gate');

async function main() {
  const clientSlug = process.argv[2] || 'negocia-bem';
  console.log(`🧪 Iniciando auditoria do UnifiedQualityGate no cliente: ${clientSlug}...`);

  const clientDir = path.resolve(__dirname, '..', 'clientes', clientSlug);
  const siteDir = path.join(clientDir, 'site');

  let refDir = null;
  let originalKeywords = [];
  const refSelectionPath = path.join(clientDir, 'reference-selection.json');
  if (fs.existsSync(refSelectionPath)) {
    try {
      const refSelection = JSON.parse(fs.readFileSync(refSelectionPath, 'utf8'));
      if (refSelection.selectedRefSlug) {
        refDir = path.resolve(__dirname, '..', 'copias', refSelection.selectedRefSlug);
        originalKeywords.push(refSelection.selectedRefSlug);
      }
    } catch (e) {}
  }

  const report = await UnifiedQualityGate.auditSite({
    siteDir,
    clientSlug,
    refDir,
    originalBrandKeywords: originalKeywords,
    headless: true
  });

  console.log('\n================ UNIFIED QUALITY GATE REPORT ================');
  console.log(`Status Geral: ${report.status.toUpperCase()} (Passed: ${report.passed})`);
  console.log(`Console Gate (JS Errors): Passed=${report.gates.console.passed}, Errors=${report.gates.console.errorsCount}`);
  console.log(`Network Gate (Failed Requests): Passed=${report.gates.network.passed}, Failed=${report.gates.network.failedRequestsCount}`);
  console.log(`Structural Gate (Broken Images): Passed=${report.gates.structural.passed}, Broken=${report.gates.structural.brokenImagesCount}, Total=${report.gates.structural.totalImages}`);
  console.log(`Anti-Slop Gate: Passed=${report.gates.antiSlop.passed}, Violations=${report.gates.antiSlop.violations.length}`);
  console.log('=============================================================\n');

  if (!report.passed) {
    console.log('🔍 Evidência das Falhas Detectadas:');
    if (report.gates.console.errors && report.gates.console.errors.length) {
      console.log(' - JS Errors:', JSON.stringify(report.gates.console.errors, null, 2));
    }
    if (report.gates.network.failures && report.gates.network.failures.length) {
      console.log(' - Network Failures:', JSON.stringify(report.gates.network.failures, null, 2));
    }
    if (report.gates.structural.brokenImages && report.gates.structural.brokenImages.length) {
      console.log(' - Broken Images:', JSON.stringify(report.gates.structural.brokenImages, null, 2));
    }
    if (report.gates.antiSlop.violations && report.gates.antiSlop.violations.length) {
      console.log(' - Anti-Slop Violations:', JSON.stringify(report.gates.antiSlop.violations, null, 2));
    }
  }

  return report;
}

if (require.main === module) {
  main().then(report => {
    if (!report.passed) process.exitCode = 1;
  }).catch(err => {
    console.error('❌ Erro na execução do UnifiedQualityGate:', err);
    process.exitCode = 1;
  });
}

module.exports = { main };
