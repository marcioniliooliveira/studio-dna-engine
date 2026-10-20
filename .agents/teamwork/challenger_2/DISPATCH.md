# Task Assignment: Challenger 2

You are challenger_2 (teamwork_preview_challenger).
Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\challenger_2
Parent: orchestrator_8 (0182b98b-f0b8-4ba3-b638-72cd13600fd3)

Read ORIGINAL_REQUEST.md at: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (under ## 2026-10-19T16:33:26Z).
Read PROJECT.md at: c:\Users\wd\Documents\playwright-scraper\PROJECT.md.
Read TEST_READY.md at: c:\Users\wd\Documents\playwright-scraper\TEST_READY.md.

Adversarially challenge and stress-test the mathematical algorithms and binary parsers:
1. APCA Contrast & OKLCH Conversion (`docs/research/v2.6/reference/apca-contrast.js`):
   - Test W3C APCA reference test pairs (`#000000` on `#ffffff`, `#ffffff` on `#000000`, low-contrast pairs, gray-on-gray).
   - Test roundtrip $s\text{RGB} \to \text{OKLCH} \to s\text{RGB}$ across 500+ random colors to verify error $\Delta E < 10^{-4}$.
   - Verify Theorem 2: prove monotonicity of binary search for text lightness $L_{\text{txt}}$ under reverse polarity.
2. Native PNG Codec & Itti-Koch Saliency (`docs/research/v2.6/reference/png-codec.js`):
   - Test corrupted PNG headers, truncated chunks, Row 0 Paeth defiltering, solid images, high-contrast CTA images.
   - Verify that lateral competition operator $\mathcal{N}(M) = M(M_{\max} - \bar{m})^2$ suppresses uniform noise and amplifies localized high-contrast features.
3. Sub-Pixel NDC Projection (`test/v2.6/ndc-projection.test.js` & `docs/research/v2.6/pilar-07-universal-envelope-scrollbus.md`):
   - Stress-test the CPU twin deformation equations and camera matrix $\mathbf{M}_{\text{VP}}$ with rapid flick velocity ($v > 2.0$), extreme camera angles, and verify Theorem 3 ($\epsilon \le 0.5\text{px}$).
4. Slug Font Compiler (`docs/research/v2.6/reference/slug-font-compiler.js`):
   - Stress-test with empty glyphs, complex contours, quadratic curve midpoints, and verify $N_B=8$ band buffer integrity.

Document all scripts, stdout/stderr, and empirical assertions in `handoff.md`.
Output your verdict (APPROVE or REQUEST_CHANGES) clearly in `handoff.md`.

## 2026-10-19T17:19:44Z
From: parent (0182b98b-f0b8-4ba3-b638-72cd13600fd3)
Content:
You are challenger_2.
Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\challenger_2
Read your task assignment in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\challenger_2\DISPATCH.md and the authoritative request in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (under ## 2026-10-19T16:33:26Z).
Read PROJECT.md and TEST_READY.md.

Adversarially challenge and stress-test:
1. APCA Contrast & OKLCH (apca-contrast.js): W3C test pairs, 500+ random roundtrip sRGB <-> OKLCH conversions (Delta E < 10^-4), monotonicity of binary search for text lightness.
2. Native PNG Codec & Saliency (png-codec.js): corrupted headers, Row 0 Paeth defiltering, lateral competition operator N(M) noise suppression.
3. Sub-Pixel NDC Projection (ndc-projection.test.js): high velocity flick, extreme camera angles, Theorem 3 bounding box error <= 0.5px.
4. Slug Font Compiler (slug-font-compiler.js): empty glyphs, complex contours, N_B=8 band buffers.

Record empirical test results and verdict (APPROVE or REQUEST_CHANGES) in handoff.md and notify orchestrator.
