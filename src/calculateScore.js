// @flow

function calculateScore(state: Object): number {
  const {computer, player} = state.score;
  const count = computer + player;
  const decimal = count ? player / count : 0;
  const weighted = (100 * 0.5 + count * decimal) / (100 + count);
  // 2 decimals!
  return Math.floor(weighted * 10000) / 100;
}

module.exports = calculateScore;
