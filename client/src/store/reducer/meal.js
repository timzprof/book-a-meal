import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  meals: [],
  loading: false,
  error: null,
  errorMessage: null
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MEAL_FETCH_MEALS_START:
      return mealFetchMealsStart(state, action);
    case actionTypes.MEAL_FETCH_MEALS_SUCCESS:
      return mealFetchMealsSuccess(state, action);
    case actionTypes.MEAL_FETCH_MEALS_FAILED:
      return mealFetchMealsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
