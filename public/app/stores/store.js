import thunk from 'redux-thunk'; //middleware, позволяет нам, возвращать не новое состояние, а функцию, которая принимает dispatcher
import {createLogger} from 'redux-logger'; //middleware, позволяет логировать action и его payload
import promise from 'redux-promise-middleware'; //middleware, позволяет возвращать промисы

import {createStore, combineReducers, applyMiddleware} from 'redux';

import {auth} from '../reducers/auth';

const mw = applyMiddleware(promise(), thunk, createLogger());

const reducer = combineReducers({
  user: auth,
});

const store = createStore(reducer, mw);

export default store;
