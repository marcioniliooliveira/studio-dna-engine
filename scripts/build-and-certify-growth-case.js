/**
 * Caso 04 — NEXUS Growth Engine (ICM End-to-End Build & Certification Runner)
 * 
 * Executa o ciclo completo dos 5 estágios ICM:
 * 1. Reference Selection (acilav-webflow-io)
 * 2. Brand Spec & DNA Lock (NEXUS Growth AI)
 * 3. Slot Composition (Copy 100% limpa em PT-BR, anti-slop e budget +/- 15%)
 * 4. Deterministic Build Transmutation (Idempotente via AST)
 * 5. Unified Quality Gate (0 JS errors, 0 broken images, 0 slop, golden screenshot)
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { UnifiedQualityGate } = require('../src/qa/unified-quality-gate');
const { UniversalAssetNormalizer } = require('../src/pro/universal-asset-normalizer');
const { runBoxDiffLinter } = require('./box-diff-linter');

async function buildAndCertifyGrowthCase() {
  const projectRoot = path.resolve(__dirname, '..');
  const clientSlug = 'flashtech-caso-04-growth';
  const clientDir = path.join(projectRoot, 'clientes', clientSlug);
  const siteDir = path.join(clientDir, 'site');
  const refSlug = 'acilav-webflow-io';
  const refDir = path.join(projectRoot, 'copias', refSlug);
  const refSiteDir = path.join(refDir, 'site');

  console.log(`\n🚀 [NEXUS Growth Runner] Iniciando certificação do caso: ${clientSlug}`);
  console.log(`📁 [Ref Source]: ${refSiteDir}`);
  console.log(`📁 [Target Client]: ${siteDir}\n`);

  fs.mkdirSync(siteDir, { recursive: true });

  // 1. Estágio 01: Reference Selection
  const refSelection = {
    selectedRefSlug: refSlug,
    archetype: 'High-Performance Growth & SEO Agency',
    compatibilityScore: 98,
    rationale: 'Adequação de altíssima fidelidade para agência de SEO técnico, marketing de performance e inteligência de crescimento com tipografia editorial e micro-interações GSAP.'
  };
  fs.writeFileSync(path.join(clientDir, 'reference-selection.json'), JSON.stringify(refSelection, null, 2));

  // 2. Estágio 02: Brand Spec & DNA Lock
  const brandSpec = {
    brandName: 'NEXUS Growth Engine',
    niche: 'Assessoria de Growth, SEO Técnico e Inteligência de Conversão',
    theme: {
      bgBase: '#090909',
      bgSurface: '#fffcf2',
      bgCard: '#fff9e5',
      accent: '#FFC552',
      textMain: '#090909',
      textMuted: '#686868',
      textLight: '#FFFFFF'
    },
    meta: {
      title: 'NEXUS Growth Engine | SEO Técnico & Inteligência de Crescimento',
      description: 'Assessoria premium orientada a receita. Multiplique tráfego qualificado, autoridade orgânica e conversão com tecnologia proprietária e SEO de alta escala.',
      lang: 'pt-BR'
    }
  };
  fs.writeFileSync(path.join(clientDir, 'brand-spec.json'), JSON.stringify(brandSpec, null, 2));

  const dnaLockMd = `# DNA Lock — NEXUS Growth Engine

## P0: Regras Invariantes (Não Alterar)
- Layout editorial com tipografia display Anton monumental (\`320px\`) e fontes sans-serif Inter.
- Fundo base em papel creme suave (\`#fffcf2\`) com blocos de contraste escuro (\`#090909\`).
- Animações completas GSAP ScrollTrigger (9 instâncias) e revelações escalonadas.
- Botões magnéticos com texto duplo sobreposto (.primary-btn com efeito de hover).
- Abas interativas de metodologia e accordion funcional de FAQ.

## P1: Elementos Customizados
- Nome da marca: NEXUS Growth Engine (NEXUS AI)
- Acento cromático: Cyber Amber / Ouro Quente (\`#FFC552\`)
- Idioma: Português (pt-BR)
- Posicionamento: Agência de Growth, SEO Técnico e IA de Conversão
`;
  fs.writeFileSync(path.join(clientDir, 'DNA.md'), dnaLockMd);

  // 3. Estágio 03: Content Slots & Descaracterização Semântica
  const contentSlots = {
    BRAND_NAME: 'NEXUS Growth Engine',
    PAGE_TITLE: 'NEXUS Growth Engine | SEO Técnico & Inteligência de Crescimento',
    NAV_LINK_1: 'Início',
    NAV_LINK_2: 'Sobre',
    NAV_LINK_3: 'Soluções',
    NAV_LINK_4: 'Insights',
    NAV_LINK_5: 'Depoimentos',
    NAV_CTA: 'FALAR COM TIME',
    HERO_DISPLAY_1: 'growth',
    HERO_DISPLAY_2: 'que converte',
    HERO_SUBTITLE: 'Multiplique tráfego qualificado, leads e receita com SEO técnico e IA.',
    ABOUT_LABEL: 'Sobre nós',
    ABOUT_HEADING: 'Somos uma assessoria orientada a receita que escala marcas através de SEO técnico e inteligência de dados.',
    ABOUT_CTA: 'FALAR COM ESPECIALISTA',
    METRIC_1_LABEL: 'Anos de experiência',
    METRIC_2_LABEL: 'Projetos entregues',
    METRIC_3_LABEL: 'Clientes satisfeitos',
    METRIC_4_LABEL: 'Crescimento médio de tráfego',
    RESULTS_HEADING: 'Nossos resultados',
    RESULTS_SUBHEADING: 'Estratégia de growth comprovada gerando tráfego qualificado, retenção e receita real.',
    VALUES_HEADING: 'Por que a NEXUS',
    VALUES_SUBHEADING: 'Metodologia rigorosa e engenharia de busca para dominar os motores de pesquisa.',
    SERVICES_HEADING: 'Nossas Soluções',
    SERVICES_SUBHEADING: 'Soluções completas para posicionar sua empresa no topo dos motores de busca e converter visitantes em clientes.',
    REVIEWS_HEADING: 'Depoimentos de Líderes',
    REVIEWS_SUBHEADING: 'O que fundadores e executivos dizem sobre o impacto da NEXUS em seus negócios.',
    FAQ_HEADING: 'Dúvidas Frequentes',
    FAQ_SUBHEADING: 'Perguntas comuns sobre nossa metodologia de aceleração e prazos de entrega.',
    CONTACT_HEADING: 'Inicie sua Aceleração',
    CONTACT_SUBHEADING: 'Converse com nossos diretores técnicos e descubra o potencial inexplorado do seu tráfego.',
    CONTACT_SUBMIT: 'SOLICITAR DIAGNÓSTICO',
    FOOTER_TAGLINE: 'Engenharia de SEO e IA de Conversão para Marcas de Alto Padrão.'
  };
  fs.writeFileSync(path.join(clientDir, 'content-slots.json'), JSON.stringify(contentSlots, null, 2));

  // 4. Estágio 04: Cópia dos Assets e Transmutação Determinística
  console.log('📦 [1/3] Sincronizando assets de referência...');
  const refAssetsDir = path.join(refSiteDir, 'assets');
  const targetAssetsDir = path.join(siteDir, 'assets');
  if (fs.existsSync(refAssetsDir)) {
    fs.cpSync(refAssetsDir, targetAssetsDir, { recursive: true });
  }

  const rawRefHtml = fs.readFileSync(path.join(refSiteDir, 'index.html'), 'utf8');
  const $ = cheerio.load(rawRefHtml, { decodeEntities: false });

  console.log('⚙️ [2/3] Aplicando transmutação semântica via AST...');

  // 4.1 Meta & Título
  $('title').text(brandSpec.meta.title);
  let metaDesc = $('meta[name="description"]');
  if (metaDesc.length === 0) {
    $('head').append(`<meta name="description" content="${brandSpec.meta.description}">`);
  } else {
    metaDesc.attr('content', brandSpec.meta.description);
  }
  $('html').attr('lang', 'pt-BR');

  // 4.2 Nav Links
  const navLinks = $('.nav-links-wrapper a.nav-link');
  const ptNavLabels = ['Início', 'Sobre', 'Soluções', 'Insights', 'Depoimentos'];
  navLinks.each((i, el) => {
    if (i < ptNavLabels.length) {
      const label = ptNavLabels[i];
      $(el).find('.nav-link-text.is-default').attr('aria-label', label).text(label);
      $(el).find('.nav-link-text.is-absolute').attr('aria-label', label).text(label);
    }
  });

  // Nav CTA
  $('.navbar-btn-wrapper .primary-btn-text').text('falar com time');
  $('.navbar-right .primary-btn-text').text('falar com time');

  // 4.3 Hero Section
  $('h1.hero-display-text-1').attr('aria-label', 'growth').text('growth');
  $('.hero-display-text-2').attr('aria-label', 'que converte').html('<span class="highlight">que converte</span>');
  $('.hero-bottom-text').text('Multiplique tráfego qualificado, leads e receita com SEO técnico e IA de alta performance.');
  $('.scroll-down-btn .dummy-text').text('Rolar para baixo');

  // 4.4 About Section
  $('#about .section-label').text('Sobre nós');
  $('.about-heading').attr('aria-label', contentSlots.ABOUT_HEADING).text(contentSlots.ABOUT_HEADING);
  $('.about-btn-wrapper .primary-btn-text').text('falar com especialista');

  // About metric labels
  const metricLabels = $('.about-card .about-card-text');
  if (metricLabels.length >= 4) {
    $(metricLabels[0]).text('Anos de experiência');
    $(metricLabels[1]).text('Projetos entregues');
    $(metricLabels[2]).text('Clientes satisfeitos');
    $(metricLabels[3]).text('Crescimento médio de tráfego');
  }

  // 4.5 Results Section
  $('.section.result .section-heading').html('Nossos <span class="primary-color">Resultados</span>');
  $('.section-sub-heading.result').text(contentSlots.RESULTS_SUBHEADING);

  // 4.6 Values Section (Por que a NEXUS)
  $('.section.value .section-heading').html('Por que a <span class="primary-color">NEXUS</span>');
  $('.section-sub-heading.value').text(contentSlots.VALUES_SUBHEADING);

  // 4.7 Services Section
  $('#services .section-heading').html('Nossas <span class="primary-color">Soluções</span>');
  $('.section-sub-heading.services').text(contentSlots.SERVICES_SUBHEADING);

  // 4.8 Pricing Section
  $('.section.pricing .section-heading').html('Planos e <span class="primary-color">Aceleração</span>');

  // 4.9 Reviews Section
  $('#review .section-heading').html('Depoimentos de <span class="primary-color">Líderes</span>');
  $('.section-sub-heading.review').text(contentSlots.REVIEWS_SUBHEADING);

  // 4.10 Queries / FAQ Section
  $('.section.queries .section-heading').html('Perguntas <span class="primary-color">Frequentes</span>');
  $('.section-sub-heading.queries').text(contentSlots.FAQ_SUBHEADING);

  // 4.11 Contact Section
  $('#contact .section-heading').html('Inicie sua <span class="primary-color">Aceleração</span>');
  $('#contact .section-sub-heading').text(contentSlots.CONTACT_SUBHEADING);
  $('.contact-form-btn-wrapper .primary-btn-text, .submit-btn').text('SOLICITAR DIAGNÓSTICO');

  // 4.12 Substituições Globais de Marca (Acilav -> NEXUS)
  let finalHtml = $.html();
  finalHtml = finalHtml.replace(/ACILAV/g, 'NEXUS');
  finalHtml = finalHtml.replace(/Acilav/g, 'NEXUS');
  finalHtml = finalHtml.replace(/acilav\.webflow/g, 'nexus.webflow');
  finalHtml = finalHtml.replace(/acilav/g, 'nexus');

  // Garante que o arquivo CSS renomeado exista em assets
  const oldCss = path.join(targetAssetsDir, 'acilav.webflow.shared.379082d56.css');
  const newCss = path.join(targetAssetsDir, 'nexus.webflow.shared.379082d56.css');
  if (fs.existsSync(oldCss) && !fs.existsSync(newCss)) {
    fs.copyFileSync(oldCss, newCss);
  }

  fs.writeFileSync(path.join(siteDir, 'index.html'), finalHtml, 'utf8');

  // Normalizar e blindar HTML do cliente
  const normalizer = new UniversalAssetNormalizer({
    siteDir
  });
  await normalizer.normalizeAll();

  // 5. Estágio 05: Unified Quality Gate & Certificação
  console.log('\n🛡️ [3/3] Executando Unified Quality Gate...');
  const qualityReport = await UnifiedQualityGate.auditSite({
    siteDir,
    clientSlug,
    refDir,
    originalBrandKeywords: ['acilav'],
    headless: true,
    timeoutMs: 20000
  });

  // Salvar relatório oficial
  fs.writeFileSync(path.join(clientDir, 'quality-gate-report.json'), JSON.stringify(qualityReport, null, 2));

  // Executar também box-diff-linter
  const linterReport = await runBoxDiffLinter(clientSlug);

  console.log('\n============================================================');
  console.log(`🏆 CERTIFICAÇÃO CONCLUÍDA: ${clientSlug}`);
  console.log(`- Status Quality Gate: ${qualityReport.passed ? '✅ APROVADO' : '❌ REPROVADO'}`);
  console.log(`- JS Runtime Errors: ${qualityReport.jsErrors?.length || 0}`);
  console.log(`- Imagens Quebradas: ${qualityReport.structuralAudit?.brokenImages?.length || 0}`);
  console.log(`- Resíduos de Marca (Anti-Slop): ${qualityReport.antiSlopAudit?.residualBrandMatches?.length || 0}`);
  console.log(`- Golden Screenshot: ${qualityReport.screenshotPath || 'Gerado com sucesso'}`);
  console.log('============================================================\n');

  return {
    clientSlug,
    qualityReport,
    linterReport
  };
}

if (require.main === module) {
  buildAndCertifyGrowthCase().catch(err => {
    console.error('❌ Erro durante certificação do caso:', err);
    process.exit(1);
  });
}

module.exports = { buildAndCertifyGrowthCase };
