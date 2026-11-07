'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  assertPathAccess,
  assertToolAllowed,
  assertIndependentVerifier,
  PolicyViolationError
} = require('../src/orchestration/policy-enforcer');

test('assertPathAccess allows reading within client scope allowlist', () => {
  const contract = {
    clientScope: 'silvio-iwata',
    readAllowlist: ['clientes/silvio-iwata/**', 'copias/**'],
    writeAllowlist: ['clientes/silvio-iwata/site/**']
  };

  assert.doesNotThrow(() => {
    assertPathAccess(contract, 'clientes/silvio-iwata/content/brief.json', 'read');
    assertPathAccess(contract, 'copias/reference.html', 'read');
  });
});

test('assertPathAccess blocks cross-client access with POLICY_CROSS_CLIENT_PATH', () => {
  const contract = {
    clientScope: 'client-a',
    readAllowlist: ['clientes/client-a/**', 'clientes/client-b/**'],
    writeAllowlist: ['clientes/client-a/**']
  };

  assert.throws(() => {
    assertPathAccess(contract, 'clientes/client-b/secret.json', 'read');
  }, (err) => {
    assert.equal(err.code, 'POLICY_CROSS_CLIENT_PATH');
    assert.match(err.message, /POLICY_CROSS_CLIENT_PATH/);
    return true;
  });

  assert.throws(() => {
    assertPathAccess(contract, 'clientes/client-b/output.html', 'write');
  }, (err) => {
    assert.equal(err.code, 'POLICY_CROSS_CLIENT_PATH');
    return true;
  });
});

test('assertPathAccess allows cross-client access when clientScope is global', () => {
  const contract = {
    clientScope: 'global',
    readAllowlist: ['clientes/**'],
    writeAllowlist: ['clientes/client-a/**', 'clientes/client-b/**']
  };

  assert.doesNotThrow(() => {
    assertPathAccess(contract, 'clientes/client-b/content.json', 'read');
    assertPathAccess(contract, 'clientes/client-a/output.json', 'write');
  });
});

test('assertPathAccess blocks write to copias/** and design-vault/** with POLICY_READONLY_COPIAS', () => {
  const contract = {
    clientScope: 'global',
    readAllowlist: ['copias/**', 'design-vault/**'],
    writeAllowlist: ['copias/**', 'design-vault/**']
  };

  assert.throws(() => {
    assertPathAccess(contract, 'copias/index.html', 'write');
  }, (err) => {
    assert.equal(err.code, 'POLICY_READONLY_COPIAS');
    assert.match(err.message, /POLICY_READONLY_COPIAS/);
    return true;
  });

  assert.throws(() => {
    assertPathAccess(contract, 'design-vault/vault-index.db', 'write');
  }, (err) => {
    assert.equal(err.code, 'POLICY_READONLY_COPIAS');
    return true;
  });
});

test('assertPathAccess blocks paths not covered by allowlist', () => {
  const contract = {
    clientScope: 'client-a',
    readAllowlist: ['clientes/client-a/brief.json'],
    writeAllowlist: ['clientes/client-a/site/**']
  };

  assert.throws(() => {
    assertPathAccess(contract, 'clientes/client-a/other.json', 'read');
  }, (err) => {
    assert.match(err.message, /readAllowlist|allowlist|POLICY_PATH_NOT_ALLOWED/i);
    return true;
  });

  assert.throws(() => {
    assertPathAccess(contract, 'clientes/client-a/root.html', 'write');
  }, (err) => {
    assert.match(err.message, /writeAllowlist|allowlist|POLICY_PATH_NOT_ALLOWED/i);
    return true;
  });
});

test('assertToolAllowed blocks disallowed tools', () => {
  const contract = {
    allowedTools: ['fs.read', 'node.test']
  };

  assert.doesNotThrow(() => {
    assertToolAllowed(contract, 'fs.read');
    assertToolAllowed(contract, 'node.test');
  });

  assert.throws(() => {
    assertToolAllowed(contract, 'fs.write');
  }, (err) => {
    assert.equal(err.code, 'POLICY_TOOL_NOT_ALLOWED');
    return true;
  });
});

test('assertIndependentVerifier enforces verifier segregation', () => {
  // verifier with same actorId as builderActorId must fail
  const invalidContract = {
    role: 'technical_verifier_agent',
    actorId: 'agent-1',
    builderActorId: 'agent-1'
  };

  assert.throws(() => {
    assertIndependentVerifier(invalidContract);
  }, (err) => {
    assert.match(err.code, /POLICY_VERIFIER_SEGREGATION|DAG_VERIFIER_SEGREGATION_VIOLATION/);
    return true;
  });

  // verifier missing builderActorId must fail
  const missingBuilder = {
    role: 'visual_critic_agent',
    actorId: 'agent-verifier'
  };

  assert.throws(() => {
    assertIndependentVerifier(missingBuilder);
  }, (err) => {
    assert.match(err.code, /POLICY_VERIFIER_SEGREGATION|POLICY_BUILDER_ACTOR_REQUIRED/);
    return true;
  });

  // verifier with distinct actorId and builderActorId must pass
  const validVerifier = {
    role: 'technical_verifier_agent',
    actorId: 'agent-verifier',
    builderActorId: 'agent-builder'
  };

  assert.doesNotThrow(() => {
    assertIndependentVerifier(validVerifier);
  });

  // builder role does not require builderActorId
  const builderContract = {
    role: 'implementation_agent',
    actorId: 'agent-builder'
  };

  assert.doesNotThrow(() => {
    assertIndependentVerifier(builderContract);
  });
});
