import { combineReducers } from 'redux';
import homePageReducer from './pages/HomePage/reducers';
import characterDetailPageReducer from './pages/CharacterDetailPage/reducers';

export const combinedReducers = combineReducers({
  homePageReducer,
  characterDetailPageReducer,
});
