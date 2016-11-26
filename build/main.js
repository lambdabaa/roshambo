'use strict';

var App = require('./components/App');
var Header = require('./components/Header');

var _require = require('react-redux'),
    Provider = _require.Provider;

var React = require('react');
var ReactDOM = require('react-dom');
var leaderboard = require('./leaderboard');
var once = require('./once');
var store = require('./store');

function main() {
  leaderboard.start();
  ReactDOM.render(React.createElement(
    Provider,
    { store: store },
    React.createElement(App, null)
  ), document.querySelector('.container'));
}

once(document, 'DOMContentLoaded', main);
