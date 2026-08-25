const fs = require('fs');
const path = require('path');

/**
 * Injetor Mecânico de Slots (Zero-Token Cost)
 * Lê o esqueleto do Estágio 02 e o JSON de copy do Estágio 03, gerando o HTML final do Estágio 04 deterministicamente.
 */
function injectContentSlots({ skeletonPath, contentSlotsPath, outputPath }) {
  if (!fs.existsSync(skeletonPath)) {
    throw new Error(`Esqueleto não encontrado: ${skeletonPath}`);
  }
  if (!fs.existsSync(contentSlotsPath)) {
    throw new Error(`Arquivo de slots não encontrado: ${contentSlotsPath}`);
  }

  let skeleton = fs.readFileSync(skeletonPath, 'utf8');
  const slotsData = JSON.parse(fs.readFileSync(contentSlotsPath, 'utf8'));

  // 1. Substituir variáveis {SLOT_KEY}
  let replacedCount = 0;
  function replaceDeep(obj, prefix = '') {
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      const slotKey = prefix ? `${prefix}_${key.toUpperCase()}` : `SLOT_${key.toUpperCase()}`;
      if (typeof val === 'string' || typeof val === 'number') {
        const regex = new RegExp(`\\{${slotKey}\\}`, 'g');
        if (regex.test(skeleton)) {
          skeleton = skeleton.replace(regex, val);
          replacedCount++;
        }
      } else if (typeof val === 'object' && val !== null) {
        replaceDeep(val, slotKey);
      }
    }
  }

  replaceDeep(slotsData);

  // 2. Garantir diretório de saída
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, skeleton, 'utf8');

  console.log(`✅ [Slot Injector] Injeção concluída com sucesso! ${replacedCount} slots substituídos em: ${outputPath}`);
  return { outputPath, replacedCount };
}

module.exports = {
  injectContentSlots
};
