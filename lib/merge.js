import compare from './compare';

const constructors = [Date, RegExp, String, Number];

function merge(a, b) {
  if (!(a instanceof Object) || !(b instanceof Object)) {
    throw new TypeError('You can only merge objects.');
  }
  for (const property in b) {
    if (Object.hasOwnProperty.call(b, property)) {
      const oldProp = a[property];
      const newProp = b[property];
      if (!compare(oldProp, newProp)) {
        if (constructors.indexOf(newProp.constructor) !== -1) {
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
