const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function runTest(testCmd) {
  try {
    execSync(testCmd, { stdio: ['pipe', 'pipe', 'pipe'], encoding: 'utf8', timeout: 15000 });
    return { passed: true };
  } catch (err) {
    return { passed: false, error: err.message };
  }
}

// 1. Flakiness analysis: Run contract & orchestration suite 5 times repeatedly
console.log('Testing flakiness on core suites...');
const testCmd = 'node --test test/task-contract.test.js test/task-contract-v2.test.js test/workflow-orchestrator.test.js';
const flakinessRecords = [];

for (let i = 1; i <= 5; i++) {
  const start = Date.now();
  const res = runTest(testCmd);
  const duration = Date.now() - start;
  flakinessRecords.push({
    iteration: i,
    passed: res.passed,
    duration_ms: duration,
    error: res.passed ? null : res.error
  });
}

const flakinessCsvRows = ['Iteration,Passed,DurationMs,Error'];
for (const r of flakinessRecords) {
  flakinessCsvRows.push(`${r.iteration},${r.passed},${r.duration_ms},"${r.error || ''}"`);
}
fs.writeFileSync('flakiness.csv', flakinessCsvRows.join('\n'), 'utf8');
console.log('Generated flakiness.csv');

// 2. Controlled Mutation Testing on Core Modules
console.log('Running controlled mutation testing on orchestration modules...');

const mutations = [
  {
    id: 'MUT-01-DAG-LOCKS',
    file: 'src/orchestration/dag-scheduler.js',
    description: 'Bypass path intersection check in dag-scheduler (always return false)',
    original: 'function pathsIntersect(p1, p2) {',
    mutated: 'function pathsIntersect(p1, p2) { return false;'
  },
  {
    id: 'MUT-02-DAG-CONFLICTS',
    file: 'src/orchestration/dag-scheduler.js',
    description: 'Disable conflict detection between tasks (always return false)',
    original: 'function tasksConflict(taskA, taskB) {',
    mutated: 'function tasksConflict(taskA, taskB) { return false;'
  },
  {
    id: 'MUT-03-BLUEPRINT-CYCLES',
    file: 'src/orchestration/blueprint.js',
    description: 'Disable cycle detection in blueprint validator',
    original: 'if (state.get(id) === 1) throw new TypeError(`task dependency graph contains a cycle at: ${id}`);',
    mutated: '// cycle check disabled'
  },
  {
    id: 'MUT-04-CONTRACT-PATH-TRAVERSAL',
    file: 'src/orchestration/task-contract-v2.js',
    description: 'Disable path traversal protection (.. check)',
    original: "if (part === '..' || part === '.') throw new TypeError(`${path} must not contain relative segments`);",
    mutated: '// traversal check disabled'
  },
  {
    id: 'MUT-05-CONTRACT-WRITE-ALLOWLIST',
    file: 'src/orchestration/task-contract-v2.js',
    description: 'Allow writing to read-only copias/ directory',
    original: "if (part === 'copias') throw new TypeError(`${path} must not write to read-only directories`);",
    mutated: '// copias write allowed'
  }
];

const mutationResults = [];
const survivingMutants = [];

for (const m of mutations) {
  const filePath = path.resolve(m.file);
  const originalCode = fs.readFileSync(filePath, 'utf8');

  if (!originalCode.includes(m.original)) {
    console.warn(`Could not locate target for ${m.id} in ${m.file}`);
    continue;
  }

  // Apply mutation
  const mutatedCode = originalCode.replace(m.original, m.mutated);
  fs.writeFileSync(filePath, mutatedCode, 'utf8');

  // Run test suite
  const res = runTest(testCmd);

  // Restore original immediately
  fs.writeFileSync(filePath, originalCode, 'utf8');

  const killed = !res.passed;
  mutationResults.push({
    id: m.id,
    file: m.file,
    description: m.description,
    killed,
    status: killed ? 'KILLED' : 'SURVIVED'
  });

  if (!killed) {
    survivingMutants.push({
      id: m.id,
      file: m.file,
      description: m.description,
      implication: 'Defeito introduzido não foi detectado pela suíte de testes existente!'
    });
  }
}

const mutationScore = ((mutationResults.filter(r => r.killed).length / mutationResults.length) * 100).toFixed(1);

fs.writeFileSync('mutation-report.json', JSON.stringify({
  timestamp: new Date().toISOString(),
  total_mutants: mutationResults.length,
  killed_mutants: mutationResults.filter(r => r.killed).length,
  survived_mutants: survivingMutants.length,
  mutation_score_percent: parseFloat(mutationScore),
  mutations: mutationResults
}, null, 2), 'utf8');

fs.writeFileSync('surviving-mutants.json', JSON.stringify({
  timestamp: new Date().toISOString(),
  count: survivingMutants.length,
  surviving_mutants: survivingMutants
}, null, 2), 'utf8');

console.log(`Mutation Score: ${mutationScore}% (${mutationResults.filter(r => r.killed).length}/${mutationResults.length} killed).`);
console.log(`Surviving Mutants: ${survivingMutants.length}`);
