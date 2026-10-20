# Technical Analysis: Test Environment, Package Setup & MCP SDK Architecture

**Explorer**: `explorer_survey_3` (Test & Environment Explorer)  
**Date**: 2026-10-15T18:58:30Z  
**Target Project**: `studio-dna-engine` (`c:\Users\wd\Documents\playwright-scraper`)  
**Context**: Investigation of testing infrastructure, package setup, MCP server/client SDK mechanics, and test suite requirements for the Studio DNA Engine Model Context Protocol implementation.

---

## 1. Package Configuration & Environment Setup

### 1.1 `package.json` Review & Findings

- **Module Format**: `"type": "commonjs"` (Line 52 in `package.json`).
  - The repository strictly operates as CommonJS (`require` and `module.exports`).
  - Node runtime version observed: **v24.15.0** (engines constraint: `"node": ">=20"`).
  - All project modules in `src/` and tests in `test/` use CommonJS syntax.

- **Dependencies**:
  - `"@modelcontextprotocol/sdk"`: `^1.30.0` (installed version `1.30.0` in `node_modules/@modelcontextprotocol/sdk`).
  - `"zod"`: `^4.4.3` (installed version in `node_modules/zod`).
  - `"playwright"`: `^1.41.0`.
  - `"cheerio"`: `^1.2.0`.
  - `"postcss"`: `^8.5.26`.

- **DevDependencies**:
  - `"@playwright/test"`: `^1.41.0`.

- **NPM Scripts**:
  - Root test script: `"test": "npm run test:all"`.
  - Test suites:
    - `"test:milestones": "node --test --test-concurrency=1 test/m1-cdp-decompiler.test.js test/m2-kinetic-trajectory.test.js test/m3-assets3d-pipeline.test.js test/m4-compiler-dualstack.test.js"`
    - `"test:stress": "node --test test/stress/adverse-hardware-stress.test.js"`
    - `"test:v2.5": "node --test test/m1-impeccable-sanitization.test.js test/m2-fsm-forms.test.js test/m3-spring-dynamics.test.js test/m4-gpu-saliency.test.js test/stress/adverse-hardware-stress.test.js"`
    - `"test:all": "node --test --test-concurrency=1 test/m1-cdp-decompiler.test.js test/m2-kinetic-trajectory.test.js test/m3-assets3d-pipeline.test.js test/m4-compiler-dualstack.test.js test/e2e/*.test.js"`
  - *Gap Identified*: There is currently no dedicated `"test:mcp"` script in `package.json`.
  - *Recommendation*: Add `"test:mcp": "node --test test/mcp-server.test.js"`.

### 1.2 @modelcontextprotocol/sdk Compatibility & Dual-Build Exports

Inspection of `node_modules/@modelcontextprotocol/sdk/package.json` confirms:
- SDK provides dual ESM (`dist/esm`) and CommonJS (`dist/cjs`) exports via:
  ```json
  "exports": {
    ".": {
      "types": "./dist/esm/index.d.ts",
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js"
    },
    "./client": {
      "require": "./dist/cjs/client/index.js"
    },
    "./server": {
      "require": "./dist/cjs/server/index.js"
    },
    "./*": {
      "require": "./dist/cjs/*"
    }
  }
  ```
- CommonJS imports work directly:
  - `const { McpServer, ResourceTemplate } = require('@modelcontextprotocol/sdk/server/mcp.js');`
  - `const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');`
  - `const { Client } = require('@modelcontextprotocol/sdk/client/index.js');`
  - `const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');`
  - `const { InMemoryTransport } = require('@modelcontextprotocol/sdk/inMemory.js');`
- Verification: Executed `node -e` test confirming all five imports resolve without warnings or errors under Node v24.15.0.

---

## 2. Test Architecture & `test/mcp-server.test.js` Deep Dive

### 2.1 Existing Test Structure in `test/`

All unit and integration tests across the repository use Node.js built-in test runner:
- `const test = require('node:test');`
- `const assert = require('node:assert/strict');`
- Execution command: `node --test [file.test.js]`.
- No external unit test runner (Jest/Mocha/Vitest) is used. Playwright is used for headless browser automation and layout auditing.

### 2.2 Status & Inspection of `test/mcp-server.test.js`

- **Existence**: File exists at `test/mcp-server.test.js` (117 lines).
- **Execution Test**: Executed `node --test test/mcp-server.test.js`.
  - **Result**: Fails with `Error: Cannot find module '../src/mcp/index'` (Line 7).
  - Cause: The test requires `const { createStudioDnaMcpServer } = require('../src/mcp/index');`, but `src/mcp/index.js` does not yet exist.

