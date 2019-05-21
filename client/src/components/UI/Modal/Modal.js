import React, { Component } from 'react';
import classes from './Modal.module.css';
import ModalTitle from './ModalTitle/ModalTitle';
import ModalForm from './ModalForm/ModalForm';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: [classes.Modal, classes.Hidden]
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show;
  }

  render() {
    const titles = {
      quantity: 'Order',
      checkout: 'Checkout'
    };
    let jsx = null;
    const modalClasses = [...this.state.modal];
    if (this.props.show) {
      modalClasses.pop();
      jsx = (
        <div className={modalClasses.join(' ')} role="dialog">
          <div className={classes.Modal__content}>
            <div className={classes.Modal__header}>
              <ModalTitle title={titles[this.props.type]} classes={classes} />
              <button
                type="button"
                className={['Btn', classes.Close].join(' ')}
                data-dismiss="modal"
                onClick={this.props.close}
              >
                &times;
              </button>
            </div>
            <ModalForm
              classes={classes}
              type={this.props.type}
              closeModal={this.props.close}
              meal={this.props.meal !== null ? this.props.meal : false}
              addMeal={this.props.addMeal}
              addMealToOrders={this.props.orderMeal}
            />
          </div>
        </div>
      );
    }
    return jsx;
  }
}

export default Modal;
