import * as consts from '../consts/testing';
import axios from 'axios';
import config from '../configs/main';

export function startTesting(userId, testId) {
  return {
    type: consts.START_TESTING,
    payload: axios.post(config.baseUrl+'/tests/start', {
      userId,
      testId,
    }),
  };
}
