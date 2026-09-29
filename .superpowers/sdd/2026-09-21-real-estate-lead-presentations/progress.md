# SDD ledger — plan: docs/superpowers/plans/2026-09-21-real-estate-lead-presentations.md

Setup: inline execution selected because no subagent tool is available; final review will be an author self-review using the repository review guidance.

Pre-flight shared interfaces:
- Task 1 produces the regression contract consumed by Tasks 2–8; the test initially references files that do not exist and must fail before implementation.
- Task 2 produces the client content/composition contracts consumed by Tasks 4–6; both runtimes must read only their own client contract.
- Task 3 produces local SVG paths consumed by both client contracts and runtimes; every path must remain inside its client site directory.
- Task 4 produces Integri selectors and hero state consumed by Task 6 and browser verification in Task 7.
- Task 5 produces Silvio scroll selectors and section state consumed by Task 6 and browser verification in Task 7.
- Task 6 produces intent-aware intermediary behavior consumed by Task 7.
- Task 7 produces browser evidence consumed by Task 8.

Ruling: use native CSS/IntersectionObserver/requestAnimationFrame instead of remote GSAP/Lenis — the offline requirement is binding, while the observable reference behavior can be preserved without those external runtime dependencies — cost if wrong: motion may feel less identical than the original reference and requires visual QA.

Task 2: Ruling: the full regression file remains red after the content contracts because its first test intentionally covers the later site/runtime tasks — use the contract-schema test as the task gate now and require the full suite to pass after Tasks 4–6 — cost if wrong: a later implementation could overlook a missing file unless the final full suite is enforced.

Task 2: complete — contract schema test passed; full suite intentionally pending later site/runtime tasks.
Task 3: complete — `node --test --test-name-pattern "local SVG demo plates" test/real-estate-demos.test.js` passed after verifying all six local plates.

Task 4: complete — Integri hero, thumbnail selection, circular desktop reveal, mobile reveal, synchronized CTA/progress, and explicit autoplay pause control passed focused browser verification.
Task 5: complete — Silvio sticky hero, native scroll/parallax/reveal, section progress rail, static regional map, and property slider passed focused browser verification.
Task 6: complete — all three intent paths and property CTAs routed to the matching intermediary panel in both demos; no backend submission was emitted.
Task 7: complete — focused contract/browser suite passed 8/8 at desktop, intermediate, mobile, and reduced-motion coverage; local request guard saw no non-local demo requests.

Ruling: exclude 21 Oaks room-zone hover overlays, brightness slider, and unrelated student-living SVG masks — these are reference-specific content interactions, not part of the approved real-estate funnel; cost if wrong: the Integri hero has less exploratory micro-interaction than the source reference.
Ruling: exclude Aircenter remote video, WebGL carousel, interactive map SDK, and contact POST — the user explicitly required offline/no-backend behavior and a static Maringá map; cost if wrong: Silvio is less cinematic/interactive than the source reference, compensated by local scroll/parallax/reveal and a manual property slider.
Ruling: local SVG plates are the permitted demonstrative image source — no supplied property photography was authorized, so using reference photography would create provenance and lead-truth risks; cost if wrong: the presentation is more illustrative than photorealistic until approved assets arrive.

Final review: self-review (no subagent tool). The implementation diff is limited to the two client contracts/sites/assets plus focused tests; browser evidence covers 1440x977, 1024x900, 390x844, reduced motion, intent/CTA synchronization, local request blocking, section rail, static map, and property routes. Full repository status is 58/59 because the pre-existing vault-integrity test lacks `design-vault/elyse-residence-dev-webflow-io/tokens.json`.
Final: minor (deferred): explicit width/height and lazy-loading attributes are not added to every local SVG `<img>` tag; stable SVG viewBoxes, fixed image containers, and browser no-shift checks cover this demo scope, but a future asset pass should add per-image dimensions for stricter guideline compliance.
Final: minor (deferred): the repository heuristic UX audit reports generic CTA/visual warnings and a false-positive autoplay-media warning; the rendered browser suite and manual screenshots provide stronger evidence for these static demos, while the heuristic limitations remain recorded.
