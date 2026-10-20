'use strict';

/**
 * studio-dna v2.5 LocalStorage Draft Persistence Manager
 * Provides 24-hour TTL draft caching, checksum integrity, and automatic expiration cleanup.
 * Includes in-memory fallback for SSR and headless Node environments.
 */

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const STORAGE_PREFIX = 'studio_dna_draft_';
const SCHEMA_VERSION = '2.5.0';

/**
 * Simple deterministic 32-bit FNV-1a hash for string integrity checksum.
 * @param {string} str
 * @returns {string} Hex string checksum
 */
function computeChecksum(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * In-memory storage fallback for Node.js or restricted environments.
 */
class MemoryStorage {
  constructor() {
    this._store = new Map();
  }
  getItem(key) {
    return this._store.has(key) ? this._store.get(key) : null;
  }
  setItem(key, value) {
    this._store.set(key, String(value));
  }
  removeItem(key) {
    this._store.delete(key);
  }
  clear() {
    this._store.clear();
  }
  get length() {
    return this._store.size;
  }
  key(index) {
    const keys = Array.from(this._store.keys());
    return keys[index] || null;
  }
}

/**
 * Resolves the active storage mechanism (browser localStorage or MemoryStorage fallback).
 * @param {Object} [customStorage]
 * @returns {Storage|MemoryStorage}
 */
function resolveStorage(customStorage) {
  if (customStorage && typeof customStorage.getItem === 'function') {
    return customStorage;
  }
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Test storage access (may throw in private browsing / sandbox)
      const testKey = '__studio_dna_storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    }
  } catch (e) {
    // Fallback to in-memory store
  }
  return new MemoryStorage();
}

/**
 * Creates a Draft Storage instance.
 * @param {Object} [options]
 * @param {Storage} [options.storage]
 * @param {number} [options.defaultTtlMs]
 * @param {string} [options.prefix]
 * @param {string} [options.version]
 * @returns {Object}
 */
