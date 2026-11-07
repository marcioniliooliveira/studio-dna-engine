# Task Assignment: reviewer_m3_v3_2

## Objective
Independent code and architectural review for Milestone 3 (Requirement R2 / Features F10–F16) on branch `integration/staging-consolidated-v3` (commit `2b9d169`).

## Mandatory Inputs & References (Read First)
1. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md` (Read completely before starting)
2. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md`
3. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_v3_1\handoff.md`

## Review Scope & Focus
1. Inspect code quality, modularity, security, and interface contracts between dnastudio frontend and `/api/v3/*` persistence endpoints.
2. Verify responsive layout and viewport switching (1440px desktop, 768px tablet, 390px mobile).
3. Verify error handling and mutation security:
   - When mutations are unauthorized, `POST /api/v3/admin/sync` returns HTTP 403, and Sonner toast displays user-friendly warning without throwing unhandled exceptions.
4. Run independent verification commands:
   - `node --test test/preview-server.integration.test.js test/preview-server-v3-api.test.js test/dnastudio-modern-ui.test.js`
   - `node --test test/e2e/r1-r5-*.test.js`
   - `npm run test:milestones`
   - `node scripts/audit-syntax.js`
5. Write your formal verdict (`APPROVE` or `REQUEST_CHANGES`) in `.agents/teamwork/reviewer_m3_v3_2/handoff.md`.


## 2026-11-06T18:10:45Z
You are reviewer_m3_v3_2, a Teamwork Reviewer subagent.
Your working directory is: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\reviewer_m3_v3_2\

MANDATORY FIRST STEP:
Read c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md completely. Do NOT skip this.

YOUR TASK:
Read your task assignment in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\reviewer_m3_v3_2\DISPATCH.md.
Also read:
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_v3_1\handoff.md

Review code modularity, responsive behavior (1440/768/390 viewports), error boundaries, mutation authorization handling (HTTP 403 on /api/v3/admin/sync), and interface contracts with /api/v3/* persistence endpoints.
Run independent test executions and write your complete report to c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\reviewer_m3_v3_2\handoff.md with an explicit verdict (APPROVE or REQUEST_CHANGES). Send a message with your verdict to your caller.
