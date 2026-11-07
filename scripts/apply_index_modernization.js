const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '../studio-dna-engine/clientes/negocia-bem/site/index.html');
const mirrorPath = path.resolve(__dirname, '../studio-dna-engine/clientes/negociabem/site/index.html');

let content = fs.readFileSync(targetPath, 'utf8');

console.log('Modernizing index.html...');
console.log('Original length:', content.length);

// 1. Erradicar Space Mono da tag <link> de fontes
content = content.replace(
  '&family=Space+Mono:wght@400;700',
  ''
);

// 2. Erradicar 'Space Mono', monospace do CSS
content = content.replace(/'Space Mono',\s*monospace/g, "'Inter', sans-serif");
content = content.replace(/font:\s*700\s*11px\s*'Inter',\s*sans-serif/g, "font: 700 11px 'Inter', sans-serif");

// 3. Erradicar font-['Space_Mono'] e font-['Space Mono'] do HTML
content = content.replace(/font-\['Space_Mono'\]/g, "font-['Inter'] font-semibold");
content = content.replace(/font-\['Space Mono'\]/g, "font-['Inter'] font-semibold");
content = content.replace(/\bfont-mono\b/g, "font-sans");

// 4. Garantir botões vazados universais sem glow e com hover sólido verde
const buttonHoverStyle = `
    /* BOTÕES VAZADOS COM HOVER SÓLIDO E ZERO GLOW */
    .primary-btn, .nav-cta, .btn-vazado {
      border: 1px solid var(--green) !important;
      background: rgba(62, 155, 103, 0.08) !important;
      color: #FFFFFF !important;
      border-radius: 0px !important;
      box-shadow: none !important;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .primary-btn:hover, .nav-cta:hover, .btn-vazado:hover {
      background: var(--green) !important;
      color: #0D1117 !important;
      border-color: var(--green) !important;
      box-shadow: none !important;
      transform: translateY(-1px);
    }
`;

if (!content.includes('/* BOTÕES VAZADOS COM HOVER SÓLIDO E ZERO GLOW */')) {
  content = content.replace('</style>', `${buttonHoverStyle}\n  </style>`);
}

// 5. Hero Title com data-dual-reveal e classes reveal-normal / reveal-highlight
content = content.replace(
  /<h1 class="hero-title"[\s\S]*?<\/h1>/,
  `<h1 class="hero-title" data-dual-reveal>
                <span class="reveal-normal">NEGOCIA</span>
                <span class="green-text reveal-highlight">BEM</span>
              </h1>`
);

// 6. Conexão dos pontos de entrada com catalogo-imoveis.html
// 6a. Nav
content = content.replace(
  /<button data-route="comprar-casas" type="button">COMPRAR CASAS<\/button>/g,
  '<a href="catalogo-imoveis.html" class="nav-link-btn" data-route="comprar-casas">COMPRAR CASAS</a>'
);
content = content.replace(
  /<button data-route="alugar-imoveis" type="button">ALUGAR IMÓVEIS<\/button>/g,
  '<a href="catalogo-imoveis.html#catalogo-grid" class="nav-link-btn" data-route="alugar-imoveis">ALUGAR IMÓVEIS</a>'
);
content = content.replace(
  /<button data-route="comprar-terrenos" type="button">INVESTIR EM LOTES<\/button>/g,
  '<a href="catalogo-imoveis.html#investimento-lotes" class="nav-link-btn" data-route="comprar-terrenos">INVESTIR EM LOTES</a>'
);

// 6b. Hero CTA
content = content.replace(
  /<button class="primary-btn" data-route="comprar-casas"[\s\S]*?<\/button>/,
  `<a href="catalogo-imoveis.html" class="primary-btn" data-route="comprar-casas">
                CONHECER OPORTUNIDADES <span>↗</span>
              </a>`
);

// 6c. Sessão 02 CTAs
content = content.replace(
  /data-route="comprar-casas" type="button">(\s*EXPLORAR CASAS DISPONÍVEIS)/g,
  'data-route="comprar-casas" href="catalogo-imoveis.html">$1'
);
content = content.replace(
  /data-route="comprar-terrenos" type="button">(\s*VER TERRENOS & LOTES PARA INVESTIR)/g,
  'data-route="comprar-terrenos" href="catalogo-imoveis.html#investimento-lotes">$1'
);
content = content.replace(
  /data-route="alugar-imoveis" type="button">(\s*CONSULTAR IMÓVEIS PARA LOCAÇÃO)/g,
  'data-route="alugar-imoveis" href="catalogo-imoveis.html#catalogo-grid">$1'
);

// 7. Roteamento JS e openModal para redirecionar para o novo catálogo autônomo
const routerInjection = `
    // Redirecionamento da rota comprar-casas para o novo catálogo autônomo
    if (location.hash === '#comprar-casas') {
      location.href = 'catalogo-imoveis.html';
    }
`;
if (!content.includes('location.hash === \'#comprar-casas\'')) {
  content = content.replace(
    "const initialRoute = location.hash.slice(1);",
    `${routerInjection}\n    const initialRoute = location.hash.slice(1);`
  );
}

if (!content.includes("if (key === 'comprar-casas')")) {
  content = content.replace(
    "function openModal(key, { syncHistory = true } = {}) {",
    `function openModal(key, { syncHistory = true } = {}) {
      if (key === 'comprar-casas') {
        location.href = 'catalogo-imoveis.html';
        return;
      }
      if (key === 'comprar-terrenos') {
        location.href = 'catalogo-imoveis.html#investimento-lotes';
        return;
      }
      if (key === 'alugar-imoveis') {
        location.href = 'catalogo-imoveis.html#catalogo-grid';
        return;
      }`
  );
}

// 8. Script GSAP para o Dual Text Reveal simultâneo na Hero
const heroDualRevealScript = `
    // ==========================================================================
    // HERO DUAL TEXT REVEAL SIMULTÂNEO (STAGGER: 0 & DESFOQUE ÓPTICO)
    // ==========================================================================
    (function initHeroDualReveal() {
      const heroTitle = document.querySelector('.hero-title[data-dual-reveal]');
      if (!heroTitle) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const T_NORMAL = 0.90;
      const T_HIGHLIGHT = T_NORMAL * 1.40;

      const heroTl = gsap.timeline({ delay: 0.15 });

      heroTl.fromTo('.hero-title .reveal-normal',
        { y: 24, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: T_NORMAL, ease: 'power3.out' }
      );

      heroTl.fromTo('.hero-title .reveal-highlight',
        { y: 16, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: T_HIGHLIGHT, stagger: 0, ease: 'power2.out' },
        '<0.1'
      );
    })();
`;

content = content.replace(
  "gsap.registerPlugin(ScrollTrigger);",
  `gsap.registerPlugin(ScrollTrigger);\n${heroDualRevealScript}`
);

// Salvar target e mirror
fs.writeFileSync(targetPath, content, 'utf8');
console.log(`Saved modernized index.html to: ${targetPath} (${content.length} bytes)`);

fs.writeFileSync(mirrorPath, content, 'utf8');
console.log(`Mirrored modernized index.html to: ${mirrorPath}`);
console.log('Done!');
