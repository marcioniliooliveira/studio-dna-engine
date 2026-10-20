/**
 * Studio DNA Engine — ReactBits Premium Extractor
 * 
 * Extracts the most sophisticated and elegant components from ReactBits (https://reactbits.dev/):
 * - Chat AI (PromptBar, ThoughtLine, VoicePill, CallChip, CodeSlots, RefineFrame, CurvedInput, etc.)
 * - Microinterações (HoldButton, SlideCommit, SpringCheck, SquishSwitch, SloshGauge, CometDial, etc.)
 * - Menus de Navegação (CardNav, PillNav, Dock, BubbleMenu, FlowingMenu, StaggeredMenu, GooeyNav, etc.)
 * - Cards Elegantes (MagicBento, SpotlightCard, BorderGlow, TiltedCard, DecayCard, CardSwap, ReflectiveCard, etc.)
 * - Dashboards & Billing (ElasticSlider, Counter, Stepper, OptionWheel, ChromaGrid, AnimatedList, SwipeRow, etc.)
 * - Ícones & Micro-visuals (GlassIcons, StatusMark, PulseHeart, StickerPeel, SpecularButton)
 * - Tools & Visual Effects (Lanyard 3D, ModelViewer, FluidGlass, MetallicPaint, ElectricBorder, LaserFlow, Antigravity)
 */

const fs = require('fs');
const path = require('path');

const BASE_CDN = 'https://cdn.jsdelivr.net/gh/DavidHDev/react-bits@main';
const OUTPUT_DIR = path.resolve(__dirname, '../reactbitspremium');

