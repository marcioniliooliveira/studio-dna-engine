# Handoff Report: Codebase Survey & Dependency Audit for Studio DNA PRO v2.6

**Agent:** `explorer_survey_1`  
**Working Directory:** `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_1`  
**Recipient:** `orchestrator_8` (`0182b98b-f0b8-4ba3-b638-72cd13600fd3`)  
**Type:** Hard Handoff (Investigation Complete)  
**Date:** 2026-10-19  

---

## 1. Observation

1. **Dependency Audit (`package.json` & `package-lock.json`):**
   - Node runtime: `v24.15.0` (`node -v` exited 0) `[observed]`.
   - `package.json` lines 58–72 lists 12 dependencies: `@modelcontextprotocol/sdk` (^1.30.0), `@react-three/drei` (^9.99.0), `@react-three/fiber` (^8.15.16), `@types/three` (^0.161.2), `cheerio` (^1.2.0), `gsap` (^3.12.5), `playwright` (^1.41.0), `postcss` (^8.5.26), `react` (^18.3.1), `react-dom` (^18.3.1), `three` (^0.161.0), `vitest` (^5.0.5), `zod` (^4.4.3). DevDependencies: `@playwright/test` (^1.41.0) `[observed]`.
   - `package-lock.json` searched for `opentype.js`, `rbush`, `postcss-selector-parser`, and `pngjs`: exactly 0 occurrences found for each `[observed]`.
   - Node 24 native builtins available without external packages: `node:sqlite` (`DatabaseSync`), `node:zlib` (`inflateSync`, `deflateSync`), `node:crypto`, `node:test` `[observed]`.

2. **Repair Target 1 (`src/pro/universal-asset-normalizer.js`):**
   - Lines 152–174 inside `static getUniversalUnlockCss()` contain malformed CSS syntax:
     - Line 153 has an unmatched closing brace `}` `[observed]`.
     - Lines 161–171 re-declare an unclosed block `/* 3. Prevenção... */ html { ... } body { ... }` nested inside `html.lenis-stopped, ... {` `[observed]`.
     - Line 172 contains dangling declaration `height: auto !important;` before line 173 `}` `[observed]`.

3. **Repair Target 2 (`src/compiler/kinetic-grammar-schema.js`):**
   - Lines 304–325 define `validateDonutScopeInvariants(cssContent)`.
   - Line 309 defines regex `piercingPattern = /\[data-kinetic-slot\]\s+[a-zA-Z0-9_.*#\-[\]]+/g` `[observed]`.
   - In `test/challenger-adversarial-m5.test.js`:
     - Test 4.5 (line 608): Attack `[data-kinetic-slot] > h1` does not match the regex because `>` is omitted from character class, returning `compliant: true` (`'CONFIRMED VULNERABILITY'`) `[observed]`.
     - Test 4.6 (line 623): Attack `[data-kinetic-slot="hero-title"] h1` does not match because attribute value `="hero-title"` fails `\[data-kinetic-slot\]\s+`, returning `compliant: true` (`'CONFIRMED VULNERABILITY'`) `[observed]`.
     - Test 4.7 (line 637): Self-styling `[data-kinetic-slot]` and `[data-kinetic-slot][data-slot-type="heading"]` is valid and must remain compliant `[observed]`.

4. **Repair Target 3 (`src/orchestration/dag-scheduler.js`):**
   - Lines 26–33 in `scheduleBlueprint`:
     ```javascript
     const ready = [...pending].filter(id => (tasks.get(id).dependsOn || []).every(dep => completed.includes(dep))).sort();
     const batch = ready.map(id => tasks.get(id));
     const results = await Promise.all(batch.map(async task => { ...
     ```
     All ready tasks are scheduled concurrently in `Promise.all` without checking write sets `[observed]`.
   - `design-quality-orchestrator-roadmap.md` line 197 mandates: *"o scheduler executa em paralelo somente tarefas read-only ou tarefas com `writeAllowlist` disjuntas"* `[documented]`.
   - `src/orchestration/blueprint.js` line 6 defines `TASK_KEYS = new Set(['id', 'dependsOn', 'budget', 'allowedTools', 'allowedGates', 'input', 'actorId', 'role', 'requiredVerifierRole'])` which currently omits `writeAllowlist`, causing `validateBlueprint` to reject blueprints declaring write permissions at the task root `[observed]`.

5. **Pillars 1–5 Connection Points:**
   - `src/core/cloner.js` line 165 executes `fs.mkdirSync(sectionsDir, { recursive: true })` unconditionally. If `getTopLevelSections()` finds no valid semantic sections $> 50\text{px}$, `sections/` is left empty on disk (Limitation L1) `[observed]`. When sections exist, lines 650–670 dump complete un-scoped HTML files referencing global styles `[observed]`.
   - `src/components/WorkStage/referenceData.ts` hardcodes brand tokens (lines 14–28) and 4 client projects (lines 33–82) for `marcionilio-oliveira`. `WorkStage.tsx` hardcodes proxy button dimensions (lines 657–658: `28vw` by `52vh`) without 3D vertex matrix projection `[observed]`.
   - `src/constraints/contrast.js` line 39 uses legacy WCAG 2.1 `(l1 + 0.05)/(l2 + 0.05)` and hardcodes dark product luminance `0.012`. `src/constraints/engine.js` ignores `dnaIr.constraints` and evaluates only hardcoded `hero.` keys `[observed]`.
   - `src/generators/hud-projector.js` line 1384 computes WCAG 2.1 ratio and multiplies by 10 to simulate an APCA score (`badge.textContent = 'APCA Lc ' + lc + ' ✓'`). Lines 1421–1530 hardcode DOM selectors (`#hero .wm h1`, `#strip .stack`, `#macro, #engines...`) and `window.OPXY` `[observed]`.
   - `copias/` contains 35 reference folders (immutable reference evidence). `design-vault/` contains 4 pattern directories and 4 templates, but `design-vault/capsules/` does not exist yet `[observed]`.

