import test from 'ava';

import { compare } from '../lib';
import data from './data';

data[4] = Object.assign({}, data[3], {
  registered: new Date(),
  regexp: /test/,
});
data[4].friends[2].name = 'Changed';

test('should return true on similar objects', (t) => {
  t.plan(5);
  t.true(compare(data[0], data[0]));
  t.true(compare(data[1], data[1]));
  t.true(compare(data[2], data[2]));
  t.true(compare(data[3], data[3]));
  t.true(compare(data[4], data[4]));
});

test('should return false on different objects', (t) => {
  t.plan(5);
  t.false(compare(data[0], data[1]));
  t.false(compare(data[1], data[2]));
  t.false(compare(data[2], data[3]));
  t.false(compare(data[3], data[4]));
  t.false(compare(data[4], data[0]));
});
