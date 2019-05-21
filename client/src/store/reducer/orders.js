import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orderMeals: [],
  ordersTotal: 0,
  loading: false,
  error: null,
  errorMessage: null,
  checkingOut: null
};

const orderAddToOrdersStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const orderAddToOrdersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const orderAddToOrdersFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    errorMessage: action.error.response.data ? action.error.response.data : action.error.message
  });
};

const orderFetchUserOrdersStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const orderFetchUserOrdersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    orderMeals: action.data.meals,
    ordersTotal: action.data.total
  });
};

const orderFetchUserOrdersFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    errorMessage: action.error.response ? action.error.response.data : action.error.message
  });
};

const orderIncrementStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const orderIncrementSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const orderIncrementFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response ? action.error.response.data.message : action.error.message
  });
};

const orderDecrementStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const orderDecrementSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const orderDecrementFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error.response ? action.error.response : action.error,
    errorMessage: action.error.response ? action.error.response.data.message : action.error.message
  });
};

const orderDeleteStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const orderDeleteSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
}

const orderDeleteFailed = (state, action) => {
  return updateObject(state, {
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_ADD_TO_ORDERS_START:
      return orderAddToOrdersStart(state, action);
    case actionTypes.ORDER_ADD_TO_ORDERS_SUCCESS:
      return orderAddToOrdersSuccess(state, action);
    case actionTypes.ORDER_ADD_TO_ORDERS_FAILED:
      return orderAddToOrdersFailed(state, action);
    case actionTypes.ORDER_FETCH_USER_ORDERS_START:
      return orderFetchUserOrdersStart(state, action);
    case actionTypes.ORDER_FETCH_USER_ORDERS_SUCCESS:
      return orderFetchUserOrdersSuccess(state, action);
    case actionTypes.ORDER_FETCH_USER_ORDERS_FAILED:
      return orderFetchUserOrdersFailed(state, action);
    case actionTypes.ORDER_INCREMENT_START:
      return orderIncrementStart(state, action);
    case actionTypes.ORDER_INCREMENT_SUCCESS:
      return orderIncrementSuccess(state, action);
    case actionTypes.ORDER_INCREMENT_FAILED:
      return orderIncrementFailed(state, action);
    case actionTypes.ORDER_DECREMENT_START:
      return orderDecrementStart(state, action);
    case actionTypes.ORDER_DECREMENT_SUCCESS:
      return orderDecrementSuccess(state, action);
    case actionTypes.ORDER_DECREMENT_FAILED:
      return orderDecrementFailed(state, action);
    case actionTypes.ORDER_DELETE_START:
      return orderDeleteStart(state, action);
    case actionTypes.ORDER_DELETE_SUCCESS:
      return orderDeleteSuccess(state, action);
    case actionTypes.ORDER_DELETE_FAILED:
      return orderDeleteFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
