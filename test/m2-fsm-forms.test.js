'use strict';

/**
 * Test Suite: M2 Zag/XState FSM Form Primitives & Validation
 * Verifies:
 * 1. Pure vanilla JS micro-FSM engine (states, context, events, guards, actions, subscriptions).
 * 2. Zag-style DOM accessibility connector (aria-invalid, aria-busy, disabled, data-state, alert roles).
 * 3. JumpPlay B2B quote flow statechart (states, validation, submission, latency feedback).
 * 4. Checkout state machine (multi-step, payment validation, Luhn algorithm).
 * 5. Adaptive input masks & Modulo 11 check digits (dynamic CNPJ/CPF, phone, CEP, BRL, caret tracking).
 * 6. LocalStorage draft persistence (24h TTL, auto-cleanup, checksum integrity).
 */

const test = require('node:test');
const assert = require('node:assert/strict');

const { createMachine, assign } = require('../src/fsm/core/machine');
const { connect, bindToDOM } = require('../src/fsm/core/connect');
const {
  validateCPF,
  validateCNPJ,
  validateDocument,
  validateCEP,
  validatePhone,
  validateEmail,
  maskCPF,
  maskCNPJ,
  maskDocument,
  maskPhone,
  maskCEP,
  maskBRL,
  unmaskBRL,
  applyMaskWithCaret,
  stripNonDigits
} = require('../src/forms/masks');
const {
  createDraftStorage,
  MemoryStorage,
  computeChecksum
} = require('../src/forms/draft-storage');
const {
  createB2BQuoteMachine,
  validateField,
  validateAllFields
} = require('../src/forms/b2b-quote-machine');
const {
  createCheckoutMachine,
  validateLuhn,
  validateCardExpiry,
  validateStep
} = require('../src/forms/checkout-machine');

// ============================================================================
// 1. Pure Vanilla JS Micro-FSM Core Tests
// ============================================================================

test('FSM Core: initializes with initial state and context snapshot', () => {
  const machine = createMachine({
    id: 'test-fsm',
    initial: 'idle',
    context: { count: 0, text: 'init' },
    states: {
      idle: {
        on: { INCREMENT: 'active' }
      },
      active: {}
    }
  });

  assert.equal(machine.state, 'idle');
  assert.equal(machine.context.count, 0);
  assert.equal(machine.matches('idle'), true);
  assert.equal(machine.matches('active'), false);
  assert.equal(machine.can('INCREMENT'), true);
  assert.equal(machine.can('UNKNOWN'), false);
});

test('FSM Core: deterministic state transitions, actions, and guards', () => {
  let exitFired = false;
  let entryFired = false;
  let actionFired = false;

  const machine = createMachine({
    id: 'guarded-fsm',
    initial: 'off',
    context: { power: 10 },
    states: {
      off: {
        exit: [() => { exitFired = true; }],
        on: {
          TURN_ON: [
            {
              guard: (ctx) => ctx.power < 5,
              target: 'low_battery'
            },
            {
              guard: (ctx) => ctx.power >= 5,
              target: 'on',
              actions: [
                () => { actionFired = true; },
                assign((ctx) => ({ power: ctx.power - 1 }))
              ]
            }
          ]
        }
      },
      on: {
        entry: [() => { entryFired = true; }],
        on: {
          TURN_OFF: 'off'
        }
      },
      low_battery: {}
    }
  });

  assert.equal(machine.state, 'off');
  const transitioned = machine.send({ type: 'TURN_ON' });

  assert.equal(transitioned, true);
  assert.equal(machine.state, 'on');
  assert.equal(exitFired, true);
  assert.equal(actionFired, true);
  assert.equal(entryFired, true);
  assert.equal(machine.context.power, 9);
});

test('FSM Core: prevents invalid / impossible transitions', () => {
  const machine = createMachine({
    id: 'strict-fsm',
    initial: 'idle',
    context: {},
    states: {
      idle: {
        on: { START: 'running' }
      },
      running: {
        on: { STOP: 'idle' }
      }
    }
  });

  // Sending STOP when in idle is invalid and must be rejected
  const handled = machine.send({ type: 'STOP' });
  assert.equal(handled, false);
  assert.equal(machine.state, 'idle');

  // Transition to running
  machine.send({ type: 'START' });
  assert.equal(machine.state, 'running');

  // Sending START again when running is dropped
  const doubleStart = machine.send({ type: 'START' });
  assert.equal(doubleStart, false);
  assert.equal(machine.state, 'running');
});

