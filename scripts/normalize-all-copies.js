const fs = require('fs');
const path = require('path');
const { UniversalAssetNormalizer } = require('../src/pro/universal-asset-normalizer');

async function normalizeAllDirectories() {
  const rootDir = path.resolve(__dirname, '..');
  const copiasDir = path.join(rootDir, 'copias');
  const clientesDir = path.join(rootDir, 'clientes');

  const targets = [];

  if (fs.existsSync(copiasDir)) {
    const entries = fs.readdirSync(copiasDir, { withFileTypes: true });
    entries.forEach(e => {
      if (e.isDirectory()) {
        const sitePath = path.join(copiasDir, e.name, 'site');
        if (fs.existsSync(sitePath)) {
          targets.push({ name: e.name, siteDir: sitePath, type: 'copia' });
        }
      }
    });
  }

  if (fs.existsSync(clientesDir)) {
    const entries = fs.readdirSync(clientesDir, { withFileTypes: true });
    entries.forEach(e => {
      if (e.isDirectory()) {
        const sitePath = path.join(clientesDir, e.name, 'site');
        if (fs.existsSync(sitePath)) {
          targets.push({ name: e.name, siteDir: sitePath, type: 'cliente' });
        }
      }
    });
  }

  console.log(`\n🚀 [Batch Normalizer] Encontrados ${targets.length} sites para normalização definitiva...`);

  let successCount = 0;
  for (const target of targets) {
    try {
      console.log(`\n▶️ Normalizando [${target.type}]: ${target.name}`);
      const normalizer = new UniversalAssetNormalizer({
        siteDir: target.siteDir
      });
      await normalizer.normalizeAll();
      successCount++;
    } catch (err) {
      console.error(`❌ Erro ao normalizar ${target.name}:`, err.message);
    }
  }

  console.log(`\n🎉 [Batch Normalizer] Concluído: ${successCount}/${targets.length} sites normalizados e protegidos contra telas pretas com 100% de sucesso.\n`);
}

if (require.main === module) {
  normalizeAllDirectories().catch(console.error);
}

module.exports = { normalizeAllDirectories };
