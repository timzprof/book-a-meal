import * as actionTypes from './actionTypes';
import client from '../../shared/axios-client';
import { toast } from '../../shared/toast';
import { setResCode } from './index';

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

export const toggleMealModal = () => {
  return {
    type: actionTypes.MEAL_TOGGLE_MODAL
  };
};

export const mealAddMealStart = () => {
  return {
    type: actionTypes.MEAL_ADD_MEAL_START
  };
};

export const mealAddMealSuccess = () => {
  return {
    type: actionTypes.MEAL_ADD_MEAL_SUCCESS
  };
};

export const mealAddMealFailed = error => {
  return {
    type: actionTypes.MEAL_ADD_MEAL_FAILED,
    error
  };
};

export const mealAddMeal = formData => {
  return async dispatch => {
    dispatch(mealAddMealStart());
    try {
      const response = await client.post('/meals/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Req': true
        }
      });
      toast(response.data.status, response.data.message);
      dispatch(setResCode(response.data.status));
      dispatch(mealAddMealSuccess());
    } catch (error) {
      toast('error', 'Failed to Add Meal Option');
      dispatch(mealAddMealFailed(error));
    }
  };
};

export const mealDeleteMealStart = () => {
  return {
    type: actionTypes.MEAL_DELETE_MEAL_START
  };
};

export const mealDeleteMealSuccess = () => {
  return {
    type: actionTypes.MEAL_DELETE_MEAL_SUCCESS
  };
};

export const mealDeleteMealFailed = error => {
  return {
    type: actionTypes.MEAL_DELETE_MEAL_FAILED,
    error
  };
};

export const mealDeleteMeal = mealId => {
  return async dispatch => {
    dispatch(mealDeleteMealStart());
    try {
      const response = await client.delete(`/meals/${mealId}`, {
        headers: {
          'X-Req': true
        }
      });
      toast(response.data.status, response.data.message);
      dispatch(mealDeleteMealSuccess());
    } catch (error) {
      toast('error', 'Failed to Delete Meal Option');
      dispatch(mealDeleteMealFailed(error));
    }
  };
};
