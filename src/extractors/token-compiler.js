const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

/**
 * 13 Official W3C DTCG 2025.10 Types
 */
const W3C_DTCG_TYPES = Object.freeze([
  'color',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'number',
  'shadow',
  'border',
  'transition',
  'gradient',
  'typography',
  'strokeStyle'
]);

/**
 * Validates a W3C DTCG 2025.10 Design Tokens Tree.
 *
 * @param {object} tree
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateDtcgTokenTree(tree) {
  const errors = [];

  function walk(node, currentPath = '', inheritedType = null) {
    if (!node || typeof node !== 'object') return;

    // Check if group-level $type is declared
    const groupType = node.$type || inheritedType;

    // Reject legacy Style Dictionary v3 property 'value'
    if (Object.prototype.hasOwnProperty.call(node, 'value')) {
      errors.push(`Legacy property 'value' detected at '${currentPath}'. Must use '$value'.`);
    }

    // Reject legacy Style Dictionary v3 property 'type'
    if (Object.prototype.hasOwnProperty.call(node, 'type')) {
      errors.push(`Legacy property 'type' detected at '${currentPath}'. Must use '$type'.`);
    }

    // Check if this node is a Token (declares $value)
    if (Object.prototype.hasOwnProperty.call(node, '$value')) {
      const tokenType = node.$type || groupType;
      if (!tokenType) {
        errors.push(`Token at '${currentPath}' is missing required $type.`);
      } else if (!W3C_DTCG_TYPES.includes(tokenType)) {
        errors.push(`Invalid $type '${tokenType}' at '${currentPath}'. Must be one of: ${W3C_DTCG_TYPES.join(', ')}`);
      }

      if (node.$extensions?.studioDna?.invariance) {
        const inv = node.$extensions.studioDna.invariance;
        if (inv !== 'P0' && inv !== 'P1') {
          errors.push(`Invalid invariance '${inv}' at '${currentPath}'. Must be 'P0' or 'P1'.`);
        }
      }
      return;
    }

    // Otherwise, treat as group and traverse children
    for (const [key, val] of Object.entries(node)) {
      if (key.startsWith('$')) continue; // Group metadata ($description, $type, etc.)
      const nextPath = currentPath ? `${currentPath}.${key}` : key;
      if (val && typeof val === 'object') {
        walk(val, nextPath, groupType);
      }
    }
  }

  walk(tree);
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Resolves token aliases with {group.token} syntax and cycle detection.
 *
 * @param {object} tokenTree
 * @returns {object} New resolved token tree
 */
function resolveDtcgAliases(tokenTree) {
  const cloned = JSON.parse(JSON.stringify(tokenTree));

  function getNodeByPath(root, pathStr) {
    const parts = pathStr.split('.');
    let curr = root;
    for (const part of parts) {
      if (!curr || typeof curr !== 'object' || !(part in curr)) {
        return undefined;
      }
      curr = curr[part];
    }
    return curr;
  }

  function resolveValue(val, chain = []) {
    if (typeof val !== 'string') return val;

    const aliasRegex = /^\{([^}]+)\}$/;
    const match = val.match(aliasRegex);
    if (!match) return val;

    const targetPath = match[1].trim();

    if (chain.includes(targetPath)) {
      throw new Error(`Circular alias reference detected: ${[...chain, targetPath].join(' -> ')}`);
    }

    const targetNode = getNodeByPath(cloned, targetPath);
    if (!targetNode) {
      throw new Error(`Unresolved token alias '{${targetPath}}'`);
    }

    const rawTargetVal = Object.prototype.hasOwnProperty.call(targetNode, '$value')
      ? targetNode.$value
      : targetNode;

    return resolveValue(rawTargetVal, [...chain, targetPath]);
  }

  function walkAndResolve(node) {
    if (!node || typeof node !== 'object') return;

    if (Object.prototype.hasOwnProperty.call(node, '$value')) {
      node.$value = resolveValue(node.$value);
      return;
    }

    for (const [key, val] of Object.entries(node)) {
      if (key.startsWith('$')) continue;
      if (val && typeof val === 'object') {
        walkAndResolve(val);
      }
    }
  }

  walkAndResolve(cloned);
  return cloned;
}