// Map of components categorized as requested by user
const CATEGORY_MAP = {
  'chat-ai': {
    title: 'Chat AI & AI Agent Interfaces',
    description: 'High-end conversational UI, prompt bars, reasoning chains, voice pills, and generative AI visualizers.',
    components: [
      { name: 'PromptBar', subpath: 'Micro/PromptBar' },
      { name: 'ThoughtLine', subpath: 'Micro/ThoughtLine' },
      { name: 'VoicePill', subpath: 'Micro/VoicePill' },
      { name: 'CallChip', subpath: 'Micro/CallChip' },
      { name: 'CodeSlots', subpath: 'Micro/CodeSlots' },
      { name: 'RefineFrame', subpath: 'Micro/RefineFrame' },
      { name: 'CurvedInput', subpath: 'Components/CurvedInput' },
      { name: 'DecryptedText', subpath: 'TextAnimations/DecryptedText' },
      { name: 'TechText', subpath: 'TextAnimations/TechText' },
      { name: 'ScrambledText', subpath: 'TextAnimations/ScrambledText' }
    ]
  },
  'navigation': {
    title: 'Menus de Navegação & Sidebars',
    description: 'Ultra-modern responsive navigations, floating docks, card menus, and fluid navigation bars.',
    components: [
      { name: 'CardNav', subpath: 'Components/CardNav' },
      { name: 'PillNav', subpath: 'Components/PillNav' },
      { name: 'Dock', subpath: 'Components/Dock' },
      { name: 'BubbleMenu', subpath: 'Components/BubbleMenu' },
      { name: 'FlowingMenu', subpath: 'Components/FlowingMenu' },
      { name: 'StaggeredMenu', subpath: 'Components/StaggeredMenu' },
      { name: 'InfiniteMenu', subpath: 'Components/InfiniteMenu' },
      { name: 'GooeyNav', subpath: 'Components/GooeyNav' },
      { name: 'LineSidebar', subpath: 'Components/LineSidebar' },
      { name: 'BranchedMenu', subpath: 'Micro/BranchedMenu' }
    ]
  },
  'cards': {
    title: 'Cards Sofisticados & Elegantes',
    description: 'Bento grids, cursor spotlight cards, 3D tilt cards, reflective chrome cards, and layered stacks.',
    components: [
      { name: 'MagicBento', subpath: 'Components/MagicBento' },
      { name: 'SpotlightCard', subpath: 'Components/SpotlightCard' },
      { name: 'BorderGlow', subpath: 'Components/BorderGlow' },
      { name: 'TiltedCard', subpath: 'Components/TiltedCard' },
      { name: 'DecayCard', subpath: 'Components/DecayCard' },
      { name: 'CardSwap', subpath: 'Components/CardSwap' },
      { name: 'PixelCard', subpath: 'Components/PixelCard' },
      { name: 'ProfileCard', subpath: 'Components/ProfileCard' },
      { name: 'ReflectiveCard', subpath: 'Components/ReflectiveCard' },
      { name: 'ScrollStack', subpath: 'Components/ScrollStack' },
      { name: 'BounceCards', subpath: 'Components/BounceCards' },
      { name: 'Stack', subpath: 'Components/Stack' },
      { name: 'FlipCard', subpath: 'Micro/FlipCard' }
    ]
  },
  'dashboards-billing': {
    title: 'Dashboards, Billing & Metrics',
    description: 'Pricing tier sliders, liquid gauges, KPI metric counters, step checkouts, and dashboard data grids.',
    components: [
      { name: 'ElasticSlider', subpath: 'Components/ElasticSlider' },
      { name: 'Counter', subpath: 'Components/Counter' },
      { name: 'CountUp', subpath: 'TextAnimations/CountUp' },
      { name: 'Stepper', subpath: 'Components/Stepper' },
      { name: 'OptionWheel', subpath: 'Components/OptionWheel' },
      { name: 'ChromaGrid', subpath: 'Components/ChromaGrid' },
      { name: 'AnimatedList', subpath: 'Components/AnimatedList' },
      { name: 'SwipeRow', subpath: 'Micro/SwipeRow' },
      { name: 'FolderFloat', subpath: 'Micro/FolderFloat' },
      { name: 'Folder', subpath: 'Components/Folder' }
    ]
  },
  'microinteractions': {
    title: 'Microinterações & Controles Hápticos',
    description: 'Tactile switches, hold-to-confirm buttons, slide-commit checkouts, spring physics checks, and dials.',
    components: [
      { name: 'BellToggle', subpath: 'Micro/BellToggle' },
      { name: 'SquishSwitch', subpath: 'Micro/SquishSwitch' },
      { name: 'HoldButton', subpath: 'Micro/HoldButton' },
      { name: 'SlideCommit', subpath: 'Micro/SlideCommit' },
      { name: 'SpringCheck', subpath: 'Micro/SpringCheck' },
      { name: 'SloshGauge', subpath: 'Micro/SloshGauge' },
      { name: 'CometDial', subpath: 'Micro/CometDial' },
      { name: 'StatusMark', subpath: 'Micro/StatusMark' },
      { name: 'WarmTooltip', subpath: 'Micro/WarmTooltip' },
      { name: 'SwipeToast', subpath: 'Micro/SwipeToast' },
      { name: 'RubberSegment', subpath: 'Micro/RubberSegment' },
      { name: 'GlideSelect', subpath: 'Micro/GlideSelect' },
      { name: 'LatticeLoader', subpath: 'Micro/LatticeLoader' },
      { name: 'FuseButton', subpath: 'Micro/FuseButton' },
      { name: 'SlingButton', subpath: 'Micro/SlingButton' },
      { name: 'WakeSlider', subpath: 'Micro/WakeSlider' },
      { name: 'DodgeField', subpath: 'Micro/DodgeField' },
      { name: 'ScrubField', subpath: 'Micro/ScrubField' },
      { name: 'JellyRadio', subpath: 'Micro/JellyRadio' },
      { name: 'PeekRating', subpath: 'Micro/PeekRating' },
      { name: 'TearTicket', subpath: 'Micro/TearTicket' },
      { name: 'Shredder', subpath: 'Micro/Shredder' },
      { name: 'PaperCrumple', subpath: 'Micro/PaperCrumple' }
    ]
  },
  'icons-microvisuals': {
    title: 'Ícones & Micro-visuals',
    description: 'Frosted 3D glass icons, dynamic pulse reactions, peelable badges, and lighting reflection buttons.',
    components: [
      { name: 'GlassIcons', subpath: 'Components/GlassIcons' },
      { name: 'PulseHeart', subpath: 'Micro/PulseHeart' },
      { name: 'StickerPeel', subpath: 'Animations/StickerPeel' },
      { name: 'SpecularButton', subpath: 'Components/SpecularButton' }
    ]
  },
  'tools-visual-effects': {
    title: 'Tools 3D & Efeitos Visuais Statement',
    description: 'WebGL 3D physics lanyards, GLTF model viewers, refractive liquid glass, liquid metallic paint, and lasers.',
    components: [
      { name: 'Lanyard', subpath: 'Components/Lanyard' },
      { name: 'ModelViewer', subpath: 'Components/ModelViewer' },
      { name: 'FluidGlass', subpath: 'Components/FluidGlass' },
      { name: 'GlassSurface', subpath: 'Components/GlassSurface' },
      { name: 'MetallicPaint', subpath: 'Animations/MetallicPaint' },
      { name: 'ElectricBorder', subpath: 'Animations/ElectricBorder' },
      { name: 'LaserFlow', subpath: 'Animations/LaserFlow' },
      { name: 'Antigravity', subpath: 'Animations/Antigravity' }
    ]
  }
};

