const { test, describe } = require('node:test');
const assert = require('node:assert');

describe('Basic CJS test', () => {
  test('should pass', () => {
    assert.strictEqual(1 + 1, 2);
  });
});
