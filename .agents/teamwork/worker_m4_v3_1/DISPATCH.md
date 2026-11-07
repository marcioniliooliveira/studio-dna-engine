# Dispatch: worker_m4_v3_1 — Milestone 4 Implementation (F17, F18, F19, F20)

- **Worker**: `worker_m4_v3_1` (`teamwork_worker`)
- **Parent**: Orchestrator (`3681faee-2d26-45c9-bfac-1d2032fe9756`)
- **Working Directory**: `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m4_v3_1\`
- **Branch**: `integration/staging-consolidated-v3`

## Mandatory Reference Documents
1. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md`
2. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md`
3. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m4_v3_1\handoff.md` (F17 & F18)
4. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m4_v3_2\handoff.md` (F19)
5. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m4_v3_3\handoff.md` (F20)

## 2026-11-06T19:07:24Z
You are worker_m4_v3_1, the implementation worker for Milestone 4 (R4: Architectural Consolidation, Dependency Pruning, Legacy Cleanup & Documentation Modernization).

Your working directory is:
c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m4_v3_1\

You MUST read these reference files BEFORE beginning implementation:
1. c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
2. c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md
3. c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m4_v3_1\handoff.md (F17 & F18 blueprint)
4. c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m4_v3_2\handoff.md (F19 package.json blueprint)
5. c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m4_v3_3\handoff.md (F20 README.md, PROJECT_STATUS.md, docs/ARCHITECTURE_V3.md blueprints)

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

CRITICAL INVARIANTS:
1. DO NOT touch copias/ or clientes/ — they are strictly read-only and must remain pristine (0 uncommitted bytes).
2. DO NOT delete "JumpPlay — Family Reveal & Kinetic Range.html" at the project root (it is required by test/m1-impeccable-sanitization.test.js:14, 152).
3. DO NOT delete scripts/test-*.js (they are preserved to satisfy TC-R4-T1-02 candidate assertion).
4. DO NOT delete scripts/audit-syntax.js, scripts/box-diff-linter.js, scripts/run-low-spec-gate.js, scripts/detect-antipatterns-browser.js, scripts/detect-antipatterns.mjs, scripts/ide-pre-tool-hook.js, scripts/ide-post-edit-hook.js, scripts/apply_index_modernization.js, scripts/verify_index_modernization.js.

TASKS TO EXECUTE:

### Task 1: F17 & F18 Purge of Throwaway Scripts and Root Clutter
Follow exact instructions in explorer_m4_v3_1/handoff.md:
1. Git remove tracked throwaway debug scripts:
   git rm scripts/check-orig-wirestack.js scripts/check-stack-def.js scripts/check-stations.js scripts/check-top-station.js scripts/check-wire-stack.js scripts/find-3d-asset.js scripts/find-away.js scripts/find-beats.js scripts/find-chatorb-chunk.js scripts/find-director.js scripts/find-dollar-lines.js scripts/find-dollar.js scripts/find-exact-model-url.js scripts/find-export-script.js scripts/find-gbcr.js scripts/find-rec-mesh.js scripts/find-script-errors.js scripts/find-stack-els.js scripts/find-syntax-error.js scripts/find-theme-buttons.js scripts/click-chat-orb.js scripts/dump-chat-orb.js scripts/save-raw-chatorb.js scripts/isolate-script-error.js scripts/decompile-chatorb.js scripts/extract-orb-preview.js scripts/fetch-props-tab.js
2. Git remove tracked root chat export and static script HTML dump:
   git rm gemini_share_content.txt scripts/server-served.html
3. Git remove duplicate root empirical audit manifests (canonical copies remain in artifacts/empirical-audit/):
   git rm approval-audit.jsonl baseline-summary.json branches.json ci-coverage-map.csv dependency-audit.json environment.json flakiness.csv orphaned-suites.json policy-decisions.jsonl security-findings.json surviving-mutants.json task-ledger.jsonl test-discovery.json test-inventory.json
4. Remove untracked temporary dumps from root and scripts/ (opened-chat-dump.html, props-tab-dump.html, live-full-page-hydrated.html, screenshot pngs, etc. as specified in explorer_m4_v3_1/handoff.md).
5. Clean scratch: npm run clean:scratch

### Task 2: F19 package.json Dependency Consolidation
Follow exact specification in explorer_m4_v3_2/handoff.md:
1. Update package.json:
   - Version: "3.0.0"
   - Prune "@types/three" from dependencies (move to devDependencies)
   - Move "vitest": "^5.0.5" from dependencies to devDependencies
   - Retain 15 core runtime packages in dependencies: "@google/genai", "@modelcontextprotocol/sdk", "@react-three/drei", "@react-three/fiber", "acorn", "acorn-walk", "cheerio", "gsap", "playwright", "postcss", "react", "react-dom", "three", "xstate", "zod"
   - Explicitly declare in devDependencies: "@playwright/test": "^1.41.0", "@types/three": "^0.161.2", "ajv": "^8.17.1", "vite": "^5.0.0", "vitest": "^5.0.5"
   - Add script: "lint": "node scripts/audit-syntax.js"

### Task 3: F20 Technical Documentation Modernization
Follow exact markdown blueprints in explorer_m4_v3_3/handoff.md:
1. Overwrite README.md with Blueprint 1 (v3.0 architecture, quickstart, dnastudio 21st.dev UI, hybrid persistence, REST API reference, CLI usage, testing architecture, Docker & CI/CD).
2. Overwrite PROJECT_STATUS.md with Blueprint 2 (evidence snapshot 2026-11-06, maturity verified candidate, claim-evidence ledger for R1-R5, 11-client inventory, milestone progress matrix).
3. Create docs/ARCHITECTURE_V3.md with Blueprint 3 (system overview, invariants, relational & NoSQL schema, REST API spec, UI patterns, DevOps pipeline).

### Task 4: Verification & Git Commit
Execute and verify each command:
1. node scripts/audit-syntax.js
2. npm run test:milestones
3. node --test test/persistence-sqlite.test.js test/persistence-docstore.test.js test/persistence-hybrid.test.js test/preview-server-v3-api.test.js test/dnastudio-modern-ui.test.js
4. node --test test/e2e/r1-r5-tier1-feature-coverage.test.js
5. node --test test/e2e/r1-r5-tier2-boundary-corner.test.js
6. node --test test/e2e/r1-r5-tier3-pairwise-combinations.test.js
7. node --test test/e2e/r1-r5-tier4-realworld-scenarios.test.js
8. git status --porcelain (verify copias/ and clientes/ are 100% clean)
9. Commit all changes to integration/staging-consolidated-v3 with message:
   chore(cleanup): consolidate architecture, prune legacy scripts, and modernize documentation (F17-F20)

Write your completion report to c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m4_v3_1\handoff.md and send a coordination message back to the orchestrator.
