import { handleActions } from 'redux-actions';
// Constants
import { SET_REDIRECT, CLEAR_REDIRECT } from '../constants';

export const redirect = handleActions({
    [SET_REDIRECT]: (state, action) => ({ ...state, redirect: action.payload }),
    [CLEAR_REDIRECT]: (state, action) => ({ ...state, redirect: action.payload }),
}, { redirect: null })