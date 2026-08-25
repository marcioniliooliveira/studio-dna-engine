const fs = require('fs');
const path = require('path');
const { injectContentSlots } = require('./slot-injector');

/**
 * Client Project Factory (Fábrica de Clientes One-Shot)
 * Cria uma pasta de cliente isolada, desacoplada do scraper, aplicando a metodologia ICM.
 */
function createClientProject({ brandName, refSlug = 'storeyarchitecture-co-uk', brandSpec = {} }) {
  const clientSlug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const clientDir = path.resolve(__dirname, `../../clientes/${clientSlug}`);
  const siteDir = path.join(clientDir, 'site');
  const refDir = path.resolve(__dirname, `../../copias/${refSlug}`);

  console.log(`\n🚀 [Client Factory] Inicializando projeto para: "${brandName}"...`);
  console.log(`📁 Diretório de Destino: ${clientDir}`);
  console.log(`🧬 Referência Arquitetural: ${refSlug}\n`);

  // 1. Criar estrutura de pastas do cliente
  fs.mkdirSync(clientDir, { recursive: true });
  fs.mkdirSync(siteDir, { recursive: true });

  // 2. Salvar briefing e especificação da marca
  const finalSpec = {
    brandName,
    clientSlug,
    createdAt: new Date().toISOString(),
    referenceUsed: refSlug,
    niche: brandSpec.niche || 'Geral',
    toneOfVoice: brandSpec.toneOfVoice || 'Premium e Minimalista',
    primaryColor: brandSpec.primaryColor || '#FFFFFF',
    secondaryColor: brandSpec.secondaryColor || '#080A12',
    ...brandSpec
  };

  fs.writeFileSync(path.join(clientDir, 'brand-spec.json'), JSON.stringify(finalSpec, null, 2));

  // 3. Copiar assets estáticos essenciais da referência
  const refAssets = path.join(refDir, 'site/assets');
  const clientAssets = path.join(siteDir, 'assets');
  if (fs.existsSync(refAssets)) {
    fs.cpSync(refAssets, clientAssets, { recursive: true });
    console.log(`📦 Assets essenciais copiados para o projeto do cliente.`);
  }

  // 4. Copiar o HTML esqueleto / base
  const refIndex = path.join(refDir, 'site/index.html');
  const clientIndex = path.join(siteDir, 'index.html');
  if (fs.existsSync(refIndex)) {
    fs.copyFileSync(refIndex, clientIndex);
  }

  // 5. Criar package.json de produção ultra-leve para o cliente
  const clientPackageJson = {
    name: clientSlug,
    version: "1.0.0",
    private: true,
    description: `Site de Alta Performance para ${brandName}`,
    scripts: {
      "dev": "serve site -l 3000",
      "start": "serve site -l 3000"
    },
    dependencies: {
      "serve": "^14.2.0"
    }
  };
  fs.writeFileSync(path.join(clientDir, 'package.json'), JSON.stringify(clientPackageJson, null, 2));

  console.log(`✅ [Client Factory] Projeto criado com sucesso em: ${clientDir}`);
  console.log(`🌐 Pronto para rodar ou publicar no Vercel/Edge CDN.\n`);

  return { clientDir, siteDir, clientSlug };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const brandArg = args.find((_, i) => args[i - 1] === '--brand') || 'Nova Marca';
  const refArg = args.find((_, i) => args[i - 1] === '--ref') || 'storeyarchitecture-co-uk';

  createClientProject({
    brandName: brandArg,
    refSlug: refArg
  });
}

module.exports = { createClientProject };
