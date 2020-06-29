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
  let menuMeal = [];
  state.menus.forEach((menu, i) => {
    const mealIndex = menu.meals.findIndex(meal => Number(meal.id) === Number(action.mealId));
    if (mealIndex >= 0) {
      menuMeal[0] = i;
      menuMeal[1] = mealIndex;
    }
  });
  return updateObject(state, {
    beingOrdered: state.menus[menuMeal[0]].meals[menuMeal[1]]
  });
};

const menuHideQuantityModal = state => {
  return updateObject(state, {
    beingOrdered: null
  });
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MENU_HANDLE_QUANTITY:
      return menuHandleQuantity(state, action);
    case actionTypes.MENU_HIDE_QUANTITY_MODAL:
      return menuHideQuantityModal(state);
    case actionTypes.MENU_FETCH_MENUS_START:
    case actionTypes.MENU_FETCH_SINGLE_MENU_START:
    case actionTypes.MENU_ADD_MEALS_TO_MENU_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.MENU_FETCH_MENUS_SUCCESS:
      return {
        ...state,
        loading: false,
        menus: [...action.payload]
      };
    case actionTypes.MENU_FETCH_SINGLE_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        catererMenu: [...action.payload]
      };
    case actionTypes.MENU_ADD_MEALS_TO_MENU_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.MENU_FETCH_SINGLE_MENU_FAILED:
    case actionTypes.MENU_FETCH_MENUS_FAILED:
    case actionTypes.MENU_ADD_MEALS_TO_MENU_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error.response ? action.error.response : action.error,
        errorMessage: action.error.response
          ? action.error.response.data.message
          : action.error.message
      };
    default:
      return state;
  }
};

export default menuReducer;
