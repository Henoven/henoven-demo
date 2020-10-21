import { createStore, compose, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";

import reducers from './../reducers';

const localStorageName = process.env.REACT_APP_LOCAL_STORAGE_NAME;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveToLocalStorage = (state) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem(localStorageName, serializedState);
    }
    catch(e){
        console.log(e);
    }
}

const loadFromLocalStorage = () => {
    try{
        const serializedState = localStorage.getItem(localStorageName)
        if(!serializedState) return {}
        return JSON.parse(serializedState)
    }
    catch(e){
        console.log(e);
        return {}
    }
}

const persistedState = loadFromLocalStorage()

const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(promiseMiddleware)));

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
