import { test, describe } from 'node:test';
import assert from 'node:assert';

describe('Basic ESM test', () => {
  test('should pass', () => {
    assert.strictEqual(1 + 1, 2);
  });
});
