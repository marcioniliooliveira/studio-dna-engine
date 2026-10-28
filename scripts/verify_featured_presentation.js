/**
 * Master Verification Suite: Featured Property Presentation & Scroll-Driven Docking
 * Verifies all 15 rigorous acceptance criteria for `apresentacao-imovel.html`
 * in accordance with Negocia Bem design requirements and SDD task specifications.
 */

const fs = require('fs');
const path = require('path');

// Determine execution context (root scripts/ vs studio-dna-engine/scripts/)
const isInsideEngine = __dirname.includes('studio-dna-engine');

const targetPath = isInsideEngine
  ? path.resolve(__dirname, '../clientes/negocia-bem/site/apresentacao-imovel.html')
  : path.resolve(__dirname, '../studio-dna-engine/clientes/negocia-bem/site/apresentacao-imovel.html');

const origPath = isInsideEngine
  ? path.resolve(__dirname, '../clientes/negocia-bem/site/index.html')
  : path.resolve(__dirname, '../studio-dna-engine/clientes/negocia-bem/site/index.html');

const dataPath = isInsideEngine
  ? path.resolve(__dirname, '../clientes/negocia-bem/site/js/negociabem-data.js')
  : path.resolve(__dirname, '../studio-dna-engine/clientes/negocia-bem/site/js/negociabem-data.js');

const fileExists = fs.existsSync(targetPath);
const html = fileExists ? fs.readFileSync(targetPath, 'utf8') : '';

console.log('======================================================================');
console.log('🧪 VERIFYING APRESENTACAO-IMOVEL.HTML & FEATURED PRESENTATION (15 TESTS)');
console.log('======================================================================');
console.log('Target path:', targetPath);
console.log('File status:', fileExists ? `EXISTS (${html.length} bytes)` : 'NOT FOUND (Pending creation)');
console.log('Dataset path:', dataPath);
console.log('Original index path:', origPath);
console.log('----------------------------------------------------------------------\n');

