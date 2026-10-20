# Codebase Modules Survey & Inventory Analysis Report

**Date**: 2026-10-15  
**Author**: Codebase Modules Explorer (`explorer_survey_1`)  
**Workspace**: `c:\Users\wd\Documents\playwright-scraper`  
**Target Architecture**: Model Context Protocol (MCP) Server for Studio DNA Engine  

---

## Executive Summary

- **Module Format**: The repository package is explicitly declared as `"type": "commonjs"` in `package.json`. Node.js version is v24.15.0 (`"engines": { "node": ">=20" }`).
- **MCP Dependencies**: `@modelcontextprotocol/sdk` (`^1.30.0`) and `zod` (`^4.4.3`) are installed in `node_modules`.
- **Existing MCP State**:
  - `src/mcp-server.js` exists as a monolithic initial prototype (159 lines) registering 4 tools and 2 static resources directly on `McpServer`.
  - `src/mcp/schemas.js` exists with complete Zod schemas for all 12 tools and path traversal guards (`validateSlugSecurity`, `getSafeClientDir`, `getSafeRefDir`, `getSafeVaultDir`).
  - `src/mcp/tools/scraping-tools.js` (Ingestion) and `src/mcp/tools/client-tools.js` (Iteration/Production) exist and register 7 of the 12 tools.
  - **Identified Gaps**: `src/mcp/index.js` does not exist (`MODULE_NOT_FOUND` observed when running `test/mcp-server.test.js`). Quality assurance tools (`qa-tools.js`), vault tool (`vault-tools.js`), static/dynamic resources (`src/mcp/resources/`), and interactive prompts (`src/mcp/prompts/`) are missing from `src/mcp/`.
- **Backing Engines Verification**: All 12 tools and resources have working backing modules in `src/` and `scripts/`. Runtime test execution confirmed passing test suites for Unified Quality Gate (8/8 pass), Impeccable Gate (13/13 pass), Visual Saliency Oracle (13/13 pass), Dualstack Compilers (28/28 pass), and Transmuter & Anti-Slop (11/11 pass).

---

## 1. Ingestion Modules

### 1.1 `scrape_and_extract_dna`
- **MCP Tool Name**: `scrape_and_extract_dna`
- **Status**: [observed] Implemented in `src/mcp/tools/scraping-tools.js` and partially in `src/mcp-server.js`.
- **Primary Backing File**: `c:\Users\wd\Documents\playwright-scraper\index.js`
- **Module System**: CommonJS (`module.exports = { runPipeline, ... }`)
- **Exported Function**: `runPipeline(options = {})`
- **CLI Invocations**:
  - `npm run scrape -- <url> [options]`
  - `node bin/cli.js <url> [--mode all|clone|dna|ui] [--out ./copias] [--headed] [--timeout <ms>]`
- **Underlying Pipeline Sub-modules**:
  - `src/pipeline/pipeline-runner.js` (CJS): Orchestrates detector, cloner, dna-extractor, ui-ux extractor, generators.
  - `src/core/cloner.js` (CJS): Playwright headless cloner downloading html, stylesheets, fonts, and assets.
  - `src/core/dna-extractor.js` (CJS): Extracts typography, color palettes, spacing, and layout grids.
  - `src/core/ui-ux-extractor.js` (CJS): Extracts interactive components and micro-interactions.
  - `src/cdp/semantic-skeleton-normalizer.js` (CJS): CDP semantic skeleton generator removing non-deterministic trackers.
  - `src/cdp/tracker-sanitizer.js` (CJS): Intercepts and strips Google Tag Manager, Meta Pixel, analytics.
  - `src/cdp/kinetic-timeline-interceptor.js` (CJS): Intercepts GSAP/rAF kinetic timelines.
- **Input Arguments**:
  - `url`: `string` (must be valid HTTP/HTTPS URL)
  - `mode`: `'all' | 'clone' | 'dna' | 'ui'` (default: `'all'`)
- **Output Structure**:
  ```json
  {
    "status": "success",
    "url": "https://example.com",
    "masterFolder": "c:\\Users\\wd\\Documents\\playwright-scraper\\copias\\example-com",
    "evidenceStatus": "c:\\Users\\wd\\Documents\\playwright-scraper\\copias\\example-com\\PIPELINE_STATUS.json",
    "message": "Extração concluída com sucesso..."
  }
  ```

