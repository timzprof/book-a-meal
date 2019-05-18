import * as actionTypes from './actionTypes';
import client from '../../shared/axios-client';

export const mealFetchMealsStart = () => {
  return {
    type: actionTypes.MEAL_FETCH_MEALS_START
  };
};

export const mealFetchMealsSuccess = data => {
  return {
    type: actionTypes.MEAL_FETCH_MEALS_SUCCESS,
    data
  };
};

export const mealFetchMealsFailed = error => {
  return {
    type: actionTypes.MEAL_FETCH_MEALS_FAILED,
    error
  };
};

export const mealFetchMeals = () => {
  return async dispatch => {
    dispatch(mealFetchMealsStart());
    try {
      const response = await client.get('/meals/', { headers: { 'X-Req': true } });
      dispatch(mealFetchMealsSuccess(response.data.data));
    } catch (error) {
      dispatch(mealFetchMealsFailed(error));
    }
  };
};
