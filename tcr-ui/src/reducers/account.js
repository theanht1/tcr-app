import { SET_ACCOUNT, SET_ETHER, SET_TOKEN, SET_ALLOWANCE } from '../actions/account'

export default function account(state={}, action) {
  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...state,
        account: action.account
      }
    case SET_ETHER:
      return {
        ...state,
        ether: action.ether
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case SET_ALLOWANCE:
      return {
        ...state,
        allowance: action.allowance
      };
    default:
      return state;
  }
}