import actionTypes from './action-types';

export const loadCharacter = (characterId) => {
  return { type: actionTypes.LOAD_CHARACTER, characterId };
};

export const characterLoaded = (payload) => {
  return { type: actionTypes.CHARACTER_LOADED, payload };
};
