import * as consts from '../consts/testing';

export function testing(state = {testing: null, isProcessing: false}, action) {
  switch (action.type) {
    case `${consts.START_TESTING}_PENDING`:
      state = {...state, isProcessing: true};
      break;
    case `${consts.START_TESTING}_FULFILLED`:
      state = {...state, isProcessing: false, testing: action.payload.data};
      break;
    case `${consts.START_TESTING}_REJECTED`:
      state = {...state, isProcessing: false, testing: action.payload.message};
      break;
  }

  return state;
}
