import * as consts from '../consts/subjects';
import axios from 'axios';
import config from '../configs/main';

export function getSubjects() {
  return {
    type: consts.GET_SUBJECTS,
    payload: axios.get(config.baseUrl + '/subjects/withlectures'),
  };
}

export function choose(value) {
  return {
    type: consts.CHOOSE_SUBJECT,
    payload: value,
  };
}

export function unChoose() {
  return {
    type: consts.UNCHOOSE_SUBJECT,
  };
}
