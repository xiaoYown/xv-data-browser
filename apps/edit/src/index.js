import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import MouseMapsEvents from './core/events/mouse-maps';
import busKeyMaps from './core/events/key-maps';

React.busMouseMaps = MouseMapsEvents();
React.busKeyMaps = busKeyMaps();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
