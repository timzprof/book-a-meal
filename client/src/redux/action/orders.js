import * as actionTypes from './actionTypes';
import client from '../../shared/axios-client';
import { toast } from '../../shared/toast';

const orderAddToOrdersStart = () => {
  return {
    type: actionTypes.ORDER_ADD_TO_ORDERS_START
  };
};

const orderAddToOrdersSuccess = () => {
  return {
    type: actionTypes.ORDER_ADD_TO_ORDERS_SUCCESS
  };
};

const orderAddToOrdersFailed = error => {
  return {
    type: actionTypes.ORDER_ADD_TO_ORDERS_FAILED,
    error
  };
};

export const orderAddToOrders = order => {
  return async dispatch => {
    dispatch(orderAddToOrdersStart());
    try {
      const response = await client.post('/orders', order);
      toast(response.data.status, response.data.message);
      dispatch(orderAddToOrdersSuccess());
    } catch (error) {
      toast('error', 'Failed to Add Meal to Orders');
      dispatch(orderAddToOrdersFailed(error));
    }
  };
};

const orderFetchUserOrdersStart = () => {
  return {
    type: actionTypes.ORDER_FETCH_USER_ORDERS_START
  };
};

const orderFetchUserOrdersSuccess = resData => {
  return {
    type: actionTypes.ORDER_FETCH_USER_ORDERS_SUCCESS,
    payload: resData
  };
};

const orderFetchUserOrdersFailed = error => {
  return {
    type: actionTypes.ORDER_FETCH_USER_ORDERS_FAILED,
    error
  };
};

export const orderFetchUserOrders = () => {
  return async dispatch => {
    dispatch(orderFetchUserOrdersStart());
    try {
      const response = await client.get('/orders/user');
      dispatch(orderFetchUserOrdersSuccess(response.data.data));
    } catch (error) {
      dispatch(orderFetchUserOrdersFailed(error));
    }
  };
};

const orderUpdateStart = () => {
  return {
    type: actionTypes.ORDER_UPDATE_START
  };
};

const orderUpdateSuccess = () => {
  return {
    type: actionTypes.ORDER_UPDATE_SUCCESS
  };
};

const orderUpdateFailed = error => {
  return {
    type: actionTypes.ORDER_UPDATE_FAILED,
    error
  };
};

export const orderUpdate = (orderItemId, action) => {
  return async dispatch => {
    dispatch(orderUpdateStart());
    try {
      const response = await client.put(`/orders/${orderItemId}`, { action });
      if (response.data.status === 'warning') {
        toast(response.data.status, response.data.message);
      }
      dispatch(orderFetchUserOrders());
      dispatch(orderUpdateSuccess());
    } catch (error) {
      dispatch(orderUpdateFailed(error));
    }
  };
};

const orderDeleteStart = () => {
  return {
    type: actionTypes.ORDER_DELETE_START
  };
};

const orderDeleteSuccess = () => {
  return {
    type: actionTypes.ORDER_DELETE_SUCCESS
  };
};

const orderDeleteFailed = error => {
  return {
    type: actionTypes.ORDER_DELETE_FAILED,
    error
  };
};

export const orderDelete = orderItemId => {
  return async dispatch => {
    dispatch(orderDeleteStart());
    try {
      const response = await client.put(`/orders/${orderItemId}`, { action: 'delete' });
      toast(response.data.status, response.data.message);
      dispatch(orderFetchUserOrders());
      dispatch(orderDeleteSuccess());
    } catch (error) {
      toast('error', 'Failed to Delete Meal Order');
      dispatch(orderDeleteFailed(error));
    }
  };
};

const orderFetchOrdersStart = () => {
  return {
    type: actionTypes.ORDER_FETCH_ORDERS_START
  };
};

const orderFetchOrdersSuccess = resData => {
  return {
    type: actionTypes.ORDER_FETCH_ORDERS_SUCCESS,
    payload: resData
  };
};

const orderFetchOrdersFailed = error => {
  return {
    type: actionTypes.ORDER_FETCH_ORDERS_FAILED,
    error
  };
};

export const orderFetchOrders = () => {
  return async dispatch => {
    dispatch(orderFetchOrdersStart());
    try {
      const response = await client.get('/orders');
      dispatch(orderFetchOrdersSuccess(response.data.data));
    } catch (error) {
      dispatch(orderFetchOrdersFailed(error));
    }
  };
};

const orderCheckoutStart = () => {
  return {
    type: actionTypes.ORDER_CHECKOUT_START
  };
};

const orderCheckoutSuccess = () => {
  return {
    type: actionTypes.ORDER_CHECKOUT_SUCCESS
  };
};

const orderCheckoutFailed = error => {
  return {
    type: actionTypes.ORDER_CHECKOUT_FAILED,
    error
  };
};

export const orderCheckout = ({ billingAddress, city }) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch(orderCheckoutStart());
      try {
        const response = await client.post(`/orders/checkout`, {
          billingAddress: `${billingAddress}, ${city}`
        });
        toast(response.data.status, response.data.message);
        dispatch(orderFetchUserOrders());
        dispatch(orderCheckoutSuccess());
        resolve();
      } catch (error) {
        toast('error', 'Failed to Checkout Order');
        dispatch(orderCheckoutFailed(error));
        reject();
      }
    });
  };
};
