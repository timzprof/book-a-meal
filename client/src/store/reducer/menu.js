import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  menus: [],
  catererMenu: [],
  beingOrdered: null,
  loading: false,
  error: null,
  errorMessage: null
};

const menuHandleQuantity = (state, action) => {
  const menus = [];
  state.menus.forEach(menu => {
    menus.push({
      id: menu.id,
      catererId: menu.catererId,
      catering_service: menu.caterer.catering_service,
      meals: JSON.parse(menu.meals)
    });
  });
  let menuMeal = [];
  menus.forEach((menu, i) => {
    const mealIndex = menu.meals.findIndex(meal => Number(meal.id) === Number(action.mealId));
    if (mealIndex >= 0) {
      menuMeal[0] = i;
      menuMeal[1] = mealIndex;
    }
  });
  return updateObject(state, {
    beingOrdered: menus[menuMeal[0]].meals[menuMeal[1]]
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
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response ? action.error.response.data.message : action.error.message
  });
};

const menuFetchSingleMenuStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const menuFetchSingleMenuSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    catererMenu: action.data
  });
};

const menuFetchSingleMenuFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response ? action.error.response.data.message : action.error.message
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
    case actionTypes.MENU_FETCH_SINGLE_MENU_START:
      return menuFetchSingleMenuStart(state, action);
    case actionTypes.MENU_FETCH_SINGLE_MENU_SUCCESS:
      return menuFetchSingleMenuSuccess(state, action);
    case actionTypes.MENU_FETCH_SINGLE_MENU_FAILED:
      return menuFetchSingleMenuFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
