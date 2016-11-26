'use strict';

var store = require('./store');

function get() {
  return store.getState();
}

function set(delta) {
  var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  store.dispatch({ type: deep ? 'DEEP' : 'SHALLOW', delta: delta });
  console.log(get());
}

exports.get = get;
exports.set = set;
