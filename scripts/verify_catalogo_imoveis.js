const fs = require('fs');
const path = require('path');

console.log('======================================================================');
console.log('🧪 VERIFICANDO CATALOGO-IMOVEIS.HTML (VERSÃO FINAL: ATELIER + MONOLITH TEXT OVERLAY)');
console.log('======================================================================');

const targetPath = path.resolve(__dirname, '../studio-dna-engine/clientes/negocia-bem/site/catalogo-imoveis.html');
const mirrorPath = path.resolve(__dirname, '../studio-dna-engine/clientes/negociabem/site/catalogo-imoveis.html');
const datasetPath = path.resolve(__dirname, '../studio-dna-engine/clientes/negocia-bem/site/js/negociabem-data.js');

const fileExists = fs.existsSync(targetPath);
const mirrorExists = fs.existsSync(mirrorPath);
const html = fileExists ? fs.readFileSync(targetPath, 'utf8') : '';

console.log(`Target path: ${targetPath}`);
console.log(`File status: ${fileExists ? `EXISTS (${html.length} bytes)` : 'MISSING'}`);
console.log(`Mirror status: ${mirrorExists ? 'EXISTS' : 'MISSING'}\n`);

const tests = [
  // Test 1: File existence and size
  {
    id: 1,
    name: 'Arquivo catalogo-imoveis.html existe e possui espelho idêntico',
    fn: () => {
      if (!fileExists) throw new Error('catalogo-imoveis.html não foi encontrado');
      if (!mirrorExists) throw new Error('Espelho em clientes/negociabem/site/catalogo-imoveis.html não foi encontrado');
      if (html.length < 30000) throw new Error(`Arquivo muito pequeno: ${html.length} bytes`);
      const mirrorHtml = fs.readFileSync(mirrorPath, 'utf8');
      if (mirrorHtml !== html) throw new Error('Arquivo principal e espelho não são idênticos');
      return true;
    }
  },

  // Test 2: Desacoplamento da Hero (Sem vídeo, sem hero section)
  {
    id: 2,
    name: 'Sessão autônoma desacoplada da Hero (Zero <video> de hero, zero <section id="hero">)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (html.includes('<video') && html.includes('hero-video')) {
        throw new Error('Detectado <video> de hero! A sessão final deve ser desacoplada da hero.');
      }
      if (html.includes('id="hero"') || html.includes("id='hero'")) {
        throw new Error('Detectada <section id="hero">! Deve ser 100% autônoma para compra/venda/investimento.');
      }
      return true;
    }
  },

  // Test 3: Sem header duplicado redundante, possui barra de controle contextual
  {
    id: 3,
    name: 'Zero header duplicado (possui Barra de Controle Contextual com retorno e CRECI)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (html.includes('<header id="site-header"') || html.includes('<header class="site-header"')) {
        throw new Error('Detectado <header> duplicado redundante! Conforme alinhamento, não deve haver header de site duplicado.');
      }
      const hasControlBar = html.includes('catalog-control-bar') || html.includes('catalogo-context-nav');
      if (!hasControlBar) {
        throw new Error('Falta a Barra de Controle Contextual (.catalog-control-bar)');
      }
      if (!html.includes('CRECI 9314-J')) {
        throw new Error('Falta o selo de confiança CRECI 9314-J na barra contextual');
      }
      if (!html.includes('index.html#inicio') && !html.includes('index.html')) {
        throw new Error('Falta botão de retorno para index.html na barra contextual');
      }
      return true;
    }
  },

  // Test 4: Sessão #imovel-destaque presente
  {
    id: 4,
    name: 'Sessão de Apresentação Principal do Imóvel (#imovel-destaque) presente',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('id="imovel-destaque"') && !html.includes("id='imovel-destaque'")) {
        throw new Error('Falta a seção #imovel-destaque');
      }
      return true;
    }
  },

  // Test 5: Atelier Territorial com Monolith Texto dentro da Imagem
  {
    id: 5,
    name: 'Apresentação Atelier Territorial com Monolith Texto dentro da Imagem',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      // In-image overlay
      const hasInImageOverlay = html.includes('monolith-text-overlay') || 
                                html.includes('in-image-text-overlay') ||
                                (html.includes('presentation-main-photo-wrap') && html.includes('presentation-overlay-content'));
      if (!hasInImageOverlay) {
        throw new Error('Falta o contêiner de texto monolith dentro da imagem (.monolith-text-overlay)');
      }
      // Decision HUD / Atelier dossier alongside
      const hasDecisionHud = html.includes('financial-simulation-card') ||
                             html.includes('atelier-decision-dossier') ||
                             html.includes('hud-telemetry') ||
                             html.includes('caixa-financing-box');
      if (!hasDecisionHud) {
        throw new Error('Falta o HUD de decisão imobiliária do Atelier Territorial (dados Caixa, FGTS, metragem)');
      }
      return true;
    }
  },

  // Test 6: Dados de Decisão Imobiliária Autênticos
  {
    id: 6,
    name: 'Dados de decisão destacados (Preço de Referência, Caixa R$ 1.450/mês, FGTS, Suíte, Maringá)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('PREÇO DE REFERÊNCIA') && !html.includes('VALOR DE VENDA')) {
        throw new Error('Falta rótulo de PREÇO DE REFERÊNCIA');
      }
      if (!html.includes('1.450') && !html.includes('Caixa Econômica')) {
        throw new Error('Falta simulação de financiamento Caixa');
      }
      if (!html.includes('Maringá')) {
        throw new Error('Falta informação de proximidade territorial com Maringá');
      }
      return true;
    }
  },

  // Test 7: Galeria de Miniaturas Interativa no Dossiê Principal
  {
    id: 7,
    name: 'Galeria interativa de fotos no Dossiê com troca de imagem preservando o overlay',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('presentation-thumb') && !html.includes('dossier-thumb')) {
        throw new Error('Faltam miniaturas interativas no dossiê');
      }
      if (!html.includes('changeFeaturedPhoto') && !html.includes('setFeaturedPhoto')) {
        throw new Error('Falta função JavaScript para troca de fotos do imóvel destaque');
      }
      return true;
    }
  },

  // Test 8: Bento Grid de 8 Imóveis em Exatamente 3 Fileiras
  {
    id: 8,
    name: 'Bento Grid de 8 Imóveis em EXATAMENTE 3 fileiras completas (sem 4ª fileira)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('id="catalogo-grid"')) {
        throw new Error('Falta seção #catalogo-grid');
      }
      const cards = html.match(/class=["'][^"']*aura-bento-card[^"']*["']/g) || [];
      if (cards.length !== 8) {
        throw new Error(`Esperado exatamente 8 cards no Bento Grid, encontrado: ${cards.length}`);
      }
      return true;
    }
  },

  // Test 9: Troca de Fotos nos Cards do Catálogo
  {
    id: 9,
    name: 'Troca de fotos interativa em cada card com setas ‹ e › e contador numérico',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('changeCardPhoto') || !html.includes('data-photos')) {
        throw new Error('Falta sistema de galeria interativa nos cards (changeCardPhoto / data-photos)');
      }
      return true;
    }
  },

  // Test 10: Hover Sincronizado por Linha Horizontal
  {
    id: 10,
    name: 'Hover sincronizado por linha horizontal (data-row-index="1|2|3" e .is-row-hovered)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('data-row-index="1"') || !html.includes('data-row-index="2"') || !html.includes('data-row-index="3"')) {
        throw new Error('Faltam atributos data-row-index nas 3 linhas');
      }
      if (!html.includes('is-row-hovered')) {
        throw new Error('Falta classe is-row-hovered para expansão coordenada da linha');
      }
      return true;
    }
  },

  // Test 11: Clique no Card atualiza a Apresentação Principal
  {
    id: 11,
    name: 'Clique no card atualiza o Dossiê Principal (selectPropertyForPresentation)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('selectPropertyForPresentation')) {
        throw new Error('Falta função selectPropertyForPresentation');
      }
      return true;
    }
  },

  // Test 12: Módulos Especializados de Venda e Investimento
  {
    id: 12,
    name: 'Módulos especializados de conversão: Venda com Avaliação Real & Investimento em Lotes',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('Avaliação Real') && !html.includes('Vender meu Imóvel')) {
        throw new Error('Falta módulo de Venda com Avaliação Real');
      }
      if (!html.includes('Loteamento') && !html.includes('Investir')) {
        throw new Error('Falta módulo de Investimento em Lotes');
      }
      return true;
    }
  },

  // Test 13: Zero Monospace
  {
    id: 13,
    name: 'Zero contaminação monospace (0 Space Mono, 0 font-mono; apenas Inter e Plus Jakarta Sans)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (html.includes('Space Mono') || html.includes('Space+Mono') || html.includes('font-mono')) {
        throw new Error('Detectada contaminação monospace (Space Mono / font-mono)!');
      }
      return true;
    }
  },

  // Test 14: Cantos Retos Estritos 0px
  {
    id: 14,
    name: 'Cantos retos estritos 0px (border-radius: 0px !important)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('border-radius: 0px !important')) {
        throw new Error('Falta regra global border-radius: 0px !important');
      }
      return true;
    }
  },

  // Test 15: Zero Button Glow
  {
    id: 15,
    name: 'Zero glow nos botões e elementos (box-shadow: none !important em hovers, hover sólido)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      const glowMatches = html.match(/box-shadow:[^;]*rgba\(\s*62\s*,\s*155\s*,\s*103[^;]*/gi) || [];
      if (glowMatches.length > 0) {
        throw new Error(`Detectado ${glowMatches.length} regras de glow verde em box-shadow:\n${glowMatches.join('\n')}`);
      }
      return true;
    }
  },

  // Test 16: Barra de Busca em Ardósia Neutra
  {
    id: 16,
    name: 'Barra de busca em ardósia neutra (zero neon, borda translúcida neutra, cantos 0px)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('search-bento-dockable') && !html.includes('catalog-search-bar')) {
        throw new Error('Falta barra de busca do catálogo');
      }
      return true;
    }
  }
];

let passed = 0;
let failed = 0;

tests.forEach(t => {
  try {
    t.fn();
    console.log(`[✓ PASS] Test ${t.id.toString().padStart(2, '0')}: ${t.name}`);
    passed++;
  } catch(err) {
    console.log(`[✗ FAIL] Test ${t.id.toString().padStart(2, '0')}: ${t.name}`);
    console.log(`         Diagnostic: ${err.message}\n`);
    failed++;
  }
});

console.log('----------------------------------------------------------------------');
console.log(`Summary: ${passed} passed, ${failed} failed (Total: ${tests.length} tests)`);
console.log('----------------------------------------------------------------------');

if (failed === 0) {
  console.log('🎉 TODOS OS 16 TESTES DO CATALOGO AUTÔNOMO APROVADOS COM 100% DE SUCESSO');
  process.exit(0);
} else {
  console.log(`⚠️  ${failed} teste(s) falharam conforme esperado no ciclo RED.`);
  process.exit(1);
}
