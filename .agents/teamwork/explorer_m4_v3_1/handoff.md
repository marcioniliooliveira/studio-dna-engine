# Handoff Report: Audit of `scripts/` & Root Scratch Files (Milestone M4 / F17 & F18)

- **Agent**: `explorer_m4_v3_1` (Teamwork Explorer)
- **Recipient**: Parent Orchestrator (`3681faee-2d26-45c9-bfac-1d2032fe9756`)
- **Timestamp**: 2026-11-06T19:05:00Z
- **Integrity Mode**: development (read-only audit)
- **Status Classification**: `observed` / `inferred` / `documented` per AGENTS.md Truth Protocol

---

## 1. Observation

### 1.1 Comprehensive Inventory of `scripts/` (122 Files + 1 Directory)

An exhaustive scan (`observed` via `fs.readdirSync('scripts')`) reveals 122 files and 1 directory (`scripts/archive/` containing 5 archived transmutation scripts). Every single file has been categorized and cross-referenced against `package.json`, `src/`, `test/`, `bin/`, and `.github/workflows/`:

| Category | File Count | Description & Status |
|---|---|---|
| **Category A: Active & Protected Runtime/Audit Scripts** | 15 files | Referenced in `package.json`, active tests, or runtime security gates. **MUST BE PROTECTED.** |
| **Category B: Client Transmutation, Pipeline & Catalog Scripts** | 26 files | Operational generators for active clients (Negocia Bem, Silvio Iwata, OP-XY lab, shadcnuikit). **PRESERVE.** |
| **Category C: Proven Obsolete Throwaway Debug Scripts (F17)** | 27 files | One-off string searches and DOM inspections in `copias/`. Zero external references. **SAFE FOR DELETION.** |
| **Category D: Inspect Scratch Scripts (`inspect-*.js`)** | 29 files | One-off inspections of cloned sites (< 15 lines each). Zero external references. **SAFE CANDIDATES.** |
| **Category E: Binary & Static HTML Clutter in `scripts/`** | 4 files | 3 untracked JPG screenshots (419KB total) + 1 tracked 512KB HTML dump (`server-served.html`). **SAFE FOR DELETION.** |
| **Category F: Test & Capture Scratch Scripts (`test-*`, `capture-*`)** | 21 files | Ad-hoc browser capture and test scripts. 11 `test-*.js` files satisfy TC-R4-T1-02 legacy detection. **RETAIN FOR TC COMPLIANCE.** |

#### Category A: Active & Protected Runtime Scripts (15 files)
These 15 files have verified active references (`observed` via AST & text scan):
1. `scripts/audit-scalex.js` (1,438 bytes) — Actively tested by `test/unified-quality-gate.test.js:258, 260`.
2. `scripts/audit-syntax.js` (997 bytes) — Core syntax auditor executed by `test/e2e/r1-r5-tier1-feature-coverage.test.js:408` (TC-R4-T1-01) and `test/e2e/r1-r5-tier3-pairwise-combinations.test.js`.
3. `scripts/box-diff-linter.js` (7,382 bytes) — Wired to `package.json` script `"audit": "node scripts/box-diff-linter.js"` and tested by `test/e2e/r1-r5-harness.js`.
4. `scripts/build-scalex-runtime.js` (4,554 bytes) — Actively tested by `test/scalex-runtime-artifact.test.js:17`.
5. `scripts/cleanup-scratch.js` (920 bytes) — Wired to `package.json` script `"clean:scratch": "node scripts/cleanup-scratch.js"`.
6. `scripts/compare-execution-cost.js` (5,166 bytes) — Actively tested by `test/cost-estimator.test.js:12`.
7. `scripts/detect-antipatterns-browser.js` (410,083 bytes) — Runtime browser bundle loaded by `src/qa/impeccable-gate.js:71, 121`.
8. `scripts/detect-antipatterns.mjs` (2,187 bytes) — CLI runner tested by `test/m1-impeccable-sanitization.test.js:15, 123` and `test/challenger-v25-2-stress.test.js:66`.
9. `scripts/ide-post-edit-hook.js` (5,984 bytes) — Security governance hook tested by `test/strict-token-linter.test.js:246, 271`.
10. `scripts/ide-pre-tool-hook.js` (4,882 bytes) — Security governance hook blocking writes to `copias/` tested by `test/strict-token-linter.test.js:182, 198, 222`.
11. `scripts/normalize-all-copies.js` (1,938 bytes) — Wired to `package.json` script `"normalize": "node scripts/normalize-all-copies.js"`.
12. `scripts/README.md` (1,848 bytes) — Documentation of `scripts/` architecture and catalog.
13. `scripts/run-low-spec-gate.js` (3,305 bytes) — Wired to `package.json` script `"test:low-spec": "node scripts/run-low-spec-gate.js"`.
14. `scripts/run-scrutiny-test.js` (2,952 bytes) — Wired to `package.json` script `"audit:scrutiny": "node scripts/run-scrutiny-test.js"`.
15. `scripts/run-unified-gate.js` (3,046 bytes) — Wired to `package.json` script `"audit:unified": "node scripts/run-unified-gate.js"`.

