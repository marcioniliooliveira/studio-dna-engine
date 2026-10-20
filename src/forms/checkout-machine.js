'use strict';

/**
 * studio-dna v2.5 Checkout Statechart Machine
 * Multi-step e-commerce checkout flow with Zag.js / XState statechart semantics.
 * States: idle, validating, submitting, error, success
 * Steps: customer -> shipping -> payment -> review
 * Features: Modulo 11 CPF validation, Luhn credit card validation, CEP masking,
 * latency watchdog, draft recovery.
 */

const { createMachine } = require('../fsm/core/machine');
const {
  validateCPF,
  validateEmail,
  validatePhone,
  validateCEP,
  maskCPF,
  maskPhone,
  maskCEP,
  maskBRL,
  stripNonDigits
} = require('./masks');
const draftStorage = require('./draft-storage');

const DEFAULT_FORM_ID = 'jumpplay_checkout';
const DEFAULT_LATENCY_DELAY_MS = 1000;

const CHECKOUT_STEPS = ['customer', 'shipping', 'payment', 'review'];

const DEFAULT_INITIAL_VALUES = {
  // Step 1: Customer
  fullName: '',
  email: '',
  document: '', // CPF
  phone: '',

  // Step 2: Shipping
  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  shippingMethod: 'express', // 'standard' | 'express'

  // Step 3: Payment
  paymentMethod: 'credit_card', // 'credit_card' | 'pix' | 'boleto'
  cardNumber: '',
  cardHolder: '',
  cardExpiry: '',
  cardCvv: '',
  installments: '1',

  // Order data
  items: [],
  subtotal: 0,
  shippingCost: 0,
  totalAmount: 0
};

/**
 * Validates a credit card number using Luhn algorithm (modulo 10).
 * @param {string} cardNumber
 * @returns {boolean}
 */