### 2.3 Detailed Assertion Map of `test/mcp-server.test.js`

| Suite | Description | Targets & Assertions |
|-------|-------------|----------------------|
| **Suite 1** | Path Traversal & Client Isolation Security Guard | Tests `validateSlugSecurity`: validates valid slugs (`negocia-bem`, `caso-01-healthtech`, `flashtech-caso-03-d2c`), asserts that traversal patterns (`../outside`, `..\outside`, `/etc/passwd`, `client/../../secret`, `invalid*slug!`) throw errors matching `/Invalid slug/`. |
| **Suite 2** | Tool Registry Completeness (Full Surface) | Asserts `server._registeredTools` contains 12 required tools: `scrape_and_extract_dna`, `inspect_reference`, `create_client_project`, `transmute_client_site`, `compile_dualstack`, `inject_content_slots`, `patch_brand_spec`, `run_unified_quality_gate`, `run_impeccable_gate`, `run_box_diff_linter`, `audit_visual_saliency`, `query_design_vault`. |
| **Suite 3** | Resource & Template Registry Completeness | Asserts `server._registeredResources` contains 3 static resources: `vault-easings`, `vault-typography`, `vault-components`. Asserts `server._registeredResourceTemplates` contains 4 dynamic templates: `client-dna`, `client-slots`, `client-audit`, `ref-dna`. |
| **Suite 4** | Prompt Registry Completeness | Asserts `server._registeredPrompts` contains 2 prompts: `new_client_onboarding`, `fix_quality_gate_failure`. |
| **Suite 5** | Static Resource Resolution (`vault://easings`) | Calls `server._registeredResources['vault-easings'].readCallback(new URL('vault://easings'))`. Asserts `res.contents[0].uri === 'vault://easings'` and contents are valid JSON. |
| **Suite 6** | Dynamic Resource Resolution (`client://{slug}/dna`) | Calls `server._registeredResourceTemplates['client-dna'].readCallback(new URL('client://negocia-bem/dna'), { slug: 'negocia-bem' })`. Asserts `res.contents[0].uri === 'client://negocia-bem/dna'` and text is non-empty. |
| **Suite 7** | Dynamic Resource Resolution with Traversal Rejection | Calls `server._registeredResourceTemplates['client-dna'].readCallback(new URL('client://../../secret/dna'), { slug: '../../secret' })`. Asserts rejects with `/Invalid slug/`. |

### 2.4 Critical SDK Internal Keying Discovery (Important for Implementation)

When inspecting `@modelcontextprotocol/sdk/dist/cjs/server/mcp.js`:
- For static resources, line 525:
  `this._registeredResources[uri] = registeredResource;` (keyed by URI string, e.g. `'vault://easings'`).
- For resource templates, line 557:
  `this._registeredResourceTemplates[name] = registeredResourceTemplate;` (keyed by name, e.g. `'client-dna'`).
- For tools, line 631:
  `this._registeredTools[name] = registeredTool;` (keyed by name).
- For prompts, line 595:
  `this._registeredPrompts[name] = registeredPrompt;` (keyed by name).

**Consequence for `test/mcp-server.test.js`**:
In Suite 3 and Suite 5, the test expects `Object.keys(server._registeredResources)` to include `'vault-easings'`, and accesses `server._registeredResources['vault-easings'].readCallback`.
If static resources are only registered under URI, `server._registeredResources['vault-easings']` would be `undefined`, causing Suite 3 and Suite 5 to fail.
**Solution**:
In `createStudioDnaMcpServer()`, when static resources are registered, ensure they are also mapped/aliased by their name key in `server._registeredResources[name] = res;`. This guarantees 100% compatibility with both SDK internal URI routing and test suite property checks.

---

## 3. MCP Server & Client Architecture

### 3.1 Server Instantiation (`McpServer`)

- `const { McpServer, ResourceTemplate } = require('@modelcontextprotocol/sdk/server/mcp.js');`
- Instance creation:
  ```javascript
  const server = new McpServer({
    name: 'studio-dna-engine',
    version: '2.0.0'
  });
  ```
- Registration patterns:
  - **Tools**: `server.tool(name, description, zodSchema, handler)` or `server.registerTool(...)`
  - **Static Resources**: `server.resource(name, uriString, readCallback)`
  - **Dynamic Templates**: `server.resource(name, new ResourceTemplate(templatePattern, { list: undefined }), readCallback)`
  - **Prompts**: `server.prompt(name, description, zodArgsSchema, callback)`

