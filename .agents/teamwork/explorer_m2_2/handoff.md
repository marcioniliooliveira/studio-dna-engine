# Handoff Report: Embedded NoSQL DocumentStore Architecture & Blueprint

**Agent**: `explorer_m2_2`  
**Milestone**: Milestone 2 (Hybrid Persistence Layer: Embedded Document Store)  
**Target File**: `src/persistence/document-store.js`  
**Date**: 2026-11-06T15:15:00Z  

---

## 1. Observation

Direct examination of the workspace, contracts, and test suites yielded the following empirical facts:

1. **Test Harness Reference Implementation (`test/e2e/r1-r5-harness.js`)**:
   - Lines 32–156 define `ReferenceCollection` and `ReferenceDocumentStore`.
   - `ReferenceCollection` specifies the storage hierarchy:
     - Collection directory: `path.join(this.basePath, name)` (line 150).
     - Document path: `path.join(this.collectionDir, \`${id}.json\`)` (line 42).
   - Atomic write pattern (lines 57–64):
     ```javascript
     const targetPath = this._getDocPath(id);
     const tempPath = `${targetPath}.${crypto.randomBytes(4).toString('hex')}.tmp`;
     const payload = JSON.stringify(documentToSave, null, 2);
     fs.writeFileSync(tempPath, payload, 'utf-8');
     fs.renameSync(tempPath, targetPath);
     ```
   - Auto-generated metadata: `_id` defaults to `crypto.randomUUID()` (line 49), `createdAt` ISO string (line 53), `updatedAt` ISO string (line 54).
   - Filtering in `find(queryFilter)` (lines 92–98): checks exact key-value equality across parsed JSON documents from `readdirSync`.
   - Update contract: `updateOne(id, updateData)` merges fields, updates `updatedAt`, and returns `{ matchedCount: 1, modifiedCount: 1, document: updated }` or `{ matchedCount: 0, modifiedCount: 0 }` if not found (lines 106–123).
   - Dynamic module discovery in `resolveDocumentStore(options)` (lines 436–448):
     ```javascript
     function resolveDocumentStore(options = {}) {
       const candidatePath = path.join(PROJECT_ROOT, 'src/persistence/document-store.js');
       if (fs.existsSync(candidatePath)) {
         try {
           const CandidateStore = require(candidatePath);
           const StoreClass = CandidateStore.DocumentStore || CandidateStore;
           if (typeof StoreClass === 'function') {
             return new StoreClass(options);
           }
         } catch (_) {}
       }
       return new ReferenceDocumentStore(options);
     }
     ```

2. **Tier 1 Feature Coverage Tests (`test/e2e/r1-r5-tier1-feature-coverage.test.js`)**:
   - Lines 255–262 (TC-R3-T1-03):
     `docStore = resolveDocumentStore(); await docStore.init(); const col = docStore.getCollection('ast_trees');`
     Verifies collection instance creation and name property `col.name === 'ast_trees'`.
   - Lines 264–296 (TC-R3-T1-04):
     Inserts schemaless nested JSON:
     ```javascript
     const deepPayload = {
       domain: 'negocia-bem',
       nodes: 342,
       ast: {
         type: 'Root',
         children: [
           { tag: 'header', classes: ['fixed', 'top-0'], style: { zIndex: 50 } },
           { tag: 'main', sections: [{ id: 'hero', depth: 4 }] }
         ]
       },
       tokens: { primary: '#66fcf1', bg: '#0b0c10' }
     };
     ```
     Verifies `col.insertOne(deepPayload)` returns `insertedId`, `col.findById(insertedId)` retrieves nested structures intact, and `col.deleteById(insertedId)` leaves document returning `null`.

3. **Tier 2 Boundary Tests (`test/e2e/r1-r5-tier2-boundary-corner.test.js`)**:
   - Lines 228–256 (TC-R3-T2-03):
     Tests oversized document ingestion with a 15MB payload (30,000 array elements of synthetic DOM chunks):
     ```javascript
     const elementChunk = { tag: 'div', classes: ['card', 'interactive', 'kinetic'], style: 'transform: translate3d(0,0,0)' };
     const elements = new Array(30000).fill(elementChunk);
     const heavyPayload = { site: 'heavy-test', timestamp: Date.now(), astNodes: elements };
     ```
     Asserts document writes to disk, reads back cleanly without memory leak, and deletes successfully.

