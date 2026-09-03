# IDE recovery foundation

## Goal

Make the IDE additions safe to reuse across clients and make their QA status truthful before they enter the orchestrated product pipeline.

## Tasks

- [ ] 1. Remove SCALEX-specific defaults from the generic transmuter; preserve reference/client behavior in declarative data. Verify: a non-SCALEX fixture never receives SCALEX copy, IDs or colors.
- [ ] 2. Make QA promotion fail closed. Verify: failed network checks and failed audit reports make both the gate and CLI fail.
- [ ] 3. Calibrate the deterministic visual gate for intentional 3D front/back layers. Verify: a declared overlap is allowed while an undeclared overlap still fails.
- [ ] 4. Repair SCALEX runtime dependencies and asset closure. Verify: unified audit has no console errors, broken images or external asset dependency failures.
- [ ] 5. Protect reference evidence and complete slug migration. Verify: Vault integrity and canonical client resolution reject undeclared removals/legacy slugs.
- [ ] 6. Run the same immutable SCALEX artifact through all gates and record hash-bound QA evidence. Verify: test suite, components, unified QA and scrutiny all pass.

## Done When

- [ ] The generic pipeline contains no client identity.
- [ ] A failing gate cannot result in a successful command or promotion claim.
- [ ] SCALEX is evaluated from a reproducible local artifact with versioned evidence.
