# Handoff Report: Test & Environment Architecture Survey (explorer_survey_3)

**Agent**: `explorer_survey_3` (Test & Environment Explorer)  
**Date**: 2026-10-15T18:59:00Z  
**Target Recipient**: Orchestrator (`5afa9d6e-6a30-4fd8-b856-892528932440`) and downstream builders  
**Status**: Task Complete (Hard Handoff)

---

## 1. Observation

- **`package.json`**:
  - `package.json:52`: `"type": "commonjs"`. The repository operates entirely in CommonJS mode.
  - `package.json:36`: `"engines": { "node": ">=20" }`. Active runtime is Node `v24.15.0`.
  - `package.json:54`: `"@modelcontextprotocol/sdk": "^1.30.0"`. Installed version is `1.30.0`.
  - `package.json:58`: `"zod": "^4.4.3"`.
  - `package.json:11-34`: All test scripts use Node's built-in test runner (`node --test`), e.g.:
    `"test:all": "node --test --test-concurrency=1 test/m1-cdp-decompiler.test.js test/m2-kinetic-trajectory.test.js test/m3-assets3d-pipeline.test.js test/m4-compiler-dualstack.test.js test/e2e/*.test.js"`
  - No `"test:mcp"` script is currently present in `package.json:11-34`.

- **`test/mcp-server.test.js`**:
  - Exists with 117 lines.
  - Running `node --test test/mcp-server.test.js` failed verbatim:
    ```
    Error: Cannot find module '../src/mcp/index'
    Require stack:
    - C:\Users\wd\Documents\playwright-scraper\test\mcp-server.test.js
      at Object.<anonymous> (C:\Users\wd\Documents\playwright-scraper\test\mcp-server.test.js:7:38)
    ✖ test\mcp-server.test.js (112.0203ms)
    ```
  - It contains 7 test suites:
    1. `MCP Suite 1: Path Traversal & Client Isolation Security Guard` (verifies `validateSlugSecurity`).
    2. `MCP Suite 2: Tool Registry Completeness (Full Surface)` (asserts 12 tools in `server._registeredTools`).
    3. `MCP Suite 3: Resource & Template Registry Completeness` (asserts 3 static resources in `server._registeredResources` and 4 templates in `server._registeredResourceTemplates`).
    4. `MCP Suite 4: Prompt Registry Completeness` (asserts 2 prompts in `server._registeredPrompts`).
    5. `MCP Suite 5: Static Resource Resolution (vault://easings)` (invokes readCallback).
    6. `MCP Suite 6: Dynamic Resource Resolution (client://{slug}/dna)` (invokes readCallback with `{ slug: 'negocia-bem' }`).
    7. `MCP Suite 7: Dynamic Resource Resolution with Traversal Rejection` (asserts reject with `/Invalid slug/`).

- **`@modelcontextprotocol/sdk` CJS / ESM Dual Export**:
  - `node_modules/@modelcontextprotocol/sdk/package.json:21-67`: Exports both CJS (`dist/cjs`) and ESM (`dist/esm`).
  - Tested live: `require('@modelcontextprotocol/sdk/server/mcp.js')`, `require('@modelcontextprotocol/sdk/client/index.js')`, `require('@modelcontextprotocol/sdk/server/stdio.js')`, `require('@modelcontextprotocol/sdk/client/stdio.js')`, and `require('@modelcontextprotocol/sdk/inMemory.js')` all load cleanly in CommonJS without flags.

- **SDK Internal Keying vs Test Expectation**:
  - In `node_modules/@modelcontextprotocol/sdk/dist/cjs/server/mcp.js:525`:
    `this._registeredResources[uri] = registeredResource;` (keyed by URI string, e.g. `'vault://easings'`).
  - In `test/mcp-server.test.js:57,78`:
    `registeredResources.includes('vault-easings')` and `server._registeredResources['vault-easings'].readCallback`.
  - In `node_modules/@modelcontextprotocol/sdk/dist/cjs/server/mcp.js:557`:
    `this._registeredResourceTemplates[name] = registeredResourceTemplate;` (keyed by name).
  - In `node_modules/@modelcontextprotocol/sdk/dist/cjs/server/mcp.js:631`:
    `this._registeredTools[name] = registeredTool;` (keyed by name).

