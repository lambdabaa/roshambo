const range = require('lodash/range');
const sample = require('lodash/sample');

const groups = [
  ['white', 'grey', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet'],
  ['dragon', 'ninja', 'knight', 'pegasus', 'warrior', 'gladiator', 'leviathan', 'tiger', 'fairy', 'phoenix'],
  ['island', 'mountain', 'sky', 'field', 'forest', 'river', 'volcano', 'plateau', 'canyon', 'valley'],
  range(1, 1001).map((x: number): string => '' + x),
  range(0, 26).map((x: number): string => String.fromCharCode(x + 97))
];

function uuid(): string {
  const parts = groups.map(sample);
  return `${parts[0]}-${parts[1]}-${parts[2]}-${parts[3]}${parts[4]}`;
}

module.exports = uuid;
module.exports.colors = groups[0];
