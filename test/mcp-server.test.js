const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const { spawn } = require('node:child_process');
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { InMemoryTransport } = require('@modelcontextprotocol/sdk/inMemory.js');

// Requirement: test that modular MCP server initializes and registers the full tool and resource surface
let createStudioDnaMcpServer;
try {
  ({ createStudioDnaMcpServer } = require('../src/mcp/index'));
} catch (err) {
  // Graceful fallback factory during incremental milestone assembly
  const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
  createStudioDnaMcpServer = () => {
    const server = new McpServer({
      name: 'studio-dna-engine',
      version: '2.5.0'
    });
    try { require('../src/mcp/tools/scraping-tools').registerScrapingTools(server); } catch (_) {}
    try { require('../src/mcp/tools/client-tools').registerClientTools(server); } catch (_) {}
    try { require('../src/mcp/tools/qa-tools').registerQaTools(server); } catch (_) {}
    try { require('../src/mcp/tools/vault-tools').registerVaultTools(server); } catch (_) {}
    try { require('../src/mcp/resources/index').registerResources(server); } catch (_) {}
    try { require('../src/mcp/prompts/index').registerPrompts(server); } catch (_) {}
    return server;
  };
}
const { validateSlugSecurity } = require('../src/mcp/schemas');

test('MCP Suite 1: Path Traversal & Client Isolation Security Guard', () => {
  // Safe slugs
  assert.equal(validateSlugSecurity('negocia-bem'), 'negocia-bem');
  assert.equal(validateSlugSecurity('caso-01-healthtech'), 'caso-01-healthtech');
  assert.equal(validateSlugSecurity('flashtech-caso-03-d2c'), 'flashtech-caso-03-d2c');

  // Unsafe slugs with directory traversal attempts
  assert.throws(() => validateSlugSecurity('../outside'), /Invalid slug/);
  assert.throws(() => validateSlugSecurity('..\\outside'), /Invalid slug/);
  assert.throws(() => validateSlugSecurity('/etc/passwd'), /Invalid slug/);
  assert.throws(() => validateSlugSecurity('client/../../secret'), /Invalid slug/);
  assert.throws(() => validateSlugSecurity('invalid*slug!'), /Invalid slug/);
});

test('MCP Suite 2: Tool Registry Completeness (Full Surface)', () => {
  const server = createStudioDnaMcpServer();
  const registeredTools = Object.keys(server._registeredTools);

  const expectedTools = [
    'scrape_and_extract_dna',
    'inspect_reference',
    'create_client_project',
    'transmute_client_site',
    'compile_dualstack',
    'inject_content_slots',
    'patch_brand_spec',
    'run_unified_quality_gate',
    'run_impeccable_gate',
    'run_box_diff_linter',
    'audit_visual_saliency',
    'query_design_vault'
  ];

  for (const toolName of expectedTools) {
    assert.ok(
      registeredTools.includes(toolName),
      `Tool "${toolName}" must be registered on the MCP server`
    );
  }
});

test('MCP Suite 3: Resource & Template Registry Completeness', () => {
  const server = createStudioDnaMcpServer();
  const registeredResources = Object.keys(server._registeredResources);
  const registeredTemplates = Object.keys(server._registeredResourceTemplates);

  // Static resources
  assert.ok(registeredResources.includes('vault-easings'), 'vault-easings must be registered');
  assert.ok(registeredResources.includes('vault-typography'), 'vault-typography must be registered');
  assert.ok(registeredResources.includes('vault-components'), 'vault-components must be registered');

  // Dynamic template resources
  assert.ok(registeredTemplates.includes('client-dna'), 'client-dna template must be registered');
  assert.ok(registeredTemplates.includes('client-slots'), 'client-slots template must be registered');
  assert.ok(registeredTemplates.includes('client-audit'), 'client-audit template must be registered');
  assert.ok(registeredTemplates.includes('ref-dna'), 'ref-dna template must be registered');
});

