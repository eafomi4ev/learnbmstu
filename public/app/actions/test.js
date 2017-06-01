import * as consts from '../consts/test';
import axios from 'axios';
import config from '../configs/main';

export function getTest(subjectId) {
  return {
    type: consts.GET_TEST,
    payload: axios.get(config.baseUrl + '/tests/random/' + subjectId),
  };
}
