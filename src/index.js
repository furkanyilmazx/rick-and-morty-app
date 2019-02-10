import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { combinedReducers } from './store';
import services from './services';
import { settings } from 'rest-in-model';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(services);

settings.addEndpoint([
  {
    name: 'rickandmorty',
    value: 'https://cors-anywhere.herokuapp.com/https://rickandmortyapi.com/',
    default: true,
  },
]);

settings.addApiPath([
  {
    name: 'api',
    value: '/api',
    default: true,
  },
]);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
