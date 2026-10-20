# DISPATCH: reviewer_m3_1

## Identity
- Name: reviewer_m3_1
- Type: teamwork_preview_reviewer
- Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\reviewer_m3_1

## Authoritative Documents
- Mandatory User Request: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
- Scope Document: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_5\PROJECT.md
- Worker Remediation Handoff: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_remediation_2\handoff.md

## Review Scope & Instructions
1. Read `ORIGINAL_REQUEST.md` (mandatory).
2. Execute tests:
   - `npx vitest run src/components/WorkStage/__tests__/math.spec.ts`
   - `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"`
   - `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"`
3. Verify Guardrail 1 (Sem <ScrollControls>): search codebase for `<ScrollControls>` or Drei scroll controls — must be 0 occurrences; scroll must be driven by Lenis & GSAP.
4. Verify Guardrail 2 (GLSL Equations Intact): inspect `RibbonCardMaterial.ts` and `math.ts`, confirming equations (`sheetShape`, `sheetShapeSlope`, `sheetWind`, `sheetDome`, `leanRamp`, `leanSlope`, `sheetLit`, `uvCover`, `roundedBox`) are preserved verbatim.
5. Verify Guardrail 3 (Contrato 4 Projetos & Tokens): confirm exactly 4 cards (`evo-money`, `plant-tag`, `swisshaus`, `betahaus`) and tokens from `referenceData.ts`.
6. Write a detailed review handoff with explicit verdict (**APPROVE** or **REQUEST_CHANGES**) to `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\reviewer_m3_1\handoff.md`.
7. Notify orchestrator via `send_message`.


## 2026-10-15T22:01:40Z
You are reviewer_m3_1. Your working directory is c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\reviewer_m3_1.
Read your instructions in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\reviewer_m3_1\DISPATCH.md.
MANDATORY: Read c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md before doing any work.
Run tests:
- npx vitest run src/components/WorkStage/__tests__/math.spec.ts
- npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"
- npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"
Review Guardrail 1 (no ScrollControls), Guardrail 2 (GLSL equations intact), Guardrail 3 (4 projects & tokens).
Write your handoff report with an explicit verdict (APPROVE or REQUEST_CHANGES) to c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\reviewer_m3_1\handoff.md.
Notify me via send_message when done.
