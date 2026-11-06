/**
 * Hub Token & Asset Sanitizer Bridge
 * Mapeia tokens extraídos no ComponentDNA para variáveis CSS semânticas do Hub (--hub-*)
 * e sanitiza ícones/SVGs removendo atributos proprietários e aplicando currentColor.
 */

class HubTokenAndAssetBridge {
  /**
   * Converte tokens do ComponentDNA para variáveis semânticas do Hub
   * @param {any} dna
   */
  mapTokensToHubVariables(dna) {
    const tokenBlock = dna?.tokens || dna?.visualTokens;
    if (!dna || !tokenBlock) {
      throw new Error('HubTokenAndAssetBridge: tokens ausentes no ComponentDNA');
    }

    const surfaces = tokenBlock.surfaces || [];
    const borders = tokenBlock.borders || [];
    const typography = tokenBlock.typography || [];
    const colorRoles = tokenBlock.colorRoles || {};

    const cssVars = {
      '--hub-surface-canvas':
        colorRoles.surface ||
        surfaces.find((s) => s.role.includes('canvas') || s.role.includes('shell'))?.value ||
        '#09090b',
      '--hub-surface-card':
        colorRoles.cellSurface ||
        surfaces.find((s) => s.role.includes('card') || s.role.includes('composer') || s.role.includes('elevated'))?.value ||
        '#18181b',
      '--hub-surface-accent':
        colorRoles.dropPlaceholder ||
        surfaces.find((s) => s.role.includes('accent') || s.role.includes('drop') || s.role.includes('active'))?.value ||
        'rgba(99, 102, 241, 0.12)',
      '--hub-border-subtle': borders[0]?.color || colorRoles.dragActiveRing || 'rgba(255, 255, 255, 0.08)',
      '--hub-radius-card': tokenBlock.radius || `${borders[0]?.radiusPx ?? 16}px`,
      '--hub-font-sans': typography[0]?.fontFamily || 'Inter, system-ui, sans-serif'
    };

    const cssText = `:root {\n${Object.entries(cssVars)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join('\n')}\n}`;

    return {
      variables: cssVars,
      cssText
    };
  }

  /**
   * Sanitiza um SVG bruto removendo classes/data-attributes proprietários e normalizando cores para currentColor
   * @param {string} rawSvg
   */
  sanitizeSvgAsset(rawSvg) {
    if (!rawSvg || typeof rawSvg !== 'string' || !rawSvg.includes('<svg')) {
      throw new Error('HubTokenAndAssetBridge: SVG inválido');
    }

    let cleaned = rawSvg
      // Remove scripts ou event handlers inline
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/\son\w+="[^"]*"/gi, '')
      // Remove data-* e classes proprietárias
      .replace(/\sdata-[a-z0-9_-]+="[^"]*"/gi, '')
      .replace(/\sclass="[^"]*"/gi, '')
      // Converte hex/rgb hardcoded em fill/stroke (exceto "none") para currentColor
      .replace(/fill="(?!none)[^"]+"/gi, 'fill="currentColor"')
      .replace(/stroke="(?!none)[^"]+"/gi, 'stroke="currentColor"');

    if (!cleaned.includes('viewBox=')) {
      cleaned = cleaned.replace('<svg', '<svg viewBox="0 0 24 24"');
    }

    return cleaned.trim();
  }
}

module.exports = { HubTokenAndAssetBridge };
