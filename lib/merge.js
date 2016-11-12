import compare from './compare';

const constructors = [Date, RegExp, String, Number, Map, WeakMap, Set, WeakSet, Promise];

function merge(a, b) {
  if (!(a instanceof Object) || !(b instanceof Object)) {
    throw new TypeError('You can only merge objects.');
  }
  for (const property in b) {
    if (Object.hasOwnProperty.call(b, property)) {
      const oldProp = a[property];
      const newProp = b[property];
      if (!compare(oldProp, newProp)) {
        if (newProp === undefined) {
          delete a[property];
        } else if (newProp === null) {
          a[property] = null;
        // Node requires the ._c for Sets and Maps.
        } else if (constructors.indexOf(newProp.constructor) !== -1 || !!newProp._c) {
          a[property] = newProp;
        } else if (newProp instanceof Object && oldProp instanceof Object) {
          merge(oldProp, newProp);
        } else {
          a[property] = newProp;
        }
      }
    }
  }
}

export default merge;
