'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { hashCanonical } = require('../src/shared/canonical-json');
const { readJsonFile, writeJsonAtomic, writeTextAtomic } = require('../src/continuity/file-store');
const { ZERO_HASH, createEventLedger } = require('../src/continuity/event-ledger');
const { createStateStore } = require('../src/continuity/state-store');
const { validateContinuityState, validateExecutionTask, validateRoadmap } = require('../src/continuity/contracts');

const PROGRAM_A_TASKS = Object.freeze([
  ['A-01', 'Shared Canonical JSON and Atomic File Store', [], 'test/continuity-primitives.test.js test/reference-authority-and-v2-transmuter.test.js', ['src/shared/canonical-json.js', 'src/design/canonical-json.js', 'src/continuity/file-store.js', 'test/continuity-primitives.test.js']],
  ['A-02', 'Strict Continuity Contracts and Generated JSON Schemas', ['A-01'], 'test/continuity-contracts.test.js test/task-contract.test.js test/blueprint.test.js', ['src/continuity/contracts.js', 'scripts/generate-continuity-schemas.js', 'schemas/v2/', 'test/continuity-contracts.test.js']],
  ['A-03', 'Revisioned State, Hash-Linked Ledger and Roadmap Engine', ['A-02'], 'test/continuity-state-store.test.js test/continuity-authority.test.js test/continuity-roadmap-engine.test.js', ['src/continuity/event-ledger.js', 'src/continuity/state-store.js', 'src/continuity/evidence-store.js', 'src/continuity/human-decision-authority.js', 'src/continuity/roadmap-engine.js', 'test/continuity-state-store.test.js', 'test/continuity-authority.test.js', 'test/continuity-roadmap-engine.test.js']],
  ['A-04', 'Truth Baseline and Canonical Continuity Seed', ['A-03'], 'test/continuity-baseline.test.js', ['src/continuity/baseline-audit.js', 'scripts/init-continuity.js', 'continuity/', 'test/continuity-baseline.test.js']],
  ['A-05', 'Workspace Manifest and Actual Diff Guard', ['A-04'], 'test/continuity-diff-guard.test.js test/server-security.test.js', ['src/continuity/workspace-manifest.js', 'src/continuity/diff-guard.js', 'test/continuity-diff-guard.test.js']],
  ['A-06', 'Provider-Neutral Adapter and Durable Filesystem Handoff', ['A-05'], 'test/adapter-contract-v2.test.js test/filesystem-handoff-adapter.test.js test/gemini-ide-adapter.test.js', ['src/orchestration/adapter-contract-v2.js', 'src/execution/filesystem-handoff-adapter.js', 'src/execution/handoff-profiles.js', 'test/adapter-contract-v2.test.js', 'test/filesystem-handoff-adapter.test.js']],
  ['A-07', 'Antigravity Workspace Plugin and Primary Adapter', ['A-06'], 'test/antigravity-adapter.test.js test/filesystem-handoff-adapter.test.js', ['.agents/plugins/studio-dna-orchestrator/', 'src/execution/antigravity-adapter.js', 'test/antigravity-adapter.test.js']],
  ['A-08', 'Gemini IDE V2 and Cross-Harness Contract Proof', ['A-06'], 'test/gemini-ide-adapter.test.js test/gemini-ide-adapter-v2.test.js test/filesystem-handoff-adapter.test.js', ['src/execution/gemini-ide-adapter-v2.js', 'test/gemini-ide-adapter-v2.test.js']],
  ['A-09', 'V2 Orchestrator Lifecycle and CLI', ['A-07', 'A-08'], 'test/workflow-orchestrator-v2.test.js test/orchestrator-cli-v2.test.js', ['src/orchestration/workflow-orchestrator-v2.js', 'test/workflow-orchestrator-v2.test.js', 'test/orchestrator-cli-v2.test.js']],
  ['A-10', 'Drift Detection and Cold-Start Recovery', ['A-09'], 'test/continuity-recovery.integration.test.js test/continuity-state-store.test.js test/continuity-roadmap-engine.test.js', ['src/continuity/drift-checker.js', 'src/continuity/recovery.js', 'test/continuity-recovery.integration.test.js']],
  ['A-11', 'Conformance, Clean-Checkout Drill and Status Migration', ['A-10'], 'test/continuity-conformance.integration.test.js && node scripts/run-clean-checkout-continuity-drill.js --source . && npm test', ['scripts/run-continuity-conformance.js', 'scripts/run-clean-checkout-continuity-drill.js', 'test/continuity-conformance.integration.test.js']]
].map(([id, title, dependsOn, verify, outputs]) => Object.freeze({ id, title, dependsOn, verify, outputs })));

const TASK_FILE_STEMS = Object.freeze({
  'A-01': 'A-01-primitives', 'A-02': 'A-02-contracts', 'A-03': 'A-03-state-roadmap',
  'A-04': 'A-04-baseline', 'A-05': 'A-05-diff-guard', 'A-06': 'A-06-handoff',
  'A-07': 'A-07-antigravity', 'A-08': 'A-08-gemini-v2', 'A-09': 'A-09-orchestrator-v2',
  'A-10': 'A-10-recovery', 'A-11': 'A-11-conformance'
});