// Rate limiter / concurrency queue
async function pMap(array, fn, concurrency = 8) {
  const results = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => fn(item));
    results.push(p);
    if (concurrency <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}

async function fetchFile(url, isBinary = false) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP ${res.status} for ${url}`);
    }
    if (isBinary) {
      const buffer = await res.arrayBuffer();
      return Buffer.from(buffer);
    }
    return await res.text();
  } catch (err) {
    // Retry once with a small delay
    await new Promise(r => setTimeout(r, 500));
    try {
      const retryRes = await fetch(url);
      if (!retryRes.ok) return null;
      if (isBinary) {
        const buffer = await retryRes.arrayBuffer();
        return Buffer.from(buffer);
      }
      return await retryRes.text();
    } catch (e) {
      return null;
    }
  }
}

async function extractComponent(categoryKey, comp) {
  const { name, subpath } = comp;
  const compDir = path.join(OUTPUT_DIR, categoryKey, name);
  if (!fs.existsSync(compDir)) {
    fs.mkdirSync(compDir, { recursive: true });
  }

  const [catFolder] = subpath.split('/');
  const filesToFetch = [
    // 1. TSX Tailwind (Standard for React/Next.js)
    {
      url: `${BASE_CDN}/src/ts-tailwind/${subpath}/${name}.tsx`,
      dest: path.join(compDir, `${name}.tsx`),
      binary: false,
      label: 'TypeScript Tailwind'
    },
    // 2. JSX Tailwind (JavaScript variant)
    {
      url: `${BASE_CDN}/src/tailwind/${subpath}/${name}.jsx`,
      dest: path.join(compDir, `${name}.jsx`),
      binary: false,
      label: 'JavaScript Tailwind'
    },
    // 3. CSS (if available in content or ts-default)
    {
      url: `${BASE_CDN}/src/content/${subpath}/${name}.css`,
      dest: path.join(compDir, `${name}.css`),
      binary: false,
      label: 'Vanilla CSS'
    },
    // 4. Demo Code (Shows usage, mockup, props)
    {
      url: `${BASE_CDN}/src/demo/${catFolder}/${name}Demo.jsx`,
      dest: path.join(compDir, `${name}Demo.jsx`),
      binary: false,
      label: 'Interactive Demo'
    },
    // 5. Registry JSON (Shadcn registry format)
    {
      url: `${BASE_CDN}/public/r/${name}-TS-TW.json`,
      dest: path.join(compDir, `registry.json`),
      binary: false,
      label: 'Shadcn Registry Spec'
    }
  ];

  // Specific assets for special components (e.g., Lanyard 3D models)
  if (name === 'Lanyard') {
    filesToFetch.push({
      url: `${BASE_CDN}/src/ts-tailwind/Components/Lanyard/card.glb`,
      dest: path.join(compDir, `card.glb`),
      binary: true,
      label: '3D GLTF Card Model'
    });
    filesToFetch.push({
      url: `${BASE_CDN}/src/ts-tailwind/Components/Lanyard/lanyard.png`,
      dest: path.join(compDir, `lanyard.png`),
      binary: true,
      label: 'Lanyard Texture PNG'
    });
  }

  const savedFiles = [];

  for (const item of filesToFetch) {
    const data = await fetchFile(item.url, item.binary);
    if (data !== null) {
      if (item.binary) {
        fs.writeFileSync(item.dest, data);
      } else {
        fs.writeFileSync(item.dest, data, 'utf8');
      }
      savedFiles.push(path.basename(item.dest));
    }
  }

  // Parse registry.json to discover dependencies & description
  let deps = [];
  let description = `${name} component from ReactBits.`;
  const regPath = path.join(compDir, 'registry.json');
  if (fs.existsSync(regPath)) {
    try {
      const reg = JSON.parse(fs.readFileSync(regPath, 'utf8'));
      if (reg.dependencies) deps = deps.concat(reg.dependencies);
      if (reg.devDependencies) deps = deps.concat(reg.devDependencies);
      if (reg.description) description = reg.description;
    } catch (e) {}
  }

  // Create README.md for the component
  const depsStr = deps.length > 0 ? deps.join(' ') : 'framer-motion lucide-react clsx tailwind-merge';
  const readmeContent = `# ${name}

