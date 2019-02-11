import { call, put, takeEvery } from 'redux-saga/effects';
import { characterLoaded } from './actions';
import actionTypes from './action-types';
import { Character } from '../../models';

export function* loadCharacter(actionPayload) {
  const res = yield call(() =>
    Character.get({ id: actionPayload.characterId }).then(async ({ model }) => {
      model.episode = await model.episode.map(async (episode) => {
        const response = await fetch(episode);
        const json = await response.json();
        return json;
      });
      model.episode = await Promise.all(model.episode);
      return model;
    })
  );
  yield put(characterLoaded(res));
}

export default function* characterDetailPageServices() {
  yield takeEvery(actionTypes.LOAD_CHARACTER, loadCharacter);
}