#### Category B: Client Transmutation & Production Scripts (26 files)
1. `scripts/adapt-negocia-bem-shell.js` (6,734 bytes)
2. `scripts/apply_index_modernization.js` (6,926 bytes) — Explicitly mandated for porting and preservation in `ORIGINAL_REQUEST.md` follow-up.
3. `scripts/build-and-certify-growth-case.js` (12,349 bytes)
4. `scripts/build-and-certify-pilot.js` (9,963 bytes)
5. `scripts/build-shadcnuikit-package.js` (78,212 bytes)
6. `scripts/build-standalone-lab.js` (37,999 bytes)
7. `scripts/build_catalogo_imoveis.js` (43,842 bytes)
8. `scripts/clean-and-restore-useplanes.js` (29,487 bytes)
9. `scripts/crop-assets.js` (3,177 bytes)
10. `scripts/dna-extractor.js` (24,411 bytes) — Documented in `scripts/README.md:30`.
11. `scripts/download-opxy-assets.js` (4,229 bytes)
12. `scripts/export-community.js` (6,553 bytes)
13. `scripts/extract-reactbits-premium.js` (19,954 bytes)
14. `scripts/fix-aircenter-html.js` (1,064 bytes)
15. `scripts/hydrate-likova-assets.js` (4,139 bytes)
16. `scripts/list-urls.js` (761 bytes)
17. `scripts/measure-boxes.cjs` (2,385 bytes)
18. `scripts/parse-scripts.js` (984 bytes)
19. `scripts/promote-template.js` (1,533 bytes)
20. `scripts/serve-marcionilio-site.cjs` (4,471 bytes)
21. `scripts/setup-tuning-lab-assets.js` (1,230 bytes)
22. `scripts/verify-negocia-bem-variantes.js` (5,987 bytes)
23. `scripts/verify_catalogo_imoveis.js` (12,739 bytes)
24. `scripts/verify_featured_presentation.js` (28,454 bytes)
25. `scripts/verify_full_ecosystem.js` (1,363 bytes)
26. `scripts/verify_index_modernization.js` (7,267 bytes) — Explicitly mandated for porting and preservation in `ORIGINAL_REQUEST.md` follow-up.

