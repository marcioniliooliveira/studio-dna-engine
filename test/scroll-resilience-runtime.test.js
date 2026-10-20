const test = require('node:test');
const assert = require('node:assert/strict');
const DNAScrollResilience = require('../src/runtime/scroll-resilience-runtime');

test('DNAScrollResilience: version and exports are defined', () => {
  assert.equal(DNAScrollResilience.version, '1.0.0');
  assert.equal(typeof DNAScrollResilience.isolatePortal, 'function');
  assert.equal(typeof DNAScrollResilience.ensureSplitTextShim, 'function');
  assert.equal(typeof DNAScrollResilience.initLayoutInvalidator, 'function');
  assert.equal(typeof DNAScrollResilience.auditScrollContract, 'function');
});

test('DNAScrollResilience.isolatePortal: attaches non-propagating listeners to portal element', () => {
  // Mock element
  const events = [];
  const fakeElement = {
    addEventListener: (evtName, handler) => {
      events.push(evtName);
    },
    setAttribute: (name, val) => {}
  };

  DNAScrollResilience.isolatePortal(fakeElement);
  assert.ok(events.includes('wheel'), 'Must isolate wheel events');
  assert.ok(events.includes('touchmove'), 'Must isolate touchmove events');
  assert.ok(events.includes('keydown'), 'Must isolate keydown events');
});

test('DNAScrollResilience.auditScrollContract: gracefully returns error when DOM is absent', () => {
  const result = DNAScrollResilience.auditScrollContract();
  assert.equal(result.passed, false);
  assert.equal(result.error, 'No DOM available');
});
