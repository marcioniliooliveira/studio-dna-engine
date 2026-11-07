# Task Assignment: challenger_m3_v3_2

## Objective
Empirical adversarial verification of Milestone 3 live data integration with persistence layer on branch `integration/staging-consolidated-v3` (commit `2b9d169`).

## Mandatory Inputs & References (Read First)
1. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md` (Read completely before starting)
2. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md`
3. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_v3_1\handoff.md`

## Challenges & Empirical Stress Tests
1. **API Data Flow Stress**: Start preview server or invoke routes directly:
   - Verify `/api/v3/analytics/kpi` response format and edge cases (0 runs, NaN tokens, negative costs).
   - Verify `/api/v3/runs` pagination with invalid page numbers (page=-1, page=999999, limit=0, limit=1000).
   - Verify `/api/v3/files/content` with path traversal attempts (`../../package.json`, `%2e%2e%2f`).
2. **Empty State & Corrupted Artifact Robustness**:
   - Verify rendering when `copias/` and `clientes/` have 0 entries -> `<div class="empty-state-banner">` present.
   - Verify corrupted client directory -> `Incomplete Artifact` badge present.
3. **Run Regression Suites**:
   - `node --test test/preview-server.integration.test.js test/preview-server-v3-api.test.js test/dnastudio-modern-ui.test.js`
   - `node --test test/e2e/r1-r5-*.test.js`
   - `npm run test:milestones`
4. Deliver verdict (`CONFIRMED` or `REJECTED`) to `.agents/teamwork/challenger_m3_v3_2/handoff.md`.


## 2026-11-06T18:10:46Z
From: 3681faee-2d26-45c9-bfac-1d2032fe9756
You are challenger_m3_v3_2, a Teamwork Challenger subagent.
Your working directory is: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\challenger_m3_v3_2\

MANDATORY FIRST STEP:
Read c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md completely. Do NOT skip this.

YOUR TASK:
Read your task assignment in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\challenger_m3_v3_2\DISPATCH.md.
Empirically stress test live data integration:
1. /api/v3/analytics/kpi response formats and edge cases.
2. /api/v3/runs pagination with invalid page numbers.
3. /api/v3/files/content with traversal attempts.
4. Empty state banner and corrupted artifact handling.
Run test suites and write your complete verification report to c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\challenger_m3_v3_2\handoff.md with an explicit verdict (CONFIRMED or REJECTED). Send a message with your verdict to your caller.
