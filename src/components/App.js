// @flow

const Header = require('./Header');
const React = require('react');
const colorUuid = require('../colorUuid');
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

  return <div className="app">
    <Header />
    <div className="panels">
      <div className="panel play-panel player">
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
      <div className="panel play-panel computer">
        <h1>COMPUTER ({props.score.computer})</h1>
        <div className={`play play-${computerColor}`}>
          {props.prev.computer.toUpperCase()}
        </div>
        <div className="controls">
        </div>
      </div>
      <div className="panel scores">
        {
          props.leaderboard.map((record: Array<any>): React.Element<any> => {
            return <div className="record">
              <div className="record-user">{colorUuid(record[0])}</div>
              <div className="record-score"
                   style={{color: record[1] > 0 ? 'green' : 'red'}}>
                {record[1]}
              </div>
            </div>
          })
        }
      </div>
    </div>
  </div>;
}

module.exports = connect(identity)(App);
