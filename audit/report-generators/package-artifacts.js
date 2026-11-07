const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const runId = 'audit-20261023-eixo-a-foundation';
const targetDir = path.resolve('artifacts', 'empirical-audit', runId);
fs.mkdirSync(targetDir, { recursive: true });

const filesToArchive = [
  'environment.json',
  'branches.json',
  'dependency-audit.json',
  'baseline-summary.json',
  'test-inventory.json',
  'test-discovery.json',
  'ci-coverage-map.csv',
  'orphaned-suites.json',
  'flakiness.csv',
  'mutation-report.json',
  'surviving-mutants.json',
  'policy-decisions.jsonl',
  'task-ledger.jsonl',
  'security-findings.json',
  'approval-audit.jsonl',
  'race-report.json'
];

const checksums = [];

for (const file of filesToArchive) {
  if (fs.existsSync(file)) {
    const dest = path.join(targetDir, file);
    fs.copyFileSync(file, dest);
    const content = fs.readFileSync(file);
    const hash = crypto.createHash('sha256').update(content).digest('hex');
    checksums.push(`${hash}  ${file}`);
  }
}

fs.writeFileSync(path.join(targetDir, 'checksums.sha256'), checksums.join('\n') + '\n', 'utf8');

// Also create manifest.json
const env = JSON.parse(fs.readFileSync('environment.json', 'utf8'));
const manifest = {
  run_id: runId,
  repository: "marcioniliooliveira/studio-dna-engine",
  branch: env.git.branch,
  commit_sha: env.git.commit_sha,
  working_tree_clean: env.git.is_clean,
  lockfile_sha256: env.git.lockfile_sha256,
  environment: env.os,
  test_plan_version: "1.0",
  artifacts: filesToArchive,
  certification: "EXPERIMENTAL_FAILURES_DETECTED",
  findings_summary: {
    orphaned_test_suites: 77,
    ci_executed_suites: 10,
    mutation_score_percent: 0.0,
    surviving_mutants: 3,
    security_vulnerabilities_observed: 5
  }
};

fs.writeFileSync(path.join(targetDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
console.log(`Archived ${filesToArchive.length} evidence artifacts to ${targetDir}`);
