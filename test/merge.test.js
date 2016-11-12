import test from 'ava';

import { merge } from '../lib';
import createData from './data';

const original = createData();
const target = createData();
const source = {
  id: 'test-id',
  colors: new Set(['orange', 'black', 'white']),
  registered: new Date(),
  regexp: /what?/,
};
merge(target, source);

test('should modify in place', (t) => {
  t.plan(8);
  t.is(target.id, source.id);
  t.not(target.id, original.id);
  t.not(target.colors.has('orange'), original.colors.has('orange'));
  t.is(target.registered.toString(), source.registered.toString());
  t.not(target.registered.toString(), original.registered.toString());
  t.is(target.regexp.toString(), source.regexp.toString());
  t.not(target.regexp.toString(), original.regexp.toString());
  t.notDeepEqual(target, original);
});
