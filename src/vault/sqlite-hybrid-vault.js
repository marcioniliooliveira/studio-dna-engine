/**
 * src/vault/sqlite-hybrid-vault.js
 *
 * SQLite Hybrid Retrieval Engine for the Design Vault.
 * Combines:
 * 1. DTFV 12-dimensional topological vector (45% weight)
 * 2. 7 UX axes parametric vector (35% weight)
 * 3. BM25 / IDF semantic & domain terminology (20% weight)
 *
 * Retrieval formula:
 * Score(q, d) = 0.45 * cos(v_topo_q, v_topo_d) + 0.35 * cos(v_ux_q, v_ux_d) + 0.20 * BM25/IDF(q, d)
 *
 * Enforces southleft/design-systems-mcp relevancy floor (<5ms response).
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { cosineSimilarity } = require('./topology-vector-index');

// 7 axes from Laith0003/ux-skill
const UX_AXES = Object.freeze([
  'warmth',
  'contrast',
  'density',
  'geometry',
  'formality',
  'motion',
  'type_personality'
]);

/**
 * Normalizes a 7-axis UX representation into Float32Array(7)
 */
function normalizeUxVector(input) {
  const vec = new Float32Array(7);
  if (!input) return vec;

  if (Array.isArray(input) || ArrayBuffer.isView(input)) {
    for (let i = 0; i < Math.min(input.length, 7); i++) {
      vec[i] = Math.max(0.0, Math.min(1.0, Number(input[i]) || 0.0));
    }
    return vec;
  }

  if (typeof input === 'object') {
    UX_AXES.forEach((axis, idx) => {
      if (input[axis] !== undefined) {
        vec[idx] = Math.max(0.0, Math.min(1.0, Number(input[axis]) || 0.0));
      }
    });
  }

  return vec;
}

class SqliteHybridVault {
  constructor(options = {}) {
    this.dbPath = options.dbPath || ':memory:';
    this.db = null;
    this.useNodeSqlite = false;
    this.inMemoryStore = new Map();
  }

  /**
   * Initializes SQLite database using node:sqlite DatabaseSync with in-memory fallback
   */
  initialize() {
    try {
      const { DatabaseSync } = require('node:sqlite');
      this.db = new DatabaseSync(this.dbPath);
      this.useNodeSqlite = true;

      this.db.exec(`
        CREATE TABLE IF NOT EXISTS vault_entries (
          id TEXT PRIMARY KEY,
          slug TEXT NOT NULL,
          name TEXT NOT NULL,
          archetype TEXT,
          v_topo TEXT NOT NULL,
          v_ux TEXT NOT NULL,
          terms TEXT NOT NULL,
          metadata TEXT
        );
        CREATE INDEX IF NOT EXISTS idx_slug ON vault_entries (slug);
      `);
    } catch (_) {
      // In-memory fallback if node:sqlite is not initialized
      this.useNodeSqlite = false;
      this.inMemoryStore = new Map();
    }
  }

