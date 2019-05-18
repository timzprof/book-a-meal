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
  return async dispatch => {
    dispatch(menuFetchMenusStart());
    try {
      const response = await client.get('/menu/');
      dispatch(menuFetchMenusSuccess(response.data.data));
    } catch (error) {
      dispatch(menuFetchMenusFailed(error));
    }
  };
};

export const menuFetchSingleMenuStart = () => {
  return {
    type: actionTypes.MENU_FETCH_SINGLE_MENU_START
  };
};

export const menuFetchSingleMenuSuccess = data => {
  return {
    type: actionTypes.MENU_FETCH_SINGLE_MENU_SUCCESS,
    data
  };
};

export const menuFetchSingleMenuFailed = error => {
  return {
    type: actionTypes.MENU_FETCH_SINGLE_MENU_FAILED,
    error
  };
};

export const menuFetchSingleMenu = () => {
  return async dispatch => {
    dispatch(menuFetchSingleMenuStart());
    try {
      const response = await client.get('/menu/caterer', { headers: { 'X-Req': true } });
      dispatch(menuFetchSingleMenuSuccess(response.data.data));
    } catch (error) {
      dispatch(menuFetchSingleMenuFailed(error));
    }
  };
};