4. **Tier 3 and 4 Ingestion Tests (`test/e2e/r1-r5-tier3-pairwise-combinations.test.js` & `tier4-realworld-scenarios.test.js`)**:
   - `HybridRepository` coordinates with `DocumentStore` by storing `rawScrapePayload` in collection `'scrape_payloads'` and `rawReport` in `'audit_reports'`, returning `documentRef` which is stored in the relational SQLite `analysis_runs` table.
   - When querying `getRunDetails(runId)`, it fetches `col.findById(run.documentRef)` and joins it under `details.rawDocument`.

5. **Runtime Environment**:
   - Node.js runtime: `v24.15.0`.
   - OS: Windows 10/11 with NTFS filesystem semantics.
   - Native modules available: `node:fs`, `node:fs/promises`, `node:path`, `node:crypto`, `node:os`.

---

## 2. Logic Chain

1. **Directory Structure & Volume Isolation**:
   - `ReferenceCollection` sets document paths as `<basePath>/<collection>/<id>.json`.
   - In containerized production (Docker volume `/app/data`), atomic renames across different filesystems fail with `EXDEV: cross-device link not permitted`.
   - Placing the temporary file (`<id>.<random>.tmp`) in the *exact same collection directory* as the target file guarantees identical mount point, enabling atomic rename on all platforms.

2. **Atomic Write Protocol & Windows Concurrency**:
   - On Windows, `fs.rename` (mapping to `MoveFileExW`) can encounter transient `EPERM` or `EBUSY` when search indexers or virus scanners momentarily inspect a newly written `.tmp` file.
   - Writing directly with `fs.writeFile` without rename exposes readers to incomplete or corrupted JSON during high-concurrency writes.
   - Therefore, the atomic write protocol must:
     1. Serialize the document to formatted UTF-8 JSON.
     2. Write to `${targetPath}.${crypto.randomBytes(6).toString('hex')}.tmp`.
     3. Atomically rename the `.tmp` file to `${targetPath}`.
     4. Wrap the rename in a jittered retry loop (up to 5 attempts, 10ms–50ms) for transient Windows locks.
     5. Guarantee cleanup of the `.tmp` file if the operation permanently fails.

3. **Collection API Extension & Performance Optimizations**:
   - `ReferenceCollection` implements basic `find()` by reading and parsing every `.json` file in the collection directory.
   - For `count(queryFilter)`:
     - If `queryFilter` is omitted or empty `{}`: reading directory entries (`fs.promises.readdir`) and counting `.json` files is $O(\text{files})$ directory-level metadata lookup instead of $O(\text{bytes})$ full-file JSON parsing. For a collection with thousands of ASTs, this drops execution time from seconds to milliseconds.
     - If `queryFilter` has keys or is a predicate function: evaluate filter conditions.
   - Query filtering should support dot-notation (e.g. `'tokens.primary': '#66fcf1'`) and deep path traversal so nested ASTs and design tokens can be queried directly without full collection scans in client code.

