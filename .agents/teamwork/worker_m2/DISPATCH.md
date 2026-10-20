# Task Assignment: Worker M2 (Core Codebase Repairs)

You are worker_m2 (teamwork_preview_worker).
Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m2
Parent: orchestrator_8 (0182b98b-f0b8-4ba3-b638-72cd13600fd3)

Read ORIGINAL_REQUEST.md at: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (under ## 2026-10-19T16:33:26Z).
Read PROJECT.md at: c:\Users\wd\Documents\playwright-scraper\PROJECT.md.
Read the survey specifications at:
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_1\survey_codebase.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\spec_miner_survey_3\spec_pillars_9_10_11_microengines.md

## Write Ownership
You EXCLUSIVELY own the following 4 files:
1. `src/pro/universal-asset-normalizer.js` (L5: lines 142–174)
2. `src/compiler/kinetic-grammar-schema.js` (L7: `validateDonutScopeInvariants`)
3. `src/orchestration/dag-scheduler.js` (L8: write-lock intersection scheduling)
4. `src/orchestration/blueprint.js` (extend `TASK_KEYS` to permit `writeAllowlist`)

Do NOT edit any other source code, research docs, or test files outside these 4 files and your working directory.

## Implementation Details
1. **L5 Repair in `src/pro/universal-asset-normalizer.js`:**
   Replace the corrupted lines 142–174 with the clean CSS block from `survey_codebase.md §3.1`, removing the orphan brace `}` and the duplicated nested `html { ... } body { ... }` block. Ensure `node --check src/pro/universal-asset-normalizer.js` passes cleanly.
2. **L7 Repair in `src/compiler/kinetic-grammar-schema.js`:**
   Refactor `validateDonutScopeInvariants(cssContent)` to robustly detect when selectors penetrate into slot contents:
   - Detect direct child combinators (e.g., `[data-kinetic-slot] > h1`)
   - Detect attribute-valued selectors (e.g., `[data-kinetic-slot="hero-title"] h1` and `[data-kinetic-slot="hero-title"] > *`)
   - Permit legitimate slot self-styling (`[data-kinetic-slot]`, `[data-kinetic-slot="x"]`, `[data-kinetic-slot][data-slot-type="..."]`)
   - Ensure `node --check src/compiler/kinetic-grammar-schema.js` passes.
3. **L8 Repair in `src/orchestration/dag-scheduler.js` & `src/orchestration/blueprint.js`:**
   - In `src/orchestration/blueprint.js`: Add `'writeAllowlist'` to `TASK_KEYS` (line 6) so blueprint validation accepts write allowlists.
   - In `src/orchestration/dag-scheduler.js`: Implement the write-lock intersection algorithm. When partitioning `ready` tasks into concurrent batches:
     - Check task `writeAllowlist` (also checking `task.writes` or `task.input?.writeAllowlist` if present).
     - Read-only tasks (empty writeAllowlist) can run concurrently with any disjoint writers.
     - Tasks with intersecting write paths (exact match or glob containment `path/**`) MUST NOT run concurrently in the same batch. They must execute in sequential batches.
   - Run existing DAG tests: `node --test test/dag-scheduler.test.js`.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Verification
You MUST execute tests and verify syntax:
- `node --check src/pro/universal-asset-normalizer.js`
- `node --check src/compiler/kinetic-grammar-schema.js`
- `node --check src/orchestration/dag-scheduler.js`
- `node --test test/dag-scheduler.test.js`
- `node --test test/importmap-and-resilience-normalizer.test.js`

Document all commands, stdout/stderr, and file diffs in your `handoff.md`.


## 2026-10-19T16:53:02Z
You are worker_m2.
Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m2
Read your task assignment in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m2\DISPATCH.md and the authoritative request in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (under ## 2026-10-19T16:33:26Z).
Read PROJECT.md at c:\Users\wd\Documents\playwright-scraper\PROJECT.md.

Read the specifications:
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_1\survey_codebase.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\spec_miner_survey_3\spec_pillars_9_10_11_microengines.md

Your exclusive write targets are:
1. src/pro/universal-asset-normalizer.js (L5: lines 142-174 clean CSS replacement)
2. src/compiler/kinetic-grammar-schema.js (L7: validateDonutScopeInvariants robust combinator/attribute detection)
3. src/orchestration/dag-scheduler.js (L8: write-lock intersection scheduling)
4. src/orchestration/blueprint.js (permit writeAllowlist in TASK_KEYS)

Implement the exact repairs, run syntax checks and existing test suites:
- node --check src/pro/universal-asset-normalizer.js
- node --check src/compiler/kinetic-grammar-schema.js
- node --check src/orchestration/dag-scheduler.js
- node --test test/dag-scheduler.test.js
- node --test test/importmap-and-resilience-normalizer.test.js

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Document commands and results in handoff.md and notify orchestrator.
