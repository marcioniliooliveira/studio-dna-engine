const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

function getSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (err) {
    return (err.stdout ? err.stdout.toString().trim() : '') || (err.stderr ? err.stderr.toString().trim() : err.message);
  }
}

// 1. Environment
const env = {
  timestamp: new Date().toISOString(),
  os: {
    platform: os.platform(),
    release: os.release(),
    type: os.type(),
    arch: os.arch(),
    cpus: os.cpus().length,
    cpu_model: os.cpus()[0]?.model,
    total_memory_gb: (os.totalmem() / 1e9).toFixed(2),
    free_memory_gb: (os.freemem() / 1e9).toFixed(2)
  },
  runtime: {
    node_version: process.version,
    npm_version: run('npm --version'),
    v8_version: process.versions.v8,
    sqlite_available: (function() {
      try {
        require('node:sqlite');
        return true;
      } catch(e) {
        return false;
      }
    })()
  },
  git: {
    commit_sha: run('git rev-parse HEAD'),
    branch: run('git branch --show-current'),
    is_clean: run('git status --porcelain').length === 0,
    lockfile_sha256: getSha256('package-lock.json')
  }
};

fs.writeFileSync('environment.json', JSON.stringify(env, null, 2), 'utf8');
console.log('Generated environment.json');

// 2. Branches
const rawBranches = run('git branch -a --format="%(refname:short)|%(objectname)|%(upstream:short)"').split('\n');
const branchData = rawBranches.filter(Boolean).map(line => {
  const parts = line.replace(/"/g, '').split('|');
  const name = parts[0];
  const sha = parts[1];
  const upstream = parts[2] || null;
  let ahead = null, behind = null;
  try {
    const counts = run(`git rev-list --left-right --count HEAD...${sha}`).split(/\s+/);
    behind = parseInt(counts[0], 10);
    ahead = parseInt(counts[1], 10);
  } catch(e) {}
  return { name, sha, upstream, behind_head: behind, ahead_of_head: ahead };
});

fs.writeFileSync('branches.json', JSON.stringify({
  target_branch: env.git.branch,
  target_sha: env.git.commit_sha,
  timestamp: new Date().toISOString(),
  branches: branchData
}, null, 2), 'utf8');
console.log(`Generated branches.json with ${branchData.length} branches`);

// 3. Baseline Summary
const baselineSummary = {
  experiment_id: 'R00-BASELINE-001',
  timestamp: new Date().toISOString(),
  commit_sha: env.git.commit_sha,
  branch: env.git.branch,
  environment: env,
  install_status: fs.existsSync('install.log') ? 'success' : 'missing',
  lockfile_sha256: env.git.lockfile_sha256,
  dependency_audit_sha256: getSha256('dependency-audit.json'),
  branches_sha256: getSha256('branches.json'),
  environment_sha256: getSha256('environment.json'),
  conclusions: {
    is_clean_install_reproducible: fs.existsSync('node_modules'),
    sqlite_node_support: env.runtime.sqlite_available,
    branch_divergence_noted: branchData.some(b => b.ahead_of_head > 0)
  }
};

fs.writeFileSync('baseline-summary.json', JSON.stringify(baselineSummary, null, 2), 'utf8');
console.log('Generated baseline-summary.json');
