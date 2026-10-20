# Real-estate Lead Presentation Demos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax so progress is trackable.

**Goal:** Implement two offline, demonstrative real-estate presentation experiences: Integri Imóveis as a conscious 21 Oaks adaptation and Silvio Iwata Imobiliária as a 50/50 Aircenter–21 Oaks adaptation. Both must create a premium lead-contact funnel without backend claims, FlashTech identity leakage, unsupported facts, or loss of the reference motion language.

**Architecture:** Each client remains isolated under its own `clientes/<client>/site/` directory and owns its own content contract, tokens, SVG demo plates, HTML, CSS, and JavaScript. The implementation uses native browser primitives and local assets so the demos work offline. A focused Node test suite validates cross-client invariants, while Playwright validates rendered behavior at desktop, intermediate, and mobile widths. The shared test file is only a verifier; it is not a shared client runtime or a source of brand defaults.

**Tech Stack:** Static HTML, CSS, inline/local SVG, vanilla JavaScript, native `IntersectionObserver`, `requestAnimationFrame`, CSS custom properties, Node `node:test`, Playwright, and the repository's existing preview server. No CDN, remote font import, remote image, analytics SDK, map SDK, backend endpoint, or FlashTech token package is allowed in the demo runtime.

**Spec:** `docs/superpowers/specs/2026-09-21-real-estate-lead-presentations-design.md`

## Global Constraints

- Preserve all unrelated dirty-worktree changes. Only add or modify files listed in the task being executed.
- Treat `copias/` as immutable reference evidence. Read from it, but do not add generated output, graph databases, screenshots, or modifications inside it.
- Read the active client's `DNA.md` and `brand-spec.json` immediately before implementing that client. The user-approved brief explicitly overrides the generated FlashTech additions in both DNA files: retain the observed lead brand colors, lead logo, reference mechanics, and compatible typography choices; do not import FlashTech colors, names, tokens, components, or identity.
- Use only observed public lead facts already present in the active client's source material. Demo properties, prices, metrics, availability, testimonials, and conversion claims must be labeled as demonstrations or omitted.
- Keep each site independently openable from `index.html` and from the existing preview server. A failed external request must not be required for first paint, motion, content, map, or CTA navigation.
- Keep typography local/legal: prefer an existing local licensed font if one is already present for that client; otherwise use the named reference/brand family as a CSS preference with system fallbacks. Never add a remote `@import` or a remote font URL.
- Make all non-decorative images local and give them meaningful `alt` text. Demo SVG plates must carry an explicit demo marker in their markup or data contract.
- Respect `prefers-reduced-motion`, keyboard focus, touch targets, and safe-area insets. On mobile, replace the 21 Oaks circular reveal with a lighter opacity/translate transition while preserving state, content, and CTA behavior.
- Do not call a visual placeholder a live property, live inventory, live map, verified metric, or active lead submission. The intermediary screen must state that it is a presentation template and that contact routing is prepared for a later integration.

## Review Focus

The implementation review must specifically challenge these failure modes:

1. The hero image, intent label, copy, progress state, and CTA can drift out of sync after autoplay, manual selection, keyboard navigation, or reduced-motion mode.
2. Reference code can be copied without its state assumptions, leaving a broken clip-path, scroll trigger, sticky section, or stale listener.
3. A local demo can look like a real listing or claim that a form/message was sent even though no backend exists.
4. A CDN font, external map, remote image, analytics call, or FlashTech token can make the offline demo depend on a network or leak another client's identity.
5. Desktop motion can create unusable intermediate/mobile layouts, especially the circular reveal, sticky Aircenter sequence, map panel, and intermediary CTA card.

## Task 1: Establish the focused regression contract before client implementation

**Files:**

- Create `test/real-estate-demos.test.js`
- Read-only references: `clientes/integrii-imoveis/DNA.md`, `clientes/integrii-imoveis/brand-spec.json`, `clientes/silvio-iwata-imobiliaria/DNA.md`, `clientes/silvio-iwata-imobiliaria/brand-spec.json`, `copias/21oaks-org/site/index.html`, `copias/aircenter-space/site/index.html`