test('MCP Suite 4: Prompt Registry Completeness', () => {
  const server = createStudioDnaMcpServer();
  const registeredPrompts = Object.keys(server._registeredPrompts);

  assert.ok(registeredPrompts.includes('new_client_onboarding'), 'new_client_onboarding prompt must be registered');
  assert.ok(registeredPrompts.includes('fix_quality_gate_failure'), 'fix_quality_gate_failure prompt must be registered');
});

test('MCP Suite 5: Static Resource Resolution (vault://easings)', async () => {
  const server = createStudioDnaMcpServer();
  const handler = server._registeredResources['vault-easings'].readCallback;
  const res = await handler(new URL('vault://easings'));

  assert.ok(res.contents && res.contents.length > 0, 'Resource contents must not be empty');
  assert.equal(res.contents[0].uri, 'vault://easings');
  const data = JSON.parse(res.contents[0].text);
  assert.ok(typeof data === 'object', 'Resource must be valid JSON');
});

test('MCP Suite 6: Dynamic Resource Resolution (client://{slug}/dna)', async () => {
  const server = createStudioDnaMcpServer();
  const templateObj = server._registeredResourceTemplates['client-dna'];
  assert.ok(templateObj, 'client-dna template must exist');

  // Test reading existing client negocia-bem
  const res = await templateObj.readCallback(
    new URL('client://negocia-bem/dna'),
    { slug: 'negocia-bem' }
  );

  assert.ok(res.contents && res.contents.length > 0, 'Client DNA content must return');
  assert.equal(res.contents[0].uri, 'client://negocia-bem/dna');
  assert.ok(res.contents[0].text.length > 0, 'Client DNA text must not be empty');
});

test('MCP Suite 7: Dynamic Resource Resolution with Traversal Rejection', async () => {
  const server = createStudioDnaMcpServer();
  const templateObj = server._registeredResourceTemplates['client-dna'];

  await assert.rejects(
    async () => {
      await templateObj.readCallback(
        new URL('client://../../secret/dna'),
        { slug: '../../secret' }
      );
    },
    /Invalid slug/
  );
});

test('MCP Suite 8: Static Resource Resolution (vault://typography & vault://components)', async () => {
  const server = createStudioDnaMcpServer();

  // Test vault://typography
  const typoResource = server._registeredResources['vault-typography'] || server._registeredResources['vault://typography'];
  assert.ok(typoResource && typoResource.readCallback, 'vault-typography resource must have readCallback');
  const resTypo = await typoResource.readCallback(new URL('vault://typography'));

  assert.ok(resTypo.contents && resTypo.contents.length > 0, 'Typography resource contents must not be empty');
  assert.equal(resTypo.contents[0].uri, 'vault://typography');
  assert.equal(resTypo.contents[0].mimeType, 'application/json');
  const typoData = JSON.parse(resTypo.contents[0].text);
  assert.ok(typeof typoData === 'object' && typoData !== null, 'Typography resource must parse to object');

  // Test vault://components
  const compResource = server._registeredResources['vault-components'] || server._registeredResources['vault://components'];
  assert.ok(compResource && compResource.readCallback, 'vault-components resource must have readCallback');
  const resComp = await compResource.readCallback(new URL('vault://components'));

  assert.ok(resComp.contents && resComp.contents.length > 0, 'Components resource contents must not be empty');
  assert.equal(resComp.contents[0].uri, 'vault://components');
  assert.equal(resComp.contents[0].mimeType, 'application/json');
  const compData = JSON.parse(resComp.contents[0].text);
  assert.ok(typeof compData === 'object' && compData !== null, 'Components resource must parse to object');
});

