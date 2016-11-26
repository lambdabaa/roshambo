'use strict';

var _require = require('redux'),
    createStore = _require.createStore;

var merge = require('lodash/merge');
var uuid = require('./uuid');

var initialState = {
  id: uuid(),
  leaderboard: [],
  history: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  prev: {
    computer: 'rock',
    player: 'rock',
    winner: 0
  },
  score: {
    computer: 0,
    player: 0
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'DEEP':
      return merge({}, state, action.delta);
    case 'SHALLOW':
      return Object.assign({}, state, action.delta);
    default:
      return state;
  }
}

module.exports = createStore(reducer, initialState);
