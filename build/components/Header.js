'use strict';

var React = require('react');
var calculateScore = require('../calculateScore');

var _require = require('react-redux'),
    connect = _require.connect;

var identity = require('lodash/identity');

function Header(props) {
  return React.createElement(
    'div',
    { className: 'header' },
    React.createElement(
      'div',
      { className: 'branding' },
      'ro-sham-bo'
    ),
    React.createElement(
      'div',
      { className: 'stats' },
      React.createElement(
        'div',
        { className: 'stat stats-id' },
        React.createElement(
          'div',
          { className: 'stats-key' },
          'USER'
        ),
        React.createElement(
          'div',
          { className: 'stats-value' },
          props.id
        )
      ),
      React.createElement(
        'div',
        { className: 'stat stats-score' },
        React.createElement(
          'div',
          { className: 'stats-key' },
          'SCORE'
        ),
        React.createElement(
          'div',
          { className: 'stats-value' },
          calculateScore(props)
        )
      )
    )
  );
}

module.exports = connect(identity)(Header);