### 1.2 `inspect_reference`
- **MCP Tool Name**: `inspect_reference`
- **Status**: [observed] Implemented in `src/mcp/tools/scraping-tools.js`.
- **Backing Mechanism**: Node.js `fs` inspection over `copias/{refSlug}` bounded by `getSafeRefDir(refSlug)`.
- **Module System**: CommonJS
- **Primary Helper File**: `src/mcp/schemas.js` (`getSafeRefDir`)
- **Input Arguments**:
  - `refSlug`: `string` (e.g., `storeyarchitecture-co-uk`, `elyse-residence-dev-webflow-io`, `likova-space`)
- **Output Structure**:
  ```json
  {
    "refSlug": "storeyarchitecture-co-uk",
    "refDir": "c:\\Users\\wd\\Documents\\playwright-scraper\\copias\\storeyarchitecture-co-uk",
    "hasIndexHtml": true,
    "indexHtmlSizeBytes": 35420,
    "assetsCount": 24,
    "metadataFiles": ["design-system/design_dna.json", "SITE_TYPE.json", "assets-manifest.json"]
  }
  ```
- **Security Invariant**: Strictly read-only; path traversal attempts (e.g. `../../`) are rejected by regex and path prefix checks.

---

## 2. Iteration & Production Modules

### 2.1 `create_client_project`
- **MCP Tool Name**: `create_client_project`
- **Status**: [observed] Implemented in `src/mcp/tools/client-tools.js` and `src/mcp-server.js`.
- **Primary Backing File**: `c:\Users\wd\Documents\playwright-scraper\src\generators\client-factory.js`
- **Module System**: CommonJS (`module.exports = { createClientProject }`)
- **Exported Function**: `createClientProject({ brandName, refSlug = 'storeyarchitecture-co-uk', brandSpec = {} })`
- **CLI Invocation**:
  - `npm run client`
  - `node src/generators/client-factory.js --brand "<brandName>" --ref "<refSlug>"`
- **Input Arguments**:
  - `brandName`: `string` (min length 2)
  - `refSlug`: `string` (default: `'storeyarchitecture-co-uk'`)
  - `niche`: `string` (optional)
  - `toneOfVoice`: `string` (optional)
  - `whatsapp`: `string` (optional)
- **Output Structure**:
  ```json
  {
    "status": "success",
    "clientSlug": "nova-marca",
    "clientDir": "c:\\Users\\wd\\Documents\\playwright-scraper\\clientes\\nova-marca",
    "previewUrl": "http://127.0.0.1:4000/clientes/nova-marca/site/index.html",
    "message": "Projeto de cliente criado com sucesso..."
  }
  ```
- **Artifacts Generated on Disk**:
  - `clientes/{slug}/brand-spec.json`
  - `clientes/{slug}/package.json`
  - `clientes/{slug}/site/index.html` (copied from reference skeleton)
  - `clientes/{slug}/site/assets/` (essential static assets copied)

### 2.2 `transmute_client_site`
- **MCP Tool Name**: `transmute_client_site`
- **Status**: [observed] Implemented in `src/mcp/tools/client-tools.js`.
- **Primary Backing File**: `c:\Users\wd\Documents\playwright-scraper\src\pipeline\transmuter.js`
- **Module System**: CommonJS (`module.exports = { createCompositionSpec, runDeterministicTransmutation, transmuteClient, computeHash }`)
- **Exported Functions**:
  - `transmuteClient(clientSlug)`
  - `runDeterministicTransmutation({ skeletonPath, compositionSpec, outputPath, clientDir })`
- **CLI Invocation**:
  - `npm run transmute -- --client <client-slug>`
  - `node src/pipeline/transmuter.js --client <client-slug>`
- **Input Arguments**:
  - `clientSlug`: `string`
  - `enforceAntiSlop`: `boolean` (default: `true`)
  - `injectSeo`: `boolean` (default: `true`)
- **Output Structure**:
  ```json
  {
    "status": "success",
    "clientSlug": "negocia-bem",
    "outputPath": "c:\\Users\\wd\\Documents\\playwright-scraper\\clientes\\negocia-bem\\site\\index.html",
    "outputHash": "sha256-hex-hash",
    "replacedSlotsCount": 18,
    "antiSlopVerified": true,
    "message": "Transmutação determinística concluída..."
  }
  ```

