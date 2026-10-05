'use strict';

/**
 * test/stress/challenger-empirical.test.js
 * 
 * EMPIRICAL FALSIFICATION & STRESS BATTERY
 * Agent: challenger_v25_1 (Empirical Challenger 1)
 * 
 * Verifies and stresses:
 * 1. FSM Form Engine (R2):
 *    - Malformed / invalid event fuzzing (null, undefined, primitives, symbols, empty types)
 *    - Invalid state transition suppression & UI deadlock prevention
 *    - High-velocity event burst spamming (10,000 events)
 *    - Re-entrancy protection
 *    - Modulo 11 Brazilian Document Oracle (200 valid CPFs, 200 valid CNPJs, 2000 mutated invalids)
 *    - Bug reproduction: RETRY event deadlock in b2b-quote-machine when submitHandler configured
 * 
 * 2. 2nd-Order Spring Dynamics (R3):
 *    - Numerical Runge-Kutta 4th Order (RK4) integration comparison across all 3 regimes:
 *      * Underdamped (\zeta < 1.0)
 *      * Critically Damped (\zeta = 1.0)
 *      * Overdamped (\zeta > 1.0)
 *    - Absolute positional deviation assertion: |x_analytical - x_rk4| < 1e-4
 *    - Adversarial Boundary Stress: 5,000 randomized initial conditions under prefersReducedMotion
 *      with x0 \in [-1000, 1000], v0 \in [-5000, 5000], verifying strictly 0px overshoot (100% compliance).
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const { createMachine, assign } = require('../../src/fsm/core/machine');
const { createB2BQuoteMachine, validateField, validateAllFields } = require('../../src/forms/b2b-quote-machine');
const { createCheckoutMachine } = require('../../src/forms/checkout-machine');
const {
  validateCPF,
  validateCNPJ,
  validateDocument,
  maskDocument,
  applyMaskWithCaret,
  stripNonDigits
} = require('../../src/forms/masks');
const {
  SpringDynamicsEvaluator,
  solveDampedHarmonicMotion,
  REGIME_EPSILON
} = require('../../src/physics/spring-dynamics');

// ============================================================================
// PART 1: FSM CORE & FORM STATECHART EMPIRICAL FUZZING (R2)
// ============================================================================

describe('Empirical Challenger: FSM Core & Form Statechart Fuzzing', () => {

  it('FSM Fuzzing 1.1: strictly drops malformed, non-object, and missing-type events without crashing', () => {
    const machine = createB2BQuoteMachine();
    const initialSnapshot = machine.getSnapshot();

    const malformedEvents = [
      null,
      undefined,
      12345,
      -99.5,
      NaN,
      Infinity,
      true,
      false,
      'RAW_STRING_WITHOUT_TYPE',
      '',
      [],
      [1, 2, 3],
      {},
      { foo: 'bar' },
      { type: null },
      { type: undefined },
      { type: 123 },
      { type: '' },
      { type: false },
      { type: [] },
      Symbol('test-symbol'),
      () => ({ type: 'FUNCTION_EVENT' })
    ];

    for (const ev of malformedEvents) {
      const res = machine.send(ev);
      assert.equal(res, false, `Expected event ${String(ev)} to be dropped`);
      assert.equal(machine.state, 'idle');
    }

    // Context should remain completely uncorrupted
    assert.deepEqual(machine.context.values, initialSnapshot.context.values);
    assert.equal(machine.context.isValid, false);
    assert.equal(machine.context.isSubmitting, false);
  });

  it('FSM Fuzzing 1.2: strictly suppresses invalid transitions across all lifecycle states', () => {
    const machine = createB2BQuoteMachine();

    // 1. In 'idle': send submitting/success/internal events
    const invalidInIdle = [
      'SUBMIT_SUCCESS',
      'SUBMIT_ERROR',
      'LATENCY_TICK',
      'VALIDATE_SUCCESS',
      'VALIDATE_FAIL',
      'RETRY',
      'NON_EXISTENT_OPCODE'
    ];
    for (const type of invalidInIdle) {
      assert.equal(machine.send({ type }), false, `Should drop ${type} in idle`);
      assert.equal(machine.state, 'idle');
    }

    // Transition to 'validating'
    machine.send({ type: 'VALIDATE' });
    assert.equal(machine.state, 'validating');

    // 2. In 'validating': send invalid events
    const invalidInValidating = [
      'SUBMIT',
      'INPUT',
      'BLUR',
      'FOCUS',
      'RESET',
      'RETRY',
      'SUBMIT_SUCCESS',
      'LATENCY_TICK'
    ];
    for (const type of invalidInValidating) {
      assert.equal(machine.send({ type }), false, `Should drop ${type} in validating`);
      assert.equal(machine.state, 'validating');
    }

    // Move to idle via VALIDATE_SUCCESS
    machine.send({ type: 'VALIDATE_SUCCESS' });
    assert.equal(machine.state, 'idle');

    // Populate required fields and trigger SUBMIT to reach 'submitting'
    machine.send({ type: 'INPUT', field: 'businessType', value: 'Parque de Trampolins' });
    machine.send({ type: 'INPUT', field: 'quantity', value: '25' });
    machine.send({ type: 'INPUT', field: 'region', value: 'Curitiba / PR' });
    machine.send({ type: 'INPUT', field: 'document', value: '11222333000181' });
    machine.send({ type: 'INPUT', field: 'contactName', value: 'Mariana Costa' });
    machine.send({ type: 'INPUT', field: 'contactEmail', value: 'mariana@empresa.com' });
    machine.send({ type: 'INPUT', field: 'contactPhone', value: '41999998888' });

    assert.equal(machine.context.isValid, true);
    machine.send({ type: 'SUBMIT' });
    assert.equal(machine.state, 'submitting');
    assert.equal(machine.context.isSubmitting, true);

    // 3. In 'submitting': send events that could hijack or break in-flight submission
    const invalidInSubmitting = [
      'SUBMIT',
      'INPUT',
      'BLUR',
      'FOCUS',
      'VALIDATE',
      'RESET',
      'RETRY',
      'RESTORE_DRAFT'
    ];
    for (const type of invalidInSubmitting) {
      assert.equal(machine.send({ type }), false, `Should drop ${type} in submitting`);
      assert.equal(machine.state, 'submitting');
    }

    // Move to 'error'
    machine.send({ type: 'SUBMIT_ERROR', error: 'Network timeout simulated' });
    assert.equal(machine.state, 'error');

    // 4. In 'error': send invalid events
    const invalidInError = [
      'SUBMIT',
      'VALIDATE',
      'SUBMIT_SUCCESS',
      'LATENCY_TICK',
      'VALIDATE_SUCCESS'
    ];
    for (const type of invalidInError) {
      assert.equal(machine.send({ type }), false, `Should drop ${type} in error`);
      assert.equal(machine.state, 'error');
    }

    // Return to idle via INPUT
    machine.send({ type: 'INPUT', field: 'quantity', value: '30' });
    assert.equal(machine.state, 'idle');

    // Submit again and succeed
    machine.send({ type: 'SUBMIT' });
    assert.equal(machine.state, 'submitting');
    machine.send({ type: 'SUBMIT_SUCCESS', response: { quoteId: 'Q-TEST-99' } });
    assert.equal(machine.state, 'success');

    // 5. In 'success': all events dropped except RESET
    const invalidInSuccess = [
      'SUBMIT',
      'INPUT',
      'VALIDATE',
      'BLUR',
      'RETRY',
      'SUBMIT_SUCCESS',
      'SUBMIT_ERROR'
    ];
    for (const type of invalidInSuccess) {
      assert.equal(machine.send({ type }), false, `Should drop ${type} in success`);
      assert.equal(machine.state, 'success');
    }
  });

  it('FSM Fuzzing 1.3: high-velocity event storm (10,000 rapid sequential events) maintains context integrity', () => {
    const machine = createB2BQuoteMachine();
    const eventPool = [
      { type: 'INPUT', field: 'quantity', value: '10' },
      { type: 'BLUR', field: 'quantity' },
      { type: 'FOCUS', field: 'region' },
      { type: 'INPUT', field: 'region', value: 'São Paulo / SP' },
      { type: 'BLUR', field: 'region' },
      { type: 'UNKNOWN_SPAM_EVENT' },
      { type: 'VALIDATE' },
      { type: 'VALIDATE_SUCCESS' },
      { type: 'RESET' },
      null,
      { type: '' },
      { type: 'LATENCY_TICK' }
    ];

    const TOTAL_EVENTS = 10000;
    for (let i = 0; i < TOTAL_EVENTS; i++) {
      const ev = eventPool[i % eventPool.length];
      machine.send(ev);
    }

    // After storm, machine must remain in a valid, deterministic state
    assert.ok(['idle', 'validating', 'submitting', 'error', 'success'].includes(machine.state));
    assert.ok(typeof machine.context === 'object' && machine.context !== null);
    assert.ok(typeof machine.context.values === 'object');
    assert.ok(typeof machine.context.errors === 'object');
    assert.ok(typeof machine.context.touched === 'object');
  });

  it('FSM Fuzzing 1.4: re-entrancy lock strictly blocks recursive machine.send calls during transitions', () => {
    let reentrantBlocked = false;
    let callCount = 0;

    const machine = createMachine({
      id: 'reentrancy-fuzz',
      initial: 'start',
      context: { count: 0 },
      states: {
        start: {
          on: {
            TRIGGER: {
              target: 'middle',
              actions: [
                (ctx) => {
                  callCount++;
                  const res = machine.send({ type: 'TRIGGER' });
                  if (res === false) {
                    reentrantBlocked = true;
                  }
                  return { ...ctx, count: ctx.count + 1 };
                }
              ]
            }
          }
        },
        middle: {
          on: { TRIGGER: 'start' }
        }
      }
    });

    const sendRes = machine.send({ type: 'TRIGGER' });
    assert.equal(sendRes, true);
    assert.equal(reentrantBlocked, true, 'Recursive send must return false and be blocked');
    assert.equal(callCount, 1, 'Action must only run once without recursive reentry');
    assert.equal(machine.state, 'middle');
    assert.equal(machine.context.count, 1);
  });

  it('FSM Fuzzing 1.5: subscriber exceptions are isolated and do not prevent other subscribers from firing', () => {
    const machine = createMachine({
      id: 'subscriber-resilience',
      initial: 'a',
      states: {
        a: { on: { NEXT: 'b' } },
        b: {}
      }
    });

    let sub2Fired = 0;
    let sub3Fired = 0;

    machine.subscribe(() => {
      throw new Error('Exploding subscriber 1');
    });

    machine.subscribe(() => {
      sub2Fired++;
    });

    machine.subscribe(() => {
      sub3Fired++;
    });

    // Subscriptions fire once immediately upon subscribe, then on transition
    assert.equal(sub2Fired, 1);
    assert.equal(sub3Fired, 1);

    machine.send({ type: 'NEXT' });
    assert.equal(machine.state, 'b');
    assert.equal(sub2Fired, 2);
    assert.equal(sub3Fired, 2);
  });

  it('FSM Finding 1.6 [DEFECT REPRODUCTION]: RETRY event deadlocks b2b-quote-machine when submitHandler is configured', async () => {
    let submitAttempts = 0;

    const machine = createB2BQuoteMachine({
      initialValues: {
        businessType: 'Parque de Trampolins',
        quantity: '50',
        region: 'São Paulo / SP',
        timeframe: 'Imediato',
        document: '11222333000181',
        contactName: 'Carlos Silva',
        contactEmail: 'carlos@jumpplay.com.br',
        contactPhone: '11987654321'
      },
      submitHandler: async (vals) => {
        submitAttempts++;
        if (submitAttempts === 1) {
          throw new Error('E_GATEWAY_TIMEOUT: Mock gateway failure');
        }
        return { quoteId: 'QUOTE-SUCCESS-2' };
      }
    });

    // Step 1: Initial submission fails and transitions to 'error'
    machine.send({ type: 'SUBMIT' });
    assert.equal(machine.state, 'submitting');
    assert.equal(submitAttempts, 1);

    // Wait for the async rejection to resolve into SUBMIT_ERROR
    await new Promise(resolve => setTimeout(resolve, 50));
    assert.equal(machine.state, 'error');
    assert.equal(machine.context.isSubmitting, false);
    assert.ok(machine.context.lastError.includes('Mock gateway failure'));

    // Step 2: User clicks "Retry" -> UI dispatches RETRY event
    machine.send({ type: 'RETRY' });

    // EMPIRICAL OBSERVATION:
    // The machine transitions to 'submitting':
    assert.equal(machine.state, 'submitting');
    assert.equal(machine.context.isSubmitting, true);

    // Wait 100ms to see if submitHandler was invoked:
    await new Promise(resolve => setTimeout(resolve, 100));

    // CRITICAL DEFECT PROOF:
    // In b2b-quote-machine.js line 606:
    // `if (machine.state === 'submitting' && submitHandler && eventObj.type === 'SUBMIT')`
    // Because eventObj.type is 'RETRY' (not 'SUBMIT'), submitHandler was NEVER called!
    // submitAttempts remains 1!
    assert.equal(submitAttempts, 1, 'DEFECT CONFIRMED: submitAttempts is stuck at 1 because RETRY did not invoke submitHandler');
    assert.equal(machine.state, 'submitting', 'DEFECT CONFIRMED: machine is permanently stuck in submitting state');
  });

  it('FSM Fuzzing 1.7: concurrent asynchronous event bursts via Promise.all maintain determinism', async () => {
    const machine = createB2BQuoteMachine();

    // Fire 50 asynchronous tasks dispatching interleaved events concurrently
    const tasks = Array.from({ length: 50 }, (_, i) => {
      return (async () => {
        const events = [
          { type: 'INPUT', field: 'quantity', value: String(i) },
          { type: 'BLUR', field: 'quantity' },
          { type: 'FOCUS', field: 'region' },
          { type: 'UNKNOWN_ASYNC_EVENT', id: i },
          { type: 'VALIDATE' }
        ];
        for (const ev of events) {
          machine.send(ev);
        }
      })();
    });

    await Promise.all(tasks);

    // After 250 concurrent events, state machine must remain valid and uncorrupted
    assert.ok(['idle', 'validating', 'error'].includes(machine.state));
    assert.ok(typeof machine.context === 'object' && machine.context !== null);
    assert.ok(typeof machine.context.values === 'object');
    assert.ok(typeof machine.context.errors === 'object');
  });

  it('FSM Finding 1.8 [DEFECT REPRODUCTION]: RETRY event deadlocks checkout-machine when submitHandler is configured', async () => {
    let submitAttempts = 0;

    const machine = createCheckoutMachine({
      autoSaveDraft: false,
      initialValues: {
        fullName: 'Carlos Santos',
        email: 'carlos@gmail.com',
        document: '52998224725',
        phone: '11987654321',
        cep: '01310100',
        street: 'Av Paulista',
        number: '1000',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        paymentMethod: 'pix'
      },
      submitHandler: async (vals) => {
        submitAttempts++;
        if (submitAttempts === 1) {
          throw new Error('E_GATEWAY_TIMEOUT: Pix gateway offline');
        }
        return { orderId: 'ORDER-12345' };
      }
    });

    // Advance steps to review
    machine.send({ type: 'NEXT_STEP' }); // shipping
    machine.send({ type: 'NEXT_STEP' }); // payment
    machine.send({ type: 'NEXT_STEP' }); // review

    // Initial submission fails
    machine.send({ type: 'SUBMIT' });
    assert.equal(machine.state, 'submitting');
    assert.equal(submitAttempts, 1);

    await new Promise(resolve => setTimeout(resolve, 50));
    assert.equal(machine.state, 'error');
    assert.ok(machine.context.lastError.includes('Pix gateway offline'));

    // Send RETRY
    machine.send({ type: 'RETRY' });
    assert.equal(machine.state, 'submitting');

    await new Promise(resolve => setTimeout(resolve, 100));

    // CRITICAL DEFECT PROOF:
    // In checkout-machine.js line 701:
    // `if (machine.state === 'submitting' && submitHandler && eventObj.type === 'SUBMIT')`
    // Because eventObj.type is 'RETRY', submitHandler was never called!
    assert.equal(submitAttempts, 1, 'DEFECT CONFIRMED: checkout submitAttempts is stuck at 1 on RETRY');
    assert.equal(machine.state, 'submitting', 'DEFECT CONFIRMED: checkout machine is permanently locked in submitting state');
  });

});

// ============================================================================
// PART 2: MODULO 11 BRAZILIAN DOCUMENT VALIDATION HARNESS (R2)
// ============================================================================

describe('Empirical Challenger: Modulo 11 Brazilian Document Validation Harness', () => {

  /**
   * Independent mathematical CPF oracle
   */
  function generateValidCPF() {
    const d = [];
    for (let i = 0; i < 9; i++) d.push(Math.floor(Math.random() * 10));
    if (d.every(v => v === d[0])) d[0] = (d[0] + 1) % 10;

    let s1 = 0;
    for (let i = 0; i < 9; i++) s1 += d[i] * (10 - i);
    const r1 = s1 % 11;
    d.push(r1 < 2 ? 0 : 11 - r1);

    let s2 = 0;
    for (let i = 0; i < 10; i++) s2 += d[i] * (11 - i);
    const r2 = s2 % 11;
    d.push(r2 < 2 ? 0 : 11 - r2);

    return d.join('');
  }

  /**
   * Independent mathematical CNPJ oracle
   */
  function generateValidCNPJ() {
    const d = [];
    for (let i = 0; i < 12; i++) d.push(Math.floor(Math.random() * 10));
    if (d.every(v => v === d[0])) d[0] = (d[0] + 1) % 10;

    const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let s1 = 0;
    for (let i = 0; i < 12; i++) s1 += d[i] * w1[i];
    const r1 = s1 % 11;
    d.push(r1 < 2 ? 0 : 11 - r1);

    let s2 = 0;
    for (let i = 0; i < 13; i++) s2 += d[i] * w2[i];
    const r2 = s2 % 11;
    d.push(r2 < 2 ? 0 : 11 - r2);

    return d.join('');
  }

  it('Modulo 11 2.1: validates 200 independently generated valid CPF numbers (100% true positive)', () => {
    const SAMPLE_COUNT = 200;
    let passed = 0;

    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const cpf = generateValidCPF();
      if (validateCPF(cpf) && validateDocument(cpf)) {
        passed++;
      }
    }

    assert.equal(passed, SAMPLE_COUNT, `Expected all ${SAMPLE_COUNT} valid CPFs to pass`);
  });

  it('Modulo 11 2.2: validates 200 independently generated valid CNPJ numbers (100% true positive)', () => {
    const SAMPLE_COUNT = 200;
    let passed = 0;

    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const cnpj = generateValidCNPJ();
      if (validateCNPJ(cnpj) && validateDocument(cnpj)) {
        passed++;
      }
    }

    assert.equal(passed, SAMPLE_COUNT, `Expected all ${SAMPLE_COUNT} valid CNPJs to pass`);
  });

  it('Modulo 11 2.3: rejects 1,000 mutated invalid CPF numbers (100% true negative on check digits & repeated digits)', () => {
    const MUTATION_COUNT = 1000;
    let rejected = 0;

    for (let i = 0; i < MUTATION_COUNT; i++) {
      const valid = generateValidCPF();
      const digits = valid.split('').map(Number);

      // Mutate check digit 1 (index 9) or check digit 2 (index 10)
      const mutateIdx = Math.random() < 0.5 ? 9 : 10;
      const original = digits[mutateIdx];
      const delta = 1 + Math.floor(Math.random() * 8); // 1 to 9
      digits[mutateIdx] = (original + delta) % 10;

      const mutated = digits.join('');
      if (!validateCPF(mutated) && !validateDocument(mutated)) {
        rejected++;
      }
    }

    assert.equal(rejected, MUTATION_COUNT, `Expected all ${MUTATION_COUNT} mutated CPFs to be rejected`);

    // Verify all identical repeated digits are rejected
    for (let d = 0; d <= 9; d++) {
      const repeated = String(d).repeat(11);
      assert.equal(validateCPF(repeated), false, `Repeated CPF ${repeated} must be rejected`);
      assert.equal(validateDocument(repeated), false);
    }
  });

  it('Modulo 11 2.4: rejects 1,000 mutated invalid CNPJ numbers (100% true negative on check digits & repeated digits)', () => {
    const MUTATION_COUNT = 1000;
    let rejected = 0;

    for (let i = 0; i < MUTATION_COUNT; i++) {
      const valid = generateValidCNPJ();
      const digits = valid.split('').map(Number);

      // Mutate check digit 1 (index 12) or check digit 2 (index 13)
      const mutateIdx = Math.random() < 0.5 ? 12 : 13;
      const original = digits[mutateIdx];
      const delta = 1 + Math.floor(Math.random() * 8);
      digits[mutateIdx] = (original + delta) % 10;

      const mutated = digits.join('');
      if (!validateCNPJ(mutated) && !validateDocument(mutated)) {
        rejected++;
      }
    }

    assert.equal(rejected, MUTATION_COUNT, `Expected all ${MUTATION_COUNT} mutated CNPJs to be rejected`);

    // Verify all identical repeated digits are rejected
    for (let d = 0; d <= 9; d++) {
      const repeated = String(d).repeat(14);
      assert.equal(validateCNPJ(repeated), false, `Repeated CNPJ ${repeated} must be rejected`);
      assert.equal(validateDocument(repeated), false);
    }
  });

  it('Modulo 11 2.5: dynamic masking transitions and caret tracking fuzzing', () => {
    // Caret tracking should never produce negative cursor positions or out-of-bounds offsets
    const testCases = [
      { prev: '', next: '1', cursor: 1 },
      { prev: '1', next: '11', cursor: 2 },
      { prev: '11', next: '112', cursor: 3 },
      { prev: '112', next: '1122', cursor: 4 },
      { prev: '112.2', next: '11222', cursor: 5 },
      { prev: '112.223.330', next: '1122233300', cursor: 10 },
      { prev: '112.223.330-01', next: '112223330001', cursor: 12 }, // morphs into CNPJ!
      { prev: '11.222.333/0001-81', next: '1122233300018', cursor: 13 }
    ];

    for (const tc of testCases) {
      const res = applyMaskWithCaret(maskDocument, tc.prev, tc.next, tc.cursor);
      assert.ok(typeof res.maskedValue === 'string');
      assert.ok(typeof res.rawValue === 'string');
      assert.ok(res.nextCursorPosition >= 0);
      assert.ok(res.nextCursorPosition <= res.maskedValue.length);
    }
  });

});

