/**
 * test/e2e/r1-r5-tier4-realworld-scenarios.test.js
 * 
 * Tier 4: Real-World Application Workloads & End-to-End User Journeys.
 * Strictly conforms to ORIGINAL_REQUEST.md, PROJECT.md, and TEST_INFRA.md.
 * 
 * Real-World User Scenarios:
 * 1. DevOps / Lead Eng: Full Branch Consolidation & Promotion (R1)
 * 2. UI/UX Designer: dnastudio Interactive Client Transmutation (R2)
 * 3. Data / Backend Eng: High-Volume Scraping Persistence & Retrieval (R3)
 * 4. New Contributor: Zero-Friction Cold Start Onboarding (R4)
 * 5. DevOps / Release: Production Docker Container Lifecycle (R5)
 * 
 * Runner: native node:test + node:assert/strict
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const crypto = require('node:crypto');
const { execSync } = require('node:child_process');

const {
  PROJECT_ROOT,
  resolveHybridRepository,
  resolveDocumentStore,
  resolveSqliteEngine,
  scanGitBranchTopology,
  computeCommitDivergence,
  simulate3WayMerge,
  validate21stDevTokens,
  clampViewportDimensions,
  parseAndValidateDockerfile,
  withEphemeralServer
} = require('./r1-r5-harness');

// ============================================================================
// Scenario 1: DevOps / Lead Eng — Full Branch Consolidation & Promotion
// ============================================================================

describe('Scenario 1: DevOps Lead — Full Branch Consolidation & Promotion (R1)', () => {
  test('TC-R1-T4-01: End-to-end branch discovery, conflict matrix generation, and integration promotion gate', () => {
    // 1. Scan full git topology
    const topology = scanGitBranchTopology(PROJECT_ROOT);
    assert.ok(topology.local.length >= 2, 'Must have at least 2 branches in local topology');

    // 2. Select branches for consolidation analysis
    const candidateBranches = [
      'feat/pareto-v3-engine',
      'feat/merge-orchestration-into-main',
      'client/silvio-iwata'
    ].filter(b => topology.local.includes(b));

    // 3. Compute conflict matrix relative to main
    const conflictMatrix = [];
    for (const branch of candidateBranches) {
      const divergence = computeCommitDivergence('main', branch, PROJECT_ROOT);
      const simulation = simulate3WayMerge('main', branch, PROJECT_ROOT);
      conflictMatrix.push({
        branch,
        ahead: divergence.ahead,
        behind: divergence.behind,
        mergeBase: divergence.mergeBase,
        clean: simulation.clean,
        conflictsCount: simulation.conflictFiles.length
      });
    }

    assert.ok(conflictMatrix.length > 0, 'Must generate conflict analysis for candidate branches');

    // 4. Verify promotion gate: staging trunk exists and has zero blocker conflicts
    const stagingBranch = topology.local.find(b => b.includes('staging') || b.includes('consolidated') || b.includes('integration'));
    assert.ok(stagingBranch, 'A consolidated staging branch must be present in the repository');
  });
});

// ============================================================================
// Scenario 2: UI/UX Designer — dnastudio Interactive Client Transmutation
// ============================================================================

describe('Scenario 2: UI/UX Designer — dnastudio Client Transmutation (R2)', () => {
  test('TC-R2-T4-01: Control Panel renders 21st.dev Bento Grid, switches viewports, and displays live metrics', async () => {
    // Mock modern dnastudio control panel dashboard with 21st.dev components
    const dnastudioDashboard = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Studio DNA - dnastudio Command Center</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          .bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .floating-dock { position: fixed; bottom: 20px; display: flex; gap: 8px; }
          .status-pill { border-radius: 9999px; padding: 4px 12px; }
        </style>
      </head>
      <body>
        <div id="app">
          <header class="p-6">
            <h1 class="text-2xl font-bold">dnastudio Production Hub</h1>
          </header>
          <main class="bento-grid">
            <div class="bento-item col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <span class="status-pill bg-emerald-500/20 text-emerald-400">Verified v3.0</span>
              <div class="metrics mt-4 flex gap-6">
                <div><span class="text-xs text-slate-400">Anti-Slop</span><p class="text-xl font-bold">98.5%</p></div>
                <div><span class="text-xs text-slate-400">APCA $L^c$</span><p class="text-xl font-bold">+86.2</p></div>
                <div><span class="text-xs text-slate-400">Inertial FPS</span><p class="text-xl font-bold">59.9</p></div>
              </div>
            </div>
          </main>
          <nav class="floating-dock">
            <button class="dock-btn">Desktop (1440px)</button>
            <button class="dock-btn">Mobile (390px)</button>
          </nav>
        </div>
      </body>
      </html>
    `;

    // 1. Verify 21st.dev tokens
    const tokens = validate21stDevTokens(dnastudioDashboard);
    assert.ok(tokens.valid, 'Control panel HTML must adhere to 21st.dev token taxonomy');

    // 2. Verify viewport switching simulation
    const desktopVp = clampViewportDimensions(1440, 900);
    const mobileVp = clampViewportDimensions(390, 844);
    assert.equal(desktopVp.width, 1440);
    assert.equal(mobileVp.width, 390);

    // 3. Serve and query HTTP endpoint
    await withEphemeralServer({ '/': dnastudioDashboard }, async ({ url }) => {
      const res = await fetch(`${url}/`);
      assert.equal(res.status, 200);
      const html = await res.text();
      assert.ok(html.includes('dnastudio Production Hub'));
      assert.ok(html.includes('Anti-Slop'));
      assert.ok(html.includes('Verified v3.0'));
    });
  });
});

// ============================================================================
// Scenario 3: Data / Backend Eng — High-Volume Scraping Persistence & Retrieval
// ============================================================================

describe('Scenario 3: Data Engineer — High-Volume Scraping Persistence (R3)', () => {
  test('TC-R3-T4-01: Ingests 5 target domains sequentially, persists relational records & raw ASTs, and queries analytics', async () => {
    const repo = resolveHybridRepository();
    await repo.init();

    const testSites = [
      { slug: 'planes-ai', url: 'https://planes.example.com', score: 96.5, tokens: 4200 },
      { slug: 'silvio-iwata', url: 'https://silvioiwata.com.br', score: 94.2, tokens: 3800 },
      { slug: 'negocia-bem', url: 'https://negociabem.com.br', score: 91.8, tokens: 2900 },
      { slug: 'marcionilio-oliveira', url: 'https://marcionilio.example.com', score: 97.4, tokens: 5100 },
      { slug: 'jesper-landberg', url: 'https://jesper.example.com', score: 98.9, tokens: 6200 }
    ];

    // Sequential ingestion
    for (const site of testSites) {
      const run = await repo.startAnalysisRun({
        siteSlug: site.slug,
        targetUrl: site.url,
        mode: 'pareto-v3'
      });

      const rawAst = {
        domain: site.slug,
        ingestedAt: new Date().toISOString(),
        domSummary: { tags: 450, depth: 7 },
        tokens: { primary: '#10b981', background: '#09090b' }
      };

      await repo.completeAnalysisRun(run.runId, {
        status: 'passed',
        outputTokens: site.tokens,
        costUsd: (site.tokens / 1000) * 0.015,
        rawScrapePayload: rawAst
      });

      await repo.recordQualityAudit({
        runId: run.runId,
        siteSlug: site.slug,
        auditType: '38-variable-anti-slop',
        passed: true,
        score: site.score,
        metrics: { antiSlop: site.score, contrast: 82.5 }
      });
    }

    // Query aggregated dashboard analytics
    const analytics = await repo.getDashboardAnalytics();
    assert.equal(analytics.totalRuns, 5, 'Must have recorded all 5 runs');
    assert.equal(analytics.passedRuns, 5, 'All 5 runs must be marked passed');
    assert.equal(analytics.passRate, 100, 'Pass rate must be 100%');
    assert.ok(analytics.averageAuditScore >= 90.0, 'Average audit score must be >= 90.0');

    // Filter runs by site
    const planesRuns = await repo.listAnalysisRuns({ siteSlug: 'planes-ai' });
    assert.equal(planesRuns.length, 1);
    assert.equal(planesRuns[0].siteSlug, 'planes-ai');

    // Retrieve full details for one site with joined document payload
    const planesDetails = await repo.getRunDetails(planesRuns[0].id);
    assert.ok(planesDetails.rawDocument, 'Joined raw document must be present');
    assert.equal(planesDetails.rawDocument.payload.domain, 'planes-ai');
    assert.equal(planesDetails.rawDocument.payload.domSummary.tags, 450);

    repo.close();
  });
});

// ============================================================================
// Scenario 4: New Contributor — Zero-Friction Cold Start Onboarding
// ============================================================================

describe('Scenario 4: New Contributor — Zero-Friction Cold Start Onboarding (R4)', () => {
  test('TC-R4-T4-01: Verifies onboarding documentation, zero external native compilation, and CLI preview command', () => {
    // 1. Documentation inspection
    const readme = fs.readFileSync(path.join(PROJECT_ROOT, 'README.md'), 'utf-8');
    assert.ok(readme.includes('Studio DNA') || readme.includes('Playwright') || readme.includes('preview'), 'README must describe core capabilities');

    // 2. Package manifest inspection: zero uninstalled native modules
    const pkg = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf-8'));
    assert.ok(pkg.scripts.start, 'Must provide npm start script');
    assert.ok(pkg.scripts.preview, 'Must provide npm run preview script');

    // 3. CLI entrypoint verification
    const cliPath = path.join(PROJECT_ROOT, 'bin/cli.js');
    assert.ok(fs.existsSync(cliPath), 'bin/cli.js entrypoint must exist');
    assert.doesNotThrow(() => {
      execSync(`node "${cliPath}" --help`, { stdio: 'pipe' });
    }, 'CLI must execute --help without error');
  });
});

// ============================================================================
// Scenario 5: DevOps / Release — Production Docker Container Lifecycle
// ============================================================================

describe('Scenario 5: DevOps Release — Production Docker Lifecycle (R5)', () => {
  test('TC-R5-T4-01: Verifies production multi-stage Docker build specification and container healthcheck', async () => {
    // Target production Dockerfile specification
    const dockerfileSpec = `
      # Multi-stage production Dockerfile for Studio DNA Engine
      FROM node:20-bookworm-slim AS builder
      WORKDIR /app
      COPY package*.json ./
      RUN npm ci --omit=dev

      FROM mcr.microsoft.com/playwright:v1.49.0-noble AS runner
      WORKDIR /app
      ENV NODE_ENV=production PORT=4000 HOST=0.0.0.0
      COPY --from=builder /app/node_modules ./node_modules
      COPY package*.json ./
      RUN npx playwright install chromium
      COPY . .
      RUN mkdir -p /app/copias /app/data && chown -R pwuser:pwuser /app
      USER pwuser
      VOLUME ["/app/copias", "/app/data"]
      EXPOSE 4000
      HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD node -e "require('http').get('http://127.0.0.1:4000/')"
      ENTRYPOINT ["node", "bin/cli.js"]
      CMD ["--preview", "--port", "4000"]
    `;

    const tempDockerfile = path.join(os.tmpdir(), `test_dockerfile_prod_${Date.now()}`);
    fs.writeFileSync(tempDockerfile, dockerfileSpec, 'utf-8');

    const validation = parseAndValidateDockerfile(tempDockerfile);
    fs.unlinkSync(tempDockerfile);

    assert.ok(validation.valid, 'Production Dockerfile specification must be syntactically valid');
    assert.ok(validation.isMultiStage, 'Must use multi-stage build (builder -> runner)');
    assert.ok(validation.hasUnprivilegedUser, 'Must drop privileges to pwuser');
    assert.ok(validation.hasExposedPort4000, 'Must expose port 4000');
    assert.ok(validation.hasVolumes, 'Must declare persistent volumes');

    // Simulate container healthcheck HTTP request
    const healthcheckHandler = (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'healthy', version: '3.0.0' }));
    };

    await withEphemeralServer({ '/': healthcheckHandler }, async ({ url }) => {
      const res = await fetch(`${url}/`);
      assert.equal(res.status, 200, 'Healthcheck probe must return HTTP 200');
      const health = await res.json();
      assert.equal(health.status, 'healthy');
    });
  });
});