### 2.3 `compile_dualstack`
- **MCP Tool Name**: `compile_dualstack`
- **Status**: [observed] Implemented in `src/mcp/tools/client-tools.js`.
- **Primary Backing Files**:
  - `c:\Users\wd\Documents\playwright-scraper\src\compiler\edge-static-compiler.js` (CJS)
  - `c:\Users\wd\Documents\playwright-scraper\src\compiler\nextjs-rsc-compiler.js` (CJS)
  - `c:\Users\wd\Documents\playwright-scraper\src\compiler\kinetic-grammar-schema.js` (CJS)
- **Module System**: CommonJS
- **Exported Classes**:
  - `EdgeStaticCompiler.compile(spec, options)`
  - `NextJsRscCompiler.compile(spec, options)`
- **Input Arguments**:
  - `clientSlug`: `string`
  - `target`: `'static' | 'nextjs-rsc'` (default: `'static'`)
- **Output Structure**:
  ```json
  {
    "status": "success",
    "target": "static | nextjs-rsc",
    "clientSlug": "negocia-bem",
    "outDir": "c:\\Users\\wd\\Documents\\playwright-scraper\\clientes\\negocia-bem\\dist-static",
    "filesGenerated": ["index.html", "styles.css", "runtime/kinetic-micro.js", "assets/manifest.json"],
    "message": "Compilação concluída em..."
  }
  ```

### 2.4 `inject_content_slots`
- **MCP Tool Name**: `inject_content_slots`
- **Status**: [observed] Implemented in `src/mcp/tools/client-tools.js` and `src/mcp-server.js`.
- **Primary Backing File**: `c:\Users\wd\Documents\playwright-scraper\src\generators\slot-injector.js`
- **Module System**: CommonJS (`module.exports = { injectContentSlots }`)
- **Exported Function**: `injectContentSlots({ skeletonPath, contentSlotsPath, outputPath })`
- **CLI Invocation**: `npm run inject`
- **Input Arguments**:
  - `skeletonPath`: `string` (path to `skeleton.html`)
  - `contentSlotsPath`: `string` (path to `content-slots.json`)
  - `outputPath`: `string` (destination path for generated `index.html`)
- **Output Structure**:
  ```json
  {
    "status": "success",
    "replacedCount": 14,
    "outputPath": "c:\\Users\\wd\\Documents\\playwright-scraper\\clientes\\negocia-bem\\site\\index.html",
    "message": "Injeção de slots concluída com sucesso..."
  }
  ```

### 2.5 `patch_brand_spec`
- **MCP Tool Name**: `patch_brand_spec`
- **Status**: [observed] Implemented inline in `src/mcp/tools/client-tools.js`.
- **Module System**: CommonJS
- **Backing Mechanism**: Reads `clientes/{clientSlug}/brand-spec.json`, merges `updates` and `updatedAt`, writes back atomically.
- **Input Arguments**:
  - `clientSlug`: `string`
  - `updates`: `Record<string, any>` (e.g. `{ "primaryColor": "#055227", "headline": "Nova Chamada" }`)
- **Output Structure**:
  ```json
  {
    "status": "success",
    "clientSlug": "negocia-bem",
    "updatedKeys": ["primaryColor", "headline"],
    "specFile": "c:\\Users\\wd\\Documents\\playwright-scraper\\clientes\\negocia-bem\\brand-spec.json",
    "message": "brand-spec.json atualizado com sucesso..."
  }
  ```

---

## 3. Quality Assurance Modules

### 3.1 `run_unified_quality_gate`
- **MCP Tool Name**: `run_unified_quality_gate`
- **Status**: [observed] Core engine fully implemented in `src/qa/unified-quality-gate.js`; currently NOT registered in `src/mcp/tools/`.
- **Primary Backing File**: `c:\Users\wd\Documents\playwright-scraper\src\qa\unified-quality-gate.js`
- **Module System**: CommonJS (`module.exports = { UnifiedQualityGate, runImpeccableGate }`)
- **Exported Class & Methods**:
  - `UnifiedQualityGate.auditSite({ siteDir, clientSlug, refDir, originalBrandKeywords, headless, timeoutMs })`
  - `UnifiedQualityGate.auditClone({ page, siteUrl, expectedHeight, timeoutMs })`
