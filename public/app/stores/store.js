import thunk from 'redux-thunk'; //middleware, позволяет нам возвращать не новое состояние, а функцию, которая принимает dispatcher
import {createLogger} from 'redux-logger'; //middleware, позволяет логировать action и его payload
import promise from 'redux-promise-middleware'; //middleware, позволяет возвращать промисы
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import {auth} from '../reducers/auth';
import {subjects} from '../reducers/subjects';

const mw = applyMiddleware(promise(), thunk, createLogger());

const reducer = combineReducers({
  user: auth,
  subjects: subjects,
});

const store = createStore(reducer, composeWithDevTools(mw));

// store.subscribe(() => {
//   console.log('subscribe', store.getState());
// });

export default store;
