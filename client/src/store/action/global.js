import * as actionTypes from './actionTypes';

export const setResCode = res => {
  return {
    type: actionTypes.SET_RES_CODE,
    res
  };
};

export const resetResCode = () => {
  return {
    type: actionTypes.RESET_RES_CODE
  };
};