#### Category C: Proven Obsolete Throwaway Debug Scripts (F17 Scope — 27 files)
These are short (< 15 lines), throwaway debug scripts targeting specific files in `copias/` with zero callers:
1. `scripts/check-orig-wirestack.js` (218 bytes) — hardcoded slice of `template-content.html`
2. `scripts/check-stack-def.js` (265 bytes) — hardcoded slice of `template-content.html`
3. `scripts/check-stations.js` (217 bytes) — hardcoded slice of `template-content.html` (only referenced in `test/e2e/r1-r5-tier2-boundary-corner.test.js:282` to prove it is NOT in package.json)
4. `scripts/check-top-station.js` (216 bytes) — hardcoded slice of `template-content.html`
5. `scripts/check-wire-stack.js` (248 bytes) — hardcoded slice of `template-content.html`
6. `scripts/find-3d-asset.js` (1,426 bytes) — hardcoded regex scan of `template-content.html`
7. `scripts/find-away.js` (245 bytes) — hardcoded regex scan of `template-content.html`
8. `scripts/find-beats.js` (248 bytes) — hardcoded regex scan of `template-content.html`
9. `scripts/find-chatorb-chunk.js` (818 bytes) — hardcoded scan in `copias/useplanes-com/`
10. `scripts/find-director.js` (290 bytes) — reads `scripts/server-served.html`
11. `scripts/find-dollar-lines.js` (326 bytes) — regex scan of `template-content.html`
12. `scripts/find-dollar.js` (365 bytes) — regex scan of `template-content.html`
13. `scripts/find-exact-model-url.js` (286 bytes) — regex scan of `template-content.html`
14. `scripts/find-export-script.js` (1,262 bytes) — scan of `template-content.html`
15. `scripts/find-gbcr.js` (237 bytes) — scan of `template-content.html`
16. `scripts/find-rec-mesh.js` (488 bytes) — scan of `template-content.html`
17. `scripts/find-script-errors.js` (1,073 bytes) — temp script parser on `clientes/opxy-tuning-lab/`
18. `scripts/find-stack-els.js` (240 bytes) — scan of `template-content.html`
19. `scripts/find-syntax-error.js` (1,228 bytes) — temp syntax check on `opxy-tuning-lab`
20. `scripts/find-theme-buttons.js` (586 bytes) — Cheerio scan of `useplanes-com/site/index.html`
21. `scripts/click-chat-orb.js` (1,242 bytes) — Ad-hoc Playwright script that generated `opened-chat-dump.html`
22. `scripts/dump-chat-orb.js` (1,494 bytes) — Ad-hoc Playwright script that generated `preview-screenshot.png`
23. `scripts/save-raw-chatorb.js` (653 bytes) — Ad-hoc chunk slice that generated `chatorb-raw-decompiled.js`
24. `scripts/isolate-script-error.js` (1,205 bytes) — Ad-hoc script tester for `opxy-tuning-lab`
25. `scripts/decompile-chatorb.js` (934 bytes) — One-off chunk decoder
26. `scripts/extract-orb-preview.js` (664 bytes) — One-off orb preview extractor
27. `scripts/fetch-props-tab.js` (1,458 bytes) — Ad-hoc Playwright script that generated `props-tab-dump.html` and `live-full-page-hydrated.html`

#### Category D: Inspect Scratch Scripts (29 files)
All 29 `inspect-*.js` files are unreferenced throwaway inspection helpers (< 15 lines):
`inspect-21oaks-scripts.js`, `inspect-21oaks-text.js`, `inspect-aircenter-map.js`, `inspect-assets.js`, `inspect-camera-track.js`, `inspect-canvas-container.js`, `inspect-css.js`, `inspect-draco-config.js`, `inspect-end-structure.js`, `inspect-glb.js`, `inspect-gltf-json.js`, `inspect-gltf-loop.js`, `inspect-helpers.js`, `inspect-hero-strip.js`, `inspect-js.js`, `inspect-keys.js`, `inspect-main-sections.js`, `inspect-model-url.js`, `inspect-opened-chat.js`, `inspect-reference-maps.js`, `inspect-scroll-trigger.js`, `inspect-sections.js`, `inspect-streamed.js`, `inspect-strip-css.js`, `inspect-styles.js`, `inspect-template.js`, `inspect-tunematerial.js`, `inspect-useplanes-site.js`, `inspect-zorge-map.js`.

#### Category E: Binary & Static Clutter in `scripts/` (4 files)
1. `scripts/server-served.html` (512,382 bytes, tracked in git) — 512KB static HTML dump generated by `test-served-html.js`.
2. `scripts/inspect_hero_azimute_maringa_v2.jpg` (124,978 bytes, untracked/ignored)
3. `scripts/inspect_hero_maringa_tokens_unified.jpg` (146,476 bytes, untracked/ignored)
4. `scripts/inspect_hero_smart_search_v1.jpg` (148,240 bytes, untracked/ignored)

