/**
 * src/physics/haptic-engine.js
 * 
 * Multi-Tier Vibration API Haptic Feedback Engine
 * Requirement R3 (studio-dna v2.5 / Feature Inventory #12)
 * 
 * Multi-Tier Haptic Pulses:
 *   - detent / snap:     [12]          (12ms single crisp tick)
 *   - release:          [8]           (8ms micro click upon gesture flick)
 *   - limit:            [22]          (22ms tactile bump at drawer/scroll boundary)
 *   - error:            [30, 40, 40]  (double alert buzz for rejected actions)
 * 
 * Features:
 *   - Graceful fallback in environments without Vibration API (desktop, headless, Safari)
 *   - Safe error handling (zero unhandled exceptions)
 *   - Pluggable navigator reference for test isolation
 *   - In-memory event dispatch ledger / history
 *   - Reduced-motion sensitivity suppression
 */

'use strict';

/**
 * Standard multi-tier haptic vibration patterns (durations in milliseconds).
 */
const HAPTIC_PATTERNS = Object.freeze({
  detent: Object.freeze([12]),
  snap: Object.freeze([12]),
  release: Object.freeze([8]),
  limit: Object.freeze([22]),
  boundary_limit: Object.freeze([22]),
  error: Object.freeze([30, 40, 40])
});

class HapticEngine {
  /**
   * @param {Object} [options={}]
   * @param {boolean} [options.enabled=true] - Enable/disable haptic feedback
   * @param {boolean} [options.prefersReducedMotion=false] - Respect reduced motion
   * @param {boolean} [options.suppressOnReducedMotion=true] - Suppress vibration when reduced motion active
   * @param {Object} [options.navigatorRef=null] - Optional navigator object reference
   * @param {number} [options.maxHistoryLength=100] - In-memory audit trail length
   */
  constructor(options = {}) {
    this.enabled = options.enabled !== false;
    this.prefersReducedMotion = Boolean(options.prefersReducedMotion);
    this.suppressOnReducedMotion = Boolean(options.suppressOnReducedMotion);
    this.navigatorRef = options.navigatorRef || null;
    this.maxHistoryLength = Math.max(10, options.maxHistoryLength || 100);

    // Custom registry extending default patterns
    this._customPatterns = new Map();

    // Audit trail / history ledger
    this._history = [];
  }

  /**
   * Resolves the active navigator reference.
   * @private
   * @returns {Object|null}
   */
  _getNavigator() {
    if (this.navigatorRef) return this.navigatorRef;
    if (typeof navigator !== 'undefined') return navigator;
    if (typeof window !== 'undefined' && window.navigator) return window.navigator;
    if (typeof globalThis !== 'undefined' && globalThis.navigator) return globalThis.navigator;
    return null;
  }

  /**
   * Checks whether the Vibration API is supported in the current environment.
   * 
   * @returns {boolean}
   */
  isSupported() {
    const nav = this._getNavigator();
    return Boolean(nav && typeof nav.vibrate === 'function');
  }

  /**
   * Enable or disable haptic feedback globally.
   * 
   * @param {boolean} enabled
   */
  setEnabled(enabled) {
    this.enabled = Boolean(enabled);
  }

  /**
   * Check if haptic engine is currently enabled.
   * 
   * @returns {boolean}
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Set reduced motion preference.
   * 
   * @param {boolean} prefersReducedMotion
   */
  setReducedMotion(prefersReducedMotion) {
    this.prefersReducedMotion = Boolean(prefersReducedMotion);
  }

  /**
   * Register a custom named vibration pattern.
   * 
   * @param {string} name
   * @param {number|number[]} pattern
   */
  registerPattern(name, pattern) {
    if (typeof name !== 'string' || !name.trim()) {
      throw new TypeError('Pattern name must be a non-empty string');
    }
    const normalized = Array.isArray(pattern) ? [...pattern] : [Number(pattern)];
    if (normalized.some(v => typeof v !== 'number' || !Number.isFinite(v) || v < 0)) {
      throw new TypeError('Vibration pattern elements must be non-negative finite numbers');
    }
    this._customPatterns.set(name.trim(), Object.freeze(normalized));
  }

