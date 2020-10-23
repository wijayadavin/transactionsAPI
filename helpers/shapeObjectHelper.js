
/**
 * Shape object based on arrays of keys
 *
 * Usage example:
 *
 *    shapeObject(body, model)
 *
 * @param {Object} inputObject object to shape
 * @param {Array} keys array of keys to filter
 * @return {Object} returns an `object` if `inputObject` isn't lack keys
 * @return {Boolean} returns a `false` if `inputObject` is lack of keys
 */
function shapeObject(inputObject, keys) {
  const result = {};
  const keysCounter = keys.length;
  let counter = 0;
  for (const namaKey in inputObject) {
    if (keys.includes(namaKey)) {
      result[namaKey] = inputObject[namaKey];
      counter++;
    }
  }
  if (counter < keysCounter) {
    return false;
  }
  return result;
}

module.exports = shapeObject;
