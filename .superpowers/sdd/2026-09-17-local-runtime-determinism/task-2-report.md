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

## Commits

- `9fe679d7cf68dff067e161764da028895abaa25a` — `fix(scalex): vendor sticky layout stylesheet`

## Concerns

- Observed: the client `assets/` directory is covered by a repository ignore rule. The required CSS and manifest were force-added explicitly so they are included in the implementation commit.
- Documented scope constraint: the existing Google Fonts stylesheet remains external and is not altered; the focused abort targets the replaced Webflow CDN stylesheet dependency.