- [ ] Add a failing test that asserts both client sites contain the required contract files: `content-slots.json`, `composition-spec.json`, `site/index.html`, `site/styles.css`, `site/interaction.js`, and at least three local SVG demo plates under `site/assets/`.
- [ ] Add a failing test that parses both JSON contracts and requires: `client`, `mode`, `brand`, `intents`, `properties`, `contactTemplate`, `offline`, and `referenceTrace`.
- [ ] Add a failing test that rejects `flashtech`, `designerpro`, `local_threejs`, `cdn`, `googleapis`, `mapbox`, `analytics`, and `fetch(` in client runtime files. The test must allow the word `FlashTech` only in a negative assertion message or test fixture, not in a client site file.
- [ ] Add a failing test that requires each intent to contain a stable id, visible label, action label, image path, and target section id; requires each property to contain only the agreed demo schema fields (`title`, `city`, `neighborhood`, `type`, `bedrooms`, `area`, `priceLabel`, `intent`, `image`, `isDemo`).
- [ ] Add a failing test that verifies no client runtime URL begins with `http://` or `https://`, and that every referenced image path resolves inside its own client site directory.
- [ ] Run `node --test test/real-estate-demos.test.js` and record the expected failure as the pre-implementation baseline.
- [ ] Do not alter the repository-wide `npm test` baseline in this task. The existing unrelated vault-integrity failure remains separately documented; this focused suite must identify only the new deliverable's contract.

## Task 2: Create isolated content and composition contracts

**Files:**

- Create `clientes/integrii-imoveis/content-slots.json`
- Create `clientes/integrii-imoveis/composition-spec.json`
- Create `clientes/silvio-iwata-imobiliaria/content-slots.json`
- Create `clientes/silvio-iwata-imobiliaria/composition-spec.json`
- Modify only if necessary: `test/real-estate-demos.test.js`

- [ ] Define Integri's observed brand tokens in its own contract: deep navy `#00233a`, hover navy `#264458`, near-black `#121212`, neutral `#f2f2f2`, and white. Define its typography preference as Plus Jakarta Sans for display/body with system fallbacks unless a local legal font is present. Do not copy FlashTech token names or token files.
- [ ] Define Silvio's observed brand tokens in its own contract: green `#055227`, secondary green `#005023`, lime accent `#8dbc2a`, and white. Define Plus Jakarta Sans/Inter with system fallbacks unless a local legal font is present. Keep the observed “desde 1976” history as an authority slot only when it is sourced from the lead material.
- [ ] Define three intent records for each site: `comprar`, `alugar`, and `investir`. The `investir` record must be a conversion campaign intent, not a promise of financial return or a live investment product.
- [ ] Define three demonstrative property records per site using the approved schema, local SVG assets, `isDemo: true`, and copy that describes an experience rather than inventing availability, price, yield, client names, or performance.
- [ ] Define the intermediary screen contract with separate intent-aware headings, supporting copy, action label, and a no-backend disclosure. The primary action may point to a prepared destination section or an external lead site only as a navigation handoff; it must not claim that a message was sent.
- [ ] Define `referenceTrace` with file and line anchors for the mechanics being reproduced: 21 Oaks hero state/preload/reveal/autoplay/progress and Aircenter sticky/parallax/reveal/counter/map/slider sections. Include a short adaptation note for every anchor.
- [ ] Define `offline.required: true`, `remoteAssets: []`, `remoteScripts: []`, and `backend: false` in both contracts.
- [ ] Run the focused contract test. It must still fail only because the sites and assets do not exist yet, not because the JSON shape is invalid.

## Task 3: Add local, unmistakably demonstrative property image plates

**Files:**

- Create `clientes/integrii-imoveis/site/assets/integri-casa-01.svg`
- Create `clientes/integrii-imoveis/site/assets/integri-casa-02.svg`
- Create `clientes/integrii-imoveis/site/assets/integri-casa-03.svg`
- Create `clientes/silvio-iwata-imobiliaria/site/assets/silvio-casa-01.svg`
- Create `clientes/silvio-iwata-imobiliaria/site/assets/silvio-casa-02.svg`
- Create `clientes/silvio-iwata-imobiliaria/site/assets/silvio-casa-03.svg`

