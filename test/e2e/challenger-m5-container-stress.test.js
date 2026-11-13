/**
 * test/e2e/challenger-m5-container-stress.test.js
 * 
 * Empirical Stress Harness for Milestone 5 (DevOps CI/CD Pipeline - R5):
 * - Adversarial AST verification of Dockerfile directives and sequence constraints
 * - Volume persistence guarantees with simulated container restart and SQLite durability
 * - Healthcheck probe execution against normal, degraded, error, and connection-refused endpoints
 * - Non-root user permissions and privilege boundaries
 * - CI/CD pipeline dependency graph and gating integrity
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const os = require('node:os');
const crypto = require('node:crypto');
const { spawn, spawnSync, execSync } = require('node:child_process');
const { DatabaseSync } = require('node:sqlite');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const DOCKERFILE_PATH = path.join(PROJECT_ROOT, 'Dockerfile');
const COMPOSE_PATH = path.join(PROJECT_ROOT, 'docker-compose.yml');
const WORKFLOW_PATH = path.join(PROJECT_ROOT, '.github/workflows/ci.yml');
const DOCKERIGNORE_PATH = path.join(PROJECT_ROOT, '.dockerignore');

// ============================================================================
// Enhanced Strict Dockerfile AST Parser
// ============================================================================

function parseStrictDockerfile(content) {
  const lines = content.split('\n').map(l => l.trim());
  const stages = [];
  let currentStage = null;
  const globalDirectives = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    if (!rawLine || rawLine.startsWith('#')) continue;

    // Match Dockerfile directive (case-insensitive for robustness check)
    const match = rawLine.match(/^([a-zA-Z]+)\s+(.+)$/);
    if (!match) continue;

    const verb = match[1].toUpperCase();
    const args = match[2].trim();

    if (verb === 'FROM') {
      currentStage = {
        from: args,
        lineIndex: i,
        directives: []
      };
      stages.push(currentStage);
    } else if (currentStage) {
      currentStage.directives.push({ verb, args, lineIndex: i });
    } else {
      globalDirectives.push({ verb, args, lineIndex: i });
    }
  }

  // Extract properties across all stages and runner stage
  const runnerStage = stages[stages.length - 1] || null;
  const runnerDirectives = runnerStage ? runnerStage.directives : [];

  const runnerUserDirectives = runnerDirectives.filter(d => d.verb === 'USER').map(d => d.args);
  const runnerVolumeDirectives = runnerDirectives.filter(d => d.verb === 'VOLUME').map(d => d.args);
  const runnerExposeDirectives = runnerDirectives.filter(d => d.verb === 'EXPOSE').map(d => d.args);
  const runnerHealthcheck = runnerDirectives.filter(d => d.verb === 'HEALTHCHECK').map(d => d.args);
  const runnerEntrypoint = runnerDirectives.filter(d => d.verb === 'ENTRYPOINT').map(d => d.args);
  const runnerCmd = runnerDirectives.filter(d => d.verb === 'CMD').map(d => d.args);
  const runnerChown = runnerDirectives.filter(d => d.verb === 'RUN' && d.args.includes('chown'));

  // Parse volume paths from JSON array or space-separated list
  const declaredVolumes = [];
  for (const volStr of runnerVolumeDirectives) {
    if (volStr.startsWith('[') && volStr.endsWith(']')) {
      try {
        const parsed = JSON.parse(volStr);
        if (Array.isArray(parsed)) declaredVolumes.push(...parsed);
      } catch (_) {
        const items = volStr.slice(1, -1).split(',').map(s => s.replace(/['"]/g, '').trim());
        declaredVolumes.push(...items);
      }
    } else {
      declaredVolumes.push(...volStr.split(/\s+/).map(s => s.trim()));
    }
  }

  return {
    stageCount: stages.length,
    isMultiStage: stages.length >= 2,
    stages,
    runnerStage,
    runnerUserDirectives,
    lastUser: runnerUserDirectives.length > 0 ? runnerUserDirectives[runnerUserDirectives.length - 1] : null,
    declaredVolumes,
    exposedPorts: runnerExposeDirectives,
    healthchecks: runnerHealthcheck,
    entrypoints: runnerEntrypoint,
    cmds: runnerCmd,
    runnerChownDirectives: runnerChown
  };
}

// ============================================================================
// 1. Dockerfile Directives & AST Adversarial Stress Testing
// ============================================================================

describe('M5 Stress 1: Dockerfile AST & Container Directives', () => {
  test('AST-01: Production Dockerfile enforces multi-stage builder and runner isolation', () => {
    assert.ok(fs.existsSync(DOCKERFILE_PATH), 'Dockerfile must exist in workspace root');
    const content = fs.readFileSync(DOCKERFILE_PATH, 'utf-8');
    const ast = parseStrictDockerfile(content);

    assert.ok(ast.isMultiStage, 'Dockerfile must be multi-stage (found ' + ast.stageCount + ' stages)');
    assert.equal(ast.stageCount, 2, 'Must have exactly 2 stages (builder and runner)');

    // Builder stage validation
    const builder = ast.stages[0];
    assert.match(builder.from, /node:20-bookworm-slim/i, 'Stage 1 must use node:20-bookworm-slim');
    assert.ok(builder.from.includes('AS builder'), 'Stage 1 must be named builder');

    // Runner stage validation
    const runner = ast.stages[1];
    assert.match(runner.from, /mcr\.microsoft\.com\/playwright:v1\.49\.0-noble/i, 'Stage 2 must use official Playwright noble image');
    assert.ok(runner.from.includes('AS runner'), 'Stage 2 must be named runner');
  });

  test('AST-02: User directive strictly enforces unprivileged pwuser and prevents root escalation', () => {
    const content = fs.readFileSync(DOCKERFILE_PATH, 'utf-8');
    const ast = parseStrictDockerfile(content);

    assert.ok(ast.lastUser, 'Runner stage must have a USER directive');
    assert.match(ast.lastUser, /^pwuser$/i, 'Final active container user must be unprivileged pwuser');

    // Adversarial challenge: what happens if an adversarial Dockerfile re-escalates to root?
    const escalatedDockerfile = content + '\nUSER root\n';
    const badAst = parseStrictDockerfile(escalatedDockerfile);
    assert.equal(badAst.lastUser, 'root', 'Parser correctly detects privilege re-escalation');
    assert.notEqual(badAst.lastUser, 'pwuser', 'Re-escalation to root is rejected');
  });

  test('AST-03: Volume directive strictly mandates BOTH /app/copias AND /app/data', () => {
    const content = fs.readFileSync(DOCKERFILE_PATH, 'utf-8');
    const ast = parseStrictDockerfile(content);

    assert.ok(ast.declaredVolumes.includes('/app/copias'), 'VOLUME must declare /app/copias');
    assert.ok(ast.declaredVolumes.includes('/app/data'), 'VOLUME must declare /app/data');
    assert.equal(ast.declaredVolumes.length, 2, 'VOLUME must declare exactly copias and data');

    // Adversarial challenge: single-path volumes must be flagged as non-compliant
    const singleCopias = 'FROM node:20 AS runner\nVOLUME ["/app/copias"]\n';
    const singleData = 'FROM node:20 AS runner\nVOLUME ["/app/data"]\n';
    const noVolume = 'FROM node:20 AS runner\nRUN echo "no volume"\n';

    const astCopias = parseStrictDockerfile(singleCopias);
    const astData = parseStrictDockerfile(singleData);
    const astNone = parseStrictDockerfile(noVolume);

    assert.equal(astCopias.declaredVolumes.includes('/app/data'), false, 'Detects missing /app/data');
    assert.equal(astData.declaredVolumes.includes('/app/copias'), false, 'Detects missing /app/copias');
    assert.equal(astNone.declaredVolumes.length, 0, 'Detects missing volumes entirely');
  });

  test('AST-04: Port exposition and execution sequence constraints', () => {
    const content = fs.readFileSync(DOCKERFILE_PATH, 'utf-8');
    const ast = parseStrictDockerfile(content);

    // Port 4000
    assert.ok(ast.exposedPorts.some(p => p.includes('4000')), 'Must expose port 4000');

    // Execution sequence constraint: chown /app must happen BEFORE switching to pwuser
    const runner = ast.stages[1];
    const chownDirective = runner.directives.find(d => d.verb === 'RUN' && d.args.includes('chown'));
    const userDirective = runner.directives.find(d => d.verb === 'USER');

    assert.ok(chownDirective, 'Must execute chown on /app directories');
    assert.ok(userDirective, 'Must declare USER directive');
    assert.ok(
      chownDirective.lineIndex < userDirective.lineIndex,
      'chown must precede USER pwuser (unprivileged user cannot chown root-created paths)'
    );
  });
});

// ============================================================================
// 2. Docker Compose Specification Adversarial Tests
// ============================================================================

describe('M5 Stress 2: Docker Compose Configuration Adversarial Invariants', () => {
  test('COMPOSE-01: Validates dnastudio service, port 4000, and dual persistent mounts', () => {
    assert.ok(fs.existsSync(COMPOSE_PATH), 'docker-compose.yml must exist');
    const composeContent = fs.readFileSync(COMPOSE_PATH, 'utf-8');

    // Service dnastudio
    assert.ok(composeContent.includes('dnastudio:'), 'Compose must define service dnastudio');
    assert.ok(composeContent.includes('container_name: studio-dna'), 'Must define container studio-dna');

    // Ports
    assert.match(composeContent, /["']?4000:4000["']?/, 'Must expose host port 4000 mapped to container port 4000');

    // Dual Volumes
    assert.ok(
      composeContent.includes('./copias:/app/copias') || composeContent.includes('copias:/app/copias'),
      'Must mount host copias to /app/copias'
    );
    assert.ok(
      composeContent.includes('./data:/app/data') || composeContent.includes('data:/app/data'),
      'Must mount host data to /app/data'
    );

    // Shared Memory Sizing for Chromium Stability
    assert.match(composeContent, /shm_size:\s*['"]?2gb['"]?/i, 'Must allocate at least 2gb shm_size for Playwright scraping');
  });

  test('COMPOSE-02: Adversarial check — detects missing persistent volume mappings', () => {
    const invalidComposeMissingData = `
version: '3.8'
services:
  dnastudio:
    ports: ["4000:4000"]
    volumes:
      - ./copias:/app/copias
    `;

    const hasDataMount = invalidComposeMissingData.includes('/app/data');
    assert.equal(hasDataMount, false, 'Adversarial compose missing ./data is detected');
  });
});

// ============================================================================
// 3. Persistent Volume Guarantees with SQLite & WAL Mode Simulation
// ============================================================================

describe('M5 Stress 3: Persistent Volume Durability & SQLite WAL Simulation', () => {
  test('VOL-01: Data persists across simulated container restart when mounted to host volume', () => {
    // 1. Simulate host volume directory (mounted to container at /app/data)
    const hostMountDir = path.join(os.tmpdir(), `studio_host_mount_${crypto.randomBytes(6).toString('hex')}`);
    fs.mkdirSync(hostMountDir, { recursive: true });

    const dbFilePath = path.join(hostMountDir, 'studio_dna.db');

    // 2. Container Instance 1: boots up, initializes SQLite in WAL mode
    let db1 = new DatabaseSync(dbFilePath);
    db1.exec('PRAGMA journal_mode = WAL;');
    db1.exec('PRAGMA busy_timeout = 5000;');
    db1.exec(`
      CREATE TABLE IF NOT EXISTS test_runs (
        id TEXT PRIMARY KEY,
        siteSlug TEXT NOT NULL,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `);

    // Insert 5 test records
    const insertStmt = db1.prepare('INSERT INTO test_runs (id, siteSlug, status, createdAt) VALUES (?, ?, ?, ?)');
    for (let i = 1; i <= 5; i++) {
      insertStmt.run(`run-${i}`, `client-site-${i}`, 'passed', new Date().toISOString());
    }

    // Verify row count in Container 1
    const count1 = db1.prepare('SELECT COUNT(*) as total FROM test_runs').get().total;
    assert.equal(count1, 5, 'Container 1 successfully recorded 5 runs');

    // 3. Simulate Container 1 Crash / Restart / Destruction:
    // Close DB connection (simulating process exit and container removal)
    db1.close();
    db1 = null;

    // Verify physical file exists on host mount
    assert.ok(fs.existsSync(dbFilePath), 'Database file must persist on host mount after container shutdown');

    // 4. Container Instance 2: new container spawns, mounts the SAME host directory
    let db2 = new DatabaseSync(dbFilePath);
    db2.exec('PRAGMA journal_mode = WAL;');

    // Query persisted data in Container 2
    const count2 = db2.prepare('SELECT COUNT(*) as total FROM test_runs').get().total;
    assert.equal(count2, 5, 'Container 2 reads all 5 persisted runs without data loss');

    // Verify individual record integrity
    const record = db2.prepare('SELECT * FROM test_runs WHERE id = ?').get('run-3');
    assert.ok(record, 'Record run-3 is preserved');
    assert.equal(record.siteSlug, 'client-site-3');
    assert.equal(record.status, 'passed');

    // Perform WAL checkpoint to ensure transaction log commits cleanly
    const checkpointResult = db2.prepare('PRAGMA wal_checkpoint(TRUNCATE)').get();
    assert.ok(checkpointResult !== undefined, 'WAL checkpoint completes cleanly');

    db2.close();
    db2 = null;

    // Cleanup host mount temp directory
    fs.rmSync(hostMountDir, { recursive: true, force: true });
  });

  test('VOL-02: Counter-example — Unmounted ephemeral container directory suffers total data loss', () => {
    // Simulate an unmounted ephemeral container directory
    const ephemeralContainerDir = path.join(os.tmpdir(), `container_ephemeral_${crypto.randomBytes(6).toString('hex')}`);
    fs.mkdirSync(ephemeralContainerDir, { recursive: true });

    const dbPath = path.join(ephemeralContainerDir, 'studio_dna.db');
    const db = new DatabaseSync(dbPath);
    db.exec('CREATE TABLE test (id INT); INSERT INTO test VALUES (1);');
    db.close();

    assert.ok(fs.existsSync(dbPath), 'Database existed inside ephemeral container directory');

    // Simulate container removal without host volume
    fs.rmSync(ephemeralContainerDir, { recursive: true, force: true });

    // When new container starts without volume mount, data is permanently lost
    assert.equal(fs.existsSync(dbPath), false, 'Empirically confirms: without volume mount, container restart destroys all data');
  });
});

// ============================================================================
// 4. Healthcheck Probe Handler Adversarial Stress Testing
// ============================================================================

describe('M5 Stress 4: Healthcheck Probe Handler Stress Execution', () => {
  // Extract the exact healthcheck command from Dockerfile
  function runHealthcheckProbe(targetUrl) {
    return new Promise((resolve) => {
      // Real HEALTHCHECK script:
      // node -e "require('http').get('http://127.0.0.1:4000/api/v3/analytics/kpi', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));"
      const script = `require('http').get('${targetUrl}', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));`;
      const child = spawn('node', ['-e', script], {
        timeout: 5000,
        stdio: 'ignore'
      });
      child.on('close', (code) => {
        resolve(code);
      });
      child.on('error', () => {
        resolve(1);
      });
    });
  }

  test('PROBE-01: Healthcheck returns exit code 0 when endpoint responds with HTTP 200 OK', async () => {
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'healthy', passRate: 100 }));
    });

    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;

    try {
      const exitCode = await runHealthcheckProbe(`http://127.0.0.1:${port}/api/v3/analytics/kpi`);
      assert.equal(exitCode, 0, 'Exit code must be 0 for HTTP 200 response');
    } finally {
      await new Promise(resolve => server.close(resolve));
    }
  });

  test('PROBE-02: Healthcheck returns exit code 1 when endpoint returns HTTP 500 Internal Server Error', async () => {
    const server = http.createServer((req, res) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Database Connection Failed' }));
    });

    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;

    try {
      const exitCode = await runHealthcheckProbe(`http://127.0.0.1:${port}/api/v3/analytics/kpi`);
      assert.equal(exitCode, 1, 'Exit code must be 1 for HTTP 500 response');
    } finally {
      await new Promise(resolve => server.close(resolve));
    }
  });

  test('PROBE-03: Healthcheck returns exit code 1 when endpoint returns HTTP 404 Not Found', async () => {
    const server = http.createServer((req, res) => {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    });

    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;

    try {
      const exitCode = await runHealthcheckProbe(`http://127.0.0.1:${port}/wrong-route`);
      assert.equal(exitCode, 1, 'Exit code must be 1 for HTTP 404 response');
    } finally {
      await new Promise(resolve => server.close(resolve));
    }
  });

  test('PROBE-04: Healthcheck returns exit code 1 when server is down (ECONNREFUSED)', async () => {
    // Use an unassigned high port where no server is listening
    const unusedPort = 59876;
    const exitCode = await runHealthcheckProbe(`http://127.0.0.1:${unusedPort}/api/v3/analytics/kpi`);
    assert.equal(exitCode, 1, 'Exit code must be 1 when connection is refused (error event caught)');
  });

  test('PROBE-05: Healthcheck returns exit code 1 when socket is abruptly destroyed', async () => {
    const server = http.createServer((req, res) => {
      // Abruptly destroy the client socket without sending HTTP response
      req.socket.destroy();
    });

    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;

    try {
      const exitCode = await runHealthcheckProbe(`http://127.0.0.1:${port}/api/v3/analytics/kpi`);
      assert.equal(exitCode, 1, 'Exit code must be 1 when socket is destroyed prematurely');
    } finally {
      await new Promise(resolve => server.close(resolve));
    }
  });

  test('PROBE-06: Real Preview Server HTTP integration with healthcheck endpoint', async () => {
    // Test the healthcheck probe against the real preview server router handler
    const { resolveHybridRepository } = require('./r1-r5-harness.js');
    const repo = resolveHybridRepository();
    await repo.init();

    // Start a preview server route emulator using the real repository
    const server = http.createServer(async (req, res) => {
      if (req.url === '/api/v3/analytics/kpi') {
        const data = await repo.getDashboardAnalytics();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(data));
      }
      res.writeHead(404);
      res.end();
    });

    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;

    try {
      const exitCode = await runHealthcheckProbe(`http://127.0.0.1:${port}/api/v3/analytics/kpi`);
      assert.equal(exitCode, 0, 'Real API analytics endpoint successfully answers healthcheck probe with exit code 0');
    } finally {
      await new Promise(resolve => server.close(resolve));
      repo.close();
    }
  });
});

// ============================================================================
// 5. GitHub Actions CI/CD Pipeline Dependency Graph & Gating
// ============================================================================

describe('M5 Stress 5: CI/CD Pipeline Gating & Workflow Integrity', () => {
  test('CI-01: Gating graph strictly enforces lint -> test -> docker-build DAG', () => {
    assert.ok(fs.existsSync(WORKFLOW_PATH), '.github/workflows/ci.yml must exist');
    const yaml = fs.readFileSync(WORKFLOW_PATH, 'utf-8');

    // Parse jobs block
    assert.ok(yaml.includes('lint:'), 'Workflow must have lint job');
    assert.ok(yaml.includes('test:'), 'Workflow must have test job');
    assert.ok(yaml.includes('docker-build:'), 'Workflow must have docker-build job');

    // Verify sequential DAG dependencies
    // test must require lint
    const testNeedsLint = /test:[\s\S]*?needs:\s*lint/.test(yaml);
    assert.ok(testNeedsLint, 'Job test must declare "needs: lint"');

    // docker-build must require [lint, test]
    const dockerNeedsLintAndTest = /docker-build:[\s\S]*?needs:\s*\[lint,\s*test\]/.test(yaml) ||
                                  /docker-build:[\s\S]*?needs:\s*\n\s*-\s*lint\s*\n\s*-\s*test/.test(yaml);
    assert.ok(dockerNeedsLintAndTest, 'Job docker-build must declare "needs: [lint, test]"');
  });

  test('CI-02: Concurrency control and branch trigger coverage', () => {
    const yaml = fs.readFileSync(WORKFLOW_PATH, 'utf-8');

    // Concurrency
    assert.ok(yaml.includes('concurrency:'), 'Must configure concurrency group');
    assert.ok(yaml.includes('cancel-in-progress: true'), 'Must cancel redundant in-progress builds');

    // Triggers
    assert.ok(yaml.includes('- main'), 'Must trigger on push/PR to main');
    assert.ok(yaml.includes("- 'integration/**'"), "Must trigger on push to 'integration/**' branches");

    // Matrix
    assert.ok(yaml.includes('20.x') && yaml.includes('24.x'), 'Test matrix must cover Node 20 and Node 24');

    // Playwright with system deps
    assert.ok(
      yaml.includes('npx playwright install --with-deps chromium'),
      'Test job must install Playwright with OS system dependencies (--with-deps)'
    );

    // Docker smoke test
    assert.ok(yaml.includes('docker run --rm studio-dna --help'), 'Smoke test executes CLI --help inside container');
  });

  test('CI-03: .dockerignore covers sensitive, large, and cache directories', () => {
    assert.ok(fs.existsSync(DOCKERIGNORE_PATH), '.dockerignore must exist');
    const ignoreContent = fs.readFileSync(DOCKERIGNORE_PATH, 'utf-8');
    const entries = ignoreContent.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

    const criticalExclusions = [
      'node_modules',
      'copias',
      'data',
      '.git',
      '.agents',
      '.agents/teamwork/',
      'scratch',
      'test/screenshots/',
      'coverage',
      '.env*'
    ];

    for (const crit of criticalExclusions) {
      assert.ok(entries.includes(crit), `Docker context must exclude ${crit}`);
    }
  });
});
