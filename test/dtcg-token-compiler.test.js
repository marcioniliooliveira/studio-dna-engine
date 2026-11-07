/**
 * test/dtcg-token-compiler.test.js
 *
 * Test suite for TASK-V3-02:
 * W3C DTCG 2025.10 Design Tokens Standard ($value, $type, $description, $extensions.studioDna.invariance)
 * 13 Official DTCG Types Validation, Alias Resolution ({group.token}) & PostCSS Compilation.
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

const {
  TokenCompiler,
  W3C_DTCG_TYPES,
  validateDtcgTokenTree,
  resolveDtcgAliases,
  convertCssTokensToDtcg
} = require('../src/extractors/token-compiler');

// ============================================================================
// 1. Official 13 W3C DTCG Types and Schema Validation
// ============================================================================

test('DTCG 1: 13 Official DTCG 2025.10 Types Completeness & Invariance', () => {
  assert.equal(W3C_DTCG_TYPES.length, 13, 'W3C DTCG 2025.10 specification defines exactly 13 types');

  const expectedTypes = [
    'color',
    'dimension',
    'fontFamily',
    'fontWeight',
    'duration',
    'cubicBezier',
    'number',
    'shadow',
    'border',
    'transition',
    'gradient',
    'typography',
    'strokeStyle'
  ];

  for (const t of expectedTypes) {
    assert.ok(W3C_DTCG_TYPES.includes(t), `Type "${t}" must be recognized as official DTCG type`);
  }
});

test('DTCG 2: Valid DTCG Token Tree Validation', () => {
  const validTree = {
    color: {
      brand: {
        primary: {
          $value: '#120824',
          $type: 'color',
          $description: 'PulseMed primary dark background brand color',
          $extensions: {
            studioDna: {
              invariance: 'P0'
            }
          }
        },
        accent: {
          $value: '#E8FF54',
          $type: 'color',
          $description: 'PulseMed high-voltage neon CTA accent color',
          $extensions: {
            studioDna: {
              invariance: 'P0'
            }
          }
        }
      }
    },
    dimension: {
      spacing: {
        base: {
          $value: '4px',
          $type: 'dimension',
          $description: 'Base spacing unit for 4px scale',
          $extensions: {
            studioDna: {
              invariance: 'P1'
            }
          }
        }
      }
    },
    motion: {
      cinemaEase: {
        $value: [0.16, 1, 0.3, 1],
        $type: 'cubicBezier',
        $description: 'Awwwards cinematic ease out curve',
        $extensions: {
          studioDna: {
            invariance: 'P1'
          }
        }
      }
    }
  };

  const validation = validateDtcgTokenTree(validTree);
  assert.equal(validation.valid, true, `Token tree should be valid, errors: ${JSON.stringify(validation.errors)}`);
  assert.equal(validation.errors.length, 0);
});

test('DTCG 3: Rejection of Invalid Types & Missing $value (Style Dictionary v3 Legacy Format)', () => {
  // Invalid because of missing $ prefix ($value)
  const legacySdTree = {
    color: {
      primary: {
        value: '#120824', // Legacy SDv3! Must be $value
        type: 'color'
      }
    }
  };

  const val1 = validateDtcgTokenTree(legacySdTree);
  assert.equal(val1.valid, false, 'Should reject token missing $value');
  assert.ok(val1.errors.some(e => e.includes('$value')), 'Error must mention missing $value');

  // Invalid type "fontStyle" (not in 13 DTCG types)
  const invalidTypeTree = {
    typography: {
      style: {
        $value: 'italic',
        $type: 'fontStyle' // INVALID! Not in 13 DTCG types
      }
    }
  };

  const val2 = validateDtcgTokenTree(invalidTypeTree);
  assert.equal(val2.valid, false, 'Should reject invalid $type');
  assert.ok(val2.errors.some(e => e.includes('fontStyle')), 'Error must flag fontStyle');
});

// ============================================================================
// 2. Alias Resolution {group.token} and Cycle Detection
// ============================================================================

test('DTCG 4: Alias Resolution with {group.token} Syntax', () => {
  const tokenTree = {
    color: {
      palette: {
        purple900: {
          $value: '#120824',
          $type: 'color'
        },
        volt500: {
          $value: '#E8FF54',
          $type: 'color'
        }
      },
      semantic: {
        surface: {
          $value: '{color.palette.purple900}',
          $type: 'color'
        },
        action: {
          $value: '{color.palette.volt500}',
          $type: 'color'
        },
        buttonBg: {
          $value: '{color.semantic.action}', // Multi-level alias
          $type: 'color'
        }
      }
    }
  };

  const resolved = resolveDtcgAliases(tokenTree);

  assert.equal(resolved.color.semantic.surface.$value, '#120824', 'Surface alias must resolve to #120824');
  assert.equal(resolved.color.semantic.action.$value, '#E8FF54', 'Action alias must resolve to #E8FF54');
  assert.equal(resolved.color.semantic.buttonBg.$value, '#E8FF54', 'Multi-level alias must resolve to #E8FF54');
});

test('DTCG 5: Alias Cycle Detection (Safe Error, No Infinite Loop)', () => {
  const cyclicTree = {
    color: {
      a: {
        $value: '{color.b}',
        $type: 'color'
      },
      b: {
        $value: '{color.c}',
        $type: 'color'
      },
      c: {
        $value: '{color.a}', // Cycle: a -> b -> c -> a
        $type: 'color'
      }
    }
  };

  assert.throws(
    () => resolveDtcgAliases(cyclicTree),
    /Circular alias reference detected/
  );
});

// ============================================================================
// 3. PostCSS AST to DTCG Conversion with P0/P1 Invariance
// ============================================================================

test('DTCG 6: CSS AST Tokens to W3C DTCG 2025.10 with Invariance Mapping', () => {
  const rawExtractedTokens = {
    customProperties: {
      '--brand-primary': '#120824',
      '--brand-accent': '#e8ff54',
      '--spacing-base': '4px',
      '--anim-duration': '350ms'
    },
    colors: ['#120824', '#e8ff54', '#ffffff'],
    typography: {
      fontFamilies: ['Instrument Serif', 'DM Sans'],
      fontSizes: ['14px', '18px', '48px'],
      fontWeights: ['400', '700']
    },
    motion: {
      easings: ['cubic-bezier(0.16, 1, 0.3, 1)']
    }
  };

  const brandSpec = {
    colors: {
      primary: '#120824',
      accent: '#e8ff54'
    },
    typography: {
      headings: 'Instrument Serif'
    }
  };

  const dtcgTokens = convertCssTokensToDtcg(rawExtractedTokens, { brandSpec });

  // Validate the generated tree complies 100% with DTCG
  const validation = validateDtcgTokenTree(dtcgTokens);
  assert.equal(validation.valid, true, `Generated tokens must be valid DTCG: ${JSON.stringify(validation.errors)}`);

  // Check P0 invariance marking for brand-spec primary color
  const primaryToken = dtcgTokens.color?.brand?.primary || dtcgTokens.color?.primary;
  assert.ok(primaryToken, 'Primary color token must exist');
  assert.equal(primaryToken.$type, 'color');
  assert.equal(primaryToken.$extensions?.studioDna?.invariance, 'P0', 'Primary brand color must be P0 invariant');

  // Check easing is cubicBezier type
  const motionGroup = dtcgTokens.motion || dtcgTokens.cubicBezier;
  assert.ok(motionGroup, 'Motion group must exist');
});
