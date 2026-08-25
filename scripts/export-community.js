const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Script para gerar e empacotar a versão Open Source (Community Edition)
 */
function buildCommunityPackage() {
  const rootDir = path.resolve(__dirname, '..');
  const targetDir = path.join(rootDir, 'dist-community');

  console.log('📦 Gerando versão Community Edition Open Source...');
  console.log(`📁 Destino: ${targetDir}\n`);

  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  fs.mkdirSync(targetDir, { recursive: true });

  // 1. Pastas e Arquivos para copiar
  const foldersToCopy = ['bin', 'src/config', 'src/core', 'src/generators', 'src/server', 'src/utils'];
  const filesToCopy = [
    'index.js',
    'index.d.ts',
    'LICENSE',
    'setup.bat',
    'setup.sh',
    'Dockerfile',
    'docker-compose.yml',
    '.dockerignore',
    'cloner.config.json.example'
  ];

  foldersToCopy.forEach((folder) => {
    const srcPath = path.join(rootDir, folder);
    const destPath = path.join(targetDir, folder);
    if (fs.existsSync(srcPath)) {
      fs.cpSync(srcPath, destPath, { recursive: true });
      console.log(`  ✅ Pasta copiada: ${folder}`);
    }
  });

  filesToCopy.forEach((file) => {
    const srcPath = path.join(rootDir, file);
    const destPath = path.join(targetDir, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  ✅ Arquivo copiado: ${file}`);
    }
  });

  // 2. .gitignore limpo
  const gitignoreContent = `# Dependencies
node_modules/
package-lock.json

# Local output and cloned sites
copias/
design_dna.json
screenshot.png
design_inspection.png
*.log

# OS & IDE
.DS_Store
Thumbs.db
.vscode/
.idea/
`;
  fs.writeFileSync(path.join(targetDir, '.gitignore'), gitignoreContent);
  console.log('  ✅ .gitignore gerado');

  // 3. package.json Open Source (Community Edition)
  const pkg = {
    name: "studio-dna-engine-community",
    version: "1.0.0",
    description: "Studio DNA (Community Edition) - Web Reverse Engineering, Design DNA & UI/UX Extractor powered by Playwright",
    main: "index.js",
    types: "index.d.ts",
    bin: {
      "studio-dna": "./bin/cli.js",
      "site-cloner": "./bin/cli.js"
    },
    scripts: {
      "start": "node bin/cli.js",
      "cli": "node bin/cli.js",
      "clone": "node bin/cli.js",
      "preview": "node bin/cli.js --preview",
      "setup": "npx playwright install --with-deps chromium"
    },
    keywords: [
      "playwright",
      "web-scraper",
      "design-tokens",
      "ui-ux",
      "reverse-engineering",
      "ai-spec",
      "open-source"
    ],
    author: "Studio DNA Contributors",
    license: "MIT",
    dependencies: {
      "playwright": "^1.41.0"
    }
  };
  fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkg, null, 2));
  console.log('  ✅ package.json (Community Edition) gerado');

  // 4. README.md para a versão pública Open Source
  const readmeContent = `# ⚡ Studio DNA Engine (Community Edition)

> **Motor Open Source de Engenharia Reversa de Web Design, Extração de Design Tokens e Compilação de Especificações para IAs.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Playwright](https://img.shields.io/badge/Powered%20by-Playwright-green.svg)](https://playwright.dev/)

O **Studio DNA (Community Edition)** é uma ferramenta de automação e inspeção profunda de frontend desenvolvida com Node.js e Playwright. Ela permite analisar páginas web modernas, detectar frameworks, extrair design tokens (paletas de cores, escala tipográfica, espaçamentos) e compilar styleguides visuais e especificações prontas para IAs (Cursor, Claude, v0).

---

## 🚀 Início Rápido

### 1. Instalação
\`\`\`bash
# Clonar repositório
git clone https://github.com/SEU_USUARIO/studio-dna-engine-community.git
cd studio-dna-engine-community

# Instalar dependências e navegador Playwright
npm install
npx playwright install --with-deps chromium
\`\`\`

*(No Windows, você também pode dar duplo-clique no \`setup.bat\`)*

---

### 2. Como Usar

#### 🌐 Dashboard Visual (Preview)
Visualizador interativo de design tokens e paletas extraídas:
\`\`\`bash
npm run preview
\`\`\`
Acesse: \`http://localhost:4000\`

#### 💻 Linha de Comando (CLI)
\`\`\`bash
# Extração interativa:
npm start

# Extração direta de uma URL:
node bin/cli.js https://exemplo.com

# Modo com navegador visível na tela:
node bin/cli.js https://exemplo.com --headed
\`\`\`

#### 🐳 Execução via Docker (Opcional)
\`\`\`bash
docker compose run --rm cloner https://exemplo.com
\`\`\`

---

## 🌟 Funcionalidades (Community vs. Pro)

| Funcionalidade | 🌐 Community (Open Source) | 💎 Studio DNA Pro |
| :--- | :---: | :---: |
| **Detecção Inteligente de Frameworks** (React, Next, Vue, Webflow, Astro) | ✅ | ✅ |
| **Clonagem de Assets & HTML** (Imagens, Fontes, SVGs) | ✅ | ✅ |
| **Extração de Design DNA & Tokens** (Cores, Fontes, Spacing, CSS Vars) | ✅ | ✅ |
| **Geração de Styleguide Visual** (\`design-system.html\`) | ✅ | ✅ |
| **Dashboard de Preview Local** (\`localhost:4000\`) | ✅ | ✅ |
| **Geração de Especificação Básica para IA** | ✅ | ✅ |
| **Interceptação de Shaders GLSL (GPU/WebGL)** | — | ✅ |
| **Mapeamento de Event Listeners via CDP** | — | ✅ |
| **Desconstrução Avançada de Timelines GSAP** | — | ✅ |

---

## 📁 Estrutura de Saída (\`./copias/\`)

\`\`\`text
copias/exemplo-com/
├── SITE_TYPE.json                  # Diagnóstico de framework e tecnologia
├── MASTER_SPEC.md                  # Especificação estruturada para LLMs
├── site/                           # Clone HTML, CSS e mídias originais
│   ├── index.html
│   └── assets/
├── design-system/                  # Design Tokens & Styleguide Visual
│   ├── design_dna.json
│   └── design-system.html
└── ui-ux/                          # Animações e micro-interações
    └── ui_ux_features.json
\`\`\`

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request*.

## 📄 Licença

Distribuído sob a licença [MIT](LICENSE).
`;
  fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent);
  console.log('  ✅ README.md (Open Source) gerado\n');

  console.log('🎉 Pacote Open Source pronto na pasta ./dist-community !');
}

buildCommunityPackage();
