/**
 * scripts/cleanup-scratch.js
 * 
 * Infraestrutura de Limpeza e Higiene do Repositório.
 * Purga com segurança arquivos temporários em scratch/
 * garantindo que o repositório permaneça limpo após auditorias.
 */

const fs = require('fs');
const path = require('path');

const scratchDir = path.resolve(__dirname, '..', 'scratch');

if (fs.existsSync(scratchDir)) {
  const files = fs.readdirSync(scratchDir);
  let removedCount = 0;
  files.forEach(file => {
    const fullPath = path.join(scratchDir, file);
    try {
      if (fs.statSync(fullPath).isFile()) {
        fs.unlinkSync(fullPath);
        removedCount++;
      }
    } catch (err) {
      console.warn(`Não foi possível remover ${file}:`, err.message);
    }
  });
  console.log(`🧹 Higienização concluída: ${removedCount} arquivo(s) temporário(s) removido(s) de scratch/.`);
} else {
  console.log('✨ scratch/ já está limpo.');
}
