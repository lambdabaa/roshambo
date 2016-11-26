'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Firebase = require('firebase/lib/firebase-web');
var debug = console.log.bind(console, '[perceptron]');

function perceptron(name) {
  var prediction = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(x) {
      var _ref2, w, b;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              debug('Making prediction for ' + JSON.stringify(x));
              _context.next = 3;
              return get();

            case 3:
              _ref2 = _context.sent;
              w = _ref2.w;
              b = _ref2.b;
              return _context.abrupt('return', activation(x, w, b));

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function prediction(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var update = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(x, activate) {
      var y, _ref4, w, b, wf;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              y = activate ? 1 : -1;

              debug('Update x = ' + JSON.stringify(x) + ', y = ' + y);
              _context2.next = 4;
              return get();

            case 4:
              _ref4 = _context2.sent;
              w = _ref4.w;
              b = _ref4.b;
              wf = w.map(function (wi, idx) {
                return wi + y * x[idx];
              });
              _context2.next = 10;
              return ref.update({ w: wf, b: b + y });

            case 10:
              return _context2.abrupt('return', _context2.sent);

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function update(_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var get = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var snapshot;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return ref.once('value');

            case 2:
              snapshot = _context3.sent;
              return _context3.abrupt('return', snapshot.val());

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function get() {
      return _ref5.apply(this, arguments);
    };
  }();

  var ref = new Firebase('https://roshambo-6970c.firebaseio.com').child(name);

  function activation(x, w, b) {
    return b + x.reduce(function (sum, xi, idx) {
      return sum + w[idx] * xi;
    }, 0);
  }

  return { prediction: prediction, update: update };
}

module.exports = perceptron;
