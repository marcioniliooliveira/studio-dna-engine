const path = require('path');
const { UnifiedQualityGate } = require('../src/qa/unified-quality-gate');

async function auditScalex() {
  console.log('🧪 Iniciando auditoria do UnifiedQualityGate para flashtech-caso-04-growth...');
  const siteDir = path.resolve(__dirname, '..', 'clientes', 'flashtech-caso-04-growth', 'site');
  const refDir = path.resolve(__dirname, '..', 'copias', 'acilav-webflow-io');

  const report = await UnifiedQualityGate.auditSite({
    siteDir,
    clientSlug: 'flashtech-caso-04-growth',
    refDir,
    originalBrandKeywords: ['acilav-webflow-io'],
    headless: true
  });

  console.log('\n================ AUDITORIA COMPLETA ================');
  console.log(`Status: ${report.status}`);
  console.log(`Passed: ${report.passed}`);
  console.log(`JS Errors: ${report.gates.console.errorsCount}`);
  console.log(`Failed Requests: ${report.gates.network.failedRequestsCount}`);
  console.log(`Broken Images: ${report.gates.structural.brokenImagesCount}`);
  console.log(`Anti-Slop Passed: ${report.gates.antiSlop.passed}`);
  if (report.gates.antiSlop.violations.length) {
    console.log('Violations:', report.gates.antiSlop.violations);
  }
  console.log('====================================================');
  return report;
}

auditScalex().then(report => {
  if (!report.passed) process.exitCode = 1;
}).catch(err => {
  console.error('❌ Erro na auditoria:', err);
  process.exitCode = 1;
});
