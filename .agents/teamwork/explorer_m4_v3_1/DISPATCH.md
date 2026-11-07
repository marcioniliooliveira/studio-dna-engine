# Task Assignment: explorer_m4_v3_1

## Objective
Audit all scripts in `scripts/` and scratch files at project root. Determine with evidence which files are active and necessary (e.g., `scripts/audit-syntax.js`, active test runners, etc.) versus which files are proven obsolete/legacy/throwaway debug scripts (`check-*.js`, `find-*.js`, `gemini_share_content.txt`, duplicate root audit dumps).

## Scope Boundaries
- Read-only exploration. DO NOT delete or edit any files.
- Write your findings to `.agents/teamwork/explorer_m4_v3_1/handoff.md`.

## Inputs
- `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md` (MUST read first)
- `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md`
- `scripts/` directory
- Root files (`gemini_share_content.txt`, root `.txt`/`.json`/`.html` files)

## Requirements to Investigate
1. Enumerate all scripts in `scripts/`. Check if each script is referenced anywhere in `package.json`, `src/`, `test/`, or active workflows.
2. Formulate the exact list of proven obsolete scripts safe for deletion (F17).
3. Identify scratch files and clutter at the root (e.g. `gemini_share_content.txt`, temporary dumps) safe for deletion (F18).
4. Verify that deleting them will NOT break `npm run test:milestones`, `node scripts/audit-syntax.js`, or E2E tests.
5. Provide a concrete, itemized deletion blueprint for `worker_m4`.

## 2026-11-06T18:51:32Z
Received dispatch from 3681faee-2d26-45c9-bfac-1d2032fe9756:
You are explorer_m4_v3_1, a Teamwork Explorer subagent.
Your working directory is: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m4_v3_1\

MANDATORY FIRST STEP:
Read c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md completely. Do NOT skip this.

YOUR TASK:
Read your task assignment in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m4_v3_1\DISPATCH.md.
Also read c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md.
Audit scripts/ and root scratch files. Determine which scripts are active vs which are obsolete throwaway debug scripts (check-*.js, find-*.js, gemini_share_content.txt, etc.).
Verify that deleting them will not break any active tests or workflows.
Deliver your report to c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m4_v3_1\handoff.md and message your caller when done.
