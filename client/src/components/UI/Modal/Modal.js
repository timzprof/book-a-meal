import React from 'react';
import classes from './Modal.module.css';
import ModalTitle from './ModalTitle/ModalTitle';
import ModalForm from './ModalForm/ModalForm';

const titles = {
  quantity: 'Order',
  checkout: 'Checkout',
  meal: 'Meal Option'
};

const Modal = props => {
  const { show, type, close, meal, editMeal, edittingMeal, addMeal, orderMeal, checkout } = props;

  const modalClasses = [classes.Modal, classes.Hidden];
  if (show) {
    modalClasses.pop();
  }
  return show ? (
    <div className={modalClasses.join(' ')} role="dialog">
      <div className={classes.Modal__content}>
        <div className={classes.Modal__header}>
          <ModalTitle title={titles[type]} classes={classes} />
          <button
            type="button"
            className={['Btn', classes.Close].join(' ')}
            data-dismiss="modal"
            onClick={close}
          >
            &times;
          </button>
        </div>
        <ModalForm
          classes={classes}
          type={type}
          closeModal={close}
          meal={meal ? meal : false}
          edittingMeal={edittingMeal ? edittingMeal : false}
          editMeal={editMeal}
          addMeal={addMeal}
          addMealToOrders={orderMeal}
          checkout={checkout}
        />
      </div>
    </div>
  ) : null;
};

export default React.memo(Modal);
