# Task Assignment: E2E Testing Track (Test Writer)

You are test_writer_track (teamwork_preview_test_writer).
Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\test_writer_track
Parent: orchestrator_8 (0182b98b-f0b8-4ba3-b638-72cd13600fd3)

Read ORIGINAL_REQUEST.md at: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (under ## 2026-10-19T16:33:26Z).
Read PROJECT.md at: c:\Users\wd\Documents\playwright-scraper\PROJECT.md.
Read the survey specifications at:
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\spec_miner_survey_2\spec_pillars_6_7_8.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\spec_miner_survey_3\spec_pillars_9_10_11_microengines.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_1\survey_codebase.md

## Write Ownership
You EXCLUSIVELY own:
1. `TEST_INFRA.md` at project root
2. `TEST_READY.md` at project root
3. All test files under `test/v2.6/`:
   - `test/v2.6/spatial-rtree.test.js`
   - `test/v2.6/css-selector-ast.test.js`
   - `test/v2.6/png-codec.test.js`
   - `test/v2.6/slug-font-compiler.test.js`
   - `test/v2.6/apca-contrast.test.js`
   - `test/v2.6/ndc-projection.test.js`
   - `test/v2.6/scrollbus-phase.test.js`
   - `test/v2.6/run-all.cjs`
4. Fixtures under `test/v2.6/fixtures/`

Do NOT modify implementation code outside `test/v2.6/` and your working directory.

## Testing Track Requirements
1. **Opaque-box & Requirement-Driven**:
   Derived from `ORIGINAL_REQUEST.md` and user-facing specifications, NOT implementation design.
2. **4-Tier Test Architecture**:
   - Tier 1: Feature Coverage (>=5 test cases per feature covering happy paths: R-Tree, Selector AST, PNG codec, Slug font, APCA contrast, NDC projection, ScrollBus).
   - Tier 2: Boundary & Corner Cases (empty inputs, zero/extreme values, single-point bboxes, invalid PNG chunks, corrupted scanline filters, max lightness/darkness, zero velocity flicks).
   - Tier 3: Cross-Feature Combinations (R-Tree collision with typographic energy, APCA contrast with fluid typography scaling, ScrollBus phase mapping with NDC projection).
   - Tier 4: Real-World Application Scenarios (full section capsule slot extraction, multi-card ribbon flight hit-testing, dark-mode brand palette transmute with APCA compliance).
3. **Runnable via `node --test`**:
   All test files must use `node:test` and `node:assert/strict` with zero external dependencies.
4. **Publish `TEST_INFRA.md` and `TEST_READY.md`**:
   Follow the format in the Project Orchestrator guidelines.

## Mandatory Integrity Warning
DO NOT CHEAT. All tests must be genuine and execute real assertions against the reference implementations and mathematical algorithms. DO NOT create fake pass assertions. A teamwork_preview_auditor will independently verify the test suite.

When tests and documentation are created, write `handoff.md` and notify the orchestrator.


## 2026-10-19T16:53:02Z
[Message from orchestrator_8 (0182b98b-f0b8-4ba3-b638-72cd13600fd3)]
You are test_writer_track.
Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\test_writer_track
Read your task assignment in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\test_writer_track\DISPATCH.md and the authoritative request in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (under ## 2026-10-19T16:33:26Z).
Read PROJECT.md at c:\Users\wd\Documents\playwright-scraper\PROJECT.md.

Read the specifications:
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\spec_miner_survey_2\spec_pillars_6_7_8.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\spec_miner_survey_3\spec_pillars_9_10_11_microengines.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_1\survey_codebase.md

Your exclusive write targets are:
1. TEST_INFRA.md at project root
2. TEST_READY.md at project root
3. Test suite under test/v2.6/:
   - test/v2.6/spatial-rtree.test.js
   - test/v2.6/css-selector-ast.test.js
   - test/v2.6/png-codec.test.js
   - test/v2.6/slug-font-compiler.test.js
   - test/v2.6/apca-contrast.test.js
   - test/v2.6/ndc-projection.test.js
   - test/v2.6/scrollbus-phase.test.js
   - test/v2.6/run-all.cjs
   - test/v2.6/fixtures/

Implement the comprehensive 4-Tier test suite using node:test and node:assert/strict with zero external dependencies. Verify syntax via node --check.
Publish TEST_INFRA.md and TEST_READY.md when ready.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All tests must be genuine and execute real assertions against the reference implementations and mathematical algorithms. DO NOT create fake pass assertions. A teamwork_preview_auditor will independently verify the test suite.

Document test suite details in handoff.md and notify orchestrator.
