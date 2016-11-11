function copy(obj) {
  let clone;

  // Return literals.
  if (!(obj instanceof Object)) return obj;

  // Create clone object with proper params.
  const Constructor = obj.constructor;
  switch (Constructor) {
    case Date:
    case RegExp:
      clone = new Constructor(obj);
      break;
    default:
      clone = new Constructor();
  }

  // Copy each property.
  for (let property in obj) clone[property] = copy(obj[property]);

  return clone;
}

export default copy
