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
    clone[property] = copy(obj[property]);
  }return clone;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

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
  if (a.isPrototypeOf(b) || b.isPrototypeOf(a)) return false;
  if (a.constructor !== b.constructor) return false;
  if (a.prototype !== b.prototype) return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (var property in a) {
    if (!compare(a[property], b[property])) return false;
  }

  // Must be the same.
  return true;
}

// Check for objects that allow string comparisons.
function checkInstance(a, b) {
  return a instanceof Date && b instanceof Date || a instanceof RegExp && b instanceof RegExp || a instanceof String && b instanceof String || a instanceof Number && b instanceof Number;
}

function merge(a, b) {
  if (!(a instanceof Object) || !(b instanceof Object)) throw new TypeError('You can only merge objects.');

  for (var property in b) {
    var oldProp = a[property];
    var newProp = b[property];
    if (compare(oldProp, newProp)) continue;
    if (newProp instanceof Object && oldProp instanceof Object) {
      merge(oldProp, newProp);
    } else a[property] = newProp;
  }
}

export { copy, compare, merge };
