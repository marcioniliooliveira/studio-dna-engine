const { execSync } = require('child_process');

console.log('======================================================================');
console.log('🚀 EXECUTANDO SUÍTE INTEGRADA DO ECOSSISTEMA COMPLETO NEGOCIA BEM');
console.log('======================================================================\n');

const suites = [
  { name: '1. Testes Unitários do Dataset Negocia Bem', cmd: 'node test/negociabem-data.test.js' },
  { name: '2. Verificação do Catálogo Autônomo Final (catalogo-imoveis.html)', cmd: 'node scripts/verify_catalogo_imoveis.js' },
  { name: '3. Verificação da Modernização Segura do index.html', cmd: 'node scripts/verify_index_modernization.js' }
];

let totalPassedSuites = 0;

suites.forEach(s => {
  console.log(`\n▶ Executando: ${s.name}...`);
  try {
    const output = execSync(s.cmd, { encoding: 'utf8' });
    console.log(output);
    totalPassedSuites++;
  } catch(err) {
    console.error(`❌ Falha na suíte: ${s.name}`);
    console.error(err.stdout || err.message);
    process.exit(1);
  }
});

console.log('======================================================================');
console.log(`🎉 TODAS AS ${totalPassedSuites} SUÍTES DE TESTE DO ECOSSISTEMA FORAM APROVADAS COM SUCESSO!`);
console.log('======================================================================');