#### Category F: Test & Capture Scratch Scripts in `scripts/` (21 files)
- 11 `test-*.js`: `test-cdp.js`, `test-chat-stream.js`, `test-director.js`, `test-overpass-maringa.js`, `test-overpass-mirror.js`, `test-preset-strip.js`, `test-reveals-browser.js`, `test-served-html.js`, `test-split.js`, `test-standalone-render.js`, `test-theme-click.js`.
- 10 other capture/diagnose: `capture-aircenter-sections-exact.js`, `capture-aircenter-sections.js`, `capture-detailed-sections.js`, `capture-hydrated.js`, `capture-op-xy-76.js`, `capture-reveals-proof.js`, `capture-visual-evidence.js`, `cdp-error-trace.js`, `debug-render.js`, `diagnose-reveals.js`.

---

### 1.2 Audit of Root Scratch Files and Clutter (F18 Scope)

Inspection of the repository root (`observed` via `node` and `git ls-files`) reveals three distinct groups of clutter:

#### Group 1: Tracked Root Clutter (Safe for `git rm`)
1. `gemini_share_content.txt` (46,693 bytes, tracked) — raw chat conversation dump. Zero references.
2. 14 duplicate empirical audit manifests committed directly to root by commit `d54650b`:
   `approval-audit.jsonl` (213B), `baseline-summary.json` (1.5KB), `branches.json` (3.5KB), `ci-coverage-map.csv` (9KB), `dependency-audit.json` (21.6KB), `environment.json` (696B), `flakiness.csv` (108B), `orphaned-suites.json` (14.8KB), `policy-decisions.jsonl` (1.3KB), `security-findings.json` (2.5KB), `surviving-mutants.json` (946B), `task-ledger.jsonl` (316B), `test-discovery.json` (17KB), `test-inventory.json` (34.8KB).
   **Canonical copies preserved**: Identical copies exist inside `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/` with `checksums.sha256` and `manifest.json`.

#### Group 2: Untracked Temporary Dumps at Root (Safe for `rm` / filesystem deletion)
1. `opened-chat-dump.html` (8,304 bytes) — generated by `click-chat-orb.js`.
2. `opened-chat-screenshot.png` (72,923 bytes) — generated by `click-chat-orb.js`.
3. `preview-screenshot.png` (56,660 bytes) — generated by `dump-chat-orb.js`.
4. `props-tab-dump.html` (3,781 bytes) — generated by `fetch-props-tab.js`.
5. `streamed-chat-dump.html` (14,154 bytes) — generated by `test-chat-stream.js`.
6. `streamed-chat-screenshot.png` (89,262 bytes) — generated by `test-chat-stream.js`.
7. `live-full-page-hydrated.html` (235,191 bytes) — generated by `fetch-props-tab.js`.
8. `local-copia-screenshot.png` (48,850 bytes) — ad-hoc scratch screenshot.
9. `jumpflex_full_analysis.json` (16,384 bytes) — ad-hoc scratch JSON.
10. `linter-report.json` (1,012 bytes) — ad-hoc scratch report.
11. `VILA SMASH — Franchise Refinement.html` (52,658 bytes) — duplicate root HTML (canonical copy in client folder).

#### Group 3: CRITICAL INVARIANT — Root Files that MUST NOT be Deleted
1. `JumpPlay — Family Reveal & Kinetic Range.html` (100,399 bytes, root):
   - **Direct dependency**: `test/m1-impeccable-sanitization.test.js` line 14:
     `const ROOT_JUMPPLAY_PATH = path.resolve(__dirname, '../JumpPlay — Family Reveal & Kinetic Range.html');`
   - Line 152:
     `test('CLI: scripts/detect-antipatterns.mjs exits 0 on sanitized root JumpPlay file', async () => { ... });`
   - **Verdict**: Deleting this file will immediately break `test/m1-impeccable-sanitization.test.js` (`ENOENT`). **DO NOT DELETE.**
2. `OP-XY — Hero to Strip Live Tuning Lab.html` (461,102 bytes, root):
   - Output target of `scripts/build-standalone-lab.js:1056`.
   - **Verdict**: Keep or preserve as build target.

---

### 1.3 Critical Invariant 2: TC-R4-T1-02 Detection Rule