const PHASE_PROGRAMS = Object.freeze(['A', 'A', 'A', 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'D', 'E', 'E', 'E']);
const PROGRAMS = Object.freeze(['A', 'B', 'C', 'D', 'E']);

function codedError(code, message) {
  const error = new Error(`${code}: ${message}`);
  error.code = code;
  return error;
}

function workspacePath(workspaceRoot, filename) {
  const absolute = path.resolve(workspaceRoot, filename);
  const relative = path.relative(workspaceRoot, absolute).split(path.sep).join('/');
  if (!relative || relative.startsWith('../') || relative === '..' || path.isAbsolute(relative)) {
    throw codedError('CONTINUITY_PATH_OUTSIDE_WORKSPACE', 'path must stay inside workspaceRoot');
  }
  return { absolute, relative };
}

function taskFile(task) {
  return `continuity/tasks/program-a/${TASK_FILE_STEMS[task.id]}.task.json`;
}

function mediaType(filename) {
  if (filename.endsWith('.js')) return 'text/javascript';
  if (filename.endsWith('.json')) return 'application/json';
  if (filename.endsWith('.md')) return 'text/markdown';
  return 'text/plain';
}

function readVerifiedTaskIds(filename) {
  if (!filename) return new Set();
  const manifest = readJsonFile(filename);
  if (!manifest || manifest.contractKind !== 'verified-task-evidence' || !manifest.verifier || manifest.verifier.role !== 'verifier') {
    throw codedError('CONTINUITY_VERIFIER_EVIDENCE_INVALID', 'verified evidence must name a verifier');
  }
  if (!Array.isArray(manifest.taskIds) || manifest.taskIds.some(id => typeof id !== 'string')) {
    throw codedError('CONTINUITY_VERIFIER_EVIDENCE_INVALID', 'verified evidence must contain taskIds');
  }
  const known = new Set(PROGRAM_A_TASKS.map(task => task.id));
  if (manifest.taskIds.some(id => !known.has(id))) throw codedError('CONTINUITY_VERIFIER_EVIDENCE_INVALID', 'verified evidence references an unknown task');
  return new Set(manifest.taskIds);
}

function taskState(task, verifiedTaskIds) {
  if (verifiedTaskIds.has(task.id)) return 'passed';
  if (['A-01', 'A-02', 'A-03'].includes(task.id)) return 'verifying';
  return 'blocked';
}

function createTaskContract(task, specRelativePath, specHash, verifiedTaskIds) {
  const state = taskState(task, verifiedTaskIds);
  return validateExecutionTask({
    schemaVersion: 2,
    contractKind: 'execution-task',
    taskId: task.id,
    programId: 'A',
    waveId: 'program-a',
    state,
    dependsOn: [...task.dependsOn].sort(),
    role: 'builder',
    requiredCapabilities: [],
    inputs: [{ path: specRelativePath, sha256: specHash, purpose: 'approved-specification' }],
    authority: {
      readAllowlist: ['docs/', 'src/', 'test/'],
      writeAllowlist: [...task.outputs].sort(),
      network: { mode: 'deny', hosts: [] }
    },
    requirements: [{ id: 'verification', kind: 'evidence', assertion: `Run ${task.verify}` }],
    commands: { red: `node --test ${task.verify.split(' && ')[0]}`, verify: `node --test ${task.verify.split(' && ')[0]}` },
    budget: { maxAttempts: 3, timeoutMs: 300000, maxFilesChanged: task.outputs.length },
    failurePolicy: { ambiguity: 'blocked', missingInput: 'blocked', policyViolation: 'failed-no-retry', acceptanceFailure: 'human-review-required' },
    expectedArtifacts: task.outputs.map(output => ({ path: output, mediaType: mediaType(output) })).sort((left, right) => left.path.localeCompare(right.path))
  });
}

function createRoadmap(specHash, verifiedTaskIds) {
  const taskNodes = PROGRAM_A_TASKS.map(task => ({
    id: task.id,
    programId: 'A',
    type: 'agent-task',
    state: taskState(task, verifiedTaskIds),
    dependsOn: [...task.dependsOn].sort(),
    taskPath: taskFile(task),
    requiredCapabilities: [],
    humanAuthorityId: null,
    blockedReasonCode: taskState(task, verifiedTaskIds) === 'blocked' ? 'VERIFIER_EVIDENCE_REQUIRED' : null
  }));
  const phaseNodes = PHASE_PROGRAMS.map((programId, index) => ({
    id: `phase-${String(index).padStart(2, '0')}`,
    programId,
    type: 'external-input',
    state: programId === 'A' ? 'verifying' : 'blocked',
    dependsOn: [],
    taskPath: null,
    requiredCapabilities: [],
    humanAuthorityId: null,
    blockedReasonCode: programId === 'A' ? null : 'DESIGN_APPROVAL_REQUIRED'
  }));
  return validateRoadmap({
    schemaVersion: 2,
    contractKind: 'roadmap',
    roadmapId: 'studio-dna-phase-0-14',
    specHash,
    programs: PROGRAMS.map(id => ({ id, state: id === 'A' ? 'in-progress' : 'blocked' })),
    nodes: [...taskNodes, ...phaseNodes].sort((left, right) => left.id.localeCompare(right.id))
  });
}