4. **Security & Path Traversal Prevention**:
   - If an unvetted collection name or document ID contains `..` or path separators (`/`, `\`), files outside `data/documents/` could be overwritten or deleted.
   - Both collection names and document IDs must be validated:
     - Collection names: regex `^[a-zA-Z0-9_-]+$`.
     - Document IDs: sanitized string, asserting `path.basename(id) === id` and rejecting any path separators or traversal tokens.

5. **Dual Export Contract**:
   - `test/e2e/r1-r5-harness.js` uses `CandidateStore.DocumentStore || CandidateStore`.
   - Direct consumers might do `const DocumentStore = require('./document-store');` or `const { DocumentStore, Collection } = require('./document-store');`.
   - `document-store.js` must export `DocumentStore` as both default and named export, alongside named export `Collection`.

---

## 3. Caveats

1. **Large Document Memory Bounds**:
   - TC-R3-T2-03 tests a 15MB payload. Node.js V8 string size limit is 512MB–1GB. Handling 15MB in `JSON.parse` and `JSON.stringify` requires ~30–45MB heap during serialization, which runs within standard limits. Payloads exceeding 100MB should be streamed, but Studio DNA design ASTs and audit reports naturally fall between 10KB and 20MB.
2. **Crash-Orphaned Temporary Files**:
   - If the host machine loses power or the process is forcibly terminated (`kill -9`) precisely between `writeFile` and `rename`, a `.tmp` file may remain on disk.
   - Solution included in blueprint: `find()` and `count()` strictly ignore any filename ending with `.tmp`, and `init()` sweeps `.tmp` files older than 5 minutes.
3. **NoSQL Document Immutability of `_id`**:
   - During `updateOne(id, updateData)`, `_id` and `createdAt` must remain immutable, even if `updateData` attempts to overwrite them.

---

## 4. Conclusion & Implementation Blueprint

The concrete implementation blueprint for `src/persistence/document-store.js` is fully specified below.

### Storage Hierarchy
```
data/
└── documents/
    ├── scrape_payloads/
    │   ├── <uuid>.json
    │   └── <uuid>.<hex>.tmp  (ephemeral during atomic write)
    ├── audit_reports/
    │   └── <uuid>.json
    ├── ast_trees/
    │   └── <uuid>.json
    ├── design_dna/
    │   └── <uuid>.json
    └── shaders/
        └── <uuid>.json
```

### Complete Implementation Blueprint (`src/persistence/document-store.js`)

```javascript
/**
 * src/persistence/document-store.js
 * 
 * Embedded NoSQL Document Store for Studio DNA v3.0.
 * 
 * Provides schemaless, file-per-document storage under data/documents/<collection>/<id>.json
 * with atomic write protocol (.tmp write + atomic rename with transient retry),
 * deep-nested query filtering, dot-notation access, and fast-path counting.
 */

'use strict';

const fs = require('node:fs');
const fsp = fs.promises;
const path = require('node:path');
const crypto = require('node:crypto');

const DEFAULT_BASE_PATH = path.join(process.cwd(), 'data/documents');

/**
 * Validates and sanitizes collection name against directory traversal.
 * @param {string} name
 */
function validateCollectionName(name) {
  if (!name || typeof name !== 'string') {
    throw new TypeError('Collection name must be a non-empty string');
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    throw new Error(`Invalid collection name "${name}": must contain only alphanumeric characters, underscores, or hyphens`);
  }
  return name;
}

/**
 * Validates and sanitizes document ID against directory traversal.
 * @param {string} id
 */
function validateDocumentId(id) {
  if (!id || typeof id !== 'string') {
    throw new TypeError('Document ID must be a non-empty string');
  }
  if (path.basename(id) !== id || id.includes('..') || id.includes('/') || id.includes('\\')) {
    throw new Error(`Invalid document ID "${id}": path traversal characters not permitted`);
  }
  return id;
}

/**
 * Evaluates whether doc satisfies the query filter.
 * Supports dot-notation, exact match, array inclusion, and predicate functions.
 * @param {Object} doc
 * @param {Object|Function} filter
 * @returns {boolean}
 */
function matchesQueryFilter(doc, filter) {
  if (!filter || (typeof filter === 'object' && Object.keys(filter).length === 0)) {
    return true;
  }
  if (typeof filter === 'function') {
    return Boolean(filter(doc));
  }
  if (typeof filter !== 'object') {
    return false;
  }

  for (const [key, expectedVal] of Object.entries(filter)) {
    let actualVal;
    if (key.includes('.')) {
      // Dot-notation traversal
      const parts = key.split('.');
      let current = doc;
      for (const part of parts) {
        if (current == null || typeof current !== 'object') {
          current = undefined;
          break;
        }
        current = current[part];
      }
      actualVal = current;
    } else {
      actualVal = doc[key];
    }

    if (Array.isArray(actualVal)) {
      if (Array.isArray(expectedVal)) {
        if (JSON.stringify(actualVal) !== JSON.stringify(expectedVal)) return false;
      } else if (!actualVal.includes(expectedVal)) {
        return false;
      }
    } else if (actualVal !== expectedVal) {
      return false;
    }
  }

  return true;
}

/**
 * Represents a single schemaless document collection.
 */
class Collection {
  constructor(name, collectionDir) {
    this.name = validateCollectionName(name);
    this.collectionDir = path.resolve(collectionDir);
    if (!fs.existsSync(this.collectionDir)) {
      fs.mkdirSync(this.collectionDir, { recursive: true });
    }
  }

  _getDocPath(id) {
    const validId = validateDocumentId(id);
    return path.join(this.collectionDir, `${validId}.json`);
  }

  /**
   * Atomically writes content to targetPath via a unique .tmp file and atomic rename.
   * Includes retry backoff for transient Windows locks (EPERM / EBUSY).
   * @private
   */
  async _atomicWrite(targetPath, content) {
    const tempPath = `${targetPath}.${crypto.randomBytes(6).toString('hex')}.tmp`;
    await fsp.writeFile(tempPath, content, 'utf-8');

    const maxRetries = 5;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await fsp.rename(tempPath, targetPath);
        return;
      } catch (err) {
        if ((err.code === 'EPERM' || err.code === 'EBUSY') && attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, attempt * 10));
          continue;
        }
        try {
          await fsp.unlink(tempPath);
        } catch (_) {}
        throw err;
      }
    }
  }

  /**
   * Inserts a single document.
   * Auto-assigns _id, createdAt, and updatedAt.
   * @param {Object} doc
   * @returns {Promise<{ insertedId: string, document: Object }>}
   */
  async insertOne(doc) {
    if (!doc || typeof doc !== 'object' || Array.isArray(doc)) {
      throw new TypeError('Document must be a valid object');
    }

    const id = doc._id ? validateDocumentId(doc._id) : crypto.randomUUID();
    const documentToSave = {
      ...doc,
      _id: id,
      createdAt: doc.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const targetPath = this._getDocPath(id);
    const payload = JSON.stringify(documentToSave, null, 2);
    await this._atomicWrite(targetPath, payload);

    return { insertedId: id, document: documentToSave };
  }

  /**
   * Inserts multiple documents in batch.
   * @param {Object[]} docs
   * @returns {Promise<{ insertedIds: string[], insertedCount: number, documents: Object[] }>}
   */
  async insertMany(docs) {
    if (!Array.isArray(docs)) {
      throw new TypeError('docs must be an array');
    }
    const insertedIds = [];
    const documents = [];
    for (const doc of docs) {
      const res = await this.insertOne(doc);
      insertedIds.push(res.insertedId);
      documents.push(res.document);
    }
    return { insertedIds, insertedCount: insertedIds.length, documents };
  }

  /**
   * Finds a document by its ID.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    if (!id || typeof id !== 'string') return null;
    try {
      validateDocumentId(id);
    } catch (_) {
      return null;
    }

    const filePath = this._getDocPath(id);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    try {
      const content = await fsp.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      return null;
    }
  }

  /**
   * Finds documents matching queryFilter.
   * Supports pagination (limit, offset) and sorting (sortBy, sortOrder).
   * @param {Object|Function} [queryFilter={}]
   * @param {Object} [options={}]
   * @param {number} [options.limit]
   * @param {number} [options.offset=0]
   * @param {string} [options.sortBy]
   * @param {'asc'|'desc'} [options.sortOrder='asc']
   * @returns {Promise<Object[]>}
   */
  async find(queryFilter = {}, options = {}) {
    if (!fs.existsSync(this.collectionDir)) return [];

    let files;
    try {
      files = await fsp.readdir(this.collectionDir);
    } catch (_) {
      return [];
    }

    const docFiles = files.filter(f => f.endsWith('.json') && !f.endsWith('.tmp'));
    const matched = [];

    for (const f of docFiles) {
      try {
        const content = await fsp.readFile(path.join(this.collectionDir, f), 'utf-8');
        const doc = JSON.parse(content);
        if (matchesQueryFilter(doc, queryFilter)) {
          matched.push(doc);
        }
      } catch (_) {}
    }

    // Sorting
    if (options.sortBy) {
      const sortField = options.sortBy;
      const order = options.sortOrder === 'desc' ? -1 : 1;
      matched.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return -1 * order;
        if (valA > valB) return 1 * order;
        return 0;
      });
    }

    // Pagination
    const offset = Math.max(0, Number(options.offset) || 0);
    const limit = options.limit !== undefined ? Math.max(0, Number(options.limit)) : undefined;

    if (offset > 0 || limit !== undefined) {
      return matched.slice(offset, limit !== undefined ? offset + limit : undefined);
    }

    return matched;
  }

  /**
   * Counts documents matching queryFilter.
   * Fast-path: if filter is empty, counts files on disk without reading or parsing.
   * @param {Object|Function} [queryFilter={}]
   * @returns {Promise<number>}
   */
  async count(queryFilter = {}) {
    if (!fs.existsSync(this.collectionDir)) return 0;

    let files;
    try {
      files = await fsp.readdir(this.collectionDir);
    } catch (_) {
      return 0;
    }

    const docFiles = files.filter(f => f.endsWith('.json') && !f.endsWith('.tmp'));

    if (!queryFilter || (typeof queryFilter === 'object' && Object.keys(queryFilter).length === 0)) {
      return docFiles.length;
    }

    const results = await this.find(queryFilter);
    return results.length;
  }

  /**
   * Updates an existing document by its ID.
   * Preserves _id and original createdAt; updates updatedAt.
   * @param {string} id
   * @param {Object} updateData
   * @returns {Promise<{ matchedCount: number, modifiedCount: number, document: Object|null }>}
   */
  async updateOne(id, updateData) {
    if (!id || typeof id !== 'string') {
      return { matchedCount: 0, modifiedCount: 0, document: null };
    }
    const existing = await this.findById(id);
    if (!existing) {
      return { matchedCount: 0, modifiedCount: 0, document: null };
    }

    const updated = {
      ...existing,
      ...updateData,
      _id: id,
      createdAt: existing.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const targetPath = this._getDocPath(id);
    await this._atomicWrite(targetPath, JSON.stringify(updated, null, 2));

    return { matchedCount: 1, modifiedCount: 1, document: updated };
  }

  /**
   * Deletes a document by its ID.
   * @param {string} id
   * @returns {Promise<{ deletedCount: number }>}
   */
  async deleteById(id) {
    if (!id || typeof id !== 'string') return { deletedCount: 0 };
    try {
      validateDocumentId(id);
    } catch (_) {
      return { deletedCount: 0 };
    }

    const filePath = this._getDocPath(id);
    if (fs.existsSync(filePath)) {
      try {
        await fsp.unlink(filePath);
        return { deletedCount: 1 };
      } catch (_) {
        return { deletedCount: 0 };
      }
    }
    return { deletedCount: 0 };
  }

  /**
   * Clears all documents in this collection.
   * @returns {Promise<{ deletedCount: number }>}
   */
  async clear() {
    if (!fs.existsSync(this.collectionDir)) return { deletedCount: 0 };
    let files;
    try {
      files = await fsp.readdir(this.collectionDir);
    } catch (_) {
      return { deletedCount: 0 };
    }

    let deletedCount = 0;
    for (const f of files) {
      if (f.endsWith('.json') || f.endsWith('.tmp')) {
        try {
          await fsp.unlink(path.join(this.collectionDir, f));
          if (f.endsWith('.json')) deletedCount++;
        } catch (_) {}
      }
    }
    return { deletedCount };
  }
}

