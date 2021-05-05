import { AuthActionTypes } from './auth.types';

const INITIAL_STATE = false;

const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AuthActionTypes.SET_LOGGED_IN:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;