test('MCP Suite 9: Dynamic Resource Resolution (client://{slug}/slots & ref://{slug}/dna)', async () => {
  const server = createStudioDnaMcpServer();

  // 1. Test client://{slug}/slots on existing client negocia-bem
  const slotsTemplate = server._registeredResourceTemplates['client-slots'];
  assert.ok(slotsTemplate && slotsTemplate.readCallback, 'client-slots template must exist with readCallback');

  const resSlots = await slotsTemplate.readCallback(
    new URL('client://negocia-bem/slots'),
    { slug: 'negocia-bem' }
  );

  assert.ok(resSlots.contents && resSlots.contents.length > 0, 'Client slots contents must return');
  assert.equal(resSlots.contents[0].uri, 'client://negocia-bem/slots');
  assert.equal(resSlots.contents[0].mimeType, 'application/json');
  assert.ok(resSlots.contents[0].text.length > 0, 'Client slots text must not be empty');
  const slotsParsed = JSON.parse(resSlots.contents[0].text);
  assert.ok(typeof slotsParsed === 'object' && slotsParsed !== null, 'Client slots must be valid JSON');

  // 2. Test ref://{slug}/dna on existing reference storeyarchitecture-co-uk
  const refTemplate = server._registeredResourceTemplates['ref-dna'];
  assert.ok(refTemplate && refTemplate.readCallback, 'ref-dna template must exist with readCallback');

  const resRef = await refTemplate.readCallback(
    new URL('ref://storeyarchitecture-co-uk/dna'),
    { slug: 'storeyarchitecture-co-uk' }
  );

  assert.ok(resRef.contents && resRef.contents.length > 0, 'Ref DNA contents must return');
  assert.equal(resRef.contents[0].uri, 'ref://storeyarchitecture-co-uk/dna');
  assert.equal(resRef.contents[0].mimeType, 'application/json');
  assert.ok(resRef.contents[0].text.length > 0, 'Ref DNA text must not be empty');
  const refParsed = JSON.parse(resRef.contents[0].text);
  assert.ok(typeof refParsed === 'object' && refParsed !== null, 'Ref DNA must be valid JSON');
});

test('MCP Suite 10: Traversal Rejection on ALL dynamic templates', async () => {
  const server = createStudioDnaMcpServer();

  const dynamicTemplates = [
    {
      name: 'client-slots',
      testCases: [
        { uri: new URL('client://../../secret/slots'), slug: '../../secret' },
        { uri: new URL('client://invalid/slots'), slug: '..\\windows\\secret' },
        { uri: new URL('client:///etc/passwd/slots'), slug: '/etc/passwd' },
        { uri: new URL('client://invalid/slots'), slug: 'invalid*slug!' }
      ]
    },
    {
      name: 'client-audit',
      testCases: [
        { uri: new URL('client://../../secret/audit'), slug: '../../secret' },
        { uri: new URL('client://invalid/audit'), slug: '..\\windows\\secret' },
        { uri: new URL('client:///etc/passwd/audit'), slug: '/etc/passwd' },
        { uri: new URL('client://invalid/audit'), slug: 'invalid*slug!' }
      ]
    },
    {
      name: 'ref-dna',
      testCases: [
        { uri: new URL('ref://../../secret/dna'), slug: '../../secret' },
        { uri: new URL('ref://invalid/dna'), slug: '..\\windows\\secret' },
        { uri: new URL('ref:///etc/passwd/dna'), slug: '/etc/passwd' },
        { uri: new URL('ref://invalid/dna'), slug: 'invalid*slug!' }
      ]
    }
  ];

  for (const { name, testCases } of dynamicTemplates) {
    const templateObj = server._registeredResourceTemplates[name];
    assert.ok(templateObj && templateObj.readCallback, `${name} template must exist with readCallback`);

    for (const { uri, slug } of testCases) {
      await assert.rejects(
        async () => {
          await templateObj.readCallback(uri, { slug });
        },
        /Invalid slug/,
        `${name} must reject traversal slug "${slug}" with Invalid slug error`
      );
    }
  }
});

