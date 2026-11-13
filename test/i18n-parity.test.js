import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findParityGaps } from '../src/i18n/parity.js';
import { strings } from '../src/i18n/strings.js';

// Break: a key added to `es` without its `en` match is reported as missing in en.
test('reports a key that exists in es but not in en', () => {
  const gaps = findParityGaps({
    es: { title: 'Entra', send: 'Enviar' },
    en: { title: 'Sign in' },
  });
  assert.deepEqual(gaps, [{ missingIn: 'en', key: 'send' }]);
});

// Break: a key added to `en` without its `es` match is reported as missing in es.
test('reports a key that exists in en but not in es', () => {
  const gaps = findParityGaps({
    es: { title: 'Entra' },
    en: { title: 'Sign in', send: 'Send link' },
  });
  assert.deepEqual(gaps, [{ missingIn: 'es', key: 'send' }]);
});

// Break: a string added to only one language in the real strings module fails the repo check.
// Passes today because the strings already match; that is the spec's required guard.
test('the real strings module has every Spanish key in English and the reverse', () => {
  assert.deepEqual(findParityGaps(strings), []);
});

// Break: a key named like an Object.prototype property (constructor) counts as present when absent.
test('reports a key that only exists as an inherited prototype property', () => {
  const gaps = findParityGaps({
    es: { constructor: 'Constructor' },
    en: {},
  });
  assert.deepEqual(gaps, [{ missingIn: 'en', key: 'constructor' }]);
});