// ============================================================================
// PART 3: SPRING DYNAMICS FALSIFICATION — RK4 NUMERICAL COMPARISON (R3)
// ============================================================================

describe('Empirical Challenger: 2nd-Order Spring Dynamics vs High-Precision RK4 Integrator', () => {

  /**
   * 4th-Order Runge-Kutta numerical integrator for:
   * \ddot{x} + 2\zeta\omega_n\dot{x} + \omega_n^2 x = 0
   * 
   * \frac{dx}{dt} = v
   * \frac{dv}{dt} = -2\zeta\omega_n v - \omega_n^2 x
   */
  function integrateRK4(x0, v0, zeta, omegaN, tEnd, dt = 0.0001) {
    let t = 0;
    let x = x0;
    let v = v0;
    const history = [{ t: 0, x, v }];

    function derivative(x_curr, v_curr) {
      return {
        dxdt: v_curr,
        dvdt: -2 * zeta * omegaN * v_curr - omegaN * omegaN * x_curr
      };
    }

    while (t < tEnd - 1e-9) {
      const actualDt = Math.min(dt, tEnd - t);

      const k1 = derivative(x, v);
      const k2 = derivative(x + 0.5 * actualDt * k1.dxdt, v + 0.5 * actualDt * k1.dvdt);
      const k3 = derivative(x + 0.5 * actualDt * k2.dxdt, v + 0.5 * actualDt * k2.dvdt);
      const k4 = derivative(x + actualDt * k3.dxdt, v + actualDt * k3.dvdt);

      x += (actualDt / 6) * (k1.dxdt + 2 * k2.dxdt + 2 * k3.dxdt + k4.dxdt);
      v += (actualDt / 6) * (k1.dvdt + 2 * k2.dvdt + 2 * k3.dvdt + k4.dvdt);
      t += actualDt;

      history.push({ t, x, v });
    }

    return history;
  }

  it('Spring RK4 3.1: Underdamped regime (\zeta < 1.0) positional deviation is strictly < 1e-4 throughout motion', () => {
    const testCases = [
      { zeta: 0.15, omegaN: 12, x0: 250, v0: 0, tEnd: 2.0 },
      { zeta: 0.40, omegaN: 20, x0: -180, v0: 600, tEnd: 1.5 },
      { zeta: 0.707, omegaN: 15, x0: 500, v0: -1200, tEnd: 1.5 },
      { zeta: 0.95, omegaN: 8, x0: -350, v0: -500, tEnd: 2.0 }
    ];

    for (const tc of testCases) {
      const rk4History = integrateRK4(tc.x0, tc.v0, tc.zeta, tc.omegaN, tc.tEnd, 0.0001);
      let maxDeviation = 0;

      for (const pt of rk4History) {
        const analytical = solveDampedHarmonicMotion({
          x0: tc.x0,
          v0: tc.v0,
          zeta: tc.zeta,
          omegaN: tc.omegaN,
          t: pt.t
        });

        assert.equal(analytical.regime, 'underdamped');
        const dev = Math.abs(analytical.displacement - pt.x);
        if (dev > maxDeviation) {
          maxDeviation = dev;
        }
      }

      // Assert deviation is strictly < 1e-4 across all evaluated time points
      assert.ok(
        maxDeviation < 1e-4,
        `Underdamped (zeta=${tc.zeta}, omegaN=${tc.omegaN}) max RK4 deviation ${maxDeviation.toExponential(4)} exceeded 1e-4`
      );
    }
  });

  it('Spring RK4 3.2: Critically Damped regime (\zeta = 1.0) positional deviation is strictly < 1e-4 throughout motion', () => {
    const testCases = [
      { zeta: 1.0, omegaN: 10, x0: 300, v0: 0, tEnd: 2.0 },
      { zeta: 1.0, omegaN: 18, x0: -400, v0: 1500, tEnd: 1.5 },
      { zeta: 1.0, omegaN: 25, x0: 150, v0: -2000, tEnd: 1.5 },
      { zeta: 1.0, omegaN: 6, x0: -800, v0: -1000, tEnd: 2.5 }
    ];

    for (const tc of testCases) {
      const rk4History = integrateRK4(tc.x0, tc.v0, tc.zeta, tc.omegaN, tc.tEnd, 0.0001);
      let maxDeviation = 0;

      for (const pt of rk4History) {
        const analytical = solveDampedHarmonicMotion({
          x0: tc.x0,
          v0: tc.v0,
          zeta: tc.zeta,
          omegaN: tc.omegaN,
          t: pt.t
        });

        assert.equal(analytical.regime, 'critically-damped');
        const dev = Math.abs(analytical.displacement - pt.x);
        if (dev > maxDeviation) {
          maxDeviation = dev;
        }
      }

      assert.ok(
        maxDeviation < 1e-4,
        `Critically damped (zeta=${tc.zeta}, omegaN=${tc.omegaN}) max RK4 deviation ${maxDeviation.toExponential(4)} exceeded 1e-4`
      );
    }
  });

  it('Spring RK4 3.3: Overdamped regime (\zeta > 1.0) positional deviation is strictly < 1e-4 throughout motion', () => {
    const testCases = [
      { zeta: 1.2, omegaN: 12, x0: 200, v0: 0, tEnd: 2.0 },
      { zeta: 1.8, omegaN: 15, x0: -500, v0: 1200, tEnd: 2.0 },
      { zeta: 2.5, omegaN: 10, x0: 350, v0: -1800, tEnd: 2.5 },
      { zeta: 4.0, omegaN: 8, x0: -600, v0: 800, tEnd: 3.0 }
    ];

    for (const tc of testCases) {
      const rk4History = integrateRK4(tc.x0, tc.v0, tc.zeta, tc.omegaN, tc.tEnd, 0.0001);
      let maxDeviation = 0;

      for (const pt of rk4History) {
        const analytical = solveDampedHarmonicMotion({
          x0: tc.x0,
          v0: tc.v0,
          zeta: tc.zeta,
          omegaN: tc.omegaN,
          t: pt.t
        });

        assert.equal(analytical.regime, 'overdamped');
        const dev = Math.abs(analytical.displacement - pt.x);
        if (dev > maxDeviation) {
          maxDeviation = dev;
        }
      }

      assert.ok(
        maxDeviation < 1e-4,
        `Overdamped (zeta=${tc.zeta}, omegaN=${tc.omegaN}) max RK4 deviation ${maxDeviation.toExponential(4)} exceeded 1e-4`
      );
    }
  });

});

