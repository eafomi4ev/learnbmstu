import * as consts from '../consts/subjects';

export function subjects(state = {subjects: null, isProcessing: false}, action) {
  switch (action.type) {
    case `${consts.GET_SUBJECTS}_PENDING`:
      state = {...state, isProcessing: true};
      break;
    case `${consts.GET_SUBJECTS}_FULFILLED`:
      state = {...state, isProcessing: false, subjects: action.payload.data};
      break;
    case `${consts.GET_SUBJECTS}_REJECTED`:
      state = {...state, isProcessing: false, error_message: action.payload.message};
      break;
  }

  return state;
}
