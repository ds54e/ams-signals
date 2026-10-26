import assert from 'node:assert/strict';
import test from 'node:test';
import { isCalendarDate, isDateAtPrecision, isValidWhen } from '../../src/lib/golden-dates.mjs';

test('Golden calendar dates round-trip without normalizing impossible days or years 00–99', () => {
  for (const value of ['0000-02-29', '0001-01-01', '0099-12-31', '1900-02-28', '2000-02-29', '2024-02-29', '9999-12-31']) {
    assert.equal(isCalendarDate(value), true, value);
  }
  for (const value of ['1900-02-29', '2025-02-29', '2026-02-30', '2026-04-31', '2026-00-01', '2026-13-01',
    '2026-01-00', '2026-01-32', '2026-1-01', '2026-01', '2026', '2026-01-01T00:00:00Z', '2026-01-01\n', '', null, 2026]) {
    assert.equal(isCalendarDate(value), false, String(value));
  }
});

test('Golden precision accepts exactly a four-digit year, valid month or calendar day', () => {
  for (const [value, precision] of [['0000', 'year'], ['9999', 'year'], ['2026-01', 'month'], ['2026-12', 'month'], ['2024-02-29', 'day']]) {
    assert.equal(isDateAtPrecision(value, precision), true, `${value}/${precision}`);
  }
  for (const [value, precision] of [['26', 'year'], ['10000', 'year'], ['-0001', 'year'], ['2026\n', 'year'],
    ['2026-01', 'year'], ['2026', 'month'], ['2026-00', 'month'], ['2026-13', 'month'], ['2026-1', 'month'],
    ['2026-01\n', 'month'], ['2026-01-01', 'month'], ['2026-01', 'day'], ['2026-02-30', 'day'], ['2026', 'unknown']]) {
    assert.equal(isDateAtPrecision(value, precision), false, `${value}/${precision}`);
  }
});

test('Golden ranges preserve precision and reject an end before start', () => {
  for (const when of [
    { start: '2026', precision: 'year' }, { start: '2026', end: '2026', precision: 'year' },
    { start: '2025', end: '2026', precision: 'year' }, { start: '2025-12', end: '2026-01', precision: 'month' },
    { start: '2024-02-28', end: '2024-02-29', precision: 'day' },
  ]) assert.equal(isValidWhen(when), true, JSON.stringify(when));
  for (const when of [
    { start: '2026', end: '2025', precision: 'year' }, { start: '2026-02', end: '2026-01', precision: 'month' },
    { start: '2026-01-02', end: '2026-01-01', precision: 'day' },
    { start: '2026', end: '2026-01', precision: 'year' }, { start: '2026-02-30', precision: 'day' },
    { start: '2026', precision: 'unknown' }, { start: '2026', end: null, precision: 'year' }, null, {},
  ]) assert.equal(isValidWhen(when), false, JSON.stringify(when));
});