// ============================================================================
// PART 4: REDUCED MOTION 5,000 ADVERSARIAL INITIAL CONDITIONS TEST (R3)
// ============================================================================

describe('Empirical Challenger: Prefers-Reduced-Motion 5,000 Sample Zero-Overshoot Falsification', () => {

  it('Reduced Motion 4.1: exactly 0.0px overshoot across 5,000 randomized initial conditions under prefersReducedMotion: true', () => {
    const TOTAL_SAMPLES = 5000;
    let failedCount = 0;
    let maxOvershootObserved = 0;

    const timeEvaluationHorizon = [
      0.0005, 0.001, 0.002, 0.005, 0.01, 0.02, 0.05,
      0.1, 0.15, 0.2, 0.3, 0.5, 0.75, 1.0, 1.5, 2.0, 3.0
    ];

    for (let i = 0; i < TOTAL_SAMPLES; i++) {
      // Adversarial boundary ranges specified in dispatch:
      // x0 \in [-1000, 1000], v0 \in [-5000, 5000]
      const x0 = (Math.random() * 2000) - 1000;
      const v0 = (Math.random() * 10000) - 5000;

      const target = (Math.random() * 800) - 400;
      const from = target + x0;

      // Random physical characteristics
      const stiffness = 10 + Math.random() * 500;
      const mass = 0.2 + Math.random() * 10.0;
      const rawZeta = 0.05 + Math.random() * 4.0; // Under reduced motion, must clamp zeta >= 1.0

      const spring = new SpringDynamicsEvaluator({
        from,
        target,
        initialVelocity: v0,
        stiffness,
        mass,
        zeta: rawZeta,
        prefersReducedMotion: true
      });

      // Verify damping ratio was dynamically clamped >= 1.0
      assert.ok(spring.getDampingRatio() >= 1.0);

      let caseFailed = false;

      for (const t of timeEvaluationHorizon) {
        const state = spring.evaluate(t);
        const p = state.position;
        let overshoot = 0;

        if (x0 > 0) {
          // Starting above target: motion should converge toward target without dropping below target
          // and without shooting higher than the initial release position 'from'
          if (p < target) {
            overshoot = target - p;
          } else if (p > from) {
            overshoot = p - from;
          }
        } else if (x0 < 0) {
          // Starting below target: motion should converge toward target without exceeding target
          // and without shooting lower than the initial release position 'from'
          if (p > target) {
            overshoot = p - target;
          } else if (p < from) {
            overshoot = from - p;
          }
        } else {
          // x0 == 0: already at target
          if (Math.abs(p - target) > 1e-6) {
            overshoot = Math.abs(p - target);
          }
        }

        if (overshoot > 1e-6) {
          caseFailed = true;
          if (overshoot > maxOvershootObserved) {
            maxOvershootObserved = overshoot;
          }
        }
      }

      if (caseFailed) {
        failedCount++;
      }
    }

    assert.equal(
      failedCount,
      0,
      `Zero overshoot violated: ${failedCount} of ${TOTAL_SAMPLES} cases exhibited overshoot > 0px (max=${maxOvershootObserved}px)`
    );
    assert.equal(maxOvershootObserved, 0, 'Maximum measured overshoot must be strictly 0px');
  });

});

