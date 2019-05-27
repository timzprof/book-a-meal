import * as actionTypes from './actionTypes';
import client from '../../shared/axios-client';
import { toast } from '../../shared/toast';

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

export const menuAddMealsToMenuStart = () => {
  return {
    type: actionTypes.MENU_ADD_MEALS_TO_MENU_START
  };
};

export const menuAddMealsToMenuSuccess = () => {
  return {
    type: actionTypes.MENU_ADD_MEALS_TO_MENU_SUCCESS
  };
};

export const menuAddMealsToMenuFailed = error => {
  return {
    type: actionTypes.MENU_ADD_MEALS_TO_MENU_FAILED,
    error
  };
};

export const menuAddMealsToMenu = mealsData => {
  return async dispatch => {
    dispatch(menuAddMealsToMenuStart());
    try {
      const token = localStorage.getItem('c_token');
      for await (let mealData of mealsData) {
        await client.post('/menu/', mealData, {
          headers: {
            Authorization: token
          }
        });
      }
      toast('success', 'Menu Modified');
      dispatch(menuAddMealsToMenuSuccess());
    } catch (error) {
      toast('error', 'Failed to Modify Menu');
      dispatch(menuAddMealsToMenuFailed(error));
    }
  };
};
