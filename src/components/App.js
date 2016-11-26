// @flow

const React = require('react');
const {connect} = require('react-redux');
const identity = require('lodash/identity');
const play = require('../play');

function App(props: Object): React.Element<any> {
  function rock(): void {
    play('rock');
  }

  function paper(): void {
    play('paper');
  }

  function scissor(): void {
    play('scissor');
  }

  let playerColor, computerColor;
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

  return <div className="panels">
    <div className="panel player">
      <h1>PLAYER ({props.score.player})</h1>
      <div className={`play play-${playerColor}`}>
        {props.prev.player.toUpperCase()}
      </div>
      <div className="controls">
        <div className="btn" onClick={rock}>ROCK</div>
        <div className="btn" onClick={paper}>PAPER</div>
        <div className="btn" onClick={scissor}>SCISSOR</div>
      </div>
    </div>
    <div className="panel computer">
      <h1>COMPUTER ({props.score.computer})</h1>
      <div className={`play play-${computerColor}`}>
        {props.prev.computer.toUpperCase()}
      </div>
      <div className="controls">
      </div>
    </div>
  </div>;
}

module.exports = connect(identity)(App);
