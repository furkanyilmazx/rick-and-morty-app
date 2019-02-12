import actionTypes from './action-types';

export const loadCharacters = (charactersApiInfo) => {
  return { type: actionTypes.LOAD_CHARACTERS, charactersApiInfo };
};

export const charactersLoaded = (payload) => {
  return { type: actionTypes.CHARACTERS_LOADED, payload };
};

export const charactersAlreadyListed = () => {
  return { type: actionTypes.CHARACTERS_ALREADY_LISTED };
};
