'use strict';

/**
 * studio-dna v2.5 JumpPlay B2B Quote Statechart Machine
 * Governs quotation form lifecycle with Zag.js / XState statechart semantics.
 * States: idle, validating, submitting, error, success
 * Features: Modulo 11 validation, adaptive masks, latency watchdog, draft recovery.
 */

const { createMachine, assign } = require('../fsm/core/machine');
const {
  validateDocument,
  validateEmail,
  validatePhone,
  maskDocument,
  maskPhone,
  stripNonDigits
} = require('./masks');
const draftStorage = require('./draft-storage');

const DEFAULT_FORM_ID = 'jumpflex_b2b_quote';
const DEFAULT_LATENCY_DELAY_MS = 1000;

const DEFAULT_INITIAL_VALUES = {
  businessType: '',
  quantity: '',
  region: '',
  timeframe: 'Imediato',
  document: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  notes: ''
};

/**
 * Validates a single field.
 * @param {string} field
 * @param {any} value
 * @returns {string|null} Error message or null
 */
function validateField(field, value) {
  const val = value !== undefined && value !== null ? String(value).trim() : '';

  switch (field) {
    case 'businessType':
      if (!val) return 'Selecione o tipo de negócio';
      return null;

    case 'quantity': {
      if (!val) return 'Informe a quantidade estimada';
      const num = Number(val);
      if (!Number.isInteger(num) || num < 1) return 'Quantidade deve ser um número inteiro positivo';
      if (num > 100000) return 'Quantidade máxima permitida é 100.000 unidades';
      return null;
    }

    case 'region':
      if (!val || val.length < 2) return 'Informe a cidade e estado (ex.: São Paulo / SP)';
      return null;

    case 'timeframe':
      if (!val) return 'Selecione o prazo pretendido';
      return null;

    case 'document': {
      if (!val) return 'Informe o CNPJ ou CPF para a cotação';
      const digits = stripNonDigits(val);
      if (digits.length !== 11 && digits.length !== 14) {
        return 'Documento deve conter 11 (CPF) ou 14 dígitos (CNPJ)';
      }
      if (!validateDocument(val)) {
        return digits.length === 11
          ? 'CPF inválido (dígitos verificadores incorretos)'
          : 'CNPJ inválido (dígitos verificadores incorretos)';
      }
      return null;
    }

    case 'contactName':
      if (!val || val.length < 2) return 'Informe o nome do responsável para contato';
      return null;

    case 'contactEmail':
      if (!val) return 'Informe o e-mail corporativo';
      if (!validateEmail(val)) return 'E-mail corporativo em formato inválido';
      return null;

    case 'contactPhone':
      if (!val) return 'Informe o telefone ou celular com DDD';
      if (!validatePhone(val)) return 'Telefone inválido (insira DDD + 8 ou 9 dígitos)';
      return null;

    default:
      return null;
  }
}

/**
 * Validates all fields in values.
 * @param {Object} values
 * @returns {Record<string, string>} Map of field errors
 */
