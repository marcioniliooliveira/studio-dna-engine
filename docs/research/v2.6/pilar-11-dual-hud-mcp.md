# Pillar 11: Dual-Environment Live Tweaks, HUD Projector & Section MCP Server

**Document ID:** `DOC-RESEARCH-V26-PILAR-11`  
**System:** Studio DNA PRO v2.6 (`studio-dna-engine`)  
**Status:** Implementation-Grade Architectural Specification  
**Classification:** `[observed]` (codebase tests), `[documented]` (MCP SDK v1.30 & Node.js SQLite specifications), `[inferred]` (architectural derivations)

---

## 1. Executive Summary & Resolution of Limitations L2 and L9

In Studio DNA PRO v2.5, live tweaking and tool execution suffered from two major architectural deficits:
1. **Limitation L2 (`src/generators/hud-projector.js`):**
   The HUD projector hardcoded OP-XY specific DOM selectors (`#hero .wm h1`, `#strip .stack`, `#macro`) and fixed preset configurations (`swiss`, `tokyo`, `braun`) (`[observed]`). It also fabricated APCA contrast badges by calculating WCAG 2.1 ratios and multiplying by 10 (`[observed]` in line 1384).
2. **Limitation L9 (62 Throwaway Scripts):**
   Because there was no unified programmatic interface or state persistence mechanism, developers generated 62 ephemeral one-off scripts in `scripts/` to apply ad-hoc patches, test builds, and inspect state (`[observed]`).

Pillar 11 resolves **Limitations L2 and L9** by:
1. Enforcing **Byte-Exact Static Delivery** with SHA-256 ETag caching, serving unmodified production bundles.
2. Establishing a **Same-Origin Iframe Wrapper** with a real-time `__DNA_LIVE_BUS__` bridge.
3. Building a **Schema-Driven Agnostic HUD Projector** driven dynamically by `dna-ir.json` parameters.
4. Integrating **ACID State Management** via `node:sqlite` in Write-Ahead Logging (WAL) mode.
5. Providing a complete **Model Context Protocol (MCP) Server Surface** for capsule extraction, patching, mounting, and telemetry.

---

## 2. Byte-Exact Static Delivery & Iframe Wrapper Route

```
[ Developer / Designer Browser ]
               │
               ▼
   /__dna_hud_wrapper?client=<slug>
   ┌────────────────────────────────────────────────────────┐
   │ Outer Host Document: Agnostic HUD Projector            │
   │                                                        │
   │ ┌────────────────────────────────────────────────────┐ │
   │ │ <iframe id="dna-stage-frame"                       │ │
   │ │         src="/clientes/<slug>/site/index.html">    │ │
   │ │                                                    │ │
   │ │  [ Byte-Exact Static Site — Zero Injected Code ]   │ │
   │ │  [ window.__DNA_LIVE_BUS__ Active via Same-Origin] │ │
   │ └────────────────────────────────────────────────────┘ │
   └────────────────────────────────────────────────────────┘
```

### 2.1 Route 1: Byte-Exact Static Delivery (`/clientes/<slug>/site/*`)
- Serves the immutable client bundle directly from the filesystem.
- Generates SHA-256 ETags based on file content: `ETag: W/"<sha256-hex>"`.
- Evaluates `If-None-Match` request headers and returns `304 Not Modified` when content is unchanged.
- **Zero code mutation:** No scripts, HUD panels, or debug code are injected into production HTML files or bundles.

### 2.2 Route 2: Same-Origin Wrapper Route (`/__dna_hud_wrapper?client=<slug>`)
- Serves the outer glassmorphic HUD studio wrapper.
- Embeds the client site in a full-screen `<iframe>`.
- Because both the wrapper and the iframe originate from the same host, the wrapper accesses `iframe.contentWindow.__DNA_LIVE_BUS__` directly without serialization overhead or cross-origin restrictions.

### 2.3 `__DNA_LIVE_BUS__` Protocol Contract
```typescript
interface DnaLiveBusMessage {
  type: 'DNA_TWEAK_UPDATE' | 'DNA_TELEMETRY' | 'DNA_COMMIT_REQUEST' | 'DNA_COMMIT_ACK';
  timestamp: number;
  payload: {
    paramId?: string;
    adapter?: 'css' | 'dom' | 'webgl-uniform' | 'scroll-bridge';
    target?: string;
    property?: string;
    value?: any;
    revisionId?: number;
    hash?: string;
  };
}
```

---

## 3. Schema-Driven Agnostic HUD Projector

All hardcoded presets (`swiss`, `tokyo`, `braun`) and DOM selectors (`#hero .wm h1`) in `src/generators/hud-projector.js` are eliminated.

### 3.1 Dynamic Parameter Grouping
The projector consumes `dnaIr.parameters` and groups controls dynamically:
- `typography`: Font family, font size clamp, tracking, line height.
- `surface`: Background color, surface color, accent color with live APCA badges.
- `motion`: Transition style, spring stiffness $\omega_n$, damping ratio $\zeta$.
- `layout`: Padding, grid columns, container max-width.
- `shader`: Uniforms (`u_sheetP`, `u_hover`, `u_lightIntensity`, `u_speed`).

### 3.2 Four Control Adapters
1. **`css` Adapter:** Mutates CSS custom properties:
   `document.documentElement.style.setProperty(property, value);`
