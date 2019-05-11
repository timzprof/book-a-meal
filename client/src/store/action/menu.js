import * as actionTypes from './actionTypes';

export const handleQuantity = mealId => {
  return {
    type: actionTypes.MENU_HANDLE_QUANTITY,
    mealId
  };
};

export const hideQuantityModal = () => {
  return {
    type: actionTypes.MENU_HIDE_QUANTITY_MODAL
  };
};