/**
 * Converts extracted raw PostCSS tokens into a W3C DTCG 2025.10 token tree
 * with P0/P1 invariance tagging.
 */
function convertCssTokensToDtcg(rawTokens, options = {}) {
  const brandSpec = options.brandSpec || {};
  const p0Colors = new Set();
  if (brandSpec.colors) {
    Object.values(brandSpec.colors).forEach(c => {
      if (typeof c === 'string') p0Colors.add(c.toLowerCase());
    });
  }
  const p0Fonts = new Set();
  if (brandSpec.typography) {
    Object.values(brandSpec.typography).forEach(f => {
      if (typeof f === 'string') p0Fonts.add(f.toLowerCase());
    });
  }

  const dtcg = {
    color: {
      brand: {}
    },
    dimension: {
      spacing: {},
      fontSize: {}
    },
    fontFamily: {},
    fontWeight: {},
    duration: {},
    cubicBezier: {}
  };

  // Convert custom properties
  if (rawTokens.customProperties) {
    for (const [prop, val] of Object.entries(rawTokens.customProperties)) {
      const cleanName = prop.replace(/^--/, '');
      const isColor = /^#([0-9a-f]{3,8})$/i.test(val) || val.startsWith('rgb') || val.startsWith('hsl');
      const isDuration = /^\d+(\.\d+)?(ms|s)$/.test(val);
      const isDimension = /^\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(val);

      if (isColor) {
        const isP0 = p0Colors.has(val.toLowerCase()) || cleanName.includes('primary') || cleanName.includes('accent');
        dtcg.color.brand[cleanName] = {
          $value: val,
          $type: 'color',
          $description: `Custom property ${prop}`,
          $extensions: {
            studioDna: {
              invariance: isP0 ? 'P0' : 'P1'
            }
          }
        };
      } else if (isDuration) {
        dtcg.duration[cleanName] = {
          $value: val,
          $type: 'duration',
          $description: `Motion duration ${prop}`,
          $extensions: {
            studioDna: {
              invariance: 'P1'
            }
          }
        };
      } else if (isDimension) {
        dtcg.dimension.spacing[cleanName] = {
          $value: val,
          $type: 'dimension',
          $description: `Dimension spacing ${prop}`,
          $extensions: {
            studioDna: {
              invariance: 'P1'
            }
          }
        };
      }
    }
  }

  // Convert raw colors if not already in brand
  if (Array.isArray(rawTokens.colors)) {
    rawTokens.colors.forEach((c, idx) => {
      const key = `color_${idx + 1}`;
      if (!dtcg.color.brand[key]) {
        const isP0 = p0Colors.has(c.toLowerCase());
        dtcg.color.brand[key] = {
          $value: c,
          $type: 'color',
          $description: `Extracted color palette ${c}`,
          $extensions: {
            studioDna: {
              invariance: isP0 ? 'P0' : 'P1'
            }
          }
        };
      }
    });
  }

  // Ensure brand primary and accent exist if declared in brandSpec
  if (brandSpec.colors?.primary) {
    dtcg.color.brand.primary = {
      $value: brandSpec.colors.primary,
      $type: 'color',
      $description: 'Brand primary color',
      $extensions: {
        studioDna: {
          invariance: 'P0'
        }
      }
    };
  }

  if (brandSpec.colors?.accent) {
    dtcg.color.brand.accent = {
      $value: brandSpec.colors.accent,
      $type: 'color',
      $description: 'Brand accent CTA color',
      $extensions: {
        studioDna: {
          invariance: 'P0'
        }
      }
    };
  }

  // Convert typography
  if (rawTokens.typography) {
    if (Array.isArray(rawTokens.typography.fontFamilies)) {
      rawTokens.typography.fontFamilies.forEach((f, idx) => {
        const isP0 = p0Fonts.has(f.toLowerCase());
        const key = `font_${idx + 1}`;
        dtcg.fontFamily[key] = {
          $value: f,
          $type: 'fontFamily',
          $description: `Font family ${f}`,
          $extensions: {
            studioDna: {
              invariance: isP0 ? 'P0' : 'P1'
            }
          }
        };
      });
    }

    if (Array.isArray(rawTokens.typography.fontSizes)) {
      rawTokens.typography.fontSizes.forEach((sz, idx) => {
        dtcg.dimension.fontSize[`size_${idx + 1}`] = {
          $value: sz,
          $type: 'dimension',
          $description: `Font size ${sz}`,
          $extensions: {
            studioDna: {
              invariance: 'P1'
            }
          }
        };
      });
    }

    if (Array.isArray(rawTokens.typography.fontWeights)) {
      rawTokens.typography.fontWeights.forEach((w, idx) => {
        dtcg.fontWeight[`weight_${idx + 1}`] = {
          $value: String(w),
          $type: 'fontWeight',
          $description: `Font weight ${w}`,
          $extensions: {
            studioDna: {
              invariance: 'P1'
            }
          }
        };
      });
    }
  }

  // Convert motion easings
  if (rawTokens.motion && Array.isArray(rawTokens.motion.easings)) {
    rawTokens.motion.easings.forEach((e, idx) => {
      const match = e.match(/cubic-bezier\(([^)]+)\)/i);
      const val = match
        ? match[1].split(',').map(n => parseFloat(n.trim()))
        : [0.16, 1, 0.3, 1];

      dtcg.cubicBezier[`ease_${idx + 1}`] = {
        $value: val,
        $type: 'cubicBezier',
        $description: `Motion curve ${e}`,
        $extensions: {
          studioDna: {
            invariance: 'P1'
          }
        }
      };
    });
  }

  return dtcg;
}

