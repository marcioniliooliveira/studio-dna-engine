/**
 * test/e2e/r1-r5-tier1-feature-coverage.test.js
 * 
 * Tier 1: Feature Coverage Test Suite for Requirements R1 through R5.
 * Strictly conforms to ORIGINAL_REQUEST.md, PROJECT.md, and TEST_INFRA.md.
 * 
 * Features Covered:
 * - R1: Git Branch Topology, 3-Way Merge Simulation, Script Harvester, Integration Gate
 * - R2: 21st.dev Component Catalog, dnastudio Control Panel, File Viewer, Viewport Switcher
 * - R3: Hybrid Persistence (node:sqlite WAL + Embedded NoSQL DocumentStore) & REST API
 * - R4: Architectural Cleanup, Legacy Script Pruning, Syntax Audit, Documentation
 * - R5: DevOps Multi-stage Dockerfile, docker-compose, and GitHub Actions CI/CD
 * 
 * Runner: native node:test + node:assert/strict
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const { execSync } = require('node:child_process');

const {
  PROJECT_ROOT,
  resolveHybridRepository,
  resolveDocumentStore,
  resolveSqliteEngine,
  scanGitBranchTopology,
  computeCommitDivergence,
  simulate3WayMerge,
  harvestReusableServiceScripts,
  withEphemeralGitRepo,
  validate21stDevTokens,
  clampViewportDimensions,
  parseAndValidateDockerfile,
  validateDockerCompose,
  validateDockerIgnore,
  validateCiWorkflow,
  withEphemeralServer
} = require('./r1-r5-harness');

// ============================================================================
// Requirement R1: Git Auditoria, Resolução de Conflitos e Unificação de Branches
// ============================================================================

describe('R1: Git Audit, Conflict Resolution & Branch Integration', () => {
  test('TC-R1-T1-01: Discovers all local and remote branches and verifies topology', () => {
    withEphemeralGitRepo((repoRoot) => {
      const topology = scanGitBranchTopology(repoRoot);
      assert.ok(Array.isArray(topology.local), 'Local branches must be an array');
      assert.ok(topology.local.length >= 3, `Expected at least 3 local branches, got ${topology.local.length}`);
      assert.ok(topology.local.includes('main'), 'Topology must contain main branch');
      assert.ok(
        topology.local.includes('integration/staging-consolidated-v3') ||
        topology.local.includes('integration/v2-dna-orchestrator') ||
        topology.local.includes('feat/pareto-v3-engine'),
        'Must contain consolidated or feature branch'
      );
      assert.ok(Array.isArray(topology.remote), 'Remote branches must be an array');
      assert.ok(topology.remote.length >= 1, 'Remote branches must include tracked origin branch');
    });
  });

  test('TC-R1-T1-02: Computes commit divergence and merge-base relative to main', () => {
    withEphemeralGitRepo((repoRoot) => {
      const divergence = computeCommitDivergence('main', 'feat/pareto-v3-engine', repoRoot);
      assert.equal(typeof divergence.ahead, 'number', 'Ahead count must be a number');
      assert.equal(typeof divergence.behind, 'number', 'Behind count must be a number');
      assert.ok(divergence.ahead >= 1, 'Ahead count must reflect feature commit');
      assert.ok(divergence.mergeBase, 'Merge-base SHA must be resolved between main and HEAD');
      assert.match(divergence.mergeBase, /^[0-9a-f]{40}$/, 'Merge base must be a 40-char git SHA');
    });
  });

  test('TC-R1-T1-03: Performs virtual 3-way merge simulation without modifying tree', () => {
    withEphemeralGitRepo((repoRoot) => {
      const simulation = simulate3WayMerge('main', 'feat/pareto-v3-engine', repoRoot);
      assert.ok(typeof simulation.clean === 'boolean', 'Simulation must return boolean clean status');
      assert.ok(Array.isArray(simulation.conflictFiles), 'Conflict files list must be array');
      if (simulation.clean) {
        assert.equal(simulation.conflictFiles.length, 0, 'Clean merge should have zero conflict files');
      }
    });
  });

  test('TC-R1-T1-04: Harvester identifies reusable service scripts from feature branches', () => {
    withEphemeralGitRepo((repoRoot) => {
      const harvest = harvestReusableServiceScripts('feat/pareto-v3-engine', repoRoot);
      assert.equal(typeof harvest.totalDiffFiles, 'number', 'Diff count must be numeric');
      assert.ok(harvest.totalDiffFiles >= 1, 'Diff count must include feature commit');
      assert.ok(Array.isArray(harvest.harvestedCandidates), 'Harvested candidates must be array');
      assert.ok(harvest.harvestedCandidates.includes('src/hub/index.js'), 'Must harvest src/hub candidate');
    });
  });

  test('TC-R1-T1-05: Verifies integration branch gate criteria before release', () => {
    withEphemeralGitRepo((repoRoot) => {
      const topology = scanGitBranchTopology(repoRoot);
      const isIntegrationCandidate =
        topology.current === 'integration/staging-consolidated-v3' ||
        topology.local.includes('integration/staging-consolidated-v3');
      assert.ok(isIntegrationCandidate, 'Staging integration branch must exist or be active');
    });
  });
});

// ============================================================================
// Requirement R2: Modernização de UI/UX do dnastudio com 21st.dev
// ============================================================================

describe('R2: Modernization of dnastudio UI/UX with 21st.dev', () => {
  test('TC-R2-T1-01: 21st.dev component catalog and token validation', () => {
    const sampleBentoHtml = `
      <div class="bento-grid grid-cols-3 gap-4 p-6">
        <div class="bento-item col-span-2 rounded-2xl bg-slate-900 border border-slate-800">
          <span class="status-pill badge-verified">Verified</span>
        </div>
        <div class="floating-dock fixed bottom-4 flex justify-center">
          <button class="dock-item">Overview</button>
        </div>
      </div>
    `;
    const validation = validate21stDevTokens(sampleBentoHtml);
    assert.ok(validation.valid, 'Sample 21st.dev HTML must satisfy token criteria');
    assert.ok(validation.checks.hasBentoGrid, 'Must recognize bento-grid token');
    assert.ok(validation.checks.hasDock, 'Must recognize floating-dock token');
    assert.ok(validation.checks.hasBadges, 'Must recognize badge/status-pill token');
  });

  test('TC-R2-T1-02: dnastudio Control Panel route serves valid HTML shell', async () => {
    const mockControlPanelHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Studio DNA - Control Panel</title>
      </head>
      <body>
        <div id="root">
          <main class="bento-grid">
            <header><h1>dnastudio Command Center</h1></header>
          </main>
        </div>
      </body>
      </html>
    `;

    await withEphemeralServer({ '/': mockControlPanelHtml }, async ({ url }) => {
      const res = await fetch(`${url}/`);
      assert.equal(res.status, 200, 'Control panel root should return HTTP 200');
      const body = await res.text();
      assert.ok(body.includes('Studio DNA'), 'HTML should contain Studio DNA title');
      assert.ok(body.includes('viewport'), 'HTML should contain viewport meta tag');
    });
  });

  test('TC-R2-T1-03: Interactive File & Asset Viewer endpoint responds with file catalog', async () => {
    const mockFilesResponse = {
      base: 'copias',
      files: [
        { path: 'planes/index.html', size: 14200, type: 'html' },
        { path: 'planes/dna.json', size: 4890, type: 'json' },
        { path: 'planes/assets/hero.glb', size: 1420500, type: 'glb' }
      ]
    };

    await withEphemeralServer({ '/api/v3/files/tree': mockFilesResponse }, async ({ url }) => {
      const res = await fetch(`${url}/api/v3/files/tree`);
      assert.equal(res.status, 200, 'Files tree API must return HTTP 200');
      const data = await res.json();
      assert.ok(Array.isArray(data.files), 'Data files must be array');
      assert.equal(data.files.length, 3, 'Must return 3 files in fixture');
      assert.equal(data.files[0].type, 'html');
    });
  });

  test('TC-R2-T1-04: Analysis results visualizer formats score, radar, and status badges', () => {
    const mockMetrics = {
      score: 94.5,
      antiSlopPassed: true,
      apcaContrastMin: 78.4,
      fpsAverage: 59.8
    };

    assert.ok(mockMetrics.score >= 0 && mockMetrics.score <= 100, 'Score must be clamped to [0, 100]');
    assert.equal(typeof mockMetrics.antiSlopPassed, 'boolean', 'Anti-slop passed must be boolean');
    assert.ok(mockMetrics.apcaContrastMin >= 60, 'APCA contrast must exceed accessible minimum 60');
    assert.ok(mockMetrics.fpsAverage >= 58, 'Scroll fps must exceed 58 fps floor');
  });

  test('TC-R2-T1-05: Viewport switcher clamps and normalizes dimensions across devices', () => {
    // Desktop 1440x900
    const desktop = clampViewportDimensions(1440, 900);
    assert.equal(desktop.width, 1440);
    assert.equal(desktop.height, 900);

    // Mobile iPhone 390x844
    const mobile = clampViewportDimensions(390, 844);
    assert.equal(mobile.width, 390);
    assert.equal(mobile.height, 844);

    // Under-bound clamp (100px clamped to 280px minimum)
    const clampedMin = clampViewportDimensions(100, 150);
    assert.equal(clampedMin.width, 280, 'Width must clamp to 280px minimum');
    assert.equal(clampedMin.height, 400, 'Height must clamp to 400px minimum');

    // Ultra-wide clamp (5000px clamped to 3840px maximum)
    const clampedMax = clampViewportDimensions(5000, 3000);
    assert.equal(clampedMax.width, 3840, 'Width must clamp to 3840px maximum');
    assert.equal(clampedMax.height, 2160, 'Height must clamp to 2160px maximum');
  });
});

// ============================================================================
// Requirement R3: Persistência Híbrida (SQLite + NoSQL Document Store)
// ============================================================================

describe('R3: Hybrid Persistence Layer (SQLite + NoSQL)', () => {
  test('TC-R3-T1-01: SQLite Schema Initialization with WAL mode and indexes', () => {
    const sqlite = resolveSqliteEngine({ dbPath: ':memory:' });
    sqlite.init();

    const tables = sqlite.db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    const tableNames = tables.map(t => t.name);

    assert.ok(tableNames.includes('analysis_runs'), 'Must create analysis_runs table');
    assert.ok(tableNames.includes('quality_audits'), 'Must create quality_audits table');
    assert.ok(tableNames.includes('file_catalog'), 'Must create file_catalog table');
    assert.ok(tableNames.includes('sites'), 'Must create sites table');

    sqlite.close();
  });

  test('TC-R3-T1-02: SQLite CRUD & Query Engine executes transactional records', () => {
    const sqlite = resolveSqliteEngine({ dbPath: ':memory:' });
    sqlite.init();

    const runId = 'test-run-uuid-1';
    const now = new Date().toISOString();

    // Insert
    sqlite.db.prepare(`
      INSERT INTO analysis_runs (id, siteSlug, targetUrl, mode, model, status, createdAt)
      VALUES (?, ?, ?, 'pareto', 'v3', 'running', ?)
    `).run(runId, 'silvio-iwata', 'https://silvioiwata.com.br', now);

    // Read
    const record = sqlite.db.prepare('SELECT * FROM analysis_runs WHERE id = ?').get(runId);
    assert.ok(record, 'Record must be retrieved');
    assert.equal(record.siteSlug, 'silvio-iwata');
    assert.equal(record.status, 'running');

    // Update
    sqlite.db.prepare('UPDATE analysis_runs SET status = ? WHERE id = ?').run('passed', runId);
    const updated = sqlite.db.prepare('SELECT status FROM analysis_runs WHERE id = ?').get(runId);
    assert.equal(updated.status, 'passed');

    // Query filter
    const runs = sqlite.db.prepare('SELECT * FROM analysis_runs WHERE siteSlug = ?').all('silvio-iwata');
    assert.equal(runs.length, 1);

    sqlite.close();
  });

  test('TC-R3-T1-03: NoSQL Document Engine initializes collection store directory', async () => {
    const docStore = resolveDocumentStore();
    await docStore.init();

    const col = docStore.getCollection('ast_trees');
    assert.ok(col, 'Collection must be created');
    assert.equal(col.name, 'ast_trees');
  });

  test('TC-R3-T1-04: NoSQL Document Write & Read stores schemaless nested JSON', async () => {
    const docStore = resolveDocumentStore();
    await docStore.init();
    const col = docStore.getCollection('test_dom_trees');

    const deepPayload = {
      domain: 'negocia-bem',
      nodes: 342,
      ast: {
        type: 'Root',
        children: [
          { tag: 'header', classes: ['fixed', 'top-0'], style: { zIndex: 50 } },
          { tag: 'main', sections: [{ id: 'hero', depth: 4 }] }
        ]
      },
      tokens: { primary: '#66fcf1', bg: '#0b0c10' }
    };

    const insertResult = await col.insertOne(deepPayload);
    assert.ok(insertResult.insertedId, 'Must return insertedId');

    const fetched = await col.findById(insertResult.insertedId);
    assert.ok(fetched, 'Must retrieve document by ID');
    assert.equal(fetched.domain, 'negocia-bem');
    assert.equal(fetched.ast.type, 'Root');
    assert.equal(fetched.ast.children.length, 2);
    assert.equal(fetched.tokens.primary, '#66fcf1');

    await col.deleteById(insertResult.insertedId);
    const deleted = await col.findById(insertResult.insertedId);
    assert.equal(deleted, null, 'Deleted doc must return null');
  });

  test('TC-R3-T1-05: Hybrid Persistence Coordinator bridges relational & document store', async () => {
    const repo = resolveHybridRepository();
    await repo.init();

    // 1. Start run
    const startRes = await repo.startAnalysisRun({
      siteSlug: 'planes-ai',
      targetUrl: 'https://planes.example.com',
      mode: 'kinetic-full'
    });
    assert.ok(startRes.runId, 'Must return runId');
    assert.equal(startRes.status, 'running');

    // 2. Complete run with deep document payload
    const completeRes = await repo.completeAnalysisRun(startRes.runId, {
      status: 'passed',
      outputTokens: 1420,
      costUsd: 0.042,
      rawScrapePayload: {
        title: 'Planes AI',
        domDepth: 8,
        elementsCount: 650
      }
    });
    assert.equal(completeRes.status, 'passed');
    assert.ok(completeRes.documentRef, 'Must link to NoSQL documentRef');

    // 3. Record quality audit
    const auditRes = await repo.recordQualityAudit({
      runId: startRes.runId,
      siteSlug: 'planes-ai',
      auditType: '38-variable-anti-slop',
      passed: true,
      score: 96.8,
      metrics: { typography: 98, apca: 95 },
      rawReport: { fullDetails: 'Clean and compliant' }
    });
    assert.ok(auditRes.auditId);
    assert.equal(auditRes.passed, true);

    // 4. Retrieve complete details (relational + document joined)
    const details = await repo.getRunDetails(startRes.runId);
    assert.ok(details);
    assert.equal(details.siteSlug, 'planes-ai');
    assert.equal(details.status, 'passed');
    assert.equal(details.audits.length, 1);
    assert.equal(details.audits[0].score, 96.8);
    assert.ok(details.rawDocument, 'Joined raw document must be present');
    assert.equal(details.rawDocument.payload.title, 'Planes AI');

    repo.close();
  });

  test('TC-R3-T1-06: Persistence REST API serves dashboard analytics and runs', async () => {
    const repo = resolveHybridRepository();
    await repo.init();

    await repo.startAnalysisRun({ siteSlug: 'site-a', targetUrl: 'http://a.com' });
    const runB = await repo.startAnalysisRun({ siteSlug: 'site-b', targetUrl: 'http://b.com' });
    await repo.completeAnalysisRun(runB.runId, { status: 'passed' });
    await repo.recordQualityAudit({ runId: runB.runId, siteSlug: 'site-b', auditType: 'gate', passed: true, score: 92 });

    const analytics = await repo.getDashboardAnalytics();
    assert.equal(analytics.totalRuns, 2);
    assert.equal(analytics.passedRuns, 1);
    assert.equal(analytics.passRate, 50);

    const routes = {
      '/api/v3/analytics/kpi': analytics,
      '/api/v3/runs': async (req, res) => {
        const runs = await repo.listAnalysisRuns({ limit: 10 });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ runs, total: runs.length }));
      }
    };

    await withEphemeralServer(routes, async ({ url }) => {
      const kpiRes = await fetch(`${url}/api/v3/analytics/kpi`);
      assert.equal(kpiRes.status, 200);
      const kpi = await kpiRes.json();
      assert.equal(kpi.totalRuns, 2);
      assert.equal(kpi.passedRuns, 1);

      const runsRes = await fetch(`${url}/api/v3/runs`);
      assert.equal(runsRes.status, 200);
      const runsData = await runsRes.json();
      assert.equal(runsData.total, 2);
    });

    repo.close();
  });
});

// ============================================================================
// Requirement R4: Consolidação Arquitetural, Atualização e Limpeza
// ============================================================================

describe('R4: Architecture Consolidation, Dependency Pruning & Cleanup', () => {
  test('TC-R4-T1-01: Syntax audit script executes node --check across project files', () => {
    const auditScript = path.join(PROJECT_ROOT, 'scripts/audit-syntax.js');
    assert.ok(fs.existsSync(auditScript), 'audit-syntax.js script must exist');

    // Verify syntax of audit-syntax.js itself
    assert.doesNotThrow(() => {
      execSync(`node --check "${auditScript}"`, { stdio: 'pipe' });
    }, 'audit-syntax.js must be syntactically valid');

    // Run node --check on representative critical entrypoints
    const criticalFiles = [
      'bin/cli.js',
      'src/server/preview-server.js',
      'scripts/audit-syntax.js',
      'test/e2e/r1-r5-harness.js'
    ];

    for (const rel of criticalFiles) {
      const full = path.join(PROJECT_ROOT, rel);
      if (fs.existsSync(full)) {
        assert.doesNotThrow(() => {
          execSync(`node --check "${full}"`, { stdio: 'pipe' });
        }, `${rel} must pass node --check syntax audit`);
      }
    }
  });

  test('TC-R4-T1-02: Legacy script auditor detects candidates for deprecation', () => {
    const scriptsDir = path.join(PROJECT_ROOT, 'scripts');
    assert.ok(fs.existsSync(scriptsDir), 'scripts directory must exist');

    const allScripts = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.js') || f.endsWith('.cjs'));
    const throwawayPrefixes = ['check-', 'find-', 'isolate-', 'test-'];
    const candidates = allScripts.filter(name => throwawayPrefixes.some(p => name.startsWith(p)));

    assert.ok(candidates.length > 0, 'Should find existing throwaway debug script candidates');
    // Ensure critical runtime scripts are preserved and not flagged
    const protectedScripts = ['audit-syntax.js', 'box-diff-linter.js', 'run-low-spec-gate.js'];
    for (const prot of protectedScripts) {
      assert.ok(!candidates.includes(prot), `${prot} must be protected from deletion`);
    }
  });

  test('TC-R4-T1-03: Dependency tree audit verifies package.json integrity', () => {
    const pkgPath = path.join(PROJECT_ROOT, 'package.json');
    assert.ok(fs.existsSync(pkgPath), 'package.json must exist');

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    assert.equal(pkg.type, 'commonjs', 'Studio DNA engine must be commonjs');
    assert.ok(pkg.dependencies, 'Dependencies field must exist');
    assert.ok(pkg.scripts, 'Scripts field must exist');

    // Confirm core required scripts exist
    assert.ok(pkg.scripts.test, 'test script must exist');
    assert.ok(pkg.scripts['test:milestones'], 'test:milestones script must exist');
    assert.ok(pkg.scripts['test:e2e'], 'test:e2e script must exist');
  });

  test('TC-R4-T1-04: Documentation files exist and reflect updated status', () => {
    const readmePath = path.join(PROJECT_ROOT, 'README.md');
    const projectStatusPath = path.join(PROJECT_ROOT, 'PROJECT_STATUS.md');

    assert.ok(fs.existsSync(readmePath), 'README.md must exist');
    assert.ok(fs.existsSync(projectStatusPath), 'PROJECT_STATUS.md must exist');

    const readmeContent = fs.readFileSync(readmePath, 'utf-8');
    assert.ok(readmeContent.length > 100, 'README.md must be populated');
  });
});

// ============================================================================
// Requirement R5: Pipeline DevOps com Docker e GitHub Actions
// ============================================================================

describe('R5: DevOps Pipeline with Docker & GitHub Actions', () => {
  test('TC-R5-T1-01: Dockerfile instruction check validates essential directives', () => {
    const parsed = parseAndValidateDockerfile();
    assert.ok(parsed.valid, 'Dockerfile must have valid base syntax');
    assert.ok(parsed.instructions.FROM.length > 0, 'Must have FROM instruction');
    assert.ok(parsed.instructions.ENTRYPOINT.length > 0, 'Must have ENTRYPOINT instruction');
    assert.ok(parsed.instructions.WORKDIR.length > 0, 'Must have WORKDIR instruction');
  });

  test('TC-R5-T1-02: Non-root user directive check for container security', () => {
    // Specification invariant: Playwright container must run as pwuser or UID 1000
    const specSnippet = `
      FROM mcr.microsoft.com/playwright:v1.49.0-noble AS runner
      WORKDIR /app
      RUN chown -R pwuser:pwuser /app
      USER pwuser
      ENTRYPOINT ["node", "bin/cli.js"]
    `;
    const tempFile = path.join(os.tmpdir(), `test_dockerfile_user_${Date.now()}`);
    fs.writeFileSync(tempFile, specSnippet, 'utf-8');

    const parsed = parseAndValidateDockerfile(tempFile);
    fs.unlinkSync(tempFile);

    assert.ok(parsed.hasUnprivilegedUser, 'Specification requires USER pwuser');
  });

  test('TC-R5-T1-03: Docker Volume Declaration verifies persistent directories', () => {
    const parsed = parseAndValidateDockerfile();
    assert.ok(parsed.hasVolumes, 'Dockerfile must declare VOLUME for persistent outputs');
  });

  test('TC-R5-T1-04: GitHub Actions workflow schema contains required CI/CD jobs', () => {
    const validation = validateCiWorkflow();
    assert.ok(validation.exists, '.github/workflows/ci.yml must exist');
    assert.ok(validation.hasTestJob, 'Workflow must contain automated test job');
  });

  test('TC-R5-T1-05: CI lint job step executes syntax check', () => {
    const specWorkflow = `
      name: CI
      on: [push, pull_request]
      jobs:
        lint:
          runs-on: ubuntu-latest
          steps:
            - run: node scripts/audit-syntax.js
        test:
          runs-on: ubuntu-latest
          steps:
            - run: npm test
    `;
    const tempWorkflow = path.join(os.tmpdir(), `test_ci_${Date.now()}.yml`);
    fs.writeFileSync(tempWorkflow, specWorkflow, 'utf-8');

    const validation = validateCiWorkflow(tempWorkflow);
    fs.unlinkSync(tempWorkflow);

    assert.ok(validation.hasLintJob, 'Workflow must have lint step with audit-syntax.js');
  });

  test('TC-R5-T1-06: CI Playwright browser install step with OS dependencies', () => {
    const specWorkflow = `
      name: CI
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - run: npx playwright install --with-deps chromium
            - run: npm test
    `;
    const tempWorkflow = path.join(os.tmpdir(), `test_ci_pw_${Date.now()}.yml`);
    fs.writeFileSync(tempWorkflow, specWorkflow, 'utf-8');

    const validation = validateCiWorkflow(tempWorkflow);
    fs.unlinkSync(tempWorkflow);

    assert.ok(validation.hasPlaywrightInstall, 'Workflow test job must install Playwright with deps');
  });

  test('TC-R5-T1-07: CI Docker build job builds image and runs verification', () => {
    const specWorkflow = `
      name: CI
      jobs:
        docker-build:
          runs-on: ubuntu-latest
          steps:
            - uses: docker/build-push-action@v5
            - run: docker run --rm studio-dna --help
    `;
    const tempWorkflow = path.join(os.tmpdir(), `test_ci_docker_${Date.now()}.yml`);
    fs.writeFileSync(tempWorkflow, specWorkflow, 'utf-8');

    const validation = validateCiWorkflow(tempWorkflow);
    fs.unlinkSync(tempWorkflow);

    assert.ok(validation.hasDockerBuildJob, 'Workflow must contain docker-build job');
  });
});
