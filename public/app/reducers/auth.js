import * as consts from '../consts/auth';

export function auth(state = {user: null, isProcessing: false}, action) {
  console.log(action.type);
  switch (action.type) {
    case `${consts.LOGIN}_PENDING`:
      debugger;
      state = {...state, isProcessing: true};
      break;
    case `${consts.LOGIN}_FULFILLED`:
      debugger;
      state = {...state, isProcessing: false, user: action.payload.data};
      break;
    case `${consts.LOGIN}_REJECTED`:
      debugger;
      state = {...state, isProcessing: false, error_message: action.payload.message};
      break;
    case `${consts.LOGOUT}_PENDING`:
      state = {...state, isProcessing: true};
      break;
    case `${consts.LOGOUT}_FULFILLED`:
      state = {...state, isProcessing: false, user: null};
      break;
    case `${consts.LOGOUT}_REJECTED`:
      state = {...state, isProcessing: false, error_message: action.payload.message};
      break;
  }

  return state;
}


// const FETCH_ARTICLES_PENDING = 'FETCH_ARTICLES_PENDING';
// const FETCH_ARTICLES_FULFILLED = 'FETCH_ARTICLES_FULFILLED';
// const FETCH_ARTICLES_REJECTED = 'FETCH_ARTICLES_REJECTED';