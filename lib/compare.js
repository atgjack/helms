function compare(a, b) {

  // Check same literal value or same object reference.
  if (a === b) return true;
  if (a === null || b === null) return false;

  // Check types and short-circit on non-objects.
  const type = typeof(a);
  if (type !== typeof(b)) return false;
  if (type === 'number' && isNaN(a) && isNaN(b)) return true;
  if (type !== 'object') return a === b;
  if (checkInstance(a,b)) return a.toString() === b.toString();

  // Check object equivalence.
  if (a.isPrototypeOf(b) || b.isPrototypeOf(a)) return false;
  if (a.constructor !== b.constructor) return false;
  if (a.prototype !== b.prototype) return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (let property in a) {
    if (!compare(a[property], b[property])) return false;
  }

  // Must be the same.
  return true;
}

// Check for objects that allow string comparisons.
function checkInstance(a,b) {
  return (a instanceof Date && b instanceof Date) ||
    (a instanceof RegExp && b instanceof RegExp) ||
    (a instanceof String && b instanceof String) ||
    (a instanceof Number && b instanceof Number)
}

export default compare;
