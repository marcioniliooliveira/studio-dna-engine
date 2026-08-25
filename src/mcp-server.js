const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');
const path = require('path');
const fs = require('fs');

const { runPipeline } = require('../index');
const { createClientProject } = require('./generators/client-factory');
const { injectContentSlots } = require('./generators/slot-injector');
const { runBoxDiffLinter } = require('../scripts/box-diff-linter');

// Inicialização do Servidor MCP
const server = new McpServer({
  name: 'studio-dna-engine',
  version: '2.0.0'
});

// Tool 1: Scraping e Extração de DNA de Design de uma URL
server.tool(
  'scrape_and_extract_dna',
  'Executa o Playwright Deep Scraper em um site de referência (Awwwards/Godly), baixando assets, extraindo design tokens e gerando o esqueleto.',
  {
    url: z.string().describe('URL do site de referência a ser dissecado'),
    mode: z.enum(['all', 'clone', 'dna', 'ui']).default('all').describe('Modo de extração')
  },
  async ({ url, mode }) => {
    try {
      await runPipeline({ url, mode, headless: true });
      return {
        content: [{ type: 'text', text: `✅ Extração concluída para: ${url}. O esqueleto e design tokens estão disponíveis em copias/.` }]
      };
    } catch (err) {
      return {
        isError: true,
        content: [{ type: 'text', text: `❌ Falha na extração: ${err.message}` }]
      };
    }
  }
);

// Tool 2: Criar Projeto de Cliente One-Shot (Fábrica ICM)
server.tool(
  'create_client_project',
  'Cria uma pasta de cliente isolada e desacoplada baseada em um esqueleto de referência do Vault.',
  {
    brandName: z.string().describe('Nome da marca do cliente (Ex: Negocia Bem Imobiliária)'),
    refSlug: z.string().default('storeyarchitecture-co-uk').describe('Nome da referência no acervo (Ex: storeyarchitecture-co-uk)'),
    niche: z.string().optional().describe('Nicho do cliente'),
    toneOfVoice: z.string().optional().describe('Tom de voz do design e copy'),
    whatsapp: z.string().optional().describe('Número de WhatsApp para conversão')
  },
  async ({ brandName, refSlug, niche, toneOfVoice, whatsapp }) => {
    try {
      const res = createClientProject({
        brandName,
        refSlug,
        brandSpec: { niche, toneOfVoice, whatsapp }
      });
      return {
        content: [{ type: 'text', text: `🎉 Projeto de cliente criado com sucesso!\n- Pasta: ${res.clientDir}\n- Preview disponível em: http://127.0.0.1:4000/clientes/${res.clientSlug}/site/index.html` }]
      };
    } catch (err) {
      return {
        isError: true,
        content: [{ type: 'text', text: `❌ Falha ao criar projeto: ${err.message}` }]
      };
    }
  }
);

// Tool 3: Injetar Slots Mecanicamente (Custo 0 Tokens)
server.tool(
  'inject_content_slots',
  'Mescla o esqueleto estrutural com o JSON de copy do cliente deterministicamente, sem quebrar o código.',
  {
    skeletonPath: z.string().describe('Caminho do arquivo skeleton.html'),
    contentSlotsPath: z.string().describe('Caminho do arquivo content-slots.json'),
    outputPath: z.string().describe('Caminho de destino do index.html gerado')
  },
  async ({ skeletonPath, contentSlotsPath, outputPath }) => {
    try {
      const res = injectContentSlots({ skeletonPath, contentSlotsPath, outputPath });
      return {
        content: [{ type: 'text', text: `✅ Injeção concluída com sucesso! ${res.replacedCount} slots substituídos em: ${res.outputPath}` }]
      };
    } catch (err) {
      return {
        isError: true,
        content: [{ type: 'text', text: `❌ Falha na injeção de slots: ${err.message}` }]
      };
    }
  }
);

// Tool 4: Quality Gate & Linter Playwright
server.tool(
  'run_quality_gate_audit',
  'Executa o linter Playwright headless para auditar se o site possui 0 erros JS e 100% de imagens válidas.',
  {
    siteSlug: z.string().describe('Nome da pasta do site (ex: negociabem-imobiliaria ou clientes/negocia-bem-imobiliaria)')
  },
  async ({ siteSlug }) => {
    try {
      const res = await runBoxDiffLinter(siteSlug);
      return {
        content: [{ type: 'text', text: JSON.stringify(res, null, 2) }]
      };
    } catch (err) {
      return {
        isError: true,
        content: [{ type: 'text', text: `❌ Erro na auditoria: ${err.message}` }]
      };
    }
  }
);

// Resource 1: Matriz de Curvas de Easing (vault://easings)
server.resource(
  'vault-easings',
  'vault://easings',
  async () => {
    const filePath = path.resolve(__dirname, '../design-vault/01-motion-physics/easings.json');
    const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '{}';
    return {
      contents: [{
        uri: 'vault://easings',
        mimeType: 'application/json',
        text: content
      }]
    };
  }
);

// Resource 2: Pares Tipográficos Awwwards (vault://typography)
server.resource(
  'vault-typography',
  'vault://typography',
  async () => {
    const filePath = path.resolve(__dirname, '../design-vault/04-typography/curated-pairings.json');
    const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '{}';
    return {
      contents: [{
        uri: 'vault://typography',
        mimeType: 'application/json',
        text: content
      }]
    };
  }
);

// Iniciar Conexão via Stdio
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('🚀 [Studio DNA Engine] MCP Server rodando via STDIO...');
}

run().catch(console.error);