- **CLI Invocation**:
  - `npm run audit:unified`
  - `node scripts/run-unified-gate.js [clientSlug]`
- **Sub-gates evaluated**:
  1. Console Gate (0 JS runtime errors, 0 unhandled rejections).
  2. Network Gate (0 failed 404/500 asset requests).
  3. Structural Gate (0 broken images with `naturalWidth === 0`, height check).
  4. Anti-Slop Gate (0 meta-language, 0 placeholders, 0 brand leaks).
  5. Impeccable Gate (0 Tier 4 visual anti-patterns).
- **Input Arguments**:
  - `clientSlug`: `string`
  - `timeoutMs`: `number` (default: 15000)
- **Output Structure**:
  ```json
  {
    "passed": true,
    "status": "verified",
    "clientSlug": "negocia-bem",
    "gates": {
      "console": { "passed": true, "errorsCount": 0, "errors": [] },
      "network": { "passed": true, "failedRequestsCount": 0, "failures": [] },
      "structural": { "passed": true, "brokenImagesCount": 0, "totalImages": 12 },
      "antiSlop": { "passed": true, "violations": [] }
    },
    "metrics": {
      "totalHeight": 4500,
      "sectionsCount": 8,
      "brokenImagesCount": 0,
      "jsErrorsCount": 0
    }
  }
  ```

### 3.2 `run_impeccable_gate`
- **MCP Tool Name**: `run_impeccable_gate`
- **Status**: [observed] Core engine fully implemented in `src/qa/impeccable-gate.js`; currently NOT registered in `src/mcp/tools/`.
- **Primary Backing Files**:
  - `c:\Users\wd\Documents\playwright-scraper\src\qa\impeccable-gate.js` (CJS)
  - `c:\Users\wd\Documents\playwright-scraper\scripts\detect-antipatterns-browser.js` (CJS)
  - `c:\Users\wd\Documents\playwright-scraper\scripts\detect-antipatterns.mjs` (ESM CLI wrapper)
- **Exported Function**: `runImpeccableGate(pageOrHtml, options = {})`
- **CLI Invocation**: `node scripts/detect-antipatterns.mjs <target-file-or-dir>`
- **Zero-Tolerance Anti-Patterns Checked**:
  - `dark-glow`: radioactive zero-offset chromatic halos
  - `nested-cards`: card container inside another card container
  - `overused-font`: AI monoculture fonts (Space Grotesk, Plus Jakarta Sans, etc.)
  - `bounce-easing`: overshoot bounce easing
- **Input Arguments**:
  - `clientSlug`: `string` (resolves to `clientes/{clientSlug}/site/index.html`)
- **Output Structure**:
  ```json
  {
    "passed": true,
    "violations": [],
    "summary": {
      "totalFindings": 0,
      "zeroToleranceViolations": 0,
      "breakdown": {},
      "findings": []
    }
  }
  ```

### 3.3 `run_box_diff_linter`
- **MCP Tool Name**: `run_box_diff_linter`
- **Status**: [observed] Implemented in `scripts/box-diff-linter.js`. Registered in `src/mcp-server.js` under the legacy name `run_quality_gate_audit`. Must be registered as `run_box_diff_linter`.
- **Primary Backing File**: `c:\Users\wd\Documents\playwright-scraper\scripts\box-diff-linter.js`
- **Module System**: CommonJS (`module.exports = { runBoxDiffLinter }`)
- **Exported Function**: `runBoxDiffLinter(siteSlug, port = 4009)`
- **CLI Invocation**:
  - `npm run audit`
  - `node scripts/box-diff-linter.js [siteSlug]`
- **Input Arguments**:
  - `siteSlug`: `string` (e.g. `negocia-bem` or `negociabem-imobiliaria`)
- **Output Structure**:
  ```json
  {
    "auditTimestamp": "2026-10-15T18:00:00.000Z",
    "siteSlug": "negocia-bem",
    "auditPassed": true,
    "jsErrors": [],
    "layoutBoxes": [...],
    "imagesSummary": {
      "total": 12,
      "valid": 12,
      "broken": []
    }
  }
  ```

