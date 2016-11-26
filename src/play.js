// @flow

const debug = console.log.bind(console, '[play]');
const perceptron = require('./perceptron');
const state = require('./state');
const sum = require('lodash/sum');

const rock = perceptron('rock');
const paper = perceptron('paper');
const scissor = perceptron('scissor');

async function play(move: string): Promise<void> {
  const aState = state.get();
  const choice = await getComputerMove(aState.history);
  debug(`Human plays: ${move} [${encode(move)}]`);
  debug(`Computer plays: ${decode(choice)} [${choice}]`);

  let winner;
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

  if (winner !== 2) {
    // The computer did not win -- update perceptrons!
    await Promise.all([
      rock.update(aState.history, encode(move) === 3),
      paper.update(aState.history, encode(move) === 1),
      scissor.update(aState.history, encode(move) === 2)
    ]);
  }

  const computer = aState.score.computer + (winner === 2 ? 1 : 0);
  const player = aState.score.player + (winner === 1 ? 1 : 0);
  state.set({
    history: [encode(move), choice].concat(aState.history.slice(0, 18)),
    prev: {
      computer: decode(choice),
      player: move,
      winner
    },
    score: {computer, player}
  });
}

async function getComputerMove(x: Array<number>): Promise<number> {
  let activations = await Promise.all(
    [rock, paper, scissor].map(p => p.prediction(x))
  );

  let move;
  let max = -Infinity;
  activations.forEach((activation: number, idx: number): void => {
    if (activation > max) {
      max = activation;
      move = idx;
    }
  });

  return move + 1;
}

function encode(x: string): number {
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

function decode(x: number): string {
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
