/**
 * src/motion/fsm-registry.js
 * 
 * Studio DNA Engine v3.0 — JEV 2.0 Zag/XState Kinetic FSM Registry
 * 
 * Provides production-ready Zag/XState finite state machine contracts tailored
 * per kinetic archetype, guaranteeing preemption, Escape reset, and reduced-motion invariants.
 */

'use strict';

const { KineticArchetype } = require('./taxonomy');

/**
 * Universal safety handlers present across all archetype state machines.
 */
const UNIVERSAL_SAFETY_TRANSITIONS = Object.freeze({
  ESCAPE: {
    target: 'idle',
    actions: ['killActiveTweens', 'resetToRestingState']
  },
  WINDOW_BLUR: {
    target: 'idle',
    actions: ['killActiveTweens', 'resetToRestingState']
  },
  PREFERS_REDUCED_MOTION: {
    target: 'idle',
    actions: ['disableMotionTransitions']
  }
});

/**
 * Generates archetype-specific FSM contract.
 * 
 * @param {string} archetype KineticArchetype value
 * @param {object} [options]
 * @param {string} [options.capsuleSlug='capsule'] Capsule identifier
 * @param {string} [options.scaleVarName='--scale'] CSS custom property scaling factor
 * @returns {object} Zag/XState machine configuration
 */
function getFsmContractForArchetype(archetype, options = {}) {
  const capsuleSlug = options.capsuleSlug || 'capsule';
  const scaleVarName = options.scaleVarName || '--scale';

  switch (archetype) {
    case KineticArchetype.MAGNETIC_RAIL:
      return {
        id: `${capsuleSlug}-magnetic-rail-fsm`,
        initial: 'idle',
        context: {
          scrollProgress: 0,
          currentTranslateX: 0,
          scaleVar: scaleVarName,
          activeTween: null
        },
        states: {
          idle: {
            on: {
              SCROLL_DELTA: 'tracking',
              TOUCH_START: 'tracking',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          },
          tracking: {
            on: {
              SCROLL_DELTA: {
                actions: ['updateTranslateX', 'clampToRailBounds']
              },
              SCROLL_STOP: 'settling',
              CROSSFADE: 'crossfading',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          },
          crossfading: {
            entry: ['killTweensOf', 'captureCurrentOffset'],
            on: {
              CROSSFADE_COMPLETE: 'tracking',
              SCROLL_STOP: 'settling',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          },
          settling: {
            entry: ['snapToNearestCard'],
            on: {
              SCROLL_DELTA: 'tracking',
              SNAP_COMPLETE: 'idle',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          }
        },
        invariants: {
          preemptible: true,
          escapeReset: true,
          windowBlurReset: true,
          fluidMathPeg: `calc(-1 * var(${scaleVarName}))`
        }
      };

    case KineticArchetype.REVEAL_MASK:
      return {
        id: `${capsuleSlug}-reveal-mask-fsm`,
        initial: 'masked',
        context: {
          progress: 0,
          clipPathRect: 'inset(100% 0 0 0)'
        },
        states: {
          masked: {
            on: {
              ENTER_VIEWPORT: 'unmasking',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          },
          unmasking: {
            entry: ['startClipPathTween'],
            on: {
              UNMASK_COMPLETE: 'revealed',
              LEAVE_VIEWPORT: 'masked',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          },
          revealed: {
            on: {
              LEAVE_VIEWPORT: 'masked',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          }
        },
        invariants: {
          preemptible: true,
          escapeReset: true,
          windowBlurReset: true,
          fluidMathPeg: `overflow: hidden; clip-path: inset(0 0 0 0)`
        }
      };

    case KineticArchetype.DEPTH_FLOAT:
      return {
        id: `${capsuleSlug}-depth-float-fsm`,
        initial: 'idle',
        context: {
          tiltX: 0,
          tiltY: 0,
          scaleVar: scaleVarName
        },
        states: {
          idle: {
            on: {
              POINTER_ENTER: 'floating',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          },
          floating: {
            on: {
              POINTER_MOVE: {
                actions: ['calculate3dTransform']
              },
              POINTER_LEAVE: 'returning',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          },
          returning: {
            entry: ['easeToCenter'],
            on: {
              REST_COMPLETE: 'idle',
              POINTER_ENTER: 'floating',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          }
        },
        invariants: {
          preemptible: true,
          escapeReset: true,
          windowBlurReset: true,
          fluidMathPeg: `perspective(1000px) rotateX(...) rotateY(...)`
        }
      };

    case KineticArchetype.TACTILE_TRIGGER:
    default:
      return {
        id: `${capsuleSlug}-tactile-trigger-fsm`,
        initial: 'idle',
        context: {
          scale: 1,
          activeTween: null
        },
        states: {
          idle: {
            on: {
              POINTER_ENTER: 'hovered',
              POINTER_DOWN: 'pressed',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          },
          hovered: {
            entry: ['applyHoverScale'],
            on: {
              POINTER_LEAVE: 'idle',
              POINTER_DOWN: 'pressed',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          },
          pressed: {
            entry: ['applyActiveCompression'],
            on: {
              POINTER_UP: 'hovered',
              POINTER_LEAVE: 'idle',
              ...UNIVERSAL_SAFETY_TRANSITIONS
            }
          }
        },
        invariants: {
          preemptible: true,
          escapeReset: true,
          windowBlurReset: true,
          fluidMathPeg: `scale(calc(1 - 0.05 * var(${scaleVarName}, 1)))`
        }
      };
  }
}

module.exports = {
  getFsmContractForArchetype,
  UNIVERSAL_SAFETY_TRANSITIONS
};