test('FSM Core: subscriptions receive immediate snapshot and subsequent updates', () => {
  const machine = createMachine({
    id: 'sub-fsm',
    initial: 'step1',
    context: { step: 1 },
    states: {
      step1: { on: { NEXT: 'step2' } },
      step2: {}
    }
  });

  const observed = [];
  const unsubscribe = machine.subscribe((snap) => {
    observed.push(snap.value);
  });

  assert.deepEqual(observed, ['step1']);

  machine.send({ type: 'NEXT' });
  assert.deepEqual(observed, ['step1', 'step2']);

  unsubscribe();
  machine.send({ type: 'NEXT' });
  assert.equal(observed.length, 2); // Unsubscribed, no extra updates
});

// ============================================================================
// 2. Modulo 11 Check Digits & Adaptive Mask Tests
// ============================================================================

test('Masks: Brazilian CPF Modulo 11 check digits validation', () => {
  // Known valid CPFs
  assert.equal(validateCPF('52998224725'), true);
  assert.equal(validateCPF('529.982.247-25'), true);
  assert.equal(validateCPF('11144477735'), true);

  // Inverted / bad check digits
  assert.equal(validateCPF('52998224726'), false);
  assert.equal(validateCPF('12345678900'), false);

  // Identical digits (blacklisted in Brazil)
  assert.equal(validateCPF('00000000000'), false);
  assert.equal(validateCPF('11111111111'), false);
  assert.equal(validateCPF('99999999999'), false);

  // Incorrect length
  assert.equal(validateCPF('123456789'), false);
  assert.equal(validateCPF('123456789012'), false);
});

test('Masks: Brazilian CNPJ Modulo 11 check digits validation', () => {
  // Known valid CNPJs (Banco do Brasil: 00.000.000/0001-91; Petrobras: 33.000.167/0001-01)
  assert.equal(validateCNPJ('00000000000191'), true);
  assert.equal(validateCNPJ('00.000.000/0001-91'), true);
  assert.equal(validateCNPJ('33000167000101'), true);
  assert.equal(validateCNPJ('33.000.167/0001-01'), true);

  // Bad check digits
  assert.equal(validateCNPJ('00000000000192'), false);
  assert.equal(validateCNPJ('12345678000100'), false);

  // Identical digits
  assert.equal(validateCNPJ('00000000000000'), false);
  assert.equal(validateCNPJ('11111111111111'), false);

  // Invalid lengths
  assert.equal(validateCNPJ('123456780001'), false);
});

test('Masks: Dynamic Document mask adapts between CPF and CNPJ', () => {
  // Partial CPF
  assert.equal(maskDocument('123'), '123');
  assert.equal(maskDocument('1234'), '123.4');
  assert.equal(maskDocument('12345678901'), '123.456.789-01');

  // Dynamic CNPJ expansion when typing 12th to 14th digits
  assert.equal(maskDocument('123456780001'), '12.345.678/0001');
  assert.equal(maskDocument('12345678000190'), '12.345.678/0001-90');

  // validateDocument routing
  assert.equal(validateDocument('529.982.247-25'), true);
  assert.equal(validateDocument('00.000.000/0001-91'), true);
  assert.equal(validateDocument('123.456.789-00'), false);
});

test('Masks: Dynamic Phone, CEP, and BRL Currency masking', () => {
  // Landline (10 digits)
  assert.equal(maskPhone('1134567890'), '(11) 3456-7890');
  // Mobile (11 digits)
  assert.equal(maskPhone('11987654321'), '(11) 98765-4321');
  // International prefix
  assert.equal(maskPhone('+5511987654321'), '+55 (11) 98765-4321');

  // Phone validation
  assert.equal(validatePhone('(11) 98765-4321'), true);
  assert.equal(validatePhone('(11) 3456-7890'), true);
  assert.equal(validatePhone('123'), false); // Too short
  assert.equal(validatePhone('(05) 98765-4321'), false); // Invalid DDD 05

  // CEP
  assert.equal(maskCEP('01310100'), '01310-100');
  assert.equal(validateCEP('01310-100'), true);
  assert.equal(validateCEP('00000-000'), false); // All identical

  // Currency
  assert.equal(maskBRL(1234.56), 'R$ 1.234,56');
  assert.equal(maskBRL('123456'), 'R$ 1.234,56');
  assert.equal(unmaskBRL('R$ 1.234,56'), 1234.56);
});

