import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  lastReq: null
};

const setResCode = (state, action) => {
  return updateObject(state, {
    lastReq: action.res
  });
};

const resetResCode = (state, action) => {
  return updateObject(state, {
    lastReq: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_RES_CODE:
      return setResCode(state, action);
    case actionTypes.RESET_RES_CODE:
      return resetResCode(state, action);
    default:
      return state;
  }
};

export default reducer;
