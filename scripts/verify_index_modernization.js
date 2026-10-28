const fs = require('fs');
const path = require('path');

console.log('======================================================================');
console.log('🧪 VERIFICANDO MODERNIZAÇÃO DO INDEX.HTML (FASE 2: ZERO SLOP & ZERO REGRESSÕES)');
console.log('======================================================================');

const targetPath = path.resolve(__dirname, '../studio-dna-engine/clientes/negocia-bem/site/index.html');
const mirrorPath = path.resolve(__dirname, '../studio-dna-engine/clientes/negociabem/site/index.html');

const fileExists = fs.existsSync(targetPath);
const mirrorExists = fs.existsSync(mirrorPath);
const html = fileExists ? fs.readFileSync(targetPath, 'utf8') : '';

console.log(`Target path: ${targetPath}`);
console.log(`File status: ${fileExists ? `EXISTS (${html.length} bytes)` : 'MISSING'}\n`);

const tests = [
  // Test 1: File existence and non-empty
  {
    id: 1,
    name: 'Arquivo index.html existe e possui conteúdo íntegro',
    fn: () => {
      if (!fileExists) throw new Error('index.html não foi encontrado');
      if (html.length < 50000) throw new Error(`index.html parece corrompido ou truncado: ${html.length} bytes`);
      return true;
    }
  },

  // Test 2: Erradicação Total de Space Mono
  {
    id: 2,
    name: 'Erradicação total de Space Mono (0 Space Mono, 0 font-mono; unificado em Inter/Jakarta)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      const matches = html.match(/Space\s*Mono|Space\+Mono|Space_Mono|font-mono/gi) || [];
      if (matches.length > 0) {
        throw new Error(`Encontradas ${matches.length} ocorrências de Space Mono / font-mono no index.html!`);
      }
      return true;
    }
  },

  // Test 3: Zero Green Glow nos Botões e Elementos
  {
    id: 3,
    name: 'Zero glow verde em box-shadow (box-shadow: none !important em hover, hover sólido)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      const glowMatches = html.match(/box-shadow:[^;]*rgba\(\s*62\s*,\s*155\s*,\s*103[^;]*/gi) || [];
      if (glowMatches.length > 0) {
        throw new Error(`Encontradas ${glowMatches.length} regras de glow verde em box-shadow:\n${glowMatches.join('\n')}`);
      }
      return true;
    }
  },

  // Test 4: Botões Vazados Universais com Hover Sólido
  {
    id: 4,
    name: 'Botões vazados universais (.primary-btn, .nav-cta com borda verde, hover sólido sem glow)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      const hasOutlinedStyle = html.includes('border: 1px solid var(--green)') || html.includes('border: 1px solid #3E9B67');
      if (!hasOutlinedStyle) {
        throw new Error('Falta estilo vazado com borda verde nos botões principais do index.html');
      }
      return true;
    }
  },

  // Test 5: Dual Text Reveal Simultâneo na Hero
  {
    id: 5,
    name: 'Dual Text Reveal simultâneo na Hero com desfoque óptico e stagger: 0',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      const hasDualRevealAttr = html.includes('data-dual-reveal');
      if (!hasDualRevealAttr) {
        throw new Error('Falta atributo data-dual-reveal no título da Hero do index.html');
      }
      const hasMarkup = html.includes('class="reveal-normal"') && html.includes('reveal-highlight');
      if (!hasMarkup) {
        throw new Error('Falta marcação HTML das classes reveal-normal e reveal-highlight no H1');
      }
      const hasSimultaneousStagger = html.includes('stagger: 0');
      if (!hasSimultaneousStagger) {
        throw new Error('Falta configuração de revelação simultânea dos destaques (stagger: 0)');
      }
      return true;
    }
  },

  // Test 6: Conexão das Rotas de Catálogo com catalogo-imoveis.html
  {
    id: 6,
    name: 'Conexão limpa das rotas de catálogo com catalogo-imoveis.html',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      const hasCatalogoLink = html.includes('catalogo-imoveis.html');
      if (!hasCatalogoLink) {
        throw new Error('Os pontos de entrada de compra de casas devem conectar ao novo catalogo-imoveis.html');
      }
      const hasModalRedirect = html.includes("if (key === 'comprar-casas')");
      if (!hasModalRedirect) {
        throw new Error('Falta redirecionamento no openModal para a rota comprar-casas');
      }
      return true;
    }
  },

  // Test 7: Preservação Estrita da Sessão 02 (O Valor de um Sonho - Pinning e Narrativa)
  {
    id: 7,
    name: 'Preservação estrita da Sessão 02 (#sessao-02, pinning horizontal/vertical e narrativa)',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('id="sessao-02"')) {
        throw new Error('Falta #sessao-02 no index.html!');
      }
      if (!html.includes('Toda conquista começa com um desejo')) {
        throw new Error('Texto da Sessão 02 foi quebrado ou removido!');
      }
      return true;
    }
  },

  // Test 8: Preservação de Perto de Tudo, Oportunidades, FAQ, Rodapé e Lenis
  {
    id: 8,
    name: 'Preservação de Perto de Tudo, Oportunidades, FAQ Accordion, Rodapé e Lenis',
    fn: () => {
      if (!fileExists) throw new Error('Arquivo não existe');
      if (!html.includes('id="perto-de-tudo"')) throw new Error('Falta #perto-de-tudo no index.html!');
      if (!html.includes('id="oportunidades"')) throw new Error('Falta #oportunidades no index.html!');
      if (!html.includes('id="faq"')) throw new Error('Falta #faq no index.html!');
      if (!html.includes('id="negocia-footer"')) throw new Error('Falta #negocia-footer no index.html!');
      if (!html.includes('lenis') && !html.includes('ScrollTrigger')) {
        throw new Error('Mecanismos de animação e scroll foram comprometidos!');
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
  console.log('🎉 TODOS OS TESTES DE MODERNIZAÇÃO DO INDEX.HTML APROVADOS (100% SUCESSO)');
  process.exit(0);
} else {
  console.log(`⚠️  ${failed} teste(s) falharam conforme esperado no ciclo RED antes da modernização.`);
  process.exit(1);
}