test('Masks: Caret tracking algorithm preserves user cursor offset across punctuation insertion', () => {
  // Case 1: Typing digit inside CPF (from 123.45|6 to 123.459|.6)
  // User had cursor after '5' (offset 6 in "123.456")
  const prev = '123.456';
  const next = '123.4596'; // user typed '9' at index 6
  const cursor = 7;

  const result = applyMaskWithCaret(maskCPF, prev, next, cursor);
  // In masked output "123.459.6", raw characters before cursor are '1','2','3','4','5','9' (6 digits).
  // The 6th digit in "123.459.6" is '9' at index 6, so next cursor should be at index 7!
  assert.equal(result.maskedValue, '123.459.6');
  assert.equal(result.nextCursorPosition, 7);
  assert.equal(result.rawValue, '1234596');

  // Case 2: Cursor at start
  const startResult = applyMaskWithCaret(maskCPF, '', '1', 1);
  assert.equal(startResult.maskedValue, '1');
  assert.equal(startResult.nextCursorPosition, 1);
});

// ============================================================================
// 3. LocalStorage Draft Persistence Tests
// ============================================================================

test('Draft Storage: saves, loads, and verifies checksum integrity', () => {
  const mem = new MemoryStorage();
  const storage = createDraftStorage({ storage: mem });

  const formValues = {
    businessType: 'Revenda',
    quantity: 50,
    region: 'SP',
    contactName: 'JumpPlay Partner'
  };

  const saved = storage.saveDraft('test_form', formValues);
  assert.equal(saved, true);
  assert.equal(storage.hasDraft('test_form'), true);

  const loaded = storage.loadDraft('test_form');
  assert.deepEqual(loaded, formValues);

  const meta = storage.getDraftMetadata('test_form');
  assert.equal(meta.formId, 'test_form');
  assert.equal(meta.isExpired, false);
  assert.equal(meta.version, '2.5.0');
});

test('Draft Storage: strictly enforces 24h TTL expiration', () => {
  const mem = new MemoryStorage();
  const ttlMs = 1000; // 1 second TTL for test
  const storage = createDraftStorage({ storage: mem, defaultTtlMs: ttlMs });

  const now = 1700000000000;
  storage.saveDraft('expiring_form', { item: 'sample' }, { now });

  // Valid immediately
  assert.deepEqual(storage.loadDraft('expiring_form', { now: now + 500 }), { item: 'sample' });

  // Expired at now + 1500ms
  const expired = storage.loadDraft('expiring_form', { now: now + 1500 });
  assert.equal(expired, null);
  assert.equal(storage.hasDraft('expiring_form', { now: now + 1500 }), false);
});

test('Draft Storage: autoCleanup removes all expired drafts across storage', () => {
  const mem = new MemoryStorage();
  const storage = createDraftStorage({ storage: mem });

  const t0 = 1000000;
  const ttl = 10000; // 10s

  storage.saveDraft('form_a', { a: 1 }, { now: t0, ttlMs: ttl });
  storage.saveDraft('form_b', { b: 2 }, { now: t0 + 10000, ttlMs: ttl }); // saved at +10s, ttl 10s (expires at +20s)

  // At t0 + 15s: form_a is expired (15s > 10s), form_b is not (5s < 10s)
  const cleaned = storage.autoCleanup({ now: t0 + 15000 });
  assert.equal(cleaned, 1);
  assert.equal(storage.hasDraft('form_a', { now: t0 + 15000 }), false);
  assert.equal(storage.hasDraft('form_b', { now: t0 + 15000 }), true);
});

// ============================================================================
// 4. Zag-Style DOM Accessibility Connector Tests
// ============================================================================

