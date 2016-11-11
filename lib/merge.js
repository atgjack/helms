import compare from './compare'
import copy from './copy'

function merge(a, b) {
  if (!(a instanceof Object) || !(b instanceof Object))
    throw new TypeError('You can only merge objects.');

  for (let property in b) {
    const oldProp = a[property];
    const newProp = b[property];
    if (compare(oldProp, newProp)) continue;
    if (newProp instanceof Object && oldProp instanceof Object) {
      merge(oldProp, newProp)
    } else a[property] = newProp;
  }
}

export default merge;
