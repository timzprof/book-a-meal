import * as actionTypes from './actionTypes';
import client from '../../shared/axios-client';
import { toast } from '../../shared/toast';
import { menuAddMealsToMenu } from './index';

const mealFetchMealsStart = () => {
  return {
    type: actionTypes.MEAL_FETCH_MEALS_START
  };
};

const mealFetchMealsSuccess = data => {
  return {
    type: actionTypes.MEAL_FETCH_MEALS_SUCCESS,
    payload: data
  };
};

const mealFetchMealsFailed = error => {
  return {
    type: actionTypes.MEAL_FETCH_MEALS_FAILED,
    error
  };
};

export const mealFetchMeals = () => {
  return async dispatch => {
    dispatch(mealFetchMealsStart());
    try {
      const response = await client.get('/meals');
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

const mealAddMealStart = () => {
  return {
    type: actionTypes.MEAL_ADD_MEAL_START
  };
};

const mealAddMealSuccess = () => {
  return {
    type: actionTypes.MEAL_ADD_MEAL_SUCCESS
  };
};

const mealAddMealFailed = error => {
  return {
    type: actionTypes.MEAL_ADD_MEAL_FAILED,
    error
  };
};

export const mealAddMeal = formData => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch(mealAddMealStart());
      try {
        const response = await client.post('/meals', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast(response.data.status, response.data.message);
        dispatch(mealAddMealSuccess());
        dispatch(mealFetchMeals());
        resolve();
      } catch (error) {
        toast('error', 'Failed to Add Meal Option');
        dispatch(mealAddMealFailed(error));
        reject(error);
      }
    });
  };
};

const mealDeleteMealStart = () => {
  return {
    type: actionTypes.MEAL_DELETE_MEAL_START
  };
};

const mealDeleteMealSuccess = () => {
  return {
    type: actionTypes.MEAL_DELETE_MEAL_SUCCESS
  };
};

const mealDeleteMealFailed = error => {
  return {
    type: actionTypes.MEAL_DELETE_MEAL_FAILED,
    error
  };
};

export const mealDeleteMeal = mealId => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch(mealDeleteMealStart());
      try {
        const response = await client.delete(`/meals/${mealId}`);
        toast(response.data.status, response.data.message);
        dispatch(mealDeleteMealSuccess());
        dispatch(mealFetchMeals());
        resolve();
      } catch (error) {
        toast('error', 'Failed to Delete Meal Option');
        dispatch(mealDeleteMealFailed(error));
        reject(error);
      }
    });
  };
};

const mealUpdateMealStart = () => {
  return {
    type: actionTypes.MEAL_UPDATE_MEAL_START
  };
};

const mealUpdateMealSuccess = () => {
  return {
    type: actionTypes.MEAL_UPDATE_MEAL_SUCCESS
  };
};

const mealUpdateMealFailed = error => {
  return {
    type: actionTypes.MEAL_UPDATE_MEAL_FAILED,
    error
  };
};

export const mealUpdateMeal = (mealId, data) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      dispatch(mealUpdateMealStart());
      try {
        const response = await client.put(`/meals/${mealId}`, data);
        toast(response.data.status, response.data.message);
        const { meals } = getState().meal;
        const mealsData = [];
        meals.forEach(meal => {
          if (meal.quantity > 0) {
            mealsData.push({ mealId: meal.id, quantity: meal.quantity });
          }
        });
        dispatch(menuAddMealsToMenu(mealsData));
        dispatch(mealUpdateMealSuccess());
        dispatch(mealFetchMeals());
        resolve();
      } catch (error) {
        dispatch(mealUpdateMealFailed(error));
        reject(error);
      }
    });
  };
};
