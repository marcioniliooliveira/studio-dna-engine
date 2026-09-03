const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');

const projectRoot = path.resolve(__dirname, '..');
const clientDir = path.join(projectRoot, 'clientes', 'negocia-bem-imobiliaria');
const sitePath = path.join(clientDir, 'site', 'index.html');
const manifestPath = path.join(clientDir, 'build-manifest.json');

function replaceAll(value, replacements) {
  return replacements.reduce((result, [from, to]) => result.split(from).join(to), value);
}

function adaptShell() {
  const html = fs.readFileSync(sitePath, 'utf8');
  const slots = JSON.parse(fs.readFileSync(path.join(clientDir, 'content-slots.json'), 'utf8'));
  const brand = JSON.parse(fs.readFileSync(path.join(clientDir, 'brand-spec.json'), 'utf8'));
  const $ = cheerio.load(html, { decodeEntities: false });
  const whatsappBase = `https://wa.me/${brand.whatsapp}`;

  $('h1[data-hero="title"]').attr('aria-label', slots.hero.title).text(slots.hero.title);
  $('div[data-hero="title-min"]').attr('aria-label', slots.hero.titleMin).html(`<div class="word" style="display:inline-block;">PAIÇANDU</div> • <div class="word" style="display:inline-block;">MARINGÁ</div>`);
  $('p[data-hero="subtitle"]').text(slots.hero.subtitle);
  $('div[data-hero="scroll"]').text(slots.hero.scroll);
  $('h2.h5-glare').first().attr('aria-label', slots.about.heading).text(slots.about.heading);
  $('.about-text-box p').eq(0).text(slots.about.text1);
  $('.about-text-box p').eq(1).text(slots.about.text2);

  const funnelTitles = [slots.funnels.comprar.title, slots.funnels.alugar.title, slots.funnels.investir.title];
  const funnelDescriptions = [
    slots.funnels.comprar.description,
    slots.funnels.alugar.description,
    slots.funnels.investir.description
  ];
  const funnelCtas = [slots.funnels.comprar.cta, slots.funnels.alugar.cta, slots.funnels.investir.cta];
  const funnelMessages = [slots.funnels.comprar.message, slots.funnels.alugar.message, slots.funnels.investir.message];
  $('.project-title h2').each((index, element) => {
    if (index < 3) $(element).attr('aria-label', funnelTitles[index]).text(funnelTitles[index]);
  });
  $('.project-text').each((index, element) => {
    if (index < 3) {
      const paragraph = $(element).find('p').first();
      paragraph.attr('aria-label', funnelDescriptions[index]).text(funnelDescriptions[index]);
      const cta = $(element).find('a[data-open-modal]');
      cta.attr('href', `${whatsappBase}?text=${encodeURIComponent(funnelMessages[index])}`);
      cta.attr('target', '_blank');
      cta.find('.text-btn-01').text(funnelCtas[index]);
    }
  });

  const amenityTitles = slots.amenities.items.map((item) => item[0]);
  const amenityDescriptions = slots.amenities.items.map((item) => item[1]);
  $('.amenities-slide-box').each((index, element) => {
    if (index < 3) {
      $(element).find('[data-amenities-anim="title"]').attr('aria-label', amenityTitles[index]).text(amenityTitles[index]);
      $(element).find('[data-amenities-anim="text"]').attr('aria-label', amenityDescriptions[index]).text(amenityDescriptions[index]);
    }
  });

  $('h2[aria-label="Your Questions, Answered"]').attr('aria-label', 'Dúvidas frequentes').text('Dúvidas frequentes');
  $('#modalTitle').text('Detalhes da oportunidade');
  $('#modalDescr').text('Receba orientação personalizada sobre esta oportunidade, condições e próximos passos.');
  $('.modal-btn').find('div').text('FALAR COM A NEGOCIA BEM');
  $('.modal-logo').attr('alt', 'Logo provisório da Negocia Bem');

  // Remove source-only visible fallback fragments left outside the active shell.
  const sourceOnlyFragments = [
    'Phenomenon',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
    'BOOK A VISIT',
    'Your Questions, Answered',
    'wellness-centered amenities',
    'Art INSPIRED SPACES',
    'NATURE-INFUSED RETREATS',
    'Lumière Duplex Residences',
    'Crown Jewel Penthouse',
    'Aurelia Garden Suites'
  ];
  let finalHtml = $.html();
  finalHtml = replaceAll(finalHtml, sourceOnlyFragments.map((fragment) => [fragment, '']));

  const $final = cheerio.load(finalHtml, { decodeEntities: false });
  $final('script[src*="webflow.24809"]').remove();
  const mobileFallbacks = {
    '693881bfdfb07f671238f951_beliefs-img--mob.avif': '693881c0bd19ffb64b94f142_beliefs-img--d.avif',
    '693881bf041520f6c9ca8770_beliefs-img-2--mob.avif': '693881c0f19790d102a7679d_beliefs-img-2--d.avif',
    '693881c82316816e1085777d_cta-img--mob.avif': '693881d5049ac7d72bb5f18f_cta-img--d.avif'
  };
  $final('img').each((_, element) => {
    const src = $final(element).attr('src') || '';
    for (const [missing, fallback] of Object.entries(mobileFallbacks)) {
      if (src.includes(missing)) $final(element).attr('src', src.replace(missing, fallback));
    }
  });
  $final('head').append(`<style id="negocia-bem-token-bridge">:root { --nb-bg-base: ${brand.secondaryColor}; --nb-bg-surface: ${brand.secondaryColor}; --nb-accent: ${brand.accentColor}; --nb-text-main: ${brand.textColor}; --nb-text-muted: rgba(255,255,255,.70); } body { background-color: var(--nb-bg-base) !important; color: var(--nb-text-main) !important; }</style>`);
  $final('img, video').each((_, element) => {
    $final(element).attr('data-asset-status', 'temporary-reference-placeholder');
    $final(element).attr('data-asset-source', 'reference-shell');
  });
  $final('html').attr('lang', 'pt-BR');
  finalHtml = $final.html();
  fs.writeFileSync(sitePath, finalHtml, 'utf8');

  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
  manifest.version = '2.0.0';
  manifest.refSlug = 'elyse-residence-dev-webflow-io';
  manifest.brandName = 'Negocia Bem Consultoria Imobiliária';
  manifest.clientSlug = 'negocia-bem-imobiliaria';
  manifest.assetStatus = 'temporary-reference-placeholder';
  manifest.placeholderPolicy = 'Replace all reference-shell media with approved client assets before publication.';
  manifest.placeholderAssetCount = $final('img, video').length;
  manifest.preservedPhysics = ['GSAP/ScrollTrigger', 'data-anim', 'sticky amenities track', 'Splide carousel', 'hero video', 'modal and FAQ engines'];
  manifest.outputSize = Buffer.byteLength(finalHtml, 'utf8');
  manifest.generatedAt = new Date().toISOString();
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
}

if (require.main === module) adaptShell();
module.exports = { adaptShell };
