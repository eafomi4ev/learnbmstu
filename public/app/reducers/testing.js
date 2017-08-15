import * as consts from '../consts/testing';

export function testing(state = {testing: null, isProcessing: false}, action) {
  switch (action.type) {
    case `${consts.START_TESTING}_PENDING`:
      state = {...state, isProcessing: true};
      break;
    case `${consts.START_TESTING}_FULFILLED`:
      state = {...state, isProcessing: false, testing: {...state.testing, id: action.payload.data.id}};
      break;
    case `${consts.START_TESTING}_REJECTED`:
      state = {...state, isProcessing: false, testing: action.payload.message};
      break;
    case `${consts.TICK_TIME}`: {
      debugger;
      state = {...state, testing: {...state.testing, time: action.payload}};
      break;
    }
  }

  return state;
}
