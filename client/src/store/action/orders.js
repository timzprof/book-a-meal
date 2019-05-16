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

export const orderIncrementStart = () => {
  return {
    type: actionTypes.ORDER_INCREMENT_START
  }
}

export const orderIncrementSuccess = () => {
  return {
    type: actionTypes.ORDER_INCREMENT_SUCCESS
  }
}

export const orderIncrementFailed = (error) => {
  return {
    type: actionTypes.ORDER_INCREMENT_FAILED,
    error
  }
}


export const orderIncrement = (orderItemId) => {
  return dispatch => {
    dispatch(orderIncrementStart());
    client.put(`/orders/${orderItemId}`, {
      action: 'increase'
    })
      .then(() => {
        dispatch(orderFetchUserOrders());
        dispatch(orderIncrementSuccess());
      })
      .catch(error => {
        dispatch(orderIncrementFailed(error));
      });
  }
}


export const orderDecrementStart = () => {
  return {
    type: actionTypes.ORDER_DECREMENT_START
  }
}

export const orderDecrementSuccess = () => {
  return {
    type: actionTypes.ORDER_DECREMENT_SUCCESS
  }
}

export const orderDecrementFailed = (error) => {
  return {
    type: actionTypes.ORDER_DECREMENT_FAILED,
    error
  }
}

export const orderDecrement = (orderItemId) => {
  return dispatch => {
    dispatch(orderDecrementStart());
    client.put(`/orders/${orderItemId}`, {
      action: 'decrease'
    })
      .then(() => {
        dispatch(orderFetchUserOrders());
        dispatch(orderDecrementSuccess());
      })
      .catch(error => {
        dispatch(orderDecrementFailed(error));
      });
  }
}

export const orderDeleteStart = () => {
  return {
    type: actionTypes.ORDER_DELETE_START
  }
}

export const orderDeleteSuccess = () => {
  return {
    type: actionTypes.ORDER_DELETE_SUCCESS
  }
}

export const orderDeleteFailed = error => {
  return {
    type: actionTypes.ORDER_DELETE_FAILED,
    error
  }
}

export const orderDelete = orderItemId => {
  return dispatch => {
    dispatch(orderDeleteStart());
    client.put(`/orders/${orderItemId}`, {
      action: 'delete'
    })
      .then(() => {
        dispatch(orderFetchUserOrders());
        dispatch(orderDeleteSuccess());
      })
      .catch(error => {
        dispatch(orderDeleteFailed(error));
      });
  }
} 