  /**
   * Indexes a template or section entry
   */
  indexEntry(entry) {
    if (!entry || !entry.slug) {
      throw new Error('Entry must have at least a slug');
    }

    const id = entry.id || entry.slug;
    const slug = entry.slug;
    const name = entry.name || slug;
    const archetype = entry.archetype || '';
    const v_topo = Array.from(entry.v_topo || new Float32Array(12));
    const v_ux = Array.from(normalizeUxVector(entry.v_ux));
    const terms = Array.isArray(entry.terms)
      ? entry.terms.map(t => String(t).toLowerCase().trim()).filter(Boolean)
      : (typeof entry.terms === 'string' ? entry.terms.toLowerCase().split(/\s+/) : []);
    const metadata = entry.metadata || {};

    if (this.useNodeSqlite && this.db) {
      const stmt = this.db.prepare(`
        INSERT OR REPLACE INTO vault_entries (id, slug, name, archetype, v_topo, v_ux, terms, metadata)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        id,
        slug,
        name,
        archetype,
        JSON.stringify(v_topo),
        JSON.stringify(v_ux),
        JSON.stringify(terms),
        JSON.stringify(metadata)
      );
    } else {
      this.inMemoryStore.set(id, {
        id,
        slug,
        name,
        archetype,
        v_topo,
        v_ux,
        terms,
        metadata
      });
    }

    return { id, slug };
  }

  /**
   * Retrieves all indexed entries
   */
  getAllEntries() {
    if (this.useNodeSqlite && this.db) {
      const stmt = this.db.prepare('SELECT * FROM vault_entries');
      const rows = stmt.all();
      return rows.map(r => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        archetype: r.archetype,
        v_topo: JSON.parse(r.v_topo),
        v_ux: JSON.parse(r.v_ux),
        terms: JSON.parse(r.terms),
        metadata: JSON.parse(r.metadata || '{}')
      }));
    }

    return Array.from(this.inMemoryStore.values());
  }

  /**
   * Calculates normalized BM25/IDF score for query terms against document terms
   */
  calculateIdfScore(queryTerms, docTerms, allEntries) {
    if (!queryTerms || queryTerms.length === 0) {
      return 1.0;
    }

    const cleanQueryTerms = queryTerms.map(t => t.toLowerCase().trim()).filter(Boolean);
    if (cleanQueryTerms.length === 0) return 1.0;

    const N = Math.max(allEntries.length, 1);
    const docTermSet = new Set(docTerms || []);

    let matchedIdfSum = 0.0;
    let maxPossibleIdfSum = 0.0;

    for (const term of cleanQueryTerms) {
      // Calculate document frequency across corpus
      let df = 0;
      for (const entry of allEntries) {
        if (entry.terms && entry.terms.includes(term)) {
          df++;
        }
      }

      // Smooth IDF
      const idf = Math.log(1.0 + (N - df + 0.5) / (df + 0.5));
      maxPossibleIdfSum += Math.max(idf, 0.1);

      if (docTermSet.has(term)) {
        matchedIdfSum += Math.max(idf, 0.1);
      }
    }

    if (maxPossibleIdfSum <= 0.0) return 0.0;
    return Math.min(1.0, matchedIdfSum / maxPossibleIdfSum);
  }

  /**
   * Executes hybrid search over the vault.
   *
   * @param {object} params
   * @param {ArrayLike<number>} [params.queryTopo] 12-dim topological query vector
   * @param {ArrayLike<number>|object} [params.queryUx] 7-axis UX query vector
   * @param {string[]|string} [params.queryTerms] Semantic / industry terms
   * @param {number} [params.limit=5]
   * @param {number} [params.relevancyFloor=0.35]
   * @returns {Array<object>} Sorted array of matches
   */
  hybridSearch(params = {}) {
    const {
      queryTopo,
      queryUx,
      queryTerms,
      limit = 5,
      relevancyFloor = 0.35
    } = params;

    const qTopo = queryTopo ? Array.from(queryTopo) : new Array(12).fill(0);
    const qUx = Array.from(normalizeUxVector(queryUx));
    const terms = Array.isArray(queryTerms)
      ? queryTerms
      : (typeof queryTerms === 'string' ? queryTerms.split(/\s+/) : []);

    const entries = this.getAllEntries();
    if (entries.length === 0) {
      return [];
    }

    const scored = [];

    for (const entry of entries) {
      const topoScore = cosineSimilarity(qTopo, entry.v_topo);
      const uxScore = cosineSimilarity(qUx, entry.v_ux);
      const idfScore = this.calculateIdfScore(terms, entry.terms, entries);

      // Formula: Score(q, d) = 0.45 * cos(v_topo_q, v_topo_d) + 0.35 * cos(v_ux_q, v_ux_d) + 0.20 * BM25/IDF(q, d)
      const combinedScore = (0.45 * topoScore) + (0.35 * uxScore) + (0.20 * idfScore);

      if (combinedScore >= relevancyFloor) {
        scored.push({
          id: entry.id,
          slug: entry.slug,
          name: entry.name,
          archetype: entry.archetype,
          score: Math.round(combinedScore * 10000) / 10000,
          topoScore: Math.round(topoScore * 10000) / 10000,
          uxScore: Math.round(uxScore * 10000) / 10000,
          idfScore: Math.round(idfScore * 10000) / 10000,
          metadata: entry.metadata
        });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit);
  }

  /**
   * Closes database connection
   */
  close() {
    if (this.useNodeSqlite && this.db) {
      try {
        this.db.close();
      } catch (_) {}
      this.db = null;
    }
    this.inMemoryStore.clear();
  }
}

module.exports = {
  SqliteHybridVault,
  UX_AXES,
  normalizeUxVector
};
