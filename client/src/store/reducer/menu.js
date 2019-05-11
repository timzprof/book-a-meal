import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    meals: [],
    beingOrdered: null,
    loading: false
};

const menuHandleQuantity = (state, action) => {
    const mealIndex = state.meals.findIndex(meal => meal.id === Number(action.mealId));
    return updateObject(state, {
        beingOrdered: state.meals[mealIndex]
    });
};  

const menuHideQuantityModal = (state, action) => {
    return updateObject(state, {
        beingOrdered: null
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.MENU_HANDLE_QUANTITY: return menuHandleQuantity(state, action);
        case actionTypes.MENU_HIDE_QUANTITY_MODAL: return menuHideQuantityModal(state, action);
        default: return state;
    }
};

export default reducer;