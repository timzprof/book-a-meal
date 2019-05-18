import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  cToken: null,
  userAuthenticated: false,
  catererAuthenticated: false,
  loading: false,
  error: null,
  authRedirectPath: '/',
  errorMessage: null
};

const setAuthRedirect = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path
  });
};

const userSignInStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const userSignInSuccess = (state, action) => {
  return updateObject(state, {
    userAuthenticated: true,
    token: action.data.token,
    loading: false,
    authRedirectPath: '/menu'
  });
};

const userSignInFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response.data.message
      ? action.error.response.data.message
      : action.error.message
  });
};
const userSignUpStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};
const userSignUpSuccess = (state, action) => {
  return updateObject(state, {
    userAuthenticated: true,
    token: action.data.token,
    loading: false
  });
};
const userSignUpFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response ? action.error.response.data.message : action.error.message
  });
};

const userLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userAuthenticated: false
  });
};

const catererSignInStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const catererSignInSuccess = (state, action) => {
  return updateObject(state, {
    catererAuthenticated: true,
    cToken: action.data.token,
    loading: false,
    authRedirectPath: '/admin/meals'
  });
};

const catererSignInFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response ? action.error.response.data.message : action.error.message
  });
};
const catererSignUpStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};
const catererSignUpSuccess = (state, action) => {
  return updateObject(state, {
    catererAuthenticated: true,
    cToken: action.data.token,
    loading: false
  });
};
const catererSignUpFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response.data.message
      ? action.error.response.data.message
      : action.error.message
  });
};

const catererLogout = (state, action) => {
  return updateObject(state, {
    cToken: null,
    catererAuthenticated: false
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH_REDIRECT:
      return setAuthRedirect(state, action);
    case actionTypes.USER_SIGN_IN_START:
      return userSignInStart(state, action);
    case actionTypes.USER_SIGN_IN_SUCCESS:
      return userSignInSuccess(state, action);
    case actionTypes.USER_SIGN_IN_FAILED:
      return userSignInFailed(state, action);
    case actionTypes.USER_SIGN_UP_START:
      return userSignUpStart(state, action);
    case actionTypes.USER_SIGN_UP_SUCCESS:
      return userSignUpSuccess(state, action);
    case actionTypes.USER_SIGN_UP_FAILED:
      return userSignUpFailed(state, action);
    case actionTypes.USER_LOGOUT:
      return userLogout(state, action);
    case actionTypes.CATERER_SIGN_IN_START:
      return catererSignInStart(state, action);
    case actionTypes.CATERER_SIGN_IN_SUCCESS:
      return catererSignInSuccess(state, action);
    case actionTypes.CATERER_SIGN_IN_FAILED:
      return catererSignInFailed(state, action);
    case actionTypes.CATERER_SIGN_UP_START:
      return catererSignUpStart(state, action);
    case actionTypes.CATERER_SIGN_UP_SUCCESS:
      return catererSignUpSuccess(state, action);
    case actionTypes.CATERER_SIGN_UP_FAILED:
      return catererSignUpFailed(state, action);
    case actionTypes.CATERER_LOGOUT:
      return catererLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
