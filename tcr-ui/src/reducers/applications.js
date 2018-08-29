import {
  REGISTER_APPLICATION,
  GET_INITIAL_APPLICATIONS,
  REMOVE_APPLICATION,
} from '../actions/applications';

export default function applications(state={}, action) {
  let newState = {};
  switch (action.type) {
    case REGISTER_APPLICATION:
      // console.log(action.application);
      return {
        ...state,
        [action.application.listingHash]: action.application
      };
    case GET_INITIAL_APPLICATIONS:
      newState = Object.assign(action.applications, state);
      return newState;
    case REMOVE_APPLICATION:
      Object.keys(state).forEach((listingHash) => {
        if (listingHash !== action.listingHash) {
          newState[listingHash] = state[listingHash];
        }
      })
      return newState;
    default:
      return state;
  }
}