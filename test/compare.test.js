import test from 'ava';

import { compare } from '../lib';
import createData from './data';

const data = [];
for (let i = 0; i < 5; i++) {
  data[i] = createData();
}
data[1].colors.add('purple');
data[2].friends.delete(2);
data[3].registered = new Date();
data[4].regexp = /different/;

test('should return true on similar objects', (t) => {
  t.plan(1);
  t.true(compare(data[0], createData()));
});

test('should return false on different objects', (t) => {
  t.plan(5);
  t.false(compare(data[0], data[1]));
  t.false(compare(data[1], data[2]));
  t.false(compare(data[2], data[3]));
  t.false(compare(data[3], data[4]));
  t.false(compare(data[4], data[0]));
});
