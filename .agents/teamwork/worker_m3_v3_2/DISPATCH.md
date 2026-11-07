# Task Assignment: worker_m3_v3_2 (Milestone 3 Remediation)

## Objective
Remediate the specific findings identified by `reviewer_m3_v3_2` in Milestone 3 (Requirement R2 / dnastudio UI/UX modernization) on branch `integration/staging-consolidated-v3`.

## Mandatory Inputs & References (Read First)
1. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md` (Read completely before starting)
2. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md`
3. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\reviewer_m3_v3_2\handoff.md` (MUST address all findings)
4. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_v3_1\handoff.md`

## Specific Defect Remediation Items
1. **Route Mismatch & Safe Slug Fix**:
   - In `src/server/views/dnastudio-dashboard.js` (around line 2132), `runMultifactorAudit()` calls `/api/v2/audit/multifactor/${encodeURIComponent(slug)}`.
   - The backend route in `src/server/routes/v2-audit.js:84` is:
     `const match = pathname.match(/^\/api\/v2\/audit\/([a-zA-Z0-9_-]+)$/);`
     `const clientSlug = match[1];`
   - Fix the client route to call `/api/v2/audit/${encodeURIComponent(slug)}`.
2. **Dynamic Radar Score Computation**:
   - In `runMultifactorAudit()`, replace the hardcoded coordinates `updateRadarData([1.0, 0.92, 0.99, 0.94, 1.0, 1.0])` with dynamic score calculation extracted from the server response:
     - Anti-Slop (antiSlop.score or 0.95)
     - APCA Lc (contrast.score or 0.90)
     - Inertial FPS (motion.score or 0.98)
     - VRAM (vram.score or 0.92)
     - Console 0-Err (console.score or 1.0)
     - Network 0-404 (network.score or 1.0)
   - Ensure the radar polygon dynamically renders the real audit report metrics.
3. **Mutation Token & 403 Read-Only Toast Handling**:
   - In `generateClientProject`, `runAudit`, `startDeepExtract`, and `runMultifactorAudit`:
     - Attach `Authorization: Bearer ${token}` header if `window.dnaApi?.mutationToken` or `localStorage.getItem('dna_mutation_token')` exists.
     - Check `response.status === 403`. If 403, dismiss loading toast and display user-friendly warning toast:
       `Sonner.warning("Modo somente-leitura ativo. Mutações administrativas estão desabilitadas.");`
4. **Mobile Initial Sidebar Width**:
   - Add a CSS media query in `dnastudio-dashboard.js`:
     `@media (max-width: 768px) { .app-sidebar { width: 68px !important; } }`
     or ensure it defaults to collapsed on viewport width <= 768px.
5. **Escape Script Injections in JSON Bootstrap**:
   - Ensure `<script id="__DNA_BOOTSTRAP__">` safely replaces `</script` with `<\\/script` to prevent script breakout.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Verification & Handoff
- Run all test suites:
  * `node --test test/preview-server.integration.test.js test/preview-server-v3-api.test.js test/dnastudio-modern-ui.test.js`
  * `node --test test/challenger-m3-adversarial.test.js test/challenger-m3-stress.test.js`
  * `node --test test/e2e/r1-r5-*.test.js`
  * `npm run test:milestones`
  * `node scripts/audit-syntax.js`
- Commit changes to `integration/staging-consolidated-v3` with message: `fix(dnastudio): remediate audit route, dynamic radar coordinates, and mutation authorization in 21st.dev ui`.
- Deliver report to `.agents/teamwork/worker_m3_v3_2/handoff.md`.