// ============================================================================
// PART 5: SPRING DYNAMICS EXTREME ADVERSARIAL BOUNDARIES (R3)
// ============================================================================

describe('Empirical Challenger: Spring Dynamics Extremal Boundaries & Stability', () => {

  it('Spring Extremes 5.1: hyper-velocity initial condition (v0 = 10^7 px/s) maintains strict 0px overshoot in reduced motion', () => {
    const hyperSpring = new SpringDynamicsEvaluator({
      from: 100,
      target: 0,
      initialVelocity: 10000000, // 10 million px/sec outward
      stiffness: 300,
      mass: 1.0,
      prefersReducedMotion: true
    });

    const timeHorizon = [0.0001, 0.001, 0.01, 0.1, 0.5, 1.0, 5.0];
    for (const t of timeHorizon) {
      const state = hyperSpring.evaluate(t);
      assert.ok(Number.isFinite(state.position), `Position at t=${t} must be finite`);
      assert.ok(Number.isFinite(state.velocity), `Velocity at t=${t} must be finite`);
      // Zero overshoot: position cannot drop below 0 (target) and cannot exceed 100 (from)
      assert.ok(state.position >= 0, `Position at t=${t} dropped below target: ${state.position}`);
      assert.ok(state.position <= 100, `Position at t=${t} exceeded release position: ${state.position}`);
    }
  });

  it('Spring Extremes 5.2: asymptotic time horizon (t = 100,000s) does not suffer from underflow/overflow NaN', () => {
    const spring = new SpringDynamicsEvaluator({
      from: 200,
      target: 50,
      initialVelocity: -100,
      stiffness: 100,
      damping: 10
    });

    const state = spring.evaluate(100000);
    assert.equal(state.isSettled, true);
    assert.equal(state.position, 50);
    assert.equal(state.velocity, 0);
  });

  it('Spring Extremes 5.3: regime boundary continuity near zeta = 1.0 (+/- 1e-6)', () => {
    const baseConfig = { x0: 50, v0: 20, omegaN: 15, t: 0.25 };
    const solExact = solveDampedHarmonicMotion({ ...baseConfig, zeta: 1.0 });

    const deltas = [-1e-6, -1e-7, 1e-7, 1e-6];
    for (const delta of deltas) {
      const solPerturbed = solveDampedHarmonicMotion({ ...baseConfig, zeta: 1.0 + delta });
      const posDiff = Math.abs(solPerturbed.displacement - solExact.displacement);
      const velDiff = Math.abs(solPerturbed.velocity - solExact.velocity);
      assert.ok(posDiff < 1e-4, `Displacement discontinuity at delta=${delta}: ${posDiff}`);
      assert.ok(velDiff < 1e-3, `Velocity discontinuity at delta=${delta}: ${velDiff}`);
    }
  });

  it('Spring Extremes 5.4: strict rejection of degenerate, non-finite, and negative physical parameters', () => {
    assert.throws(() => new SpringDynamicsEvaluator({ mass: 0 }), RangeError);
    assert.throws(() => new SpringDynamicsEvaluator({ mass: -5 }), RangeError);
    assert.throws(() => new SpringDynamicsEvaluator({ mass: NaN }), RangeError);
    assert.throws(() => new SpringDynamicsEvaluator({ stiffness: 0 }), RangeError);
    assert.throws(() => new SpringDynamicsEvaluator({ stiffness: -100 }), RangeError);
    assert.throws(() => new SpringDynamicsEvaluator({ naturalFrequency: -10 }), RangeError);
    assert.throws(() => new SpringDynamicsEvaluator({ dampingRatio: -0.5 }), RangeError);
    assert.throws(() => new SpringDynamicsEvaluator({ initialVelocity: Infinity }), TypeError);
  });

});

