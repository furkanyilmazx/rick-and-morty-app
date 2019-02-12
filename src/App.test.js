import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combinedReducers } from './store';
import homePageServices from './pages/HomePage/services';
import characterDetailPageServices from './pages/CharacterDetailPage/services';
import App from './App';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(homePageServices);
sagaMiddleware.run(characterDetailPageServices);

it('app tests passed successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
