'use strict';

const { validateCapabilityReport, validateHumanDecision, validateRoadmap } = require('./contracts');
const { verifyHumanDecision } = require('./human-decision-authority');

const TRANSITIONS = Object.freeze({
  draft: ['ready', 'blocked'],
  ready: ['running', 'blocked'],
  running: ['produced', 'failed', 'blocked'],
  produced: ['verifying'],
  verifying: ['passed', 'failed', 'human-review-required'],
  passed: ['approved', 'closed'],
  failed: ['ready', 'human-review-required'],
  blocked: ['ready', 'human-review-required'],
  'human-review-required': ['approved', 'blocked'],
  approved: ['closed'],
  closed: []
});

function createError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function validateRoadmapSemantics(input) {
  const roadmap = validateRoadmap(input);
  const programs = new Set(roadmap.programs.map(program => program.id));
  const nodes = new Map(roadmap.nodes.map(node => [node.id, node]));
  for (const node of roadmap.nodes) {
    if (!programs.has(node.programId)) throw createError('ROADMAP_UNKNOWN_PROGRAM', `node ${node.id} references unknown program ${node.programId}`);
    for (const dependency of node.dependsOn) {
      if (!nodes.has(dependency)) throw createError('ROADMAP_UNKNOWN_DEPENDENCY', `node ${node.id} references unknown dependency ${dependency}`);
    }
  }
  const active = new Set();
  const visited = new Set();
  function visit(id) {
    if (active.has(id)) throw createError('ROADMAP_CYCLE', `roadmap contains a cycle at ${id}`);
    if (visited.has(id)) return;
    active.add(id);
    nodes.get(id).dependsOn.forEach(visit);
    active.delete(id);
    visited.add(id);
  }
  roadmap.nodes.forEach(node => visit(node.id));
  return clone(roadmap);
}

function observedCapabilities(capabilityReports) {
  const available = new Set();
  for (const report of capabilityReports) {
    for (const capability of validateCapabilityReport(report).capabilities) {
      if (capability.status === 'observed') available.add(capability.id);
    }
  }
  return available;
}

function dependencySatisfied(node, nodes) {
  return node.dependsOn.every(id => ['passed', 'approved', 'closed'].includes(nodes.get(id).state));
}

function selectReadyNodes({ roadmap, capabilityReports = [], taskExists = () => true }) {
  if (!Array.isArray(capabilityReports)) throw new TypeError('capabilityReports must be an array');
  if (typeof taskExists !== 'function') throw new TypeError('taskExists must be a function');
  const validated = validateRoadmapSemantics(roadmap);
  const nodes = new Map(validated.nodes.map(node => [node.id, node]));
  const capabilities = observedCapabilities(capabilityReports);
  return validated.nodes
    .filter(node => node.type === 'agent-task' && node.state === 'ready')
    .filter(node => dependencySatisfied(node, nodes))
    .filter(node => node.requiredCapabilities.every(capability => capabilities.has(capability)))
    .filter(node => taskExists(node.taskPath, clone(node)))
    .map(clone);
}

function transitionNode({ roadmap, nodeId, toState, actor }) {
  const validated = validateRoadmapSemantics(roadmap);
  if (!actor || typeof actor !== 'object' || typeof actor.actorId !== 'string' || typeof actor.role !== 'string') {
    throw new TypeError('actor identity and role are required');
  }
  const node = validated.nodes.find(candidate => candidate.id === nodeId);
  if (!node) throw createError('ROADMAP_NODE_UNKNOWN', `unknown roadmap node ${nodeId}`);
  if (!(TRANSITIONS[node.state] || []).includes(toState)) {
    throw createError('ROADMAP_INVALID_TRANSITION', `cannot transition ${node.id} from ${node.state} to ${toState}`);
  }
  if (toState === 'passed' && actor.role !== 'verifier') {
    throw createError('ROADMAP_VERIFIER_REQUIRED', 'only a verifier can set passed');
  }
  if (node.type === 'human-gate' && toState === 'approved') {
    throw createError('ROADMAP_HUMAN_DECISION_REQUIRED', 'human-gate approval requires a verified human decision');
  }
  return {
    ...validated,
    nodes: validated.nodes.map(candidate => candidate.id === nodeId ? { ...candidate, state: toState } : candidate)
  };
}

function applyHumanDecision({ roadmap, decision, trustedPublicKeys, taskHash, artifactHash }) {
  const validated = validateRoadmapSemantics(roadmap);
  const verifiedDecision = validateHumanDecision(decision);
  verifyHumanDecision({ decision: verifiedDecision, trustedPublicKeys });
  const node = validated.nodes.find(candidate => candidate.id === verifiedDecision.nodeId);
  if (!node || node.type !== 'human-gate') throw createError('ROADMAP_HUMAN_GATE_UNKNOWN', 'decision does not reference a human gate');
  if (node.humanAuthorityId !== verifiedDecision.authorityId) throw createError('ROADMAP_HUMAN_AUTHORITY_MISMATCH', 'decision authority does not match the human gate');
  if (verifiedDecision.taskHash !== taskHash || verifiedDecision.artifactHash !== artifactHash) {
    throw createError('ROADMAP_HUMAN_BINDING_MISMATCH', 'decision is not bound to the reviewed task and artifact');
  }
  if (verifiedDecision.decision === 'request-changes') return validated;
  const nextState = verifiedDecision.decision === 'approve' ? 'approved' : 'blocked';
  if (!(TRANSITIONS[node.state] || []).includes(nextState)) {
    throw createError('ROADMAP_INVALID_TRANSITION', `cannot apply ${verifiedDecision.decision} from ${node.state}`);
  }
  return {
    ...validated,
    nodes: validated.nodes.map(candidate => candidate.id === node.id ? { ...candidate, state: nextState } : candidate)
  };
}

module.exports = {
  TRANSITIONS,
  applyHumanDecision,
  selectReadyNodes,
  transitionNode,
  validateRoadmapSemantics
};
