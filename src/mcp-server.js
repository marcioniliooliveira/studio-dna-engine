const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  createStudioDnaMcpServer,
  validateSlugSecurity,
  getSafeClientDir,
  getSafeRefDir,
  getSafeVaultDir
} = require('./mcp/index');

/**
 * Canonical STDIO runner for the Studio DNA Engine MCP Server.
 * All JSON-RPC communication is over stdout/stdin; logs must go to stderr only.
 */
async function main() {
  const server = createStudioDnaMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write('🚀 [Studio DNA Engine] MCP Server rodando via STDIO...\n');
  return { server, transport };
}

if (require.main === module) {
  main().catch(err => {
    process.stderr.write((err && (err.stack || err.message || String(err))) + '\n');
    process.exit(1);
  });
}

module.exports = {
  createStudioDnaMcpServer,
  main,
  validateSlugSecurity,
  getSafeClientDir,
  getSafeRefDir,
  getSafeVaultDir
};
