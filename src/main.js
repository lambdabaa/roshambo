// @flow

const App = require('./components/App');
const {Provider} = require('react-redux');
const React = require('react');
const ReactDOM = require('react-dom');
const once = require('./once');
const store = require('./store');

function main(): void {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.container')
  );
}

once(document, 'DOMContentLoaded', main);
