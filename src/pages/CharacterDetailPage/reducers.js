import actionTypes from './action-types';

const initialState = {
  characterLoading: false,
  character: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CHARACTER:
      return { ...state, characterLoading: true };
    case actionTypes.CHARACTER_LOADED:
      return {
        ...state,
        characterLoading: false,
        character: action.payload,
      };
    default:
      return state;
  }
};
