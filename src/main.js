// @flow

const App = require('./components/App');
const Header = require('./components/Header');
const {Provider} = require('react-redux');
const React = require('react');
const ReactDOM = require('react-dom');
const leaderboard = require('./leaderboard');
const once = require('./once');
const store = require('./store');

function main(): void {
  leaderboard.start();
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.container')
  );
}

once(document, 'DOMContentLoaded', main);
