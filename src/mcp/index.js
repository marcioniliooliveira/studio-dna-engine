const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { registerScrapingTools } = require('./tools/scraping-tools');
const { registerClientTools } = require('./tools/client-tools');
const { registerQaTools } = require('./tools/qa-tools');
const { registerVaultTools } = require('./tools/vault-tools');
const { registerResources } = require('./resources/index');
const { registerPrompts } = require('./prompts/index');
const {
  validateSlugSecurity,
  getSafeClientDir,
  getSafeRefDir,
  getSafeVaultDir
} = require('./schemas');

/**
 * Creates and initializes the Studio DNA Engine MCP Server with all
 * tools (scraping, client iteration, qa, vault), resources, and prompts.
 *
 * @returns {McpServer}
 */
function createStudioDnaMcpServer() {
  const server = new McpServer({
    name: 'studio-dna-engine',
    version: '2.0.0'
  });

  registerScrapingTools(server);
  registerClientTools(server);
  registerQaTools(server);
  registerVaultTools(server);
  registerResources(server);
  registerPrompts(server);

  return server;
}

module.exports = {
  createStudioDnaMcpServer,
  validateSlugSecurity,
  getSafeClientDir,
  getSafeRefDir,
  getSafeVaultDir
};
