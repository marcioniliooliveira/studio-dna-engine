# Studio DNA Engine — MCP Server Specification Document

**Author:** Specification Miner (`spec_miner_survey_2`)  
**Date:** 2026-10-15  
**Target:** Studio DNA Engine MCP Server (`@modelcontextprotocol/sdk`)  
**Status:** Canonical Authoritative Specification  

---

## 1. Executive Summary & Scope

This specification defines the complete Model Context Protocol (MCP) server for the **Studio DNA Engine**, transitioning the architecture from a monolithic experimental script (`src/mcp-server.js`) into an extensible, modular architecture rooted at `src/mcp/index.js` while maintaining 100% backward compatibility for existing callers.

The server exposes:
1. **Modular Tool Surface**: 12 tools grouped across 4 core domains (Ingestion, Iteration & Production, Quality Assurance, and Design Vault).
2. **Contextual Resources & Dynamic Templates**: 3 static resources (`vault://...`) and 4 dynamic resource templates (`client://...`, `ref://...`).
3. **Interactive Guided Prompts**: 2 prompt templates (`new_client_onboarding` and `fix_quality_gate_failure`).
4. **Security & Isolation Constraints**: Deterministic slug sanitization (`validateSlugSecurity`), defense-in-depth path traversal prevention (`getSafeClientDir`, `getSafeRefDir`, `getSafeVaultDir`), strict read-only guarantees for `copias/`, and backward-compatible STDIO execution.

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Ingestion | `scrape_and_extract_dna` | Executes deep scraper pipeline on reference URL, saving assets, tokens, and sanitized skeleton to `copias/`. | `url` (string, URL), `mode` (enum: all, clone, dna, ui) | `{ status, url, masterFolder, evidenceStatus, message }` | Catches exceptions, returns `isError: true` with error message. | `src/mcp-server.js`, `src/mcp/schemas.js`, `index.js` |
| 2 | Ingestion | `inspect_reference` | Fast read-only inspection of reference folder in `copias/` without loading heavy HTML or video into memory. | `refSlug` (string) | `{ refSlug, refDir, hasIndexHtml, indexHtmlSizeBytes, assetsCount, metadataFiles }` | Throws on traversal; returns `isError: true` if reference not found. | `src/mcp/tools/scraping-tools.js`, `copias/` structure |
| 3 | Iteration & Production | `create_client_project` | ICM client workspace generator creating isolated `clientes/{clientSlug}/` from reference skeleton. | `brandName` (string), `refSlug` (string), `niche` (string?), `toneOfVoice` (string?), `whatsapp` (string?) | `{ status, clientSlug, clientDir, previewUrl, message }` | Throws on invalid slug; returns `isError: true` on copy/creation failure. | `src/generators/client-factory.js`, `src/mcp/tools/client-tools.js` |
| 4 | Iteration & Production | `transmute_client_site` | Canonical deterministic transmuter applying `brand-spec.json`, content slots, tokens, and anti-slop rules. | `clientSlug` (string), `enforceAntiSlop` (bool, default true), `injectSeo` (bool, default true) | `{ status, clientSlug, outputPath, outputHash, replacedSlotsCount, antiSlopVerified, message }` | Throws on traversal; returns `isError: true` if client folder missing or transmuter fails. | `src/pipeline/transmuter.js`, `src/mcp/tools/client-tools.js` |
| 5 | Iteration & Production | `compile_dualstack` | Compiles client site to either Edge Static distribution or Next.js 15 App Router RSC components. | `clientSlug` (string), `target` (enum: static, nextjs-rsc) | `{ status, target, clientSlug, outDir, filesGenerated, message }` | Throws on traversal; returns `isError: true` on compilation error. | `src/compiler/`, `src/mcp/tools/client-tools.js` |
| 6 | Iteration & Production | `inject_content_slots` | Mechanical, zero-token text replacement engine merging skeleton HTML and `content-slots.json`. | `skeletonPath` (string), `contentSlotsPath` (string), `outputPath` (string) | `{ status, replacedCount, outputPath, message }` | Returns `isError: true` on missing file or invalid JSON. | `src/generators/slot-injector.js`, `src/mcp/schemas.js` |
| 7 | Iteration & Production | `patch_brand_spec` | Non-destructive incremental update to `clientes/{clientSlug}/brand-spec.json` with timestamp tracking. | `clientSlug` (string), `updates` (record/object) | `{ status, clientSlug, updatedKeys, specFile, message }` | Throws on traversal; returns `isError: true` if `brand-spec.json` does not exist. | `src/mcp/tools/client-tools.js`, `clientes/` |
| 8 | Quality Assurance | `run_unified_quality_gate` | Full headless Playwright audit: Console (0 errors), Network (0 404s), Structural (0 broken imgs), Anti-Slop (0 residual marks). | `clientSlug` (string), `timeoutMs` (number, default 15000) | `{ status, passed, clientSlug, gates, summary }` | Throws on traversal; returns `isError: true` if site directory or `index.html` missing. | `src/qa/unified-quality-gate.js`, `test/unified-quality-gate.test.js` |
| 9 | Quality Assurance | `run_impeccable_gate` | Tier 4 visual anti-pattern linter enforcing 0 tolerance on dark-glow, nested-cards, overused-font, and bounce-easing. | `clientSlug` (string) | `{ status, passed, clientSlug, violations, summary }` | Throws on traversal; returns `isError: true` if HTML missing. | `src/qa/impeccable-gate.js`, `scripts/detect-antipatterns-browser.js` |
| 10 | Quality Assurance | `run_box_diff_linter` | Ephemeral server headless box-diffing linter asserting AABB collision, overflow bleeding, and runtime health. | `siteSlug` (string) | `{ status, siteSlug, passed, errors, metrics }` | Returns `{ isError: true, error: ... }` if directory not found. | `scripts/box-diff-linter.js`, `src/mcp-server.js` |
| 11 | Quality Assurance | `audit_visual_saliency` | Pre-attentive 500ms ocular fixation oracle: evaluates luminance, color opponency, CTA prominence (>=18%), and distraction ratio (<=0.35). | `clientSlug` (string) | `{ status, clientSlug, passed, scoreCta, distractionRatio, ctaAttentionRank, violations, summary }` | Throws on traversal; returns `isError: true` if layout/client missing. | `src/qa/visual-saliency-oracle.js`, `test/m4-gpu-saliency.test.js` |
| 12 | Vault | `query_design_vault` | Ingests and queries curated design intelligence: motion easings, typography pairings, UI components, and templates. | `category` (enum: all, easings, typography, components) | `{ category, items, totalCount }` | Catches invalid category via Zod; safe fallbacks on missing sub-files. | `design-vault/INDEX.json`, `src/registry/effect-registry.js` |
| 13 | Static Resource | `vault://easings` | Mathematical Bezier acceleration curve matrix for GSAP, CSS, and Lenis smooth scrolling. | URI: `vault://easings` | JSON payload of easing curves with CSS and GSAP definitions. | Returns empty object `{}` if file missing. | `design-vault/01-motion-physics/easings.json`, `src/mcp-server.js` |
| 14 | Static Resource | `vault://typography` | Curated editorial typography pairings with fluid clamp scales, line heights, and letter spacing. | URI: `vault://typography` | JSON payload of font pairings with clamp calculations. | Returns empty object `{}` if file missing. | `design-vault/04-typography/curated-pairings.json`, `src/mcp-server.js` |
| 15 | Static Resource | `vault://components` | Pre-registered declarative UI effects, shaders, SVG filters, and template catalogues. | URI: `vault://components` | JSON payload combining registry effects and vault templates. | Returns empty list if registry/vault missing. | `src/registry/effects/`, `design-vault/INDEX.json` |
| 16 | Dynamic Resource | `client://{slug}/dna` | Exposes client DNA Lock rules (`DNA.md`) or brand identity specification. | URI template with `{slug}` | Markdown text (`DNA.md`) or JSON string (`brand-spec.json`). | Throws `/Invalid slug/` on traversal attempt. | `clientes/{slug}/DNA.md`, `test/mcp-server.test.js` |
| 17 | Dynamic Resource | `client://{slug}/slots` | Exposes client's mechanical text mapping dictionary (`content-slots.json`). | URI template with `{slug}` | JSON string of slot key-value pairs. | Throws `/Invalid slug/` on traversal attempt. | `clientes/{slug}/content-slots.json`, `test/mcp-server.test.js` |
| 18 | Dynamic Resource | `client://{slug}/audit` | Exposes client's latest Quality Gate / linter audit report. | URI template with `{slug}` | JSON string of QA verification status and gate metrics. | Throws `/Invalid slug/` on traversal attempt; default unverified status if missing. | `clientes/{slug}/linter-report.json`, `test/mcp-server.test.js` |
| 19 | Dynamic Resource | `ref://{slug}/dna` | Exposes extracted design DNA, tokens, and fonts from immutable reference skeleton in `copias/`. | URI template with `{slug}` | JSON string of design tokens and structure. | Throws `/Invalid slug/` on traversal; strict read-only guarantee. | `copias/{slug}/design-system/design_dna.json` |
| 20 | Interactive Prompt | `new_client_onboarding` | Interactive guided workflow for onboarding a new client project using ICM pipeline. | `brandName`, `refSlug`, `niche`, `toneOfVoice`, `whatsapp` | Array of system and user messages directing agent execution. | Missing required `brandName` rejected by Zod schema. | `ORIGINAL_REQUEST.md`, `test/mcp-server.test.js` |
| 21 | Interactive Prompt | `fix_quality_gate_failure` | Interactive guided workflow to diagnose and surgically fix quality gate audit failures. | `clientSlug`, `gateFailed`, `failureDetails` | Array of system and user messages with specific triage instructions. | Missing required `clientSlug` rejected by Zod schema. | `ORIGINAL_REQUEST.md`, `test/mcp-server.test.js` |
| 22 | Security / Core | `validateSlugSecurity` | Slug sanitizer regex preventing path traversal and malformed directory names. | `slug` (string) | Clean sanitized slug string. | Throws `/Invalid slug/` on `..`, `/`, `\`, uppercase, whitespace, or special characters. | `src/mcp/schemas.js`, `test/mcp-server.test.js` |
| 23 | Security / Core | `getSafeClientDir` | Resolves and validates absolute client workspace path under `clientes/`. | `slug` (string) | Absolute filesystem path inside `clientes/`. | Throws `/Invalid slug/` or `/Path traversal violation/`. | `src/mcp/schemas.js` |
| 24 | Security / Core | `getSafeRefDir` | Resolves and validates absolute reference path under `copias/`. | `slug` (string) | Absolute filesystem path inside `copias/`. | Throws `/Invalid slug/` or `/Path traversal violation/`. | `src/mcp/schemas.js` |
| 25 | Security / Core | `getSafeVaultDir` | Resolves and validates absolute path under `design-vault/`. | `subpath` (string) | Absolute filesystem path inside `design-vault/`. | Throws `/Path traversal violation/`. | `src/mcp/schemas.js` |

---

## 3. Edge Cases & Empirical Observations

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | `validateSlugSecurity` | `'negocia-bem'` | **PASS**: Returns `'negocia-bem'`. |
| 2 | `validateSlugSecurity` | `'caso-01-healthtech'` | **PASS**: Returns `'caso-01-healthtech'`. |
| 3 | `validateSlugSecurity` | `'flashtech-caso-03-d2c'` | **PASS**: Returns `'flashtech-caso-03-d2c'`. |
| 4 | `validateSlugSecurity` | `'../outside'` | **FAIL (Expected)**: Throws `Invalid slug "../outside": must be lowercase alphanumeric with hyphens, with no path traversal characters`. |
| 5 | `validateSlugSecurity` | `'..\\outside'` | **FAIL (Expected)**: Throws `Invalid slug "..\\outside": must be lowercase alphanumeric with hyphens, with no path traversal characters`. |
| 6 | `validateSlugSecurity` | `'/etc/passwd'` | **FAIL (Expected)**: Throws `Invalid slug "/etc/passwd": must be lowercase alphanumeric with hyphens, with no path traversal characters`. |
| 7 | `validateSlugSecurity` | `'client/../../secret'` | **FAIL (Expected)**: Throws `Invalid slug "client/../../secret": must be lowercase alphanumeric with hyphens, with no path traversal characters`. |
| 8 | `validateSlugSecurity` | `'invalid*slug!'` | **FAIL (Expected)**: Throws `Invalid slug "invalid*slug!": must be lowercase alphanumeric with hyphens, with no path traversal characters`. |
| 9 | `validateSlugSecurity` | `''` (empty string) | **FAIL (Expected)**: Throws `Invalid slug "": must be lowercase alphanumeric with hyphens, with no path traversal characters`. |
| 10 | `validateSlugSecurity` | `null` / `undefined` | **FAIL (Expected)**: Throws `Invalid slug: must be a string`. |
| 11 | `validateSlugSecurity` | `'UPPERCASE-SLUG'` | **FAIL (Expected)**: Throws `Invalid slug "UPPERCASE-SLUG": must be lowercase alphanumeric with hyphens, with no path traversal characters`. |
| 12 | `validateSlugSecurity` | `'slug_with_underscore'` | **FAIL (Expected)**: Throws `Invalid slug "slug_with_underscore": must be lowercase alphanumeric with hyphens, with no path traversal characters`. |
| 13 | `validateSlugSecurity` | `'slug--double--hyphen'` | **FAIL (Expected)**: Throws `Invalid slug "slug--double--hyphen": must be lowercase alphanumeric with hyphens, with no path traversal characters`. |
| 14 | `getSafeClientDir` | `'negocia-bem'` | **PASS**: Resolves to `C:\Users\wd\Documents\playwright-scraper\clientes\negocia-bem`. |
| 15 | `getSafeRefDir` | `'storeyarchitecture-co-uk'` | **PASS**: Resolves to `C:\Users\wd\Documents\playwright-scraper\copias\storeyarchitecture-co-uk`. |
| 16 | `getSafeClientDir` | `'../../etc'` | **FAIL (Expected)**: Rejection triggered by `validateSlugSecurity` before filesystem access. |
| 17 | `getSafeRefDir` | `'../../outside'` | **FAIL (Expected)**: Rejection triggered by `validateSlugSecurity` before filesystem access. |
| 18 | `ResourceTemplate` registration | `client://{slug}/dna` | Registers as `server._registeredResourceTemplates['client-dna']`. Read callback receives `(url, { slug })`. |
| 19 | Static Resource registration | `'vault-easings'`, `'vault://easings'` | Key in `server._registeredResources` depends on registration signature. Calling `s.resource('vault-easings', 'vault-easings', ...)` sets key `'vault-easings'` as asserted in `test/mcp-server.test.js`. |
| 20 | Prompt registration | `'new_client_onboarding'` | Registers in `server._registeredPrompts['new_client_onboarding']`. Args validated with Zod before callback execution. |

