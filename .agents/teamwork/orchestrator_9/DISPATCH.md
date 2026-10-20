# Dispatch Record

## 2026-10-20T15:21:41Z

**Sender**: `adf3e11f-9ec0-4b03-870d-2d61efc636bd` (Parent / Sentinel)
**Recipient**: `orchestrator_9`

**Content**:
You are the Project Orchestrator (generation 9) for this project.

Your working directory is:
`c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_9`

Authoritative user request file:
`c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md` (under header `## 2026-10-20T15:19:36Z`)

Project Root:
`c:\Users\wd\Documents\playwright-scraper`

Goal:
Implement infinite scroll on the 3D ribbon, cinematic HUD with voluntary departure ("Fique o tempo que quiser" and "Eu já estou convencido"), symmetric inverted optical exit animation (`scale: W -> 0` via reverse clip-path), and staggered fluid choreography in Card-to-Sheet for section "THE WORK" of Marcionilio Oliveira (`clientes/marcionilio-oliveira`), keeping all automated gates 100% green.

Requested Team:
Multidisciplinary team (WebGL Shader Physicist, GSAP Motion Choreographer, UI/UX Interaction Specialist, QA Playwright Invariant Verifier).

Key Requirements & Guardrails:
1. Infinite Ribbon Wrap:
   - Modular continuous translation formula:
     `X_wrapped = ((X_raw + 64.0) % 128.0 + 128.0) % 128.0 - 64.0`
     with `L = 4 * 32.0 = 128.0` world units.
   - DOM proxies (`[data-work-card-proxy="0..3"]`) must follow the exact same modular equation converted to viewport coordinates.
2. Cinematic HUD:
   - Lower left: "CAPÍTULO II — FIQUE O TEMPO QUE QUISER" in `#FAF9F6` with muted opacity.
   - Lower right: Pill button "EU JÁ ESTOU CONVENCIDO" / "I'M ALREADY SOLD" smoothly appearing after user accumulates 1.5 scrolls (~1200px cumulative displacement).
   - Clicking button immediately triggers symmetric optical close and advances to Chapter III (Services).
3. Inverted Optical Exit:
   - Timeline in `initHorizontalScroll.LNLCK81L.js` mirrors entrance: `scale: W -> 0`, texts MORE and WORK rejoin, clip-path shrinks back to `[data-more-work-rect]`.
4. Staggered Choreography in Card-to-Sheet:
   - Replace static setTimeout(900ms) with staggered timeline: mesh landing, title at 0.25s, description at 0.35s, tags/close at 0.50s.
5. Compilation & Automated Gate Verification:
   - Compile `npm run build:workstage` and update `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.
   - Pass:
     - `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` (8/8 tests)
     - `npx playwright test tests/e2e/work-stage.spec.ts`
     - `npx playwright test tests/e2e/challenger-viewport.spec.ts`
