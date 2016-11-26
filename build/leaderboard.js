'use strict';

var Firebase = require('firebase/lib/firebase-web');
var objectToArray = require('./objectToArray');
var state = require('./state');

var ref = new Firebase('https://roshambo-6970c.firebaseio.com').child('leaderboard');

function start() {
  ref.on('value', function (snapshot) {
    var value = snapshot.val();
    var result = objectToArray(value).sort(function (a, b) {
      return b[1] - a[1];
    });

    state.set({ leaderboard: result.slice(0, 10) });
  });
}

function update(user, score) {
  return ref.child(user).set(score);
}

exports.start = start;
exports.update = update;
