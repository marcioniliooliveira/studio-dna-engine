const path = require('node:path');
const { isDeepStrictEqual } = require('node:util');
const { assertSafeSlug } = require('../server/security');

function packageError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function isSafeClientPath(candidate, clientId) {
  if (typeof candidate !== 'string' || candidate.includes('\\') || path.posix.isAbsolute(candidate)) return false;
  if (candidate.split('/').includes('..')) return false;
  const clientRoot = path.posix.resolve('/', 'clientes', clientId);
  const resolved = path.posix.resolve('/', candidate);
  const relative = path.posix.relative(clientRoot, resolved);
  return relative !== '' && relative !== '..' && !relative.startsWith('../') && !path.posix.isAbsolute(relative);
}

function freeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}

function assertBudget(budget) {
  if (!budget || !Number.isInteger(budget.maxInputTokens) || budget.maxInputTokens <= 0
    || !Number.isInteger(budget.maxOutputTokens) || budget.maxOutputTokens <= 0
    || !Number.isFinite(budget.maxUsd) || budget.maxUsd <= 0
    || !Number.isInteger(budget.maxAttempts) || budget.maxAttempts < 1 || budget.maxAttempts > 3) {
    throw packageError('TASK_PACKAGE_BUDGET_INVALID', 'Node budget is invalid');
  }
}

function declaredDependencyOutputs(blueprint, node) {
  if (!Array.isArray(blueprint.nodes) || !Array.isArray(node.dependencies)) return new Set();
  const dependencyIds = new Set(node.dependencies);
  return new Set(
    blueprint.nodes
      .filter((candidate) => dependencyIds.has(candidate.id))
      .flatMap((candidate) => Array.isArray(candidate.outputs) ? candidate.outputs : [])
  );
}

function compactArtifacts(blueprint, node, artifacts) {
  if (!Array.isArray(artifacts)) {
    throw packageError('TASK_PACKAGE_ARTIFACT_INVALID', 'Artifacts must be an array');
  }
  const declared = declaredDependencyOutputs(blueprint, node);
  const seen = new Set();
  const compact = artifacts.map((artifact) => {
    if (!artifact || typeof artifact.id !== 'string' || !/^[a-f0-9]{64}$/.test(artifact.sha256 || artifact.sha)) {
      throw packageError('TASK_PACKAGE_ARTIFACT_INVALID', 'Artifact must have an ID and SHA-256');
    }
    if (!declared.has(artifact.id) || seen.has(artifact.id)) {
      throw packageError('TASK_PACKAGE_ARTIFACT_UNDECLARED', 'Artifact is not a unique declared dependency output');
    }
    seen.add(artifact.id);
    return { id: artifact.id, sha: artifact.sha256 || artifact.sha };
  });
  return compact.sort((left, right) => left.id.localeCompare(right.id) || left.sha.localeCompare(right.sha));
}

function buildTaskPackage({ blueprint, node, artifacts = [] }) {
  const runId = assertSafeSlug(blueprint && blueprint.runId);
  const clientId = assertSafeSlug(blueprint && blueprint.clientId);
  if (!node || typeof node.id !== 'string' || typeof node.kind !== 'string'
    || typeof node.needsInput !== 'boolean' || typeof node.nonInteractive !== 'boolean'
    || !['standard', 'batch', 'flex'].includes(node.service) || typeof node.humanApprovalEdge !== 'boolean') {
    throw packageError('TASK_PACKAGE_NODE_INVALID', 'Node identity is invalid');
  }
  if (!Array.isArray(blueprint.nodes) || !blueprint.nodes.some((acceptedNode) => (
    acceptedNode.id === node.id && isDeepStrictEqual(acceptedNode, node)
  ))) {
    throw packageError('TASK_PACKAGE_NODE_UNBOUND', 'Node is not bound to the accepted blueprint');
  }
  if (!Array.isArray(node.paths) || node.paths.length === 0 || !node.paths.every((entry) => isSafeClientPath(entry, clientId))) {
    throw packageError('TASK_PACKAGE_PATH_INVALID', 'Node paths must stay within the active client');
  }
  if (!Array.isArray(node.outputs) || node.outputs.length === 0 || !node.outputs.every((output) => typeof output === 'string' && output.length > 0)) {
    throw packageError('TASK_PACKAGE_OUTPUT_INVALID', 'Node outputs are invalid');
  }
  if (!Array.isArray(node.toolLabels) || node.toolLabels.length === 0
    || !node.toolLabels.every((tool) => typeof tool === 'string' && tool.length > 0)
    || new Set(node.toolLabels).size !== node.toolLabels.length) {
    throw packageError('TASK_PACKAGE_TOOLS_INVALID', 'Node tools are invalid');
  }
  if (!Array.isArray(node.gates) || node.gates.length === 0 || !node.gates.every((gate) => typeof gate === 'string' && gate.length > 0)) {
    throw packageError('TASK_PACKAGE_GATES_INVALID', 'Node gates are invalid');
  }
  assertBudget(node.budget);

  return freeze({
    v: 1,
    rid: runId,
    cid: clientId,
    nid: node.id,
    k: node.kind,
    need: node.needsInput,
    ni: node.nonInteractive,
    svc: node.service,
    ha: node.humanApprovalEdge,
    in: compactArtifacts(blueprint, node, artifacts),
    p: [...node.paths].sort(),
    out: [...node.outputs].sort(),
    tl: [...node.toolLabels].sort(),
    g: [...node.gates].sort(),
    b: { it: node.budget.maxInputTokens, ot: node.budget.maxOutputTokens, usd: node.budget.maxUsd, try: node.budget.maxAttempts }
  });
}

module.exports = { buildTaskPackage };
