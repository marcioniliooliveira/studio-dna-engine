/**
 * test/challenger-adversarial-mcp.test.js
 * 
 * Challenger 1: Empirical Adversarial Stress-Test Suite for Studio DNA Engine MCP Server
 * 
 * Probes and asserts:
 * 1. Path Traversal & Security Fuzzing against validateSlugSecurity
 * 2. Attack execution against Tool Handlers:
 *    - inspect_reference
 *    - transmute_client_site
 *    - compile_dualstack
 *    - run_unified_quality_gate
 *    - run_impeccable_gate
 *    - audit_visual_saliency
 * 3. Attack execution against Dynamic Resource Templates:
 *    - client-dna
 *    - client-slots
 *    - client-audit
 *    - ref-dna
 * 4. Boundary Escape & Containment Proof:
 *    - getSafeClientDir, getSafeRefDir, getSafeVaultDir boundary guards
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { createStudioDnaMcpServer } = require('../src/mcp/index');
const {
  validateSlugSecurity,
  getSafeClientDir,
  getSafeRefDir,
  getSafeVaultDir,
  ROOT_DIR
} = require('../src/mcp/schemas');

// Canonical adversarial attack vector inventory
const ADVERSARIAL_INPUTS = [
  '../../',
  '..\\',
  '..%2f',
  '%00',
  '\0',
  'INVALID-SLUG',
  '../../../../../../windows/system32',
  'slug;rm -rf',
  'CON',
  'PRN',
  'AUX',
  'NUL',
  // Extended stress vectors
  'COM1',
  'LPT1',
  '../outside',
  '..\\outside',
  '/etc/passwd',
  '\\windows\\system32',
  'client/../../secret',
  'invalid*slug!',
  '..%5c',
  '%2e%2e%2f',
  'slug/nested',
  'slug\\nested',
  '-leading-hyphen',
  'trailing-hyphen-',
  'double--hyphen',
  '..',
  '.'
];

test('Challenger 1.1: validateSlugSecurity rejects all adversarial vectors', () => {
  for (const input of ADVERSARIAL_INPUTS) {
    assert.throws(
      () => validateSlugSecurity(input),
      /Invalid slug/,
      `validateSlugSecurity MUST reject attack vector: "${input}"`
    );
  }

  // Type boundary fuzzing: non-strings and empty inputs
  const invalidTypes = [123, null, undefined, {}, [], true, '   ', ''];
  for (const badType of invalidTypes) {
    assert.throws(
      () => validateSlugSecurity(badType),
      /Invalid slug/,
      `validateSlugSecurity MUST reject bad type/empty input: ${JSON.stringify(badType)}`
    );
  }
});

test('Challenger 1.2: Directory resolvers enforce prefix containment and reject traversal', () => {
  const expectedClientPrefix = path.resolve(ROOT_DIR, 'clientes') + path.sep;
  const expectedRefPrefix = path.resolve(ROOT_DIR, 'copias') + path.sep;
  const expectedVaultPrefix = path.resolve(ROOT_DIR, 'design-vault');

  // Verify safe slugs stay within boundary
  const safeClient = getSafeClientDir('negocia-bem');
  assert.ok(
    safeClient.startsWith(expectedClientPrefix),
    `Safe client dir must start with ${expectedClientPrefix}`
  );

  const safeRef = getSafeRefDir('storeyarchitecture-co-uk');
  assert.ok(
    safeRef.startsWith(expectedRefPrefix),
    `Safe ref dir must start with ${expectedRefPrefix}`
  );

  const safeVault = getSafeVaultDir('01-motion-physics/easings.json');
  assert.ok(
    safeVault.startsWith(expectedVaultPrefix),
    `Safe vault dir must start with ${expectedVaultPrefix}`
  );

  // Vault traversal rejection
  const vaultAttacks = ['../../secret', '../copias', '..\\clientes', '/etc/passwd'];
  for (const va of vaultAttacks) {
    assert.throws(
      () => getSafeVaultDir(va),
      /Path traversal violation/,
      `getSafeVaultDir MUST reject traversal: "${va}"`
    );
  }
});

test('Challenger 1.3: Tool Handlers reject all adversarial vectors with explicit error responses', async () => {
  const server = createStudioDnaMcpServer();

  const toolTargets = [
    {
      name: 'inspect_reference',
      makeArgs: (vector) => ({ refSlug: vector })
    },
    {
      name: 'transmute_client_site',
      makeArgs: (vector) => ({ clientSlug: vector })
    },
    {
      name: 'compile_dualstack',
      makeArgs: (vector) => ({ clientSlug: vector, target: 'static' })
    },
    {
      name: 'run_unified_quality_gate',
      makeArgs: (vector) => ({ clientSlug: vector })
    },
    {
      name: 'run_impeccable_gate',
      makeArgs: (vector) => ({ clientSlug: vector })
    },
    {
      name: 'audit_visual_saliency',
      makeArgs: (vector) => ({ clientSlug: vector })
    }
  ];

  for (const { name, makeArgs } of toolTargets) {
    const tool = server._registeredTools[name];
    assert.ok(tool, `Tool ${name} must be registered on server`);
    assert.equal(typeof tool.handler, 'function', `Tool ${name} must possess a callable handler`);

    for (const vector of ADVERSARIAL_INPUTS) {
      const args = makeArgs(vector);
      let response;
      try {
        response = await tool.handler(args);
      } catch (err) {
        // Handlers should cleanly catch and return isError: true rather than crashing,
        // but throwing an explicit security rejection error is also a contained failure.
        response = { isError: true, content: [{ type: 'text', text: err.message }] };
      }

      assert.ok(response, `Tool ${name} must return a response object for vector "${vector}"`);
      assert.equal(
        response.isError,
        true,
        `Tool ${name} MUST return isError: true for adversarial vector "${vector}". Received: ${JSON.stringify(response)}`
      );

      const responseText = response.content?.map(c => c.text).join(' ') || '';
      assert.ok(
        responseText.includes('Invalid slug') || responseText.includes('Path traversal') || responseText.includes('não encontrado'),
        `Tool ${name} error text MUST state security or rejection reason for "${vector}". Got: "${responseText}"`
      );
    }
  }
});

test('Challenger 1.4: Dynamic Resource Templates reject all adversarial vectors', async () => {
  const server = createStudioDnaMcpServer();

  const dynamicTemplates = [
    { name: 'client-dna', uriScheme: 'client', subpath: 'dna' },
    { name: 'client-slots', uriScheme: 'client', subpath: 'slots' },
    { name: 'client-audit', uriScheme: 'client', subpath: 'audit' },
    { name: 'ref-dna', uriScheme: 'ref', subpath: 'dna' }
  ];

  for (const { name, uriScheme, subpath } of dynamicTemplates) {
    const templateObj = server._registeredResourceTemplates[name];
    assert.ok(templateObj, `Template ${name} must be registered on server`);
    assert.equal(typeof templateObj.readCallback, 'function', `Template ${name} must possess a readCallback`);

    for (const vector of ADVERSARIAL_INPUTS) {
      // Craft simulated URI
      const dummyUri = new URL(`${uriScheme}://invalid-${subpath}/${subpath}`);

      // Must reject via readCallback(uri, { slug: vector })
      await assert.rejects(
        async () => {
          await templateObj.readCallback(dummyUri, { slug: vector });
        },
        /Invalid slug/,
        `Template ${name} MUST throw "Invalid slug" when queried with adversarial vector "${vector}"`
      );
    }
  }
});