function createDraftStorage(options = {}) {
  const storage = resolveStorage(options.storage);
  const prefix = options.prefix || STORAGE_PREFIX;
  const defaultTtl = typeof options.defaultTtlMs === 'number' ? options.defaultTtlMs : DEFAULT_TTL_MS;
  const version = options.version || SCHEMA_VERSION;

  function getStorageKey(formId) {
    return `${prefix}${formId}`;
  }

  /**
   * Saves form draft values to storage.
   * @param {string} formId
   * @param {Object} values
   * @param {Object} [opts]
   * @returns {boolean} Whether draft was saved successfully
   */
  function saveDraft(formId, values, opts = {}) {
    if (!formId || !values || typeof values !== 'object') {
      return false;
    }
    const ttlMs = typeof opts.ttlMs === 'number' ? opts.ttlMs : defaultTtl;
    const now = typeof opts.now === 'number' ? opts.now : Date.now();
    const serializedValues = JSON.stringify(values);
    const checksum = computeChecksum(serializedValues);

    const payload = {
      version,
      formId,
      timestamp: now,
      ttlMs,
      checksum,
      values
    };

    try {
      storage.setItem(getStorageKey(formId), JSON.stringify(payload));
      return true;
    } catch (err) {
      console.warn(`[DraftStorage] Failed to save draft for "${formId}":`, err);
      return false;
    }
  }

  /**
   * Loads draft from storage if valid and unexpired.
   * @param {string} formId
   * @param {Object} [opts]
   * @returns {Object|null} Restored values or null
   */
  function loadDraft(formId, opts = {}) {
    if (!formId) return null;
    const key = getStorageKey(formId);

    try {
      const raw = storage.getItem(key);
      if (!raw) return null;

      const payload = JSON.parse(raw);
      if (!payload || typeof payload !== 'object' || !payload.values) {
        storage.removeItem(key);
        return null;
      }

      const now = typeof opts.now === 'number' ? opts.now : Date.now();
      const elapsed = now - payload.timestamp;
      const ttl = typeof payload.ttlMs === 'number' ? payload.ttlMs : defaultTtl;

      // Check TTL expiration
      if (elapsed > ttl || elapsed < 0) {
        // Expired or invalid future timestamp
        storage.removeItem(key);
        return null;
      }

      // Verify checksum integrity
      const serializedValues = JSON.stringify(payload.values);
      const expectedChecksum = computeChecksum(serializedValues);
      if (payload.checksum && payload.checksum !== expectedChecksum) {
        console.warn(`[DraftStorage] Checksum mismatch for draft "${formId}". Discarding.`);
        storage.removeItem(key);
        return null;
      }

      return payload.values;
    } catch (err) {
      console.warn(`[DraftStorage] Error reading draft "${formId}":`, err);
      try { storage.removeItem(key); } catch (_) {}
      return null;
    }
  }

  /**
   * Checks whether an unexpired draft exists for formId.
   * @param {string} formId
   * @param {Object} [opts]
   * @returns {boolean}
   */
  function hasDraft(formId, opts = {}) {
    return loadDraft(formId, opts) !== null;
  }

  /**
   * Retrieves draft metadata without modifying storage.
   * @param {string} formId
   * @param {Object} [opts]
   * @returns {Object|null}
   */
  function getDraftMetadata(formId, opts = {}) {
    if (!formId) return null;
    const key = getStorageKey(formId);
    try {
      const raw = storage.getItem(key);
      if (!raw) return null;
      const payload = JSON.parse(raw);
      const now = typeof opts.now === 'number' ? opts.now : Date.now();
      const elapsed = now - payload.timestamp;
      const ttl = typeof payload.ttlMs === 'number' ? payload.ttlMs : defaultTtl;

      return {
        formId,
        timestamp: payload.timestamp,
        ttlMs: ttl,
        savedAt: new Date(payload.timestamp).toISOString(),
        isExpired: elapsed > ttl || elapsed < 0,
        elapsedMs: elapsed,
        checksum: payload.checksum,
        version: payload.version
      };
    } catch (e) {
      return null;
    }
  }

  /**
   * Removes draft for specified formId.
   * @param {string} formId
   * @returns {boolean}
   */
  function clearDraft(formId) {
    if (!formId) return false;
    try {
      storage.removeItem(getStorageKey(formId));
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * Automatically scans and cleans up all expired drafts in storage.
   * @param {Object} [opts]
   * @returns {number} Count of expired drafts cleaned up
   */
  function autoCleanup(opts = {}) {
    const now = typeof opts.now === 'number' ? opts.now : Date.now();
    let cleaned = 0;
    const keysToRemove = [];

    // Collect matching keys safely
    try {
      if (typeof storage.length === 'number') {
        for (let i = 0; i < storage.length; i++) {
          const key = storage.key(i);
          if (key && key.startsWith(prefix)) {
            keysToRemove.push(key);
          }
        }
      } else if (storage._store instanceof Map) {
        for (const key of storage._store.keys()) {
          if (key.startsWith(prefix)) {
            keysToRemove.push(key);
          }
        }
      }
    } catch (e) {}

    for (const key of keysToRemove) {
      try {
        const raw = storage.getItem(key);
        if (!raw) continue;
        const payload = JSON.parse(raw);
        const ttl = typeof payload.ttlMs === 'number' ? payload.ttlMs : defaultTtl;
        const elapsed = now - payload.timestamp;
        if (elapsed > ttl || elapsed < 0) {
          storage.removeItem(key);
          cleaned++;
        }
      } catch (err) {
        // Corrupted item, delete it
        try {
          storage.removeItem(key);
          cleaned++;
        } catch (_) {}
      }
    }

    return cleaned;
  }

  return {
    saveDraft,
    loadDraft,
    hasDraft,
    clearDraft,
    getDraftMetadata,
    autoCleanup,
    getStorageKey,
    _storage: storage
  };
}

// Default singleton instance
const defaultDraftStorage = createDraftStorage();

module.exports = {
  createDraftStorage,
  saveDraft: defaultDraftStorage.saveDraft,
  loadDraft: defaultDraftStorage.loadDraft,
  hasDraft: defaultDraftStorage.hasDraft,
  clearDraft: defaultDraftStorage.clearDraft,
  getDraftMetadata: defaultDraftStorage.getDraftMetadata,
  autoCleanup: defaultDraftStorage.autoCleanup,
  computeChecksum,
  MemoryStorage,
  DEFAULT_TTL_MS,
  STORAGE_PREFIX,
  SCHEMA_VERSION
};
