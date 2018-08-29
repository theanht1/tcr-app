import { combineReducers } from 'redux';
import applications from './applications';
import account from './account';
import challenges from './challenges';

export default combineReducers({
  account,
  applications,
  challenges
})