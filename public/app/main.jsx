'use strict';

import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  Redirect,
} from 'react-router';
import {CookiesProvider} from 'react-cookie';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Header from './components/header/Header';
import SubjectsList from './components/sidebar/SubjectsList';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import Lecture from './components/lecture/Lecture';
// import Auth from './components/Auth';
import Authorization from './components/Authorization';
import CreateSubject from './components/subject/CreateSubject';

const Editor = Authorization(['editor']);

function user(state = {auth: false, data: null}, action) {
  if (action.type === 'LOGIN_USER') {
    return {...state, ...{user: action.payload}};
  }
  if (action.type === 'LOGOUT_USER') {
    return {...state, ...{user: action.payload}};
  }
  return state;
}

const store = createStore(user, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <CookiesProvider>
          <Route path="/" component={Header}>
            <IndexRoute component={SubjectsList}/>
            <Route path='/:subject/lectures/:id' component={SubjectsList}>
              <IndexRoute component={Lecture}/>
            </Route>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/subjects/create" component={SubjectsList}>
              <IndexRoute component={CreateSubject}/>
            </Route>
          </Route>
        </CookiesProvider>
      </Router>
    </Provider>,
    document.getElementById('root'));



// store.subscribe(() => {
//   console.log('subscribe', store.getState());
// });
//
// store.dispatch({
//   type: 'LOGIN_USER',
//   payload: {
//     auth: true,
//     data: {
//       id: 1,
//       login: 'jir2000',
//       roleid: 2,
//       rolename: 'student',
//       groupid: 1,
//       groupname: 'ИУ1-123',
//     },
//   },
// });
//
// store.dispatch({
//   type: 'LOGOUT_USER',
//   payload: {
//     auth: false,
//     data: null,
//   },
// });