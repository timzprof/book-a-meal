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

const menuFetchMenusStart = () => {
  return {
    type: actionTypes.MENU_FETCH_MENUS_START
  };
};

const menuFetchMenusSuccess = resData => {
  return {
    type: actionTypes.MENU_FETCH_MENUS_SUCCESS,
    payload: resData.map(menu => ({
      id: menu.id,
      catererId: menu.catererId,
      catering_service: menu.name,
      meals: menu.menu.map(JSON.parse)
    }))
  };
};

const menuFetchMenusFailed = error => {
  return {
    type: actionTypes.MENU_FETCH_MENUS_FAILED,
    error
  };
};

export const menuFetchMenus = () => {
  return async dispatch => {
    dispatch(menuFetchMenusStart());
    try {
      const response = await client.get('/menu');
      dispatch(menuFetchMenusSuccess(response.data.data));
    } catch (error) {
      dispatch(menuFetchMenusFailed(error));
    }
  };
};

const menuFetchSingleMenuStart = () => {
  return {
    type: actionTypes.MENU_FETCH_SINGLE_MENU_START
  };
};

const menuFetchSingleMenuSuccess = data => {
  return {
    type: actionTypes.MENU_FETCH_SINGLE_MENU_SUCCESS,
    payload: data.menu
  };
};

const menuFetchSingleMenuFailed = error => {
  return {
    type: actionTypes.MENU_FETCH_SINGLE_MENU_FAILED,
    error
  };
};

export const menuFetchSingleMenu = () => {
  return async dispatch => {
    dispatch(menuFetchSingleMenuStart());
    try {
      const response = await client.get('/menu/caterer');
      dispatch(menuFetchSingleMenuSuccess(response.data.data));
    } catch (error) {
      dispatch(menuFetchSingleMenuFailed(error));
    }
  };
};

const menuAddMealsToMenuStart = () => {
  return {
    type: actionTypes.MENU_ADD_MEALS_TO_MENU_START
  };
};

const menuAddMealsToMenuSuccess = () => {
  return {
    type: actionTypes.MENU_ADD_MEALS_TO_MENU_SUCCESS
  };
};

const menuAddMealsToMenuFailed = error => {
  return {
    type: actionTypes.MENU_ADD_MEALS_TO_MENU_FAILED,
    error
  };
};

export const menuAddMealsToMenu = mealsData => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch(menuAddMealsToMenuStart());
      try {
        for await (let mealData of mealsData) {
          await client.post('/menu', mealData);
        }
        toast('success', 'Menu Modified');
        dispatch(menuAddMealsToMenuSuccess());
        resolve();
      } catch (error) {
        toast('error', 'Failed to Modify Menu');
        dispatch(menuAddMealsToMenuFailed(error));
        reject(error);
      }
    });
  };
};
