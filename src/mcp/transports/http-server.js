const http = require('http');
const { URL } = require('url');
const crypto = require('crypto');
const { SSEServerTransport } = require('@modelcontextprotocol/sdk/server/sse.js');
const { createStudioDnaMcpServer } = require('../index');
const { validateScrapeUrlSecurity } = require('../schemas');

function safeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Extracts and verifies Bearer token from headers or query parameters.
 */
function verifyAuth(req, expectedToken) {
  if (!expectedToken) return true;

  // 1. Check Authorization: Bearer <token> header
  const authHeader = req.headers['authorization'] || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (safeCompare(token, expectedToken)) {
      return true;
    }
  }

  // 2. Check query parameter ?token=<token> (for EventSource clients that cannot set headers)
  const url = new URL(req.url, 'http://localhost');
  const queryToken = url.searchParams.get('token') || '';
  if (queryToken && safeCompare(queryToken, expectedToken)) {
    return true;
  }

  return false;
}

/**
 * Creates and starts a secure HTTP/SSE MCP Server.
 */
async function createSecureHttpServer(options = {}) {
  const port = options.port !== undefined ? options.port : (process.env.MCP_PORT ? parseInt(process.env.MCP_PORT, 10) : 3001);
  const authToken = options.authToken || process.env.STUDIO_DNA_MCP_TOKEN || null;
  const server = options.mcpServer || createStudioDnaMcpServer();

  const transports = new Map();

  const httpServer = http.createServer(async (req, res) => {
    // Standard CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const reqUrl = new URL(req.url, 'http://localhost');
    const pathname = reqUrl.pathname;

    // Public Health Check Endpoint
    if (pathname === '/health' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'ok',
        uptimeSeconds: Math.floor(process.uptime()),
        toolsCount: Object.keys(server._registeredTools || {}).length,
        requiresAuth: Boolean(authToken)
      }));
      return;
    }

    // Require Bearer authentication for all MCP endpoints
    if (authToken && !verifyAuth(req, authToken)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Unauthorized',
        message: 'Valid Bearer token is required in Authorization header or ?token query param'
      }));
      return;
    }

    // SSE Endpoint (Establish client stream)
    if (pathname === '/sse' && req.method === 'GET') {
      try {
        const transport = new SSEServerTransport('/messages', res);
        transports.set(transport.sessionId, transport);

        transport.onclose = () => {
          transports.delete(transport.sessionId);
        };

        await server.connect(transport);
        return;
      } catch (err) {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'SSE Transport initialization failed', details: err.message }));
        }
        return;
      }
    }

    // Post Messages Endpoint (Receive JSON-RPC messages from client)
    if (pathname === '/messages' && req.method === 'POST') {
      const sessionId = reqUrl.searchParams.get('sessionId');
      const transport = transports.get(sessionId);

      if (!transport) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Session not found or expired', sessionId }));
        return;
      }

      try {
        await transport.handlePostMessage(req, res);
      } catch (err) {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Message processing error', details: err.message }));
        }
      }
      return;
    }

    // Catch-all 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found', path: pathname }));
  });

  return new Promise((resolve) => {
    httpServer.listen(port, '0.0.0.0', () => {
      const actualPort = httpServer.address().port;
      resolve({
        server: httpServer,
        port: actualPort,
        authToken,
        close: () => new Promise(r => {
          if (typeof httpServer.closeAllConnections === 'function') {
            httpServer.closeAllConnections();
          }
          httpServer.close(r);
        })
      });
    });
  });
}

module.exports = {
  validateScrapeUrlSecurity,
  createSecureHttpServer
};