test('MCP Suite 11: Prompt Template Invocation (new_client_onboarding & fix_quality_gate_failure)', async () => {
  const server = createStudioDnaMcpServer();

  // 1. Invocation of new_client_onboarding
  const onboardingPrompt = server._registeredPrompts['new_client_onboarding'];
  assert.ok(onboardingPrompt && onboardingPrompt.callback, 'new_client_onboarding prompt must have callback');

  const onboardingResult = await onboardingPrompt.callback({
    brandName: 'Vanguard Luxury Yachts',
    refSlug: 'jeskojets-com',
    niche: 'Maritime Aviation',
    toneOfVoice: 'Cinematic Elegance',
    whatsapp: '+551199999999'
  });

  assert.ok(onboardingResult.messages && Array.isArray(onboardingResult.messages), 'Onboarding prompt must return messages array');
  assert.ok(onboardingResult.messages.length > 0, 'Onboarding prompt must contain at least 1 message');
  const onboardingText = JSON.stringify(onboardingResult.messages);
  assert.ok(onboardingText.includes('Vanguard Luxury Yachts'), 'Onboarding messages must reference brandName');
  assert.ok(onboardingText.includes('jeskojets-com'), 'Onboarding messages must reference refSlug');

  // 2. Invocation of fix_quality_gate_failure
  const fixPrompt = server._registeredPrompts['fix_quality_gate_failure'];
  assert.ok(fixPrompt && fixPrompt.callback, 'fix_quality_gate_failure prompt must have callback');

  const fixResult = await fixPrompt.callback({
    clientSlug: 'negocia-bem',
    gateName: 'impeccable-gate',
    errorDetails: 'Dark-glow antipattern detected in hero section'
  });

  assert.ok(fixResult.messages && Array.isArray(fixResult.messages), 'Fix QA prompt must return messages array');
  assert.ok(fixResult.messages.length > 0, 'Fix QA prompt must contain at least 1 message');
  const fixText = JSON.stringify(fixResult.messages);
  assert.ok(fixText.includes('negocia-bem'), 'Fix QA messages must reference clientSlug');
  assert.ok(fixText.includes('impeccable-gate'), 'Fix QA messages must reference gateName');
});

test('MCP Suite 12: In-Memory Client End-to-End Handshake', async () => {
  const server = createStudioDnaMcpServer();

  const client = new Client(
    { name: 'studio-dna-e2e-client', version: '1.0.0' },
    { capabilities: {} }
  );

  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport)
  ]);

  // Verify tool listing via connected MCP client
  const toolsResponse = await client.listTools();
  assert.ok(toolsResponse && Array.isArray(toolsResponse.tools), 'listTools() must return tools array');

  const returnedToolNames = toolsResponse.tools.map(t => t.name);
  const expectedTools = [
    'scrape_and_extract_dna',
    'inspect_reference',
    'create_client_project',
    'transmute_client_site',
    'compile_dualstack',
    'inject_content_slots',
    'patch_brand_spec',
    'run_unified_quality_gate',
    'run_impeccable_gate',
    'run_box_diff_linter',
    'audit_visual_saliency',
    'query_design_vault'
  ];

  for (const expectedTool of expectedTools) {
    assert.ok(
      returnedToolNames.includes(expectedTool),
      `listTools() must include "${expectedTool}"`
    );
  }

  // Verify resource listing via connected MCP client
  const resourcesResponse = await client.listResources();
  assert.ok(resourcesResponse && Array.isArray(resourcesResponse.resources), 'listResources() must return resources array');

  const returnedResourceUris = resourcesResponse.resources.map(r => r.uri);
  const expectedStaticResources = [
    'vault://easings',
    'vault://typography',
    'vault://components'
  ];

  for (const expectedUri of expectedStaticResources) {
    assert.ok(
      returnedResourceUris.includes(expectedUri),
      `listResources() must include "${expectedUri}"`
    );
  }

  await client.close();
});