- [ ] Build each plate as a local, self-contained SVG architectural scene with house/interior/landscape composition, restrained texture, and no copied reference photography, lead logos, people, addresses, listing identifiers, or third-party marks.
- [ ] Use the active client's own colors only for overlays, labels, and accents; keep the scene palette neutral enough that it reads as a property presentation rather than a brand token dump.
- [ ] Add a visible “imagem demonstrativa” treatment in the surrounding UI, not as an intrusive watermark inside every plate. Set accessible `title`/`desc` elements in each SVG.
- [ ] Keep the SVG dimensions and viewBox stable so hero swaps do not change layout or produce cumulative shift.
- [ ] Extend the focused test to parse the SVGs, require `viewBox`, require a title/description, and reject external image hrefs.
- [ ] Run `node --test test/real-estate-demos.test.js`; the asset contract should pass while the HTML/runtime assertions remain red.

## Task 4: Implement Integri's 21 Oaks hero adaptation

**Files:**

- Create `clientes/integrii-imoveis/site/index.html`
- Create `clientes/integrii-imoveis/site/styles.css`
- Create `clientes/integrii-imoveis/site/interaction.js`
- Modify `clientes/integrii-imoveis/content-slots.json` only for copy/data corrections found during implementation
- Modify `clientes/integrii-imoveis/composition-spec.json` only for traceable implementation corrections

- [ ] Before coding, read the active Integri DNA and brand spec in full and record the explicit brief override in the implementation notes: FlashTech additions are excluded, while Integri's observed brand values and the approved reference mechanics remain.
- [ ] Add a semantic header with the retained Integri logo wordmark, menu control, clear intent CTA, and a no-JS-safe anchor to the intermediary section. The logo must remain a lead identity element, not a 21 Oaks identity element.
- [ ] Implement the hero with two stacked local image layers, a current slide state, a next-slide state, an SVG circular clip-path reveal on desktop, and a mobile media query that switches to opacity/translate without the circular mask.
- [ ] Implement the 21 Oaks-inspired state interface in `interaction.js`: `setIntent(index, reason)`, `renderIntent(state)`, `transitionMedia(state)`, `updateProgress(state)`, `startAutoplay()`, `stopAutoplay()`, and `initIntegriHero(root)`. Keep all DOM writes inside the site runtime.
- [ ] Make one intent record the single source of truth for the hero image, eyebrow, title, support copy, action label, target id, and progress index. On every transition, assert in development-friendly code that the current intent and image path agree before rendering.
- [ ] Preserve the reference behavior of timed progression, thumbnail/manual selection, progress bar, keyboard access, and pause-on-hover/focus. The timer must be stopped on hidden documents and restarted only when the hero is visible and motion is permitted.
- [ ] Preserve the reveal sequencing derived from the 21 Oaks preload/clip-path timeline, but implement it with local CSS variables and native animation events so the first paint works offline. Use a transition guard so rapid clicks cannot leave two active slides.
- [ ] Build the first navigation complete enough for a lead presentation: hero, intent-aware property rail, authority/proof section using only observed lead material, Maringá/região static map plate with a clear “mapa demonstrativo” label, process/benefits, intermediary contact screen, and footer.
- [ ] Make all CTA links route to the intermediary screen with `data-intent` and update the screen's copy. No form submit, network call, success toast, or “enviado” language is allowed.
- [ ] Add accessible labels for progress controls, current slide, image alt text, menu, and intent CTA. Ensure focus remains visible over image overlays.
- [ ] Run the focused Node test and a local static-server smoke test by opening `clientes/integrii-imoveis/site/index.html` through the repository preview server. The test should now pass for Integri structure, contract, local assets, and offline constraints.

## Task 5: Implement Silvio's Aircenter–21 Oaks scroll narrative