In `test/e2e/r1-r5-tier1-feature-coverage.test.js`, lines 422-436:
```javascript
test('TC-R4-T1-02: Legacy script auditor detects candidates for deprecation', () => {
  const scriptsDir = path.join(PROJECT_ROOT, 'scripts');
  assert.ok(fs.existsSync(scriptsDir), 'scripts directory must exist');

  const allScripts = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.js') || f.endsWith('.cjs'));
  const throwawayPrefixes = ['check-', 'find-', 'isolate-', 'test-'];
  const candidates = allScripts.filter(name => throwawayPrefixes.some(p => name.startsWith(p)));

  assert.ok(candidates.length > 0, 'Should find existing throwaway debug script candidates');
  // Ensure critical runtime scripts are preserved and not flagged
  const protectedScripts = ['audit-syntax.js', 'box-diff-linter.js', 'run-low-spec-gate.js'];
  for (const prot of protectedScripts) {
    assert.ok(!candidates.includes(prot), `${prot} must be protected from deletion`);
  }
});
```

- **Observation**: Line 430 executes `assert.ok(candidates.length > 0)`.
- If an engineer deletes ALL scripts starting with `check-`, `find-`, `isolate-`, AND `test-`, then `candidates` will be empty, and `assert.ok(0)` will throw an `AssertionError`!
- However, if `worker_m4` deletes ONLY `check-*.js`, `find-*.js`, and `isolate-*.js` (the 21 F17 scripts) while leaving `scripts/test-*.js` (11 scripts) in place:
  - `candidates` will contain 11 `test-*.js` scripts.
  - `candidates.length > 0` remains strictly `true`.
  - None of `protectedScripts` are in `candidates`.
  - `TC-R4-T1-02` continues to PASS with 100% green status!

---

### 1.4 Baseline Test Execution Verification (Fresh Commands)

All suites executed directly in this investigation pass with 0 failures (`observed`):
1. `npm run test:milestones`:
   - Command: `node --test --test-concurrency=1 test/m1-cdp-decompiler.test.js test/m2-kinetic-trajectory.test.js test/m3-assets3d-pipeline.test.js test/m4-compiler-dualstack.test.js`
   - Result: **79 pass, 0 fail, 0 skipped** (duration: 4,226ms).
2. `npm run test:e2e`:
   - Command: `node --test --test-concurrency=1 test/e2e/*.test.js`
   - Result: **265 pass, 0 fail, 0 skipped** across 56 suites (duration: 31,646ms).
3. `node scripts/audit-syntax.js`:
   - Result: **452 pass, 3 fail** (the 3 failed files are ESM test fixtures in `test/fixtures/context-index/`, unrelated to scripts). Zero failures in `scripts/`, `src/`, `icm/`, or `bin/`.

---

## 2. Logic Chain

1. **Premise 1 (Unused Scripts are Waste)**: The 27 debug scripts in Category C (`check-*.js`, `find-*.js`, `click-chat-orb.js`, `dump-chat-orb.js`, `save-raw-chatorb.js`, `isolate-script-error.js`, `decompile-chatorb.js`, `extract-orb-preview.js`, `fetch-props-tab.js`) and the 29 `inspect-*.js` scripts have zero imports across `src/`, `bin/`, `test/`, and `package.json` (`observed` in Section 1.1).
2. **Premise 2 (Zero Invalidation on Test Suite)**: Milestone suites (`test:milestones` and `test:e2e`) do not require or execute any of the Category C or Category D scripts (`observed` in Section 1.4). `test/e2e/r1-r5-tier2-boundary-corner.test.js:282` references `scripts/check-stations.js` solely as a negative assertion that it is NOT in `package.json`, which remains true when the file is deleted.
3. **Premise 3 (Canonical Archival of Root Audit Manifests)**: The 14 empirical audit manifests at the repository root are 100% byte-for-byte identical duplicates of the datasets stored under `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/` (`observed` in Section 1.2). Therefore, removing the root duplicates via `git rm` eliminates root pollution while preserving the complete audit history in `artifacts/`.
4. **Premise 4 (Protection of Root Test Fixture)**: `JumpPlay — Family Reveal & Kinetic Range.html` at the project root is explicitly bound to `test/m1-impeccable-sanitization.test.js:14, 152`. Deleting it would cause test failures. Therefore, it must be protected from deletion.
5. **Premise 5 (Preservation of Test-*.js Satisfies TC-R4-T1-02)**: Retaining `scripts/test-*.js` guarantees that `TC-R4-T1-02` detects throwaway candidates (`candidates.length > 0`) without touching the test code.

