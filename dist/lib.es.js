function copy(obj) {
  var clone = void 0;

  // Return literals.
  if (!(obj instanceof Object)) return obj;

  // Create clone object with proper params.
  var Constructor = obj.constructor;
  switch (Constructor) {
    case Date:
    case RegExp:
      clone = new Constructor(obj);
      break;
    default:
      clone = new Constructor();
  }

  // Copy each property.
  for (var property in obj) {
    if (Object.hasOwnProperty.call(obj, property)) {
      clone[property] = copy(obj[property]);
    }
  }

  return clone;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Check for objects that allow string comparisons.
function checkInstance(a, b) {
  return a instanceof Date && b instanceof Date || a instanceof RegExp && b instanceof RegExp || a instanceof String && b instanceof String || a instanceof Number && b instanceof Number;
}

function isPrototype(a, b) {
  return Object.isPrototypeOf.call(a, b) || Object.isPrototypeOf.call(b, a);
}

function compare(a, b) {

  // Check same literal value or same object reference.
  if (a === b) return true;
  if (a === null || b === null) return false;

  // Check types and short-circit on non-objects.
  var type = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  if (type !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) return false;
  if (type === 'number' && isNaN(a) && isNaN(b)) return true;
  if (type !== 'object') return a === b;
  if (checkInstance(a, b)) return a.toString() === b.toString();

  // Check object equivalence.
  if (isPrototype(a, b)) return false;
  if (a.constructor !== b.constructor) return false;
  if (a.prototype !== b.prototype) return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (var property in a) {
    if (!compare(a[property], b[property])) return false;
  }

  // Must be the same.
  return true;
}

var constructors = [Date, RegExp, String, Number];
function merge(a, b) {
  if (!(a instanceof Object) || !(b instanceof Object)) {
    throw new TypeError('You can only merge objects.');
  }
  for (var property in b) {
    if (Object.hasOwnProperty.call(b, property)) {
      var oldProp = a[property];
      var newProp = b[property];
      if (!compare(oldProp, newProp)) {
        if (newProp === undefined) {
          delete a[property];
        } else if (newProp === null) {
          a[property] = null;
        } else if (constructors.indexOf(newProp.constructor) !== -1) {
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

export { copy, compare, merge };
//# sourceMappingURL=lib.es.js.map
