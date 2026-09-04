import assert from 'node:assert/strict';
import test from 'node:test';
import { palette, radius, spacing } from './index.ts';

test('light and dark themes expose the same semantic keys', () => {
  assert.deepEqual(Object.keys(palette.light).sort(), Object.keys(palette.dark).sort());
});

test('accent palette keeps the Mondrian-inspired primary trio', () => {
  for (const theme of [palette.light, palette.dark]) {
    assert.match(theme.red, /^#[0-9A-F]{6}$/i);
    assert.match(theme.blue, /^#[0-9A-F]{6}$/i);
    assert.match(theme.yellow, /^#[0-9A-F]{6}$/i);
  }
});

test('spacing and radius scales increase monotonically where expected', () => {
  assert.ok(spacing.xs < spacing.sm && spacing.sm < spacing.md && spacing.md < spacing.lg);
  assert.ok(radius.sm < radius.md && radius.md < radius.lg);
});
