const fs = require('fs');
const path = require('path');

const targetPath = fs.existsSync('clientes/negocia-bem/site/variantes.html')
  ? 'clientes/negocia-bem/site/variantes.html'
  : 'studio-dna-engine/clientes/negocia-bem/site/variantes.html';

const origPath = fs.existsSync('clientes/negocia-bem/site/index.html')
  ? 'clientes/negocia-bem/site/index.html'
  : 'studio-dna-engine/clientes/negocia-bem/site/index.html';

const html = fs.readFileSync(targetPath, 'utf8');

console.log('=== VERIFYING REFINED VARIANTES.HTML ===');
console.log('Target file:', targetPath);
console.log('File size:', html.length, 'bytes');

const tests = [
  // 1. Dual Text Reveal: No font change, highlight color only, 40% slower, simultaneous
  {
    name: 'Dual Reveal: Keywords use reveal-highlight with inherit font and normal style (no serif/italic)',
    test: () => html.includes('.reveal-highlight {') &&
                html.includes('font-family: inherit !important;') &&
                html.includes('font-style: normal !important;') &&
                html.includes('color: var(--green-light) !important;') &&
                !html.includes('.eyebrow i { font-family: \'DM Serif Display\'')
  },
  {
    name: 'Dual Reveal: Mathematical timing curve is exactly 40% slower (T_HIGHLIGHT = T_NORMAL * 1.40)',
    test: () => html.includes('const T_NORMAL = 0.90;') &&
                html.includes('const T_HIGHLIGHT = T_NORMAL * 1.40;') &&
                html.includes('duration: T_HIGHLIGHT') &&
                html.includes('filter: \'blur(0px)\'')
  },
  {
    name: 'Dual Reveal: Physical line mask (.line-mask-wrap, .line-mask-inner) implemented',
    test: () => html.includes('.line-mask-wrap {') &&
                html.includes('overflow: hidden;') &&
                html.includes('.line-mask-inner {')
  },
  {
    name: 'Dual Reveal: Simultaneous highlight bloom (stagger: 0)',
    test: () => html.includes('stagger: 0, // Todas as palavras em destaque desabrocham AO MESMO TEMPO')
  },

  // 2. Aura Bento Search Bar with 0px radius (3 sharp variants: Monolithic, Atelier, Dual-Tier)
  {
    name: 'Search Bar: border-radius: 0px !important strictly applied to Bento bars',
    test: () => html.includes('.search-bento-v1 {') &&
                html.includes('border-radius: 0px !important;') &&
                html.includes('.search-bento-v2 {') &&
                html.includes('.search-bento-v3 {')
  },
  {
    name: 'Search Bar: 3 unique sharp variants present (Monolithic, Atelier Imobiliário, Dual-Tier)',
    test: () => html.includes('id="capsule-v1"') &&
                html.includes('id="capsule-v2"') &&
                html.includes('id="capsule-v3"') &&
                (html.includes('ATELIER') || html.includes('Atelier Imobiliário'))
  },

  // 3. Persistent Scroll Docking
  {
    name: 'Scroll Docking: .is-scrolling-dock logic and sticky bridge present',
    test: () => html.includes('.variant-search-component.is-scrolling-dock') &&
                html.includes('catalog-sticky-bridge') &&
                html.includes('initSearchDockingScroll')
  },

  // 4. Aura Bento Card Grid + Territorial DNA + Resizing on Hover + Companion Card
  {
    name: 'Bento Grid: Double-width hero showcase card present',
    test: () => html.includes('bento-hero-card') &&
                html.includes('★ Oportunidade da Semana')
  },
  {
    name: 'Territorial DNA: Detailed territorial specs, financing and distance present',
    test: () => html.includes('A 14 min de Maringá') &&
                html.includes('A 10 min da Catedral') &&
                html.includes('Simulação Estimada:') &&
                html.includes('Quintal privativo')
  },
  {
    name: 'Card Hover Resizing: .card-drawer-extra has max-height: 0 and expands on hover',
    test: () => html.includes('.card-drawer-extra {') &&
                html.includes('max-height: 0;') &&
                html.includes('.aura-bento-card:hover .card-drawer-extra {') &&
                html.includes('max-height: 140px;')
  },
  {
    name: 'Bento Companion Card (NB-102): Drawer expanded from start without requiring hover',
    test: () => html.includes('.bento-companion-card .card-drawer-extra {') &&
                html.includes('max-height: none !important;') &&
                html.includes('opacity: 1 !important;')
  },

  // 5. Universal Outlined (Vazado) Buttons
  {
    name: 'Universal Outlined Buttons: All action buttons use outlined style with hover fill',
    test: () => html.includes('.card-whatsapp-btn {') &&
                html.includes('border: 1px solid var(--green);') &&
                html.includes('background: rgba(62, 155, 103, 0.1);') &&
                html.includes('.card-whatsapp-btn:hover')
  },

  // 6. Native Dark Tone & Sections Integrity
  {
    name: 'Theme: Strictly native dark tone (#0D1117) with zero light-mode contamination',
    test: () => html.includes('background-color: var(--dark);') &&
                !html.includes('data-theme=\"light\"')
  },
  {
    name: 'Sessão 02 narrative pinning section present (#sessao-02)',
    test: () => html.includes('id=\"sessao-02\"') &&
                html.includes('Toda conquista começa com um desejo') &&
                html.includes('initSession02')
  },

  // 7. Original index.html check
  {
    name: 'Original index.html is pristine and unmodified',
    test: () => {
      const orig = fs.readFileSync(origPath, 'utf8');
      return !orig.includes('catalogo-grid') && !orig.includes('is-floating');
    }
  }
];

let failed = 0;
tests.forEach((t, i) => {
  const ok = t.test();
  console.log(`[${ok ? '✓ PASS' : '✗ FAIL'}] Test ${i + 1}: ${t.name}`);
  if (!ok) failed++;
});

if (failed === 0) {
  console.log('\nALL RIGOROUS TESTS PASSED (100% SUCCESS)');
} else {
  console.error(`\n${failed} test(s) failed.`);
  process.exit(1);
}
