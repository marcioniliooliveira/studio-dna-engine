/**
 * src/pipeline/transmuter.js
 * 
 * Deterministic Site Transmuter Engine — Motor Canônico de Transmutações (Studio DNA Engine)
 * 
 * Executa a transmutação mecânica, idempotente e universal do esqueleto de referência para qualquer cliente,
 * aplicando regras declarativas de slots, normalização arquitetural W3C de CSS e contratos ICM.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cheerio = require('cheerio');
const { SeoInjector } = require('../generators/seo-injector');

function computeHash(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Monta a especificação intermediária de composição.
 */
function createCompositionSpec({
  refSlug,
  brandSpec = {},
  contentSlots = {},
  options = {}
}) {
  return {
    version: '2.0.0',
    createdAt: new Date().toISOString(),
    refSlug,
    brandName: brandSpec.brandName || 'Client Brand',
    theme: brandSpec.theme || {},
    meta: brandSpec.meta || {},
    seo: brandSpec.seo || {},
    client: brandSpec.client || {},
    colors: brandSpec.colors || {},
    copyOverrides: brandSpec.copyOverrides || {},
    slots: contentSlots.slots || contentSlots,
    options: {
      enforceBudget: options.enforceBudget ?? true,
      enforceAntiSlop: options.enforceAntiSlop ?? true,
      tolerance: options.tolerance ?? 0.15,
      injectSeo: options.injectSeo === true
    }
  };
}

/**
 * Constrói nós de caracteres para animações GSAP SplitText sem quebrar acessibilidade.
 */
function buildSplitLetters(letters) {
  return letters.map((char, i) => {
    if (char === ' ') return ' ';
    return `<div class="gsap_split_char gsap_split_char${i + 1}" aria-hidden="true" style="display: inline-block;">${escapeHtml(char)}</div>`;
  }).join('');
}

/**
 * Folha de estilo de normalização arquitetural universal do motor.
 * Aplica padrões W3C que corrigem física de 3D, hover puro e preservação de sticky sem quebrar layouts.
 */
function generateUniversalCoreCss() {
  return `
<style id="studio-dna-engine-core-fixes">
  /* Prevenção de Bleed Horizontal W3C (Clip corta sem criar scroll container e preserva position: sticky) */
  html {
    overflow-x: clip !important;
  }
  body {
    overflow-x: clip !important;
    max-width: 100vw !important;
    width: 100% !important;
  }
  .page-wrapper, .main-wrapper, .section {
    overflow: visible !important;
  }
  .logo-marquees-wrapper, .insight-slider-mask {
    overflow: hidden !important;
    max-width: 100% !important;
  }

  /* Geometria 3D Nativa W3C para Títulos Rolantes (Sem display: none que causava sumiço pós-scroll) */
  .single-heading-wrap {
    perspective: 1200px !important;
    transform-style: preserve-3d !important;
    position: relative !important;
  }
  .heading-3d-front, .heading-3d-back {
    backface-visibility: hidden !important;
    -webkit-backface-visibility: hidden !important;
  }
  .heading-3d-front {
    transform-origin: 50% 100% !important;
  }
  .heading-3d-back {
    position: absolute !important;
    inset: 0% !important;
    transform-origin: 50% 0% !important;
  }

  /* Fix de Camadas Duplas (Hover limpo e sem sobreposição AABB em repouso) */
  .nav-link-texts-wrap, .primary-btn-texts-wrapper, .submit-btn {
    position: relative !important;
    overflow: hidden !important;
    display: inline-block !important;
  }
  .nav-link-text.is-default, .primary-btn-text.is-default, .submit-btn-text.is-default {
    position: relative !important;
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
    filter: blur(0px) !important;
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease, filter 0.3s ease !important;
  }
  .nav-link-text.is-absolute, .primary-btn-text.is-absolute, .submit-btn-text.is-absolute {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    transform: translateY(100%) !important;
    filter: blur(4px) !important;
    pointer-events: none !important;
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease, filter 0.3s ease !important;
  }
  .nav-link:hover .nav-link-text.is-default, .primary-btn:hover .primary-btn-text.is-default, .submit-btn:hover .submit-btn-text.is-default {
    transform: translateY(-100%) !important;
    opacity: 0 !important;
    filter: blur(4px) !important;
  }
  .nav-link:hover .nav-link-text.is-absolute, .primary-btn:hover .primary-btn-text.is-absolute, .submit-btn:hover .submit-btn-text.is-absolute {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
    filter: blur(0px) !important;
  }

  /* Ciclo de Vida Limpo dos Cards de Insights (Hover Reveal Suave sem Badge Preso) */
  .insight-card-contents {
    opacity: 0 !important;
    transform: translateY(20px) !important;
    transition: opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1), transform 0.35s cubic-bezier(0.25, 1, 0.5, 1) !important;
  }
  .insight-card:hover .insight-card-contents,
  .insight-card:focus-within .insight-card-contents {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  @media (max-width: 991px), (hover: none) {
    .insight-card-contents {
      opacity: 1 !important;
      transform: none !important;
    }
    .insight-card-btn {
      display: none !important;
    }
  }

  /* Responsividade fluida e sem corte da Hero */
  .hero-display-text-1 {
    font-size: clamp(2.5rem, 8vw, 8.5rem) !important;
    white-space: nowrap !important;
    line-height: 1.05 !important;
  }
  .hero-display-text-2 {
    font-size: clamp(2rem, 5.8vw, 7.5rem) !important;
    white-space: nowrap !important;
    letter-spacing: -0.02em !important;
    line-height: 1.05 !important;
  }
  @media (max-width: 767px) {
    .hero-display-text-1, .hero-display-text-2 {
      font-size: clamp(2rem, 10vw, 3.8rem) !important;
      word-break: break-word !important;
      line-height: 1.05 !important;
      white-space: normal !important;
    }
    .hero-contents {
      max-width: 100% !important;
      overflow-x: hidden !important;
    }
  }
</style>
`.trim();
}

