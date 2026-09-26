'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const test = require('node:test');

const { auditBaseline } = require('../src/continuity/baseline-audit');
const { initializeContinuity } = require('../scripts/init-continuity');

function write(filename, contents) {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, contents, 'utf8');
}

function createGitFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'continuity-baseline-'));
  const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
  git(['init', '--initial-branch=main']);
  git(['config', 'user.email', 'test@example.com']);
  git(['config', 'user.name', 'Continuity Test']);
  write(path.join(root, 'owned.txt'), 'committed\n');
  write(path.join(root, 'PROJECT_STATUS.md'), 'Full suite verified in an old release.\n');
  git(['add', '.']);
  git(['commit', '-m', 'fixture']);
  write(path.join(root, 'owned.txt'), 'modified\n');
  write(path.join(root, 'untracked.txt'), 'untracked\n');
  return { git, root };
}

test('baseline records dirty paths without treating them or historical claims as generated work', () => {
  const fixture = createGitFixture();
  const commands = [];
  try {
    const report = auditBaseline({
      workspaceRoot: fixture.root,
      runCommand(args) {
        commands.push(args);
        return fixture.git(args);
      }
    });

    assert.equal(report.epistemicStatus, 'observed');
    assert.equal(report.workspaceRoot, fixture.root);
    assert.equal(report.branch, 'main');
    assert.match(report.head, /^[a-f0-9]{40}$/);
    assert.deepEqual(report.dirtyPaths, ['owned.txt', 'untracked.txt']);
    assert.equal(report.claims.fullSuiteCurrent, false);
    assert.deepEqual(commands, [
      ['rev-parse', '--show-toplevel'],
      ['branch', '--show-current'],
      ['rev-parse', 'HEAD'],
      ['status', '--porcelain=v1', '-z'],
      ['log', '-1', '--format=%cI']
    ]);
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
});

test('baseline keeps paths with spaces intact when parsing porcelain output', () => {
  const fixture = createGitFixture();
  try {
    write(path.join(fixture.root, 'a path.txt'), 'untracked\n');
    const report = auditBaseline({ workspaceRoot: fixture.root, runCommand: fixture.git });
    assert.deepEqual(report.dirtyPaths, ['a path.txt', 'owned.txt', 'untracked.txt']);
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
});

test('initializer creates a checkable canonical seed without inventing passed task history', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'continuity-seed-'));
  try {
    const specPath = path.join(root, 'design.md');
    write(specPath, '# approved specification\n');
    const options = {
      workspaceRoot: root,
      specPath,
      clock: () => '2026-09-26T12:00:00.000Z'
    };
    initializeContinuity(options);

    const roadmap = JSON.parse(fs.readFileSync(path.join(root, 'continuity', 'ROADMAP.json'), 'utf8'));
    const currentState = JSON.parse(fs.readFileSync(path.join(root, 'continuity', 'CURRENT_STATE.json'), 'utf8'));
    const events = JSON.parse(fs.readFileSync(path.join(root, 'continuity', 'runs', 'event-ledger.json'), 'utf8'));
    assert.equal(roadmap.nodes.filter(node => node.id.startsWith('phase-')).length, 15);
    assert.equal(roadmap.nodes.find(node => node.id === 'A-01').state, 'verifying');
    assert.equal(roadmap.nodes.find(node => node.id === 'A-04').state, 'blocked');
    assert.equal(events.length, 1);
    assert.equal(currentState.lastEventHash, events[0].eventHash);
    assert.ok(fs.existsSync(path.join(root, 'continuity', 'tasks', 'program-a', 'A-11-conformance.task.json')));

    const beforeCheck = fs.readFileSync(path.join(root, 'continuity', 'ROADMAP.json'), 'utf8');
    assert.throws(() => initializeContinuity(options), /CONTINUITY_ALREADY_INITIALIZED/);
    initializeContinuity({ ...options, check: true });
    assert.equal(fs.readFileSync(path.join(root, 'continuity', 'ROADMAP.json'), 'utf8'), beforeCheck);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
