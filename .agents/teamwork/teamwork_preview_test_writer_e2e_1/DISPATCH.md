# Dispatch: E2E Test Writer (Tiers 1-4)

**Target**: C:\Users\wd\Documents\playwright-scraper
**Working Directory**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_test_writer_e2e_1
**Authoritative Request**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
**Project Scope Document**: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
**Test Infra Specification**: C:\Users\wd\Documents\playwright-scraper\TEST_INFRA.md

**Write Ownership (Exclusively owned files)**:
- `test/e2e/e2e-harness.js`
- `test/e2e/tier1-feature-coverage.test.js`
- `test/e2e/tier2-boundary-corner.test.js`
- `test/e2e/tier3-pairwise-combinations.test.js`
- `test/e2e/tier4-realworld-scenarios.test.js`
- `TEST_READY.md` (at project root)

**Mandatory Integrity Warning**:
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

**Objective**:
Build the comprehensive 4-Tier opaque-box test suite for the project per TEST_INFRA.md:
1. `test/e2e/e2e-harness.js`: Test harness managing ephemeral server lifecycle (port 4000) or headless Playwright context for testing both Desktop (1440x900) and Mobile (390x844).
2. `test/e2e/tier1-feature-coverage.test.js`: >=85 test cases covering all 17 features in isolation (>=5 per feature: CDP decompiler, sanitization, \vec{C}(s) spline, optical anchor projection, 3D <3MB disk, <4MB VRAM, CSS @scope, Edge CDN static, Next.js 15 RSC, Anti-Slop, 0px² AABB, 0px bleed, >=58fps scroll).
3. `test/e2e/tier2-boundary-corner.test.js`: >=85 test cases covering edge cases & boundaries (empty inputs, ultra-wide viewports, 375px/390px mobile bleed, missing slots, reduced motion, low FPS fallback, max VRAM, software rasterizer sub-pixel jitter, 3D matrix3d without depth).
4. `test/e2e/tier3-pairwise-combinations.test.js`: >=17 test cases testing pairwise interactions (e.g. CDP sanitization + @scope; \vec{C}(s) trajectory + portrait mobile rig; KTX2 textures + Next.js RSC island; 3D declared pairs + AABB collision; etc.).
5. `test/e2e/tier4-realworld-scenarios.test.js`: >=9 end-to-end application scenarios exercising full workflows.
6. Verify test execution via `node --test test/e2e/*.test.js`.
7. Once all tests and runner are in place, generate `TEST_READY.md` at project root with runner command and coverage summary.
8. Document all commands and results in `handoff.md` and send message to parent.


## 2026-10-03T07:27:40Z
From: 7f17d6be-3ed5-4772-a1bc-f856778ab425
Content:
You are the E2E Test Writer agent.
Your working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_test_writer_e2e_1
Authoritative user request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
Project Scope Document: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
Test Infra Specification: C:\Users\wd\Documents\playwright-scraper\TEST_INFRA.md
Your dispatch instructions: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_test_writer_e2e_1\DISPATCH.md

You MUST read ORIGINAL_REQUEST.md first.
Implement the comprehensive 4-Tier opaque-box test suite per TEST_INFRA.md:
- test/e2e/e2e-harness.js (ephemeral preview server & multi-viewport harness for 1440x900 and 390x844)
- test/e2e/tier1-feature-coverage.test.js (>=85 test cases covering all 17 features)
- test/e2e/tier2-boundary-corner.test.js (>=85 test cases covering boundary and edge cases)
- test/e2e/tier3-pairwise-combinations.test.js (>=17 test cases covering pairwise feature interactions)
- test/e2e/tier4-realworld-scenarios.test.js (>=9 realistic application scenarios)
- Run and verify tests using node --test test/e2e/*.test.js
- Publish TEST_READY.md at project root with runner command and coverage summary.
- Write your comprehensive findings to C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_test_writer_e2e_1\handoff.md.
- Send a message to parent when completed.
