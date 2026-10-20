# DISPATCH — worker_m1_2

## Task Assignment
- Role: Impeccable Quality Gate & JumpPlay Sanitization Worker
- Working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m1_2
- Workspace root: C:\Users\wd\Documents\playwright-scraper
- Authoritative Request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (specifically read ## 2026-10-04T20:14:18Z, Requirement R1)
- Project Scope: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
- Survey Reference: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_2_1\handoff.md and C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\spec_miner_survey_2_3\handoff.md
- Impeccable Skill Files: C:\Users\wd\.gemini\config\skills\impeccable\scripts\detector\

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Exclusive Write Ownership
You exclusively own and may edit or create ONLY these files:
- `scripts/detect-antipatterns.mjs`
- `scripts/detect-antipatterns-browser.js`
- `src/qa/impeccable-gate.js`
- `src/qa/unified-quality-gate.js`
- `clientes/jumpflex-home-evolution/JumpPlay — Family Reveal & Kinetic Range.html`
- `JumpPlay — Family Reveal & Kinetic Range.html`
- `test/m1-impeccable-sanitization.test.js`

## Objectives
1. **Copy / Adapt Detector Tools**:
   - Copy `C:\Users\wd\.gemini\config\skills\impeccable\scripts\detector\detect-antipatterns.mjs` and `detect-antipatterns-browser.js` into `scripts/`.
   - Ensure `scripts/detect-antipatterns.mjs` can run smoothly via Node.js CLI.
2. **Quality Gate Integration**:
   - Implement `src/qa/impeccable-gate.js` exposing an asynchronous function `runImpeccableGate(pageOrHtml, options)`. It should use the browser bundle via Playwright `page.evaluate(() => window.impeccableDetect())` or static Cheerio analysis, returning `{ passed, violations, summary }`.
   - Wire `impeccableGate` into `src/qa/unified-quality-gate.js` as Tier 4 Quality Gate. Zero tolerance (0 violations) for `dark-glow`, `nested-cards`, `overused-font`, `bounce-easing`.
3. **JumpPlay Screen Sanitization**:
   - Sanitize `clientes/jumpflex-home-evolution/JumpPlay — Family Reveal & Kinetic Range.html`:
     - Flatten all 26 `nested-cards` violations in `#cotacao-b2b` (remove the `p-[1px] bg-gradient-to-br from-white/12 to-white/4` wrapper around inputs, model option buttons, steppers, and trust cards; replace with clean single borders and dividers).
     - Remove `animate-ping` pulsing dot on line 1006.
     - Eliminate any zero-offset chromatic glow or halo effects.
   - Also sanitize root `JumpPlay — Family Reveal & Kinetic Range.html`:
     - Replace `Space Grotesk` and `Plus Jakarta Sans` with approved font tokens (`Bebas Neue`, `Manrope`, `JetBrains Mono`).
     - Remove neon hard drop shadows `shadow-[..._#1677FF]` and replace with subtle elevation shadows.
     - Flatten nested cards and remove pulsing dots.
4. **Unit Test Suite**:
   - Create `test/m1-impeccable-sanitization.test.js`.
   - Test `detect-antipatterns.mjs` CLI and `src/qa/impeccable-gate.js` against intentional fixtures and sanitized JumpPlay screens.
   - Assert 0 occurrences of `dark-glow`, `nested-cards`, `overused-font`, and `bounce-easing`.
   - Run `node --test test/m1-impeccable-sanitization.test.js` and verify all tests pass with exit code 0.
5. Report all file changes, commands, and passing test results in `handoff.md`.


## 2026-10-04T20:32:50Z
[Message] timestamp=2026-10-04T20:32:50Z sender=55b2bb35-9b46-4caf-b378-9d5228026764 priority=MESSAGE_PRIORITY_HIGH content=You are worker_m1_2, the Impeccable Quality Gate & JumpPlay Sanitization Worker.
Working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m1_2
Workspace root: C:\Users\wd\Documents\playwright-scraper
Authoritative Request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (specifically read ## 2026-10-04T20:14:18Z, Requirement R1)
Project Scope: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
Survey References:
- C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_2_1\handoff.md
- C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\spec_miner_survey_2_3\handoff.md
Impeccable skill files: C:\Users\wd\.gemini\config\skills\impeccable\scripts\detector\
Dispatch file: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m1_2\DISPATCH.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Exclusive Write Ownership:
- scripts/detect-antipatterns.mjs
- scripts/detect-antipatterns-browser.js
- src/qa/impeccable-gate.js
- src/qa/unified-quality-gate.js
- clientes/jumpflex-home-evolution/JumpPlay — Family Reveal & Kinetic Range.html
- JumpPlay — Family Reveal & Kinetic Range.html
- test/m1-impeccable-sanitization.test.js
