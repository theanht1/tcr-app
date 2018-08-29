import {
  GET_INITIAL_CHALLENGES,
  ADD_CHALLENGE
} from '../actions/challenges';

export default function challenges(state={}, action) {
  switch (action.type) {
    case GET_INITIAL_CHALLENGES:
      const newState = Object.assign(action.challenges, state);
      return {
        ...newState
      };
    case ADD_CHALLENGE:
      return {
        ...state,
        [action.challenge.challengeID]: action.challenge
      }
    default:
      return state;
  }
}