# Reference Design Intelligence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert approved high-end references and client evidence into reusable design grammar, interoperable tokens and three materially distinct visual directions.

**Architecture:** Immutable sources are registered by type and compiled into narrow Reference Packs. The architect receives client evidence plus extracted grammar and emits three direction contracts in one stateless response. A human decision freezes one direction into a `design-contract`; Gemini never chooses the winner.

**Tech Stack:** Node.js 20+, CommonJS, Zod 4, Playwright/CDP, PostCSS, DTCG-compatible JSON, existing ICM and Design Vault.

**Spec:** `docs/superpowers/specs/2026-09-16-design-capability-orchestration-v2-design.md`

**Prerequisite:** Complete `docs/superpowers/plans/2026-09-16-reference-discovery-qualification.md`. This plan consumes promoted sources; it does not discover, score or approve external candidates.

## Global Constraints

- Read only the active client's evidence and explicitly approved references.
- Never mutate `copias/`.
- Never copy reference brand names, copy or assets into client defaults.
- A reference contributes only the roles explicitly approved for it.
- A direction may propose candidate tokens inside exploration bounds; only the selected direction becomes normative.
- Exactly three direction contracts are produced, but they need not use three different models.
- Direction diversity is measured by topology, focal strategy, type dominance, density and motion—not color alone.

---

### Task 1: Approved reference source projection

**Files:**
- Create: `src/design/reference-source-contract.js`
- Create: `src/design/reference-registry.js`
- Create: `schemas/v2/reference-source.schema.json`
- Test: `test/reference-registry-v2.test.js`

**Interfaces:**
- Consumes: `ReferencePromotion`
- Produces: `registerReferenceSource(promotion): RegisteredReferenceSource`
- Produces: `getApprovedReferenceSources({ clientScope, sourceIds }): RegisteredReferenceSource[]`

- [ ] **Step 1: Write failing tests projecting promoted `git-repository`, `web-page`, `uploaded-image`, `local-capture`, `figma-file`, `penpot-file`, `design-system` and `client-asset` candidates**
- [ ] **Step 2: Prove the source preserves the immutable Git commit or web capture timestamp and content hash from the promotion evidence**

```js
test('does not require a Git commit for a captured web page', () => {
  const source = registerReferenceSource(validWebPageSource());
  assert.equal(source.sourceType, 'web-page');
  assert.equal(source.provenance.commit, undefined);
});
```

- [ ] **Step 3: Reject direct source input and promotions without role, provenance, usage status or client/global scope**
- [ ] **Step 4: Reject `inspiration-only` sources used as executable code dependencies**
- [ ] **Step 5: Run focused and Vault integrity tests**
- [ ] **Step 6: Commit with `feat(design): add typed reference provenance registry`**

### Task 2: Reference forensic extractor

**Files:**
- Create: `src/design/reference-forensics.js`
- Create: `src/design/browser-layout-extractor.js`
- Create: `src/design/motion-observer.js`
- Test: `test/reference-forensics.test.js`
- Create fixtures: `test/fixtures/reference-forensics/`

**Interfaces:**
- Produces: `extractReferenceForensics({ source, viewports, outputDir }): Promise<ReferenceForensics>`

- [ ] **Step 1: Create a deterministic fixture with asymmetric layout, local fonts, image crop and scroll animation markers**
- [ ] **Step 2: Write a failing test for normalized layout regions, computed typography, palette, focal crop and responsive topology**
- [ ] **Step 3: Write a failing test that motion extraction records changed transform/opacity states without arbitrary sleeps**
- [ ] **Step 4: Implement Playwright evaluation for DOM rectangles, computed styles, z-order, overflow and media assets**
- [ ] **Step 5: Implement bounded animation observation at declared scroll progress values**
- [ ] **Step 6: Store screenshots and extracted JSON outside the immutable source directory**
- [ ] **Step 7: Run the focused test twice and require identical structural JSON hashes**
- [ ] **Step 8: Commit with `feat(design): extract deterministic reference forensics`**

### Task 3: Design grammar compiler

**Files:**
- Create: `src/design/design-grammar-compiler.js`
- Create: `schemas/v2/design-grammar.schema.json`
- Test: `test/design-grammar-compiler.test.js`

**Interfaces:**
- Consumes: `ReferenceForensics[]`
- Produces: `compileDesignGrammar(input): DesignGrammar`

- [ ] **Step 1: Write failing tests for topology, hierarchy ratios, spacing rhythm, typography contrast, material language and responsive transformation**
- [ ] **Step 2: Write a failing anti-copy test that rejects reference brand copy and asset paths**
- [ ] **Step 3: Implement deterministic numeric extraction and preserve interpretive statements as sourced annotations**
- [ ] **Step 4: Attach every grammar claim to source IDs and evidence paths**
- [ ] **Step 5: Run focused tests and repeat compilation to prove idempotence**
- [ ] **Step 6: Commit with `feat(design): compile evidence-backed design grammar`**

