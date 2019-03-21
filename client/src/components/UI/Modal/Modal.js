import React, { Component } from 'react';
import classes from './Modal.module.css';
import formClasses from '../../Forms/Form.module.css';
import ModalTitle from './ModalTitle/ModalTitle';
import ModalForm from './ModalForm/ModalForm';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: [classes.Modal, classes.Hidden]
    };
  }

  render() {
    const titles = {
      quantity: 'Add to Orders',
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
              formClasses={formClasses}
              type={this.props.type}
              closeModal={this.props.close}
              meal={this.props.meal !== null ? this.props.meal : false}
            />
          </div>
        </div>
      );
    }
    return jsx;
  }
}

export default Modal;