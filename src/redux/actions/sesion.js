import { createAction } from 'redux-actions';
// Constants
import { LOGIN, LOGOUT, SET_ERROR, CLEAR_ERROR } from './../constants';

// export const doLogIn = createAction(LOGIN, (user) => user);
export const doLogIn = createAction(LOGIN, (user) => user);
export const doLogOut = createAction(LOGOUT, () => null);

export const setError = createAction(SET_ERROR, (error) => error);
export const clearError = createAction(CLEAR_ERROR, () => null);

