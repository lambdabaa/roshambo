// @flow

function objectToArray(obj: Object): Array<Array<any>> {
  let result = [];
  for (let key in obj) {
    result.push([key, obj[key]]);
  }

  return result;
}

module.exports = objectToArray;
