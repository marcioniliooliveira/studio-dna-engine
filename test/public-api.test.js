const test = require('node:test');
const assert = require('node:assert/strict');

const api = require('../index');

test('runtime exports match the documented Tailwind generator API', () => {
  assert.equal(typeof api.generateTailwindConfig, 'function');
});
