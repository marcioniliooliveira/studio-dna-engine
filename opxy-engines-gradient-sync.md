# OP-XY Synchronized Engine Gradients, 3D Asset Center Illumination & Bottom-Right Swatches

## Overview
Enhance the `#engines` section in `clientes/opxy-tuning-lab/site/index.html` with:
1. Per-engine text gradients on all 8 engine labels (`axis`, `dissolve`, `e-piano`, `hardsync`, `organ`, `prism`, `simple`, `wavetable`) using CSS text-clipping.
2. Real-time dynamic color synchronization: as the user scrolls, the active engine's gradient color illuminates the center of the Three.js 3D synthesizer model (`OPXY.display` and a central chassis accent light).
3. Bottom-right circular color swatches HUD displaying all 8 colors with an active glowing highlight ring tracking the current active color.
4. Non-breaking preservation of the 8-beat scroll dynamics, Lenis ticker, WebAudio synthesis, and HUD v2.

## Project Type
WEB (Three.js WebGL + CSS + Vanilla JS + Playwright E2E)

## Success Criteria
- [ ] Each of the 8 engine names has a distinctive, high-contrast text gradient.
- [ ] Active engine text has full vibrancy and subtle glow; inactive engine texts are dimmed.
- [ ] As the user scrolls through `#engines`, the active engine shifts, changing the emissive tint at the center of the 3D asset (`window.OPXY`).
- [ ] Circular swatches rendered at bottom right of `#engines .stage`, with `.on` active state matching the active engine.
- [ ] Clicking any circular swatch triggers `setEngine(i, true)` updating text, swatches, 3D center color, and audio note.
- [ ] All 8 beats and transitions in `test/opxy-scroll-dynamics-e2e.test.js` pass with zero regressions.
- [ ] Playwright E2E test `test/opxy-engines-gradient-e2e.test.js` passes.

## Tech Stack
- Frontend: Vanilla CSS3 (-webkit-background-clip: text), HTML5, JavaScript ES6+
- 3D Engine: Three.js r186 (ACESFilmicToneMapping, UnrealBloomPass, PointLight, MeshStandardMaterial emissive)
- Motion: Lenis smooth scroll + GSAP Ticker
- Testing: Node.js test runner (`node:test`, `node:assert/strict`) + Playwright Chromium

## File Structure
- `clientes/opxy-tuning-lab/site/index.html` (Primary working file)
- `clientes/opxy-tuning-lab/index.html` (Root mirror file)
- `test/opxy-engines-gradient-e2e.test.js` (Automated TDD specification)

## Task Breakdown

### Task 1: TDD Phase RED - Automated Contract Test
- **Agent:** `test-engineer`
- **Skill:** `tdd-workflow`
- **Input:** Target HTML and requirements
- **Output:** `test/opxy-engines-gradient-e2e.test.js`
- **Verify:** Run test and assert that it fails because gradients, swatches, and 3D center illumination are not yet wired.

### Task 2: CSS Text Gradients & Swatch Styling
- **Agent:** `frontend-specialist`
- **Skill:** `frontend-design`
- **Input:** 8-color engine palette specification
- **Output:** CSS rules in `<style>` block of `clientes/opxy-tuning-lab/site/index.html`
- **Verify:** Inspect CSS rules in browser/test.

### Task 3: HTML Swatches & JS State Synchronization
- **Agent:** `frontend-specialist`
- **Skill:** `clean-code`
- **Input:** `#engSwatches` markup and `setEngine(i, play)` logic
- **Output:** Updated DOM and JS handlers in `clientes/opxy-tuning-lab/site/index.html`
- **Verify:** Swatches appear in bottom-right corner and clicking updates `window.ENG.active`.

### Task 4: Three.js Dynamic Center Illumination
- **Agent:** `frontend-specialist`
- **Skill:** `clean-code`
- **Input:** `bootScene` and `tuneMaterial` in `clientes/opxy-tuning-lab/site/index.html`
- **Output:** `OPXY.setCenterGlow(colorHex, intensity)` updating `OPXY.display.emissive` and `OPXY.centerLight`
- **Verify:** Center of asset changes color when scrolling through engines and dims when leaving.

### Task 5: TDD Phase GREEN & Mirror Sync
- **Agent:** `test-engineer`
- **Skill:** `tdd-workflow`
- **Input:** Completed implementation
- **Output:** Synchronized `clientes/opxy-tuning-lab/index.html` and passing `node --test test/opxy-engines-gradient-e2e.test.js`
- **Verify:** All assertions in test suite pass.

### Task 6: TDD Phase REFACTOR & Non-Regression Gate
- **Agent:** `test-engineer`
- **Skill:** `verify-changes`
- **Input:** Full test suite
- **Output:** Regression check results and visual screenshots
- **Verify:** `node --test test/opxy-scroll-dynamics-e2e.test.js` and `node --test test/opxy-presets-e2e.test.js` pass with 0 errors.

## Phase X: Verification Checklist
- [x] `node --test test/opxy-engines-gradient-e2e.test.js` passes (✔ 11860ms)
- [x] `node --test test/opxy-scroll-dynamics-e2e.test.js` passes (✔ 14667ms)
- [x] `node --test test/opxy-presets-e2e.test.js` passes (✔ 29638ms)
- [x] No console errors on live preview server (`http://127.0.0.1:4000/clientes/opxy-tuning-lab/site/index.html`)

## ✅ PHASE X COMPLETE
- Test Contract: ✅ Pass
- Regression Suite: ✅ 0 errors
- Visual Proof: ✅ Captured and verified
- Date: 2026-09-30