**Files:**

- Create `clientes/silvio-iwata-imobiliaria/site/index.html`
- Create `clientes/silvio-iwata-imobiliaria/site/styles.css`
- Create `clientes/silvio-iwata-imobiliaria/site/interaction.js`
- Modify `clientes/silvio-iwata-imobiliaria/content-slots.json` only for copy/data corrections found during implementation
- Modify `clientes/silvio-iwata-imobiliaria/composition-spec.json` only for traceable implementation corrections

- [ ] Before coding, read the active Silvio DNA and brand spec in full and record the explicit brief override in the implementation notes: FlashTech additions are excluded, while Silvio's observed green/lime brand system and the approved reference mechanics remain.
- [ ] Implement a sticky cinematic hero with local house imagery, layered foreground/background movement, and a section progress indicator. Preserve the Aircenter sense of continuous movement while keeping all images local and the initial render deterministic.
- [ ] Implement the native scroll-story interface: `initScrollStory(root)`, `setActiveSection(id)`, `updateSectionProgress(section)`, `updateParallax(section, progress)`, and `respectMotionPreference()`. Use `IntersectionObserver` for section activation and `requestAnimationFrame` for scroll-linked CSS variables; never depend on a remote Lenis/GSAP bundle.
- [ ] Recreate the approved Aircenter structural beats: sticky/parallax hero, reveal section, format/authority section with restrained counter/progress treatment, Maringá/região map section, and property/story slider with progress. Recreate the behavior, not unrelated Aircenter copy, imagery, or brand identity.
- [ ] Use Silvio's green/lime tokens for section transitions, markers, and CTA surfaces. Use the 21 Oaks typographic/spacing restraint only where it improves hierarchy; do not import its lavender palette, logo, or text.
- [ ] Define the narrative linearly: who the lead is, what the visitor can explore, choose comprar/alugar/investir, understand region/context, then route to the intermediary screen. Keep the order stable for keyboard and reduced-motion users.
- [ ] Use a static local Maringá/região map plate, with a clear region caption and no interactive map SDK. If Paiçandu is mentioned, label it as a coverage/context highlight sourced from the lead material rather than as a live geographic service.
- [ ] Preserve the Aircenter-style scroll continuity when entering the intermediary screen: fade/translate section content into a calm lead-intent card, retain the active intent in `data-intent`, and provide a route back to the narrative.
- [ ] Add keyboard/focus behavior for the property/story slider and intent navigation. Ensure sticky sections do not trap focus or create horizontal overflow.
- [ ] Run the focused Node test and the local static-server smoke test. The test should now pass for Silvio structure, scroll hooks, local assets, and offline constraints.

## Task 6: Build the shared interaction contract for intermediary contact screens

**Files:**

- Modify `clientes/integrii-imoveis/site/index.html`
- Modify `clientes/integrii-imoveis/site/styles.css`
- Modify `clientes/integrii-imoveis/site/interaction.js`
- Modify `clientes/silvio-iwata-imobiliaria/site/index.html`
- Modify `clientes/silvio-iwata-imobiliaria/site/styles.css`
- Modify `clientes/silvio-iwata-imobiliaria/site/interaction.js`
- Modify both `content-slots.json` files if copy needs alignment

- [ ] Add a single intermediary route per site using a hash/anchor or local section transition; preserve the selected `comprar`, `alugar`, or `investir` intent in the URL fragment or `data-intent` attribute.
- [ ] Render three distinct intent messages and actions, with creative copy that preserves the intended funnel action without implying inventory, financing, rental approval, investment return, or a completed contact.
- [ ] Include a clear presentation-template disclosure and a prepared next-step label such as “continuar para atendimento”. When an external lead URL is used, make it an explicit navigation link and do not intercept it with a fake submit handler.
- [ ] Ensure no client-side code serializes personal data, calls a backend, stores a lead, or emits analytics. A form may be presented only as a non-submitting visual template if its status is unambiguous; a simple CTA link is preferred.
- [ ] Add a regression test that clicks every hero/property CTA in the browser and verifies the intermediary screen displays the matching intent, with no network request beyond the document and local assets.

