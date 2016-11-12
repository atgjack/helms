function copy(obj) {
  var clone = void 0;

  // Return literals.
  if (!(obj instanceof Object)) return obj;

  // Create clone object with proper params.
  var Constructor = obj.constructor;
  switch (Constructor) {
    case Date:
    case Map:
    case Set:
    case RegExp:
      clone = new Constructor(obj);
      break;
    case Promise:
      clone = new Constructor(function (resolve, reject) {
        resolve(obj.then);
        reject(obj.catch);
      });
      break;
    // case WeakMap:
    // case WeakSet:
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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Check for objects that allow string comparisons.
function checkInstance(a, b) {
  return a instanceof Date && b instanceof Date || a instanceof RegExp && b instanceof RegExp || a instanceof String && b instanceof String || a instanceof Number && b instanceof Number;
}

// Check if a is a Map or a Set.
function isMapSet(a) {
  return a.constructor === Map || a.constructor === Set;
}

// Compare Maps and Sets.
function checkMapSet(a, b) {
  if (a.size !== b.size) return false;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = b[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (a.constructor === Map) {
        var _item = _slicedToArray(item, 2),
            key = _item[0],
            val = _item[1];

        if (!a.has(key)) return false;
        if (a.get(key) !== val) return false;
      } else if (!a.has(item)) return false;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
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
  var type = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  if (type !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) return false;
  if (type === 'number' && isNaN(a) && isNaN(b)) return true;
  if (type !== 'object') return a === b;
  if (checkInstance(a, b)) return a.toString() === b.toString();

  // Check object equivalence.
  if (isPrototype(a, b)) return false;
  if (a.constructor !== b.constructor) return false;
  if (isMapSet(a) && !checkMapSet(a, b)) return false;
  if (a.prototype !== b.prototype) return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (var property in a) {
    if (!compare(a[property], b[property])) return false;
  }

  // Must be the same.
  return true;
}

var constructors = [Date, RegExp, String, Number, Map, WeakMap, Set, WeakSet, Promise];

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

export { copy, compare, merge };
//# sourceMappingURL=lib.es.js.map
