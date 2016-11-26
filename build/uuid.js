'use strict';

var range = require('lodash/range');
var sample = require('lodash/sample');

var groups = [['white', 'grey', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet'], ['dragon', 'ninja', 'knight', 'pegasus', 'warrior', 'gladiator', 'leviathan', 'tiger', 'fairy', 'phoenix'], ['island', 'mountain', 'sky', 'field', 'forest', 'river', 'volcano', 'plateau', 'canyon', 'valley'], range(1, 1001).map(function (x) {
  return '' + x;
}), range(0, 26).map(function (x) {
  return String.fromCharCode(x + 97);
})];

function uuid() {
  var parts = groups.map(sample);
  return parts[0] + '-' + parts[1] + '-' + parts[2] + '-' + parts[3] + parts[4];
}

module.exports = uuid;
module.exports.colors = groups[0];
