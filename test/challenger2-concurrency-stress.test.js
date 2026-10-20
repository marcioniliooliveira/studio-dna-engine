const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { InMemoryTransport } = require('@modelcontextprotocol/sdk/inMemory.js');
const { createStudioDnaMcpServer } = require('../src/mcp/index');

/**
 * Creates an immutability snapshot of copias/ including top-level directory stats
 * and deep SHA-256 hashes of references and root files.
 */
function snapshotCopias(dirPath) {
  const snapshot = {
    topLevelStats: {},
    deepHashes: {}
  };

  if (!fs.existsSync(dirPath)) return snapshot;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const e of entries) {
    const fullPath = path.join(dirPath, e.name);
    const st = fs.statSync(fullPath);
    snapshot.topLevelStats[e.name] = {
      isDir: e.isDirectory(),
      size: st.size,
      mtimeMs: st.mtimeMs
    };
  }

  // Deep hash references accessed or relevant, plus top-level files
  const sampleDirs = ['storeyarchitecture-co-uk', 'negociabem-imobiliaria', '21oaks-org'];
  for (const dirName of sampleDirs) {
    const targetDir = path.join(dirPath, dirName);
    if (fs.existsSync(targetDir)) {
      function walk(d) {
        for (const item of fs.readdirSync(d, { withFileTypes: true })) {
          const p = path.join(d, item.name);
          if (item.isDirectory()) {
            walk(p);
          } else {
            const rel = path.relative(dirPath, p).replace(/\\/g, '/');
            snapshot.deepHashes[rel] = crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
          }
        }
      }
      walk(targetDir);
    }
  }

  // Also hash top-level files
  for (const e of entries) {
    if (e.isFile()) {
      const p = path.join(dirPath, e.name);
      snapshot.deepHashes[e.name] = crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
    }
  }

  return snapshot;
}

