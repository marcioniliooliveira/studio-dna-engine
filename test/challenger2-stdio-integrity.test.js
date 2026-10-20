const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

test('CHALLENGER-2 STDIO Integrity Suite: Malformed Payloads, Pure Channel Separation & Fault Tolerance', async (t) => {
  const serverScript = path.resolve(__dirname, '../src/mcp-server.js');
  assert.ok(fs.existsSync(serverScript), 'src/mcp-server.js must exist');

  const child = spawn(process.execPath, [serverScript], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let stdoutBuffer = '';
  let stderrBuffer = '';
  const stdoutLines = [];

  child.stdout.on('data', chunk => {
    stdoutBuffer += chunk.toString();
    // Split complete newline-delimited lines
    let newlineIdx;
    while ((newlineIdx = stdoutBuffer.indexOf('\n')) !== -1) {
      const line = stdoutBuffer.slice(0, newlineIdx).trim();
      stdoutBuffer = stdoutBuffer.slice(newlineIdx + 1);
      if (line.length > 0) {
        stdoutLines.push(line);
      }
    }
  });

  child.stderr.on('data', chunk => {
    stderrBuffer += chunk.toString();
  });

  // Helper to await a stdout JSON-RPC response by ID
  const waitForResponse = async (id, timeoutMs = 4000) => {
    const startTime = Date.now();
    while (Date.now() - startTime < timeoutMs) {
      for (const line of stdoutLines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed && parsed.id === id) {
            return parsed;
          }
        } catch (_) {}
      }
      await new Promise(r => setTimeout(r, 50));
    }
    throw new Error(`Timed out waiting for response id: ${id}. Current stdout: ${JSON.stringify(stdoutLines)}`);
  };

  // Wait for server readiness on stderr
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Server boot timed out')), 5000);
    const check = () => {
      if (stderrBuffer.includes('MCP Server rodando via STDIO')) {
        clearTimeout(timeout);
        resolve();
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  });

  await t.test('Sub-test 1: Protocol handshake over STDIO', async () => {
    const initPayload = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'challenger-tester', version: '2.0.0' }
      }
    }) + '\n';

    child.stdin.write(initPayload);

    const initRes = await waitForResponse(1);
    assert.equal(initRes.jsonrpc, '2.0');
    assert.equal(initRes.id, 1);
    assert.ok(initRes.result, 'initialize response must include result');
    assert.equal(initRes.result.serverInfo.name, 'studio-dna-engine');
    assert.equal(initRes.result.serverInfo.version, '2.0.0');

    // Send initialized notification
    child.stdin.write(JSON.stringify({
      jsonrpc: '2.0',
      method: 'notifications/initialized'
    }) + '\n');
  });

  await t.test('Sub-test 2: Non-existent method returns valid JSON-RPC error', async () => {
    const badMethodPayload = JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'totally_unsupported_non_existent_method_xyz',
      params: {}
    }) + '\n';

    child.stdin.write(badMethodPayload);

    const errorRes = await waitForResponse(2);
    assert.equal(errorRes.jsonrpc, '2.0');
    assert.equal(errorRes.id, 2);
    assert.ok(errorRes.error, 'Must contain error object');
    assert.equal(errorRes.error.code, -32601, 'Must return -32601 MethodNotFound');
    assert.equal(errorRes.error.message, 'Method not found');
  });

  await t.test('Sub-test 3: Malformed JSON payloads do not crash the server', async () => {
    // Truncated JSON
    child.stdin.write('{"jsonrpc": "2.0", "id": 99, "method": broken_syntax\n');
    // Raw plain text garbage
    child.stdin.write('CORRUPT_PAYLOAD_GARBAGE_LINE_!@#$%^&*()\n');
    // Control characters / incomplete brackets
    child.stdin.write('{{{[[[(((\n');

    await new Promise(r => setTimeout(r, 400));

    // Assert process has not crashed
    assert.equal(child.exitCode, null, 'Process must survive malformed JSON payloads');
  });

  await t.test('Sub-test 4: Schema violations (missing jsonrpc version) do not crash server', async () => {
    // Missing jsonrpc field
    child.stdin.write(JSON.stringify({ id: 100, method: 'ping' }) + '\n');
    // Non-string method
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 101, method: 12345 }) + '\n');
    // Array payload
    child.stdin.write(JSON.stringify([1, 2, 3]) + '\n');

    await new Promise(r => setTimeout(r, 400));

    // Assert process has not crashed
    assert.equal(child.exitCode, null, 'Process must survive schema violations');
  });

  await t.test('Sub-test 5: Post-attack recovery and liveness verification', async () => {
    // Issue legitimate tools/list request after all attacks
    const toolsPayload = JSON.stringify({
      jsonrpc: '2.0',
      id: 5,
      method: 'tools/list',
      params: {}
    }) + '\n';

    child.stdin.write(toolsPayload);

    const toolsRes = await waitForResponse(5);
    assert.equal(toolsRes.jsonrpc, '2.0');
    assert.equal(toolsRes.id, 5);
    assert.ok(toolsRes.result && Array.isArray(toolsRes.result.tools));
    assert.equal(toolsRes.result.tools.length, 12, 'Must successfully return all 12 tools after adversarial attacks');
  });

  await t.test('Sub-test 6: Pure channel separation (stdout = pure JSON-RPC, stderr = logging)', async () => {
    // Verify every line on stdout is pure, unpolluted JSON-RPC
    assert.ok(stdoutLines.length >= 3, 'Must have received stdout JSON-RPC lines');

    for (let i = 0; i < stdoutLines.length; i++) {
      const line = stdoutLines[i];
      let parsed;
      try {
        parsed = JSON.parse(line);
      } catch (err) {
        assert.fail(`Stdout line ${i} is not valid JSON: "${line}"`);
      }
      assert.equal(parsed.jsonrpc, '2.0', `Stdout line ${i} must have jsonrpc: "2.0"`);
      assert.ok(parsed.id !== undefined || parsed.method !== undefined, `Stdout line ${i} must be valid JSON-RPC message`);
    }

    // Verify stderr contains logging banner and no leaked JSON-RPC responses
    assert.ok(stderrBuffer.includes('🚀 [Studio DNA Engine] MCP Server rodando via STDIO...'), 'Stderr must contain startup banner');
    assert.ok(!stderrBuffer.includes('"jsonrpc":"2.0"'), 'Stderr must never contain JSON-RPC responses');
  });

  await t.test('Sub-test 7: Clean shutdown', async () => {
    child.kill('SIGTERM');

    const exitCode = await new Promise(resolve => {
      child.on('exit', (code, signal) => resolve({ code, signal }));
    });

    assert.ok(
      exitCode.code === 0 || exitCode.code === null || child.killed,
      `Server child process should terminate cleanly (exitCode: ${JSON.stringify(exitCode)})`
    );
  });
});
