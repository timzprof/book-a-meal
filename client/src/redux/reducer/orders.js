import * as actionTypes from '../action/actionTypes';

const initialState = {
  catererOrders: [],
  userOrderMeals: [],
  ordersTotal: 0,
  loading: false,
  error: null,
  errorMessage: null
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_ADD_TO_ORDERS_START:
    case actionTypes.ORDER_FETCH_USER_ORDERS_START:
    case actionTypes.ORDER_FETCH_ORDERS_START:
    case actionTypes.ORDER_UPDATE_START:
    case actionTypes.ORDER_DELETE_START:
    case actionTypes.ORDER_CHECKOUT_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.ORDER_FETCH_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrderMeals: [...action.payload.meals],
        ordersTotal: action.payload.total
      };
    case actionTypes.ORDER_FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        catererOrders: [...action.payload]
      };
    case actionTypes.ORDER_ADD_TO_ORDERS_SUCCESS:
    case actionTypes.ORDER_UPDATE_SUCCESS:
    case actionTypes.ORDER_DELETE_SUCCESS:
    case actionTypes.ORDER_CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.ORDER_ADD_TO_ORDERS_FAILED:
    case actionTypes.ORDER_FETCH_USER_ORDERS_FAILED:
    case actionTypes.ORDER_FETCH_ORDERS_FAILED:
    case actionTypes.ORDER_UPDATE_FAILED:
    case actionTypes.ORDER_DELETE_FAILED:
    case actionTypes.ORDER_CHECKOUT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error.response ? action.error.response : action.error,
        errorMessage: action.error.response
          ? action.error.response.data.message
          : action.error.message
      };
    default:
      return state;
  }
};

export default orderReducer;
