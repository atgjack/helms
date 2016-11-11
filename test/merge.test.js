import test from 'ava';

import { merge} from '../lib';
import data from './data';

const target = data[0];
const source = data[1];
source.friends[2].type = 'dog';
delete source.age;
merge(target, source);

test('should modify in place', (t) => {
  t.plan(7);
  t.is( target._id, source._id );
  t.is( target.friends[0].name, source.friends[0].name );
  t.is( target.registered.toString(), source.registered.toString() );
  t.is( target.regexp.toString(), source.regexp.toString() );
  t.not( target.age, source.age );
  t.deepEqual( target.friends, source.friends);
  t.notDeepEqual( target, source );
});
