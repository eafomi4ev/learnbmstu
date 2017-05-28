'use strict';

import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  Redirect,
} from 'react-router';
// import {CookiesProvider} from 'react-cookie';
import {Provider} from 'react-redux';

import Header from './components/header/Header';
import SubjectsList from './components/sidebar/SubjectsList';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import Lecture from './components/lecture/Lecture';
import Authorization from './components/Authorization';
import CreateSubject from './components/createSubject/CreateSubject';
import CreateTest from './components/createTest/CreateTest';
import SubjectChoice from './components/testing/SubjectChoice';
import store from './stores/store';

// const Editor = Authorization(['editor']);
// <Route path="/auth" components={Editor(LoginPage)}/>


ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
          <Route path="/" component={Header}>
            <IndexRoute component={SubjectsList}/>
            <Route path='/subject/:subjectId/lecture/:lectureId' component={SubjectsList}>
              <IndexRoute component={Lecture}/>
            </Route>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/subjects/create" component={SubjectsList}>
              <IndexRoute component={CreateSubject}/>
            </Route>
            <Route path="/tests/create" component={SubjectsList}>
              <IndexRoute component={CreateTest}/>
            </Route>
            <Route path="/tests/start" component={SubjectsList}>
              <IndexRoute component={SubjectChoice}/>
            </Route>
          </Route>
      </Router>
    </Provider>,
    document.getElementById('root'));
