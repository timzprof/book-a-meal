import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  menus: [],
  beingOrdered: null,
  loading: false,
  error: null,
  errorMessage: null
};

const menuHandleQuantity = (state, action) => {
  const mealIndex = state.meals.findIndex(meal => meal.id === Number(action.mealId));
  return updateObject(state, {
    beingOrdered: state.meals[mealIndex]
  });
};

const menuHideQuantityModal = (state, action) => {
  return updateObject(state, {
    beingOrdered: null
  });
};

const menuFetchMenusStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const menuFetchMenusSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    menus: action.data
  });
};

const menuFetchMenusFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    errorMessage: action.error.message
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MENU_HANDLE_QUANTITY:
      return menuHandleQuantity(state, action);
    case actionTypes.MENU_HIDE_QUANTITY_MODAL:
      return menuHideQuantityModal(state, action);
    case actionTypes.MENU_FETCH_MENUS_START:
      return menuFetchMenusStart(state, action);
    case actionTypes.MENU_FETCH_MENUS_SUCCESS:
      return menuFetchMenusSuccess(state, action);
    case actionTypes.MENU_FETCH_MENUS_FAILED:
      return menuFetchMenusFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
