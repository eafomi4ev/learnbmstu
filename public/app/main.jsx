'use strict';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import 'font-awesome/css/font-awesome.css';
import 'script-loader!jquery';
import 'script-loader!bootstrap/dist/js/bootstrap.js';

import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  Redirect,
} from 'react-router';
// import {CookiesProvider} from 'react-cookie';
import {Provider} from 'react-redux';

import React from 'react';
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
import HomePage from './components/home/HomePage';
import TestingQuestion from './components/testing/TestingQuestion';
import Report from './components/testing/Report';
import HomePageContent from './components/home/HomePageContent';


const Editor = Authorization(['editor']);
// <Route path="/auth" components={Editor(LoginPage)}/>

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>

      <Route path="/" component={HomePage}>
        <IndexRoute component={HomePageContent}/>
        <Route path='/subject/:subjectId/lecture/:lectureId' component={Lecture}/>
        <Route path="/subjects/create" component={CreateSubject}/>
        <Route path="/tests/create" component={CreateTest}/>
        <Route path="/tests/choice" component={SubjectChoice}/>
        <Route path="/tests/start/:subjectId" component={TestingQuestion}/>
        <Route path="/tests/reportpdf/:id" component={Report}/>
      </Route>

      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegisterPage}/>

    </Router>
  </Provider>,
  document.getElementById('root'));
