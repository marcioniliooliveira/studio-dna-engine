/**
 * STUDIO DNA ENGINE — Transaction Manager with Cryptographic Rollback
 * Provides atomic, isolated state transactions for DNA IR modifications.
 * Guarantees that any constraint violation triggers an instantaneous, zero-residue rollback.
 */

const crypto = require('node:crypto');
const { MutationResolver, validateMutationBudget } = require('./resolver.js');

class TransactionManager {
  /**
   * @param {Object} initialDnaIr - Initial framework-neutral DNA IR state
   */
  constructor(initialDnaIr) {
    if (!initialDnaIr || typeof initialDnaIr !== 'object') {
      throw new Error('Initial DNA IR object required for TransactionManager');
    }
    this.state = JSON.parse(JSON.stringify(initialDnaIr));
    this.resolver = new MutationResolver(this.state);
    this.history = [];
  }

  /**
   * Computes a deterministic SHA-256 hash of the current state
   * @returns {string} 64-character hex string
   */
  getLatestStateHash() {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(this.state))
      .digest('hex');
  }

  /**
   * Returns a deep clone of the active state
   * @returns {Object}
   */
  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  /**
   * Returns transaction audit log
   * @returns {Array}
   */
  getHistory() {
    return [...this.history];
  }

  /**
   * Commits a mutation transaction atomically.
   * If any pre-flight verification or constraint fails, automatically rolls back.
   * @param {Object} mutationPayload - Delta specification
   * @returns {Object} Transaction receipt
   */
  commitTransaction(mutationPayload) {
    const parentHash = this.getLatestStateHash();
    const transactionId = `tx_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const timestamp = new Date().toISOString();

    const deltas = mutationPayload.deltas || [];

    // 1. Validate Mutation Budget if budget specified
    if (mutationPayload.budget) {
      const budgetCheck = validateMutationBudget(deltas, mutationPayload.budget);
      if (!budgetCheck.valid) {
        const failedReceipt = {
          transactionId,
          timestamp,
          parentHash,
          currentHash: parentHash,
          status: 'rolled_back',
          error: budgetCheck.reason,
          code: budgetCheck.code
        };
        this.history.push(failedReceipt);
        return failedReceipt;
      }
    }

    // 2. Resolve via MutationResolver & ConstraintEngine
    const resolution = this.resolver.resolve(this.state, mutationPayload);

    if (!resolution.valid) {
      // ATOMIC ROLLBACK: Keep state 100% untouched
      const rolledBackReceipt = {
        transactionId,
        timestamp,
        parentHash,
        currentHash: parentHash,
        status: 'rolled_back',
        error: resolution.error,
        deltas
      };
      this.history.push(rolledBackReceipt);
      return rolledBackReceipt;
    }

    // 3. Commit new state
    this.state = resolution.draftState;
    const currentHash = this.getLatestStateHash();

    const committedReceipt = {
      transactionId,
      timestamp,
      parentHash,
      currentHash,
      status: 'committed',
      deltas,
      compensations: resolution.compensations
    };

    this.history.push(committedReceipt);
    return committedReceipt;
  }
}

module.exports = {
  TransactionManager
};
