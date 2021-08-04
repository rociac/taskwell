import { AuthActionTypes } from './auth.types';

export const setLoggedIn = status => ({
  type: AuthActionTypes.SET_LOGGED_IN,
  payload: status
});