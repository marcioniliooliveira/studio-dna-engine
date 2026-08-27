const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

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
  async compileTokens() {
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
        engine: 'PostCSS AST Token Compiler v2.0'
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

    // 1. tokens.json (Padrão W3C Design Tokens)
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

module.exports = { TokenCompiler };
