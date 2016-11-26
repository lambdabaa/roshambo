'use strict';

var React = require('react');

var _require = require('./uuid'),
    colors = _require.colors;

function colorUuid(uuid) {
  var color = colors.find(function (aColor) {
    return uuid.includes(aColor);
  });

  return React.createElement(
    'div',
    { style: { color: color } },
    uuid
  );
}

module.exports = colorUuid;
