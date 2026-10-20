'use strict';

/**
 * studio-dna v2.5 Finite State Machine Engine
 * Pure vanilla JS micro-statechart implementation based on Zag.js and XState principles.
 * Zero external runtime dependencies.
 */

/**
 * Creates an assign action helper for immutable context updates.
 * @param {Function|Object} assignment - Function (context, event) => partialContext or partialContext object
 * @returns {Function} Action function
 */
function assign(assignment) {
  return function assignAction(context, event) {
    const update = typeof assignment === 'function' ? assignment(context, event) : assignment;
    if (!update || typeof update !== 'object') {
      return context;
    }
    return { ...context, ...update };
  };
}

/**
 * Normalizes transition definition into an array of transition descriptor objects.
 * @param {any} transitionDef
 * @returns {Array<{target?: string, guard?: Function, actions?: Array<Function>}>}
 */
function normalizeTransitions(transitionDef) {
  if (!transitionDef) {
    return [];
  }
  const list = Array.isArray(transitionDef) ? transitionDef : [transitionDef];
  return list.map(item => {
    if (typeof item === 'string') {
      return { target: item, guard: null, actions: [] };
    }
    const target = item.target !== undefined ? item.target : null;
    const guard = item.guard || item.cond || null;
    let actions = [];
    if (item.actions) {
      actions = Array.isArray(item.actions) ? item.actions : [item.actions];
    } else if (item.action) {
      actions = Array.isArray(item.action) ? item.action : [item.action];
    }
    return { target, guard, actions };
  });
}

/**
 * Normalizes action definition to an array of functions.
 * @param {any} actionDef
 * @returns {Array<Function>}
 */
function normalizeActions(actionDef) {
  if (!actionDef) {
    return [];
  }
  const list = Array.isArray(actionDef) ? actionDef : [actionDef];
  return list.filter(fn => typeof fn === 'function');
}

/**
 * Creates a finite state machine instance.
 * @param {Object} config - State machine configuration
 * @returns {Object} State machine instance
 */
