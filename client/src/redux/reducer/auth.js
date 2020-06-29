import * as actionTypes from '../action/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  errorMessage: null
};

const extractErrorMessage = error => {
  return error.response ? error.response.data.message : error.message;
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_START:
    case actionTypes.SIGN_UP_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SIGN_IN_SUCCESS:
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        errorMessage: null,
        isAuthenticated: true,
        user: action.payload
      };
    case actionTypes.SIGN_IN_FAILED:
    case actionTypes.SIGN_UP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        errorMessage: extractErrorMessage(action.payload)
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
