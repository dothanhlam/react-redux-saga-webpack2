import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
//saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';

import 'babel-polyfill';
import logger from 'dev/logger';

import rootReducer from 'reducers';
import Routes from 'routes';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { createDevTools } from 'redux-devtools';

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'
                 defaultIsVisible={false}>
      <LogMonitor theme='tomorrow' />
    </DockMonitor>
);

// Load SCSS
import '../scss/app.scss';

const isProduction = process.env.NODE_ENV === 'production';
//saga
const saga = createSagaMiddleware();

// Creating store
let store = null;

if (isProduction) {
  const middleware = applyMiddleware(saga);

  store = createStore(
    rootReducer,
    middleware
  );
} else {

  // logger and DevTools are added
  const middleware = applyMiddleware(saga, logger);
  const enhancer = compose(
    middleware,
    DevTools.instrument()
  );

  store = createStore(
    rootReducer,
    enhancer
  );
}

saga.run(rootSaga);

// Render it to DOM
ReactDOM.render(
  <Provider store={ store }>
    { isProduction ?
      <Routes /> :
      <div>
        <Routes />
        <DevTools />
      </div> }
  </Provider>,
  document.getElementById('root')
);