function createMachine(config) {
  if (!config || typeof config !== 'object') {
    throw new TypeError('Machine configuration must be an object');
  }
  if (!config.initial || typeof config.initial !== 'string') {
    throw new TypeError('Machine configuration must specify an initial state string');
  }
  if (!config.states || typeof config.states !== 'object') {
    throw new TypeError('Machine configuration must specify states object');
  }

  const id = config.id || 'fsm';
  const stateDefs = config.states;

  if (!stateDefs[config.initial]) {
    throw new Error(`Initial state "${config.initial}" is not defined in machine states`);
  }

  // Initialize context
  let context = typeof config.context === 'function'
    ? config.context()
    : { ...(config.context || {}) };

  let currentState = config.initial;
  const listeners = new Set();
  let isTransitioning = false;

  // Run initial state entry actions if any
  const initialEntry = normalizeActions(stateDefs[currentState].entry);
  for (const entryAction of initialEntry) {
    const updated = entryAction(context, { type: 'xstate.init' });
    if (updated && typeof updated === 'object') {
      context = updated;
    }
  }

  /**
   * Generates a state snapshot.
   */
  function getSnapshot() {
    return {
      value: currentState,
      state: currentState,
      context: { ...context },
      matches(stateValue) {
        return currentState === stateValue;
      },
      can(eventType) {
        const stateNode = stateDefs[currentState];
        if (!stateNode || !stateNode.on || !stateNode.on[eventType]) {
          return false;
        }
        const candidates = normalizeTransitions(stateNode.on[eventType]);
        const dummyEvent = typeof eventType === 'string' ? { type: eventType } : eventType;
        return candidates.some(c => !c.guard || Boolean(c.guard(context, dummyEvent)));
      }
    };
  }

  /**
   * Dispatches notifications to all subscribers.
   */
  function notifySubscribers() {
    const snapshot = getSnapshot();
    listeners.forEach(listener => {
      try {
        listener(snapshot);
      } catch (err) {
        console.error(`[FSM:${id}] Subscriber listener error:`, err);
      }
    });
  }

  /**
   * Subscribes a listener to state and context changes.
   * Listener is immediately invoked with the current state snapshot.
   * @param {Function} listener
   * @returns {Function} Unsubscribe function
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Subscriber must be a function');
    }
    listeners.add(listener);
    // Zag / Svelte / RxJS pattern: invoke immediately with current snapshot
    try {
      listener(getSnapshot());
    } catch (err) {
      console.error(`[FSM:${id}] Initial subscriber invocation error:`, err);
    }

    return function unsubscribe() {
      listeners.delete(listener);
    };
  }

  /**
   * Sends an event to trigger deterministic state transitions.
   * @param {string|Object} event - Event name string or event object with type
   * @returns {boolean} Whether a transition or action took place
   */
  function send(event) {
    const eventObj = typeof event === 'string' ? { type: event } : (event || {});
    const eventType = eventObj.type;

    if (!eventType || typeof eventType !== 'string') {
      console.warn(`[FSM:${id}] Dropping invalid event with no type:`, event);
      return false;
    }

    if (isTransitioning) {
      console.warn(`[FSM:${id}] Re-entrant send detected during transition: ${eventType}`);
      return false;
    }

    const stateNode = stateDefs[currentState];
    if (!stateNode) {
      return false;
    }

    // Look up transitions for the event: first on current state, fallback to root transitions if defined
    const transitionDef = (stateNode.on && stateNode.on[eventType]) ||
      (config.on && config.on[eventType]);

    if (!transitionDef) {
      // Event not handled in current state: intentionally dropped to prevent invalid transitions
      return false;
    }

    const candidates = normalizeTransitions(transitionDef);
    let matchedTransition = null;

    for (const candidate of candidates) {
      if (!candidate.guard) {
        matchedTransition = candidate;
        break;
      }
      try {
        if (candidate.guard(context, eventObj)) {
          matchedTransition = candidate;
          break;
        }
      } catch (err) {
        console.error(`[FSM:${id}] Guard execution failed for event ${eventType}:`, err);
      }
    }

    if (!matchedTransition) {
      // All guards failed, no transition occurs
      return false;
    }

    const targetState = matchedTransition.target;
    const isStateChange = targetState !== null && targetState !== undefined && targetState !== currentState;

    if (isStateChange && !stateDefs[targetState]) {
      throw new Error(`[FSM:${id}] Target state "${targetState}" does not exist`);
    }

    isTransitioning = true;
    try {
      // 1. Exit actions of current state if state is changing
      if (isStateChange) {
        const exitActions = normalizeActions(stateNode.exit);
        for (const exitAction of exitActions) {
          const res = exitAction(context, eventObj);
          if (res && typeof res === 'object') {
            context = res;
          }
        }
      }

      // 2. Transition actions
      if (matchedTransition.actions && matchedTransition.actions.length > 0) {
        for (const action of matchedTransition.actions) {
          const res = action(context, eventObj);
          if (res && typeof res === 'object') {
            context = res;
          }
        }
      }

      // 3. Update state and run entry actions
      if (isStateChange) {
        const previousState = currentState;
        currentState = targetState;
        const nextStateNode = stateDefs[currentState];
        const entryActions = normalizeActions(nextStateNode.entry);
        for (const entryAction of entryActions) {
          const res = entryAction(context, eventObj);
          if (res && typeof res === 'object') {
            context = res;
          }
        }
      }
    } finally {
      isTransitioning = false;
    }

    notifySubscribers();
    return true;
  }

  // Machine instance object matching M2 interface contract
  const instance = {
    id,
    get state() {
      return currentState;
    },
    get context() {
      return context;
    },
    send,
    subscribe,
    getSnapshot,
    matches(stateValue) {
      return currentState === stateValue;
    },
    can(eventType) {
      return getSnapshot().can(eventType);
    }
  };

  return instance;
}

module.exports = {
  createMachine,
  assign
};
