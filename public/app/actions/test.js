import * as consts from '../consts/test';
import axios from 'axios';
import config from '../configs/main';
import { browserHistory } from 'react-router';

export function getTest(subjectId) {
  return {
    type: consts.GET_TEST,
    payload: axios.get(config.baseUrl + '/tests/random/' + subjectId).then((res) => {
      browserHistory.push('/tests/start/'+subjectId);
      return res;
    }),
  };
}
