# Task Assignment: auditor_m3_v3_1

## Objective
Forensic Integrity Audit of Milestone 3 (Requirement R2 / Features F10–F16) on branch `integration/staging-consolidated-v3` at commit `2b9d1698d133752a4fafe13dababba7ccd000feb`.

## Mandatory Inputs & References (Read First)
1. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md` (Read completely before starting)
2. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md`
3. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_v3_1\handoff.md`

## Forensic Verification Checklist (Integrity Forensics)
1. **Source Code Integrity**: Check `src/server/views/dnastudio-dashboard.js` and `src/server/preview-server.js`:
   - Zero hardcoded test return strings or values designed to trick test assertions.
   - Zero dummy/facade implementations.
   - Genuine implementation of Bento ribbon, ⌘K command palette, interactive file viewer, diff slider, 38-variable visualizer, sortable runs table, and Sonner toasts.
2. **Directory Immutability (Client Isolation)**:
   - `git status --porcelain copias/` MUST be completely empty (0 bytes).
   - `git status --porcelain clientes/` MUST be completely empty (0 bytes).
3. **Truth Protocol & Governance (AGENTS.md)**:
   - No prohibited words: `Producao Isolada`, `ICM Ready`, `pronto para deploy`.
   - Mandatory `● Experimental` badge on client projects.
4. **Independent Execution of Test Suites**:
   - `node --test test/preview-server.integration.test.js test/preview-server-v3-api.test.js test/dnastudio-modern-ui.test.js`
   - `node --test test/e2e/r1-r5-*.test.js` (54/54 PASS)
   - `npm run test:milestones` (79/79 PASS)
   - `node scripts/audit-syntax.js`
5. **Git Commit & Trunk Verification**:
   - Verify branch is `integration/staging-consolidated-v3`.
   - Verify commit `2b9d1698d133752a4fafe13dababba7ccd000feb`.
6. Deliver binary verdict (`CLEAN` or `INTEGRITY VIOLATION`) to `.agents/teamwork/auditor_m3_v3_1/handoff.md`.


## 2026-11-06T18:10:46Z
You are auditor_m3_v3_1, a Teamwork Forensic Auditor subagent.
Your working directory is: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\auditor_m3_v3_1\

MANDATORY FIRST STEP:
Read c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md completely. Do NOT skip this.

YOUR TASK:
Read your task assignment in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\auditor_m3_v3_1\DISPATCH.md.
Conduct a rigorous Forensic Integrity Audit on branch integration/staging-consolidated-v3 (commit 2b9d1698d133752a4fafe13dababba7ccd000feb):
1. Check for hardcoded test results, facade implementations, fake toasts or dummy components.
2. Verify copias/ and clientes/ directory immutability (git status --porcelain copias/ clientes/ must be 0 bytes).
3. Verify truth protocol & AGENTS.md governance (no prohibited words, mandatory Experimental badge).
4. Run independent verification of all test suites (node --test test/preview-server.integration.test.js test/preview-server-v3-api.test.js test/dnastudio-modern-ui.test.js, node --test test/e2e/r1-r5-*.test.js, npm run test:milestones, node scripts/audit-syntax.js).
5. Write your complete audit report to c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\auditor_m3_v3_1\handoff.md with an explicit binary verdict (CLEAN or INTEGRITY VIOLATION). Send a message with your verdict to your caller.
