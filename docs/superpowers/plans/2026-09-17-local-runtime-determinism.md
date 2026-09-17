# Local Runtime Determinism Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the two client artifacts exercised by the current visual-integrity tests independent of mutable third-party JavaScript and stylesheet CDNs.

**Architecture:** Vendor only the runtime dependencies that determine the asserted behavior, preserve each artifact's existing visual implementation, and prove it in Playwright by aborting remote script and stylesheet requests. The tests serve the active client artifact locally and wait for a declared readiness condition instead of fixed timing alone.

**Tech Stack:** Static HTML/CSS/JS, Node.js 20+, Playwright, SHA-256, Node test runner.

**Spec:** `project-transformation-plan.md` (same immutable artifact across preview, QA and production); `docs/superpowers/specs/2026-09-16-design-capability-orchestration-v2-design.md` (evidence and client isolation).

## Global Constraints

- Preserve client isolation; do not copy tokens, content or assets between `negocia-bem` and `flashtech-caso-04-growth`.
- Treat `copias/` as read-only and never use it as an artifact fallback.
- Version every downloaded runtime source locally with its exact upstream URL, version and SHA-256 in a client-local manifest.
- Tests must block remote JavaScript and CSS requests; they may not rely on CDN availability.
- Keep the current desktop/mobile breakpoint contract (desktop at 769px; mobile at 767px) and ScrollTrigger active-state behavior.
- Keep the SCALEX sticky layout supplied by the versioned exported stylesheet; do not replace it with a narrow `position: sticky` override.
- Use TDD: record a focused failure with remote runtime requests blocked before changing production artifacts.

---

### Task 1: Local Negocia Bem runtime bundle and readiness evidence

**Files:**
- Create: `clientes/negocia-bem/site/assets/vendor/runtime-manifest.json`
- Create: `clientes/negocia-bem/site/assets/vendor/gsap-3.12.5.min.js`
- Create: `clientes/negocia-bem/site/assets/vendor/ScrollTrigger-3.12.5.min.js`
- Create: `clientes/negocia-bem/site/assets/vendor/tailwind-browser-4.3.3.min.js`
- Create: `clientes/negocia-bem/site/assets/vendor/lucide-pinned.min.js`
- Modify: `clientes/negocia-bem/site/index.html`
- Modify: `test/negocia-bem-scroll-integrity.test.js`

**Interfaces:**
- Produces: `window.__negociaBemRuntimeReady === true` only after local GSAP/ScrollTrigger initialization and the desktop/mobile stylesheet contract are available.
- Produces: `runtime-manifest.json` records `{ path, upstreamUrl, version, sha256 }` for each local runtime file.

- [ ] **Step 1: Add failing tests that abort every remote `script` and `stylesheet` request, then assert 769px desktop/mobile visibility, ScrollTrigger activation after the declared readiness flag, and zero aborted runtime requests.**

```js
await page.route('**/*', route => {
  const type = route.request().resourceType();
  const url = new URL(route.request().url());
  if ((type === 'script' || type === 'stylesheet') && url.origin !== origin) return route.abort();
  return route.continue();
});
await page.goto(`${origin}/index.html`);
await page.waitForFunction(() => window.__negociaBemRuntimeReady === true);
```

- [ ] **Step 2: Run `node --test test/negocia-bem-scroll-integrity.test.js` and verify RED because blocking the present CDN dependencies leaves either the active tab or 769px visibility incorrect.**
- [ ] **Step 3: Download the exact, pinned GSAP 3.12.5, ScrollTrigger 3.12.5, Tailwind browser 4.3.3 and the currently used Lucide runtime into the declared client-local paths; calculate SHA-256 and write the manifest.**
- [ ] **Step 4: Replace only the four runtime CDN script tags with relative local paths and add the readiness flag after the existing initialization has established GSAP/ScrollTrigger and the required layout styles.**
- [ ] **Step 5: Run the focused test twice; assert the same behavior at 769px, 767px and the Section 05 scroll position with all remote runtime requests blocked.**
- [ ] **Step 6: Commit with `fix(negocia-bem): vendor visual runtime dependencies`.**

### Task 2: Local SCALEX layout stylesheet and sticky evidence

**Files:**
- Create: `clientes/flashtech-caso-04-growth/site/assets/vendor/runtime-manifest.json`
- Create: `clientes/flashtech-caso-04-growth/site/assets/vendor/acilav.webflow.shared.379082d56.css`
- Modify: `clientes/flashtech-caso-04-growth/site/index.html`
- Modify: `test/sticky-scroll-integrity.test.js`

**Interfaces:**
- Produces: one local stylesheet link whose SHA-256 and upstream export URL are recorded in the client-local manifest.
- Produces: sticky integrity evidence obtained from an HTTP-served local artifact with remote scripts/styles aborted.

- [ ] **Step 1: Add a failing sticky test that serves the SCALEX site through a loopback HTTP server, aborts remote stylesheet requests, and asserts the required local stylesheet was loaded before inspecting `.service-card._01` and `.insight-scroll-area`.**
- [ ] **Step 2: Run `node --test test/sticky-scroll-integrity.test.js` and verify RED because the present remote Webflow stylesheet is blocked.**
- [ ] **Step 3: Download the exact `acilav.webflow.shared.379082d56.css` export to the declared local vendor path, record its source URL/version identity/SHA-256, and inspect every `@import` rule; localize any stylesheet dependency that affects the sticky test.**
- [ ] **Step 4: Replace only the exported Webflow stylesheet link with the relative local path; retain client copy, DOM and layout classes unchanged.**
- [ ] **Step 5: Run the focused sticky test twice with remote scripts/styles aborted and retain the existing sticky and ancestor-overflow assertions.**
- [ ] **Step 6: Commit with `fix(scalex): vendor sticky layout stylesheet`.**

### Task 3: Cross-client no-remote-runtime verifier

**Files:**
- Create: `test/local-runtime-determinism.test.js`
- Modify: `test/negocia-bem-scroll-integrity.test.js`
- Modify: `test/sticky-scroll-integrity.test.js`

**Interfaces:**
- Produces: `assertNoRemoteRuntimeRequests(page, origin)` test helper that reports each blocked `script`/`stylesheet` URL.
- Produces: client-local manifest validation that hashes each declared file and rejects a missing, changed or external runtime source.

- [ ] **Step 1: Write a failing test that corrupts a manifest hash and a failing test that injects an external script link into a fixture, each expecting a diagnostic failure.**
- [ ] **Step 2: Run `node --test test/local-runtime-determinism.test.js` and verify RED because the verifier module is absent.**
- [ ] **Step 3: Implement the minimal reusable helper and manifest validator; keep it read-only and client-scoped.**
- [ ] **Step 4: Wire both visual-integrity suites to use the helper, so a future remote script or stylesheet cannot silently make their result environment-dependent.**
- [ ] **Step 5: Run all three focused suites twice, then run `npm.cmd test`; require zero failures before recording the baseline green.**
- [ ] **Step 6: Commit with `test(qa): reject mutable client runtime dependencies`.**

## Completion criteria

- The three prior integrity assertions pass with third-party scripts/styles blocked.
- Each runtime asset is client-local, hash-pinned and provenance-recorded.
- Neither test can report a layout result when a required remote runtime resource is unavailable.
- `npm.cmd test` passes from this worktree without relying on those CDNs.
