'use strict';

class PolicyViolationError extends TypeError {
  constructor(message, code) {
    super(message);
    this.name = 'PolicyViolationError';
    this.code = code;
  }
}

function normalizePath(p) {
  if (typeof p !== 'string') return '';
  return p.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, '');
}

function isPathCovered(target, allowlist) {
  if (!Array.isArray(allowlist)) return false;
  const nTarget = normalizePath(target);
  return allowlist.some(allowed => {
    const nAllowed = normalizePath(allowed);
    if (nAllowed === nTarget) return true;
    if (nAllowed === '**' || nAllowed === '*') return true;
    if (nAllowed.endsWith('/**')) {
      const base = nAllowed.slice(0, -3);
      return nTarget === base || nTarget.startsWith(base + '/');
    }
    if (nAllowed.endsWith('/*')) {
      const base = nAllowed.slice(0, -2);
      if (nTarget === base) return true;
      if (nTarget.startsWith(base + '/')) {
        const rest = nTarget.slice(base.length + 1);
        return !rest.includes('/');
      }
    }
    return false;
  });
}

function assertPathAccess(contract, targetPath, mode) {
  if (!contract || typeof contract !== 'object') {
    throw new PolicyViolationError('Invalid contract object', 'POLICY_INVALID_CONTRACT');
  }
  if (mode !== 'read' && mode !== 'write') {
    throw new PolicyViolationError(`mode must be "read" or "write", got "${mode}"`, 'POLICY_INVALID_MODE');
  }

  const nTarget = normalizePath(targetPath);

  // 1. Cross-client access check
  if (contract.clientScope && contract.clientScope !== 'global') {
    const clientMatch = nTarget.match(/^clientes\/([^/]+)/);
    if (clientMatch && clientMatch[1] !== contract.clientScope) {
      throw new PolicyViolationError(
        `POLICY_CROSS_CLIENT_PATH: path "${targetPath}" references client "${clientMatch[1]}" outside permitted clientScope "${contract.clientScope}"`,
        'POLICY_CROSS_CLIENT_PATH'
      );
    }
  }

  // 2. Read-only copias / design-vault write check
  if (mode === 'write') {
    if (nTarget === 'copias' || nTarget.startsWith('copias/') || nTarget === 'design-vault' || nTarget.startsWith('design-vault/')) {
      throw new PolicyViolationError(
        `POLICY_READONLY_COPIAS: cannot write to immutable path "${targetPath}"`,
        'POLICY_READONLY_COPIAS'
      );
    }
  }

  // 3. Allowlist coverage check
  const allowlist = mode === 'read' ? contract.readAllowlist : contract.writeAllowlist;
  if (!isPathCovered(nTarget, allowlist)) {
    throw new PolicyViolationError(
      `POLICY_PATH_NOT_ALLOWED: path "${targetPath}" is not covered by ${mode === 'read' ? 'readAllowlist' : 'writeAllowlist'}`,
      'POLICY_PATH_NOT_ALLOWED'
    );
  }

  return true;
}

function assertToolAllowed(contract, toolName) {
  if (!contract || typeof contract !== 'object') {
    throw new PolicyViolationError('Invalid contract object', 'POLICY_INVALID_CONTRACT');
  }
  if (!Array.isArray(contract.allowedTools) || !contract.allowedTools.includes(toolName)) {
    throw new PolicyViolationError(
      `POLICY_TOOL_NOT_ALLOWED: tool "${toolName}" is not permitted by allowedTools`,
      'POLICY_TOOL_NOT_ALLOWED'
    );
  }
  return true;
}

function assertIndependentVerifier(contract) {
  if (!contract || typeof contract !== 'object') {
    throw new PolicyViolationError('Invalid contract object', 'POLICY_INVALID_CONTRACT');
  }
  const verifierRoles = ['technical_verifier_agent', 'visual_critic_agent'];
  if (verifierRoles.includes(contract.role)) {
    if (!contract.builderActorId || typeof contract.builderActorId !== 'string' || contract.builderActorId.trim() === '') {
      throw new PolicyViolationError(
        `POLICY_BUILDER_ACTOR_REQUIRED: verifier role "${contract.role}" requires a valid builderActorId`,
        'POLICY_BUILDER_ACTOR_REQUIRED'
      );
    }
    if (contract.actorId === contract.builderActorId) {
      throw new PolicyViolationError(
        `POLICY_VERIFIER_SEGREGATION: verifier actorId "${contract.actorId}" cannot be identical to builderActorId "${contract.builderActorId}"`,
        'POLICY_VERIFIER_SEGREGATION'
      );
    }
  }
  return true;
}

module.exports = {
  PolicyViolationError,
  normalizePath,
  isPathCovered,
  assertPathAccess,
  assertToolAllowed,
  assertIndependentVerifier
};
