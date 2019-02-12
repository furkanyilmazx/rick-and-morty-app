import actionTypes from './action-types';
import * as actions from './actions';

describe('Home Page actions tests', () => {
  it('should create an action to loadCharacters', () => {
    const charactersApiInfo = { a: 'Finish docs' };
    const expectedAction = {
      type: actionTypes.LOAD_CHARACTERS,
      charactersApiInfo,
    };
    expect(actions.loadCharacters(charactersApiInfo)).toEqual(expectedAction);
  });
  it('should create an action to charactersLoaded', () => {
    const payload = {};
    const expectedAction = {
      type: actionTypes.CHARACTERS_LOADED,
      payload,
    };
    expect(actions.charactersLoaded(payload)).toEqual(expectedAction);
  });
  it('should create an action to charactersAlreadyListed', () => {
    const expectedAction = {
      type: actionTypes.CHARACTERS_ALREADY_LISTED,
    };
    expect(actions.charactersAlreadyListed()).toEqual(expectedAction);
  });
});