### Task 4: DTCG-compatible token model

**Files:**
- Create: `src/design/token-contract-v2.js`
- Create: `src/design/token-resolver-v2.js`
- Create: `tokens/core.tokens.json`
- Create: `tokens/semantic.tokens.json`
- Create: `tokens/typography.tokens.json`
- Create: `tokens/motion.tokens.json`
- Test: `test/design-tokens-v2.test.js`

**Interfaces:**
- Produces: `validateTokenDocument(input): TokenDocument`
- Produces: `resolveTokenSet({ core, semantic, client, component }): ResolvedTokens`

- [ ] **Step 1: Write failing tests for type inheritance, aliases, cycle rejection and missing units**
- [ ] **Step 2: Write a failing isolation test proving SCALEX tokens cannot become global defaults**
- [ ] **Step 3: Implement strict token validation and deterministic alias resolution**
- [ ] **Step 4: Add converters for CSS custom properties and the existing `DESIGN.md` front matter**
- [ ] **Step 5: Run token and existing transmuter isolation tests**
- [ ] **Step 6: Commit with `feat(design): add portable layered design tokens`**

### Task 5: Framework-neutral design recipe registry

**Files:**
- Create: `src/design/recipe-contract.js`
- Create: `src/design/design-registry.js`
- Create: `design-registry/registry.json`
- Create: `design-registry/compositions/editorial-split-hero/recipe.json`
- Create: `design-registry/motion/masked-type-reveal/recipe.json`
- Test: `test/design-registry.test.js`

**Interfaces:**
- Produces: `queryDesignRecipes(criteria): DesignRecipe[]`
- Produces: `validateDesignRecipe(input): DesignRecipe`

- [ ] **Step 1: Write failing tests requiring provenance, license, use/avoid rules, content constraints, responsive strategy and tests**
- [ ] **Step 2: Write a failing test proving recipe queries return metadata before source code**
- [ ] **Step 3: Implement the registry index and deterministic filtering by archetype, density, variance, motion and framework**
- [ ] **Step 4: Add one composition and one motion recipe from already approved project knowledge, without client tokens or copy**
- [ ] **Step 5: Run registry and client isolation tests**
- [ ] **Step 6: Commit with `feat(design): introduce framework-neutral design recipes`**

### Task 6: Design intent contract and questionnaire compiler

**Files:**
- Create: `src/design/design-intent-contract.js`
- Create: `src/design/questionnaire-compiler.js`
- Create: `schemas/v2/design-intent.schema.json`
- Test: `test/questionnaire-compiler.test.js`

**Interfaces:**
- Produces: `compileDesignIntent({ clientEvidence, answers }): DesignIntent`

- [ ] **Step 1: Convert the existing SCALEX questionnaire answers into a versioned fixture**
- [ ] **Step 2: Write failing tests for audience, objective, narrative, emotion, design dials, invariants, exploration bounds and prohibited patterns**
- [ ] **Step 3: Reject missing client facts instead of inventing values**
- [ ] **Step 4: Allow subjective intent only when linked to visual references or explicit human answers**
- [ ] **Step 5: Run the focused test and compare the compiled fixture to a committed snapshot**
- [ ] **Step 6: Commit with `feat(design): compile human intent into a bounded contract`**

### Task 7: Reference Pack builder with progressive disclosure

**Files:**
- Create: `src/design/reference-packet-builder-v2.js`
- Create: `schemas/v2/reference-packet.schema.json`
- Test: `test/reference-packet-builder-v2.test.js`

**Interfaces:**
- Produces: `buildReferencePacket({ clientScope, designIntent, sources, grammar, recipeIds }): ReferencePacket`
- Produces: `selectReferenceSlice(packet, taskPurpose): ReferencePacketSlice`

- [ ] **Step 1: Write a failing test for one-to-five role-scoped sources rather than a fixed source count**
- [ ] **Step 2: Write a failing test proving a composition task cannot receive unselected raw assets or another client's tokens**
- [ ] **Step 3: Implement packet hashing and per-purpose slices for composition, typography, motion and assets**
- [ ] **Step 4: Record omitted data categories so the executor knows absence is intentional**
- [ ] **Step 5: Run packet, ICM and Vault tests**
- [ ] **Step 6: Commit with `feat(design): build minimal reference packets`**

### Task 8: Three-direction architect output and diversity gate

**Files:**
- Create: `src/design/visual-direction-contract.js`
- Create: `src/design/direction-task-compiler.js`
- Create: `src/design/direction-diversity-gate.js`
- Create: `schemas/v2/visual-direction.schema.json`
- Test: `test/direction-task-compiler-v2.test.js`