test('Connect: provides WCAG 2.2 AA compliant prop getters and aria bindings', () => {
  const machine = createB2BQuoteMachine({
    autoSaveDraft: false,
    initialValues: {
      businessType: '',
      contactEmail: 'invalid-email'
    }
  });

  // Connect Zag API
  const api = connect(machine);

  // Root form props
  const rootProps = api.getRootProps();
  assert.equal(rootProps.role, 'form');
  assert.equal(rootProps.noValidate, true);
  assert.equal(rootProps['data-state'], 'idle');
  assert.equal(rootProps['aria-busy'], 'false');

  // Input props before touch/error
  const emailProps = api.getInputProps('contactEmail');
  assert.equal(emailProps.id, 'field-contactEmail');
  assert.equal(emailProps.name, 'contactEmail');
  assert.equal(emailProps.disabled, false);
  assert.equal(emailProps['aria-invalid'], 'false');

  // Submit button
  const submitProps = api.getSubmitButtonProps();
  assert.equal(submitProps.type, 'submit');
  assert.equal(submitProps['aria-busy'], 'false');

  // Trigger SUBMIT to force validation errors
  machine.send({ type: 'SUBMIT' });

  // Reconnect with updated state
  const updatedApi = connect(machine);
  assert.equal(updatedApi.state, 'error');

  const errorEmailProps = updatedApi.getInputProps('contactEmail');
  assert.equal(errorEmailProps['aria-invalid'], 'true');
  assert.equal(errorEmailProps['aria-describedby'], 'error-contactEmail');
  assert.equal(errorEmailProps['data-state'], 'invalid');

  const errorMsgProps = updatedApi.getErrorMessageProps('contactEmail');
  assert.equal(errorMsgProps.role, 'alert');
  assert.equal(errorMsgProps['aria-live'], 'polite');
  assert.equal(errorMsgProps['data-visible'], 'true');
  assert.equal(errorMsgProps.hidden, false);
  assert.match(errorMsgProps.children, /e-mail/i);
});

test('Connect: binds to DOM elements and handles events and state sync', () => {
  // Mock DOM form
  const listeners = {};
  const attrs = {};
  const mockForm = {
    setAttribute(k, v) { attrs[k] = v; },
    getAttribute(k) { return attrs[k]; },
    addEventListener(evt, fn) { listeners[evt] = fn; },
    removeEventListener(evt) { delete listeners[evt]; },
    querySelector() { return null; },
    querySelectorAll() { return []; }
  };

  const machine = createMachine({
    id: 'mock-dom-machine',
    initial: 'idle',
    states: {
      idle: { on: { SUBMIT: 'submitting' } },
      submitting: {}
    }
  });

  const unbind = bindToDOM(mockForm, machine);
  assert.equal(attrs['data-state'], 'idle');
  assert.equal(attrs['aria-busy'], 'false');

  // Trigger form submit listener
  listeners.submit({ preventDefault() {} });
  assert.equal(attrs['data-state'], 'submitting');
  assert.equal(attrs['aria-busy'], 'true');

  unbind();
  assert.equal(listeners.submit, undefined);
});

// ============================================================================
// 5. JumpPlay B2B Quote Flow State Machine Tests
// ============================================================================

