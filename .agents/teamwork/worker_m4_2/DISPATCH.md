# DISPATCH — worker_m4_2

## Task Assignment
- Role: GPU Texture Pipeline & Visual Saliency Oracle Worker
- Working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m4_2
- Workspace root: C:\Users\wd\Documents\playwright-scraper
- Authoritative Request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (specifically read ## 2026-10-04T20:14:18Z, Requirement R4)
- Project Scope: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
- Survey Reference: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_2_2\handoff.md and C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\spec_miner_survey_2_3\handoff.md

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Exclusive Write Ownership
You exclusively own and may edit or create ONLY these files:
- `src/assets3d/texture-compressor.js`
- `src/qa/visual-saliency-oracle.js`
- `test/m4-gpu-saliency.test.js`

## Objectives
1. **KTX2 GPU Texture Compression Pipeline (`src/assets3d/texture-compressor.js`)**:
   - Verify/extend `TextureCompressor` to support KTX2 transcoding options:
     - UASTC block compression (1 byte/pixel) for normal maps & ORM channel-packed textures.
     - ETC1S / UASTC for baseColor / albedo textures.
     - VRAM mathematical calculation: $\text{VRAM}_{\text{tex}} = \sum (W \times H \times \text{bpp} \times 1.3333)$.
     - Assert that multi-asset scene allocations strictly satisfy total VRAM $\le 16.0\text{MB}$ (e.g. 3 models at $\sim 3.74\text{MB}$ each $\approx 11.2\text{MB} \le 16\text{MB}$).
2. **Visual Saliency Attention Prediction Oracle (`src/qa/visual-saliency-oracle.js`)**:
   - Implement an optical attention prediction model simulating human ocular fixation in the initial 500ms of page viewing.
   - Computes:
     - Multi-scale luminance conspicuity map ($I(x,y) = 0.299R + 0.587G + 0.114B$).
     - Color opponency ($RG = (R - G) / \max(1, I)$, $BY = (B - (R+G)/2) / \max(1, I)$).
     - Orientation energy (multi-angle gradient).
     - Center-surround contrast with 500ms foveal Gaussian center prior.
   - Primary CTA Optical Prominence:
     $$\text{Score}_{\text{CTA}} = \frac{\iint_{\text{CTA}} S(x,y) \, dx dy}{\iint_{\text{Viewport}} S(x,y) \, dx dy} \ge 0.18$$
     Assert CTA ranks within top 2 global attention peaks.
   - Visual Clutter / Distraction Ratio:
     $$\text{DistractionRatio} = \frac{\iint_{\text{NonFunctional}} S(x,y) \, dx dy}{\iint_{\text{Functional}} S(x,y) \, dx dy} \le 0.35$$
     Detects and rejects AI distractions, radioactive halos, and noisy background clutter.
3. **Unit Test Suite**:
   - Create `test/m4-gpu-saliency.test.js`.
   - Test KTX2 texture transcoding metadata and VRAM calculations (asserting total VRAM $\le 16\text{MB}$ and rejecting uncompressed PNG 22.4MB traps).
   - Test `VisualSaliencyOracle` against:
     - Well-structured high-contrast CTA layout: passes with $\text{Score}_{\text{CTA}} \ge 0.18$ and $\text{DistractionRatio} \le 0.35$.
     - Cluttered / radioactive halo fixture: fails gate with high distraction ratio or low CTA prominence.
   - Run `node --test test/m4-gpu-saliency.test.js` and verify all tests pass with exit code 0.
4. Report all file changes, commands, and passing test results in `handoff.md`.


## 2026-10-04T20:32:50Z
[Message] timestamp=2026-10-04T20:32:50Z sender=55b2bb35-9b46-4caf-b378-9d5228026764 priority=MESSAGE_PRIORITY_HIGH content=You are worker_m4_2, the GPU Texture Pipeline & Visual Saliency Oracle Worker.
Working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m4_2
Workspace root: C:\Users\wd\Documents\playwright-scraper
Authoritative Request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (specifically read ## 2026-10-04T20:14:18Z, Requirement R4)
Project Scope: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
Survey References:
- C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_2_2\handoff.md
- C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\spec_miner_survey_2_3\handoff.md
Dispatch file: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m4_2\DISPATCH.md
