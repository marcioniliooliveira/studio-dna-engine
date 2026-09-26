'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function git(...args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
}

function assertRelativeRepositoryPath(value) {
  assert.equal(typeof value, 'string');
  assert.ok(value.length > 0);
  assert.equal(path.isAbsolute(value), false, `${value} must be relative`);
  assert.equal(value.split(/[\\/]+/).includes('..'), false, `${value} must stay inside the repository`);
}

test('master roadmap covers every phase exactly once and does not falsely unlock future programs', () => {
  const roadmap = readJson('delegation/master-roadmap.json');
  assert.equal(roadmap.schemaVersion, 1);
  assert.equal(roadmap.projectStatus, 'experimental');

  const phaseIds = roadmap.phases.map(phase => phase.id);
  assert.deepEqual(phaseIds, Array.from({ length: 15 }, (_, index) => index));

  const assigned = roadmap.programs.flatMap(program => program.phaseIds).sort((a, b) => a - b);
  assert.deepEqual(assigned, phaseIds);

  const programA = roadmap.programs.find(program => program.id === 'A');
  assert.equal(programA.state, 'in-progress');
  assert.equal(programA.implementationReady, true);
  assertRelativeRepositoryPath(programA.planPath);
  assert.equal(fs.existsSync(path.join(root, programA.planPath)), true);

  for (const program of roadmap.programs.filter(program => program.id !== 'A')) {
    assert.equal(program.state, 'planning-required');
    assert.equal(program.implementationReady, false);
    assert.ok(program.planningTaskId, `${program.id} requires an explicit planning task`);
    assert.equal('planPath' in program, false, `${program.id} cannot claim a plan before approval`);
  }
});

test('roadmap authority files exist and match their immutable Git blobs', () => {
  const roadmap = readJson('delegation/master-roadmap.json');
  for (const authority of Object.values(roadmap.authority)) {
    assertRelativeRepositoryPath(authority.path);
    const absolute = path.join(root, authority.path);
    assert.equal(fs.existsSync(absolute), true, `${authority.path} is missing`);
    assert.match(authority.commit, /^[a-f0-9]{40}$/);
    assert.match(authority.blob, /^[a-f0-9]{40}$/);
    assert.equal(git('rev-parse', `${authority.commit}:${authority.path}`), authority.blob);
    assert.equal(git('hash-object', `--path=${authority.path}`, authority.path), authority.blob);
  }
});

test('delegation chain has explicit empirical gates and no ready task without a plan', () => {
  const roadmap = readJson('delegation/master-roadmap.json');
  const requiredGates = [
    'contract-validation',
    'red-green-evidence',
    'scope-diff-guard',
    'independent-verifier',
    'immutable-artifact',
    'clean-checkout-drill',
    'cross-harness-replay',
    'human-editorial-gate',
    'blind-benchmark',
    'cost-telemetry'
  ];
  assert.deepEqual(roadmap.empiricalAssurance.map(gate => gate.id), requiredGates);

  for (const task of roadmap.planningTasks) {
    assert.equal(task.state, 'blocked');
    assert.ok(task.blockedBy.length > 0);
    task.inputs.forEach(assertRelativeRepositoryPath);
    task.outputs.forEach(assertRelativeRepositoryPath);
    assert.ok(task.acceptance.length >= 3);
  }

  for (const task of roadmap.activeProgramTasks) {
    if (task.state === 'ready') {
      assert.ok(task.planPath);
      assert.equal(fs.existsSync(path.join(root, task.planPath)), true);
      assert.ok(task.verifyCommand);
    }
  }
});

test('current handoff preserves dirty work and names the next bounded action', () => {
  const roadmap = readJson('delegation/master-roadmap.json');
  const handoff = readJson('delegation/current-handoff.json');
  assert.equal(handoff.schemaVersion, 1);
  assert.equal(handoff.mode, 'manual-bootstrap');
  assert.equal(handoff.branch, 'feat/program-a-continuity-antigravity');
  assert.equal(roadmap.activeProgramTasks.find(task => task.id === 'A-01').state, 'passed');
  assert.equal(roadmap.activeProgramTasks.find(task => task.id === 'A-02').state, 'passed');
  assert.equal(roadmap.activeProgramTasks.find(task => task.id === 'A-03').state, 'passed');
  assert.equal(roadmap.activeProgramTasks.find(task => task.id === 'A-04').state, 'passed');
  assert.equal(roadmap.activeProgramTasks.find(task => task.id === 'A-05').state, 'passed');
  assert.equal(roadmap.activeProgramTasks.find(task => task.id === 'A-06').state, 'ready');
  assert.equal(handoff.activeTask.id, 'A-06');
  assert.equal(handoff.activeTask.state, 'ready');
  assert.ok(handoff.activeTask.verifyCommands.length >= 1);
  assert.ok(handoff.preservePaths.includes('docs/DESIGN_CAPABILITY_ROADMAP_V2.md'));
  assert.ok(handoff.blockers.some(blocker => blocker.code === 'ANTIGRAVITY_CLI_UNAVAILABLE'));
  assert.ok(handoff.blockers.some(blocker => blocker.code === 'FULL_SUITE_BASELINE_RED'));
});