test('B2B Quote Machine: complete lifecycle (idle -> validation -> submit -> success)', () => {
  const mem = new MemoryStorage();
  const storage = createDraftStorage({ storage: mem });

  const machine = createB2BQuoteMachine({
    storage,
    formId: 'test_b2b_quote',
    autoSaveDraft: true
  });

  assert.equal(machine.state, 'idle');
  assert.equal(machine.context.isSubmitting, false);

  // 1. Input valid values
  machine.send({ type: 'INPUT', field: 'businessType', value: 'Reseller' });
  machine.send({ type: 'INPUT', field: 'quantity', value: '15' });
  machine.send({ type: 'INPUT', field: 'region', value: 'São Paulo / SP' });
  machine.send({ type: 'INPUT', field: 'timeframe', value: 'Imediato' });
  // Valid CNPJ: 00.000.000/0001-91
  machine.send({ type: 'INPUT', field: 'document', value: '00000000000191' });
  machine.send({ type: 'INPUT', field: 'contactName', value: 'Carlos Silva' });
  machine.send({ type: 'INPUT', field: 'contactEmail', value: 'carlos@jumpflex.com' });
  machine.send({ type: 'INPUT', field: 'contactPhone', value: '11987654321' });

  // Verify display values were formatted adaptively
  assert.equal(machine.context.displayValues.document, '00.000.000/0001-91');
  assert.equal(machine.context.displayValues.contactPhone, '(11) 98765-4321');
  assert.equal(machine.context.isValid, true);

  // Verify draft was saved
  assert.equal(storage.hasDraft('test_b2b_quote'), true);

  // 2. Submit form
  machine.send({ type: 'SUBMIT' });
  assert.equal(machine.state, 'submitting');
  assert.equal(machine.context.isSubmitting, true);
  assert.notEqual(machine.context.latency.startedAt, null);

  // 3. Prevent double-click while submitting
  const doubleSubmitHandled = machine.send({ type: 'SUBMIT' });
  assert.equal(doubleSubmitHandled, false); // Guarded
  assert.equal(machine.state, 'submitting');

  // 4. Receive submission success
  machine.send({
    type: 'SUBMIT_SUCCESS',
    response: { quoteId: 'JP-QUOTE-2026-X1', token: 'AUTH-1234' }
  });

  assert.equal(machine.state, 'success');
  assert.equal(machine.context.quoteId, 'JP-QUOTE-2026-X1');
  assert.equal(machine.context.isSubmitting, false);

  // Draft must be cleared upon successful submission
  assert.equal(storage.hasDraft('test_b2b_quote'), false);
});

test('B2B Quote Machine: latency watchdog triggers delayed notice after 1000ms', () => {
  const machine = createB2BQuoteMachine({
    initialValues: {
      businessType: 'Gym',
      quantity: 5,
      region: 'RJ',
      document: '00000000000191',
      contactName: 'Ana Paula',
      contactEmail: 'ana@example.com',
      contactPhone: '21987654321'
    }
  });

  machine.send({ type: 'SUBMIT' });
  assert.equal(machine.state, 'submitting');

  const startedAt = machine.context.latency.startedAt;

  // Latency at 300ms: not delayed
  machine.tickLatency(startedAt + 300);
  assert.equal(machine.context.latency.isDelayed, false);
  assert.equal(machine.context.latency.elapsedMs, 300);

  // Latency at 1200ms (> 1000ms): isDelayed becomes true
  machine.tickLatency(startedAt + 1200);
  assert.equal(machine.context.latency.isDelayed, true);
  assert.equal(machine.context.latency.elapsedMs, 1200);

  // Connect API displays delayed notice
  const api = connect(machine);
  assert.equal(api.isDelayed, true);
  const delayedProps = api.getDelayedNoticeProps();
  assert.equal(delayedProps['data-visible'], 'true');
  assert.equal(delayedProps.hidden, false);
  assert.match(delayedProps.children, /processando cotação/i);
});

test('B2B Quote Machine: draft recovery restores values seamlessly', () => {
  const mem = new MemoryStorage();
  const storage = createDraftStorage({ storage: mem });

  // Pre-seed draft
  storage.saveDraft('restore_test', {
    businessType: 'Hotel/Resort',
    quantity: '30',
    region: 'Curitiba / PR',
    contactName: 'Roberto Gomez',
    contactEmail: 'roberto@resort.com'
  });

  const machine = createB2BQuoteMachine({
    storage,
    formId: 'restore_test',
    autoSaveDraft: false
  });

  assert.equal(machine.context.hasSavedDraft, true);
  assert.equal(machine.context.values.businessType, ''); // Still empty initially

  // Restore draft
  machine.send({ type: 'RESTORE_DRAFT' });
  assert.equal(machine.context.values.businessType, 'Hotel/Resort');
  assert.equal(machine.context.values.quantity, '30');
  assert.equal(machine.context.values.region, 'Curitiba / PR');
  assert.equal(machine.context.values.contactName, 'Roberto Gomez');
});

// ============================================================================
// 6. Checkout Flow State Machine Tests
// ============================================================================

