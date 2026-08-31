const path = require('node:path');

class BlueprintValidationError extends Error {
  constructor(violations) {
    super(`Blueprint validation failed with ${violations.length} violation(s)`);
    this.name = 'BlueprintValidationError';
    this.violations = violations;
  }
}

function violation(code, nodeId, message) {
  return { code, nodeId, message };
}

function checkUniqueNodeIds(blueprint) {
  const seen = new Set();
  const violations = [];

  for (const node of blueprint.nodes) {
    if (seen.has(node.id)) {
      violations.push(violation('DUPLICATE_NODE_ID', node.id, `Node ID ${node.id} is duplicated`));
    }
    seen.add(node.id);
  }

  return violations;
}

function checkDependenciesExist(blueprint) {
  const nodeIds = new Set(blueprint.nodes.map((node) => node.id));
  const violations = [];

  for (const node of blueprint.nodes) {
    for (const dependency of node.dependencies) {
      if (!nodeIds.has(dependency)) {
        violations.push(violation('MISSING_DEPENDENCY', node.id, `Dependency ${dependency} does not exist`));
      }
    }
  }

  return violations;
}

function checkAcyclic(blueprint) {
  const nodeIds = new Set(blueprint.nodes.map((node) => node.id));
  const dependencies = new Map(blueprint.nodes.map((node) => [
    node.id,
    node.dependencies.filter((dependency) => nodeIds.has(dependency))
  ]));
  const visiting = new Set();
  const visited = new Set();
  const cycleNodeIds = new Set();

  function visit(nodeId, stack) {
    if (visiting.has(nodeId)) {
      const cycleStart = stack.indexOf(nodeId);
      for (const cycleNodeId of stack.slice(cycleStart)) cycleNodeIds.add(cycleNodeId);
      return;
    }
    if (visited.has(nodeId)) return;

    visiting.add(nodeId);
    for (const dependency of dependencies.get(nodeId) || []) {
      visit(dependency, [...stack, nodeId]);
    }
    visiting.delete(nodeId);
    visited.add(nodeId);
  }

  for (const node of blueprint.nodes) visit(node.id, []);

  return [...cycleNodeIds].map((nodeId) => (
    violation('DAG_CYCLE', nodeId, `Node ${nodeId} participates in a dependency cycle`)
  ));
}

function checkContextReferencesExist(blueprint) {
  const contextIds = new Set(blueprint.context.map((context) => context.id));
  const violations = [];

  for (const node of blueprint.nodes) {
    for (const input of node.inputs) {
      if (!contextIds.has(input)) {
        violations.push(violation('MISSING_CONTEXT_REFERENCE', node.id, `Context ${input} does not exist`));
      }
    }
  }

  return violations;
}

function checkClientPaths(blueprint) {
  const clientRoot = path.posix.resolve('/', 'clientes', blueprint.clientId);
  const violations = [];
  const paths = blueprint.context.map((context) => ({ nodeId: '', path: context.path }))
    .concat(blueprint.nodes.flatMap((node) => node.paths.map((path) => ({ nodeId: node.id, path }))));

  for (const entry of paths) {
    const hasTraversal = entry.path.split('/').includes('..');
    const resolvedPath = path.posix.resolve('/', entry.path);
    const relativePath = path.posix.relative(clientRoot, resolvedPath);
    const isWithinClientRoot = relativePath !== ''
      && relativePath !== '..'
      && !relativePath.startsWith('../')
      && !path.posix.isAbsolute(relativePath);

    if (entry.path.includes('\\') || path.posix.isAbsolute(entry.path) || hasTraversal || !isWithinClientRoot) {
      violations.push(violation('CROSS_CLIENT_INPUT', entry.nodeId, `Path ${entry.path} is outside client ${blueprint.clientId}`));
    }
  }

  return violations;
}

function checkAllowedTools(blueprint, policy) {
  const violations = [];

  for (const node of blueprint.nodes) {
    for (const tool of node.toolLabels) {
      if (!policy.allowedTools.has(tool)) {
        violations.push(violation('DISALLOWED_TOOL', node.id, `Tool ${tool} is not allowed`));
      }
    }
  }

  return violations;
}

function checkAllowedGates(blueprint, policy) {
  const violations = [];

  for (const node of blueprint.nodes) {
    for (const gate of node.gates) {
      if (!policy.allowedGates.has(gate)) {
        violations.push(violation('DISALLOWED_GATE', node.id, `Gate ${gate} is not allowed`));
      }
    }
  }

  return violations;
}

function checkExecutionRouting(blueprint) {
  const violations = [];
  for (const node of blueprint.nodes) {
    if (typeof node.needsInput !== 'boolean' || typeof node.nonInteractive !== 'boolean'
      || !['standard', 'batch', 'flex'].includes(node.service) || typeof node.humanApprovalEdge !== 'boolean') {
      violations.push(violation('EXECUTION_ROUTING_INVALID', node.id, 'Node execution routing fields are invalid'));
      continue;
    }
    const deferredEligible = (node.kind === 'extract' || node.kind === 'verify')
      && node.nonInteractive && !node.needsInput && !node.humanApprovalEdge && node.dependencies.length === 0;
    if (node.service !== 'standard' && !deferredEligible) {
      violations.push(violation('EXECUTION_SERVICE_INELIGIBLE', node.id, `Node ${node.id} is not eligible for ${node.service}`));
    }
  }
  return violations;
}

function totalNodeBudgetUsd(blueprint) {
  return blueprint.nodes.reduce((total, node) => total + node.budget.maxUsd, 0);
}

function checkNodeBudgetTotals(blueprint) {
  const total = totalNodeBudgetUsd(blueprint);
  if (total <= blueprint.budget.maxUsd) return [];

  return [violation(
    'NODE_BUDGET_TOTAL_EXCEEDED',
    '',
    `Node budget total ${total} exceeds blueprint budget ${blueprint.budget.maxUsd}`
  )];
}

function checkRunBudget(blueprint, policy) {
  const total = totalNodeBudgetUsd(blueprint);
  if (total <= policy.runBudgetUsd) return [];

  return [violation(
    'RUN_BUDGET_EXCEEDED',
    '',
    `Node budget total ${total} exceeds policy run budget ${policy.runBudgetUsd}`
  )];
}

const checks = [
  checkUniqueNodeIds,
  checkDependenciesExist,
  checkAcyclic,
  checkContextReferencesExist,
  checkClientPaths,
  checkAllowedTools,
  checkAllowedGates,
  checkExecutionRouting,
  checkNodeBudgetTotals,
  checkRunBudget
];

function validateBlueprint(blueprint, policy) {
  const violations = checks.flatMap((check) => check(blueprint, policy));
  violations.sort((left, right) => (
    left.code.localeCompare(right.code) || left.nodeId.localeCompare(right.nodeId)
  ));

  if (violations.length > 0) throw new BlueprintValidationError(violations);
  return blueprint;
}

module.exports = {
  BlueprintValidationError,
  validateBlueprint
};
