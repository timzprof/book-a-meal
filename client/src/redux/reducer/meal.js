import * as actionTypes from '../action/actionTypes';

const initialState = {
  meals: [],
  loading: false,
  error: null,
  errorMessage: null,
  showMealModal: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MEAL_FETCH_MEALS_START:
    case actionTypes.MEAL_ADD_MEAL_START:
    case actionTypes.MEAL_UPDATE_MEAL_START:
    case actionTypes.MEAL_DELETE_MEAL_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.MEAL_FETCH_MEALS_SUCCESS:
      return {
        ...state,
        loading: false,
        meals: [...action.payload]
      }
    case actionTypes.MEAL_ADD_MEAL_SUCCESS:
    case actionTypes.MEAL_DELETE_MEAL_SUCCESS:
    case actionTypes.MEAL_UPDATE_MEAL_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.MEAL_FETCH_MEALS_FAILED:
    case actionTypes.MEAL_ADD_MEAL_FAILED:
    case actionTypes.MEAL_DELETE_MEAL_FAILED:
    case actionTypes.MEAL_UPDATE_MEAL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error.response ? action.error.response : action.error,
        errorMessage: action.error.response
          ? action.error.response.data.message
          : action.error.message
      };
    case actionTypes.MEAL_TOGGLE_MODAL:
      return {
        ...state,
        showMealModal: !state.showMealModal
      }
    default:
      return state;
  }
};

export default reducer;
