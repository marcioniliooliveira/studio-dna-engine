#!/usr/bin/env node

const readline = require('readline');
const path = require('path');
const { runPipeline, startPreviewServer } = require('../index');
const { resolveWorkspacePaths, ensureWorkspaceStructure } = require('../src/config/workspace');
const packageJson = require('../package.json');

function parseCliArgs(argv = process.argv.slice(2)) {
  const result = {
    rawUrl: null,
    mode: 'all',
    outDir: null,
    workspaceDir: null,
    initWorkspace: false,
    preview: false,
    port: 4000,
    headless: true,
    timeout: null,
    proxy: null,
    help: false,
    version: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      result.help = true;
    } else if (arg === '--version' || arg === '-v') {
      result.version = true;
    } else if (arg === '--preview' || arg === '-p') {
      result.preview = true;
    } else if (arg === '--headed') {
      result.headless = false;
    } else if (arg === '--init-workspace') {
      result.initWorkspace = true;
      const next = argv[i + 1];
      if (next && !next.startsWith('-')) {
        result.workspaceDir = path.resolve(process.cwd(), next);
        i++;
      }
    } else if ((arg === '--workspace' || arg === '-w') && argv[i + 1]) {
      result.workspaceDir = path.resolve(process.cwd(), argv[++i]);
    } else if (arg === '--mode' && argv[i + 1]) {
      result.mode = argv[++i];
    } else if (arg === '--out' && argv[i + 1]) {
      result.outDir = path.resolve(process.cwd(), argv[++i]);
    } else if (arg === '--port' && argv[i + 1]) {
      result.port = parseInt(argv[++i], 10) || 4000;
    } else if (arg === '--timeout' && argv[i + 1]) {
      const parsedTimeout = parseInt(argv[++i], 10);
      if (Number.isFinite(parsedTimeout)) result.timeout = parsedTimeout;
    } else if (arg === '--proxy' && argv[i + 1]) {
      result.proxy = { server: argv[++i] };
    } else if (!arg.startsWith('-') && !result.rawUrl) {
      result.rawUrl = arg;
    }
  }

  return result;
}

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
  --workspace, -w <dir>  Workspace externo para copias/, clientes/ e data/ (evita poluir o repo)
  --init-workspace <dir> Inicializa estrutura limpa de workspace externo e encerra
  --mode <modo>          Modo: 'all' (padrão), 'clone', 'dna', 'ui'
  --out <pasta>          Diretório customizado de saída para copias/
  --preview, -p          Inicia servidor local de visualização dos sites clonados
  --port <porta>         Porta do servidor de preview (padrão: 4000)

\x1b[1mOpções de Depuração & Navegador:\x1b[0m
  --headed               Executa exibindo a janela do navegador (visual)
  --timeout <ms>         Tempo limite em milissegundos (padrão: 45000)
  --proxy <url>          Servidor proxy HTTP/SOCKS
  --help, -h             Mostra este menu de ajuda
  --version, -v          Mostra a versão instalada

\x1b[1mExemplos:\x1b[0m
  node bin/cli.js --init-workspace ../studio-dna-projects
  node bin/cli.js https://exemplo.com --workspace ../studio-dna-projects
  node bin/cli.js --preview --workspace ../studio-dna-projects
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

function logWorkspaceBanner(workspacePaths) {
  if (workspacePaths.isExternalWorkspace) {
    console.log(`\x1b[32m📁 Workspace isolado:\x1b[0m ${workspacePaths.workspaceRoot}`);
  } else {
    console.log(`\x1b[33m⚠️ Workspace apontando para o diretório da ferramenta:\x1b[0m ${workspacePaths.workspaceRoot}`);
    console.log('   Dica: use --workspace <dir> ou STUDIO_DNA_WORKSPACE=<dir> para evitar gravar artefatos de clientes neste repositório.');
  }
}

async function main() {
  const parsed = parseCliArgs(process.argv.slice(2));

  if (parsed.help) {
    printHelp();
    process.exit(0);
  }

  if (parsed.version) {
    console.log(`v${packageJson.version}`);
    process.exit(0);
  }

  if (parsed.workspaceDir) {
    process.env.STUDIO_DNA_WORKSPACE = parsed.workspaceDir;
  }

  const workspacePaths = resolveWorkspacePaths({
    workspaceDir: parsed.workspaceDir || undefined
  });

  if (parsed.initWorkspace) {
    printBanner();
    const targetDir = parsed.workspaceDir || path.resolve(process.cwd(), '../studio-dna-projects');
    const created = ensureWorkspaceStructure(targetDir);
    console.log(`\x1b[32m✅ Workspace inicializado em:\x1b[0m ${created.workspaceRoot}`);
    console.log(`   copias/:     ${created.copiasDir}`);
    console.log(`   clientes/:   ${created.clientesDir}`);
    console.log(`   data/:       ${created.dataDir}`);
    console.log(`   qa-reports/: ${created.qaReportsDir}`);
    return;
  }

  // Modo Servidor Preview
  if (parsed.preview) {
    printBanner();
    logWorkspaceBanner(workspacePaths);
    startPreviewServer({
      port: parsed.port,
      workspaceDir: workspacePaths.workspaceRoot
    });
    return;
  }

  if (!parsed.rawUrl) {
    await promptInteractive();
  } else {
    printBanner();
    logWorkspaceBanner(workspacePaths);

    await runPipeline({
      url: parsed.rawUrl,
      mode: parsed.mode,
      workspaceDir: workspacePaths.workspaceRoot,
      outputDir: parsed.outDir || undefined,
      headless: parsed.headless,
      timeout: parsed.timeout || undefined,
      proxy: parsed.proxy || undefined
    });
  }
}

if (require.main === module) {
  main();
}

module.exports = { parseCliArgs, main };
