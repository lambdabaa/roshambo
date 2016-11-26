// @flow

const store = require('./store');

function get(): Object {
  return store.getState();
}

function set(delta: Object, deep: boolean = false): void {
  store.dispatch({type: deep ? 'DEEP' : 'SHALLOW', delta});
  console.log(get());
}

exports.get = get;
exports.set = set;
