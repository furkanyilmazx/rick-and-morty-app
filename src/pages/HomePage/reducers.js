import actionTypes from './action-types';

const initialState = {
  charactersLoading: false,
  characters: [],
  charactersApiInfo: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CHARACTERS:
      return { ...state, charactersLoading: true };
    case actionTypes.CHARACTERS_LOADED:
    console.log("dsad")
      return {
        ...state,
        charactersLoading: false,
        characters: [...state.characters, ...action.payload.characterList],
        charactersApiInfo: action.payload.response.info,
      };
    default:
      return state;
  }
};