---

## 4. Deep Specification: Modular Tool Surface

The MCP server must expose exactly 12 tools registered onto `McpServer`. Each tool must adhere to typed input schemas and return predictable structured content.

### 4.1 Ingestion Tools (`src/mcp/tools/scraping-tools.js`)

#### 1. `scrape_and_extract_dna`
- **Name**: `scrape_and_extract_dna`
- **Category**: Ingestion
- **Purpose**: Runs the Playwright Deep Scraper pipeline against a reference site URL, capturing DOM, assets, and design tokens into `copias/`.
- **Input Schema**:
  ```javascript
  {
    url: z.string().url().describe('URL do site de referência a ser dissecado'),
    mode: z.enum(['all', 'clone', 'dna', 'ui']).default('all').describe('Modo de extração')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"url\": \"https://...\",\n  \"masterFolder\": \"copias/...\",\n  \"evidenceStatus\": \"...\",\n  \"message\": \"...\"\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Catches runtime errors (CDP failure, timeout, invalid URL).
  - Returns `{ isError: true, content: [{ type: 'text', text: '❌ Falha na extração de scraping: ...' }] }`.

#### 2. `inspect_reference`
- **Name**: `inspect_reference`
- **Category**: Ingestion
- **Purpose**: Fast metadata and asset audit of reference directory in `copias/{refSlug}` without loading heavyweight HTML.
- **Input Schema**:
  ```javascript
  {
    refSlug: z.string().describe('Slug da referência em copias/ (ex: likova-space, azimuteresidencial-com-br)')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"refSlug\": \"storeyarchitecture-co-uk\",\n  \"refDir\": \"...\",\n  \"hasIndexHtml\": true,\n  \"indexHtmlSizeBytes\": 54320,\n  \"assetsCount\": 18,\n  \"metadataFiles\": [\"MASTER_SPEC.md\", \"SITE_TYPE.json\"]\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Rejects traversal attempts via `validateSlugSecurity(refSlug)`.
  - Returns `isError: true` if reference directory does not exist.

---

### 4.2 Iteration & Production Tools (`src/mcp/tools/client-tools.js`)

#### 3. `create_client_project`
- **Name**: `create_client_project`
- **Category**: Iteration & Production
- **Purpose**: ICM client workspace factory initializing `clientes/{clientSlug}/` from reference skeleton.
- **Input Schema**:
  ```javascript
  {
    brandName: z.string().min(2).describe('Nome da marca do cliente (Ex: Negocia Bem Imobiliária)'),
    refSlug: z.string().default('storeyarchitecture-co-uk').describe('Nome da referência no acervo'),
    niche: z.string().optional().describe('Nicho de mercado do cliente'),
    toneOfVoice: z.string().optional().describe('Tom de voz do design e copy'),
    whatsapp: z.string().optional().describe('Número de WhatsApp para conversão')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"clientSlug\": \"negocia-bem\",\n  \"clientDir\": \"clientes/negocia-bem\",\n  \"previewUrl\": \"http://127.0.0.1:4000/clientes/negocia-bem/site/index.html\",\n  \"message\": \"...\"\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Traversal in `refSlug` rejected by `validateSlugSecurity`.
  - Returns `isError: true` on filesystem or copy failures.

#### 4. `transmute_client_site`
- **Name**: `transmute_client_site`
- **Category**: Iteration & Production
- **Purpose**: Deterministic transmutation engine applying `brand-spec.json`, content slots, tokens, and anti-slop rules.
- **Input Schema**:
  ```javascript
  {
    clientSlug: z.string().describe('Slug do cliente em clientes/ (ex: negocia-bem, jumpflex-home-evolution)'),
    enforceAntiSlop: z.boolean().default(true).describe('Garante 0% de placeholders e metalinguagem no HTML gerado'),
    injectSeo: z.boolean().default(true).describe('Injeta meta tags, OpenGraph e JSON-LD Schema canônico')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"clientSlug\": \"negocia-bem\",\n  \"outputPath\": \".../index.html\",\n  \"outputHash\": \"a3f5...\",\n  \"replacedSlotsCount\": 42,\n  \"antiSlopVerified\": true,\n  \"message\": \"...\"\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Traversal check failure throws `Invalid slug`.
  - Returns `isError: true` if client workspace does not exist.

#### 5. `compile_dualstack`
- **Name**: `compile_dualstack`
- **Category**: Iteration & Production
- **Purpose**: Dual-Stack compilation to Edge Static or Next.js 15 App Router RSC.
- **Input Schema**:
  ```javascript
  {
    clientSlug: z.string().describe('Slug do cliente em clientes/'),
    target: z.enum(['static', 'nextjs-rsc']).default('static').describe('Alvo de compilação: static (HTML5/CSS scoped) ou nextjs-rsc (App Router)')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"target\": \"static\",\n  \"clientSlug\": \"negocia-bem\",\n  \"outDir\": \".../dist-static\",\n  \"filesGenerated\": [\"index.html\", \"styles.css\"],\n  \"message\": \"...\"\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Returns `isError: true` on compiler errors or missing spec.

#### 6. `inject_content_slots`
- **Name**: `inject_content_slots`
- **Category**: Iteration & Production
- **Purpose**: Deterministic mechanical slot injection without breaking layout syntax.
- **Input Schema**:
  ```javascript
  {
    skeletonPath: z.string().describe('Caminho do arquivo skeleton.html'),
    contentSlotsPath: z.string().describe('Caminho do arquivo content-slots.json'),
    outputPath: z.string().describe('Caminho de destino do index.html gerado')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"replacedCount\": 35,\n  \"outputPath\": \".../index.html\",\n  \"message\": \"...\"\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Returns `isError: true` if skeleton or slots file does not exist.

#### 7. `patch_brand_spec`
- **Name**: `patch_brand_spec`
- **Category**: Iteration & Production
- **Purpose**: Safe non-destructive patch to `brand-spec.json`.
- **Input Schema**:
  ```javascript
  {
    clientSlug: z.string().describe('Slug do cliente em clientes/'),
    updates: z.record(z.string(), z.any()).describe('Objeto de atualizações para mesclar no brand-spec.json')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"clientSlug\": \"negocia-bem\",\n  \"updatedKeys\": [\"primaryColor\", \"headline\"],\n  \"specFile\": \".../brand-spec.json\",\n  \"message\": \"...\"\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Returns `isError: true` if `brand-spec.json` not found.

---

### 4.3 Quality Assurance Tools (`src/mcp/tools/qa-tools.js`)

#### 8. `run_unified_quality_gate`
- **Name**: `run_unified_quality_gate`
- **Category**: Quality Assurance
- **Purpose**: Multi-stage headless Playwright audit: Console (0 errors), Network (0 failed requests), Structural (0 broken images), Anti-Slop (0 residual marks), Scroll Dynamics.
- **Input Schema**:
  ```javascript
  {
    clientSlug: z.string().describe('Slug do cliente ou da referência a ser auditada'),
    timeoutMs: z.number().default(15000).describe('Timeout máximo da auditoria em milissegundos')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"passed\": true,\n  \"clientSlug\": \"negocia-bem\",\n  \"gates\": {\n    \"console\": { \"passed\": true, \"errorsCount\": 0 },\n    \"network\": { \"passed\": true, \"failedRequestsCount\": 0 },\n    \"structural\": { \"passed\": true, \"brokenImagesCount\": 0 },\n    \"antiSlop\": { \"passed\": true, \"violations\": [] },\n    \"scrollDynamics\": { \"passed\": true, \"overlapsCount\": 0 }\n  },\n  \"summary\": \"All quality gates passed.\"\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Returns `isError: true` if `index.html` not found or browser audit crashed.

#### 9. `run_impeccable_gate`
- **Name**: `run_impeccable_gate`
- **Category**: Quality Assurance
- **Purpose**: Visual anti-pattern linter enforcing zero-tolerance on dark-glow, nested-cards, overused-font, bounce-easing.
- **Input Schema**:
  ```javascript
  {
    clientSlug: z.string().describe('Slug do cliente cujo index.html será auditado contra anti-patterns visuais')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"passed\": true,\n  \"clientSlug\": \"negocia-bem\",\n  \"violations\": [],\n  \"summary\": {\n    \"totalFindings\": 0,\n    \"zeroToleranceViolations\": 0,\n    \"breakdown\": {}\n  }\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Traversal in slug rejected by `validateSlugSecurity`.
  - Missing HTML file returns `isError: true`.

#### 10. `run_box_diff_linter`
- **Name**: `run_box_diff_linter`
- **Category**: Quality Assurance
- **Purpose**: Geometric runtime box-diffing and AABB collision linter.
- **Input Schema**:
  ```javascript
  {
    siteSlug: z.string().describe('Nome da pasta do site (ex: negociabem-imobiliaria ou clientes/negocia-bem)')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"passed\": true,\n  \"siteSlug\": \"negocia-bem\",\n  \"errors\": []\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Directory not found returns `{ isError: true, content: [{ type: 'text', text: '...' }] }`.

#### 11. `audit_visual_saliency`
- **Name**: `audit_visual_saliency`
- **Category**: Quality Assurance
- **Purpose**: Pre-attentive optical attention oracle verifying CTA prominence (`Score_CTA >= 0.18`, top 2 rank) and distraction ratio (`DistractionRatio <= 0.35`).
- **Input Schema**:
  ```javascript
  {
    clientSlug: z.string().describe('Slug do cliente para análise ocular de saliência visual e contraste')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"status\": \"success\",\n  \"clientSlug\": \"negocia-bem\",\n  \"passed\": true,\n  \"scoreCta\": 0.224,\n  \"distractionRatio\": 0.082,\n  \"ctaAttentionRank\": 1,\n  \"violations\": [],\n  \"summary\": {\n    \"viewport\": { \"width\": 1440, \"height\": 900 },\n    \"ctaId\": \"cta\"\n  }\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Traversal in slug rejected.
  - Missing client or missing CTA definition returns `isError: true`.

---

### 4.4 Vault Tools (`src/mcp/tools/vault-tools.js`)

#### 12. `query_design_vault`
- **Name**: `query_design_vault`
- **Category**: Vault
- **Purpose**: Queries curated patterns, easings, typography pairings, components, and templates from the Design Vault.
- **Input Schema**:
  ```javascript
  {
    category: z.enum(['all', 'easings', 'typography', 'components']).default('all').describe('Categoria do Design Vault a consultar')
  }
  ```
- **Output Schema**:
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"category\": \"all\",\n  \"totalCount\": 12,\n  \"items\": { ... }\n}"
      }
    ]
  }
  ```
- **Error Handling**:
  - Catches invalid category via Zod enum validation.
  - Safely falls back if specific vault JSON is missing.

---

## 5. Deep Specification: Contextual Resources & Dynamic Templates

Resources allow agents to inspect state, tokens, and audits directly without running tools.

### 5.1 Static Resources (`src/mcp/resources/static-resources.js`)

```
Static Resource URI Scheme:
vault://easings     -> design-vault/01-motion-physics/easings.json
vault://typography  -> design-vault/04-typography/curated-pairings.json
vault://components  -> src/registry/effects/ + design-vault/INDEX.json
```

1. **`vault://easings`**
   - **Registered Name**: `vault-easings`
   - **URI**: `vault://easings`
   - **mimeType**: `application/json`
   - **Payload**: Contains bezier curves (`snappy`, `smooth`, `elastic`, `dramatic`) with CSS formulas, GSAP curves, and recommended durations.
2. **`vault://typography`**
   - **Registered Name**: `vault-typography`
   - **URI**: `vault://typography`
   - **mimeType**: `application/json`
   - **Payload**: Contains editorial typography pairings (Swiss Editorial Minimalist, Kinetic Neo-Brutalist) with fluid clamp formulas.
3. **`vault://components`**
   - **Registered Name**: `vault-components`
   - **URI**: `vault://components`
   - **mimeType**: `application/json`
   - **Payload**: Contains universal effects (`morph-text`, `gooey-droplets`, `classic-slide`) and certified templates from `design-vault/INDEX.json`.

### 5.2 Dynamic Resource Templates (`src/mcp/resources/dynamic-templates.js`)

```
Dynamic Resource URI Template Scheme:
client://{slug}/dna    -> clientes/{slug}/DNA.md (fallback: brand-spec.json)
client://{slug}/slots  -> clientes/{slug}/content-slots.json
client://{slug}/audit  -> clientes/{slug}/linter-report.json
ref://{slug}/dna       -> copias/{slug}/design-system/design_dna.json
```

1. **`client://{slug}/dna`**
   - **Registered Name**: `client-dna`
   - **URI Template**: `new ResourceTemplate('client://{slug}/dna', { list: undefined })`
   - **Parameter**: `slug` (validated via `validateSlugSecurity`)
   - **mimeType**: `text/markdown` (or `application/json`)
   - **Security**: Traversal attempt throws `/Invalid slug/`.
2. **`client://{slug}/slots`**
   - **Registered Name**: `client-slots`
   - **URI Template**: `new ResourceTemplate('client://{slug}/slots', { list: undefined })`
   - **Parameter**: `slug` (validated via `validateSlugSecurity`)
   - **mimeType**: `application/json`
   - **Payload**: Key-value slot dictionary.
3. **`client://{slug}/audit`**
   - **Registered Name**: `client-audit`
   - **URI Template**: `new ResourceTemplate('client://{slug}/audit', { list: undefined })`
   - **Parameter**: `slug` (validated via `validateSlugSecurity`)
   - **mimeType**: `application/json`
   - **Payload**: Latest quality gate audit report.
4. **`ref://{slug}/dna`**
   - **Registered Name**: `ref-dna`
   - **URI Template**: `new ResourceTemplate('ref://{slug}/dna', { list: undefined })`
   - **Parameter**: `slug` (validated via `validateSlugSecurity`)
   - **mimeType**: `application/json`
   - **Payload**: Extracted reference tokens, colors, and layout skeleton. Strict read-only guarantee.

---

## 6. Deep Specification: Interactive Prompt Templates

Prompts provide structured guidance for external agents to orchestrate the Studio DNA pipeline without trial-and-error.

### 6.1 `new_client_onboarding` (`src/mcp/prompts/onboarding.js`)
- **Name**: `new_client_onboarding`
- **Description**: Interactive guided workflow for creating a new client project with ICM isolation, selecting a reference archetype from Vault, defining brand spec, injecting content slots, and verifying layout integrity.
- **Arguments**:
  - `brandName`: `z.string().describe('Nome da marca do cliente')`
  - `refSlug`: `z.string().optional().default('storeyarchitecture-co-uk').describe('Slug da referência no acervo')`
  - `niche`: `z.string().optional().describe('Nicho de mercado')`
  - `toneOfVoice`: `z.string().optional().describe('Tom de voz do design')`
  - `whatsapp`: `z.string().optional().describe('WhatsApp de contato')`
- **Messages Structure**:
  - **Role: `user`**:
    ```
    Você é o Agente Especialista em Onboarding e Transmutação de Clientes do Studio DNA Engine.
    Objetivo: Criar e validar o projeto de produção para a marca "{{brandName}}".

    Siga a sequência determinística ICM:
    1. Executar a tool `create_client_project` com brandName="{{brandName}}" e refSlug="{{refSlug}}".
    2. Inspecionar o recurso `client://{{clientSlug}}/slots` para verificar os campos de copy necessários.
    3. Atualizar o `brand-spec.json` via `patch_brand_spec` com nicho="{{niche}}", tom="{{toneOfVoice}}" e whatsapp="{{whatsapp}}".
    4. Executar a tool `transmute_client_site` para aplicar a transmutação determinística.
    5. Executar `run_unified_quality_gate` e `run_impeccable_gate` para garantir 0 erros de runtime e 0 anti-padrões visuais.
    ```

### 6.2 `fix_quality_gate_failure` (`src/mcp/prompts/quality-fix.js`)
- **Name**: `fix_quality_gate_failure`
- **Description**: Interactive guided workflow to diagnose and surgically fix quality gate audit failures.
- **Arguments**:
  - `clientSlug`: `z.string().describe('Slug do cliente com falha de qualidade')`
  - `gateFailed`: `z.string().optional().describe('Nome do gate com falha (console, network, structural, antiSlop, impeccable, saliency)')`
  - `failureDetails`: `z.string().optional().describe('Detalhes ou mensagem de erro observada')`
- **Messages Structure**:
  - **Role: `user`**:
    ```
    Você é o Agente Especialista em Triagem e Correção Cirúrgica de Quality Gates do Studio DNA Engine.
    O cliente "{{clientSlug}}" apresentou falha no gate: "{{gateFailed}}".
    Detalhes fornecidos: {{failureDetails}}

    Protocolo de Reparo:
    1. Ler o relatório completo em `client://{{clientSlug}}/audit`.
    2. Se a falha for antiSlop: inspecionar `client://{{clientSlug}}/slots`, substituir resíduos ou metalinguagem e reexecutar `transmute_client_site`.
    3. Se a falha for impeccable: remover dark-glows radioativos, desinchar nested-cards e trocar fontes proibidas por pares de `vault://typography`.
    4. Se a falha for saliency: aumentar contraste do CTA principal e reduzir saturação de halos periféricos.
    5. Executar `run_unified_quality_gate` para validar a reparação com evidências frescas.
    ```

---

## 7. Deep Specification: Security & Isolation Constraints

### 7.1 Slug Validation Specification
- **Regex**: `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`
- **Invariants**:
  - Rejects directory traversal dots: `..`, `.`.
  - Rejects path separators: `/`, `\`.
  - Rejects uppercase characters (`A-Z`).
  - Rejects special characters, spaces, punctuation.
  - Rejects consecutive hyphens (`--`).
  - Rejects non-string types.

### 7.2 Safe Path Resolution Helpers
- `getSafeClientDir(slug)`:
  ```javascript
  const safeSlug = validateSlugSecurity(slug);
  const targetDir = path.resolve(ROOT_DIR, 'clientes', safeSlug);
  const expectedPrefix = path.resolve(ROOT_DIR, 'clientes');
  if (!targetDir.startsWith(expectedPrefix + path.sep)) {
    throw new Error(`Path traversal violation for client slug: ${slug}`);
  }
  return targetDir;
  ```
- `getSafeRefDir(slug)`:
  ```javascript
  const safeSlug = validateSlugSecurity(slug);
  const targetDir = path.resolve(ROOT_DIR, 'copias', safeSlug);
  const expectedPrefix = path.resolve(ROOT_DIR, 'copias');
  if (!targetDir.startsWith(expectedPrefix + path.sep)) {
    throw new Error(`Path traversal violation for ref slug: ${slug}`);
  }
  return targetDir;
  ```
- `getSafeVaultDir(subpath)`:
  ```javascript
  const targetDir = path.resolve(ROOT_DIR, 'design-vault', subpath);
  const expectedPrefix = path.resolve(ROOT_DIR, 'design-vault');
  if (!targetDir.startsWith(expectedPrefix)) {
    throw new Error(`Path traversal violation for vault path: ${subpath}`);
  }
  return targetDir;
  ```

### 7.3 Strict Read-Only Guarantee on `copias/`
- `copias/` stores immutable baseline scrapes.
- No MCP tool or dynamic resource handler is permitted to write, delete, edit, or copy into `copias/`.
- All writes are strictly constrained to `clientes/{clientSlug}/`.

### 7.4 Backward Compatibility Execution
- `src/mcp-server.js` acts as the STDIO executable delegating to `src/mcp/index.js`:
  ```javascript
  const { createStudioDnaMcpServer } = require('./mcp/index');
  const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');

  async function run() {
    const server = createStudioDnaMcpServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('🚀 [Studio DNA Engine] MCP Server rodando via STDIO...');
  }

  if (require.main === module) {
    run().catch(console.error);
  }

  module.exports = { createStudioDnaMcpServer };
  ```

---

## 8. Target Directory Blueprint for Builder Agent

```
src/
├── mcp-server.js                  # Canonical STDIO runner delegating to src/mcp/index.js
└── mcp/
    ├── index.js                   # Factory function createStudioDnaMcpServer() registering all 12 tools, 7 resources, 2 prompts
    ├── schemas.js                 # Zod validation schemas & safe path helpers
    ├── tools/
    │   ├── scraping-tools.js      # scrape_and_extract_dna, inspect_reference
    │   ├── client-tools.js        # create_client_project, transmute_client_site, compile_dualstack, inject_content_slots, patch_brand_spec
    │   ├── qa-tools.js            # run_unified_quality_gate, run_impeccable_gate, run_box_diff_linter, audit_visual_saliency
    │   └── vault-tools.js         # query_design_vault
    ├── resources/
    │   ├── static-resources.js    # vault-easings, vault-typography, vault-components
    │   └── dynamic-templates.js   # client-dna, client-slots, client-audit, ref-dna
    └── prompts/
        ├── onboarding.js          # new_client_onboarding
        └── quality-fix.js         # fix_quality_gate_failure
```

This completes the exhaustive specification survey for the Studio DNA Engine MCP Server.
