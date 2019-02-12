import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combinedReducers } from '../../store';
import homePageServices from '../HomePage/services';
import characterDetailPageServices from './services';

import CharacterDetailPage from './CharacterDetailPage';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));

it('CharacterCard tests passed successfully', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <CharacterDetailPage />
      </MemoryRouter>
    </Provider>,
    div
  );
});
