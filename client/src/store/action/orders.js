import * as actionTypes from './actionTypes';
import client from '../../shared/axios-client';

export const orderAddToOrdersStart = () => {
  return {
    type: actionTypes.ORDER_ADD_TO_ORDERS_START
  };
};

export const orderAddToOrdersSuccess = () => {
  return {
    type: actionTypes.ORDER_ADD_TO_ORDERS_SUCCESS
  };
};

export const orderAddToOrdersFailed = error => {
  return {
    type: actionTypes.ORDER_ADD_TO_ORDERS_FAILED,
    error
  };
};

export const orderAddToOrders = order => {
  return dispatch => {
    dispatch(orderAddToOrdersStart());
    client
      .post('/orders', order)
      .then(response => {
        console.log(response.data);
        dispatch(orderAddToOrdersSuccess());
      })
      .catch(error => {
        dispatch(orderAddToOrdersFailed(error));
      });
  };
};

export const resetOrderResCode = () => {
  return {
    type: actionTypes.RESET_ORDER_RES_CODE
  };
};

export const orderFetchUserOrdersStart = () => {
  return {
    type: actionTypes.ORDER_FETCH_USER_ORDERS_START
  };
};

export const orderFetchUserOrdersSuccess = resData => {
  return {
    type: actionTypes.ORDER_FETCH_USER_ORDERS_SUCCESS,
    data: resData
  };
};

export const orderFetchUserOrdersFailed = error => {
  return {
    type: actionTypes.ORDER_FETCH_USER_ORDERS_FAILED,
    error
  };
};

export const orderFetchUserOrders = () => {
  return dispatch => {
    dispatch(orderFetchUserOrdersStart());
    client
      .get('/orders/user')
      .then(response => {
        dispatch(orderFetchUserOrdersSuccess(response.data.data));
      })
      .catch(error => {
        dispatch(orderFetchUserOrdersFailed(error));
      });
  };
};