function validateAllFields(values) {
  const errors = {};
  const requiredFields = [
    'businessType',
    'quantity',
    'region',
    'document',
    'contactName',
    'contactEmail',
    'contactPhone'
  ];

  for (const field of requiredFields) {
    const error = validateField(field, values[field]);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

/**
 * Formats display value using adaptive masks.
 * @param {string} field
 * @param {string} value
 * @returns {string}
 */
function formatFieldValue(field, value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (field === 'document') {
    return maskDocument(str);
  }
  if (field === 'contactPhone') {
    return maskPhone(str);
  }
  return str;
}

/**
 * Creates initial context for JumpPlay B2B quote machine.
 * @param {Object} initialValues
 * @param {string} formId
 * @param {Object} storage
 * @returns {Object}
 */
function createInitialContext(initialValues = {}, formId = DEFAULT_FORM_ID, storage = draftStorage) {
  const mergedValues = { ...DEFAULT_INITIAL_VALUES, ...initialValues };
  const displayValues = {};

  for (const [key, val] of Object.entries(mergedValues)) {
    displayValues[key] = formatFieldValue(key, val);
  }

  const hasSavedDraft = storage.hasDraft(formId);

  return {
    values: mergedValues,
    displayValues,
    errors: {},
    touched: {},
    dirty: {},
    activeField: null,
    isValid: false,
    isSubmitting: false,
    isValidating: false,
    submitCount: 0,
    hasSavedDraft,
    formId,
    quoteId: null,
    lastError: null,
    confirmationToken: null,
    latency: {
      startedAt: null,
      elapsedMs: 0,
      isDelayed: false
    }
  };
}

/**
 * Factory for JumpPlay B2B Quote Machine.
 * @param {Object} [options]
 * @returns {Object} State machine instance
 */
function createB2BQuoteMachine(options = {}) {
  const formId = options.formId || DEFAULT_FORM_ID;
  const storage = options.storage || draftStorage;
  const latencyDelayMs = options.latencyDelayMs || DEFAULT_LATENCY_DELAY_MS;
  const autoSaveDraft = options.autoSaveDraft !== false;
  const submitHandler = typeof options.submitHandler === 'function' ? options.submitHandler : null;

  let latencyTimer = null;

  const machine = createMachine({
    id: `b2b-quote-${formId}`,
    initial: 'idle',
    context: () => createInitialContext(options.initialValues, formId, storage),
    states: {
      idle: {
        entry: [
          (context) => {
            if (latencyTimer) {
              clearInterval(latencyTimer);
              latencyTimer = null;
            }
            return {
              ...context,
              isSubmitting: false,
              isValidating: false,
              latency: { startedAt: null, elapsedMs: 0, isDelayed: false }
            };
          }
        ],
        on: {
          INPUT: {
            actions: [
              (context, event) => {
                const { field, value } = event;
                if (!field) return context;

                // Handle raw vs formatted values
                let rawValue = value;
                if (field === 'document' || field === 'contactPhone') {
                  rawValue = stripNonDigits(value);
                }

                const newValues = { ...context.values, [field]: rawValue };
                const formatted = formatFieldValue(field, value);
                const newDisplayValues = { ...context.displayValues, [field]: formatted };
                const newDirty = { ...context.dirty, [field]: true };

                // Validate if field was already touched
                const newErrors = { ...context.errors };
                if (context.touched[field]) {
                  const err = validateField(field, rawValue);
                  if (err) {
                    newErrors[field] = err;
                  } else {
                    delete newErrors[field];
                  }
                }

                const isValid = Object.keys(validateAllFields(newValues)).length === 0;

                // Auto-save draft
                if (autoSaveDraft) {
                  storage.saveDraft(formId, newValues);
                }

                return {
                  ...context,
                  values: newValues,
                  displayValues: newDisplayValues,
                  dirty: newDirty,
                  errors: newErrors,
                  isValid,
                  hasSavedDraft: autoSaveDraft ? true : context.hasSavedDraft
                };
              }
            ]
          },

          BLUR: {
            actions: [
              (context, event) => {
                const { field } = event;
                if (!field) return context;

                const newTouched = { ...context.touched, [field]: true };
                const err = validateField(field, context.values[field]);
                const newErrors = { ...context.errors };

                if (err) {
                  newErrors[field] = err;
                } else {
                  delete newErrors[field];
                }

                const isValid = Object.keys(validateAllFields(context.values)).length === 0;

                return {
                  ...context,
                  touched: newTouched,
                  errors: newErrors,
                  activeField: null,
                  isValid
                };
              }
            ]
          },

          FOCUS: {
            actions: [
              (context, event) => ({
                ...context,
                activeField: event.field || null
              })
            ]
          },

          VALIDATE: {
            target: 'validating'
          },

          SUBMIT: [
            {
              // Guard: if form has errors, transition to error state
              guard: (context) => {
                const errors = validateAllFields(context.values);
                return Object.keys(errors).length > 0;
              },
              target: 'error',
              actions: [
                (context) => {
                  const errors = validateAllFields(context.values);
                  const allTouched = {};
                  for (const k of Object.keys(context.values)) {
                    allTouched[k] = true;
                  }
                  return {
                    ...context,
                    errors,
                    touched: allTouched,
                    isValid: false,
                    submitCount: context.submitCount + 1,
                    lastError: 'Por favor, corrija os campos com erros antes de enviar.'
                  };
                }
              ]
            },
            {
              // Guard: form is valid, transition to submitting
              target: 'submitting',
              actions: [
                (context) => {
                  const allTouched = {};
                  for (const k of Object.keys(context.values)) {
                    allTouched[k] = true;
                  }
                  return {
                    ...context,
                    errors: {},
                    touched: allTouched,
                    isValid: true,
                    submitCount: context.submitCount + 1,
                    lastError: null
                  };
                }
              ]
            }
          ],

          RESTORE_DRAFT: {
            actions: [
              (context) => {
                const saved = storage.loadDraft(formId);
                if (!saved) return context;

                const restoredValues = { ...context.values, ...saved };
                const restoredDisplay = {};
                for (const [k, v] of Object.entries(restoredValues)) {
                  restoredDisplay[k] = formatFieldValue(k, v);
                }

                const isValid = Object.keys(validateAllFields(restoredValues)).length === 0;

                return {
                  ...context,
                  values: restoredValues,
                  displayValues: restoredDisplay,
                  isValid,
                  hasSavedDraft: false
                };
              }
            ]
          },

          DISCARD_DRAFT: {
            actions: [
              (context) => {
                storage.clearDraft(formId);
                return {
                  ...context,
                  hasSavedDraft: false
                };
              }
            ]
          },

          RESET: {
            actions: [
              () => createInitialContext(options.initialValues, formId, storage)
            ]
          }
        }
      },

      validating: {
        entry: [
          (context) => ({
            ...context,
            isValidating: true
          })
        ],
        on: {
          VALIDATE_SUCCESS: {
            target: 'idle',
            actions: [
              (context) => ({
                ...context,
                isValidating: false,
                isValid: true,
                errors: {}
              })
            ]
          },
          VALIDATE_FAIL: {
            target: 'error',
            actions: [
              (context, event) => ({
                ...context,
                isValidating: false,
                isValid: false,
                errors: event.errors || context.errors
              })
            ]
          }
        }
      },

      submitting: {
        entry: [
          (context) => {
            const now = Date.now();
            return {
              ...context,
              isSubmitting: true,
              latency: {
                startedAt: now,
                elapsedMs: 0,
                isDelayed: false
              }
            };
          }
        ],
        on: {
          LATENCY_TICK: {
            actions: [
              (context, event) => {
                const now = (event && event.now) || Date.now();
                const startedAt = context.latency.startedAt || now;
                const elapsedMs = now - startedAt;
                const isDelayed = elapsedMs >= latencyDelayMs;

                return {
                  ...context,
                  latency: {
                    startedAt,
                    elapsedMs,
                    isDelayed
                  }
                };
              }
            ]
          },

          SUBMIT_SUCCESS: {
            target: 'success',
            actions: [
              (context, event) => {
                const response = event.response || {};
                const quoteId = response.quoteId || `JP-QUOTE-${Date.now().toString(36).toUpperCase()}`;
                const confirmationToken = response.token || `TK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

                // Auto-cleanup draft on submission success
                storage.clearDraft(formId);

                return {
                  ...context,
                  isSubmitting: false,
                  quoteId,
                  confirmationToken,
                  hasSavedDraft: false,
                  lastError: null
                };
              }
            ]
          },

          SUBMIT_ERROR: {
            target: 'error',
            actions: [
              (context, event) => ({
                ...context,
                isSubmitting: false,
                lastError: (event && event.error) || 'Erro ao processar solicitação de cotação. Tente novamente.'
              })
            ]
          }
        }
      },

      error: {
        entry: [
          (context) => {
            if (latencyTimer) {
              clearInterval(latencyTimer);
              latencyTimer = null;
            }
            return {
              ...context,
              isSubmitting: false
            };
          }
        ],
        on: {
          INPUT: {
            target: 'idle',
            actions: [
              (context, event) => {
                // Return to idle and apply input
                const { field, value } = event;
                if (!field) return context;

                let rawValue = value;
                if (field === 'document' || field === 'contactPhone') {
                  rawValue = stripNonDigits(value);
                }

                const newValues = { ...context.values, [field]: rawValue };
                const formatted = formatFieldValue(field, value);
                const newDisplayValues = { ...context.displayValues, [field]: formatted };

                const newErrors = { ...context.errors };
                const err = validateField(field, rawValue);
                if (err) {
                  newErrors[field] = err;
                } else {
                  delete newErrors[field];
                }

                const isValid = Object.keys(validateAllFields(newValues)).length === 0;
                if (autoSaveDraft) {
                  storage.saveDraft(formId, newValues);
                }

                return {
                  ...context,
                  values: newValues,
                  displayValues: newDisplayValues,
                  errors: newErrors,
                  isValid
                };
              }
            ]
          },
          RETRY: {
            target: 'submitting'
          },
          RESET: {
            target: 'idle',
            actions: [
              () => createInitialContext(options.initialValues, formId, storage)
            ]
          }
        }
      },

      success: {
        entry: [
          (context) => {
            if (latencyTimer) {
              clearInterval(latencyTimer);
              latencyTimer = null;
            }
            return {
              ...context,
              isSubmitting: false
            };
          }
        ],
        on: {
          RESET: {
            target: 'idle',
            actions: [
              () => createInitialContext(options.initialValues, formId, storage)
            ]
          }
        }
      }
    }
  });

  // Watchdog helper
  const originalSend = machine.send;
  machine.send = function sendWithWatchdog(event) {
    const eventObj = typeof event === 'string' ? { type: event } : event;
    const result = originalSend(eventObj);

    // If we entered submitting and an async submitHandler is defined, execute it
    if (machine.state === 'submitting' && submitHandler && eventObj.type === 'SUBMIT') {
      // Start latency tick timer if in environment supporting timers
      if (typeof setInterval !== 'undefined') {
        latencyTimer = setInterval(() => {
          if (machine.state === 'submitting') {
            machine.send({ type: 'LATENCY_TICK' });
          } else {
            clearInterval(latencyTimer);
            latencyTimer = null;
          }
        }, 100);
      }

      Promise.resolve(submitHandler(machine.context.values))
        .then((res) => {
          machine.send({ type: 'SUBMIT_SUCCESS', response: res });
        })
        .catch((err) => {
          const errMsg = err && err.message ? err.message : String(err);
          machine.send({ type: 'SUBMIT_ERROR', error: errMsg });
        });
    }

    return result;
  };

  /**
   * Helper to manually trigger a latency tick (e.g. for deterministic unit testing).
   */
  machine.tickLatency = function tickLatency(currentTimestamp) {
    return machine.send({ type: 'LATENCY_TICK', now: currentTimestamp });
  };

  return machine;
}

module.exports = {
  createB2BQuoteMachine,
  validateField,
  validateAllFields,
  formatFieldValue,
  DEFAULT_INITIAL_VALUES,
  DEFAULT_FORM_ID,
  DEFAULT_LATENCY_DELAY_MS
};
