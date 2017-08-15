import * as consts from '../consts/testing';
import axios from 'axios';
import config from '../configs/main';
import moment from 'moment';

export function startTesting(userId, testId) {
  return {
    type: consts.START_TESTING,
    payload: axios.post(config.baseUrl + '/tests/start', {
      userId,
      testId,
    }),
  };
}

export function startTime(testDuration) {
  let hours = +testDuration.substr(0, 2);
  let minutes = +testDuration.substr(3, 2);
  let seconds = +testDuration.substr(6, 2);
  let date = moment(new Date()).hour(hours).minute(minutes).second(seconds);
  debugger;
  return {
    type: consts.TICK_TIME,
    payload: date,
  };
}

export function tickTimer(time) {
  debugger;
  return {
    type: consts.TICK_TIME,
    payload: time.add(-1, 'seconds'),
  };
}
