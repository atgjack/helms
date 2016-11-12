function copy(obj) {
  let clone;

  // Return literals.
  if (!(obj instanceof Object)) return obj;

  // Create clone object with proper params.
  const Constructor = obj.constructor;
  switch (Constructor) {
    case Date:
    case Map:
    case Set:
    case RegExp:
      clone = new Constructor(obj);
      break;
    case Promise:
      clone = new Constructor((resolve, reject) => {
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
  for (const property in obj) {
    if (Object.hasOwnProperty.call(obj, property)) {
      clone[property] = copy(obj[property]);
    }
  }

  return clone;
}

export default copy;