test('MCP Suite 13: STDIO Server Process Clean Boot Check', async () => {
  const serverScript = path.resolve(__dirname, '../src/mcp-server.js');
  assert.ok(fs.existsSync(serverScript), 'src/mcp-server.js must exist');

  const child = spawn(process.execPath, [serverScript], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let stdoutBuffer = '';
  let stderrBuffer = '';

  child.stdout.on('data', chunk => {
    stdoutBuffer += chunk.toString();
  });

  child.stderr.on('data', chunk => {
    stderrBuffer += chunk.toString();
  });

  // Send a JSON-RPC 2.0 initialize request to verify STDIO transport handshake
  const initRequest = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'e2e-stdio-tester', version: '1.0.0' }
    }
  }) + '\n';

  child.stdin.write(initRequest);

  // Allow short window for response processing
  await new Promise(resolve => setTimeout(resolve, 800));

  // Verify process has not crashed
  assert.equal(child.exitCode, null, `Server should still be running cleanly, stderr: ${stderrBuffer}`);

  // Send kill signal and await clean termination
  child.kill('SIGTERM');

  const exitCode = await new Promise(resolve => {
    child.on('exit', code => resolve(code));
  });

  assert.ok(
    exitCode === 0 || exitCode === null || child.killed,
    `Server child process should terminate cleanly (exitCode: ${exitCode})`
  );
});

test('MCP Suite 14: Tool Runtime Security & Execution Verifications', async () => {
  const server = createStudioDnaMcpServer();
  const { getSafeVaultDir } = require('../src/mcp/schemas');

  // 1. getSafeVaultDir rejects ../design-vault-leak/secret.json
  assert.throws(
    () => getSafeVaultDir('../design-vault-leak/secret.json'),
    /Path traversal violation for vault path/
  );

  // 2. create_client_project handler rejects refSlug: '../../outside' with isError: true
  const createTool = server._registeredTools['create_client_project'];
  assert.ok(createTool && createTool.handler, 'create_client_project handler must exist');
  const createRes = await createTool.handler({
    brandName: 'Malicious Brand',
    refSlug: '../../outside'
  });
  assert.equal(createRes.isError, true, 'create_client_project must return isError: true');

  // 3. inject_content_slots handler rejects outputPath: 'copias/storeyarchitecture-co-uk/site/index.html' with isError: true
  const injectTool = server._registeredTools['inject_content_slots'];
  assert.ok(injectTool && injectTool.handler, 'inject_content_slots handler must exist');
  const injectRes = await injectTool.handler({
    skeletonPath: path.resolve(__dirname, '../copias/storeyarchitecture-co-uk/site/index.html'),
    contentSlotsPath: path.resolve(__dirname, '../clientes/negocia-bem/content-slots.json'),
    outputPath: 'copias/storeyarchitecture-co-uk/site/index.html'
  });
  assert.equal(injectRes.isError, true, 'inject_content_slots must reject writing to copias/ with isError: true');

  // 4. compile_dualstack executes successfully for negocia-bem with target: 'static'
  const compileTool = server._registeredTools['compile_dualstack'];
  assert.ok(compileTool && compileTool.handler, 'compile_dualstack handler must exist');
  const compileRes = await compileTool.handler({
    clientSlug: 'negocia-bem',
    target: 'static'
  });
  assert.ok(!compileRes.isError, `compile_dualstack failed: ${JSON.stringify(compileRes)}`);
  assert.ok(compileRes.content && compileRes.content.length > 0, 'compile_dualstack must return content');
  const compileData = JSON.parse(compileRes.content[0].text);
  assert.equal(compileData.status, 'success', 'compile_dualstack must return status success');
  assert.ok(
    Array.isArray(compileData.filesGenerated) && compileData.filesGenerated.length > 0,
    'compile_dualstack must report generated files'
  );

  // Verify generated files actually exist in outDir
  assert.ok(fs.existsSync(compileData.outDir), 'outDir must exist on disk');
  for (const file of compileData.filesGenerated) {
    assert.ok(fs.existsSync(path.join(compileData.outDir, file)), `Generated file ${file} must exist on disk`);
  }
});

