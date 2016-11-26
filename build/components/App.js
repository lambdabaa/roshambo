'use strict';

var Header = require('./Header');
var React = require('react');
var colorUuid = require('../colorUuid');

var _require = require('react-redux'),
    connect = _require.connect;

var identity = require('lodash/identity');
var play = require('../play');

function App(props) {
  function rock() {
    play('rock');
  }

  function paper() {
    play('paper');
  }

  function scissor() {
    play('scissor');
  }

  var playerColor = void 0,
      computerColor = void 0;
  switch (props.prev.winner) {
    case 1:
      playerColor = 'green';
      computerColor = 'red';
      break;
    case 2:
      playerColor = 'red';
      computerColor = 'green';
      break;
    default:
      playerColor = 'yellow';
      computerColor = 'yellow';
      break;
  }

  return React.createElement(
    'div',
    { className: 'app' },
    React.createElement(Header, null),
    React.createElement(
      'div',
      { className: 'panels' },
      React.createElement(
        'div',
        { className: 'panel play-panel player' },
        React.createElement(
          'h1',
          null,
          'PLAYER (',
          props.score.player,
          ')'
        ),
        React.createElement(
          'div',
          { className: 'play play-' + playerColor },
          props.prev.player.toUpperCase()
        ),
        React.createElement(
          'div',
          { className: 'controls' },
          React.createElement(
            'div',
            { className: 'btn', onClick: rock },
            'ROCK'
          ),
          React.createElement(
            'div',
            { className: 'btn', onClick: paper },
            'PAPER'
          ),
          React.createElement(
            'div',
            { className: 'btn', onClick: scissor },
            'SCISSOR'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'panel play-panel computer' },
        React.createElement(
          'h1',
          null,
          'COMPUTER (',
          props.score.computer,
          ')'
        ),
        React.createElement(
          'div',
          { className: 'play play-' + computerColor },
          props.prev.computer.toUpperCase()
        ),
        React.createElement('div', { className: 'controls' })
      ),
      React.createElement(
        'div',
        { className: 'panel scores' },
        props.leaderboard.map(function (record) {
          return React.createElement(
            'div',
            { className: 'record' },
            React.createElement(
              'div',
              { className: 'record-user' },
              colorUuid(record[0])
            ),
            React.createElement(
              'div',
              { className: 'record-score',
                style: { color: record[1] > 0 ? 'green' : 'red' } },
              record[1]
            )
          );
        })
      )
    )
  );
}

module.exports = connect(identity)(App);
