import * as actionTypes from './actionTypes';
import client from '../../shared/axios-client';
import { toast } from '../../shared/toast';

export const setAuthRedirect = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    path
  };
};

export const userSignInStart = () => {
  return {
    type: actionTypes.USER_SIGN_IN_START
  };
};

export const userSignInSuccess = token => {
  return {
    type: actionTypes.USER_SIGN_IN_SUCCESS,
    data: {
      token
    }
  };
};

export const userSignInFailed = error => {
  return {
    type: actionTypes.USER_SIGN_IN_FAILED,
    error
  };
};

export const userSignIn = ({ email, password }) => {
  return dispatch => {
    dispatch(userSignInStart());
    client
      .post('/auth/login', {
        email,
        password
      })
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        toast(response.data.status, response.data.message);
        dispatch(userSignInSuccess(response.data.token));
      })
      .catch(error => {
        const msg = error.response ? error.response.data.message : 'Internal Server Error';
        toast('error', msg);
        dispatch(userSignInFailed(error));
      });
  };
};

export const userSignUpStart = () => {
  return {
    type: actionTypes.USER_SIGN_UP_START
  };
};

export const userSignUpSuccess = token => {
  return {
    type: actionTypes.USER_SIGN_UP_SUCCESS,
    data: {
      token
    }
  };
};

export const userSignUpFailed = error => {
  return {
    type: actionTypes.USER_SIGN_UP_FAILED,
    error
  };
};

export const userSignUp = ({ name, email, phone, password }) => {
  return dispatch => {
    dispatch(userSignUpStart());
    client
      .post('/auth/signup', {
        name,
        email,
        phone,
        password
      })
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        toast(response.data.status, response.data.message);
        dispatch(userSignUpSuccess(response.data.token));
      })
      .catch(error => {
        const msg = error.response ? error.response.data.message : 'Internal Server Error';
        toast('error', msg);
        dispatch(userSignUpFailed(error));
      });
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    toast('success', 'Logging Out...');
    dispatch(userLogout());
  };
};

export const clogout = () => {
  return dispatch => {
    localStorage.removeItem('c_token');
    localStorage.removeItem('c_expirationDate');
    toast('success', 'Logging Out...');
    dispatch(catererLogout());
  };
};

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT
  };
};

export const catererLogout = () => {
  return {
    type: actionTypes.CATERER_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime, logoutFn) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logoutFn());
    }, expirationTime * 1000);
  };
};

export const userAuthCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        dispatch(userSignInSuccess(token));
        dispatch(
          checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000, logout)
        );
      } else {
        dispatch(logout());
      }
    }
  };
};

export const catererAuthCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('c_token');
    if (!token) {
      dispatch(clogout());
    } else {
      const expirationDate = new Date(localStorage.getItem('c_expirationDate'));
      if (expirationDate > new Date()) {
        dispatch(catererSignInSuccess(token));
        dispatch(
          checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000, clogout)
        );
      } else {
        dispatch(clogout());
      }
    }
  };
};

export const catererSignInStart = () => {
  return {
    type: actionTypes.CATERER_SIGN_IN_START
  };
};

export const catererSignInSuccess = token => {
  return {
    type: actionTypes.CATERER_SIGN_IN_SUCCESS,
    data: {
      token
    }
  };
};

export const catererSignInFailed = error => {
  return {
    type: actionTypes.CATERER_SIGN_IN_FAILED,
    error
  };
};

export const catererSignIn = ({ email, password }) => {
  return async dispatch => {
    dispatch(catererSignInStart());
    try {
      const response = await client.post(
        '/auth/caterer/login',
        { email, password },
        { headers: { 'X-REQ': 'yes' } }
      );
      const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
      localStorage.setItem('c_token', response.data.token);
      localStorage.setItem('c_expirationDate', expirationDate);
      toast(response.data.status, response.data.message);
      dispatch(catererSignInSuccess(response.data.token));
    } catch (error) {
      console.log(error);
      const msg = error.response ? error.response.data.message : 'Internal Server Error';
      toast('error', msg);
      dispatch(catererSignInFailed(error));
    }
  };
};

export const catererSignUpStart = () => {
  return {
    type: actionTypes.CATERER_SIGN_UP_START
  };
};

export const catererSignUpSuccess = token => {
  return {
    type: actionTypes.CATERER_SIGN_UP_SUCCESS,
    data: {
      token
    }
  };
};

export const catererSignUpFailed = error => {
  return {
    type: actionTypes.CATERER_SIGN_UP_FAILED,
    error
  };
};

export const catererSignUp = ({ name, email, phone, password, catering_service }) => {
  return async dispatch => {
    dispatch(catererSignUpStart());
    try {
      const response = await client.post(
        '/auth/caterer/signup',
        { name, email, phone, password, catering_service },
        { headers: { 'X-REQ': 'yes' } }
      );
      const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
      localStorage.setItem('c_token', response.data.token);
      localStorage.setItem('c_expirationDate', expirationDate);
      toast(response.data.status, response.data.message);
      dispatch(catererSignUpSuccess(response.data.token));
    } catch (error) {
      const msg = error.response ? error.response.data.message : 'Internal Server Error';
      toast('error', msg);
      dispatch(catererSignUpFailed(error));
    }
  };
};
