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

## Fix round 1 — exact temporary allowlists

Binding ruling implemented: each visual suite now supplies a client-scoped, literal baseline of the currently observed off-origin `script` and `stylesheet` URLs. Negocia Bem has one Google Fonts stylesheet URL; SCALEX has one Google Fonts stylesheet and nine pre-existing script URLs. The lists are local to their respective test files, have no host or path wildcards, and are temporary debt until the corresponding production artifacts can be made fully local.

`assertClean()` now fails when either condition occurs:

- any blocked URL is absent from that exact client allowlist, reporting the full unexpected URL list;
- any allowlisted URL was not observed, reporting the stale allowlist entries.

RED evidence: `node --test test/local-runtime-determinism.test.js` failed 2 tests before the allowlist behavior existed. The new tests proved that a newly injected URL could not be hidden by an allowed URL, and that a stale allowed URL caused failure.

GREEN evidence:

| Command | Result |
| --- | --- |
| `node --test test/local-runtime-determinism.test.js test/negocia-bem-scroll-integrity.test.js test/sticky-scroll-integrity.test.js` (run 1) | 16 passed, 0 failed |
| `node --test test/local-runtime-determinism.test.js test/negocia-bem-scroll-integrity.test.js test/sticky-scroll-integrity.test.js` (run 2) | 16 passed, 0 failed |
| `npm.cmd test` | 169 passed, 0 failed |

Implementation commit: `b15ad9b test(qa): baseline allowed remote runtime debt`.
