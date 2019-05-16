import * as actionTypes from './actionTypes';
import client from '../../shared/axios-client';

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

export const userSignInSuccess = (token) => {
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
    client
      .post('/auth/login', {
        email,
        password
      })
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(userSignInSuccess(response.data.token));
      })
      .catch(error => {
        dispatch(userSignInFailed(error));
      });
  };
};

export const userSignUpStart = () => {
  return {
    type: actionTypes.USER_SIGN_UP_START
  };
};

export const userSignUpSuccess = (token) => {
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
        dispatch(userSignUpSuccess(response.data.token));
      })
      .catch(error => {
        dispatch(userSignUpFailed(error));
      });
  };
};

export const userLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.USER_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(userLogout());
    }, expirationTime * 1000);
  };
};

export const userAuthCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('token');
      if(!token) {
          dispatch(userLogout())
      } else {
          const expirationDate = new Date(localStorage.getItem('expirationDate'));
          if(expirationDate > new Date()){
              dispatch(userSignInSuccess(token));
              dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
          }else {
              dispatch(userLogout());
          }
      }
  }
}