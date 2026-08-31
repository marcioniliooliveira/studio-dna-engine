# Task 4 report: append-only run and cost ledger

## Scope and changes

- Added `src/orchestration/run-store.js` with `createRunStore({ rootDir, now })`.
  - Creates isolated, slug-validated run directories and returns opaque `{ runId }` references.
  - Appends fsynced JSONL event and cost entries with independent, per-run sequence chains.
  - Uses SHA-256 links over `{ seq, at, type, data, prev }`; replay rejects malformed, reordered, edited, or otherwise mismatched ledger entries with `RUN_LEDGER_CORRUPT`.
  - Replaces the derived `snapshot.json` through a private temporary file and rename after each mutation.
  - Records the initial state as a hashed `RUN_CREATED` event and replays it on load. `snapshot.state`, event and cost counts, and totals must exactly match replayed ledgers or loading rejects with `RUN_LEDGER_CORRUPT`.
  - Performs best-effort directory fsync after store/run directory creation and after snapshot rename; platforms that cannot fsync directories are handled explicitly.
  - Uses an atomic per-run lock directory around replay, append and snapshot replacement. A competing store fails closed with `RUN_BUSY`, preventing duplicate sequence/hash predecessors.
  - Validates compact event payloads and Task 1's compact cost contract. The public boundary also accepts the brief's `estimated` alias and normalizes it to `est` before persistence.
  - Replays the ledgers on every load and returns immutable initial state, entries, and accumulated totals. A `null` input, output, cached-token, or USD value makes that aggregate unknown (`null`); it is never converted to zero.
- Added `test/run-store.test.js`.
  - Covers process reconstruction/resume without a conversation field, unknown IDE USD preservation, ledger tampering, and per-run monotonic cost sequences.
  - Adds regression coverage for tampered snapshot state/counts/totals, competing mutation locks, and attempted directory synchronization for both creation and snapshot replacement.

## TDD evidence

The test file was created before `src/orchestration/run-store.js` existed.

    node --test test/run-store.test.js

Observed RED result: exit code 1 with the expected `Cannot find module '../src/orchestration/run-store'` error.

Review follow-up: the focused suite passed 11 tests, including the new snapshot, lock, and directory-durability regressions.

## Final verification

Commands run from `C:\Users\wd\Documents\playwright-scraper\.worktrees\orchestration-roadmap`:

    node --check src/orchestration/run-store.js
    node --test test/run-store.test.js
    npm test
    git diff --check

Observed results in this run: syntax and whitespace checks exited 0; the focused suite passed 11/11; the repository suite passed 84/84 with 0 failures.

## Risk note

Inferred: filesystem atomic rename plus best-effort directory fsync protects against ordinary interrupted replacement, but cannot make every filesystem durable (some platforms reject directory fsync) or defend against a hostile writer with direct access to the run-store root. That root remains a trusted-writer boundary; a stale lock after a process crash deliberately fails closed until external recovery removes it.