test('Checkout Machine: Luhn credit card and expiry verification', () => {
  // Luhn algorithm verification
  assert.equal(validateLuhn('4532015112830366'), true); // Valid Visa test number
  assert.equal(validateLuhn('4532015112830367'), false); // Invalid check digit
  assert.equal(validateLuhn('123'), false); // Too short

  // Expiry verification
  assert.equal(validateCardExpiry('12/35'), true); // Future year 2035
  assert.equal(validateCardExpiry('01/20'), false); // Past year 2020
  assert.equal(validateCardExpiry('13/28'), false); // Invalid month 13
});

test('Checkout Machine: multi-step flow (customer -> shipping -> payment -> review -> submit)', () => {
  const machine = createCheckoutMachine({
    autoSaveDraft: false,
    initialValues: {
      // Step 1: Customer
      fullName: 'Carlos Santos',
      email: 'carlos@gmail.com',
      document: '52998224725', // Valid CPF
      phone: '11987654321',

      // Step 2: Shipping
      cep: '01310100',
      street: 'Av Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',

      // Step 3: Payment
      paymentMethod: 'pix'
    }
  });

  assert.equal(machine.context.currentStep, 'customer');

  // Customer step is valid, advance to shipping
  machine.send({ type: 'NEXT_STEP' });
  assert.equal(machine.context.currentStep, 'shipping');

  // Shipping step is valid, advance to payment
  machine.send({ type: 'NEXT_STEP' });
  assert.equal(machine.context.currentStep, 'payment');

  // Switch to credit card: requires card details
  machine.send({ type: 'SET_PAYMENT_METHOD', method: 'credit_card' });
  assert.equal(machine.context.values.paymentMethod, 'credit_card');

  // Next step should fail because card details are missing
  machine.send({ type: 'NEXT_STEP' });
  assert.equal(machine.context.currentStep, 'payment');
  assert.equal(Boolean(machine.context.errors.cardNumber), true);

  // Fill valid card details
  machine.send({ type: 'INPUT', field: 'cardNumber', value: '4532015112830366' });
  machine.send({ type: 'INPUT', field: 'cardHolder', value: 'CARLOS SANTOS' });
  machine.send({ type: 'INPUT', field: 'cardExpiry', value: '12/35' });
  machine.send({ type: 'INPUT', field: 'cardCvv', value: '123' });

  // Now payment step is valid, advance to review
  machine.send({ type: 'NEXT_STEP' });
  assert.equal(machine.context.currentStep, 'review');

  // Submit checkout
  machine.send({ type: 'SUBMIT' });
  assert.equal(machine.state, 'submitting');

  // Confirm payment
  machine.send({ type: 'SUBMIT_SUCCESS', orderId: 'JP-ORD-9988' });
  assert.equal(machine.state, 'success');
  assert.equal(machine.context.orderId, 'JP-ORD-9988');
});

// ============================================================================
// 7. Additional Edge Case & Adversarial Tests
// ============================================================================

test('FSM Core: rejects invalid configuration types', () => {
  assert.throws(() => createMachine(null), /must be an object/i);
  assert.throws(() => createMachine({}), /initial/i);
  assert.throws(() => createMachine({ initial: 'start' }), /states/i);
  assert.throws(() => createMachine({ initial: 'missing', states: { other: {} } }), /Initial state "missing"/i);
});

test('FSM Core: handles internal transitions without state change', () => {
  let count = 0;
  const machine = createMachine({
    id: 'internal-fsm',
    initial: 'idle',
    context: { count: 0 },
    states: {
      idle: {
        on: {
          PING: {
            actions: [() => { count++; }]
          }
        }
      }
    }
  });

  assert.equal(machine.state, 'idle');
  machine.send({ type: 'PING' });
  assert.equal(machine.state, 'idle');
  assert.equal(count, 1);
});