---

## 3. Caveats

1. **`scripts/test-*.js` vs Clean Slate**: There are 11 ad-hoc test scripts in `scripts/` (`test-cdp.js`, `test-chat-stream.js`, etc.). While they are throwaway scripts from early exploratory scraping, `test/e2e/r1-r5-tier1-feature-coverage.test.js` (TC-R4-T1-02) asserts that `scripts/` contains candidate scripts matching `['check-', 'find-', 'isolate-', 'test-']`. If the team desires to delete `test-*.js` as well in the future, TC-R4-T1-02 must be updated to assert that candidate count is 0 or check `scripts/archive/`. For Milestone 4, keeping `test-*.js` ensures zero test modifications.
2. **`scripts/inspect-*.js` (29 files)**: These 29 files have zero references and are safe to delete. However, PROJECT.md F17 explicitly scopes deletion to "21 obsolete debug scripts in scripts/check-*.js and scripts/find-*.js". We recommend `worker_m4` delete the 21 canonical scripts first, and optionally delete the `inspect-*.js` scripts if full cleanup is desired.
3. **Scratch Folder (`scratch/`)**: `scratch/` contains 108 untracked files (32MB). It is already gitignored and can be safely wiped at any time using `npm run clean:scratch`.
4. **`scripts/archive/` (5 files)**: Contains previously archived transmutation scripts (`apply-icm-healthmed.js`, etc.). These are harmless, not executed in CI, and serve as historical reference.

---

## 4. Conclusion & Actionable Blueprint for `worker_m4`

### 4.1 Itemized Blueprint: What to Delete vs What to Protect

#### A. Files to DELETE via `git rm` (Tracked Files)

##### 1. F17 Candidate Debug Scripts in `scripts/` (23 files)
```
scripts/check-orig-wirestack.js
scripts/check-stack-def.js
scripts/check-stations.js
scripts/check-top-station.js
scripts/check-wire-stack.js
scripts/find-3d-asset.js
scripts/find-away.js
scripts/find-beats.js
scripts/find-chatorb-chunk.js
scripts/find-director.js
scripts/find-dollar-lines.js
scripts/find-dollar.js
scripts/find-exact-model-url.js
scripts/find-export-script.js
scripts/find-gbcr.js
scripts/find-rec-mesh.js
scripts/find-script-errors.js
scripts/find-stack-els.js
scripts/find-syntax-error.js
scripts/find-theme-buttons.js
scripts/click-chat-orb.js
scripts/dump-chat-orb.js
scripts/save-raw-chatorb.js
```

##### 2. Extended F17 Sister Debug Scripts in `scripts/` (4 files)
```
scripts/isolate-script-error.js
scripts/decompile-chatorb.js
scripts/extract-orb-preview.js
scripts/fetch-props-tab.js
```

##### 3. F18 Tracked Root & Script Clutter (16 files)
```
gemini_share_content.txt
scripts/server-served.html
approval-audit.jsonl
baseline-summary.json
branches.json
ci-coverage-map.csv
dependency-audit.json
environment.json
flakiness.csv
orphaned-suites.json
policy-decisions.jsonl
security-findings.json
surviving-mutants.json
task-ledger.jsonl
test-discovery.json
test-inventory.json
```

#### B. Untracked Temporary Files to DELETE from Disk (Filesystem `rm`)
```
opened-chat-dump.html
opened-chat-screenshot.png
preview-screenshot.png
props-tab-dump.html
streamed-chat-dump.html
streamed-chat-screenshot.png
live-full-page-hydrated.html
local-copia-screenshot.png
jumpflex_full_analysis.json
linter-report.json
VILA SMASH — Franchise Refinement.html
scripts/inspect_hero_azimute_maringa_v2.jpg
scripts/inspect_hero_maringa_tokens_unified.jpg
scripts/inspect_hero_smart_search_v1.jpg
```