  /**
   * Retrieve pattern by tier name.
   * 
   * @param {string} tier
   * @returns {readonly number[] | null}
   */
  getPattern(tier) {
    if (this._customPatterns.has(tier)) {
      return this._customPatterns.get(tier);
    }
    if (Object.prototype.hasOwnProperty.call(HAPTIC_PATTERNS, tier)) {
      return HAPTIC_PATTERNS[tier];
    }
    return null;
  }

  /**
   * Triggers a haptic feedback pulse by tier name or explicit duration pattern.
   * Falls back gracefully if Vibration API is missing or fails.
   * 
   * @param {string|number|number[]} tierOrPattern - 'detent' | 'snap' | 'release' | 'limit' | 'error' or pattern array
   * @returns {boolean} True if vibration was dispatched to navigator.vibrate, false if suppressed or unsupported
   */
  trigger(tierOrPattern) {
    let pattern;
    let tierName = null;

    if (typeof tierOrPattern === 'string') {
      tierName = tierOrPattern;
      pattern = this.getPattern(tierOrPattern);
      if (!pattern) {
        // Unknown tier: fallback safely without crashing
        return false;
      }
    } else if (Array.isArray(tierOrPattern)) {
      pattern = tierOrPattern;
    } else if (typeof tierOrPattern === 'number' && Number.isFinite(tierOrPattern) && tierOrPattern > 0) {
      pattern = [tierOrPattern];
    } else {
      return false;
    }

    const timestamp = typeof performance !== 'undefined' ? performance.now() : Date.now();

    // Check if globally disabled
    if (!this.enabled) {
      this._recordEvent({ tier: tierName, pattern, dispatched: false, reason: 'disabled', timestamp });
      return false;
    }

    // Check if suppressed under prefers-reduced-motion
    if (this.prefersReducedMotion && this.suppressOnReducedMotion) {
      this._recordEvent({ tier: tierName, pattern, dispatched: false, reason: 'reduced-motion', timestamp });
      return false;
    }

    // Check hardware & API support
    const nav = this._getNavigator();
    if (!nav || typeof nav.vibrate !== 'function') {
      this._recordEvent({ tier: tierName, pattern, dispatched: false, reason: 'unsupported-api', timestamp });
      return false;
    }

    // Dispatch vibration with graceful error handling
    try {
      // Vibration API accepts pattern array or number
      const result = nav.vibrate(pattern);
      const dispatched = result !== false;
      this._recordEvent({
        tier: tierName,
        pattern,
        dispatched,
        reason: dispatched ? 'dispatched' : 'vibrate-returned-false',
        timestamp
      });
      return dispatched;
    } catch (err) {
      // Graceful fallback: never crash user interaction thread
      this._recordEvent({
        tier: tierName,
        pattern,
        dispatched: false,
        reason: 'exception',
        error: err.message,
        timestamp
      });
      return false;
    }
  }

  /**
   * Cancels any active ongoing vibration pattern.
   * 
   * @returns {boolean}
   */
  cancel() {
    const nav = this._getNavigator();
    if (nav && typeof nav.vibrate === 'function') {
      try {
        nav.vibrate(0);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  /**
   * Trigger 12ms crisp detent tick.
   * @returns {boolean}
   */
  triggerDetent() {
    return this.trigger('detent');
  }

  /**
   * Trigger 12ms equilibrium snap latch.
   * @returns {boolean}
   */
  triggerSnap() {
    return this.trigger('snap');
  }

  /**
   * Trigger 8ms micro click release.
   * @returns {boolean}
   */
  triggerRelease() {
    return this.trigger('release');
  }

  /**
   * Trigger 22ms boundary limit bump.
   * @returns {boolean}
   */
  triggerLimit() {
    return this.trigger('limit');
  }

  /**
   * Trigger [30, 40, 40] double buzz error alert.
   * @returns {boolean}
   */
  triggerError() {
    return this.trigger('error');
  }

  /**
   * Internal telemetry recorder.
   * @private
   */
  _recordEvent(entry) {
    this._history.push(entry);
    if (this._history.length > this.maxHistoryLength) {
      this._history.shift();
    }
  }

  /**
   * Returns audit trail history of haptic events.
   * @returns {Array<Object>}
   */
  getHistory() {
    return [...this._history];
  }

  /**
   * Clears audit trail history.
   */
  clearHistory() {
    this._history = [];
  }
}

// Default singleton instance
const hapticEngine = new HapticEngine();

module.exports = {
  HapticEngine,
  HAPTIC_PATTERNS,
  hapticEngine
};
