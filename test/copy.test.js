import test from 'ava';

import { copy } from '../lib';
import createData from './data';

const source = createData();
const copied = copy(source);

test('should create a new duplicate', (t) => {
  t.plan(5);
  t.is(copied.id, source.id);
  t.is(copied.friends.get(0), source.friends.get(0));
  t.is(copied.registered.toString(), source.registered.toString());
  t.is(copied.regexp.toString(), source.regexp.toString());
  t.deepEqual(copied, source);
});

test('should be a different object', (t) => {
  source.id = 'test';
  source.friends.set(0, 'Steve Urkel');
  source.colors.delete('blue');
  source.registered = new Date();
  source.regexp = /newTest/;
  t.plan(6);
  t.not(copied.id, source.id);
  t.not(copied.friends.get(0), source.friends.get(0));
  t.not(copied.colors.has('blue'), source.colors.has('blue'));
  t.not(copied.registered.toString(), source.registered.toString());
  t.not(copied.regexp.toString(), source.regexp.toString());
  t.notDeepEqual(copied, source);
});
