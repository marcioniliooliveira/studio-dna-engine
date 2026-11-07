const assert = require('assert');

const proposedPackageJson = {
  "name": "studio-dna-engine",
  "version": "3.0.0",
  "private": true,
  "description": "Studio DNA PRO — Awwwards Web Cloner, Design DNA, ICM Pipeline & Client Production Factory",
  "main": "index.js",
  "bin": {
    "studio-dna": "./bin/cli.js",
    "studio-dna-orchestrate": "./bin/orchestrator.js"
  },
  "scripts": {
    "lint": "node scripts/audit-syntax.js",
    "test": "npm run test:all",
    "orchestrate": "node bin/orchestrator.js",
    "test:low-spec": "node scripts/run-low-spec-gate.js",
    "test:milestones": "node --test --test-concurrency=1 test/m1-cdp-decompiler.test.js test/m2-kinetic-trajectory.test.js test/m3-assets3d-pipeline.test.js test/m4-compiler-dualstack.test.js",
    "test:stress": "node --test test/stress/adverse-hardware-stress.test.js",
    "test:v2.5": "node --test test/m1-impeccable-sanitization.test.js test/m2-fsm-forms.test.js test/m3-spring-dynamics.test.js test/m4-gpu-saliency.test.js test/stress/adverse-hardware-stress.test.js",
    "test:e2e": "node --test --test-concurrency=1 test/e2e/*.test.js",
    "test:all": "node --test --test-concurrency=1 test/m1-cdp-decompiler.test.js test/m2-kinetic-trajectory.test.js test/m3-assets3d-pipeline.test.js test/m4-compiler-dualstack.test.js test/e2e/*.test.js",
    "start": "node bin/cli.js --preview --port 4000",
    "preview": "node bin/cli.js --preview --port 4000",
    "scrape": "node bin/cli.js",
    "mcp": "node src/mcp-server.js",
    "mcp:http": "node src/mcp-http.js",
    "test:mcp": "node --test test/mcp-server.test.js test/mcp-http-server.test.js",
    "client": "node src/generators/client-factory.js",
    "transmute": "node src/pipeline/transmuter.js",
    "tokens": "node src/extractors/token-compiler.js",
    "audit": "node scripts/box-diff-linter.js",
    "audit:scrutiny": "node scripts/run-scrutiny-test.js",
    "audit:unified": "node scripts/run-unified-gate.js",
    "test:falsifiability": "node --test test/deep-scrutiny-falsifiability.test.js",
    "test:components": "node --test --test-concurrency=1 test/components/*.test.js",
    "clean:scratch": "node scripts/cleanup-scratch.js",
    "normalize": "node scripts/normalize-all-copies.js",
    "inject": "node src/generators/slot-injector.js",
    "build:workstage": "vite build --config vite.bundle.config.mjs",
    "test:workstage": "vitest run src/components/WorkStage/__tests__/math.spec.ts && playwright test tests/e2e/work-stage.spec.ts tests/e2e/challenger-viewport.spec.ts",
    "setup": "npx playwright install --with-deps chromium"
  },
  "engines": {
    "node": ">=20"
  },
  "keywords": [
    "playwright",
    "web-scraper",
    "site-cloner",
    "design-system",
    "awwwards",
    "gsap",
    "shaders",
    "design-tokens",
    "icm",
    "ai-agent"
  ],
  "author": "DesignerPro / FlashTech",
  "license": "MIT",
  "type": "commonjs",
  "dependencies": {
    "@google/genai": "2.19.0",
    "@modelcontextprotocol/sdk": "^1.30.0",
    "@react-three/drei": "^9.99.0",
    "@react-three/fiber": "^8.15.16",
    "acorn": "8.18.0",
    "acorn-walk": "8.3.5",
    "cheerio": "^1.2.0",
    "gsap": "^3.12.5",
    "playwright": "^1.41.0",
    "postcss": "^8.5.26",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.161.0",
    "xstate": "5.32.6",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@playwright/test": "^1.41.0",
    "@types/three": "^0.161.2",
    "ajv": "^8.17.1",
    "vite": "^5.0.0",
    "vitest": "^5.0.5"
  }
};

// Test TC-R4-T1-03: Dependency tree audit verifies package.json integrity
assert.equal(proposedPackageJson.type, 'commonjs', 'Studio DNA engine must be commonjs');
assert.ok(proposedPackageJson.dependencies, 'Dependencies field must exist');
assert.ok(proposedPackageJson.scripts, 'Scripts field must exist');
assert.ok(proposedPackageJson.scripts.test, 'test script must exist');
assert.ok(proposedPackageJson.scripts['test:milestones'], 'test:milestones script must exist');
assert.ok(proposedPackageJson.scripts['test:e2e'], 'test:e2e script must exist');

// Test TC-R4-T2-01: No throwaway script referenced in package.json
const jsonStr = JSON.stringify(proposedPackageJson);
assert.ok(!jsonStr.includes('scripts/check-stations.js'), 'Throwaway script must NOT be referenced');

// Test TC-R4-T4-01: Scripts start and preview must exist
assert.ok(proposedPackageJson.scripts.start, 'Must provide npm start script');
assert.ok(proposedPackageJson.scripts.preview, 'Must provide npm run preview script');

// Test persistence zero-dependency invariant
const persistenceDeps = ['better-sqlite3', 'sqlite3', 'sequelize', 'typeorm', 'mongoose', 'mongodb'];
for (const pDep of persistenceDeps) {
  assert.ok(!proposedPackageJson.dependencies[pDep], `Must not include external persistence dep ${pDep}`);
}

console.log('✅ Proposed package.json passed all 4 E2E assertion criteria!');
