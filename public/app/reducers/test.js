import * as consts from '../consts/test';

export function test(state = {test: null, isProcessing: false}, action) {
  switch (action.type) {
    case `${consts.GET_TEST}_PENDING`:
      state = {...state, isProcessing: true};
      break;
    case `${consts.GET_TEST}_FULFILLED`:
      state = {...state, isProcessing: false, test: action.payload.data};
      break;
    case `${consts.GET_TEST}_REJECTED`:
      state = {...state, isProcessing: false, test: action.payload.message};
      break;
  }

  return state;
}