## Task 7: Add responsive, reduced-motion, and offline browser verification

**Files:**

- Create `test/real-estate-demos.browser.test.js`
- Modify the two site CSS/JS files only where a failing browser assertion proves a defect

- [ ] Start the repository preview server with an explicit local port and serve each client site from its own root. Do not use a network URL as a fixture.
- [ ] Add Playwright coverage at 1440×977, 1024×900, and 390×844 for both sites. Capture screenshots into a temporary ignored directory or use in-memory assertions; do not write artifacts into `copias/`.
- [ ] Assert first paint contains the lead logo, a property scene, the current intent, a visible CTA, and the local “demonstrative image” treatment.
- [ ] Assert Integri desktop changes image, headline, CTA target, active thumbnail, and progress state together after an intent click and after one autoplay interval. Assert mobile uses the non-circular transition class.
- [ ] Assert Silvio scroll activation changes section progress and parallax CSS variables while the active section remains readable. Assert the static map is visible and no horizontal overflow exists at any viewport.
- [ ] Emulate `prefers-reduced-motion: reduce` and assert autoplay does not advance automatically, while manual intent navigation and content remain available.
- [ ] Block all network requests except the local document/assets and fail if any remote font, image, script, map, analytics, or API request is attempted.
- [ ] Use axe-style checks already available in the repository or focused DOM assertions for landmark, image alt, button/link name, focus visibility, and contrast-sensitive class usage. Report any tool limitation rather than claiming a complete accessibility audit.
- [ ] Run `node --test test/real-estate-demos.test.js test/real-estate-demos.browser.test.js` and retain the command output as verification evidence.

## Task 8: Final repository validation and review handoff

**Files:**

- Modify `HANDOFF.md` only if the repository's existing handoff format requires a new factual status entry
- No changes to `copias/` or unrelated dirty files

- [ ] Run `git diff --check` and `git status --short`; verify only the two client demos, focused tests, and approved documentation are in the requested scope.
- [ ] Run the focused demo tests and the full `npm.cmd test`. If the pre-existing vault-integrity failure remains, report its exact file and reason separately; do not relabel the entire repository as passing.
- [ ] Inspect the rendered desktop and mobile pages directly from the local server, including a hard refresh with the network disabled/block-all route. Record observed behavior for hero state sync, sticky scroll, map visibility, intermediary CTA, and reduced motion.
- [ ] Search the final client directories for forbidden strings and external URLs with `rg -n -i "flashtech|designerpro|local_threejs|https?://|googleapis|mapbox|analytics|fetch\(" clientes/integrii-imoveis clientes/silvio-iwata-imobiliaria` and require zero runtime matches.
- [ ] Compare each implementation against its `referenceTrace` and the design spec. Record any intentional deviation, especially native replacements for GSAP/Lenis and mobile reveal simplification.
- [ ] Request focused review with the exact verification commands, screenshot viewport matrix, known pre-existing repository failure, and the list of files intentionally untouched.
- [ ] Commit only the completed demo scope in a small traceable commit after verification. Do not stage unrelated user changes.

## Execution Order and Commit Boundaries

Execute tasks in order because the focused tests and content contracts are prerequisites for both isolated client builds. Suggested commit boundaries are:

1. `test: define real estate demo regression contract` — Task 1.
2. `feat: add isolated real estate demo content contracts` — Task 2.
3. `feat: add local demonstrative property plates` — Task 3.
4. `feat: build integri 21 oaks presentation hero` — Task 4.
5. `feat: build silvio aircenter scroll presentation` — Task 5.
6. `feat: add intent intermediary screens` — Task 6.
7. `test: verify real estate demos across viewports` — Task 7.
8. `chore: verify real estate presentation demos` — Task 8, only after the focused review gate is satisfied.

If the execution method uses subagents, keep each task's file ownership isolated and have the coordinator run the focused tests after every merge. No subagent may edit `copias/`, the other client's directory, or unrelated dirty files outside its assigned task.
