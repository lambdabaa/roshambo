// @flow

const Firebase = require('firebase/lib/firebase-web');
const objectToArray = require('./objectToArray');
const state = require('./state');

const ref = new Firebase('https://roshambo-6970c.firebaseio.com').child('leaderboard');

function start(): void {
  ref.on('value', snapshot => {
    const value = snapshot.val();
    const result = objectToArray(value).sort((a: Array<any>, b: Array<any>): number => {
      return b[1] - a[1];
    });

    state.set({leaderboard: result.slice(0, 10)});
  });
}

function update(user: string, score: number): Promise<void> {
  return ref.child(user).set(score);
}

exports.start = start;
exports.update = update;
