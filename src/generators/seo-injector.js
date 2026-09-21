const cheerio = require('cheerio');

class SeoInjector {
  /**
   * Injeta metadados completos de SEO, OpenGraph, Twitter Card e JSON-LD Schema.org
   * @param {string} htmlString - Documento HTML completo
   * @param {Object} brandSpec - Especificação de marca do cliente
   * @returns {string} HTML com SEO calibrado
   */
  static injectSeo(htmlString, brandSpec = {}) {
    if (!htmlString || typeof htmlString !== 'string') return htmlString;

    const $ = cheerio.load(htmlString, { decodeEntities: false });
    const seo = brandSpec.seo || {};
    const client = brandSpec.client || {};
    const colors = brandSpec.colors || {};

    const title = seo.title || `${client.name || 'Empresa'} — ${client.tagline || 'Excelência e Alta Performance'}`;
    const description = seo.description || `${client.name || 'Nossa empresa'} oferece soluções completas e exclusivas com foco em resultados e tecnologia de ponta.`;
    const ogImage = seo.ogImage || './assets/images/og-preview.png';
    const canonicalUrl = seo.canonicalUrl || 'https://www.exemplo.com.br';
    const lang = client.language || 'pt-BR';

    // 1. Atualiza lang no <html>
    $('html').attr('lang', lang);

    // 2. Title & Meta Description
    if ($('title').length) {
      $('title').text(title);
    } else {
      $('head').prepend(`<title>${title}</title>`);
    }

    $('meta[name="description"]').remove();
    $('meta[name="robots"]').remove();
    $('link[rel="canonical"]').remove();

    $('head').append(`  <meta name="description" content="${description}">\n`);
    $('head').append(`  <meta name="robots" content="index, follow, max-image-preview:large">\n`);
    $('head').append(`  <link rel="canonical" href="${canonicalUrl}">\n`);

    // 3. Theme color & Mobile
    $('meta[name="theme-color"]').remove();
    const themeColor = colors.background || colors.primary || '#080807';
    $('head').append(`  <meta name="theme-color" content="${themeColor}">\n`);

    // 4. OpenGraph (Facebook, LinkedIn, WhatsApp)
    $('meta[property^="og:"]').remove();
    $('head').append(`  <meta property="og:type" content="website">\n`);
    $('head').append(`  <meta property="og:title" content="${title}">\n`);
    $('head').append(`  <meta property="og:description" content="${description}">\n`);
    $('head').append(`  <meta property="og:url" content="${canonicalUrl}">\n`);
    $('head').append(`  <meta property="og:image" content="${ogImage}">\n`);
    $('head').append(`  <meta property="og:locale" content="${lang.replace('-', '_')}">\n`);

    // 5. Twitter Card
    $('meta[name^="twitter:"]').remove();
    $('head').append(`  <meta name="twitter:card" content="summary_large_image">\n`);
    $('head').append(`  <meta name="twitter:title" content="${title}">\n`);
    $('head').append(`  <meta name="twitter:description" content="${description}">\n`);
    $('head').append(`  <meta name="twitter:image" content="${ogImage}">\n`);

    // 6. Schema.org JSON-LD estruturado por Nicho
    $('script[type="application/ld+json"]').remove();
    const schemaData = SeoInjector.generateJsonLd(brandSpec, title, description, canonicalUrl, ogImage);
    $('head').append(`  <script type="application/ld+json">\n${JSON.stringify(schemaData, null, 2)}\n  </script>\n`);

    return $.html();
  }

  /**
   * Gera o schema JSON-LD apropriado para o nicho do cliente
   */
  static generateJsonLd(brandSpec, title, description, url, image) {
    const client = brandSpec.client || {};
    const niche = (client.niche || '').toLowerCase();
    const contact = (brandSpec.copyOverrides && brandSpec.copyOverrides.contact) || {};

    let schemaType = 'Organization';
    if (niche.includes('medic') || niche.includes('health') || niche.includes('saude')) {
      schemaType = 'MedicalBusiness';
    } else if (niche.includes('saas') || niche.includes('tech') || niche.includes('software')) {
      schemaType = 'SoftwareApplication';
    } else if (niche.includes('imob') || niche.includes('realestate') || niche.includes('imoveis')) {
      schemaType = 'RealEstateAgent';
    } else if (niche.includes('ecom') || niche.includes('loja') || niche.includes('d2c')) {
      schemaType = 'OnlineStore';
    } else if (niche.includes('agency') || niche.includes('design') || niche.includes('estudio')) {
      schemaType = 'ProfessionalService';
    }

    const baseSchema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": client.name || title,
      "description": description,
      "url": url,
      "image": image,
      "telephone": contact.whatsapp || contact.phone || "+55 11 99999-9999",
      "email": contact.email || "contato@empresa.com.br",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": contact.address || "São Paulo",
        "addressCountry": "BR"
      }
    };

    if (schemaType === 'SoftwareApplication') {
      baseSchema["applicationCategory"] = "BusinessApplication";
      baseSchema["operatingSystem"] = "Web, Cloud, iOS, Android";
    }

    if (schemaType === 'MedicalBusiness') {
      baseSchema["medicalSpecialty"] = "CommunityMedicine";
      baseSchema["availableService"] = {
        "@type": "MedicalTherapy",
        "name": "Atendimento Médico & Telemedicina"
      };
    }

    return baseSchema;
  }
}

module.exports = { SeoInjector };