> **Category**: ${CATEGORY_MAP[categoryKey].title}  
> **Source**: [https://reactbits.dev/](https://reactbits.dev/)

${description}

---

## 📦 Arquivos Extraídos

| Arquivo | Descrição |
| --- | --- |
${savedFiles.map(f => `| \`${f}\` | ${f.endsWith('.tsx') ? 'Componente pronto em React + TypeScript + Tailwind CSS' : f.endsWith('.jsx') ? (f.includes('Demo') ? 'Exemplo de uso prático e demo com estado' : 'Versão JavaScript + Tailwind') : f.endsWith('.css') ? 'Folha de estilos CSS puro auxiliar' : f.endsWith('.json') ? 'Especificação completa shadcn / jsrepo com metadados' : 'Asset 3D/Textura'} |`).join('\n')}

---

## 🚀 Dependências Necessárias

\`\`\`bash
npm install ${depsStr}
\`\`\`

---

## 💡 Como Usar

Veja o arquivo [\`${name}Demo.jsx\`](./${name}Demo.jsx) para o exemplo completo de implementação com estados, props e customizações.

\`\`\`tsx
import ${name} from './${name}';

export default function Example() {
  return (
    <div className="p-8 flex items-center justify-center">
      <${name} />
    </div>
  );
}
\`\`\`
`;

  fs.writeFileSync(path.join(compDir, 'README.md'), readmeContent, 'utf8');
  return { name, savedFiles, count: savedFiles.length };
}

