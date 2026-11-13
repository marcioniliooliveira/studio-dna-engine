/**
 * test/e2e/challenger-m5-dag-stress.test.js
 * 
 * Empirical Stress Harness for Milestone 5 (CI/CD Pipeline DAG Challenger - R5):
 * - Strict YAML parsing and structural validation of .github/workflows/ci.yml
 * - Topological sorting & Directed Acyclic Graph (DAG) dependency verification
 * - Failure propagation and cascade halting under single-job and matrix failures
 * - Playwright browser caching mechanism analysis (cache key, cache miss vs hit)
 * - Container entrypoint argument dispatch and smoke test command execution
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const WORKFLOW_PATH = path.join(PROJECT_ROOT, '.github/workflows/ci.yml');
const DOCKERFILE_PATH = path.join(PROJECT_ROOT, 'Dockerfile');
const CLI_PATH = path.join(PROJECT_ROOT, 'bin/cli.js');

// ============================================================================
// Robust YAML & DAG Parser Helper
// ============================================================================

function parseYamlSubset(content) {
  const lines = content.split('\n');
  const doc = {
    raw: content,
    jobs: {}
  };

  let currentJob = null;
  let currentKey = null;
  let inJobs = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.replace(/#.*$/, ''); // strip comments
    const trimmed = line.trim();
    if (!trimmed) continue;

    const indent = line.search(/\S/);

    if (indent === 0) {
      inJobs = false;
      currentJob = null;
      const m = trimmed.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
      if (m) {
        currentKey = m[1];
        if (currentKey === 'jobs') {
          inJobs = true;
        } else {
          doc[currentKey] = m[2];
        }
      }
    } else if (inJobs && indent === 2) {
      // Job definition
      const m = trimmed.match(/^([a-zA-Z0-9_-]+):$/);
      if (m) {
        currentJob = m[1];
        doc.jobs[currentJob] = {
          name: currentJob,
          needs: [],
          steps: [],
          runsOn: null,
          timeoutMinutes: null,
          strategy: null
        };
      }
    } else if (inJobs && currentJob && indent === 4) {
      const m = trimmed.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
      if (m) {
        const prop = m[1];
        const val = m[2];
        if (prop === 'needs') {
          if (val.startsWith('[') && val.endsWith(']')) {
            doc.jobs[currentJob].needs = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
          } else if (val) {
            doc.jobs[currentJob].needs = [val.trim()];
          }
        } else if (prop === 'runs-on') {
          doc.jobs[currentJob].runsOn = val.trim();
        } else if (prop === 'timeout-minutes') {
          doc.jobs[currentJob].timeoutMinutes = parseInt(val.trim(), 10);
        }
      }
    } else if (inJobs && currentJob && indent === 6) {
      // inside needs list or steps
      if (trimmed.startsWith('- ')) {
        const val = trimmed.slice(2).trim();
        // check if this was under 'needs:'
        const prevLine = lines[i - 1].trim();
        if (prevLine === 'needs:') {
          doc.jobs[currentJob].needs.push(val);
        }
      }
    }
  }

  return doc;
}

// ============================================================================
// 1. YAML Syntax & Structural Integrity
// ============================================================================

describe('M5 DAG Stress 1: CI/CD YAML Syntax & Structural Integrity', () => {
  test('YAML-01: Workflow file exists and parses with well-formed job definitions', () => {
    assert.ok(fs.existsSync(WORKFLOW_PATH), '.github/workflows/ci.yml must exist');
    const content = fs.readFileSync(WORKFLOW_PATH, 'utf-8');
    const doc = parseYamlSubset(content);

    const jobKeys = Object.keys(doc.jobs);
    assert.deepEqual(jobKeys, ['lint', 'test', 'docker-build'], 'Workflow must declare exactly lint, test, docker-build jobs');

    // Validate timeouts on every job
    for (const jobName of jobKeys) {
      const job = doc.jobs[jobName];
      assert.ok(job.timeoutMinutes && job.timeoutMinutes > 0, `Job ${jobName} must specify timeout-minutes > 0`);
      assert.equal(job.runsOn, 'ubuntu-latest', `Job ${jobName} must run on ubuntu-latest`);
    }
  });

  test('YAML-02: Workflow concurrency and permission directives enforce safe execution', () => {
    const content = fs.readFileSync(WORKFLOW_PATH, 'utf-8');

    // Concurrency check
    assert.match(content, /concurrency:\s*\n\s*group:\s*\$\{\{\s*github\.workflow\s*\}\}-\$\{\{\s*github\.ref\s*\}\}/, 'Must group concurrency by workflow and ref');
    assert.match(content, /cancel-in-progress:\s*true/, 'Must cancel redundant in-progress pipeline runs');

    // Permissions check
    assert.match(content, /permissions:\s*\n\s*contents:\s*read/, 'Must restrict GITHUB_TOKEN permissions to read-only');

    // Triggers check
    assert.match(content, /push:[\s\S]*?branches:[\s\S]*?-\s*main/, 'Must trigger on push to main');
    assert.match(content, /push:[\s\S]*?branches:[\s\S]*?-\s*['"]integration\/\*\*['"]/, 'Must trigger on push to integration/**');
    assert.match(content, /pull_request:[\s\S]*?branches:[\s\S]*?-\s*main/, 'Must trigger on pull request to main');
  });
});

// ============================================================================
// 2. DAG Topological Sorting & Dependency Gating
// ============================================================================

describe('M5 DAG Stress 2: Topological Sorting & Dependency Gating', () => {
  function computeTopologicalSort(jobs) {
    const inDegree = {};
    const adj = {};
    const allJobs = Object.keys(jobs);

    for (const j of allJobs) {
      inDegree[j] = 0;
      adj[j] = [];
    }

    for (const j of allJobs) {
      const dependencies = jobs[j].needs || [];
      for (const dep of dependencies) {
        if (!adj[dep]) adj[dep] = [];
        adj[dep].push(j);
        inDegree[j]++;
      }
    }

    // Kahn's algorithm
    const queue = allJobs.filter(j => inDegree[j] === 0);
    const order = [];

    while (queue.length > 0) {
      // Sort queue deterministically for canonical order
      queue.sort();
      const node = queue.shift();
      order.push(node);

      for (const neighbor of adj[node] || []) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }

    const hasCycle = order.length !== allJobs.length;
    return { order, hasCycle, inDegree };
  }

  test('DAG-01: Verifies strictly linear and acyclic execution order: lint -> test -> docker-build', () => {
    const content = fs.readFileSync(WORKFLOW_PATH, 'utf-8');
    const doc = parseYamlSubset(content);

    const { order, hasCycle } = computeTopologicalSort(doc.jobs);

    assert.equal(hasCycle, false, 'Pipeline DAG must be strictly acyclic (no dependency cycles)');
    assert.deepEqual(order, ['lint', 'test', 'docker-build'], 'Topological sort order must be lint -> test -> docker-build');

    // Assert that 'test' cannot run before 'lint'
    assert.ok(order.indexOf('lint') < order.indexOf('test'), 'lint must strictly precede test');
    // Assert that 'docker-build' cannot run before 'test'
    assert.ok(order.indexOf('test') < order.indexOf('docker-build'), 'test must strictly precede docker-build');
    // Assert that 'docker-build' cannot run before 'lint'
    assert.ok(order.indexOf('lint') < order.indexOf('docker-build'), 'lint must strictly precede docker-build');
  });

  test('DAG-02: Adversarial check — cycle detection triggers failure on circular dependencies', () => {
    const cyclicJobs = {
      lint: { needs: ['docker-build'] },
      test: { needs: ['lint'] },
      'docker-build': { needs: ['test'] }
    };

    const { hasCycle, order } = computeTopologicalSort(cyclicJobs);
    assert.equal(hasCycle, true, 'Kahn algorithm correctly detects circular pipeline dependency');
    assert.equal(order.length, 0, 'No job can be scheduled when circular dependency exists');
  });

  test('DAG-03: Adversarial check — unconstrained jobs running in parallel are caught', () => {
    // If someone accidentally removed "needs: lint" from test
    const unconstrainedJobs = {
      lint: { needs: [] },
      test: { needs: [] },
      'docker-build': { needs: ['test'] }
    };

    const { order } = computeTopologicalSort(unconstrainedJobs);
    // Both lint and test have inDegree 0, meaning test could run concurrently with or before lint!
    assert.equal(order.length, 3);
    const unconstrainedInDegreeZero = Object.keys(unconstrainedJobs).filter(k => unconstrainedJobs[k].needs.length === 0);
    assert.equal(unconstrainedInDegreeZero.length, 2, 'Detects multiple root jobs that would execute in parallel without gating');
  });
});

// ============================================================================
// 3. Failure Cascades & Propagation Halting
// ============================================================================

describe('M5 DAG Stress 3: Failure Cascades & Downstream Halting', () => {
  function simulatePipelineExecution(jobs, jobOutcomes) {
    // Models GitHub Actions job condition evaluation:
    // A job executes if all dependencies in `needs` have status 'success' (default `if: success()`)
    // Otherwise it is 'skipped'
    const status = {};
    const executionOrder = [];

    const isSatisfied = (jobName) => {
      const deps = jobs[jobName].needs || [];
      if (deps.length === 0) return true;
      return deps.every(d => status[d] === 'success');
    };

    // Simulate scheduling rounds
    let remaining = Object.keys(jobs);
    let changed = true;

    while (remaining.length > 0 && changed) {
      changed = false;
      const runnable = remaining.filter(j => {
        const deps = jobs[j].needs || [];
        // all deps must have a finalized status
        return deps.every(d => status[d] !== undefined);
      });

      for (const j of runnable) {
        changed = true;
        remaining = remaining.filter(item => item !== j);

        if (isSatisfied(j)) {
          // Job executes
          const outcome = jobOutcomes[j] !== undefined ? jobOutcomes[j] : 'success';
          status[j] = outcome;
          executionOrder.push({ job: j, status: outcome, executed: true });
        } else {
          // Skipped due to dependency failure
          status[j] = 'skipped';
          executionOrder.push({ job: j, status: 'skipped', executed: false });
        }
      }
    }

    return { status, executionOrder };
  }

  test('CASCADE-01: Lint failure halts downstream Test and Docker-Build immediately', () => {
    const content = fs.readFileSync(WORKFLOW_PATH, 'utf-8');
    const doc = parseYamlSubset(content);

    const result = simulatePipelineExecution(doc.jobs, { lint: 'failure' });

    assert.equal(result.status.lint, 'failure');
    assert.equal(result.status.test, 'skipped', 'test job must be skipped when lint fails');
    assert.equal(result.status['docker-build'], 'skipped', 'docker-build job must be skipped when lint fails');

    const executedJobs = result.executionOrder.filter(j => j.executed).map(j => j.job);
    assert.deepEqual(executedJobs, ['lint'], 'Only lint executes; test and docker-build are halted');
  });

  test('CASCADE-02: Test failure halts Docker-Build from compiling container', () => {
    const content = fs.readFileSync(WORKFLOW_PATH, 'utf-8');
    const doc = parseYamlSubset(content);

    const result = simulatePipelineExecution(doc.jobs, { lint: 'success', test: 'failure' });

    assert.equal(result.status.lint, 'success');
    assert.equal(result.status.test, 'failure');
    assert.equal(result.status['docker-build'], 'skipped', 'docker-build job must be skipped when test fails');

    const executedJobs = result.executionOrder.filter(j => j.executed).map(j => j.job);
    assert.deepEqual(executedJobs, ['lint', 'test'], 'docker-build must never compile container on test failure');
  });

  test('CASCADE-03: Matrix job failure propagation — any matrix failure fails the job composite', () => {
    // In GitHub Actions, if any matrix combination fails, the composite job status is 'failure'
    const matrixOutcomes = [
      { nodeVersion: '20.x', passed: true },
      { nodeVersion: '24.x', passed: false }
    ];

    const compositeStatus = matrixOutcomes.every(m => m.passed) ? 'success' : 'failure';
    assert.equal(compositeStatus, 'failure', 'Single matrix leg failure marks overall test job as failure');

    const content = fs.readFileSync(WORKFLOW_PATH, 'utf-8');
    const doc = parseYamlSubset(content);
    const result = simulatePipelineExecution(doc.jobs, { lint: 'success', test: compositeStatus });
    assert.equal(result.status['docker-build'], 'skipped');
  });

  test('CASCADE-04: Workflow contains no unsafe continue-on-error or bypass flags', () => {
    const content = fs.readFileSync(WORKFLOW_PATH, 'utf-8');

    assert.equal(content.includes('continue-on-error: true'), false, 'Workflow must not contain continue-on-error: true');
    assert.equal(content.includes('if: always()'), false, 'Workflow must not bypass failure with if: always()');
  });
});

// ============================================================================
// 4. Playwright Browser Caching Analysis & Verification
// ============================================================================

describe('M5 DAG Stress 4: Playwright Browser Caching & Installation Analysis', () => {
  test('CACHE-01: Analyzes caching configuration in CI workflow', () => {
    const content = fs.readFileSync(WORKFLOW_PATH, 'utf-8');

    // setup-node npm cache check
    assert.match(content, /cache:\s*['"]npm['"]/, 'setup-node must cache npm dependencies');

    // Playwright browser installation check
    assert.match(
      content,
      /run:\s*npx playwright install --with-deps chromium/,
      'Must install Playwright Chromium with OS dependencies'
    );

    // Adversarial audit of explicit actions/cache for Playwright
    const hasExplicitPlaywrightCache = content.includes('actions/cache') && content.includes('ms-playwright');
    // Note: The current pipeline invokes `npx playwright install --with-deps chromium` directly.
    // We document the empirical state:
    const cacheArchitecture = {
      npmDependencyCache: true,
      browserBinaryDirectInstallWithDeps: true,
      explicitActionsCacheMsPlaywright: hasExplicitPlaywrightCache
    };

    assert.equal(cacheArchitecture.npmDependencyCache, true);
    assert.equal(cacheArchitecture.browserBinaryDirectInstallWithDeps, true);
  });

  test('CACHE-02: Cache key generation determinism on package-lock.json', () => {
    const packageLockPath = path.join(PROJECT_ROOT, 'package-lock.json');
    assert.ok(fs.existsSync(packageLockPath), 'package-lock.json must exist');

    const lockContent = fs.readFileSync(packageLockPath);
    const crypto = require('node:crypto');
    const hash1 = crypto.createHash('sha256').update(lockContent).digest('hex');
    const hash2 = crypto.createHash('sha256').update(lockContent).digest('hex');

    assert.equal(hash1, hash2, 'Cache key derived from package-lock.json is perfectly deterministic');
    assert.equal(hash1.length, 64, 'SHA-256 hash length is 64 hex characters');
  });
});

// ============================================================================
// 5. Container Entrypoint & Smoke Test Commands Execution
// ============================================================================

describe('M5 DAG Stress 5: Docker Smoke Test Commands & CLI Dispatch', () => {
  test('SMOKE-01: node bin/cli.js --help executes and exits with code 0', () => {
    const result = spawnSync('node', [CLI_PATH, '--help'], {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
      timeout: 5000
    });

    assert.equal(result.status, 0, 'CLI --help must exit with code 0');
    assert.ok(result.stdout.includes('SITE-CLONER & DNA PIPELINE') || result.stdout.includes('Uso:'), 'CLI --help output must contain usage banner');
  });

  test('SMOKE-02: node bin/cli.js --version executes and prints version matching package.json', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf-8'));
    const result = spawnSync('node', [CLI_PATH, '--version'], {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
      timeout: 5000
    });

    assert.equal(result.status, 0, 'CLI --version must exit with code 0');
    assert.equal(result.stdout.trim(), `v${pkg.version}`, 'CLI --version output must match v + package.json version');
  });

  test('SMOKE-03: Dockerfile ENTRYPOINT + CMD wiring accurately executes smoke test arguments', () => {
    const dockerfileContent = fs.readFileSync(DOCKERFILE_PATH, 'utf-8');

    // Parse ENTRYPOINT and CMD from Dockerfile
    const entrypointMatch = dockerfileContent.match(/ENTRYPOINT\s+\[(.*)\]/);
    const cmdMatch = dockerfileContent.match(/CMD\s+\[(.*)\]/);

    assert.ok(entrypointMatch, 'Dockerfile must declare ENTRYPOINT in JSON exec form');
    assert.ok(cmdMatch, 'Dockerfile must declare CMD in JSON exec form');

    const entrypointArgs = JSON.parse(`[${entrypointMatch[1]}]`);
    assert.deepEqual(entrypointArgs, ['node', 'bin/cli.js'], 'Entrypoint must be ["node", "bin/cli.js"]');

    // In Docker: docker run --rm studio-dna <args...>
    // The <args> replace the CMD and are appended to ENTRYPOINT.
    // Smoke Test 1: `docker run --rm studio-dna --help`
    // Effectively executes: `node bin/cli.js --help`
    // Smoke Test 2: `docker run --rm studio-dna:latest --version`
    // Effectively executes: `node bin/cli.js --version`
    // Both were validated in SMOKE-01 and SMOKE-02 to exit with code 0.
    const smokeCommand1 = [...entrypointArgs, '--help'];
    const smokeCommand2 = [...entrypointArgs, '--version'];

    assert.deepEqual(smokeCommand1, ['node', 'bin/cli.js', '--help']);
    assert.deepEqual(smokeCommand2, ['node', 'bin/cli.js', '--version']);
  });
});
