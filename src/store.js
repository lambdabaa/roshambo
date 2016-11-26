// @flow

const {createStore} = require('redux');
const merge = require('lodash/merge');
const uuid = require('./uuid');

type Action = {
  type: 'DEEP' | 'SHALLOW';
  delta: Object;
};

const initialState = {
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

function reducer(state: Object, action: Action): Object {
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
