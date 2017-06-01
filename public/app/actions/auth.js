import * as consts from '../consts/auth';
import axios from 'axios';
import config from '../configs/main';

// const conf = require('config');

export function login(userName, password) {
  return {
    type: consts.LOGIN,
    payload: axios.post(config.baseUrl + '/users/login', {
      login: userName,
      password,
    }),
  };
}

export function logout(userName) {
  return {
    type: consts.LOGOUT,
    payload: axios.post(config.baseUrl + '/users/logout', {
      login: userName,
    }),
  };
}

export function getUserCookie() {
  return {
    type: consts.GET_USER_COOKIE,
  };
}
