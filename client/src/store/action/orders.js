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
  return async dispatch => {
    dispatch(orderAddToOrdersStart());
    try {
      await client.post('/orders', order);
      dispatch(orderAddToOrdersSuccess());
    } catch (error) {
      dispatch(orderAddToOrdersFailed(error));
    }
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

export const orderIncrementStart = () => {
  return {
    type: actionTypes.ORDER_INCREMENT_START
  };
};

export const orderIncrementSuccess = () => {
  return {
    type: actionTypes.ORDER_INCREMENT_SUCCESS
  };
};

export const orderIncrementFailed = error => {
  return {
    type: actionTypes.ORDER_INCREMENT_FAILED,
    error
  };
};

export const orderIncrement = orderItemId => {
  return async dispatch => {
    dispatch(orderIncrementStart());
    try {
      await client.put(`/orders/${orderItemId}`, { action: 'increase' });
      dispatch(orderFetchUserOrders());
      dispatch(orderIncrementSuccess());
    } catch (error) {
      dispatch(orderIncrementFailed(error));
    }
  };
};

export const orderDecrementStart = () => {
  return {
    type: actionTypes.ORDER_DECREMENT_START
  };
};

export const orderDecrementSuccess = () => {
  return {
    type: actionTypes.ORDER_DECREMENT_SUCCESS
  };
};

export const orderDecrementFailed = error => {
  return {
    type: actionTypes.ORDER_DECREMENT_FAILED,
    error
  };
};

export const orderDecrement = orderItemId => {
  return async dispatch => {
    dispatch(orderDecrementStart());
    try {
      await client.put(`/orders/${orderItemId}`, { action: 'decrease' });
      dispatch(orderFetchUserOrders());
      dispatch(orderDecrementSuccess());
    } catch (error) {
      dispatch(orderDecrementFailed(error));
    }
  };
};

export const orderDeleteStart = () => {
  return {
    type: actionTypes.ORDER_DELETE_START
  };
};

export const orderDeleteSuccess = () => {
  return {
    type: actionTypes.ORDER_DELETE_SUCCESS
  };
};

export const orderDeleteFailed = error => {
  return {
    type: actionTypes.ORDER_DELETE_FAILED,
    error
  };
};

export const orderDelete = orderItemId => {
  return async dispatch => {
    dispatch(orderDeleteStart());
    try {
      await client.put(`/orders/${orderItemId}`, { action: 'delete' });
      dispatch(orderFetchUserOrders());
      dispatch(orderDeleteSuccess());
    } catch (error) {
      dispatch(orderDeleteFailed(error));
    }
  };
};
