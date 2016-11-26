'use strict';

var play = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(move) {
    var aState, choice, winner, computer, player;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            aState = state.get();
            _context.next = 3;
            return getComputerMove(aState.history);

          case 3:
            choice = _context.sent;

            debug('Human plays: ' + move + ' [' + encode(move) + ']');
            debug('Computer plays: ' + decode(choice) + ' [' + choice + ']');

            winner = void 0;

            if (choice < 1 || choice > 3) {
              winner = 1;
            } else if (encode(move) === choice) {
              winner = 0;
            } else if (move === 'rock') {
              winner = choice === 2 ? 2 : 1;
            } else if (move === 'paper') {
              winner = choice === 3 ? 2 : 1;
            } else if (move === 'scissor') {
              winner = choice === 1 ? 2 : 1;
            }

            if (!(winner !== 2)) {
              _context.next = 11;
              break;
            }

            _context.next = 11;
            return Promise.all([rock.update(aState.history, encode(move) === 3), paper.update(aState.history, encode(move) === 1), scissor.update(aState.history, encode(move) === 2)]);

          case 11:
            computer = aState.score.computer + (winner === 2 ? 1 : 0);
            player = aState.score.player + (winner === 1 ? 1 : 0);

            state.set({
              history: [encode(move), choice].concat(aState.history.slice(0, 18)),
              prev: {
                computer: decode(choice),
                player: move,
                winner: winner
              },
              score: { computer: computer, player: player }
            });

            leaderboard.update(aState.id, calculateScore(state.get()));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function play(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getComputerMove = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(x) {
    var activations, move, max;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Promise.all([rock, paper, scissor].map(function (p) {
              return p.prediction(x);
            }));

          case 2:
            activations = _context2.sent;
            move = void 0;
            max = -Infinity;

            activations.forEach(function (activation, idx) {
              if (activation > max) {
                max = activation;
                move = idx;
              }
            });

            return _context2.abrupt('return', move + 1);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getComputerMove(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var calculateScore = require('./calculateScore');
var debug = console.log.bind(console, '[play]');
var leaderboard = require('./leaderboard');
var perceptron = require('./perceptron');
var state = require('./state');
var sum = require('lodash/sum');

var rock = perceptron('rock');
var paper = perceptron('paper');
var scissor = perceptron('scissor');

function encode(x) {
  switch (x) {
    case 'rock':
      return 1;
    case 'paper':
      return 2;
    case 'scissor':
      return 3;
    default:
      return 0;
  }
}

function decode(x) {
  switch (x) {
    case 1:
      return 'rock';
    case 2:
      return 'paper';
    case 3:
      return 'scissor';
    default:
      return '???';
  }
}

module.exports = play;