- **Stdio Client-Server Live Verification**:
  - Executed `node -e` spawning a child process running `src/mcp-server.js` and connecting via `StdioClientTransport`. The client connected, listed tools (`scrape_and_extract_dna`, `create_client_project`, `inject_content_slots`, `run_quality_gate_audit`), received stderr logs safely without protocol corruption, and closed with exit code 0.

---

## 2. Logic Chain

1. **Test Runner Framework Selection**:
   - Observations show all repository test suites use `node:test` and `node:assert/strict` executed via `node --test`.
   - `test/mcp-server.test.js` is already authored using `node:test` and `assert`.
   - Therefore, no external runner like Jest or Vitest should be installed or configured; all test additions must follow `node:test`.

2. **Root Cause of Current Failure**:
   - `test/mcp-server.test.js:7` imports `../src/mcp/index`.
   - `src/mcp/index.js` does not exist on disk.
   - Therefore, the test suite failure is expected and purely due to `src/mcp/index.js` being pending implementation.

3. **Keying Alignment for Static Resources**:
   - The test checks `server._registeredResources['vault-easings']`.
   - The MCP SDK `server.resource('vault-easings', 'vault://easings', ...)` sets `_registeredResources['vault://easings']`.
   - Therefore, in `createStudioDnaMcpServer()`, when registering static resources, the implementation must alias `server._registeredResources[name] = registeredResource` so both SDK internal URI lookup and test property assertions succeed.

4. **Completeness Against Acceptance Criteria**:
   - The acceptance criteria require: tools, resources, templates, prompts, traversal security, and stdio clean boot.
   - The existing 7 suites cover tools, resources, templates, prompts, and slug traversal.
   - To make the suite 100% airtight against all criteria, adding Suite 8 (in-memory client end-to-end execution) and Suite 9 (stdio clean boot test via `StdioClientTransport`) will provide direct executable proof of the acceptance criteria.

---

## 3. Caveats

- **Zod Version Compatibility**: The installed `zod` is `^4.4.3`. The MCP SDK includes `zod-compat.js` which supports both Zod 3 and 4 shapes. All test commands executed cleanly, but schemas should use standard Zod primitive validators (`z.string()`, `z.number()`, `z.boolean()`, `z.enum()`, `z.record()`) without obscure experimental operators.
- **Top-Level Execution in `src/mcp-server.js`**:
  `src/mcp-server.js` currently invokes `run()` at top level. When refactored to delegate to `src/mcp/index.js`, it should guard execution with `if (require.main === module)` or remain strictly as the executable entrypoint while `src/mcp/index.js` acts as the library factory.

---

## 4. Conclusion

- The test environment is fully operational under Node.js built-in `node:test` on Node v24.15.0 in CommonJS format.
- `@modelcontextprotocol/sdk` v1.30.0 is installed, fully supports CJS `require`, and provides all required primitives (`McpServer`, `ResourceTemplate`, `StdioServerTransport`, `StdioClientTransport`, `InMemoryTransport`).
- `test/mcp-server.test.js` exists, is well-structured into 7 suites covering all 12 tools, 3 static resources, 4 dynamic templates, 2 prompts, and slug traversal protection. It is currently failing only because `src/mcp/index.js` is not yet implemented.
- An aliasing requirement was discovered: static resources must be accessible by both URI and name on `server._registeredResources`.
- Adding `"test:mcp": "node --test test/mcp-server.test.js"` to `package.json` and adding stdio/in-memory client suites to `test/mcp-server.test.js` will fully satisfy all acceptance criteria.

---

## 5. Verification Method

To independently verify the findings:
1. Verify package environment & dependencies:
   `node -e "console.log(process.version); require('@modelcontextprotocol/sdk/server/mcp.js'); console.log('OK');"`
2. Verify existing test failure due to missing `src/mcp/index.js`:
   `node --test test/mcp-server.test.js`
3. Inspect `test/mcp-server.test.js`:
   Check lines 1 to 117 to confirm the 7 suites and expected tool/resource/prompt lists.
4. Verify Stdio transport capability:
   `node -e "const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js'); console.log(typeof StdioClientTransport);"`
