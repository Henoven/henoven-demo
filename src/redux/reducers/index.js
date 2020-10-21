import { combineReducers } from "redux";

import { sesion } from './sesion';
import { redirect } from './redirect';

export default combineReducers({
    sesion,
    redirect,
})