### 3.4 `audit_visual_saliency`
- **MCP Tool Name**: `audit_visual_saliency`
- **Status**: [observed] Core engine fully implemented in `src/qa/visual-saliency-oracle.js`; currently NOT registered in `src/mcp/tools/`.
- **Primary Backing File**: `c:\Users\wd\Documents\playwright-scraper\src\qa\visual-saliency-oracle.js`
- **Module System**: CommonJS (`module.exports = { VisualSaliencyOracle, CTA_MIN_PROMINENCE, MAX_DISTRACTION_RATIO, CTA_MAX_ATTENTION_RANK, ... }`)
- **Exported Class**: `VisualSaliencyOracle`
- **Mathematical Thresholds**:
  - `Score_CTA >= 0.18` (Primary CTA captures >= 18% of early 500ms optical attention).
  - `DistractionRatio <= 0.35` (Non-functional background clutter / functional attention <= 0.35).
  - `CTA_Attention_Rank <= 2` (CTA is among the top 2 attention peaks in the viewport).
- **Input Arguments**:
  - `clientSlug`: `string`
- **Output Structure**:
  ```json
  {
    "passed": true,
    "scoreCta": 0.245,
    "distractionRatio": 0.112,
    "ctaAttentionRank": 1,
    "violations": [],
    "peaks": [...]
  }
  ```

---

## 4. Design Vault Modules & Assets

### 4.1 `query_design_vault`
- **MCP Tool Name**: `query_design_vault`
- **Status**: [observed] Backing assets and registries exist; tool currently NOT registered in `src/mcp/tools/`.
- **Primary Backing Assets & Modules**:
  1. Motion Physics: `c:\Users\wd\Documents\playwright-scraper\design-vault\01-motion-physics\easings.json`
     - Contains Awwwards Easing Matrix: `snappy`, `smooth`, `elastic`, `dramatic`.
  2. Typography: `c:\Users\wd\Documents\playwright-scraper\design-vault\04-typography\curated-pairings.json`
     - Contains curated font pairings: Swiss Editorial Minimalist, Kinetic Neo-Brutalist.
  3. UI/UX Effect & Component Registry: `c:\Users\wd\Documents\playwright-scraper\src\registry\effect-registry.js`
     - CommonJS singleton (`module.exports = defaultRegistry`).
     - Loads canonical component specs from `src/registry/effects/`: `morph-text.json`, `gooey-droplets.json`, `classic-slide.json`.
     - Methods: `getEffect(id)`, `listByCategory(category)`, `generateCompositeSvgDefs()`, `generateCompositeStyles()`.
  4. Vault Catalog Index: `c:\Users\wd\Documents\playwright-scraper\design-vault\INDEX.json`
     - Tiers: `evidence` (`copias/`), `patterns` (`design-vault/01-motion-physics/`, `04-typography/`, `02-3d-experiments/`), `templates` (`elyse-residence-dev-webflow-io`, `khanhnguyen-design`, `op-xy-76-aura-build`).
- **Input Arguments**:
  - `category`: `'all' | 'easings' | 'typography' | 'components'` (default: `'all'`)
- **Output Structure**:
  Returns formatted JSON containing the requested category data (or all categories consolidated).

### 4.2 Static MCP Resources
- `vault://easings` (name: `vault-easings`): Returns `design-vault/01-motion-physics/easings.json`.
- `vault://typography` (name: `vault-typography`): Returns `design-vault/04-typography/curated-pairings.json`.
- `vault://components` (name: `vault-components`): Serializes components and effects from `src/registry/effect-registry.js` and `design-vault/INDEX.json`.

### 4.3 Dynamic Resource Templates
- `client://{slug}/dna` (name: `client-dna`): Reads `clientes/{slug}/DNA.md` or `brand-spec.json`.
- `client://{slug}/slots` (name: `client-slots`): Reads `clientes/{slug}/content-slots.json`.
- `client://{slug}/audit` (name: `client-audit`): Reads `clientes/{slug}/linter-report.json` or `quality-gate-report.json`.
- `ref://{slug}/dna` (name: `ref-dna`): Reads `copias/{slug}/design-system/design_dna.json` or `design-tokens.json` or `status.json`.

