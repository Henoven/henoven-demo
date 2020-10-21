import { createAction } from 'redux-actions';
// Constants
import { CLEAR_REDIRECT, SET_REDIRECT } from './../constants';

export const setRedirect = createAction(SET_REDIRECT, (url) => url);

export const clearRedirect = createAction(CLEAR_REDIRECT, () => null);