class TokenCompiler {
  constructor(options = {}) {
    this.siteDir = options.siteDir || '';
    this.slug = options.slug || path.basename(path.resolve(this.siteDir, '..'));
    this.outputDir = options.outputDir || path.resolve(__dirname, '../../design-vault', this.slug);
  }

  /**
   * Coleta todo o CSS disponível no site (arquivos .css externos e <style> no index.html)
   */
  async collectAllCss() {
    let cssChunks = [];

    // 1. Arquivos na pasta styles/
    const stylesDir = path.join(this.siteDir, 'styles');
    if (fs.existsSync(stylesDir)) {
      const files = fs.readdirSync(stylesDir).filter(f => f.endsWith('.css'));
      files.forEach(f => {
        try {
          cssChunks.push(fs.readFileSync(path.join(stylesDir, f), 'utf8'));
        } catch (e) {}
      });
    }

    // 2. inline.css
    const inlineCssPath = path.join(this.siteDir, 'inline.css');
    if (fs.existsSync(inlineCssPath)) {
      try {
        cssChunks.push(fs.readFileSync(inlineCssPath, 'utf8'));
      } catch (e) {}
    }

    // 3. Blocos <style> e links remotos dentro de index.html
    const indexPath = path.join(this.siteDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      try {
        const html = fs.readFileSync(indexPath, 'utf8');
        
        // Extrai tags <style>
        const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
        styleMatches.forEach(tag => {
          const raw = tag.replace(/<\/?style[^>]*>/gi, '');
          if (raw.trim()) cssChunks.push(raw);
        });

        // Extrai links <link rel="stylesheet" href="...">
        const linkMatches = html.match(/<link[^>]+href=["']([^"']+\.css[^"']*)["'][^>]*>/gi) || [];
        for (const linkTag of linkMatches) {
          const hrefMatch = linkTag.match(/href=["']([^"']+)["']/i);
          if (hrefMatch && hrefMatch[1]) {
            const href = hrefMatch[1];
            if (href.startsWith('http://') || href.startsWith('https://')) {
              try {
                const fetchedCss = await this.fetchRemoteCss(href);
                if (fetchedCss) cssChunks.push(fetchedCss);
              } catch (err) {}
            } else {
              const localCss = path.resolve(this.siteDir, href);
              if (fs.existsSync(localCss)) {
                try { cssChunks.push(fs.readFileSync(localCss, 'utf8')); } catch (e) {}
              }
            }
          }
        }
      } catch (e) {}
    }

    return cssChunks.join('\n');
  }

  fetchRemoteCss(url) {
    const httpLib = url.startsWith('https') ? require('https') : require('http');
    return new Promise((resolve) => {
      const req = httpLib.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(this.fetchRemoteCss(res.headers.location));
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      });
      req.on('error', () => resolve(''));
      req.setTimeout(5000, () => { req.destroy(); resolve(''); });
    });
  }

  /**
   * Compila o CSS através da AST do PostCSS e extrai o Design DNA
   */
  async compileTokens(options = {}) {
    const rawCss = await this.collectAllCss();
    if (!rawCss.trim()) {
      console.warn(`⚠️ [TokenCompiler] Nenhum CSS encontrado em: ${this.siteDir}`);
      return null;
    }

    const root = postcss.parse(rawCss);

    const customProperties = {};
    const colors = new Set();
    const fontFamilies = new Set();
    const fontSizes = new Set();
    const fontWeights = new Set();
    const easings = new Set();
    const borderRadiuses = new Set();
    const spacingValues = new Set();

    root.walkDecls(decl => {
      const prop = decl.prop.trim();
      const val = decl.value.trim();

      // 1. CSS Custom Properties (:root / variáveis)
      if (prop.startsWith('--')) {
        customProperties[prop] = val;
        if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(val) || val.startsWith('rgb') || val.startsWith('hsl')) {
          colors.add(val);
        }
        if (val.includes('cubic-bezier')) {
          easings.add(val);
        }
      }

      // 2. Cores
      if (prop.includes('color') || prop === 'background' || prop === 'border' || prop === 'fill' || prop === 'stroke') {
        const hexMatches = val.match(/#([0-9a-f]{3,8})\b/gi);
        if (hexMatches) hexMatches.forEach(c => colors.add(c.toLowerCase()));

        const rgbMatches = val.match(/rgba?\([^)]+\)/gi);
        if (rgbMatches) rgbMatches.forEach(c => colors.add(c));

        const hslMatches = val.match(/hsla?\([^)]+\)/gi);
        if (hslMatches) hslMatches.forEach(c => colors.add(c));
      }

      // 3. Tipografia
      if (prop === 'font-family') {
        val.split(',').forEach(f => fontFamilies.add(f.trim().replace(/['"]/g, '')));
      }
      if (prop === 'font-size') {
        fontSizes.add(val);
      }
      if (prop === 'font-weight') {
        fontWeights.add(val);
      }

      // 4. Easings e Transições
      if (prop.includes('transition') || prop.includes('animation') || prop === 'animation-timing-function') {
        const cubicMatches = val.match(/cubic-bezier\([^)]+\)/gi);
        if (cubicMatches) cubicMatches.forEach(e => easings.add(e));
      }

      // 5. Raios de Borda
      if (prop === 'border-radius') {
        borderRadiuses.add(val);
      }

      // 6. Espaçamento (Padding/Margin/Gap)
      if (prop === 'gap' || prop === 'padding' || prop === 'margin') {
        if (!val.includes('var(') && !val.includes('calc(')) {
          spacingValues.add(val);
        }
      }
    });

    const tokens = {
      meta: {
        slug: this.slug,
        extractedAt: new Date().toISOString(),
        engine: 'PostCSS AST Token Compiler v2.0 (W3C DTCG 2025.10 Ready)'
      },
      customProperties,
      colors: Array.from(colors).sort(),
      typography: {
        fontFamilies: Array.from(fontFamilies).filter(f => f && !f.includes('inherit')),
        fontSizes: Array.from(fontSizes).sort(),
        fontWeights: Array.from(fontWeights).sort()
      },
      motion: {
        easings: Array.from(easings),
        durations: Object.keys(customProperties)
          .filter(k => k.includes('duration'))
          .reduce((acc, k) => { acc[k] = customProperties[k]; return acc; }, {})
      },
      borders: {
        radiuses: Array.from(borderRadiuses)
      },
      layout: {
        columns: Object.keys(customProperties)
          .filter(k => k.includes('column') || k.includes('grid'))
          .reduce((acc, k) => { acc[k] = customProperties[k]; return acc; }, {})
      }
    };

    // Also compile to W3C DTCG 2025.10
    tokens.dtcg = convertCssTokensToDtcg(tokens, options);

    this.saveOutputs(tokens);
    return tokens;
  }

  /**
   * Salva os artefatos de tokens, Tailwind config e Brand Spec template
   */
  saveOutputs(tokens) {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // 1. tokens.json (Padrão W3C Design Tokens DTCG 2025.10)
    const tokensJsonPath = path.join(this.outputDir, 'tokens.json');
    fs.writeFileSync(tokensJsonPath, JSON.stringify(tokens, null, 2));

    // 2. tailwind.config.js
    const tailwindColors = {};
    tokens.colors.slice(0, 12).forEach((c, idx) => {
      tailwindColors[`brand-${idx + 1}`] = c;
    });

    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './site/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(tailwindColors, null, 8).replace(/\n\s{6}\}/, '\n      }')},
      fontFamily: {
        sans: ${JSON.stringify(tokens.typography.fontFamilies.slice(0, 3))}
      },
      transitionTimingFunction: {
        'cinema': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-out': 'cubic-bezier(0.2, 1, 0.36, 1)'
      }
    }
  },
  plugins: []
};
`;
    const tailwindConfigPath = path.join(this.outputDir, 'tailwind.config.js');
    fs.writeFileSync(tailwindConfigPath, tailwindConfig);

    // 3. brand-spec.template.json (Template pronto para transmutação do cliente)
    const brandTemplate = {
      client: {
        id: "novo-cliente-slug",
        name: "Nome da Empresa",
        tagline: "Slogan de alto impacto",
        niche: "MedicalBusiness | TechSaaS | RealEstate | Ecommerce",
        language: "pt-BR"
      },
      colors: {
        primary: tokens.colors[0] || "#38bdf8",
        accent: tokens.colors[1] || "#64cefb",
        background: tokens.colors.find(c => c === '#000000' || c === '#080807' || c.includes('0, 0, 0')) || "#080807",
        surface: "rgba(255, 255, 255, 0.03)",
        text: "#fafaf9"
      },
      seo: {
        title: "Nome da Empresa — Slogan de Destaque",
        description: "Descrição de alto padrão para motores de busca e compartilhamento em redes sociais.",
        ogImage: "./assets/images/og-preview.png",
        canonicalUrl: "https://minhaempresa.com"
      },
      typography: {
        headings: tokens.typography.fontFamilies[0] || "Inter",
        body: tokens.typography.fontFamilies[1] || "Inter"
      },
      copyOverrides: {
        hero: {
          eyebrow: "TECNOLOGIA · ALTA PERFORMANCE",
          title: "Experiências Digitais que Transformam Resultados.",
          description: "Criamos presenças digitais exclusivas para marcas que lideram seus mercados.",
          primaryCta: "Agendar Reunião",
          secondaryCta: "Ver Projetos"
        },
        metrics: [
          { number: "99.8%", label: "Precisão & Confiabilidade" },
          { number: "15k+", label: "Atendimentos Realizados" },
          { number: "24/7", label: "Monitoramento Contínuo" }
        ],
        contact: {
          whatsapp: "5511999999999",
          email: "contato@empresa.com",
          address: "São Paulo, Brasil"
        }
      }
    };
    const brandTemplatePath = path.join(this.outputDir, 'brand-spec.template.json');
    fs.writeFileSync(brandTemplatePath, JSON.stringify(brandTemplate, null, 2));

    console.log(`✅ [TokenCompiler] Design DNA compilado com sucesso em: ${this.outputDir}`);
    console.log(`   - ${path.basename(tokensJsonPath)} (${tokens.colors.length} cores, ${tokens.typography.fontFamilies.length} fontes)`);
    console.log(`   - ${path.basename(tailwindConfigPath)}`);
    console.log(`   - ${path.basename(brandTemplatePath)}`);
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  let targetPath = args[0] || 'copias/bymonolog-com/site';
  if (!targetPath.includes('site') && fs.existsSync(path.join(targetPath, 'site'))) {
    targetPath = path.join(targetPath, 'site');
  }
  const fullPath = path.resolve(targetPath);
  const compiler = new TokenCompiler({ siteDir: fullPath });
  compiler.compileTokens().catch(console.error);
}

module.exports = {
  TokenCompiler,
  W3C_DTCG_TYPES,
  validateDtcgTokenTree,
  resolveDtcgAliases,
  convertCssTokensToDtcg
};