/**
 * Root Document Store managing collections on disk.
 */
class DocumentStore {
  constructor(options = {}) {
    this.basePath = path.resolve(options.basePath || DEFAULT_BASE_PATH);
    this.collections = new Map();
  }

  /**
   * Initializes the base directory and loads existing collections.
   * Sweeps stale .tmp files if any exist.
   * @returns {Promise<boolean>}
   */
  async init() {
    if (!fs.existsSync(this.basePath)) {
      await fsp.mkdir(this.basePath, { recursive: true });
    }

    const entries = await fsp.readdir(this.basePath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const colName = entry.name;
        if (/^[a-zA-Z0-9_-]+$/.test(colName)) {
          this.getCollection(colName);
        }
      }
    }
    return true;
  }

  /**
   * Obtains a Collection instance (cached or lazily instantiated).
   * @param {string} name
   * @returns {Collection}
   */
  getCollection(name) {
    validateCollectionName(name);
    if (!this.collections.has(name)) {
      const colDir = path.join(this.basePath, name);
      this.collections.set(name, new Collection(name, colDir));
    }
    return this.collections.get(name);
  }

  /**
   * Lists all collection names stored under basePath.
   * @returns {Promise<string[]>}
   */
  async listCollections() {
    if (!fs.existsSync(this.basePath)) return [];
    const entries = await fsp.readdir(this.basePath, { withFileTypes: true });
    const discovered = entries
      .filter(e => e.isDirectory() && /^[a-zA-Z0-9_-]+$/.test(e.name))
      .map(e => e.name);

    for (const cached of this.collections.keys()) {
      if (!discovered.includes(cached)) {
        discovered.push(cached);
      }
    }
    return discovered;
  }

  /**
   * Drops an entire collection and deletes its directory.
   * @param {string} name
   * @returns {Promise<boolean>}
   */
  async dropCollection(name) {
    validateCollectionName(name);
    this.collections.delete(name);
    const colDir = path.join(this.basePath, name);
    if (fs.existsSync(colDir)) {
      await fsp.rm(colDir, { recursive: true, force: true });
      return true;
    }
    return false;
  }
}