/**
 * Transmuta o esqueleto deterministicamente.
 */
function runDeterministicTransmutation({
  skeletonPath,
  compositionSpec,
  outputPath,
  clientDir
}) {
  if (!fs.existsSync(skeletonPath)) {
    throw new Error(`Esqueleto de referência não encontrado: ${skeletonPath}`);
  }

  const skeletonRaw = fs.readFileSync(skeletonPath, 'utf8');
  const skeletonHash = computeHash(skeletonRaw);

  const $ = cheerio.load(skeletonRaw, { decodeEntities: false });

  // 1. Injetar Meta e Título
  if (compositionSpec.meta) {
    if (compositionSpec.meta.title) {
      $('title').text(compositionSpec.meta.title);
    }
    if (compositionSpec.meta.description) {
      let metaDesc = $('meta[name="description"]');
      if (metaDesc.length === 0) {
        metaDesc = $('<meta name="description">');
        $('head').append(metaDesc);
        metaDesc.attr('content', compositionSpec.meta.description);
      } else {
        metaDesc.attr('content', compositionSpec.meta.description);
      }
    }
    if (compositionSpec.meta.lang) {
      $('html').attr('lang', compositionSpec.meta.lang);
    }
  }

  // 2. Injetar Placeholder Slots ({SLOT_...})
  let currentHtml = $.html();
  let replacedSlotsCount = 0;

  const slots = compositionSpec.slots || {};
  for (const [key, value] of Object.entries(slots)) {
    if (typeof value === 'string' || typeof value === 'number') {
      const slotPlaceholder = `{SLOT_${key.toUpperCase()}}`;
      if (currentHtml.includes(slotPlaceholder)) {
        currentHtml = currentHtml.split(slotPlaceholder).join(escapeHtml(value));
        replacedSlotsCount++;
      }
    }
  }

  const $final = cheerio.load(currentHtml, { decodeEntities: false });

  // 3. Injeção Baseada em Classes e Seletores Semânticos Declarativos
  // ---------------------------------------------------------------------------
  // Navbar Brand
  if (slots.NAV_BRAND) {
    $final('.brand-logo-wrapper').html(`<span class="brand-logo-text">${escapeHtml(slots.NAV_BRAND)}</span>`);
    $final('.brand-name, .logo-text, .nav-brand-text, .footer-brand-text').text(slots.NAV_BRAND);
  }

  // Navbar Links
  const navMap = [
    slots.NAV_LINK_HOME,
    slots.NAV_LINK_ABOUT,
    slots.NAV_LINK_SERVICES,
    slots.NAV_LINK_INSIGHTS,
    slots.NAV_LINK_REVIEW
  ];
  if (navMap.some(Boolean)) {
    $final('a.nav-link').each((idx, el) => {
      const label = navMap[idx];
      if (label) {
        const letters = label.split('');
        const lettersHtml = `<div class="gsap_split_word gsap_split_word1" aria-hidden="true" style="display: inline-block;">${buildSplitLetters(letters)}</div>`;
        $final(el).find('.nav-link-text.is-default').attr('aria-label', label).html(lettersHtml);
        $final(el).find('.nav-link-text.is-absolute').attr('aria-label', label).html(lettersHtml);
        replacedSlotsCount++;
      }
    });
  }

  // Botões Primários
  function setPrimaryCta(selector, label) {
    $final(selector).each((_, el) => {
      $final(el).find('.primary-btn-text.is-default').text(label);
      $final(el).find('.primary-btn-text.is-absolute').text(label);
    });
  }
  if (slots.NAV_CTA) {
    setPrimaryCta('nav a.primary-btn, header a.primary-btn, .navbar a.primary-btn', slots.NAV_CTA);
  }
  if (slots.HERO_CTA) {
    $final('.hero a.primary-btn, #hero a.primary-btn, .hero-section a.primary-btn')
      .filter((_, el) => $final(el).closest('nav, header, .navbar').length === 0)
      .each((_, el) => {
        $final(el).find('.primary-btn-text.is-default').text(slots.HERO_CTA);
        $final(el).find('.primary-btn-text.is-absolute').text(slots.HERO_CTA);
      });
  }

  // Hero Display
  if (slots.HERO_DISPLAY_1 && $final('.hero-display-text-1').length > 0) {
    const letters = slots.HERO_DISPLAY_1.split('');
    const h1Split = `<div class="gsap_split_word gsap_split_word1" aria-hidden="true" style="display: inline-block;">${buildSplitLetters(letters)}</div>`;
    $final('.hero-display-text-1').attr('aria-label', slots.HERO_DISPLAY_1).html(h1Split);
    replacedSlotsCount++;
  }
  if (slots.HERO_DISPLAY_2 && $final('.hero-display-text-2').length > 0) {
    const letters = slots.HERO_DISPLAY_2.split('');
    const h2Split = `<div class="gsap_split_word gsap_split_word1" aria-hidden="true" style="display: inline-block;">${buildSplitLetters(letters)}</div>`;
    $final('.hero-display-text-2').attr('aria-label', slots.HERO_DISPLAY_2).html(h2Split);
    replacedSlotsCount++;
  }
  if (slots.HERO_SUBTITLE && $final('.hero-bottom-text').length > 0) {
    $final('.hero-bottom-text').text(slots.HERO_SUBTITLE);
    replacedSlotsCount++;
  }

  // Seções: Labels e Headings
  const sectionHeaders = [
    { sel: '#about', label: slots.ABOUT_LABEL, heading: slots.ABOUT_HEADLINE },
    { sel: '.section.result', label: slots.RESULTS_LABEL, heading: slots.RESULTS_HEADLINE },
    { sel: '.section.value', label: slots.VALUE_LABEL, heading: slots.VALUE_HEADLINE },
    { sel: '#services', label: slots.SERVICES_LABEL, heading: slots.SERVICES_HEADLINE },
    { sel: '.section.pricing', label: slots.PRICING_LABEL, heading: slots.PRICING_HEADLINE },
    { sel: '#insights', label: slots.INSIGHTS_LABEL, heading: slots.INSIGHTS_HEADLINE },
    { sel: '#review', label: slots.REVIEWS_LABEL, heading: slots.REVIEWS_HEADLINE },
    { sel: '.section.faq', label: slots.FAQ_LABEL, heading: slots.FAQ_HEADLINE },
    { sel: '#contact', label: slots.CONTACT_LABEL, heading: slots.CONTACT_HEADLINE }
  ];

  sectionHeaders.forEach(s => {
    if (s.label && $final(`${s.sel} .section-label`).length > 0) {
      $final(`${s.sel} .section-label`).text(s.label);
      replacedSlotsCount++;
    }
    if (s.heading && $final(`${s.sel} .section-heading`).length > 0) {
      $final(`${s.sel} .section-heading`).text(s.heading);
      replacedSlotsCount++;
    }
  });

  // Seção About: o conteúdo deve vir exclusivamente de slots do cliente.
  if (slots.ABOUT_HEADLINE) {
    $final('.about-heading').text(slots.ABOUT_HEADLINE);
    replacedSlotsCount++;
  }
  const aboutStats = [slots.ABOUT_STAT_1, slots.ABOUT_STAT_2, slots.ABOUT_STAT_3, slots.ABOUT_STAT_4];
  $final('.about-card-text').each((idx, el) => {
    if (aboutStats[idx]) $final(el).text(aboutStats[idx]);
  });

  // Results Cards
  const resultCards = [
    slots.RESULTS_CARD_1_TITLE,
    slots.RESULTS_CARD_2_TITLE,
    slots.RESULTS_CARD_3_TITLE,
    slots.RESULTS_CARD_4_TITLE
  ];
  if (resultCards.some(Boolean)) {
    $final('.result-card-heading').each((idx, el) => {
      if (resultCards[idx]) $final(el).text(resultCards[idx]);
    });
  }

  // Value Items
  const valueTitles = [slots.VALUE_1_TITLE, slots.VALUE_2_TITLE, slots.VALUE_3_TITLE, slots.VALUE_4_TITLE, slots.VALUE_5_TITLE];
  const valueDescs = [slots.VALUE_1_DESC, slots.VALUE_2_DESC, slots.VALUE_3_DESC, slots.VALUE_4_DESC, slots.VALUE_5_DESC];
  $final('.value-item-title').each((idx, el) => {
    if (valueTitles[idx]) $final(el).text(valueTitles[idx]);
  });
  $final('.value-item-description').each((idx, el) => {
    if (valueDescs[idx]) $final(el).text(valueDescs[idx]);
  });

  // Services: o core aplica somente conteúdo explicitamente declarado.
  const serviceTitles = [
    slots.SERVICE_1_TITLE,
    slots.SERVICE_2_TITLE,
    slots.SERVICE_3_TITLE,
    slots.SERVICE_4_TITLE
  ];
  const serviceDescs = [
    slots.SERVICE_1_DESC,
    slots.SERVICE_2_DESC,
    slots.SERVICE_3_DESC,
    slots.SERVICE_4_DESC
  ];
  $final('.service-card, [class*="service-card"]').each((cardIdx, cardEl) => {
    const sIdx = cardIdx;
    if (serviceTitles[sIdx]) $final(cardEl).find('.service-title:not(.number), h3.service-title').text(serviceTitles[sIdx]);
    if (serviceDescs[sIdx]) $final(cardEl).find('.service-card-short-description, .service-description').text(serviceDescs[sIdx]);
  });

  // Pricing
  const plans = [slots.PLAN_1_NAME, slots.PLAN_2_NAME, slots.PLAN_3_NAME];
  if (plans.some(Boolean)) {
    $final('.pricing-card-heading').each((idx, el) => {
      if (plans[idx]) $final(el).text(plans[idx]);
    });
    $final('.pricing-tabs-menu a, .pricing-tab-link').each((idx, el) => {
      if (plans[idx]) $final(el).text(plans[idx]);
    });
  }
  if (slots.RESULTS_SUBTITLE) $final('.section-sub-heading.result').text(slots.RESULTS_SUBTITLE);
  if (slots.PRICING_SUBTITLE) $final('.section-sub-heading.pricing, .section.pricing .section-sub-heading').text(slots.PRICING_SUBTITLE);
  if (slots.PRICING_TAGLINE) $final('.pricing-card-short-description, .pricing-card-description, .pricing-tab-tagline, .pricing-tagline').text(slots.PRICING_TAGLINE);
  if (slots.FAQ_ANSWER) $final('.faq-answer').text(slots.FAQ_ANSWER);
  if (slots.PRICING_PERIOD) $final('.pricing-period, .pricing-card-period').text(slots.PRICING_PERIOD);

  // Insights Subtítulo, Datas e Botão
  if (slots.INSIGHTS_SUBTITLE) {
    $final('#insights .section-sub-heading').text(slots.INSIGHTS_SUBTITLE);
  }
  if (slots.INSIGHT_BUTTON_TEXT) $final('.insight-card-btn-text').text(slots.INSIGHT_BUTTON_TEXT);

  // Reviews Quote
  if (slots.REVIEWS_QUOTE) $final('.review-text._01, .review-text, [class*="review-text"]').text(slots.REVIEWS_QUOTE);

  // Footer copy and brand are client-declared; reference links remain untouched.
  if (slots.FOOTER_COPY) {
    $final('.footer-bottom-text, .copyright-text').text(slots.FOOTER_COPY);
  }
  if (slots.FOOTER_BRAND || slots.NAV_BRAND) {
    $final('.section-heading.footer').text(slots.FOOTER_BRAND || slots.NAV_BRAND);
  }
  // Footer marquee inherits the client theme instead of a client-specific accent.
  if (slots.NAV_BRAND) {
    $final('.footer-marquee-image-wrapper').each((_, el) => {
      $final(el).html(`
        <div class="footer-marquee-text">${escapeHtml(slots.NAV_BRAND)}</div>
      `);
    });
  }

  // ---------------------------------------------------------------------------
  // D2C / Physical E-commerce (ex: Jumpflex) Declarative Injections
  // ---------------------------------------------------------------------------
  // Promo Alert Bar
  if (slots.PROMO_BAR_TEXT) {
    const promoEl = $final('div[style*="#da0000"] .text-balance, .theme-promo .text-balance');
    if (promoEl.length > 0) {
      promoEl.html(escapeHtml(slots.PROMO_BAR_TEXT));
      replacedSlotsCount++;
    }
  }
  if (slots.PROMO_BAR_BG) {
    $final('div[style*="#da0000"]').attr('style', `background-color: ${slots.PROMO_BAR_BG};`);
  }

  // D2C Brand Logo & Nav Brand
  if (slots.NAV_BRAND) {
    $final('header a[href="/"] svg.brand__logo').replaceWith(`<span class="brand__logo text-xl font-black uppercase tracking-wider text-white" style="font-size: 1.5rem; font-weight: 900; letter-spacing: 0.05em; color: #ffffff;">${escapeHtml(slots.NAV_BRAND)}</span>`);
    $final('header span.sr-only:contains("Jumpflex")').text(slots.NAV_BRAND);
    $final('footer span.sr-only:contains("Jumpflex")').text(slots.NAV_BRAND);
    $final('footer svg.brand__logo').replaceWith(`<span class="brand__logo text-xl font-black uppercase tracking-wider text-white" style="font-size: 1.5rem; font-weight: 900; letter-spacing: 0.05em; color: #ffffff;">${escapeHtml(slots.NAV_BRAND)}</span>`);
  }

  // D2C Menu Links
  const d2cNavLinks = [
    slots.NAV_LINK_1,
    slots.NAV_LINK_2,
    slots.NAV_LINK_3,
    slots.NAV_LINK_4,
    slots.NAV_LINK_5,
    slots.NAV_LINK_6
  ].filter(Boolean);
  if (d2cNavLinks.length > 0) {
    $final('header nav a.brand__menu-link').each((idx, el) => {
      if (d2cNavLinks[idx]) {
        $final(el).text(d2cNavLinks[idx]);
        replacedSlotsCount++;
      }
    });
  }

  // D2C Phone Support
  if (slots.NAV_PHONE) {
    const phoneEl = $final('header a.brand__nav-button[href^="tel:"]');
    if (phoneEl.length > 0) {
      phoneEl.attr('href', `tel:${slots.NAV_PHONE}`);
      phoneEl.find('span.whitespace-nowrap').text(slots.NAV_PHONE);
      replacedSlotsCount++;
    }
  }

  // D2C Hero Title & CTA
  if (slots.HERO_TITLE) {
    const heroH1 = $final('main > section:first-of-type h1.brand__heading, main h1.brand__heading');
    if (heroH1.length > 0) {
      heroH1.text(slots.HERO_TITLE);
      heroH1.removeClass('sr-only');
      replacedSlotsCount++;
    }
  }
  if (slots.HERO_CTA) {
    const heroBtn = $final('main > section:first-of-type a.brand__button--primary');
    if (heroBtn.length > 0) {
      heroBtn.text(slots.HERO_CTA);
      replacedSlotsCount++;
    }
  }

  // D2C Trio Collection Cards (ex: FLEX, HERO, MEGA)
  const trioCards = $final('main > div.grid.min-h-full > div.relative');
  if (trioCards.length >= 3) {
    const collections = [
      {
        title: slots.COLLECTION_1_TITLE,
        desc: slots.COLLECTION_1_DESC,
        rating: slots.COLLECTION_1_RATING,
        reviews: slots.COLLECTION_1_REVIEWS,
        price: slots.COLLECTION_1_PRICE,
        oldPrice: slots.COLLECTION_1_OLD_PRICE,
        installment: slots.COLLECTION_1_INSTALLMENT,
        cta: slots.COLLECTION_1_CTA
      },
      {
        title: slots.COLLECTION_2_TITLE,
        desc: slots.COLLECTION_2_DESC,
        rating: slots.COLLECTION_2_RATING,
        reviews: slots.COLLECTION_2_REVIEWS,
        price: slots.COLLECTION_2_PRICE,
        oldPrice: slots.COLLECTION_2_OLD_PRICE,
        installment: slots.COLLECTION_2_INSTALLMENT,
        cta: slots.COLLECTION_2_CTA
      },
      {
        title: slots.COLLECTION_3_TITLE,
        desc: slots.COLLECTION_3_DESC,
        rating: slots.COLLECTION_3_RATING,
        reviews: slots.COLLECTION_3_REVIEWS,
        price: slots.COLLECTION_3_PRICE,
        oldPrice: slots.COLLECTION_3_OLD_PRICE,
        installment: slots.COLLECTION_3_INSTALLMENT,
        cta: slots.COLLECTION_3_CTA
      }
    ];

    trioCards.each((idx, el) => {
      const col = collections[idx];
      if (!col) return;
      if (col.title) {
        $final(el).find('h2.brand__heading').text(col.title).removeClass('sr-only');
        $final(el).find('img[alt*="Trampolines"]').attr('alt', col.title);
        replacedSlotsCount++;
      }
      if (col.desc) {
        $final(el).find('p.brand__subheading').text(col.desc);
        replacedSlotsCount++;
      }
      if (col.price) {
        $final(el).find('span.text-subheading-lg span:nth-child(2)').text(col.price);
        replacedSlotsCount++;
      }
      if (col.oldPrice) {
        $final(el).find('span.text-subheading-lg s').text(col.oldPrice);
      }
      if (col.installment) {
        $final(el).find('button p:contains("Or Buy Now") span, p:contains("Or Buy Now") span').text(col.installment);
      }
      if (col.cta) {
        $final(el).find('a.brand__button--primary').text(col.cta);
        replacedSlotsCount++;
      }
    });
  }

  // D2C Press / Authority
  if (slots.AUTHORITY_QUOTE) {
    const quoteEl = $final('main > section:nth-of-type(3) h2, main > section:nth-of-type(3) p');
    if (quoteEl.length > 0) {
      quoteEl.first().text(slots.AUTHORITY_QUOTE);
      replacedSlotsCount++;
    }
  }

  // D2C Customer Reviews
  if (slots.REVIEWS_HEADLINE) {
    $final('section:contains("Real Reviews") h2, main > section:nth-of-type(14) h2').first().text(slots.REVIEWS_HEADLINE);
    replacedSlotsCount++;
  }

  // D2C Newsletter
  if (slots.NEWSLETTER_TITLE) {
    $final('section:contains("Newsletter") h2, main > section:nth-of-type(12) h2').text(slots.NEWSLETTER_TITLE);
    replacedSlotsCount++;
  }
  if (slots.NEWSLETTER_SUBTITLE) {
    $final('section:contains("Newsletter") p, main > section:nth-of-type(12) p').first().text(slots.NEWSLETTER_SUBTITLE);
    replacedSlotsCount++;
  }

  // D2C Footer Description & Copyright
  if (slots.FOOTER_DESCRIPTION) {
    $final('footer p, footer .brand__footer-text').first().text(slots.FOOTER_DESCRIPTION);
    replacedSlotsCount++;
  }
  if (slots.FOOTER_COPYRIGHT) {
    $final('footer div:contains("©")').last().text(slots.FOOTER_COPYRIGHT);
    replacedSlotsCount++;
  }

  // A popup is emitted only with its complete declared content.

  if (slots.POPUP_TITLE && slots.POPUP_SUBTITLE && slots.POPUP_CTA && $final('#studio-dna-popup-modal').length === 0) {
    const modalHtml = `
<div id="studio-dna-popup-modal" style="display: none; position: fixed; inset: 0; z-index: 9999; background: var(--popup-backdrop, transparent); backdrop-filter: blur(8px); justify-content: center; align-items: center; padding: 20px;">
  <div style="position: relative; width: 100%; max-width: 520px; background: var(--bg-surface, transparent); border: 1px solid var(--accent-laser, currentColor); border-radius: 16px; padding: 40px 32px; box-shadow: 0 24px 64px rgba(0,0,0,0.6); text-align: center;">
    <button id="studio-dna-popup-close" style="position: absolute; top: 16px; right: 16px; background: transparent; border: none; color: var(--text-main, currentColor); font-size: 24px; cursor: pointer; line-height: 1;">&times;</button>
    ${slots.POPUP_LABEL ? `<div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-laser, currentColor); font-weight: 700; margin-bottom: 8px;">${escapeHtml(slots.POPUP_LABEL)}</div>` : ''}
    <h3 style="font-size: 24px; color: var(--text-main, currentColor); text-transform: uppercase; margin: 0 0 12px 0;">${escapeHtml(slots.POPUP_TITLE)}</h3>
    <p style="font-size: 14px; color: var(--text-muted, currentColor); line-height: 1.5; margin: 0 0 24px 0;">${escapeHtml(slots.POPUP_SUBTITLE)}</p>
    <form style="display: flex; flex-direction: column; gap: 12px;">
      <input type="text" required style="width: 100%; padding: 14px 16px; border-radius: 8px; border: 1px solid var(--popup-field-border, currentColor); background: var(--bg-base, transparent); color: var(--text-main, currentColor); font-size: 14px; box-sizing: border-box;">
      <input type="email" required style="width: 100%; padding: 14px 16px; border-radius: 8px; border: 1px solid var(--popup-field-border, currentColor); background: var(--bg-base, transparent); color: var(--text-main, currentColor); font-size: 14px; box-sizing: border-box;">
      <button type="submit" style="width: 100%; padding: 16px; border-radius: 8px; border: none; background: var(--accent-laser, currentColor); color: var(--bg-base, currentColor); font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; margin-top: 8px;">${escapeHtml(slots.POPUP_CTA)}</button>
    </form>
  </div>
</div>
<script>
  (function() {
    document.addEventListener("DOMContentLoaded", function() {
      var modal = document.getElementById('studio-dna-popup-modal');
      var closeBtn = document.getElementById('studio-dna-popup-close');
      var dismissed = false;
      function openModal() {
        if (dismissed || sessionStorage.getItem('studio_dna_popup_seen')) return;
        modal.style.display = 'flex';
      }
      function closeModal() {
        modal.style.display = 'none';
        dismissed = true;
        sessionStorage.setItem('studio_dna_popup_seen', 'true');
      }
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (modal) modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
      window.addEventListener('scroll', function() {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        if (h > 0 && (window.scrollY / h) >= 0.6) openModal();
      }, { passive: true });
    });
  })();
</script>
`;
    $final('body').append(modalHtml);
  }

  // 4. Injeção da Folha de Estilo Universal do Motor
  // Substitui qualquer remendo antigo por regras W3C universais
  $final('#studio-dna-engine-core-fixes').remove();
  $final('head').append(generateUniversalCoreCss());

  // 5. Injeção de Tema se configurado
  if (compositionSpec.theme && compositionSpec.theme.bgBase) {
    const {
      bgBase = '#080807',
      bgSurface = '#121210',
      bgCard = '#181816',
      accent = '#C5A880',
      textMain = '#F5F5F0'
    } = compositionSpec.theme;

    const themeStyle = `
<style id="studio-dna-theme-override">
  :root {
    --bg-base: ${bgBase};
    --bg-surface: ${bgSurface};
    --bg-card: ${bgCard};
    --card-border: rgba(255, 255, 255, 0.08);
    --accent-laser: ${accent};
    --text-main: ${textMain};
  }
</style>`.trim();
    $final('head').append(themeStyle);
  }

  // 6. SEO injection is opt-in because the injector has legacy fallback copy.
  let finalHtml = $final.html();
  const seo = compositionSpec.seo || {};
  const hasCompleteSeoConfig = seo.title && seo.description && seo.ogImage && seo.canonicalUrl;
  if (compositionSpec.options?.injectSeo && hasCompleteSeoConfig) {
    try {
      finalHtml = SeoInjector.injectSeo(finalHtml, {
        seo,
        client: compositionSpec.client,
        colors: compositionSpec.colors,
        copyOverrides: compositionSpec.copyOverrides
      });
    } catch (err) {
      // Non-fatal
    }
  }

  // 5. Neutralizar scripts de hidratação legados da referência (evita crashes de Hydration Mismatch)
  finalHtml = finalHtml.replace(/<script[^>]*id=["']__NEXT_DATA__["'][^>]*>[\s\S]*?<\/script>/gi, '');
  finalHtml = finalHtml.replace(/<script[^>]*id=["']__NUXT_DATA__["'][^>]*>[\s\S]*?<\/script>/gi, '');

  const outputHash = computeHash(finalHtml);

  // 7. Gravar Artefato do Site
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, finalHtml, 'utf8');

  // 8. Gravar composition-spec.json e build-manifest.json
  if (clientDir) {
    if (!fs.existsSync(clientDir)) {
      fs.mkdirSync(clientDir, { recursive: true });
    }

    const specPath = path.join(clientDir, 'composition-spec.json');
    fs.writeFileSync(specPath, JSON.stringify(compositionSpec, null, 2), 'utf8');

    const manifest = {
      version: '2.0.0',
      builtAt: new Date().toISOString(),
      refSlug: compositionSpec.refSlug,
      brandName: compositionSpec.brandName,
      inputHashes: {
        skeleton: skeletonHash,
        compositionSpec: computeHash(JSON.stringify(compositionSpec))
      },
      outputHash,
      outputPath: path.relative(process.cwd(), outputPath).replace(/\\/g, '/'),
      replacedSlotsCount,
      outputSize: Buffer.byteLength(finalHtml, 'utf8')
    };

    const manifestPath = path.join(clientDir, 'build-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

    return {
      outputPath,
      outputHash,
      replacedSlotsCount,
      manifest
    };
  }

  return {
    outputPath,
    outputHash,
    replacedSlotsCount
  };
}

/**
 * Método de Alto Nível: Transmuta qualquer cliente de forma declarativa e universal.
 */
async function transmuteClient(clientSlug) {
  const root = process.cwd();
  const clientDir = path.resolve(root, 'clientes', clientSlug);
  if (!fs.existsSync(clientDir)) {
    throw new Error(`Pasta do cliente não encontrada: ${clientDir}`);
  }

  // 1. Ler referência selecionada
  const refPath = path.join(clientDir, 'reference-selection.json');
  if (!fs.existsSync(refPath)) {
    throw new Error(`reference-selection.json ausente em ${clientDir}`);
  }
  const { selectedRefSlug } = JSON.parse(fs.readFileSync(refPath, 'utf8'));

  // 2. Localizar esqueleto
  let skeletonPath = path.join(root, 'copias', selectedRefSlug, `${selectedRefSlug}.html`);
  if (!fs.existsSync(skeletonPath)) {
    skeletonPath = path.join(root, 'copias', selectedRefSlug, 'site', 'index.html');
  }
  if (!fs.existsSync(skeletonPath)) {
    skeletonPath = path.join(root, 'copias', selectedRefSlug, 'index.html');
  }
  if (!fs.existsSync(skeletonPath)) {
    throw new Error(`Esqueleto não encontrado para a referência: ${selectedRefSlug}`);
  }

  // 3. Ler Brand Spec e Content Slots
  const brandPath = path.join(clientDir, 'brand-spec.json');
  const brandSpec = fs.existsSync(brandPath) ? JSON.parse(fs.readFileSync(brandPath, 'utf8')) : {};

  const slotsPath = path.join(clientDir, 'content-slots.json');
  const contentSlots = fs.existsSync(slotsPath) ? JSON.parse(fs.readFileSync(slotsPath, 'utf8')) : {};

  // 4. Montar Composition Spec
  const compositionSpec = createCompositionSpec({
    refSlug: selectedRefSlug,
    brandSpec,
    contentSlots
  });

  // 5. Garantir que pasta de assets existe e copiar assets da referência se necessário
  const clientSiteDir = path.join(clientDir, 'site');
  const clientAssetsDir = path.join(clientSiteDir, 'assets');
  const refAssetsDir = path.join(root, 'copias', selectedRefSlug, 'assets');
  if (fs.existsSync(refAssetsDir)) {
    if (!fs.existsSync(clientAssetsDir)) fs.mkdirSync(clientAssetsDir, { recursive: true });
    const refFiles = fs.readdirSync(refAssetsDir);
    refFiles.forEach(f => {
      const src = path.join(refAssetsDir, f);
      const dest = path.join(clientAssetsDir, f);
      if (!fs.existsSync(dest) && fs.statSync(src).isFile()) {
        fs.copyFileSync(src, dest);
      }
    });
  }

  // 6. Executar transmutação determinística
  const outputPath = path.join(clientSiteDir, 'index.html');
  const result = runDeterministicTransmutation({
    skeletonPath,
    compositionSpec,
    outputPath,
    clientDir
  });

  return result;
}

// Suporte para execução via CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const clientIdx = args.indexOf('--client');
  if (clientIdx !== -1 && args[clientIdx + 1]) {
    const slug = args[clientIdx + 1];
    transmuteClient(slug)
      .then(res => {
        console.log(`\n🎉 Transmutação Universal Concluída com Sucesso!`);
        console.log(`- Cliente: ${slug}`);
        console.log(`- Artefato: ${res.outputPath}`);
        console.log(`- SHA-256: ${res.outputHash}`);
        console.log(`- Slots Processados: ${res.replacedSlotsCount}`);
      })
      .catch(err => {
        console.error('❌ Falha na transmutação:', err.message);
        process.exit(1);
      });
  } else {
    console.log('Uso: node src/pipeline/transmuter.js --client <client-slug>');
  }
}

module.exports = {
  createCompositionSpec,
  runDeterministicTransmutation,
  transmuteClient,
  computeHash
};
