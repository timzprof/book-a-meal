import * as actionTypes from './actionTypes';
import client from '../../shared/axios-client';
import { toast } from '../../shared/toast';

export const setAuthRedirect = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    path
  };
};

const signInStart = () => {
  return {
    type: actionTypes.SIGN_IN_START
  };
};

const signInSuccess = user => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: user
  };
};

const signInFailed = error => {
  return {
    type: actionTypes.SIGN_IN_FAILED,
    payload: error
  };
};

export const signIn = ({ email, password }) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch(signInStart());
      try {
        const { data } = await client.post('/auth/login', { email, password });
        const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
        localStorage.setItem('token', data.token);
        localStorage.setItem('expirationDate', expirationDate);
        toast(data.status, data.message);
        dispatch(signInSuccess(data.user));
        resolve();
      } catch (error) {
        const msg = error.response ? error.response.data.message : 'Internal Server Error';
        toast('error', msg);
        dispatch(signInFailed(error));
        reject(error);
      }
    });
  };
};

const signUpStart = () => {
  return {
    type: actionTypes.SIGN_UP_START
  };
};

const signUpSuccess = user => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    payload: user
  };
};

const signUpFailed = error => {
  return {
    type: actionTypes.SIGN_UP_FAILED,
    payload: error
  };
};

export const signUp = ({ name, email, phone, password, type, catering_service }) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch(signUpStart());
      try {
        const { data } = await client.post('/auth/signup', {
          name,
          email,
          phone,
          password,
          type,
          catering_service
        });
        const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
        localStorage.setItem('token', data.token);
        localStorage.setItem('expirationDate', expirationDate);
        toast(data.status, data.message);
        dispatch(signUpSuccess(data.user));
        resolve();
      } catch (error) {
        const msg = error.response ? error.response.data.message : 'Internal Server Error';
        toast('error', msg);
        dispatch(signUpFailed(error));
        reject(error);
      }
    });
  };
};

export const logout = () => {
  localStorage.clear();
  toast('success', 'Logging Out...');
  return {
    type: actionTypes.LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime, logoutFn) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logoutFn());
    }, expirationTime * 1000);
  };
};