### 4.4 Interactive Prompt Templates
- `new_client_onboarding`: Interactive prompt guiding the agent through reference selection, workspace scaffolding (`create_client_project`), slot configuration, transmutation, and quality audit.
- `fix_quality_gate_failure`: Interactive prompt guiding remediation when a quality gate fails (JS console error, broken image, anti-slop tell, or visual saliency deficiency).

---

## 5. Existing MCP Server Files & Architecture Gap Analysis

### 5.1 Existing Files
1. `src/mcp-server.js` (159 lines, CommonJS):
   - Initializes `McpServer({ name: 'studio-dna-engine', version: '2.0.0' })`.
   - Runs `StdioServerTransport` directly in the file.
   - Registers only 4 tools: `scrape_and_extract_dna`, `create_client_project`, `inject_content_slots`, `run_quality_gate_audit`.
   - Registers only 2 static resources: `vault-easings`, `vault-typography`.
   - Gaps: Monolithic structure; missing 8 tools; missing `vault-components`; missing all dynamic resource templates; missing prompts; does not delegate to `src/mcp/index.js`.
2. `src/mcp/schemas.js` (131 lines, CommonJS):
   - Fully developed security validators: `validateSlugSecurity`, `getSafeClientDir`, `getSafeRefDir`, `getSafeVaultDir`.
   - Fully developed Zod schemas for all 12 tools.
   - Ready for use by all tool and resource handlers.
3. `src/mcp/tools/scraping-tools.js` (92 lines, CommonJS):
   - Implements `registerScrapingTools(server)` with `scrape_and_extract_dna` and `inspect_reference`.
4. `src/mcp/tools/client-tools.js` (247 lines, CommonJS):
   - Implements `registerClientTools(server)` with `create_client_project`, `transmute_client_site`, `compile_dualstack`, `inject_content_slots`, `patch_brand_spec`.
5. `test/mcp-server.test.js` (117 lines, CommonJS):
   - Defines executable contract across 7 suites:
     - Suite 1: Path Traversal & Client Isolation Security Guard
     - Suite 2: Tool Registry Completeness (12 tools)
     - Suite 3: Resource & Template Registry Completeness (3 static, 4 templates)
     - Suite 4: Prompt Registry Completeness (2 prompts)
     - Suite 5: Static Resource Resolution (`vault://easings`)
     - Suite 6: Dynamic Resource Resolution (`client://{slug}/dna`)
     - Suite 7: Dynamic Resource Resolution with Traversal Rejection

### 5.2 Identified Gaps to Address
| Component | Missing Module / Location | Action Required |
|---|---|---|
| MCP Entry Point | `src/mcp/index.js` | Create factory function `createStudioDnaMcpServer()` registering all 12 tools, 3 static resources, 4 dynamic templates, and 2 prompts. |
| STDIO Runner | `src/mcp-server.js` | Refactor to import `createStudioDnaMcpServer` from `src/mcp/index.js`, maintaining 100% backward compatibility as CLI executable. |
| QA MCP Tools | `src/mcp/tools/qa-tools.js` | Create module registering `run_unified_quality_gate`, `run_impeccable_gate`, `run_box_diff_linter`, and `audit_visual_saliency`. |
| Vault MCP Tools | `src/mcp/tools/vault-tools.js` | Create module registering `query_design_vault`. |
| MCP Resources | `src/mcp/resources/index.js` | Create module registering static resources (`vault-easings`, `vault-typography`, `vault-components`) and dynamic templates (`client-dna`, `client-slots`, `client-audit`, `ref-dna`) using `ResourceTemplate`. |
| MCP Prompts | `src/mcp/prompts/index.js` | Create module registering `new_client_onboarding` and `fix_quality_gate_failure`. |

---

## 6. Synthesis & Conclusion

All required backing algorithms, compilers, quality gates, and assets already exist and are proven functional by existing automated test suites. The architecture required to complete the MCP implementation is strictly additive and modular: creating the missing MCP wrapper modules (`qa-tools.js`, `vault-tools.js`, `resources/index.js`, `prompts/index.js`, and `src/mcp/index.js`) and delegating from `src/mcp-server.js`.
