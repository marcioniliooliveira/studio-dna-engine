## 2026-10-15T18:47:00Z
You are the Project Orchestrator (orchestrator_3).
Your working directory is: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_3
The project root is: c:\Users\wd\Documents\playwright-scraper
Authoritative user request: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (read the latest entry from 2026-10-15T18:45:01Z).

Your objective:
Lead the end-to-end implementation and verification of the Model Context Protocol (MCP) server for Studio DNA Engine according to the user requirements in ORIGINAL_REQUEST.md:
1. Complete Modular Tool Surface in `src/mcp/tools/` registered onto the McpServer:
   - Ingestion: `scrape_and_extract_dna` and `inspect_reference`
   - Iteration & Production: `create_client_project`, `transmute_client_site`, `compile_dualstack`, `inject_content_slots`, `patch_brand_spec`
   - Quality Assurance: `run_unified_quality_gate`, `run_impeccable_gate`, `run_box_diff_linter`, `audit_visual_saliency`
   - Vault: `query_design_vault`
2. Contextual Resources and Guided Prompts:
   - Static resources in `src/mcp/resources/`: `vault://easings`, `vault://typography`, `vault://components`
   - Dynamic resource templates: `client://{slug}/dna`, `client://{slug}/slots`, `client://{slug}/audit`, `ref://{slug}/dna`
   - Interactive prompt templates in `src/mcp/prompts/`: `new_client_onboarding`, `fix_quality_gate_failure`
3. Strict ICM Isolation, Path Security & Backward Compatibility:
   - Enforce path-traversal prevention on all client and reference slugs via strict slug validation.
   - Enforce read-only guarantees on `copias/` (no tools may alter reference skeletons).
   - Maintain isolated workspaces per client under `clientes/{slug}/`.
   - Update `src/mcp-server.js` as canonical STDIO runner delegating to `src/mcp/index.js`, maintaining 100% backward compatibility.
4. Automated verification:
   - `node --test test/mcp-server.test.js` passes with 100% assertions covering tools, resources, templates, prompts, and traversal security.
   - Attempting to access paths outside `clientes/` or `copias/` via traversal fails with an explicit error.
   - Server initializes cleanly over `stdio` transport.
