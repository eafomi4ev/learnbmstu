import * as consts from '../consts/subjects';
import axios from 'axios';
import config from '../configs/main';

export function getSubjects() {
  return {
    type: consts.GET_SUBJECTS,
    payload: axios.get(config.baseUrl + '/subjects/withlectures'),
  };
}
