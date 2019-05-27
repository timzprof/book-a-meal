import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  meals: [],
  loading: false,
  error: null,
  errorMessage: null,
  showMealModal: false
};

const mealFetchMealsStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const mealFetchMealsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    meals: action.data
  });
};

const mealFetchMealsFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response ? action.error.response.data.message : action.error.message
  });
};

const mealToggleModal = (state, action) => {
  return updateObject(state, {
    showMealModal: !state.showMealModal
  });
};

const mealAddMealStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const mealAddMealSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const mealAddMealFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response ? action.error.response.data.message : action.error.message
  });
};

const mealUpdateMealStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const mealUpdateMealSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const mealUpdateMealFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response ? action.error.response.data.message : action.error.message
  });
};

const mealDeleteMealStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const mealDeleteMealSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const mealDeleteMealFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response ? action.error.response.data.message : action.error.message
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MEAL_FETCH_MEALS_START:
      return mealFetchMealsStart(state, action);
    case actionTypes.MEAL_FETCH_MEALS_SUCCESS:
      return mealFetchMealsSuccess(state, action);
    case actionTypes.MEAL_FETCH_MEALS_FAILED:
      return mealFetchMealsFailed(state, action);
    case actionTypes.MEAL_TOGGLE_MODAL:
      return mealToggleModal(state, action);
    case actionTypes.MEAL_ADD_MEAL_START:
      return mealAddMealStart(state, action);
    case actionTypes.MEAL_ADD_MEAL_SUCCESS:
      return mealAddMealSuccess(state, action);
    case actionTypes.MEAL_ADD_MEAL_FAILED:
      return mealAddMealFailed(state, action);
    case actionTypes.MEAL_DELETE_MEAL_START:
      return mealDeleteMealStart(state, action);
    case actionTypes.MEAL_DELETE_MEAL_SUCCESS:
      return mealDeleteMealSuccess(state, action);
    case actionTypes.MEAL_DELETE_MEAL_FAILED:
      return mealDeleteMealFailed(state, action);
    case actionTypes.MEAL_UPDATE_MEAL_START:
      return mealUpdateMealStart(state, action);
    case actionTypes.MEAL_UPDATE_MEAL_SUCCESS:
      return mealUpdateMealSuccess(state, action);
    case actionTypes.MEAL_UPDATE_MEAL_FAILED:
      return mealUpdateMealFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