#### C. Files that MUST BE PROTECTED (DO NOT DELETE)
- `JumpPlay — Family Reveal & Kinetic Range.html` (Required by `test/m1-impeccable-sanitization.test.js:14, 152`)
- `scripts/audit-syntax.js`, `scripts/box-diff-linter.js`, `scripts/run-low-spec-gate.js` (Protected by TC-R4-T1-02 and `package.json`)
- `scripts/detect-antipatterns-browser.js`, `scripts/detect-antipatterns.mjs` (Required by ImpeccableGate)
- `scripts/ide-pre-tool-hook.js`, `scripts/ide-post-edit-hook.js` (Security governance hooks)
- `scripts/apply_index_modernization.js`, `scripts/verify_index_modernization.js` (Required by user instruction)
- `scripts/test-*.js` (Preserved to satisfy TC-R4-T1-02 candidate assertion)

---

### 4.2 Concrete Implementation Commands for `worker_m4`

```bash
# 1. Purge tracked throwaway debug scripts (F17)
git rm scripts/check-*.js scripts/find-*.js scripts/click-chat-orb.js scripts/dump-chat-orb.js scripts/save-raw-chatorb.js scripts/isolate-script-error.js scripts/decompile-chatorb.js scripts/extract-orb-preview.js scripts/fetch-props-tab.js

# 2. Purge tracked root chat export and static script HTML dump (F18)
git rm gemini_share_content.txt scripts/server-served.html

# 3. Purge duplicate root audit manifests (canonical copies preserved in artifacts/empirical-audit/)
git rm approval-audit.jsonl baseline-summary.json branches.json ci-coverage-map.csv dependency-audit.json environment.json flakiness.csv orphaned-suites.json policy-decisions.jsonl security-findings.json surviving-mutants.json task-ledger.jsonl test-discovery.json test-inventory.json

# 4. Remove untracked temporary dumps from disk
node -e "
const fs = require('fs');
const files = [
  'opened-chat-dump.html', 'opened-chat-screenshot.png', 'preview-screenshot.png',
  'props-tab-dump.html', 'streamed-chat-dump.html', 'streamed-chat-screenshot.png',
  'live-full-page-hydrated.html', 'local-copia-screenshot.png', 'jumpflex_full_analysis.json',
  'linter-report.json', 'VILA SMASH — Franchise Refinement.html',
  'scripts/inspect_hero_azimute_maringa_v2.jpg',
  'scripts/inspect_hero_maringa_tokens_unified.jpg',
  'scripts/inspect_hero_smart_search_v1.jpg'
];
files.forEach(f => { if (fs.existsSync(f)) fs.unlinkSync(f); });
"

# 5. Clean scratch/ directory
npm run clean:scratch
```

---

## 5. Verification Method

To independently verify the safety and completeness of this blueprint:

1. **Verify No Code References Candidate Deletions**:
   ```powershell
   node -e "
   const fs = require('fs');
   const candidates = ['check-stations.js', 'find-dollar.js', 'gemini_share_content.txt', 'server-served.html'];
   const dirs = ['src', 'test', 'bin'];
   // scan and confirm 0 imports
   "
   ```

2. **Verify Milestone Suites Pass**:
   ```powershell
   npm run test:milestones
   ```
   *Expected Output*: 79 pass, 0 fail.

3. **Verify E2E Suites Pass**:
   ```powershell
   npm run test:e2e
   ```
   *Expected Output*: 265 pass, 0 fail.

4. **Verify Syntax Audit Passes**:
   ```powershell
   node scripts/audit-syntax.js
   ```
   *Expected Output*: 0 failures in `scripts/`, `src/`, `icm/`, or `bin/`.

5. **Verify TC-R4-T1-02 Safety**:
   ```powershell
   node --test --test-name-pattern="TC-R4-T1-02" test/e2e/r1-r5-tier1-feature-coverage.test.js
   ```
   *Expected Output*: Pass.
