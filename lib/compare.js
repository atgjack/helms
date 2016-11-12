// Check for objects that allow string comparisons.
function checkInstance(a, b) {
  return (a instanceof Date && b instanceof Date) ||
    (a instanceof RegExp && b instanceof RegExp) ||
    (a instanceof String && b instanceof String) ||
    (a instanceof Number && b instanceof Number);
}

// Check if a is a Map or a Set.
function isMapSet(a) {
  return a.constructor === Map || a.constructor === Set;
}

// Compare Maps and Sets.
function checkMapSet(a, b) {
  if (a.size !== b.size) return false;
  for (const item of b) {
    if (a.constructor === Map) {
      const [key, val] = item;
      if (!a.has(key)) return false;
      if (a.get(key) !== val) return false;
    } else if (!a.has(item)) return false;
  }
  return true;
}

function isPrototype(a, b) {
  return Object.isPrototypeOf.call(a, b) || Object.isPrototypeOf.call(b, a);
}

function compare(a, b) {

  // Check same literal value or same object reference.
  if (a === b) return true;
  if (a === null || b === null) return false;

  // Check types and short-circit on non-objects.
  const type = typeof(a);
  if (type !== typeof(b)) return false;
  if (type === 'number' && isNaN(a) && isNaN(b)) return true;
  if (type !== 'object') return a === b;
  if (checkInstance(a, b)) return a.toString() === b.toString();

  // Check object equivalence.
  if (isPrototype(a, b)) return false;
  if (a.constructor !== b.constructor) return false;
  if (isMapSet(a) && !checkMapSet(a, b)) return false;
  if (a.prototype !== b.prototype) return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (const property in a) {
    if (!compare(a[property], b[property])) return false;
  }

  // Must be the same.
  return true;
}

export default compare;
