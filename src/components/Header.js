// @flow

const React = require('react');
const calculateScore = require('../calculateScore');
const {connect} = require('react-redux');
const identity = require('lodash/identity');

function Header(props: Object): React.Element<any> {
  return <div className="header">
    <div className="branding">ro-sham-bo</div>
    <div className="stats">
      <div className="stat stats-id">
        <div className="stats-key">USER</div>
        <div className="stats-value">{props.id}</div>
      </div>
      <div className="stat stats-score">
        <div className="stats-key">SCORE</div>
        <div className="stats-value">{calculateScore(props)}</div>
      </div>
    </div>
  </div>;
}

module.exports = connect(identity)(Header);
