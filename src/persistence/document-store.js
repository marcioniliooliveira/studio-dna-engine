/**
 * src/persistence/document-store.js
 *
 * Embedded NoSQL Document Store for Studio DNA v3.0.
 *
 * Provides schemaless, file-per-document storage under data/documents/<collection>/<id>.json
 * with atomic write protocol (.tmp write + atomic rename with transient retry),
 * deep-nested query filtering, dot-notation access, and fast-path counting.
 *
 * Conforms strictly to Requirement R3 (Feature F06).
 */

'use strict';

const fs = require('node:fs');
const fsp = fs.promises;
const path = require('node:path');
const crypto = require('node:crypto');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const DEFAULT_BASE_PATH = process.env.STUDIO_DNA_DOCS || path.join(PROJECT_ROOT, 'data/documents');

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
  if (typeof filter !== 'object' || doc == null || typeof doc !== 'object') {
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
          await new Promise(resolve => setTimeout(resolve, attempt * 15));
          continue;
        }
        try {
          if (fs.existsSync(tempPath)) {
            await fsp.unlink(tempPath);
          }
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

    const id = doc._id ? validateDocumentId(String(doc._id)) : crypto.randomUUID();
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
      const order = String(options.sortOrder).toLowerCase() === 'desc' ? -1 : 1;
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
