import test from 'ava';

import { copy } from '../lib';
import data from './data';

const source = data[0];
const copied = copy(source);

test('should create a new duplicate', (t) => {
  t.plan(5);
  t.is(copied.id, source.id);
  t.is(copied.friends[0].name, source.friends[0].name);
  t.is(copied.registered.toString(), source.registered.toString());
  t.is(copied.regexp.toString(), source.regexp.toString());
  t.deepEqual(copied, source);
});

test('should be a different object', (t) => {
  source.id = 'test';
  source.friends[0] = source.friends[1];
  source.registered = new Date();
  source.regexp = /newTest/;
  t.plan(5);
  t.not(copied.id, source.xid);
  t.not(copied.friends[0].name, source.friends[0].name);
  t.not(copied.registered.toString(), source.registered.toString());
  t.not(copied.regexp.toString(), source.regexp.toString());
  t.notDeepEqual(copied, source);
});
