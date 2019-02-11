import { call, put, takeEvery } from 'redux-saga/effects';
import { charactersLoaded } from './actions';
import actionTypes from './action-types';

export function* loadCharacters(actionPayload) {
  const { charactersApiInfo } = actionPayload;
  const res = yield call(() =>
    fetch(
      charactersApiInfo
        ? charactersApiInfo.next
        : 'https://rickandmortyapi.com/api/character/'
    ).then((response) => response.json())
  );
  yield put(charactersLoaded({ characterList: res.results, response: res }));
}

export default function* homePageServices() {
  yield takeEvery(actionTypes.LOAD_CHARACTERS, loadCharacters);
}
