const assert = require('node:assert/strict');
const { validateDonutScopeInvariants } = require('../../../src/compiler/kinetic-grammar-schema');

// 1. Direct child combinator penetration
const t1 = validateDonutScopeInvariants(`
  [data-kinetic-slot] > h1 {
    transform: rotate(45deg);
  }
`);
assert.equal(t1.compliant, false, 'Direct child combinator > h1 must be rejected');
assert.ok(t1.violations.some(v => v.includes('[data-kinetic-slot] > h1')));

// 2. Attribute-valued selector with descendant
const t2 = validateDonutScopeInvariants(`
  [data-kinetic-slot="hero-title"] h1 {
    color: red !important;
  }
`);
assert.equal(t2.compliant, false, 'Attribute value with descendant h1 must be rejected');
assert.ok(t2.violations.some(v => v.includes('[data-kinetic-slot="hero-title"] h1')));

// 3. Attribute-valued selector with direct child universal
const t3 = validateDonutScopeInvariants(`
  [data-kinetic-slot="hero-title"] > * {
    margin: 0;
  }
`);
assert.equal(t3.compliant, false, 'Attribute value with direct child > * must be rejected');
assert.ok(t3.violations.some(v => v.includes('[data-kinetic-slot="hero-title"] > *')));

// 4. Legitimate slot self-styling
const t4 = validateDonutScopeInvariants(`
  [data-kinetic-slot] {
    all: unset;
    display: block;
  }
  [data-kinetic-slot="x"] {
    display: flex;
  }
  [data-kinetic-slot][data-slot-type="heading"] {
    font-size: 2rem;
  }
  [data-kinetic-slot="hero-title"][data-slot-type="heading"] {
    font-weight: 700;
  }
`);
assert.equal(t4.compliant, true, 'Legitimate slot self-styling must pass');
assert.equal(t4.violations.length, 0);

console.log('All L7 test assertions PASSED!');