**Interfaces:**
- Produces: `compileDirectionArchitectTask({ intent, referencePacket }): ExecutionTaskV2`
- Produces: `validateDirectionSet(directions): DirectionSetResult`

- [ ] **Step 1: Write a failing test requiring exactly three direction contracts from one architect task**
- [ ] **Step 2: Write a failing test where three palette variants share the same topology and must fail `INSUFFICIENT_DIRECTION_DIVERSITY`**

```js
test('palette changes do not satisfy structural diversity', () => {
  const result = validateDirectionSet([directionA, recoloredA, recoloredAgainA]);
  assert.equal(result.passed, false);
  assert.equal(result.violations[0].code, 'INSUFFICIENT_DIRECTION_DIVERSITY');
});
```

- [ ] **Step 3: Score diversity across topology, focal strategy, type dominance, density, image strategy and motion signature**
- [ ] **Step 4: Ensure all directions preserve invariants and remain inside exploration bounds**
- [ ] **Step 5: Run focused tests with positive and negative fixtures**
- [ ] **Step 6: Commit with `feat(design): enforce material direction diversity`**

### Task 9: Direction board renderer and intent-golden manifest

**Files:**
- Create: `src/design/direction-board-contract.js`
- Create: `src/design/direction-board-task-compiler.js`
- Create: `src/design/intent-golden-manifest.js`
- Create: `schemas/v2/direction-board.schema.json`
- Test: `test/direction-board-pipeline.test.js`

**Interfaces:**
- Produces: `compileDirectionBoardTasks({ directions, sections, viewports }): ExecutionTaskV2[]`
- Produces: `buildIntentGoldenManifest({ boardResults, decision }): IntentGoldenManifest`

- [ ] **Step 1: Write a failing test requiring two boards per critical section: desktop and mobile**
- [ ] **Step 2: Write a failing test allowing a third board only when it represents an explicitly declared interaction or motion state**
- [ ] **Step 3: Compile isolated renderer tasks with one direction, one section and one viewport/state per output**
- [ ] **Step 4: Require every result to include direction hash, section ID, viewport, asset provenance and screenshot hash**
- [ ] **Step 5: Reject boards that rasterize visible copy into the implementation artifact or use the board as a site background**
- [ ] **Step 6: Build the intent-golden manifest only from a signed human direction decision**
- [ ] **Step 7: Run focused tests and commit with `feat(design): render approvable direction boards`**

### Task 10: Human decision and design-contract compiler

**Files:**
- Create: `src/design/design-contract-compiler.js`
- Create: `schemas/v2/design-contract.schema.json`
- Test: `test/design-contract-compiler.test.js`

**Interfaces:**
- Produces: `compileDesignContract({ intent, selectedDirection, decision, tokens, recipes }): DesignContract`

- [ ] **Step 1: Write failing tests for mismatched direction hash, unsigned decision and rejected direction**
- [ ] **Step 2: Write a failing test requiring preserved elements, rejected patterns and per-section acceptance IDs**
- [ ] **Step 3: Freeze candidate tokens and selected recipes into a client-scoped contract**
- [ ] **Step 4: Ensure the contract contains no raw reference copy, unapproved assets or unresolved choices**
- [ ] **Step 5: Run focused tests and canonical hash stability tests**
- [ ] **Step 6: Commit with `feat(design): freeze approved direction for execution`**

### Task 11: Optional Penpot design adapter

**Files:**
- Create: `src/design/penpot-adapter.js`
- Create: `src/design/design-canvas-adapter.js`
- Test: `test/penpot-adapter.test.js`
- Create: `configs/penpot-mcp.example.json`

**Interfaces:**
- Produces: `createDesignCanvasAdapter(options): DesignCanvasAdapter`
- Produces methods: `exportDirectionBoard`, `importDecisionAnnotations`, `syncTokens`

- [ ] **Step 1: Write contract tests using a fake MCP transport; do not require a live Penpot instance in `npm test`**
- [ ] **Step 2: Prove imported tokens are validated against the canonical DTCG documents before acceptance**
- [ ] **Step 3: Prove canvas changes cannot overwrite a signed design contract or implementation golden**
- [ ] **Step 4: Implement Penpot as an optional adapter behind the generic canvas interface**
- [ ] **Step 5: Add a manual integration command that starts read-only and requires explicit write enablement**
- [ ] **Step 6: Run adapter tests and commit with `feat(design): add optional Penpot canvas bridge`**

## Completion criteria

- References are understood through evidence-backed relationships, not loaded as undifferentiated context.
- Tokens are portable and client-isolated.
- The registry reuses engineering behavior without imposing one visual identity.
- Three directions must be structurally different.
- Human approval freezes one exact direction hash.
- Each critical section has desktop/mobile boards and an optional declared motion-state board before implementation.
- The final design contract contains no unresolved creative decision for Gemini to infer.
