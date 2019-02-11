import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { settings } from 'rest-in-model';
import registerServiceWorker from './registerServiceWorker';
import { combinedReducers } from './store';
import homePageServices from './pages/HomePage/services';
import characterDetailPageServices from './pages/CharacterDetailPage/services';
import App from './App';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(homePageServices);
sagaMiddleware.run(characterDetailPageServices);

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