test('CHALLENGER-2 Concurrency Suite: 5 Concurrent Clients, Pipeline Burst & Immutability Audit', async (t) => {
  const copiasDir = path.resolve(__dirname, '../copias');

  // Baseline: Snapshot copias state before stress operations
  const preSnapshot = snapshotCopias(copiasDir);
  assert.ok(Object.keys(preSnapshot.topLevelStats).length > 0, 'copias/ must contain top-level entries');
  assert.ok(Object.keys(preSnapshot.deepHashes).length > 100, 'copias/ deep hashes must cover reference files');

  await t.test('Sub-test 1: 5 Concurrent Clients with 65 parallel operations', async () => {
    const CLIENT_COUNT = 5;
    const clients = [];
    const servers = [];

    // Initialize 5 independent client-server pairs over InMemoryTransport
    for (let i = 0; i < CLIENT_COUNT; i++) {
      const server = createStudioDnaMcpServer();
      const client = new Client(
        { name: `stress-client-${i}`, version: '1.0.0' },
        { capabilities: {} }
      );
      const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

      await Promise.all([
        client.connect(clientTransport),
        server.connect(serverTransport)
      ]);

      clients.push(client);
      servers.push(server);
    }

    // Define 13 distinct MCP operations per client
    const executeClientBarrage = async (client, clientId) => {
      const operations = [
        client.listTools(),
        client.listResources(),
        client.callTool({ name: 'query_design_vault', arguments: { category: 'all' } }),
        client.callTool({ name: 'query_design_vault', arguments: { category: 'easings' } }),
        client.callTool({ name: 'query_design_vault', arguments: { category: 'typography' } }),
        client.callTool({ name: 'query_design_vault', arguments: { category: 'components' } }),
        client.callTool({ name: 'inspect_reference', arguments: { refSlug: 'storeyarchitecture-co-uk' } }),
        client.readResource({ uri: 'vault://easings' }),
        client.readResource({ uri: 'vault://typography' }),
        client.readResource({ uri: 'vault://components' }),
        client.readResource({ uri: 'client://negocia-bem/dna' }),
        client.readResource({ uri: 'client://negocia-bem/slots' }),
        client.readResource({ uri: 'ref://storeyarchitecture-co-uk/dna' })
      ];

      const results = await Promise.all(operations);
      return { clientId, results };
    };

    // Concurrently trigger all 5 clients (5 x 13 = 65 simultaneous requests)
    const allClientPromises = clients.map((c, idx) => executeClientBarrage(c, idx));
    const allResults = await Promise.all(allClientPromises);

    // Assert integrity for every client's results
    for (const { clientId, results } of allResults) {
      assert.equal(results.length, 13, `Client ${clientId} must have 13 results`);

      // 0: listTools
      const toolsRes = results[0];
      assert.ok(Array.isArray(toolsRes.tools), `Client ${clientId}: listTools must return array`);
      assert.equal(toolsRes.tools.length, 12, `Client ${clientId}: exactly 12 tools expected`);

      // 1: listResources
      const resList = results[1];
      assert.ok(Array.isArray(resList.resources), `Client ${clientId}: listResources must return array`);
      assert.ok(resList.resources.length >= 3, `Client ${clientId}: at least 3 static resources expected`);

      // 2: query_design_vault (all)
      const vaultAll = results[2];
      assert.ok(!vaultAll.isError, `Client ${clientId}: query_design_vault (all) must not error`);
      const allData = JSON.parse(vaultAll.content[0].text);
      assert.equal(allData.category, 'all');

      // 3: query_design_vault (easings)
      const vaultEasings = results[3];
      assert.ok(!vaultEasings.isError, `Client ${clientId}: query_design_vault (easings) must not error`);
      const easingsData = JSON.parse(vaultEasings.content[0].text);
      assert.equal(easingsData.category, 'easings');

      // 6: inspect_reference
      const inspectRef = results[6];
      assert.ok(!inspectRef.isError, `Client ${clientId}: inspect_reference must not error`);
      const inspectData = JSON.parse(inspectRef.content[0].text);
      assert.equal(inspectData.refSlug, 'storeyarchitecture-co-uk');

      // 7: vault://easings resource
      const readEasings = results[7];
      assert.ok(readEasings.contents && readEasings.contents[0].text.length > 0);

      // 10: client://negocia-bem/dna resource
      const readDna = results[10];
      assert.ok(readDna.contents && readDna.contents[0].text.toLowerCase().includes('negocia bem'));

      // 12: ref://storeyarchitecture-co-uk/dna resource
      const readRefDna = results[12];
      assert.ok(readRefDna.contents && readRefDna.contents[0].text.length > 0);
    }

    // Cleanly close all clients
    for (const client of clients) {
      await client.close();
    }
  });

  await t.test('Sub-test 2: Single-connection high-frequency concurrent pipeline (50 requests in parallel)', async () => {
    const server = createStudioDnaMcpServer();
    const client = new Client(
      { name: 'burst-client', version: '1.0.0' },
      { capabilities: {} }
    );
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    await Promise.all([
      client.connect(clientTransport),
      server.connect(serverTransport)
    ]);

    const BATCH_SIZE = 50;
    const promises = [];
    for (let i = 0; i < BATCH_SIZE; i++) {
      if (i % 3 === 0) {
        promises.push(client.listTools());
      } else if (i % 3 === 1) {
        promises.push(client.callTool({
          name: 'query_design_vault',
          arguments: { category: 'typography' }
        }));
      } else {
        promises.push(client.readResource({ uri: 'vault://typography' }));
      }
    }

    const burstResults = await Promise.all(promises);
    assert.equal(burstResults.length, BATCH_SIZE, `All ${BATCH_SIZE} pipelined requests must resolve`);

    for (let i = 0; i < BATCH_SIZE; i++) {
      const res = burstResults[i];
      if (i % 3 === 0) {
        assert.equal(res.tools.length, 12);
      } else if (i % 3 === 1) {
        assert.ok(!res.isError);
      } else {
        assert.equal(res.contents[0].uri, 'vault://typography');
      }
    }

    await client.close();
  });

  await t.test('Sub-test 3: Transport Collision & Isolation Safety', async () => {
    const server = createStudioDnaMcpServer();
    const [c1, s1] = InMemoryTransport.createLinkedPair();
    const [, s2] = InMemoryTransport.createLinkedPair();

    const client1 = new Client({ name: 'c1', version: '1.0.0' }, { capabilities: {} });
    await Promise.all([
      client1.connect(c1),
      server.connect(s1)
    ]);

    // Attempting to connect a second transport to an active server must reject safely
    await assert.rejects(
      async () => {
        await server.connect(s2);
      },
      /Already connected to a transport/
    );

    // Verify client1 is still completely functional and unharmed
    const tools = await client1.listTools();
    assert.equal(tools.tools.length, 12);

    await client1.close();
  });

  await t.test('Sub-test 4: Immutability Verification of copias/ Directory', async () => {
    // Snapshot copias state post-stress
    const postSnapshot = snapshotCopias(copiasDir);

    // 1. Verify top level entries match exactly
    assert.equal(
      Object.keys(postSnapshot.topLevelStats).length,
      Object.keys(preSnapshot.topLevelStats).length,
      'Top-level entry count in copias/ must remain identical'
    );

    for (const [name, preStat] of Object.entries(preSnapshot.topLevelStats)) {
      const postStat = postSnapshot.topLevelStats[name];
      assert.ok(postStat, `Entry ${name} must still exist in copias/`);
      assert.equal(postStat.isDir, preStat.isDir, `Entry ${name} directory flag altered`);
      assert.equal(postStat.size, preStat.size, `Entry ${name} size altered`);
    }

    // 2. Verify deep file hashes match 100% bitwise
    assert.equal(
      Object.keys(postSnapshot.deepHashes).length,
      Object.keys(preSnapshot.deepHashes).length,
      'Deep hashed file count must remain identical'
    );

    for (const [relPath, preHash] of Object.entries(preSnapshot.deepHashes)) {
      const postHash = postSnapshot.deepHashes[relPath];
      assert.ok(postHash !== undefined, `File ${relPath} must still exist in copias/`);
      assert.equal(
        postHash,
        preHash,
        `File ${relPath} in copias/ was mutated during stress! Pre: ${preHash}, Post: ${postHash}`
      );
    }
  });
});
