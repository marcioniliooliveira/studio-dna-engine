# Task 3 — Cross-client no-remote-runtime verifier

## Scope

Test-only implementation. No production artifact was changed.

Shared helper: `test/helpers/local-runtime-determinism.js`.

## RED evidence

Command:

```text
node --test test/local-runtime-determinism.test.js
```

Observed result: failed with `Cannot find module './helpers/local-runtime-determinism'` before the helper existed. The first two tests already described the required changed-blob and injected-external-script behaviors.

## GREEN evidence

The helper exposes:

```js
validateLocalRuntimeManifest({ clientRoot, manifestPath })
// -> Promise<{ files: Array<{ path, sha256 }> }>

installNoRemoteRuntimeGuard(page, origin)
// -> { blockedUrls, assertClean() }
```

`validateLocalRuntimeManifest` only resolves files below the supplied active client root, requires a valid runtime record, rejects absolute/traversal/drive-relative/ADS paths, and SHA-256 verifies each declared file. `installNoRemoteRuntimeGuard` aborts off-origin `script` and `stylesheet` requests and `assertClean()` emits one diagnostic containing every blocked URL.

Observed test commands and results:

| Command | Result |
| --- | --- |
| `node --test test/local-runtime-determinism.test.js test/negocia-bem-scroll-integrity.test.js test/sticky-scroll-integrity.test.js` | 15 passed, 0 failed |
| `node --test test/negocia-bem-scroll-integrity.test.js test/sticky-scroll-integrity.test.js` (run 1) | 5 passed, 0 failed |
| `node --test test/negocia-bem-scroll-integrity.test.js test/sticky-scroll-integrity.test.js` (run 2) | 5 passed, 0 failed |
| `npm.cmd test` | 168 passed, 0 failed |

## Commit

- `c7b0900 test(qa): reject mutable client runtime dependencies`

## Concerns

Observed: current production artifacts still request off-origin resources that Task 3 cannot change: Negocia Bem requests a Google Fonts stylesheet, and SCALEX requests a Google Fonts stylesheet plus pre-existing remote scripts. The shared guard aborts and records all of them; both visual suites preserve their existing layout assertions and include the blocked list in required-runtime failure diagnostics. Calling `assertClean()` in those suites would fail the current baseline solely on those out-of-scope requests. The helper's strict `assertClean()` behavior is exercised by the injected-script regression test.
