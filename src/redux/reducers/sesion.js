import { handleActions } from 'redux-actions';
// Constants
import { LOGIN, LOGOUT, SET_ERROR, CLEAR_ERROR } from '../constants';

export const sesion = handleActions({
    [LOGIN]: (state, action) => ({...state, sesion: true, user: action.payload.User, error: action.payload.Error}),
    [LOGOUT]: (state, action) => ({...state, sesion: false, user: {}, error: {}}),

    [SET_ERROR]: (state, action) => ({...state, error: action.payload}),
    [CLEAR_ERROR]: (state, action) => ({...state, error: { Message: "", Value: "", RedirectUrl: "" }}),
}, { sesion: false, user: {}, error: {} })