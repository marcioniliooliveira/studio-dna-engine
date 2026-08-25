#!/usr/bin/env node

const readline = require('readline');
const path = require('path');
const { runPipeline, startPreviewServer } = require('../index');
const packageJson = require('../package.json');

const args = process.argv.slice(2);

function printBanner() {
  console.log(`
\x1b[36m┌────────────────────────────────────────────────────────────┐
│                  🌐 SITE-CLONER & DNA PIPELINE              │
│       Deep Scraper, UI/UX Extractor & Design System AI     │
│                      v${packageJson.version || '1.0.0'}                               │
└────────────────────────────────────────────────────────────┘\x1b[0m
`);
}

function printHelp() {
  printBanner();
  console.log(`\x1b[1mUso:\x1b[0m
  npx site-cloner <url> [opções]
  node bin/cli.js <url> [opções]
  node bin/cli.js --preview [opções]

\x1b[1mOpções Principais:\x1b[0m
  --mode <modo>       Modo: 'all' (padrão), 'clone', 'dna', 'ui'
  --out <pasta>       Diretório customizado de saída (padrão: ./copias)
  --preview, -p       Inicia servidor local de visualização dos sites clonados
  --port <porta>      Porta do servidor de preview (padrão: 4000)

\x1b[1mOpções de Depuração & Navegador:\x1b[0m
  --headed            Executa exibindo a janela do navegador (visual)
  --timeout <ms>      Tempo limite em milissegundos (padrão: 45000)
  --proxy <url>       Servidor proxy HTTP/SOCKS
  --help, -h          Mostra este menu de ajuda
  --version, -v       Mostra a versão instalada

\x1b[1mExemplos:\x1b[0m
  npx site-cloner https://exemplo.com
  npx site-cloner https://exemplo.com --headed
  npx site-cloner https://exemplo.com --mode ui
  npx site-cloner --preview
`);
}

async function promptInteractive() {
  printBanner();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise(resolve => rl.question(query, resolve));

  try {
    console.log('\x1b[33mO que deseja fazer?\x1b[0m');
    console.log('  1) Clonar e Extrair Design DNA de um site');
    console.log('  2) Abrir Dashboard de Preview Local (ver sites já clonados)');
    
    const initialChoice = (await question('\x1b[33m? Escolha [1-2] (padrão: 1):\x1b[0m ')).trim() || '1';

    if (initialChoice === '2') {
      rl.close();
      startPreviewServer();
      return;
    }

    let url = await question('\n\x1b[33m? Digite a URL do site:\x1b[0m ');
    url = url.trim();

    if (!url) {
      console.log('\x1b[31m❌ URL inválida. Abortando.\x1b[0m');
      rl.close();
      process.exit(1);
    }

    console.log('\n\x1b[33mEscolha o Modo:\x1b[0m');
    console.log('  1) Completo (Clone de Assets + Design DNA + UI/UX Snippets + Master Spec IA)');
    console.log('  2) Apenas Design System & Tokens (DNA + Styleguide HTML)');
    console.log('  3) Apenas Particularidades UI/UX (GSAP, Micro-interações, Shaders)');
    
    const modeChoice = (await question('\x1b[33m? Opção [1-3] (padrão: 1):\x1b[0m ')).trim() || '1';

    let mode = 'all';
    if (modeChoice === '2') mode = 'dna';
    if (modeChoice === '3') mode = 'ui';

    const visualChoice = (await question('\x1b[33m? Abrir navegador visível durante extração? (s/N):\x1b[0m ')).trim().toLowerCase();
    const headless = visualChoice !== 's' && visualChoice !== 'sim' && visualChoice !== 'y';

    rl.close();

    await runPipeline({ url, mode, headless });
  } catch (err) {
    rl.close();
    console.error('\x1b[31m❌ Erro durante execução interativa:\x1b[0m', err.message);
  }
}

async function main() {
  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(`v${packageJson.version}`);
    process.exit(0);
  }

  // Modo Servidor Preview
  if (args.includes('--preview') || args.includes('-p')) {
    printBanner();
    let port = 4000;
    const portIndex = args.indexOf('--port');
    if (portIndex !== -1 && args[portIndex + 1]) {
      port = parseInt(args[portIndex + 1], 10) || 4000;
    }
    startPreviewServer({ port });
    return;
  }

  const rawUrl = args.find(a => !a.startsWith('--'));

  if (!rawUrl) {
    await promptInteractive();
  } else {
    printBanner();
    let mode = 'all';
    const modeIndex = args.indexOf('--mode');
    if (modeIndex !== -1 && args[modeIndex + 1]) {
      mode = args[modeIndex + 1];
    }

    let outDir = null;
    const outIndex = args.indexOf('--out');
    if (outIndex !== -1 && args[outIndex + 1]) {
      outDir = path.resolve(process.cwd(), args[outIndex + 1]);
    }

    const headless = !args.includes('--headed');

    let timeout = null;
    const timeoutIndex = args.indexOf('--timeout');
    if (timeoutIndex !== -1 && args[timeoutIndex + 1]) {
      timeout = parseInt(args[timeoutIndex + 1], 10);
    }

    let proxy = null;
    const proxyIndex = args.indexOf('--proxy');
    if (proxyIndex !== -1 && args[proxyIndex + 1]) {
      proxy = { server: args[proxyIndex + 1] };
    }

    await runPipeline({
      url: rawUrl,
      mode,
      outputDir: outDir || undefined,
      headless,
      timeout: timeout || undefined,
      proxy: proxy || undefined
    });
  }
}

main();
