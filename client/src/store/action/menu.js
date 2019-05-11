import * as actionTypes from './actionTypes';
import client from '../../shared/axios-client';

export const handleQuantity = mealId => {
  return {
    type: actionTypes.MENU_HANDLE_QUANTITY,
    mealId
  };
};

export const hideQuantityModal = () => {
  return {
    type: actionTypes.MENU_HIDE_QUANTITY_MODAL
  };
};

export const menuFetchMenusStart = () => {
  return {
    type: actionTypes.MENU_FETCH_MENUS_START
  };
};

export const menuFetchMenusSuccess = resData => {
  return {
    type: actionTypes.MENU_FETCH_MENUS_SUCCESS,
    data: resData
  };
};

export const menuFetchMenusFailed = error => {
  return {
    type: actionTypes.MENU_FETCH_MENUS_FAILED,
    error
  };
};

export const menuFetchMenus = () => {
  return dispatch => {
    client
      .get('/menu/')
      .then(response => {
        dispatch(menuFetchMenusSuccess(response.data.data));
      })
      .catch(error => {
        dispatch(menuFetchMenusFailed(error));
      });
  };
};