async function run() {
  console.log('🚀 Iniciando Extração ReactBits Premium...');
  console.log(`📁 Diretório de Destino: ${OUTPUT_DIR}`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const allComps = [];
  for (const [catKey, catVal] of Object.entries(CATEGORY_MAP)) {
    catVal.components.forEach(comp => {
      allComps.push({ categoryKey: catKey, comp });
    });
  }

  console.log(`📊 Total de componentes a extrair: ${allComps.length}`);

  let completed = 0;
  const results = await pMap(allComps, async ({ categoryKey, comp }) => {
    const res = await extractComponent(categoryKey, comp);
    completed++;
    process.stdout.write(`\r[${completed}/${allComps.length}] Extraído: ${comp.name} (${res.count} arquivos)        `);
    return { ...res, categoryKey };
  }, 10);

  console.log('\n\n✅ Todos os componentes foram extraídos com sucesso!');

  // Generate Global reactbitspremium/package.json
  const globalPkg = {
    name: "reactbitspremium",
    version: "1.0.0",
    description: "Curated collection of the most premium, sophisticated and elegant components from ReactBits (https://reactbits.dev/)",
    private: true,
    dependencies: {
      "@react-three/drei": "^9.99.0",
      "@react-three/fiber": "^8.15.16",
      "@react-three/rapier": "^1.3.0",
      "clsx": "^2.1.0",
      "framer-motion": "^11.0.8",
      "gsap": "^3.12.5",
      "lucide-react": "^0.344.0",
      "ogl": "^1.0.1",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "tailwind-merge": "^2.2.1",
      "three": "^0.161.0"
    },
    devDependencies: {
      "@types/react": "^18.2.55",
      "@types/react-dom": "^18.2.19",
      "@types/three": "^0.161.2",
      "autoprefixer": "^10.4.17",
      "postcss": "^8.4.35",
      "tailwindcss": "^3.4.1",
      "typescript": "^5.3.3"
    }
  };
  fs.writeFileSync(path.join(OUTPUT_DIR, 'package.json'), JSON.stringify(globalPkg, null, 2), 'utf8');

  // Generate Global INDEX.md
  let masterIndex = `# 💎 ReactBits Premium Component Library

> **Origem Oficial**: [https://reactbits.dev/](https://reactbits.dev/)  
> **Curadoria**: Componentes mais elegantes, avançados e de alta conversão para Chat AI, Tools, Ícones 3D, Dashboards, Microinterações, Billing, Menus de Navegação e Cards Sofisticados.  
> **Localização**: \`reactbitspremium/\`

---

## 📁 Estrutura de Pastas e Categorias

Esta biblioteca está dividida nas seguintes categorias estratégicas:

| Categoria | Descrição | Qtd Componentes |
| --- | --- | --- |
| [📁 \`chat-ai/\`](./chat-ai/) | Interfaces conversacionais com IA, barras de prompt, cadeias de raciocínio, waveforms e visualizadores de código. | ${CATEGORY_MAP['chat-ai'].components.length} |
| [📁 \`navigation/\`](./navigation/) | Docks flutuantes estilo macOS, menus em cartões expansíveis, pílulas de navegação e kinetic menus. | ${CATEGORY_MAP['navigation'].components.length} |
| [📁 \`cards/\`](./cards/) | Magic Bento com partículas e bordas de neon, spotlight com cursor, cartões 3D inclináveis e reflexivos. | ${CATEGORY_MAP['cards'].components.length} |
| [📁 \`dashboards-billing/\`](./dashboards-billing/) | Sliders de planos e tiers, contadores animados de KPIs, medidores líquidos de consumo e steppers de checkout. | ${CATEGORY_MAP['dashboards-billing'].components.length} |
| [📁 \`microinteractions/\`](./microinteractions/) | Controles táteis elásticos, botões de confirmação segura (hold/slide), chaves elásticas e loaders modernos. | ${CATEGORY_MAP['microinteractions'].components.length} |
| [📁 \`icons-microvisuals/\`](./icons-microvisuals/) | Ícones 3D em vidro fosco interativos, indicadores de status com ping e botões com iluminação especular. | ${CATEGORY_MAP['icons-microvisuals'].components.length} |
| [📁 \`tools-visual-effects/\`](./tools-visual-effects/) | Crachá com física 3D real (Lanyard WebGL/Rapier), visualizador GLTF, vidro líquido e shaders de cromo metálico. | ${CATEGORY_MAP['tools-visual-effects'].components.length} |

---

## 📋 Catálogo Completo dos Componentes Extraídos

`;

  for (const [catKey, catVal] of Object.entries(CATEGORY_MAP)) {
    masterIndex += `### 📂 ${catVal.title} (\`${catKey}/\`)\n\n`;
    masterIndex += `${catVal.description}\n\n`;
    masterIndex += `| Componente | Variantes Disponíveis | Demo | Documentação |\n`;
    masterIndex += `| --- | --- | --- | --- |\n`;

    catVal.components.forEach(c => {
      const compDir = path.join(OUTPUT_DIR, catKey, c.name);
      const hasTsx = fs.existsSync(path.join(compDir, `${c.name}.tsx`));
      const hasJsx = fs.existsSync(path.join(compDir, `${c.name}.jsx`));
      const hasCss = fs.existsSync(path.join(compDir, `${c.name}.css`));
      const hasDemo = fs.existsSync(path.join(compDir, `${c.name}Demo.jsx`));

      const variants = [
        hasTsx ? '`TSX (Tailwind)`' : '',
        hasJsx ? '`JSX (Tailwind)`' : '',
        hasCss ? '`CSS`' : ''
      ].filter(Boolean).join(' • ');

      masterIndex += `| **[${c.name}](./${catKey}/${c.name}/)** | ${variants} | ${hasDemo ? `[\`${c.name}Demo.jsx\`](./${catKey}/${c.name}/${c.name}Demo.jsx)` : '—'} | [README.md](./${catKey}/${c.name}/README.md) |\n`;
    });

    masterIndex += `\n`;
  }

  masterIndex += `---

## 🛠️ Instalação Rápida no seu Projeto

Para utilizar qualquer um dos componentes em seu projeto React ou Next.js:

1. **Instale as dependências peer principais**:
\`\`\`bash
npm install framer-motion lucide-react clsx tailwind-merge gsap
\`\`\`

2. **Para componentes com 3D ou WebGL (como \`Lanyard\` ou \`ModelViewer\`)**:
\`\`\`bash
npm install three @react-three/fiber @react-three/drei @react-three/rapier ogl
\`\`\`

3. **Copie a pasta do componente desejado** (ex: \`reactbitspremium/chat-ai/PromptBar\`) para o seu diretório de componentes (ex: \`src/components/PromptBar\`).

4. **Importe e use**:
\`\`\`tsx
import PromptBar from '@/components/PromptBar/PromptBar';

export default function ChatView() {
  return (
    <div className="w-full max-w-3xl mx-auto py-12">
      <PromptBar onSend={(msg) => console.log(msg)} />
    </div>
  );
}
\`\`\`
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'INDEX.md'), masterIndex, 'utf8');
  console.log(`📑 Master Index gerado em: ${path.join(OUTPUT_DIR, 'INDEX.md')}`);
}

run().catch(err => {
  console.error('\n❌ Erro na extração:', err);
  process.exit(1);
});
