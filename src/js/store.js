'use strict'

import reducer from './reducers';

import thunk from 'redux-thunk';

import { createStore, combineReducers, applyMiddleware } from 'redux';


export default function configureStore(initialState) {
  const store = createStore(
  	reducer,
  	initialState,
    applyMiddleware(thunk),
  );

  return store;
}