test('Masks: handles edge case strings and nullish inputs gracefully', () => {
  assert.equal(stripNonDigits(null), '');
  assert.equal(stripNonDigits(undefined), '');
  assert.equal(stripNonDigits('   '), '');
  assert.equal(maskDocument(''), '');
  assert.equal(maskPhone(''), '');
  assert.equal(maskCEP(''), '');
  assert.equal(maskBRL(0), 'R$ 0,00');
  assert.equal(maskBRL(null), 'R$ 0,00');
  assert.equal(maskBRL(-50.25), '-R$ 50,25');
  assert.equal(unmaskBRL(''), 0);
  assert.equal(unmaskBRL(null), 0);
  assert.equal(validateEmail(''), false);
  assert.equal(validateEmail('plainaddress'), false);
  assert.equal(validateEmail('@missingusername.com'), false);
  assert.equal(validateEmail('user@.com'), false);
});

test('Draft Storage: handles corrupted data and checksum verification failures', () => {
  const mem = new MemoryStorage();
  const storage = createDraftStorage({ storage: mem });

  // Manually corrupt payload with invalid JSON
  mem.setItem(storage.getStorageKey('corrupted_json'), '{ bad json');
  assert.equal(storage.loadDraft('corrupted_json'), null);

  // Manually corrupt payload with mismatched checksum
  const goodPayload = {
    version: '2.5.0',
    formId: 'tampered',
    timestamp: Date.now(),
    ttlMs: 60000,
    checksum: 'deadbeef', // fake checksum
    values: { secret: 'data' }
  };
  mem.setItem(storage.getStorageKey('tampered'), JSON.stringify(goodPayload));
  assert.equal(storage.loadDraft('tampered'), null); // discarded due to checksum mismatch
});

test('B2B Quote Machine: enforces bounds on quantity and validates timeframe/notes', () => {
  const machine = createB2BQuoteMachine({ autoSaveDraft: false });

  // Quantity <= 0 rejected
  machine.send({ type: 'INPUT', field: 'quantity', value: '0' });
  machine.send({ type: 'BLUR', field: 'quantity' });
  assert.match(machine.context.errors.quantity, /positivo/i);

  // Quantity > 100,000 rejected
  machine.send({ type: 'INPUT', field: 'quantity', value: '150000' });
  machine.send({ type: 'BLUR', field: 'quantity' });
  assert.match(machine.context.errors.quantity, /100\.000/i);

  // Quantity decimal rejected
  machine.send({ type: 'INPUT', field: 'quantity', value: '10.5' });
  machine.send({ type: 'BLUR', field: 'quantity' });
  assert.match(machine.context.errors.quantity, /inteiro/i);

  // Valid quantity accepted
  machine.send({ type: 'INPUT', field: 'quantity', value: '25' });
  machine.send({ type: 'BLUR', field: 'quantity' });
  assert.equal(machine.context.errors.quantity, undefined);
});

test('B2B Quote Machine: submission error transitions to error and allows retry', () => {
  const machine = createB2BQuoteMachine({
    autoSaveDraft: false,
    initialValues: {
      businessType: 'Gym',
      quantity: 10,
      region: 'SP',
      document: '00000000000191',
      contactName: 'Carlos',
      contactEmail: 'carlos@example.com',
      contactPhone: '11987654321'
    }
  });

  machine.send({ type: 'SUBMIT' });
  assert.equal(machine.state, 'submitting');

  machine.send({ type: 'SUBMIT_ERROR', error: 'Network timeout 504' });
  assert.equal(machine.state, 'error');
  assert.equal(machine.context.lastError, 'Network timeout 504');

  // Retry returns to submitting
  machine.send({ type: 'RETRY' });
  assert.equal(machine.state, 'submitting');
});

test('Checkout Machine: navigation boundaries and step hopping', () => {
  const machine = createCheckoutMachine({ autoSaveDraft: false });

  assert.equal(machine.context.currentStep, 'customer');

  // Cannot PREV_STEP before first step
  machine.send({ type: 'PREV_STEP' });
  assert.equal(machine.context.currentStep, 'customer');

  // SET_STEP to an invalid step does nothing
  machine.send({ type: 'SET_STEP', step: 'invalid_step' });
  assert.equal(machine.context.currentStep, 'customer');

  // RESET restores machine to step customer
  machine.send({ type: 'INPUT', field: 'fullName', value: 'Tester' });
  machine.send({ type: 'RESET' });
  assert.equal(machine.context.currentStep, 'customer');
  assert.equal(machine.context.values.fullName, '');
});