2. **`dom` Adapter:** Updates targeted kinetic slots:
   `document.querySelector(slotSelector).textContent = value;`
3. **`webgl-uniform` Adapter:** Updates the reactive uniform store of `<dna-capsule>`:
   `window.__WORK_STAGE__.uniformStore.setUniform(uniformName, parsedValue);`
4. **`scroll-bridge` Adapter:** Updates `UniversalScrollBus` multipliers:
   `window.__WORK_STAGE__.scrollBus.setMultiplier(key, Number(value));`

### 3.3 Live APCA Badge Component
Next to every color slider, the projector renders an APCA badge calculated in real-time using Pillar 10's APCA `0.0.98G-4g` equations:
```html
<div class="dna-apca-badge pass" title="APCA Lc 82.4 — Pass AA Body">
  <span class="apca-score">Lc 82</span>
  <span class="apca-label">AA Body</span>
</div>
```

---

## 4. ACID State Persistence via `node:sqlite` WAL

When changes are committed in the HUD or via MCP tools, they are written atomically to a SQLite database running in Write-Ahead Logging (WAL) mode.

### Complete SQLite Relational Schema:
```sql
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
PRAGMA synchronous = NORMAL;

CREATE TABLE IF NOT EXISTS dna_section_capsules (
  id TEXT PRIMARY KEY,
  client_slug TEXT NOT NULL,
  section_slug TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0.0',
  dna_ir TEXT NOT NULL,          -- JSON payload of dna-ir.json
  scoped_css TEXT NOT NULL,      -- Scoped CSS styles
  html_template TEXT NOT NULL,   -- HTML envelope
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dna_revisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_slug TEXT NOT NULL,
  section_id TEXT NOT NULL,
  parent_hash TEXT,
  current_hash TEXT NOT NULL,
  author TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(section_id) REFERENCES dna_section_capsules(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dna_param_deltas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  revision_id INTEGER NOT NULL,
  param_id TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT NOT NULL,
  adapter TEXT NOT NULL,
  FOREIGN KEY(revision_id) REFERENCES dna_revisions(id) ON DELETE CASCADE
);

-- Full-Text Search (FTS5) for fast capsule discovery in Design Vault
CREATE VIRTUAL TABLE IF NOT EXISTS dna_capsules_fts USING fts5(
  section_slug,
  title,
  capabilities,
  tokens,
  content='dna_section_capsules',
  content_rowid='rowid'
);
```

---

## 5. Model Context Protocol (MCP) Server Surface

The MCP server (`src/mcp/`) exposes capsule operations over the official `@modelcontextprotocol/sdk`.

### 5.1 Complete Zod Schemas for MCP Tools

```typescript
import { z } from 'zod';

export const ExtractSectionCapsuleSchema = z.object({
  refSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Slug of the reference skeleton in copias/'),
  sectionSelector: z.string().min(1).describe('CSS selector for section root (e.g. "#hero", "section.work")'),
  capsuleSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Target capsule slug in design-vault/capsules/')
});

export const ListClientSectionsSchema = z.object({
  clientSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Slug of client workspace in clientes/')
});

export const MountVaultCapsuleSchema = z.object({
  clientSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Target client slug'),
  capsuleSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Capsule slug from design-vault/capsules/'),
  insertAfterSectionId: z.string().optional().describe('Section ID after which capsule will be inserted')
});

export const PatchSectionDnaSchema = z.object({
  clientSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Target client slug'),
  sectionId: z.string().min(1).describe('Section identifier within client DNA'),
  patches: z.record(z.string(), z.any()).describe('Dictionary of parameter id -> new value'),
  author: z.string().default('agent').describe('Identifier of the agent or user making the edit'),
  commitMessage: z.string().min(1).describe('Audit reason for the mutation')
});

export const CompileSlugFontSchema = z.object({
  ttfPath: z.string().min(1).describe('Path to source .ttf file in project'),
  outputDir: z.string().min(1).describe('Destination directory for compiled Slug binary assets'),
  charSet: z.string().optional().describe('Character set to extract (defaults to standard ASCII + Latin-1)')
});

export const DiagnoseSectionTelemetrySchema = z.object({
  clientSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Target client slug'),
  durationMs: z.number().int().positive().default(2000).describe('Telemetry sampling duration in milliseconds')
});
```

### 5.2 Complete Zod Schemas for MCP Resources

```typescript
export const VaultCapsulesResourceUri = 'vault://capsules';
export const VaultCapsuleManifestPattern = 'vault://capsules/{slug}/manifest';
export const ClientSectionsResourcePattern = 'client://{slug}/sections';
export const ClientSectionDnaPattern = 'client://{slug}/sections/{sectionId}/dna';
```

---

## 6. Verification Strategy

1. **Static Delivery Integrity Test:** `test/v2.6/static-delivery.test.js` tests that static files return byte-for-byte identical content to disk files with correct SHA-256 ETags and `304 Not Modified` responses.
2. **MCP Tool Suite Test:** `test/mcp-server.test.js` executes all MCP tools against valid schemas and verifies database ACID commits and rollback on constraint failure.
3. **HUD Bus Verification:** Tests bidirectional postMessage message exchange between parent window and iframe.
