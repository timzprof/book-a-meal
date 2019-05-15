import React, { Component } from 'react';
import { updateObject, checkValidity } from '../../../../shared/utility';
import Input from '../../../Forms/Input/Input';

class ModalForm extends Component {
  state = {
    quantityControls: {
      quantity: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          name: 'quantity',
          placeholder: 'Quantity',
          min: 0,
          max: this.props.meal ? this.props.meal.quantity : 0
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      mealId: {
        elementType: 'input',
        elementConfig: {
          type: 'hidden',
          name: 'mealId'
        },
        value: this.props.meal ? this.props.meal.id : '',
        validation: {},
        valid: true,
        touched: true
      }
    },
    checkoutControls: {
      billingAddress: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'billing-address',
          placeholder: 'Billing Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'city',
          placeholder: 'City'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  inputChangeHandler = (e, inputId, controlType) => {
    const controls = controlType === 'checkout' ? 'checkoutControls' : 'quantityControls';
    const formElement = updateObject(this.state[controls][inputId], {
      value: e.target.value,
      valid: checkValidity(e.target.value, this.state[controls][inputId].validation),
      touched: true
    });

    const form = updateObject(this.state[controls], {
      [inputId]: formElement
    });

    let formIsValid = true;
    for (let inputId in form) {
      formIsValid = form[inputId].valid && formIsValid;
    }

    this.setState({ [controls]: form, formIsValid });
  };

  addToOrders = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formElementId in this.state.quantityControls) {
      formData[formElementId] = this.state.quantityControls[formElementId].value;
      if(this.state.quantityControls[formElementId].elementConfig.type === 'number'){
        formData[formElementId] = Number(this.state.quantityControls[formElementId].value);
      }
    }
    this.props.addMealToOrders(formData);
  };

  render() {
    const quantityFormElements = Object.keys(this.state.quantityControls).map(key => {
      return {
        id: key,
        config: this.state.quantityControls[key]
      };
    });
    const checkoutFormElements = Object.keys(this.state.checkoutControls).map(key => {
      return {
        id: key,
        config: this.state.checkoutControls[key]
      };
    });
    const { classes } = this.props;
    const checkoutForm = (
      <form action="#" method="post" id="checkoutForm">
        <div className={classes.Modal__body}>
          {checkoutFormElements.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              changed={e => this.inputChangeHandler(e, formElement.id, 'checkout')}
            />
          ))}
        </div>
        <div className={classes.Modal__footer}>
          <button type="button" data-dismiss="modal" onClick={this.props.closeModal}>
            Close
          </button>
          <button type="submit">Checkout</button>
        </div>
      </form>
    );
    const { REACT_APP_ROOT: ROOT } = process.env;
    const imgUrl = this.props.meal ? `${ROOT}${this.props.meal.imageUrl}` : null;
    const quantityForm = this.props.meal ? (
      <form method="post" id="addToOrders" onSubmit={this.addToOrders}>
        <div className={classes.Modal__body}>
          <div>
            <div className={classes.Meal__Details__img}>
              <img src={imgUrl} alt="Meal" />
            </div>
            <div>
              <p>{this.props.meal.name}</p>
              <p>${this.props.meal.price}</p>
            </div>
          </div>
          {quantityFormElements.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              changed={e => this.inputChangeHandler(e, formElement.id, 'quantity')}
            />
          ))}
        </div>
        <div className={classes.Modal__footer}>
          <button type="button" data-dismiss="modal" onClick={this.props.closeModal}>
            Close
          </button>
          <button type="submit">Add</button>
        </div>
      </form>
    ) : null;
    const forms = {
      quantity: quantityForm,
      checkout: checkoutForm
    };
    return forms[this.props.type];
  }
}

export default ModalForm;
