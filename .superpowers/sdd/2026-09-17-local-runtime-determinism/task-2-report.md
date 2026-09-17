# Task 2: Local SCALEX layout stylesheet and sticky evidence

## Changed paths

- `clientes/flashtech-caso-04-growth/site/assets/vendor/acilav.webflow.shared.379082d56.css`
- `clientes/flashtech-caso-04-growth/site/assets/vendor/runtime-manifest.json`
- `clientes/flashtech-caso-04-growth/site/index.html`
- `test/sticky-scroll-integrity.test.js`

## CSS import inspection

Observed on 2026-09-17: the pinned stylesheet contains no `@import` declarations. No imported stylesheet affects the SCALEX sticky declarations, so no additional stylesheet was localized.

## Pinned upstream evidence

- Upstream URL: `https://cdn.prod.website-files.com/69a94d5051ada59087892bea/css/acilav.webflow.shared.379082d56.css`
- Version: `acilav.webflow.shared.379082d56.css`
- SHA-256: `177cbf300905f4b42be6e610cd6eb3e268ade5e4d7c8556ae16072e806d5aec5`
- Downloaded artifact size: 159,873 bytes.

## RED evidence

Observed before the HTML or local asset change:

```text
node --test test/sticky-scroll-integrity.test.js
FAIL: Remote SCALEX stylesheets were blocked:
https://cdn.prod.website-files.com/69a94d5051ada59087892bea/css/acilav.webflow.shared.379082d56.css
```

The test served the site at loopback HTTP and aborted Webflow CDN stylesheet requests. The failure was the intended missing-local-stylesheet condition.

## GREEN evidence

Observed after the local stylesheet and HTML link change:

- `node --test test/sticky-scroll-integrity.test.js` passed twice: 1/1 tests each run.
- `npm.cmd test` passed: 158/158 tests, 0 failures.

The focused test waits for the local vendor stylesheet to load, then checks sticky positioning for service cards and the insight scroll area plus ancestor overflow. It records every blocked Webflow CDN stylesheet URL in its failure diagnostic.

## Reviewer follow-up: off-origin runtime isolation

Observed on 2026-09-17: the focused test now serves the site from loopback and aborts every off-origin `stylesheet` and `script` request, including Google Fonts, Cloudflare Turnstile, jQuery, Webflow, and GSAP requests. The test does not edit or execute the production remote scripts. Its local-stylesheet-readiness and sticky/overflow failure messages include the complete blocked-request URL list.

Observed evidence after this guard change:

- `node --test test/sticky-scroll-integrity.test.js` passed twice: 1/1 tests each run.
- `npm.cmd test` passed: 158/158 tests, 0 failures (30.058 seconds).

## Commits

- `9fe679d7cf68dff067e161764da028895abaa25a` — `fix(scalex): vendor sticky layout stylesheet`

- `ca6e9e94e2b14575d40cedf142bdc3df21df2149` — `test(scalex): block off-origin runtime dependencies`

## Concerns

- Observed: the client `assets/` directory is covered by a repository ignore rule. The required CSS and manifest were force-added explicitly so they are included in the implementation commit.
- Documented scope constraint: production Google Fonts and external scripts remain unaltered; the focused test aborts them so its sticky evidence does not depend on their execution.
