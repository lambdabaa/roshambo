"use strict";

function calculateScore(state) {
  var _state$score = state.score,
      computer = _state$score.computer,
      player = _state$score.player;

  var count = computer + player;
  var decimal = count ? player / count : 0;
  var weighted = (100 * 0.5 + count * decimal) / (100 + count);
  // 2 decimals!
  return Math.floor(weighted * 10000) / 100;
}

module.exports = calculateScore;