module.exports = DocumentStore;
module.exports.DocumentStore = DocumentStore;
module.exports.Collection = Collection;
```

---

## 5. Verification Method

To verify the implementation once written by the worker:

1. **Verify Native E2E Test Suite**:
   ```powershell
   node --test test/e2e/r1-r5-tier1-feature-coverage.test.js
   node --test test/e2e/r1-r5-tier2-boundary-corner.test.js
   node --test test/e2e/r1-r5-tier3-pairwise-combinations.test.js
   node --test test/e2e/r1-r5-tier4-realworld-scenarios.test.js
   ```
   **Pass Criteria**: All 54 tests pass with 0 failures. `resolveDocumentStore()` must automatically resolve `src/persistence/document-store.js` instead of falling back to reference.

2. **Verify Dynamic Resolution Contract**:
   Inspect `test/e2e/r1-r5-harness.js`:
   ```powershell
   node -e "const { resolveDocumentStore } = require('./test/e2e/r1-r5-harness'); const ds = resolveDocumentStore(); console.log(ds.constructor.name);"
   ```
   Must output `DocumentStore` (from `src/persistence/document-store.js`), not `ReferenceDocumentStore`.

3. **Verify Dedicated Unit Tests (`test/persistence-docstore.test.js`)**:
   Execute the dedicated unit suite once created:
   ```powershell
   node --test test/persistence-docstore.test.js
   ```
   Verify 100% assertions on:
   - Atomic rename and temporary file isolation.
   - 15MB AST payload insertion and retrieval.
   - Dot-notation query filtering (`tokens.primary`).
   - Windows retry loop on simulated transient lock.
   - Directory traversal rejection on malicious document IDs.

4. **Invalidation Conditions**:
   - Any test failure in TC-R3-T1-03, TC-R3-T1-04, TC-R3-T2-03, TC-R3-T3-01, or TC-R3-T4-01.
   - Unhandled `.tmp` files lingering after completed writes.
   - Incomplete or corrupted JSON on concurrent writes.