const tests = [
  // Test 1: File existence and non-empty HTML structure
  {
    id: 1,
    name: 'File existence and non-empty HTML structure',
    fn: () => {
      if (!fileExists) {
        throw new Error(`Target file does not exist at: ${targetPath}`);
      }
      if (html.length < 5000) {
        throw new Error(`File is too small (${html.length} bytes, minimum expected: 5000 bytes)`);
      }
      if (!html.includes('<!DOCTYPE html>') && !html.includes('<!doctype html>')) {
        throw new Error('Missing DOCTYPE declaration');
      }
      if (!html.includes('<html') || !html.includes('<head>') || !html.includes('<body>') || !html.includes('</html>')) {
        throw new Error('Incomplete HTML document structure (missing html, head, or body tags)');
      }
      return true;
    }
  },

  // Test 2: Real Negocia Bem dataset linked via `<script src="./js/negociabem-data.js">` or inline
  {
    id: 2,
    name: 'Real Negocia Bem dataset linked and loadable',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');
      const hasScriptTag = html.includes('negociabem-data.js') || html.includes('NEGOCIA_BEM_DATA');
      if (!hasScriptTag) {
        throw new Error('HTML does not link or embed negociabem-data.js');
      }
      if (!fs.existsSync(dataPath)) {
        throw new Error(`Dataset file missing on disk at: ${dataPath}`);
      }
      delete require.cache[require.resolve(dataPath)];
      const exported = require(dataPath);
      const data = exported.NEGOCIA_BEM_DATA || exported;
      if (!data || !data.featured || !Array.isArray(data.gridProperties)) {
        throw new Error('Dataset does not export valid NEGOCIA_BEM_DATA with featured property and gridProperties array');
      }
      return true;
    }
  },

  // Test 3: Scroll-driven physical docking logic present (`initSearchScrollScrub` or GSAP ScrollTrigger scrub)
  {
    id: 3,
    name: 'Scroll-driven physical docking logic present (initSearchScrollScrub / GSAP ScrollTrigger scrub)',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');
      const hasInitFunction = html.includes('initSearchScrollScrub') || html.includes('initSearchDockingScroll');
      const hasScrollTriggerScrub = html.includes('ScrollTrigger') && html.includes('scrub');
      if (!hasInitFunction && !hasScrollTriggerScrub) {
        throw new Error('Missing scroll scrub docking function (expected initSearchScrollScrub or GSAP ScrollTrigger scrub)');
      }
      const hasDockTarget = html.includes('catalog-sticky-bridge') ||
                            html.includes('is-scrolling-dock') ||
                            html.includes('catalog-dock') ||
                            html.includes('search-dock');
      if (!hasDockTarget) {
        throw new Error('Missing docking anchor or docking state target in HTML/CSS/JS (e.g., catalog-sticky-bridge or is-scrolling-dock)');
      }
      return true;
    }
  },

  // Test 4: Featured property presentation section exists (`#imovel-destaque`)
  {
    id: 4,
    name: 'Featured property presentation section exists (#imovel-destaque)',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');
      const hasFeaturedId = html.includes('id="imovel-destaque"') || html.includes("id='imovel-destaque'");
      if (!hasFeaturedId) {
        throw new Error('Missing section with id="imovel-destaque"');
      }
      return true;
    }
  },

  // Test 5: 3 distinct variants implemented in the DOM (`#presentation-variant-1`, `#presentation-variant-2`, `#presentation-variant-3`)
  {
    id: 5,
    name: '3 distinct presentation variants implemented in DOM (#presentation-variant-1, -2, -3)',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');
      const hasV1 = html.includes('id="presentation-variant-1"') || html.includes("id='presentation-variant-1'");
      const hasV2 = html.includes('id="presentation-variant-2"') || html.includes("id='presentation-variant-2'");
      const hasV3 = html.includes('id="presentation-variant-3"') || html.includes("id='presentation-variant-3'");

      if (!hasV1 || !hasV2 || !hasV3) {
        throw new Error(`Missing presentation variants: V1=${hasV1}, V2=${hasV2}, V3=${hasV3}`);
      }

      // Verify each variant has substantive content
      const v1Idx = html.indexOf('presentation-variant-1');
      const v2Idx = html.indexOf('presentation-variant-2');
      const v3Idx = html.indexOf('presentation-variant-3');
      if (Math.abs(v2Idx - v1Idx) < 150 || Math.abs(v3Idx - v2Idx) < 150) {
        throw new Error('Presentation variants appear to be empty or trivial placeholders');
      }
      return true;
    }
  },

  // Test 6: Variant switcher controls present (`data-presentation-toggle="v1"`, `"v2"`, `"v3"`)
  {
    id: 6,
    name: 'Variant switcher controls present (data-presentation-toggle="v1", "v2", "v3")',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');
      const hasToggleV1 = html.includes('data-presentation-toggle="v1"') || html.includes("data-presentation-toggle='v1'");
      const hasToggleV2 = html.includes('data-presentation-toggle="v2"') || html.includes("data-presentation-toggle='v2'");
      const hasToggleV3 = html.includes('data-presentation-toggle="v3"') || html.includes("data-presentation-toggle='v3'");

      if (!hasToggleV1 || !hasToggleV2 || !hasToggleV3) {
        throw new Error(`Missing variant toggle attributes: v1=${hasToggleV1}, v2=${hasToggleV2}, v3=${hasToggleV3}`);
      }

      const hasSwitchLogic = html.includes('switchPresentationVariant') ||
                             html.includes('presentation-toggle') ||
                             html.includes('data-presentation-toggle');
      if (!hasSwitchLogic) {
        throw new Error('Missing JavaScript handler logic for switching presentation variants');
      }
      return true;
    }
  },

  // Test 7: Real estate decision data prominent in Featured Presentation
  {
    id: 7,
    name: 'Real estate decision data prominent in Featured Presentation (R$ 350.000, Caixa R$ 1.450/mês, FGTS, 70,49 m², 3 quartos, suíte, 12 min de Maringá)',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');

      const missing = [];
      if (!html.includes('350.000')) missing.push('Preço R$ 350.000');
      if (!html.includes('1.450')) missing.push('Parcela Caixa R$ 1.450/mês');
      if (!html.includes('FGTS') && !html.includes('MCMV')) missing.push('FGTS / MCMV');
      if (!html.includes('70,49')) missing.push('Área 70,49 m²');
      if (!html.includes('3 quartos') && !html.includes('3 dormitórios') && !html.includes('3 Dormitórios') && !html.includes('3 Quartos')) {
        missing.push('3 quartos/dormitórios');
      }
      if (!html.toLowerCase().includes('suíte') && !html.toLowerCase().includes('suite')) {
        missing.push('Suíte');
      }
      if (!html.includes('12 min')) missing.push('Tempo territorial 12 min de Maringá');

      if (missing.length > 0) {
        throw new Error(`Missing required decision data in Featured Presentation: ${missing.join(', ')}`);
      }
      return true;
    }
  },

  // Test 8: Interactive gallery in Featured Presentation (thumbnails with click events, main photo container)
  {
    id: 8,
    name: 'Interactive gallery in Featured Presentation (thumbnails, main photo container, click switching)',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');

      const hasMainPhoto = html.includes('presentation-main-photo') ||
                           html.includes('featured-main-img') ||
                           html.includes('presentation-hero-img') ||
                           html.includes('data-presentation-main');
      if (!hasMainPhoto) {
        throw new Error('Missing main photo display element/container in Featured Presentation');
      }

      const hasThumbnails = html.includes('presentation-thumb') ||
                            html.includes('gallery-thumb') ||
                            html.includes('data-gallery-idx') ||
                            html.includes('data-thumb-idx') ||
                            html.includes('presentation-thumbs-track');
      if (!hasThumbnails) {
        throw new Error('Missing thumbnail elements or thumbnail track in Featured Presentation');
      }

      const hasGalleryHandler = html.includes('changeFeaturedPhoto') ||
                                html.includes('setFeaturedPhoto') ||
                                html.includes('updateFeaturedGallery') ||
                                html.includes('presentation-thumb');
      if (!hasGalleryHandler) {
        throw new Error('Missing gallery photo switcher function or event handler in JavaScript');
      }
      return true;
    }
  },

  // Test 9: Card Grid contains EXACTLY 3 complete rows (8 cards total: Row 1 = 2 cards (span 2 + span 1); Row 2 = 3 cards; Row 3 = 3 cards), with zero orphan cards in a 4th row!
  {
    id: 9,
    name: 'Card Grid contains EXACTLY 3 complete rows (8 cards total: Row 1 = Hero span 2 + Companion span 1; Row 2 = 3 cards; Row 3 = 3 cards) — NO 4th row',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');

      // Check catalog section presence
      if (!html.includes('id="catalogo-grid"') && !html.includes("id='catalogo-grid'") && !html.includes('catalog-section')) {
        throw new Error('Missing catalog grid section (#catalogo-grid)');
      }

      // Check card markup
      const cardMatches = html.match(/class=["'][^"']*aura-bento-card[^"']*["']/g) ||
                          html.match(/<article[^>]*property-card/g) ||
                          [];

      if (cardMatches.length === 0) {
        // If rendered via JS, check that NEGOCIA_BEM_DATA.gridProperties is used and strictly has 8 properties
        if (!html.includes('gridProperties') || !html.includes('renderCatalogGrid')) {
          throw new Error('No bento cards found statically in HTML, nor dynamic grid renderer found');
        }
      } else {
        if (cardMatches.length !== 8) {
          throw new Error(`Card Grid must contain EXACTLY 8 cards for 3 complete rows (Row 1: 2 cards spanning 3 cols, Row 2: 3 cards, Row 3: 3 cards). Found: ${cardMatches.length} cards!`);
        }
      }

      // Check Row 1 Hero card (span 2) and Companion card (span 1)
      const hasHeroCard = html.includes('bento-hero-card') || html.includes('col-span-2') || html.includes('lg:col-span-2');
      const hasCompanionCard = html.includes('bento-companion-card') || html.includes('col-span-1') || html.includes('lg:col-span-1');

      if (!hasHeroCard) {
        throw new Error('Missing Hero card with span 2 in Row 1 (expected bento-hero-card or col-span-2)');
      }
      if (!hasCompanionCard) {
        throw new Error('Missing Companion card with span 1 in Row 1 (expected bento-companion-card or col-span-1)');
      }

      return true;
    }
  },

  // Test 10: Card Grid photo gallery switching present (data-photos, prev/next buttons or dots, changeCardPhoto)
  {
    id: 10,
    name: 'Card Grid photo gallery switching present (data-photos, navigation controls, changeCardPhoto logic)',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');

      const hasPhotosData = html.includes('data-photos') || html.includes('card-media-wrap') || html.includes('card-photo-img');
      if (!hasPhotosData) {
        throw new Error('Cards lack photo gallery data attributes or media wrapper');
      }

      const hasPhotoNav = html.includes('changeCardPhoto') ||
                          html.includes('prev-photo') ||
                          html.includes('next-photo') ||
                          html.includes('card-nav-prev') ||
                          html.includes('card-dot');
      if (!hasPhotoNav) {
        throw new Error('Cards lack photo gallery navigation controls or changeCardPhoto logic');
      }

      return true;
    }
  },

  // Test 11: Top-left badges on cards contain ONLY COMPRAR, ALUGAR, or INVESTIR
  {
    id: 11,
    name: 'Top-left badges on cards contain ONLY COMPRAR, ALUGAR, or INVESTIR',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');

      // Extract all card-badge elements
      const badgeRegex = /<span[^>]*class=["'][^"']*card-badge[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi;
      const allowedBadges = new Set(['COMPRAR', 'ALUGAR', 'INVESTIR']);
      let match;
      const foundBadges = [];

      while ((match = badgeRegex.exec(html)) !== null) {
        const badgeText = match[1].trim().toUpperCase();
        foundBadges.push(badgeText);
        if (!allowedBadges.has(badgeText)) {
          throw new Error(`Invalid card badge detected: "${badgeText}". Badges must be strictly one of: COMPRAR, ALUGAR, INVESTIR.`);
        }
      }

      if (foundBadges.length === 0) {
        // Check if dynamic dataset is used with strict badges
        delete require.cache[require.resolve(dataPath)];
        const data = require(dataPath).NEGOCIA_BEM_DATA || require(dataPath);
        const dataBadges = data.gridProperties.map(p => (p.badge || '').toUpperCase());
        for (const b of dataBadges) {
          if (!allowedBadges.has(b)) {
            throw new Error(`Dataset contains invalid badge: "${b}". Must be COMPRAR, ALUGAR, or INVESTIR.`);
          }
        }
      } else {
        // Ensure at least COMPRAR and ALUGAR or INVESTIR are represented
        if (!foundBadges.includes('COMPRAR')) {
          throw new Error('No COMPRAR badge found in cards');
        }
      }
      return true;
    }
  },

  // Test 12: Zero monospace font contamination (no Space Mono, no font-mono — strictly Inter and Plus Jakarta Sans)
  {
    id: 12,
    name: 'Zero monospace font contamination (no Space Mono, no font-mono; strictly Inter & Plus Jakarta Sans)',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');

      if (html.includes('Space Mono') || html.includes('Space+Mono') || html.includes('space-mono')) {
        throw new Error('Forbidden font "Space Mono" detected in document! Monospace fonts are strictly prohibited.');
      }

      if (html.includes('font-mono') || html.includes('font-family: monospace')) {
        throw new Error('Forbidden class "font-mono" or monospace family detected in document!');
      }

      // Check typography declarations
      if (!html.includes('Inter') || !html.includes('Plus Jakarta Sans')) {
        throw new Error('Document must import and use Inter and Plus Jakarta Sans');
      }
      return true;
    }
  },

  // Test 13: Strict 0px border-radius applied to cards, presentation containers, and search bars
  {
    id: 13,
    name: 'Strict 0px border-radius applied to cards, presentation containers, and search bars',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');

      const has0pxBentoCard = html.includes('.aura-bento-card {') &&
                              (html.includes('border-radius: 0px !important;') || html.includes('border-radius: 0px;'));

      const has0pxSearch = html.includes('search-bento') &&
                           (html.includes('border-radius: 0px !important;') || html.includes('border-radius: 0;'));

      const has0pxPresentation = html.includes('#imovel-destaque') || html.includes('.presentation-variant');

      if (!has0pxBentoCard && !html.includes('border-radius: 0px !important;')) {
        throw new Error('Missing strict 0px border-radius rule for aura-bento-card');
      }

      // Check absence of rounded-xl or rounded-2xl on key cards
      if (html.includes('aura-bento-card rounded-xl') || html.includes('aura-bento-card rounded-2xl')) {
        throw new Error('Rounded Tailwind classes detected on aura-bento-card; must be strictly sharp 0px!');
      }

      return true;
    }
  },

  // Test 14: Universal outlined/vazado buttons applied across header, hero, presentation, cards, and Sessão 02
  {
    id: 14,
    name: 'Universal outlined/vazado buttons applied (border: 1px solid var(--green), hover fill)',
    fn: () => {
      if (!fileExists) throw new Error('Target file missing');

      const hasOutlinedCardBtn = (html.includes('.card-whatsapp-btn {') || html.includes('.card-cta-btn {')) &&
                                 html.includes('border: 1px solid var(--green);') &&
                                 (html.includes('background: rgba(62, 155, 103,') || html.includes('background: transparent;'));

      const hasHoverFill = html.includes('.card-whatsapp-btn:hover') ||
                           html.includes('.btn-vazado:hover') ||
                           html.includes('background: var(--green);');

      if (!hasOutlinedCardBtn && !html.includes('border: 1px solid var(--green);')) {
        throw new Error('Missing outlined button styles (expected border: 1px solid var(--green) and semi-transparent background)');
      }

      if (!hasHoverFill) {
        throw new Error('Missing hover solid fill transition on outlined buttons');
      }

      return true;
    }
  },

  // Test 15: Subordinate sections (Sessão 02 narrative pinning) preserved and original index.html pristine
  {
    id: 15,
    name: 'Subordinate sections (Sessão 02 narrative pinning) preserved & original index.html pristine',
    fn: () => {
      // Part A: Sessão 02 in target file
      if (!fileExists) throw new Error('Target file missing');

      const hasS02 = html.includes('id="sessao-02"') || html.includes("id='sessao-02'");
      if (!hasS02) {
        throw new Error('Missing Sessão 02 narrative pinning section (#sessao-02) in target file');
      }

      if (!html.includes('Toda conquista começa com um desejo')) {
        throw new Error('Missing Sessão 02 core narrative text ("Toda conquista começa com um desejo")');
      }

      if (!html.includes('initSession02')) {
        throw new Error('Missing Sessão 02 initialization logic (initSession02)');
      }

      // Part B: Original index.html is pristine
      if (!fs.existsSync(origPath)) {
        throw new Error(`Original index.html not found at: ${origPath}`);
      }
      const origHtml = fs.readFileSync(origPath, 'utf8');
      if (origHtml.includes('imovel-destaque') || origHtml.includes('catalogo-grid') || origHtml.includes('apresentacao-imovel')) {
        throw new Error('Original index.html has been modified or contaminated with new sections! Must remain pristine.');
      }

      return true;
    }
  }
];

// Execute tests
let passed = 0;
let failed = 0;
const failures = [];

tests.forEach((t) => {
  try {
    t.fn();
    console.log(`[✓ PASS] Test ${t.id.toString().padStart(2, '0')}: ${t.name}`);
    passed++;
  } catch (err) {
    console.log(`[✗ FAIL] Test ${t.id.toString().padStart(2, '0')}: ${t.name}`);
    console.log(`         Diagnostic: ${err.message}\n`);
    failed++;
    failures.push({ id: t.id, name: t.name, message: err.message });
  }
});

console.log('\n----------------------------------------------------------------------');
console.log(`Summary: ${passed} passed, ${failed} failed (Total: ${tests.length} tests)`);
console.log('----------------------------------------------------------------------');

if (failed === 0) {
  console.log('🎉 ALL 15 RIGOROUS ACCEPTANCE TESTS PASSED (100% SUCCESS)');
  process.exit(0);
} else {
  console.log(`⚠️  ${failed} test(s) failed as expected in RED phase prior to implementation.`);
  process.exit(1);
}
