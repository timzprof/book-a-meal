import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  user: null,
  caterer: null,
  token: null,
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
    user: action.data.user,
    token: action.data.token,
    loading: false
  });
};

const userSignInFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    errorMessage: action.error.message
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
    user: action.data.user,
    token: action.data.token,
    loading: false
  });
};
const userSignUpFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    errorMessage: action.error.message
  });
};

const userLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userAuthenticated: false,
        user: null
    });
}

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
    default:
      return state;
  }
};

export default reducer;
