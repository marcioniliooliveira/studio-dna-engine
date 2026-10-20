#!/usr/bin/env node
const crypto = require('crypto');
const { createSecureHttpServer } = require('./mcp/transports/http-server');

async function main() {
  const port = process.env.MCP_PORT ? parseInt(process.env.MCP_PORT, 10) : 3001;
  const token = process.env.STUDIO_DNA_MCP_TOKEN || crypto.randomBytes(24).toString('hex');

  const { server, port: actualPort } = await createSecureHttpServer({
    port,
    authToken: token
  });

  console.log(`
\x1b[36m┌────────────────────────────────────────────────────────────┐
│         🌐 STUDIO DNA ENGINE — SECURE MCP HTTP SERVER      │
│      Streamable SSE / HTTP Transport for Remote AI Cloud   │
└────────────────────────────────────────────────────────────┘\x1b[0m

\x1b[1mStatus:\x1b[0m      Servidor ativo e protegido
\x1b[1mPorta:\x1b[0m       \x1b[32m${actualPort}\x1b[0m
\x1b[1mEndpoint:\x1b[0m    http://localhost:${actualPort}/sse
\x1b[1mHealth:\x1b[0m      http://localhost:${actualPort}/health

\x1b[33m🔑 SEU BEARER TOKEN DE AUTENTICAÇÃO (Mantenha Secreto):\x1b[0m
\x1b[1m\x1b[32m${token}\x1b[0m

\x1b[1mPassos para Conectar a IA na Nuvem (Gemini / Vertex AI):\x1b[0m
  1. Abra um túnel seguro no seu terminal:
     \x1b[36mngrok http ${actualPort}\x1b[0m
     ou
     \x1b[36mcloudflared tunnel --url http://localhost:${actualPort}\x1b[0m

  2. Configure seu agente na nuvem com a URL gerada:
     URL do SSE: \x1b[32mhttps://<seu-tunel>.ngrok-free.app/sse\x1b[0m
     Header:     \x1b[32mAuthorization: Bearer ${token}\x1b[0m

Pressione Ctrl+C para encerrar o servidor.
`);

  process.on('SIGINT', async () => {
    console.log('\n🛑 Encerrando servidor MCP HTTP...');
    await server.close();
    process.exit(0);
  });
}

if (require.main === module) {
  main().catch(err => {
    console.error('❌ Falha ao iniciar servidor MCP HTTP:', err);
    process.exit(1);
  });
}

module.exports = { main };
