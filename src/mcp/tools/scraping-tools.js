const fs = require('fs');
const path = require('path');
const { runPipeline } = require('../../../index');
const {
  ScrapeAndExtractSchema,
  InspectReferenceSchema,
  getSafeRefDir,
  validateScrapeUrlSecurity
} = require('../schemas');

function registerScrapingTools(server) {
  // Tool 1: Scraping e Extração de DNA de Design de uma URL
  server.tool(
    'scrape_and_extract_dna',
    'Executa o Playwright Deep Scraper em um site de referência (Awwwards/Godly), baixando assets, extraindo design tokens e gerando o esqueleto.',
    ScrapeAndExtractSchema,
    async ({ url, mode }) => {
      try {
        validateScrapeUrlSecurity(url);
        const result = await runPipeline({ url, mode, headless: true });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              url,
              masterFolder: result?.masterFolder || null,
              evidenceStatus: result?.statusPath || null,
              message: `✅ Extração concluída com sucesso para: ${url}. O esqueleto e design tokens estão disponíveis no acervo.`
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `❌ Falha na extração de scraping: ${err.message}` }]
        };
      }
    }
  );

  // Tool 2: Inspecionar Referência Bruta no Acervo
  server.tool(
    'inspect_reference',
    'Inspeciona a estrutura de uma referência no acervo copias/, retornando estatísticas de assets, páginas e design tokens sem carregar HTMLs pesados.',
    InspectReferenceSchema,
    async ({ refSlug }) => {
      try {
        const refDir = getSafeRefDir(refSlug);
        if (!fs.existsSync(refDir)) {
          return {
            isError: true,
            content: [{ type: 'text', text: `❌ Referência não encontrada no acervo: ${refSlug}` }]
          };
        }

        const siteDir = path.join(refDir, 'site');
        const assetsDir = path.join(siteDir, 'assets');
        const hasIndexHtml = fs.existsSync(path.join(siteDir, 'index.html'));
        const indexHtmlSize = hasIndexHtml ? fs.statSync(path.join(siteDir, 'index.html')).size : 0;

        let assetFilesCount = 0;
        if (fs.existsSync(assetsDir)) {
          assetFilesCount = fs.readdirSync(assetsDir).length;
        }

        const dnaCandidates = ['design-tokens.json', 'dna.json', 'status.json'];
        const existingMetaFiles = dnaCandidates.filter(f => fs.existsSync(path.join(refDir, f)));

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              refSlug,
              refDir,
              hasIndexHtml,
              indexHtmlSizeBytes: indexHtmlSize,
              assetsCount: assetFilesCount,
              metadataFiles: existingMetaFiles
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `❌ Erro ao inspecionar referência: ${err.message}` }]
        };
      }
    }
  );
}

module.exports = { registerScrapingTools };