function expectedFiles() {
  return [
    'continuity/CHARTER.md', 'continuity/CURRENT_STATE.json', 'continuity/ROADMAP.json', 'continuity/RECOVERY.md', 'continuity/runs/event-ledger.json',
    'continuity/decisions/.gitkeep', 'continuity/evidence/.gitkeep', 'continuity/runs/.gitkeep',
    ...PROGRAM_A_TASKS.map(taskFile)
  ];
}

function assertCheckableSeed(workspaceRoot) {
  for (const relative of expectedFiles()) {
    if (!fs.existsSync(workspacePath(workspaceRoot, relative).absolute)) {
      throw codedError('CONTINUITY_SEED_INCOMPLETE', `${relative} is missing`);
    }
  }
  validateContinuityState(readJsonFile(workspacePath(workspaceRoot, 'continuity/CURRENT_STATE.json').absolute));
  validateRoadmap(readJsonFile(workspacePath(workspaceRoot, 'continuity/ROADMAP.json').absolute));
  for (const task of PROGRAM_A_TASKS) validateExecutionTask(readJsonFile(workspacePath(workspaceRoot, taskFile(task)).absolute));
}

function initializeContinuity({ workspaceRoot, specPath, verifiedEvidencePath = null, check = false, clock = () => new Date().toISOString() }) {
  if (typeof workspaceRoot !== 'string' || !workspaceRoot) throw new TypeError('workspaceRoot is required');
  if (typeof specPath !== 'string' || !specPath) throw new TypeError('specPath is required');
  if (typeof clock !== 'function') throw new TypeError('clock must be a function');
  const root = path.resolve(workspaceRoot);
  const spec = workspacePath(root, specPath);
  if (!fs.existsSync(spec.absolute)) throw codedError('CONTINUITY_SPEC_MISSING', `${spec.relative} does not exist`);
  if (check) {
    assertCheckableSeed(root);
    return { checked: true, workspaceRoot: root };
  }
  const continuityRoot = workspacePath(root, 'continuity').absolute;
  if (fs.existsSync(continuityRoot)) throw codedError('CONTINUITY_ALREADY_INITIALIZED', 'continuity already exists; use --check to validate it');

  const specHash = hashCanonical(fs.readFileSync(spec.absolute, 'utf8'));
  const verifiedTaskIds = readVerifiedTaskIds(verifiedEvidencePath);
  const roadmap = createRoadmap(specHash, verifiedTaskIds);
  const currentState = validateContinuityState({
    schemaVersion: 2,
    contractKind: 'continuity-state',
    revision: 0,
    projectStatus: 'experimental',
    activeProgramId: 'A',
    activeWaveId: null,
    lastEventHash: ZERO_HASH,
    updatedAt: clock(),
    nextEligibleTaskIds: [],
    blockedReasonCodes: ['VERIFIER_EVIDENCE_REQUIRED']
  });

  writeTextAtomic(workspacePath(root, 'continuity/CHARTER.md').absolute, '# Continuity Charter\n\nCanonical continuity artifacts are evidence-bound. Executor claims do not promote task state.\n');
  const ledger = createEventLedger({ filename: workspacePath(root, 'continuity/runs/event-ledger.json').absolute, clock });
  const stateStore = createStateStore({ filename: workspacePath(root, 'continuity/CURRENT_STATE.json').absolute, ledger, clock });
  const initializedState = stateStore.initialize(currentState);
  writeJsonAtomic(workspacePath(root, 'continuity/ROADMAP.json').absolute, roadmap);
  writeTextAtomic(workspacePath(root, 'continuity/RECOVERY.md').absolute, '# Recovery\n\nUse `node scripts/init-continuity.js --workspace . --spec <approved-spec> --check` before resuming.\n');
  for (const relative of ['continuity/decisions/.gitkeep', 'continuity/evidence/.gitkeep', 'continuity/runs/.gitkeep']) {
    writeTextAtomic(workspacePath(root, relative).absolute, '');
  }
  for (const task of PROGRAM_A_TASKS) {
    writeJsonAtomic(workspacePath(root, taskFile(task)).absolute, createTaskContract(task, spec.relative, specHash, verifiedTaskIds));
  }
  return { checked: false, currentState: initializedState, roadmap, workspaceRoot: root };
}

function parseCli(argv) {
  const options = { check: false, verifiedEvidencePath: null };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--check') options.check = true;
    else if (argument === '--workspace') options.workspaceRoot = argv[++index];
    else if (argument === '--spec') options.specPath = argv[++index];
    else if (argument === '--verified-evidence') options.verifiedEvidencePath = argv[++index];
    else throw codedError('CONTINUITY_CLI_ARGUMENT_INVALID', `unknown argument ${argument}`);
  }
  return options;
}

if (require.main === module) {
  const options = parseCli(process.argv.slice(2));
  initializeContinuity(options);
}

module.exports = { PROGRAM_A_TASKS, initializeContinuity, parseCli };