function validateLuhn(cardNumber) {
  const digits = stripNonDigits(cardNumber);
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let alternate = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits.charAt(i), 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

/**
 * Validates card expiry MM/YY.
 * @param {string} expiry
 * @returns {boolean}
 */
function validateCardExpiry(expiry) {
  if (!expiry) return false;
  const cleaned = expiry.replace(/\D/g, '');
  if (cleaned.length !== 4) return false;

  const month = parseInt(cleaned.slice(0, 2), 10);
  const year = parseInt(cleaned.slice(2, 4), 10);

  if (month < 1 || month > 12) return false;

  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
}

/**
 * Formats credit card number into 4-digit groups (0000 0000 0000 0000).
 * @param {string} value
 * @returns {string}
 */
function maskCardNumber(value) {
  const digits = stripNonDigits(value).slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

/**
 * Formats card expiry MM/YY.
 * @param {string} value
 * @returns {string}
 */
function maskCardExpiry(value) {
  const digits = stripNonDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

/**
 * Formats display value for checkout fields.
 * @param {string} field
 * @param {string} value
 * @returns {string}
 */
function formatCheckoutField(field, value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  switch (field) {
    case 'document':
      return maskCPF(str);
    case 'phone':
      return maskPhone(str);
    case 'cep':
      return maskCEP(str);
    case 'cardNumber':
      return maskCardNumber(str);
    case 'cardExpiry':
      return maskCardExpiry(str);
    case 'totalAmount':
    case 'subtotal':
    case 'shippingCost':
      return typeof value === 'number' ? maskBRL(value) : str;
    default:
      return str;
  }
}

/**
 * Validates a single field within checkout.
 * @param {string} field
 * @param {any} value
 * @param {Object} allValues
 * @returns {string|null}
 */
function validateCheckoutField(field, value, allValues = {}) {
  const val = value !== undefined && value !== null ? String(value).trim() : '';

  switch (field) {
    // Customer step
    case 'fullName':
      if (!val || val.length < 3) return 'Informe o nome completo';
      return null;

    case 'email':
      if (!val) return 'Informe o e-mail para envio da confirmação';
      if (!validateEmail(val)) return 'E-mail em formato inválido';
      return null;

    case 'document': {
      if (!val) return 'Informe o CPF do titular';
      const digits = stripNonDigits(val);
      if (digits.length !== 11) return 'CPF deve conter 11 dígitos';
      if (!validateCPF(val)) return 'CPF inválido (dígitos verificadores incorretos)';
      return null;
    }

    case 'phone':
      if (!val) return 'Informe o telefone de contato com DDD';
      if (!validatePhone(val)) return 'Telefone inválido (insira DDD + número)';
      return null;

    // Shipping step
    case 'cep':
      if (!val) return 'Informe o CEP de entrega';
      if (!validateCEP(val)) return 'CEP inválido (deve conter 8 dígitos)';
      return null;

    case 'street':
      if (!val || val.length < 3) return 'Informe o endereço de entrega (logradouro)';
      return null;

    case 'number':
      if (!val) return 'Informe o número do endereço';
      return null;

    case 'neighborhood':
      if (!val || val.length < 2) return 'Informe o bairro';
      return null;

    case 'city':
      if (!val || val.length < 2) return 'Informe a cidade';
      return null;

    case 'state':
      if (!val || val.length < 2) return 'Informe o estado / UF';
      return null;

    // Payment step
    case 'paymentMethod':
      if (!['credit_card', 'pix', 'boleto'].includes(val)) return 'Selecione uma forma de pagamento válida';
      return null;

    case 'cardNumber':
      if (allValues.paymentMethod === 'credit_card') {
        if (!val) return 'Informe o número do cartão de crédito';
        if (!validateLuhn(val)) return 'Número de cartão inválido';
      }
      return null;

    case 'cardHolder':
      if (allValues.paymentMethod === 'credit_card') {
        if (!val || val.length < 3) return 'Informe o nome impresso no cartão';
      }
      return null;

    case 'cardExpiry':
      if (allValues.paymentMethod === 'credit_card') {
        if (!val) return 'Informe a validade (MM/AA)';
        if (!validateCardExpiry(val)) return 'Data de validade vencida ou inválida';
      }
      return null;

    case 'cardCvv':
      if (allValues.paymentMethod === 'credit_card') {
        const digits = stripNonDigits(val);
        if (digits.length < 3 || digits.length > 4) return 'CVV inválido (3 ou 4 dígitos)';
      }
      return null;

    default:
      return null;
  }
}

/**
 * Validates fields for a given step.
 * @param {string} step
 * @param {Object} values
 * @returns {Record<string, string>}
 */
function validateStep(step, values) {
  const errors = {};
  let fields = [];

  if (step === 'customer') {
    fields = ['fullName', 'email', 'document', 'phone'];
  } else if (step === 'shipping') {
    fields = ['cep', 'street', 'number', 'neighborhood', 'city', 'state'];
  } else if (step === 'payment') {
    fields = ['paymentMethod'];
    if (values.paymentMethod === 'credit_card') {
      fields.push('cardNumber', 'cardHolder', 'cardExpiry', 'cardCvv');
    }
  } else if (step === 'review') {
    // Review validates all previous steps
    return {
      ...validateStep('customer', values),
      ...validateStep('shipping', values),
      ...validateStep('payment', values)
    };
  }

  for (const f of fields) {
    const err = validateCheckoutField(f, values[f], values);
    if (err) errors[f] = err;
  }

  return errors;
}

/**
 * Creates initial checkout context.
 */
function createCheckoutContext(initialValues = {}, formId = DEFAULT_FORM_ID, storage = draftStorage) {
  const values = { ...DEFAULT_INITIAL_VALUES, ...initialValues };
  const displayValues = {};

  for (const [k, v] of Object.entries(values)) {
    displayValues[k] = formatCheckoutField(k, v);
  }

  const hasSavedDraft = storage.hasDraft(formId);

  return {
    values,
    displayValues,
    errors: {},
    touched: {},
    dirty: {},
    currentStep: 'customer',
    steps: CHECKOUT_STEPS,
    stepIndex: 0,
    isValid: false,
    isSubmitting: false,
    isValidating: false,
    submitCount: 0,
    orderId: null,
    hasSavedDraft,
    formId,
    lastError: null,
    latency: {
      startedAt: null,
      elapsedMs: 0,
      isDelayed: false
    }
  };
}

/**
 * Factory for Checkout Statechart Machine.
 * @param {Object} [options]
 * @returns {Object}
 */
function createCheckoutMachine(options = {}) {
  const formId = options.formId || DEFAULT_FORM_ID;
  const storage = options.storage || draftStorage;
  const latencyDelayMs = options.latencyDelayMs || DEFAULT_LATENCY_DELAY_MS;
  const autoSaveDraft = options.autoSaveDraft !== false;
  const submitHandler = typeof options.submitHandler === 'function' ? options.submitHandler : null;

  let latencyTimer = null;

  const machine = createMachine({
    id: `checkout-${formId}`,
    initial: 'idle',
    context: () => createCheckoutContext(options.initialValues, formId, storage),
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

                let rawValue = value;
                if (['document', 'phone', 'cep', 'cardNumber', 'cardCvv'].includes(field)) {
                  rawValue = stripNonDigits(value);
                }

                const newValues = { ...context.values, [field]: rawValue };
                const formatted = formatCheckoutField(field, value);
                const newDisplay = { ...context.displayValues, [field]: formatted };

                const newErrors = { ...context.errors };
                if (context.touched[field]) {
                  const err = validateCheckoutField(field, rawValue, newValues);
                  if (err) newErrors[field] = err;
                  else delete newErrors[field];
                }

                const stepErrors = validateStep(context.currentStep, newValues);
                const isValid = Object.keys(stepErrors).length === 0;

                if (autoSaveDraft) {
                  storage.saveDraft(formId, newValues);
                }

                return {
                  ...context,
                  values: newValues,
                  displayValues: newDisplay,
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
                const err = validateCheckoutField(field, context.values[field], context.values);
                const newErrors = { ...context.errors };

                if (err) newErrors[field] = err;
                else delete newErrors[field];

                const stepErrors = validateStep(context.currentStep, context.values);
                const isValid = Object.keys(stepErrors).length === 0;

                return {
                  ...context,
                  touched: newTouched,
                  errors: newErrors,
                  isValid
                };
              }
            ]
          },

          NEXT_STEP: {
            actions: [
              (context) => {
                const stepErrors = validateStep(context.currentStep, context.values);
                if (Object.keys(stepErrors).length > 0) {
                  // Mark all fields in current step touched and show errors
                  const touched = { ...context.touched };
                  for (const k of Object.keys(stepErrors)) {
                    touched[k] = true;
                  }
                  return {
                    ...context,
                    errors: { ...context.errors, ...stepErrors },
                    touched,
                    isValid: false
                  };
                }

                const nextIndex = Math.min(context.stepIndex + 1, CHECKOUT_STEPS.length - 1);
                const nextStep = CHECKOUT_STEPS[nextIndex];
                const nextStepErrors = validateStep(nextStep, context.values);

                return {
                  ...context,
                  currentStep: nextStep,
                  stepIndex: nextIndex,
                  isValid: Object.keys(nextStepErrors).length === 0
                };
              }
            ]
          },

          PREV_STEP: {
            actions: [
              (context) => {
                const prevIndex = Math.max(context.stepIndex - 1, 0);
                const prevStep = CHECKOUT_STEPS[prevIndex];
                return {
                  ...context,
                  currentStep: prevStep,
                  stepIndex: prevIndex
                };
              }
            ]
          },

          SET_STEP: {
            actions: [
              (context, event) => {
                const targetStep = event.step;
                const index = CHECKOUT_STEPS.indexOf(targetStep);
                if (index === -1) return context;
                return {
                  ...context,
                  currentStep: targetStep,
                  stepIndex: index
                };
              }
            ]
          },

          SET_PAYMENT_METHOD: {
            actions: [
              (context, event) => {
                const method = event.method;
                if (!['credit_card', 'pix', 'boleto'].includes(method)) return context;
                const newValues = { ...context.values, paymentMethod: method };
                const newErrors = { ...context.errors };
                if (method !== 'credit_card') {
                  delete newErrors.cardNumber;
                  delete newErrors.cardHolder;
                  delete newErrors.cardExpiry;
                  delete newErrors.cardCvv;
                }
                return {
                  ...context,
                  values: newValues,
                  errors: newErrors
                };
              }
            ]
          },

          SUBMIT: [
            {
              guard: (context) => {
                const allErrors = validateStep('review', context.values);
                return Object.keys(allErrors).length > 0;
              },
              target: 'error',
              actions: [
                (context) => {
                  const allErrors = validateStep('review', context.values);
                  const allTouched = { ...context.touched };
                  for (const k of Object.keys(allErrors)) {
                    allTouched[k] = true;
                  }
                  return {
                    ...context,
                    errors: allErrors,
                    touched: allTouched,
                    isValid: false,
                    submitCount: context.submitCount + 1,
                    lastError: 'Existem campos pendentes no checkout.'
                  };
                }
              ]
            },
            {
              target: 'submitting',
              actions: [
                (context) => ({
                  ...context,
                  errors: {},
                  isValid: true,
                  submitCount: context.submitCount + 1,
                  lastError: null
                })
              ]
            }
          ],

          RESTORE_DRAFT: {
            actions: [
              (context) => {
                const saved = storage.loadDraft(formId);
                if (!saved) return context;
                const newValues = { ...context.values, ...saved };
                const newDisplay = {};
                for (const [k, v] of Object.entries(newValues)) {
                  newDisplay[k] = formatCheckoutField(k, v);
                }
                return {
                  ...context,
                  values: newValues,
                  displayValues: newDisplay,
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
              () => createCheckoutContext(options.initialValues, formId, storage)
            ]
          }
        }
      },

      validating: {
        entry: [(context) => ({ ...context, isValidating: true })],
        on: {
          VALIDATE_SUCCESS: { target: 'idle', actions: [(c) => ({ ...c, isValidating: false })] },
          VALIDATE_FAIL: { target: 'error', actions: [(c) => ({ ...c, isValidating: false })] }
        }
      },

      submitting: {
        entry: [
          (context) => ({
            ...context,
            isSubmitting: true,
            latency: {
              startedAt: Date.now(),
              elapsedMs: 0,
              isDelayed: false
            }
          })
        ],
        on: {
          LATENCY_TICK: {
            actions: [
              (context, event) => {
                const now = (event && event.now) || Date.now();
                const startedAt = context.latency.startedAt || now;
                const elapsedMs = now - startedAt;
                return {
                  ...context,
                  latency: {
                    startedAt,
                    elapsedMs,
                    isDelayed: elapsedMs >= latencyDelayMs
                  }
                };
              }
            ]
          },
          SUBMIT_SUCCESS: {
            target: 'success',
            actions: [
              (context, event) => {
                const orderId = (event && event.orderId) || `JP-ORD-${Date.now().toString(36).toUpperCase()}`;
                storage.clearDraft(formId);
                return {
                  ...context,
                  isSubmitting: false,
                  orderId,
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
                lastError: (event && event.error) || 'Falha ao processar pagamento do checkout'
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
            return { ...context, isSubmitting: false };
          }
        ],
        on: {
          INPUT: { target: 'idle' },
          RETRY: { target: 'submitting' },
          RESET: { target: 'idle', actions: [() => createCheckoutContext(options.initialValues, formId, storage)] }
        }
      },

      success: {
        entry: [
          (context) => {
            if (latencyTimer) {
              clearInterval(latencyTimer);
              latencyTimer = null;
            }
            return { ...context, isSubmitting: false };
          }
        ],
        on: {
          RESET: { target: 'idle', actions: [() => createCheckoutContext(options.initialValues, formId, storage)] }
        }
      }
    }
  });

  const originalSend = machine.send;
  machine.send = function sendCheckout(event) {
    const eventObj = typeof event === 'string' ? { type: event } : event;
    const result = originalSend(eventObj);

    if (machine.state === 'submitting' && submitHandler && eventObj.type === 'SUBMIT') {
      Promise.resolve(submitHandler(machine.context.values))
        .then((res) => {
          machine.send({ type: 'SUBMIT_SUCCESS', orderId: res && res.orderId });
        })
        .catch((err) => {
          machine.send({ type: 'SUBMIT_ERROR', error: err && err.message ? err.message : String(err) });
        });
    }

    return result;
  };

  machine.tickLatency = function tickLatency(currentTimestamp) {
    return machine.send({ type: 'LATENCY_TICK', now: currentTimestamp });
  };

  return machine;
}

module.exports = {
  createCheckoutMachine,
  validateLuhn,
  validateCardExpiry,
  validateStep,
  validateCheckoutField,
  formatCheckoutField,
  CHECKOUT_STEPS,
  DEFAULT_INITIAL_VALUES,
  DEFAULT_FORM_ID
};