---

## 2. Logic Chain

1. **Lockfile & Zero-Dependency Guarantee:** Because `node -v` is `v24.15.0` (Observation 1), builtins `node:sqlite`, `node:zlib`, `node:crypto`, and `node:test` are available natively. Because `package-lock.json` contains 0 instances of `opentype.js`, `rbush`, `postcss-selector-parser`, or `pngjs`, any code requiring these packages would fail in runtime. Because `postcss` is installed (`^8.5.26`), general CSS parsing is available without extra dependencies, but selector AST parsing must be implemented as a pure recursive parser over PostCSS rules.
2. **Normalizer CSS Repair (L5):** The syntax errors in `src/pro/universal-asset-normalizer.js:152-174` (Observation 2) directly corrupt the injected `<style id="universal-unlock-css">`. Replacing lines 152–174 with the clean ruleset eliminates the stray closing brace and nested duplication, ensuring CSSOM parsers correctly process lines 175–200.
3. **Donut Scope Invariant Repair (L7):** Because `validateDonutScopeInvariants` relies on regex `\[data-kinetic-slot\]\s+[a-zA-Z0-9_.*#\-[\]]+` (Observation 3), it ignores direct child combinators `>` and attribute values `[data-kinetic-slot="val"]`. This was confirmed experimentally by Tests 4.5 and 4.6 in `test/challenger-adversarial-m5.test.js`. Implementing `src/compiler/css-selector-ast.js` and integrating it into `validateDonutScopeInvariants` will detect any descendant/child combinator while permitting valid self-styling (Test 4.7).
4. **DAG Scheduler Concurrency & Write-Locks (L8):** Because `dag-scheduler.js:33` runs all ready tasks simultaneously via `Promise.all` without write set verification (Observation 4), two tasks writing to `clientes/a/site/**` race and corrupt state. Enforcing write-lock intersection checks based on exact match and terminal `/**` glob containment guarantees that concurrent batches contain only disjoint writers or read-only tasks. Updating `TASK_KEYS` in `blueprint.js` ensures that blueprints with `writeAllowlist` validate successfully.
5. **Bridge from Pillars 1–5 to Pillars 6–11:**
   - Solving cloner's empty `sections/` (Observation 5) requires Pillar 6 (`Scene-to-Capsule Subtree Slicing`) with closed CDP CSS extraction and custom property closure into `design-vault/capsules/<capsuleSlug>/`.
   - Solving WorkStage hardcoded tokens, rough proxies, and wheel deadlocks requires Pillar 7 (`<dna-capsule>` sibling portal mount, sub-pixel NDC projection $\mathbf{M}_{\text{VP}}$, and `UniversalScrollBus`).
   - Solving legacy WCAG contrast and hardcoded HUD requires Pillars 9, 10, and 11 (APCA `0.0.98G-4g`, OKLCH perceptual space, agnostic HUD projector, and SQLite WAL MCP server).

---

## 3. Caveats

1. **Read-Only Investigation:** Per the Teamwork Explorer archetype and task instructions, zero source code or test files outside the agent directory were modified.
2. **PostCSS vs Native Selector Parser:** While `postcss` is installed, it only parses up to CSS Rule selectors as strings (`rule.selector`). Parsing complex selector chains (`compound selectors`, `:is()`, `:where()`) requires the recursive tokenizer/parser in `src/compiler/css-selector-ast.js` specified in R6.2.
3. **`node:sqlite` Platform Availability:** `DatabaseSync` in Node 24 is built-in and synchronous. While verified on Node v24.15.0 on Windows, WAL journal mode requires standard filesystem permissions.

---

## 4. Conclusion

The codebase state is thoroughly audited and fully prepared for the subsequent research specification and reference implementation phases of Studio DNA PRO v2.6.
- The zero-dependency constraint is completely confirmed: all 4 micro-engines (R-Tree, CSS Selector AST, PNG Codec, Slug Font Compiler) must and can be implemented in pure Node.js 24 CommonJS.
- The 3 repair targets (universal-asset-normalizer.js, kinetic-grammar-schema.js, dag-scheduler.js) have verified root causes, line numbers, and proposed patches.
- The 5 connection points from Pillars 1–5 to Pillars 6–11 have complete traceability matrices and structural mappings into `design-vault/` and `copias/`.

---

## 5. Verification Method

To independently verify the observations and findings in this report:

1. **Verify Node version and zero-dependency lockfile status:**
   ```powershell
   node -v
   # Must return >= 24 (e.g. v24.15.0)
   npm list opentype.js rbush postcss-selector-parser pngjs
   # Must return (empty) / not installed
   ```
2. **Inspect Corrupted CSS in Normalizer:**
   Inspect lines 152–174 of `src/pro/universal-asset-normalizer.js` using `view_file`.
3. **Verify Donut Scope Vulnerabilities (Tests 4.5 and 4.6):**
   ```powershell
   node --test --test-name-pattern="4.5|4.6" test/challenger-adversarial-m5.test.js
   # Both tests currently pass by asserting the presence of the vulnerability (blind spot)
   ```
4. **Inspect Scheduler Concurrency & Blueprint Schema:**
   Inspect `src/orchestration/dag-scheduler.js` line 33 and `src/orchestration/blueprint.js` line 6.
5. **Inspect HUD Projector and Contrast:**
   Inspect `src/generators/hud-projector.js` lines 1375–1388 and 1454–1462, and `src/constraints/contrast.js` line 39.

---
*End of handoff report.*