### 3.2 Transport Mechanics in Tests and Production

#### A. In-Memory Transport (`InMemoryTransport`)
- Ideal for fast, deterministic unit and integration tests.
- Pattern:
  ```javascript
  const { InMemoryTransport } = require('@modelcontextprotocol/sdk/inMemory.js');
  const { Client } = require('@modelcontextprotocol/sdk/client/index.js');

  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);

  const client = new Client({ name: 'test-client', version: '1.0.0' }, { capabilities: {} });
  await client.connect(clientTransport);

  // Invoke tools, resources, prompts via client
  const tools = await client.listTools();
  const res = await client.callTool({ name: 'create_client_project', arguments: { ... } });
  const doc = await client.readResource({ uri: 'client://negocia-bem/dna' });

  await client.close();
  await server.close();
  ```
- **Live Verification**: Verified and confirmed functional in Node v24.15.0.

#### B. Stdio Transport (`StdioServerTransport` & `StdioClientTransport`)
- Canonical execution mode for agent runtimes (Claude Desktop, Cursor, Gemini CLI, etc.).
- Server runs over stdio via `StdioServerTransport`:
  ```javascript
  const transport = new StdioServerTransport();
  await server.connect(transport);
  ```
- Test verification via `StdioClientTransport`:
  ```javascript
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [path.resolve(__dirname, '../src/mcp-server.js')]
  });
  const client = new Client({ name: 'test-client', version: '1.0.0' }, { capabilities: {} });
  await client.connect(transport);
  const tools = await client.listTools();
  await client.close();
  ```
- **Live Verification**: Executed live `StdioClientTransport` against `src/mcp-server.js`. The child process booted cleanly, served the tool listing over JSON-RPC, and closed with exit code 0.

### 3.3 Acceptance Criteria Alignment & Recommended Test Additions

To fulfill all requirements in `ORIGINAL_REQUEST.md`:
1. `node --test test/mcp-server.test.js` passes with 100% assertions covering:
   - 12 Tools registered and callable
   - 3 Static Resources registered and resolvable (`vault://easings`, `vault://typography`, `vault://components`)
   - 4 Dynamic Resource Templates registered and resolvable (`client://{slug}/dna`, `client://{slug}/slots`, `client://{slug}/audit`, `ref://{slug}/dna`)
   - 2 Prompts registered (`new_client_onboarding`, `fix_quality_gate_failure`)
   - Traversal protection rejects `../../` with explicit errors
2. Stdio clean boot:
   - Add **Suite 8**: End-to-End Client over `InMemoryTransport` verifying tool execution, resource reading, and prompt generation.
   - Add **Suite 9**: Stdio Clean Boot Test using `StdioClientTransport` spawning `src/mcp-server.js` to ensure the server starts cleanly without missing modules or unhandled exceptions.

---

## 4. Synthesis of Underlying Subsystem Interfaces

For tool implementation wiring by subsequent builder agents:
- `scrape_and_extract_dna` -> `const { runPipeline } = require('../../index')`
- `inspect_reference` -> `getSafeRefDir` from `src/mcp/schemas.js`
- `create_client_project` -> `const { createClientProject } = require('../../generators/client-factory')`
- `transmute_client_site` -> `const { transmuteClient } = require('../../pipeline/transmuter')`
- `compile_dualstack` -> `const { EdgeStaticCompiler } = require('../../compiler/edge-static-compiler')` & `const { NextJsRscCompiler } = require('../../compiler/nextjs-rsc-compiler')`
- `inject_content_slots` -> `const { injectContentSlots } = require('../../generators/slot-injector')`
- `patch_brand_spec` -> `getSafeClientDir` reading/updating `brand-spec.json`
- `run_unified_quality_gate` -> `const { UnifiedQualityGate } = require('../../src/qa/unified-quality-gate')`
- `run_impeccable_gate` -> `const { runImpeccableGate } = require('../../src/qa/impeccable-gate')`
- `run_box_diff_linter` -> `const { runBoxDiffLinter } = require('../../scripts/box-diff-linter')`
- `audit_visual_saliency` -> `const { VisualSaliencyOracle } = require('../../src/qa/visual-saliency-oracle')`
- `query_design_vault` -> `design-vault/INDEX.json`, `easings.json`, `curated-pairings.json`
